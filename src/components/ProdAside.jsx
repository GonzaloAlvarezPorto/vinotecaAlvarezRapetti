"use client"
import VinotecaContext from '@/context/VinotecaContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

const ProdAside = () => {

  const { loading, categoriasUnicas, setCategoriaSeleccionada } = useContext(VinotecaContext);

  const [open, setOpen] = useState(false);

  if (loading) return <p></p>;

  const categorias = categoriasUnicas();

  const toggleMenu = () => {
    setOpen(prev => !prev);
  }

  return (
    <aside className='flex-col gap-0_5rem pd-1rem pd-0-mQ bSR-black_1px border-none-mQ bSB-black_1px-mQ'>
      <p onClick={toggleMenu} className='dS-none dS-flex-mQ cR-pt pd-0_5rem'>
        Ver categorías
      </p>
      <div className={`w-150px flex-col gap-1rem ${open ? 'catgMenu-mQ' : 'dS-none'} dS-none-mQ`}>
        <p onClick={()=> setOpen(false)} className='fC-coloVinoClarete dS-none dS-flex-mQ'>Ocultar</p>
        <p
          className='fC-colorVino fC-white-mQ cR-pt'
          onClick={() => {
            setCategoriaSeleccionada(null)
            setOpen(false)
          }}
        >
          Mostrar todos
        </p>
        {
          categorias.map((categoria, i) => (
            <p
              className='cR-pt fC-white-mQ fC-colorVino'
              key={i}
              onClick={() => {
                setCategoriaSeleccionada(categoria)
                setOpen(false)
              }}>
              {categoria}
            </p>
          ))
        }
      </div>
    </aside>
  )
}

export default ProdAside