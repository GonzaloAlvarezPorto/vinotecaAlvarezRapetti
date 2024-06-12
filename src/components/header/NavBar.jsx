import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../../firebase/config';

export const NavBar = () => {

    let [categories, setCategories] = useState([]);

    useEffect(() => {
        const categoriasRef = collection(db, "categorias");
        getDocs(categoriasRef)
            .then((res) => {
                setCategories(res.docs.map((doc) => {
                    return { ...doc.data() }
                }));
            })
    }, [])

    return (
        <nav className='cabecera__contenedorListado'>
            <ul className='contenedorListado__listado'>
                <li className='listado__items'>
                    <NavLink to="/" activeclassname="active" className='items__enlace'>Inicio</NavLink>
                </li>
                {
                    categories.map((category) => {
                        return (
                            <li className='listado__items' key={category.id}>
                                <NavLink to={`/category/${category.id}`} activeclassname="active" className='items__enlace'>
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
