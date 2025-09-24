"use client"

import { loginUser, registerUser } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useRef, useState } from 'react';

const VinotecaContext = createContext();

export const VinotecaProvider = ({ children }) => {

    const router = useRouter();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [prodIndividual, setProdIndividual] = useState();

    const [clase, setClase] = useState('dS-none');

    const [showSubMenu, setshowSubMenu] = useState(false);
    const timeoutRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [colorear, setColorear] = useState('');

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    //MENU
    const openSubMenu = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setshowSubMenu(true)
    }

    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setshowSubMenu(false);
        }, 5000);
    }

    const closeMenuInstant = () => {
        setshowSubMenu(false);
    }

    const opcionesUsuario = () => {
        setClase(prev => prev === 'dS-none' ? 'dS-block' : 'dS-none');
    };

    //FETCH de productos
    const fetchProductos = async () => {
        try {
            const res = await fetch('/api/productos');
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchProductoIndividual = async (productoId) => {
        try {
            const res = await fetch(`/api/productos/${productoId}`)
            const data = await res.json();
            setProdIndividual(data);
        } catch (error) {
            console.error("Error al buscar el producto:", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, []);

    const categoriasUnicas = () => {
        const todas = productos
            .map((p) => p?.categoria)
            .filter(Boolean);
        return [...new Set(todas)].sort();
    };

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria === categoriaSeleccionada)
        : productos;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginUser({ email, password });
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            router.push("/");
        } catch (error) {
            setMessage(error.message);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        try {
            const newUser = await registerUser({ username, email, password })
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            setMessage('¡Registro exitoso!');
            router.push("/")
            setMessage(null)
        } catch (error) {
            setMessage(error.message);
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoadingUser(false);
    }, []);

    const logout = () => {
        const confirmLogout = window.confirm("¿Seguro que querés cerrar sesión?");
        if (!confirmLogout) return; // si elige "Cancelar" no hace nada

        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    const cambiarColorTexto = () => {
        setColorear('color-resaltado'); // cambia al color rojo

        setTimeout(() => {
            setColorear('color-original'); // vuelve al color original
        }, 500);

        setTimeout(() => {
            setColorear('color-resaltado'); // vuelve al color original
        }, 1000);

        setTimeout(() => {
            setColorear('color-original'); // vuelve al color original
        }, 1500);

        setTimeout(() => {
            setColorear('color-resaltado'); // vuelve al color original
        }, 2000);

        setTimeout(() => {
            setColorear('color-original'); // vuelve al color original
        }, 2500);
    }

    return (
        <VinotecaContext.Provider value={{
            productos,
            loading,
            fetchProductos,
            categoriasUnicas,
            showSubMenu, setshowSubMenu,
            openSubMenu, closeMenu,
            closeMenuInstant,
            timeoutRef,
            prodIndividual, fetchProductoIndividual,
            user, setUser, logout, loadingUser,
            handleLogin,
            email, setEmail,
            password, setPassword,
            message, setMessage,
            username, setUsername,
            handleRegister,
            opcionesUsuario, clase, setClase,
            colorear, setColorear, cambiarColorTexto,
            categoriaSeleccionada, setCategoriaSeleccionada,
            productosFiltrados,
            productos, setProductos
        }}>
            {children}
        </VinotecaContext.Provider>
    );
};

export default VinotecaContext;