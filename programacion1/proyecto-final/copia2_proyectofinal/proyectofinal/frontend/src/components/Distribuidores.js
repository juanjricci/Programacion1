import axios from 'axios'
import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import ProductosDistribuidorPopup from './popups/ProductosDistribuidorPopup';

const URL = 'http://localhost:8000';

const Distribuidores = () => {

    const [dist, setDist] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [idDist, setIdDist] = useState(0)

    const getDistribuidor = async () => {
        const res = await axios.get(`${URL}/api/distribuidores/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        setDist(res.data)
    }

    useEffect(() => {
        getDistribuidor();
    }, []);

    const tooglePopup = (id) => {
        setIsOpen(!isOpen);
        setIdDist(id)
    }

    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-12">
                    <h2>Lista de Distribuidores</h2>
                    <ul>
                        {
                            dist.map(
                                (distribuidor) =>
                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={distribuidor.id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                <div>ID: {distribuidor.id}</div>
                                            </div>
                                            <div>
                                                <div>Nombre: {distribuidor.nombre}</div>
                                            </div>
                                            <div>
                                                <div>Descripcion: {distribuidor.descripcion}</div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success" onClick={(e) => tooglePopup(distribuidor.id)}>Ver productos</button>
                                        {/* <Link className="btn btn-success" to={`/distribuidor/${distribuidor.id}`}>Ver productos</Link> */}
                                    </li>
                            )
                        }
                    </ul>
                    {isOpen &&
                        <div>
                            <ProductosDistribuidorPopup idDist={idDist} setIsOpen={setIsOpen} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Distribuidores
