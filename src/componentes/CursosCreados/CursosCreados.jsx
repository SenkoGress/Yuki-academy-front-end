import React, { useState, useEffect } from 'react'; 
import estilos from './CursosCreados.module.css';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { useAuth } from '../../context/AuthContext.jsx'; 
import { toast } from 'react-toastify'; 

const API_BASE_URL = 'http://localhost:8081/api';

const CursosCreados = () => {
    const { user, isLoggedIn, loading: authLoading } = useAuth(); 
    const navigate = useNavigate(); 

    const [profesorCourses, setProfesorCourses] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProfesorCourses = async () => {

            if (authLoading) {
                return;
            }


            if (!isLoggedIn || !user || !user.token || !user.id) {
                setError("No autorizado. Inicia sesión para ver tus cursos creados.");
                setLoading(false);
                toast.error("Por favor, inicia sesión para ver tus cursos.");
                navigate('/login'); 
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${API_BASE_URL}/courses/my-courses`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}` 
                    }
                });

                setProfesorCourses(response.data); 
                toast.success("Tus cursos han sido cargados exitosamente.");

            } catch (err) {
                console.error('Error al cargar los cursos del profesor:', err.response?.data || err.message);
                setError("Error al cargar tus cursos. Intenta de nuevo.");
                toast.error("Error al cargar tus cursos.");
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    navigate('/login');
                }
            } finally {
                setLoading(false); 
            }
        };

        fetchProfesorCourses();
    }, [isLoggedIn, user, authLoading, navigate]); 


    if (loading) {
        return (
            <section className={estilos.seccion}>
                <h2 className={estilos.tituloSeccion}>Tus Cursos Creados</h2>
                <p>Cargando tus cursos...</p>
            </section>
        );
    }

    // Mostrar mensaje de error
    if (error) {
        return (
            <section className={estilos.seccion}>
                <h2 className={estilos.tituloSeccion}>Tus Cursos Creados</h2>
                <p className={estilos.mensajeError}>{error}</p>
            </section>
        );
    }

    // Mostrar mensaje si no hay cursos creados
    if (profesorCourses.length === 0) {
        return (
            <section className={estilos.seccion}>
                <h2 className={estilos.tituloSeccion}>Tus Cursos Creados</h2>
                <p>Aún no has creado ningún curso. <Link to="/panel-profesor/crear-curso">¡Crea tu primer curso ahora!</Link></p>
            </section>
        );
    }

    // Renderizar la lista de cursos si se han cargado y existen
    return (
        <section className={estilos.seccion}>
            <h2 className={estilos.tituloSeccion}>Tus Cursos Creados</h2>
            <div className={estilos.listaCursos}>
                {profesorCourses.map(curso => (
                    <div key={curso.id} className={estilos.card}>
                        <img src={curso.imageUrl} alt={`Imagen de ${curso.title}`} className={estilos.imagen} />
                        <div className={estilos.info}>
                            <h4 className={estilos.titulo}>{curso.title}</h4> 
                            <p className={estilos.estadisticas}>0 Estudiantes • Publicado</p>
                            <div className={estilos.acciones}>
                                <Link to={`/panel-profesor/editar-curso/${curso.id}`} className={estilos.botonEditar}>
                                    Editar Curso
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CursosCreados;