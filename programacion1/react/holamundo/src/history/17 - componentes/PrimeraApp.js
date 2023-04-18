// rfce + enter
import React from 'react'
import personas from './personas'

const PrimeraApp = () => {

    const findPersonaById = (id) => personas.find((persona) => persona.id === id);

    const { id, nombre, apellido, nacionalidad} = findPersonaById(1);

    return (
        <>
            <h1>Datos</h1>
            <h2>Persona</h2>
            <h6>id : {id}</h6>
            <h6>nombre : {nombre}</h6>
            <h6>apellido : {apellido}</h6>
            <h6>nacionalidad : {nacionalidad}</h6>
        </>
    )
}

export default PrimeraApp