import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const ItemDetail = () => {

    const { agregarAlCarrito, decrementarCantidad, incrementarCantidad } = useContext(CartContext);

    const [cantidad, setCantidad] = useState(1);

    let [producto, setProducto] = useState(undefined);
    let { itemId } = useParams();

    useEffect(() => {

        const docRef = doc(db, "productos", itemId);
        getDoc(docRef)
            .then(res => {
                setProducto({ ...res.data(), id: res.id })
            })
    }, [itemId]);


    return (
        <div className='cuerpoPrincipal'>
            <Link to="/" className='cuerpoPrincipal__enlaceRetorno'>Volver a inicio</Link>
            <div className='cuerpoPrincipal__contenedorProductos'>
                <div className='contenedorProductos__fichaProducto'>
                    <h1 className='fichaProducto__titulo'>{producto ? producto.nombre : "Cargando catálogo..."}</h1>
                    <img src={producto ? producto.imagen : "Cargando imagen..."} alt="" className="fichaProducto__imagen" />
                    <p className="fichaProducto__descripcion">{producto ? producto.descripcion : "Cargando catálogo..."}</p>
                    <div className="fichaProducto__contador">
                        <button onClick={() => decrementarCantidad(cantidad, setCantidad)} className="contador__botones">➖</button>
                        <span className="contador__numero">{cantidad}</span>
                        <button onClick={() => incrementarCantidad(cantidad, setCantidad)} className="contador__botones">➕</button>
                    </div>
                    <button onClick={() => agregarAlCarrito(producto, cantidad, setCantidad)} className='fichaProducto__boton'>Agregar</button>
                </div>
            </div>
        </div>
    )
}
