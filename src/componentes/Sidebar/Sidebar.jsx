// src/componentes/Sidebar/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Sidebar.module.css';
import { FiX, FiHome, FiBookOpen, FiDollarSign, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const esProfesor = user?.roles?.includes('ROLE_PROFESSOR'); // Verifica si el usuario es PROFESSOR

  // URL de imagen de perfil por defecto (placeholder) para el sidebar
  const defaultProfilePicture = `https://placehold.co/80x80/522d86/FFFFFF?text=${user?.firstName ? user.firstName.charAt(0) : 'U'}`;

  // Función para cerrar el sidebar al hacer clic en un enlace
  const handleLinkClick = () => {
    onClose();
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Llama a la función de logout del AuthContext
    onClose(); // Cierra el sidebar después de cerrar sesión
  };

  return (
      <div className={estilos.backdrop} onClick={onClose}>
        <nav className={estilos.sidebar} onClick={(e) => e.stopPropagation()}>
          {/* Cabecera del Sidebar: Información del Usuario y botón de cerrar */}
          <div className={estilos.sidebarHeader}>
            {user && ( // Asegurarse de que haya un usuario para mostrar su info
                <div className={estilos.userInfo}>
                  <img
                      src={user.profilePictureUrl || defaultProfilePicture}
                      alt="Perfil de Usuario"
                      className={estilos.userAvatar}
                      onError={(e) => { e.target.onerror = null; e.target.src=defaultProfilePicture; }}
                  />
                  <div className={estilos.userText}>
                    <p className={estilos.userName}>{user.firstName} {user.lastName}</p>
                    <p className={estilos.userEmail}>{user.email}</p>
                  </div>
                </div>
            )}
            {/* Botón de cerrar, alineado a la derecha en el header */}
            <button onClick={onClose} className={estilos.botonCerrar}>
              <FiX size={24} />
            </button>
          </div>

          {/* Lista de enlaces del menú */}
          <ul className={estilos.menuLista}>
            <li>
              <Link to="/" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiHome className={estilos.enlaceIcono} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                  to={esProfesor ? "/panel-profesor" : "/mis-cursos-comprados"}
                  className={estilos.enlaceMenu}
                  onClick={handleLinkClick}
              >
                <FiBookOpen className={estilos.enlaceIcono} />
                <span>Mis Cursos</span>
              </Link>
            </li>
            {/* RENDERIZADO CONDICIONAL: Solo muestra "Enseña en Yuki" si el usuario NO es profesor */}
            {!esProfesor && (
                <li>
                  <Link to="/convertirse-en-instructor" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                    <FiDollarSign className={estilos.enlaceIcono} />
                    <span>Enseña en Yuki</span>
                  </Link>
                </li>
            )}
            <li>
              <Link to="/perfil" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiUser className={estilos.enlaceIcono} />
                <span>Mi Perfil</span>
              </Link>
            </li>
            <li>
              <Link to="/cuenta" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiSettings className={estilos.enlaceIcono} />
                <span>Configuración de Cuenta</span>
              </Link>
            </li>
            {/* OPCIÓN DE CERRAR SESIÓN */}
            <li className={estilos.logoutItem}>
              <button onClick={handleLogout} className={`${estilos.enlaceMenu} ${estilos.botonCerrarSesionSidebar}`}>
                <FiLogOut className={estilos.enlaceIcono} />
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default Sidebar;