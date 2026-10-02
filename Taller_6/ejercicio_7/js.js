// ==========================================
// Taller #1 DOM - Nodos
// Ejercicio 7
// ==========================================

// Seleccionar las etiquetas <p> que tienen la clase "ps"
// y agregarles un color y un tamaño de letra desde Javascript.

const parrafosPs = document.querySelectorAll("p.ps");

parrafosPs.forEach(parrafo => {
    parrafo.style.color = "#8e44ad";       // Color de texto
    parrafo.style.fontSize = "22px";       // Tamaño de letra
    parrafo.style.fontWeight = "600";      // Seminegrita para mejor visibilidad
});
