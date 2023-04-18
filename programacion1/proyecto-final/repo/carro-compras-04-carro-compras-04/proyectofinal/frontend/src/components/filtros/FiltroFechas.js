import axios from 'axios';
import React, { useEffect, useState } from 'react'


const URL = 'http://localhost:8000';

const FiltroFechas = ({setVentas}) => {

    const [stateVentas, setStateVentas] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const getVentas = async () => {
        const res = await axios.get(`${URL}/api/ventas/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setStateVentas(res.data)
    }

    useEffect(() => {
        getVentas();
    }, []);

    const filtrado = stateVentas.filter(venta => venta.fechaVenta >= inputValue && venta.fechaVenta <= inputValue2)
    console.log(filtrado)

    const handleInputChange = (e) => setInputValue(e.target.value);
    const handleInputChange2 = (e) => setInputValue2(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault()
        setVentas(filtrado)
        setInputValue(() => '');
        setInputValue2(() => '');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="exampleInputEmail1">Ingrese fecha inicial (yyyy/mm/dd): </label>
            <input type='text' value={inputValue} onChange={handleInputChange}/>
            <label htmlFor="exampleInputEmail1">Ingrese fecha final (yyyy/mm/dd): </label>
            <input type='text' value={inputValue2} onChange={handleInputChange2}/>
            <button type="submit">Filtrar</button>
        </form>
    )
}

export default FiltroFechas
