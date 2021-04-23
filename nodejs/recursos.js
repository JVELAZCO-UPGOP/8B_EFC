module.exports ={
    mascotas: [
        {tipo: "Canino", nombre: "Ikky", dueno: "Eduardo"},
        {tipo: "Felino", nombre: "Kity", dueno: "Abril"},
        {tipo: "De mar", nombre: "Max", dueno: "angel"},
        {tipo: "De mar", nombre: "Mex", dueno: "Marcelo"},
        {tipo: "Canino", nombre: "Tom", dueno: "Enrique"},
    ],

    veterinarias: [
        {nombre: "Eduardo", apellido: "Flores", documento: "123456"},
        {nombre: "Bertha", apellido: "Campa", documento: "123457"},
        {nombre: "Jose", apellido: "Rodriguez", documento: "123458"},
        {nombre: "Maria", apellido: "lopez", documento: "123459"}
    ],

    duenos: [
        {nombre: "Christian", apellido: "Campista", documento: "85552"},
        {nombre: "Viridiana", apellido: "Espino", documento: "1236"},
        {nombre: "Jesyca", apellido: "Rodriguez", documento: "89652"},
        {nombre: "Cristina", apellido: "Cruz", documento: "8963"}
    ],
    consultas: [
        {
            mascota: 0, 
            veterinaria: 0, 
            enzabezado: '', 
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: '',
            diagnostico: "",
        },
    ],
};