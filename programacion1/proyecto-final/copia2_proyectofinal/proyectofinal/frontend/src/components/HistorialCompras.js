import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VentaIndividualPopup from './popups/VentaIndividualPopup';

const URL = 'http://localhost:8000';

const HistorialCompras = () => {

    const [isLogged, setIsLogged] = useState(false)
    const [ventas, setVentas] = useState([])
    const [idVenta, setIdVenta] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [carro, setCarro] = useState(0)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            setIsLogged(true)
            const carro_usuario = JSON.parse(loggedUserJSON)
            const idCarro = carro_usuario.carro.id
            console.log(idCarro)
            getHistorial(idCarro)
            setCarro(idCarro)
        }
    }, []);

    const getHistorial = async (idCarro) => {
        await axios.get(`${URL}/api/ventas-carro/?idCarro=${idCarro}`)
            .then((res) => {
                console.log(res.data)
                setVentas(res.data)
            })
    }

    const tooglePopup = (id) => {
        setIsOpen(!isOpen);
        setIdVenta(id)
    }

    return (
        <div className="container p-4">
                <ul>
                    <li className="list-group-item">
                        <div className="fw-bold">ID del carro: {carro}</div>
                    </li>
                    {ventas.map(
                        (venta) =>
                            <li className="list-group-item d-flex align-items-between" key={venta.id}>
                                <div>
                                    ID de la compra: {venta.id}
                                    <div>Fecha de la compra: {venta.fechaVenta}</div>
                                    <div>Precio total de la compra: ${venta.precioTotal}</div>
                                </div>
                                <div className="ms-auto">
                                    <button onClick={(e) => tooglePopup(venta.id)}>Ver Compra</button>
                                </div>
                            </li>
                    )}
                </ul>
                {isOpen &&
                    <div>
                        <VentaIndividualPopup idVenta={idVenta} setIsOpen={setIsOpen} />
                    </div>
                }
        </div>
    )
}

export default HistorialCompras
