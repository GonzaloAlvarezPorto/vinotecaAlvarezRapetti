import React from 'react'
import { NavBar } from './NavBar'
import { CarritoCompra } from './CarritoCompra'
import { Link } from 'react-router-dom'

export const Header = (props) => {
    return (
        <header className='cabecera'>
            <Link to="/"><img src="./src/assets/logo.png" alt="logo vinoteca" className="cabecera__logo" /></Link>
            <NavBar />
            <CarritoCompra numerito={props.numerito} />
        </header>
    )
}
