import React, { useState } from 'react'
import personas from '../personas';

const FiltroApp = ({ setPeople }) => {

    const [inputValue, setInputValue] = useState('')

    const filtrado = personas.filter(persona => persona.nacionalidad === inputValue)
    //console.log(filtrado)

    const handleInputChange = (e) => setInputValue(e.target.value);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim().length > 1){ //trim elimina los espacios en un string
            setPeople(filtrado);
            setInputValue(() => ''); // para que queda vacio luego del enter
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={inputValue} onChange={handleInputChange}></input>
        </form>
    )
}

export default FiltroApp
