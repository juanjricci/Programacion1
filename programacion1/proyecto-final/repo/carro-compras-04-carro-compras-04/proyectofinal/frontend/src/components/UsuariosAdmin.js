import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8000';

const UsuariosAdmin = () => {

    const [users, setUsers] = useState([])

    const getUsuarios = async () => {
        const res = await axios.get(`${URL}/api/usuarios/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(res.data)
        setUsers(res.data)
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleSubmit = (id, username, first_name, last_name, email, is_staff, is_active) => {
        const data = { id, username, first_name, last_name, email, is_staff, is_active }
        console.log(data)
        axios.patch(`${URL}/api/usuarios/${id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => console.log(res.data))
    }

    return (
        <div className="container p-4">
            <div className="modal-body row">
                <div className="col-md-12">
                    <h1>Usuarios</h1>
                    <h2>Lista de Usuarios</h2>
                    <div className="p-4">
                        <Link className="btn btn-success" to="/add-usuario">Agregar usuario nuevo</Link>
                    </div>
                    <form>
                        {
                            users.map(
                                (user) =>
                                    <div className="list-group-item mb-3 d-flex justify-content-between align-items-start" key={user.id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" id="nombre" className="form-control" defaultValue={user.first_name} onChange={(e) => {
                                                    user.first_name = e.target.value
                                                }} />
                                                <label htmlFor="apellido">Apellido</label>
                                                <input type="text" id="apellido" className="form-control" defaultValue={user.last_name} onChange={(e) => {
                                                    user.last_name = e.target.value
                                                }} />
                                            </div>
                                        </div>
                                        <div className="ms-2 me-auto">
                                            <label htmlFor="usuario">Usuario</label>
                                            <input type="text" id="usuario" className="form-control" defaultValue={user.username} onChange={(e) => {
                                                user.username = e.target.value
                                            }} />
                                            <label htmlFor="email">Email</label>
                                            <input type="text" id="email" className="form-control" defaultValue={user.email} onChange={(e) => {
                                                user.email = e.target.value
                                            }} />
                                        </div>
                                        <div className="me-auto mt-auto mb-auto">
                                            <div>
                                                <label htmlFor="tipo">Activo?</label>
                                                <input type="checkbox" className="form-check-input" id="estado" defaultChecked={user.is_active} onChange={(e) => {
                                                    user.is_active = e.target.checked
                                                }} />
                                            </div>
                                            <div className="mt-2">
                                                <label htmlFor="tipo">Admin?</label>
                                                <input type="checkbox" className="form-check-input" id="admin" defaultChecked={user.is_staff} onChange={(e) => {
                                                    user.is_staff = e.target.checked
                                                }} />
                                            </div>
                                        </div>
                                        <button type="button" onClick={(e) => handleSubmit(user.id, user.username, user.first_name, user.last_name, user.email, user.is_staff, user.is_active)} className="btn btn-success">Aplicar cambios</button>
                                    </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UsuariosAdmin
