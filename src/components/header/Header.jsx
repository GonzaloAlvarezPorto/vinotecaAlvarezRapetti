import React from 'react'
import { NavBar } from './NavBar'
import { CarritoCompra } from './CarritoCompra'

export const Header = () => {
    return ( 
        <header className='cabecera'>
            <h1 className='cabecera__titulo'>Vinoteca Alvarez Rapetti</h1>
            <NavBar />
            <CarritoCompra />
        </header>
    )
}
