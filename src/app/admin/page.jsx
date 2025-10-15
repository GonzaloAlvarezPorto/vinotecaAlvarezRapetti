import Link from 'next/link'
import React from 'react'

const Admin = () => {

  const botones = [
    {
      enlace:'/admin/productos',
      texto:'Productos'
    },
    {
      enlace:'/admin/productos/crear',
      texto:'Producto nuevo'
    },
    {
      enlace:'/admin/usuarios',
      texto:'Usuarios'
    }
  ];

  return (
    <div className='flex-col w-100 aI-center gap-1rem jC-center pd-1rem'>
      {
        botones.map((boton,i) => (
          <Link key={i} className='btn-admin' href={boton.enlace}>{boton.texto}</Link>
        ))
      }
    </div>
  )
}

export default Admin