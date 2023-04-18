// promesas
import personas from './personas';

const findPersonaById = (id) => {
    return personas.find((persona) => {
        return persona.id === id;
    })
}

const promesa = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const persona = findPersonaById(id);
            if (persona) {
                resolve(persona);
            } else {
                reject('La persona no existe');
            }
        }, 2000);
    })
}

promesa(parseInt(prompt('Ingrese un id')))
    .then(
        (persona) => {
            console.log(persona);
        }
    )
    .catch(
        (mensaje) => {
            console.log(mensaje);
        }
    )

console.log('después del llamado a la promesa');