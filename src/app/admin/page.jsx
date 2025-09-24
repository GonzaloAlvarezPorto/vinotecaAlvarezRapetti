import Link from 'next/link'
import React from 'react'

const Admin = () => {

  const botones = [
    {
      enlace:'/admin/productos',
      texto:'Productos'
    },
    {
      enlace:'/admin/Pedidos',
      texto:'Pedidos'
    },
    {
      enlace:'/admin/usuarios',
      texto:'Usuarios'
    }
  ];

  return (
    <div className='flex-col w-100 aI-center gap-1rem jC-center'>
      {
        botones.map((boton,i) => (
          <Link key={i} className='btn-admin' href={boton.enlace}>{boton.texto}</Link>
        ))
      }
    </div>
  )
}

export default Admin