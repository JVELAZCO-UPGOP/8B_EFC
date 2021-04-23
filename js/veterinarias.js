const listaVeterinarias = document.getElementById('lista-veterinarias');
const pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const btneliminar = document.getElementById('btn-eliminar2');
const lbtitulo = document.getElementById('exampleModalCenterTitle');
const btnCerrar = document.getElementById('btn-cerrar1');



let veterinarias = [
    {
        nombre: "Eduardo",
        apellido: "Flores",
        pais: "México",
        identificacion: "1993"
    },

    {
        nombre: "Angel",
        apellido: "Calderon",
        pais: "México",
        identificacion: "2000s"
    }

];


function listarVeterinarias() {
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.identificacion}</td>
    <td>${veterinaria.pais}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
</tr>`).join("");

listaVeterinarias.innerHTML =htmlVeterinarias;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> botonEditar.onclick = editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> botonEliminar.onclick = eliminar(index));


}


function enviardatos(evento){
    
    evento.preventDefault();
    const datos={
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value
    };
    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            veterinarias[indice.value]=datos;
            break;
            default:
            veterinarias.push(datos);
            break;
    }
    
    
    listarVeterinarias();
    reserModal();
}

function editar(index) {
    return function DarClick(){
        btnGuardar.innerHTML='Editar'
        lbtitulo.innerHTML = 'Editar Veterinario'
        $('#exampleModalCenter').modal('toggle');
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        identificacion.value = veterinaria.identificacion;
        indice.value=index;
            
$("#btn-x").on("click",function() {
    resetModal();
    });

$("#btn-cerrar1").on("click",function() {
    resetModal();
});
        

    }
}

function resetModal(){
    nombre.value ='';
    apellido.value='';
    pais.value='País';
    identificacion.value='';
    btnGuardar.innerHTML='Crear';
    lbtitulo.innerHTML = 'Nuevo Veterinario'


}

function eliminar(index){
    return function clickEnEliminar() {
        $('#exampleModalCenter2').modal('toggle');
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        identificacion.value = veterinaria.identificacion;
        indice.value=index;

    $("#btn-eliminar2").on("click",function() {
        veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria!== index);
        listarVeterinarias();
    });
}
    
}


listarVeterinarias();

form.onsubmit = enviardatos;
btnGuardar.onclick = enviardatos;