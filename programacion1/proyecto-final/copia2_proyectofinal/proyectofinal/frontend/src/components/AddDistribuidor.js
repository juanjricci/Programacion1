import axios from 'axios'
import React, { useEffect, useState } from 'react'


const URL = 'http://localhost:8000';

const AddDistribuidor = () => {

    const [nombre, setNombre] = useState('')
    const [desc, setDesc] = useState('')
    const [dist, setDist] = useState([])
    const [estado, setEstado] = useState(false)

    const getDistribuidor = async () => {
        const res = await axios.get(`${URL}/api/distribuidores/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setDist(res.data)
        console.log(dist)
    }

    useEffect(() => {
        getDistribuidor();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            nombre: nombre,
            descripcion: desc,
            estado: estado
        }
        console.log(data)
        axios.post(`${URL}/api/distribuidores/`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res.data)
            window.location.href = "/manejar-distribuidores";
        })
    }

    return (
        <div className="container p-4">
            <div className="cart">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nombre del distribuidor</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
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

export default AddDistribuidor
