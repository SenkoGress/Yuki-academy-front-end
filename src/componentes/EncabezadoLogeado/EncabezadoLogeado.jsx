import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './EncabezadoLogeado.module.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCarrito } from '../../context/CarritoContext.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { FiSearch, FiShoppingCart, FiBell, FiX } from 'react-icons/fi';
import logoYuki from '../../assets/yuki.png';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const EncabezadoLogeado = () => {
    const { user, isLoggedIn } = useAuth();
    const { items } = useCarrito();
    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (!isLoggedIn || !user || !user.token) {
                setUnreadNotificationsCount(0);
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/notifications/unread-count`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setUnreadNotificationsCount(response.data);
            } catch (error) {
                console.error('Error al obtener el conteo de notificaciones no leídas:', error);
                setUnreadNotificationsCount(0);
            }
        };

        fetchUnreadCount();

        const intervalId = setInterval(fetchUnreadCount, 60000);
        return () => clearInterval(intervalId);
    }, [isLoggedIn, user]);

    const manejarBusqueda = (e) => {
        e.preventDefault();
        if (terminoBusqueda.trim()) {
            navigate(`/cursos?q=${encodeURIComponent(terminoBusqueda.trim())}`);
            setTerminoBusqueda('');
            setSidebarAbierto(false);
        }
    };

    const limpiarBusqueda = () => {
        setTerminoBusqueda('');
    };

    if (!user) return null;

    return (
        <>
            <header className={estilos.encabezado}>
                <div className={estilos.grupoIzquierdo}>
                    <button onClick={() => setSidebarAbierto(true)} className={estilos.botonIcono}>
                        ☰
                    </button>
                    <Link to="/">
                        <img src={logoYuki} alt="Logo Yuki" className={estilos.logoImagen} />
                    </Link>
                    {/* El enlace "Explorar Cursos" YA NO ESTÁ AQUÍ */}
                </div>

                <form className={estilos.formulario} onSubmit={manejarBusqueda}>
                    <div className={estilos.contenedorInput}>
                        <FiSearch className={estilos.icono} />
                        <input
                            type="text"
                            className={estilos.entrada}
                            placeholder="Buscar cualquier cosa"
                            value={terminoBusqueda}
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                        />
                        {terminoBusqueda && (
                            <button
                                type="button"
                                className={estilos.botonBorrarBusqueda}
                                onClick={limpiarBusqueda}
                                aria-label="Borrar búsqueda"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                </form>

                {/* ¡NUEVO: El enlace "Explorar Cursos" se mueve aquí, al lado derecho de la barra de búsqueda! */}
                {/* Lo incluimos dentro de un nuevo div o directamente en el grupoDerecho para control de layout */}
                <div className={estilos.grupoCentroDerecha}> {/* Nuevo grupo para Explorar Cursos y grupoDerecho original */}
                    <Link to="/cursos" className={estilos.enlaceNavegacion}>Explorar Cursos</Link>

                    <div className={estilos.grupoDerecho}> {/* Tu grupoDerecho original */}
                        <a
                            href="https://yukidt.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={estilos.enlaceNavegacion}
                        >
                            Volver a YukiDT
                        </a>

                        <Link to="/notificaciones" className={estilos.botonIconoNotificaciones}>
                            <FiBell />
                            {unreadNotificationsCount > 0 && (
                                <span className={estilos.contadorNotificaciones}>{unreadNotificationsCount}</span>
                            )}
                        </Link>

                        <Link to="/carrito" className={estilos.botonIconoCarrito}>
                            {items.length > 0 && <span className={estilos.contadorCarrito}>{items.length}</span>}
                            <FiShoppingCart />
                        </Link>
                    </div>
                </div>
            </header>

            {sidebarAbierto && <Sidebar onClose={() => setSidebarAbierto(false)} />}
        </>
    );
};

export default EncabezadoLogeado;