// promesas

const promesa = new Promise( (resolve, reject) => {
    setTimeout( () => {
        console.log(`Estoy dentro de la promesa`);
        resolve(`y esto?`);
        reject(`todo mal!`);
    }, 2000);
})

promesa
    .then( (parametro) => console.log(`Dentro del then // ` + parametro)) // el then me muestra lo que deberia pasar si sale bien la promesa
    .catch( (parametro) => console.log(`Dentro del catch // ` + parametro)) // caso de que salga todo mal
    .finally( console.log(`Esto va siempre`)) // se ejecuta siempre

console.log(`Esto estara despues del llamado a la promesa`);