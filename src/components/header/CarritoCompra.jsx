import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const CarritoCompra = () => {

    const {calcularCantidad} = useContext(CartContext);

    return (
        <Link className="cabecera__carrito" to="/carrito">
            🛒 {calcularCantidad()}
        </Link>
    )
}
