import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const Producto = () => {

    const [idProducto, setIdProducto] = useState(0)
    const [nombre, setNombre] = useState("")
    const [desc, setDesc] = useState("")
    const [precio, setPrecio] = useState("")
    const [count, setCount] = useState(0)
    const [idCarro, setIdCarro] = useState(0)
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            setIsLogged(true)
            const carro_usuario = JSON.parse(loggedUserJSON)
            setIdCarro(carro_usuario.carro.id)
        }
    }, []);

    const { id } = useParams()
    try {
        axios.get(`${URL_PRODUCTOS}/api/productos/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                setIdProducto(res.data.id)
                setNombre(res.data.nombre)
                setDesc(res.data.descripcion)
                setPrecio(res.data.precio)
            })
    } catch (err) {
        console.error(err);
    }

    try {
        axios.get(`${URL_CARRO}/api/prodcarro/?idCarro=${idCarro}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res2 => {
                setCount(res2.data.length)
            })
    } catch (err2) {
        console.error(err2);
    }

    const handleClick = (idProducto, nombre, descripcion, precio, cantidad, idCarro) => {
        if (!isLogged) {
            window.location.href = "/login";
        }
        if (cantidad == null) {
            cantidad = 1
        }
        const data = { idProducto, nombre, descripcion, precio, cantidad, idCarro }
        console.log(data);
        try {
            axios.post(`${URL_CARRO}/api/producto-carro/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {
                    console.log(res.data);
                })
            setCount(count + 1)
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-10">
                    <div className="card mx-auto" style={{ width: '50rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{nombre}</h5>
                            <p className="card-text">{desc}</p>
                            <p className="card-text">${precio}</p>
                            <button type="button" onClick={(e) => handleClick(idProducto, nombre, desc, precio, 1, idCarro)} className="btn btn-success">Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 text-right">
                    {isLogged ? (<Link className="btn btn-primary" to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg><span className="badge badge-primary">{count}</span></Link>):(<div></div>)}
                </div>
            </div>
        </div>
    )
}

export default Producto

