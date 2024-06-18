import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { CartContext } from '../../context/CartContext';

export const Usuario = () => {

    const { register, handleSubmit } = useForm();

    const { primeraEnMayuscula } = useContext(CartContext);

    const darDeAlta = (data) => {
        const usuario = {
            nombre: primeraEnMayuscula(data.nombre),
            apellido: primeraEnMayuscula(data.apellido),
            mail: data.mail,
            password: data.password,
            tipoDeUsuario: "cliente"
        }

        const usuarioRef = collection(db, "usuarios");

        addDoc(usuarioRef, usuario)
    }


    return (
        <div className='cuerpoPrincipal'>
            <form className='cuerpoPrincipal__formulario' onSubmit={handleSubmit(darDeAlta)}>
                <input className='formulario__input' required type="text" placeholder="Ingrese su nombre" {...register("nombre")} />
                <input className='formulario__input' required type="text" placeholder="Ingrese su apellido" {...register("apellido")} />
                <input className='formulario__input' required type="email" placeholder="Ingrese su e-mail" {...register("mail")} />
                <input className='formulario__input' required type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                <button className='formulario__boton' type="submit">Dar de Alta</button>
            </form>
        </div>
    )
}
