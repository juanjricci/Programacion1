const personas = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Garcia',
        nacionalidad: 'argentina',
    },
    {
        id: 2,
        nombre: 'José',
        apellido: 'Perez',
        nacionalidad: 'uruguaya',
    },
    {
        id: 3,
        nombre: 'Juana',
        apellido: 'Gomez',
        nacionalidad: 'argentina',
    },
    {
        id: 4,
        nombre: 'Lorena',
        apellido: 'Gonzalez',
        nacionalidad: 'chilena',
    },
    {
        id: 5,
        nombre: 'Cristina',
        apellido: 'Fernandez',
        nacionalidad: 'brasilera',
    },
]

const getPersonaById = (id) => personas.find((persona) => persona.id === id);

const id = parseInt(prompt('Ingrese id persona: '));
console.log(getPersonaById(id));

const getPersonasByNacionalidad = (nacionalidad) => personas.filter((persona) => persona.nacionalidad === nacionalidad);

const nacionalidad = prompt('Ingrese nacionalidad: ');
console.log(getPersonasByNacionalidad(nacionalidad));