import React from 'react'

export const NavBar = () => {
    return (
        <nav className='cabecera__contenedorListado'>
            <ul className='contenedorListado__listado'>
                <li className='listado__items'>
                    <a className='items__enlace' href="#">Inicio</a>
                </li>
                <li className='listado__items'>
                    <a className='items__enlace' href="#">Botellas</a>
                </li>
                <li className='listado__items'>
                    <a className='items__enlace' href="#">Damajuanas</a>
                </li>
                <li className='listado__items'>
                    <a className='items__enlace' href="#">Licores</a>
                </li>
            </ul>
        </nav>
    )
}
