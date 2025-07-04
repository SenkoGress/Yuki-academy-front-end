// src/componentes/CursosDestacados/CursosDestacados.jsx

// Importaciones necesarias para React, peticiones HTTP, estilos y el componente CursoCard
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import estilos from './CursosDestacados.module.css';
import CursoCard from '../CursoCard/CursoCard.jsx';

// URL base para el endpoint de cursos en tu backend Spring Boot
const API_BASE_URL = 'http://localhost:8081/api/courses';

// --- ¡¡¡IMPORTANTE!!! DEFINE AQUÍ LOS IDs REALES DE TUS CURSOS EN LA BASE DE DATOS ---
// Confirma estos IDs en tu base de datos Oracle con: SELECT ID, TITLE FROM COURSES;
// ID del curso "Curso de Genexus con ChatGPT-4" (DB ID: 2)
const ID_CURSO_GENEXUS = 2;

// ID del curso "Introducción a la Programación con Python" (DB ID: 1)
const ID_CURSO_PYTHON = 1;


const CursosDestacados = () => {
    // Estado para almacenar la lista de cursos obtenida del backend
    const [cursos, setCursos] = useState([]);
    // Estado para controlar el indicador de carga mientras se obtienen los datos
    const [loading, setLoading] = useState(true);
    // Estado para almacenar mensajes de error, si la petición falla
    const [error, setError] = useState(null);

    // Definición de las pestañas para filtrar los cursos por nivel.
    const pestañas = ['ALL_LEVELS', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    // Estado para controlar qué pestaña de filtro está activa por defecto
    const [pestañaActiva, setPestañaActiva] = useState('ALL_LEVELS');

    // Hook useEffect para realizar la petición HTTP al backend cuando el componente se monta
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true); // Activa el estado de carga al inicio de la petición
                setError(null);    // Limpia cualquier mensaje de error anterior

                // Realiza la petición GET al endpoint de cursos de tu backend
                const response = await axios.get(API_BASE_URL);

                // Almacena los cursos recibidos directamente del backend en el estado.
                // La lógica de redirección se manejará cuando se renderice cada CursoCard.
                setCursos(response.data);
                setLoading(false); // Desactiva el estado de carga
            } catch (err) {
                console.error("Error al obtener los cursos:", err); // Muestra el error en la consola
                setError("No se pudieron cargar los cursos. Inténtalo de nuevo más tarde."); // Mensaje amigable para el usuario
                setLoading(false); // Desactiva la carga incluso si hay error
            }
        };

        fetchCourses(); // Llama a la función de obtención de cursos
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

    // Lógica para filtrar los cursos mostrados según la pestaña activa.
    // Si la pestaña activa es 'ALL_LEVELS', se muestran todos los cursos.
    // De lo contrario, se filtran por el 'level' del curso que coincide con la pestaña activa.
    const cursosFiltrados = cursos.filter(curso => {
        if (pestañaActiva === 'ALL_LEVELS') {
            return true;
        }
        return curso.level === pestañaActiva;
    });

    // Renderizado condicional basado en el estado de carga
    if (loading) {
        return (
            <section className={estilos.contenedorPrincipal}>
                <p className={estilos.mensajeEstado}>Cargando cursos disponibles...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={estilos.contenedorPrincipal}>
                <p className={estilos.mensajeEstadoError}>{error}</p>
            </section>
        );
    }

    return (
        <section className={estilos.contenedorPrincipal}>
            <div className={estilos.cabecera}>
                <h1>Te presentamos los cursos disponibles</h1>
                <p>Aquí encontrarás todos los cursos que te ayudarán a mejorar.</p>
            </div>

            <div className={estilos.navegacionPestañas}>
                {/* Mapea las pestañas para crear botones de filtro */}
                {pestañas.map(pestaña => (
                    <button
                        key={pestaña} // Clave única para cada botón
                        // Aplica estilos diferentes si la pestaña está activa
                        className={pestaña === pestañaActiva ? estilos.pestañaActiva : estilos.pestaña}
                        // Cambia la pestaña activa al hacer clic
                        onClick={() => setPestañaActiva(pestaña)}
                    >
                        {/* Texto amigable para cada pestaña */}
                        {pestaña === 'ALL_LEVELS' ? 'Todos' :
                            pestaña === 'BEGINNER' ? 'Principiante' :
                                pestaña === 'INTERMEDIATE' ? 'Intermedio' :
                                    pestaña === 'ADVANCED' ? 'Avanzado' :
                                        pestaña}
                    </button>
                ))}
            </div>

            <div className={estilos.cuadriculaCursos}>
                {/* Renderizado condicional si no hay cursos filtrados disponibles. */}
                {cursosFiltrados.length === 0 ? (
                    <p className={estilos.mensajeEstado}>No hay cursos disponibles en esta categoría.</p>
                ) : (
                    // Mapea los cursos filtrados para renderizar un CursoCard para cada uno.
                    cursosFiltrados.map(curso => {
                        // --- LÓGICA CLAVE: Si el curso es Python (ID 1), redirige a /cursos/2 (el ID de Genexus) ---
                        // Para todos los demás cursos (incluido Genexus ID 2), no se fuerza la redirección.
                        const customLinkPath = curso.id === ID_CURSO_PYTHON ? `/cursos/${ID_CURSO_GENEXUS}` : null;

                        return (
                            // Pasa la prop 'forceRedirectTo' al CursoCard.
                            // Si customLinkPath no es nulo, CursoCard usará esa ruta para el enlace.
                            // La 'key' debe seguir siendo el ID real y único del curso para React.
                            <CursoCard
                                key={curso.id}
                                curso={curso}
                                forceRedirectTo={customLinkPath} // Pasa la redirección forzada
                            />
                        );
                    })
                )}
            </div>

            {/* Botón opcional para mostrar todos los cursos, visible solo si no estás en la pestaña "Todos". */}
            {pestañaActiva !== 'ALL_LEVELS' && (
                <button
                    className={estilos.botonMostrarTodos}
                    onClick={() => setPestañaActiva('ALL_LEVELS')} // Al hacer clic, cambia a la pestaña "Todos los niveles"
                >
                    Mostrar todos los cursos
                </button>
            )}
        </section>
    );
};

export default CursosDestacados;
