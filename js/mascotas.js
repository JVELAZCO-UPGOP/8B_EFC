const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btneliminar = document.getElementById('btn-eliminar2');
const btnCerrar = document.getElementById('btn-cerrar1');
const lbtitulo = document.getElementById('exampleModalCenterTitle');
const listamascotas = document.getElementById('lista-mascotas');

let mascotas = [
    {
        tipo: "Canino",
        nombre: "Ikky",
        dueno: "Eduardo"
    },

    {
        tipo: "Felino",
        nombre: "Kity",
        dueno: "Abril"
    }
];


function listarmascotas() {
const htmlmascotas = mascotas.map((mascota, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
    </td>
    </tr>`).join("");
    listamascotas.innerHTML = htmlmascotas;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

}

function enviarDatos(evento) {
evento.preventDefault();
const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    dueno: dueno.value
};
const accion = btnGuardar.innerHTML;
switch(accion) {
    case 'Editar':
    mascotas[indice.value] = datos;
    break;
    default:
    mascotas.push(datos);
    break;
}
listarmascotas();
resetModal();
}

function editar(index) {
return function DarClick() {
    btnGuardar.innerHTML = 'Editar'
    lbtitulo.innerHTML = 'Editar Mascota'
    $('#exampleModalCenter').modal('toggle');
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;

    
$("#btn-x").on("click",function() {
    resetModal();
    });

$("#btn-cerrar1").on("click",function() {
    resetModal();
});

}
}

function resetModal() {
nombre.value = '';
dueno.value = 'Propietario';
tipo.value = 'Tipo';
indice.value = '';
btnGuardar.innerHTML = 'Crear'
lbtitulo.innerHTML = 'Nueva Mascota'
}



function eliminar(index){
    return function clickEnEliminar() {
        $('#exampleModalCenter2').modal('toggle');
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        tipo.value = mascota.tipo;
        indice.value = index;

    $("#btn-eliminar2").on("click",function() {
        mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
        listarmascotas();
    });
}
    
}




listarmascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;