// arreglos

const persona = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Ricci',
    nacionalidad: 'Argentino',
}

const funcion = (value) => {
    return [value, () => console.log(value + 1), () => alert(value + 2)];
}

const [valor, funcion1, funcion2] = funcion(5);

alert(valor);
funcion1();
funcion2();