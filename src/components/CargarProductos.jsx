import { addDoc, collection } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../firebase/config';
import { useForm } from 'react-hook-form';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CargarProductos = () => {

    const { register, handleSubmit } = useForm();

    const { primeraEnMayuscula } = useContext(CartContext)

    let [docId, setDocId] = useState("");
    let [bloqueado, setBloqueado] = useState(false);

    
    const cargarDatos = (dataProducto) => {
        setBloqueado(true);

        const productoParaCargar = {
            nombre: primeraEnMayuscula(dataProducto.nombre),
            precio: dataProducto.precio,
            imagen: dataProducto.imagen,
            descripcion: primeraEnMayuscula(dataProducto.descripcion),
            categoria: {
                id: dataProducto.idCategoria,
                nombre: primeraEnMayuscula(dataProducto.nombreCategoria)
            }
        }

        const productoRef = collection(db, "productos");

        addDoc(productoRef, productoParaCargar)
            .then((doc) => {
                setDocId(doc.id);
            })
    }

    if (docId) {
        return (
            <div className='cuerpoPrincipal'>
                <p className='cuerpoPrincipal__mensaje'>Producto cargado</p>
                <p className='cuerpoPrincipal__mensaje'>El identificador es este: {docId}</p>
                <Link to = "/">Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div className='cuerpoPrincipal'>
            <form className='cuerpoPrincipal__formulario' onSubmit={handleSubmit(cargarDatos)}>
                <h2 className="formulario__texto">Ingresar datos del producto a cargar en base de datos</h2>
                <input className='formulario__input' type="text" required placeholder="Ingrese su nombre" {...register("nombre")} />
                <input className='formulario__input' type='number' required placeholder='Ingresa un precio' {...register("precio")} />
                <input className='formulario__input' type='text' required placeholder='Ingresa la URL de una imagen' {...register("imagen")} />
                <input className='formulario__input' type="text" required placeholder="Ingrese una descripción" {...register("descripcion")} />
                <input className='formulario__input' type="text" required placeholder="Ingrese el id de la categoría" {...register("idCategoria")} />
                <input className='formulario__input' type="text" required placeholder="Ingrese el nombre de la categoría" {...register("nombreCategoria")} />
                <button className='formulario__boton' type="submit" disabled={bloqueado}>{bloqueado ? "Procesando..." : "Agregar a la base de datos"}
                </button>
            </form>
        </div>
    )
}
