// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// const URL_CARRO = 'http://localhost:8001';
// const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

// const ProductosVendidos = () => {

//     const [productos_vendidos, setProductos_vendidos] = useState([])

//     const getProducosVendidos = async () => {
//         const res = await axios.get(`${URL_CARRO}/api/producto-vendidos/`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + TOKEN_CARRO
//             },
//         })
//         console.log(res.data)
//         setProductos_vendidos(res.data)
//     }

//     useEffect(() => {
//         getProducosVendidos();
//     }, []);

//     return (
//         <div className="container p-4">
//             <ul className="list-group">
//                 {
//                     productos_vendidos.map(
//                         (prod) =>
//                             < li className="list-group-item d-flex justify-content-between align-items-start" key={prod.id}>
//                                 <div className="ms-2 me-auto">
//                                     <div className="fw-bold">Numero de venta: {prod.idVenta}</div>
//                                     <Link to={`/producto/${prod.idProducto}`}>Codigo de producto: {prod.idProducto}</Link>
//                                     <div>Cantidad: {prod.cantidad}</div>
//                                 </div>
//                                 Precio: ${prod.precio}
//                                 {/**<span className="badge bg-primary rounded-pill">14</span>*/}
//                             </li>
//                     )}
//             </ul>
//         </div>
//     )
// }

// export default ProductosVendidos
