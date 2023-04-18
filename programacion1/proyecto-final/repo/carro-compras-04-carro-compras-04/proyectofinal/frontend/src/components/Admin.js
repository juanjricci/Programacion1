import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div className="container p-4">
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link className="btn btn-primary" to="/manejar-productos">Manejar Productos</Link>
                <Link className="btn btn-primary" to="/manejar-distribuidores">Manejar Distribuidores</Link>
                <Link className="btn btn-primary" to="/manejar-usuarios">Manejar Usuarios</Link>
                <Link className="btn btn-primary" to="/reportes">Reportes</Link>
            </div>
        </div>
    )
}

export default Admin
