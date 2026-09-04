// Taller #4 - Funciones JS

// #1
function calcularSuperficie(ancho, alto) {
    return ancho * alto;
}

let anchoRectangulo = parseFloat(prompt("Ingrese el ancho del rectángulo:"));
let altoRectangulo = parseFloat(prompt("Ingrese el alto del rectángulo:"));
let superficieRectangulo = calcularSuperficie(anchoRectangulo, altoRectangulo);
alert("La superficie del rectángulo con ancho " + anchoRectangulo + " y alto " + altoRectangulo + " es: " + superficieRectangulo);


// #2
function convertirKmAMetros(km) {
    return km * 1000;
}

function convertirKmAMillas(km) {
    return km * 0.621371;
}

let velocidadKm = parseFloat(prompt("Ingrese la velocidad o distancia en Kilómetros (km):"));
let velocidadMetros = convertirKmAMetros(velocidadKm);
let velocidadMillas = convertirKmAMillas(velocidadKm);

alert(
    "Conversión de " + velocidadKm + " km:\n" +
    "- En metros: " + velocidadMetros + " m\n" +
    "- En millas: " + velocidadMillas.toFixed(2) + " mi"
);


// #3
function circunferencia(radio) {
    return 2 * Math.PI * radio;
}

function cubo(numero) {
    return Math.pow(numero, 3);
}

let radioCirculo = parseFloat(prompt("Ingrese el radio del círculo:"));
let resultadoCircunferencia = circunferencia(radioCirculo);

let numeroCubo = parseFloat(prompt("Ingrese un número para calcular su cubo:"));
let resultadoCubo = cubo(numeroCubo);

alert(
    "Circunferencia del círculo (radio " + radioCirculo + "): " + resultadoCircunferencia.toFixed(2) + "\n" +
    "El cubo de " + numeroCubo + " es: " + resultadoCubo
);


// #4
function mostrarNombre(nombre) {
    if (!nombre || !isNaN(nombre) || !isNaN(parseFloat(nombre))) {
        alert("Ingrese un nombre válido.");
    } else {
        alert("El nombre ingresado es: " + nombre);
    }
}

let nombreIngresado = prompt("Ingrese un nombre:");
mostrarNombre(nombreIngresado);


// #5
function operacionesBasicas(num1, num2) {
    let suma = num1 + num2;
    let resta = num1 - num2;
    let multiplicacion = num1 * num2;
    let division = num2 !== 0 ? (num1 / num2).toFixed(2) : "No es posible dividir por cero";

    alert(
        "Operaciones básicas entre " + num1 + " y " + num2 + ":\n" +
        "Suma: " + suma + "\n" +
        "Resta: " + resta + "\n" +
        "Multiplicación: " + multiplicacion + "\n" +
        "División: " + division
    );
}

let numero1 = parseFloat(prompt("Ingrese el primer número:"));
let numero2 = parseFloat(prompt("Ingrese el segundo número:"));
operacionesBasicas(numero1, numero2);


// #6
function celsiusAFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function fahrenheitACelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function evaluarClima(celsius) {
    if (celsius <= 0) {
        return "Nos congelamos";
    } else if (celsius >= 5 && celsius <= 15) {
        return "Esta haciendo frio";
    } else if (celsius >= 16 && celsius <= 25) {
        return "Está templado el dia";
    } else if (celsius >= 26) {
        return "Tiene fiebre o es el apocalipsis.";
    } else {
        return "Temperatura intermedia (" + celsius.toFixed(1) + "°C)";
    }
}

function conversorTemperatura() {
    let tipoConversion = prompt("Conversor de temperatura:\n1. De Celsius (°C) a Fahrenheit (°F)\n2. De Fahrenheit (°F) a Celsius (°C)\nElija una opción (1 o 2):");
    let temp = parseFloat(prompt("Ingrese la temperatura a convertir:"));

    if (tipoConversion === "1") {
        let fahrenheit = celsiusAFahrenheit(temp);
        let mensajeClima = evaluarClima(temp);
        alert(temp + "°C equivale a " + fahrenheit.toFixed(2) + "°F.\nMensaje: " + mensajeClima);
    } else if (tipoConversion === "2") {
        let celsius = fahrenheitACelsius(temp);
        let mensajeClima = evaluarClima(celsius);
        alert(temp + "°F equivale a " + celsius.toFixed(2) + "°C.\nMensaje: " + mensajeClima);
    } else {
        alert("Opción no válida.");
    }
}

conversorTemperatura();


// #7
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function interpretarIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso debe ir al nutricionista";
    } else if (imc >= 18.5 && imc <= 24.9) {
        return "Normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
        return "Sobrepeso";
    } else {
        return "Obeso debe ir al nutricionista";
    }
}

function procesoIMC() {
    let peso = parseFloat(prompt("Ingrese su peso en kg (ejemplo: 70):"));
    let altura = parseFloat(prompt("Ingrese su altura en metros (ejemplo: 1.75):"));
    let imc = calcularIMC(peso, altura);
    let resultado = interpretarIMC(imc);

    alert(
        "Resultados del IMC:\n" +
        "Peso: " + peso + " kg\n" +
        "Altura: " + altura + " m\n" +
        "IMC: " + imc.toFixed(2) + "\n" +
        "Diagnóstico: " + resultado
    );
}

procesoIMC();


// #8
function pedirNombreUsuario() {
    let nombre = prompt("Ingrese su nombre:");
    return nombre;
}

function mostrarBienvenida(nombre) {
    alert("Bienvenido " + nombre);
}

let usuario = pedirNombreUsuario();
mostrarBienvenida(usuario);


// #9
function pedirPreciosProductos() {
    let cantidadProductos = parseInt(prompt("Ingrese la cantidad de productos (N):"));
    let precios = [];

    for (let i = 1; i <= cantidadProductos; i++) {
        let precio = parseFloat(prompt("Ingrese el precio del producto " + i + ":"));
        precios.push(precio);
    }
    return precios;
}

function calcularYMostrarFactura(precios) {
    let subtotal = 0;
    let detalleFactura = "";

    for (let i = 0; i < precios.length; i++) {
        detalleFactura += "producto " + (i + 1) + "              = " + precios[i].toLocaleString() + "\n";
        subtotal += precios[i];
    }

    let iva = subtotal * 0.19;
    let totalPagar = subtotal + iva;

    detalleFactura += "—---------------------------------\n";
    detalleFactura += "subtotal                  =  " + subtotal.toLocaleString() + "\n";
    detalleFactura += "iva                       = " + iva.toLocaleString() + "\n";
    detalleFactura += "Total A pagar   " + totalPagar.toLocaleString();

    alert(detalleFactura);
}

let listaPrecios = pedirPreciosProductos();
calcularYMostrarFactura(listaPrecios);


// #10
function pedirFechaActual() {
    let dia = parseInt(prompt("Ingrese el día actual (1-31):"));
    let mes = parseInt(prompt("Ingrese el mes actual (1-12):"));
    let anio = parseInt(prompt("Ingrese el año actual (YYYY):"));
    return new Date(anio, mes - 1, dia);
}

function calcularTiempoFinDeAnio(fecha) {
    let anio = fecha.getFullYear();
    let finDeAnio = new Date(anio, 11, 31, 23, 59, 59);
    let diferenciaMilisegundos = finDeAnio - fecha;

    let diasFaltantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    let semanasFaltantes = Math.floor(diasFaltantes / 7);
    let diasRestantes = diasFaltantes % 7;

    alert(
        "Fecha ingresada: " + fecha.toLocaleDateString() + "\n" +
        "Para terminar el año faltan:\n" +
        "- " + diasFaltantes + " días\n" +
        "- Aproximadamente " + semanasFaltantes + " semanas y " + diasRestantes + " días"
    );
}

let fechaActual = pedirFechaActual();
calcularTiempoFinDeAnio(fechaActual);


// #11
function pedirListadoCompras() {
    let cantidadProductos = parseInt(prompt("Ingrese el número de productos que va a registrar:"));
    let productos = [];

    for (let i = 1; i <= cantidadProductos; i++) {
        let nombre = prompt("Ingrese el nombre del producto " + i + " (ej: arroz):");
        let valor = parseFloat(prompt("Ingrese el valor unitario de " + nombre + ":"));
        let cantidad = parseInt(prompt("Ingrese la cantidad comprada de " + nombre + ":"));

        productos.push({
            id: i,
            nombre: nombre,
            valor: valor,
            cantidad: cantidad,
            subtotal: valor * cantidad
        });
    }
    return productos;
}

function imprimirListadoCompras(productos) {
    let totalMercado = 0;
    let mensaje = "";

    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];
        mensaje += prod.id + " -  " + prod.nombre + " $ " + prod.valor.toLocaleString() + " x " + prod.cantidad + " = " + prod.subtotal.toLocaleString() + "\n";
        totalMercado += prod.subtotal;
    }

    mensaje += "—-----------------------------------\n";
    mensaje += "\t\tTotal Mercado    " + totalMercado.toLocaleString();

    alert(mensaje);
}

let listado = pedirListadoCompras();
imprimirListadoCompras(listado);