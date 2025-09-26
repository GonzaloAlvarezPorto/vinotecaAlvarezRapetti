"use client"
import VinotecaContext from '@/context/VinotecaContext'
import React, { useContext } from 'react'

const Carrito = () => {

  const {carrito} = useContext(VinotecaContext);
  return (
    <div>{carrito.map(item => (
        <li key={item.id}>
          {item.nombre} - ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}
        </li>
      ))}</div>
  )
}

export default Carrito