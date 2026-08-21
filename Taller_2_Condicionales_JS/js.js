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

