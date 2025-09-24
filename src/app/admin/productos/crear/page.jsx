"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import VinotecaContext from '@/context/VinotecaContext';

const CrearProductos = () => {
    const router = useRouter();

    const { setProductos } = useContext(VinotecaContext);

    const creandoProductos = [
        { label: "Nombre", input: "nombre", type: "text" },
        { label: "Categoría", input: "categoria", type: "text" },
        { label: "Descripción", input: "descripcion", type: "text" },
        { label: "Imagen", input: "imagen", type: "text" },
        { label: "Precio", input: "precio", type: "number" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // casteamos el precio a número
        data.precio = Number(data.precio);

        try {
            const res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Error al crear producto");

            const nuevoProducto = await res.json();
            console.log("Producto creado:", nuevoProducto);

            setProductos(prev => [...prev, nuevoProducto]);

            // redirigir después de crear
            router.push("/admin/productos");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex-col gap-1rem pd-1rem aI-center jC-center w-100">
            <form onSubmit={handleSubmit} className="flex-col pd-1rem gap-1rem bGc-grey">
                {creandoProductos.map((crProd, index) => (
                    <div
                        className="flex-row gap-0_5rem w-100 aI-center jC-spBtw"
                        key={index}
                    >
                        <label className="w-50" htmlFor={crProd.input}>
                            {crProd.label}:
                        </label>
                        {crProd.input === "descripcion" ? (
                            <textarea
                                className="w-50"
                                id={crProd.input}
                                name={crProd.input}
                            />
                        ) : (
                            <input
                                className="w-50"
                                type={crProd.type}
                                id={crProd.input}
                                name={crProd.input}
                                required
                            />
                        )}
                    </div>
                ))}
                <button className="btn-form w-70 aS-center" type="submit">
                    Crear producto
                </button>
            </form>
            <Link className="btn-back" href={"/admin/productos"}>
                Volver
            </Link>
        </div>
    );
};

export default CrearProductos;
