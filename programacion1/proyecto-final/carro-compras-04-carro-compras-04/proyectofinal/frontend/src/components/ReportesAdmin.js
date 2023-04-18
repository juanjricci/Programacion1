import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const ReportesAdmin = () => {

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        const res = await axios.get(`${URL_CARRO}/api/usuarios/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        setClientes(res.data)
    }

    useEffect(() => {
        getClientes();
    }, []);


    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-10">
                    <h1>Reportes</h1>
                    <h2>Lista de Clientes</h2>
                    <ol className="list-group">
                        {
                            clientes.map(
                                (cliente) =>
                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={cliente.id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                Usuario: {cliente.username}
                                            </div>
                                            <div className="fw-bold">
                                                Nombre: {cliente.first_name}
                                            </div>
                                            <div className="fw-bold">
                                                Apellido: {cliente.last_name}
                                            </div>
                                            <div className="fw-bold">
                                                Email: {cliente.email}
                                            </div>
                                        </div>
                                        <Link type="button" className="btn btn-success" to={`/carro/${cliente.id}`}>Ver ventas</Link>
                                    </li>
                            )
                        }
                    </ol>
                </div>
                <div className="col-md-2 text-right">
                    <Link className="btn btn-primary" to="/ventas">Ventas</Link>
                    <Link className="btn btn-secondary" to="/distribuidores">Distribuidores</Link>
                </div>
            </div>
        </div>
    )
}

export default ReportesAdmin
