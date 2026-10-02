// ==========================================
// Taller #1 DOM - Nodos
// Ejercicios 1, 2 y 3
// ==========================================

// --- Ejercicio 1 ---
// Cree una etiqueta h1 con el texto “my presentation” y ubicarla antes del div.
const h1 = document.createElement("h1");
h1.textContent = "my presentation";

const div = document.querySelector("div");
div.before(h1);


// --- Ejercicio 2 ---
// Desde Javascript cree una etiqueta p con el texto “my best friend is mickey”
// y ubicarla después de la p que está dentro del div.
const pAmigo = document.createElement("p");
pAmigo.textContent = "my best friend is mickey";

const pDentroDiv = div.querySelector("p");
pDentroDiv.after(pAmigo);


// --- Ejercicio 3 ---
// Seleccione el título (etiqueta h1), y agregue un color a la letra,
// también seleccione la última p y póngale una letra en negrita y el color de fondo que desee.
const titulo = document.querySelector("h1");
titulo.style.color = "#1a5276"; // Color a la letra

const parrafos = document.querySelectorAll("p");
const ultimoP = parrafos[parrafos.length - 1]; // Selecciona la última <p>
ultimoP.style.fontWeight = "bold"; // Letra en negrita
ultimoP.style.backgroundColor = "#fcf3cf"; // Color de fondo
ultimoP.style.padding = "6px";
ultimoP.style.borderRadius = "4px";
