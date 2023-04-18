import axios from 'axios'
import React, { useEffect, useState } from 'react'
//import { useParams } from 'react-router';
import './style.css'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const ProductosDistribuidorPopup = ({ idDist, setIsOpen }) => {

    const [dist, setDist] = useState([])

    const getProductosDist = async () => {
        const res = await axios.get(`${URL_PRODUCTOS}/api/distribuidor/?distribuidor=${idDist}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        setDist(res.data)
    }

    useEffect(() => {
        getProductosDist();
    }, []);

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                <div className="container p-4">
                    {dist.map(
                        (producto) =>
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={producto.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Codigo de producto: {producto.id}</div>
                                    <div>Nombre: {producto.nombre}</div>
                                    <div>Descripcion: {producto.descripcion}</div>
                                    <div>Cantidad vendida: {producto.cantidadVendido}</div>
                                </div>
                                Precio: ${producto.precio}
                            </li>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductosDistribuidorPopup
