// src/componentes/EncabezadoLogeado/EncabezadoLogeado.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import estilos from './EncabezadoLogeado.module.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCarrito } from '../../context/CarritoContext.jsx';
import MenuUsuario from '../MenuUsuario/MenuUsuario.jsx'; // Asegúrate de que este componente existe
import Sidebar from '../Sidebar/Sidebar.jsx'; // Asegúrate de que este componente existe
import { FiSearch, FiShoppingCart } from 'react-icons/fi'; // Iconos de React
import logoYuki from '../../assets/yuki.png'; // Logo de tu aplicación

const EncabezadoLogeado = () => {
    const { user } = useAuth(); // Obtén el objeto 'user' del contexto
    const { items } = useCarrito();
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    // Si el usuario no está cargado, no renderiza el encabezado logeado
    if (!user) return null;

    return (
        <>
            <header className={estilos.encabezado}>
                <div className={estilos.grupoIzquierdo}>
                    {/* Botón para abrir el Sidebar (menú hamburguesa) */}
                    <button onClick={() => setSidebarAbierto(true)} className={estilos.botonIcono}>
                        ☰
                    </button>
                    {/* Enlace del logo a la página de inicio */}
                    <Link to="/">
                        <img src={logoYuki} alt="Logo Yuki" className={estilos.logoImagen} />
                    </Link>
                </div>

                {/* Formulario de búsqueda */}
                <form className={estilos.formulario}>
                    <div className={estilos.contenedorInput}>
                        <FiSearch className={estilos.icono} />
                        <input type="text" className={estilos.entrada} placeholder="Buscar cualquier cosa" />
                    </div>
                </form>

                <div className={estilos.grupoDerecho}>
                    {/* Enlace externo a YukiDT */}
                    <a
                        href="https://yukidt.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilos.enlaceNavegacion}
                    >
                        Volver a YukiDT
                    </a>

                    {/* Botón del carrito de compras con contador */}
                    <Link to="/carrito" className={estilos.botonIconoCarrito}>
                        {items.length > 0 && <span className={estilos.contadorCarrito}>{items.length}</span>}
                        <FiShoppingCart />
                    </Link>
                </div>
            </header>

            {/* Sidebar (menú lateral) */}
            {sidebarAbierto && <Sidebar onClose={() => setSidebarAbierto(false)} />}
        </>
    );
};

export default EncabezadoLogeado;
