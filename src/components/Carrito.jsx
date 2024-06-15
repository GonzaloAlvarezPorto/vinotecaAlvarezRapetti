import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

export const Carrito = () => {

    const { carrito, calcularTotal, vaciarCarrito, quitarDelCarrito, eliminarDelCarrito } = useContext(CartContext);

    const [cantidad] = useState(1);

    return (
        <div className='cuerpoPrincipal'>
            <div className='cuerpoPrincipal__contenedorProductos'>
                {carrito.map((producto) => <div key={producto.id} className='contenedorProductos__fichaProducto'>
                    <h1 className='fichaProducto__titulo'>{producto.nombre}</h1>
                    <img className='fichaProducto__imagen' src={producto.imagen} alt="" />
                    <div className='fichaProducto__precio'>Precio: ${producto.precio}</div>
                    <div className='fichaProducto__cantidad'>Cantidad: {producto.cantidad}</div>
                    <div className='fichaProducto__totalProducto'>Total producto: ${producto.cantidad * producto.precio}</div>
                    <button onClick={() => quitarDelCarrito(producto, cantidad)} className='fichaProducto__boton'>Uno menos ➖</button>
                    <button onClick={() => eliminarDelCarrito(producto)} className='fichaProducto__boton'>Vaciar producto ❌</button></div>)
                }
                {
                    carrito.length > 0 ?
                        <>
                            <div className='contenedorProductos__resumen'>
                                <h2 className='resumen__titulo'>Total: ${calcularTotal()}</h2>
                                <button className="resumen__boton" onClick={vaciarCarrito}>Vaciar carrito</button>
                                <Link to="/finalizar-compra">Finalizar compra</Link>
                            </div>
                        </> :
                        <div className='contenedorProductos__resumen'>
                            <h2 className='resumen__titulo'>
                                No hay productos en el carrito
                            </h2>
                        </div>
                }
            </div>
        </div>
    )
}
