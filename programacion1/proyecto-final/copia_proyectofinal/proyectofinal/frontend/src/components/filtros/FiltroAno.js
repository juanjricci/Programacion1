import axios from 'axios';
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const FiltroAno = ({ setVentas }) => {

    const [stateVentas, setStateVentas] = useState([])

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

    const today = new Date()
    const ano = today.getFullYear()

    const sliceFecha = (fechaCompleta) => {
        const fecha = fechaCompleta.slice(0, -6)
        console.log(fecha)
        return fecha
    }

    const filtrado = stateVentas.filter(venta => sliceFecha(venta.fechaVenta) === `${ano}`)
    console.log(filtrado)

    const handleClick = () => {
        setVentas(filtrado)
        console.log(filtrado)
    }

    return (
        <button onClick={handleClick}>Ventas del ulimo año</button>
    )
}

export default FiltroAno
