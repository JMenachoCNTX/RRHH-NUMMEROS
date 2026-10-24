/* NUMMEROS RRHH — utilidades de formato, fechas e interfaz */
(function (global) {
  'use strict';
  var U = {};

  U.esc = function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* 4815.03 → "4.815,03" (formato boliviano) */
  U.bs = function (n) {
    n = Calc.r2(n);
    var neg = n < 0; n = Math.abs(n);
    var p = n.toFixed(2).split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '-' : '') + p[0] + ',' + p[1];
  };
  /* 4815.03 → "4815.03" (para archivos de banco/ministerio) */
  U.punto = function (n) { return Calc.r2(n).toFixed(2); };

  U.hoyIso = function () {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  /* "2026-09-30" → "30/09/2026" */
  U.fecha = function (iso) {
    if (!iso) return '';
    var p = String(iso).split('-');
    if (p.length !== 3) return iso;
    return p[2] + '/' + p[1] + '/' + p[0];
  };
  U.fechaLarga = function (iso) {
    var d = Calc.aFecha(iso); if (!d) return '';
    return d.getDate() + ' de ' + Calc.MESES[d.getMonth()].toLowerCase() + ' de ' + d.getFullYear();
  };
  /* Convierte "31/10/1985", "31/10/85", número de Excel o Date → "1985-10-31" */
  U.aIso = function (v) {
    if (v === null || v === undefined || v === '') return '';
    if (v instanceof Date && !isNaN(v)) {
      return v.getFullYear() + '-' + String(v.getMonth() + 1).padStart(2, '0') + '-' + String(v.getDate()).padStart(2, '0');
    }
    if (typeof v === 'number' && v > 20000 && v < 80000) {
      var d = new Date(Math.round((v - 25569) * 86400 * 1000));
      return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
    }
    var s = String(v).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    var m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
    if (m) {
      var a = +m[3]; if (a < 100) a += a > 40 ? 1900 : 2000;
      return a + '-' + String(+m[2]).padStart(2, '0') + '-' + String(+m[1]).padStart(2, '0');
    }
    return '';
  };

  U.id = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };

  U.$ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
  U.$$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };

  U.aviso = function (texto, tipo) {
    var t = document.createElement('div');
    t.className = 'toast' + (tipo ? ' toast-' + tipo : '');
    t.setAttribute('role', 'status');
    t.textContent = texto;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('fuera'); }, 2600);
    setTimeout(function () { t.remove(); }, 3100);
  };

  /* Ventana modal. contenidoHtml + botones [{texto, clase, accion(fn) -> si devuelve false no cierra}] */
  U.modal = function (titulo, contenidoHtml, botones, opciones) {
    opciones = opciones || {};
    var fondo = document.createElement('div');
    fondo.className = 'modal-fondo';
    fondo.innerHTML = '<div class="modal' + (opciones.ancho ? ' modal-ancho' : '') + '" role="dialog" aria-modal="true" aria-label="' + U.esc(titulo) + '">' +
      '<header class="modal-cab"><h3>' + U.esc(titulo) + '</h3><button class="icono-btn" data-cerrar aria-label="Cerrar">×</button></header>' +
      '<div class="modal-cuerpo">' + contenidoHtml + '</div>' +
      '<footer class="modal-pie"></footer></div>';
    var pie = fondo.querySelector('.modal-pie');
    function cerrar() { fondo.remove(); document.removeEventListener('keydown', tecla); }
    function tecla(e) { if (e.key === 'Escape') cerrar(); }
    (botones || [{ texto: 'Cerrar', clase: 'btn' }]).forEach(function (b) {
      var el = document.createElement('button');
      el.className = b.clase || 'btn';
      el.textContent = b.texto;
      el.addEventListener('click', function () {
        if (b.accion && b.accion(fondo) === false) return;
        cerrar();
      });
      pie.appendChild(el);
    });
    fondo.querySelector('[data-cerrar]').addEventListener('click', cerrar);
    fondo.addEventListener('click', function (e) { if (e.target === fondo) cerrar(); });
    document.addEventListener('keydown', tecla);
    document.body.appendChild(fondo);
    var primero = fondo.querySelector('input,select,textarea');
    if (primero) primero.focus();
    return { el: fondo, cerrar: cerrar };
  };

  U.confirmar = function (titulo, texto, textoBoton, accion, peligro) {
    U.modal(titulo, '<p>' + U.esc(texto) + '</p>', [
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: textoBoton || 'Aceptar', clase: 'btn ' + (peligro ? 'btn-peligro' : 'btn-primario'), accion: accion }
    ]);
  };

  /* Descarga de archivos */
  U.descargar = function (nombre, contenido, tipo) {
    var blob = contenido instanceof Blob ? contenido : new Blob([contenido], { type: tipo || 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  U.nombreCompleto = function (e) {
    return [e.nombres, e.apPaterno, e.apMaterno].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  };
  U.apellidos = function (e) { return [e.apPaterno, e.apMaterno].filter(Boolean).join(' '); };
  U.sinAcentos = function (s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  U.mayus = function (s) { return String(s || '').toUpperCase(); };

  global.U = U;
})(window);
