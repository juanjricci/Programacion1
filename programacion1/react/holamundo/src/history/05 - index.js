// expresion de funciones

const ingresar = function(){
    const value = window.prompt('Ingrese un valor: ');
    return parseInt(value);
}

const suma = function(a, b){
    return a + b;
}

const x = ingresar();
const y = ingresar();
alert(suma(x, y));

