import React, { useEffect, useState } from 'react'
import axios from 'axios';


const URL = 'http://localhost:8000';

const Login = () => {

    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [users, setUsers] = useState([]);
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUsers(user)
            console.log(users)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: usuario,
            password: clave
        }
        console.log(data)
        axios.post(`${URL}/api/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            const user = res.data.user
            const userId = res.data.user.id
            axios.get(`${URL}/api/carro-usuario/?idUsuario=${userId}`)
                .then((response) => {
                    console.log(response.data[0])
                    const data = {
                        usuario: user,
                        carro: response.data[0]
                    }
                    console.log(data)
                    window.localStorage.setItem(
                        'loggedUser', JSON.stringify(data)
                    )
                    window.location.href = "/";
                })
        }).catch((err) => {
            console.log(err)
            setLoginError('Usuario o clave incorrectos. Vuelva a ingresarlos!')
        })
    }

    return (
        <div className="container p-4" >
            <div className="card mx-auto p-4" style={{ width: '50rem' }}>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Usuario</label>
                        <input type="usuario" className="form-control" id="usuario" aria-describedby="usuarioHelp" placeholder="Enter username" onChange={(e) => setUsuario(e.target.value)} />
                        <small id="usuarioHelp" className="form-text text-muted">usuario</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Clave</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Ingresar clave" onChange={(e) => setClave(e.target.value)} />
                    </div>
                    {console.log(usuario)}
                    {console.log(clave)}
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
                {loginError ? (<div className="p-4"><div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {loginError}
                </div></div>) : (<div></div>)}
            </div>
        </div>
    )
}

export default Login
