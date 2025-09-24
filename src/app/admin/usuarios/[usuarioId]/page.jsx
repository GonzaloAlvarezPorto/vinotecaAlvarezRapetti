"use client"
import { deleteUsuario, getUsuarioById, updateUsuario } from '@/services/usuarios';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminUsuarioId = () => {
  const [usuario, setUsuario] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [fieldValue, setFieldValue] = useState('')
  const params = useParams()

  const router = useRouter();
  
  const fetchUsuario = async () => {
    try {
      const data = await getUsuarioById(params.usuarioId)
      setUsuario(data)
    } catch (error) {
      console.error("Error al traer al usuario", error)
    }
  }
  
  useEffect(() => {
    fetchUsuario()
  }, [params.usuarioId])

  const startEditing = (field) => {
    setEditingField(field)
    setFieldValue(usuario[field])
  }

  const cancelEditing = () => {
    setEditingField(null)
    setFieldValue('')
  }

  const saveField = async () => {
    try {
      const updatedData = { ...usuario, [editingField]: fieldValue }
      await updateUsuario(usuario.id, updatedData)
      setUsuario(updatedData)
      cancelEditing()
    } catch (error) {
      console.error("Error al actualizar campo", error)
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("¿Desea eliminar este usuario?");
    if(!confirmDelete) return;
    await deleteUsuario(params.usuarioId);
    await fetchUsuario();
    router.push('/admin/usuarios');
  }

  if (!usuario) return <p>Cargando usuario...</p>

  return (
    <div className='flex-col aI-center gap-1rem jC-center w-100'>
      <div className='flex-col bGc-grey pd-1rem gap-1rem'>
        {Object.entries(usuario)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => {
          if (key === 'id' || key === 'password') return null // no mostramos id ni password

          return (
            <div key={key} className='flex-row aI-center bSB-black_1px pdUD-0_5rem jC-spBtw gap-1rem'>
              <p>{key.charAt(0).toUpperCase() + key.slice(1)}:</p>

              {editingField === key ? (
                <>
                  {key === 'role' ? (
                    <select value={fieldValue} onChange={e => setFieldValue(e.target.value)}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      value={fieldValue}
                      onChange={e => setFieldValue(e.target.value)}
                    />
                  )}
                  <button onClick={saveField} className='btn-form'>Guardar</button>
                  <button onClick={cancelEditing} className='btn-form'>❌</button>
                </>
              ) : (
                <>
                  <p className='w-100 tA-end'>{value}</p>
                  <button onClick={() => startEditing(key)} className='btn-form'>Editar</button>
                </>
              )}
            </div>
          )
        })}
        <div className='flex-row w-100-mQ jC-center'>
          <button className='btn-form' onClick={handleDelete}>Borrar usuario</button>
        </div>
      </div>
      <Link className='btn-back' href={'/admin/usuarios'}>Volver</Link>
    </div>
  )
}

export default AdminUsuarioId
