var turno = 0;
var indexJugador = 0;

//Arreglo con los 4 objetos que representan a los jugadores
let jugadores = [JSON.parse(sessionStorage.getItem('jugador1')),JSON.parse(sessionStorage.getItem('jugador2')), JSON.parse(sessionStorage.getItem('jugador3')), JSON.parse(sessionStorage.getItem('jugador4'))]

var idturno = document.getElementById("turnos");
idturno.textContent = turno;

document.addEventListener("DOMContentLoaded", function () {
  let jugador1 = JSON.parse(sessionStorage.getItem("jugador1"));
  console.log(jugador1)

  //Crear arreglo que contendrá los numeros que ya hayan salido
  let numeros = [];
  sessionStorage.setItem("numerosSacados", JSON.stringify(numeros));

  // Mostrar los valores en la página
  var nombreJugador = document.getElementById("jugador");
  nombreJugador.textContent = jugador1.nombre;

  // Acceder al atributo 'matriz' del objeto j1
  let matriz = jugador1.matriz;
  console.log(matriz)

  imprimirMatriz(matriz);
});

//Funcion para generar una matriz desde 0
function imprimirMatriz(matriz) {
  let carton = document.getElementById("carton");
  const tabla = document.createElement("table");
  let arreglo = JSON.parse(sessionStorage.getItem("numerosSacados"));

  for (let i = 0; i < matriz.length; i++) {
    let fila = document.createElement("tr");

    for (let j = 0; j < matriz[i].length; j++) {
      let celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      if (arreglo.includes(parseInt(celda.textContent))) {
        celda.style.backgroundColor = "red";
      }
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  carton.appendChild(tabla);
}


function ModificarMatriz(matriz) {
  const carton = document.getElementById("carton");
  while (carton.firstChild) {
      carton.removeChild(carton.firstChild);
  }
  imprimirMatriz(matriz);
}


function siguiente() {
  indexJugador = indexJugador + 1;

  if (indexJugador === 4) {
    indexJugador = 0;
  }

  let jugador = jugadores[indexJugador];

  document.getElementById("jugador").textContent = jugador.nombre;
  ModificarMatriz(jugador.matriz);
}


function Actual() {
  let jugador = jugadores[indexJugador];
  elementact = JSON.parse(elementoActual);

  document.getElementById("jugador").textContent = jugador.nombre;
  ModificarMatriz(jugador.matriz);
}


function anterior() {
  indexJugador = indexJugador - 1;

  if (indexJugador === -1) {
    indexJugador = 3;
  }

  let jugador = jugadores[indexJugador];

  document.getElementById("jugador").textContent = jugador.nombre;
  ModificarMatriz(jugador.matriz);
}

function salir() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
