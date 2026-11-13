// ==========================================
// FLUJO CARRITO DE COMPRAS - CHECKOUT / PAGO
// Archivo: js/checkout.js
// ==========================================

// Elementos del formulario de entrega
let nombresInput = document.querySelector("#nombres-input");
let apellidosInput = document.querySelector("#apellidos-input");
let emailInput = document.querySelector("#email-input");
let celularInput = document.querySelector("#celular-input");
let direccionInput = document.querySelector("#direccion-input");
let direccion2Input = document.querySelector("#direccion-2-input");
let notasInput = document.querySelector("#additiona-note");

// Elementos del resumen de compra
let contenedorProductos = document.querySelector(".productos.border-bottom");
let valorDomiElem = document.querySelector(".valor-domi");
let destinoElem = document.querySelector(".destino");
let promoElem = document.querySelector(".promo");
let resSubTotalElem = document.querySelector(".res-sub-total");
let totalElem = document.querySelector(".total");
let radiosPago = document.querySelectorAll('input[name="radio"]');
let btnCheckout = document.querySelector(".btn-checkout");
let contadorPro = document.querySelector(".contar-pro");

// Variables globales para cálculos
let carrito = [];
let resumen = {};
let totalCalculadoFinal = 0;

// Inicializar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    carrito = obtenerCarrito();

    // Si no hay productos en el carrito, redireccionar a la tienda
    if (carrito.length === 0) {
        alert("No tienes productos en el carrito para procesar.");
        window.location.href = "index.html";
        return;
    }

    actualizarContador(carrito);
    cargarResumen();
    cargarDatosEjemplo();
});

// Evento al cambiar el método de pago (recalcular posibles recargos)
radiosPago.forEach(radio => {
    radio.addEventListener("change", () => {
        calcularTotalConMetodoPago();
    });
});

// Evento al hacer clic en "Place Order" (Realizar Pedido)
if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
        procesarOrden();
    });
}

// Función para obtener productos del carrito
function obtenerCarrito() {
    let prods = JSON.parse(localStorage.getItem("carrito"));
    if (prods === null) {
        return [];
    }
    return prods;
}

// Función para actualizar contador en barra de navegación
function actualizarContador(carrito) {
    let totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    if (contadorPro) {
        contadorPro.textContent = totalCantidad;
    }
}

// Cargar información del carrito y resumen
function cargarResumen() {
    let resumenGuardado = JSON.parse(localStorage.getItem("resumenCompra"));

    let subtotal = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    let valorDomi = resumenGuardado ? resumenGuardado.valorDomi : 0;
    let destino = resumenGuardado ? resumenGuardado.destino : "Medellin";
    let promo = resumenGuardado ? resumenGuardado.promo : (subtotal > 20 ? 5 : 0);

    resumen = {
        subtotal: subtotal,
        valorDomi: valorDomi,
        destino: destino,
        promo: promo
    };

    // Renderizar productos en el resumen
    if (contenedorProductos) {
        contenedorProductos.innerHTML = "";
        carrito.forEach(producto => {
            let item = document.createElement("div");
            item.className = "d-flex justify-content-between align-items-center mb-2 py-1";
            item.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="36" height="36" style="object-fit: cover; border-radius: 4px; margin-right: 10px;">
                    <span>${producto.nombre} <strong class="text-secondary">x${producto.cantidad}</strong></span>
                </div>
                <span class="fw-bold">$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            `;
            contenedorProductos.appendChild(item);
        });
    }

    // Actualizar datos en pantalla
    if (resSubTotalElem) resSubTotalElem.textContent = "$" + resumen.subtotal.toFixed(2);
    if (valorDomiElem) valorDomiElem.textContent = "$" + resumen.valorDomi.toFixed(2);
    if (destinoElem) destinoElem.textContent = resumen.destino;
    if (promoElem) promoElem.textContent = resumen.promo > 0 ? "-$" + resumen.promo.toFixed(2) : "$0.00";

    calcularTotalConMetodoPago();
}

// Función para calcular total según el método de pago seleccionado
function calcularTotalConMetodoPago() {
    let base = resumen.subtotal + resumen.valorDomi - resumen.promo;
    let recargo = 0;

    let radioSeleccionado = document.querySelector('input[name="radio"]:checked');
    let metodo = radioSeleccionado ? radioSeleccionado.value : "1";

    if (metodo === "1") {
        // Contraentrega +(5%)
        recargo = base * 0.05;
    } else if (metodo === "2") {
        // PSE +(3%)
        recargo = base * 0.03;
    } else {
        // Transferencia (0%)
        recargo = 0;
    }

    totalCalculadoFinal = base + recargo;

    if (totalElem) {
        totalElem.textContent = "$" + totalCalculadoFinal.toFixed(2);
    }
}

// Función para validar formulario y procesar la orden
function procesarOrden() {
    // Validar campos obligatorios
    if (
        !nombresInput.value.trim() ||
        !apellidosInput.value.trim() ||
        !emailInput.value.trim() ||
        !celularInput.value.trim() ||
        !direccionInput.value.trim()
    ) {
        alert("Por favor complete todos los campos obligatorios (*) de datos de entrega.");
        return;
    }

    // Obtener texto del método de pago
    let radioSeleccionado = document.querySelector('input[name="radio"]:checked');
    let textoMetodoPago = "Contraentrega (+5%)";
    if (radioSeleccionado && radioSeleccionado.value === "2") textoMetodoPago = "PSE (+3%)";
    if (radioSeleccionado && radioSeleccionado.value === "3") textoMetodoPago = "Transferencia";

    // Crear el objeto de la orden completa
    let orden = {
        numeroOrden: "#" + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }),
        cliente: {
            nombres: nombresInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            email: emailInput.value.trim(),
            celular: celularInput.value.trim(),
            direccion: direccionInput.value.trim(),
            direccion2: direccion2Input ? direccion2Input.value.trim() : "",
            notas: notasInput ? notasInput.value.trim() : ""
        },
        productos: carrito,
        resumen: {
            subtotal: resumen.subtotal,
            destino: resumen.destino,
            valorDomi: resumen.valorDomi,
            promo: resumen.promo,
            metodoPago: textoMetodoPago,
            totalFinal: totalCalculadoFinal
        }
    };

    // Guardar orden final en localStorage para que thankyou.html la muestre
    localStorage.setItem("ultimaOrden", JSON.stringify(orden));

    // =========================================================================
    // FUSIÓN TIENDA ONLINE <-> DASHBOARD (LOCALSTORAGE)
    // 1. Sincronizar con el módulo de Pedidos del Dashboard
    // 2. Registrar/Actualizar el cliente en el módulo de Clientes
    // 3. Descontar el stock vendido en el módulo de Productos
    // =========================================================================
    try {
        // 1. Pedidos
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        let nuevoIdPedido = pedidos.length > 0 ? Math.max(...pedidos.map(p => Number(p.id) || 0)) + 1 : 1;
        let nuevoPedidoDashboard = {
            id: nuevoIdPedido,
            numeroOrden: orden.numeroOrden,
            fecha: orden.fecha,
            cliente: {
                nombres: orden.cliente.nombres,
                apellidos: orden.cliente.apellidos,
                email: orden.cliente.email,
                celular: orden.cliente.celular,
                direccion: orden.cliente.direccion,
                direccion2: orden.cliente.direccion2
            },
            productos: orden.productos,
            metodoPago: orden.resumen.metodoPago,
            total: orden.resumen.totalFinal,
            estado: "Pendiente",
            resumen: orden.resumen
        };
        pedidos.unshift(nuevoPedidoDashboard);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        // 2. Clientes
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let indexClienteExistente = clientes.findIndex(c => c.email && c.email.toLowerCase() === orden.cliente.email.toLowerCase());
        if (indexClienteExistente !== -1) {
            clientes[indexClienteExistente].nombre = orden.cliente.nombres;
            clientes[indexClienteExistente].apellido = orden.cliente.apellidos;
            clientes[indexClienteExistente].celular = orden.cliente.celular;
            clientes[indexClienteExistente].direccion = orden.cliente.direccion;
            if (orden.cliente.direccion2) clientes[indexClienteExistente].direccion2 = orden.cliente.direccion2;
        } else {
            let nuevoIdCliente = clientes.length > 0 ? Math.max(...clientes.map(c => Number(c.id) || 0)) + 1 : 1;
            clientes.push({
                id: nuevoIdCliente,
                nombre: orden.cliente.nombres,
                apellido: orden.cliente.apellidos,
                email: orden.cliente.email,
                celular: orden.cliente.celular,
                direccion: orden.cliente.direccion,
                direccion2: orden.cliente.direccion2,
                descripcion: orden.cliente.notas || "Cliente registrado desde Tienda Online"
            });
        }
        localStorage.setItem("clientes", JSON.stringify(clientes));

        // 3. Productos (descontar stock)
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        orden.productos.forEach(item => {
            let prod = productos.find(p => p.id == item.id || (p.nombre && p.nombre.toLowerCase() === item.nombre.toLowerCase()));
            if (prod) {
                prod.stock = Math.max(0, (prod.stock || 0) - (item.cantidad || 1));
            }
        });
        localStorage.setItem("productos", JSON.stringify(productos));
    } catch (err) {
        console.error("Error sincronizando con el Dashboard:", err);
    }

    // Limpiar carrito y resumen temporal tras compra exitosa
    localStorage.removeItem("carrito");
    localStorage.removeItem("resumenCompra");

    alert("¡Pedido realizado con éxito! Tu orden ha sido registrada en el sistema.");
    window.location.href = "thankyou.html";
}

// Función para precargar datos de ejemplo en modo demo
function cargarDatosEjemplo() {
    if (nombresInput && !nombresInput.value) nombresInput.value = "Juan";
    if (apellidosInput && !apellidosInput.value) apellidosInput.value = "Pérez Gómez";
    if (emailInput && !emailInput.value) emailInput.value = "juan.perez@gmail.com";
    if (celularInput && !celularInput.value) celularInput.value = "3001234567";
    if (direccionInput && !direccionInput.value) direccionInput.value = "Calle 10 # 43E - 25";
    if (direccion2Input && !direccion2Input.value) direccion2Input.value = "Apto 502, Torre 1";
    if (notasInput && !notasInput.value) notasInput.value = "Por favor tocar el timbre al llegar, gracias.";
}
