import React, { useState } from 'react'
import MarcaAdd from './components/MarcaAdd'

const ListaApp = () => {

    const [marcas, setMarcas] = useState(['Ford', 'Fiat', 'Chevrolet', 'Toyota']);

    return (
        <>
            <h2>Lista App</h2>
            <MarcaAdd setMarcas={setMarcas}/>
            <hr />

            <ol>
                {
                    marcas.map((marca) => 
                        <li key={marca}>
                            {marca}
                        </li>
                    )
                }                
            </ol>
        </>
    )
}

export default ListaApp
