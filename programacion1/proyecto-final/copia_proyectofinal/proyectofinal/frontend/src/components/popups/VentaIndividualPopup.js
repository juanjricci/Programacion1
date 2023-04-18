import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './style.css'


const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const VentaIndividualPopup = ({ idVenta, setIsOpen }) => {

    const [productos_vendidos, setProductos_vendidos] = useState([])

    //const { idVenta } = useParams()

    console.log(idVenta)

    const getProducosVendidos = async () => {
        await axios.get(`${URL}/api/productos-vendidos/?idVenta=${idVenta}`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_CARRO
            },
        }).then((res) => {
            console.log(res.data)
            setProductos_vendidos(res.data)
        })
        // const ventasFiltradas = res.data.filter(venta => venta.idVenta == idVenta)
        // console.log(ventasFiltradas)
        // setProductos_vendidos(res.data)
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
