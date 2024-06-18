import React from 'react'
import { NavLink } from 'react-router-dom'

export const Login = () => {

    /*Si se loguea de entrada tiene que verificar que exista el usuario por medio del mail 
    y chequear que la contraseña ingresada
    es correcta

    Si no está registrado lo debe llevar al formulario de registro comprobar nuevamente todo y devolvernos al
    index
    
    Una vez hecha cualquiera de las dos opciones, debe cambiar la palabra "login" por el nombre del usuario

    Verificar si al seguir navengando sigue todo correcto
    */

    return (
        <div className='cabecera__logueo'>
            <NavLink to="/login" className='logueo__enlace'>Login</NavLink>
        </div>
    )
}
