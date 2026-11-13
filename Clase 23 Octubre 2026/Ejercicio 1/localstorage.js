let nombrePro = document.querySelector("#nombre-pro");
let precioPro = document.getElementById("precio-pro");
let descripcionPro = document.querySelector("#descripcion-pro");
let imagenPro = document.querySelector("#imagen-pro");
let btnGuardar = document.querySelector(".btn-guardar");
let btnCancelar = document.querySelector(".btn-cancelar");
let cuerpotabla = document.querySelector("#cuerpotabla");

// Variable para rastrear la posición del producto a editar
let posicionEditar = null;

// Ejecutar al cargar la página para mostrar los productos guardados
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
});

// Evento para Guardar o Actualizar Producto
btnGuardar.addEventListener(
    "click", 
    ()=>{
        let pro = validform();
        if(pro){
            let productos = obtenerProductos();

            if(posicionEditar === null){
                // CREATE: Guardar nuevo producto
                productos.push(pro);
                alert("Producto guardado con éxito");
            } else {
                // UPDATE: Actualizar producto existente
                productos[posicionEditar] = pro;
                alert("Producto actualizado con éxito");
            }

            guardarLocalStorage(productos);
            mostrarProductos();
            limpiarFormulario();
        }
    }
);

// Evento para Cancelar edición
if(btnCancelar){
    btnCancelar.addEventListener(
        "click", 
        ()=>{
            limpiarFormulario();
        }
    );
}

// Función para validar el formulario
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

// READ: Obtener productos desde localStorage
function obtenerProductos(){
    let productos = JSON.parse(localStorage.getItem("productos"));
    if(productos === null){
        return [];
    }
    return productos;
}

// Guardar array de productos en localStorage
function guardarLocalStorage(productos){
    localStorage.setItem("productos", JSON.stringify(productos));
}

// READ: Mostrar productos en la tabla
function mostrarProductos(){
    let productos = obtenerProductos();
    cuerpotabla.innerHTML = "";

    productos.forEach((pro, index) => {
        let fila = document.createElement("tr");
        let imagenSrc = pro.imagen ? pro.imagen : "https://placehold.co/60x60?text=Sin+Foto";

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${imagenSrc}" alt="${pro.nombre}" width="50" height="50" style="object-fit: cover; border-radius: 6px;">
            </td>
            <td>${pro.nombre}</td>
            <td>$${Number(pro.precio).toLocaleString()}</td>
            <td>${pro.descripcion}</td>
            <td>
                <button type="button" class="btn btn-warning btn-sm btn-editar" data-pos="${index}">✏️ Editar</button>
                <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-pos="${index}">🗑️ Eliminar</button>
            </td>
        `;

        cuerpotabla.appendChild(fila);
    });
}

// Eventos de la tabla (Editar y Eliminar con delegación de eventos)
cuerpotabla.addEventListener("click", (event) => {
    let btnEditar = event.target.closest(".btn-editar");
    let btnEliminar = event.target.closest(".btn-eliminar");

    if(btnEditar){
        let pos = btnEditar.getAttribute("data-pos");
        cargarDatosEdicion(pos);
    }

    if(btnEliminar){
        let pos = btnEliminar.getAttribute("data-pos");
        eliminarProducto(pos);
    }
});

// UPDATE: Cargar datos en el formulario para editar
function cargarDatosEdicion(pos){
    let productos = obtenerProductos();
    let pro = productos[pos];

    nombrePro.value = pro.nombre;
    precioPro.value = pro.precio;
    descripcionPro.value = pro.descripcion;
    imagenPro.value = pro.imagen;

    posicionEditar = pos;
    btnGuardar.textContent = "Actualizar Producto";
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");

    if(btnCancelar){
        btnCancelar.classList.remove("d-none");
    }
}

// DELETE: Eliminar producto
function eliminarProducto(pos){
    let confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if(confirmar){
        let productos = obtenerProductos();
        productos.splice(pos, 1);
        guardarLocalStorage(productos);
        mostrarProductos();

        // Si estábamos editando el mismo que eliminamos, limpiamos el formulario
        if(posicionEditar == pos){
            limpiarFormulario();
        }
    }
}

// Limpiar formulario y resetear estado del botón
function limpiarFormulario(){
    nombrePro.value = "";
    precioPro.value = "";
    descripcionPro.value = "";
    imagenPro.value = "";
    posicionEditar = null;

    btnGuardar.textContent = "Guardar Producto";
    btnGuardar.classList.remove("btn-success");
    btnGuardar.classList.add("btn-primary");

    if(btnCancelar){
        btnCancelar.classList.add("d-none");
    }
}
