const listaDuenos = document.getElementById('lista-duenos');
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

let duenos = [
    {
        nombre: "Eduardo",
        apellido: "Flores",
        pais: "México",
        identificacion: "1993"
    },

    {
        nombre: "Angel",
        apellido: "Flores",
        pais: "México",
        identificacion: "2000"
    }

];


function listarDuenos() {
    const htmlDuenos = duenos.map((dueno, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${dueno.identificacion}</td>
    <td>${dueno.pais}</td>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
</tr>`).join("");

listaDuenos.innerHTML =htmlDuenos;
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
            duenos[indice.value]=datos;
            break;
            default:
            duenos.push(datos);
            break;
    }
    
    
    listarDuenos();
    reserModal();
}

function editar(index) {
    return function handler(){
        btnGuardar.innerHTML='Editar'
        lbtitulo.innerHTML = 'Editar Dueño'
        $('#exampleModalCenter').modal('toggle');
        const dueno = duenos[index];
        indice.value=index;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        pais.value = dueno.pais;
        identificacion.value = dueno.identificacion;
        
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

function eliminar(index) {
    return function clickEnEliminar() {
        $('#exampleModalCenter2').modal('toggle');
        const dueno = duenos[index];
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        pais.value = dueno.pais;
        identificacion.value = dueno.identificacion;
        indice.value=index;

    $("#btn-eliminar2").on("click",function() {
        duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno!== index);
        listarDuenos();
    });
}
}

listarDuenos();

form.onsubmit = enviardatos;
btnGuardar.onclick = enviardatos;