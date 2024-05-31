import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from "../../data/productos.json"

export const ItemDetailContainter = () => {

    let { itemId } = useParams();
    let [producto, setProducto] = useState(undefined);

    useEffect(() => {
        setProducto(data.find((prod) => prod.id === parseInt(itemId)));
    }, [itemId])
    return (
        <div className='cuerpoPrincipal'>
            <Link to="/" className='cuerpoPrincipal__enlaceRetorno'>Volver a inicio</Link>
            <div className='cuerpoPrincipal__contenedorProductos'>
                <div className='contenedorProductos__fichaProducto'>
                    <h1 className='fichaProducto__titulo'>{producto ? producto.nombre : "Cargando catálogo---"}</h1>
                    <p className="fichaProducto__descripcion">{producto ? producto.descripcion : "Cargando catálogo---"}</p>
                </div>
            </div>
        </div>
    )
}
