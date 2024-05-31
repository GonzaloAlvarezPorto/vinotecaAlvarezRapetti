import React from 'react'
import { Derechos } from './Derechos'
import { Redes } from './Redes'

export const Footer = () => {
  return (
    <footer className='pieDePagina'>
      <Redes />
      <Derechos />
    </footer>
  )
}
