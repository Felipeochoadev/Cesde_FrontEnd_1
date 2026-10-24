let formulario = document.getElementById('formulario');
let tarea = document.getElementById('tarea');
let cuerpotabla = document.getElementById('cuerpotabla');
let contador = 1;

function agregarTarea() {
    let valor = tarea.value.trim();
    if (valor === '') return;

    let fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${contador++}</td>
        <td>${valor}</td>
        <td>
            <button class="btn-editar" type="button">✏️</button>
            <button class="btn-eliminar" type="button">🗑️</button>
        </td>
    `;

    cuerpotabla.appendChild(fila);
    tarea.value = '';
    tarea.focus();
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    agregarTarea();
});

cuerpotabla.addEventListener('click', function(event) {
    let btnEditar = event.target.closest('.btn-editar');
    let btnEliminar = event.target.closest('.btn-eliminar');

    if (btnEditar) {
        let fila = event.target.parentNode.parentNode;
        //let fila = btnEditar.closest('tr');
        let celdaTarea = fila.children[1];
        let nuevoValor = prompt('Edita la tarea:', celdaTarea.textContent);
        if (nuevoValor !== null && nuevoValor.trim() !== '') {
            celdaTarea.textContent = nuevoValor.trim();
        }
    }

    if (btnEliminar) {
        let fila = event.target.parentNode.parentNode;
        //let fila = btnEliminar.closest('tr');
        let confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
        if (confirmar) {
            fila.remove();
        }
    }
});
