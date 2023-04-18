import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL_PRODUCTOS = 'http://localhost:8000';
const URL_CARRO = 'http://localhost:8001';

const AddUsuario = () => {

    const [usuario, setUsuario] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [clave, setClave] = useState('')
    const [estado, setEstado] = useState(false)
    const [tipo, setTipo] = useState(false)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const res = await axios.get(`${URL_CARRO}/api/usuarios/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setUsers(res.data)
        console.log(users)
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: usuario,
            first_name: nombre,
            last_name: apellido,
            email: email,
            password: clave,
            is_staff: tipo,
            is_active: estado,
        }
        console.log(data)
        axios.post(`${URL_CARRO}/api/auth/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res.data.user.id)
            const dataCarro = {
                idUsuario: res.data.user.id
            }
            console.log(dataCarro)
            axios.post(`${URL_CARRO}/api/carro/`, dataCarro, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            window.location.href = "/manejar-usuarios";
        })
    }


    return (
        <div className="container p-4">
            <div className="cart">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" className="form-control" id="usuario" onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" className="form-control" id="apellido" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clave">Clave</label>
                        <input type="text" className="form-control" id="clave" onChange={(e) => setClave(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="estado" onChange={(e) => setEstado(e.target.checked)} /><span>Activo?</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="tipo" onChange={(e) => setTipo(e.target.checked)} /><span>Admin?</span>
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

export default AddUsuario
