import React from 'react'
import { BarraMenu } from './BarraMenu'
import { CarritoCompra } from './CarritoCompra'

export const Header = () => {
    return ( 
        <header className='cabecera'>
            <h1 className='cabecera__titulo'>Vinoteca Alvarez Rapetti</h1>
            <BarraMenu />
            <CarritoCompra />
        </header>
    )
}
