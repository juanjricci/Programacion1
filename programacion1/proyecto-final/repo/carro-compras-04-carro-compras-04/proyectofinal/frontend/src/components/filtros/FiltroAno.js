import axios from 'axios';
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8000';

const FiltroAno = ({ setVentas }) => {

    const [stateVentas, setStateVentas] = useState([])

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
