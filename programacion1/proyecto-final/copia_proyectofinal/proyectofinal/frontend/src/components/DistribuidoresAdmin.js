import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8000';
//const TOKEN_PRODUCTOS = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAxNjM2OTg3NzM4fQ.kt6j5Z-AyLwyM9x6jHz_8JB9Gw2_6VNIAY9sAS2raJGhZdvMC8Fr8o9wpVYBd3nLMEUvJ7Wjxjyr3SarI8oTiQ';

const DistribuidoresAdmin = () => {

    const [dist, setDist] = useState([])

    const getDistribuidor = async () => {
        const res = await axios.get(`${URL}/api/distribuidores/`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_PRODUCTOS
            },
        })
        setDist(res.data)
        //setIdDist(res.data.id)
    }

    useEffect(() => {
        getDistribuidor();
    }, []);

    const handleSubmit = (id, nombre, descripcion, estado) => {
        const data = { id, nombre, descripcion, estado }
        console.log(data)
        axios.put(`${URL}/api/distribuidores/${id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_PRODUCTOS
            },
        }).then((res) => console.log(res.data))
    }


    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-12">
                    <h1>Distribuidores</h1>
                    <h2>Lista de Distribuidores</h2>
                    <div className="p-4">
                        <Link className="btn btn-success" to="/add-distribuidor">Agregar distribuidor nuevo</Link>
                    </div>
                    <form>
                        {
                            dist.map(
                                (distribuidor) =>
                                    <div className="list-group-item mb-3 d-flex justify-content-between align-items-start" key={distribuidor.id}>
                                        <div className="ms-2">
                                            <label className="fw-bold" htmlFor="nombre">ID: {distribuidor.id}</label>
                                            <div className="fw-bold">
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" id="nombre" className="form-control" defaultValue={distribuidor.nombre} onChange={(e) => {
                                                    distribuidor.nombre = e.target.value
                                                }} />
                                            </div>
                                        </div>
                                        <div className="p-1 fw-bold">
                                            <label htmlFor="desc">Descripcion</label>
                                            <textarea id="desc" className="form-control" rows="3" defaultValue={distribuidor.descripcion} onChange={(e) => {
                                                distribuidor.descripcion = e.target.value
                                            }} />
                                        </div>
                                        <div className="p-1 fw-bold">
                                            <label htmlFor="tipo">Activo?</label>
                                            <input type="checkbox" className="form-check-input" id="estado" defaultChecked={distribuidor.estado} onChange={(e) => {
                                                distribuidor.estado = e.target.checked
                                            }} />
                                        </div>
                                        <button type="button" onClick={(e) => handleSubmit(distribuidor.id, distribuidor.nombre, distribuidor.descripcion, distribuidor.estado)} className="btn btn-success">Aplicar cambios</button>
                                    </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DistribuidoresAdmin
