import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const Cart = () => {

    const [productos_carro, setProductos_carro] = useState([])
    const [total, setTotal] = useState(0)
    const [carro, setCarro] = useState(0)
    const [statePrecio, setStatePrecio] = useState(0)


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const carro_usuario = JSON.parse(loggedUserJSON)
            const idCarro = carro_usuario.carro.id
            console.log("ID del carro: " + idCarro)
            setCarro(idCarro)
            getCarro(idCarro)
            //setCarro(idCarro)
        }
        //getCarro()
    }, []);

    const getCarro = (idCarro) => {
        axios.get(`${URL}/api/prodcarro/?idCarro=${idCarro}`)
            .then((res) => {
                console.log(res.data)
                setProductos_carro(res.data)
            })
        //const prod_carro = res.data.filter(prod => prod.idCarro === carro)
        //console.log(prod_carro)
        //setProductos_carro(prod_carro)
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
        const res = await axios.delete(`${URL}/api/producto-carro/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_CARRO
            },
        })
        console.log(res.data)
        window.location.reload(false);
    }

    const handleCheckout = async (e) => {

        const today = new Date()
        // const currentHours = ("0" + today.getHours()).slice(-2);
        // const currentMinutes = ("0" + today.getMinutes()).slice(-2);
        // const currentSeconds = ("0" + today.getSeconds()).slice(-2);
        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

        console.log(date)
        const venta = {
            fechaVenta: date,
            precioTotal: total,
            idCarro: carro,
        }

        console.log(venta)

        const res = await axios.post(`${URL}/api/ventas/`, venta, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_CARRO
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
                //agregarProductosVendidos(data)
                axios.post(`${URL}/api/productos-vendidos/`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer ' + TOKEN_CARRO
                    },
                }).then(async (res) => {
                    console.log(res.data)
                })
                axios.get(`${URL}/api/productos/${producto.idProducto}/`)
                    .then(async (res) => {
                        await axios.patch(`${URL}/api/productos/${producto.idProducto}/`, {
                            cantidadVendido: res.data.cantidadVendido + producto.cantidad
                        })
                    })
                axios.delete(`${URL}/api/producto-carro/${producto.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer ' + TOKEN_CARRO
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

    // const agregarProductosVendidos = async (data) => {
    //     await axios.post(`${URL}/api/productos-vendidos/`, data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             //'Authorization': 'Bearer ' + TOKEN_CARRO
    //         },
    //     }).then((res) => console.log(res.data))
    // }

    const handleVaciar = () => {
        productos_carro.map(
            (producto) => {
                axios.delete(`${URL}/api/producto-carro/${producto.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer ' + TOKEN_CARRO
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
            </div>
        </div>
    )
}

export default Cart
