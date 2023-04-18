import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const ReportesAdmin = () => {

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        const res = await axios.get(`${URL}/api/usuarios/`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + TOKEN_CARRO
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
                                        <Link type="button" className="btn btn-success" to={`/carro/${cliente.id}`}>Ver carro</Link>
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