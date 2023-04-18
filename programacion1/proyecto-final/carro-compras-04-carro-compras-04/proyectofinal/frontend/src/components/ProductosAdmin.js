import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

export const ProductosAdmin = () => {

    const [productos, setProductos] = useState([])
    const [dist, setDist] = useState([])

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(`${URL_PRODUCTOS}/api/productos/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res.data);
        setProductos(res.data);
    }

    const getDistribuidor = async () => {
        const res = await axios.get(`${URL_PRODUCTOS}/api/distribuidores/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setDist(res.data)
    }

    useEffect(() => {
        getDistribuidor();
    }, []);

    const handleSubmit = (id, nombre, descripcion, precio, cantidadVendido, estado, distribuidor) => {
        const data = { id, nombre, descripcion, precio, cantidadVendido, estado, distribuidor }
        console.log(data)
        axios.put(`${URL_PRODUCTOS}/api/productos/${id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => console.log(res.data))
    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`${URL_PRODUCTOS}/api/productos/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        window.location.reload(false);
    }

    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-12">
                    <h1>Productos</h1>
                    <h2>Lista de Productos</h2>
                    <div className="p-4">
                        <Link className="btn btn-success" to="/add-product">Agregar producto nuevo</Link>
                    </div>
                    <form>
                        {
                            productos.map(
                                (producto) =>
                                    <div className="list-group-item mb-3 d-flex justify-content-between align-items-start" key={producto.id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" id="nombre" className="form-control" defaultValue={producto.nombre} onChange={(e) => {
                                                    producto.nombre = e.target.value
                                                }} />
                                            </div>
                                            <div className="fw-bold">
                                                <label htmlFor="precio">Precio</label>
                                                <input type="number" id="precio" className="form-control" defaultValue={producto.precio} onChange={(e) => {
                                                    producto.precio = e.target.value
                                                }} />
                                            </div>
                                        </div>
                                        <div className="ms-2 me-auto fw-bold">
                                            <label htmlFor="dist">ID del Distribuidor</label>
                                            <select className="form-control" defaultValue={producto.distribuidor} onChange={(e) => {
                                                producto.distribuidor = e.target.value.charAt(0)
                                                console.log(e.target.value.charAt(0))
                                            }} >
                                                <option>{producto.distribuidor}</option>
                                                {dist.map(
                                                    (distribuidor) =>
                                                        <option key={distribuidor.id}>{distribuidor.id}. {distribuidor.nombre}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="fw-bold ms-2 me-auto">
                                            <label htmlFor="desc">Descripcion</label>
                                            <textarea id="desc" className="form-control" rows="3" defaultValue={producto.descripcion} onChange={(e) => {
                                                producto.descripcion = e.target.value
                                            }} />
                                        </div>
                                        <div className="fw-bold ms-2 me-auto">
                                            <label htmlFor="cant">Cantidad Vendida</label>
                                            <input type="number" id="cant" className="form-control" defaultValue={producto.cantidadVendido} onChange={(e) => {
                                                producto.cantidadVendido = e.target.value
                                            }} />
                                            <label htmlFor="tipo">Activo?</label>
                                            <input type="checkbox" className="form-check-input" id="estado" defaultChecked={producto.estado} onChange={(e) => {
                                                producto.estado = e.target.checked
                                            }} />
                                        </div>
                                        <button type="button" onClick={(e) => handleSubmit(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.cantidadVendido, producto.estado, producto.distribuidor)} className="btn btn-success">Aplicar cambios</button>
                                        <button type="button" className="btn btn-danger" onClick={(e) => handleDelete(producto.id)}>Eliminar</button>
                                    </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
