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

//AGREGAR UN ESTUDIANDO A MI PARECER
estudiantes.push({
    id: 6,
    nombre: "Felipe",
    apellido: "Ochoa",
    edad: 36,
    carrera: "Deportes",
    promedio: 9.9
});

let EstudianteIngenieria = [];
let SumaTodos = 0;
let PromedioAlto = 0;
let EstudiantePromalto = {};

//ORDENAR LOS ESTUDIANTES LO HAGO ACA PARA OPTIMIZAR RECUERSOS PORQUE SI NO ME TOCA HACER OTRO FOR MAS ABAJO Y ESO GASTA RECURSO Y HACERLO ACA NO AFECTA LOS DEMAS PUNTOS
estudiantes.sort((a, b) => a.promedio - b.promedio);
document.write("Estudiantes ordenados:");
for (let i = 0; i < estudiantes.length; i++) {
    const estudiante = estudiantes[i];

    document.write("<p><b>"+estudiante['nombre']+" "+estudiante['apellido']+"</b> de "+estudiante['edad']+" años, estudia: "+estudiante['carrera']+" y tiene el promedio en: <b>"+estudiante['promedio']+"</b>  </p>");

    if(i == 0){
        PromedioAlto = Number(estudiante['promedio']);
    } else {
        if(Number(estudiante['promedio']) > PromedioAlto){
             EstudiantePromalto = estudiante;
        }
    }
    if( estudiante['carrera'] == 'Ingeniería' ){
        EstudianteIngenieria.push(estudiante);
    }
    SumaTodos += Number(estudiante['promedio']);
}

document.write("Estudiantes de Ingeniería:");
for (let i = 0; i < EstudianteIngenieria.length; i++) {
    const estudiante = EstudianteIngenieria[i];
    document.write("<p><b>Nombre:</b> "+estudiante['nombre']+" <b>Apellido:</b> "+estudiante['apellido']+"</p>");
}
document.write("<b>El promedio de los estudiantes es:</b> "+ (SumaTodos/estudiantes.length) + "<br>");

document.write("El estudiante del promedio mas alto es <b>"+EstudiantePromalto["nombre"]+" "+EstudiantePromalto["apellido"]+"</b> con un promedio de "+EstudiantePromalto["promedio"]);

document.write("Estudiantes ordenados por el promedio:");

