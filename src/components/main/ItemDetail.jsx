import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from "../../data/productos.json"
import { CartContext } from '../../context/CartContext';

export const ItemDetail = () => {

    const {agregarAlCarrito} = useContext(CartContext);

    let [producto, setProducto] = useState(undefined);
    let { itemId } = useParams();

    useEffect(() => {
        setProducto(data.find((prod) => prod.id === parseInt(itemId)));
    }, [itemId])

    return (
        <div className='cuerpoPrincipal'>
            <Link to="/" className='cuerpoPrincipal__enlaceRetorno'>Volver a inicio</Link>
            <div className='cuerpoPrincipal__contenedorProductos'>
                <div className='contenedorProductos__fichaProducto'>
                    <h1 className='fichaProducto__titulo'>{producto ? producto.nombre : "Cargando catálogo..."}</h1>
                    <img src={producto ? producto.imagen : "Cargando imagen..."} alt="" className="fichaProducto__imagen" />
                    <p className="fichaProducto__descripcion">{producto ? producto.descripcion : "Cargando catálogo..."}</p>
                    <button onClick={() => agregarAlCarrito(producto)} className='fichaProducto__botonAgregar'>Agregar</button>
                </div>
            </div>
        </div>
    )
}
