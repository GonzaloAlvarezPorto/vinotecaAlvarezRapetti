"use client"

import ProdAside from '@/components/ProdAside';
import VinotecaContext from '@/context/VinotecaContext'
import React, { useContext } from 'react'

const Productos = () => {

  const { productosFiltrados } = useContext(VinotecaContext);

  return (
    <div className='flex-row flex-col-mQ w-100 gap-0_5rem heroSize'>
      <ProdAside />
      <div className='fichaProducto fichaProducto-mQ'>
        {
          productosFiltrados.map((producto, i) => (
            <div className='flex-col h-350px w-100 w-70-mQ aI-center jC-spBtw gap-1rem pd-1rem bS-borBox' key={i}>
              <p>{producto.nombre}</p>
              <img className='h-25px' src={producto.imagen} title={producto.nombre} alt={producto.nombre} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Productos