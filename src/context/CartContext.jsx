import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    }

    //funcion para eliminar un producto del carrito

    //funcion que acumule el mismo producto del mismo nombre y además sume sus precios

    //funcion que agrege el numero que yo le diga de productos al carrito

    //funcion que para sumar o restar el contador me lo haga solo en una ficha y no en todas

    const calcularCantidad = () => {
        return carrito.length;
    }

    const calcularTotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.precio, 0);
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    }

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, calcularCantidad, calcularTotal, vaciarCarrito }}>
            {children}
        </CartContext.Provider>
    )
}