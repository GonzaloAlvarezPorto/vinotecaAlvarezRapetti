import React, { useContext } from 'react'
import { NavBar } from './NavBar'
import { CarritoCompra } from './CarritoCompra'
import { Link } from 'react-router-dom'

export const Header = () => {

    return (
        <header className='cabecera'>
            <Link to="/"><img src="/img/logo.png" alt="logo vinoteca" className="cabecera__logo" /></Link>
            <NavBar />
            <CarritoCompra />
        </header>
    )
}
