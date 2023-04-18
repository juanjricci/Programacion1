import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import './style.css'

const URL = 'http://localhost:8000';
//const TOKEN_PRODUCTOS = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAxNjM2OTg3NzM4fQ.kt6j5Z-AyLwyM9x6jHz_8JB9Gw2_6VNIAY9sAS2raJGhZdvMC8Fr8o9wpVYBd3nLMEUvJ7Wjxjyr3SarI8oTiQ';

const ProductosDistribuidorPopup = ({ idDist, setIsOpen }) => {

    const [dist, setDist] = useState([])

    //const { idDist } = useParams()

    const getProductosDist = async () => {
        const res = await axios.get(`${URL}/api/distribuidor/?distribuidor=${idDist}`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_PRODUCTOS
            },
        })
        console.log(res.data)
        //const productosFiltrados = res.data.filter(prod => prod.distribuidor == idDist)
        //console.log(productosFiltrados)
        setDist(res.data)
        //setIdDist(res.data.id)
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
