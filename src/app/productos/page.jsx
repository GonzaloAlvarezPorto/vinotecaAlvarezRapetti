"use client"

import ProdAside from '@/components/ProdAside';
import VinotecaContext from '@/context/VinotecaContext'
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
            <div className='flex-col h-360px w-200px bGc-grey aI-center jC-spBtw gap-1rem bS-borBox pd-1rem' key={i}>
              <div className='flex-row w-100 aI-center jC-center bGc-white'>
                <img className='h-150px' src={producto.imagen} title={producto.nombre} alt={producto.nombre} />
              </div>
              <p className='tA-center ovF-hidden maxH-25px'>{producto.nombre}</p>
              <p>${producto.precio}</p>
              <div className='flex-row aI-center jC-center w-100 gap-0_5rem'>
                <button className='btn-cart-cant' onClick={() => handleCantidadChange(i, cantidades[i] - 1)}>-</button>
                <input
                  name={`cantidad-${producto.id}`}
                  type="number"
                  min="0"
                  value={cantidades[i] ?? 0}
                  onChange={(e) => handleCantidadChange(i, e.target.value)}
                  className='w-30px h-30px border-none tA-center  noFlechasInput'
                />
                <button className='btn-cart-cant' onClick={() => handleCantidadChange(i, cantidades[i] + 1)}>+</button>
              </div>
              <button
                className='btn-cart'
                onClick={() => {
                  const cantidadSeleccionada = cantidades[i]; // tomamos la cantidad directamente
                  if (cantidadSeleccionada <= 0) return;

                  // agregamos al carrito
                  agregarAlCarrito(producto, cantidadSeleccionada);

                  // reseteamos el input
                  setCantidades(c => c.map((v, idx) => (idx === i ? 0 : v)));
                }}
                disabled={cantidades[i] <= 0}
              >
                Agregar al carrito
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Productos