import React, { useState } from 'react';
import { FiSearch, FiGlobe, FiMenu, FiUser, FiLogOut, FiX } from 'react-icons/fi'; // ¡FiX importado!
import estilos from './Encabezado.module.css';
import imagenCarrito from '../../assets/carrito.png';
import logoYuki from '../../assets/yuki.png';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const Encabezado = () => {
    const { items } = useCarrito();
    const [termino, setTermino] = useState(''); // Estado para el input de búsqueda
    const [mostrarMenuPerfil, setMostrarMenuPerfil] = useState(false);
    const [mostrarMenuHamburguesa, setMostrarMenuHamburguesa] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (termino.trim()) {
            navigate(`/cursos?q=${encodeURIComponent(termino.trim())}`);
            setTermino(''); // Limpiar el input después de la búsqueda
        }
    };

    const handleLogout = () => {
        logout();
        setMostrarMenuPerfil(false);
    };

    const getNombreCorto = (user) => {
        if (!user || !user.firstName) return 'Perfil';
        return user.firstName.split(' ')[0];
    };

    // Función para limpiar el campo de búsqueda
    const limpiarBusqueda = () => {
        setTermino('');
    };

    return (
        <header className={estilos.encabezado}>
            <div className={estilos.grupoIzquierdo}>
                <button
                    className={`${estilos.botonIcono} ${estilos.botonMenuHamburguesa}`}
                    onClick={() => setMostrarMenuHamburguesa(!mostrarMenuHamburguesa)}
                    aria-label="Abrir menú de navegación"
                >
                    <FiMenu size={20} />
                </button>
                {mostrarMenuHamburguesa && (
                    <div className={estilos.menuDesplegableHamburguesa}>
                        <Link to="/mis-cursos" className={estilos.menuItem} onClick={() => setMostrarMenuHamburguesa(false)}>Mis Cursos</Link>
                        <Link to="/convertirse-en-instructor" className={estilos.menuItem} onClick={() => setMostrarMenuHamburguesa(false)}>Enseña en Yuki</Link>
                    </div>
                )}

                <Link to="/">
                    <img src={String(logoYuki)} alt="Logo de Yuki" className={estilos.logoImagen} />
                </Link>
                <Link to="/cursos" className={estilos.enlaceNavegacion}>Explorar Cursos</Link>
            </div>

            <form className={estilos.formulario} onSubmit={manejarEnvio}>
                <div className={estilos.contenedorInput}>
                    <FiSearch className={estilos.icono} />
                    <input
                        type="text"
                        className={estilos.entrada}
                        placeholder="Buscar cualquier cosa"
                        value={termino}
                        onChange={(e) => setTermino(e.target.value)}
                        aria-label="Buscar"
                    />
                    {/* Botón "X" para limpiar la búsqueda, visible solo si hay texto */}
                    {termino && (
                        <button
                            type="button" // Importante: para que no envíe el formulario
                            className={estilos.botonBorrarBusqueda}
                            onClick={limpiarBusqueda}
                            aria-label="Borrar búsqueda"
                        >
                            <FiX />
                        </button>
                    )}
                </div>
            </form>

            <div className={estilos.grupoDerecho}>
                <a
                    href="https://yukidt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={estilos.enlaceNavegacion}
                >
                    Volver a YukiDT
                </a>

                <Link to="/carrito" className={estilos.botonIconoCarrito}>
                    {items.length > 0 && (
                        <span className={estilos.contadorCarrito}>{items.length}</span>
                    )}
                    <img src={String(imagenCarrito)} alt="Carrito de compras" className={estilos.imagenIcono} />
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/cuenta" className={estilos.botonCuenta}>Cuenta</Link>
                        <div className={estilos.contenedorPerfil}>
                            <button
                                className={estilos.botonPerfil}
                                onClick={() => setMostrarMenuPerfil(!mostrarMenuPerfil)}
                                aria-haspopup="true"
                                aria-expanded={mostrarMenuPerfil}
                            >
                                {getNombreCorto(user)} <FiUser size={18} style={{ marginLeft: '4px' }} />
                            </button>
                            {mostrarMenuPerfil && (
                                <div className={estilos.menuDesplegablePerfil}>
                                    <p className={estilos.perfilEmail}>{user?.email}</p>
                                    <Link to="/perfil" className={estilos.perfilMenuItem} onClick={() => setMostrarMenuPerfil(false)}>
                                        <FiUser size={16} /> Ver Perfil
                                    </Link>
                                    <button onClick={handleLogout} className={estilos.perfilMenuItemBoton}>
                                        <FiLogOut size={16} /> Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={estilos.botonLogin}>Iniciar sesión</Link>
                        <Link to="/registro" className={estilos.botonRegistro}>Regístrate</Link>
                    </>
                )}

                <button className={estilos.botonIcono}>
                    <FiGlobe size={20} />
                </button>
            </div>
        </header>
    );
};

export default Encabezado;