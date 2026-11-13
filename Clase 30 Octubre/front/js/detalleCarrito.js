// ==========================================
// FLUJO CARRITO DE COMPRAS - DETALLE DEL CARRITO
// Archivo: js/detalleCarrito.js
// ==========================================

// Elementos del DOM
let cuerpoTabla = document.querySelector(".cart-table tbody");
let resSubTotal = document.querySelector(".res-sub-total");
let selectDestino = document.querySelector(".destino");
let valorDomi = document.querySelector(".valor-domi");
let promoElem = document.querySelector(".promo");
let totalElem = document.querySelector(".total");
let btnResumen = document.querySelector(".btn-resumen");
let contadorPro = document.querySelector(".contar-pro");

// Costos de envío según el destino
const costosEnvio = {
    "Medellin": 0,
    "Bello": 10,
    "Itagui": 15,
    "Envigado": 15,
    "Sabaneta": 15,
    "La Estrella": 20,
    "Caldas": 20,
    "Copacabana": 20
};

// Variables para almacenar totales actuales
let subtotalActual = 0;
let costoEnvioActual = 0;
let promoActual = 0;
let totalActual = 0;

// Inicializar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    let carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarTabla(carrito);
    actualizarTotales(carrito);
});

// Evento al cambiar de ciudad / destino de entrega
if (selectDestino) {
    selectDestino.addEventListener("change", () => {
        let carrito = obtenerCarrito();
        actualizarTotales(carrito);
    });
}

// Evento para el botón "Ir a pagar"
if (btnResumen) {
    btnResumen.addEventListener("click", () => {
        let carrito = obtenerCarrito();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos para continuar con el pago.");
            return;
        }

        // Guardar el resumen en localStorage para la pantalla de Checkout
        let resumenCompra = {
            subtotal: subtotalActual,
            destino: selectDestino ? selectDestino.value : "Medellin",
            valorDomi: costoEnvioActual,
            promo: promoActual,
            total: totalActual
        };

        localStorage.setItem("resumenCompra", JSON.stringify(resumenCompra));
        window.location.href = "checkout.html";
    });
}

// Eventos sobre la tabla de productos (delegación de eventos para eliminar o modificar cantidades)
if (cuerpoTabla) {
    cuerpoTabla.addEventListener("click", (event) => {
        let btnEliminar = event.target.closest(".remove-from-cart-btn");
        let btnIncrementar = event.target.closest(".increment");
        let btnDecrementar = event.target.closest(".decrement");

        let carrito = obtenerCarrito();

        if (btnEliminar) {
            let pos = parseInt(btnEliminar.getAttribute("data-pos"));
            let confirmar = confirm(`¿Deseas eliminar "${carrito[pos].nombre}" del carrito?`);
            if (confirmar) {
                carrito.splice(pos, 1);
                guardarCarrito(carrito);
                renderizarTabla(carrito);
                actualizarTotales(carrito);
                actualizarContador(carrito);
            }
        }

        if (btnIncrementar) {
            let pos = parseInt(btnIncrementar.getAttribute("data-pos"));
            carrito[pos].cantidad += 1;
            guardarCarrito(carrito);
            renderizarTabla(carrito);
            actualizarTotales(carrito);
            actualizarContador(carrito);
        }

        if (btnDecrementar) {
            let pos = parseInt(btnDecrementar.getAttribute("data-pos"));
            if (carrito[pos].cantidad > 1) {
                carrito[pos].cantidad -= 1;
            } else {
                let confirmar = confirm(`¿Deseas eliminar "${carrito[pos].nombre}" del carrito?`);
                if (confirmar) {
                    carrito.splice(pos, 1);
                }
            }
            guardarCarrito(carrito);
            renderizarTabla(carrito);
            actualizarTotales(carrito);
            actualizarContador(carrito);
        }
    });
}

// Función para obtener productos del carrito desde localStorage
function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito === null) {
        return [];
    }
    return carrito;
}

// Función para guardar productos del carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar contador en la barra de navegación
function actualizarContador(carrito) {
    let totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    if (contadorPro) {
        contadorPro.textContent = totalCantidad;
    }
}

// Función para renderizar los productos en la tabla
function renderizarTabla(carrito) {
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = "";

    if (carrito.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-5">
                    <h5 class="text-muted mb-3">No hay productos en tu carrito</h5>
                    <a href="index.html" class="btn btn-warning">Explorar Productos</a>
                </td>
            </tr>
        `;
        return;
    }

    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="product-block">
                <a href="javascript:void(0)" class="remove-from-cart-btn" data-pos="${index}" title="Eliminar producto">
                    <i class="fa-solid fa-xmark"></i>
                </a>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <a href="javascript:void(0)" class="h6">${producto.nombre}</a>
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <div class="quantity">
                    <div class="decrement" data-pos="${index}"><i class="fa-solid fa-minus"></i></div>
                    <input type="text" value="${producto.cantidad}" readonly>
                    <div class="increment" data-pos="${index}"><i class="fa-solid fa-plus"></i></div>
                </div>
            </td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Función para recalcular los totales de la orden
function actualizarTotales(carrito) {
    subtotalActual = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    let destinoSeleccionado = selectDestino ? selectDestino.value : "Medellin";
    costoEnvioActual = carrito.length > 0 ? (costosEnvio[destinoSeleccionado] ?? 0) : 0;

    // Descuento promocional de $5 si el subtotal es mayor a $20
    promoActual = subtotalActual > 20 ? 5 : 0;

    totalActual = subtotalActual > 0 ? (subtotalActual + costoEnvioActual - promoActual) : 0;

    if (resSubTotal) resSubTotal.textContent = "$" + subtotalActual.toFixed(2);
    if (valorDomi) valorDomi.textContent = "$" + costoEnvioActual.toFixed(2);
    if (promoElem) promoElem.textContent = promoActual > 0 ? "-$" + promoActual.toFixed(2) : "$0.00";
    if (totalElem) totalElem.textContent = "$" + totalActual.toFixed(2);
}
