/* NUMMEROS RRHH — generadores de archivos (Excel y TXT)
   Bancos, Ministerio de Trabajo, Gestora, Caja de Salud, Impuestos, base de datos */
(function (global) {
  'use strict';
  var X = {};
  var r2 = function (n) { return Calc.r2(n); };

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
    var M = [['Salario ganado (A)', 'salarioGanado'], ['Bono antigüedad (B)', 'bonoAntiguedad'], ['HE cantidad', 'horasExtra'], ['HE monto (C)', 'montoHorasExtra'],
      ['Otros bonos (D)', 'otrosBonos'], ['Total ganado (E)', 'totalGanado'], ['AFP (F)', 'afp'], ['Aporte Nal. Solidario (G)', 'ans'], ['RC-IVA (H)', 'rcIva'],
      ['Anticipos (I)', 'anticipos'], ['Otros descuentos (J)', 'otrosDescuentos'], ['Total descuentos (K)', 'totalDescuentos'], ['Líquido pagable', 'liquido'],
      ['Caja salud patronal', 'cajaSalud'], ['Gestora patronal', 'gestoraPatronal'], ['Total Gestora', 'totalGestora'], ['Prev. indemnización', 'provIndemnizacion'], ['Prev. aguinaldo', 'provAguinaldo']];
    var cab = ['Nro', 'CI', 'Nombre(s)', 'Apellido(s)', 'Nacionalidad', 'Fecha de nacimiento', 'Sexo', 'Ocupación', 'Fecha de ingreso', 'Sueldo básico', 'Días pagados', 'Horas/día']
      .concat(M.map(function (c) { return c[0]; }));
    var filas = [[empresa.razonSocial], ['NIT: ' + empresa.nit], ['PLANILLA DE SUELDOS Y SALARIOS - ' + U.mayus(Calc.MESES[p.mes - 1]) + ' ' + p.anio], ['(Expresado en bolivianos)'], [], cab];
    calc.filas.forEach(function (x, i) {
      var e = x.emp, r = x.r;
      filas.push([i + 1, e.ci, e.nombres, U.apellidos(e), e.nacionalidad || 'BOLIVIANA', U.fecha(e.fechaNac), e.sexo, e.cargo, U.fecha(e.fechaIngreso), r.basico, r.dias, r.horasDia]
        .concat(M.map(function (c) { return r[c[1]]; })));
    });
    var t = calc.totales;
    filas.push(['', '', 'TOTALES', '', '', '', '', '', '', t.basico, '', ''].concat(M.map(function (c) { return t[c[1]]; })));
    X.excel(X.nombreDoc(X.NOMBRES.sueldos, empresa, p) + '.xlsx', [{ nombre: 'Planilla', filas: filas, anchos: [5, 11, 18, 22, 12, 12, 6, 24, 12].concat(Array(22).fill(13)) }]);
  };

  /* ---------- Banco Ganadero (pago masivo) ----------
     Copia exacta del Excel que la representante legal carga al banco:
     una hoja "Hoja1", encabezado verde #00672B con letra blanca Calibri 11 en negrita,
     datos en Century Gothic 9, nombre como "Apellidos Nombres", cuenta y CI como número,
     fecha de pago como fecha real de Excel. */
  function nombreEmpresaCorto(razon) {
    var s = String(razon || 'Empresa').replace(/S\.\s*R\.\s*L\.?/i, 'SRL').replace(/S\.\s*A\.?$/i, 'SA').replace(/LTDA\.?/i, 'LTDA');
    return s.split(/\s+/).map(function (w) {
      return /^(SRL|SA|LTDA)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }).join(' ').trim();
  }
  /* Nombre de los archivos "Para la empresa": "Resumen para Gerencia - Octubre 2026 Milthagor SRL" */
  X.nombreDoc = function (tipo, empresa, p) {
    return tipo + ' - ' + (p ? Calc.MESES[p.mes - 1] + ' ' + p.anio + ' ' : '') + nombreEmpresaCorto(empresa.razonSocial);
  };
  X.NOMBRES = { gerencia: 'Resumen para Gerencia', sueldos: 'Planilla de Sueldos y Salarios', boletas: 'Boletas de Pago', aportes: 'Aportes y Previsiones',
    auditoria: 'Planilla para Auditoria', asiento: 'Asiento Contable', ganadero: 'Planilla Banco Ganadero' };
  X.nombreArchivoGanadero = function (empresa, p) {
    return 'Planilla Sueldos - ' + Calc.MESES[p.mes - 1] + ' ' + nombreEmpresaCorto(empresa.razonSocial) + '.xlsx';
  };
  function serialExcel(iso) {
    var d = Calc.aFecha(iso) || new Date();
    return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(1899, 11, 30)) / 86400000);
  }
  /* El banco rechaza guiones, espacios y puntos en cuenta y CI: se quitan */
  function limpiarCodigo(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[\s\-–—._\/]/g, '').trim();
  }
  function comoNumero(v) {
    var s = limpiarCodigo(v);
    return /^\d{1,15}$/.test(s) ? Number(s) : s;
  }
  X.limpiarCodigo = limpiarCodigo;
  /* ¿A quién se le deposita? Al trabajador, o al tercero autorizado si está activo */
  X.destinoPago = function (e) {
    if (e.terceroActivo === '1' && e.terceroNombre && e.terceroCuenta) {
      return { tercero: true, nombre: String(e.terceroNombre).replace(/\s+/g, ' ').trim(), ci: e.terceroCi, banco: e.terceroBanco, cuenta: e.terceroCuenta };
    }
    return { tercero: false, nombre: [U.apellidos(e), e.nombres].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim(), ci: e.ci, banco: e.banco, cuenta: e.cuenta };
  };
  X.bancoGanadero = function (empresa, p, calc, fechaPago, glosa) {
    var cab = ['NRO. DE ORDEN', 'CODIGO DE CLIENTE', 'NRO.DECUENTA', 'NOMBRE DE CLIENTE', 'DOC DE IDENTIDAD', 'IMPORTE', 'FECHA DE PAGO', 'FORMA DE PAGO',
      'MONEDA DESTINO', 'ENTIDAD DESTINO', 'SUCURSAL DESTINO', 'GLOSA', 'CODIGO UNICO', 'EMAIL NOTIFICACION', 'NRO_DOC_TERCERO', 'NOMBRE_TERCERO'];
    var estCab = { font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: 'FFFFFF' } }, fill: { patternType: 'solid', fgColor: { rgb: '00672B' } } };
    var estDato = function () { return { font: { name: 'Century Gothic', sz: 9 } }; }; // un objeto nuevo por celda
    var ws = {}, faltan = [], terceros = [], fila = 0;
    var poner = function (c, r, celda) { ws[XLSX.utils.encode_cell({ c: c, r: r })] = celda; };
    cab.forEach(function (t, c) { poner(c, 0, { t: 's', v: t, s: JSON.parse(JSON.stringify(estCab)) }); });
    var fecha = serialExcel(fechaPago);
    calc.filas.filter(function (x) { return x.r.liquido > 0; }).forEach(function (x) {
      var e = x.emp;
      /* Pago a un tercero autorizado (con carta de respaldo): SOLO cambia los datos de este archivo del banco */
      var pago = X.destinoPago(e);
      if (pago.tercero) terceros.push(U.nombreCompleto(e) + ' → ' + pago.nombre);
      var b = D.bancoPorAbrev(pago.banco);
      if (!pago.cuenta || !b) faltan.push(U.nombreCompleto(e));
      var esGanadero = b && b.abrev === 'GANADERO';
      fila++;
      var vals = [
        fila, null, comoNumero(pago.cuenta), pago.nombre, comoNumero(pago.ci), r2(x.r.liquido), fecha,
        esGanadero ? 1 : 3, esGanadero ? 0 : 1, esGanadero ? 0 : (b ? Number(b.ach) : ''), esGanadero ? 0 : (empresa.sucursalBanco || 'SCZ'),
        glosa, null, e.correo || null, null, null
      ];
      vals.forEach(function (v, c) {
        if (v === null || v === '') return;
        var celda = { t: typeof v === 'number' ? 'n' : 's', v: v, s: estDato() };
        if (c === 2 && typeof v === 'number') celda.z = '0';
        if (c === 5) celda.z = '#,##0.00';
        if (c === 6) celda.z = 'm/d/yy';
        poner(c, fila, celda);
      });
    });
    ws['!ref'] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: 15, r: Math.max(fila, 1) } });
    ws['!cols'] = [9, 19.6, 16, 39, 12, 10, 11, 9, 9, 9, 9, 48.4, 15.8, 40.6, 19.8, 18].map(function (w) { return { wch: w }; });
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, X.nombreArchivoGanadero(empresa, p));
    faltan.terceros = terceros;
    return faltan;
  };

  /* ---------- Planilla para auditoría (copia exacta de "Sueldos_Septiembre.xlsx") ----------
     Hoja "Calculo Planilla SUELDOS": título en Calibri, encabezados azul #152644 con letra blanca,
     datos en Century Gothic 10, totales con fórmulas SUMA en gris #7E9197.
     Abajo, la segunda tabla de aportes patronales y previsiones. */
  X.AUD_COLS = ['Nro', 'Nombre Completo', 'C.I.', 'Nacionalidad', 'Fecha de Nacimiento', 'Sexo (F/M)', 'Ocupación', 'Fecha de Ingreso', 'Dias Trabajados', 'Horas Extras', 'Sueldo Base',
    '(1) Haber Basico', '(2) Bono de Antiguedad', '(3) Bono de Producción', '(4) Subsidio de Frontera', '(5) Trabajo Extraordinario y Nocturno', '(6) Pago Dominical y Domingo Trabajado',
    '(7) Total Horas Extras', '(8) Otros Bonos', '(9) TOTAL GANADO Suma (1 a 8)', '(10) Aporte a la GESTORA', '(11) Aporte Nacional Solidario', '(12) Anticipo Sueldos',
    '(13) Otros Descuentos', '(14) RC-IVA', '(15) TOTAL DESCUENTOS Suma (10 a 14)', '(16) LIQUIDO PAGABLE (15 - 9)'];
  X.AUD_COLS2 = ['Nro', 'Nombre Completo', 'Nacionalidad', 'Ocupación', 'TOTAL GANADO', 'Seguro de Salud (10%)', 'Prima por Riesgo Profesional (1,71%)',
    'Aporte Patronal para Fondo de Vivienda Social (2%)', 'Aporte Patronal Solidario (3,5%)', 'TOTAL APORTE', 'Aguinaldo (8,33%)', 'Indemnnización (8,33%)', 'Indemnnización (8,33%)'];
  /* Valores de cada fila (los usan el Excel y el PDF) */
  X.filasAuditoria = function (calc) {
    var t1 = [], t2 = [];
    calc.filas.forEach(function (x, i) {
      var e = x.emp, r = x.r, tg = r.totalGanado;
      t1.push([i + 1, U.nombreCompleto(e), comoNumero(e.ci), U.mayus(e.nacionalidad || 'BOLIVIANA'), e.fechaNac, e.sexo || '', e.cargo || '', e.fechaIngreso,
        r.dias, r.horasExtra, r.basico, r.salarioGanado, r.bonoAntiguedad, r.bonoProduccion || 0, 0, 0, r.dominicales || 0, r.montoHorasExtra, r.otrosBonos,
        tg, r.afp, r.ans, r.anticipos, r.otrosDescuentos, r.rcIva, r.totalDescuentos, r.liquido]);
      var f = r2(tg * 0.10), g = r2(tg * 0.0171), h = r2(tg * 0.02), ii = r2(tg * 0.035);
      t2.push([i + 1, U.nombreCompleto(e), comoNumero(e.ci), e.cargo || '', tg, f, g, h, ii, r2(f + g + h + ii), r2(tg * 0.0833), r2(tg * 0.0833), r2(tg * 0.00833)]);
    });
    return { t1: t1, t2: t2 };
  };
  X.nombreArchivoAuditoria = function (p, empresa) { return X.nombreDoc(X.NOMBRES.auditoria, empresa, p) + '.xlsx'; };
  X.auditoria = function (empresa, p, calc) {
    var ws = {}, merges = [], A = X.filasAuditoria(calc), n = A.t1.length;
    var cel = function (c, r, v, s, z) {
      if (v === null || v === undefined || v === '') { if (s) ws[XLSX.utils.encode_cell({ c: c, r: r })] = { t: 's', v: '', s: s }; return; }
      var o = { t: typeof v === 'number' ? 'n' : 's', v: v, s: s || {} };
      if (z) o.z = z;
      ws[XLSX.utils.encode_cell({ c: c, r: r })] = o;
    };
    var fuente = function (nombre, sz, bold, color) { var f = { name: nombre, sz: sz }; if (bold) f.bold = true; if (color) f.color = { rgb: color }; return f; };
    var borde = function (lados) { var b = {}; lados.forEach(function (l) { b[l] = { style: 'thin', color: { rgb: '000000' } }; }); return b; };
    var estCab = function (c) {
      var s = { font: fuente('Century Gothic', 10, true, 'FFFFFF'), fill: { patternType: 'solid', fgColor: { rgb: '152644' } },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true } };
      if (c === 0) s.border = borde(['left']);
      return s;
    };
    var estTot = function (c, centrado, arriba) {
      var s = { font: fuente('Calibri', 12, true), fill: { patternType: 'solid', fgColor: { rgb: '7E9197' } } };
      if (centrado) s.alignment = { horizontal: 'center' };
      if (arriba) s.border = borde(['top']);
      return s;
    };
    /* Título */
    cel(1, 1, U.mayus(empresa.razonSocial), { font: fuente('Calibri', 18, true) });
    cel(1, 2, 'NIT: ' + (empresa.nit || ''), { font: fuente('Calibri', 18, true) });
    [['PLANILLA DE SUELDOS Y SALARIOS', 22], ['CORRESPONDIENTE AL MES DE ' + U.mayus(Calc.MESES[p.mes - 1]) + ' ' + p.anio, 16], ['(EXPRESADO EN BOLIVIANOS)', 16]].forEach(function (t, i) {
      cel(0, 4 + i, t[0], { font: fuente('Calibri', t[1], true), alignment: { horizontal: 'center' } });
      merges.push({ s: { c: 0, r: 4 + i }, e: { c: 21, r: 4 + i } });
    });
    /* Tabla 1 */
    X.AUD_COLS.forEach(function (t, c) { cel(c, 8, t, estCab(c)); });
    var ini = 9;
    A.t1.forEach(function (f, i) {
      var r = ini + i;
      f.forEach(function (v, c) {
        var s = { font: c <= 21 ? fuente('Century Gothic', 10) : fuente('Calibri', 12) }, z = null;
        if (c === 0) s.border = borde(['left']);
        if (c === 4 || c === 7) { v = v ? serialExcel(v) : null; z = 'mm-dd-yy'; }
        else if (c >= 8 && c <= 21 || c === 24 || c === 26) z = '#,##0.00';
        cel(c, r, v, s, z);
      });
    });
    var fin = ini + n - 1, rt = fin + 2; // una fila vacía y luego los totales
    for (var c = 0; c <= 26; c++) {
      var col = XLSX.utils.encode_col(c);
      if (c >= 9) {
        var suma = A.t1.reduce(function (s, f) { return s + (Number(f[c]) || 0); }, 0);
        ws[col + (rt + 1)] = { t: 'n', v: r2(suma), f: 'SUM(' + col + (ini + 1) + ':' + col + (fin + 1) + ')', z: '#,##0.00', s: estTot(c) };
      } else cel(c, rt, '', estTot(c, c <= 7, c <= 7));
    }
    /* Tabla 2: aportes patronales y previsiones (5 filas más abajo, como el modelo) */
    var cab2 = rt + 5;
    X.AUD_COLS2.forEach(function (t, c) { cel(c, cab2, t, estCab(c)); });
    var ini2 = cab2 + 1;
    A.t2.forEach(function (f, i) {
      f.forEach(function (v, c) {
        var s = { font: fuente('Century Gothic', 10) };
        if (c === 0) s.border = borde(['left']);
        cel(c, ini2 + i, v, s, c >= 4 ? '#,##0.00' : null);
      });
    });
    var fin2 = ini2 + n - 1, rt2 = fin2 + 1;
    for (var c2 = 0; c2 <= 12; c2++) {
      var col2 = XLSX.utils.encode_col(c2);
      if (c2 >= 4) {
        var suma2 = A.t2.reduce(function (s, f) { return s + (Number(f[c2]) || 0); }, 0);
        ws[col2 + (rt2 + 1)] = { t: 'n', v: r2(suma2), f: 'SUM(' + col2 + (ini2 + 1) + ':' + col2 + (fin2 + 1) + ')', z: '#,##0.00', s: estTot(c2, true, true) };
      } else cel(c2, rt2, '', estTot(c2, true, true));
    }
    ws['!ref'] = XLSX.utils.encode_range({ s: { c: 0, r: 1 }, e: { c: 26, r: rt2 } });
    ws['!merges'] = merges;
    var anchos = { 1: 30.33, 2: 12.16, 3: 19.83, 4: 13.33, 5: 10, 6: 18.83, 7: 10.5, 14: 9.83, 15: 9.66 };
    ws['!cols'] = []; for (var k = 0; k <= 26; k++) ws['!cols'].push({ width: anchos[k] || 8.83 });
    var altos = {}; altos[1] = 24; altos[2] = 24; altos[4] = 29; altos[5] = 20; altos[6] = 21; altos[8] = 70; altos[cab2] = 88;
    ws['!rows'] = []; for (var rr = 0; rr <= rt2; rr++) ws['!rows'].push(altos[rr] ? { hpt: altos[rr] } : {});
    ws['!margins'] = { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 };
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Calculo Planilla SUELDOS');
    XLSX.writeFile(wb, X.nombreArchivoAuditoria(p, empresa));
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
        r.bonoProduccion ? U.punto(r.bonoProduccion) : '', '', U.punto(r.otrosBonos), U.punto(r.rcIva), U.punto(r.cajaSalud), U.punto(r.afp + r.ans), U.punto(r.anticipos + r.otrosDescuentos)]);
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
    X.excel(X.nombreDoc(X.NOMBRES.asiento, empresa, p) + '.xlsx', [{ nombre: 'Asiento', filas: filas, anchos: [46, 14, 14] }]);
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
      'Anticipos', 'Otros descuentos', 'Total descuentos', 'Líquido pagable', 'Caja salud', 'Gestora patronal']];
    D.planillas(empresa.id).slice().reverse().forEach(function (p) {
      D.calcularPlanilla(p).filas.forEach(function (x) {
        var r = x.r;
        filas.push([p.anio, Calc.MESES[p.mes - 1], p.estado, String(x.emp.ci), U.nombreCompleto(x.emp), x.emp.cargo, r.dias, r.salarioGanado, r.bonoAntiguedad, r.montoHorasExtra,
          r2(r.bonoProduccion + r.dominicales + r.otrosBonos), r.totalGanado, r.afp, r.ans, r.rcIva, r.anticipos, r.otrosDescuentos, r.totalDescuentos, r.liquido, r.cajaSalud, r.gestoraPatronal]);
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
    var ej = ['1234567', '', 'SC', 'Juan Carlos', 'Pérez', 'López', '', 'M', '15/03/1990', 'BOLIVIANA', '70000000', 'correo@ejemplo.com', 'Asistente', 'Lu - Vi 08:00 - 16:00',
      '01/01/2025', '', '', 'ACTIVO', 3300, 'GANADERO', '1234567890', '12345678', '1234567010', '', ''];
    X.excel('Plantilla_Personal_NUMMEROS.xlsx', [{ nombre: 'Personal', filas: [X.CAMPOS_PERSONAL.map(function (c) { return c[1]; }), ej], anchos: X.CAMPOS_PERSONAL.map(function () { return 16; }) }]);
  };

  global.X = X;
})(window);
