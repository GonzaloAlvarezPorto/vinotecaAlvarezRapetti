"use client"
import VinotecaContext from '@/context/VinotecaContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const AdminProductos = () => {

  const { productos } = useContext(VinotecaContext);

  // Agrupar por categoría
  const productosPorCategoria = productos.reduce((acc, prod) => {
    if (!acc[prod.categoria]) {
      acc[prod.categoria] = [];
    }
    acc[prod.categoria].push(prod);
    return acc;
  }, {});

  // Ordenar categorías alfabéticamente
  const categoriasOrdenadas = Object.keys(productosPorCategoria).sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' })
  );

  return (
    <div className='flex-col aI-center jC-center w-100 gap-1rem pdUD-0_5rem'>
      <Link className='btn-form' href={'/admin/productos/crear'}>Crear nuevo producto</Link>
      {categoriasOrdenadas.map((categoria) => {
        // Ordenar productos dentro de la categoría
        const productosOrdenados = productosPorCategoria[categoria].sort((a, b) =>
          a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
        );

        return (
          <div key={categoria} className='flex-col gap-1rem bGc-grey w-100 pdUD-0_5rem'>
            <h3 className='fC-colorVino tA-center tD-under'>{categoria}</h3>
            <div className='fichaProducto fichaProducto-mQ w-100 gap-1rem'>
              {productosOrdenados.map((producto) => (
                <div className='flex-col w-100 gap-1rem aI-center' key={producto.id}>
                  <Link className='tA-center navbar-red fC-black w-100' href={`/admin/productos/${producto.id}`}>
                    {producto.nombre}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <Link className='btn-back' href={'/admin'}>Volver</Link>
    </div>
  )
}

export default AdminProductos
