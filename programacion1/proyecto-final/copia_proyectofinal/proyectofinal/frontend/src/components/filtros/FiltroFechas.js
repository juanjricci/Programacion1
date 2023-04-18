import axios from 'axios';
import React, { useEffect, useState } from 'react'


const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const FiltroFechas = ({setVentas}) => {

    const [stateVentas, setStateVentas] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const getVentas = async () => {
        const res = await axios.get(`${URL}/api/ventas/`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_CARRO
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
