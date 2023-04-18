import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FiltroAno from './filtros/FiltroAno';
import FiltroFechas from './filtros/FiltroFechas';
import FiltroMes from './filtros/FiltroMes';
import VentaIndividualPopup from './popups/VentaIndividualPopup';


const URL = 'http://localhost:8000';

const Ventas = () => {

    const [ventas, setVentas] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [idVenta, setIdVenta] = useState(0)

    const getVentas = async () => {
        const res = await axios.get(`${URL}/api/ventas/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setVentas(res.data)
    }

    useEffect(() => {
        getVentas();
    }, []);

    const tooglePopup = (id) => {
        setIsOpen(!isOpen);
        setIdVenta(id)
    }

    return (
        <div className="container p-4">
            <FiltroMes setVentas={setVentas} /><FiltroAno setVentas={setVentas} /><FiltroFechas setVentas={setVentas} />
            <ol className="list-group">
                {
                    ventas.map(
                        (venta) =>
                            < li className="list-group-item d-flex justify-content-between align-items-start" key={venta.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ID de la venta: <Link to={`/venta/${venta.id}`}>{venta.id}</Link></div>
                                    <div>Fecha de venta: {venta.fechaVenta}</div>
                                </div>
                                <div className="ms-2 me-auto">
                                    <div>Precio total: ${venta.precioTotal}</div>
                                </div>
                                <div className="me-2">ID del carro: {venta.idCarro}</div>
                                {/**<span className="badge bg-primary rounded-pill">14</span>*/}
                                <button onClick={(e) => tooglePopup(venta.id)}>Ver Venta</button>
                            </li>
                    )}
            </ol>
            {isOpen &&
                <div>
                    <VentaIndividualPopup idVenta={idVenta} setIsOpen={setIsOpen}/>
                </div>
            }
        </div >
    )
}

export default Ventas
