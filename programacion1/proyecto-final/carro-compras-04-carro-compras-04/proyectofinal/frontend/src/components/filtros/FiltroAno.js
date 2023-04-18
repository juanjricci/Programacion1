import axios from 'axios';
import React, { useEffect, useState } from 'react'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const FiltroAno = ({ setVentas }) => {

    const [stateVentas, setStateVentas] = useState([])

    const getVentas = async () => {
        const res = await axios.get(`${URL_CARRO}/api/ventas/`, {
            headers: {
                'Content-Type': 'application/json',
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
        <button onClick={handleClick}>Ventas del ultimo año</button>
    )
}

export default FiltroAno
