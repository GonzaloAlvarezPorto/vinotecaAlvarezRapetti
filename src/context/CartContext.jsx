import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto, numero, setCantidad) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.nombre === producto.nombre);
            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.nombre === producto.nombre
                        ? { ...item, cantidad: item.cantidad + numero }
                        : item
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: numero }];
            }
        });
        setCantidad(1);
    };

    const quitarDelCarrito = (producto, numero) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.nombre === producto.nombre);
            if (productoExistente) {
                return prevCarrito
                    .map(item =>
                        item.nombre === producto.nombre
                            ? { ...item, cantidad: item.cantidad - numero }
                            : item
                    )
                    .filter(item => item.cantidad > 0);
            } else {
                return prevCarrito;
            }
        });
    };

    const calcularCantidad = () => {
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    };

    const calcularTotal = () => {
        return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    }

    const incrementarCantidad = (cantidad, setCantidad) => {
        setCantidad(cantidad + 1);
    };

    const decrementarCantidad = (cantidad, setCantidad) => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const eliminarDelCarrito = (producto) => {
        setCarrito(prevCarrito => prevCarrito.filter(item => item.nombre !== producto.nombre));
    };

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, calcularCantidad, calcularTotal, 
        vaciarCarrito, quitarDelCarrito, incrementarCantidad, decrementarCantidad, eliminarDelCarrito }}>
            {children}
        </CartContext.Provider>
    )
}