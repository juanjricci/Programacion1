// definimos un objeto
const persona = 
{
    nombre: 'Juan',
    apellido: 'Diaz',
    edad: 35,
}
console.log('Persona: ', persona);

const otraPersona0 = persona; // esto no clona el objeto sino q lo referencia (tengo 2 referencias hacia el mismo objeto)
persona.edad = 36; // entonces esto me va a cambiar en ambas personas
console.log('Otra persona0: ', otraPersona0);

const otraPersona = { ...persona }; // esto si me clona el primer objeto
persona.edad = 37;
console.log('Otra persona: ', otraPersona0);

// arreglos
const arreglo = [1, 2, 3, 4, 5];
console.log('Arreglo: ', arreglo);
console.log('Posicion 1 de arreglo: ', arreglo[1]);
arreglo.push(6);
console.log('Arreglo ampliado: ', arreglo);
let otroArreglo = [ ...arreglo, 7];
console.log('otro arreglo: ', otroArreglo);

const nuevo = otroArreglo.map(function (pepe)
{
    return pepe * 3;
});
console.log(nuevo);

