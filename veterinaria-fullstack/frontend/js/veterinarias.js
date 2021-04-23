const listaVeterinarias = document.getElementById('lista-veterinarias');
const nombre = document.getElementById('nombre');
const documento = document.getElementById('documento');
const apellido = document.getElementById('apellido');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const btneliminar = document.getElementById('btn-eliminar2');
const lbtitulo = document.getElementById('exampleModalCenterTitle');
const btnCerrar = document.getElementById('btn-cerrar1');
const url= "https://veterinaria-backend-olive.vercel.app/veterinarias";




let veterinarias = [];


async function listarVeterinarias() {
    try {
        const respuesta = await fetch(url);
        const veterinariasDelServer = await respuesta.json();
        if(Array.isArray(veterinariasDelServer)){
            veterinarias = veterinariasDelServer;
        }
        if(veterinarias.length > 0 ) {
            const htmlVeterinarias = veterinarias
            .map(
                (veterinaria, index) =>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.documento}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
</tr>`
)
.join("");

listaVeterinarias.innerHTML =htmlVeterinarias;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> botonEditar.onclick = editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> botonEliminar.onclick = eliminar(index));
        return;
}
listaVeterinarias.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay veterinarias</td>
    </tr>`;
    } catch (error) {
    console.log({ error });
    $(".alert").show();
    }
}




async function enviardatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        documento: documento.value,
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnGuardar.innerHTML;
        if (accion === "Editar") {
            method = "PUT";
            urlEnvio += `/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        mode: "cors",
        });

        if (respuesta.ok) {
            listarVeterinarias();
            resetModal();
            }

    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
    }

function editar(index) {
    return function DarClick(){
        btnGuardar.innerHTML='Editar'
        lbtitulo.innerHTML = 'Editar Veterinario'
        $('#exampleModalCenter').modal('toggle');
        const veterinaria = veterinarias[index];
        indice.value=index;
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        documento.value = veterinaria.documento;
            
$("#btn-x").on("click",function() {
    resetModal();
    });

$("#btn-cerrar1").on("click",function() {
    resetModal();
});
        

    }
}


/*function editar(index) {
    return function DarClick(){
        btnGuardar.innerHTML='Editar'
        lbtitulo.innerHTML = 'Editar Veterinario'
        $('#exampleModalCenter').modal('toggle');
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        documento.value = veterinaria.documento;
        indice.value=index;
            
$("#btn-x").on("click",function() {
    resetModal();
    });

$("#btn-cerrar1").on("click",function() {
    resetModal();
});
        

    }
}*/

function resetModal(){
    nombre.value ='';
    apellido.value='';
    documento.value='';
    btnGuardar.innerHTML='Crear';
    lbtitulo.innerHTML = 'Nuevo Veterinario'


}

function eliminar(index){
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {

        try {
            const respuesta = await fetch(urlEnvio, {
            method: "DELETE",
            });

            if(respuesta.ok){
                
                listarVeterinarias();
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
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        documento.value = veterinaria.documento;
        indice.value=index;

    $("#btn-eliminar2").on("click",function() {
        veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria!== index);
        listarVeterinarias();
    });
}
    
}*/


listarVeterinarias();

form.onsubmit = enviardatos;
btnGuardar.onclick = enviardatos;

