import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './CrearCurso.module.css';

const CrearCurso = () => {
  return (
    <div className={estilos.barraCrearCurso}>
      <span>Crea tus cursos acá</span>
      <Link to="/panel-profesor/crear-curso" className={estilos.botonCrearCurso}>
        Crea Tu Curso
      </Link>
    </div>
  );
};

export default CrearCurso;