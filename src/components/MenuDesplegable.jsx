import VinotecaContext from '@/context/VinotecaContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const MenuDesplegable = () => {

    const { productos, loading, categoriasUnicas, closeMenuInstant, timeoutRef, setCategoriaSeleccionada } = useContext(VinotecaContext);

    const router = useRouter();
    if (loading) return <p className='w-100 flex-row aI-center jC-center'>Cargando categorías...</p>;

    const categorias = categoriasUnicas();

    const handleClick = (categoria) => {
        setCategoriaSeleccionada(categoria); // Actualiza el filtro en el context
        router.push('/productos'); // Redirige a la página de productos
        closeMenuInstant(); // opcional: cierra el menú
    }

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
                            <p 
                            className='submenu fC-black cR-pt' 
                            onClick={()=>handleClick(categoria)}>
                                {categoria.toUpperCase()}
                                </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MenuDesplegable