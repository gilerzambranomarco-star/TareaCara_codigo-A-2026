"use strict";
/* Capa de datos: guarda y lee las tareas en localStorage */
var Almacen = (function () {
  var CLAVE = "tareaclara.tareas";

  function leer() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch (e) {
      return [];
    }
  }
  function guardar(lista) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lista));
    } catch (e) { /* almacenamiento no disponible */ }
  }
  function agregar(tarea) {
    var lista = leer();
    tarea.id = Date.now();
    tarea.hecha = false;
    lista.push(tarea);
    guardar(lista);
  }
  function alternar(id) {
    var lista = leer();
    lista.forEach(function (t) { if (t.id === id) { t.hecha = !t.hecha; } });
    guardar(lista);
  }
  function eliminar(id) {
    guardar(leer().filter(function (t) { return t.id !== id; }));
  }
  function aISO(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function hoyISO() { return aISO(new Date()); }
  function enDiasISO(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    return aISO(d);
  }
  return { leer: leer, agregar: agregar, alternar: alternar, eliminar: eliminar, hoyISO: hoyISO, enDiasISO: enDiasISO };
})();
