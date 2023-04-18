import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Navigation = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [loggedUser, setLoggedUser] = useState([])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setLoggedUser(user.usuario)
            setLoggedIn(true)
        }
    }, [])

    const handleLogOut = () => {
        setLoggedIn(false)
        window.localStorage.removeItem('loggedUser')
        window.location.href = "/";
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Products App
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {loggedIn ? (
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-white me-2 mt-2"> Hola, {loggedUser.username}</div>
                                            <button className="btn btn-primary" onClick={handleLogOut}>Log Out</button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link className="nav-link" to="/login">Log In</Link>
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation
