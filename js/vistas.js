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
    grafico: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    mensaje: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
    copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    ojo: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    expandir: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
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
      campo('Representante legal', 'representante', x.representante, 'text', { ayuda: 'Firma todos los documentos: planillas, boletas, certificados, aportes, asiento y resumen' }) +
      campo('C.I. del representante', 'ciRepresentante', x.ciRepresentante, 'text', { ayuda: 'Aparece bajo su firma' }) +
      campo('Cargo bajo la firma', 'cargoRepresentante', x.cargoRepresentante || 'Representante Legal') +
      campo('Correo del representante', 'correoRepresentante', x.correoRepresentante, 'email', { ayuda: 'Para enviarle el mensaje del mes por correo' }) +
      campo('Elaborado por (nombre)', 'elaboradoPor', x.elaboradoPor, 'text', { ayuda: 'Quien prepara la planilla en CONTAX (firma "Elaborado por" en el asiento y el resumen)' }) +
      campo('Cargo de quien elabora', 'elaboradoCargo', x.elaboradoCargo || 'Contador — CONTAX') +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Logo de la empresa</legend><p class="suave peq" style="margin-bottom:10px">Va en el encabezado de todos los documentos que se generan (planillas, boletas, certificados, aportes, asiento). Usa PNG con fondo transparente o SVG.</p>' +
      '<div class="rejilla r2"><div class="logo-carga"><span class="peq"><b>Para fondo claro</b></span><div class="logo-prev claro" id="prevLogo">' + (x.logo ? '<img src="' + e(x.logo) + '" alt="">' : '<span class="suave peq">Sin logo</span>') + '</div>' +
      '<div class="acciones"><button type="button" class="btn btn-sm" data-sube="logo">' + ic('subir') + 'Subir logo</button><button type="button" class="btn btn-sm btn-fantasma" data-quita="logo">Quitar</button></div></div>' +
      '<div class="logo-carga"><span class="peq"><b>Para modo oscuro</b> (opcional)</span><div class="logo-prev oscuro" id="prevLogoOscuro">' + (x.logoOscuro ? '<img src="' + e(x.logoOscuro) + '" alt="">' : '<span class="peq" style="color:#8EB69B">Opcional: versión blanca</span>') + '</div>' +
      '<div class="acciones"><button type="button" class="btn btn-sm" data-sube="logoOscuro">' + ic('subir') + 'Subir logo</button><button type="button" class="btn btn-sm btn-fantasma" data-quita="logoOscuro">Quitar</button></div></div></div></fieldset>' +
      '<fieldset class="ancho"><legend>Seguridad social y Ministerio</legend><div class="form">' +
      campo('N° de empleador (Ministerio)', 'nroEmpleadorMinisterio', x.nroEmpleadorMinisterio) + campo('N° patronal Caja de Salud', 'nroPatronalCaja', x.nroPatronalCaja) +
      campo('Código Caja de Salud (Ministerio)', 'cajaSaludCod', x.cajaSaludCod || '6', 'text', { ayuda: 'Código que pide el formulario del Ministerio (ej. 6)' }) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Pago de sueldos · Banco Ganadero</legend><div class="form">' +
      campo('Sucursal destino (Ganadero)', 'sucursalBanco', x.sucursalBanco || 'SCZ', 'text', { ayuda: 'Se usa en las transferencias ACH a otros bancos' }) +
      '</div></fieldset></form>';
    var logos = { logo: x.logo || '', logoOscuro: x.logoOscuro || '' };
    var mEmp = U.modal(x.id ? 'Editar empresa' : 'Nueva empresa', html, [
      x.id ? { texto: 'Eliminar', clase: 'btn btn-fantasma', accion: function () { U.confirmar('Eliminar empresa', 'Se borrará la empresa con todo su personal y planillas. Esta acción no se puede deshacer.', 'Eliminar', function () { D.eliminarEmpresa(x.id); App.refrescar(); }, true); } } : null,
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: 'Guardar', clase: 'btn btn-primario', accion: function (m) {
        var f = U.$('#fEmp', m);
        if (!f.reportValidity()) return false;
        var d = leerForm(f); d.id = x.id; delete d.bmsc; delete d.bancoPagos;
        d.logo = logos.logo; d.logoOscuro = logos.logoOscuro;
        D.guardarEmpresa(d);
        if (!x.id) D.activarEmpresa(d.id);
        App.refrescar(); U.aviso('Empresa guardada');
      } }
    ].filter(Boolean), { ancho: true });
    var prev = function (k) {
      var box = U.$(k === 'logo' ? '#prevLogo' : '#prevLogoOscuro', mEmp.el);
      box.innerHTML = logos[k] ? '<img src="' + e(logos[k]) + '" alt="">' : '<span class="peq suave">Sin logo</span>';
    };
    U.$$('[data-sube]', mEmp.el).forEach(function (bt) {
      bt.onclick = function () {
        var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/svg+xml,image/webp';
        inp.onchange = function () {
          var f = inp.files[0]; if (!f) return;
          if (f.size > 600 * 1024) { U.aviso('El logo pesa mucho (máx. 600 KB). Usa una versión más liviana.', 'error'); return; }
          var r = new FileReader();
          r.onload = function () { logos[bt.dataset.sube] = r.result; prev(bt.dataset.sube); };
          r.readAsDataURL(f);
        };
        inp.click();
      };
    });
    U.$$('[data-quita]', mEmp.el).forEach(function (bt) { bt.onclick = function () { logos[bt.dataset.quita] = ''; prev(bt.dataset.quita); }; });
  }
  V.formEmpresa = formEmpresa;

  /* =========================================================
     PERSONAL
     ========================================================= */
  /* ---------- Orden alfabético (personal y planilla) ---------- */
  var OPC_ORDEN = [['nombre-asc', 'Nombre (A-Z)'], ['nombre-desc', 'Nombre (Z-A)'], ['apellido-asc', 'Apellido (A-Z)'], ['apellido-desc', 'Apellido (Z-A)']];
  function claveOrden(k, campo) {
    switch (campo) {
      case 'apellido': return U.sinAcentos([U.apellidos(k), k.nombres].join(' ')).toLowerCase();
      case 'ci': return String(k.ci || '');
      case 'cargo': return U.sinAcentos(k.cargo || '').toLowerCase();
      case 'ingreso': return k.fechaIngreso || '';
      case 'sueldo': return Calc.num(k.sueldoBasico);
      case 'banco': return U.sinAcentos(k.banco || '').toLowerCase();
      case 'estado': return k.estado || 'ACTIVO';
      default: return U.sinAcentos(U.nombreCompleto(k)).toLowerCase();
    }
  }
  function compararPor(orden) {
    var p = String(orden || 'nombre-asc').split('-'), campo = p[0], sentido = p[1] === 'desc' ? -1 : 1;
    return function (a, b) {
      var x = claveOrden(a, campo), y = claveOrden(b, campo);
      var r = typeof x === 'number' ? x - y : String(x).localeCompare(String(y), 'es', { numeric: true });
      if (!r) r = claveOrden(a, 'nombre').localeCompare(claveOrden(b, 'nombre'), 'es');
      return r * sentido;
    };
  }
  function nombreSegunOrden(k, orden) {
    return /^apellido/.test(orden || '') && U.apellidos(k) ? U.apellidos(k) + ', ' + k.nombres : U.nombreCompleto(k);
  }
  V.compararPor = compararPor;

  var filtroPers = { texto: '', estado: 'ACTIVO', orden: 'nombre-asc' };
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
        }).join('') + '</div><label class="campo" style="flex-direction:row;align-items:center;gap:8px;margin-left:auto">Ordenar <select id="ordPers" style="width:170px">' +
        OPC_ORDEN.map(function (o) { return '<option value="' + o[0] + '"' + (filtroPers.orden === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') +
        (OPC_ORDEN.some(function (o) { return o[0] === filtroPers.orden; }) ? '' : '<option selected value="' + filtroPers.orden + '">Por columna</option>') + '</select></label></div>' +
        '<div class="tabla-caja" style="max-height:66vh"><table class="tabla"><thead><tr>' +
        [['nombre', 'Nombre', 'fija'], ['ci', 'CI'], ['cargo', 'Cargo'], ['ingreso', 'Ingreso'], ['sueldo', 'Sueldo básico', 'num'], ['banco', 'Banco'], [null, 'Cuenta'], [null, 'CUA'], ['estado', 'Estado']].map(function (c) {
          if (!c[0]) return '<th>' + c[1] + '</th>';
          var act = filtroPers.orden.split('-')[0] === c[0] || (c[0] === 'nombre' && /^apellido/.test(filtroPers.orden));
          var flecha = act ? (/desc$/.test(filtroPers.orden) ? ' ↓' : ' ↑') : '';
          return '<th class="ordenable' + (c[2] ? ' ' + c[2] : '') + (act ? ' activo' : '') + '" data-ord="' + c[0] + '" title="Ordenar">' + c[1] + flecha + '</th>';
        }).join('') + '</tr></thead><tbody id="tbPers"></tbody></table></div>';
      cont.innerHTML = h;
      var pintar = function () {
        var t = U.sinAcentos(filtroPers.texto.toLowerCase());
        var lista = todos.filter(function (k) {
          if (filtroPers.estado && (k.estado || 'ACTIVO') !== filtroPers.estado) return false;
          if (!t) return true;
          return U.sinAcentos((U.nombreCompleto(k) + ' ' + k.ci + ' ' + (k.cargo || '')).toLowerCase()).indexOf(t) >= 0;
        }).sort(compararPor(filtroPers.orden));
        var verTodos = filtroPers.estado === '';
        U.$('#tbPers', cont).innerHTML = lista.map(function (k) {
          var falta = !k.cuenta || !k.cua || !k.fechaNac;
          var retirado = (k.estado || 'ACTIVO') === 'RETIRADO';
          return '<tr data-id="' + k.id + '" style="cursor:pointer"' + (verTodos && retirado ? ' class="fila-retirada"' : '') + '><td class="nombre fija">' + e(nombreSegunOrden(k, filtroPers.orden)) + (falta ? ' <span class="etiqueta borrador" title="Faltan datos (cuenta, CUA o fecha de nacimiento)">Completar</span>' : '') +
            (k.terceroActivo === '1' ? ' <span class="etiqueta" title="El banco paga a: ' + e(k.terceroNombre || '') + '">Pago a tercero</span>' : '') +
            '</td><td>' + e(k.ci) + '</td><td>' + e(k.cargo) + '</td><td>' + U.fecha(k.fechaIngreso) + '</td><td class="num">' + bs(k.sueldoBasico) + '</td><td>' + e(k.banco) +
            '</td><td>' + e(k.cuenta) + '</td><td>' + e(k.cua) + '</td><td><span class="etiqueta ' + (retirado ? (verTodos ? 'retirado-rojo' : 'retirado') : '') + '">' + e(k.estado || 'ACTIVO') + '</span></td></tr>';
        }).join('') || '<tr><td colspan="9" class="suave">No hay resultados.</td></tr>';
        U.$$('#tbPers tr[data-id]', cont).forEach(function (tr) { tr.onclick = function () { formEmpleado(D.empleado(tr.dataset.id)); }; });
      };
      pintar();
      U.$('#busca', cont).oninput = function (ev) { filtroPers.texto = ev.target.value; pintar(); };
      U.$$('[data-est]', cont).forEach(function (b) { b.onclick = function () { filtroPers.estado = b.dataset.est; V.personal(cont); }; });
      U.$('#ordPers', cont).onchange = function (ev) { filtroPers.orden = ev.target.value; V.personal(cont); };
      U.$$('th[data-ord]', cont).forEach(function (th) {
        th.onclick = function () {
          var campo = th.dataset.ord, actual = filtroPers.orden.split('-');
          if (campo === 'nombre' && /^apellido/.test(filtroPers.orden)) campo = 'apellido';
          filtroPers.orden = campo + '-' + (actual[0] === campo && actual[1] === 'asc' ? 'desc' : 'asc');
          V.personal(cont);
        };
      });
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
      '<fieldset class="ancho"><legend>Pago a un tercero autorizado</legend>' +
      '<p class="suave peq" style="margin-bottom:10px">Solo si el trabajador autorizó por escrito que su sueldo se deposite a otra persona. Estos datos se usan <b>únicamente en el Excel del Banco Ganadero</b>; boletas, planillas, certificados y entidades siguen con los datos del trabajador.</p><div class="form">' +
      campo('¿Pagar a un tercero?', 'terceroActivo', x.terceroActivo || '0', 'select', { opciones: [['0', 'No'], ['1', 'Sí, con autorización']] }) +
      campo('Nombre completo del tercero', 'terceroNombre', x.terceroNombre, 'text', { ph: 'Como figura en su cuenta' }) +
      campo('CI del tercero', 'terceroCi', x.terceroCi) +
      campo('Banco del tercero', 'terceroBanco', x.terceroBanco, 'select', { opciones: bancos }) +
      campo('N° de cuenta del tercero', 'terceroCuenta', x.terceroCuenta) +
      campo('Respaldo', 'terceroRespaldo', x.terceroRespaldo, 'text', { ph: 'Ej. Carta de autorización del 15/03/2025', ancho: true }) +
      '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Seguridad social e impuestos</legend><div class="form">' +
      campo('CUA / NUA (Gestora)', 'cua', x.cua) + campo('Código dependiente RC-IVA (CUR)', 'codDependiente', x.codDependiente, 'text', { ayuda: 'Código del F-110 (ej. 1234567010)' }) +
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
      x.id ? { texto: 'Boletas de pago', clase: 'btn', accion: function () { location.hash = '#/certificados/' + x.id + '/boletas'; } } : null,
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
        if (d.terceroActivo === '1' && (!d.terceroNombre || !d.terceroCi || !d.terceroBanco || !d.terceroCuenta)) { U.aviso('Completa nombre, CI, banco y cuenta del tercero autorizado', 'error'); return false; }
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
    ['facturasF110', 'Facturas F-110'], ['anticipos', 'Anticipos'], ['otrosDescuentos', 'Otros descuentos']
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
          filas: activos.map(function (k) { return { empleadoId: k.id, dias: '', horasExtra: 0, bonoProduccion: 0, dominicales: 0, otrosBonos: 0, facturasF110: 0, anticipos: 0, otrosDescuentos: 0 }; })
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
      '<div class="acciones"><label class="campo" style="flex-direction:row;align-items:center;gap:8px">Ordenar <select id="ordPl" style="width:160px">' +
      OPC_ORDEN.map(function (o) { return '<option value="' + o[0] + '"' + ((p.orden || 'nombre-asc') === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>' +
      (cerrada ? '<button class="btn" id="reabrir">' + ic('editar') + 'Reabrir</button>' :
        '<button class="btn" id="limpiarPl" title="Borra lo escrito en la planilla">' + ic('borrar') + 'Limpiar</button><button class="btn" id="datosCliente">' + ic('subir') + 'Datos del cliente</button><button class="btn" id="agregar">' + ic('mas') + 'Agregar / quitar personal</button><button class="btn btn-primario" id="cerrar">' + ic('candado') + 'Cerrar planilla</button>') +
      '<a class="btn" href="#/generar/' + p.id + '">' + ic('generar') + 'Generar archivos</a></div></div>' +
      (cerrada ? '<p class="suave peq" style="margin-top:8px">La planilla está cerrada: los montos quedan fijos aunque luego cambien los datos del personal o la configuración. Reábrela si necesitas corregir algo.</p>' :
        '<p class="suave peq" style="margin-top:8px">Escribe en las casillas verdes; todo se calcula y se guarda solo. Haz clic en un nombre para ver el detalle del cálculo. Deja "Días" vacío para que el sistema los calcule por fecha de ingreso/retiro.</p>') + '</div>';

    h += '<div class="tabla-caja" style="max-height:68vh"><table class="tabla" id="tPl"><thead>' +
      '<tr class="grupo-cab"><th class="fija"></th><th colspan="3">Haber</th><th colspan="2">Horas extra</th><th colspan="2">Bonos</th><th></th><th colspan="6">Descuentos</th><th></th><th></th></tr>' +
      '<tr><th class="fija">Trabajador</th><th class="num">Básico</th><th class="num">Días</th><th class="num">Salario ganado</th><th class="num">Cantidad</th><th class="num">Monto</th><th class="num">Antigüedad</th><th class="num">Otros bonos</th>' +
      '<th class="num destacado">Total ganado</th><th class="num">AFP</th><th class="num">ANS</th><th class="num">RC-IVA <span title="Facturas presentadas en el F-110">(Fact.)</span></th><th class="num">Anticipos</th><th class="num">Otros desc.</th><th class="num">Total desc.</th><th class="num destacado">Líquido pagable</th><th class="num">Patronal</th></tr></thead><tbody>';
    calc.filas.forEach(function (x) {
      var f = x.fila, r = x.r, k = x.emp, i = x.idx;
      var inp = function (campoN, cls) {
        var v = f[campoN];
        if (campoN === 'dias' && (v === '' || v === undefined || v === null)) return '<input class="dias" data-i="' + i + '" data-c="dias" placeholder="' + r.dias + '" aria-label="Días"' + (cerrada ? ' disabled' : '') + '>';
        return '<input class="' + (cls || '') + '" data-i="' + i + '" data-c="' + campoN + '" value="' + (Calc.num(v) ? v : '') + '" placeholder="0" inputmode="decimal" aria-label="' + campoN + '"' + (cerrada ? ' disabled' : '') + '>';
      };
      h += '<tr data-i="' + i + '"><td class="nombre fija"><a href="#" data-det="' + i + '">' + e(nombreSegunOrden(k, p.orden)) + '</a><div class="suave peq" style="font-weight:400">' + e(k.cargo || '') + '</div></td>' +
        '<td class="num">' + bs(r.basico) + '</td><td class="num">' + inp('dias', 'dias') + '</td><td class="num" data-o="salarioGanado">' + bs(r.salarioGanado) + '</td>' +
        '<td class="num">' + inp('horasExtra', 'dias') + '</td><td class="num" data-o="montoHorasExtra">' + bs(r.montoHorasExtra) + '</td>' +
        '<td class="num" data-o="bonoAntiguedad" title="' + r.anios + ' año(s) · ' + r.pctAntiguedad + '%">' + bs(r.bonoAntiguedad) + '</td>' +
        '<td class="num">' + inp('otrosBonos') + '</td>' +
        '<td class="num destacado" data-o="totalGanado"><b>' + bs(r.totalGanado) + '</b></td><td class="num" data-o="afp">' + bs(r.afp) + '</td><td class="num" data-o="ans">' + bs(r.ans) + '</td>' +
        '<td class="num"><span data-o="rcIva">' + bs(r.rcIva) + '</span> ' + inp('facturasF110') + '</td><td class="num">' + inp('anticipos') + '</td><td class="num">' + inp('otrosDescuentos') + '</td>' +
        '<td class="num" data-o="totalDescuentos">' + bs(r.totalDescuentos) + '</td><td class="num destacado" data-o="liquido"><b>' + bs(r.liquido) + '</b></td>' +
        '<td class="num suave" data-o="patronal">' + bs(r.cajaSalud + r.gestoraPatronal) + '</td></tr>';
    });
    h += '</tbody><tfoot><tr id="filaTot"></tr></tfoot></table></div>';
    cont.innerHTML = h;
    ligarPeriodo(cont);
    pintarTotales(cont, calc);

    U.$$('[data-det]', cont).forEach(function (a) { a.onclick = function (ev) { ev.preventDefault(); detalleFila(p, +a.dataset.det); }; });
    U.$('#ordPl', cont).onchange = function (ev) { D.ordenarPlanilla(p, ev.target.value, compararPor(ev.target.value)); App.refrescar(); };
    if (!cerrada) {
      U.$$('#tPl input', cont).forEach(function (inp) {
        inp.addEventListener('input', function () {
          var i = +inp.dataset.i, c = inp.dataset.c;
          p.filas[i][c] = c === 'dias' && inp.value.trim() === '' ? '' : inp.value.trim();
          D.guardarPlanilla(p);
          var nc = D.calcularPlanilla(p);
          var x = nc.filas.find(function (k) { return k.idx === i; }), tr = U.$('tr[data-i="' + i + '"]', cont);
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
            var col = U.$$('#tPl input[data-c="' + inp.dataset.c + '"]', cont), pos = col.indexOf(inp);
            var sig = col[pos + (ev.key === 'ArrowUp' ? -1 : 1)];
            if (sig) { sig.focus(); sig.select(); }
          }
        });
      });
      U.$('#fPago', cont).onchange = function (ev) { p.fechaPago = ev.target.value; D.guardarPlanilla(p); };
      U.$('#fGlosa', cont).onchange = function (ev) { p.glosa = ev.target.value; D.guardarPlanilla(p); };
      U.$('#agregar', cont).onclick = function () { gestionarFilas(p); };
      U.$('#datosCliente', cont).onclick = function () { datosCliente(p); };
      U.$('#limpiarPl', cont).onclick = function () {
        U.modal('Limpiar planilla de ' + nombrePeriodo(p),
          '<p>Se borrará todo lo escrito en la planilla: <b>días</b> (vuelven al cálculo automático), <b>horas extra</b>, <b>otros bonos</b>, <b>facturas F-110</b>, <b>anticipos</b> y <b>otros descuentos</b>.</p>' +
          '<p class="suave">El personal de la planilla, la fecha de pago y la glosa se mantienen.</p>',
          [{ texto: 'Cancelar', clase: 'btn btn-fantasma' }, { texto: 'Limpiar', clase: 'btn btn-peligro', accion: function () {
            p.filas.forEach(function (f) {
              f.dias = ''; f.horasExtra = 0; f.bonoProduccion = 0; f.dominicales = 0; f.otrosBonos = 0; f.facturasF110 = 0; f.anticipos = 0; f.otrosDescuentos = 0;
            });
            D.guardarPlanilla(p); App.refrescar(); U.aviso('Planilla limpia');
          } }]);
      };
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
      '</td><td class="num">' + t.horasExtra + '</td><td class="num">' + bs(t.montoHorasExtra) + '</td><td class="num">' + bs(t.bonoAntiguedad) + '</td><td class="num">' + bs(t.otrosBonos) + '</td><td class="num destacado">' + bs(t.totalGanado) + '</td><td class="num">' + bs(t.afp) + '</td><td class="num">' + bs(t.ans) + '</td><td class="num">' + bs(t.rcIva) +
      '</td><td class="num">' + bs(t.anticipos) + '</td><td class="num">' + bs(t.otrosDescuentos) + '</td><td class="num">' + bs(t.totalDescuentos) + '</td><td class="num destacado">' + bs(t.liquido) + '</td><td class="num">' + bs(t.cajaSalud + t.gestoraPatronal) + '</td>';
  }

  function detalleFila(p, i) {
    var c = D.calcularPlanilla(p), x = c.filas.find(function (k) { return k.idx === i; }), r = x.r, d = r.rcIvaDetalle, cfg = c.cfg;
    var l = function (a, b, tot) { return '<span class="' + (tot ? 'tot' : '') + '">' + a + '</span><span class="num ' + (tot ? 'tot' : '') + '">' + b + '</span>'; };
    var html = '<div class="rejilla r2"><div><h4 class="kicker" style="margin-bottom:8px">Ingresos</h4><div class="detalle-calc">' +
      l('Sueldo básico', bs(r.basico)) + l('Días pagados', r.dias) + l('Salario ganado (básico ÷ 30 × días)', bs(r.salarioGanado)) +
      l('Antigüedad: ' + r.anios + ' año(s) → ' + r.pctAntiguedad + '% de ' + cfg.antiguedadBaseSMN + ' SMN', bs(r.bonoAntiguedad)) +
      l('Horas extra: ' + r.horasExtra + ' × ' + bs(r.valorHoraExtra) + ' (recargo ' + cfg.recargoHoraExtra + '%)', bs(r.montoHorasExtra)) +
      (r.bonoProduccion ? l('Bono producción', bs(r.bonoProduccion)) : '') + (r.dominicales ? l('Dominicales', bs(r.dominicales)) : '') + l('Otros bonos', bs(r.otrosBonos)) + l('TOTAL GANADO', bs(r.totalGanado), true) + '</div></div>' +
      '<div><h4 class="kicker" style="margin-bottom:8px">Descuentos</h4><div class="detalle-calc">' +
      l('AFP ' + cfg.afpLaboral + '%', bs(r.afp)) + l('Aporte Nacional Solidario', bs(r.ans)) + l('RC-IVA', bs(r.rcIva)) + l('Anticipos', bs(r.anticipos)) + l('Otros descuentos', bs(r.otrosDescuentos)) +
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
      { texto: 'Boleta de pago', clase: 'btn', accion: function () { Doc.imprimir(Doc.boletas(D.empresa(p.empresaId), p, c, [x.fila.empleadoId]), false, 'Boleta de Pago - ' + Calc.MESES[p.mes - 1] + ' ' + p.anio + ' - ' + U.nombreCompleto(x.emp)); } },
      { texto: 'Cerrar', clase: 'btn btn-primario' }], { ancho: true });
  }

  /* ---------- Datos del cliente: horas extra (y avisos) desde su hoja de cálculo ---------- */
  function datosCliente(p) {
    var html = '<p>Abre la hoja que les manda el cliente (Google Sheets o Excel), <b>selecciona las filas con sus encabezados</b> (desde "Nombre(s)" hasta la última persona), copia con <b>Ctrl + C</b> y pega aquí con <b>Ctrl + V</b>.</p>' +
      '<textarea id="pegado" style="min-height:160px;font-family:monospace;font-size:13px" placeholder="Pega aquí las filas copiadas…"></textarea>' +
      '<p class="suave peq">También puedes subir el archivo: <button type="button" class="btn btn-sm" id="archCli">' + ic('subir') + 'Elegir Excel</button> <span id="nomArch"></span></p>' +
      '<div class="alerta"><span>Solo se actualizan las <b>horas extra</b> de las personas que vienen en la lista. Las demás personas de la planilla no cambian.</span></div>';
    var entrada = null;
    var m = U.modal('Datos del cliente · ' + nombrePeriodo(p), html, [
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: 'Revisar', clase: 'btn btn-primario', accion: function (mm) {
        var datos = Imp.leer(entrada || U.$('#pegado', mm).value);
        if (!datos.filas.length) { U.aviso('No se encontraron filas con nombres', 'error'); return false; }
        revisarDatosCliente(p, datos);
      } }
    ], { ancho: true });
    U.$('#archCli', m.el).onclick = function () {
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.xlsx,.xls,.csv';
      inp.onchange = function () {
        var f = inp.files[0]; if (!f) return;
        var r = new FileReader();
        r.onload = function (ev) {
          try {
            var wb = XLSX.read(new Uint8Array(ev.target.result), { type: 'array', cellDates: true });
            entrada = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: true, defval: '' });
            U.$('#nomArch', m.el).textContent = '✓ ' + f.name; U.$('#pegado', m.el).value = '';
          } catch (err) { U.aviso('No se pudo leer el archivo', 'error'); }
        };
        r.readAsArrayBuffer(f);
      };
      inp.click();
    };
    U.$('#pegado', m.el).oninput = function () { entrada = null; U.$('#nomArch', m.el).textContent = ''; };
  }

  function revisarDatosCliente(p, datos) {
    var calc = D.calcularPlanilla(p);
    var emps = calc.filas.map(function (x) { return x.emp; });
    var pares = Imp.emparejar(datos.filas, emps);
    var cfg = calc.cfg;
    var opciones = function (sel) {
      return '<option value="">— No aplicar —</option>' + calc.filas.slice().sort(function (a, b) { return U.nombreCompleto(a.emp).localeCompare(U.nombreCompleto(b.emp), 'es'); })
        .map(function (x) { return '<option value="' + x.idx + '"' + (sel && x.emp.id === sel.id ? ' selected' : '') + '>' + e(U.nombreCompleto(x.emp)) + '</option>'; }).join('');
    };
    var idxDe = function (emp) { var x = emp && calc.filas.find(function (k) { return k.emp.id === emp.id; }); return x ? x.idx : null; };
    var filasHtml = pares.map(function (par, j) {
      var c = par.cliente, emp = par.emp, avisos = [];
      if (emp && c.totalGanado && Math.abs(c.totalGanado - Calc.num(emp.sueldoBasico)) > 0.05) avisos.push('Sueldo: cliente ' + bs(c.totalGanado) + ' · sistema ' + bs(emp.sueldoBasico) + ' <label style="white-space:nowrap"><input type="checkbox" data-sueldo="' + j + '"> actualizar</label>');
      if (c.fechaFin) avisos.push('<b>Tiene fecha fin: ' + U.fecha(c.fechaFin) + '</b> (¿retiro?)');
      var verif = '';
      if (emp && c.montoHE) {
        var r = Calc.calcularFila(emp, { dias: 30, horasExtra: c.horasExtra }, { anio: p.anio, mes: p.mes }, cfg);
        verif = Math.abs(r.montoHorasExtra - c.montoHE) <= 0.05 ? '<span class="etiqueta">✓ Coincide: ' + bs(c.montoHE) + '</span>' : '<span class="etiqueta retirado-rojo">✗ No coincide</span><div class="peq" style="margin-top:4px">Cliente: ' + bs(c.montoHE) + '<br>Sistema: ' + bs(r.montoHorasExtra) + '</div>';
      }
      var actual = emp ? Calc.num((p.filas[idxDe(emp)] || {}).horasExtra) : 0;
      return '<tr data-j="' + j + '"' + (emp ? '' : ' class="fila-retirada"') + '><td class="nombre">' + e(c.nombres + ' ' + c.apellidos) + '</td>' +
        '<td><select data-emp="' + j + '" style="min-width:200px">' + opciones(emp) + '</select></td>' +
        '<td class="num">' + (emp ? actual : '—') + ' → <b>' + c.horasExtra + '</b></td><td>' + verif + '</td><td class="peq">' + (avisos.join('<br>') || '<span class="suave">—</span>') + '</td></tr>';
    }).join('');
    var sinPareja = pares.filter(function (x) { return !x.emp; }).length;
    var html = '<p>Se leyeron <b>' + pares.length + '</b> filas. Revisa que cada una corresponda a la persona correcta (puedes cambiarla en la lista).' +
      (sinPareja ? ' <b style="color:var(--error)">' + sinPareja + ' no se encontraron</b> en la planilla: elige a la persona o déjala en "No aplicar".' : '') + '</p>' +
      '<div class="tabla-caja" style="max-height:52vh"><table class="tabla"><thead><tr><th>En la lista del cliente</th><th>Persona en la planilla</th><th class="num">Horas extra</th><th>¿El monto coincide?</th><th>Avisos</th></tr></thead><tbody>' + filasHtml + '</tbody></table></div>' +
      '<p class="suave peq"><b>¿El monto coincide?</b> El cliente ya calcula cuánto pagar de horas extra; el sistema hace su propio cálculo y los compara. ✓ = son iguales, todo bien. ✗ = son distintos: revisa el sueldo de esa persona o el recargo de horas extra en Configuración antes de aplicar.</p>';
    U.modal('Revisar datos del cliente', html, [
      { texto: 'Cancelar', clase: 'btn btn-fantasma' },
      { texto: 'Aplicar a la planilla', clase: 'btn btn-primario', accion: function (mm) {
        var n = 0, ns = 0, vistos = {};
        for (var j = 0; j < pares.length; j++) {
          var v = U.$('select[data-emp="' + j + '"]', mm).value;
          if (v === '') continue;
          if (vistos[v]) { U.aviso('Una persona está elegida dos veces: ' + U.nombreCompleto(calc.filas.find(function (k) { return k.idx === +v; }).emp), 'error'); return false; }
          vistos[v] = 1;
        }
        pares.forEach(function (par, j) {
          var v = U.$('select[data-emp="' + j + '"]', mm).value;
          if (v === '') return;
          var fila = p.filas[+v]; fila.horasExtra = par.cliente.horasExtra; n++;
          var chk = U.$('input[data-sueldo="' + j + '"]', mm);
          if (chk && chk.checked) {
            var emp = D.empleado(fila.empleadoId);
            if (emp) { emp.sueldoBasico = par.cliente.totalGanado; D.guardarEmpleado(emp); ns++; }
          }
        });
        D.guardarPlanilla(p); App.refrescar();
        U.aviso('Horas extra cargadas para ' + n + ' persona(s)' + (ns ? ' · ' + ns + ' sueldo(s) actualizado(s)' : '') + '. Las demás no cambiaron.');
      } }
    ], { ancho: true });
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
      marcados.forEach(function (id) { if (!p.filas.some(function (f) { return f.empleadoId === id; })) p.filas.push({ empleadoId: id, dias: '', horasExtra: 0, bonoProduccion: 0, dominicales: 0, otrosBonos: 0, facturasF110: 0, anticipos: 0, otrosDescuentos: 0 }); });
      D.ordenarPlanilla(p, p.orden || 'nombre-asc', compararPor(p.orden || 'nombre-asc')); App.refrescar();
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
    var ver = function (id) { return '<button class="btn btn-sm" data-ver="' + id + '" title="Ver en pantalla completa">' + ic('ojo') + 'Ver</button>'; };

    /* Mensaje de cada mes para la representante legal */
    var hora = new Date().getHours(), saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
    var nombreRep = String(emp.representante || '').trim().split(/\s+/)[0] || '';
    nombreRep = nombreRep ? nombreRep.charAt(0).toUpperCase() + nombreRep.slice(1).toLowerCase() : '';
    var mensaje = saludo + (nombreRep ? ' ' + nombreRep : '') + ', ¿cómo está?\n\n' +
      'Le enviamos la planilla de sueldos del mes de ' + Calc.MESES[p.mes - 1].toLowerCase() + ' ' + p.anio + ' para que la pueda cargar al banco. También le enviamos los siguientes detalles:\n\n' +
      [X.NOMBRES.gerencia, X.NOMBRES.ganadero, X.NOMBRES.sueldos, X.NOMBRES.boletas, X.NOMBRES.aportes, X.NOMBRES.auditoria, X.NOMBRES.asiento].map(function (n) { return '* ' + n; }).join('\n');
    h += '<div class="seccion"><h2>Mensaje para el cliente</h2><div class="tarjeta gen"><div class="ic">' + ic('mensaje') + '</div><div style="min-width:0;flex:1">' +
      '<h3>Mensaje del mes</h3><p>Se arma solo con el saludo, el nombre de la representante legal y el mes. Puedes cambiar el texto antes de enviarlo.</p>' +
      '<textarea id="txtMsj" rows="13" style="font-size:14px;line-height:1.5">' + e(mensaje) + '</textarea>' +
      '<div class="acciones" style="margin-top:10px"><button class="btn btn-sm btn-primario" id="msjCopiar">' + ic('copiar') + 'Copiar</button>' +
      '<button class="btn btn-sm" id="msjWa">' + ic('mensaje') + 'Abrir en WhatsApp</button><button class="btn btn-sm" id="msjMail">' + ic('correo') + 'Abrir en correo</button></div></div></div></div>';

    h += '<div class="seccion"><h2>Para la empresa</h2><div class="rejilla r2">' +
      tarjeta('grafico', 'Resumen para gerencia', 'Cuánto se paga, a quién y a qué banco, con gráficos y comparación con el mes anterior. Para aprobar antes de cargar al banco.', ver('ger') + b('gerPdf', 'Imprimir / PDF', 'imprimir', true)) +
      tarjeta('certificado', 'Planilla para auditoría', 'El mismo formato de Excel que pide auditoría cada mes, también en PDF.', ver('aud') + b('audXls', 'Descargar Excel', 'excel', true) + b('audPdf', 'Imprimir / PDF', 'imprimir')) +
      tarjeta('planilla', 'Planilla de sueldos y salarios', 'La planilla oficial con firmas, en hoja horizontal.', ver('pl') + b('plPdf', 'Imprimir / PDF', 'imprimir', true) + b('plXls', 'Excel', 'excel')) +
      tarjeta('boleta', 'Boletas de pago', 'Dos formas: dos personas por hoja, o en duplicado (la misma boleta 2 veces por hoja: arriba para el trabajador y abajo para la empresa, para recortar).', ver('boletas') + b('boletas', 'Imprimir / PDF', 'imprimir', true) + b('boletasDup', 'Duplicado (trabajador + empresa)', 'imprimir')) +
      tarjeta('salud', 'Aportes y previsiones', 'Caja de salud, Gestora patronal, indemnización y aguinaldo.', ver('pat') + b('patPdf', 'Imprimir / PDF', 'imprimir', true)) +
      tarjeta('libro', 'Asiento contable', 'Asiento de la planilla listo para el sistema contable.', ver('as') + b('asPdf', 'Imprimir / PDF', 'imprimir', true) + b('asXls', 'Excel', 'excel')) +
      '</div></div>';
    h += '<div class="seccion"><h2>Para el banco</h2><div class="rejilla r2">' +
      tarjeta('banco', 'Banco Ganadero', 'El mismo Excel que se carga al banco para el pago masivo (cuentas Ganadero y ACH a otros bancos).', ver('ganadero') + b('ganadero', 'Descargar Excel', 'excel', true)) +
      '</div></div>';
    h += '<div class="seccion"><h2>Para las entidades</h2><div class="rejilla r2">' +
      tarjeta('gobierno', 'Ministerio de Trabajo', 'Planilla con las 46 columnas del formato del Ministerio.', ver('min') + b('min', 'Descargar Excel', 'excel', true)) +
      tarjeta('empresa', 'Gestora Pública', 'Planilla de aportes con novedades de ingreso y retiro.', ver('gestora') + b('gestora', 'Descargar Excel', 'excel', true)) +
      tarjeta('salud', 'Caja de Salud', 'Planilla de aportes del ' + calc.cfg.cajaSalud + '% patronal.', ver('caja') + b('caja', 'Descargar Excel', 'excel', true)) +
      tarjeta('impuesto', 'Impuestos Nacionales · RC-IVA', 'Planilla de dependientes (F-608) y detalle del cálculo de cada persona.', ver('imp') + b('imp', 'Descargar Excel', 'excel', true)) +
      '</div></div>';
    cont.innerHTML = h;
    U.$('#selPl', cont).onchange = function (ev) { location.hash = '#/generar/' + ev.target.value; };
    var txtMsj = function () { return U.$('#txtMsj', cont).value; };
    U.$('#msjCopiar', cont).onclick = function () {
      var t = txtMsj();
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { U.aviso('Mensaje copiado'); }, function () {
        var a = U.$('#txtMsj', cont); a.select(); document.execCommand('copy'); U.aviso('Mensaje copiado');
      });
    };
    U.$('#msjWa', cont).onclick = function () { window.open('https://wa.me/?text=' + encodeURIComponent(txtMsj()), '_blank'); };
    U.$('#msjMail', cont).onclick = function () {
      location.href = 'mailto:' + encodeURIComponent(emp.correoRepresentante || '') + '?subject=' + encodeURIComponent('Planilla de sueldos ' + Calc.MESES[p.mes - 1] + ' ' + p.anio + ' - ' + emp.razonSocial) + '&body=' + encodeURIComponent(txtMsj());
    };

    /* Planilla del mes anterior (para comparar en el resumen de gerencia) */
    var anterior = function () {
      var m = p.mes - 1, a = p.anio; if (m < 1) { m = 12; a--; }
      var pa = D.planillaDe(p.empresaId || emp.id, a, m);
      return pa ? { p: pa, calc: D.calcularPlanilla(pa) } : null;
    };
    var fecha = p.fechaPago || U.hoyIso(), glosa = p.glosa || ('Sueldo ' + nombrePeriodo(p));
    var avisoFaltan = function (lista, que) {
      if (lista && lista.length) U.modal('Archivo descargado, pero revisa', '<div class="alerta aviso"><span>A estas personas les falta ' + que + ': <b>' + e(lista.join(', ')) + '</b>. Complétalo en Personal y vuelve a descargar.</span></div>');
      else U.aviso('Archivo descargado');
    };
    var acciones = {
      plPdf: function () { Doc.imprimir(Doc.planillaSueldos(emp, p, calc), true, X.nombreDoc(X.NOMBRES.sueldos, emp, p)); },
      gerPdf: function () { Doc.imprimir(Doc.resumenGerente(emp, p, calc, anterior()), false, X.nombreDoc(X.NOMBRES.gerencia, emp, p)); },
      audXls: function () { X.auditoria(emp, p, calc); U.aviso('Archivo descargado'); },
      audPdf: function () { Doc.imprimir(Doc.auditoria(emp, p, calc), true, X.nombreDoc(X.NOMBRES.auditoria, emp, p)); },
      plXls: function () { X.planillaSueldos(emp, p, calc); U.aviso('Archivo descargado'); },
      boletas: function () { Doc.imprimir(Doc.boletas(emp, p, calc), false, X.nombreDoc(X.NOMBRES.boletas, emp, p)); },
      boletasDup: function () { Doc.imprimir(Doc.boletas(emp, p, calc, null, true), false, X.nombreDoc(X.NOMBRES.boletas + ' (duplicado)', emp, p)); },
      patPdf: function () { Doc.imprimir(Doc.planillaPatronal(emp, p, calc), true, X.nombreDoc(X.NOMBRES.aportes, emp, p)); },
      asPdf: function () { Doc.imprimir(Doc.asiento(emp, p, calc), false, X.nombreDoc(X.NOMBRES.asiento, emp, p)); },
      asXls: function () { X.asiento(emp, p, calc); U.aviso('Archivo descargado'); },
      ganadero: function () { avisoFaltan(X.bancoGanadero(emp, p, calc, fecha, glosa), 'el banco o la cuenta'); },
      min: function () { X.ministerio(emp, p, calc); U.aviso('Archivo descargado'); },
      gestora: function () { avisoFaltan(X.gestora(emp, p, calc), 'el CUA'); },
      caja: function () { X.cajaSalud(emp, p, calc); U.aviso('Archivo descargado'); },
      imp: function () { avisoFaltan(X.impuestos(emp, p, calc), 'el código de dependiente (CUR)'); }
    };
    U.$$('[data-g]', cont).forEach(function (bt) { bt.onclick = function () { acciones[bt.dataset.g](); }; });

    /* Vista previa en pantalla completa */
    var faltanTxt = function (lista, que) { return lista && lista.length ? 'A estas personas les falta ' + que + ': <b>' + e(lista.join(', ')) + '</b>. Complétalo en Personal antes de descargar.' : ''; };
    var xl = function (fn) { return Visor.capturarExcel(fn); };
    var accImprimir = function (id) { return { texto: 'Imprimir / PDF', icono: 'imprimir', primario: true, fn: acciones[id] }; };
    var accExcel = function (id, txt) { return { texto: txt || 'Descargar Excel', icono: 'excel', primario: !txt, fn: acciones[id] }; };
    var per = ' · ' + nombrePeriodo(p);
    var vistasPrevias = {
      pl: function () {
        var c = xl(function () { X.planillaSueldos(emp, p, calc); });
        return { titulo: 'Planilla de sueldos y salarios' + per, vistas: [{ nombre: 'Documento', html: Doc.planillaSueldos(emp, p, calc) }, { nombre: 'Excel', libro: c.wb }], acciones: [accImprimir('plPdf'), accExcel('plXls', 'Excel')] };
      },
      ger: function () { return { titulo: 'Resumen para gerencia' + per, vistas: [{ nombre: 'Resumen', html: Doc.resumenGerente(emp, p, calc, anterior()) }], acciones: [accImprimir('gerPdf')] }; },
      aud: function () {
        var c = xl(function () { X.auditoria(emp, p, calc); });
        return { titulo: 'Planilla para auditoría' + per, vistas: [{ nombre: 'Excel', libro: c.wb }, { nombre: 'PDF', html: Doc.auditoria(emp, p, calc) }], acciones: [accExcel('audXls'), { texto: 'Imprimir / PDF', icono: 'imprimir', fn: acciones.audPdf }] };
      },
      boletas: function () {
        return { titulo: 'Boletas de pago' + per, vistas: [{ nombre: 'Dos por hoja', html: Doc.boletas(emp, p, calc) }, { nombre: 'Duplicado (trabajador + empresa)', html: Doc.boletas(emp, p, calc, null, true) }],
          acciones: [{ texto: 'Imprimir / PDF', icono: 'imprimir', primario: true, fn: acciones.boletas }, { texto: 'Duplicado', icono: 'imprimir', fn: acciones.boletasDup }] };
      },
      pat: function () { return { titulo: 'Aportes y previsiones' + per, vistas: [{ nombre: 'Documento', html: Doc.planillaPatronal(emp, p, calc) }], acciones: [accImprimir('patPdf')] }; },
      as: function () {
        var c = xl(function () { X.asiento(emp, p, calc); });
        return { titulo: 'Asiento contable' + per, vistas: [{ nombre: 'Documento', html: Doc.asiento(emp, p, calc) }, { nombre: 'Excel', libro: c.wb }], acciones: [accImprimir('asPdf'), accExcel('asXls', 'Excel')] };
      },
      ganadero: function () {
        var c = xl(function () { return X.bancoGanadero(emp, p, calc, fecha, glosa); });
        var ter = (c.resultado && c.resultado.terceros) || [];
        var avisoT = ter.length ? 'Pago a tercero autorizado (con carta de respaldo): <b>' + e(ter.join(' · ')) + '</b>. Solo este archivo del banco lleva los datos del tercero.' : '';
        return { titulo: c.nombre.replace(/\.xlsx$/, ''), vistas: [{ libro: c.wb, aviso: [faltanTxt(c.resultado, 'el banco o la cuenta'), avisoT].filter(Boolean).join('<br>') }], acciones: [accExcel('ganadero')] };
      },
      min: function () { var c = xl(function () { X.ministerio(emp, p, calc); }); return { titulo: 'Ministerio de Trabajo' + per, vistas: [{ libro: c.wb }], acciones: [accExcel('min')] }; },
      gestora: function () {
        var c = xl(function () { return X.gestora(emp, p, calc); });
        return { titulo: 'Gestora Pública' + per, vistas: [{ libro: c.wb, aviso: faltanTxt(c.resultado, 'el CUA') }], acciones: [accExcel('gestora')] };
      },
      caja: function () { var c = xl(function () { X.cajaSalud(emp, p, calc); }); return { titulo: 'Caja de Salud' + per, vistas: [{ libro: c.wb }], acciones: [accExcel('caja')] }; },
      imp: function () {
        var c = xl(function () { return X.impuestos(emp, p, calc); });
        return { titulo: 'Impuestos Nacionales · RC-IVA' + per, vistas: [{ libro: c.wb, aviso: faltanTxt(c.resultado, 'el código de dependiente (CUR)') }], acciones: [accExcel('imp')] };
      }
    };
    U.$$('[data-ver]', cont).forEach(function (bt) { bt.onclick = function () { Visor.abrir(vistasPrevias[bt.dataset.ver]()); }; });
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
    U.$('#agPdf', cont).onclick = function () { Doc.imprimir(Doc.aguinaldos(emp, anioAg, lista2()), true, X.nombreDoc('Planilla de Aguinaldos ' + anioAg, emp, null)); };
    U.$('#agXls', cont).onclick = function () { X.aguinaldos(emp, anioAg, lista2()); U.aviso('Archivo descargado'); };
  };

  /* =========================================================
     CERTIFICADOS DE TRABAJO
     ========================================================= */
  /* La hoja carta se achica para entrar completa en la columna de vista previa */
  function ajustarPrevia(caja) {
    var hojas = U.$$('.hoja', caja); if (!hojas.length) return;
    hojas.forEach(function (h) { h.style.zoom = ''; });
    var z = Math.min(1, (caja.clientWidth - 24) / (hojas[0].offsetWidth || 1));
    hojas.forEach(function (h) { h.style.zoom = z; });
  }
  V.certificados = function (cont, idEmp, pestana) {
    var emp = D.empresaActiva(); if (!emp) { cont.innerHTML = sinEmpresa(); return; }
    if (idEmp === 'boletas') { pestana = 'boletas'; idEmp = null; }
    var todos = D.empleados().slice().sort(function (a, b) { return U.nombreCompleto(a).localeCompare(U.nombreCompleto(b), 'es'); });
    var sel = (idEmp && D.empleado(idEmp)) || null;
    var esBol = pestana === 'boletas';
    var opcTrab = [['', '— Elegir —']].concat(todos.map(function (k) { return [k.id, U.nombreCompleto(k) + ((k.estado || 'ACTIVO') === 'RETIRADO' ? ' (retirado)' : '')]; }));
    var h = '<section class="portada" style="background-image:url(assets/fotos/contrato-euclides-oscuro.jpg);min-height:200px"><div class="txt"><span class="kicker">Documentos del personal</span>' +
      '<h1 style="font-size:clamp(30px,3.6vw,44px)">Certificados y boletas</h1><p>Elige a la persona, revisa el documento y descárgalo en PDF.</p></div></section>' +
      '<div class="pestanas seccion" style="margin-top:18px"><button data-pest="cert" aria-selected="' + !esBol + '">' + ic('certificado') + ' Certificado de trabajo</button>' +
      '<button data-pest="boletas" aria-selected="' + esBol + '">' + ic('boleta') + ' Boletas de pago</button></div>';
    if (!esBol) {
      h += '<div class="rejilla r2" style="align-items:start"><div class="tarjeta"><form class="form" id="fCert">' +
        campo('Trabajador', 'emp', sel ? sel.id : '', 'select', { ancho: true, opciones: opcTrab }) +
        campo('Fecha del certificado', 'fecha', U.hoyIso(), 'date') +
        campo('¿Mostrar el sueldo?', 'conSueldo', '0', 'select', { opciones: [['0', 'No'], ['1', 'Sí']] }) +
        campo('Texto sobre su desempeño', 'conducta', 'Durante su permanencia demostró responsabilidad, honestidad y dedicación en las funciones encomendadas.', 'textarea', { ancho: true }) +
        '</form><div class="acciones" style="margin-top:14px"><button class="btn btn-primario" id="certPdf">' + ic('imprimir') + 'Imprimir / PDF</button></div></div>' +
        '<div class="vista-previa" id="certPrev"></div></div>';
    } else {
      h += '<div class="rejilla r2" style="align-items:start"><div class="tarjeta"><form class="form" id="fBol">' +
        campo('Trabajador', 'emp', sel ? sel.id : '', 'select', { ancho: true, opciones: opcTrab }) + '</form>' +
        '<div id="bolMeses" style="margin-top:14px"></div></div>' +
        '<div class="vista-previa" id="bolPrev"></div></div>';
    }
    cont.innerHTML = h;
    U.$$('[data-pest]', cont).forEach(function (b) {
      b.onclick = function () {
        var f = U.$('#fCert', cont) || U.$('#fBol', cont), id = f ? leerForm(f).emp : '';
        location.hash = '#/certificados/' + (id || '') + (b.dataset.pest === 'boletas' ? (id ? '/boletas' : 'boletas') : '');
      };
    });

    if (!esBol) {
      var prev = function () {
        var d = leerForm(U.$('#fCert', cont)), k = D.empleado(d.emp);
        U.$('#certPrev', cont).innerHTML = k ? Doc.certificado(emp, k, { fecha: d.fecha, conSueldo: d.conSueldo === '1', textoConducta: d.conducta }) : '<p class="suave" style="padding:20px;text-align:center">Elige un trabajador para ver el certificado.</p>';
        ajustarPrevia(U.$('#certPrev', cont));
        return { d: d, k: k };
      };
      prev();
      U.$('#fCert', cont).oninput = prev; U.$('#fCert', cont).onchange = prev;
      U.$('#certPdf', cont).onclick = function () {
        var x = prev(); if (!x.k) { U.aviso('Elige un trabajador', 'error'); return; }
        Doc.imprimir(Doc.certificado(emp, x.k, { fecha: x.d.fecha, conSueldo: x.d.conSueldo === '1', textoConducta: x.d.conducta }), false, 'Certificado de Trabajo - ' + U.nombreCompleto(x.k));
      };
      return;
    }

    /* ----- Boletas de pago por persona ----- */
    var marcados = null, dup = false; // ids de planillas elegidas · en duplicado
    var mesesDe = function (id) {
      return D.planillas().filter(function (p) { return p.filas.some(function (f) { return f.empleadoId === id; }); })
        .sort(function (a, b) { return (b.anio * 12 + b.mes) - (a.anio * 12 + a.mes); });
    };
    var elegidas = function (id) { return mesesDe(id).filter(function (p) { return marcados.indexOf(p.id) >= 0; }); };
    var pintar = function () {
      var id = leerForm(U.$('#fBol', cont)).emp, k = D.empleado(id), caja = U.$('#bolMeses', cont), pv = U.$('#bolPrev', cont);
      if (!k) { caja.innerHTML = ''; pv.innerHTML = '<p class="suave" style="padding:20px;text-align:center">Elige un trabajador para ver sus boletas.</p>'; return; }
      var meses = mesesDe(id);
      if (!meses.length) { caja.innerHTML = '<div class="alerta aviso"><span>Esta persona todavía no está en ninguna planilla.</span></div>'; pv.innerHTML = ''; return; }
      if (marcados === null) marcados = [meses[0].id];
      caja.innerHTML = '<p class="peq" style="margin-bottom:8px"><b>¿Qué meses?</b> Marca uno o varios. Salen en un solo PDF, dos boletas por hoja.</p>' +
        '<div class="acciones" style="margin-bottom:10px"><button type="button" class="btn btn-sm" data-ult="1">Último mes</button>' +
        '<button type="button" class="btn btn-sm" data-ult="3">Últimos 3 meses</button><button type="button" class="btn btn-sm" data-ult="6">Últimos 6 meses</button></div>' +
        '<div class="lista-meses">' + meses.map(function (p) {
          var c = D.calcularPlanilla(p), x = c.filas.find(function (f) { return f.fila.empleadoId === id; });
          return '<label class="check-mes"><input type="checkbox" value="' + p.id + '"' + (marcados.indexOf(p.id) >= 0 ? ' checked' : '') + '><span>' + nombrePeriodo(p) +
            (p.estado !== 'cerrada' ? ' <span class="etiqueta borrador">Borrador</span>' : '') + '</span><b>Bs ' + bs(x ? x.r.liquido : 0) + '</b></label>';
        }).join('') + '</div>' +
        '<label class="check-mes" style="margin-top:12px"><input type="checkbox" id="bolDup"' + (dup ? ' checked' : '') + '><span>En duplicado <span class="suave peq">(cada boleta 2 veces por hoja: trabajador y empresa)</span></span><span></span></label>' +
        '<div class="acciones" style="margin-top:14px"><button class="btn btn-primario" id="bolPdf">' + ic('imprimir') + 'Imprimir / PDF</button></div>';
      U.$$('[data-ult]', caja).forEach(function (b) { b.onclick = function () { marcados = meses.slice(0, +b.dataset.ult).map(function (p) { return p.id; }); pintar(); }; });
      U.$$('input[type=checkbox]', caja).forEach(function (c) {
        c.onchange = function () { marcados = U.$$('input[type=checkbox]:checked', caja).map(function (z) { return z.value; }); pintar(); };
      });
      U.$('#bolDup', caja).onchange = function (ev) { dup = ev.target.checked; pintar(); };
      var lista = elegidas(id);
      pv.innerHTML = lista.length ? Doc.boletasPersona(emp, id, lista, dup) : '<p class="suave" style="padding:20px;text-align:center">Marca al menos un mes.</p>';
      ajustarPrevia(pv);
      U.$('#bolPdf', caja).onclick = function () {
        var l = elegidas(id); if (!l.length) { U.aviso('Marca al menos un mes', 'error'); return; }
        var rango = l.length === 1 ? nombrePeriodo(l[0]) : nombrePeriodo(l[l.length - 1]) + ' a ' + nombrePeriodo(l[0]);
        Doc.imprimir(Doc.boletasPersona(emp, id, l, dup), false, 'Boletas de Pago' + (dup ? ' (duplicado)' : '') + ' - ' + U.nombreCompleto(k) + ' - ' + rango);
      };
    };
    U.$('#fBol', cont).onchange = function () { marcados = null; pintar(); };
    pintar();
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
      '<fieldset class="ancho"><legend>Ingresos</legend><div class="form">' + n('Recargo hora extra (%)', 'recargoHoraExtra', '50% = ×1,5, acordado con el cliente para el trabajo de fin de semana (sábados 4 h activadores y soporte; domingos 8 h soporte). La Ley General del Trabajo indica 100%.', '1') +
      campo('Redondear valor hora a centavos', 'redondearValorHora', c.redondearValorHora ? '1' : '0', 'select', { opciones: [['0', 'No (como la planilla del cliente)'], ['1', 'Sí']] }) +
      n('Bono antigüedad: base en SMN', 'antiguedadBaseSMN', 'D.S. 21137: 3 salarios mínimos. Tu Excel usaba 1.', '1') +
      campo('Bono antigüedad proporcional a días', 'antiguedadProporcional', c.antiguedadProporcional ? '1' : '0', 'select', { opciones: [['1', 'Sí'], ['0', 'No']] }) + '</div></fieldset>' +
      '<fieldset class="ancho"><legend>Aportes de la empresa</legend><div class="form">' + n('Caja de salud (%)', 'cajaSalud') + n('Gestora patronal (%)', 'gestoraPatronal') +
      n('Previsión indemnización (%)', 'provIndemnizacion') + n('Previsión aguinaldo (%)', 'provAguinaldo') + '</div></fieldset>' +
      '</form><div class="acciones"><button class="btn btn-primario" id="gCfg">Guardar configuración</button><button class="btn btn-fantasma" id="rCfg">Volver a los valores por defecto</button></div></div>' +
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
      nc.redondearValorHora = d.redondearValorHora === '1';
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
