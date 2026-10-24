const sidebar = document.getElementById("mySidebar");
const main = document.getElementById("main");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");

btnOpen.addEventListener("click", function () {
    sidebar.style.left = "0";
    main.style.marginLeft = "200px";
});

btnClose.addEventListener("click", function () {
    sidebar.style.left = "-200px";
    main.style.marginLeft = "0"; 
});
