// Consigna 
// Definir un arrgeglo de personas que tenga por lo menos nombre, apellido y nacimiento.
// Escribir una funcion que devuelva un arreglo nuevo donde los objetos tengan nombre y apellido juntos y la edad.

const personas = [
    {
        nombre: 'John',
        apellido: 'Doe',
        nacimiento: 1991,
    },
    {
        nombre: 'Juan',
        apellido: 'Ricci',
        nacimiento: 1997,
    },
    {
        nombre: 'Pepe',
        apellido: 'Hongo',
        nacimiento: 2000,
    },
    {
        nombre: 'Pepa',
        apellido: 'Honga',
        nacimiento: 2013,
    },
];

// tiene que generar:
/**
const nuevo = {
    nombreCompleto: 'John Doe',
    edad: 30,
};
*/

const nuevo = personas.map((persona) => {
    return {
        nombreCompleto: `${persona.nombre} ${persona.apellido}`,
        edad: parseInt(2021 - persona.nacimiento),
    }
});

console.log(nuevo);