"use client"
import { deleteUsuario, getUsuarioById, updateUsuario } from '@/services/usuarios';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminUsuarioId = () => {
  const [usuario, setUsuario] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [formData, setFormData] = useState({})
  const params = useParams()
  const router = useRouter();

  const fetchUsuario = async () => {
    try {
      const data = await getUsuarioById(params.usuarioId)
      setUsuario(data)
      setFormData(data)
    } catch (error) {
      console.error("Error al traer al usuario", error)
    }
  }

  useEffect(() => {
    fetchUsuario()
  }, [params.usuarioId])

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value })
  }

  const handleSave = async (key) => {
    try {
      await updateUsuario(usuario.id, { [key]: formData[key] })
      await fetchUsuario()
      setEditingField(null)
    } catch (error) {
      console.error("Error al actualizar campo", error)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("¿Desea eliminar este usuario?");
    if (!confirmDelete) return;
    await deleteUsuario(usuario.id);
    router.push('/admin/usuarios');
  }

  if (!usuario) return <p className='w-100 flex-row aI-center jC-center'>Cargando usuario...</p>

  const primerMayuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1)

  const inputIds = {}
  Object.keys(formData).forEach((key, index) => {
    inputIds[key] = `input-${key}-${index}` // genera un id único por campo
  })

  return (
    <div className='flex-col aI-center gap-1rem jC-center w-100 pd-1rem'>
      <div className='flex-col w-30 w-100-mQ gap-1rem'>
        <div className="flex-col w-100 aI-center gap-0_2rem jC-center">
          {Object.entries(formData)
            .filter(([key]) => key !== 'id' && key !== 'password') // ocultar id y password
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => (
              <div
                key={key}
                className='flex-col w-100 jC-spBtw pd-1rem bS-borBox gap-1rem bGc-grey aI-center'
              >
                <div className='flex-row fW-wR wB-brWord w-100 jC-spBtw'>
                  <label htmlFor={formData.username}>{primerMayuscula(key)}:</label>
                  {editingField === key ? (
                    key === 'role' ? (
                      <select
                        id={formData.username}
                        name={formData.username}
                        value={formData[key]}
                        onChange={(e) => handleChange(e, key)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <input
                        id={formData.username}
                        name={formData.username}
                        type={key === 'email' ? 'email' : 'text'}
                        value={formData[key]}
                        onChange={(e) => handleChange(e, key)}
                      />
                    )
                  ) : (
                    <p className='tA-end w-50'>{value}</p>
                  )}
                </div>
                <div className='flex-row w-100-mQ gap-1rem aI-center jC-center'>
                  {editingField === key ? (
                    <div className='flex-row w-100-mQ gap-1rem aI-center jC-center'>
                      <button className='btn-form' onClick={() => handleSave(key)}>Guardar</button>
                      <button className='btn-form' onClick={() => setEditingField(null)}>❌</button>
                    </div>
                  ) : (
                    <button className='btn-form' onClick={() => setEditingField(key)}>Editar</button>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className='flex-row w-100-mQ jC-center'>
          <button className='btn-form' onClick={handleDelete}>Borrar usuario</button>
        </div>
      </div>
      <Link className='btn-back' href={'/admin/usuarios'}>Volver</Link>
    </div>
  )
}

export default AdminUsuarioId;
