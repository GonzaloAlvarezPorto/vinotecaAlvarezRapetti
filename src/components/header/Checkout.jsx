import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const Checkout = () => {
    const { carrito, calcularTotal, vaciarCarrito, primeraEnMayuscula } = useContext(CartContext);
    const { register, handleSubmit } = useForm();

    let [docId, setDocId] = useState("");
    let [nombre, setNombre] = useState("");
    let [bloqueado, setBloqueado] = useState(false);

    const comprar = (data) => {
        setBloqueado(true);

        const pedido = {
            cliente: data,
            productos: carrito,
            total: calcularTotal()
        }

        const pedidosRef = collection(db, "pedidos");

        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setDocId(doc.id);
                setNombre(primeraEnMayuscula(data.nombre));
                vaciarCarrito();
            })
    }

    if (docId) {
        return (
            <div className='cuerpoPrincipal'>
                <p className='cuerpoPrincipal__mensaje'>Gracias confiar en nosotros {nombre}, volvé cuando quieras</p>
                <p className='cuerpoPrincipal__mensaje'>Para hacer el seguimiento de tu pedido, el identificador es este: {docId}</p>
            </div>
        )
    }

    return (
        <div className='cuerpoPrincipal'>
            <form className='cuerpoPrincipal__formulario' onSubmit={handleSubmit(comprar)}>
                <input className='formulario__input' type="text" placeholder="Ingrese su nombre" {...register("nombre")} />
                <input className='formulario__input' type="email" placeholder="Ingrese su e-mail" {...register("email")} />
                <button className='formulario__boton' type="submit" disabled={bloqueado}>
                    {bloqueado ? "Procesando..." : "Comprar"}
                </button>
            </form>
        </div>
    )
}
