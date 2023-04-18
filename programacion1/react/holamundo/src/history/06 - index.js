// funcion flecha

const ingresar = () => {
    const value = window.prompt('Ingrese un valor: ');
    return parseInt(value);
}

const suma = (a, b) => a + b; // funcion flecha resumida

const x = ingresar();
const y = ingresar();
alert(suma(x, y));

const ingresar = () => parseInt(window.prompt('Ingrese un valor: ')); // funcion ingresar resumida