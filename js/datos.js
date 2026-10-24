/* NUMMEROS RRHH — almacenamiento de datos
   Los datos se guardan en este navegador (localStorage) y nunca se suben a GitHub.
   Usa "Copia de seguridad" para descargar un archivo y moverlo a otra computadora. */
(function (global) {
  'use strict';
  var CLAVE = 'nummeros-rrhh-v1';

  /* Catálogo de bancos (códigos ACH) */
  var BANCOS = [
    { abrev: 'BNB', nombre: 'Banco Nacional de Bolivia', ach: '1001' },
    { abrev: 'BMSC', nombre: 'Banco Mercantil Santa Cruz', ach: '1003' },
    { abrev: 'BCP', nombre: 'Banco de Crédito de Bolivia', ach: '1005' },
    { abrev: 'BDB', nombre: 'Banco Do Brasil', ach: '1008' },
    { abrev: 'BISA', nombre: 'Banco Bisa', ach: '1009' },
    { abrev: 'UNION', nombre: 'Banco Unión', ach: '1014' },
    { abrev: 'ECONOMICO', nombre: 'Banco Económico', ach: '1016' },
    { abrev: 'SOL', nombre: 'Banco Solidario (BancoSol)', ach: '1017' },
    { abrev: 'GANADERO', nombre: 'Banco Ganadero', ach: '1018' },
    { abrev: 'FIE', nombre: 'Banco FIE', ach: '1033' },
    { abrev: 'FORTALEZA', nombre: 'Banco Fortaleza', ach: '1034' },
    { abrev: 'PRODEM', nombre: 'Banco PRODEM', ach: '1036' },
    { abrev: 'ECOFUTURO', nombre: 'Banco PyME Ecofuturo', ach: '5006' },
    { abrev: 'COMUNIDAD', nombre: 'Banco PyME de la Comunidad', ach: '74003' },
    { abrev: 'JESUS NAZARENO', nombre: 'Cooperativa Jesús Nazareno', ach: '3001' },
    { abrev: 'FATIMA', nombre: 'Cooperativa Fátima', ach: '3003' },
    { abrev: 'LA MERCED', nombre: 'Cooperativa La Merced', ach: '3004' },
    { abrev: 'E-FECTIVO', nombre: 'Pago Móvil E-fectivo', ach: '53001' },
    { abrev: 'TIGO MONEY', nombre: 'Tigo Money', ach: '5300' }
  ];
  /* Alias que aparecen en las planillas viejas */
  var ALIAS_BANCO = { 'ECONÓMICO': 'ECONOMICO', 'UNIÓN': 'UNION', 'BANCO SOL': 'SOL', 'BANCOSOL': 'SOL', 'MERCANTIL': 'BMSC', 'BANCO UNION': 'UNION', 'BANCO GANADERO': 'GANADERO', 'BANCO ECONOMICO': 'ECONOMICO' };

  function bancoPorAbrev(ab) {
    var a = U.mayus(U.sinAcentos(String(ab || '').trim()));
    a = ALIAS_BANCO[a] || a;
    for (var i = 0; i < BANCOS.length; i++) if (U.sinAcentos(BANCOS[i].abrev) === a) return BANCOS[i];
    return null;
  }

  function estadoVacio() {
    return {
      version: 1,
      config: JSON.parse(JSON.stringify(Calc.CONFIG_BASE)),
      empresas: [],
      empleados: [],
      planillas: [],
      empresaActiva: null,
      tema: 'auto'
    };
  }

  var estado = estadoVacio();

  /* La empresa ya no paga sueldos por el BMSC: se borran sus datos guardados para evitar cruces */
  function limpiarBancoMercantil() {
    estado.empresas.forEach(function (e) { delete e.bmsc; delete e.bancoPagos; });
  }

  /* v2: horas extra al 50% sin redondear el valor hora, como paga Milthagor */
  function migrarConfig() {
    var c = estado.config;
    if ((c.versionConfig || 1) < 2) {
      c.recargoHoraExtra = 50; c.redondearValorHora = false; c.versionConfig = 2;
      estado.planillas.forEach(function (p) {
        if (p.configUsada && (p.configUsada.versionConfig || 1) < 2) { p.configUsada.redondearValorHora = true; p.configUsada.versionConfig = 2; }
      });
      guardar();
    }
  }

  function cargar() {
    try {
      var txt = localStorage.getItem(CLAVE);
      if (txt) {
        var d = JSON.parse(txt);
        estado = Object.assign(estadoVacio(), d);
        estado.config = Object.assign(JSON.parse(JSON.stringify(Calc.CONFIG_BASE)), d.config || {});
        limpiarBancoMercantil();
        migrarConfig();
      }
    } catch (e) { console.warn('No se pudo leer los datos guardados', e); }
    return estado;
  }

  function guardar() {
    try {
      estado.actualizado = new Date().toISOString();
      localStorage.setItem(CLAVE, JSON.stringify(estado));
      return true;
    } catch (e) {
      U.aviso('No se pudo guardar: el navegador no tiene espacio o bloquea el guardado.', 'error');
      return false;
    }
  }

  var D = {
    BANCOS: BANCOS,
    bancoPorAbrev: bancoPorAbrev,
    get: function () { return estado; },
    cargar: cargar,
    guardar: guardar,

    /* ---------- Empresas ---------- */
    empresas: function () { return estado.empresas; },
    empresa: function (id) { return estado.empresas.find(function (e) { return e.id === id; }) || null; },
    empresaActiva: function () { return D.empresa(estado.empresaActiva) || estado.empresas[0] || null; },
    activarEmpresa: function (id) { estado.empresaActiva = id; guardar(); },
    guardarEmpresa: function (emp) {
      if (!emp.id) { emp.id = U.id(); estado.empresas.push(emp); }
      else {
        var i = estado.empresas.findIndex(function (e) { return e.id === emp.id; });
        if (i >= 0) estado.empresas[i] = emp; else estado.empresas.push(emp);
      }
      if (!estado.empresaActiva) estado.empresaActiva = emp.id;
      guardar(); return emp;
    },
    eliminarEmpresa: function (id) {
      estado.empresas = estado.empresas.filter(function (e) { return e.id !== id; });
      estado.empleados = estado.empleados.filter(function (e) { return e.empresaId !== id; });
      estado.planillas = estado.planillas.filter(function (p) { return p.empresaId !== id; });
      if (estado.empresaActiva === id) estado.empresaActiva = estado.empresas[0] ? estado.empresas[0].id : null;
      guardar();
    },

    /* ---------- Personal ---------- */
    empleados: function (empresaId) {
      empresaId = empresaId || (D.empresaActiva() || {}).id;
      return estado.empleados.filter(function (e) { return e.empresaId === empresaId; })
        .sort(function (a, b) { return U.nombreCompleto(a).localeCompare(U.nombreCompleto(b), 'es'); });
    },
    empleado: function (id) { return estado.empleados.find(function (e) { return e.id === id; }) || null; },
    empleadoPorCi: function (ci, empresaId) {
      ci = String(ci || '').trim();
      return estado.empleados.find(function (e) { return e.empresaId === empresaId && String(e.ci).trim() === ci; }) || null;
    },
    guardarEmpleado: function (e) {
      if (!e.id) { e.id = U.id(); e.creado = new Date().toISOString(); estado.empleados.push(e); }
      else {
        var i = estado.empleados.findIndex(function (x) { return x.id === e.id; });
        if (i >= 0) estado.empleados[i] = e; else estado.empleados.push(e);
      }
      guardar(); return e;
    },
    eliminarEmpleado: function (id) {
      estado.empleados = estado.empleados.filter(function (e) { return e.id !== id; });
      guardar();
    },

    /* ---------- Planillas ---------- */
    planillas: function (empresaId) {
      empresaId = empresaId || (D.empresaActiva() || {}).id;
      return estado.planillas.filter(function (p) { return p.empresaId === empresaId; })
        .sort(function (a, b) { return (b.anio * 100 + b.mes) - (a.anio * 100 + a.mes); });
    },
    planilla: function (id) { return estado.planillas.find(function (p) { return p.id === id; }) || null; },
    planillaDe: function (empresaId, anio, mes) {
      return estado.planillas.find(function (p) { return p.empresaId === empresaId && p.anio === anio && p.mes === mes; }) || null;
    },
    /* Ordena las filas de la planilla (también define el orden de bancos, boletas y entidades) */
    ordenarPlanilla: function (p, orden, comparar) {
      var cerrada = p.estado === 'cerrada';
      var empDe = function (f) { return (cerrada ? f.empleado : D.empleado(f.empleadoId)) || f.empleado || D.empleado(f.empleadoId) || {}; };
      p.orden = orden;
      p.filas.sort(function (a, b) { return comparar(empDe(a), empDe(b)); });
      D.guardarPlanilla(p);
    },
    guardarPlanilla: function (p) {
      if (!p.id) { p.id = U.id(); estado.planillas.push(p); }
      else {
        var i = estado.planillas.findIndex(function (x) { return x.id === p.id; });
        if (i >= 0) estado.planillas[i] = p; else estado.planillas.push(p);
      }
      guardar(); return p;
    },
    eliminarPlanilla: function (id) {
      estado.planillas = estado.planillas.filter(function (p) { return p.id !== id; });
      guardar();
    },

    /* Calcula todas las filas de una planilla (con la configuración guardada en la planilla si está cerrada) */
    calcularPlanilla: function (p) {
      var cfg = p.estado === 'cerrada' && p.configUsada ? p.configUsada : estado.config;
      var filas = p.filas.map(function (f, idx) {
        var emp = f.estado === 'cerrada' || p.estado === 'cerrada' ? (f.empleado || D.empleado(f.empleadoId)) : (D.empleado(f.empleadoId) || f.empleado);
        if (!emp) return null;
        var r = Calc.calcularFila(emp, f, { anio: p.anio, mes: p.mes }, cfg);
        return { fila: f, emp: emp, r: r, idx: idx };
      }).filter(Boolean);
      return { filas: filas, totales: Calc.totalizar(filas.map(function (x) { return x.r; })), cfg: cfg };
    },

    /* Total ganado de un empleado en un mes (desde planillas guardadas) */
    totalGanadoMes: function (empleadoId, anio, mes) {
      var emp = D.empleado(empleadoId); if (!emp) return 0;
      var p = D.planillaDe(emp.empresaId, anio, mes); if (!p) return 0;
      var c = D.calcularPlanilla(p);
      var x = c.filas.find(function (k) { return k.fila.empleadoId === empleadoId; });
      return x ? x.r.totalGanado : 0;
    },

    /* ---------- Configuración ---------- */
    config: function () { return estado.config; },
    guardarConfig: function (c) { estado.config = c; guardar(); },
    restaurarConfig: function () { estado.config = JSON.parse(JSON.stringify(Calc.CONFIG_BASE)); guardar(); },

    /* ---------- Copias de seguridad ---------- */
    exportarRespaldo: function () {
      return JSON.stringify({ sistema: 'NUMMEROS RRHH', fecha: new Date().toISOString(), datos: estado }, null, 1);
    },
    importarRespaldo: function (txt) {
      var d = JSON.parse(txt);
      if (!d || !d.datos || !Array.isArray(d.datos.empleados)) throw new Error('El archivo no es una copia de seguridad de NUMMEROS RRHH.');
      estado = Object.assign(estadoVacio(), d.datos);
      limpiarBancoMercantil();
      migrarConfig();
      guardar();
    },
    borrarTodo: function () { estado = estadoVacio(); guardar(); },
    tema: function (t) { if (t) { estado.tema = t; guardar(); } return estado.tema; }
  };

  global.D = D;
})(window);
