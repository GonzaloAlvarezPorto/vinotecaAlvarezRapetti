import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

export const Carrito = () => {

    const { carrito, calcularTotal, vaciarCarrito, quitarDelCarrito, eliminarDelCarrito } = useContext(CartContext);

    const [cantidad] = useState(1);

    return (
        <div className='cuerpoPrincipal'>
            <div className='cuerpoPrincipal__carrito'>
            {
                    carrito.length > 0 ?
                        <>
                            <div className='cuerpoPrincipalCarrito__resumen'>
                                <h2 className='resumen__titulo'>Total: ${calcularTotal()}</h2>
                                <button className="resumen__boton" onClick={vaciarCarrito}>Vaciar carrito</button>
                                <Link to="/finalizar-compra" className='resumen__boton'><button className='boton__boton'>Finalizar compra</button></Link>
                            </div>
                        </> :
                        <div className='cuerpoPrincipalCarrito__resumen'>
                            <h2 className='resumen__titulo'>
                                No hay productos en el carrito
                            </h2>
                        </div>
                }
                <div className='cuerpoPrincipalCarrito__contenedorProductosCarrito'>
                    {carrito.map((producto) => <div key={producto.id} className='contenedorProductosCarrito__fichaProductoCarrito'>
                        <h1 className='fichaProductoCarrito__titulo'>{producto.nombre}</h1>
                        <img className='fichaProductoCarrito__imagen' src={producto.imagen} alt="" />
                        <div className='fichaProductoCarrito__precio'>Precio: ${producto.precio}</div>
                        <div className='fichaProductoCarrito__cantidad'>Cantidad: {producto.cantidad}</div>
                        <div className='fichaProductoCarrito__totalProducto'>Total producto: ${producto.cantidad * producto.precio}</div>
                        <button onClick={() => quitarDelCarrito(producto, cantidad)} className='fichaProductoCarrito__boton'>Uno menos ➖</button>
                        <button onClick={() => eliminarDelCarrito(producto)} className='fichaProductoCarrito__boton'>Vaciar producto ❌</button></div>)
                    }
                </div>
                
            </div>
        </div>
    )
}
