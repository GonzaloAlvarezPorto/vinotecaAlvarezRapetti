import React from 'react'
import { RedesFacebook } from './RedesFacebook'
import { RedesInstagram } from './RedesInstagram'

export const Redes = () => {
    return (
        <div className='pieDePagina__contenedorRedes'>
            <RedesFacebook />
            <RedesInstagram />
        </div>
    )
}
