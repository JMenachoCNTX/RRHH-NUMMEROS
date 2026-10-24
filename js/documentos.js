/* NUMMEROS RRHH — documentos para imprimir o guardar en PDF
   Diseño único para todos los documentos (copiado del formato de estados financieros de CONTAX · NUMMEROS):
   carta, encabezado NUMMEROS + CONTAX, barra con datos del cliente (logo MTG), título, tablas con barras
   verde oscuro, firmas y pie "Elaborado por CONTAX · NUMMEROS" con los isotipos. */
(function (global) {
  'use strict';
  var bs = function (n) { return U.bs(n); };
  var e = U.esc;
  var L = {
    nummeros: 'assets/logos/nummeros-logotipo-horizontal-principal.svg',
    contax: 'assets/logos/contax-horizontal-color.svg',
    isoN: 'assets/logos/nummeros-isotipo-principal.svg',
    isoC: 'assets/logos/contax-isotipo-color.svg'
  };

  /* ---------- Marco común de cada hoja ---------- */
  function encabezado(emp, tituloCorto, periodo) {
    var logoCli = emp.logo ? '<img class="dn-logo-cli" src="' + e(emp.logo) + '" alt="' + e(emp.razonSocial) + '">' : '';
    return '<div class="dn-top"><div class="dn-marcas"><img class="dn-l-num" src="' + L.nummeros + '" alt="NUMMEROS"><span class="dn-div"></span>' +
      '<img class="dn-l-ctx" src="' + L.contax + '" alt="CONTAX"></div><span class="dn-lema">Sistemas a la medida de tu empresa</span></div>' +
      '<div class="dn-cab">' + logoCli + '<div class="dn-datos">' + e(U.mayus(emp.razonSocial)) + ' | NIT: ' + e(emp.nit) + (periodo ? ' | ' + e(periodo) : '') + '</div>' +
      '<div class="dn-tcorto">' + e(tituloCorto) + '</div><div class="dn-isos"><img src="' + L.isoN + '" alt="N"><img src="' + L.isoC + '" alt="CONTAX"></div></div>';
  }
  function titulo(t, sub) { return '<div class="dn-titulo"><h2>' + e(U.mayus(t)) + '</h2>' + (sub ? '<p>' + e(sub) + '</p>' : '') + '</div>'; }
  function pie() {
    return '<div class="dn-pie"><span>Elaborado por <b>CONTAX</b> · NUMMEROS</span><div class="dn-isos"><img src="' + L.isoN + '" alt="N"><img src="' + L.isoC + '" alt="CONTAX"></div></div>';
  }
  function firma(nombre, l1, l2) {
    return '<div class="dn-firma"><b>' + e(U.mayus(nombre || '')) + '</b>' + (l1 ? '<span>' + e(l1) + '</span>' : '') + (l2 ? '<span>' + e(l2) + '</span>' : '') + '</div>';
  }
  function firmaRepresentante(emp) { return firma(emp.representante || '', emp.ciRepresentante ? 'C.I.: ' + emp.ciRepresentante : '', emp.cargoRepresentante || 'Representante Legal'); }
  function hoja(contenido, opc) {
    opc = opc || {};
    return '<div class="hoja doc-n' + (opc.horizontal ? ' horizontal' : '') + '">' + contenido + pie() + '</div>';
  }
  function control(txt, ok) { return '<p class="dn-control">' + txt + (ok ? ' ✓' : ' ✗') + '</p>'; }

  var Doc = {};

  /* Envía el HTML a la impresora (el usuario puede elegir "Guardar como PDF") */
  Doc.imprimir = function (html, horizontal) {
    var cont = document.getElementById('impresion');
    cont.innerHTML = '<style>@page{size:letter ' + (horizontal ? 'landscape' : 'portrait') + ';margin:18pt 22pt}</style>' + html;
    var imgs = Array.prototype.slice.call(cont.querySelectorAll('img'));
    Promise.all(imgs.map(function (i) { return i.complete ? 1 : new Promise(function (r) { i.onload = i.onerror = r; }); }))
      .then(function () { setTimeout(function () { window.print(); }, 50); });
  };

  /* ---------- Planilla de sueldos y salarios ---------- */
  Doc.planillaSueldos = function (empresa, p, calc) {
    var periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio;
    var t = calc.totales, cfg = calc.cfg;
    var M = [
      ['Salario ganado (A)', 'salarioGanado'], ['Bono antig. (B)', 'bonoAntiguedad'], ['HE cant.', 'horasExtra', false, true], ['HE monto (C)', 'montoHorasExtra'],
      ['Otros bonos (D)', 'otrosBonos'], ['Total ganado (E)', 'totalGanado', true],
      ['AFP ' + String(cfg.afpLaboral).replace('.', ',') + '% (F)', 'afp'], ['Ap. Nal. Solidario (G)', 'ans'], ['RC-IVA (H)', 'rcIva'],
      ['Anticipos (I)', 'anticipos'], ['Otros desc. (J)', 'otrosDescuentos'], ['Total desc. (K)', 'totalDescuentos'], ['Líquido pagable (E-K)', 'liquido', true]
    ];
    var celda = function (c, v) { var txt = c[3] ? (v || 0) : bs(v); return '<td class="n' + (c[2] ? ' fuerte' : '') + '">' + txt + '</td>'; };
    var filas = calc.filas.map(function (x, i) {
      var em = x.emp, r = x.r;
      return '<tr><td class="c">' + (i + 1) + '</td><td class="c">' + e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + '</td><td class="nom">' + e(U.mayus(U.apellidos(em))) + '<br>' + e(U.mayus(em.nombres)) +
        '</td><td>' + e(em.nacionalidad || 'BOLIVIANA') + '</td><td>' + U.fecha(em.fechaNac) + '</td><td>' + e(em.sexo) + '</td><td class="cargo">' + e(em.cargo) +
        '</td><td>' + U.fecha(em.fechaIngreso) + '</td><td class="n">' + bs(r.basico) + '</td><td class="n">' + r.dias + '</td>' +
        M.map(function (c) { return celda(c, r[c[1]]); }).join('') + '<td class="dn-col-firma"></td></tr>';
    }).join('');
    var ok = Calc.r2(t.totalGanado - t.totalDescuentos) === Calc.r2(t.liquido);
    var cuerpo = encabezado(empresa, 'Planilla de Sueldos', periodo) +
      titulo('Planilla de sueldos y salarios', U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)') +
      '<table class="dn-t dn-mini"><thead><tr><th>Nro</th><th>CI</th><th>Apellidos y nombres</th><th>Nacionalidad</th><th>F. nacim.</th><th>Sexo</th><th>Cargo</th><th>F. ingreso</th>' +
      '<th>Sueldo básico</th><th>Días</th>' + M.map(function (c) { return '<th>' + c[0] + '</th>'; }).join('') + '<th>Firma</th></tr></thead>' +
      '<tbody>' + filas + '</tbody><tfoot><tr><td colspan="8">TOTALES</td><td class="n">' + bs(t.basico) + '</td><td></td>' +
      M.map(function (c) { return celda(c, t[c[1]]); }).join('') + '<td></td></tr></tfoot></table>' +
      control('Total ganado: ' + bs(t.totalGanado) + ' | Descuentos: ' + bs(t.totalDescuentos) + ' | Líquido pagable: ' + bs(t.liquido), ok) +
      '<div class="dn-firmas">' + firmaRepresentante(empresa) + '</div>';
    return hoja(cuerpo, { horizontal: true });
  };

  /* ---------- Planilla de aportes y previsiones ---------- */
  Doc.planillaPatronal = function (empresa, p, calc) {
    var cfg = calc.cfg, periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio;
    var filas = calc.filas.map(function (x, i) {
      var r = x.r;
      return '<tr><td class="c">' + (i + 1) + '</td><td class="c">' + e(x.emp.ci) + '</td><td>' + e(U.mayus(U.nombreCompleto(x.emp))) + '</td><td class="n">' + bs(r.totalGanado) +
        '</td><td class="n">' + bs(r.cajaSalud) + '</td><td class="n">' + bs(r.gestoraPatronal) + '</td><td class="n">' + bs(r.afp + r.ans) + '</td><td class="n fuerte">' + bs(r.totalGestora) +
        '</td><td class="n">' + bs(r.provIndemnizacion) + '</td><td class="n">' + bs(r.provAguinaldo) + '</td></tr>';
    }).join('');
    var t = calc.totales;
    var cuerpo = encabezado(empresa, 'Aportes y Previsiones', periodo) +
      titulo('Planilla de aportes y previsiones', U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)') +
      '<table class="dn-t dn-mini"><thead><tr><th>Nro</th><th>CI</th><th>Nombre</th><th>Total ganado</th><th>Caja de salud ' + cfg.cajaSalud + '%</th><th>Gestora patronal ' + String(cfg.gestoraPatronal).replace('.', ',') +
      '%</th><th>Gestora laboral</th><th>Total Gestora</th><th>Prev. indemnización</th><th>Prev. aguinaldo</th></tr></thead><tbody>' + filas +
      '</tbody><tfoot><tr><td colspan="3">TOTALES</td><td class="n">' + bs(t.totalGanado) + '</td><td class="n">' + bs(t.cajaSalud) + '</td><td class="n">' + bs(t.gestoraPatronal) +
      '</td><td class="n">' + bs(t.afp + t.ans) + '</td><td class="n">' + bs(t.totalGestora) + '</td><td class="n">' + bs(t.provIndemnizacion) + '</td><td class="n">' + bs(t.provAguinaldo) +
      '</td></tr></tfoot></table>' +
      '<div class="dn-firmas">' + firmaRepresentante(empresa) + '</div>';
    return hoja(cuerpo, { horizontal: true });
  };

  /* ---------- Boletas de pago (2 por hoja carta) ---------- */
  function filaBoleta(txt, v, extra) { return '<tr><td>' + txt + (extra ? ' <span class="dn-gris">' + extra + '</span>' : '') + '</td><td class="n">' + bs(v) + '</td></tr>'; }
  function boleta(empresa, p, x, cfg) {
    var em = x.emp, r = x.r, periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio;
    var dato = function (k, v) { return '<div><span>' + k + '</span><b>' + e(v) + '</b></div>'; };
    return '<div class="dn-boleta">' + encabezado(empresa, 'Boleta de Pago', periodo) +
      titulo('Boleta de pago', U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)') +
      '<div class="dn-datos-trab">' + dato('Nombre', U.mayus(U.nombreCompleto(em))) + dato('Sueldo básico', bs(r.basico)) +
      dato('C.I.', em.ci + (em.complemento ? '-' + em.complemento : '')) + dato('Días trabajados', String(r.dias)) +
      dato('Cargo', em.cargo || '') + dato('Fecha de ingreso', U.fecha(em.fechaIngreso)) + '</div>' +
      '<div class="dn-dos"><table class="dn-t"><thead><tr><th colspan="2">Ingresos</th></tr></thead><tbody>' +
      filaBoleta('Salario ganado', r.salarioGanado) + filaBoleta('Bono de antigüedad', r.bonoAntiguedad, r.pctAntiguedad ? r.pctAntiguedad + '%' : '') +
      filaBoleta('Horas extras', r.montoHorasExtra, r.horasExtra ? r.horasExtra + ' h' : '') + filaBoleta('Otros bonos', r.otrosBonos) +
      '</tbody><tfoot><tr><td>TOTAL INGRESOS</td><td class="n">' + bs(r.totalGanado) + '</td></tr></tfoot></table>' +
      '<table class="dn-t"><thead><tr><th colspan="2">Descuentos</th></tr></thead><tbody>' +
      filaBoleta('AFP', r.afp, String(cfg.afpLaboral).replace('.', ',') + '%') + filaBoleta('Aporte Nacional Solidario', r.ans) + filaBoleta('RC-IVA', r.rcIva, '13%') +
      filaBoleta('Anticipos', r.anticipos) + (r.otrosDescuentos ? filaBoleta('Otros descuentos', r.otrosDescuentos) : '') +
      '</tbody><tfoot><tr><td>TOTAL DESCUENTOS</td><td class="n">' + bs(r.totalDescuentos) + '</td></tr></tfoot></table></div>' +
      '<div class="dn-barra-total"><span>LÍQUIDO PAGABLE</span><b>Bs ' + bs(r.liquido) + '</b></div>' +
      '<p class="dn-letras">Son: ' + Calc.numeroALetras(r.liquido) + '</p>' +
      '<div class="dn-firmas">' + firma(U.nombreCompleto(em), 'C.I.: ' + em.ci, 'Recibí conforme') + firma(empresa.representante || '', '', empresa.firmaBoleta || 'Jefe Dpto. Adm. y Finanzas') + '</div>' +
      pie() + '</div>';
  }
  Doc.boletas = function (empresa, p, calc, soloIds) {
    var lista = calc.filas.filter(function (x) { return !soloIds || soloIds.indexOf(x.fila.empleadoId) >= 0; });
    var html = '';
    for (var i = 0; i < lista.length; i += 2) {
      html += '<div class="hoja doc-n dn-hoja-boletas">' + boleta(empresa, p, lista[i], calc.cfg) +
        (lista[i + 1] ? '<div class="dn-corte"></div>' + boleta(empresa, p, lista[i + 1], calc.cfg) : '') + '</div>';
    }
    return html;
  };

  /* ---------- Certificado de trabajo ---------- */
  Doc.certificado = function (empresa, em, opc) {
    opc = opc || {};
    var trato = em.sexo === 'F' ? 'la Sra./Srta.' : 'el Sr.';
    var retirado = em.estado === 'RETIRADO';
    var periodo = !retirado
      ? 'trabaja en nuestra empresa desde el ' + U.fechaLarga(em.fechaIngreso) + ' hasta la fecha'
      : 'trabajó en nuestra empresa desde el ' + U.fechaLarga(em.fechaIngreso) + (em.fechaRetiro ? ' hasta el ' + U.fechaLarga(em.fechaRetiro) : '');
    var sueldo = opc.conSueldo ? ', percibiendo un haber básico mensual de Bs ' + bs(em.sueldoBasico) + ' (' + Calc.numeroALetras(em.sueldoBasico).toLowerCase() + ')' : '';
    var conducta = opc.textoConducta || 'Durante su permanencia demostró responsabilidad, honestidad y dedicación en las funciones encomendadas.';
    var fecha = opc.fecha || U.hoyIso();
    var cuerpo = encabezado(empresa, 'Certificado de Trabajo', U.fecha(fecha)) +
      titulo('Certificado de trabajo', U.mayus(empresa.razonSocial) + ' | ' + U.fecha(fecha)) +
      '<div class="dn-carta">' +
      '<p>Quien suscribe, <b>' + e(empresa.representante || '________________') + '</b>, en calidad de ' + e(empresa.cargoRepresentante || 'Representante Legal') + ' de <b>' + e(empresa.razonSocial) +
      '</b>, con NIT ' + e(empresa.nit) + ':</p>' +
      '<p class="dn-certifica">CERTIFICA</p>' +
      '<p>Que ' + trato + ' <b>' + e(U.nombreCompleto(em)) + '</b>, con cédula de identidad N° ' + e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + (em.expedido ? ' ' + e(em.expedido) : '') +
      ', ' + periodo + ', desempeñando el cargo de <b>' + e(em.cargo || '') + '</b>' + sueldo + '.</p>' +
      '<p>' + e(conducta) + '</p>' +
      '<p>Es cuanto se certifica en honor a la verdad, para los fines que ' + (em.sexo === 'F' ? 'a la interesada' : 'al interesado') + ' convenga.</p>' +
      '<p class="dn-lugar">' + e(empresa.ciudad || 'Santa Cruz') + ', ' + U.fechaLarga(fecha) + '</p></div>' +
      '<div class="dn-firmas dn-firmas-carta">' + firmaRepresentante(empresa) + '</div>';
    return hoja(cuerpo);
  };

  /* ---------- Planilla de aguinaldos ---------- */
  Doc.aguinaldos = function (empresa, anio, filas) {
    var tot = 0;
    var cuerpo = filas.map(function (f, i) {
      tot += f.a.aguinaldo;
      return '<tr><td class="c">' + (i + 1) + '</td><td class="c">' + e(f.emp.ci) + '</td><td>' + e(U.mayus(U.nombreCompleto(f.emp))) + '</td><td>' + e(f.emp.cargo) + '</td><td>' + U.fecha(f.emp.fechaIngreso) +
        '</td>' + f.meses.map(function (m) { return '<td class="n">' + bs(m) + '</td>'; }).join('') + '<td class="n">' + bs(f.a.promedio) + '</td><td class="n">' + f.a.meses +
        '</td><td class="n">' + f.a.dias + '</td><td class="n fuerte">' + bs(f.a.aguinaldo) + '</td><td class="dn-col-firma"></td></tr>';
    }).join('');
    var html = encabezado(empresa, 'Aguinaldo de Navidad', 'Gestión ' + anio) +
      titulo('Planilla de aguinaldo de navidad', U.mayus(empresa.razonSocial) + ' | Gestión ' + anio + ' | (Bs)') +
      '<table class="dn-t dn-mini"><thead><tr><th>Nro</th><th>CI</th><th>Nombre</th><th>Cargo</th><th>F. ingreso</th><th>Septiembre</th><th>Octubre</th><th>Noviembre</th><th>Promedio</th><th>Meses</th><th>Días</th><th>Aguinaldo</th><th>Firma</th></tr></thead>' +
      '<tbody>' + cuerpo + '</tbody><tfoot><tr><td colspan="11">TOTAL AGUINALDOS</td><td class="n">' + bs(tot) + '</td><td></td></tr></tfoot></table>' +
      '<div class="dn-firmas">' + firmaRepresentante(empresa) + '</div>';
    return hoja(html, { horizontal: true });
  };

  /* ---------- Asiento contable de la planilla ---------- */
  Doc.asientoLineas = function (calc) {
    var t = calc.totales;
    var debe = [
      ['Sueldos y salarios', t.salarioGanado + t.bonoProduccion + t.dominicales + t.otrosBonos],
      ['Bono de antigüedad', t.bonoAntiguedad],
      ['Horas extras', t.montoHorasExtra],
      ['Aportes patronales - Caja de salud', t.cajaSalud],
      ['Aportes patronales - Gestora', t.gestoraPatronal],
      ['Previsión para indemnizaciones', t.provIndemnizacion],
      ['Previsión para aguinaldos', t.provAguinaldo]
    ];
    var haber = [
      ['Gestora (aporte laboral + ANS) por pagar', t.afp + t.ans],
      ['Gestora (aporte patronal) por pagar', t.gestoraPatronal],
      ['Caja de salud por pagar', t.cajaSalud],
      ['RC-IVA dependientes por pagar', t.rcIva],
      ['Anticipos al personal', t.anticipos],
      ['Otros descuentos al personal', t.otrosDescuentos],
      ['Sueldos por pagar', t.liquido],
      ['Previsión para indemnizaciones', t.provIndemnizacion],
      ['Aguinaldos por pagar', t.provAguinaldo]
    ];
    return {
      debe: debe.filter(function (l) { return Calc.r2(l[1]) !== 0; }).map(function (l) { return [l[0], Calc.r2(l[1])]; }),
      haber: haber.filter(function (l) { return Calc.r2(l[1]) !== 0; }).map(function (l) { return [l[0], Calc.r2(l[1])]; })
    };
  };
  Doc.asiento = function (empresa, p, calc) {
    var a = Doc.asientoLineas(calc), periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio;
    var sd = 0, sh = 0;
    var tabla = function (titulo, lineas, sec) {
      var s = 0, filas = lineas.map(function (l) { s += l[1]; return '<tr><td>' + e(U.mayus(l[0])) + '</td><td class="n">' + bs(l[1]) + '</td></tr>'; }).join('');
      return { s: s, html: '<table class="dn-t' + (sec ? ' dn-sec' : '') + '"><thead><tr><th>' + titulo + '</th><th class="n">Bs</th></tr></thead><tbody>' + filas +
        '</tbody><tfoot><tr><td>TOTAL ' + titulo + '</td><td class="n">' + bs(s) + '</td></tr></tfoot></table>' };
    };
    var d = tabla('DEBE', a.debe), h = tabla('HABER', a.haber, true);
    sd = d.s; sh = h.s;
    var cuerpo = encabezado(empresa, 'Asiento Contable', periodo) +
      titulo('Asiento contable de planilla de sueldos', U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)') +
      '<div class="dn-dos">' + d.html + h.html + '</div>' +
      control('Debe: ' + bs(sd) + ' | Haber: ' + bs(sh) + ' | Dif: ' + bs(sd - sh), Calc.r2(sd - sh) === 0) +
      '<p class="dn-glosa">Glosa: Por la planilla de sueldos y salarios del mes de ' + Calc.MESES[p.mes - 1].toLowerCase() + ' ' + p.anio + ', aportes patronales y previsiones sociales.</p>' +
      '<div class="dn-firmas">' + firmaRepresentante(empresa) + firma('', '', 'Contador — CONTAX') + '</div>';
    return hoja(cuerpo);
  };

  global.Doc = Doc;
})(window);
