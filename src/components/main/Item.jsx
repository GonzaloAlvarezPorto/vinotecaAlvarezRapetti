import React from 'react'
import { Counter } from '../Counter'
import { Link } from 'react-router-dom'

export const Item = ({producto}) => {
    return (
        (<div className='contenedorProductos__fichaProducto'>
            <h1 className='fichaProducto__titulo'>{producto.nombre}</h1>
            <img src={producto.imagen} alt="" className="fichaProducto__imagen" />
            <p className="fichaProducto__descripcion">{producto.descripcion}</p>
            <p className='fichaProducto__precio'>${producto.precio}</p>
            <Link className='fichaProducto__masDetalles' to={`/item/${producto.id}`}>Ver más</Link>
            <Counter/>
        </div>)
    )
}
