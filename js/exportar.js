/* NUMMEROS RRHH — generadores de archivos (Excel y TXT)
   Bancos, Ministerio de Trabajo, Gestora, Caja de Salud, Impuestos, base de datos */
(function (global) {
  'use strict';
  var X = {};
  var r2 = function (n) { return Calc.r2(n); };
  var MES3 = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  function nombreArchivo(empresa, p, tipo, ext) {
    var emp = U.sinAcentos(empresa.razonSocial || 'empresa').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
    var per = p ? '_' + p.anio + '-' + String(p.mes).padStart(2, '0') : '';
    return tipo + '_' + emp + per + '.' + ext;
  }

  /* Crea y descarga un Excel. hojas: [{nombre, filas:[[...]], anchos:[..]}] */
  X.excel = function (archivo, hojas) {
    var wb = XLSX.utils.book_new();
    hojas.forEach(function (h) {
      var ws = XLSX.utils.aoa_to_sheet(h.filas);
      if (h.anchos) ws['!cols'] = h.anchos.map(function (w) { return { wch: w }; });
      XLSX.utils.book_append_sheet(wb, ws, h.nombre.slice(0, 31));
    });
    XLSX.writeFile(wb, archivo);
  };

  function enMes(iso, p) {
    var d = Calc.aFecha(iso); return d && d.getFullYear() === p.anio && d.getMonth() + 1 === p.mes;
  }
  function primerNombre(e) { return U.mayus((e.nombres || '').trim().split(/\s+/)[0] || ''); }
  function segundoNombre(e) { return U.mayus((e.nombres || '').trim().split(/\s+/).slice(1).join(' ')); }

  /* ---------- Planilla de sueldos (Excel) ---------- */
  X.planillaSueldos = function (empresa, p, calc) {
    var cab = ['Nro', 'CI', 'Nombre(s)', 'Apellido(s)', 'Nacionalidad', 'Fecha de nacimiento', 'Sexo', 'Ocupación', 'Fecha de ingreso', 'Sueldo básico',
      'Días pagados', 'Horas/día', 'Salario ganado (A)', 'Bono antigüedad (B)', 'HE cantidad', 'HE monto (C)', 'Bono producción (D)', 'Dominicales (E)',
      'Otros bonos (F)', 'Total ganado (G)', 'AFP (H)', 'Aporte Nal. Solidario (I)', 'RC-IVA (J)', 'Anticipos y otros (K)', 'Total descuentos (L)', 'Líquido pagable',
      'Caja salud patronal', 'Gestora patronal', 'Total Gestora', 'Prev. indemnización', 'Prev. aguinaldo'];
    var filas = [[empresa.razonSocial], ['NIT: ' + empresa.nit], ['PLANILLA DE SUELDOS Y SALARIOS - ' + U.mayus(Calc.MESES[p.mes - 1]) + ' ' + p.anio], ['(Expresado en bolivianos)'], [], cab];
    calc.filas.forEach(function (x, i) {
      var e = x.emp, r = x.r;
      filas.push([i + 1, e.ci, e.nombres, U.apellidos(e), e.nacionalidad || 'BOLIVIANA', U.fecha(e.fechaNac), e.sexo, e.cargo, U.fecha(e.fechaIngreso), r.basico,
        r.dias, r.horasDia, r.salarioGanado, r.bonoAntiguedad, r.horasExtra, r.montoHorasExtra, r.bonoProduccion, r.dominicales, r.otrosBonos, r.totalGanado,
        r.afp, r.ans, r.rcIva, r.anticipos, r.totalDescuentos, r.liquido, r.cajaSalud, r.gestoraPatronal, r.totalGestora, r.provIndemnizacion, r.provAguinaldo]);
    });
    var t = calc.totales;
    filas.push(['', '', 'TOTALES', '', '', '', '', '', '', t.basico, '', '', t.salarioGanado, t.bonoAntiguedad, t.horasExtra, t.montoHorasExtra, t.bonoProduccion,
      t.dominicales, t.otrosBonos, t.totalGanado, t.afp, t.ans, t.rcIva, t.anticipos, t.totalDescuentos, t.liquido, t.cajaSalud, t.gestoraPatronal, t.totalGestora,
      t.provIndemnizacion, t.provAguinaldo]);
    X.excel(nombreArchivo(empresa, p, 'Planilla_Sueldos', 'xlsx'), [{ nombre: 'Planilla', filas: filas, anchos: [5, 11, 18, 22, 12, 12, 6, 24, 12].concat(Array(22).fill(13)) }]);
  };

  /* ---------- Banco Ganadero ---------- */
  X.bancoGanadero = function (empresa, p, calc, fechaPago, glosa) {
    var cab = ['NRO. DE ORDEN', 'CODIGO DE CLIENTE', 'NRO.DECUENTA', 'NOMBRE DE CLIENTE', 'DOC DE IDENTIDAD', 'IMPORTE', 'FECHA DE PAGO', 'FORMA DE PAGO',
      'MONEDA DESTINO', 'ENTIDAD DESTINO', 'SUCURSAL DESTINO', 'GLOSA', 'CODIGO UNICO', 'EMAIL NOTIFICACION', 'NRO_DOC_TERCERO', 'NOMBRE_TERCERO'];
    var filas = [cab], faltan = [];
    calc.filas.filter(function (x) { return x.r.liquido > 0; }).forEach(function (x, i) {
      var e = x.emp, b = D.bancoPorAbrev(e.banco);
      if (!e.cuenta || !b) faltan.push(U.nombreCompleto(e));
      var esGanadero = b && b.abrev === 'GANADERO';
      filas.push([i + 1, '', String(e.cuenta || ''), U.nombreCompleto(e), String(e.ci), r2(x.r.liquido), U.fecha(fechaPago),
        esGanadero ? 1 : 3, esGanadero ? 0 : 1, esGanadero ? 0 : (b ? b.ach : ''), esGanadero ? 0 : (empresa.sucursalBanco || 'SCZ'), glosa, '', e.correo || '', '', '']);
    });
    X.excel(nombreArchivo(empresa, p, 'Banco_Ganadero', 'xlsx'), [{ nombre: 'Planilla Banco', filas: filas, anchos: [8, 10, 18, 32, 12, 12, 12, 8, 8, 10, 10, 26, 8, 30, 10, 10] }]);
    return faltan;
  };

  /* ---------- Banco Mercantil Santa Cruz (TXT separado por |) ---------- */
  X.bancoBmsc = function (empresa, p, calc, fechaPago, glosa) {
    var lista = calc.filas.filter(function (x) { return x.r.liquido > 0; });
    var total = lista.reduce(function (s, x) { return s + x.r.liquido; }, 0);
    var b = empresa.bmsc || {};
    var ref = (b.referencia || '{MES}PAYROLL').replace('{MES}', MES3[p.mes - 1]);
    var cab = [b.codigoEmpresa || '', b.cuentaOrigen || '', b.moneda || '0', ref, U.fecha(fechaPago), U.fecha(b.fecha2 || fechaPago), U.punto(total), b.tipoPlanilla || '2'].join('|');
    var faltan = [];
    var lineas = lista.map(function (x) {
      var e = x.emp, bk = D.bancoPorAbrev(e.banco);
      if (!e.cuenta || !bk) faltan.push(U.nombreCompleto(e));
      var esBmsc = bk && bk.abrev === 'BMSC';
      return [e.ci, U.nombreCompleto(e), esBmsc ? e.cuenta : '', U.fecha(fechaPago), esBmsc ? '1' : '3', U.punto(x.r.liquido),
        esBmsc ? '' : (bk ? bk.ach : ''), esBmsc ? '' : (e.cuenta || ''), glosa].join('|');
    });
    U.descargar(nombreArchivo(empresa, p, 'Banco_BMSC', 'txt'), [cab].concat(lineas).join('\r\n'));
    return faltan;
  };

  /* ---------- Ministerio de Trabajo (planilla trimestral / mensual OVT) ---------- */
  X.ministerio = function (empresa, p, calc) {
    var cab = ['Nro', 'Tipo de documento de identidad', 'Número de documento de identidad', 'Lugar de expedición', 'Fecha de nacimiento', 'Apellido Paterno',
      'Apellido Materno', 'Nombres', 'País de nacionalidad', 'Sexo', 'Jubilado', '¿Aporta a la AFP?', '¿Persona con discapacidad?', 'Tutor de persona con discapacidad',
      'Fecha de ingreso', 'Fecha de retiro', 'Motivo retiro', 'Caja de salud', 'AFP a la que aporta', 'NUA/CUA', 'Sucursal o ubicación adicional', 'Clasificación laboral',
      'Cargo', 'Modalidad de contrato', 'Tipo contrato', 'Días pagados', 'Horas pagadas', 'Haber Básico', 'Bono de antigüedad', 'Horas extra', 'Monto horas extra',
      'Horas recargo nocturno', 'Monto horas extra nocturnas', 'Horas extra dominicales', 'Monto horas extra dominicales', 'Domingos trabajados', 'Monto domingo trabajado',
      'Nro. dominicales', 'Salario dominical', 'Bono producción', 'Subsidio frontera', 'Otros bonos y pagos', 'RC-IVA', 'Aporte Caja Salud', 'Aporte AFP', 'Otros descuentos'];
    var filas = [cab];
    calc.filas.forEach(function (x, i) {
      var e = x.emp, r = x.r;
      var retiro = enMes(e.fechaRetiro, p);
      filas.push([i + 1, e.tipoDoc || 'CI', String(e.ci) + (e.complemento ? '-' + e.complemento : ''), e.expedido || '', U.fecha(e.fechaNac), U.mayus(e.apPaterno), U.mayus(e.apMaterno),
        U.mayus(e.nombres), U.mayus(e.nacionalidad || 'BOLIVIANA'), e.sexo || '', +(e.jubilado || 0), e.aportaAfp === '0' || e.aportaAfp === 0 ? 0 : 1, +(e.discapacidad || 0), +(e.tutorDiscapacidad || 0),
        U.fecha(e.fechaIngreso), retiro ? U.fecha(e.fechaRetiro) : '', retiro ? (e.motivoRetiro || '') : '', +(e.cajaSaludCod || empresa.cajaSaludCod || 6), +(e.afpCod || 3), String(e.cua || ''),
        +(e.sucursal || 1), +(e.clasificacion || 4), e.cargo || '', +(e.modalidad || 1), +(e.tipoContrato || 1), r.dias, r.horasDia,
        U.punto(r.salarioGanado), U.punto(r.bonoAntiguedad), r.horasExtra || 0, U.punto(r.montoHorasExtra), 0, 0, 0, 0, '', '', '', r.dominicales ? U.punto(r.dominicales) : '',
        r.bonoProduccion ? U.punto(r.bonoProduccion) : '', '', U.punto(r.otrosBonos), U.punto(r.rcIva), U.punto(r.cajaSalud), U.punto(r.afp + r.ans), U.punto(r.anticipos)]);
    });
    X.excel(nombreArchivo(empresa, p, 'Ministerio_Trabajo', 'xlsx'), [{ nombre: 'Planilla', filas: filas, anchos: Array(46).fill(14) }]);
  };

  /* ---------- Gestora Pública ---------- */
  X.gestora = function (empresa, p, calc) {
    var cab = ['NRO', 'TIPO DE DOCUMENTO DE IDENTIDAD (I / E)', 'NÚMERO DE IDENTIDAD', 'COMPLEMENTO C.I.', 'CUA', 'PRIMER APELLIDO', 'SEGUNDO APELLIDO', 'APELLIDO DE CASADA',
      'PRIMER NOMBRE', 'SEGUNDO NOMBRE', 'TIPO DE NOVEDAD (I / R)', 'FECHA DE NOVEDAD', 'DÍAS COTIZADOS',
      'TIPO DE ASEGURADO (DEPENDIENTE - D, MINERO - M, ESTACIONAL - E, CONSULTOR EN LINEA - CL)', 'TOTAL GANADO', 'COTIZACIÓN ADICIONAL'];
    var filas = [cab], sinCua = [];
    calc.filas.forEach(function (x, i) {
      var e = x.emp;
      if (!e.cua) sinCua.push(U.nombreCompleto(e));
      var nov = '', fnov = '';
      if (enMes(e.fechaRetiro, p)) { nov = 'R'; fnov = U.fecha(e.fechaRetiro); }
      else if (enMes(e.fechaIngreso, p)) { nov = 'I'; fnov = U.fecha(e.fechaIngreso); }
      filas.push([i + 1, e.tipoDoc === 'PASAPORTE' || e.tipoDoc === 'CE' ? 'E' : 'I', String(e.ci), e.complemento || '', String(e.cua || ''), U.mayus(e.apPaterno), U.mayus(e.apMaterno),
        U.mayus(e.apCasada || ''), primerNombre(e), segundoNombre(e), nov, fnov, x.r.dias, e.tipoAsegurado || 'D', r2(x.r.totalGanado), '']);
    });
    X.excel(nombreArchivo(empresa, p, 'Gestora_Publica', 'xlsx'), [{ nombre: 'Gestora', filas: filas, anchos: [6, 10, 12, 10, 12, 16, 16, 14, 14, 14, 10, 12, 10, 14, 12, 12] }]);
    return sinCua;
  };

  /* ---------- Caja de Salud ---------- */
  X.cajaSalud = function (empresa, p, calc) {
    var filas = [[empresa.razonSocial + ' - NIT ' + empresa.nit + (empresa.nroPatronalCaja ? ' - N° Patronal ' + empresa.nroPatronalCaja : '')],
      ['PLANILLA DE APORTES A LA CAJA DE SALUD - ' + U.mayus(Calc.MESES[p.mes - 1]) + ' ' + p.anio], [],
      ['Nro', 'CI', 'Apellido paterno', 'Apellido materno', 'Nombres', 'Cargo', 'Fecha de ingreso', 'Días trabajados', 'Total ganado', 'Aporte ' + calc.cfg.cajaSalud + '%']];
    calc.filas.forEach(function (x, i) {
      var e = x.emp;
      filas.push([i + 1, String(e.ci), U.mayus(e.apPaterno), U.mayus(e.apMaterno), U.mayus(e.nombres), e.cargo, U.fecha(e.fechaIngreso), x.r.dias, r2(x.r.totalGanado), r2(x.r.cajaSalud)]);
    });
    filas.push(['', '', '', '', '', '', '', 'TOTAL', calc.totales.totalGanado, calc.totales.cajaSalud]);
    X.excel(nombreArchivo(empresa, p, 'Caja_Salud', 'xlsx'), [{ nombre: 'Caja de Salud', filas: filas, anchos: [6, 12, 16, 16, 20, 24, 12, 10, 12, 12] }]);
  };

  /* ---------- Impuestos: RC-IVA dependientes (planilla para el F-608 / Facilito) ---------- */
  X.impuestos = function (empresa, p, calc) {
    var filas = [['NRO.', 'CUR DEPENDIENTE', 'TOTAL GANADO', 'VIÁTICOS', 'REFRIGERIO', 'OTROS INGRESOS']], sinCod = [];
    calc.filas.forEach(function (x, i) {
      var e = x.emp;
      if (!e.codDependiente) sinCod.push(U.nombreCompleto(e));
      filas.push([i + 1, String(e.codDependiente || ''), r2(x.r.totalGanado), 0, 0, 0]);
    });
    var det = [['CI', 'Nombre', 'Total ganado', 'AFP + ANS', 'Neto', 'Mínimo no imponible', 'Sujeto a impuesto', 'Impuesto 13%', 'Crédito 13% SMN', 'Crédito facturas F-110', 'RC-IVA a retener', 'Saldo a favor']];
    calc.filas.forEach(function (x) {
      var d = x.r.rcIvaDetalle;
      det.push([String(x.emp.ci), U.nombreCompleto(x.emp), x.r.totalGanado, r2(x.r.afp + x.r.ans), d.neto, d.minimo, d.sujeto, d.impuesto, d.creditoSMN, d.creditoFacturas, d.aPagar, d.saldoFavor]);
    });
    X.excel(nombreArchivo(empresa, p, 'RC-IVA_Dependientes', 'xlsx'), [
      { nombre: 'Planilla Impuestos', filas: filas, anchos: [6, 16, 14, 10, 12, 14] },
      { nombre: 'Detalle RC-IVA', filas: det, anchos: [12, 30].concat(Array(10).fill(14)) }]);
    return sinCod;
  };

  /* ---------- Asiento contable ---------- */
  X.asiento = function (empresa, p, calc) {
    var a = Doc.asientoLineas(calc), filas = [['Cuenta', 'Debe', 'Haber']];
    a.debe.forEach(function (l) { filas.push([l[0], l[1], '']); });
    a.haber.forEach(function (l) { filas.push([l[0], '', l[1]]); });
    filas.push(['SUMAS IGUALES', r2(a.debe.reduce(function (s, l) { return s + l[1]; }, 0)), r2(a.haber.reduce(function (s, l) { return s + l[1]; }, 0))]);
    X.excel(nombreArchivo(empresa, p, 'Asiento_Contable', 'xlsx'), [{ nombre: 'Asiento', filas: filas, anchos: [46, 14, 14] }]);
  };

  /* ---------- Base de datos del personal ---------- */
  X.CAMPOS_PERSONAL = [
    ['ci', 'CI'], ['complemento', 'Complemento'], ['expedido', 'Expedido'], ['nombres', 'Nombre(s)'], ['apPaterno', 'Apellido Paterno'], ['apMaterno', 'Apellido Materno'],
    ['apCasada', 'Apellido de casada'], ['sexo', 'Sexo'], ['fechaNac', 'F. Nacimiento'], ['nacionalidad', 'Nacionalidad'], ['celular', 'Celular'], ['correo', 'Correo'],
    ['cargo', 'Cargo'], ['horario', 'Horarios de Trabajo'], ['fechaIngreso', 'Fecha de Ingreso'], ['fechaRetiro', 'Fecha de Retiro'], ['motivoRetiro', 'Motivo de retiro'],
    ['estado', 'Estado'], ['sueldoBasico', 'Sueldo Básico'], ['banco', 'Banco'], ['cuenta', 'Cuenta Bancaria'], ['cua', 'CUA'], ['codDependiente', 'COD. IMPUESTOS 110'],
    ['enlaceContrato', 'Enlace del contrato'], ['notas', 'Notas']];
  X.personal = function (empresa, empleados) {
    var filas = [X.CAMPOS_PERSONAL.map(function (c) { return c[1]; })];
    empleados.forEach(function (e) {
      filas.push(X.CAMPOS_PERSONAL.map(function (c) {
        var v = e[c[0]];
        if (/^fecha/.test(c[0])) return U.fecha(v);
        if (c[0] === 'sueldoBasico') return Calc.num(v);
        return v === undefined || v === null ? '' : String(v);
      }));
    });
    X.excel(nombreArchivo(empresa, null, 'Personal', 'xlsx'), [{ nombre: 'Personal', filas: filas, anchos: X.CAMPOS_PERSONAL.map(function () { return 16; }) }]);
  };

  /* ---------- Historial de sueldos (todas las planillas) ---------- */
  X.historial = function (empresa) {
    var filas = [['Año', 'Mes', 'Estado', 'CI', 'Nombre', 'Cargo', 'Días', 'Salario ganado', 'Bono antigüedad', 'Horas extra', 'Otros ingresos', 'Total ganado', 'AFP', 'ANS', 'RC-IVA',
      'Anticipos', 'Total descuentos', 'Líquido pagable', 'Caja salud', 'Gestora patronal']];
    D.planillas(empresa.id).slice().reverse().forEach(function (p) {
      D.calcularPlanilla(p).filas.forEach(function (x) {
        var r = x.r;
        filas.push([p.anio, Calc.MESES[p.mes - 1], p.estado, String(x.emp.ci), U.nombreCompleto(x.emp), x.emp.cargo, r.dias, r.salarioGanado, r.bonoAntiguedad, r.montoHorasExtra,
          r2(r.bonoProduccion + r.dominicales + r.otrosBonos), r.totalGanado, r.afp, r.ans, r.rcIva, r.anticipos, r.totalDescuentos, r.liquido, r.cajaSalud, r.gestoraPatronal]);
      });
    });
    X.excel(nombreArchivo(empresa, null, 'Historial_Sueldos', 'xlsx'), [{ nombre: 'Historial', filas: filas, anchos: [6, 11, 9, 12, 30, 22].concat(Array(14).fill(12)) }]);
  };

  /* ---------- Aguinaldos ---------- */
  X.aguinaldos = function (empresa, anio, filasAg) {
    var filas = [['Nro', 'CI', 'Nombre', 'Cargo', 'Fecha ingreso', 'Septiembre', 'Octubre', 'Noviembre', 'Promedio', 'Meses', 'Días', 'Aguinaldo', 'Banco', 'Cuenta']];
    filasAg.forEach(function (f, i) {
      filas.push([i + 1, String(f.emp.ci), U.nombreCompleto(f.emp), f.emp.cargo, U.fecha(f.emp.fechaIngreso)].concat(f.meses.map(r2), [f.a.promedio, f.a.meses, f.a.dias, f.a.aguinaldo, f.emp.banco || '', String(f.emp.cuenta || '')]));
    });
    X.excel(nombreArchivo(empresa, { anio: anio, mes: 12 }, 'Aguinaldos', 'xlsx'), [{ nombre: 'Aguinaldos', filas: filas, anchos: [6, 12, 30, 22, 12, 12, 12, 12, 12, 7, 7, 12, 12, 18] }]);
  };

  /* ---------- Plantilla vacía para cargar personal ---------- */
  X.plantillaPersonal = function () {
    var ej = ['5896481', '', 'SC', 'Carlos Conrado', 'Kramer', 'Borda', '', 'M', '31/10/1985', 'BOLIVIANA', '70000000', 'correo@ejemplo.com', 'Asistente', 'Lu - Vi 08:00 - 16:00',
      '01/11/2024', '', '', 'ACTIVO', 4796.61, 'BCP', '70151068019344', '47045218', '5896481019', '', ''];
    X.excel('Plantilla_Personal_NUMMEROS.xlsx', [{ nombre: 'Personal', filas: [X.CAMPOS_PERSONAL.map(function (c) { return c[1]; }), ej], anchos: X.CAMPOS_PERSONAL.map(function () { return 16; }) }]);
  };

  global.X = X;
})(window);
