import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const primeraEnMayuscula = (texto) => {
        return texto.split(' ').map(palabra => {
            return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        }).join(' ');
    }

    const agregarAlCarrito = (producto, numero, setCantidad) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.nombre === producto.nombre);
            if (productoExistente) {
                const nuevoCarrito = prevCarrito.map(item =>
                    item.nombre === producto.nombre
                        ? { ...item, cantidad: item.cantidad + numero }
                        : item
                );
                mostrarToast(`${numero} ${producto.nombre}(s) se agregaron al carrito.`, 'success');
                return nuevoCarrito;
            } else {
                const nuevoProducto = { ...producto, cantidad: numero };
                mostrarToast(`${numero} ${producto.nombre}(s) se agregaron al carrito.`, 'success');
                return [...prevCarrito, nuevoProducto];
            }
        });
        setCantidad(1);
    };

    const mostrarToast = (mensaje, icono) => {
        Swal.fire({
            icon: icono,
            title: mensaje,
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
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
        <CartContext.Provider value={{
            carrito, agregarAlCarrito, calcularCantidad, calcularTotal,
            vaciarCarrito, quitarDelCarrito, incrementarCantidad, decrementarCantidad, eliminarDelCarrito, primeraEnMayuscula
        }}>
            {children}
        </CartContext.Provider>
    )
}