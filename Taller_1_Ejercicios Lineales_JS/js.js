//Ejercicios Lineales.

//#1
let salario = Number( prompt("Salario base") );
let salud = Math.round( salario * 0.04 );
let pension = Math.round( salario * 0.07 );
let neto = salario - (salud + pension);
alert("Su salario base es de "+salario+" pero tiene descuentos por salud del 4% equvalente a "+salud+" y pension del 7% equivalente a "+pension+" para un total neto de "+neto);


//#2