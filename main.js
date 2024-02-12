function redirigir() {
  window.location.href = "form.html";
}

function mostrarDatos() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  let items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    items.push({ nombre: key, victorias: parseInt(value, 10) });
  }

  items.sort((a, b) => b.victorias - a.victorias);

  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.nombre}</td><td>${item.victorias}</td>`;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", mostrarDatos);
