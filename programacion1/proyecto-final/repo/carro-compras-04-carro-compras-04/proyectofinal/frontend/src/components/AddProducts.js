import axios from 'axios'
import React, { useEffect, useState } from 'react'


const URL = 'http://localhost:8000';

const AddProducts = () => {

    const [nombre, setNombre] = useState('')
    const [desc, setDesc] = useState('')
    const [precio, setPrecio] = useState(0)
    const [dist, setDist] = useState([])
    const [estado, setEstado] = useState(false)
    const [idDist, setIdDist] = useState(1)

    const getDistribuidor = async () => {
        const res = await axios.get(`${URL}/api/distribuidores/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setDist(res.data)
    }

    useEffect(() => {
        getDistribuidor();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            nombre: nombre,
            descripcion: desc,
            precio: precio,
            cantidadVendido: 0,
            estado: estado,
            distribuidor: idDist
        }
        console.log(data)
        axios.post(`${URL}/api/productos/`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res.data)
            window.location.href = "/manejar-productos";
        })
    }

    return (
        <div className="container p-4">
            <div className="cart">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nombre del producto</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input className="form-control" id="precio" type="number" defaultValue="1" onChange={(e) => setPrecio(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Seleccione el distribuidor</label>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setIdDist(e.target.value)} >
                            <option>--Seleccione el distribuidor--</option>
                            {dist.map(
                                (distribuidor) =>
                                    <option key={distribuidor.id}>{distribuidor.id}</option>
                            )}
                        </select>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="esAdminCheck" onChange={(e) => setEstado(e.target.checked)}/><span>Activo?</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProducts
