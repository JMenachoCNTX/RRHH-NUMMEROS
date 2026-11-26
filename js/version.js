/* NUMMEROS RRHH — aviso de versión nueva
   VERSION es la versión de los archivos que tiene abiertos esta persona.
   Cada pocos minutos se consulta version.json (lo último publicado en GitHub). Si es distinta,
   aparece un aviso con las novedades y el botón «Actualizar ahora».
   AL PUBLICAR un cambio: poner el MISMO valor nuevo en VERSION (aquí), en version.json y en los ?v= de index.html. */
(function (global) {
  'use strict';
  var VERSION = '20261126-2';
  var CADA = 5 * 60 * 1000;          // revisar cada 5 minutos
  var POSPONER = 30 * 60 * 1000;     // «Más tarde» vuelve a avisar en 30 minutos
  var pospuestoHasta = 0, mostrada = null;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function actualizar(nueva) {
    var ir = function () {
      /* La dirección con ?v=… obliga al navegador a traer la página nueva y no la guardada */
      location.replace(location.pathname + '?v=' + encodeURIComponent(nueva) + location.hash);
    };
    if (global.N && N.hayPendientes && N.hayPendientes()) {
      if (global.U) U.aviso('Terminando de guardar tus cambios…');
      var espera = setInterval(function () { if (!N.hayPendientes()) { clearInterval(espera); ir(); } }, 500);
      return;
    }
    ir();
  }

  function mostrarAviso(info) {
    if (mostrada === info.version && document.getElementById('avisoVersion')) return;
    var viejo = document.getElementById('avisoVersion'); if (viejo) viejo.remove();
    mostrada = info.version;
    var el = document.createElement('div');
    el.id = 'avisoVersion'; el.className = 'aviso-version'; el.setAttribute('role', 'alert');
    var nov = (info.novedades || []).slice(0, 5);
    el.innerHTML = '<div class="av-texto"><b>Hay una versión nueva del sistema</b>' + (info.fecha ? ' <span class="av-fecha">(' + esc(info.fecha) + ')</span>' : '') +
      (nov.length ? '<ul>' + nov.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '') +
      '<small>Tus datos están guardados en la nube: actualizar no borra nada.</small></div>' +
      '<div class="av-botones"><button class="btn btn-primario" data-av="si">Actualizar ahora</button><button class="btn btn-fantasma" data-av="luego">Más tarde</button></div>';
    el.querySelector('[data-av="si"]').onclick = function () { actualizar(info.version); };
    el.querySelector('[data-av="luego"]').onclick = function () { pospuestoHasta = Date.now() + POSPONER; el.remove(); };
    document.body.appendChild(el);
  }

  function revisar() {
    if (Date.now() < pospuestoHasta || !global.fetch) return;
    fetch('version.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (info) { if (info && info.version && info.version !== VERSION) mostrarAviso(info); })
      .catch(function () { /* sin internet: se vuelve a intentar más tarde */ });
  }

  /* Quita el ?v=… de la dirección después de actualizar, para que quede limpia */
  if (/[?&]v=/.test(location.search) && global.history && history.replaceState) {
    history.replaceState(null, '', location.pathname + location.hash);
  }

  global.addEventListener('load', function () { setTimeout(revisar, 3000); });
  setInterval(revisar, CADA);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') revisar(); });
  global.addEventListener('online', revisar);

  global.VersionApp = { VERSION: VERSION, revisar: revisar };
})(window);
