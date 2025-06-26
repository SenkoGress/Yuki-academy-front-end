import React from 'react';
import estilos from './TarjetaMiCurso.module.css';

const TarjetaMiCurso = ({ curso }) => {
  return (
    <div className={estilos.card}>
      <img src={curso.imagen} alt={`Imagen de ${curso.titulo}`} className={estilos.imagen} />
      <div className={estilos.info}>
        <h4 className={estilos.titulo}>{curso.titulo}</h4>
        <p className={estilos.estadisticas}>{curso.estudiantes} Estudiantes • {curso.estado}</p>
        <div className={estilos.acciones}>
          <button className={estilos.botonEditar}>Editar Curso</button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaMiCurso;