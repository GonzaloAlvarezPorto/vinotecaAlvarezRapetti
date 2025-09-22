import VinotecaContext from '@/context/VinotecaContext';
import Link from 'next/link';
import React, { useContext } from 'react'

const MenuDesplegable = () => {

    const { productos, loading, categoriasUnicas, closeMenuInstant ,timeoutRef } = useContext(VinotecaContext);

    if (loading) return <p>Cargando categorías...</p>;

    const categorias = categoriasUnicas();

    return (
        <div className='bGc-grey w-100 pdUD-0_5rem pos-abs top-80px dS-none-mQ'
            onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancela el cierre
            }}
            onMouseLeave={closeMenuInstant} // vuelve a iniciar el temporizador
        >
            {productos.length === 0 ? (
                <p></p>
            ) : (
                <ul className="flex-row w-100 gap-1rem jC-center">
                    {categorias.map((categoria, i) => (
                        <li key={i}>
                            <Link className='submenu fC-black' href={'/productos'}>{categoria.toUpperCase()}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MenuDesplegable