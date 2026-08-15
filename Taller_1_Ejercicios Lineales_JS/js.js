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

/*

3. Realiza las operaciones de suma, resta, multiplicación, división, y módulo pidiéndole solo
2 números al usuario.
4. Calcule el sueldo mensual de un trabajador ingresando el número de horas trabajadas en
el mes y el valor tanto como de las horas normales de trabajo y las horas extras.
5. Digita el ingreso del precio de un producto y se debe calcular el IVA, mostrar cuanto es el
IVA que se agrega, mostrar el precio del producto sin IVA y el total a pagar.
6. Calcule el porcentaje de alumnos y alumnas de un salón de clase, digitando el total de
alumnos hombres y mujeres.
7. Calcule el promedio de 3 notas de un alumno, el rango de cada nota es del 1 al 5.
*/