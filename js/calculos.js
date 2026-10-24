/* =========================================================
   NUMMEROS RRHH — Motor de cálculos (Bolivia)
   Funciones puras: reciben datos y devuelven resultados.
   Todas las tasas vienen de la Configuración del sistema.
   ========================================================= */
(function (global) {
  'use strict';

  var MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  /* Configuración por defecto (se puede cambiar en la pantalla Configuración) */
  var CONFIG_BASE = {
    smn: 3300,                 // Salario Mínimo Nacional vigente
    afpLaboral: 12.71,         // % aporte laboral a la Gestora (AFP)
    ansTramos: [               // Aporte Nacional Solidario: % sobre el excedente de cada tramo
      { desde: 13000, tasa: 1.15 },
      { desde: 25000, tasa: 5 },
      { desde: 35000, tasa: 10 }
    ],
    rcIva: 13,                 // % RC-IVA
    rcIvaMinNoImponibleSMN: 2, // Mínimo no imponible = 2 SMN
    rcIvaCreditoSMN: 2,        // Se descuenta el 13% de 2 SMN (pago a cuenta)
    horasDia: 8,
    recargoHoraExtra: 50,      // % de recargo de la hora extra (práctica de Milthagor: 50%; la LGT indica 100%)
    redondearValorHora: false, // false = como la planilla del cliente (valor hora sin redondear)
    versionConfig: 2,
    antiguedadBaseSMN: 3,      // Bono de antigüedad se calcula sobre 3 SMN
    antiguedadProporcional: true, // prorratear el bono según días pagados
    cajaSalud: 10,             // % aporte patronal Caja de Salud
    gestoraPatronal: 7.21,     // % aportes patronales a la Gestora (riesgo profesional, vivienda, solidario)
    provIndemnizacion: 8.33,
    provAguinaldo: 8.33,
    escalaAntiguedad: [        // años desde → % (D.S. 21060 / 21137)
      { desde: 2, pct: 5 }, { desde: 5, pct: 11 }, { desde: 8, pct: 18 },
      { desde: 11, pct: 26 }, { desde: 15, pct: 34 }, { desde: 20, pct: 42 }, { desde: 25, pct: 50 }
    ]
  };

  function r2(n) { n = Number(n) || 0; return Math.round(Number((n * 100).toFixed(6))) / 100; }
  function num(v) {
    if (v === null || v === undefined || v === '') return 0;
    if (typeof v === 'number') return isFinite(v) ? v : 0;
    var s = String(v).trim();
    // Acepta "4.796,61" (formato boliviano) y "4796.61"
    if (/,\d{1,2}$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
    var n = parseFloat(s);
    return isFinite(n) ? n : 0;
  }

  /* Fechas en formato ISO "AAAA-MM-DD" */
  function aFecha(iso) {
    if (!iso) return null;
    var p = String(iso).split('-');
    if (p.length !== 3) return null;
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function ultimoDiaMes(anio, mes) { return new Date(anio, mes, 0); } // mes 1-12
  function aniosCompletos(desdeIso, hasta) {
    var d = aFecha(desdeIso); if (!d || !hasta) return 0;
    var a = hasta.getFullYear() - d.getFullYear();
    if (hasta.getMonth() < d.getMonth() || (hasta.getMonth() === d.getMonth() && hasta.getDate() < d.getDate())) a--;
    return Math.max(0, a);
  }
  function pctAntiguedad(anios, cfg) {
    var p = 0;
    (cfg.escalaAntiguedad || []).forEach(function (t) { if (anios >= t.desde) p = t.pct; });
    return p;
  }

  /* Días a pagar en el mes según fecha de ingreso/retiro (mes comercial de 30 días) */
  function diasSugeridos(emp, anio, mes) {
    var ini = new Date(anio, mes - 1, 1), fin = ultimoDiaMes(anio, mes);
    var ing = aFecha(emp.fechaIngreso), ret = aFecha(emp.fechaRetiro);
    if (ing && ing > fin) return 0;
    if (ret && ret < ini) return 0;
    var desde = 1, hasta = 30;
    if (ing && ing >= ini) desde = ing.getDate();
    if (ret && ret <= fin) hasta = Math.min(30, ret.getDate());
    if (ret && ret <= fin && ret.getDate() === fin.getDate()) hasta = 30;
    return Math.max(0, hasta - desde + 1);
  }

  function ansMonto(totalGanado, cfg) {
    var t = 0;
    (cfg.ansTramos || []).forEach(function (tr) {
      if (totalGanado > tr.desde) t += r2((totalGanado - tr.desde) * tr.tasa / 100);
    });
    return r2(t);
  }

  /* RC-IVA dependientes (Ley 843 / D.S. 21531) */
  function rcIva(totalGanado, afp, ans, facturas, saldoAnterior, cfg) {
    var smn = cfg.smn, tasa = cfg.rcIva / 100;
    var neto = totalGanado - afp - ans;
    var minimo = smn * cfg.rcIvaMinNoImponibleSMN;
    var sujeto = Math.max(0, neto - minimo);
    var impuesto = sujeto * tasa;
    var creditoSMN = smn * cfg.rcIvaCreditoSMN * tasa;
    var creditoFacturas = num(facturas) * tasa;
    var saldo = impuesto - creditoSMN - creditoFacturas - num(saldoAnterior);
    var aPagar = saldo > 0 ? saldo : 0;
    return {
      neto: r2(neto), minimo: r2(minimo), sujeto: r2(sujeto), impuesto: r2(impuesto),
      creditoSMN: r2(creditoSMN), creditoFacturas: r2(creditoFacturas),
      aPagar: sujeto > 0 ? r2(aPagar) : 0,
      saldoFavor: sujeto > 0 && saldo < 0 ? r2(-saldo) : 0
    };
  }

  /* Cálculo completo de una fila de planilla.
     emp: datos del empleado; mov: novedades del mes; periodo: {anio, mes}; cfg */
  function calcularFila(emp, mov, periodo, cfg) {
    cfg = cfg || CONFIG_BASE;
    var basico = num(emp.sueldoBasico);
    var dias = mov.dias === '' || mov.dias === undefined || mov.dias === null ? diasSugeridos(emp, periodo.anio, periodo.mes) : num(mov.dias);
    dias = Math.min(30, Math.max(0, dias));
    var salarioGanado = r2(basico / 30 * dias);

    var finMes = ultimoDiaMes(periodo.anio, periodo.mes);
    var anios = aniosCompletos(emp.fechaIngreso, finMes);
    var pct = pctAntiguedad(anios, cfg);
    var bonoAntig = cfg.smn * cfg.antiguedadBaseSMN * pct / 100;
    if (cfg.antiguedadProporcional) bonoAntig = bonoAntig / 30 * dias;
    if (mov.bonoAntiguedadManual !== undefined && mov.bonoAntiguedadManual !== '' && mov.bonoAntiguedadManual !== null) bonoAntig = num(mov.bonoAntiguedadManual);
    bonoAntig = r2(bonoAntig);

    var valorHora = basico / 30 / cfg.horasDia;
    var valorHoraExtraExacto = valorHora * (1 + cfg.recargoHoraExtra / 100);
    var valorHoraExtra = cfg.redondearValorHora ? r2(valorHoraExtraExacto) : valorHoraExtraExacto;
    var horasExtra = num(mov.horasExtra);
    var montoHE = r2(horasExtra * valorHoraExtra);

    var bonoProd = r2(num(mov.bonoProduccion));
    var dominicales = r2(num(mov.dominicales));
    var otrosBonos = r2(num(mov.otrosBonos));

    var totalGanado = r2(salarioGanado + bonoAntig + montoHE + bonoProd + dominicales + otrosBonos);
    var afp = r2(totalGanado * cfg.afpLaboral / 100);
    var ans = ansMonto(totalGanado, cfg);
    var rc = rcIva(totalGanado, afp, ans, mov.facturasF110, mov.saldoRcIvaAnterior, cfg);
    var anticipos = r2(num(mov.anticipos));
    var totalDesc = r2(afp + ans + rc.aPagar + anticipos);
    var liquido = r2(totalGanado - totalDesc);

    var caja = r2(totalGanado * cfg.cajaSalud / 100);
    var gestoraPat = r2(totalGanado * cfg.gestoraPatronal / 100);

    return {
      basico: r2(basico), dias: dias, horasDia: cfg.horasDia, salarioGanado: salarioGanado,
      anios: anios, pctAntiguedad: pct, bonoAntiguedad: bonoAntig,
      valorHora: r2(valorHora), valorHoraExtra: r2(valorHoraExtra), horasExtra: horasExtra, montoHorasExtra: montoHE,
      bonoProduccion: bonoProd, dominicales: dominicales, otrosBonos: otrosBonos,
      totalGanado: totalGanado, afp: afp, ans: ans, rcIva: rc.aPagar, rcIvaDetalle: rc,
      anticipos: anticipos, totalDescuentos: totalDesc, liquido: liquido,
      cajaSalud: caja, gestoraPatronal: gestoraPat,
      totalGestora: r2(afp + ans + gestoraPat),
      provIndemnizacion: r2(totalGanado * cfg.provIndemnizacion / 100),
      provAguinaldo: r2(totalGanado * cfg.provAguinaldo / 100)
    };
  }

  var CAMPOS_TOTALES = ['basico', 'salarioGanado', 'bonoAntiguedad', 'horasExtra', 'montoHorasExtra', 'bonoProduccion',
    'dominicales', 'otrosBonos', 'totalGanado', 'afp', 'ans', 'rcIva', 'anticipos', 'totalDescuentos', 'liquido',
    'cajaSalud', 'gestoraPatronal', 'totalGestora', 'provIndemnizacion', 'provAguinaldo'];

  function totalizar(resultados) {
    var t = {};
    CAMPOS_TOTALES.forEach(function (k) { t[k] = 0; });
    resultados.forEach(function (r) { CAMPOS_TOTALES.forEach(function (k) { t[k] += num(r[k]); }); });
    CAMPOS_TOTALES.forEach(function (k) { t[k] = r2(t[k]); });
    return t;
  }

  /* Aguinaldo: promedio de los últimos 3 totales ganados × tiempo trabajado en el año */
  function calcularAguinaldo(emp, anio, totalesUltimos3, fechaCorteIso) {
    var inicioAnio = new Date(anio, 0, 1);
    var ing = aFecha(emp.fechaIngreso);
    var desde = ing && ing > inicioAnio ? ing : inicioAnio;
    var corte = aFecha(fechaCorteIso) || new Date(anio, 11, 31);
    var ret = aFecha(emp.fechaRetiro);
    var hasta = ret && ret < corte ? ret : corte;
    var vals = totalesUltimos3.filter(function (v) { return num(v) > 0; }).map(num);
    var promedio = vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : 0;
    if (hasta < desde) return { promedio: r2(promedio), meses: 0, dias: 0, diasTotales: 0, aguinaldo: 0, desde: desde, hasta: hasta };
    // meses y días comerciales trabajados
    var m = (hasta.getFullYear() - desde.getFullYear()) * 12 + (hasta.getMonth() - desde.getMonth());
    var d = Math.min(30, hasta.getDate()) - desde.getDate() + 1;
    if (d >= 30) { m += 1; d -= 30; }
    if (d < 0) { m -= 1; d += 30; }
    if (m >= 12) { m = 12; d = 0; }
    var diasTotales = m * 30 + d;
    var aguinaldo = promedio / 12 * m + promedio / 360 * d;
    var cumpleMinimo = diasTotales >= 90; // se paga si trabajó al menos 3 meses
    return {
      promedio: r2(promedio), meses: m, dias: d, diasTotales: diasTotales,
      aguinaldo: cumpleMinimo ? r2(aguinaldo) : 0, cumpleMinimo: cumpleMinimo, desde: desde, hasta: hasta
    };
  }

  /* Número a letras (para boletas y certificados) */
  function numeroALetras(n) {
    n = r2(n);
    var ent = Math.floor(n), cent = Math.round((n - ent) * 100);
    var U = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE', 'DIEZ', 'ONCE', 'DOCE', 'TRECE',
      'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE', 'VEINTE', 'VEINTIUNO', 'VEINTIDÓS', 'VEINTITRÉS',
      'VEINTICUATRO', 'VEINTICINCO', 'VEINTISÉIS', 'VEINTISIETE', 'VEINTIOCHO', 'VEINTINUEVE'];
    var D = ['', '', '', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    var C = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    function menorMil(x) {
      if (x === 0) return '';
      if (x === 100) return 'CIEN';
      var c = Math.floor(x / 100), r = x % 100, s = C[c];
      if (r) {
        var t = r < 30 ? U[r] : D[Math.floor(r / 10)] + (r % 10 ? ' Y ' + U[r % 10] : '');
        s = (s ? s + ' ' : '') + t;
      }
      return s;
    }
    function conv(x) {
      if (x === 0) return 'CERO';
      var mill = Math.floor(x / 1000000), miles = Math.floor((x % 1000000) / 1000), resto = x % 1000, s = [];
      if (mill) s.push(mill === 1 ? 'UN MILLÓN' : conv(mill) + ' MILLONES');
      if (miles) s.push(miles === 1 ? 'MIL' : menorMil(miles).replace(/UNO$/, 'UN') + ' MIL');
      if (resto) s.push(menorMil(resto));
      return s.join(' ');
    }
    return conv(ent) + ' ' + (cent < 10 ? '0' : '') + cent + '/100 BOLIVIANOS';
  }

  var api = {
    MESES: MESES, CONFIG_BASE: CONFIG_BASE, r2: r2, num: num, aFecha: aFecha,
    diasSugeridos: diasSugeridos, aniosCompletos: aniosCompletos, pctAntiguedad: pctAntiguedad,
    ansMonto: ansMonto, rcIva: rcIva, calcularFila: calcularFila, totalizar: totalizar,
    calcularAguinaldo: calcularAguinaldo, numeroALetras: numeroALetras, ultimoDiaMes: ultimoDiaMes
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.Calc = api;
})(typeof window !== 'undefined' ? window : globalThis);
