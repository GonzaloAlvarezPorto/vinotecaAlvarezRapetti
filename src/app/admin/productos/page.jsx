"use client"
import VinotecaContext from '@/context/VinotecaContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const AdminProductos = () => {

  const {productos} = useContext(VinotecaContext);
  
  return (
    <div className='flex-col aI-center jC-center w-100 gap-1rem'>
      <div className='flex-col gap-0_2rem'>
      {
        productos.map((producto, i) => (
          <div className='flex-row gap-1rem aI-center' key={i}>
            <Link href={`/admin/productos/${producto.id}`}>{producto.id}</Link>
            <p>{producto.nombre}</p>
          </div>
        ))
      }
      </div>
        <Link className='btn-back' href={'/admin'}>Volver</Link>
    </div>
  )
}

export default AdminProductos