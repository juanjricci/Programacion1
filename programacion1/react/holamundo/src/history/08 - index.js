const persona = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Garcia',
    nacionalidad: 'argentino',
}

const funcion = ({ nombre, apellido, profesion = 'Ing.' }) => {
    return {
        name: nombre,
        surname: apellido,
        profession: profesion,
    };
}

const ingeniero = funcion(persona);
console.log(ingeniero);