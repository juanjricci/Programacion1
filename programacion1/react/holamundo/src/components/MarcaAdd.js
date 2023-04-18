import React, { useState } from 'react'

const  MarcaAdd = ({ setMarcas }) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim().length > 1){ //trim elimina los espacios en un string
            setMarcas((autos) => [...autos, inputValue]);
            setInputValue(() => '') // para que queda vacio luego del enter
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
    )
}

export default MarcaAdd
