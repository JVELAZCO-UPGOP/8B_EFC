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

const url= "https://veterinaria-backend-olive.vercel.app/duenos";

let duenos = [];


async function listarDuenos() {
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if(Array.isArray(duenosDelServer)){
            duenos = duenosDelServer;
        }
        if(duenos.length > 0 ) {
            const htmlDuenos = duenos
            .map(
                (dueno, index) =>`<tr>
    <th scope="row">${index}</th>
    <td>${dueno.documento}</td>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
</tr>`
)
.join("");

listaDuenos.innerHTML =htmlDuenos;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> botonEditar.onclick = editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> botonEliminar.onclick = eliminar(index));
        return;
}
listaDuenos.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay dueños</td>
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
            listarDuenos();
            resetModal();
            }

    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
    }



/*function enviardatos(evento){
    
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
*/

function editar(index) {
    return function DarClick(){
        btnGuardar.innerHTML='Editar'
        lbtitulo.innerHTML = 'Editar Dueño'
        $('#exampleModalCenter').modal('toggle');
        const dueno = duenos[index];
        indice.value=index;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        documento.value = dueno.documento;
            
$("#btn-x").on("click",function() {
    resetModal();
    });

$("#btn-cerrar1").on("click",function() {
    resetModal();
});
        

    }
}






/*function editar(index) {
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
}*/

function resetModal(){
    nombre.value ='';
    apellido.value='';
    documento.value='';
    btnGuardar.innerHTML='Crear';
    lbtitulo.innerHTML = 'Nuevo dueño'
}


function eliminar(index){
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {

        try {
            const respuesta = await fetch(urlEnvio, {
            method: "DELETE",
            });

            if(respuesta.ok){
                
                listarDuenos();
                resetModal();

            }
        } catch (error) {
            console.log({ error });
        $(".alert").show();
        }
        
    };
}

/*function eliminar(index) {
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
}*/

listarDuenos();

form.onsubmit = enviardatos;
btnGuardar.onclick = enviardatos;

