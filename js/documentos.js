/* NUMMEROS RRHH — documentos para imprimir o guardar en PDF
   (Planilla de sueldos, boletas de pago, certificados de trabajo, aguinaldos, asiento contable) */
(function (global) {
  'use strict';
  var bs = function (n) { return U.bs(n); };
  var e = U.esc;

  function cabecera(emp, derecha) {
    return '<div class="doc-cab"><div class="emp"><b>' + e(emp.razonSocial) + '</b>NIT: ' + e(emp.nit) +
      (emp.direccion ? '<br>' + e(emp.direccion) : '') + '<br>' + e(U.mayus(emp.ciudad || 'Santa Cruz')) + ' - BOLIVIA</div>' +
      '<div class="marca-doc">' + (derecha || '') + '</div></div>';
  }
  function pie() { return '<div class="pie-doc">Generado con NUMMEROS RRHH · NUMMEROS by CONTAX</div>'; }

  var Doc = {};

  /* Envía el HTML a la impresora (el usuario puede elegir "Guardar como PDF") */
  Doc.imprimir = function (html, horizontal) {
    var cont = document.getElementById('impresion');
    cont.innerHTML = '<style>@page{size:A4 ' + (horizontal ? 'landscape' : 'portrait') + ';margin:10mm}</style>' + html;
    var imgs = Array.prototype.slice.call(cont.querySelectorAll('img'));
    Promise.all(imgs.map(function (i) { return i.complete ? 1 : new Promise(function (r) { i.onload = i.onerror = r; }); }))
      .then(function () { setTimeout(function () { window.print(); }, 50); });
  };

  /* ---------- Planilla de sueldos y salarios ---------- */
  Doc.planillaSueldos = function (empresa, p, calc) {
    var mesTxt = Calc.MESES[p.mes - 1];
    var filas = calc.filas.map(function (x, i) {
      var em = x.emp, r = x.r;
      return '<tr><td class="n">' + (i + 1) + '</td><td>' + e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + '</td><td>' + e(em.nombres) + '</td><td>' + e(U.apellidos(em)) +
        '</td><td>' + e(em.nacionalidad || 'BOLIVIANA') + '</td><td>' + U.fecha(em.fechaNac) + '</td><td>' + e(em.sexo) + '</td><td>' + e(em.cargo) +
        '</td><td>' + U.fecha(em.fechaIngreso) + '</td><td class="n">' + bs(r.basico) + '</td><td class="n">' + r.dias + '</td><td class="n">' + r.horasDia +
        '</td><td class="n">' + bs(r.salarioGanado) + '</td><td class="n">' + bs(r.bonoAntiguedad) + '</td><td class="n">' + (r.horasExtra || 0) +
        '</td><td class="n">' + bs(r.montoHorasExtra) + '</td><td class="n">' + bs(r.bonoProduccion) + '</td><td class="n">' + bs(r.dominicales) +
        '</td><td class="n">' + bs(r.otrosBonos) + '</td><td class="n"><b>' + bs(r.totalGanado) + '</b></td><td class="n">' + bs(r.afp) +
        '</td><td class="n">' + bs(r.ans) + '</td><td class="n">' + bs(r.rcIva) + '</td><td class="n">' + bs(r.anticipos) +
        '</td><td class="n">' + bs(r.totalDescuentos) + '</td><td class="n"><b>' + bs(r.liquido) + '</b></td><td style="width:60px"></td></tr>';
    }).join('');
    var t = calc.totales;
    var cfg = calc.cfg;
    var html = '<div class="hoja horizontal">' + cabecera(empresa, '<img src="assets/logos/nummeros-logotipo-horizontal-principal.svg" alt="">NUMMEROS RRHH') +
      '<div class="doc-titulo"><h2>PLANILLA DE SUELDOS Y SALARIOS</h2><p>Correspondiente al mes de ' + mesTxt + ' de ' + p.anio + ' · (Expresado en bolivianos)</p></div>' +
      '<table class="doc"><thead><tr><th>Nro</th><th>CI</th><th>Nombre(s)</th><th>Apellido(s)</th><th>Nacionalidad</th><th>Fecha de nacimiento</th><th>Sexo</th><th>Ocupación que desempeña</th><th>Fecha de ingreso</th>' +
      '<th>Sueldo básico</th><th>Días pagados</th><th>Horas/día</th><th>Salario ganado (A)</th><th>Bono antigüedad (B)</th><th>HE cant.</th><th>HE monto (C)</th>' +
      '<th>Bono producción (D)</th><th>Dominicales (E)</th><th>Otros bonos (F)</th><th>Total ganado (G)</th><th>AFP ' + String(cfg.afpLaboral).replace('.', ',') + '% (H)</th>' +
      '<th>Aporte Nal. Solidario (I)</th><th>RC-IVA 13% (J)</th><th>Anticipos y otros (K)</th><th>Total desc. (L)</th><th>Líquido pagable (G-L)</th><th>Firma</th></tr></thead>' +
      '<tbody>' + filas + '</tbody><tfoot><tr><td colspan="9">TOTALES</td><td class="n">' + bs(t.basico) + '</td><td></td><td></td><td class="n">' + bs(t.salarioGanado) +
      '</td><td class="n">' + bs(t.bonoAntiguedad) + '</td><td class="n">' + t.horasExtra + '</td><td class="n">' + bs(t.montoHorasExtra) + '</td><td class="n">' + bs(t.bonoProduccion) +
      '</td><td class="n">' + bs(t.dominicales) + '</td><td class="n">' + bs(t.otrosBonos) + '</td><td class="n">' + bs(t.totalGanado) + '</td><td class="n">' + bs(t.afp) +
      '</td><td class="n">' + bs(t.ans) + '</td><td class="n">' + bs(t.rcIva) + '</td><td class="n">' + bs(t.anticipos) + '</td><td class="n">' + bs(t.totalDescuentos) +
      '</td><td class="n">' + bs(t.liquido) + '</td><td></td></tr></tfoot></table>' +
      '<div class="firmas"><div>' + e(empresa.representante || '') + '<br>' + e(U.mayus(empresa.cargoRepresentante || 'Gerente General')) + '</div></div>' + pie() + '</div>';
    return html;
  };

  /* ---------- Planilla de aportes patronales ---------- */
  Doc.planillaPatronal = function (empresa, p, calc) {
    var cfg = calc.cfg;
    var filas = calc.filas.map(function (x, i) {
      var r = x.r;
      return '<tr><td class="n">' + (i + 1) + '</td><td>' + e(x.emp.ci) + '</td><td>' + e(U.nombreCompleto(x.emp)) + '</td><td class="n">' + bs(r.totalGanado) +
        '</td><td class="n">' + bs(r.cajaSalud) + '</td><td class="n">' + bs(r.gestoraPatronal) + '</td><td class="n">' + bs(r.afp + r.ans) + '</td><td class="n">' + bs(r.totalGestora) +
        '</td><td class="n">' + bs(r.provIndemnizacion) + '</td><td class="n">' + bs(r.provAguinaldo) + '</td></tr>';
    }).join('');
    var t = calc.totales;
    return '<div class="hoja">' + cabecera(empresa, 'NUMMEROS RRHH') +
      '<div class="doc-titulo"><h2>PLANILLA DE APORTES Y PREVISIONES</h2><p>' + Calc.MESES[p.mes - 1] + ' ' + p.anio + ' · (Expresado en bolivianos)</p></div>' +
      '<table class="doc"><thead><tr><th>Nro</th><th>CI</th><th>Nombre</th><th>Total ganado</th><th>Caja de salud ' + cfg.cajaSalud + '%</th><th>Gestora patronal ' + String(cfg.gestoraPatronal).replace('.', ',') +
      '%</th><th>Gestora laboral</th><th>Total a pagar Gestora</th><th>Prev. indemnización</th><th>Prev. aguinaldo</th></tr></thead><tbody>' + filas +
      '</tbody><tfoot><tr><td colspan="3">TOTALES</td><td class="n">' + bs(t.totalGanado) + '</td><td class="n">' + bs(t.cajaSalud) + '</td><td class="n">' + bs(t.gestoraPatronal) +
      '</td><td class="n">' + bs(t.afp + t.ans) + '</td><td class="n">' + bs(t.totalGestora) + '</td><td class="n">' + bs(t.provIndemnizacion) + '</td><td class="n">' + bs(t.provAguinaldo) +
      '</td></tr></tfoot></table>' + pie() + '</div>';
  };

  /* ---------- Boletas de pago (2 por hoja A4) ---------- */
  function boleta(empresa, p, x) {
    var em = x.emp, r = x.r, mes = Calc.MESES[p.mes - 1];
    var ingresos = r.totalGanado, egresos = r.totalDescuentos;
    return '<div class="boleta">' + cabecera(empresa, '<img src="assets/logos/nummeros-logotipo-horizontal-principal.svg" alt="">') +
      '<div class="doc-titulo" style="margin:0"><h2>BOLETA DE PAGO</h2><p>(Expresado en bolivianos)</p></div>' +
      '<div class="datos"><div><span>NOMBRE:</span> <b>' + e(U.nombreCompleto(em)) + '</b></div><div><span>SUELDO BÁSICO:</span> ' + bs(r.basico) + '</div>' +
      '<div><span>C.I.:</span> ' + e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + '</div><div><span>DÍAS TRABAJADOS:</span> ' + r.dias + '</div>' +
      '<div><span>CARGO:</span> ' + e(em.cargo) + '</div><div><span>MES:</span> ' + mes + ' ' + p.anio + '</div>' +
      '<div><span>F. INGRESO:</span> ' + U.fecha(em.fechaIngreso) + '</div><div><span>' + (em.banco ? 'BANCO:' : '') + '</span> ' + e(em.banco || '') + (em.cuenta ? ' · ' + e(em.cuenta) : '') + '</div></div>' +
      '<div class="cols"><div><h4>INGRESOS</h4>' +
      '<div class="linea"><span>Salario ganado</span><span>' + bs(r.salarioGanado) + '</span></div>' +
      '<div class="linea"><span>Bono de antigüedad' + (r.pctAntiguedad ? ' (' + r.pctAntiguedad + '%)' : '') + '</span><span>' + bs(r.bonoAntiguedad) + '</span></div>' +
      '<div class="linea"><span>Horas extras' + (r.horasExtra ? ' (' + r.horasExtra + ' h)' : '') + '</span><span>' + bs(r.montoHorasExtra) + '</span></div>' +
      (r.bonoProduccion ? '<div class="linea"><span>Bono de producción</span><span>' + bs(r.bonoProduccion) + '</span></div>' : '') +
      (r.dominicales ? '<div class="linea"><span>Dominicales</span><span>' + bs(r.dominicales) + '</span></div>' : '') +
      '<div class="linea"><span>Otros bonos</span><span>' + bs(r.otrosBonos) + '</span></div>' +
      '<div class="linea t"><span>TOTAL INGRESOS</span><span>' + bs(ingresos) + '</span></div></div>' +
      '<div><h4>EGRESOS</h4>' +
      '<div class="linea"><span>AFP (' + String(x.cfg.afpLaboral).replace('.', ',') + '%)</span><span>' + bs(r.afp) + '</span></div>' +
      '<div class="linea"><span>Aporte Nacional Solidario</span><span>' + bs(r.ans) + '</span></div>' +
      '<div class="linea"><span>RC-IVA (13%)</span><span>' + bs(r.rcIva) + '</span></div>' +
      '<div class="linea"><span>Anticipos y otros descuentos</span><span>' + bs(r.anticipos) + '</span></div>' +
      '<div class="linea t"><span>TOTAL EGRESOS</span><span>' + bs(egresos) + '</span></div></div></div>' +
      '<div class="liquido"><span>LÍQUIDO PAGABLE (I - E)</span><span>Bs ' + bs(r.liquido) + '</span></div>' +
      '<div class="letras">Son: ' + Calc.numeroALetras(r.liquido) + '</div>' +
      '<div class="firmas"><div>RECIBÍ CONFORME<br>' + e(U.nombreCompleto(em)) + '</div><div>' + e(U.mayus(empresa.firmaBoleta || 'Jefe Dpto. Adm. y Finanzas')) + '</div></div></div>';
  }
  Doc.boletas = function (empresa, p, calc, soloIds) {
    var lista = calc.filas.filter(function (x) { return !soloIds || soloIds.indexOf(x.fila.empleadoId) >= 0; });
    var html = '';
    for (var i = 0; i < lista.length; i += 2) {
      lista[i].cfg = calc.cfg; if (lista[i + 1]) lista[i + 1].cfg = calc.cfg;
      html += '<div class="hoja">' + boleta(empresa, p, lista[i]) + (lista[i + 1] ? boleta(empresa, p, lista[i + 1]) : '') + '</div>';
    }
    return html;
  };

  /* ---------- Certificado de trabajo ---------- */
  Doc.certificado = function (empresa, em, opc) {
    opc = opc || {};
    var trato = em.sexo === 'F' ? 'la Sra./Srta.' : 'el Sr.';
    var vigente = !em.fechaRetiro || em.estado !== 'RETIRADO';
    var periodo = vigente
      ? 'trabaja en nuestra empresa desde el ' + U.fechaLarga(em.fechaIngreso) + ' hasta la fecha'
      : 'trabajó en nuestra empresa desde el ' + U.fechaLarga(em.fechaIngreso) + ' hasta el ' + U.fechaLarga(em.fechaRetiro);
    var sueldo = opc.conSueldo ? ', percibiendo un haber básico mensual de Bs ' + bs(em.sueldoBasico) + ' (' + Calc.numeroALetras(em.sueldoBasico).toLowerCase() + ')' : '';
    var conducta = opc.textoConducta || 'Durante su permanencia demostró responsabilidad, honestidad y dedicación en las funciones encomendadas.';
    return '<div class="hoja">' + cabecera(empresa, '<img src="assets/logos/nummeros-logotipo-horizontal-principal.svg" alt="">') +
      '<div class="cert"><h2>CERTIFICADO DE TRABAJO</h2>' +
      '<p>Quien suscribe, <b>' + e(empresa.representante || '________________') + '</b>, en calidad de ' + e(empresa.cargoRepresentante || 'Gerente General') + ' de <b>' + e(empresa.razonSocial) +
      '</b>, con NIT ' + e(empresa.nit) + ':</p>' +
      '<p style="text-align:center;font-weight:700;letter-spacing:.2em">CERTIFICA</p>' +
      '<p>Que ' + trato + ' <b>' + e(U.nombreCompleto(em)) + '</b>, con cédula de identidad N° ' + e(em.ci) + (em.complemento ? '-' + e(em.complemento) : '') + (em.expedido ? ' ' + e(em.expedido) : '') +
      ', ' + periodo + ', desempeñando el cargo de <b>' + e(em.cargo || '') + '</b>' + sueldo + '.</p>' +
      '<p>' + e(conducta) + '</p>' +
      '<p>Es cuanto se certifica en honor a la verdad, para los fines que ' + (em.sexo === 'F' ? 'a la interesada' : 'al interesado') + ' convenga.</p>' +
      '<p class="lugar">' + e(empresa.ciudad || 'Santa Cruz') + ', ' + U.fechaLarga(opc.fecha || U.hoyIso()) + '</p>' +
      '<div class="firmas"><div>' + e(empresa.representante || '') + '<br>' + e(U.mayus(empresa.cargoRepresentante || 'Gerente General')) + '<br>' + e(empresa.razonSocial) + '</div></div></div>' + pie() + '</div>';
  };

  /* ---------- Planilla de aguinaldos ---------- */
  Doc.aguinaldos = function (empresa, anio, filas) {
    var tot = 0;
    var cuerpo = filas.map(function (f, i) {
      tot += f.a.aguinaldo;
      return '<tr><td class="n">' + (i + 1) + '</td><td>' + e(f.emp.ci) + '</td><td>' + e(U.nombreCompleto(f.emp)) + '</td><td>' + e(f.emp.cargo) + '</td><td>' + U.fecha(f.emp.fechaIngreso) +
        '</td>' + f.meses.map(function (m) { return '<td class="n">' + bs(m) + '</td>'; }).join('') + '<td class="n">' + bs(f.a.promedio) + '</td><td class="n">' + f.a.meses +
        '</td><td class="n">' + f.a.dias + '</td><td class="n"><b>' + bs(f.a.aguinaldo) + '</b></td><td style="width:60px"></td></tr>';
    }).join('');
    return '<div class="hoja horizontal">' + cabecera(empresa, 'NUMMEROS RRHH') +
      '<div class="doc-titulo"><h2>PLANILLA DE AGUINALDO DE NAVIDAD</h2><p>Gestión ' + anio + ' · (Expresado en bolivianos)</p></div>' +
      '<table class="doc"><thead><tr><th>Nro</th><th>CI</th><th>Nombre</th><th>Cargo</th><th>Fecha ingreso</th><th>Septiembre</th><th>Octubre</th><th>Noviembre</th><th>Promedio</th><th>Meses</th><th>Días</th><th>Aguinaldo</th><th>Firma</th></tr></thead>' +
      '<tbody>' + cuerpo + '</tbody><tfoot><tr><td colspan="11">TOTAL</td><td class="n">' + bs(tot) + '</td><td></td></tr></tfoot></table>' +
      '<div class="firmas"><div>' + e(empresa.representante || '') + '<br>' + e(U.mayus(empresa.cargoRepresentante || 'Gerente General')) + '</div></div>' + pie() + '</div>';
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
      ['Anticipos al personal / otros descuentos', t.anticipos],
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
    var a = Doc.asientoLineas(calc);
    var sd = 0, sh = 0, filas = '';
    a.debe.forEach(function (l) { sd += l[1]; filas += '<tr><td>' + e(l[0]) + '</td><td class="n">' + bs(l[1]) + '</td><td></td></tr>'; });
    a.haber.forEach(function (l) { sh += l[1]; filas += '<tr><td style="padding-left:28px">' + e(l[0]) + '</td><td></td><td class="n">' + bs(l[1]) + '</td></tr>'; });
    return '<div class="hoja">' + cabecera(empresa, 'NUMMEROS RRHH') +
      '<div class="doc-titulo"><h2>ASIENTO CONTABLE DE PLANILLA DE SUELDOS</h2><p>' + Calc.MESES[p.mes - 1] + ' ' + p.anio + ' · (Expresado en bolivianos)</p></div>' +
      '<table class="doc"><thead><tr><th style="text-align:left">Cuenta</th><th>Debe</th><th>Haber</th></tr></thead><tbody>' + filas +
      '</tbody><tfoot><tr><td>SUMAS IGUALES</td><td class="n">' + bs(sd) + '</td><td class="n">' + bs(sh) + '</td></tr></tfoot></table>' +
      '<p style="margin-top:10px;font-size:10px">Glosa: Por la planilla de sueldos y salarios del mes de ' + Calc.MESES[p.mes - 1].toLowerCase() + ' ' + p.anio + ', aportes patronales y previsiones sociales.</p>' + pie() + '</div>';
  };

  global.Doc = Doc;
})(window);
