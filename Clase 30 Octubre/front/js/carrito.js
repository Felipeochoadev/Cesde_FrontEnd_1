// ==========================================
// FLUJO CARRITO DE COMPRAS - INDEX / CATÁLOGO
// Archivo: js/carrito.js
// Integración en tiempo real con Dashboard (localStorage)
// ==========================================

// Variables globales
let btnCarrito = document.querySelector(".carrito");
let tablaCarrito = document.querySelector(".list-cart");
let cuerpoTablaCarrito = document.querySelector(".list-cart tbody");
let contarpro = document.querySelector(".contar-pro");
let con = 0;

// Productos por defecto si el storage estuviera vacío
const PRODUCTOS_DEFAULT = [
    {
        id: 1,
        nombre: "Hamburguesa",
        precio: 30000,
        stock: 15,
        descripcion: "Deliciosa hamburguesa artesanal con carne premium, queso cheddar, tocineta y salsas especiales.",
        imagen: "https://th.bing.com/th/id/R.c691ed37c9ce3040c3ebd2892e88870c?rik=QUBcFflN%2b9oqPQ&pid=ImgRaw&r=0"
    },
    {
        id: 2,
        nombre: "Pizza",
        precio: 45000,
        stock: 20,
        descripcion: "Pizza tradicional italiana con masa madre, queso mozzarella fundido, pepperoni y albahaca fresca.",
        imagen: "https://www.ocu.org/-/media/ocu/images/home/alimentacion/alimentos/pizzas_selector_1600x900.jpg?rev=6a81e278-07fc-4e95-9ba1-361063f35adf&hash=B8B1264AB6FC3F4B1AE140EB390208CD"
    },
    {
        id: 3,
        nombre: "Pasta",
        precio: 25000,
        stock: 12,
        descripcion: "Spaghetti con salsa boloñesa casera de res y cerdo, especias italianas y abundante queso parmesano.",
        imagen: "https://cdn.shopify.com/s/files/1/2538/5286/products/Spaghetti-with-Meat-Sauce-Recipe-1-1200_787x787.jpg?v=1588772697"
    },
    {
        id: 4,
        nombre: "Perro",
        precio: 22000,
        stock: 18,
        descripcion: "Perro caliente especial con salchicha americana, ripio de papa, queso mozzarella y salsa tártara.",
        imagen: "https://th.bing.com/th/id/OIP.2QjcuwsTimAImo8WSQdTdAHaFp?rs=1&pid=ImgDetMain"
    },
    {
        id: 5,
        nombre: "Burrito",
        precio: 25000,
        stock: 10,
        descripcion: "Burrito mexicano envuelto en tortilla de harina con carne desmechada, frijoles refritos y guacamole.",
        imagen: "https://th.bing.com/th/id/R.1a7d6f0af7be590eb4e27d96ce3530e5?rik=eiCcb%2f%2b9TYNzXQ&pid=ImgRaw&r=0"
    },
    {
        id: 6,
        nombre: "Tacos",
        precio: 26000,
        stock: 14,
        descripcion: "Trío de tacos al pastor con piña caramelizada, cebolla picada, cilantro y variedad de salsas picantes.",
        imagen: "https://th.bing.com/th/id/R.d50b293e5d2de51d349691db78f71f8c?rik=FfttXcgxjuqR%2fQ&pid=ImgRaw&r=0"
    },
    {
        id: 7,
        nombre: "Pollo",
        precio: 35000,
        stock: 25,
        descripcion: "Pollo frito extra crujiente por fuera y jugoso por dentro, acompañado de papas a la francesa.",
        imagen: "https://th.bing.com/th/id/OIP.IAza-1yPPvzA55qlI0VqvQHaF7?w=744&h=595&rs=1&pid=ImgDetMain"
    },
    {
        id: 8,
        nombre: "Chuzo",
        precio: 22000,
        stock: 16,
        descripcion: "Pincho tradicional al carbón de carne magra y tocineta, servido con arepa y queso mozzarella.",
        imagen: "https://th.bing.com/th/id/R.c0d3de5bd13edcc5323d074e4ba8f864?rik=lFbTsZF0ESAN5w&pid=ImgRaw&r=0"
    },
    {
        id: 9,
        nombre: "Salchipapa",
        precio: 20000,
        stock: 30,
        descripcion: "Papas crujientes con salchicha ranchera picada, huevo de codorniz, queso costeño rallado y salsas.",
        imagen: "https://1.bp.blogspot.com/-6lKIIVq3CXw/WK8raCAD-gI/AAAAAAABMnI/5VoCplTPogASfSZS5XzIFZizMBZ8yO8bQCLcB/s1600/salchipapa%2Bcolombiana.png"
    },
    {
        id: 10,
        nombre: "Picada",
        precio: 65000,
        stock: 8,
        descripcion: "Picada familiar abundante con chicharrón, costillitas BBQ, chorizo, morcilla, patacones y papas.",
        imagen: "https://cdn.colombia.com/gastronomia/2016/06/21/picada-colombiana-2990.jpg"
    }
];

// Inicializar vista al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    let carrito = obtenerCarrito();
    actualizarContador(carrito);
    mostrarCarritoFlotante(carrito);
    renderizarCatalogoDinamico();
});

// Renderizar dinámicamente los productos gestionados desde el Dashboard
function renderizarCatalogoDinamico() {
    const contenedorPro = document.querySelector(".content-pro");
    if (!contenedorPro) return;

    let productos = JSON.parse(localStorage.getItem("productos"));
    if (!productos || productos.length === 0) {
        productos = PRODUCTOS_DEFAULT;
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    contenedorPro.innerHTML = "";

    productos.forEach(prod => {
        const col = document.createElement("div");
        col.className = "col-md-3 py-3 py-md-0 mb-4";

        const stockDisponible = prod.stock !== undefined ? prod.stock : 10;
        const estaAgotado = stockDisponible <= 0;

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0" style="transition: transform 0.2s ease, box-shadow 0.2s ease;">
                <div style="height: 190px; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; border-top-left-radius: 5px; border-top-right-radius: 5px;">
                    <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='./images/b1.png'">
                </div>
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <h3 class="h6 font-weight-bold mb-0 text-dark">${prod.nombre}</h3>
                            <span class="badge ${estaAgotado ? 'bg-danger text-white' : 'bg-success text-white'}" style="font-size: 0.7rem;">
                                ${estaAgotado ? 'Agotado' : `${stockDisponible} disp.`}
                            </span>
                        </div>
                        <p class="text-muted small mb-2" style="font-size: 0.8rem; line-height: 1.3; min-height: 2.6em;">
                            ${prod.descripcion || 'Producto fresco preparado con los mejores ingredientes.'}
                        </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                        <h5 class="mb-0 text-dark font-weight-bold" style="font-size: 1.05rem;">$${Number(prod.precio).toLocaleString("es-CO")}</h5>
                        <button type="button" class="btn btn-sm btn-product text-white d-flex align-items-center justify-content-center" 
                                data-id="${prod.id}"
                                data-nombre="${prod.nombre}"
                                data-precio="${prod.precio}"
                                data-imagen="${prod.imagen}"
                                data-stock="${stockDisponible}"
                                ${estaAgotado ? 'disabled style="background-color: #6c757d; cursor: not-allowed; opacity: 0.6; border-radius: 50%; width: 34px; height: 34px;" title="Producto agotado"' : 'style="background-color: #ffc800; border-color: #ffc800; border-radius: 50%; width: 34px; height: 34px;" title="Agregar al carrito"'}>
                            <i class="fa-solid fa-basket-shopping" style="color: #000;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedorPro.appendChild(col);
    });
}

// Alternar visualización del carrito flotante al hacer clic en el icono del navbar
if (btnCarrito && tablaCarrito) {
    btnCarrito.addEventListener("click", () => {
        tablaCarrito.classList.toggle("ocultar");
    });
}

// Evento para borrar un producto directamente desde la tablita pequeña
if (cuerpoTablaCarrito) {
    cuerpoTablaCarrito.addEventListener("click", (event) => {
        let btnBorrar = event.target.closest(".btn-borrar-item");
        if (btnBorrar) {
            let pos = parseInt(btnBorrar.getAttribute("data-pos"));
            let carrito = obtenerCarrito();

            let confirmar = confirm(`¿Deseas eliminar "${carrito[pos].nombre}" del carrito?`);
            if (confirmar) {
                carrito.splice(pos, 1);
                guardarCarrito(carrito);
                actualizarContador(carrito);
                mostrarCarritoFlotante(carrito);
            }
        }
    });
}

// Delegación de eventos para agregar productos al carrito (cubre tanto catálogo dinámico como tarjetas estáticas)
document.addEventListener("click", (event) => {
    let btn = event.target.closest(".btn-product");
    if (!btn) return;

    // Si viene con atributos de datos del catálogo dinámico
    let nombre = btn.getAttribute("data-nombre");
    let precio = parseFloat(btn.getAttribute("data-precio"));
    let imagen = btn.getAttribute("data-imagen");
    let stock = parseInt(btn.getAttribute("data-stock"));
    let id = btn.getAttribute("data-id");

    // Si fue un clic en una tarjeta estática sin dataset
    if (!nombre) {
        let card = btn.closest(".card");
        if (card) {
            let h3 = card.querySelector("h3");
            let img = card.querySelector("img");
            let h5 = card.querySelector("h5");

            nombre = h3 ? h3.textContent.trim() : "Producto";
            imagen = img ? img.getAttribute("src") : "./images/b1.png";
            let txtPrecio = h5 ? h5.textContent.replace(/[^0-9.]/g, "").trim() : "0";
            precio = parseFloat(txtPrecio) || 0;
            id = Date.now().toString();
            stock = 99;
        }
    }

    if (stock <= 0) {
        alert("Lo sentimos, este producto se encuentra agotado actualmente.");
        return;
    }

    let producto = {
        id: id || Date.now() + Math.random().toString(36).substring(2, 6),
        nombre: nombre,
        precio: precio || 0,
        imagen: imagen,
        cantidad: 1
    };

    agregarAlCarrito(producto);
});

// Función para obtener productos del carrito desde localStorage
function obtenerCarrito() {
    try {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        return Array.isArray(carrito) ? carrito : [];
    } catch (e) {
        return [];
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el número del badge contador en la barra de navegación
function actualizarContador(carrito) {
    con = carrito.reduce((total, pro) => total + (pro.cantidad || 1), 0);
    if (contarpro) {
        contarpro.textContent = con;
    }
}

// Función para agregar el producto a localStorage
function agregarAlCarrito(productoNuevo) {
    let carrito = obtenerCarrito();

    // Comprobar si el producto ya existe en el carrito para aumentar cantidad
    let indexExistente = carrito.findIndex(item => item.nombre.toLowerCase() === productoNuevo.nombre.toLowerCase());

    if (indexExistente !== -1) {
        carrito[indexExistente].cantidad += 1;
    } else {
        carrito.push(productoNuevo);
    }

    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarCarritoFlotante(carrito);

    mostrarToastFlotante(`¡${productoNuevo.nombre} agregado al carrito!`);
}

// Toast flotante no intrusivo en lugar de alert()
function mostrarToastFlotante(mensaje) {
    let toast = document.querySelector("#toast-tienda-global");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-tienda-global";
        toast.style.position = "fixed";
        toast.style.bottom = "24px";
        toast.style.right = "24px";
        toast.style.backgroundColor = "#212529";
        toast.style.color = "#ffc800";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 6px 18px rgba(0,0,0,0.3)";
        toast.style.zIndex = "999999";
        toast.style.fontWeight = "bold";
        toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-cart-arrow-down mr-2" style="margin-right:8px;"></i> ${mensaje}`;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(15px)";
    }, 2500);
}

// Función para renderizar el menú desplegable del carrito flotante
function mostrarCarritoFlotante(carrito) {
    if (!cuerpoTablaCarrito) return;
    cuerpoTablaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        cuerpoTablaCarrito.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-3 text-muted">El carrito está vacío</td>
            </tr>
        `;
        return;
    }

    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="35" height="35" style="object-fit: cover; border-radius: 4px;" onerror="this.src='./images/b1.png'"></td>
            <td>${producto.nombre} <span class="badge bg-warning text-dark">x${producto.cantidad}</span></td>
            <td>$${(producto.precio * producto.cantidad).toLocaleString("es-CO")}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm btn-borrar-item py-0 px-2" data-pos="${index}" title="Borrar producto">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        cuerpoTablaCarrito.appendChild(fila);
    });
}
