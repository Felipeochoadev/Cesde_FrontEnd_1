//Ejercicios Lineales.

//#1
let salario = Number( prompt("Salario base") );
let salud = Math.round( salario * 0.04 );
let pension = Math.round( salario * 0.07 );
let neto = salario - (salud + pension);
alert("Su salario base es de "+salario+" pero tiene descuentos por salud del 4% equvalente a "+salud+" y pension del 7% equivalente a "+pension+" para un total neto de "+neto);


//#2
let base = Number( prompt("Ingrese la base del triangulo") );
let altura = Number( prompt("Ingrese la base del triangulo") );
let area = ( base * altura ) / 2;
alert("El area del triangulo es de "+area+" Resultado obtenido de su base "+base+" y su altura "+altura);

//#3
let numero1 = Number( prompt("Ingresa el primer numero") ); 
let numero2 = Number( prompt("Ingresa el segundo numero") ); 
let suma = numero1 + numero2;
let resta = numero1 - numero2;
let multiplicacion = numero1 * numero2;
let division = numero1 / numero2;
let modulo = numero1 % numero2;
alert(
    "Resultados:\n"
    +"Suma: " + suma + "\n"
    +"Resta: " + resta + "\n"
    +"Multiplicación: " + multiplicacion + "\n"
    +"División: " + division + "\n"
    +"Módulo: " + modulo
);

//#4
let horasNormales = Number( prompt("Ingrese la cantidad de horas normales trabajadas en el mes") );
let valorHoraNormal = Number( prompt("Ingrese el valor de la hora normal") );
let horasExtras = Number( prompt("Ingrese la cantidad de horas extras trabajadas en el mes") );
let valorHoraExtra = Number( prompt("Ingrese el valor de la hora extra") );
let sueldoTotal = (horasNormales * valorHoraNormal) + (horasExtras * valorHoraExtra);
alert("El sueldo mensual del trabajador es de " + sueldoTotal + ", calculado con " + horasNormales + " horas normales y " + horasExtras + " horas extras.");

//#5
let precioBase = Number( prompt("Ingrese el precio base del producto") );
let porcentajeIva = 19;
let valorIva = precioBase * (porcentajeIva / 100);
let totalPagar = precioBase + valorIva;
alert(
    "Precio sin IVA: " + precioBase + "\n"
    +"Valor del IVA (" + porcentajeIva + "%): " + valorIva + "\n"
    +"Total a pagar: " + totalPagar
);

/*

6. Calcule el porcentaje de alumnos y alumnas de un salón de clase, digitando el total de
alumnos hombres y mujeres.
7. Calcule el promedio de 3 notas de un alumno, el rango de cada nota es del 1 al 5.
*/