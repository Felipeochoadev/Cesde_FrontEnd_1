// Taller #3 - Ciclos JS

// #1
let nNaturales = parseInt(prompt("Ingrese el número límite natural (N):"));
let sumaNaturales = 0;

for (let i = 1; i <= nNaturales; i++) {
    sumaNaturales += i;
}

alert("La suma de los primeros " + nNaturales + " números naturales (1 hasta " + nNaturales + ") es: " + sumaNaturales);


// #2
let nombreEstudiante = prompt("Ingrese el nombre del estudiante:");
let cantidadNotas = parseInt(prompt("Ingrese la cantidad de notas (N) para " + nombreEstudiante + ":"));
let sumaNotas = 0;

for (let i = 1; i <= cantidadNotas; i++) {
    let nota = parseFloat(prompt("Ingrese la nota " + i + " de " + cantidadNotas + ":"));
    sumaNotas += nota;
}

let promedio = sumaNotas / cantidadNotas;

if (promedio >= 3.0) {
    alert("Estudiante: " + nombreEstudiante + "\nPromedio: " + promedio.toFixed(2) + "\nEstado: APROBADO (Aprueba con 3.0 o más)");
} else {
    alert("Estudiante: " + nombreEstudiante + "\nPromedio: " + promedio.toFixed(2) + "\nEstado: REPROBADO (Menor a 3.0)");
}


// #3
let cantidadNumeros = 0;
let sumaTotal = 0;

while (true) {
    let entrada = prompt("Ingrese un número entero (o escriba 'FIN' para terminar):");
    
    if (entrada === null || entrada.trim().toUpperCase() === "FIN") {
        break;
    }
    
    let numero = parseInt(entrada);
    
    if (!isNaN(numero)) {
        sumaTotal += numero;
        cantidadNumeros++;
    } else {
        alert("Valor no válido. Por favor ingrese un número entero o la palabra 'FIN'.");
    }
}

alert("Resultado Ejercicio 3:\nCantidad de números ingresados: " + cantidadNumeros + "\nSuma total: " + sumaTotal);


// #4
let numeroTabla = parseInt(prompt("Ingrese el número para generar la tabla de multiplicar hasta el 30:"));
let tablaMultiplicar = "Tabla de multiplicar del " + numeroTabla + " (hasta el 30):\n";

for (let i = 1; i <= 30; i++) {
    tablaMultiplicar += numeroTabla + " x " + i + " = " + (numeroTabla * i) + "\n";
}

alert(tablaMultiplicar);


// #5
let numeroDesc = parseInt(prompt("Ingrese el número para generar la tabla de multiplicar descendente:"));
let tablaDescendente = "Tabla de multiplicar descendente del " + numeroDesc + " (del 30 al 1):\n";

for (let i = 30; i >= 1; i--) {
    tablaDescendente += numeroDesc + " x " + i + " = " + (numeroDesc * i) + "\n";
}

alert(tablaDescendente);


// #6
let intervalo = parseInt(prompt("Ingrese el número del intervalo para contar del 1 al 30:"));
let conteoIntervalo = "Conteo del 1 al 30 con intervalo de " + intervalo + ":\n";

for (let i = 1; i <= 30; i += intervalo) {
    conteoIntervalo += i + " ";
}

alert(conteoIntervalo);


// #7
let intervaloRegresivo = parseInt(prompt("Ingrese el número del intervalo para contar regresivamente del 30 al 1:"));
let conteoRegresivo = "Conteo regresivo del 30 al 1 con intervalo de " + intervaloRegresivo + ":\n";

for (let i = 30; i >= 1; i -= intervaloRegresivo) {
    conteoRegresivo += i + " ";
}

alert(conteoRegresivo);


// #8
let mayoresEdad = 0;
let menoresEdad = 0;
let listaMayores = [];
let listaMenores = [];

for (let i = 1; i <= 10; i++) {
    let edad = parseInt(prompt("Ingrese la edad del estudiante " + i + " de 10:"));
    
    if (edad >= 18) {
        mayoresEdad++;
        listaMayores.push("Estudiante " + i + " (" + edad + " años)");
    } else {
        menoresEdad++;
        listaMenores.push("Estudiante " + i + " (" + edad + " años)");
    }
}

alert(
    "Resultados de los 10 estudiantes:\n\n" +
    "Cantidad de mayores de edad: " + mayoresEdad + "\n" +
    "Cuáles son mayores: " + (listaMayores.length > 0 ? listaMayores.join(", ") : "Ninguno") + "\n\n" +
    "Cantidad de menores de edad: " + menoresEdad + "\n" +
    "Cuáles son menores: " + (listaMenores.length > 0 ? listaMenores.join(", ") : "Ninguno")
);


// #9
let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
let acertado = false;
let maxIntentos = 3;

alert("¡Juego de adivinar el número!\nHe generado un número aleatorio entre 1 y 10. Tienes 3 intentos para acertar.");

for (let intento = 1; intento <= maxIntentos; intento++) {
    let intentoUsuario = parseInt(prompt("Intento " + intento + " de " + maxIntentos + ":\n¿Cuál crees que es el número? (del 1 al 10):"));
    
    if (intentoUsuario === numeroAleatorio) {
        alert("¡Felicitaciones! ¡Acertaste el número " + numeroAleatorio + " en el intento " + intento + "!");
        acertado = true;
        break;
    } else {
        let intentosRestantes = maxIntentos - intento;
        if (intentosRestantes > 0) {
            let pista = intentoUsuario < numeroAleatorio ? "El número es MAYOR." : "El número es MENOR.";
            alert("No acertaste. Pista: " + pista + "\nTe quedan " + intentosRestantes + " intento(s).");
        }
    }
}

if (!acertado) {
    alert("Se acabaron tus intentos. El número aleatorio era: " + numeroAleatorio);
}