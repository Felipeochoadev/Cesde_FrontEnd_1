let Arreglo = [];
let NumeroMayor = 0;
let NumeroMenor = 0;
let NumerosTotal = 0;
let NumerosPromedio = 0;
let CantidadRecorrido = Number(prompt("Ingrese un numero que es la cantidad de veces que se va a recorrer el ciclo"))

for (let i = 0; i < CantidadRecorrido; i++) {
    let NumeroAleatoreo = Math.floor(Math.random() * 100) + 1;
    NumerosTotal += NumeroAleatoreo;
    if (i == 0) {
        NumeroMayor = NumeroAleatoreo;
        NumeroMenor = NumeroAleatoreo;
        NumerosPromedio = NumeroAleatoreo;
    } else {
        if (NumeroAleatoreo > NumeroMayor) {
            NumeroMayor = NumeroAleatoreo;
        }
        if(NumeroAleatoreo < NumeroMenor){
            NumeroMenor = NumeroAleatoreo;
        }
    }
    Arreglo.push(NumeroAleatoreo);
}

document.write(""+
    "<b>Arreglo de 5 numeros aleatoreos:</b> "+ Arreglo + "<br>"+
    "<b>Numero mayor:</b> "+ NumeroMayor + "<br>"+
    "<b>Numero menor:</b> "+ NumeroMenor + "<br>"+
    "<b>Promedio es:</b> "+ (NumerosTotal/CantidadRecorrido).toFixed(2) + "<br>"+
"");

const estudiantes = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        edad: 20,
        carrera: "Ingeniería",
        promedio: 8.5
    },
    {
        id: 2,
        nombre: "María",
        apellido: "González",
        edad: 22,
        carrera: "Medicina",
        promedio: 9.2
    },
    {
        id: 3,
        nombre: "Pedro",
        apellido: "Rodríguez",
        edad: 21,
        carrera: "Derecho",
        promedio: 7.8
    },
    {
        id: 4,
        nombre: "Ana",
        apellido: "Martínez",
        edad: 20,
        carrera: "Ingeniería",
        promedio: 9.5
    },
    {
        id: 5,
        nombre: "Luis",
        apellido: "Hernández",
        edad: 23,
        carrera: "Medicina",
        promedio: 8.2
    }
];


