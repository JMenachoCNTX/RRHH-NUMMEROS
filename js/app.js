/* NUMMEROS RRHH — arranque y navegación */
(function (global) {
  'use strict';
  var RUTAS = [
    { id: 'inicio', titulo: 'Inicio', icono: 'inicio' },
    { grupo: 'Mes a mes' },
    { id: 'planilla', titulo: 'Planilla del mes', icono: 'planilla' },
    { id: 'generar', titulo: 'Generar archivos', icono: 'generar' },
    { id: 'historial', titulo: 'Historial', icono: 'historial' },
    { grupo: 'Personal' },
    { id: 'personal', titulo: 'Personal', icono: 'personal' },
    { id: 'certificados', titulo: 'Certificados', icono: 'certificado' },
    { id: 'aguinaldos', titulo: 'Aguinaldos', icono: 'aguinaldo' },
    { grupo: 'Ajustes' },
    { id: 'empresas', titulo: 'Empresas', icono: 'empresa' },
    { id: 'configuracion', titulo: 'Configuración', icono: 'config' }
  ];

  function pintarMenu(actual) {
    U.$('#menu').innerHTML = RUTAS.map(function (r) {
      if (r.grupo) return '<div class="grupo">' + r.grupo + '</div>';
      return '<a href="#/' + r.id + '"' + (r.id === actual ? ' class="activo" aria-current="page"' : '') + '>' + V.ic(r.icono) + r.titulo + '</a>';
    }).join('');
  }

  function pintarEmpresas() {
    var sel = U.$('#selEmpresa'), lista = D.empresas(), act = D.empresaActiva();
    if (!lista.length) { sel.innerHTML = '<option>Sin empresas</option>'; sel.disabled = true; return; }
    sel.disabled = false;
    sel.innerHTML = lista.map(function (x) { return '<option value="' + x.id + '"' + (act && act.id === x.id ? ' selected' : '') + '>' + U.esc(x.razonSocial) + '</option>'; }).join('') +
      '<option value="__nueva">+ Nueva empresa…</option>';
  }

  function aplicarTema() {
    var t = D.tema();
    if (t === 'claro' || t === 'oscuro') document.documentElement.setAttribute('data-tema', t);
    else document.documentElement.removeAttribute('data-tema');
  }

  function navegar() {
    var partes = (location.hash || '#/inicio').replace(/^#\/?/, '').split('/');
    var id = partes[0] || 'inicio', param = partes[1];
    var r = RUTAS.find(function (x) { return x.id === id; }) || RUTAS[0];
    pintarMenu(r.id);
    pintarEmpresas();
    U.$('#tituloVista').textContent = r.titulo;
    document.title = r.titulo + ' · RRHH NUMMEROS';
    var cont = U.$('#vista');
    try { V[r.id](cont, param); }
    catch (err) {
      console.error(err);
      cont.innerHTML = '<div class="alerta error"><span><b>Algo salió mal al mostrar esta pantalla.</b> ' + U.esc(err.message) + '</span></div>';
    }
    U.$('#app').classList.remove('menu-abierto');
  }

  var App = {
    refrescar: function () { var y = window.scrollY; navegar(); window.scrollTo(0, y); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    D.cargar();
    aplicarTema();
    window.addEventListener('hashchange', function () { navegar(); window.scrollTo(0, 0); });
    U.$('#selEmpresa').addEventListener('change', function (ev) {
      if (ev.target.value === '__nueva') { pintarEmpresas(); V.formEmpresa({}); return; }
      D.activarEmpresa(ev.target.value); App.refrescar(); U.aviso('Empresa: ' + D.empresaActiva().razonSocial);
    });
    U.$('#btnTema').addEventListener('click', function () {
      var oscuroAhora = document.documentElement.getAttribute('data-tema') === 'oscuro' ||
        (!document.documentElement.getAttribute('data-tema') && matchMedia('(prefers-color-scheme: dark)').matches);
      D.tema(oscuroAhora ? 'claro' : 'oscuro'); aplicarTema();
    });
    U.$('#btnMenu').addEventListener('click', function () { U.$('#app').classList.toggle('menu-abierto'); });
    U.$('#app').addEventListener('click', function (ev) { if (ev.target === U.$('#app')) U.$('#app').classList.remove('menu-abierto'); });
    navegar();
  });

  global.App = App;
})(window);
