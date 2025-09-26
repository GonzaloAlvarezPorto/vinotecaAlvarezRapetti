"use client"
import VinotecaContext from '@/context/VinotecaContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const AdminProductos = () => {

  const { productos } = useContext(VinotecaContext);

  return (
    <div className='flex-col w-100 aI-center gap-1rem jC-center pd-1rem'>
      <div className='fichaProducto'>
        {
          productos.map((producto, index) => (
            <div key={index} className='flex-col jC-spBtw bGc-grey gap-0_5rem w-100'>
              <div className='flex-row bS-borBox jC-spBtw tA-center w-100 pd-0_5rem'>
                <p>Producto:</p><Link href={`/admin/productos/${producto.id}`} className='w-100 wB-brWord fC-white navbar-red tA-end'>{producto.nombre}</Link>
              </div>
              <div className='flex-row bS-borBox jC-spBtw tA-center fC-black w-100 pd-0_5rem'>
                <p>Precio:</p> 
                <p className='w-100 tA-end'>${producto.precio}</p>
              </div>
              <div className='flex-row bS-borBox jC-spBtw tA-center fC-black w-100 pd-0_5rem'>
                <p>Categoría:</p> 
                <p className='w-100 tA-end'>{producto.categoria}</p>
              </div>
            </div>
          ))
        }
      </div>
      <Link className='btn-back' href={'/admin'}>Volver</Link>
    </div>
  );
}

export default AdminProductos
