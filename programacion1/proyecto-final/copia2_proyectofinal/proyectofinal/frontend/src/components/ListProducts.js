import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
//import HistorialCompras from './HistorialCompras';

const URL = 'http://localhost:8000';

export const ListProducts = () => {

    const [productos, setProductos] = useState([]);
    const [item_count, setItem_count] = useState(0)
    const [carro, setCarro] = useState(0)
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            setIsLogged(true)
            const carro_usuario = JSON.parse(loggedUserJSON)
            console.log(carro_usuario.usuario.id)
            const admin = carro_usuario.usuario.is_staff
            setIsAdmin(admin)
            const idCarro = carro_usuario.carro.id
            setCarro(idCarro)
            getLengthCarro(idCarro)
        }
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(`${URL}/api/productos-activos/?estado=true`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res.data);
        setProductos(res.data);
    }

    const getLengthCarro = (idCarro) => {
        try {
            axios.get(`${URL}/api/prodcarro/?idCarro=${idCarro}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res2 => {
                    console.log(res2.data.length)
                    setItem_count(res2.data.length)
                })
        } catch (err2) {
            console.error(err2);
        }
    }

    const handleClick = (descripcion, nombre, precio, idProducto, cantidad) => {
        if (!isLogged) {
            window.location.href = "/login";
        }
        if (cantidad == null) {
            cantidad = 1
        }
        const data = { idProducto, nombre, descripcion, cantidad, precio, idCarro: carro }
        console.log(data);
        try {
            axios.post(`${URL}/api/producto-carro/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {
                    console.log(res.data);
                })
            setItem_count(item_count + 1)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-10">
                    <h1>Productos</h1>
                    <h2>Lista de Productos</h2>
                    <ol className="list-group">
                        {
                            productos.map(
                                (producto) =>
                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={producto.id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
                                            </div>
                                            ${producto.precio}
                                        </div>
                                        <div className="p-1">
                                            <input type="number" className="col-lg-2" defaultValue={`${1}`} onChange={(e) => {
                                                producto.cantidad = e.target.value
                                            }} />
                                        </div>
                                        <button type="button" onClick={(e) => handleClick(producto.descripcion, producto.nombre, producto.precio, producto.id, producto.cantidad)} className="btn btn-success">Add to cart</button>
                                    </li>
                            )
                        }
                    </ol>
                </div>
                <div className="col-md-2 text-right">
                    {isLogged ? (
                        <div>
                            <Link className="btn btn-primary" to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                                {<span className="badge badge-primary">{item_count}</span>}
                            </Link>
                            <Link className="btn btn-secondary" to="/historial" >Historial de compras</Link>
                        </div>
                    ) : (<div></div>)
                    }

                    {isAdmin ? (<Link className="btn btn-success" to="/admin">Administrar</Link>) : (<div></div>)}

                </div>
            </div>
        </div>
    )
}
