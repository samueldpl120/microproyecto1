var turno = 1;
var indexJugador = 0;
var numerosObtenidos = [];

//Arreglo con los 4 objetos que representan a los jugadores
let jugadores = [
  JSON.parse(sessionStorage.getItem("jugador1")),
  JSON.parse(sessionStorage.getItem("jugador2")),
  JSON.parse(sessionStorage.getItem("jugador3")),
  JSON.parse(sessionStorage.getItem("jugador4")),
];

var idturno = document.getElementById("turnos");
idturno.textContent = turno;

document.addEventListener("DOMContentLoaded", function () {

  let jugador1 = JSON.parse(sessionStorage.getItem("jugador1"));
  console.log(jugador1);

  var nombreJugador = document.getElementById("jugador");
  nombreJugador.textContent = jugador1.nombre;

  let matriz = jugador1.matriz;
  console.log(matriz);

  imprimirMatriz(matriz);
});

function imprimirMatriz(matriz) {
  let carton = document.getElementById("carton");
  const tabla = document.createElement("table");

  for (let i = 0; i < matriz.length; i++) {
    let fila = document.createElement("tr");

    for (let j = 0; j < matriz[i].length; j++) {
      let celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      if (numerosObtenidos.includes(parseInt(celda.textContent))) {
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

function mostrarNumero() {
  var numeroAleatorio = Math.floor(Math.random() * 50) + 1;
  console.log(numeroAleatorio);
  if (!numerosObtenidos.includes(numeroAleatorio)) {
    numerosObtenidos.push(numeroAleatorio);
    let numero = document.getElementById("numero");
    numero.textContent = numeroAleatorio;
  } else {
    while (numerosObtenidos.includes(numeroAleatorio)) {
      var numeroAleatorio = Math.floor(Math.random() * 50) + 1;
    }
    numerosObtenidos.push(numeroAleatorio);
    let numero = document.getElementById("numero");
    numero.textContent = numeroAleatorio;
  }
  document.getElementById("popUp").style.display = "block";
}

function cerrarPopUp() {
  document.getElementById("popUp").style.display = "none";
  turno = turno + 1;
  var idturno = document.getElementById("turnos");
  idturno.textContent = turno;
}

function filas(matriz, arreglo) {
  var filasCompletas = 0;

  matriz.forEach(function(fila) {
    var filaEnArreglo = fila.every(function(elemento) {
      return arreglo.includes(elemento);
    });

    if (filaEnArreglo) {
      filasCompletas++;
    }
  });

  return filasCompletas;
}

function columnas(matriz, arreglo) {
  return matriz[0].reduce((acum, _, columnIndex) => {
    const columnaCompleta = matriz.every(row => arreglo.includes(row[columnIndex]));
    return acum + (columnaCompleta ? 1 : 0);
  }, 0);
}

function diagonales(matriz, arreglo) {
  const diagonalPrincipalContenida = matriz.every((row, i) => arreglo.includes(row[i]));
  const diagonalSecundariaContenida = matriz.every((row, i) => arreglo.includes(row[matriz.length - 1 - i]));
  let suma = 0;
  if (diagonalPrincipalContenida) suma += 2;
  if (diagonalSecundariaContenida) suma += 2;
  return suma;
}

function CartonLleno(matriz, arreglo) {
  return matriz.flat().every(numero => arreglo.includes(numero));
}
