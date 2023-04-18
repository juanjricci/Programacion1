// funciones

function ingresar(){
    const value = window.prompt('Ingrese un valor: ');
    return parseInt(value);
}

function suma(a, b){
    return a + b;
}

const x = ingresar();
const y = ingresar();
alert(suma(x, y));