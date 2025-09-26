"use client"
import VinotecaContext from '@/context/VinotecaContext';
import React, { useContext, useState } from 'react'

const ProdAside = () => {

  const { loading, categoriasUnicas, categoriaSeleccionada, setCategoriaSeleccionada } = useContext(VinotecaContext);

  const [open, setOpen] = useState(false);

  if (loading) return <p></p>;

  const categorias = categoriasUnicas();

  const toggleMenu = () => {
    setOpen(prev => !prev);
  }

  const getCategoriaClass = (categoria) => {
    return categoria === categoriaSeleccionada ? 'selected' : '';
  }

  return (
    <aside className='flex-col bGc-black_logo_0_9 gap-0_5rem pd-1rem pd-0-mQ'>
      <p onClick={toggleMenu} className='dS-none fC-white dS-flex-mQ cR-pt pd-0_5rem'>
        Ver categorías
      </p>
      <div className={`w-150px flex-col gap-1rem ${open ? 'catgMenu-mQ' : 'dS-none'} dS-none-mQ`}>
        <p onClick={()=> setOpen(false)} className='fC-coloVinoClarete dS-none dS-flex-mQ'>Ocultar</p>
        <p
          className={`fC-white cR-pt navbar-red ${categoriaSeleccionada === null ? 'selected' : ''}`}
          onClick={() => {
            setCategoriaSeleccionada(null)
            setOpen(false)
          }}
        >
          Mostrar todas
        </p>
        {
          categorias.map((categoria, i) => (
            <p
              className={`cR-pt fC-white navbar-red ${getCategoriaClass(categoria)}`}
              key={i}
              onClick={() => {
                setCategoriaSeleccionada(categoria)
                setOpen(false)
              }}
            >
              {categoria}
            </p>
          ))
        }
      </div>
    </aside>
  )
}

export default ProdAside
