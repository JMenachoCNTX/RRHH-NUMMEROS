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
  /* La representante legal firma todos los documentos; "Elaborado por" es quien prepara la planilla en CONTAX */
  function firmaRepresentante(emp, antes) { return firma(emp.representante || '', emp.ciRepresentante ? 'C.I.: ' + emp.ciRepresentante : '', (antes || '') + (emp.cargoRepresentante || 'Representante Legal')); }
  function firmaElaborado(emp) { return firma(emp.elaboradoPor || '', 'Elaborado por', emp.elaboradoCargo || 'Contador — CONTAX'); }
  function hoja(contenido, opc) {
    opc = opc || {};
    return '<div class="hoja doc-n' + (opc.horizontal ? ' horizontal' : '') + '">' + contenido + pie() + '</div>';
  }
  function control(txt, ok) { return '<p class="dn-control">' + txt + (ok ? ' ✓' : ' ✗') + '</p>'; }

  var Doc = {};

  /* Envía el HTML a la impresora (el usuario puede elegir "Guardar como PDF") */
  /* Si la vista previa está en pantalla completa, el navegador imprimiría solo esa ventana: primero se sale */
  function salirPantallaCompleta() {
    if (!document.fullscreenElement || !document.exitFullscreen) return Promise.resolve();
    return document.exitFullscreen().catch(function () {}).then(function () { return new Promise(function (r) { setTimeout(r, 350); }); });
  }
  /* titulo: nombre con el que se guarda el PDF (el navegador usa el título de la página) */
  Doc.imprimir = function (html, horizontal, titulo) {
    var cont = document.getElementById('impresion');
    if (titulo) {
      var antes = document.title, vuelto = false;
      var volver = function () { if (!vuelto) { vuelto = true; document.title = antes; } };
      document.title = titulo;
      window.addEventListener('afterprint', volver, { once: true });
      setTimeout(volver, 60000);
    }
    cont.innerHTML = '<style>@page{size:letter ' + (horizontal ? 'landscape' : 'portrait') + ';margin:18pt 22pt}</style>' + html;
    var imgs = Array.prototype.slice.call(cont.querySelectorAll('img'));
    Promise.all(imgs.map(function (i) { return i.complete ? 1 : new Promise(function (r) { i.onload = i.onerror = r; }); }))
      .then(salirPantallaCompleta)
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
      '<table class="dn-t dn-mini dn-con-firma"><thead><tr><th>Nro</th><th>CI</th><th>Apellidos y nombres</th><th>Nacionalidad</th><th>F. nacim.</th><th>Sexo</th><th>Cargo</th><th>F. ingreso</th>' +
      '<th>Sueldo básico</th><th>Días</th>' + M.map(function (c) { return '<th>' + c[0] + '</th>'; }).join('') + '<th class="dn-col-firma">Firma</th></tr></thead>' +
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
  function boleta(empresa, p, x, cfg, ejemplar) {
    var em = x.emp, r = x.r, periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio;
    var dato = function (k, v) { return '<div><span>' + k + '</span><b>' + e(v) + '</b></div>'; };
    return '<div class="dn-boleta">' + encabezado(empresa, 'Boleta de Pago', periodo) +
      titulo('Boleta de pago', U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)' + (ejemplar ? ' | EJEMPLAR ' + ejemplar : '')) +
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
      '<div class="dn-firmas">' + firma(U.nombreCompleto(em), 'C.I.: ' + em.ci, 'Recibí conforme') + firmaRepresentante(empresa) + '</div>' +
      pie() + '</div>';
  }
  /* items: [{ p, x, cfg }] → dos boletas por hoja carta */
  function hojasBoletas(empresa, items) {
    var html = '';
    for (var i = 0; i < items.length; i += 2) {
      var a = items[i], b = items[i + 1];
      html += '<div class="hoja doc-n dn-hoja-boletas">' + boleta(empresa, a.p, a.x, a.cfg) +
        (b ? '<div class="dn-corte"></div>' + boleta(empresa, b.p, b.x, b.cfg) : '') + '</div>';
    }
    return html;
  }
  /* duplicado: una hoja por persona con la misma boleta 2 veces (arriba para el trabajador, abajo para la empresa) */
  Doc.boletas = function (empresa, p, calc, soloIds, duplicado) {
    var lista = calc.filas.filter(function (x) { return !soloIds || soloIds.indexOf(x.fila.empleadoId) >= 0; });
    if (duplicado) return lista.map(function (x) {
      return '<div class="hoja doc-n dn-hoja-boletas">' + boleta(empresa, p, x, calc.cfg, 'TRABAJADOR') + '<div class="dn-corte"></div>' + boleta(empresa, p, x, calc.cfg, 'EMPRESA') + '</div>';
    }).join('');
    return hojasBoletas(empresa, lista.map(function (x) { return { p: p, x: x, cfg: calc.cfg }; }));
  };
  /* Boletas de UNA persona en varios meses (para créditos: últimas 3 o 6), del más reciente al más antiguo */
  Doc.boletasPersona = function (empresa, empleadoId, planillas, duplicado) {
    var items = [];
    planillas.forEach(function (p) {
      var c = D.calcularPlanilla(p), x = c.filas.find(function (k) { return k.fila.empleadoId === empleadoId; });
      if (x) items.push({ p: p, x: x, cfg: c.cfg });
    });
    if (duplicado) return items.map(function (it) {
      return '<div class="hoja doc-n dn-hoja-boletas">' + boleta(empresa, it.p, it.x, it.cfg, 'TRABAJADOR') + '<div class="dn-corte"></div>' + boleta(empresa, it.p, it.x, it.cfg, 'EMPRESA') + '</div>';
    }).join('');
    return hojasBoletas(empresa, items);
  };

  /* ---------- Certificado de trabajo ---------- */
  /* Certificado de trabajo en HOJA MEMBRETADA de la empresa (modelo que usaba MTG):
     logo arriba, marca de agua del logo al centro, texto, firma de la representante legal
     y pie con dirección, correo y celular de la empresa. */
  function promedioGanado(em, n) {
    var pls = D.planillas().filter(function (p) { return p.empresaId === em.empresaId && p.filas.some(function (f) { return f.empleadoId === em.id; }); })
      .sort(function (a, b) { return (b.anio * 12 + b.mes) - (a.anio * 12 + a.mes); }).slice(0, n);
    var vals = pls.map(function (p) { var c = D.calcularPlanilla(p), x = c.filas.find(function (k) { return k.fila.empleadoId === em.id; }); return x ? x.r.totalGanado : 0; }).filter(Boolean);
    return vals.length ? { monto: Calc.r2(vals.reduce(function (s, v) { return s + v; }, 0) / vals.length), meses: vals.length } : null;
  }
  function fechaCert(iso) {
    var d = Calc.aFecha(iso); if (!d) return '';
    return String(d.getDate()).padStart(2, '0') + ' de ' + Calc.MESES[d.getMonth()].toLowerCase() + ' de ' + d.getFullYear();
  }
  Doc.certificado = function (empresa, em, opc) {
    opc = opc || {};
    var mujer = em.sexo === 'F', retirado = em.estado === 'RETIRADO';
    var razon = U.mayus(empresa.razonSocial);
    var tratoNom = mujer ? 'la señora' : 'el señor';
    var tratoCorto = (mujer ? 'la Sra. ' : 'el Sr. ') + (em.apPaterno ? em.apPaterno.charAt(0).toUpperCase() + em.apPaterno.slice(1).toLowerCase() : '');
    var ci = e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + (em.expedido ? ' ' + e(em.expedido) : '');
    var periodo = !retirado
      ? 'presta servicios en nuestra empresa <b>' + e(razon) + '</b> desde la fecha ' + fechaCert(em.fechaIngreso)
      : 'prestó servicios en nuestra empresa <b>' + e(razon) + '</b> desde la fecha ' + fechaCert(em.fechaIngreso) + (em.fechaRetiro ? ' hasta el ' + fechaCert(em.fechaRetiro) : '');
    var conducta = (opc.textoConducta || 'Durante el tiempo de su relación laboral, {trato} ha demostrado responsabilidad, compromiso y capacidad en el ejercicio de sus funciones.').replace('{trato}', tratoCorto);
    var sueldo = '';
    var verbo = retirado ? 'percibía' : 'percibe';
    if (opc.conSueldo === '1' || opc.conSueldo === true) {
      sueldo = '<p>Asimismo, se deja constancia que ' + verbo + ' un <b>haber básico mensual de Bs ' + bs(em.sueldoBasico) + ' (' + Calc.numeroALetras(em.sueldoBasico).toLowerCase() + ')</b>.</p>';
    } else if (opc.conSueldo === '2') {
      var pr = promedioGanado(em, 3);
      if (pr) sueldo = '<p>Asimismo, se deja constancia que ' + verbo + ' un <b>ingreso mensual promedio de Bs ' + bs(pr.monto) + ' (' + Calc.numeroALetras(pr.monto).toLowerCase() + ')</b>, correspondiente al total ganado de ' +
        (pr.meses === 1 ? 'su último mes' : 'sus últimos ' + pr.meses + ' meses') + '.</p>';
    }
    var fecha = opc.fecha || U.hoyIso();
    var logo = empresa.logo ? '<img class="cm-logo" src="' + e(empresa.logo) + '" alt="' + e(empresa.razonSocial) + '">' : '<div class="cm-razon">' + e(razon) + '</div>';
    var marca = empresa.logo ? '<img class="cm-agua" src="' + e(empresa.logo) + '" alt="">' : '';
    var pieDatos = [empresa.direccion ? '<b>Dir.:</b> ' + e(empresa.direccion) : '', empresa.correoEmpresa ? '<b>Correo:</b> ' + e(empresa.correoEmpresa) : '',
      empresa.telefono ? '<b>Cel.:</b> ' + e(empresa.telefono) : ''].filter(Boolean).join('&nbsp;&nbsp; ');
    return '<div class="hoja doc-n cert-m">' + marca +
      '<div class="cm-cab">' + logo + '</div>' +
      '<h2 class="cm-titulo">Certificado de Trabajo</h2>' +
      '<div class="cm-texto">' +
      '<p class="cm-sangria">Por la presente, certificamos que ' + tratoNom + ' <b>' + e(U.mayus(U.nombreCompleto(em))) + '</b>, con C.I. Nº ' + ci + ', ' + periodo +
      ', desempeñándose en el cargo de <b>' + e(em.cargo || '') + '</b>.</p>' +
      '<p>' + e(conducta) + '</p>' + sueldo +
      '<p>Se expide el presente certificado a solicitud ' + (mujer ? 'de la interesada' : 'del interesado') + ', para los fines que estime convenientes.</p>' +
      '<p>' + e(empresa.ciudad && !/sierra/i.test(empresa.ciudad) && /santa cruz/i.test(empresa.ciudad) ? 'Santa Cruz de la Sierra' : (empresa.ciudad || 'Santa Cruz de la Sierra')) + ', ' + fechaCert(fecha) + '.</p></div>' +
      '<div class="cm-firma"><span class="cm-linea"></span><b>' + e(empresa.representante || '') + '</b>' + (empresa.ciRepresentante ? '<span>C.I. ' + e(empresa.ciRepresentante) + '</span>' : '') +
      '<span>' + e(empresa.cargoRepresentante || 'Representante Legal') + ' ' + e(razon) + '</span></div>' +
      '<div class="cm-pie">' + (empresa.logo ? '<img src="' + e(empresa.logo) + '" alt="">' : '') + '<span>' + pieDatos + '</span></div>' +
      '<div class="cm-hecho">Elaborado por CONTAX · NUMMEROS</div>' +
      '</div>';
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
      '<table class="dn-t dn-mini dn-con-firma"><thead><tr><th>Nro</th><th>CI</th><th>Nombre</th><th>Cargo</th><th>F. ingreso</th><th>Septiembre</th><th>Octubre</th><th>Noviembre</th><th>Promedio</th><th>Meses</th><th>Días</th><th>Aguinaldo</th><th class="dn-col-firma">Firma</th></tr></thead>' +
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
      '<div class="dn-firmas">' + firmaElaborado(empresa) + firmaRepresentante(empresa) + '</div>';
    return hoja(cuerpo);
  };

  /* ---------- Planilla para auditoría (mismas columnas que el Excel de auditoría) ---------- */
  Doc.auditoria = function (empresa, p, calc) {
    var periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio, A = X.filasAuditoria(calc);
    var sub = 'CORRESPONDIENTE AL MES DE ' + U.mayus(periodo) + ' | (EXPRESADO EN BOLIVIANOS)';
    var celda = function (v, c, tipoFecha, desdeNum) {
      if (tipoFecha.indexOf(c) >= 0) return '<td class="c">' + (v ? U.fecha(v) : '') + '</td>';
      if (c >= desdeNum && typeof v === 'number') return '<td class="n">' + bs(v) + '</td>';
      if (c === 0) return '<td class="c">' + v + '</td>';
      return '<td' + (c === 1 ? ' class="nom"' : c === 6 || c === 3 && desdeNum === 4 ? ' class="cargo"' : '') + '>' + e(v) + '</td>';
    };
    var suma = function (filas, c) { return filas.reduce(function (s, f) { return s + (Number(f[c]) || 0); }, 0); };
    var t1 = '<table class="dn-t dn-mini dn-aud"><thead><tr>' + X.AUD_COLS.map(function (t) { return '<th>' + e(t) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      A.t1.map(function (f) { return '<tr>' + f.map(function (v, c) { return celda(v, c, [4, 7], 8); }).join('') + '</tr>'; }).join('') +
      '</tbody><tfoot><tr><td colspan="9">TOTALES</td>' + X.AUD_COLS.slice(9).map(function (_, k) { return '<td class="n">' + bs(suma(A.t1, k + 9)) + '</td>'; }).join('') + '</tr></tfoot></table>';
    var t2 = '<table class="dn-t dn-mini dn-aud dn-aud2"><thead><tr>' + X.AUD_COLS2.map(function (t) { return '<th>' + e(t) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      A.t2.map(function (f) { return '<tr>' + f.map(function (v, c) { return c === 2 ? '<td class="c">' + e(v) + '</td>' : celda(v, c, [], 4); }).join('') + '</tr>'; }).join('') +
      '</tbody><tfoot><tr><td colspan="4">TOTALES</td>' + X.AUD_COLS2.slice(4).map(function (_, k) { return '<td class="n">' + bs(suma(A.t2, k + 4)) + '</td>'; }).join('') + '</tr></tfoot></table>';
    return hoja(encabezado(empresa, 'Planilla para Auditoría', periodo) + titulo('Planilla de sueldos y salarios', sub) + t1, { horizontal: true }) +
      hoja(encabezado(empresa, 'Planilla para Auditoría', periodo) + titulo('Aportes patronales y previsiones', sub) + t2 +
        '<div class="dn-firmas">' + firmaRepresentante(empresa) + '</div>', { horizontal: true });
  };

  /* ---------- Resumen para gerencia (con gráficos) ----------
     Para que el gerente vea de un vistazo cuánto se paga antes de cargar al banco. */
  var VERDE = '#235347', VERDE_CLARO = '#8EB69B';
  function pct(a, b) { return b ? (a / b * 100).toFixed(1).replace('.', ',') + ' %' : '—'; }
  /* Barras horizontales: [{txt, v, sub}] — un solo color, valor escrito al lado */
  function barrasH(items, opc) {
    opc = opc || {};
    var max = Math.max.apply(null, items.map(function (i) { return i.v; }).concat([1]));
    var W = 568, etq = opc.etiqueta || 180, val = 92, h = opc.alto || 15, gap = 5, ancho = W - etq - val - 8;
    var H = items.length * (h + gap);
    var svg = '<svg class="dn-graf" viewBox="0 0 ' + W + ' ' + H + '" width="100%" role="img" aria-label="' + e(opc.titulo || '') + '">';
    items.forEach(function (it, i) {
      var y = i * (h + gap), w = Math.max(2, it.v / max * ancho);
      svg += '<g><title>' + e(it.txt) + ': Bs ' + bs(it.v) + (it.sub ? ' (' + e(it.sub) + ')' : '') + '</title>' +
        '<text x="0" y="' + (y + h / 2 + 3) + '" class="g-etq">' + e(it.txt) + '</text>' +
        '<rect x="' + etq + '" y="' + y + '" width="' + w.toFixed(1) + '" height="' + h + '" rx="2" fill="' + (it.color || VERDE) + '"/>' +
        '<text x="' + (etq + w + 5).toFixed(1) + '" y="' + (y + h / 2 + 3) + '" class="g-val">' + bs(it.v) + (it.sub ? ' <tspan class="g-sub">' + e(it.sub) + '</tspan>' : '') + '</text></g>';
    });
    return svg + '</svg>';
  }
  /* Barra apilada de una sola fila con las partes de un total */
  function barraPartes(partes, total) {
    var W = 568, H = 22, x = 0;
    var svg = '<svg class="dn-graf" viewBox="0 0 ' + W + ' ' + H + '" width="100%" role="img" aria-label="Composición">';
    partes.forEach(function (p) {
      var w = total ? p.v / total * W : 0; if (w <= 0) return;
      svg += '<g><title>' + e(p.txt) + ': Bs ' + bs(p.v) + ' (' + pct(p.v, total) + ')</title><rect x="' + x.toFixed(1) + '" y="0" width="' + Math.max(0, w - 2).toFixed(1) + '" height="' + H + '" rx="2" fill="' + p.color + '"/></g>';
      x += w;
    });
    return svg + '</svg>';
  }
  Doc.resumenGerente = function (empresa, p, calc, anterior) {
    var t = calc.totales, periodo = Calc.MESES[p.mes - 1] + ' ' + p.anio, r2 = Calc.r2;
    var costo = function (tt) { return r2(tt.totalGanado + tt.cajaSalud + tt.gestoraPatronal + tt.provAguinaldo + tt.provIndemnizacion); };
    var costoTotal = costo(t);
    var heTotal = r2(t.montoHorasExtra), conHE = calc.filas.filter(function (x) { return x.r.horasExtra > 0; }).length;
    var nPagar = calc.filas.filter(function (x) { return x.r.liquido > 0; }).length;
    /* KPIs */
    var kpi = function (txt, v, sub, grande) { return '<div class="dn-kpi' + (grande ? ' grande' : '') + '"><span>' + txt + '</span><b>' + v + '</b>' + (sub ? '<em>' + sub + '</em>' : '') + '</div>'; };
    var kpis = '<div class="dn-kpis">' +
      kpi('Total a transferir por el banco', 'Bs ' + bs(t.liquido), nPagar + ' pago(s) · fecha ' + U.fecha(p.fechaPago || U.hoyIso()), true) +
      kpi('Total ganado (sueldos)', 'Bs ' + bs(t.totalGanado), calc.filas.length + ' persona(s)') +
      kpi('Horas extra', 'Bs ' + bs(heTotal), conHE + ' persona(s) · ' + pct(heTotal, t.totalGanado) + ' del ganado') +
      kpi('Costo total para la empresa', 'Bs ' + bs(costoTotal), 'sueldos + aportes + previsiones') + '</div>';
    /* ¿A dónde va el dinero? */
    var partes = [
      { txt: 'Líquido a pagar al personal', v: t.liquido, color: VERDE, nota: 'se transfiere por el banco' },
      { txt: 'Descuentos al personal', v: r2(t.totalDescuentos), color: '#557363', nota: 'Gestora, ANS, RC-IVA, anticipos y otros' },
      { txt: 'Aportes patronales', v: r2(t.cajaSalud + t.gestoraPatronal), color: VERDE_CLARO, nota: 'Caja ' + calc.cfg.cajaSalud + '% + Gestora ' + String(calc.cfg.gestoraPatronal).replace('.', ',') + '%' },
      { txt: 'Previsiones (aguinaldo + indemnización)', v: r2(t.provAguinaldo + t.provIndemnizacion), color: '#DAF1DE', nota: 'se reservan, no se pagan este mes' }
    ];
    var leyenda = '<div class="dn-leyenda">' + partes.map(function (q) {
      return '<div><i style="background:' + q.color + '"></i><span>' + e(q.txt) + '<em>' + e(q.nota) + '</em></span><b>Bs ' + bs(q.v) + '</b><small>' + pct(q.v, costoTotal) + '</small></div>';
    }).join('') + '</div>';
    var composicion = '<h3 class="dn-sub">¿Cómo se reparte el costo de la planilla? <span>Bs ' + bs(costoTotal) + '</span></h3>' + barraPartes(partes, costoTotal) + leyenda;
    /* Pagos y retenciones: a quién va cada boliviano */
    var destinos = [
      { txt: 'Personal (líquido pagable)', v: t.liquido },
      { txt: 'Gestora Pública (laboral + ANS + patronal)', v: r2(t.afp + t.ans + t.gestoraPatronal) },
      { txt: 'Caja de Salud (' + calc.cfg.cajaSalud + '%)', v: t.cajaSalud },
      { txt: 'Impuestos Nacionales (RC-IVA)', v: t.rcIva },
      { txt: 'Anticipos y otros descuentos', v: r2(t.anticipos + t.otrosDescuentos) }
    ].filter(function (d) { return d.v > 0; });
    var aQuien = '<h3 class="dn-sub">¿A quién se le paga este mes?</h3>' + barrasH(destinos, { etiqueta: 200, titulo: 'Pagos del mes por destino' });
    /* Por banco */
    var porBanco = {};
    calc.filas.forEach(function (x) {
      if (x.r.liquido <= 0) return;
      var dp = X.destinoPago(x.emp), b = D.bancoPorAbrev(dp.banco), k = b ? b.abrev : 'SIN BANCO';
      porBanco[k] = porBanco[k] || { txt: b ? (b.nombre || b.abrev) : 'Sin banco / cuenta', n: 0, v: 0 };
      porBanco[k].n++; porBanco[k].v = r2(porBanco[k].v + x.r.liquido);
    });
    var bancos = Object.keys(porBanco).map(function (k) { var b = porBanco[k]; return { txt: b.txt, v: b.v, sub: b.n + ' pers.', ganadero: k === 'GANADERO' }; })
      .sort(function (a, b) { return b.v - a.v; });
    var tablaBancos = '<table class="dn-t"><thead><tr><th>Banco del trabajador</th><th class="n">Personas</th><th class="n">Monto Bs</th><th class="n">%</th></tr></thead><tbody>' +
      bancos.map(function (b) { return '<tr><td>' + e(b.txt) + (b.ganadero ? ' <span class="dn-gris">(misma entidad)</span>' : ' <span class="dn-gris">(ACH)</span>') + '</td><td class="n">' + b.sub.replace(' pers.', '') + '</td><td class="n">' + bs(b.v) + '</td><td class="n">' + pct(b.v, t.liquido) + '</td></tr>'; }).join('') +
      '</tbody><tfoot><tr><td>TOTAL A TRANSFERIR</td><td class="n">' + nPagar + '</td><td class="n">' + bs(t.liquido) + '</td><td class="n">100 %</td></tr></tfoot></table>';
    /* Comparación con el mes anterior */
    var comp;
    if (anterior) {
      var ta = anterior.calc.totales, pa = Calc.MESES[anterior.p.mes - 1] + ' ' + anterior.p.anio;
      var filaC = function (txt, a, b, esNum) {
        var d = r2(b - a), signo = d > 0 ? '▲ +' : d < 0 ? '▼ −' : '= ';
        var f = function (v) { return esNum ? String(v) : bs(v); };
        return '<tr><td>' + txt + '</td><td class="n">' + f(a) + '</td><td class="n">' + f(b) + '</td><td class="n">' + signo + (esNum ? Math.abs(d) : bs(Math.abs(d))) + (a && !esNum ? ' <span class="dn-gris">(' + pct(Math.abs(d), a) + ')</span>' : '') + '</td></tr>';
      };
      comp = '<h3 class="dn-sub">Comparación con el mes anterior</h3><table class="dn-t"><thead><tr><th>Concepto</th><th class="n">' + e(pa) + '</th><th class="n">' + e(periodo) + '</th><th class="n">Diferencia</th></tr></thead><tbody>' +
        filaC('Personas en planilla', anterior.calc.filas.length, calc.filas.length, true) +
        filaC('Total ganado', ta.totalGanado, t.totalGanado) + filaC('Horas extra', ta.montoHorasExtra, t.montoHorasExtra) +
        filaC('Descuentos al personal', ta.totalDescuentos, t.totalDescuentos) + filaC('Líquido a transferir', ta.liquido, t.liquido) +
        filaC('Costo total para la empresa', costo(ta), costoTotal) + '</tbody></table>';
    } else comp = '<h3 class="dn-sub">Comparación con el mes anterior</h3><p class="dn-glosa">No hay planilla del mes anterior en el sistema para comparar.</p>';
    /* Puntos a revisar antes de pagar */
    var avisos = [];
    if (p.estado !== 'cerrada') avisos.push('La planilla todavía está en <b>borrador</b>: los montos pueden cambiar.');
    var sinCuenta = calc.filas.filter(function (x) { var dp = X.destinoPago(x.emp); return x.r.liquido > 0 && (!dp.cuenta || !D.bancoPorAbrev(dp.banco)); });
    if (sinCuenta.length) avisos.push('Sin banco o cuenta: <b>' + e(sinCuenta.map(function (x) { return U.nombreCompleto(x.emp); }).join(', ')) + '</b>.');
    var terceros = calc.filas.filter(function (x) { return X.destinoPago(x.emp).tercero; });
    if (terceros.length) avisos.push('Pago a tercero autorizado (con carta): <b>' + e(terceros.map(function (x) { return U.nombreCompleto(x.emp) + ' → ' + X.destinoPago(x.emp).nombre; }).join(' · ')) + '</b>.');
    var parcial = calc.filas.filter(function (x) { return x.r.dias < 30; });
    if (parcial.length) avisos.push('Con menos de 30 días: <b>' + e(parcial.map(function (x) { return U.nombreCompleto(x.emp) + ' (' + x.r.dias + ')'; }).join(', ')) + '</b>.');
    if (t.anticipos > 0) avisos.push('Se descuentan anticipos por <b>Bs ' + bs(t.anticipos) + '</b>.');
    var revisar = '<h3 class="dn-sub">Para revisar antes de cargar al banco</h3>' + (avisos.length ? '<ul class="dn-lista">' + avisos.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul>'
      : '<p class="dn-glosa">✓ Todo en orden: todos tienen banco y cuenta, y la planilla está cerrada.</p>');
    /* Página 2: por persona */
    var maxG = Math.max.apply(null, calc.filas.map(function (x) { return x.r.totalGanado; }).concat([1]));
    var filasP = calc.filas.slice().sort(function (a, b) { return b.r.liquido - a.r.liquido; }).map(function (x) {
      var r = x.r, base = r2(r.salarioGanado + r.bonoAntiguedad), extra = r2(r.montoHorasExtra + r.otrosBonos + r.bonoProduccion + r.dominicales);
      var W = 150, w1 = base / maxG * W, w2 = extra / maxG * W;
      var barra = '<svg viewBox="0 0 ' + W + ' 9" width="' + W + 'pt" height="9pt"><title>Sueldo Bs ' + bs(base) + ' · Horas extra y bonos Bs ' + bs(extra) + '</title>' +
        '<rect x="0" y="0" width="' + Math.max(0, w1 - (w2 > 0 ? 1 : 0)).toFixed(1) + '" height="9" rx="1.5" fill="' + VERDE + '"/>' +
        (w2 > 0 ? '<rect x="' + (w1 + 1).toFixed(1) + '" y="0" width="' + Math.max(0.5, w2 - 1).toFixed(1) + '" height="9" rx="1.5" fill="' + VERDE_CLARO + '"/>' : '') + '</svg>';
      return '<tr><td class="nom">' + e(U.mayus(U.nombreCompleto(x.emp))) + '</td><td class="cargo">' + e(x.emp.cargo || '') + '</td><td>' + barra + '</td><td class="n">' + bs(r.totalGanado) +
        '</td><td class="n">' + (r.horasExtra ? r.horasExtra + ' h' : '—') + '</td><td class="n">' + bs(r.totalDescuentos) + '</td><td class="n fuerte">' + bs(r.liquido) + '</td></tr>';
    }).join('');
    var porPersona = '<h3 class="dn-sub">¿Cuánto recibe cada persona? <span>de mayor a menor</span></h3>' +
      '<div class="dn-leyenda dn-ley-linea"><div><i style="background:' + VERDE + '"></i><span>Sueldo y antigüedad</span></div><div><i style="background:' + VERDE_CLARO + '"></i><span>Horas extra y bonos</span></div></div>' +
      '<table class="dn-t dn-mini dn-persona"><thead><tr><th>Nombre</th><th>Cargo</th><th>Composición del ganado</th><th>Total ganado</th><th>Horas extra</th><th>Descuentos</th><th>Líquido</th></tr></thead><tbody>' + filasP +
      '</tbody><tfoot><tr><td colspan="3">TOTAL</td><td class="n">' + bs(t.totalGanado) + '</td><td class="n">' + (t.horasExtra || 0) + ' h</td><td class="n">' + bs(t.totalDescuentos) + '</td><td class="n">' + bs(t.liquido) + '</td></tr></tfoot></table>';
    var sub = U.mayus(empresa.razonSocial) + ' | ' + periodo + ' | (Bs)';
    return hoja(encabezado(empresa, 'Resumen para Gerencia', periodo) + titulo('Resumen de la planilla de sueldos', sub) + kpis + composicion + aQuien +
        '<div class="dn-dos dn-dos-gr"><div><h3 class="dn-sub">Pago por banco</h3>' + tablaBancos + '</div><div>' + revisar + '</div></div><div class="dn-comp">' + comp + '</div>') +
      hoja(encabezado(empresa, 'Resumen para Gerencia', periodo) + titulo('Detalle por persona', sub) + porPersona +
        '<div class="dn-firmas">' + firmaElaborado(empresa) + firmaRepresentante(empresa, 'Aprobado — ') + '</div>');
  };

  global.Doc = Doc;
})(window);
