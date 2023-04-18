import React, { useState } from 'react'
import FiltroApp from './components/FiltroApp'
import personas from './personas'

const ListaApp = () => {

    const [people, setPeople] = useState(personas)

    return (
        <>
            <h2>FILTRO DE JUGADORES DE FUTBOL POR NACIONALIDAD (AMERICA DEL SUR)</h2>
            <h3>Ingrese una nacionalidad de america del sur (Argentina, Brasileña, Peruana, Chilena, Colombiana, Boliviana, Venezolana, Ecuatoriana, Paraguaya): </h3>
            <FiltroApp setPeople={setPeople}/>
            <hr/>
            <ol>
                {
                    people.map(
                        (persona) => <li key={persona.id}>{persona.apellido}</li>
                    )
                }
            </ol>
        </>
    )
}

export default ListaApp
