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
