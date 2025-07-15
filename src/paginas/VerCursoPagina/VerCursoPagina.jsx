import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import estilos from './VerCursoPagina.module.css';
import { FiPlayCircle, FiFileText, FiCheckSquare, FiArrowLeft } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:8081/api';

const VerCursoPagina = () => {
    const { cursoId } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();

    const [curso, setCurso] = useState(null);
    const [leccionActual, setLeccionActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCursoYVerificarAcceso = async () => {
            if (!isLoggedIn) {
                setError("Debes iniciar sesión para ver este curso.");
                setLoading(false);
                return;
            }

            try {
                // 1. Obtener los detalles del curso
                const responseCurso = await axios.get(`${API_BASE_URL}/courses/${cursoId}`);
                const cursoData = responseCurso.data;
                setCurso(cursoData);

                // 2. Verificar si el usuario tiene acceso (es profesor o lo ha comprado)
                const esProfesor = cursoData.professorId === user.id;

                const responseCursosComprados = await axios.get(`${API_BASE_URL}/users/${user.id}/purchased-courses`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const yaComprado = responseCursosComprados.data.some(c => c.id === parseInt(cursoId));

                if (!esProfesor && !yaComprado) {
                    setError("No tienes acceso a este curso.");
                    setLoading(false);
                    return;
                }

                // 3. Si tiene acceso, establecer la primera lección como la actual
                if (cursoData.sections && cursoData.sections[0] && cursoData.sections[0].lessons && cursoData.sections[0].lessons[0]) {
                    setLeccionActual(cursoData.sections[0].lessons[0]);
                }

            } catch (err) {
                console.error("Error al cargar el contenido del curso:", err);
                setError("No se pudo cargar el contenido del curso.");
            } finally {
                setLoading(false);
            }
        };

        fetchCursoYVerificarAcceso();
    }, [cursoId, isLoggedIn, user, navigate]);

    if (loading) {
        return <div className={estilos.contenedorCarga}>Cargando curso...</div>;
    }

    if (error) {
        return <div className={estilos.contenedorError}>{error}</div>;
    }

    if (!curso) {
        return <div>Curso no encontrado.</div>;
    }

    const renderContenidoLeccion = () => {
        if (!leccionActual) {
            return (
                <div className={estilos.contenidoVacio}>
                    <h2>¡Bienvenido a {curso.title}!</h2>
                    <p>Selecciona una lección de la barra lateral para comenzar a aprender.</p>
                </div>
            );
        }

        switch (leccionActual.contentType) {
            case 'VIDEO':
                return (
                    <div className={estilos.reproductorVideo}>
                        <iframe
                            src={leccionActual.videoUrl}
                            title={leccionActual.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            case 'ARTICLE':
                return (
                    <div className={estilos.contenidoArticulo}
                         dangerouslySetInnerHTML={{ __html: leccionActual.articleContent }}
                    />
                );
            default:
                return <p>Contenido no disponible o tipo no reconocido.</p>;
        }
    };

    return (
        <div className={estilos.paginaCurso}>
            <aside className={estilos.sidebar}>
                <Link to={`/cursos/${curso.id}`} className={estilos.enlaceVolver}>
                    <FiArrowLeft /> Volver a la página del curso
                </Link>
                <h3 className={estilos.tituloSidebar}>{curso.title}</h3>
                <nav className={estilos.navegacionCurso}>
                    {curso.sections.map((section) => (
                        <div key={section.id || section.title} className={estilos.seccion}>
                            <h4>{section.title}</h4>
                            <ul>
                                {section.lessons.map(lesson => (
                                    <li
                                        key={lesson.id || lesson.title}
                                        className={`${estilos.leccionItem} ${leccionActual?.id === lesson.id ? estilos.activo : ''}`}
                                        onClick={() => setLeccionActual(lesson)}
                                    >
                                        {lesson.contentType === 'VIDEO' ? <FiPlayCircle /> : <FiFileText />}
                                        <span>{lesson.title}</span>
                                        <FiCheckSquare className={estilos.iconoCompletado} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>

            <main className={estilos.contenidoPrincipal}>
                <header className={estilos.cabeceraContenido}>
                    <h2>{leccionActual?.title || 'Selecciona una lección'}</h2>
                </header>
                <div className={estilos.areaContenido}>
                    {renderContenidoLeccion()}
                </div>
            </main>
        </div>
    );
};

export default VerCursoPagina;