const persona = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Ricci',
    nacionalidad: 'Argentino',
}

const funcion = (persona) => alert(`Nombre: ${persona.nombre} ${persona.apellido}`);

funcion(persona);

const persona2 = {
    id: 2,
    nombre: 'Pepe',
    apellido: 'Hongo',
    nacionalidad: 'Argentino',
}

const funcion2 = ({nombre, apellido, profesion = 'Ing.'}) => alert(`Nombre: ${profesion} ${nombre} ${apellido}`);

funcion2(persona2);
