/* NUMMEROS RRHH — pantallas del sistema */
(function (global) {
  'use strict';
  var e = U.esc, bs = U.bs;

  /* ---------- Íconos (trazo) ---------- */
  var IC = {
    inicio: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    empresa: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h3M8 12h3M8 16h3M3 21h18"/>',
    personal: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
    planilla: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M15 9v11"/>',
    generar: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/>',
    aguinaldo: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2-4-6-4-6-1s6 1 6 1zM12 8c2-4 6-4 6-1s-6 1-6 1z"/>',
    certificado: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h5"/>',
    historial: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    imprimir: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    excel: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l8 8M16 8l-8 8"/>',
    banco: '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
    subir: '<path d="M12 21V9"/><path d="M7 14l5-5 5 5"/><path d="M4 3h16"/>',
    editar: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    borrar: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    gobierno: '<path d="M4 21h16M5 21V11M19 21V11M9 21v-6h6v6M3 11l9-7 9 7z"/>',
    salud: '<path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11z"/><path d="M12 9v6M9 12h6"/>',
    impuesto: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    boleta: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    libro: '<path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>'
  };
  function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || '') + '</svg>'; }

  var V = { ic: ic };
  var hoy = new Date();

  function sinEmpresa() {
    return '<div class="tarjeta vacio"><img src="assets/fotos/apreton-manos-claro.jpg" alt="">' +
      '<h3>Primero registra una empresa</h3><p>El sistema trabaja por empresa: cada una tiene su personal y sus planillas.</p>' +
      '<a class="btn btn-primario" href="#/empresas">' + ic('mas') + 'Registrar empresa</a></div>';
  }
  function opcionesMes(sel) { return Calc.MESES.map(function (m, i) { return '<option value="' + (i + 1) + '"' + (sel === i + 1 ? ' selected' : '') + '>' + m + '</option>'; }).join(''); }
  function opcionesAnio(sel) { var h = ''; for (var a = hoy.getFullYear() + 1; a >= 2023; a--) h += '<option' + (a === sel ? ' selected' : '') + '>' + a + '</option>'; return h; }
  function nombrePeriodo(p) { return Calc.MESES[p.mes - 1] + ' ' + p.anio; }

  /* Mes que normalmente se está pagando: el mes anterior */
  function periodoSugerido() { var d = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1); return { anio: d.getFullYear(), mes: d.getMonth() + 1 }; }

  /* =========================================================
     INICIO
     ========================================================= */
  V.inicio = function (cont) {
    var emp = D.empresaActiva();
    var personal = emp ? D.empleados().filter(function (x) { return x.estado !== 'RETIRADO'; }) : [];
    var planillas = emp ? D.planillas() : [];
    var ultima = planillas[0];
    var calc = ultima ? D.calcularPlanilla(ultima) : null;
    var ps = periodoSugerido();

    var h = '<section class="portada" style="background-image:url(assets/fotos/arquimedes-saludo-claro.jpg)"><div class="txt">' +
      '<span class="kicker">NUMMEROS × CONTAX</span><h1>Recursos Humanos sin hojas de cálculo</h1>' +
      '<p>Tu personal, las planillas de sueldos y todos los archivos para bancos, Ministerio de Trabajo, Gestora, Caja de Salud e Impuestos en un solo lugar.</p>' +
      '<div class="acciones">' + (emp ? '<a class="btn btn-primario" href="#/planilla">' + ic('planilla') + 'Planilla de ' + Calc.MESES[ps.mes - 1] + '</a><a class="btn" href="#/personal">' + ic('personal') + 'Ver personal</a>'
        : '<a class="btn btn-primario" href="#/empresas">' + ic('mas') + 'Registrar la primera empresa</a>') + '</div></div></section>';

    if (emp) {
      h += '<div class="rejilla r4 seccion">' +
        '<div class="tarjeta kpi"><span class="etq">Personal activo</span><span class="val">' + personal.length + '</span></div>' +
        '<div class="tarjeta kpi"><span class="etq">Total ganado' + (ultima ? ' · ' + nombrePeriodo(ultima) : '') + '</span><span class="val">' + (calc ? bs(calc.totales.totalGanado) : '—') + '<small>Bs</small></span></div>' +
        '<div class="tarjeta kpi"><span class="etq">Líquido pagable</span><span class="val">' + (calc ? bs(calc.totales.liquido) : '—') + '<small>Bs</small></span></div>' +
        '<div class="tarjeta kpi"><span class="etq">Aportes patronales</span><span class="val">' + (calc ? bs(calc.totales.cajaSalud + calc.totales.gestoraPatronal) : '—') + '<small>Bs</small></span></div></div>';
    }

    var tieneEmp = !!emp, tienePers = personal.length > 0, tienePl = emp && !!D.planillaDe(emp.id, ps.anio, ps.mes);
    h += '<div class="seccion"><h2>Cómo se usa, cada mes</h2><div class="pasos">' +
      '<a class="paso' + (tieneEmp ? ' hecho' : '') + '" href="#/empresas"><b>Empresa</b><span>Datos de la empresa, NIT y bancos (una sola vez).</span></a>' +
      '<a class="paso' + (tienePers ? ' hecho' : '') + '" href="#/personal"><b>Personal</b><span>Altas, bajas y datos de cada trabajador. Puedes importar tu Excel.</span></a>' +
      '<a class="paso' + (tienePl ? ' hecho' : '') + '" href="#/planilla"><b>Planilla del mes</b><span>Días, horas extra, bonos y descuentos. El sistema calcula todo.</span></a>' +
      '<a class="paso" href="#/generar"><b>Generar archivos</b><span>Bancos, Ministerio, Gestora, Caja, Impuestos, boletas y asiento.</span></a></div></div>';

    if (emp && planillas.length) {
      h += '<div class="seccion"><h2>Últimas planillas</h2><div class="tabla-caja"><table class="tabla"><thead><tr><th>Periodo</th><th>Estado</th><th class="num">Personas</th><th class="num">Total ganado</th><th class="num">Líquido pagable</th><th></th></tr></thead><tbody>' +
        planillas.slice(0, 5).map(function (p) {
          var c = D.calcularPlanilla(p);
          return '<tr><td class="nombre">' + nombrePeriodo(p) + '</td><td><span class="etiqueta ' + p.estado + '">' + (p.estado === 'cerrada' ? 'Cerrada' : 'Borrador') + '</span></td><td class="num">' + c.filas.length +
            '</td><td class="num">' + bs(c.totales.totalGanado) + '</td><td class="num">' + bs(c.totales.liquido) + '</td><td><a class="btn btn-sm" href="#/planilla/' + p.id + '">Abrir</a></td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }
    cont.innerHTML = h;
  };

  /* =========================================================
     EMPRESAS
     ========================================================= */
  V.empresas = function (cont) {
    var lista = D.empresas();
    var h = '<div class="tarjeta-cab"><div><span class="kicker">Clientes de CONTAX</span><h2 style="font-size:30px">Empresas</h2><p class="suave">Cada empresa tiene su propio personal, planillas y datos bancarios.</p></div>' +
      '<button class="btn btn-primario" id="nuevaEmp">' + ic('mas') + 'Nueva empresa</button></div>';
    if (!lista.length) {
      h += '<div class="tarjeta vacio"><img src="assets/fotos/apreton-manos-claro.jpg" alt=""><h3>Aún no hay empresas</h3><p>Registra la primera empresa para empezar a cargar su personal.</p></div>';
    } else {
      h += '<div class="rejilla r3">' + lista.map(function (x) {
        var n = D.empleados(x.id).filter(function (k) { return k.estado !== 'RETIRADO'; }).length;
        var activa = (D.empresaActiva() || {}).id === x.id;
        return '<div class="tarjeta"><div class="tarjeta-cab" style="margin-bottom:8px"><div><h3>' + e(x.razonSocial) + '</h3><p class="suave peq">NIT ' + e(x.nit) + ' · ' + e(x.ciudad || '') + '</p></div>' +
          (activa ? '<span class="etiqueta cerrada">En uso</span>' : '') + '</div><p class="peq">' + n + ' trabajador(es) activo(s)</p>' +
          '<div class="acciones" style="margin-top:14px">' + (activa ? '' : '<button class="btn btn-sm btn-primario" data-usar="' + x.id + '">Usar esta empresa</button>') +
          '<button class="btn btn-sm" data-editar="' + x.id + '">' + ic('editar') + 'Editar</button></div></div>';
      }).join('') + '</div>';
    }
    cont.innerHTML = h;
    U.$('#nuevaEmp', cont).onclick = function () { formEmpresa({}); };
    U.$$('[data-editar]', cont).forEach(function (b) { b.onclick = function () { formEmpresa(D.empresa(b.dataset.editar)); }; });
    U.$$('[data-usar]', cont).forEach(function (b) { b.onclick = function () { D.activarEmpresa(b.dataset.usar); App.refrescar(); U.aviso('Empresa seleccionada'); }; });
  };

  function campo(etq, nombre, valor, tipo, extra) {
    extra = extra || {};
    var inp;
    if (tipo === 'select') {
      inp = '<select name="' + nombre + '">' + extra.opciones.map(function (o) {
        var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o;
        return '<option value="' + e(v) + '"' + (String(valor === undefined || valor === null ? '' : valor) === String(v) ? ' selected' : '') + '>' + e(t) + '</option>';
      }).join('') + '</select>';
    } else if (tipo === 'textarea') {
      inp = '<textarea name="' + nombre + '">' + e(valor || '') + '</textarea>';
    } else {
      inp = '<input name="' + nombre + '" type="' + (tipo || 'text') + '" value="' + e(valor === undefined || valor === null ? '' : valor) + '"' +
        (extra.req ? ' required' : '') + (extra.paso ? ' step="' + extra.paso + '"' : '') + (extra.ph ? ' placeholder="' + e(extra.ph) + '"' : '') + (tipo === 'number' ? ' inputmode="decimal"' : '') + '>';
    }
    return '<label class="campo' + (extra.ancho ? ' ancho' : '') + '">' + e(etq) + inp + (extra.ayuda ? '<span class="ayuda">' + e(extra.ayuda) + '</span>' : '') + '</label>';
  }
  function leerForm(raiz) {
    var o = {};
    U.$$('input[name],select[name],textarea[name]', raiz).forEach(function (i) {
      var v = i.type === 'checkbox' ? (i.checked ? '1' : '0') : i.value.trim();
      var partes = i.name.split('.');
      if (partes.length === 2) { o[partes[0]] = o[partes[0]] || {}; o[partes[0]][partes[1]] = v; } else o[i.name] = v;
    });
    return o;
  }

  function formEmpresa(x) {
    var html = '<form class="form" id="fEmp">' +
      '<fieldset class="ancho"><legend>Datos generales</legend><div class="form">' +
      campo('Razón social', 'razonSocial', x.razonSocial, 'text', { req: true, ph: 'Ej. MILTHAGOR S.R.L.' }) + campo('NIT', 'nit', x.nit, 'text', { req: true }) +
      campo('Ciudad', 'ciudad', x.ciudad || 'Santa Cruz') + campo('Dirección', 'direccion', x.direccion) +
      campo('Representante legal', 'representante', x.representante) + campo('Cargo del representante', 'cargoRepresentante', x.cargoRepresentante || 'Gerente General') +
      campo('Firma en boletas', 'firmaBoleta', x.firmaBoleta || 'Jefe Dpto. Adm. y Finanzas', 'text', { ayuda: 'Texto bajo la segunda firma de la boleta' }) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Seguridad social y Ministerio</legend><div class="form">' +
      campo('N° de empleador (Ministerio)', 'nroEmpleadorMinisterio', x.nroEmpleadorMinisterio) + campo('N° patronal Caja de Salud', 'nroPatronalCaja', x.nroPatronalCaja) +
      campo('Código Caja de Salud (Ministerio)', 'cajaSaludCod', x.cajaSaludCod || '6', 'text', { ayuda: 'Código que pide el formulario del Ministerio (ej. 6)' }) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Pago de sueldos · Banco Ganadero</legend><div class="form">' +
      campo('Sucursal destino (Ganadero)', 'sucursalBanco', x.sucursalBanco || 'SCZ', 'text', { ayuda: 'Se usa en las transferencias ACH a otros bancos' }) +
      '</div></fieldset></form>';
    U.modal(x.id ? 'Editar empresa' : 'Nueva empresa', html, [
      x.id ? { texto: 'Eliminar', clase: 'btn btn-fantasma', accion: function () { U.confirmar('Eliminar empresa', 'Se borrará la empresa con todo su personal y planillas. Esta acción no se puede deshacer.', 'Eliminar', function () { D.eliminarEmpresa(x.id); App.refrescar(); }, true); } } : null,
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: 'Guardar', clase: 'btn btn-primario', accion: function (m) {
        var f = U.$('#fEmp', m);
        if (!f.reportValidity()) return false;
        var d = leerForm(f); d.id = x.id; delete d.bmsc; delete d.bancoPagos;
        D.guardarEmpresa(d);
        if (!x.id) D.activarEmpresa(d.id);
        App.refrescar(); U.aviso('Empresa guardada');
      } }
    ].filter(Boolean), { ancho: true });
  }
  V.formEmpresa = formEmpresa;

  /* =========================================================
     PERSONAL
     ========================================================= */
  var filtroPers = { texto: '', estado: 'ACTIVO' };
  V.personal = function (cont) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    var todos = D.empleados();
    var h = '<div class="tarjeta-cab"><div><span class="kicker">' + e(emp.razonSocial) + '</span><h2 style="font-size:30px">Personal</h2><p class="suave">Base de datos del personal: datos personales, bancarios y de seguridad social.</p></div>' +
      '<div class="acciones"><button class="btn" id="btnImportar">' + ic('subir') + 'Importar Excel</button><button class="btn" id="btnExpPers">' + ic('excel') + 'Descargar Excel</button>' +
      '<button class="btn btn-primario" id="btnNuevo">' + ic('mas') + 'Nuevo trabajador</button></div></div>';
    if (!todos.length) {
      h += '<div class="tarjeta vacio"><img src="assets/fotos/apreton-manos-claro.jpg" alt=""><h3>Aún no hay personal registrado</h3>' +
        '<p>Agrega a cada trabajador o importa tu hoja "Datos_Personales" desde Excel / Google Sheets (Archivo → Descargar → Excel).</p>' +
        '<div class="acciones"><button class="btn btn-primario" id="btnImportar2">' + ic('subir') + 'Importar desde Excel</button><button class="btn" id="btnPlantilla">' + ic('excel') + 'Descargar plantilla</button></div></div>';
      cont.innerHTML = h;
      U.$('#btnImportar2', cont).onclick = importarPersonal;
      U.$('#btnImportar', cont).onclick = importarPersonal;
      U.$('#btnExpPers', cont).onclick = function () { X.plantillaPersonal(); };
      U.$('#btnPlantilla', cont).onclick = function () { X.plantillaPersonal(); };
    } else {
      h += '<div class="acciones" style="margin-bottom:14px"><div class="buscador">' + ic('buscar') + '<input id="busca" placeholder="Buscar por nombre, CI o cargo" value="' + e(filtroPers.texto) + '"></div>' +
        '<div class="pestanas" style="margin:0" role="tablist">' + [['ACTIVO', 'Activos'], ['RETIRADO', 'Retirados'], ['', 'Todos']].map(function (t) {
          return '<button role="tab" data-est="' + t[0] + '" aria-selected="' + (filtroPers.estado === t[0]) + '">' + t[1] + ' (' + todos.filter(function (k) { return !t[0] || (k.estado || 'ACTIVO') === t[0]; }).length + ')</button>';
        }).join('') + '</div></div><div class="tabla-caja" style="max-height:66vh"><table class="tabla"><thead><tr><th class="fija">Nombre</th><th>CI</th><th>Cargo</th><th>Ingreso</th><th class="num">Sueldo básico</th><th>Banco</th><th>Cuenta</th><th>CUA</th><th>Estado</th></tr></thead><tbody id="tbPers"></tbody></table></div>';
      cont.innerHTML = h;
      var pintar = function () {
        var t = U.sinAcentos(filtroPers.texto.toLowerCase());
        var lista = todos.filter(function (k) {
          if (filtroPers.estado && (k.estado || 'ACTIVO') !== filtroPers.estado) return false;
          if (!t) return true;
          return U.sinAcentos((U.nombreCompleto(k) + ' ' + k.ci + ' ' + (k.cargo || '')).toLowerCase()).indexOf(t) >= 0;
        });
        U.$('#tbPers', cont).innerHTML = lista.map(function (k) {
          var falta = !k.cuenta || !k.cua || !k.fechaNac;
          return '<tr data-id="' + k.id + '" style="cursor:pointer"><td class="nombre fija">' + e(U.nombreCompleto(k)) + (falta ? ' <span class="etiqueta borrador" title="Faltan datos (cuenta, CUA o fecha de nacimiento)">Completar</span>' : '') +
            '</td><td>' + e(k.ci) + '</td><td>' + e(k.cargo) + '</td><td>' + U.fecha(k.fechaIngreso) + '</td><td class="num">' + bs(k.sueldoBasico) + '</td><td>' + e(k.banco) +
            '</td><td>' + e(k.cuenta) + '</td><td>' + e(k.cua) + '</td><td><span class="etiqueta ' + ((k.estado || 'ACTIVO') === 'RETIRADO' ? 'retirado' : '') + '">' + e(k.estado || 'ACTIVO') + '</span></td></tr>';
        }).join('') || '<tr><td colspan="9" class="suave">No hay resultados.</td></tr>';
        U.$$('#tbPers tr[data-id]', cont).forEach(function (tr) { tr.onclick = function () { formEmpleado(D.empleado(tr.dataset.id)); }; });
      };
      pintar();
      U.$('#busca', cont).oninput = function (ev) { filtroPers.texto = ev.target.value; pintar(); };
      U.$$('[data-est]', cont).forEach(function (b) { b.onclick = function () { filtroPers.estado = b.dataset.est; V.personal(cont); }; });
      U.$('#btnImportar', cont).onclick = importarPersonal;
      U.$('#btnExpPers', cont).onclick = function () { X.personal(emp, todos); };
    }
    U.$('#btnNuevo', cont).onclick = function () { formEmpleado({ estado: 'ACTIVO', nacionalidad: 'BOLIVIANA' }); };
  };

  function formEmpleado(x) {
    var bancos = [['', '— Elegir —']].concat(D.BANCOS.map(function (b) { return [b.abrev, b.abrev + ' · ' + b.nombre]; }));
    if (x.banco && !D.bancoPorAbrev(x.banco)) bancos.push([x.banco, x.banco]);
    var html = '<form class="form" id="fEmpl">' +
      '<fieldset class="ancho"><legend>Datos personales</legend><div class="form">' +
      campo('Nombre(s)', 'nombres', x.nombres, 'text', { req: true }) + campo('Apellido paterno', 'apPaterno', x.apPaterno) + campo('Apellido materno', 'apMaterno', x.apMaterno) +
      campo('Apellido de casada', 'apCasada', x.apCasada) +
      campo('Tipo de documento', 'tipoDoc', x.tipoDoc || 'CI', 'select', { opciones: [['CI', 'Cédula de identidad'], ['CE', 'Cédula de extranjero'], ['PASAPORTE', 'Pasaporte']] }) +
      campo('N° de documento', 'ci', x.ci, 'text', { req: true }) + campo('Complemento', 'complemento', x.complemento) +
      campo('Expedido en', 'expedido', x.expedido, 'select', { opciones: ['', 'SC', 'LP', 'CB', 'OR', 'PT', 'CH', 'TJ', 'BE', 'PD'] }) +
      campo('Fecha de nacimiento', 'fechaNac', x.fechaNac, 'date') + campo('Sexo', 'sexo', x.sexo || 'M', 'select', { opciones: [['M', 'Masculino'], ['F', 'Femenino']] }) +
      campo('Nacionalidad', 'nacionalidad', x.nacionalidad || 'BOLIVIANA') + campo('Celular', 'celular', x.celular) + campo('Correo', 'correo', x.correo, 'email') +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Trabajo</legend><div class="form">' +
      campo('Cargo', 'cargo', x.cargo, 'text', { req: true }) + campo('Sueldo básico (Bs)', 'sueldoBasico', x.sueldoBasico, 'number', { req: true, paso: '0.01' }) +
      campo('Fecha de ingreso', 'fechaIngreso', x.fechaIngreso, 'date', { req: true }) + campo('Horario', 'horario', x.horario, 'text', { ph: 'Lu - Vi 08:00 - 16:00' }) +
      campo('Estado', 'estado', x.estado || 'ACTIVO', 'select', { opciones: ['ACTIVO', 'RETIRADO'] }) + campo('Fecha de retiro', 'fechaRetiro', x.fechaRetiro, 'date') +
      campo('Motivo de retiro', 'motivoRetiro', x.motivoRetiro, 'select', { opciones: [['', '—'], ['1', 'Renuncia voluntaria'], ['2', 'Despido / retiro forzoso'], ['3', 'Conclusión de contrato'], ['4', 'Jubilación'], ['5', 'Fallecimiento'], ['6', 'Otro']] }) +
      campo('Enlace del contrato', 'enlaceContrato', x.enlaceContrato, 'url', { ph: 'https://drive.google.com/…' }) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Pago y banco</legend><div class="form">' +
      campo('Banco', 'banco', x.banco, 'select', { opciones: bancos }) + campo('N° de cuenta', 'cuenta', x.cuenta) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Seguridad social e impuestos</legend><div class="form">' +
      campo('CUA / NUA (Gestora)', 'cua', x.cua) + campo('Código dependiente RC-IVA (CUR)', 'codDependiente', x.codDependiente, 'text', { ayuda: 'Código del F-110 (ej. 5896481019)' }) +
      campo('Código Caja de Salud', 'cajaSaludCod', x.cajaSaludCod, 'text', { ph: 'Vacío = el de la empresa' }) + campo('Código AFP (Ministerio)', 'afpCod', x.afpCod || '3') +
      campo('¿Aporta a la AFP?', 'aportaAfp', x.aportaAfp === undefined ? '1' : x.aportaAfp, 'select', { opciones: [['1', 'Sí'], ['0', 'No']] }) +
      campo('¿Jubilado?', 'jubilado', x.jubilado || '0', 'select', { opciones: [['0', 'No'], ['1', 'Sí']] }) +
      campo('¿Persona con discapacidad?', 'discapacidad', x.discapacidad || '0', 'select', { opciones: [['0', 'No'], ['1', 'Sí']] }) +
      campo('Tipo de asegurado (Gestora)', 'tipoAsegurado', x.tipoAsegurado || 'D', 'select', { opciones: [['D', 'Dependiente'], ['M', 'Minero'], ['E', 'Estacional'], ['CL', 'Consultor en línea']] }) +
      campo('Clasificación laboral (Ministerio)', 'clasificacion', x.clasificacion || '4') + campo('Modalidad de contrato (Ministerio)', 'modalidad', x.modalidad || '1') +
      campo('Tipo de contrato (Ministerio)', 'tipoContrato', x.tipoContrato || '1') + campo('Sucursal (Ministerio)', 'sucursal', x.sucursal || '1') +
      '</div></fieldset>' + campo('Notas', 'notas', x.notas, 'textarea', { ancho: true }) + '</form>';
    U.modal(x.id ? U.nombreCompleto(x) : 'Nuevo trabajador', html, [
      x.id ? { texto: 'Eliminar', clase: 'btn btn-fantasma', accion: function () {
        U.confirmar('Eliminar trabajador', 'Si la persona dejó de trabajar es mejor marcarla como RETIRADO para conservar su historial. ¿Eliminar de todas formas?', 'Eliminar', function () { D.eliminarEmpleado(x.id); App.refrescar(); }, true);
      } } : null,
      x.id ? { texto: 'Certificado', clase: 'btn', accion: function () { location.hash = '#/certificados/' + x.id; } } : null,
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: 'Guardar', clase: 'btn btn-primario', accion: function (m) {
        var f = U.$('#fEmpl', m);
        if (!f.reportValidity()) return false;
        var d = Object.assign({}, x, leerForm(f));
        if (!d.apPaterno && !d.apMaterno) { U.aviso('Escribe al menos un apellido', 'error'); return false; }
        var emp = D.empresaActiva();
        d.empresaId = x.empresaId || emp.id;
        var dup = D.empleadoPorCi(d.ci, d.empresaId);
        if (dup && dup.id !== x.id) { U.aviso('Ya existe un trabajador con ese CI', 'error'); return false; }
        if (d.estado === 'RETIRADO' && !d.fechaRetiro) { U.aviso('Indica la fecha de retiro', 'error'); return false; }
        D.guardarEmpleado(d); App.refrescar(); U.aviso('Datos guardados');
      } }
    ].filter(Boolean), { ancho: true });
  }
  V.formEmpleado = formEmpleado;

  /* ---------- Importar personal desde Excel ---------- */
  function norm(s) { return U.sinAcentos(String(s || '')).toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  var MAPA_COLS = {
    ci: ['CI', 'NUMERODEDOCUMENTODEIDENTIDAD', 'CARNET'], complemento: ['COMPLEMENTO', 'COMPLEMENTOCI'], expedido: ['EXPEDIDO', 'LUGARDEEXPEDICION'],
    nombres: ['NOMBRES', 'NOMBRE'], apPaterno: ['APELLIDOPATERNO', 'PRIMERAPELLIDO'], apMaterno: ['APELLIDOMATERNO', 'SEGUNDOAPELLIDO'], apellidos: ['APELLIDOS', 'APELLIDO'],
    apCasada: ['APELLIDODECASADA'], sexo: ['SEXO', 'SEXOFM'], fechaNac: ['FNACIMIENTO', 'FECHADENACIMIENTO'], nacionalidad: ['NACIONALIDAD'],
    celular: ['CELULAR', 'TELEFONO'], correo: ['CORREO', 'EMAIL', 'CORREOELECTRONICO'], cargo: ['CARGO', 'OCUPACIONQUEDESEMPENA', 'OCUPACION'], horario: ['HORARIOSDETRABAJO', 'HORARIO'],
    fechaIngreso: ['FECHADEINGRESO'], fechaInicio: ['FECHADEINICIO'], fechaRetiro: ['FECHADERETIRO'], estado: ['ESTADO'],
    sueldoBasico: ['SUELDOBASICO', 'HABERBASICO', 'TOTALGANADOBS', 'SUELDO'], banco: ['BANCO'], cuenta: ['CUENTABANCARIA', 'NRODECUENTA', 'CUENTA'],
    cua: ['CUA', 'NUACUA', 'NUA'], codDependiente: ['CODIMPUESTOS110', 'CURDEPENDIENTE', 'CODIGODEPENDIENTE'], enlaceContrato: ['ENLACEDELCONTRATO'], notas: ['NOTAS']
  };
  function importarPersonal() {
    var emp = D.empresaActiva();
    var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.xlsx,.xls,.csv';
    inp.onchange = function () {
      var f = inp.files[0]; if (!f) return;
      var lector = new FileReader();
      lector.onload = function (ev) {
        try {
          var wb = XLSX.read(new Uint8Array(ev.target.result), { type: 'array', cellDates: true });
          var nombreHoja = wb.SheetNames.find(function (n) { return /datos.?personal|personal/i.test(n); }) || wb.SheetNames[0];
          var filas = XLSX.utils.sheet_to_json(wb.Sheets[nombreHoja], { header: 1, raw: true, defval: '' });
          // Busca la fila de encabezados (la primera que tenga "CI")
          var iCab = filas.findIndex(function (r) { return r.some(function (c) { return norm(c) === 'CI'; }); });
          if (iCab < 0) throw new Error('No se encontró la columna "CI" en la hoja "' + nombreHoja + '".');
          var cab = filas[iCab].map(norm);
          var idx = {};
          Object.keys(MAPA_COLS).forEach(function (k) {
            for (var i = 0; i < MAPA_COLS[k].length; i++) { var p = cab.indexOf(MAPA_COLS[k][i]); if (p >= 0) { idx[k] = p; break; } }
          });
          var nuevos = 0, act = 0, lista = [];
          filas.slice(iCab + 1).forEach(function (r) {
            var g = function (k) { return idx[k] === undefined ? '' : r[idx[k]]; };
            var ci = String(g('ci')).trim().replace(/\.0$/, '');
            if (!ci || !/\d/.test(ci)) return;
            var d = { ci: ci };
            ['complemento', 'expedido', 'nombres', 'apCasada', 'nacionalidad', 'celular', 'correo', 'cargo', 'horario', 'banco', 'cuenta', 'cua', 'codDependiente', 'enlaceContrato', 'notas', 'apPaterno', 'apMaterno']
              .forEach(function (k) { var v = g(k); if (v !== '' && v !== null) d[k] = String(v).trim().replace(/\.0$/, ''); });
            if (!d.apPaterno && g('apellidos')) {
              var ap = String(g('apellidos')).trim().split(/\s+/);
              d.apPaterno = ap.shift() || ''; d.apMaterno = ap.join(' ');
            }
            if (d.apPaterno && d.apPaterno === U.mayus(d.apPaterno) && g('apellidos')) {
              var ap2 = String(g('apellidos')).trim().split(/\s+/); d.apPaterno = ap2.shift() || d.apPaterno; d.apMaterno = ap2.join(' ') || d.apMaterno;
            }
            var sx = U.mayus(String(g('sexo')).trim()); if (sx) d.sexo = sx.charAt(0) === 'F' ? 'F' : 'M';
            var fn = U.aIso(g('fechaNac')); if (fn) d.fechaNac = fn;
            var fi = U.aIso(g('fechaIngreso')) || U.aIso(g('fechaInicio')); if (fi) d.fechaIngreso = fi;
            var fr = U.aIso(g('fechaRetiro')); if (fr) d.fechaRetiro = fr;
            var es = U.mayus(String(g('estado')).trim()); d.estado = /RETIR|BAJA|INACT/.test(es) ? 'RETIRADO' : 'ACTIVO';
            var sb = Calc.num(g('sueldoBasico')); if (sb) d.sueldoBasico = sb;
            if (d.banco) { var bk = D.bancoPorAbrev(d.banco); if (bk) d.banco = bk.abrev; }
            if (d.nacionalidad) d.nacionalidad = U.mayus(d.nacionalidad);
            lista.push(d);
          });
          if (!lista.length) throw new Error('No se encontraron filas con CI.');
          lista.forEach(function (d) { if (D.empleadoPorCi(d.ci, emp.id)) act++; else nuevos++; });
          var sinFecha = lista.filter(function (d) { return d.estado === 'RETIRADO' && !d.fechaRetiro; }).length;
          U.modal('Importar personal', '<p>Hoja leída: <b>' + e(nombreHoja) + '</b></p><div class="rejilla r3"><div class="tarjeta kpi"><span class="etq">Nuevos</span><span class="val">' + nuevos +
            '</span></div><div class="tarjeta kpi"><span class="etq">Se actualizan</span><span class="val">' + act + '</span></div><div class="tarjeta kpi"><span class="etq">Columnas reconocidas</span><span class="val">' + Object.keys(idx).length + '</span></div></div>' +
            (sinFecha ? '<div class="alerta aviso"><span><b>' + sinFecha + ' retirado(s) sin fecha de retiro.</b> Puedes completarla luego en la ficha de cada uno.</span></div>' : '') +
            '<p class="suave peq">Los trabajadores se identifican por su CI: si ya existe, se actualizan sus datos; si no, se crea. Revisa después el sueldo básico de cada persona.</p>',
            [{ texto: 'Cancelar', clase: 'btn btn-fantasma' }, { texto: 'Importar', clase: 'btn btn-primario', accion: function () {
              lista.forEach(function (d) {
                var ex = D.empleadoPorCi(d.ci, emp.id);
                D.guardarEmpleado(Object.assign(ex || { empresaId: emp.id, afpCod: '3', aportaAfp: '1', tipoAsegurado: 'D' }, d));
              });
              App.refrescar(); U.aviso('Personal importado: ' + lista.length);
            } }]);
        } catch (err) { U.modal('No se pudo importar', '<div class="alerta error">' + e(err.message) + '</div>'); }
      };
      lector.readAsArrayBuffer(f);
    };
    inp.click();
  }

  /* =========================================================
     PLANILLA DEL MES
     ========================================================= */
  var periodoVista = null;
  var COLS_EDIT = [
    ['dias', 'Días', 'dias'], ['horasExtra', 'HE cant.'], ['bonoProduccion', 'Bono prod.'], ['dominicales', 'Dominicales'], ['otrosBonos', 'Otros bonos'],
    ['facturasF110', 'Facturas F-110'], ['anticipos', 'Anticipos / desc.']
  ];

  V.planilla = function (cont, idPlanilla) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    var p = idPlanilla ? D.planilla(idPlanilla) : null;
    if (p) periodoVista = { anio: p.anio, mes: p.mes };
    if (!periodoVista) periodoVista = periodoSugerido();
    if (!p) p = D.planillaDe(emp.id, periodoVista.anio, periodoVista.mes);

    var h = '<div class="tarjeta-cab"><div><span class="kicker">' + e(emp.razonSocial) + '</span><h2 style="font-size:30px">Planilla de sueldos</h2></div>' +
      '<div class="acciones"><select id="selMes" aria-label="Mes" style="width:150px">' + opcionesMes(periodoVista.mes) + '</select><select id="selAnio" aria-label="Año" style="width:96px">' + opcionesAnio(periodoVista.anio) + '</select></div></div>';

    if (!p) {
      var activos = D.empleados().filter(function (k) { return Calc.diasSugeridos(k, periodoVista.anio, periodoVista.mes) > 0 && !(k.estado === 'RETIRADO' && !k.fechaRetiro); });
      h += '<div class="tarjeta vacio"><img src="assets/fotos/pitagoras-muestra-sistema.jpg" alt=""><h3>Planilla de ' + nombrePeriodo(periodoVista) + '</h3>' +
        '<p>Se incluirán <b>' + activos.length + '</b> trabajador(es) que corresponden a este mes, con los días calculados según su fecha de ingreso o retiro.</p>' +
        (activos.length ? '<button class="btn btn-primario" id="crearPl">' + ic('mas') + 'Crear planilla</button>' : '<a class="btn btn-primario" href="#/personal">Registrar personal</a>') + '</div>';
      cont.innerHTML = h;
      ligarPeriodo(cont);
      var bc = U.$('#crearPl', cont);
      if (bc) bc.onclick = function () {
        var nueva = {
          empresaId: emp.id, anio: periodoVista.anio, mes: periodoVista.mes, estado: 'borrador', creada: new Date().toISOString(),
          fechaPago: U.hoyIso(), glosa: 'Sueldo ' + Calc.MESES[periodoVista.mes - 1] + ' ' + periodoVista.anio,
          filas: activos.map(function (k) { return { empleadoId: k.id, dias: '', horasExtra: 0, bonoProduccion: 0, dominicales: 0, otrosBonos: 0, facturasF110: 0, anticipos: 0 }; })
        };
        D.guardarPlanilla(nueva); location.hash = '#/planilla/' + nueva.id;
      };
      return;
    }

    var cerrada = p.estado === 'cerrada';
    var calc = D.calcularPlanilla(p);
    h += '<div class="tarjeta" style="margin-bottom:16px;padding:14px 18px"><div class="acciones" style="justify-content:space-between">' +
      '<div class="acciones"><span class="etiqueta ' + p.estado + '">' + (cerrada ? 'Cerrada' : 'Borrador') + '</span>' +
      '<label class="campo" style="flex-direction:row;align-items:center;gap:8px">Fecha de pago <input type="date" id="fPago" value="' + e(p.fechaPago || '') + '" style="width:160px"' + (cerrada ? ' disabled' : '') + '></label>' +
      '<label class="campo" style="flex-direction:row;align-items:center;gap:8px">Glosa <input id="fGlosa" value="' + e(p.glosa || '') + '" style="width:220px"' + (cerrada ? ' disabled' : '') + '></label></div>' +
      '<div class="acciones">' + (cerrada ? '<button class="btn" id="reabrir">' + ic('editar') + 'Reabrir</button>' :
        '<button class="btn" id="agregar">' + ic('mas') + 'Agregar / quitar personal</button><button class="btn btn-primario" id="cerrar">' + ic('candado') + 'Cerrar planilla</button>') +
      '<a class="btn" href="#/generar/' + p.id + '">' + ic('generar') + 'Generar archivos</a></div></div>' +
      (cerrada ? '<p class="suave peq" style="margin-top:8px">La planilla está cerrada: los montos quedan fijos aunque luego cambien los datos del personal o la configuración. Reábrela si necesitas corregir algo.</p>' :
        '<p class="suave peq" style="margin-top:8px">Escribe en las casillas verdes; todo se calcula y se guarda solo. Haz clic en un nombre para ver el detalle del cálculo. Deja "Días" vacío para que el sistema los calcule por fecha de ingreso/retiro.</p>') + '</div>';

    h += '<div class="tabla-caja" style="max-height:68vh"><table class="tabla" id="tPl"><thead>' +
      '<tr class="grupo-cab"><th class="fija"></th><th colspan="3">Haber</th><th colspan="2">Horas extra</th><th colspan="3">Bonos</th><th></th><th colspan="5">Descuentos</th><th></th><th></th></tr>' +
      '<tr><th class="fija">Trabajador</th><th class="num">Básico</th><th class="num">Días</th><th class="num">Salario ganado</th><th class="num">Cantidad</th><th class="num">Monto</th><th class="num">Antigüedad</th><th class="num">Producción · Dominic.</th><th class="num">Otros</th>' +
      '<th class="num destacado">Total ganado</th><th class="num">AFP</th><th class="num">ANS</th><th class="num">RC-IVA <span title="Facturas presentadas en el F-110">(Fact.)</span></th><th class="num">Anticipos</th><th class="num">Total desc.</th><th class="num destacado">Líquido pagable</th><th class="num">Patronal</th></tr></thead><tbody>';
    calc.filas.forEach(function (x, i) {
      var f = x.fila, r = x.r, k = x.emp;
      var inp = function (campoN, cls) {
        var v = f[campoN];
        if (campoN === 'dias' && (v === '' || v === undefined || v === null)) return '<input class="dias" data-i="' + i + '" data-c="dias" placeholder="' + r.dias + '" aria-label="Días"' + (cerrada ? ' disabled' : '') + '>';
        return '<input class="' + (cls || '') + '" data-i="' + i + '" data-c="' + campoN + '" value="' + (Calc.num(v) ? v : '') + '" placeholder="0" inputmode="decimal" aria-label="' + campoN + '"' + (cerrada ? ' disabled' : '') + '>';
      };
      h += '<tr data-i="' + i + '"><td class="nombre fija"><a href="#" data-det="' + i + '">' + e(U.nombreCompleto(k)) + '</a><div class="suave peq" style="font-weight:400">' + e(k.cargo || '') + '</div></td>' +
        '<td class="num">' + bs(r.basico) + '</td><td class="num">' + inp('dias', 'dias') + '</td><td class="num" data-o="salarioGanado">' + bs(r.salarioGanado) + '</td>' +
        '<td class="num">' + inp('horasExtra', 'dias') + '</td><td class="num" data-o="montoHorasExtra">' + bs(r.montoHorasExtra) + '</td>' +
        '<td class="num" data-o="bonoAntiguedad" title="' + r.anios + ' año(s) · ' + r.pctAntiguedad + '%">' + bs(r.bonoAntiguedad) + '</td>' +
        '<td class="num">' + inp('bonoProduccion') + ' ' + inp('dominicales') + '</td><td class="num">' + inp('otrosBonos') + '</td>' +
        '<td class="num destacado" data-o="totalGanado"><b>' + bs(r.totalGanado) + '</b></td><td class="num" data-o="afp">' + bs(r.afp) + '</td><td class="num" data-o="ans">' + bs(r.ans) + '</td>' +
        '<td class="num"><span data-o="rcIva">' + bs(r.rcIva) + '</span> ' + inp('facturasF110') + '</td><td class="num">' + inp('anticipos') + '</td>' +
        '<td class="num" data-o="totalDescuentos">' + bs(r.totalDescuentos) + '</td><td class="num destacado" data-o="liquido"><b>' + bs(r.liquido) + '</b></td>' +
        '<td class="num suave" data-o="patronal">' + bs(r.cajaSalud + r.gestoraPatronal) + '</td></tr>';
    });
    h += '</tbody><tfoot><tr id="filaTot"></tr></tfoot></table></div>';
    cont.innerHTML = h;
    ligarPeriodo(cont);
    pintarTotales(cont, calc);

    U.$$('[data-det]', cont).forEach(function (a) { a.onclick = function (ev) { ev.preventDefault(); detalleFila(p, +a.dataset.det); }; });
    if (!cerrada) {
      U.$$('#tPl input', cont).forEach(function (inp) {
        inp.addEventListener('input', function () {
          var i = +inp.dataset.i, c = inp.dataset.c;
          p.filas[i][c] = c === 'dias' && inp.value.trim() === '' ? '' : inp.value.trim();
          D.guardarPlanilla(p);
          var nc = D.calcularPlanilla(p);
          var x = nc.filas[i], tr = U.$('tr[data-i="' + i + '"]', cont);
          U.$$('[data-o]', tr).forEach(function (td) {
            var k = td.dataset.o, v = k === 'patronal' ? x.r.cajaSalud + x.r.gestoraPatronal : x.r[k];
            td.innerHTML = (k === 'totalGanado' || k === 'liquido') ? '<b>' + bs(v) + '</b>' : bs(v);
          });
          if (c !== 'dias') { var d = U.$('input[data-c="dias"]', tr); if (d && d.value === '') d.placeholder = x.r.dias; }
          pintarTotales(cont, nc);
        });
        inp.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
            ev.preventDefault();
            var sig = U.$('input[data-c="' + inp.dataset.c + '"][data-i="' + (+inp.dataset.i + (ev.key === 'ArrowUp' ? -1 : 1)) + '"]', cont);
            if (sig) { sig.focus(); sig.select(); }
          }
        });
      });
      U.$('#fPago', cont).onchange = function (ev) { p.fechaPago = ev.target.value; D.guardarPlanilla(p); };
      U.$('#fGlosa', cont).onchange = function (ev) { p.glosa = ev.target.value; D.guardarPlanilla(p); };
      U.$('#agregar', cont).onclick = function () { gestionarFilas(p); };
      U.$('#cerrar', cont).onclick = function () {
        var c = D.calcularPlanilla(p);
        var faltan = c.filas.filter(function (x) { return !x.emp.cuenta || !x.emp.cua; }).map(function (x) { return U.nombreCompleto(x.emp); });
        U.modal('Cerrar planilla de ' + nombrePeriodo(p), '<p>Al cerrar, los montos de esta planilla quedan guardados tal como están (aunque después cambie el sueldo de alguien o la configuración).</p>' +
          '<div class="detalle-calc"><span>Total ganado</span><b class="num">' + bs(c.totales.totalGanado) + '</b><span>Total descuentos</span><b class="num">' + bs(c.totales.totalDescuentos) + '</b><span class="tot">Líquido pagable</span><span class="tot num">Bs ' + bs(c.totales.liquido) + '</span></div>' +
          (faltan.length ? '<div class="alerta aviso"><span><b>Ojo:</b> a ' + faltan.length + ' persona(s) les falta la cuenta bancaria o el CUA: ' + e(faltan.join(', ')) + '.</span></div>' : ''),
          [{ texto: 'Cancelar', clase: 'btn btn-fantasma' }, { texto: 'Cerrar planilla', clase: 'btn btn-primario', accion: function () {
            p.filas.forEach(function (f) { var em = D.empleado(f.empleadoId); if (em) f.empleado = JSON.parse(JSON.stringify(em)); });
            p.configUsada = JSON.parse(JSON.stringify(D.config()));
            p.estado = 'cerrada'; p.cerrada = new Date().toISOString();
            D.guardarPlanilla(p); App.refrescar(); U.aviso('Planilla cerrada');
          } }]);
      };
    } else {
      U.$('#reabrir', cont).onclick = function () {
        U.confirmar('Reabrir planilla', 'La planilla volverá a borrador y se recalculará con los datos y la configuración actuales.', 'Reabrir', function () {
          p.estado = 'borrador'; delete p.configUsada; D.guardarPlanilla(p); App.refrescar();
        });
      };
    }
  };

  function ligarPeriodo(cont) {
    var cambiar = function () {
      periodoVista = { anio: +U.$('#selAnio', cont).value, mes: +U.$('#selMes', cont).value };
      if (location.hash !== '#/planilla') location.hash = '#/planilla'; else App.refrescar();
    };
    U.$('#selMes', cont).onchange = cambiar; U.$('#selAnio', cont).onchange = cambiar;
  }

  function pintarTotales(cont, calc) {
    var t = calc.totales;
    U.$('#filaTot', cont).innerHTML = '<td class="fija">TOTAL · ' + calc.filas.length + ' persona(s)</td><td class="num">' + bs(t.basico) + '</td><td></td><td class="num">' + bs(t.salarioGanado) +
      '</td><td class="num">' + t.horasExtra + '</td><td class="num">' + bs(t.montoHorasExtra) + '</td><td class="num">' + bs(t.bonoAntiguedad) + '</td><td class="num">' + bs(t.bonoProduccion + t.dominicales) +
      '</td><td class="num">' + bs(t.otrosBonos) + '</td><td class="num destacado">' + bs(t.totalGanado) + '</td><td class="num">' + bs(t.afp) + '</td><td class="num">' + bs(t.ans) + '</td><td class="num">' + bs(t.rcIva) +
      '</td><td class="num">' + bs(t.anticipos) + '</td><td class="num">' + bs(t.totalDescuentos) + '</td><td class="num destacado">' + bs(t.liquido) + '</td><td class="num">' + bs(t.cajaSalud + t.gestoraPatronal) + '</td>';
  }

  function detalleFila(p, i) {
    var c = D.calcularPlanilla(p), x = c.filas[i], r = x.r, d = r.rcIvaDetalle, cfg = c.cfg;
    var l = function (a, b, tot) { return '<span class="' + (tot ? 'tot' : '') + '">' + a + '</span><span class="num ' + (tot ? 'tot' : '') + '">' + b + '</span>'; };
    var html = '<div class="rejilla r2"><div><h4 class="kicker" style="margin-bottom:8px">Ingresos</h4><div class="detalle-calc">' +
      l('Sueldo básico', bs(r.basico)) + l('Días pagados', r.dias) + l('Salario ganado (básico ÷ 30 × días)', bs(r.salarioGanado)) +
      l('Antigüedad: ' + r.anios + ' año(s) → ' + r.pctAntiguedad + '% de ' + cfg.antiguedadBaseSMN + ' SMN', bs(r.bonoAntiguedad)) +
      l('Horas extra: ' + r.horasExtra + ' × ' + bs(r.valorHoraExtra) + ' (recargo ' + cfg.recargoHoraExtra + '%)', bs(r.montoHorasExtra)) +
      l('Bono producción', bs(r.bonoProduccion)) + l('Dominicales', bs(r.dominicales)) + l('Otros bonos', bs(r.otrosBonos)) + l('TOTAL GANADO', bs(r.totalGanado), true) + '</div></div>' +
      '<div><h4 class="kicker" style="margin-bottom:8px">Descuentos</h4><div class="detalle-calc">' +
      l('AFP ' + cfg.afpLaboral + '%', bs(r.afp)) + l('Aporte Nacional Solidario', bs(r.ans)) + l('RC-IVA', bs(r.rcIva)) + l('Anticipos y otros', bs(r.anticipos)) +
      l('TOTAL DESCUENTOS', bs(r.totalDescuentos), true) + l('LÍQUIDO PAGABLE', bs(r.liquido), true) + '</div></div></div>' +
      '<div class="tarjeta" style="padding:14px"><h4 class="kicker" style="margin-bottom:8px">Cálculo del RC-IVA</h4><div class="detalle-calc">' +
      l('Total ganado − AFP − ANS', bs(d.neto)) + l('(−) Mínimo no imponible (' + cfg.rcIvaMinNoImponibleSMN + ' SMN)', bs(d.minimo)) + l('Sujeto a impuesto', bs(d.sujeto)) +
      l('Impuesto 13%', bs(d.impuesto)) + l('(−) 13% de ' + cfg.rcIvaCreditoSMN + ' SMN', bs(d.creditoSMN)) + l('(−) 13% de facturas F-110', bs(d.creditoFacturas)) +
      l('RC-IVA a retener', bs(d.aPagar), true) + (d.saldoFavor ? l('Saldo a favor del trabajador', bs(d.saldoFavor)) : '') + '</div></div>' +
      '<div class="tarjeta" style="padding:14px"><h4 class="kicker" style="margin-bottom:8px">Costo para la empresa</h4><div class="detalle-calc">' +
      l('Caja de salud ' + cfg.cajaSalud + '%', bs(r.cajaSalud)) + l('Gestora patronal ' + cfg.gestoraPatronal + '%', bs(r.gestoraPatronal)) +
      l('Previsión indemnización ' + cfg.provIndemnizacion + '%', bs(r.provIndemnizacion)) + l('Previsión aguinaldo ' + cfg.provAguinaldo + '%', bs(r.provAguinaldo)) +
      l('COSTO TOTAL', bs(r.totalGanado + r.cajaSalud + r.gestoraPatronal + r.provIndemnizacion + r.provAguinaldo), true) + '</div></div>';
    U.modal(U.nombreCompleto(x.emp) + ' · ' + nombrePeriodo(p), html, [
      { texto: 'Boleta de pago', clase: 'btn', accion: function () { Doc.imprimir(Doc.boletas(D.empresa(p.empresaId), p, c, [x.fila.empleadoId])); } },
      { texto: 'Cerrar', clase: 'btn btn-primario' }], { ancho: true });
  }

  function gestionarFilas(p) {
    var dentro = p.filas.map(function (f) { return f.empleadoId; });
    var todos = D.empleados();
    var html = '<p class="suave">Marca quién debe estar en la planilla de ' + nombrePeriodo(p) + '.</p><div class="tabla-caja" style="max-height:50vh"><table class="tabla"><tbody>' +
      todos.map(function (k) {
        return '<tr><td style="width:40px"><input type="checkbox" data-id="' + k.id + '"' + (dentro.indexOf(k.id) >= 0 ? ' checked' : '') + '></td><td class="nombre">' + e(U.nombreCompleto(k)) +
          '</td><td>' + e(k.cargo) + '</td><td><span class="etiqueta ' + (k.estado === 'RETIRADO' ? 'retirado' : '') + '">' + e(k.estado || 'ACTIVO') + '</span></td></tr>';
      }).join('') + '</tbody></table></div>';
    U.modal('Personal en la planilla', html, [{ texto: 'Cancelar', clase: 'btn btn-fantasma' }, { texto: 'Aplicar', clase: 'btn btn-primario', accion: function (m) {
      var marcados = U.$$('input[data-id]', m).filter(function (c) { return c.checked; }).map(function (c) { return c.dataset.id; });
      p.filas = p.filas.filter(function (f) { return marcados.indexOf(f.empleadoId) >= 0; });
      marcados.forEach(function (id) { if (!p.filas.some(function (f) { return f.empleadoId === id; })) p.filas.push({ empleadoId: id, dias: '', horasExtra: 0, bonoProduccion: 0, dominicales: 0, otrosBonos: 0, facturasF110: 0, anticipos: 0 }); });
      p.filas.sort(function (a, b) { return U.nombreCompleto(D.empleado(a.empleadoId) || {}).localeCompare(U.nombreCompleto(D.empleado(b.empleadoId) || {}), 'es'); });
      D.guardarPlanilla(p); App.refrescar();
    } }]);
  }

  /* =========================================================
     GENERAR DOCUMENTOS Y ARCHIVOS
     ========================================================= */
  V.generar = function (cont, idPlanilla) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    var planillas = D.planillas();
    if (!planillas.length) {
      cont.innerHTML = '<div class="tarjeta vacio"><img src="assets/fotos/reunion-sala.jpg" alt=""><h3>Primero crea una planilla</h3><p>Los archivos para bancos, Ministerio, Gestora, Caja e Impuestos salen de la planilla del mes.</p><a class="btn btn-primario" href="#/planilla">Ir a la planilla</a></div>';
      return;
    }
    var p = (idPlanilla && D.planilla(idPlanilla)) || planillas[0];
    var calc = D.calcularPlanilla(p);
    var h = '<section class="portada" style="background-image:url(assets/fotos/reunion-sala.jpg);min-height:200px"><div class="txt"><span class="kicker">Generar archivos</span><h1 style="font-size:clamp(30px,3.6vw,44px)">' + nombrePeriodo(p) + '</h1>' +
      '<p>' + calc.filas.length + ' persona(s) · Líquido pagable Bs ' + bs(calc.totales.liquido) + '</p><div class="acciones"><select id="selPl" style="max-width:240px">' +
      planillas.map(function (x) { return '<option value="' + x.id + '"' + (x.id === p.id ? ' selected' : '') + '>' + nombrePeriodo(x) + (x.estado === 'cerrada' ? ' · cerrada' : ' · borrador') + '</option>'; }).join('') + '</select></div></div></section>';
    if (p.estado !== 'cerrada') h += '<div class="alerta aviso seccion" style="margin-top:16px"><span><b>Esta planilla está en borrador.</b> Puedes generar los archivos, pero lo recomendable es cerrarla primero para que los montos no cambien.</span></div>';

    var tarjeta = function (icono, titulo, texto, botones) {
      return '<div class="tarjeta gen"><div class="ic">' + ic(icono) + '</div><div style="min-width:0"><h3>' + titulo + '</h3><p>' + texto + '</p><div class="acciones">' + botones + '</div></div></div>';
    };
    var b = function (id, txt, icono, prim) { return '<button class="btn btn-sm' + (prim ? ' btn-primario' : '') + '" data-g="' + id + '">' + ic(icono || 'generar') + txt + '</button>'; };

    h += '<div class="seccion"><h2>Para la empresa</h2><div class="rejilla r2">' +
      tarjeta('planilla', 'Planilla de sueldos y salarios', 'La planilla oficial con firmas, en hoja horizontal.', b('plPdf', 'Imprimir / PDF', 'imprimir', true) + b('plXls', 'Excel', 'excel')) +
      tarjeta('boleta', 'Boletas de pago', 'Una boleta por trabajador, dos por hoja, con el líquido en letras.', b('boletas', 'Imprimir / PDF', 'imprimir', true)) +
      tarjeta('salud', 'Aportes y previsiones', 'Caja de salud, Gestora patronal, indemnización y aguinaldo.', b('patPdf', 'Imprimir / PDF', 'imprimir', true)) +
      tarjeta('libro', 'Asiento contable', 'Asiento de la planilla listo para el sistema contable.', b('asPdf', 'Imprimir / PDF', 'imprimir', true) + b('asXls', 'Excel', 'excel')) +
      '</div></div>';
    h += '<div class="seccion"><h2>Para el banco</h2><div class="rejilla r2">' +
      tarjeta('banco', 'Banco Ganadero', 'Planilla Excel de pago masivo de sueldos (cuentas Ganadero y ACH a otros bancos).', b('ganadero', 'Descargar Excel', 'excel', true)) +
      '</div></div>';
    h += '<div class="seccion"><h2>Para las entidades</h2><div class="rejilla r2">' +
      tarjeta('gobierno', 'Ministerio de Trabajo', 'Planilla con las 46 columnas del formato del Ministerio.', b('min', 'Descargar Excel', 'excel', true)) +
      tarjeta('empresa', 'Gestora Pública', 'Planilla de aportes con novedades de ingreso y retiro.', b('gestora', 'Descargar Excel', 'excel', true)) +
      tarjeta('salud', 'Caja de Salud', 'Planilla de aportes del ' + calc.cfg.cajaSalud + '% patronal.', b('caja', 'Descargar Excel', 'excel', true)) +
      tarjeta('impuesto', 'Impuestos Nacionales · RC-IVA', 'Planilla de dependientes (F-608) y detalle del cálculo de cada persona.', b('imp', 'Descargar Excel', 'excel', true)) +
      '</div></div>';
    cont.innerHTML = h;
    U.$('#selPl', cont).onchange = function (ev) { location.hash = '#/generar/' + ev.target.value; };

    var fecha = p.fechaPago || U.hoyIso(), glosa = p.glosa || ('Sueldo ' + nombrePeriodo(p));
    var avisoFaltan = function (lista, que) {
      if (lista && lista.length) U.modal('Archivo descargado, pero revisa', '<div class="alerta aviso"><span>A estas personas les falta ' + que + ': <b>' + e(lista.join(', ')) + '</b>. Complétalo en Personal y vuelve a descargar.</span></div>');
      else U.aviso('Archivo descargado');
    };
    var acciones = {
      plPdf: function () { Doc.imprimir(Doc.planillaSueldos(emp, p, calc), true); },
      plXls: function () { X.planillaSueldos(emp, p, calc); U.aviso('Archivo descargado'); },
      boletas: function () { Doc.imprimir(Doc.boletas(emp, p, calc)); },
      patPdf: function () { Doc.imprimir(Doc.planillaPatronal(emp, p, calc), true); },
      asPdf: function () { Doc.imprimir(Doc.asiento(emp, p, calc)); },
      asXls: function () { X.asiento(emp, p, calc); U.aviso('Archivo descargado'); },
      ganadero: function () { avisoFaltan(X.bancoGanadero(emp, p, calc, fecha, glosa), 'el banco o la cuenta'); },
      min: function () { X.ministerio(emp, p, calc); U.aviso('Archivo descargado'); },
      gestora: function () { avisoFaltan(X.gestora(emp, p, calc), 'el CUA'); },
      caja: function () { X.cajaSalud(emp, p, calc); U.aviso('Archivo descargado'); },
      imp: function () { avisoFaltan(X.impuestos(emp, p, calc), 'el código de dependiente (CUR)'); }
    };
    U.$$('[data-g]', cont).forEach(function (bt) { bt.onclick = function () { acciones[bt.dataset.g](); }; });
  };

  /* =========================================================
     AGUINALDOS
     ========================================================= */
  var anioAg = null;
  V.aguinaldos = function (cont) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    anioAg = anioAg || hoy.getFullYear();
    var lista = D.empleados().filter(function (k) {
      var fin = new Date(anioAg, 11, 31), ini = new Date(anioAg, 0, 1);
      var ing = Calc.aFecha(k.fechaIngreso), ret = Calc.aFecha(k.fechaRetiro);
      if (k.estado === 'RETIRADO' && !ret) return false;
      return ing && ing <= fin && (!ret || ret >= ini);
    });
    var filas = lista.map(function (k) {
      var meses = [9, 10, 11].map(function (m) { return D.totalGanadoMes(k.id, anioAg, m); });
      var base = meses.some(function (v) { return v > 0; }) ? meses : [0, 0, Calc.num(k.sueldoBasico)];
      return { emp: k, meses: meses, base: base, a: Calc.calcularAguinaldo(k, anioAg, base, anioAg + '-12-31') };
    });
    var tot = filas.reduce(function (s, f) { return s + f.a.aguinaldo; }, 0);
    var h = '<div class="tarjeta-cab"><div><span class="kicker">' + e(emp.razonSocial) + '</span><h2 style="font-size:30px">Aguinaldo de Navidad</h2>' +
      '<p class="suave">Promedio de los totales ganados de septiembre, octubre y noviembre × tiempo trabajado en el año (mínimo 3 meses).</p></div>' +
      '<div class="acciones"><select id="anioAg" style="width:100px">' + opcionesAnio(anioAg) + '</select><button class="btn" id="agXls">' + ic('excel') + 'Excel</button><button class="btn btn-primario" id="agPdf">' + ic('imprimir') + 'Imprimir / PDF</button></div></div>' +
      '<div class="alerta" style="margin-bottom:14px"><span>Los meses se toman de las planillas guardadas. Si aún no existe la planilla de un mes, puedes escribir el monto a mano. Si no hay ninguna, se usa el sueldo básico.</span></div>' +
      '<div class="tabla-caja" style="max-height:64vh"><table class="tabla"><thead><tr><th class="fija">Trabajador</th><th>Ingreso</th><th class="num">Septiembre</th><th class="num">Octubre</th><th class="num">Noviembre</th><th class="num">Promedio</th><th class="num">Meses</th><th class="num">Días</th><th class="num destacado">Aguinaldo</th></tr></thead><tbody>' +
      filas.map(function (f, i) {
        return '<tr data-i="' + i + '"><td class="nombre fija">' + e(U.nombreCompleto(f.emp)) + '</td><td>' + U.fecha(f.emp.fechaIngreso) + '</td>' +
          f.base.map(function (v, j) { return '<td class="num"><input data-m="' + j + '" value="' + (v ? Calc.r2(v) : '') + '" placeholder="0" style="width:96px"></td>'; }).join('') +
          '<td class="num" data-o="p">' + bs(f.a.promedio) + '</td><td class="num" data-o="m">' + f.a.meses + '</td><td class="num" data-o="d">' + f.a.dias + '</td><td class="num destacado" data-o="a"><b>' + bs(f.a.aguinaldo) + '</b></td></tr>';
      }).join('') + '</tbody><tfoot><tr><td class="fija" colspan="8">TOTAL AGUINALDOS</td><td class="num destacado" id="agTot">' + bs(tot) + '</td></tr></tfoot></table></div>';
    cont.innerHTML = h;
    U.$('#anioAg', cont).onchange = function (ev) { anioAg = +ev.target.value; V.aguinaldos(cont); };
    U.$$('tbody input', cont).forEach(function (inp) {
      inp.oninput = function () {
        var tr = inp.closest('tr'), f = filas[+tr.dataset.i];
        f.base[+inp.dataset.m] = Calc.num(inp.value);
        f.meses = f.base.slice();
        f.a = Calc.calcularAguinaldo(f.emp, anioAg, f.base, anioAg + '-12-31');
        U.$('[data-o="p"]', tr).textContent = bs(f.a.promedio); U.$('[data-o="m"]', tr).textContent = f.a.meses; U.$('[data-o="d"]', tr).textContent = f.a.dias;
        U.$('[data-o="a"]', tr).innerHTML = '<b>' + bs(f.a.aguinaldo) + '</b>';
        U.$('#agTot', cont).textContent = bs(filas.reduce(function (s, x) { return s + x.a.aguinaldo; }, 0));
      };
    });
    var lista2 = function () { return filas.map(function (f) { return { emp: f.emp, meses: f.base, a: f.a }; }).filter(function (f) { return f.a.aguinaldo > 0; }); };
    U.$('#agPdf', cont).onclick = function () { Doc.imprimir(Doc.aguinaldos(emp, anioAg, lista2()), true); };
    U.$('#agXls', cont).onclick = function () { X.aguinaldos(emp, anioAg, lista2()); U.aviso('Archivo descargado'); };
  };

  /* =========================================================
     CERTIFICADOS DE TRABAJO
     ========================================================= */
  V.certificados = function (cont, idEmp) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    var todos = D.empleados();
    var sel = (idEmp && D.empleado(idEmp)) || null;
    var h = '<section class="portada" style="background-image:url(assets/fotos/contrato-euclides-oscuro.jpg);min-height:200px"><div class="txt"><span class="kicker">Documentos del personal</span>' +
      '<h1 style="font-size:clamp(30px,3.6vw,44px)">Certificados de trabajo</h1><p>Elige a la persona, revisa el texto y descárgalo en PDF.</p></div></section>' +
      '<div class="rejilla r2 seccion" style="align-items:start"><div class="tarjeta"><form class="form" id="fCert">' +
      campo('Trabajador', 'emp', sel ? sel.id : '', 'select', { ancho: true, opciones: [['', '— Elegir —']].concat(todos.map(function (k) { return [k.id, U.nombreCompleto(k) + ((k.estado || 'ACTIVO') === 'RETIRADO' ? ' (retirado)' : '')]; })) }) +
      campo('Fecha del certificado', 'fecha', U.hoyIso(), 'date') +
      campo('¿Mostrar el sueldo?', 'conSueldo', '0', 'select', { opciones: [['0', 'No'], ['1', 'Sí']] }) +
      campo('Texto sobre su desempeño', 'conducta', 'Durante su permanencia demostró responsabilidad, honestidad y dedicación en las funciones encomendadas.', 'textarea', { ancho: true }) +
      '</form><div class="acciones" style="margin-top:14px"><button class="btn btn-primario" id="certPdf">' + ic('imprimir') + 'Imprimir / PDF</button></div></div>' +
      '<div class="vista-previa" id="certPrev"></div></div>';
    cont.innerHTML = h;
    var prev = function () {
      var d = leerForm(U.$('#fCert', cont)), k = D.empleado(d.emp);
      U.$('#certPrev', cont).innerHTML = k ? Doc.certificado(emp, k, { fecha: d.fecha, conSueldo: d.conSueldo === '1', textoConducta: d.conducta }) : '<p class="suave" style="padding:20px;text-align:center">Elige un trabajador para ver el certificado.</p>';
      return { d: d, k: k };
    };
    prev();
    U.$('#fCert', cont).oninput = prev; U.$('#fCert', cont).onchange = prev;
    U.$('#certPdf', cont).onclick = function () {
      var x = prev(); if (!x.k) { U.aviso('Elige un trabajador', 'error'); return; }
      Doc.imprimir(Doc.certificado(emp, x.k, { fecha: x.d.fecha, conSueldo: x.d.conSueldo === '1', textoConducta: x.d.conducta }));
    };
  };

  /* =========================================================
     HISTORIAL
     ========================================================= */
  V.historial = function (cont) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    var pl = D.planillas();
    var h = '<div class="tarjeta-cab"><div><span class="kicker">' + e(emp.razonSocial) + '</span><h2 style="font-size:30px">Historial de planillas</h2><p class="suave">Todas las planillas guardadas (reemplaza la hoja BDSueldos).</p></div>' +
      (pl.length ? '<button class="btn" id="hXls">' + ic('excel') + 'Descargar historial en Excel</button>' : '') + '</div>';
    if (!pl.length) h += '<div class="tarjeta vacio"><img src="assets/fotos/pitagoras-muestra-sistema.jpg" alt=""><h3>Sin planillas todavía</h3><p>Cuando crees la primera planilla aparecerá aquí.</p><a class="btn btn-primario" href="#/planilla">Crear planilla</a></div>';
    else {
      h += '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Periodo</th><th>Estado</th><th class="num">Personas</th><th class="num">Total ganado</th><th class="num">Descuentos</th><th class="num">Líquido pagable</th><th class="num">Aportes patronales</th><th></th></tr></thead><tbody>' +
        pl.map(function (p) {
          var c = D.calcularPlanilla(p), t = c.totales;
          return '<tr><td class="nombre">' + nombrePeriodo(p) + '</td><td><span class="etiqueta ' + p.estado + '">' + (p.estado === 'cerrada' ? 'Cerrada' : 'Borrador') + '</span></td><td class="num">' + c.filas.length +
            '</td><td class="num">' + bs(t.totalGanado) + '</td><td class="num">' + bs(t.totalDescuentos) + '</td><td class="num"><b>' + bs(t.liquido) + '</b></td><td class="num">' + bs(t.cajaSalud + t.gestoraPatronal) +
            '</td><td><div class="acciones" style="flex-wrap:nowrap"><a class="btn btn-sm" href="#/planilla/' + p.id + '">Abrir</a><a class="btn btn-sm" href="#/generar/' + p.id + '">Archivos</a>' +
            (p.estado !== 'cerrada' ? '<button class="btn btn-sm btn-fantasma" data-del="' + p.id + '" title="Eliminar borrador">' + ic('borrar') + '</button>' : '') + '</div></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    cont.innerHTML = h;
    var bx = U.$('#hXls', cont); if (bx) bx.onclick = function () { X.historial(emp); U.aviso('Archivo descargado'); };
    U.$$('[data-del]', cont).forEach(function (b) {
      b.onclick = function () { U.confirmar('Eliminar planilla', 'Se eliminará este borrador de planilla.', 'Eliminar', function () { D.eliminarPlanilla(b.dataset.del); App.refrescar(); }, true); };
    });
  };

  /* =========================================================
     CONFIGURACIÓN
     ========================================================= */
  V.configuracion = function (cont) {
    var c = D.config();
    var n = function (etq, k, ayuda, paso) { return campo(etq, k, c[k], 'number', { paso: paso || '0.01', ayuda: ayuda }); };
    var h = '<div class="tarjeta-cab"><div><span class="kicker">Parámetros de ley</span><h2 style="font-size:30px">Configuración</h2><p class="suave">Valores que usa el sistema para calcular. Se aplican a todas las empresas y a las planillas en borrador.</p></div></div>' +
      '<div class="rejilla r2" style="align-items:start"><div class="tarjeta"><form class="form" id="fCfg">' +
      '<fieldset class="ancho"><legend>Generales</legend><div class="form">' + n('Salario Mínimo Nacional (Bs)', 'smn', 'Cambia cada año con el decreto de incremento salarial') + n('Horas por día', 'horasDia', '', '1') + '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Descuentos al trabajador</legend><div class="form">' + n('AFP / Gestora laboral (%)', 'afpLaboral') +
      campo('ANS tramo 1: desde Bs', 'ans0d', c.ansTramos[0].desde, 'number') + campo('ANS tramo 1: %', 'ans0t', c.ansTramos[0].tasa, 'number', { paso: '0.01' }) +
      campo('ANS tramo 2: desde Bs', 'ans1d', c.ansTramos[1].desde, 'number') + campo('ANS tramo 2: %', 'ans1t', c.ansTramos[1].tasa, 'number', { paso: '0.01' }) +
      campo('ANS tramo 3: desde Bs', 'ans2d', c.ansTramos[2].desde, 'number') + campo('ANS tramo 3: %', 'ans2t', c.ansTramos[2].tasa, 'number', { paso: '0.01' }) + '</div></fieldset>' +
      '<fieldset class="ancho"><legend>RC-IVA</legend><div class="form">' + n('Tasa RC-IVA (%)', 'rcIva') + n('Mínimo no imponible (en SMN)', 'rcIvaMinNoImponibleSMN', 'Ley: 2 salarios mínimos', '1') +
      n('Crédito 13% sobre (en SMN)', 'rcIvaCreditoSMN', 'Ley: 13% de 2 salarios mínimos. Tu Excel usaba 1.', '1') + '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Ingresos</legend><div class="form">' + n('Recargo hora extra (%)', 'recargoHoraExtra', 'Ley General del Trabajo: 100% (se paga doble). Tu Excel usaba 50%.', '1') +
      n('Bono antigüedad: base en SMN', 'antiguedadBaseSMN', 'D.S. 21137: 3 salarios mínimos. Tu Excel usaba 1.', '1') +
      campo('Bono antigüedad proporcional a días', 'antiguedadProporcional', c.antiguedadProporcional ? '1' : '0', 'select', { opciones: [['1', 'Sí'], ['0', 'No']] }) + '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Aportes de la empresa</legend><div class="form">' + n('Caja de salud (%)', 'cajaSalud') + n('Gestora patronal (%)', 'gestoraPatronal') +
      n('Previsión indemnización (%)', 'provIndemnizacion') + n('Previsión aguinaldo (%)', 'provAguinaldo') + '</div></fieldset>' +
      '</form><div class="acciones"><button class="btn btn-primario" id="gCfg">Guardar configuración</button><button class="btn btn-fantasma" id="rCfg">Volver a los valores de ley</button></div></div>' +
      '<div class="rejilla"><div class="tarjeta"><h3>Copia de seguridad</h3><p class="suave" style="margin:4px 0 14px">Tus datos se guardan solo en este navegador. Descarga una copia cada mes y guárdala en tu Google Drive; sirve también para pasar los datos a otra computadora.</p>' +
      '<div class="acciones"><button class="btn btn-primario" id="bkExp">' + ic('generar') + 'Descargar copia</button><button class="btn" id="bkImp">' + ic('subir') + 'Restaurar copia</button></div>' +
      (D.get().actualizado ? '<p class="suave peq" style="margin-top:10px">Último cambio guardado: ' + new Date(D.get().actualizado).toLocaleString('es-BO') + '</p>' : '') + '</div>' +
      '<div class="tarjeta" style="padding:0;overflow:hidden"><img src="assets/fotos/los-cuatro-oscuro.jpg" alt="Los clásicos de los números junto al Contador Virtual de CONTAX" style="width:100%;aspect-ratio:16/9;object-fit:cover">' +
      '<div style="padding:18px 20px"><span class="kicker">NUMMEROS × CONTAX</span><h3 style="margin-top:4px">Sistemas a la medida de tu empresa.</h3><p class="suave peq" style="margin-top:6px">Sistema desarrollado por NUMMEROS. Servicio contable y de recursos humanos de CONTAX.</p></div></div>' +
      '<div class="tarjeta"><h3>Zona de cuidado</h3><p class="suave" style="margin:4px 0 14px">Borra todas las empresas, el personal y las planillas de este navegador.</p><button class="btn btn-peligro" id="borrarTodo">' + ic('borrar') + 'Borrar todos los datos</button></div></div></div>';
    cont.innerHTML = h;
    U.$('#gCfg', cont).onclick = function () {
      var d = leerForm(U.$('#fCfg', cont)), nc = JSON.parse(JSON.stringify(c));
      ['smn', 'horasDia', 'afpLaboral', 'rcIva', 'rcIvaMinNoImponibleSMN', 'rcIvaCreditoSMN', 'recargoHoraExtra', 'antiguedadBaseSMN', 'cajaSalud', 'gestoraPatronal', 'provIndemnizacion', 'provAguinaldo']
        .forEach(function (k) { nc[k] = Calc.num(d[k]); });
      nc.antiguedadProporcional = d.antiguedadProporcional === '1';
      nc.ansTramos = [0, 1, 2].map(function (i) { return { desde: Calc.num(d['ans' + i + 'd']), tasa: Calc.num(d['ans' + i + 't']) }; });
      D.guardarConfig(nc); U.aviso('Configuración guardada');
    };
    U.$('#rCfg', cont).onclick = function () { U.confirmar('Valores de ley', 'Se restaurarán los valores por defecto.', 'Restaurar', function () { D.restaurarConfig(); App.refrescar(); }); };
    U.$('#bkExp', cont).onclick = function () { U.descargar('Respaldo_NUMMEROS_RRHH_' + U.hoyIso() + '.json', D.exportarRespaldo(), 'application/json'); };
    U.$('#bkImp', cont).onclick = function () {
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json';
      inp.onchange = function () {
        var r = new FileReader();
        r.onload = function () {
          U.confirmar('Restaurar copia', 'Los datos actuales de este navegador se reemplazarán por los de la copia.', 'Restaurar', function () {
            try { D.importarRespaldo(r.result); App.refrescar(); U.aviso('Copia restaurada'); } catch (err) { U.modal('No se pudo restaurar', '<div class="alerta error">' + e(err.message) + '</div>'); }
          });
        };
        r.readAsText(inp.files[0]);
      };
      inp.click();
    };
    U.$('#borrarTodo', cont).onclick = function () {
      U.confirmar('Borrar todo', 'Se borrarán TODOS los datos de este navegador. Descarga antes una copia de seguridad.', 'Borrar todo', function () { D.borrarTodo(); App.refrescar(); }, true);
    };
  };

  global.V = V;
})(window);
