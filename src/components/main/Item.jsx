import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const Item = ({producto}) => {

    const {agregarAlCarrito} = useContext(CartContext);

    return (
        (<div className='contenedorProductos__fichaProducto'>
            <h1 className='fichaProducto__titulo'>{producto.nombre}</h1>
            <img src={producto.imagen} alt="" className="fichaProducto__imagen" />
            <div className="fichaProducto__precio">${producto.precio}</div>
            <Link className='fichaProducto__masDetalles' to={`/item/${producto.id}`}>Ver más</Link>
            <button onClick={() => agregarAlCarrito(producto)} className='fichaProducto__botonAgregar'>Agregar</button>
        </div>)
    )
}
