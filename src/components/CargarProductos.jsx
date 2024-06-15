import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebase/config';

export const CargarProductos = () => {

    const ProductosRef = collection(db, "productos");

    /*const productoParaCargar = {
        nombre: "Vino Tinto Reserva",
        precio: 250,
        imagen: "/img/tintoReserva.png",
        descripcion: "Vino tinto reserva con cuerpo robusto y aromas a frutas maduras y roble. Perfecto para maridar con carnes rojas.",
        categoria: {
            id: "tintos",
            nombre: "Tintos"
        }
    }*/

    const cargarProductos = () => {
        addDoc(ProductosRef, productoParaCargar);
    }

    return (
        <div>CargarProductos</div>
    )
}
