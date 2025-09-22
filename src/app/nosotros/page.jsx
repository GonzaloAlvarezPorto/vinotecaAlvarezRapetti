"use client"

import React from 'react';

const historias = [
    {
        parrafo: "En nuestra vinoteca, cada botella cuenta una historia. Nos apasiona el mundo del vino y nos dedicamos a seleccionar los mejores productos para quienes valoran calidad, sabor y tradición.",
        imagen: "/vinoteca.jpg",
        className: "flex-row"
    },
    {
        parrafo: "Trabajamos con productores de distintas regiones de Argentina y del mundo, asegurando que cada vino, licor o bebida especial que ofrecemos cumpla con los más altos estándares.",
        imagen: "/bodega.jpeg",
        className: "flex-row-rev"
    },
    {
        parrafo: "Más que un comercio, nuestra vinoteca es un espacio para descubrir y disfrutar: desde recomendaciones personalizadas hasta la posibilidad de explorar nuevas etiquetas y variedades.",
        imagen: "/sommelier.webp",
        className: "flex-row"
    },
    {
        parrafo: "Nuestro equipo comparte la pasión por el vino y está siempre dispuesto a guiar a cada cliente, transformando la compra en una experiencia única y enriquecedora.",
        imagen: "/equipo.jpeg",
        className: "flex-row-rev"
    },
    {
        parrafo: "Creemos que cada botella puede acompañar momentos especiales, celebraciones y encuentros, y nos enorgullece ser parte de esas historias a través de nuestra selección de productos.",
        imagen: "/botellas.jpg",
        className: "flex-row"
    }
];

const Nosotros = () => {
    return (
        <div className="historias gap-1rem">
            <h2>¿QUIÉNES SOMOS?</h2>
            <ul className='flex-col gap-1rem'>
                {historias.map((historia, i) => (
                    <li key={i} className={`${historia.className} jC-center aI-center flex-col-mQ gap-1rem gap-0-mQ`}>
                        <p className='maxW-500px w-90-mQ'>{historia.parrafo}</p>
                        <img className='oF-cover maxH-250px h-auto w-300px' src={historia.imagen} alt={historia.imagen} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Nosotros;
