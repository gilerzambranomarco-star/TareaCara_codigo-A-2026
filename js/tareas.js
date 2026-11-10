"use strict";
/* Lista de tareas: filtros, completar y eliminar (manipulacion del DOM) */
(function () {
  var lista = document.getElementById("lista");
  var buscar = document.getElementById("buscar");
  var estado = document.getElementById("estado");
  var aviso = document.getElementById("estado-lista");

  function boton(texto, clase, alHacerClic) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "boton " + clase;
    b.textContent = texto;
    b.addEventListener("click", alHacerClic);
    return b;
  }

  function crearItem(t) {
    var li = document.createElement("li");
    li.className = "tarjeta tarea" + (t.hecha ? " hecha" : "");

    var info = document.createElement("div");
    var titulo = document.createElement("h2");
    titulo.className = "titulo";
    titulo.textContent = t.titulo;
    var detalle = document.createElement("p");
    detalle.textContent = t.materia + " · Entrega: " + t.fecha + " · ";
    var etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta" + (t.prioridad === "Alta" ? " alta" : "");
    etiqueta.textContent = "Prioridad " + t.prioridad;
    detalle.appendChild(etiqueta);
    info.appendChild(titulo);
    info.appendChild(detalle);
    if (t.descripcion) {
      var d = document.createElement("p");
      d.textContent = t.descripcion;
      info.appendChild(d);
    }

    var acciones = document.createElement("div");
    acciones.className = "acciones";
    acciones.appendChild(boton(t.hecha ? "Marcar pendiente" : "Marcar completada", "secundario", function () {
      Almacen.alternar(t.id);
      pintar();
    }));
    acciones.appendChild(boton("Eliminar", "peligro", function () {
      Almacen.eliminar(t.id);
      pintar();
    }));
    li.appendChild(info);
    li.appendChild(acciones);
    return li;
  }

  function pintar() {
    var texto = buscar.value.trim().toLowerCase();
    var filtro = estado.value;
    var todas = Almacen.leer().sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    var visibles = todas.filter(function (t) {
      var coincide = t.titulo.toLowerCase().indexOf(texto) !== -1;
      var ok = filtro === "todas" || (filtro === "pendientes" && !t.hecha) || (filtro === "completadas" && t.hecha);
      return coincide && ok;
    });
    lista.textContent = "";
    visibles.forEach(function (t) { lista.appendChild(crearItem(t)); });
    aviso.textContent = visibles.length === 0
      ? "No hay tareas para mostrar."
      : "Se muestran " + visibles.length + " de " + todas.length + " tareas.";
  }

  buscar.addEventListener("input", pintar);
  estado.addEventListener("change", pintar);
  pintar();
})();
