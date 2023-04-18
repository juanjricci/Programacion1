import axios from 'axios';
import React, { useState } from 'react'

const URL_CARRO = 'http://localhost:8001';
const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const Register = () => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [administrador, setAdministrador] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify({ nombre, apellido, email, clave, administrador })
        console.log(data);
        try {
            axios.post(`${URL_CARRO}/api/usuarios/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + TOKEN_CARRO
                },
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container p-4">
            <div className="card mx-auto p-4" style={{ width: '50rem' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameInput">Nombre</label>
                        <input type="text" className="form-control" id="nameInput" placeholder="Ingresar nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastnameInput">Apellido</label>
                        <input type="text" className="form-control" id="lastnameInput" placeholder="Ingresar apellido" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email Address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">example@email.com</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Clave</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Ingresar clave" onChange={(e) => setClave(e.target.value)} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="esAdminCheck" onChange={(e) => setAdministrador(e.target.checked)} /><span>Es admin?</span>
                    </div>
                    {/**{console.log(nombre)}
                    {console.log(apellido)}
                    {console.log(email)}
                    {console.log(clave)}
                    {console.log(administrador)}*/}
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </div>
        </div>
    )

}

export default Register