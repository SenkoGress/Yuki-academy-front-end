import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import estilos from './MenuUsuario.module.css';
import { FiUser, FiGrid, FiLogOut } from 'react-icons/fi';

const MenuUsuario = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // El logout en tu AuthContext ya redirige, pero por si acaso.
        navigate('/login'); 
    };

    if (!user) return null;

    return (
        <div className={estilos.menuDesplegable}>
            <div className={estilos.infoUsuario}>
                <div className={estilos.avatar}>
                    {user.firstName ? user.firstName.charAt(0) : 'U'}
                </div>
                <div className={estilos.texto}>
                    <p className={estilos.nombre}>{user.firstName} {user.lastName}</p>
                    <p className={estilos.email}>{user.email}</p>
                </div>
            </div>
            <ul className={estilos.listaOpciones}>
                <li>
                    <Link to="/perfil" className={estilos.enlaceOpcion}>
                        <FiUser />
                        <span>Mi Perfil</span>
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className={estilos.enlaceOpcion}>
                        <FiLogOut />
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default MenuUsuario;