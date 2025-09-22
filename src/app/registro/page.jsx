"use client"
import VinotecaContext from '@/context/VinotecaContext';
import Link from 'next/link';
import React, { useContext } from 'react'

const Registro = () => {

    const { 
        email, setEmail, 
        password, setPassword,
        message,
        username, setUsername,
        handleRegister
    } = useContext(VinotecaContext);

    return (
        <div className="flex-col aI-center w-100 jC-center gap-1rem">
            <form onSubmit={handleRegister} className='flex-col aI-center gap-1rem bGc-black_logo_0_2 bS-black-1px pd-1rem'>
                {message && <p>{message}</p>}

                <div className='flex-row gap-0_5rem jC-spBtw w-100'>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='fF-lato'
                    />
                </div>
                <div className='flex-row gap-0_5rem jC-spBtw w-100'>
                    <label>Mail:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='fF-lato'
                    />
                </div>
                <div className='flex-row gap-0_5rem jC-spBtw w-100'>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='fF-lato'
                    />
                </div>
                <button className='btn-form' type="submit">Registrarse</button>
            </form>

            <p>
                ¿Ya tenés cuenta? <Link href="/login">Ingresá aquí</Link>
            </p>
        </div>
    )
}

export default Registro