import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './popups/style.css'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const Cart = () => {

    const [productos_carro, setProductos_carro] = useState([])
    const [total, setTotal] = useState(0)
    const [carro, setCarro] = useState(0)
    const [statePrecio, setStatePrecio] = useState(0)
    const [checkoutButton, setCheckoutButton] = useState(false)


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const carro_usuario = JSON.parse(loggedUserJSON)
            const idCarro = carro_usuario.carro.id
            console.log("ID del carro: " + idCarro)
            setCarro(idCarro)
            getCarro(idCarro)
        }
    }, []);

    const getCarro = (idCarro) => {
        axios.get(`${URL_CARRO}/api/prodcarro/?idCarro=${idCarro}`)
            .then((res) => {
                console.log(res.data)
                setProductos_carro(res.data)
            })
    }

    const getTotal = async () => {
        const sum = await productos_carro.reduce((ant, post) => {
            return ant + + post.precio * post.cantidad
        }, 0)
        setTotal(sum)
    }

    useEffect(() => {
        getTotal();
    });

    const handleDelete = async (id) => {
        console.log("id a eliminar " + id)
        const res = await axios.delete(`${URL_CARRO}/api/producto-carro/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        window.location.reload(false);
    }

    const handleCheckout = async (e) => {

        const today = new Date()
        const date = today.getFullYear() + '/' + ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2);

        console.log(date)
        const venta = {
            fechaVenta: date,
            precioTotal: total,
            idCarro: carro,
        }

        console.log(venta)

        const res = await axios.post(`${URL_CARRO}/api/ventas/`, venta, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        productos_carro.map(
            (producto) => {
                const data = {
                    idProducto: producto.idProducto,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    cantidad: producto.cantidad,
                    precio: producto.precio * producto.cantidad,
                    idVenta: res.data.id,
                }
                console.log(data)
                axios.post(`${URL_CARRO}/api/productos-vendidos/`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(async (res) => {
                    console.log(res.data)
                })
                axios.post(`${URL_CARRO}/actualizar-cantidad/${producto.idProducto}/`, {
                    idProducto: producto.idProducto,
                    cantidadVendido: producto.cantidad
                })
                // axios.get(`${URL_PRODUCTOS}/api/productos/${producto.idProducto}/`)
                //     .then(async (res) => {
                //         await axios.patch(`${URL_PRODUCTOS}/api/productos/${producto.idProducto}/`, {
                //             cantidadVendido: res.data.cantidadVendido + producto.cantidad
                //         })
                //     })
                axios.delete(`${URL_CARRO}/api/producto-carro/${producto.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => {
                        console.log(res)
                        const success = true
                        window.localStorage.setItem(
                            'successfulOperation', JSON.stringify(success)
                        )
                        window.location.reload(false);
                    })
                return (console.log('Success!'))
            }
        )
    }

    useEffect(() => {
        const successJSON = window.localStorage.getItem('successfulOperation')
        console.log(successJSON)
        if (successJSON) {
            setCheckoutButton(true)
        }
    });

    const handleSuccessClose = () => {
        window.localStorage.removeItem('successfulOperation')
        setCheckoutButton(false)
    }

    const handleVaciar = () => {
        productos_carro.map(
            (producto) => {
                axios.delete(`${URL_CARRO}/api/producto-carro/${producto.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => {
                        console.log(res)
                        window.location.reload(false);
                    })
                return (console.log('Success!'))
            }
        )
    }

    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col" className="text-center">Cantidad</th>
                                    <th scope="col" className="text-right">Precio x unidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productos_carro.map(
                                        (producto) =>
                                            <tr key={producto.id}>
                                                <td><Link to={`/producto/${producto.idProducto}`}>{producto.nombre}</Link></td>
                                                <td className="text-center"><input type="number" defaultValue={producto.cantidad} onChange={(e) => {
                                                    producto.cantidad = e.target.value
                                                    setStatePrecio(producto.precio * producto.cantidad)
                                                }} /></td>
                                                <td className="text-right">{producto.precio}</td>
                                                <td className="text-right"><button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(producto.id)}>Eliminar</button></td>
                                            </tr>
                                    )
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total</strong></td>
                                    <td className="text-right"><strong>${total}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6 text-left">
                            <Link to="/">
                                <button className="btn btn-block btn-light">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 text-center">
                            <button className="btn btn-lg btn-block btn-success text-uppercase" onClick={(e) => handleCheckout()}>Checkout</button>
                            <button className="btn btn-lg btn-block btn-light" onClick={(e) => handleVaciar()}>Vaciar</button>
                        </div>
                    </div>
                </div>
                {checkoutButton ? (
                    <div className="popup-box">
                        <div className="box">
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Compra exitosa!</strong> Gracias!
                                <span className="close-icon" onClick={() => handleSuccessClose()}>x</span>
                            </div>
                        </div>
                    </div>
                ) : (<div></div>)}
            </div>
        </div>
    )
}

export default Cart
