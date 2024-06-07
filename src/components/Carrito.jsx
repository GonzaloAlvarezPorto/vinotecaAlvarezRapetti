import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const Carrito = () => {

    const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);

    return (
        <div className='cuerpoPrincipal'>
            <div className='cuerpoPrincipal__contenedorProductos'>
                {carrito.map((producto) => <div className='contenedorProductos__fichaProducto'><h1 className='fichaProducto__titulo'>{producto.nombre}:</h1><img className='fichaProducto__imagen' src={producto.imagen} alt="" /><div className='fichaProducto__precio'>Precio: ${producto.precio}</div></div>)}
                {
                    carrito.length > 0 ?
                        <>
                        <div className='contenedorProductos__fichaProducto'>
                            <h2 className='fichaProducto__titulo'>Total: ${calcularTotal()}</h2>
                            <button className="fichaProducto__botonAgregar" onClick={vaciarCarrito}>Vaciar carrito</button>
                            </div>
                        </> :
                        <div className='contenedorProductos__fichaProducto'>
                        <h2 className='fichaProducto__titulo'>No hay productos en el carrito</h2>
                        </div>
                }
            </div>
        </div>
    )
}
