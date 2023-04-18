import axios from 'axios'
import React, { useEffect, useState } from 'react'
//import { useParams } from 'react-router'
import './style.css'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const VentaIndividualPopup = ({ idVenta, setIsOpen }) => {

    const [productos_vendidos, setProductos_vendidos] = useState([])

    console.log(idVenta)

    const getProducosVendidos = async () => {
        await axios.get(`${URL_CARRO}/api/productos-vendidos/?idVenta=${idVenta}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res.data)
            setProductos_vendidos(res.data)
        })
    }

    useEffect(() => {
        getProducosVendidos();
    }, []);

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                <div className="container p-4">
                    {productos_vendidos.map(
                        (producto) =>
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={producto.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Codigo de producto: {producto.idProducto}</div>
                                    <div>Producto: {producto.nombre}</div>
                                    <div>Cantidad: {producto.cantidad}</div>
                                </div>
                                Precio: ${producto.precio}
                            </li>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VentaIndividualPopup
