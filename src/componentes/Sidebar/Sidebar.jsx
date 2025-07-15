import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Sidebar.module.css';
// --- Icono añadido ---
import { FiX, FiHome, FiBookOpen, FiDollarSign, FiUser, FiSettings, FiLogOut, FiGrid, FiBook } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const esProfesor = user?.roles?.includes('ROLE_PROFESSOR');

  const defaultProfilePicture = `https://placehold.co/80x80/522d86/FFFFFF?text=${user?.firstName ? user.firstName.charAt(0) : 'U'}`;

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
      <div className={estilos.backdrop} onClick={onClose}>
        <nav className={estilos.sidebar} onClick={(e) => e.stopPropagation()}>
          <div className={estilos.sidebarHeader}>
            {user && (
                <div className={estilos.userInfo}>
                  <img
                      src={user.profilePictureUrl || defaultProfilePicture}
                      alt="Perfil de Usuario"
                      className={estilos.userAvatar}
                      onError={(e) => { e.target.src=defaultProfilePicture; }}
                  />
                  <div className={estilos.userText}>
                    <p className={estilos.userName}>{user.firstName} {user.lastName}</p>
                    <p className={estilos.userEmail}>{user.email}</p>
                  </div>
                </div>
            )}
            <button onClick={onClose} className={estilos.botonCerrar}>
              <FiX size={24} />
            </button>
          </div>

          <ul className={estilos.menuLista}>
            <li>
              <Link to="/" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiHome className={estilos.enlaceIcono} />
                <span>Inicio</span>
              </Link>
            </li>

            {/* --- RENDERIZADO CONDICIONAL PARA EL PANEL DEL PROFESOR --- */}
            {esProfesor && (
                <li>
                  <Link to="/panel-profesor" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                    <FiGrid className={estilos.enlaceIcono} />
                    <span>Panel del Profesor</span>
                  </Link>
                </li>
            )}

            {/* Este enlace es para todos los usuarios logeados */}
            <li>
              <Link to="/mis-cursos-comprados" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiBookOpen className={estilos.enlaceIcono} />
                <span>Mis Cursos</span>
              </Link>
            </li>

            {/* Renderizado condicional para "Enseña en Yuki" */}
            {!esProfesor && (
                <li>
                  <Link to="/convertirse-en-instructor" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                    <FiDollarSign className={estilos.enlaceIcono} />
                    <span>Enseña en Yuki</span>
                  </Link>
                </li>
            )}

            <li>
              <Link to="/cursos" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiBook className={estilos.enlaceIcono} />
                <span>Todos los cursos</span>
              </Link>
            </li>

            <li>
              <Link to="/perfil" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiUser className={estilos.enlaceIcono} />
                <span>Mi Perfil</span>
              </Link>
            </li>

            <li>
              <Link to="/cuenta" className={estilos.enlaceMenu} onClick={handleLinkClick}>
                <FiSettings className={estilos.enlaceIcono} />
                <span>Configuración</span>
              </Link>
            </li>

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