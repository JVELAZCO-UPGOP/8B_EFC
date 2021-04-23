module.exports ={
    mascotas: [
        {tipo: "Perro", nombre: "Lus", dueno: "Nora"},
        {tipo: "Gato", nombre: "Miss", dueno: "Melissa"},
        {tipo: "Pez", nombre: "Susy", dueno: "Karen"},
        {tipo: "Pez", nombre: "asl", dueno: "Nora"},
        {tipo: "Perro", nombre: "Mory", dueno: "Melissa"},
    ],

    veterinarias: [
        {nombre: "Noraly", apellido: "Niño", documento: "256852"},
        {nombre: "Dayana", apellido: "Correa", documento: "5555"},
        {nombre: "Alma", apellido: "Sanchez", documento: "86952"},
        {nombre: "Jore", apellido: "Perez", documento: "358888"}
    ],

    duenos: [
        {nombre: "Maria", apellido: "Lopez", documento: "85552"},
        {nombre: "Samanta", apellido: "Ochoa", documento: "1236"},
        {nombre: "Etic", apellido: "Ortiz", documento: "89652"},
        {nombre: "Gil", apellido: "Perez", documento: "8963"}
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