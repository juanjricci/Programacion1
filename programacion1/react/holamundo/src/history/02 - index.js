var nombre0 = 'Juan'; // hay que tratar de evitarlo (no lo vamos a usar)

let apellido = 'Fernandez'; // permite crear una variable que despues puede cambiar su valor
console.log('Apellido', apellido);
apellido = 'Dominguez';
console.log('Apellido', apellido);

const ciudad = 'Mendoza'; // es una constante
console.log('Ciudad', ciudad);

const nombre = 'Juan';
const nombreCompleto0 = nombre + ' ' + apellido; // forma rudimentaria
console.log('Nombre completo: ', nombreCompleto0);

const nombreCompleto = `${nombre} ${apellido}`; // mejor forma (hay q usar comillas invertidas)
console.log('Nombre completo: ', nombreCompleto);

function saludo(nombre)
{
    console.log(`Hola ${nombre}`);
}

saludo('Lola');
console.log(`Esto es un saludo: ${saludo('Lola')}`); // esto me da el mismo resultado