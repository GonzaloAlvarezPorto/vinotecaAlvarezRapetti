"use client"

import VinotecaContext from '@/context/VinotecaContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

const NavBar = () => {
  const { openSubMenu, closeMenu, closeMenuInstant, user } = useContext(VinotecaContext);

  const [showMenu, setShowMenu] = useState(false);
  const [urlBtn, setUrlBtn] = useState('/menu.png')

  const secciones = [
    {
      nombre: "ADMIN",
      ruta: "/admin",
      submenu: false,
      closeInstant: true,
      adminOnly: true, // solo admins
    },
    {
      nombre: "PRODUCTOS",
      ruta: "/productos",
      submenu: true,
      closeInstant: false,
    },
    {
      nombre: "¿QUIÉNES SOMOS?",
      ruta: "/nosotros",
      submenu: false,
      closeInstant: true,
    },
    {
      nombre: "🛒",
      ruta: "/carrito",
      submenu: false,
      closeInstant: true,
    }
  ];

  const seccionesFiltradas = secciones.filter(seccion => {
    if (seccion.adminOnly && (!user || user.role !== "admin")) return false;
    return true;
  });

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
    setUrlBtn(prev => prev === '/menu.png' ? '/close.png' : '/menu.png');
  };

  return (
    <div className='flex-row flex-col-mQ pdLat-1rem gap-3rem aI-center'>
      <button
        onClick={() => toggleMenu()}
        className='dS-none dS-flex-mQ bGc-transp border-none'>
          <img className='h-35px' src={urlBtn} alt={urlBtn}  title={urlBtn}/>
      </button>
      <ul className={`${showMenu ? 'menu-mQ' : ''} flex-row gap-1rem dS-none-mQ`}>
        {seccionesFiltradas.map((seccion, i) => (
          <li
            key={i}
            onMouseEnter={() => {
              if (seccion.submenu) {
                openSubMenu();
              } else {
                closeMenuInstant();
              }
            }}
            onMouseLeave={closeMenu}
            onClick={()=> {
              toggleMenu();
            }}
          >
            <Link href={seccion.ruta} className='fC-letras navbar-red'>
              {seccion.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavBar;
