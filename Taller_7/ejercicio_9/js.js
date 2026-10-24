const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.style.backgroundColor = "#2980b9";
    } else {
        navbar.style.backgroundColor = "#000000";
    }
});
