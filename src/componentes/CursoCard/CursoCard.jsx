import React from 'react';
import estilos from './CursoCard.module.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext.jsx';

// 1. Añadimos un nuevo prop: 'mostrarBotonCarrito', con un valor por defecto de 'true'
const CursoCard = ({ curso, mostrarBotonCarrito = true }) => {
  const { agregarAlCarrito } = useCarrito();
  const urlDelCurso = `/cursos/${curso.id}`;

  const handleAgregarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    agregarAlCarrito(curso);
  };

  return (
    <Link to={urlDelCurso} className={estilos.enlaceCard}>
      <div className={estilos.card}>
        <img src={curso.imagen} alt={`Portada del curso ${curso.titulo}`} className={estilos.imagenCurso} />
        <div className={estilos.info}>
          <h3 className={estilos.titulo}>{curso.titulo}</h3>
          <p className={estilos.instructor}>{curso.instructor}</p>
          <div className={estilos.rating}>
            <span className={estilos.puntuacion}>{curso.rating}</span>
          </div>
          <p className={estilos.precio}>{curso.precio}</p>
          
          {/* 2. Renderizado Condicional: El botón solo se mostrará si 'mostrarBotonCarrito' es true */}
          {mostrarBotonCarrito && (
            <button onClick={handleAgregarClick} className={estilos.botonAgregar}>
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CursoCard;