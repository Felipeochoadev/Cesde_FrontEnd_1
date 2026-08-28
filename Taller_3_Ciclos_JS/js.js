// Taller #3 - Ciclos JS

// #1
let nNaturales = parseInt(prompt("Ingrese el número límite natural (N):"));
let sumaNaturales = 0;

for (let i = 1; i <= nNaturales; i++) {
    sumaNaturales += i;
}

alert("La suma de los primeros " + nNaturales + " números naturales (1 hasta " + nNaturales + ") es: " + sumaNaturales);

