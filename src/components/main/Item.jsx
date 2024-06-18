import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const Item = ({ producto }) => {

    const { agregarAlCarrito, incrementarCantidad, decrementarCantidad, mensajeEmergente } = useContext(CartContext);

    const [cantidad, setCantidad] = useState(1);

    
    return (
        (<div className='contenedorProductos__fichaProducto'>
            <h1 className='fichaProducto__titulo'>{producto.nombre}
                <Link className='fichaProducto__masDetalles' to={`/item/${producto.id}`}>
                    <img src='/img/masInfo.png' alt="masInfo" className='fichaProducto__masDetallesImagen' />
                </Link>
            </h1>
            <img src={producto.imagen} alt="" className="fichaProducto__imagen" />
            <div className="fichaProducto__precio">${producto.precio}</div>
            <div className="fichaProducto__contador">
            <button onClick={() => decrementarCantidad(cantidad, setCantidad)} className="contador__botones">➖</button>
            <span className="contador__numero">{cantidad}</span>
            <button onClick={() => incrementarCantidad(cantidad, setCantidad)} className="contador__botones">➕</button>
            </div>
            <button onClick={() => agregarAlCarrito(producto, cantidad, setCantidad)} className='fichaProducto__boton'>Añadir 🛒</button>
        </div>)
    )
}
