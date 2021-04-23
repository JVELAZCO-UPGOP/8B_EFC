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
const url= "https://veterinaria-backend-olive.vercel.app/mascotas";

let mascotas = [];


async function listarmascotas() {
    try {
        const respuesta = await fetch(url);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if (mascotas.length > 0) {
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
        return;
        
    } 
    listamascotas.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay mascotas para mostrar</td>
    </tr>`;
}
    catch (error) {
        console.log({ error });
      $(".alert").show();
    }
}
    


async function enviarDatos(evento) {
evento.preventDefault();
try {
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = btnGuardar.innerHTML;
    if(accion === "Editar") {
            method = "PUT";
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
    }
    const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        mode: "cors",
        });
    
    if(respuesta.ok){
        listarmascotas();
        resetModal();
        }
    
} catch (error) {
    console.log({ error });
      $(".alert").show();
}





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
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {

        try {
            const respuesta = await fetch(urlEnvio, {
            method: "DELETE",
            });

            if(respuesta.ok){
                
                listarmascotas();
                resetModal();

            }
        } catch (error) {
            console.log({ error });
        $(".alert").show();
        }
        
    };
}



/*function eliminar(index){
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
    
}*/




listarmascotas();



form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
