"use client"
import VinotecaContext from '@/context/VinotecaContext'
import { deleteProducto, updateProducto } from '@/services/productos'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const AdminProductoIndividual = () => {
  const { fetchProductoIndividual, prodIndividual, fetchProductos } = useContext(VinotecaContext);
  const { productoId } = useParams();
  const router = useRouter();

  const [editingField, setEditingField] = useState(null); // cuál campo se edita
  const [formData, setFormData] = useState({}); // valores editados

  // Traer producto
  useEffect(() => {
    fetchProductoIndividual(productoId)
  }, [productoId]);

  // Cuando prodIndividual cambie, actualizar formData
  useEffect(() => {
    if (prodIndividual) {
      setFormData(prodIndividual);
    }
  }, [prodIndividual]);

  const handleChange = (e, clave) => {
    setFormData({ ...formData, [clave]: e.target.value });
  };

  const handleSave = async (clave) => {
    await updateProducto(prodIndividual.id, { [clave]: formData[clave] });
    await fetchProductos();
    setEditingField(null); // salir de edición
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("¿Seguro que eliminar este producto?");
    if (!confirmDelete) return;
    await deleteProducto(prodIndividual.id);
    await fetchProductos();
    router.push('/admin/productos');
  };

  if (!prodIndividual) return <div className='w-100 flex-row aI-center jC-center'>Cargando producto...</div>;

  const primerMayuscula = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  return (
    <div className='flex-col w-100 pd-1rem aI-center jC-center gap-1rem'>
      <div className='flex-col w-50 w-90-mQ pd-1rem gap-1rem bGc-grey'>
        <div className="flex-col w-100 aI-center gap-1rem jC-center">
          {Object.entries(formData)
            .filter(([clave]) => clave !== "id") // excluye el id
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([clave, valor]) => (
              <div
                className='flex-row w-100 ovF-hidden fW-wR jC-spBtw gap-1rem bSB-black_1px aI-center pdUD-0_5rem'
                key={clave}
              >
                <label htmlFor='fiesta'>{primerMayuscula(clave)}:</label>
                {editingField === clave ? (
                  <input
                  id='fiesta'
                  name='fiesta'
                    value={formData[clave] || ""}
                    onChange={(e) => handleChange(e, clave)}
                    className="input-form"
                  />
                ) : (
                  <p className='tA-end w-50'>
                    {clave === "precio"
                      ? `$${valor}` // 👈 agrega el símbolo $
                      : typeof valor === "object"
                        ? JSON.stringify(valor)
                        : valor}
                  </p>
                )}
                {editingField === clave ? (
                  <div className='flex-row gap-1rem'>
                    <button className='btn-form' onClick={() => handleSave(clave)}>
                      Guardar
                    </button>
                    <button onClick={()=>setEditingField(null)} className='btn-form'>
                      ❌
                    </button>
                  </div>
                ) : (
                  <button className='btn-form' onClick={() => setEditingField(clave)}>
                    Editar
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className='flex-row w-100-mQ jC-center'>
          <button className='btn-form' onClick={handleDelete}>Borrar producto</button>
        </div>
      </div>
      <Link className='btn-back' href={'/admin/productos'}>Volver</Link>
    </div>
  )
}

export default AdminProductoIndividual;
