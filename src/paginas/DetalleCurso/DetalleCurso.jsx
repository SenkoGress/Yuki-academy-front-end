import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Se eliminó 'useNavigate'
import axios from 'axios';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import estilos from './DetalleCurso.module.css';
import { FiCheckCircle, FiPlayCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8081/api';

const DetalleCurso = () => {
  const { agregarAlCarrito } = useCarrito();
  const { isLoggedIn, user, loading: authLoading } = useAuth();
  const { cursoId } = useParams();

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursosCompradosPorUsuario, setCursosCompradosPorUsuario] = useState([]);

  useEffect(() => {
    // Se define la función asíncrona dentro y se llama inmediatamente
    const fetchCursoDetalle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/courses/${cursoId}`);
        setCurso(response.data);
      } catch (err) {
        setError('Error al cargar el curso.');
        console.error('Error al cargar los detalles del curso:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCursoDetalle();
  }, [cursoId]); // 'navigate' eliminado de las dependencias

  useEffect(() => {
    // Se define la función asíncrona dentro y se llama inmediatamente
    const fetchPurchasedCourses = async () => {
      if (authLoading || !isLoggedIn) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${user.id}/purchased-courses`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setCursosCompradosPorUsuario(response.data.map(c => c.id));
      } catch (err) {
        console.error('Error al cargar cursos comprados:', err);
      }
    };

    if (isLoggedIn) {
      fetchPurchasedCourses();
    }
  }, [isLoggedIn, user, authLoading]);

  if (loading) {
    return <div className={estilos.pagina}><p>Cargando...</p></div>;
  }
  if (error) {
    return <div className={estilos.pagina}><p>{error}</p></div>;
  }
  if (!curso) {
    return <div className={estilos.pagina}><p>Curso no encontrado.</p></div>;
  }

  const esProfesorDelCurso = isLoggedIn && user && curso.professorId === user.id;
  const yaComprado = cursosCompradosPorUsuario.includes(parseInt(cursoId));
  const tieneAccesoAlContenido = esProfesorDelCurso || yaComprado;

  const handleAgregarClick = () => {
    agregarAlCarrito(curso);
    toast.success(`${curso.title} añadido a la cesta!`);
  };

  return (
      <div className={estilos.pagina}>
        <header className={estilos.hero}>
          <h1>{curso.title}</h1>
          <p className={estilos.descripcion}>{curso.description}</p>
          <p>Creado por: {curso.professorFirstName} {curso.professorLastName} | Nivel: {curso.level} | Categoría: {curso.category}</p>
        </header>

        <main className={estilos.contenidoPrincipal}>
          <div className={estilos.columnaIzquierda}>
            <div className={estilos.cajaTemario}>
              <h2>Temario del curso</h2>
              {curso.summarySyllabus && curso.summarySyllabus.trim() !== '' ? (
                  <div className={estilos.temarioResumenTexto}>
                    {curso.summarySyllabus.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                        <p key={index}><FiCheckCircle className={estilos.iconoCheck} /> {line}</p>
                    ))}
                  </div>
              ) : (
                  <p>El temario de este curso aún no está disponible.</p>
              )}
            </div>
          </div>
          <div className={estilos.columnaDerecha}>
            <div className={estilos.cajaCompra}>
              <img src={curso.imageUrl} alt={`Imagen de ${curso.title}`} className={estilos.imagenCurso} />
              {curso.isPublished ? (
                  tieneAccesoAlContenido ? (
                      <div className={estilos.yaCompradoContenedor}>
                        <p>{esProfesorDelCurso ? "Eres el profesor de este curso." : "Ya tienes acceso a este curso."}</p>
                        <Link to={`/ver-curso/${curso.id}`} className={estilos.botonIrCurso}>
                          <FiPlayCircle />
                          <span>Empezar a aprender</span>
                        </Link>
                      </div>
                  ) : (
                      <>
                        <h3 className={estilos.precio}>CLP {curso.price}</h3>
                        <button onClick={handleAgregarClick} className={estilos.botonComprar}>Añadir a la cesta</button>
                      </>
                  )
              ) : (
                  <p className={estilos.cursoNoPublicado}>
                    {esProfesorDelCurso ? "Tu curso no está publicado." : "Este curso no está disponible para compra aún."}
                  </p>
              )}
            </div>
          </div>
        </main>
      </div>
  );
};

export default DetalleCurso;