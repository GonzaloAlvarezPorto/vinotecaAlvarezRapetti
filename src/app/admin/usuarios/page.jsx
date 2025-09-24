"use client"
import { getUsuarios } from '@/services/usuarios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AdminUsuarios = () => {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data)
      } catch (error) {
        console.error("Error al traer usuarios");
      }
    }
    fetchUsuarios();
  }, [])

  return (
    <div className='flex-col aI-center jC-center w-100 gap-1rem pdUD-1rem'>
      <div className='flex-col w-90-mQ gap-0_5rem jC-spBtw'>
        {usuarios.map((usuario, index) => (
          <div className='flex-col gap-1rem jC-spBtw bGc-grey pd-1rem' key={index}>
            <span className='flex-row gap-1rem aI-center jC-spBtw'>
              <p>Email:</p>
              <Link className='fC-white navbar-red wB-brAll' href={`/admin/usuarios/${usuario.id}`}>{usuario.email}</Link>
            </span>
            <span className='flex-row gap-1rem jC-spBtw aI-center'>
              <p>Nombre de usuario:</p>
              <p>{usuario.username}</p>
            </span>
            <span className='flex-row gap-1rem jC-spBtw aI-center'>
              <p>Rol de usuario:</p>
              <p>{usuario.role}</p>
            </span>
          </div>
        ))
        }
      </div >

      <Link href={'/admin'} className='btn-back'>Volver</Link>
    </div >
  )
}

export default AdminUsuarios