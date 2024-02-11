document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let n = document.getElementById("tamano").value

  
  //Guardar los datos del formulario en objetos
  let jugador1 = {
    nombre: document.getElementById("jugador1").value,
    matriz:  generarMatriz(parseInt(n)),
    puntuacion: 0,
  };
  let jugador2 = {
    nombre: document.getElementById("jugador2").value,
    matriz: generarMatriz(parseInt(n)),
    puntuacion: 0,
  };
  let jugador3 = {
    nombre: document.getElementById("jugador3").value,
    matriz: generarMatriz(parseInt(n)),
    puntuacion: 0,
  };
  let jugador4 = {
    nombre: document.getElementById("jugador4").value,
    matriz: generarMatriz(parseInt(n)),
    puntuacion: 0,
  };

  //Guardar datos en sessionStorage para utilizarlos en la pagina de juego
  sessionStorage.setItem("jugador1", JSON.stringify(jugador1));
  sessionStorage.setItem("jugador2", JSON.stringify(jugador2));
  sessionStorage.setItem("jugador3", JSON.stringify(jugador3));
  sessionStorage.setItem("jugador4", JSON.stringify(jugador4));
  
  //Navegar a la pagina de juego
  window.location.href = "juego.html";
});

//Funcion para generar numeros del 1 al 50
function generarNumeros() {
  let numeros = [];
  for (let i = 1; i <= 50; i++) {
    numeros.push(i);
  }
  return numeros;
}

function obtenerNumeroAleatorio(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const numero = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return numero;
}

function generarMatriz(n) {
  var matriz = [];
  var usar = [];
  let disponible = generarNumeros();
  
  let max = document.getElementById("tamano").value;
  const tamano = parseInt(max)*parseInt(max); //maximo de numeros en la matriz
  var count = 0
  
  while(count < tamano){
    var numAleatorio = obtenerNumeroAleatorio(disponible);
    if(!usar.includes(numAleatorio)){
      usar.push(numAleatorio)
      count++;
    }
  }

  for (let i = 0; i < n; i++) {
    matriz[i] = [];
    for (let j = 0; j < n; j++) {
      var num = obtenerNumeroAleatorio(usar)
      matriz[i][j] = num; 
    }
  }

  return matriz;
}
