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
    <div className='flex-col w-100 aI-center pd-1rem jC-center gap-1rem'>
      <div className='flex-col w-30 w-100-mQ gap-1rem '>
        <div className="flex-col w-100 aI-center gap-0_2rem jC-center">
          {Object.entries(formData)
            .filter(([clave]) => clave !== "id") // excluye el id
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([clave, valor]) => (
              <div
                className='flex-col w-100 jC-spBtw pd-1rem bS-borBox gap-1rem bGc-grey aI-center'
                key={clave}
              >
                <div className='flex-row fW-wR wB-brWord w-100 jC-spBtw'>
                  <label htmlFor={formData.nombre}>{primerMayuscula(clave)}:</label>
                  {editingField === clave ? (
                    <input
                      id={formData.nombre}
                      name={formData.nombre}
                      value={formData[clave] || ""}
                      onChange={(e) => handleChange(e, clave)}
                    />
                  ) : (
                    <p className='tA-end w-50'>
                      {clave === "precio" ? (
                        `$${valor}`
                      ) : clave === "imagen" ? (
                        <img
                          src={valor}
                          alt={formData.nombre || "Imagen del producto"}
                          className="w-100px"
                        />
                      ) : typeof valor === "object" ? (
                        JSON.stringify(valor)
                      ) : (
                        valor
                      )}
                    </p>
                  )}
                </div>
                <div className='flex-row w-100-mQ gap-1rem aI-center jC-center'>
                  {editingField === clave ? (
                    <div className='flex-row w-100-mQ gap-1rem aI-center jC-center'>
                      <button className='btn-form' onClick={() => handleSave(clave)}>
                        Guardar
                      </button>
                      <button onClick={() => setEditingField(null)} className='btn-form'>
                        ❌
                      </button>
                    </div>
                  ) : (
                    <button className='btn-form' onClick={() => setEditingField(clave)}>
                      Editar
                    </button>
                  )}
                </div>
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
