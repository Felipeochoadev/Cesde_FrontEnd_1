function cambiarColor(){
    let span = document.querySelector("span");
    span.style.color = "red";
}

function volverColor(){
    let span = document.querySelector("span");
    span.style.color = "black";
}

//eventos funcionales
let h2 = document.querySelector("h2");
h2.onmouseover = function(){
    this.textContent = "pasar de nuevo <>";
}

h2.onmouseleave = function(){
    this.textContent = "pasar raton por aqui";
}

//manejador de eventos addEventListener
let btn = document.querySelector('button');
let div = document.querySelector('div');

function ocultar(){
    div.style.display = 'none';
}

function mostrar(){
    div.style.display = 'block';
}

// btn.addEventListener(
//     "click", 
//     ocultar
// );

// btn.addEventListener(
//     "dblclick", 
//     mostrar
// );

// //quitar un evento

// btn.removeEventListener(
//     'dblclick',
//     mostrar
// );


btn.addEventListener(
    'click',
    function(){
        // if( div.style.display == 'block'){
        //     ocultar()
        // } else {
        //     mostrar()
        // }

         div.classList.toggle('ocultar');
    }
);