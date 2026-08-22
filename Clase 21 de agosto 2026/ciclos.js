//ciclo while
let contador = 0;
while (contador < 5) {
    document.write("El contador es: " + contador + "<br>");
    contador++;
}
// //document.write se dibuja siempre en la pagina web en el lugar donde se encuentra el script, mientras que console.log se dibuja en la consola del navegador.

document.write("<hr>");

//ciclo for
for (let i = 0; i < 5; i++) {
    document.write("El valor de i es: " + i + "<br>");
}

//el atajo del teclado para comentar varias lineas de codigo es: Ctrl + K + C
//el atajo del teclado para descomentar varias lineas de codigo es: Ctrl + K + U

document.write("<hr>");

// let inicio = Number(prompt("Ingrese valor de inicio del ciclo:"));
// let fin = Number(prompt("Ingrese valor de fin del ciclo:"));
// let intervalo = Number(prompt("Ingrese valor de incremento del ciclo:"));

// if (inicio < fin) {
//     while (inicio <= fin) {
//         document.write("El valor de inicio es: " + inicio + "<br>");
//         inicio += intervalo;
//     }
// } else if (inicio > fin) {
//     while (inicio >= fin) {
//         document.write("El valor de inicio es: " + inicio + "<br>");
//         inicio -= intervalo;
//     }
// }

// document.write("<hr>");

//variables contadoras y acumuladoras
// let numero = Number(prompt("Ingrese total de numeros:"));
// let num;
// let suma = 0;
// let totalNum = 0;
// for (let i = 1; i <= numero; i++) {
//     num = Number(prompt("Ingrese el numero para este ciclo (" + i + "):"));
//     document.write(num+ " ");
//     suma += num;
//     totalNum++;
// }
// document.write("<br>La suma de los numeros es: " + suma);
// document.write("<br>El total de numeros ingresados es: " + totalNum);

//ciclos animados

let temporadas = Number(prompt("Ingrese el total de temporadas de la serie:"));
let capitulos = Number(prompt("Ingrese el total de capitulos de la temporada"));

for (let i = 1; i <= temporadas; i++) {
    document.write("<h1>Temporada " + i + "</h1>");
    for (let j = 1; j <= capitulos; j++) {
        document.write("<h3>Capitulo " + j + "</h3>");
    }
}