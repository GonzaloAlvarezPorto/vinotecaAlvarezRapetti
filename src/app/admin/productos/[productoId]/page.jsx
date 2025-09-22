"use client"
import VinotecaContext from '@/context/VinotecaContext'
import { deleteProducto, updateProducto } from '@/services/productos'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const AdminProductoIndividual = () => {
  const { fetchProductoIndividual, prodIndividual, fetchProductos } = useContext(VinotecaContext);
  const { productoId } = useParams();

  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  // Traer producto
  useEffect(() => {
    fetchProductoIndividual(productoId)
  }, [productoId]);

  // Cuando prodIndividual cambie, actualizar los inputs
  useEffect(() => {
    if (prodIndividual) {
      setNombre(prodIndividual.nombre);
      setDescripcion(prodIndividual.descripcion);
      setPrecio(prodIndividual.precio);
    }
  }, [prodIndividual]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí llamás a tu función para actualizar el producto
    await updateProducto(prodIndividual.id, { nombre, descripcion, precio });
    await fetchProductos();
    alert('Producto actualizado');
    router.push('/admin/productos')
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await deleteProducto(prodIndividual.id);
    await fetchProductos();
    alert('Producto eliminado');
    router.push('/admin/productos');
  }

  if (!prodIndividual) return <div>Cargando producto...</div>;

  return (
    <div className='flex-row w-100 pdLat-1rem'>
      <div className='flex-col aI-center gap-1rem w-50 jC-center'>
        <p>{prodIndividual.nombre}</p>
        <p>{prodIndividual.descripcion}</p>
        <p>{prodIndividual.categoria.nombre}</p>
        <p>${prodIndividual.precio}</p>
        {prodIndividual.imagen &&
          <img className='h-100px' src={prodIndividual.imagen} alt={prodIndividual.nombre} title={prodIndividual.nombre} />
        }
      </div>

      <div className='flex-col aI-center gap-1rem w-50 jC-center'>
        <form onSubmit={handleSubmit} className='flex-col gap-1rem'>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <input value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
          <button type="submit">Guardar cambios</button>
        </form>
      </div>
      <div>
        <button onClick={handleDelete}>Borrar producto</button>
      </div>
    </div>
  )
}

export default AdminProductoIndividual;
