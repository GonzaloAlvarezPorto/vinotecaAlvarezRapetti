import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const Usuario = () => {

    const { register, handleSubmit } = useForm();

    const { primeraEnMayuscula } = useContext(CartContext);

    let [bloqueado, setBloqueado] = useState(false);

    let [usuarioId, setUsuarioId] = useState("");

    const darDeAlta = (data) => {
        setBloqueado(true);

        const usuario = {
            nombre: primeraEnMayuscula(data.nombre),
            apellido: primeraEnMayuscula(data.apellido),
            mail: data.mail,
            password: data.password,
            tipoDeUsuario: "cliente"
        }

        const usuarioRef = collection(db, "usuarios");

        addDoc(usuarioRef, usuario)
        .then((doc) => {
            setUsuarioId(doc.id);
        })
    }

    if (usuarioId) {
        return (
            <div className='cuerpoPrincipal'>
                <p className='cuerpoPrincipal__mensaje'>Usuario cargado</p>
                <p className='cuerpoPrincipal__mensaje'>El identificador es este: {usuarioId}</p>
                <Link className='cuerpoPrincipal__enlaces' to = "/">Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div className='cuerpoPrincipal'>
            <form className='cuerpoPrincipal__formulario' onSubmit={handleSubmit(darDeAlta)}>
                <input className='formulario__input' required type="text" placeholder="Ingrese su nombre" {...register("nombre")} />
                <input className='formulario__input' required type="text" placeholder="Ingrese su apellido" {...register("apellido")} />
                <input className='formulario__input' required type="email" placeholder="Ingrese su e-mail" {...register("mail")} />
                <input className='formulario__input' required type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                <button className='formulario__boton' type="submit" disabled={bloqueado}>{bloqueado ? "Procesando..." : "Dar de alta"}</button>            </form>
        </div>
    )
}
