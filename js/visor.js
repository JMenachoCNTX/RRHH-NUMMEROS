/* NUMMEROS RRHH — visor en pantalla completa
   Muestra documentos (planilla, boletas, asiento…) y archivos Excel (banco, Ministerio, Gestora…)
   antes de imprimirlos o descargarlos. */
(function (global) {
  'use strict';
  var e = U.esc;

  /* Ejecuta un generador de Excel sin descargar: devuelve el libro que habría creado */
  function capturarExcel(fn) {
    var original = XLSX.writeFile, cap = null, res;
    XLSX.writeFile = function (wb, nombre) { cap = { wb: wb, nombre: nombre }; };
    try { res = fn(); } finally { XLSX.writeFile = original; }
    if (cap) cap.resultado = res;
    return cap;
  }

  function fechaDeSerial(n) {
    var d = new Date(Date.UTC(1899, 11, 30) + n * 86400000);
    return String(d.getUTCDate()).padStart(2, '0') + '/' + String(d.getUTCMonth() + 1).padStart(2, '0') + '/' + d.getUTCFullYear();
  }

  /* Hoja de Excel → tabla HTML, respetando colores de encabezado y formatos */
  function hojaAHtml(ws) {
    if (!ws || !ws['!ref']) return '<p class="suave">Hoja vacía.</p>';
    var rg = XLSX.utils.decode_range(ws['!ref']), h = '<table class="tabla visor-tabla"><tbody>';
    var cabecera = -1;
    for (var r = rg.s.r; r <= rg.e.r && cabecera < 0; r++) {
      var llenas = 0;
      for (var c0 = rg.s.c; c0 <= rg.e.c; c0++) if (ws[XLSX.utils.encode_cell({ r: r, c: c0 })]) llenas++;
      if (llenas >= Math.min(4, rg.e.c - rg.s.c + 1)) cabecera = r;
    }
    for (var f = rg.s.r; f <= rg.e.r; f++) {
      h += '<tr>';
      for (var c = rg.s.c; c <= rg.e.c; c++) {
        var cel = ws[XLSX.utils.encode_cell({ r: f, c: c })], txt = '', num = false, estilo = '';
        if (cel) {
          if (cel.t === 'n') {
            num = true;
            if (cel.z && /d|y/.test(String(cel.z))) txt = fechaDeSerial(cel.v);
            else if (cel.z === '0' || Number.isInteger(cel.v) && !(cel.z && /0\.00/.test(cel.z))) txt = String(cel.v);
            else txt = U.bs(cel.v);
          } else txt = String(cel.v === undefined ? '' : cel.v);
          if (cel.s && cel.s.fill && cel.s.fill.fgColor && cel.s.fill.fgColor.rgb) {
            estilo = ' style="background:#' + cel.s.fill.fgColor.rgb.slice(-6) + ';color:#' + ((cel.s.font && cel.s.font.color && cel.s.font.color.rgb) || '000000').slice(-6) + ';font-weight:700"';
          }
        }
        var tag = f === cabecera ? 'th' : 'td';
        h += '<' + tag + (num && tag === 'td' ? ' class="num"' : '') + estilo + '>' + e(txt) + '</' + tag + '>';
      }
      h += '</tr>';
    }
    return h + '</tbody></table>';
  }

  /* opciones: { titulo, vistas: [{ nombre, html | libro, horizontal, aviso }], acciones: [{ texto, icono, primario, fn }] } */
  function abrir(op) {
    var vistas = [];
    (op.vistas || []).forEach(function (v) {
      if (v.libro) {
        v.libro.SheetNames.forEach(function (n) {
          vistas.push({ nombre: (v.nombre ? v.nombre + ' · ' : '') + n, html: '<div class="tabla-caja">' + hojaAHtml(v.libro.Sheets[n]) + '</div>', aviso: v.aviso, excel: true });
        });
      } else vistas.push(v);
    });
    var zoom = 1, actual = 0;
    var fondo = document.createElement('div');
    fondo.className = 'visor';
    fondo.setAttribute('role', 'dialog'); fondo.setAttribute('aria-modal', 'true'); fondo.setAttribute('aria-label', op.titulo);
    fondo.innerHTML = '<header class="visor-cab"><div class="visor-tit"><span class="kicker">Vista previa</span><h3>' + e(op.titulo) + '</h3></div>' +
      '<div class="acciones visor-acc">' +
      '<button class="btn btn-sm" data-z="-1" title="Alejar">−</button><span class="visor-zoom">100%</span><button class="btn btn-sm" data-z="1" title="Acercar">+</button>' +
      '<button class="btn btn-sm" data-pc title="Pantalla completa">' + V.ic('expandir') + '<span>Pantalla completa</span></button>' +
      (op.acciones || []).map(function (a, i) { return '<button class="btn btn-sm' + (a.primario ? ' btn-primario' : '') + '" data-a="' + i + '">' + (a.icono ? V.ic(a.icono) : '') + e(a.texto) + '</button>'; }).join('') +
      '<button class="icono-btn" data-cerrar aria-label="Cerrar" title="Cerrar (Esc)">×</button></div></header>' +
      (vistas.length > 1 ? '<div class="pestanas visor-pest">' + vistas.map(function (v, i) { return '<button data-v="' + i + '">' + e(v.nombre) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="visor-cuerpo"><div class="visor-lienzo"></div></div>';
    document.body.appendChild(fondo);
    var lienzo = U.$('.visor-lienzo', fondo);
    function pintar() {
      var v = vistas[actual];
      lienzo.className = 'visor-lienzo' + (v.excel ? ' es-excel' : ' es-doc');
      lienzo.innerHTML = (v.aviso ? '<div class="alerta aviso" style="margin-bottom:12px"><span>' + v.aviso + '</span></div>' : '') +
        (v.excel ? v.html : '<div class="vista-previa">' + v.html + '</div>');
      lienzo.style.zoom = zoom;
      U.$$('[data-v]', fondo).forEach(function (b) { b.setAttribute('aria-selected', String(+b.dataset.v === actual)); });
      U.$('.visor-zoom', fondo).textContent = Math.round(zoom * 100) + '%';
    }
    function cerrar() {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      fondo.remove(); document.removeEventListener('keydown', tecla); document.body.classList.remove('sin-scroll');
    }
    function tecla(ev) { if (ev.key === 'Escape' && !document.fullscreenElement) cerrar(); }
    U.$$('[data-v]', fondo).forEach(function (b) { b.onclick = function () { actual = +b.dataset.v; pintar(); }; });
    U.$$('[data-z]', fondo).forEach(function (b) { b.onclick = function () { zoom = Math.min(2, Math.max(0.4, Math.round((zoom + 0.1 * b.dataset.z) * 10) / 10)); pintar(); }; });
    U.$('[data-pc]', fondo).onclick = function () {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else if (fondo.requestFullscreen) fondo.requestFullscreen().catch(function () {});
    };
    U.$$('[data-a]', fondo).forEach(function (b) { b.onclick = function () { op.acciones[+b.dataset.a].fn(); }; });
    U.$('[data-cerrar]', fondo).onclick = cerrar;
    document.addEventListener('keydown', tecla);
    document.body.classList.add('sin-scroll');
    pintar();
    /* Los documentos se ajustan al ancho de la pantalla al abrir */
    var ajustar = function () {
      var hoja = U.$('.hoja', lienzo), cuerpo = U.$('.visor-cuerpo', fondo);
      if (!hoja || vistas[actual].excel) return;
      var z = Math.min(1, (cuerpo.clientWidth - 72) / (hoja.offsetWidth || 1));
      zoom = Math.max(0.4, Math.floor(z * 10) / 10); pintar();
    };
    setTimeout(ajustar, 60);
    // Pantalla completa del navegador (si el navegador lo permite)
    if (fondo.requestFullscreen) fondo.requestFullscreen().catch(function () {});
    return { cerrar: cerrar };
  }

  global.Visor = { abrir: abrir, capturarExcel: capturarExcel };
})(window);
