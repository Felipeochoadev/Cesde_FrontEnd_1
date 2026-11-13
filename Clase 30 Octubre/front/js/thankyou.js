// ==========================================
// FLUJO CARRITO DE COMPRAS - AGRADECIMIENTO / CONFIRMACIÓN
// Archivo: js/thankyou.js
// ==========================================

// Elementos del DOM
let saludoElem = document.querySelector(".resumen-compra h5");
let parrafos = document.querySelectorAll(".resumen-compra > p");
let cardHeader = document.querySelector(".card-header");
let cardBodies = document.querySelectorAll(".resumen-compra .card .card .card-body");
let cardFooter = document.querySelector(".card-footer");
let btnGracias = document.querySelector(".btn-gracias");
let contadorPro = document.querySelector(".contar-pro");

// Inicializar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    // Carrito vacío tras la compra
    if (contadorPro) {
        contadorPro.textContent = "0";
    }

    let orden = JSON.parse(localStorage.getItem("ultimaOrden"));

    // Si no hay orden registrada, volver al catálogo
    if (!orden) {
        alert("No se encontró información de ninguna orden reciente.");
        window.location.href = "index.html";
        return;
    }

    renderizarOrden(orden);
});

// Evento para realizar otra compra
if (btnGracias) {
    btnGracias.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Función para mostrar la información de la compra exitosa
function renderizarOrden(orden) {
    // Saludo con el nombre del cliente
    if (saludoElem) {
        saludoElem.innerHTML = `<span>¡${orden.cliente.nombres}!</span> Muchas Gracias por tu compra`;
    }

    // Número de la orden
    if (parrafos.length > 0) {
        parrafos[0].textContent = `Orden ${orden.numeroOrden}`;
    }

    // Encabezado de la tarjeta principal
    if (cardHeader) {
        cardHeader.innerHTML = `<strong>Resumen de tu compra</strong> — Fecha: ${orden.fecha}`;
    }

    // Subtarjeta 1: Datos de entrega
    if (cardBodies.length > 0) {
        let cardEntrega = cardBodies[0];
        cardEntrega.innerHTML = `
            <h5 class="card-title text-primary"><i class="fa-solid fa-location-dot me-2"></i>Datos de Entrega</h5>
            <div class="card-text mt-3">
                <p class="mb-1"><strong>Cliente:</strong> ${orden.cliente.nombres} ${orden.cliente.apellidos}</p>
                <p class="mb-1"><strong>Ciudad:</strong> ${orden.resumen.destino}</p>
                <p class="mb-1"><strong>Dirección:</strong> ${orden.cliente.direccion} ${orden.cliente.direccion2 ? `(${orden.cliente.direccion2})` : ""}</p>
                <p class="mb-1"><strong>Teléfono:</strong> ${orden.cliente.celular}</p>
                <p class="mb-1"><strong>Email:</strong> ${orden.cliente.email}</p>
                <p class="mb-1"><strong>Método de pago:</strong> ${orden.resumen.metodoPago}</p>
                ${orden.cliente.notas ? `<p class="mb-1 text-muted"><strong>Notas:</strong> ${orden.cliente.notas}</p>` : ""}
            </div>
        `;
    }

    // Subtarjeta 2: Productos y Totales
    if (cardBodies.length > 1) {
        let cardProductos = cardBodies[1];

        let listaProductosHTML = orden.productos.map(p => `
            <li class="d-flex justify-content-between align-items-center mb-1">
                <span>${p.nombre} <strong>x${p.cantidad}</strong></span>
                <span>$${(p.precio * p.cantidad).toFixed(2)}</span>
            </li>
        `).join("");

        cardProductos.innerHTML = `
            <h5 class="card-title text-primary"><i class="fa-solid fa-burger me-2"></i>Productos Comprados</h5>
            <ul class="list-unstyled mt-3 mb-3">
                ${listaProductosHTML}
            </ul>
            <hr class="my-2">
            <div class="d-flex justify-content-between text-muted"><small>Subtotal:</small><small>$${orden.resumen.subtotal.toFixed(2)}</small></div>
            <div class="d-flex justify-content-between text-muted"><small>Domicilio:</small><small>$${orden.resumen.valorDomi.toFixed(2)}</small></div>
            <div class="d-flex justify-content-between text-muted"><small>Descuento Promo:</small><small>-$${orden.resumen.promo.toFixed(2)}</small></div>
            <hr class="my-2">
            <div class="d-flex justify-content-between align-items-center fw-bold fs-5">
                <span>Total Pagado:</span>
                <span class="text-success">$${orden.resumen.totalFinal.toFixed(2)}</span>
            </div>
        `;
    }

    // Pie de la tarjeta
    if (cardFooter) {
        cardFooter.innerHTML = `<span class="badge bg-success p-2 d-inline-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="me-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Estado: Confirmado</span> Estamos preparando tu pedido para enviarlo a <strong>${orden.resumen.destino}</strong>`;
    }
}
