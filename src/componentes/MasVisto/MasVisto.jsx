// src/componentes/MasVisto/MasVisto.jsx

import React, { useState, useEffect } from 'react'; // Importamos useState y useEffect
import axios from 'axios'; // Importamos axios para hacer peticiones HTTP
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import estilos from './MasVisto.module.css'; // Estilos específicos de MasVisto
import CursoCard from '../CursoCard/CursoCard.jsx';

// URL de tu endpoint de backend para obtener todos los cursos
const API_BASE_URL = 'http://localhost:8081/api/courses';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

const MasVisto = () => {
  const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos obtenidos de la API
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
  const [error, setError] = useState(null);   // Estado para almacenar errores de la petición

  // useEffect para cargar los cursos cuando el componente se monta
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        setError(null);    // Limpia cualquier error anterior
        const response = await axios.get(API_BASE_URL); // Realiza la llamada GET a tu backend
        // console.log("Cursos obtenidos para 'MasVisto':", response.data); // Para depuración

        // Tomamos una porción de los cursos si hay muchos, o los ordenamos para simular "más vistos"
        // Por ahora, simplemente tomaremos los primeros 5-6 cursos.
        const fetchedCourses = response.data.slice(0, 6); // Limita a 6 cursos para el carrusel
        setCursos(fetchedCourses); // Almacena los cursos en el estado
        setLoading(false);     // Finaliza el estado de carga
      } catch (err) {
        console.error("Error al obtener los cursos para 'MasVisto':", err);
        setError("No se pudieron cargar los cursos más vistos. Inténtalo de nuevo más tarde."); // Mensaje de error para el usuario
        setLoading(false); // Finaliza el estado de carga incluso si hay error
      }
    };

    fetchCourses(); // Llama a la función para obtener los cursos
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  // Mostrar mensaje de carga mientras los datos se están obteniendo
  if (loading) {
    return (
        <section className={estilos.seccionMasVisto}>
          <p className={estilos.mensajeEstado}>Cargando cursos más vistos...</p>
        </section>
    );
  }

  // Mostrar mensaje de error si la petición falló
  if (error) {
    return (
        <section className={estilos.seccionMasVisto}>
          <p className={estilos.mensajeEstadoError}>{error}</p>
        </section>
    );
  }

  // Si no hay cursos después de cargar, mostrar un mensaje
  if (cursos.length === 0) {
    return (
        <section className={estilos.seccionMasVisto}>
          <p className={estilos.mensajeEstado}>No hay cursos disponibles para la sección "Más vistos" en este momento.</p>
        </section>
    );
  }

  return (
      <section className={estilos.seccionMasVisto}>
        <h2 className={estilos.titulo}>Los Cursos más vistos</h2>
        <Carousel
            responsive={responsive}
            infinite={true}
            containerClass={estilos.carouselContainer}
            itemClass={estilos.carouselItem}
        >
          {cursos.map(curso => (
              // Pasamos el objeto 'curso' tal cual lo recibimos del backend.
              // CursoCard ya está preparado para manejar 'title', 'imageUrl', 'price', etc.
              // El instructor se mostrará como 'Professor ID: X' si no hay un objeto profesor mapeado en el CourseDto.
              <CursoCard key={curso.id} curso={curso} mostrarBotonCarrito={false} />
          ))}
        </Carousel>
      </section>
  );
};

export default MasVisto;