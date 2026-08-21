//Ejercicios condicionales.

//#1
let numero = number(prompt("Ingrese un número:"));

if ( (numero % 2) === 0 && numero < 0) {
   alert("El número es par y negativo");
} else if ( (numero % 2) === 0 && numero > 0) {
   alert("El número es par y positivo");
} else if ( (numero % 2) !== 0 && numero < 0) {
   alert("El número es impar y negativo");
} else {
   alert("El número es impar y positivo");
}

//#2
let numero1 = number(prompt("Ingrese un número:"));
let numero2 = number(prompt("Ingrese otro número:"));

if (numero1 > numero2) {
   alert("El número mayor es: " + numero1 + " y el número menor es: " + numero2);
} else if (numero1 < numero2) {
   alert("El número mayor es: " + numero2 + " y el número menor es: " + numero1);
} else {
   alert("Los números son iguales");
}

//#3
let dia = number(prompt("Ingrese un número del 1 al 7:"));

if (dia === 1) {
   alert("El día de la semana es: Lunes");
} else if (dia === 2) {
   alert("El día de la semana es: Martes");
} else if (dia === 3) {
   alert("El día de la semana es: Miércoles");
} else if (dia === 4) {
   alert("El día de la semana es: Jueves");
} else if (dia === 5) {
   alert("El día de la semana es: Viernes");
} else if (dia === 6) {
   alert("El día de la semana es: Sábado");
} else if (dia === 7) {
   alert("El día de la semana es: Domingo");
} else {
   alert("Número no válido. Ingrese un número del 1 al 7.");
}

//#4
let edad = number(prompt("Ingrese su edad:"));

if (edad < 18) {
   alert("La persona es un adolescente");
} else if (edad >= 18 && edad <= 28) {
   alert("La persona es un adulto adolescente");
} else if (edad >= 29 && edad <= 49) {
   alert("La persona es un adulto");
} else {
   alert("La persona es un adulto mayor");
}