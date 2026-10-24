let DiaSemana = Number(prompt("Eligue un dia de la semana:\n 1 - Lunes\n 2 - Martes\n 3 - Miercoles\n 4 - Juevez\n 5 - Viernes"));
let NumeroPicoPlaca = null;
let DiaSem = "";
switch (DiaSemana) {
    case 1:
        NumeroPicoPlaca = [0,1,2,3];
        DiaSem = "Lunes";
        break;
    case 2:
        NumeroPicoPlaca = [4,5,6,7];
        DiaSem = "Martes";
        break
    case 3:
        NumeroPicoPlaca = [8,9,0,1];
        DiaSem = "Miercoles";
        break
    case 4:
        NumeroPicoPlaca = [2,3,4,5];
        DiaSem = "Jueves";
        break
    case 5:
        NumeroPicoPlaca = [6,7,8,9];
        DiaSem = "Viernes";
        break

    default:
        document.write("Opcion incorrecta");
        break;
}
let TienePicoPlaca = false;
let UltimoDigito = Number(prompt("Ingrese el ultimo digito de la placa opciones de 0-9"));
if( UltimoDigito > 9 || UltimoDigito < 0){
    document.write("Ultimo digito incorrecto");
} else {
    for (let i = 0; i < NumeroPicoPlaca.length; i++) {
        const PicoPlaca = NumeroPicoPlaca[i];
        if(PicoPlaca == UltimoDigito) TienePicoPlaca = true;
    }
    if(TienePicoPlaca){
        document.write("La placa <b>"+ UltimoDigito + "</b> Tiene pico y placa el dia "+DiaSem);
    } else {
        document.write("La placa <b>"+ UltimoDigito + "</b> <b>NO</b> Tiene pico y placa el dia "+DiaSem);
    }
}





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


