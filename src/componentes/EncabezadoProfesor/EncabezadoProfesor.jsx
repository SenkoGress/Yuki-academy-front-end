import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './EncabezadoProfesor.module.css';
import logoYuki from '../../assets/yuki.png';

const EncabezadoProfesor = () => {
  return (
    <header className={estilos.header}>
      <div className={estilos.contenido}>
        <Link to="/panel-profesor" className={estilos.logo}>
          <img src={logoYuki} alt="Logo Yuki" />
          <span>Panel de Profesor</span>
        </Link>
        <nav className={estilos.nav}>
          {/* AQUÍ AÑADIMOS EL NUEVO ENLACE A INICIO */}
          <Link to="/">Inicio</Link>
          
          <Link to="/panel-profesor/cursos">Mis Cursos</Link>
          <Link to="/panel-profesor/estadisticas">Estadísticas</Link>
          <Link to="/panel-profesor/perfil">Mi Perfil</Link>
        </nav>
        <div className={estilos.acciones}>
          <button className={estilos.botonCerrarSesion}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export default EncabezadoProfesor;