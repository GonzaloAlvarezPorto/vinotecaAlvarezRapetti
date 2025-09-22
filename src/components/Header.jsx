"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import NavBar from './NavBar'
import MenuDesplegable from './MenuDesplegable'
import VinotecaContext from '@/context/VinotecaContext'

const Header = () => {

    const { showSubMenu, setClase } = useContext(VinotecaContext);

    return (
        <header onMouseLeave={() => setClase('dS-none')}>
            <div className='flex-row aI-center jC-spBtw w-100 bGc-black_logo'>
                <Link className='flex-row aI-center jC-center pdLat-1rem' href={"/"}>
                    <img className='h-80px' src="/favicon.ico" alt="Vinoteca Alvarez Rapetti" title='Vinoteca Alvarez Rapetti' />
                </Link>
                <NavBar />
            </div>
            {showSubMenu && <MenuDesplegable />}
        </header>
    )
}

export default Header