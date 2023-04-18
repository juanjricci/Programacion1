const personas = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Ricci',
        nacionalidad: 'Argentina',
    },
    {
        id: 2,
        nombre: 'Pepe',
        apellido: 'Hongo',
        nacionalidad: 'Uruguaya',
    },
    {
        id: 3,
        nombre: 'Humberto',
        apellido: 'Garcia',
        nacionalidad: 'Argentina',
    },
    {
        id: 4,
        nombre: 'Ariel',
        apellido: 'Flores',
        nacionalidad: 'Peruana',
    },
]

const nuevo = personas.map((persona) => console.log(persona));
console.log(nuevo);

const getPersonaById = (id) => personas.find((persona) => {
    if (persona.id === id){
        return true;
    }
    return false;
});

const id = parseInt(prompt('Ingrese id: '));
console.log(getPersonaById(id));