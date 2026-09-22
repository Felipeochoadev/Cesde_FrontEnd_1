//#1
let reservas = [
    {
        "huesped": "María González",
        "habitacion": "101",
        "noches": 3,
        "checkIn": "2025-01-15",
        "precioNoche": 120,
        "estado": "activa"
    },
    {
        "huesped": "Carlos López",
        "habitacion": "205",
        "noches": 5,
        "checkIn": "2025-01-20",
        "precioNoche": 150,
        "estado": "pendiente"
    },
    {
        "huesped": "Ana Martínez",
        "habitacion": "102",
        "noches": 2,
        "checkIn": "2025-01-18",
        "precioNoche": 100,
        "estado": "activa"
    },
    {
        "huesped": "Pedro Sánchez",
        "habitacion": "301",
        "noches": 7,
        "checkIn": "2025-01-25",
        "precioNoche": 200,
        "estado": "cancelada"
    }
];

let reservasPorPrecio = [...reservas].sort((a, b) => b.precioNoche - a.precioNoche);
console.log("=== Dataset 1: Reservas de Hotel ===");
console.log("1. Reservas ordenadas por precio por noche (de mayor a menor):");
console.table(reservasPorPrecio);

let reservasActivas = reservas.filter(reserva => reserva.estado === "activa");
console.log("2. Reservas activas:");
console.table(reservasActivas);

let totalPorHuesped = reservas.map(reserva => ({
    huesped: reserva.huesped,
    habitacion: reserva.habitacion,
    noches: reserva.noches,
    precioNoche: reserva.precioNoche,
    totalPagar: reserva.noches * reserva.precioNoche
}));
console.log("3. Total a pagar por cada huésped (noches * precioNoche):");
console.table(totalPorHuesped);

let reservaMasLarga = reservas.reduce((masLarga, actual) => actual.noches > masLarga.noches ? actual : masLarga);
console.log("4. Reserva más larga (mayor número de noches):", reservaMasLarga);

let reservasPorEstado = reservas.reduce((acumulador, reserva) => {
    if (!acumulador[reserva.estado]) {
        acumulador[reserva.estado] = [];
    }
    acumulador[reserva.estado].push(reserva);
    return acumulador;
}, {});
console.log("5. Reservas agrupadas por estado:", reservasPorEstado);


//#2
let productos = [
    {
        "nombre": "Leche Entera",
        "categoria": "Lácteos",
        "precio": 2.50,
        "stock": 45,
        "proveedor": "Lactosa SA"
    },
    {
        "nombre": "Pan Integral",
        "categoria": "Panadería",
        "precio": 1.80,
        "stock": 30,
        "proveedor": "Panadería Moderna"
    },
    {
        "nombre": "Arroz Premium",
        "categoria": "Granos",
        "precio": 3.20,
        "stock": 15,
        "proveedor": "Arrocera Nacional"
    },
    {
        "nombre": "Yogurt Natural",
        "categoria": "Lácteos",
        "precio": 1.95,
        "stock": 0,
        "proveedor": "Lactosa SA"
    },
    {
        "nombre": "Aceite de Oliva",
        "categoria": "Aceites",
        "precio": 8.75,
        "stock": 22,
        "proveedor": "Aceites del Sur"
    }
];

let productosPorPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log("\n=== Dataset 2: Inventario de Supermercado ===");
console.log("1. Productos ordenados por precio (de menor a mayor):");
console.table(productosPorPrecio);

let productosSinStock = productos.filter(producto => producto.stock === 0);
console.log("2. Productos sin stock:");
console.table(productosSinStock);

let totalInventario = productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
console.log("3. Valor total del inventario: $" + totalInventario.toFixed(2));

let productosPorCategoria = productos.reduce((acumulador, producto) => {
    if (!acumulador[producto.categoria]) {
        acumulador[producto.categoria] = [];
    }
    acumulador[producto.categoria].push(producto);
    return acumulador;
}, {});
console.log("4. Productos agrupados por categoría:", productosPorCategoria);

let productoMasCaro = productos.reduce((masCaro, actual) => actual.precio > masCaro.precio ? actual : masCaro);
console.log("5. Producto más caro:", productoMasCaro);

let proveedorFiltro = "Lactosa SA";
let productosPorProveedor = productos.filter(producto => producto.proveedor === proveedorFiltro);
console.log("6. Productos del proveedor '" + proveedorFiltro + "':");
console.table(productosPorProveedor);

//#3
let estudiantes = [
    {
        "nombre": "Laura Méndez",
        "grado": "10°",
        "edad": 15,
        "calificaciones": [85, 92, 78, 90],
        "asistencia": 95
    },
    {
        "nombre": "Diego Ramirez",
        "grado": "9°",
        "edad": 14,
        "calificaciones": [70, 65, 80, 75],
        "asistencia": 88
    },
    {
        "nombre": "Sofía Castro",
        "grado": "10°",
        "edad": 16,
        "calificaciones": [95, 98, 92, 96],
        "asistencia": 98
    },
    {
        "nombre": "Javier López",
        "grado": "9°",
        "edad": 14,
        "calificaciones": [60, 72, 68, 65],
        "asistencia": 82
    }
];

function obtenerPromedio(calificaciones) {
    let suma = calificaciones.reduce((total, cal) => total + cal, 0);
    return suma / calificaciones.length;
}

let estudiantesPorPromedio = [...estudiantes].sort((a, b) => obtenerPromedio(b.calificaciones) - obtenerPromedio(a.calificaciones));
console.log("\n=== Dataset 3: Estudiantes y Calificaciones ===");
console.log("1. Estudiantes ordenados por promedio de calificaciones (de mayor a menor):");
console.table(estudiantesPorPromedio.map(est => ({
    nombre: est.nombre,
    grado: est.grado,
    edad: est.edad,
    promedio: Number(obtenerPromedio(est.calificaciones).toFixed(2)),
    asistencia: est.asistencia
})));

let estudiantesBajaAsistencia = estudiantes.filter(estudiante => estudiante.asistencia < 90);
console.log("2. Estudiantes con asistencia menor al 90%:");
console.table(estudiantesBajaAsistencia);

let promedioEstudiantes = estudiantes.map(estudiante => ({
    nombre: estudiante.nombre,
    grado: estudiante.grado,
    promedio: Number(obtenerPromedio(estudiante.calificaciones).toFixed(2))
}));
console.log("3. Promedio de cada estudiante:");
console.table(promedioEstudiantes);

let estudianteMejorPromedio = estudiantes.reduce((mejor, actual) => {
    let promActual = obtenerPromedio(actual.calificaciones);
    let promMejor = obtenerPromedio(mejor.calificaciones);
    return promActual > promMejor ? actual : mejor;
});
console.log("4. Estudiante con mejor promedio:", estudianteMejorPromedio.nombre, "con un promedio de: " + obtenerPromedio(estudianteMejorPromedio.calificaciones).toFixed(2));

let estudiantesPorGrado = estudiantes.reduce((acumulador, estudiante) => {
    if (!acumulador[estudiante.grado]) {
        acumulador[estudiante.grado] = [];
    }
    acumulador[estudiante.grado].push(estudiante);
    return acumulador;
}, {});
console.log("5. Estudiantes agrupados por grado:", estudiantesPorGrado);

let estudiantesMayores15 = estudiantes.filter(estudiante => estudiante.edad > 15);
console.log("6. Estudiantes mayores de 15 años:");
console.table(estudiantesMayores15);


//#4
let empleados = [
    {
        "nombre": "Roberto Jiménez",
        "departamento": "Ventas",
        "salario": 35000,
        "antiguedad": 3,
        "cargo": "Ejecutivo de Ventas"
    },
    {
        "nombre": "Elena Torres",
        "departamento": "TI",
        "salario": 55000,
        "antiguedad": 7,
        "cargo": "Desarrolladora Senior"
    },
    {
        "nombre": "Miguel Ángel Ruiz",
        "departamento": "Ventas",
        "salario": 42000,
        "antiguedad": 5,
        "cargo": "Gerente de Ventas"
    },
    {
        "nombre": "Claudia Reyes",
        "departamento": "TI",
        "salario": 48000,
        "antiguedad": 2,
        "cargo": "Desarrolladora Junior"
    }
];

let empleadosPorSalario = [...empleados].sort((a, b) => b.salario - a.salario);
console.log("\n=== Dataset 4: Recursos Humanos ===");
console.log("1. Empleados ordenados por salario (de mayor a menor):");
console.table(empleadosPorSalario);

let empleadosAntiguos = empleados.filter(empleado => empleado.antiguedad > 4);
console.log("2. Empleados con antigüedad mayor a 4 años:");
console.table(empleadosAntiguos);

let acumuladoPorDepto = empleados.reduce((acc, empleado) => {
    if (!acc[empleado.departamento]) {
        acc[empleado.departamento] = { totalSalario: 0, cantidad: 0 };
    }
    acc[empleado.departamento].totalSalario += empleado.salario;
    acc[empleado.departamento].cantidad += 1;
    return acc;
}, {});

let salarioPromedioPorDepartamento = {};
for (let depto in acumuladoPorDepto) {
    salarioPromedioPorDepartamento[depto] = Number((acumuladoPorDepto[depto].totalSalario / acumuladoPorDepto[depto].cantidad).toFixed(2));
}
console.log("3. Salario promedio por departamento:", salarioPromedioPorDepartamento);

let empleadoMejorPagado = empleados.reduce((masPagado, actual) => actual.salario > masPagado.salario ? actual : masPagado);
console.log("4. Empleado mejor pagado:", empleadoMejorPagado);

let empleadosPorDepartamento = empleados.reduce((acumulador, empleado) => {
    if (!acumulador[empleado.departamento]) {
        acumulador[empleado.departamento] = [];
    }
    acumulador[empleado.departamento].push(empleado);
    return acumulador;
}, {});
console.log("5. Empleados agrupados por departamento:", empleadosPorDepartamento);

let cargoFiltro = "Desarrolladora Senior";
let empleadosPorCargo = empleados.filter(empleado => empleado.cargo === cargoFiltro);
console.log("6. Empleados con cargo '" + cargoFiltro + "':");
console.table(empleadosPorCargo);

//#5
let videojuegos = [
    {
        "titulo": "The Legend of Zelda: Breath of the Wild",
        "plataforma": "Nintendo Switch",
        "precio": 59.99,
        "genero": "Aventura",
        "rating": 97,
        "stock": 25
    },
    {
        "titulo": "Call of Duty: Modern Warfare",
        "plataforma": "PlayStation 4",
        "precio": 49.99,
        "genero": "FPS",
        "rating": 85,
        "stock": 40
    },
    {
        "titulo": "FIFA 25",
        "plataforma": "Xbox Series X",
        "precio": 54.99,
        "genero": "Deportes",
        "rating": 82,
        "stock": 0
    },
    {
        "titulo": "Super Mario Odyssey",
        "plataforma": "Nintendo Switch",
        "precio": 49.99,
        "genero": "Plataformas",
        "rating": 96,
        "stock": 15
    }
];

let juegosPorRating = [...videojuegos].sort((a, b) => b.rating - a.rating);
console.log("\n=== Dataset 5: Catálogo de Videojuegos ===");
console.log("1. Videojuegos ordenados por rating (de mayor a menor):");
console.table(juegosPorRating);

let juegosDisponibles = videojuegos.filter(juego => juego.stock > 0);
console.log("2. Videojuegos disponibles (con stock > 0):");
console.table(juegosDisponibles);

let plataformaFiltro = "Nintendo Switch";
let juegosPorPlataforma = videojuegos.filter(juego => juego.plataforma === plataformaFiltro);
console.log("3. Videojuegos de la plataforma '" + plataformaFiltro + "':");
console.table(juegosPorPlataforma);

let juegoMasCaro = videojuegos.reduce((masCaro, actual) => actual.precio > masCaro.precio ? actual : masCaro);
console.log("4. Videojuego más caro:", juegoMasCaro);

let juegosPorGenero = videojuegos.reduce((acumulador, juego) => {
    if (!acumulador[juego.genero]) {
        acumulador[juego.genero] = [];
    }
    acumulador[juego.genero].push(juego);
    return acumulador;
}, {});
console.log("5. Videojuegos agrupados por género:", juegosPorGenero);

let totalInventarioJuegos = videojuegos.reduce((total, juego) => total + (juego.precio * juego.stock), 0);
console.log("6. Valor total del inventario de videojuegos: $" + totalInventarioJuegos.toFixed(2));

//#6
let banco = [
    {
        "nombre": "Banco Santander",
        "direccion": "Av. de la Independencia, 100",
        "telefono": "12345678",
        "correo": "banco@santander.com",
        "saldo": 1000000,
        "dia_mora": 10
    },
    {
        "nombre": "Banco BBVA",
        "direccion": "Av. de la Independencia, 200",
        "telefono": "98765432",
        "correo": "banco@bbva.com",
        "saldo": 2000000,
        "dia_mora": 15
    },
    {
        "nombre": "Bancolombia",
        "direccion": "Av. de la Independencia, 300",
        "telefono": "12345678",
        "correo": "banco@santander.com",
        "saldo": 3000000,
        "dia_mora": 20
    },
    {
        "nombre": "Davivienda",
        "direccion": "Av. de la Independencia, 400",
        "telefono": "98765432",
        "correo": "banco@bbva.com",
        "saldo": 4000000,
        "dia_mora": 25
    }
];

let bancosPorSaldo = [...banco].sort((a, b) => b.saldo - a.saldo);
console.log("\n=== Dataset 6: Datos de un Banco ===");
console.log("1. Bancos ordenados por saldo (de mayor a menor):");
console.table(bancosPorSaldo);

let bancosSaldoMayor = banco.filter(b => b.saldo > 2000000);
console.log("2. Bancos con saldo mayor a 2,000,000:");
console.table(bancosSaldoMayor);

let saldoPromedioBancos = banco.reduce((total, b) => total + b.saldo, 0) / banco.length;
console.log("3. Saldo promedio por banco: $" + saldoPromedioBancos.toLocaleString());

let bancoMayorMora = banco.reduce((mayor, actual) => actual.dia_mora > mayor.dia_mora ? actual : mayor);
console.log("4. Banco con mayor día de mora:", bancoMayorMora);

let bancosPorNombre = banco.reduce((acumulador, b) => {
    if (!acumulador[b.nombre]) {
        acumulador[b.nombre] = [];
    }
    acumulador[b.nombre].push(b);
    return acumulador;
}, {});
console.log("5. Bancos agrupados por nombre:", bancosPorNombre);

let correoFiltro = "banco@santander.com";
let bancosPorCorreo = banco.filter(b => b.correo === correoFiltro);
console.log("6. Bancos filtrados con correo '" + correoFiltro + "':");
console.table(bancosPorCorreo);