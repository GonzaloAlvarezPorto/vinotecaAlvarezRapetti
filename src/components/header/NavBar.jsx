import React from 'react'
import { NavLink } from 'react-router-dom'
import categories from "../../data/categorias.json"

export const NavBar = () => {
    
    return (
        <nav className='cabecera__contenedorListado'>
            <ul className='contenedorListado__listado'>
                <li className='listado__items'>
                    <NavLink to="/" className='items__enlace'>Inicio</NavLink>
                </li>
                {
                    categories.map((category) => {
                        return(
                            <li className='listado__items' key={category.id}>
                            <NavLink to={`/category/${category.id}`} className='items__enlace'>
                                {category.nombre}
                            </NavLink>
                        </li> 
                        )
                    })
                }
            </ul>
        </nav>
    )
}
