import React, { useContext } from 'react'
import { NavBar } from './NavBar'
import { CarritoCompra } from './CarritoCompra'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const Header = () => {

    const {carrito} = useContext(CartContext);

    return (
        <header className='cabecera'>
            <Link to="/"><img src="/src/assets/logo.png" alt="logo vinoteca" className="cabecera__logo" /></Link>
            <NavBar />
            <CarritoCompra carrito={carrito} />
        </header>
    )
}
