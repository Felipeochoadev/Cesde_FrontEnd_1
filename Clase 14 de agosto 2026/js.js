let numero = Number( prompt("Ingrese un numero") );

//if anidado
if( numero > 0){
    if((numero % 2) == 0){
        alert("El numero "+numero+" es positivo par");
    } else {
        alert("El numero "+numero+" es positivo impar");
    }
} else if(numero < 0) {
    if((numero % 2) == 0){
        alert("El numero "+numero+" es negativo par");
    } else {
        alert("El numero "+numero+" es negativo impar");
    }
} else {
     alert("El numero "+numero+" es neutro");
}

//if compuesto
if( numero > 0 && (numero % 2) == 0){
    alert("El numero "+numero+" es positivo par");
} else if(numero > 0 && (numero % 2) != 0){
    alert("El numero "+numero+" es positivo impar");
} else if(numero < 0 && (numero % 2) == 0) {
    alert("El numero "+numero+" es negativo par");
} else if(numero < 0 && (numero % 2) != 0){
    alert("El numero "+numero+" es negativo impar");
} else {
     alert("El numero "+numero+" es neutro");
}

//switch() case, break, default

//if ternario () ? true : false