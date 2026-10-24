const btnMenu = document.getElementById("btnMenu");
const myNavbar = document.getElementById("myNavbar");

btnMenu.addEventListener("click", function () {
    if (myNavbar.className === "navbar") {
        myNavbar.className += " responsive";
    } else {
        myNavbar.className = "navbar";
    }
});
