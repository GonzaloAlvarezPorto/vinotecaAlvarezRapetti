"use client";

import VinotecaContext from "@/context/VinotecaContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const { cambiarColorTexto, user, closeMenuInstant, logout } = useContext(VinotecaContext);

  const bodegas = [
    { nombre: "Catena Zapata", imagen: "/img/catena.png", enlace: "https://catenazapata.com/", color: "bGc-white" },
    { nombre: "Luigi Bosca", imagen: "/img/luigiBosca.webp", enlace: "https://luigibosca.com/", color: "bGc-black" },
    { nombre: "Trapiche", imagen: "/img/trapiche.svg", enlace: "https://trapiche.com.ar/", color: "bGc-black" },
    { nombre: "Norton", imagen: "/img/norton.svg", enlace: "https://www.norton.com.ar/", color: "bGc-white" },
    { nombre: "Rutini", imagen: "/img/rutini.png", enlace: "https://rutiniwines.com/", color: "bGc-white" },
  ];

  const [bodegasRandom, setBodegasRandom] = useState([]); // 👈 arranca vacío

  useEffect(() => {
    const random = [...bodegas].sort(() => 0.5 - Math.random()).slice(0, 3);
    setBodegasRandom(random);
  }, []);

  if (bodegasRandom.length === 0) return null; // 👈 no renderiza nada hasta tener random

  return (
    <div className="flex-row home-mQ jC-spBtw pos-rel ovF-hidden h-100 w-100">
      <div className="flex-col heroSize z-index_1000-mQ gap-0_5rem w-50 left-0-mQ jC-center pos-rel left-7rem pd-1rem w-90-mQ">
        <div className="flex-row w-100">
          {user ? (
            <div className="flex-row w-100 jC-spBtw aI-center" onMouseEnter={closeMenuInstant}>
              <p
                className="jC-center tA-center fS-12px-mQ"
              >
                ¡Hola {user.username}!
              </p>
              <button
                onClick={() => {
                  logout();
                }}
                className="z-index_999 jC-center bGc-transp border-none fS-16px navbar-red cR-pt tD-under fS-12px-mQ tA-center"
              >
                ¿Querés irte? Cerrá sesión aquí
              </button>
            </div>
          ) : (
            // Si NO hay usuario, mostrar login
            <Link href="/login" className="jC-center bGc-transp border-none fS-16px navbar-red cR-pt tD-under fS-12px-mQ w-100 tA-center tT-upper fC-black">
              ¿Ya te registraste? Iniciá sesión
            </Link>
          )}
        </div>
        <div className="flex-row gap-1rem aI-center">
          <div className="flex-row">
            {bodegasRandom.map((bodega, i) => (
              <Link className="heroImage" key={i} href={bodega.enlace} target="_blank">
                <img
                  className={`w-30px h-30px w-25px-mQ h-25px-mQ ${bodega.color} bS-colorVino_1px bR-100px oF-contain`}
                  src={bodega.imagen}
                  alt={bodega.nombre}
                  title={bodega.nombre}
                />
              </Link>
            ))}
          </div>
          <div className="flex-col">
            <span className="fS-12px fS-8px-mQ">+30 bodegas nos acompañan</span>
            <span className="fS-12px fS-8px-mQ">Preguntá precios, descubrí nuestra selección y consultanos lo que necesites.</span>
          </div>
        </div>

        <span className="fS-28px fS-18px-mQ fW-bold">VINOS SELECCIONADOS PARA VIVIR MOMENTOS</span>

        <span className="fS-18px fS-12px-mQ w-90 w-100-mQ">Elegimos cada botella con pasión y conocimiento, pensando en quienes valoran la calidad y la tradición.</span>

        <span className="fS-18px fS-12px-mQ w-75 w-100-mQ sabor-mQ fC-colorVino"><strong>Sabor, aroma y encuentro</strong> en cada etiqueta que ofrecemos.</span>

        <span className="fS-13px w-65 w-100-mQ">Piezas únicas para tu mesa: vinos, licores y espumantes, elaborados por productores de excelencia y listos para compartir.</span>

        <div className="flex-row gap-2rem mT-1rem jC-center-mQ">
          <button className="btn dS-none-mQ" onClick={cambiarColorTexto}>CONTACTANOS</button>
          <Link href={"/productos"} className="btn-action">CATÁLOGO</Link>
        </div>
      </div>
      <div className="callToAction heroSize-home"></div>
    </div>
  );
}
