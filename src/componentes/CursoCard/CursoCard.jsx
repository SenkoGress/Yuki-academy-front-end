// src/componentes/CursoCard/CursoCard.jsx

import React from 'react';
import estilos from './CursoCard.module.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { toast } from 'react-toastify';
import { FiStar } from 'react-icons/fi'; // Importa el icono de estrella


const CursoCard = ({ curso, mostrarBotonCarrito = true, forceRedirectTo = null }) => {
  const { agregarAlCarrito } = useCarrito();


  const defaultUrlDelCurso = `/cursos/${curso.id}`;


  const finalUrlDelCurso = forceRedirectTo || defaultUrlDelCurso;


  const defaultCourseImage = 'https://via.placeholder.com/280x150?text=Imagen+del+Curso';


  const handleAgregarClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    agregarAlCarrito(curso); 

    toast.success(`${curso.title} añadido a la cesta!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  const formattedPrice = curso.price != null
      ? parseFloat(curso.price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
      : 'Gratis'; 


  const instructorName = (curso.professorFirstName && curso.professorLastName)
      ? `${curso.professorFirstName} ${curso.professorLastName}`
      : (curso.professorId ? `ID Profesor: ${curso.professorId}` : 'Instructor Desconocido');

  const displayRating = curso.rating || 'N/A'; 


  return (
      <Link to={finalUrlDelCurso} className={estilos.enlaceCard}>
        <div className={estilos.card}>
          <img
              src={curso.imageUrl || defaultCourseImage}
              alt={`Portada del curso ${curso.title || 'Cargando...'}`}
              className={estilos.imagenCurso}
              onError={(e) => { e.target.onerror = null; e.target.src = defaultCourseImage; }} 
          />
          <div className={estilos.info}>
            <h3 className={estilos.titulo}>{curso.title || 'Título no disponible'}</h3>
            <p className={estilos.instructor}>{instructorName}</p>
            <div className={estilos.rating}>
              <FiStar className={estilos.iconoEstrella} />
              <span className={estilos.puntuacion}>{displayRating}</span>
            </div>
            <p className={estilos.precio}>{formattedPrice}</p>

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