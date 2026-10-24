const btnDropdown = document.getElementById("btnDropdown");
const myDropdown = document.getElementById("myDropdown");
const etiquetaA = document.querySelectorAll("a");

btnDropdown.addEventListener("click", function () {
    myDropdown.classList.toggle("show");
});

etiquetaA[0].addEventListener("click", function () {
    myDropdown.classList.toggle("show");
});

etiquetaA[1].addEventListener("click", function () {
    myDropdown.classList.toggle("show");
});

etiquetaA[2].addEventListener("click", function () {
    myDropdown.classList.toggle("show");
});
