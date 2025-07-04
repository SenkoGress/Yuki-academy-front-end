// src/componentes/CursoCard/CursoCard.jsx

import React from 'react';
import estilos from './CursoCard.module.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { toast } from 'react-toastify'; // Importar la función toast

// El componente CursoCard ahora acepta una nueva propiedad opcional: 'forceRedirectTo'.
// Si esta propiedad se proporciona, la tarjeta redirigirá a esa URL específica,
// ignorando la URL generada por el 'id' del curso.
const CursoCard = ({ curso, mostrarBotonCarrito = true, forceRedirectTo = null }) => {
  const { agregarAlCarrito } = useCarrito();

  // Define la URL de redirección por defecto: /cursos/{id_del_curso}
  const defaultUrlDelCurso = `/cursos/${curso.id}`;

  // La URL final será 'forceRedirectTo' si se proporcionó, de lo contrario, la default.
  // Esta es la lógica que permite que 'CursosDestacados' fuerce la redirección.
  const finalUrlDelCurso = forceRedirectTo || defaultUrlDelCurso;

  // Manejador para el botón "Añadir al carrito"
  const handleAgregarClick = (e) => {
    e.preventDefault(); // Previene que el Link de la tarjeta se active al hacer clic en el botón
    e.stopPropagation(); // Detiene la propagación del evento para que no active el Link

    agregarAlCarrito(curso); // Llama a la función del contexto para añadir el curso al carrito

    // --- ¡MENSAJE SIN COMILLAS SIMPLES ALREDEDOR DEL TÍTULO! ---
    toast.success(`${curso.title} añadido a la cesta!`, { // <-- Modificado aquí
      position: "top-right",
      autoClose: 3000, // La notificación desaparecerá en 3 segundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // --- FIN NOTIFICACIÓN TOAST ---
  };

  // Formatea el precio para mostrarlo en moneda chilena (CLP)
  // Maneja casos donde el precio puede ser nulo, indefinido, 0 o el string "Gratis"
  const formattedPrice = curso.price != null && !isNaN(parseFloat(curso.price))
      ? parseFloat(curso.price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
      : (curso.price === 0 || String(curso.price).toLowerCase() === 'gratis' ? 'Gratis' : 'Precio no disponible');

  // Muestra el nombre del profesor o un placeholder si no está disponible
  // Asegúrate de que tu backend esté devolviendo el objeto 'professor' completo
  // o al menos 'professor.firstName' y 'professor.lastName' dentro de CourseDto.
  // Si solo devuelve professorId, esta parte necesita un ajuste.
  const instructorName = curso.professor ? `${curso.professor.firstName} ${curso.professor.lastName}` : (curso.professorId ? `ID Profesor: ${curso.professorId}` : 'Instructor Desconocido');

  // Muestra el rating o un placeholder si no está disponible
  const displayRating = curso.rating || 'Sin calificar';

  return (
      // El componente Link ahora utiliza 'finalUrlDelCurso' para la redirección
      <Link to={finalUrlDelCurso} className={estilos.enlaceCard}>
        <div className={estilos.card}>
          {/* Muestra la imagen del curso, con el título como texto alternativo */}
          <img src={curso.imageUrl} alt={`Portada del curso ${curso.title}`} className={estilos.imagenCurso} />
          <div className={estilos.info}>
            {/* Muestra el título del curso */}
            <h3 className={estilos.titulo}>{curso.title}</h3>
            {/* Muestra el nombre del instructor */}
            <p className={estilos.instructor}>{instructorName}</p>
            <div className={estilos.rating}>
              {/* Muestra el rating */}
              <span className={estilos.puntuacion}>{displayRating}</span>
            </div>
            {/* Muestra el precio formateado */}
            <p className={estilos.precio}>{formattedPrice}</p>

            {/* Renderizado condicional del botón "Añadir al carrito" */}
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
