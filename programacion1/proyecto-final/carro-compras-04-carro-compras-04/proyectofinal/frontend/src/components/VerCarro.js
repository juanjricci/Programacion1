import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import VentaIndividualPopup from './popups/VentaIndividualPopup';

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const VerCarro = () => {

    const [ventas, setVentas] = useState([])
    const [carro, setCarro] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [idVenta, setIdVenta] = useState(0)

    const { idUser } = useParams()

    useEffect(() => {
        getCarro(idUser)
    }, [])

    const getCarro = async (id) => {
        await axios.get(`${URL_CARRO}/api/carro-usuario/?idUsuario=${id}`)
            .then((res) => {
                console.log("ID del carro: " + res.data[0].id)
                const carroId = res.data[0].id
                setCarro(carroId)
                getVentas(carroId)
            })

    }

    const getVentas = async (idCarro) => {
        await axios.get(`${URL_CARRO}/api/ventas-carro/?idCarro=${idCarro}`)
            .then((res) => {
                console.log(res.data)
                setVentas(res.data)
            })
    }

    const tooglePopup = (id) => {
        setIsOpen(!isOpen);
        setIdVenta(id)
    }

    return (
        <div className="container p-4">
            <ul>
                <li className="list-group-item">
                    <div className="fw-bold">ID del carro: {carro}</div>
                </li>
                {ventas.map(
                    (venta) =>
                        <li className="list-group-item d-flex align-items-between" key={venta.id}>
                            <div>
                                ID de la venta: <Link to={`/venta/${venta.id}`}>{venta.id}</Link>
                                <div>Fecha de la venta: {venta.fechaVenta}</div>
                                <div>Precio total de la venta: ${venta.precioTotal}</div>
                            </div>
                            <div className="ms-auto">
                                <button onClick={(e) => tooglePopup(venta.id)}>Ver Venta</button>
                            </div>
                        </li>
                )}
            </ul>
            {isOpen &&
                <div>
                    <VentaIndividualPopup idVenta={idVenta} setIsOpen={setIsOpen} />
                </div>
            }
        </div>
    )
}

export default VerCarro
