let nombrePro = document.querySelector("#nombre-pro");
let precioPro = document.getElementById("precio-pro");
let descripcionPro = document.querySelector("#descripcion-pro");
let imagenPro = document.querySelector("#imagen-pro");
let btnGuardar = document.querySelector(".btn-guardar");

btnGuardar.addEventListener(
    "click", 
    ()=>{
        let pro = validform();
        console.log(pro);
    }
)

function validform(){
    let producto;
    if( nombrePro.value && precioPro.value && descripcionPro.value ){
        producto = {
            "nombre" : nombrePro.value,
            "precio" : precioPro.value,
            "descripcion" : descripcionPro.value,
            "imagen" : imagenPro.value
        }
    } else {
        alert("todos los campos son obligatorios");
    }
    return producto;
}