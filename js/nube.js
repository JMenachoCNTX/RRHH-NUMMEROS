/* NUMMEROS RRHH — conexión con la nube (Firebase, proyecto rrhh-nummeros)
   - Ingreso con cuenta de Google. Solo entran los correos autorizados (ver firestore.rules).
   - Cada empresa, trabajador y planilla es un documento en Firestore. La configuración va en ajustes/general.
   - Cada documento guarda los datos como texto JSON en el campo «d» (así no hay problemas de formato).
   - Los cambios de otras personas llegan solos (en vivo).
   Los datos de esta configuración NO son secretos: la seguridad la dan las reglas de Firestore. */
(function (global) {
  'use strict';

  var CONFIG = {
    apiKey: 'AIzaSyCenKm6kPTGNyJSgxQ0D4Uj0VpoxvHIUtA',
    authDomain: 'rrhh-nummeros.firebaseapp.com',
    projectId: 'rrhh-nummeros',
    storageBucket: 'rrhh-nummeros.firebasestorage.app',
    messagingSenderId: '509764478026',
    appId: '1:509764478026:web:cd934702c1e3173254f2b3'
  };
  var DUENO = 'info@contaxbolivia.com';           // administrador principal (igual que en firestore.rules)
  var COLECCIONES = ['empresas', 'empleados', 'planillas', 'ajustes'];
  var LIMITE = 900 * 1024;                          // Firestore admite hasta 1 MB por documento

  var db = null, auth = null, usuario = null, esAdmin = false;
  var ultimo = {};        // 'coleccion/id' -> texto JSON tal como está en la nube
  var datos = {};         // coleccion -> lista de objetos recibidos
  var cortes = [];        // para dejar de escuchar al salir
  var pendientes = 0;     // escrituras en curso

  function $(s) { return document.querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- Indicador «Guardado en la nube» en la barra ---------- */
  function estadoNube(tipo, texto) {
    var el = $('#estadoNube'); if (!el) return;
    el.className = 'estado-nube ' + tipo;
    el.title = texto;
    el.querySelector('span').textContent = texto;
  }
  function actualizarIndicador() {
    if (!navigator.onLine) estadoNube('sin-red', 'Sin internet: se guardará al volver la conexión');
    else if (pendientes > 0) estadoNube('guardando', 'Guardando…');
    else estadoNube('ok', 'Guardado en la nube');
  }
  global.addEventListener('online', actualizarIndicador);
  global.addEventListener('offline', actualizarIndicador);
  global.addEventListener('beforeunload', function (ev) {
    if (pendientes > 0) { ev.preventDefault(); ev.returnValue = 'Todavía se están guardando cambios.'; }
  });

  /* ---------- Pantalla de ingreso ---------- */
  function pantallaAcceso(html) {
    var el = $('#acceso');
    if (!el) { el = document.createElement('div'); el.id = 'acceso'; el.className = 'acceso'; document.body.appendChild(el); }
    el.innerHTML = '<div class="acceso-caja">' +
      '<img class="acceso-logo" src="assets/logos/nummeros-logotipo-horizontal-principal.svg" alt="NUMMEROS">' +
      '<p class="acceso-sub">Recursos Humanos y planillas de sueldos</p>' + html +
      '<div class="acceso-pie"><small>Servicio contable</small><img src="assets/logos/contax-horizontal-color.svg" alt="CONTAX"></div></div>';
    el.hidden = false;
    document.body.classList.add('sin-sesion');
    return el;
  }
  function quitarAcceso() {
    var el = $('#acceso'); if (el) el.hidden = true;
    document.body.classList.remove('sin-sesion');
  }
  var G_ICONO = '<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  function mostrarIngreso(error) {
    var el = pantallaAcceso('<h2>Bienvenido</h2><p class="suave">Entra con tu cuenta de Google. Solo pueden entrar las personas autorizadas.</p>' +
      (error ? '<div class="alerta error"><span>' + esc(error) + '</span></div>' : '') +
      '<button class="btn btn-primario btn-google" id="btnGoogle">' + G_ICONO + 'Entrar con Google</button>');
    el.querySelector('#btnGoogle').onclick = entrar;
  }

  function entrar() {
    var prov = new firebase.auth.GoogleAuthProvider();
    prov.setCustomParameters({ prompt: 'select_account' });
    auth.signInWithPopup(prov).catch(function (err) {
      if (err && (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment')) {
        return auth.signInWithRedirect(prov);
      }
      if (err && (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request')) return;
      mostrarIngreso('No se pudo entrar: ' + (err && err.message ? err.message : err));
    });
  }

  function mostrarNoAutorizado(correo) {
    var el = pantallaAcceso('<h2>Sin permiso</h2><div class="alerta error"><span>La cuenta <b>' + esc(correo) + '</b> todavía no está autorizada para usar el sistema.</span></div>' +
      '<p class="suave">Pide al administrador que la agregue en <b>Configuración → Personas con acceso</b>.</p>' +
      '<button class="btn" id="btnOtra">Entrar con otra cuenta</button>');
    el.querySelector('#btnOtra').onclick = function () { auth.signOut(); };
  }

  /* ---------- Escuchar los datos de la nube ---------- */
  function escuchar(alListo, alCambioAjeno) {
    var recibidas = {}, listo = false;
    COLECCIONES.forEach(function (col) {
      var corte = db.collection(col).onSnapshot(function (snap) {
        var ajeno = false, lista = [], vistos = {};
        snap.forEach(function (doc) {
          var clave = col + '/' + doc.id, txt = (doc.data() || {}).d;
          if (typeof txt !== 'string') return;
          vistos[clave] = true;
          if (ultimo[clave] !== txt) { ajeno = true; ultimo[clave] = txt; }
          try { var obj = JSON.parse(txt); lista.push(obj); } catch (e) { console.warn('Documento dañado', clave); }
        });
        Object.keys(ultimo).forEach(function (k) {
          if (k.indexOf(col + '/') === 0 && !vistos[k]) { delete ultimo[k]; ajeno = true; }
        });
        datos[col] = lista;
        recibidas[col] = true;
        if (!listo && COLECCIONES.every(function (c) { return recibidas[c]; })) {
          listo = true; quitarAcceso(); actualizarIndicador(); alListo(datos);
        } else if (listo && ajeno) {
          alCambioAjeno(col, lista);
        }
      }, function (err) {
        console.error(err);
        if (err && err.code === 'permission-denied') { detener(); mostrarNoAutorizado(usuario && usuario.email); }
        else estadoNube('error', 'Error de conexión con la nube');
      });
      cortes.push(corte);
    });
  }
  function detener() { cortes.forEach(function (f) { try { f(); } catch (e) { } }); cortes = []; ultimo = {}; datos = {}; }

  /* ---------- Guardar: solo se suben los documentos que cambiaron ---------- */
  function documentosDe(estado) {
    var m = {};
    (estado.empresas || []).forEach(function (x) { if (x && x.id) m['empresas/' + x.id] = x; });
    (estado.empleados || []).forEach(function (x) { if (x && x.id) m['empleados/' + x.id] = x; });
    (estado.planillas || []).forEach(function (x) { if (x && x.id) m['planillas/' + x.id] = x; });
    m['ajustes/general'] = { config: estado.config };
    return m;
  }

  function guardar(estado) {
    if (!db || !usuario) return Promise.resolve(false);
    var deseado = documentosDe(estado), ops = [], grandes = [];
    Object.keys(deseado).forEach(function (k) {
      var txt = JSON.stringify(deseado[k]);
      if (ultimo[k] === txt) return;
      if (txt.length > LIMITE) { grandes.push(k); return; }
      ops.push({ k: k, txt: txt });
    });
    Object.keys(ultimo).forEach(function (k) { if (!(k in deseado)) ops.push({ k: k, borrar: true }); });
    if (grandes.length) U.aviso('Un registro es demasiado grande para guardarse en la nube (¿un logo muy pesado?). Usa un logo más liviano.', 'error');
    if (!ops.length) return Promise.resolve(true);

    var lotes = [];
    for (var i = 0; i < ops.length; i += 400) lotes.push(ops.slice(i, i + 400));
    pendientes++; actualizarIndicador();
    var anteriores = {};
    var promesas = lotes.map(function (lote) {
      var b = db.batch();
      lote.forEach(function (op) {
        var p = op.k.split('/'), ref = db.collection(p[0]).doc(p[1]);
        anteriores[op.k] = ultimo[op.k];
        if (op.borrar) { b.delete(ref); delete ultimo[op.k]; }
        else {
          b.set(ref, { d: op.txt, en: firebase.firestore.FieldValue.serverTimestamp(), por: usuario.email });
          ultimo[op.k] = op.txt;
        }
      });
      return b.commit();
    });
    return Promise.all(promesas).then(function () {
      pendientes--; actualizarIndicador(); return true;
    }).catch(function (err) {
      pendientes--;
      console.error(err);
      /* Si falló, se olvida lo «último» para que el próximo guardado lo vuelva a intentar */
      Object.keys(anteriores).forEach(function (k) { if (anteriores[k] === undefined) delete ultimo[k]; else ultimo[k] = '__reintentar__'; });
      estadoNube('error', 'No se pudo guardar en la nube');
      U.aviso('No se pudo guardar en la nube: ' + (err.code === 'permission-denied' ? 'tu cuenta no tiene permiso.' : (err.message || err)), 'error');
      return false;
    });
  }

  /* ---------- Personas con acceso ---------- */
  function listarAutorizados() {
    return db.collection('autorizados').get().then(function (s) {
      var l = []; s.forEach(function (d) { l.push(Object.assign({ correo: d.id }, d.data())); });
      return l.sort(function (a, b) { return a.correo.localeCompare(b.correo); });
    });
  }
  function autorizar(correo, nombre, admin) {
    correo = String(correo || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return Promise.reject(new Error('Escribe un correo válido.'));
    return db.collection('autorizados').doc(correo).set({ nombre: nombre || '', admin: !!admin, agregadoPor: usuario.email, en: firebase.firestore.FieldValue.serverTimestamp() });
  }
  function quitarAutorizado(correo) { return db.collection('autorizados').doc(correo).delete(); }

  function revisarAdmin() {
    var correo = (usuario.email || '').toLowerCase();
    if (correo === DUENO) { esAdmin = true; return Promise.resolve(); }
    return db.collection('autorizados').doc(correo).get().then(function (d) {
      esAdmin = !!(d.exists && d.data().admin);
    }).catch(function () { esAdmin = false; });
  }

  /* ---------- Arranque ---------- */
  function iniciar(alListo, alCambioAjeno) {
    if (!global.firebase) {
      pantallaAcceso('<div class="alerta error"><span>No se pudo conectar con la nube. Revisa tu internet y vuelve a cargar la página.</span></div>');
      return;
    }
    firebase.initializeApp(CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    pantallaAcceso('<p class="suave">Conectando…</p>');
    auth.getRedirectResult().catch(function (err) { mostrarIngreso('No se pudo entrar: ' + err.message); });
    auth.onAuthStateChanged(function (u) {
      detener();
      usuario = u;
      if (!u) { mostrarIngreso(); return; }
      pantallaAcceso('<p class="suave">Cargando datos de la nube…</p>');
      revisarAdmin().then(function () { escuchar(alListo, alCambioAjeno); });
    });
  }

  global.N = {
    iniciar: iniciar,
    guardar: guardar,
    salir: function () { return auth.signOut().then(function () { location.hash = '#/inicio'; }); },
    usuario: function () { return usuario; },
    esAdmin: function () { return esAdmin; },
    hayPendientes: function () { return pendientes > 0; },
    listarAutorizados: listarAutorizados,
    autorizar: autorizar,
    quitarAutorizado: quitarAutorizado,
    DUENO: DUENO
  };
})(window);
