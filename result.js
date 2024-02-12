document.addEventListener("DOMContentLoaded", function () {
  const jugadores = [];

  for (let i = 1; i <= 4; i++) {
    const jugador = sessionStorage.getItem(`jugador${i}`);
    if (jugador) {
      jugadores.push(JSON.parse(jugador));
    }
  }

  jugadores.sort((a, b) => b.puntos - a.puntos);

  const tbody = document
    .getElementById("tablaJugadores")
    .getElementsByTagName("tbody")[0];
  jugadores.forEach((jugador, index) => {
    const fila = tbody.insertRow();
    const celdaLugar = fila.insertCell(0);
    const celdaNombre = fila.insertCell(1);
    const celdaPuntos = fila.insertCell(2);

    celdaLugar.textContent = index + 1;
    celdaNombre.textContent = jugador.nombre;
    celdaPuntos.textContent = jugador.puntos;
  });
});

function guardar() {
  let maxPuntos = 0;
  let jugadorConMasPuntos = null;

  // 1. Iterar sobre los jugadores guardados en sessionStorage
  for (let i = 1; i <= 4; i++) {
    const jugador = JSON.parse(sessionStorage.getItem(`jugador${i}`));
    if (jugador) {
      // 2. Verificar y crear la key en localStorage si no existe
      if (!localStorage.getItem(jugador.nombre)) {
        localStorage.setItem(jugador.nombre, "0");
      }

      // 3. Determinar quién tiene más puntos
      if (jugador.puntos > maxPuntos) {
        maxPuntos = jugador.puntos;
        jugadorConMasPuntos = jugador.nombre;
      }
    }
  }


  if (jugadorConMasPuntos) {
    const puntosActuales = parseInt(
      localStorage.getItem(jugadorConMasPuntos),
      10
    );
    localStorage.setItem(jugadorConMasPuntos, (puntosActuales + 1).toString());
  }
  
  sessionStorage.clear();
  window.location.href = "index.html";
}
