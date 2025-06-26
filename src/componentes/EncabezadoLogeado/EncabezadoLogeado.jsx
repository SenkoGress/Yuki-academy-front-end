import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import estilos from './EncabezadoLogeado.module.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCarrito } from '../../context/CarritoContext.jsx';
import MenuUsuario from '../MenuUsuario/MenuUsuario.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import logoYuki from '../../assets/yuki.png';

const EncabezadoLogeado = () => {
    const { user } = useAuth(); 
    const { items } = useCarrito();
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownAbierto(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

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
                </div>

                <form className={estilos.formulario}>
                    <div className={estilos.contenedorInput}>
                        <FiSearch className={estilos.icono} />
                        <input type="text" className={estilos.entrada} placeholder="Buscar cualquier cosa" />
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

                    {/* --- BOTÓN AÑADIDO AQUÍ --- */}
                    <Link to="/cuenta" className={estilos.botonCuenta}>
                      Cuenta
                    </Link>
                    {/* ------------------------- */}

                    <Link to="/carrito" className={estilos.botonIconoCarrito}>
                        {items.length > 0 && <span className={estilos.contadorCarrito}>{items.length}</span>}
                        <FiShoppingCart />
                    </Link>
                    
                    <div className={estilos.contenedorPerfil} ref={dropdownRef}>
                        <button
                            className={estilos.botonPerfil}
                            onClick={() => setDropdownAbierto(!dropdownAbierto)}
                        >
                            {user.firstName ? user.firstName.charAt(0) : 'U'}
                        </button>
                        {dropdownAbierto && <MenuUsuario />}
                    </div>
                </div>
            </header>
            
            {sidebarAbierto && <Sidebar onClose={() => setSidebarAbierto(false)} />}
        </>
    );
};

export default EncabezadoLogeado;