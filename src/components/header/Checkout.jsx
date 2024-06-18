import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const Checkout = () => {

    /*Si llega hasta acá sin loguerse, cuando pulse el botón realizar compra debe comprobarlo, si no está logueado, lo llevar al formulario
    si lo está le da acceso al resumen del pedido
    guardando los datos del usuario y el carrito en la base de datos*/

    const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);
    const { register, handleSubmit } = useForm();

    let [docId, setDocId] = useState("");

    const comprar = (data) => {
        const pedido = {
            cliente: data,
            productos: carrito,
            total: calcularTotal()
        }

        const pedidosRef = collection(db, "pedidos");

        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setDocId(doc.id);
                vaciarCarrito();
            })
    }

    if (docId) {
        return (
            <>
                <h1>Muchas gracias por tu compra</h1>
                <p>Para hacer el seguimiento de tu pedido, el identificador es este: {docId}</p>
            </>
        )
    }

    return (
        <div className='cuerpoPrincipal'>
            <form className='cuerpoPrincipal__formulario' onSubmit={handleSubmit(comprar)}>
                <input className='formulario__input' type="text" placeholder="Ingrese su nombre" {...register("nombre")} />
                <input className='formulario__input' type="email" placeholder="Ingrese su e-mail" {...register("email")} />
                <button className='formulario__boton' type="submit">Comprar</button>
            </form>
        </div>
    )
}