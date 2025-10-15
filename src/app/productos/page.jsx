"use client"

import ProdAside from '@/components/ProdAside';
import VinotecaContext from '@/context/VinotecaContext'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

const Productos = () => {

  const { productosFiltrados, agregarAlCarrito, carrito } = useContext(VinotecaContext);

  const [cantidades, setCantidades] = useState([]);

  useEffect(() => {
    setCantidades(Array(productosFiltrados.length).fill(0));
  }, [productosFiltrados]);

  const handleCantidadChange = (i, value) => {
    const cantidad = Math.max(Number(value), 0);
    setCantidades(c => c.map((v, idx) => (idx === i ? cantidad : v)));
  };

  return (
    <div className='flex-row flex-col-mQ w-100 heroSize'>
      <ProdAside />
      <div className='fichaProducto pd-1rem bS-borBox'>
        {
          productosFiltrados.map((producto, i) => (
            <div className='flex-col h-350px w-200px bGc-grey aI-center jC-spBtw gap-1rem bS-borBox pd-1rem' key={i}>
              <div className='flex-row w-100 ovF-hidden aI-center jC-center bGc-white'>
                <img className='h-150px' src={producto.imagen} title={producto.nombre} alt={producto.nombre} />
              </div>
              <p className='tA-center ovF-hidden maxH-25px'>{producto.nombre}</p>
              <p>${producto.precio}</p>
              <Link href={"https://wa.me/541135880974"} target="_blank" rel="noopener noreferrer" className='btn-cart'>Preguntá</Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Productos