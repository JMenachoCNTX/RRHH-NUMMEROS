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
    { id: 'certificados', titulo: 'Certificados y boletas', icono: 'certificado' },
    { id: 'aguinaldos', titulo: 'Aguinaldos', icono: 'aguinaldo' },
    { grupo: 'Ajustes' },
    { id: 'empresas', titulo: 'Empresas', icono: 'empresa' },
    { id: 'configuracion', titulo: 'Configuración', icono: 'config' }
  ];

  function pintarMenu(actual) {
    U.$('#menu').innerHTML = RUTAS.map(function (r) {
      if (r.grupo) return '<div class="grupo">' + r.grupo + '</div>';
      return '<a href="#/' + r.id + '"' + (r.id === actual ? ' class="activo" aria-current="page"' : '') + ' title="' + r.titulo + '">' + V.ic(r.icono) + '<span class="txt">' + r.titulo + '</span></a>';
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
    var id = partes[0] || 'inicio', param = partes[1], param2 = partes[2];
    var r = RUTAS.find(function (x) { return x.id === id; }) || RUTAS[0];
    cambiosEnEspera = false;
    pintarMenu(r.id);
    pintarEmpresas();
    U.$('#tituloVista').textContent = r.titulo;
    document.title = r.titulo + ' · RRHH NUMMEROS';
    var cont = U.$('#vista');
    try { V[r.id](cont, param, param2); }
    catch (err) {
      console.error(err);
      cont.innerHTML = '<div class="alerta error"><span><b>Algo salió mal al mostrar esta pantalla.</b> ' + U.esc(err.message) + '</span></div>';
    }
    U.$('#app').classList.remove('menu-abierto');
  }

  var App = {
    refrescar: function () { var y = window.scrollY; navegar(); window.scrollTo(0, y); }
  };

  /* ¿La persona está escribiendo o tiene una ventana abierta? Entonces no se repinta la pantalla. */
  function ocupado() {
    if (document.querySelector('.modal-fondo')) return true;
    var a = document.activeElement;
    return !!(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && U.$('#vista').contains(a));
  }
  var cambiosEnEspera = false;
  function alCambioAjeno(col, lista) {
    D.cambioRemoto(col, lista);
    if (ocupado()) {
      if (!cambiosEnEspera) U.aviso('Otra persona guardó cambios. Se verán al cambiar de pantalla.');
      cambiosEnEspera = true;
      return;
    }
    cambiosEnEspera = false;
    App.refrescar();
  }

  /* Al entrar por primera vez: ofrecer subir los datos que estaban guardados solo en esta computadora */
  function ofrecerSubida() {
    var r = D.resumenLocalAntiguo();
    if (!r || r.subido) return;
    var nubeVacia = !D.empresas().length && !D.get().empleados.length && !D.get().planillas.length;
    var detalle = '<b>' + r.empresas + '</b> empresa(s), <b>' + r.empleados + '</b> trabajador(es) y <b>' + r.planillas + '</b> planilla(s)' +
      (r.actualizado ? ', último cambio el ' + new Date(r.actualizado).toLocaleString('es-BO') : '');
    var subir = function () {
      D.subirLocalAntiguo().then(function (ok) {
        App.refrescar();
        if (ok) U.aviso('Listo: los datos de esta computadora ya están en la nube');
      });
    };
    if (nubeVacia) {
      U.modal('Subir tus datos a la nube', '<p>En esta computadora hay datos guardados: ' + detalle + '.</p>' +
        '<p style="margin-top:10px">¿Quieres subirlos a la nube para que todas las personas autorizadas los vean?</p>' +
        '<p class="suave peq" style="margin-top:10px">No se borran de esta computadora: quedan como respaldo.</p>', [
        { texto: 'Ahora no', clase: 'btn btn-fantasma', accion: function () { } },
        { texto: 'Subir a la nube', clase: 'btn btn-primario', accion: subir }
      ]);
    } else {
      U.modal('Datos en esta computadora', '<p>Esta computadora tiene datos antiguos guardados solo aquí: ' + detalle + '.</p>' +
        '<p style="margin-top:10px">La nube <b>ya tiene datos</b> (' + D.empresas().length + ' empresa(s), ' + D.get().empleados.length + ' trabajador(es), ' + D.get().planillas.length + ' planilla(s)).</p>' +
        '<div class="alerta aviso" style="margin-top:10px"><span>Si eliges <b>Reemplazar la nube</b>, lo de la nube se cambia por lo de esta computadora para todos.</span></div>', [
        { texto: 'Usar lo de la nube', clase: 'btn btn-primario', accion: function () { D.marcarLocalSubido(); } },
        { texto: 'Reemplazar la nube', clase: 'btn btn-peligro', accion: subir }
      ]);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    D.cargarPreferencias();
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
    /* En computadora: el botón alterna el menú compacto (solo iconos). En celular: abre el menú. */
    var aplicarMenuMini = function () { U.$('#app').classList.toggle('menu-mini', !!D.get().menuMini); };
    aplicarMenuMini();
    U.$('#btnMenu').addEventListener('click', function () {
      if (matchMedia('(max-width: 900px)').matches) { U.$('#app').classList.toggle('menu-abierto'); return; }
      D.get().menuMini = !D.get().menuMini; D.guardar(); aplicarMenuMini();
    });
    U.$('#app').addEventListener('click', function (ev) { if (ev.target === U.$('#app')) U.$('#app').classList.remove('menu-abierto'); });
    U.$('#btnSalir').addEventListener('click', function () {
      if (N.hayPendientes()) { U.aviso('Espera un momento: todavía se están guardando cambios.', 'error'); return; }
      U.confirmar('Salir', '¿Cerrar tu sesión en esta computadora?', 'Salir', function () { N.salir(); });
    });
    var primeraVez = true;
    N.iniciar(function (nube) {
      D.desdeNube(nube);
      aplicarTema(); aplicarMenuMini();
      var u = N.usuario();
      U.$('#usuarioNube').textContent = u.displayName || u.email;
      U.$('#usuarioNube').title = u.email;
      navegar();
      if (primeraVez) { primeraVez = false; ofrecerSubida(); }
    }, alCambioAjeno);
  });

  global.App = App;
})(window);
