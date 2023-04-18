//hooks : sirven para colgarle a los componentes un estado (ej: useState)

// rfce + enter
import React, { useState } from 'react'

const CounterApp = ( {value} ) => {

    const [counter, setCounter] = useState(value);

    const handleIncrement = () => {
        setCounter(counter + 1);
    }

    const handleDecrement = () => {
        setCounter(counter - 1);
    }

    const handleReset = () => {
        setCounter(value);
    }

    return (
        <>
            <h1>Contador</h1>
            <h2>{counter}</h2>
            <button onClick={handleDecrement}>-1</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleIncrement}>+1</button>
        </>
    )
}

export default CounterApp