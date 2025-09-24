"use client"

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import VinotecaContext from '@/context/VinotecaContext';

const Login = () => {
    const {
        handleLogin,
        email, setEmail,
        password, setPassword,
        message, setMessage
    } = useContext(VinotecaContext);

    return (
        <div className="flex-col aI-center w-100 jC-center gap-1rem">
            <form onSubmit={handleLogin} className='flex-col aI-center gap-1rem bGc-black_logo_0_2 bS-black_1px pd-1rem'>
                <div className='flex-row gap-0_5rem jC-spBtw w-100'>
                    <label htmlFor='user'>Email:</label>
                    <input
                        id='user'
                        name='user'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='fF-lato'
                    />
                </div>
                <div className='flex-row gap-0_5rem jC-spBtw w-100'>
                    <label htmlFor='pass'>Contraseña:</label>
                    <input
                        id='pass'
                        name='pass'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='fF-lato'
                    />
                </div>
                <button className='btn-form' type="submit">Ingresar</button>
                {message && <p className='fC-red'>{message}</p>}
            </form>

            {/* Enlace a registro */}
            <p>
                ¿No tenés cuenta? <Link className='fC-colorVino' href="/registro">Registrate aquí</Link>
            </p>
        </div>
    )
}

export default Login;
