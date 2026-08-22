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

let inicio = Number(prompt("Ingrese valor de inicio del ciclo:"));
let fin = Number(prompt("Ingrese valor de fin del ciclo:"));
let intervalo = Number(prompt("Ingrese valor de incremento del ciclo:"));

while (inicio <= fin) {
    document.write("El valor de inicio es: " + inicio + "<br>");
    inicio += intervalo;
}