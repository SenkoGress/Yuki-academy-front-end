import React from 'react';
import estilos from './MisCursos.module.css';
import TarjetaMiCurso from '../TarjetaMiCurso/TarjetaMiCurso.jsx';

// Datos de ejemplo para los cursos del profesor
const cursosDelProfesor = [
  {
    id: 1,
    titulo: 'Python para Ciencia de Datos',
    estudiantes: 153,
    estado: 'Publicado',
    imagen: 'https://www.headsem.com/wp-content/uploads/2018/06/Big-Data.png'
  },
  {
    id: 2,
    titulo: 'Introducción a la Seguridad Informática',
    estudiantes: 430,
    estado: 'Publicado',
    imagen: 'https://web-assets.esetstatic.com/tn/-x700/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg'
  },
  {
    id: 3,
    titulo: 'Fundamentos de Machine Learning',
    estudiantes: 89,
    estado: 'Borrador',
    imagen: 'https://www.headsem.com/wp-content/uploads/2018/06/Seguridad-informatica-practica-768x480.png'
  }
];

const MisCursos = () => {
  return (
    <div className={estilos.contenedor}>
      <header className={estilos.cabecera}>
        <h2 className={estilos.tituloPrincipal}>Mis Cursos</h2>
      </header>
      
      <div className={estilos.listaCursos}>
        {cursosDelProfesor.map(curso => (
          <TarjetaMiCurso key={curso.id} curso={curso} />
        ))}
      </div>
    </div>
  );
};

export default MisCursos;