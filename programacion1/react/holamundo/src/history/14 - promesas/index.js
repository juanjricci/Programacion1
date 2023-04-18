// promesas
import personas from './personas'

const findPersonaById = (id) => {
    return personas.find((persona) => {
        return persona.id === id;
    })
}

const promesa = new Promise( (resolve, reject) => {
    setTimeout( () => {
        const persona = findPersonaById(1);
        if (persona){
            resolve(persona);
        } else {
            reject('La persona no existe');
        }
    }, 2000);
})

promesa
    .then( (persona) => console.log(persona)) // el then me muestra lo que deberia pasar si sale bien la promesa
    .catch( (msg) => console.log(msg)) // caso de que salga todo mal
    .finally( console.log(`Esto va siempre`)) // se ejecuta siempre (no hace falta)

console.log(`Esto estara despues del llamado a la promesa`);