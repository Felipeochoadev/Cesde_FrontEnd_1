// ==========================================================
// TALLER LOCALSTORAGE - REGISTRO, LOGIN Y CRUD PELÍCULAS (CineFlix)
// ==========================================================

// --- SELECTORES DEL DOM: REGISTRO & LOGIN ---
const formRegistro = document.getElementById("formRegistro");
const inputNombre = document.getElementById("inputNombre");
const inputEmail = document.getElementById("inputEmail");
const inputUserReg = document.getElementById("inputUserReg");
const inputPasswordReg = document.getElementById("inputPasswordReg");
const inputConfirmPassword = document.getElementById("inputConfirmPassword");

const formLogin = document.getElementById("formLogin");
const inputUser = document.getElementById("inputUser");
const inputPassword = document.getElementById("inputPassword");

const loginSection = document.getElementById("loginSection");
const mainContent = document.getElementById("mainContent");
const btnAgregar = document.getElementById("btnAgregar");
const btnLogout = document.getElementById("btnLogout");
const btnLogin = document.getElementById("btnLogin");
const userGreeting = document.getElementById("userGreeting");

const loginTab = document.getElementById("login-tab");
const registroTab = document.getElementById("registro-tab");
const linkLogin = document.getElementById("linkLogin");

// --- SELECTORES DEL DOM: CRUD PELÍCULAS ---
const gridPeliculas = document.getElementById("gridPeliculas");
const carouselMovies = document.getElementById("carouselMovies");
const sinResultados = document.getElementById("sinResultados");
const inputBuscar = document.getElementById("inputBuscar");
const selectGenero = document.getElementById("selectGenero");

// Modal de Película (Crear / Editar)
const modalPeliculaEl = document.getElementById("modalPelicula");
const modalTitulo = document.getElementById("modalTitulo");
const formPelicula = document.getElementById("formPelicula");
const editPeliculaId = document.getElementById("editPeliculaId");
const inputTitulo = document.getElementById("inputTitulo");
const inputGenero = document.getElementById("inputGenero");
const inputDirector = document.getElementById("inputDirector");
const inputAno = document.getElementById("inputAno");
const inputCalificacion = document.getElementById("inputCalificacion");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputImagen = document.getElementById("inputImagen");
const inputFileImagen = document.getElementById("inputFileImagen");
const btnProbarConversion = document.getElementById("btnProbarConversion");
const previewImagenContainer = document.getElementById("previewImagenContainer");
const previewImagen = document.getElementById("previewImagen");
const previewStatus = document.getElementById("previewStatus");
const btnGuardarPelicula = document.getElementById("btnGuardarPelicula");

// Modal de Detalles
const modalDetallesEl = document.getElementById("modalDetalles");
const detallesTitulo = document.getElementById("detallesTitulo");
const detallesImagen = document.getElementById("detallesImagen");
const detallesGenero = document.getElementById("detallesGenero");
const detallesDirector = document.getElementById("detallesDirector");
const detallesAno = document.getElementById("detallesAno");
const detallesCalificacion = document.getElementById("detallesCalificacion");
const detallesDescripcion = document.getElementById("detallesDescripcion");

// ==========================================================
// NOTIFICACIONES TOAST (Bootstrap)
// ==========================================================
/**
 * Muestra una notificación estilo Toast de Bootstrap en la esquina inferior derecha.
 * @param {string} mensaje Texto a mostrar
 * @param {string} tipo 'success' | 'danger' | 'warning' | 'info'
 */
function mostrarToast(mensaje, tipo = "info") {
    const toastEl = document.getElementById("appToast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    if (!toastEl || !toastMessage) return;

    toastEl.classList.remove("text-bg-success", "text-bg-danger", "text-bg-warning", "text-bg-info", "text-bg-primary");

    let iconoClase = "bi-info-circle-fill";
    let bgClase = "text-bg-primary";

    switch (tipo) {
        case "success":
            bgClase = "text-bg-success";
            iconoClase = "bi-check-circle-fill";
            break;
        case "danger":
        case "error":
            bgClase = "text-bg-danger";
            iconoClase = "bi-exclamation-triangle-fill";
            break;
        case "warning":
            bgClase = "text-bg-warning";
            iconoClase = "bi-exclamation-circle-fill";
            break;
        case "info":
        default:
            bgClase = "text-bg-info";
            iconoClase = "bi-info-circle-fill";
            break;
    }

    toastEl.classList.add(bgClase);
    if (toastIcon) {
        toastIcon.className = `bi ${iconoClase} fs-5`;
    }
    toastMessage.textContent = mensaje;

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 });
    toast.show();
}

// ==========================================================
// CONVERSOR DE IMÁGENES A BASE64 (Soporte Offline)
// ==========================================================

/**
 * Genera un póster offline en formato Base64 usando Canvas.
 * Esto asegura que NUNCA falle la imagen aunque estemos sin internet o con CORS bloqueado.
 * @param {string} titulo Título o texto para dibujar en el póster
 * @returns {string} DataURL Base64 de la imagen
 */
function generarPosterCanvas(titulo = "CineFlix") {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 450;
    const ctx = canvas.getContext("2d");

    // Fondo degradado
    const grad = ctx.createLinearGradient(0, 0, 300, 450);
    grad.addColorStop(0, "#2c3e50");
    grad.addColorStop(1, "#667eea");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 450);

    // Decoración estética
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, 270, 420);

    // Texto de marca
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🎬 CineFlix", 150, 180);

    // Título de la película
    ctx.fillStyle = "#ffc107";
    ctx.font = "bold 16px 'Segoe UI', Arial, sans-serif";
    const textoCorto = titulo.length > 22 ? titulo.substring(0, 20) + "..." : titulo;
    ctx.fillText(textoCorto, 150, 230);

    // Etiqueta offline
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "12px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("[ Póster Offline Base64 ]", 150, 260);

    return canvas.toDataURL("image/jpeg", 0.8);
}

/**
 * Redimensiona y comprime una imagen a Base64 para optimizar espacio en localStorage.
 * @param {HTMLImageElement} img 
 * @param {number} maxAncho 
 * @param {number} calidad 
 * @returns {string} DataURL Base64
 */
function redimensionarYComprimir(img, maxAncho = 450, calidad = 0.75) {
    const canvas = document.createElement("canvas");
    let w = img.naturalWidth || img.width || 300;
    let h = img.naturalHeight || img.height || 450;

    if (w > maxAncho) {
        h = Math.round((h * maxAncho) / w);
        w = maxAncho;
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", calidad);
}

/**
 * Convierte un Blob o Archivo en Base64.
 * @param {Blob} blob 
 * @returns {Promise<string>}
 */
function blobABase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => resolve(redimensionarYComprimir(img));
            img.onerror = () => resolve(reader.result);
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Convierte una URL de imagen a Base64 utilizando fetch o Canvas.
 * Incluye respaldo con proxy CORS y fallback offline con canvas.
 * @param {string} url 
 * @param {string} tituloRespaldo 
 * @returns {Promise<string>} DataURL Base64
 */
async function urlABase64(url, tituloRespaldo = "CineFlix") {
    if (!url) return generarPosterCanvas(tituloRespaldo);

    // Si ya es Base64 (data:image/...) se devuelve intacta
    if (url.startsWith("data:image/")) {
        return url;
    }

    // 1. Intentar Fetch directo
    try {
        const res = await fetch(url, { mode: "cors" });
        if (res.ok) {
            const blob = await res.blob();
            return await blobABase64(blob);
        }
    } catch (e) {
        console.warn("Fetch directo no disponible para la imagen (posible CORS), probando método Canvas...", e);
    }

    // 2. Intentar cargar con objeto Image y Canvas con crossOrigin
    try {
        const base64Canvas = await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                try {
                    resolve(redimensionarYComprimir(img));
                } catch (canvasErr) {
                    reject(canvasErr);
                }
            };
            img.onerror = reject;
            img.src = url;
        });
        if (base64Canvas) return base64Canvas;
    } catch (e) {
        console.warn("Carga directa con Image falló, probando proxy CORS...", e);
    }

    // 3. Intentar mediante proxy libre de CORS
    try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl);
        if (res.ok) {
            const blob = await res.blob();
            return await blobABase64(blob);
        }
    } catch (proxyErr) {
        console.warn("Proxy CORS no disponible:", proxyErr);
    }

    // 4. Fallback final offline: generar póster con el título de la película
    return generarPosterCanvas(tituloRespaldo);
}

// Evento: cuando el usuario selecciona un archivo local de imagen
if (inputFileImagen) {
    inputFileImagen.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await blobABase64(file);
                previewImagen.src = base64;
                previewImagen.dataset.base64 = base64;
                previewImagenContainer.style.display = "block";
                const kb = Math.round((base64.length * 3 / 4) / 1024);
                previewStatus.textContent = `✅ Archivo local convertido a Base64 (${kb} KB) - Guardado para offline`;
                inputImagen.value = ""; // Limpiar URL para priorizar archivo
                mostrarToast("Imagen cargada y convertida a Base64", "success");
            } catch (err) {
                mostrarToast("Error al leer la imagen seleccionada", "danger");
            }
        }
    });
}

// Evento: botón para probar la conversión de la URL ingresada a Base64
if (btnProbarConversion) {
    btnProbarConversion.addEventListener("click", async () => {
        const url = inputImagen.value.trim();
        const titulo = inputTitulo.value.trim() || "Película";

        if (!url) {
            mostrarToast("Ingresa primero una URL de imagen para convertir.", "warning");
            return;
        }

        btnProbarConversion.disabled = true;
        btnProbarConversion.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Convirtiendo...`;

        try {
            const base64 = await urlABase64(url, titulo);
            previewImagen.src = base64;
            previewImagen.dataset.base64 = base64;
            previewImagenContainer.style.display = "block";
            const kb = Math.round((base64.length * 3 / 4) / 1024);
            previewStatus.textContent = `✅ Imagen convertida a Base64 (${kb} KB) - Lista para offline`;
            mostrarToast("¡URL convertida exitosamente a Base64!", "success");
        } catch (err) {
            mostrarToast("No se pudo convertir la imagen externa, se usará póster offline.", "warning");
        } finally {
            btnProbarConversion.disabled = false;
            btnProbarConversion.innerHTML = `<i class="bi bi-arrow-repeat"></i> Convertir`;
        }
    });
}

// ==========================================================
// LOCALSTORAGE: USUARIOS Y SESIÓN
// ==========================================================

function obtenerUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios || !Array.isArray(usuarios)) {
        usuarios = [
            { nombre: "Administrador", email: "admin@cineflix.com", usuario: "admin", password: "admin123" },
            { nombre: "Usuario Prueba", email: "usuario@cineflix.com", usuario: "usuario", password: "1234" },
            { nombre: "Demo", email: "demo@cineflix.com", usuario: "demo", password: "demo" }
        ];
        guardarUsuarios(usuarios);
    }
    return usuarios;
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerUsuarioActivo() {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
}

function guardarUsuarioActivo(usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

function cerrarSesionStorage() {
    localStorage.removeItem("usuarioActivo");
}

function actualizarInterfaz() {
    const usuarioActivo = obtenerUsuarioActivo();

    if (usuarioActivo) {
        loginSection.style.display = "none";
        mainContent.style.display = "block";
        btnAgregar.style.display = "inline-block";
        btnLogout.style.display = "inline-block";
        btnLogin.style.display = "none";

        if (userGreeting) {
            userGreeting.innerHTML = `<i class="bi bi-person-circle"></i> Hola, <strong>${usuarioActivo.nombre}</strong>`;
            userGreeting.style.display = "inline-block";
        }

        // Renderizar las películas al tener sesión activa
        renderizarPeliculas();
    } else {
        loginSection.style.display = "flex";
        mainContent.style.display = "none";
        btnAgregar.style.display = "none";
        btnLogout.style.display = "none";
        btnLogin.style.display = "inline-block";

        if (userGreeting) {
            userGreeting.style.display = "none";
        }
    }
}

function activarTabLogin() {
    if (loginTab) {
        const tab = bootstrap.Tab.getOrCreateInstance(loginTab);
        tab.show();
    }
}

// ==========================================================
// LOCALSTORAGE: CRUD DE PELÍCULAS
// ==========================================================

/**
 * Obtiene la lista de películas desde localStorage.
 * Si no existen, inicializa con datos de ejemplo con imágenes en Base64.
 * @returns {Array} Array de películas
 */
function obtenerPeliculas() {
    let peliculas = JSON.parse(localStorage.getItem("peliculas"));

    if (!peliculas || !Array.isArray(peliculas)) {
        peliculas = [
            {
                id: 1700000000001,
                titulo: "Interestelar",
                genero: "Ciencia Ficción",
                director: "Christopher Nolan",
                ano: 2014,
                calificacion: 8.7,
                descripcion: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.",
                urlOriginal: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&q=80",
                imagen: generarPosterCanvas("Interestelar")
            },
            {
                id: 1700000000002,
                titulo: "El Caballero de la Noche",
                genero: "Acción",
                director: "Christopher Nolan",
                ano: 2008,
                calificacion: 9.0,
                descripcion: "Batman debe aceptar una de las mayores pruebas psicológicas y físicas de su capacidad para luchar contra la injusticia causada por el Joker.",
                urlOriginal: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
                imagen: generarPosterCanvas("The Dark Knight")
            },
            {
                id: 1700000000003,
                titulo: "Pulp Fiction",
                genero: "Drama",
                director: "Quentin Tarantino",
                ano: 1994,
                calificacion: 8.9,
                descripcion: "Las vidas de dos sicarios, la esposa de un gángster y un boxeador se entrelazan en cuatro historias de violencia y redención.",
                urlOriginal: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
                imagen: generarPosterCanvas("Pulp Fiction")
            }
        ];
        guardarPeliculas(peliculas);
    }

    return peliculas;
}

/**
 * Guarda el array de películas en localStorage.
 * @param {Array} peliculas 
 */
function guardarPeliculas(peliculas) {
    try {
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
    } catch (e) {
        if (e.name === "QuotaExceededError" || e.code === 22) {
            mostrarToast("¡Atención! El almacenamiento de localStorage se ha llenado. Comprime las imágenes.", "danger");
        } else {
            console.error(e);
        }
    }
}

/**
 * Renderiza las películas en el Grid principal y en el Carrusel/Slider superior.
 * Sincroniza los filtros de búsqueda por texto y por género en ambas secciones.
 */
function renderizarPeliculas() {
    const peliculas = obtenerPeliculas();

    // Filtros
    const textoBuscar = inputBuscar ? inputBuscar.value.trim().toLowerCase() : "";
    const generoSeleccionado = selectGenero ? selectGenero.value : "";

    const peliculasFiltradas = peliculas.filter(p => {
        const coincideTexto = !textoBuscar ||
            p.titulo.toLowerCase().includes(textoBuscar) ||
            p.director.toLowerCase().includes(textoBuscar) ||
            p.descripcion.toLowerCase().includes(textoBuscar);

        const coincideGenero = !generoSeleccionado || p.genero === generoSeleccionado;

        return coincideTexto && coincideGenero;
    });

    const seccionRecientes = document.getElementById("seccionRecientes");

    // 1. RENDERIZAR CARRUSEL DE RECIENTES (Filtrado también por género y búsqueda)
    const peliculasRecientesFiltradas = peliculasFiltradas.slice(0, 8);

    if (carouselMovies) {
        carouselMovies.innerHTML = "";

        if (peliculasRecientesFiltradas.length === 0) {
            // Ocultar sección de recientes si no hay coincidencias con el filtro
            if (seccionRecientes) seccionRecientes.style.display = "none";
        } else {
            if (seccionRecientes) seccionRecientes.style.display = "block";

            peliculasRecientesFiltradas.forEach(p => {
                const item = document.createElement("div");
                item.className = "slider-movie-card";
                item.setAttribute("data-id", p.id);
                item.innerHTML = `
                    <div class="slider-image-container">
                        <img src="${p.imagen}" alt="${p.titulo}">
                    </div>
                    <div class="slider-movie-info">
                        <h6 title="${p.titulo}">${p.titulo}</h6>
                        <small class="text-muted"><i class="bi bi-star-fill text-warning"></i> ${p.calificacion} · ${p.ano}</small>
                    </div>
                `;
                item.addEventListener("click", () => mostrarDetalles(p.id));
                carouselMovies.appendChild(item);
            });
        }
    }

    // 2. RENDERIZAR GRID PRINCIPAL
    if (gridPeliculas) {
        gridPeliculas.innerHTML = "";

        if (peliculasFiltradas.length === 0) {
            // Ocultar el grid con display: none para que no colapse sus márgenes negativos sobre el título
            gridPeliculas.style.display = "none";
            if (sinResultados) sinResultados.style.display = "block";
        } else {
            gridPeliculas.style.display = "flex";
            if (sinResultados) sinResultados.style.display = "none";

            peliculasFiltradas.forEach(p => {
                const col = document.createElement("div");
                col.className = "col-sm-6 col-md-4 col-lg-3";

                // Contenedor rígido para la imagen fija con object-fit: cover
                col.innerHTML = `
                    <div class="movie-card">
                        <div class="movie-image-container">
                            <img src="${p.imagen}" alt="${p.titulo}" class="movie-image" loading="lazy">
                        </div>
                        <div class="movie-content">
                            <h5 class="movie-title" title="${p.titulo}">${p.titulo}</h5>
                            <div>
                                <span class="movie-genre">${p.genero}</span>
                            </div>
                            <p class="movie-meta mb-1"><i class="bi bi-person"></i> ${p.director} (${p.ano})</p>
                            <p class="movie-rating"><i class="bi bi-star-fill text-warning"></i> ${p.calificacion} / 10</p>
                            <p class="movie-description">${p.descripcion}</p>
                            <div class="movie-actions">
                                <button type="button" class="btn btn-info btn-sm text-white btn-ver" data-id="${p.id}" title="Ver detalles">
                                    <i class="bi bi-eye"></i> Ver
                                </button>
                                <button type="button" class="btn btn-warning btn-sm btn-editar" data-id="${p.id}" title="Editar película">
                                    <i class="bi bi-pencil"></i> Editar
                                </button>
                                <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-id="${p.id}" title="Eliminar película">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                gridPeliculas.appendChild(col);
            });
        }
    }
}

// ==========================================================
// FORMULARIO AGREGAR / EDITAR PELÍCULA
// ==========================================================

/**
 * Prepara el modal para agregar una nueva película con valores por defecto.
 */
function abrirModalAgregar() {
    if (modalTitulo) modalTitulo.textContent = "Agregar Película";
    if (btnGuardarPelicula) btnGuardarPelicula.textContent = "Guardar Película";
    if (editPeliculaId) editPeliculaId.value = "";

    // Valores por defecto para pruebas rápidas
    inputTitulo.value = "Inception";
    inputGenero.value = "Ciencia Ficción";
    inputDirector.value = "Christopher Nolan";
    inputAno.value = "2010";
    inputCalificacion.value = "8.8";
    inputDescripcion.value = "Un hábil ladrón capaz de infiltrarse en los sueños ajenos recibe la misión inversa: implantar una idea en la mente de un magnate.";
    inputImagen.value = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";

    if (inputFileImagen) inputFileImagen.value = "";
    if (previewImagen) {
        delete previewImagen.dataset.base64;
        previewImagen.src = "";
    }
    if (previewImagenContainer) previewImagenContainer.style.display = "none";
}

/**
 * Prepara el modal con la información de la película a editar.
 * @param {number|string} id 
 */
function abrirModalEditar(id) {
    const peliculas = obtenerPeliculas();
    const p = peliculas.find(item => String(item.id) === String(id));
    if (!p) return;

    if (modalTitulo) modalTitulo.textContent = "Editar Película";
    if (btnGuardarPelicula) btnGuardarPelicula.textContent = "Actualizar Película";
    if (editPeliculaId) editPeliculaId.value = p.id;

    inputTitulo.value = p.titulo;
    inputGenero.value = p.genero;
    inputDirector.value = p.director;
    inputAno.value = p.ano;
    inputCalificacion.value = p.calificacion;
    inputDescripcion.value = p.descripcion;
    inputImagen.value = p.urlOriginal || "";

    if (inputFileImagen) inputFileImagen.value = "";

    // Mostrar imagen actual guardada en Base64
    if (previewImagen) {
        previewImagen.src = p.imagen;
        previewImagen.dataset.base64 = p.imagen;
    }
    if (previewStatus) {
        previewStatus.textContent = "✅ Imagen actual en Base64 (Lista para offline)";
    }
    if (previewImagenContainer) {
        previewImagenContainer.style.display = "block";
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalPeliculaEl);
    modal.show();
}

/**
 * Muestra el modal con los detalles de una película.
 * @param {number|string} id 
 */
function mostrarDetalles(id) {
    const peliculas = obtenerPeliculas();
    const p = peliculas.find(item => String(item.id) === String(id));
    if (!p) return;

    detallesTitulo.textContent = p.titulo;
    detallesImagen.src = p.imagen;
    detallesGenero.textContent = p.genero;
    detallesDirector.textContent = p.director;
    detallesAno.textContent = p.ano;
    detallesCalificacion.textContent = p.calificacion;
    detallesDescripcion.textContent = p.descripcion;

    const modal = bootstrap.Modal.getOrCreateInstance(modalDetallesEl);
    modal.show();
}

/**
 * Elimina una película por su ID tras confirmar con el usuario.
 * @param {number|string} id 
 */
function eliminarPelicula(id) {
    const peliculas = obtenerPeliculas();
    const p = peliculas.find(item => String(item.id) === String(id));
    if (!p) return;

    const confirmar = confirm(`¿Estás seguro de eliminar la película "${p.titulo}"?`);
    if (confirmar) {
        const nuevasPeliculas = peliculas.filter(item => String(item.id) !== String(id));
        guardarPeliculas(nuevasPeliculas);
        renderizarPeliculas();
        mostrarToast(`Película "${p.titulo}" eliminada con éxito.`, "info");
    }
}

// Botón de navbar "Agregar Película"
if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
        abrirModalAgregar();
    });
}

// Guardar / Actualizar Película
if (btnGuardarPelicula) {
    btnGuardarPelicula.addEventListener("click", async () => {
        const titulo = inputTitulo.value.trim();
        const genero = inputGenero.value;
        const director = inputDirector.value.trim();
        const ano = inputAno.value.trim();
        const calificacion = inputCalificacion.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const urlImg = inputImagen.value.trim();
        const idEdicion = editPeliculaId ? editPeliculaId.value : "";

        // Validaciones
        if (!titulo || !genero || !director || !ano || !calificacion || !descripcion) {
            mostrarToast("Por favor completa todos los campos obligatorios.", "warning");
            return;
        }

        // Mostrar estado de procesamiento
        btnGuardarPelicula.disabled = true;
        btnGuardarPelicula.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Procesando Base64...`;

        try {
            // Obtener la imagen en Base64
            let imagenBase64 = "";

            // 1. Si ya se generó o seleccionó un archivo local
            if (previewImagen && previewImagen.dataset.base64 && !urlImg) {
                imagenBase64 = previewImagen.dataset.base64;
            } else if (urlImg) {
                // 2. Si se ingresó una URL, convertirla a Base64
                imagenBase64 = await urlABase64(urlImg, titulo);
            } else {
                // 3. Fallback en Canvas si no se proporcionó nada
                imagenBase64 = generarPosterCanvas(titulo);
            }

            const peliculas = obtenerPeliculas();

            if (idEdicion) {
                // UPDATE: Actualizar película existente
                const index = peliculas.findIndex(item => String(item.id) === String(idEdicion));
                if (index !== -1) {
                    peliculas[index] = {
                        ...peliculas[index],
                        titulo,
                        genero,
                        director,
                        ano: Number(ano),
                        calificacion: Number(calificacion),
                        descripcion,
                        urlOriginal: urlImg || peliculas[index].urlOriginal,
                        imagen: imagenBase64
                    };
                    guardarPeliculas(peliculas);
                    mostrarToast("Película actualizada con éxito.", "success");
                }
            } else {
                // CREATE: Guardar nueva película con imagen Base64
                const nuevaPeli = {
                    id: Date.now(),
                    titulo,
                    genero,
                    director,
                    ano: Number(ano),
                    calificacion: Number(calificacion),
                    descripcion,
                    urlOriginal: urlImg,
                    imagen: imagenBase64
                };
                peliculas.unshift(nuevaPeli);
                guardarPeliculas(peliculas);
                mostrarToast("Película agregada y codificada en Base64 con éxito.", "success");
            }

            // Actualizar vista
            renderizarPeliculas();

            // Cerrar modal
            const modalInstance = bootstrap.Modal.getInstance(modalPeliculaEl);
            if (modalInstance) {
                modalInstance.hide();
            }
        } catch (error) {
            console.error("Error al guardar película:", error);
            mostrarToast("Ocurrió un error al procesar la película.", "danger");
        } finally {
            btnGuardarPelicula.disabled = false;
            btnGuardarPelicula.textContent = idEdicion ? "Actualizar Película" : "Guardar Película";
        }
    });
}

// Delegación de eventos en el Grid de Películas (Ver, Editar, Eliminar)
if (gridPeliculas) {
    gridPeliculas.addEventListener("click", (e) => {
        const btnVer = e.target.closest(".btn-ver");
        const btnEditar = e.target.closest(".btn-editar");
        const btnEliminar = e.target.closest(".btn-eliminar");

        if (btnVer) {
            const id = btnVer.getAttribute("data-id");
            mostrarDetalles(id);
        } else if (btnEditar) {
            const id = btnEditar.getAttribute("data-id");
            abrirModalEditar(id);
        } else if (btnEliminar) {
            const id = btnEliminar.getAttribute("data-id");
            eliminarPelicula(id);
        }
    });
}

// Eventos de búsqueda y filtros
if (inputBuscar) {
    inputBuscar.addEventListener("input", () => {
        renderizarPeliculas();
    });
}

if (selectGenero) {
    selectGenero.addEventListener("change", () => {
        renderizarPeliculas();
    });
}

// ==========================================================
// EVENTOS: REGISTRO Y LOGIN
// ==========================================================
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const usuario = inputUserReg.value.trim();
        const password = inputPasswordReg.value;
        const confirmPassword = inputConfirmPassword.value;

        if (!nombre || !email || !usuario || !password || !confirmPassword) {
            mostrarToast("Por favor completa todos los campos del registro.", "warning");
            return;
        }

        if (password !== confirmPassword) {
            mostrarToast("Las contraseñas no coinciden. Por favor verifícalas.", "danger");
            return;
        }

        const usuarios = obtenerUsuarios();
        const existeUsuario = usuarios.some(u => u.usuario.toLowerCase() === usuario.toLowerCase());

        if (existeUsuario) {
            mostrarToast(`El usuario "${usuario}" ya existe. Intenta con otro.`, "warning");
            return;
        }

        const nuevoUsuario = {
            nombre,
            email,
            usuario,
            password
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        mostrarToast(`¡Registro exitoso! Bienvenido/a ${nombre}. Ya puedes ingresar.`, "success");

        inputUser.value = usuario;
        inputPassword.value = password;
        activarTabLogin();
    });
}

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuarioIngresado = inputUser.value.trim();
        const passwordIngresada = inputPassword.value;

        if (!usuarioIngresado || !passwordIngresada) {
            mostrarToast("Por favor ingresa usuario y contraseña.", "warning");
            return;
        }

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u =>
            u.usuario.toLowerCase() === usuarioIngresado.toLowerCase() &&
            u.password === passwordIngresada
        );

        if (usuarioEncontrado) {
            guardarUsuarioActivo(usuarioEncontrado);
            mostrarToast(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`, "success");
            actualizarInterfaz();
        } else {
            mostrarToast("Usuario o contraseña incorrectos. Verifica tus datos.", "danger");
        }
    });
}

if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (confirmar) {
            cerrarSesionStorage();
            actualizarInterfaz();
            activarTabLogin();
            mostrarToast("Has cerrado sesión exitosamente.", "info");
        }
    });
}

if (linkLogin) {
    linkLogin.addEventListener("click", (e) => {
        e.preventDefault();
        activarTabLogin();
    });
}

if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        activarTabLogin();
        if (loginSection) {
            loginSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

function scrollSlider(direccion) {
    const carousel = document.getElementById("carouselMovies");
    if (carousel) {
        carousel.scrollBy({ left: direccion * 300, behavior: "smooth" });
    }
}

// ==========================================================
// INICIALIZACIÓN
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    obtenerUsuarios();
    actualizarInterfaz();
});
