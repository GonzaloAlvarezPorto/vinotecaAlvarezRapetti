"use client"

import VinotecaContext from '@/context/VinotecaContext'
import React, { useContext } from 'react'

const Productos = () => {

  const { productos } = useContext(VinotecaContext);


  return (
    <div className='heroSize'>
      {
      productos.map((producto, i)=> (
        <p key={i}>{producto.nombre}</p>
      ))
    }
    </div>
  )
}

export default Productos