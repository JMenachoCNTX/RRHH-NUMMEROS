/* NUMMEROS RRHH — leer los datos que manda el cliente cada mes
   (filas copiadas de su Google Sheet / Excel: Nombre(s), Apellido(s), Total Ganado, Fecha Fin, Horas extra…)
   Solo se actualizan las personas que vienen en la lista; las demás de la planilla no se tocan. */
(function (global) {
  'use strict';

  function norm(s) { return U.sinAcentos(String(s || '')).toLowerCase().replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function normCab(s) { return U.sinAcentos(String(s || '')).toUpperCase().replace(/[^A-Z]/g, ''); }

  /* Encabezados que reconocemos (comparados sin espacios ni acentos) */
  var CABS = {
    nombres: ['NOMBRES', 'NOMBRE'],
    apellidos: ['APELLIDOS', 'APELLIDO'],
    totalGanado: ['TOTALGANADOBS', 'TOTALGANADO', 'SUELDO', 'SUELDOBASICO', 'HABERBASICO'],
    fechaInicio: ['FECHADEINICIO', 'FECHAINICIO', 'FECHADEINGRESO'],
    fechaFin: ['FECHAFIN', 'FECHADEFIN', 'FECHARETIRO', 'FECHADERETIRO'],
    horasExtra: ['HORASEXTRA', 'HORASEXTRAS', 'HE', 'CANTHORASEXTRA'],
    montoHE: ['HREXTRA', 'MONTOHORASEXTRA', 'MONTOHE']
  };
  /* Orden de columnas de la hoja del cliente, por si se pega sin encabezados */
  var ORDEN_CLIENTE = { nombres: 0, apellidos: 1, totalGanado: 2, fechaInicio: 4, fechaFin: 5, horasExtra: 6, montoHE: 10 };

  /* texto pegado (separado por tabulaciones) o filas de Excel → [{nombres, apellidos, totalGanado, horasExtra, ...}] */
  function leer(entrada) {
    var filas = Array.isArray(entrada) ? entrada : String(entrada || '').replace(/\r/g, '').split('\n').map(function (l) { return l.split('\t'); });
    filas = filas.filter(function (r) { return r.some(function (c) { return String(c).trim() !== ''; }); });
    if (!filas.length) return { filas: [], conCabecera: false };
    var iCab = -1, idx = {};
    for (var i = 0; i < Math.min(filas.length, 10) && iCab < 0; i++) {
      var cab = filas[i].map(normCab);
      if (cab.indexOf('NOMBRES') >= 0 || cab.indexOf('NOMBRE') >= 0) {
        iCab = i;
        Object.keys(CABS).forEach(function (k) {
          // la cabecera "Total Hora extra" no debe confundirse con "Horas extra"
          for (var j = 0; j < cab.length; j++) { if (CABS[k].indexOf(cab[j]) >= 0 && idx[k] === undefined) idx[k] = j; }
        });
        if (idx.totalGanado === undefined) cab.forEach(function (c, j) { if (idx.totalGanado === undefined && /^TOTALGANADO/.test(c) && !/DIA|HR|HORA/.test(c)) idx.totalGanado = j; });
      }
    }
    if (iCab < 0) idx = ORDEN_CLIENTE;
    var datos = filas.slice(iCab + 1).map(function (r) {
      var g = function (k) { return idx[k] === undefined ? '' : r[idx[k]]; };
      var nom = String(g('nombres') || '').trim(), ap = String(g('apellidos') || '').trim();
      if (!nom && !ap) return null;
      if (/^total/i.test(nom)) return null;
      var fin = String(g('fechaFin') || '').trim();
      return {
        nombres: nom, apellidos: ap,
        totalGanado: Calc.num(g('totalGanado')),
        fechaInicio: U.aIso(g('fechaInicio')),
        fechaFin: /^[-–—]?$/.test(fin) ? '' : U.aIso(fin),
        horasExtra: Calc.num(g('horasExtra')),
        montoHE: Calc.num(g('montoHE'))
      };
    }).filter(Boolean);
    return { filas: datos, conCabecera: iCab >= 0 };
  }

  /* Busca a la persona de la planilla que corresponde a cada fila del cliente.
     Compara nombre y apellidos sin acentos; acepta nombres cortados ("Peñarrieta Reye"). */
  function puntaje(fila, emp) {
    var a = norm(fila.nombres + ' ' + fila.apellidos).split(' ').filter(Boolean);
    var b = norm(U.nombreCompleto(emp)).split(' ').filter(Boolean);
    if (!a.length || !b.length) return 0;
    var hits = 0;
    a.forEach(function (w) {
      if (b.some(function (x) { return x === w || (w.length >= 3 && x.indexOf(w) === 0); })) hits++;
    });
    var primerNombre = norm(emp.nombres).split(' ')[0];
    var paterno = norm(emp.apPaterno || emp.apMaterno).split(' ')[0];
    var tieneNombre = a.indexOf(primerNombre) >= 0;
    var tieneApellido = !paterno || a.some(function (w) { return w === paterno || (w.length >= 3 && paterno.indexOf(w) === 0); });
    if (!tieneNombre || !tieneApellido) return 0;
    return hits / Math.max(a.length, 1);
  }
  function emparejar(filasCliente, empleados) {
    var usados = {};
    return filasCliente.map(function (f) {
      var mejor = null, pMejor = 0, empate = false;
      empleados.forEach(function (e) {
        var p = puntaje(f, e);
        if (p > pMejor) { mejor = e; pMejor = p; empate = false; } else if (p > 0 && p === pMejor) empate = true;
      });
      if (empate || pMejor < 0.5 || (mejor && usados[mejor.id])) mejor = null;
      if (mejor) usados[mejor.id] = true;
      return { cliente: f, emp: mejor };
    });
  }

  global.Imp = { leer: leer, emparejar: emparejar };
})(window);
