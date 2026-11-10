"use strict";
/* Pagina de inicio: calcula y muestra el resumen */
(function () {
  var tareas = Almacen.leer();
  var hoy = Almacen.hoyISO();
  var limite = Almacen.enDiasISO(3);
  var pendientes = tareas.filter(function (t) { return !t.hecha; });
  var proximas = pendientes.filter(function (t) { return t.fecha >= hoy && t.fecha <= limite; });
  var datos = [
    ["Total", tareas.length],
    ["Pendientes", pendientes.length],
    ["Completadas", tareas.length - pendientes.length],
    ["Vencen en 3 días", proximas.length]
  ];
  var ul = document.getElementById("resumen");
  datos.forEach(function (d) {
    var li = document.createElement("li");
    var cifra = document.createElement("span");
    cifra.className = "cifra";
    cifra.textContent = d[1];
    li.appendChild(cifra);
    li.appendChild(document.createTextNode(d[0]));
    ul.appendChild(li);
  });
})();
