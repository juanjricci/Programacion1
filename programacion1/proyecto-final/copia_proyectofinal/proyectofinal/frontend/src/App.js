//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation';
import { ListProducts } from './components/ListProducts';
import Cart from './components/Cart';
import Producto from './components/Producto';
//import Register from './components/Register';
import Login from './components/Login';
import Ventas from './components/Ventas';
import ProductosVendidos from './components/ProductosVendidos';
import AddProducts from './components/AddProducts';
import VentaIndividual from './components/VentaIndividual';
import Admin from './components/Admin';
import {ProductosAdmin} from './components/ProductosAdmin';
import DistribuidoresAdmin from './components/DistribuidoresAdmin';
import AddDistribuidor from './components/AddDistribuidor';
import UsuariosAdmin from './components/UsuariosAdmin';
import AddUsuario from './components/AddUsuario';
import ReportesAdmin from './components/ReportesAdmin';
import VerCarro from './components/VerCarro';
import Distribuidores from './components/Distribuidores';
import ProductosDistribuidor from './components/ProductosDistribuidor';
import { useEffect, useState } from 'react';


function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      setIsLogged(true)
      const carro_usuario = JSON.parse(loggedUserJSON)
      //console.log(carro_usuario.idUsuario.tipo)
      const admin = carro_usuario.usuario.is_staff
      setIsAdmin(admin)
    }
  }, []);

  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={ListProducts} />
      <Route path="/cart" component={isLogged ? (Cart):(ListProducts)} />
      <Route path="/producto/:id" component={Producto} />
      {/**<Route path="/register" component={Register} />*/}
      <Route path="/login" component={Login} />
      <Route path="/ventas" component={isAdmin ? (Ventas):(ListProducts)} />
      <Route path="/productos-vendidos" component={isAdmin ? (ProductosVendidos):(ListProducts)} />
      <Route path="/add-product" component={isAdmin ? (AddProducts):(ListProducts)} />
      <Route path="/add-distribuidor" component={isAdmin ? (AddDistribuidor):(ListProducts)} />
      <Route path="/add-usuario" component={isAdmin ? (AddUsuario):(ListProducts)} />
      <Route path="/venta/:idVenta" component={isAdmin ? (VentaIndividual):(ListProducts)} />
      <Route path="/admin/" component={isAdmin ? (Admin):(ListProducts)} />
      <Route path="/manejar-productos" component={isAdmin ? (ProductosAdmin):(ListProducts)} />
      <Route path="/manejar-distribuidores" component={isAdmin ? (DistribuidoresAdmin):(ListProducts)} />
      <Route path="/manejar-usuarios" component={isAdmin ? (UsuariosAdmin):(ListProducts)} />
      <Route path="/reportes" component={isAdmin ? (ReportesAdmin):(ListProducts)}/>
      <Route path="/carro/:idUser" component={isAdmin ? (VerCarro):(ListProducts)} />
      <Route path="/distribuidores" component={isAdmin ? (Distribuidores):(ListProducts)} />
      <Route path="/distribuidor/:idDist" component={isAdmin ? (ProductosDistribuidor):(ListProducts)} />
    </Router>
  );
}

export default App;
