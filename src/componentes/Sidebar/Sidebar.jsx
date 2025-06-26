import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Sidebar.module.css';
import { FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; // 1. Importamos useAuth

const Sidebar = ({ onClose }) => {
  const { user } = useAuth(); // 2. Obtenemos la información del usuario

  // 3. Verificamos si el usuario tiene el rol de profesor
  const esProfesor = user?.roles?.includes('ROLE_PROFESSOR');

  return (
    <div className={estilos.backdrop} onClick={onClose}>
      <nav className={estilos.sidebar} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={estilos.botonCerrar}>
          <FiX size={24} />
        </button>
        <ul>
          <li>
            {/* 4. El enlace ahora es condicional */}
            <Link 
              to={esProfesor ? "/panel-profesor" : "/mis-cursos-comprados"}
              onClick={onClose}
            >
              Mis Cursos
            </Link>
          </li>
          <li>
            <Link to="/convertirse-en-instructor" onClick={onClose}>
              Enseña en Yuki
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;