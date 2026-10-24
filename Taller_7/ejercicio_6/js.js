const selectElement = document.querySelector(".nieve");
const resultado = document.querySelector(".resultado");

selectElement.addEventListener("change", function (event) {
    const valorSeleccionado = event.target.value;
    
    if (valorSeleccionado) {
        resultado.textContent = `Te gusta el sabor ${valorSeleccionado}`;
    } else {
        resultado.textContent = "";
    }
});
