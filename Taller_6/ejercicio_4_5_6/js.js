// ==========================================
// Taller #1 DOM - Nodos
// Ejercicios 4, 5 y 6
// ==========================================

// --- Ejercicio 4 ---
// Modifique la etiqueta <ol> por <ul> (función replaceWith),
// agregue un atributo class con el nombre "listado".
const ol = document.querySelector("ol");
const ul = document.createElement("ul");
ul.setAttribute("class", "listado");
ul.innerHTML = ol.innerHTML; // Conserva los elementos <li> hijos
ol.replaceWith(ul);


// --- Ejercicio 5 ---
// Cree una clase en css con estilos para pintar el color y cambiar la letra a cursiva,
// agréguele la clase al elemento h2 desde Javascript y elimine el ítem "preparar almuerzo" (función remove).
const h2 = document.querySelector("h2");
h2.classList.add("h2-estilo");

// Eliminar el ítem "preparar almuerzo"
const itemsLi = document.querySelectorAll("li");
itemsLi.forEach(li => {
    if (li.textContent.trim().toLowerCase() === "preparar almuerzo") {
        li.remove();
    }
});


// --- Ejercicio 6 ---
// Agregue un ítem que tenga como texto “Recoger a los niños” después del ítem “hacer mercado”.
// Agregue la clase 'cumplido' a los ítems "desayunar, hacer almuerzo / hacer el mercado y recoger a los niños",
// y la clase 'fallido' al ítem "ir al banco".

// 1. Crear e insertar el nuevo elemento <li>
const nuevoLi = document.createElement("li");
nuevoLi.textContent = "Recoger a los niños";

const itemMercado = Array.from(document.querySelectorAll("li")).find(li =>
    li.textContent.toLowerCase().includes("mercado")
);

if (itemMercado) {
    itemMercado.after(nuevoLi);
}

// 2. Asignar clases 'cumplido' y 'fallido' según corresponda
const todosLosItems = document.querySelectorAll("li");
todosLosItems.forEach(li => {
    const texto = li.textContent.trim().toLowerCase();
    
    if (texto.includes("desayunar") || texto.includes("mercado") || texto.includes("almuerzo") || texto.includes("niños")) {
        li.classList.add("cumplido");
    } else if (texto.includes("banco")) {
        li.classList.add("fallido");
    }
});
