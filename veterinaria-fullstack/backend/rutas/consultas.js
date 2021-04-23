module.exports =  function consultasHandler({consultas, veterinarias, mascotas}) {
    return {
        get: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(consultas[data.indice]){
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje: `consulta con indice ${data.indice} no encontrado`,
                });
    
            }
            const consultasConRelaciones = consultas.map((consulta) => (
                {...consulta,
                mascota: { ...mascotas[consulta.mascota], id: consulta.mascota},
                veterinaria: {...veterinarias[consulta.veterinaria], id: consulta.veterinaria},

            }));
        callback(200, consultasConRelaciones);
    },
    post: (data, callback) => {
        let nuevaConsulta = data.payload;
        nuevaConsulta.fechaCreacion = new Date();
        nuevaConsulta.fechaEdicion = null;
        consultas = [...consultas, nuevaConsulta];
        callback(201, nuevaConsulta);
    },
    put: (data, callback) => {
        if(typeof data.indice !== "undefined"){
            if(consultas[data.indice]){
                const { fechaCreacion } = consultas[data.indice];
                consultas[data.indice] = {
                    ...data.payload, 
                    fechaCreacion,
                    fechaEdicion: new Date(),
                };
                return callback(200, consultas[data.indice]);
            }
            return callback(404, {
                mensaje: `consulta con indice ${data.indice} no encontrado`,
            });
    
        }
    callback(400, {mensaje: "indice no enviado"});
    },
    
    delete: (data, callback) => {
    if(typeof data.indice !== "undefined"){
        if(consultas[data.indice]){
            consultas =  consultas.filter(
                (_consulta, indice) => indice != data.indice);
            return callback(204, consultas[data.indice]);
        }
        return callback(404, {
            mensaje: `elemento con indice ${data.indice} eliminado`,
        });
    
    }
    callback(400, {mensaje: "indice no enviado"});
    }
    };
}

async function enviarDatos(evento) {
  const entidad = "consultas";
  evento.preventDefault();
  try {
    const datos = {
      mascota: mascota.value,
      veterinaria: veterinaria.value,
      historia: historia.value,
      diagnostico: diagnostico.value,
    };
    if (validar(datos) === true) {
      const accion = btnGuardar.innerHTML;
      let urlEnvio = `${url}/${entidad}`;
      let method = "POST";
      if (accion === "Editar") {
        urlEnvio += `/${indice.value}`;
        method = "PUT";
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
        listarConsultas();
        resetModal();
      }
      formulario.classList.add("was-validated");
      return;
    }
    $(".alert-warning").show();
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}
