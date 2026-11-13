// ==========================================================================
// BASE DE DATOS Y UTILIDADES CENTRALIZADAS (LOCALSTORAGE)
// Proyecto: Dashboard de Gestión e Integración con Tienda Online
// ==========================================================================

const DB_KEYS = {
    USUARIOS: "usuarios",
    USUARIO_ACTIVO: "usuarioActivo",
    PRODUCTOS: "productos",
    CLIENTES: "clientes",
    PEDIDOS: "pedidos",
    CARRITO: "carrito",
    RESUMEN: "resumenCompra",
    ULTIMA_ORDEN: "ultimaOrden"
};

// Semilla inicial de datos para demostración inmediata
const DATOS_SEMILLA = {
    usuarios: [
        {
            id: 1,
            usuario: "admin",
            contrasena: "admin123",
            rol: "administrador",
            nombre: "Administrador General",
            email: "admin@tienda.com",
            creado: "2026-10-30"
        },
        {
            id: 2,
            usuario: "vendedor",
            contrasena: "vendedor123",
            rol: "vendedor",
            nombre: "Vendedor de Tienda",
            email: "vendedor@tienda.com",
            creado: "2026-10-30"
        }
    ],
    productos: [
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
    ],
    clientes: [
        {
            id: 1,
            nombre: "Carlos",
            apellido: "Gómez",
            email: "carlos.gomez@gmail.com",
            celular: "3104567890",
            direccion: "Calle 50 # 45-20",
            direccion2: "Apto 301, Torre Central",
            descripcion: "Cliente frecuente. Prefiere pago en efectivo."
        },
        {
            id: 2,
            nombre: "Mariana",
            apellido: "Ríos",
            email: "mariana.rios@hotmail.com",
            celular: "3019876543",
            direccion: "Carrera 70 # 32-15",
            direccion2: "Casa 4",
            descripcion: "Alérgica al marisco. Pedir salsa aparte."
        },
        {
            id: 3,
            nombre: "Felipe",
            apellido: "Restrepo",
            email: "felipe.restrepo@yahoo.com",
            celular: "3156781234",
            direccion: "Circular 4 # 73-10",
            direccion2: "Oficina 402",
            descripcion: "Entregas en horario de oficina."
        }
    ],
    pedidos: [
        {
            id: 1,
            numeroOrden: "#482910",
            fecha: "12 de noviembre de 2026, 14:30",
            idCliente: 1,
            cliente: {
                nombres: "Carlos",
                apellidos: "Gómez",
                email: "carlos.gomez@gmail.com",
                celular: "3104567890",
                direccion: "Calle 50 # 45-20",
                direccion2: "Apto 301, Torre Central"
            },
            productos: [
                { id: 1, nombre: "Hamburguesa", precio: 30000, cantidad: 2 },
                { id: 9, nombre: "Salchipapa", precio: 20000, cantidad: 1 }
            ],
            resumen: {
                subtotal: 80000,
                valorDomi: 0,
                promo: 5000,
                metodoPago: "Contraentrega (+5%)",
                totalFinal: 78750
            },
            metodoPago: "Contraentrega",
            total: 78750,
            estado: "Entregado"
        },
        {
            id: 2,
            numeroOrden: "#593021",
            fecha: "13 de noviembre de 2026, 10:15",
            idCliente: 2,
            cliente: {
                nombres: "Mariana",
                apellidos: "Ríos",
                email: "mariana.rios@hotmail.com",
                celular: "3019876543",
                direccion: "Carrera 70 # 32-15",
                direccion2: "Casa 4"
            },
            productos: [
                { id: 2, nombre: "Pizza", precio: 45000, cantidad: 1 }
            ],
            resumen: {
                subtotal: 45000,
                valorDomi: 10000,
                promo: 0,
                metodoPago: "PSE (+3%)",
                totalFinal: 56650
            },
            metodoPago: "PSE",
            total: 56650,
            estado: "En camino"
        },
        {
            id: 3,
            numeroOrden: "#710342",
            fecha: "13 de noviembre de 2026, 12:45",
            idCliente: 3,
            cliente: {
                nombres: "Felipe",
                apellidos: "Restrepo",
                email: "felipe.restrepo@yahoo.com",
                celular: "3156781234",
                direccion: "Circular 4 # 73-10",
                direccion2: "Oficina 402"
            },
            productos: [
                { id: 6, nombre: "Tacos", precio: 26000, cantidad: 2 }
            ],
            resumen: {
                subtotal: 52000,
                valorDomi: 0,
                promo: 5000,
                metodoPago: "Transferencia",
                totalFinal: 47000
            },
            metodoPago: "Transferencia",
            total: 47000,
            estado: "Pendiente"
        }
    ]
};

// ==========================================================================
// INICIALIZACIÓN Y NORMALIZACIÓN DE DATOS (MIGRACIÓN SEGURA)
// ==========================================================================
function normalizarUsuarios(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return JSON.parse(JSON.stringify(DATOS_SEMILLA.usuarios));
    }

    let huboCambios = false;
    const usuariosNormalizados = lista.map((u, index) => {
        let id = u.id !== undefined && u.id !== null ? u.id : (index + 1);
        if (id !== u.id) huboCambios = true;

        let rol = u.rol;
        if (!rol || typeof rol !== "string") {
            const nomUser = (u.usuario || "").toLowerCase();
            const nomComp = (u.nombre || "").toLowerCase();
            if (nomUser.includes("admin") || nomComp.includes("admin")) {
                rol = "administrador";
            } else {
                rol = "vendedor";
            }
            huboCambios = true;
        } else {
            rol = rol.toLowerCase().trim();
            if (rol !== "administrador" && rol !== "vendedor") {
                rol = "vendedor";
                huboCambios = true;
            }
        }

        let nombre = u.nombre || u.usuario || `Usuario ${id}`;
        if (!u.nombre) huboCambios = true;

        let email = u.email || `${u.usuario || 'usuario'}@tienda.com`;
        let creado = u.creado || "2026-10-30";
        let contrasena = u.contrasena || "123456";

        return {
            ...u,
            id: id,
            usuario: u.usuario || `usuario_${id}`,
            contrasena: contrasena,
            nombre: nombre,
            email: email,
            rol: rol,
            creado: creado
        };
    });

    // Asegurar que exista al menos un admin y un vendedor en el sistema
    const tieneAdmin = usuariosNormalizados.some(u => u.rol === "administrador");
    const tieneVendedor = usuariosNormalizados.some(u => u.rol === "vendedor");

    if (!tieneAdmin) {
        usuariosNormalizados.unshift({
            id: 1,
            usuario: "admin",
            contrasena: "admin123",
            rol: "administrador",
            nombre: "Administrador General",
            email: "admin@tienda.com",
            creado: "2026-10-30"
        });
        huboCambios = true;
    }

    if (!tieneVendedor) {
        usuariosNormalizados.push({
            id: usuariosNormalizados.length + 1,
            usuario: "vendedor",
            contrasena: "vendedor123",
            rol: "vendedor",
            nombre: "Vendedor de Tienda",
            email: "vendedor@tienda.com",
            creado: "2026-10-30"
        });
        huboCambios = true;
    }

    if (huboCambios) {
        try {
            localStorage.setItem(DB_KEYS.USUARIOS, JSON.stringify(usuariosNormalizados));
        } catch (e) {}
    }

    return usuariosNormalizados;
}

function inicializarBaseDatos() {
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem(DB_KEYS.USUARIOS));
    } catch (e) {
        usuarios = null;
    }

    if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
        localStorage.setItem(DB_KEYS.USUARIOS, JSON.stringify(DATOS_SEMILLA.usuarios));
    } else {
        // Normalizar los usuarios existentes por si vienen de ejercicios anteriores sin id o sin rol
        normalizarUsuarios(usuarios);
    }

    if (!localStorage.getItem(DB_KEYS.PRODUCTOS)) {
        localStorage.setItem(DB_KEYS.PRODUCTOS, JSON.stringify(DATOS_SEMILLA.productos));
    }
    if (!localStorage.getItem(DB_KEYS.CLIENTES)) {
        localStorage.setItem(DB_KEYS.CLIENTES, JSON.stringify(DATOS_SEMILLA.clientes));
    }
    if (!localStorage.getItem(DB_KEYS.PEDIDOS)) {
        localStorage.setItem(DB_KEYS.PEDIDOS, JSON.stringify(DATOS_SEMILLA.pedidos));
    }

    // Asegurar usuario activo con rol válido
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo || !usuarioActivo.rol) {
        const adminUser = obtenerUsuarios().find(u => u.rol === "administrador") || DATOS_SEMILLA.usuarios[0];
        localStorage.setItem(DB_KEYS.USUARIO_ACTIVO, JSON.stringify(adminUser));
    }
}

// Ejecutar inmediatamente
inicializarBaseDatos();

// ==========================================================================
// MÉTODOS GETTER Y SETTER
// ==========================================================================
function obtenerUsuarios() {
    try {
        const usuarios = JSON.parse(localStorage.getItem(DB_KEYS.USUARIOS));
        if (!usuarios || !Array.isArray(usuarios)) {
            return normalizarUsuarios(DATOS_SEMILLA.usuarios);
        }
        return normalizarUsuarios(usuarios);
    } catch (e) {
        return normalizarUsuarios(DATOS_SEMILLA.usuarios);
    }
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(DB_KEYS.USUARIOS, JSON.stringify(usuarios));
}

function obtenerProductos() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTOS)) || [];
    } catch (e) {
        return [];
    }
}

function guardarProductos(productos) {
    localStorage.setItem(DB_KEYS.PRODUCTOS, JSON.stringify(productos));
}

function obtenerClientes() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.CLIENTES)) || [];
    } catch (e) {
        return [];
    }
}

function guardarClientes(clientes) {
    localStorage.setItem(DB_KEYS.CLIENTES, JSON.stringify(clientes));
}

function obtenerPedidos() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.PEDIDOS)) || [];
    } catch (e) {
        return [];
    }
}

function guardarPedidos(pedidos) {
    localStorage.setItem(DB_KEYS.PEDIDOS, JSON.stringify(pedidos));
}

function obtenerUsuarioActivo() {
    try {
        let u = JSON.parse(localStorage.getItem(DB_KEYS.USUARIO_ACTIVO));
        if (u) {
            if (u.id === undefined || u.id === null) u.id = 1;
            if (!u.rol) {
                const nom = (u.usuario || "").toLowerCase();
                u.rol = nom.includes("admin") ? "administrador" : "vendedor";
            }
            u.rol = u.rol.toLowerCase().trim();
            return u;
        }
        const usuarios = obtenerUsuarios();
        return usuarios.find(usr => usr.rol === "administrador") || usuarios[0] || DATOS_SEMILLA.usuarios[0];
    } catch (e) {
        return DATOS_SEMILLA.usuarios[0];
    }
}

function guardarUsuarioActivo(usuario) {
    localStorage.setItem(DB_KEYS.USUARIO_ACTIVO, JSON.stringify(usuario));
}

function cerrarSesion() {
    localStorage.removeItem(DB_KEYS.USUARIO_ACTIVO);
    window.location.href = "login.html";
}

// ==========================================================================
// UTILIDADES DE FORMATO Y NOTIFICACIÓN
// ==========================================================================
function formatearMoneda(valor) {
    let num = parseFloat(valor) || 0;
    return "$" + num.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function mostrarNotificacion(mensaje, tipo = "success") {
    // Si existe alert flotante o toast en pantalla, usarlo; de lo contrario crear uno
    let contenedorToast = document.querySelector("#toast-container-global");
    if (!contenedorToast) {
        contenedorToast = document.createElement("div");
        contenedorToast.id = "toast-container-global";
        contenedorToast.style.position = "fixed";
        contenedorToast.style.bottom = "20px";
        contenedorToast.style.right = "20px";
        contenedorToast.style.zIndex = "99999";
        document.body.appendChild(contenedorToast);
    }

    const toast = document.createElement("div");
    const colorBg = tipo === "success" ? "#1cc88a" : (tipo === "danger" ? "#e74a3b" : "#4e73df");
    const icono = tipo === "success" ? "fa-circle-check" : (tipo === "danger" ? "fa-circle-xmark" : "fa-circle-info");

    toast.className = "alert alert-dismissible fade show text-white shadow-lg";
    toast.style.backgroundColor = colorBg;
    toast.style.borderColor = colorBg;
    toast.style.minWidth = "300px";
    toast.style.maxWidth = "420px";
    toast.style.borderRadius = "8px";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.justifyContent = "space-between";
    toast.style.padding = "14px 18px";
    toast.style.marginBottom = "10px";

    toast.innerHTML = `
        <div style="display:flex; align-items:center; gap: 10px;">
            <i class="fa-solid ${icono}" style="font-size: 1.25rem;"></i>
            <span style="font-weight: 500;">${mensaje}</span>
        </div>
        <button type="button" class="close text-white" style="margin-left: 10px; opacity: 0.85;" data-dismiss="alert" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
        </button>
    `;

    contenedorToast.appendChild(toast);

    setTimeout(() => {
        $(toast).alert("close");
    }, 3800);
}

// ==========================================================================
// ICONOS SVG Y HELPERS PARA ESTADO DE PEDIDOS (SIN EMOJIS)
// ==========================================================================
const ICONOS_SVG_ESTADO = {
    "Pendiente": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    
    "En preparación": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
    
    "En camino": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
    
    "Entregado": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    
    "Cancelado": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
};

function obtenerSvgEstado(estado) {
    return ICONOS_SVG_ESTADO[estado] || ICONOS_SVG_ESTADO["Pendiente"];
}

function obtenerBadgeEstadoHtml(estado, estiloExtra = "") {
    let badgeClass = "badge-warning";
    let colorTexto = "text-dark";
    if (estado === "Entregado") {
        badgeClass = "badge-success";
        colorTexto = "text-white";
    } else if (estado === "En camino") {
        badgeClass = "badge-primary";
        colorTexto = "text-white";
    } else if (estado === "En preparación") {
        badgeClass = "badge-info";
        colorTexto = "text-white";
    } else if (estado === "Cancelado") {
        badgeClass = "badge-danger";
        colorTexto = "text-white";
    }

    const svg = obtenerSvgEstado(estado);
    return `<span class="badge ${badgeClass} ${colorTexto} px-2 py-1 font-weight-bold d-inline-flex align-items-center shadow-sm" style="${estiloExtra}">${svg}<span>${estado || "Pendiente"}</span></span>`;
}

function obtenerDropdownEstadoHtml(id, estadoActual) {
    let btnColor = "warning";
    if (estadoActual === "Entregado") btnColor = "success";
    else if (estadoActual === "En camino") btnColor = "primary";
    else if (estadoActual === "En preparación") btnColor = "info";
    else if (estadoActual === "Cancelado") btnColor = "danger";

    return `
        <div class="dropdown">
            <button class="btn btn-sm btn-outline-${btnColor} dropdown-toggle font-weight-bold d-inline-flex align-items-center shadow-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 0.8rem; border-radius: 20px; padding: 4px 10px;">
                ${obtenerSvgEstado(estadoActual)}
                <span class="ml-1">${estadoActual || "Pendiente"}</span>
            </button>
            <div class="dropdown-menu shadow animated--fade-in" style="font-size: 0.85rem;">
                <h6 class="dropdown-header text-uppercase font-weight-bold py-1">Cambiar Estado:</h6>
                <button type="button" class="dropdown-item btn-cambiar-estado-item d-flex align-items-center text-warning font-weight-bold ${estadoActual === "Pendiente" ? "active text-white" : ""}" data-id="${id}" data-estado="Pendiente">
                    ${obtenerSvgEstado("Pendiente")} <span class="ml-2">Pendiente</span>
                </button>
                <button type="button" class="dropdown-item btn-cambiar-estado-item d-flex align-items-center text-info font-weight-bold ${estadoActual === "En preparación" ? "active text-white" : ""}" data-id="${id}" data-estado="En preparación">
                    ${obtenerSvgEstado("En preparación")} <span class="ml-2">En preparación</span>
                </button>
                <button type="button" class="dropdown-item btn-cambiar-estado-item d-flex align-items-center text-primary font-weight-bold ${estadoActual === "En camino" ? "active text-white" : ""}" data-id="${id}" data-estado="En camino">
                    ${obtenerSvgEstado("En camino")} <span class="ml-2">En camino</span>
                </button>
                <button type="button" class="dropdown-item btn-cambiar-estado-item d-flex align-items-center text-success font-weight-bold ${estadoActual === "Entregado" ? "active text-white" : ""}" data-id="${id}" data-estado="Entregado">
                    ${obtenerSvgEstado("Entregado")} <span class="ml-2">Entregado</span>
                </button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item btn-cambiar-estado-item d-flex align-items-center text-danger font-weight-bold ${estadoActual === "Cancelado" ? "active text-white" : ""}" data-id="${id}" data-estado="Cancelado">
                    ${obtenerSvgEstado("Cancelado")} <span class="ml-2">Cancelado</span>
                </button>
            </div>
        </div>
    `;
}

// ==========================================================================
// SEGURIDAD Y CONTROL DE ACCESO BASADO EN ROLES (RBAC)
// Vendedor: Módulos Clientes y Pedidos (Crear, Extraer y Editar).
//           Módulos Productos y Usuarios NO accesibles ni visibles.
//           Eliminación RESTRINGIDA.
// Admin:    Todos los Módulos (Productos, Clientes, Pedidos, Usuarios).
//           Crear, Extraer, Actualizar y Eliminar (Control Total).
// ==========================================================================

// Pre-protección inmediata para evitar parpadeos visuales en el Sidebar
(function preProtegerInterfazRBAC() {
    try {
        const u = JSON.parse(localStorage.getItem("tienda_usuario_activo"));
        if (u && u.rol === "vendedor") {
            const s = document.createElement("style");
            s.id = "rbac-early-hide-css";
            s.textContent = "#nav-item-productos, #nav-item-usuarios, li.nav-item:has(#collapseProductos), li.nav-item:has(#collapseUsuarios), li.nav-item:has([data-target='#collapseProductos']), li.nav-item:has([data-target='#collapseUsuarios']) { display: none !important; }";
            if (document.head) {
                document.head.appendChild(s);
            } else {
                document.addEventListener("DOMContentLoaded", () => {
                    if (document.head) document.head.appendChild(s);
                });
            }
        }
    } catch(e) {}
})();

function verificarPermisoEliminar() {
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo || usuarioActivo.rol !== "administrador") {
        mostrarNotificacion("Acción restringida: Solo los usuarios con rol 'administrador' pueden eliminar datos.", "danger");
        return false;
    }
    return true;
}

function verificarAccesoModuloActual() {
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo) return true;

    if (usuarioActivo.rol === "vendedor") {
        const path = window.location.pathname.toLowerCase();
        const esRutaProhibida = path.includes("usuario") || 
                                path.endsWith("listado-pro.html") || 
                                path.endsWith("crear-pro.html");

        if (esRutaProhibida) {
            const moduloNombre = path.includes("usuario") ? "Usuarios" : "Productos";
            
            // Reemplazar inmediatamente el contenedor de contenido para proteger los datos
            const contenedorPrincipal = document.querySelector("#content-wrapper") || document.body;
            if (contenedorPrincipal) {
                contenedorPrincipal.innerHTML = `
                    <div class="container-fluid py-5 d-flex align-items-center justify-content-center" style="min-height: 80vh;">
                        <div class="card shadow-lg text-center p-5 border-0" style="max-width: 580px; border-radius: 16px;">
                            <div class="mb-3 text-warning" style="font-size: 4rem;">
                                <i class="fas fa-user-shield"></i>
                            </div>
                            <h2 class="font-weight-bold text-gray-800">Acceso Restringido</h2>
                            <div class="my-2">
                                <span class="badge badge-warning text-uppercase py-2 px-3 font-weight-bold" style="font-size: 0.85rem;">
                                    Tu Rol: VENDEDOR
                                </span>
                            </div>
                            <p class="text-muted mt-3" style="font-size: 1.05rem;">
                                El perfil de <strong>Vendedor</strong> no tiene permisos para ver ni administrar el módulo de <strong>${moduloNombre}</strong>.
                            </p>
                            <p class="small text-gray-500 mb-4">
                                Como vendedor tienes acceso autorizado a los módulos de <strong class="text-info">Clientes</strong> y <strong class="text-primary">Pedidos</strong>.
                            </p>
                            <div class="d-flex justify-content-center" style="gap: 12px; flex-wrap: wrap;">
                                <a href="listado-pedidos.html" class="btn btn-primary font-weight-bold px-4 py-2 shadow-sm">
                                    <i class="fas fa-shopping-cart mr-2"></i> Ir a Pedidos
                                </a>
                                <a href="listado-clientes.html" class="btn btn-info font-weight-bold px-4 py-2 shadow-sm">
                                    <i class="fas fa-users mr-2"></i> Ir a Clientes
                                </a>
                                <a href="login.html" class="btn btn-outline-danger font-weight-bold px-3 py-2 shadow-sm">
                                    <i class="fas fa-sign-out-alt mr-1"></i> Iniciar como Admin
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
            mostrarNotificacion("Acceso restringido: El perfil Vendedor no tiene perfil para ver " + moduloNombre + ".", "warning");
            return false;
        }
    }
    return true;
}

function aplicarPermisosEnInterfaz() {
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo) return;

    // Verificar si está en una ruta restringida para su rol
    const accesoPermitido = verificarAccesoModuloActual();
    if (!accesoPermitido) {
        // Aún así asegurar ocultar del sidebar en caso de que quede visible
        const proItem = document.getElementById("nav-item-productos") || 
                        document.querySelector('[data-target="#collapseProductos"]')?.closest("li.nav-item") ||
                        document.querySelector("#collapseProductos")?.closest("li.nav-item");
        if (proItem) {
            proItem.style.display = "none";
            proItem.setAttribute("hidden", "true");
        }
        const usrItem = document.getElementById("nav-item-usuarios") || 
                        document.querySelector('[data-target="#collapseUsuarios"]')?.closest("li.nav-item") ||
                        document.querySelector("#collapseUsuarios")?.closest("li.nav-item");
        if (usrItem) {
            usrItem.style.display = "none";
            usrItem.setAttribute("hidden", "true");
        }
        return;
    }

    // 1. Actualizar nombre de usuario y badge de rol en el Topbar
    const userDropdownElem = document.querySelector("#userDropdown span");
    if (userDropdownElem) {
        const badgeColor = usuarioActivo.rol === "administrador" ? "badge-danger" : "badge-warning";
        const rolTexto = usuarioActivo.rol === "administrador" ? "Admin" : "Vendedor";
        userDropdownElem.innerHTML = `
            <strong>${usuarioActivo.nombre || usuarioActivo.usuario}</strong> 
            <span class="badge ${badgeColor} text-uppercase ml-1" style="font-size:0.75rem;">${rolTexto}</span>
        `;
    }

    // 2. Agregar enlace a la tienda online en el Sidebar si no existe
    const accordionSidebar = document.querySelector("#accordionSidebar");
    if (accordionSidebar && !document.querySelector("#link-ver-tienda")) {
        const itemTienda = document.createElement("li");
        itemTienda.className = "nav-item";
        itemTienda.id = "link-ver-tienda";
        itemTienda.innerHTML = `
            <a class="nav-link bg-success text-white my-2 rounded font-weight-bold" href="../front/index.html" target="_blank" style="margin: 0 1rem;">
                <i class="fas fa-fw fa-store text-white"></i>
                <span>Ver Tienda Online</span>
            </a>
        `;
        accordionSidebar.insertBefore(itemTienda, accordionSidebar.children[2]);
    }

    // 3. Menú desplegable del perfil de usuario (TopBar)
    const userDropdownLink = document.querySelector("#userDropdown");
    if (userDropdownLink) {
        const parentLi = userDropdownLink.closest("li.nav-item.dropdown");
        if (parentLi) {
            let dropdownMenu = parentLi.querySelector(".dropdown-menu");
            if (!dropdownMenu) {
                dropdownMenu = document.createElement("div");
                dropdownMenu.className = "dropdown-menu dropdown-menu-right shadow animated--grow-in";
                dropdownMenu.setAttribute("aria-labelledby", "userDropdown");
                parentLi.appendChild(dropdownMenu);
            }
            
            // Solo los administradores ven el acceso directo a Gestión de Usuarios
            const enlaceUsuarios = usuarioActivo.rol === "administrador" ? `
                <a class="dropdown-item" href="listado-usuarios.html">
                    <i class="fas fa-users-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                    Gestión de Usuarios
                </a>
            ` : "";

            dropdownMenu.innerHTML = `
                <div class="dropdown-header text-center py-2" style="background-color: #f8f9fc;">
                    <div class="font-weight-bold text-dark" style="font-size: 0.95rem;">${usuarioActivo.nombre || usuarioActivo.usuario}</div>
                    <span class="badge ${usuarioActivo.rol === 'administrador' ? 'badge-danger' : 'badge-warning'} text-uppercase mt-1">${usuarioActivo.rol === 'administrador' ? 'Administrador' : 'Vendedor'}</span>
                </div>
                <div class="dropdown-divider"></div>
                ${enlaceUsuarios}
                <a class="dropdown-item" href="../front/index.html" target="_blank">
                    <i class="fas fa-store fa-sm fa-fw mr-2 text-success"></i>
                    Ir a la Tienda Online
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-danger font-weight-bold" href="login.html" id="btn-logout-dropdown">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-danger"></i>
                    Cerrar Sesión / Cambiar Rol
                </a>
            `;

            const btnLogoutDrop = dropdownMenu.querySelector("#btn-logout-dropdown");
            if (btnLogoutDrop) {
                btnLogoutDrop.addEventListener("click", (e) => {
                    e.preventDefault();
                    cerrarSesion();
                });
            }
        }
    }

    // 4. Si el rol es 'vendedor': ocultar opciones no permitidas en el Sidebar y botones restringidos
    if (usuarioActivo.rol === "vendedor") {
        // A. Ocultar del Sidebar los módulos Productos y Usuarios
        const proItem = document.getElementById("nav-item-productos") || 
                        document.querySelector('[data-target="#collapseProductos"]')?.closest("li.nav-item") ||
                        document.querySelector("#collapseProductos")?.closest("li.nav-item");
        if (proItem) {
            proItem.style.display = "none";
            proItem.setAttribute("hidden", "true");
        }

        const usrItem = document.getElementById("nav-item-usuarios") || 
                        document.querySelector('[data-target="#collapseUsuarios"]')?.closest("li.nav-item") ||
                        document.querySelector("#collapseUsuarios")?.closest("li.nav-item");
        if (usrItem) {
            usrItem.style.display = "none";
            usrItem.setAttribute("hidden", "true");
        }

        // B. En index.html ocultar enlace a gestión de productos
        const linkGestionarPro = document.querySelector('a[href="listado-pro.html"]');
        if (linkGestionarPro) {
            linkGestionarPro.style.display = "none";
        }

        // C. Bloquear/deshabilitar botones de eliminación en tablas (Clientes y Pedidos)
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.classList.add("disabled");
            btn.setAttribute("title", "Operación restringida: Solo administradores pueden eliminar");
            btn.setAttribute("disabled", "true");
            btn.style.opacity = "0.45";
            btn.style.cursor = "not-allowed";
        });
    } else {
        // Si es administrador, asegurarse de mostrar los módulos completos
        const proItem = document.getElementById("nav-item-productos");
        if (proItem) {
            proItem.style.display = "";
            proItem.removeAttribute("hidden");
        }
        const usrItem = document.getElementById("nav-item-usuarios");
        if (usrItem) {
            usrItem.style.display = "";
            usrItem.removeAttribute("hidden");
        }
    }
}

// Configurar botón de logout en el modal y aplicar permisos
document.addEventListener("DOMContentLoaded", () => {
    aplicarPermisosEnInterfaz();

    const btnLogoutModal = document.querySelector("#logoutModal a.btn-primary");
    if (btnLogoutModal) {
        btnLogoutModal.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }
});
