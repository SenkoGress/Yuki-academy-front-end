import React from 'react';
import { useParams, Link } from 'react-router-dom'; // 1. Importamos Link
import { todosLosCursos } from '../../data/cursos.js';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx'; // 2. Importamos el hook de autenticación
import estilos from './DetalleCurso.module.css';
import { FiCheckCircle, FiPlayCircle } from 'react-icons/fi'; // Importamos un nuevo ícono

const DetalleCurso = () => {
  const { agregarAlCarrito } = useCarrito();
  const { isLoggedIn, user } = useAuth(); // 3. Obtenemos el estado de login y el usuario
  const { cursoId } = useParams();
  const curso = todosLosCursos.find(c => c.id === parseInt(cursoId));

  // --- LÓGICA DE VERIFICACIÓN ---
  // 4. Simulamos la lista de cursos que el usuario ha comprado.
  // En una aplicación real, esta lista vendría de tu back-end.
  const cursosCompradosPorUsuario = [1, 4]; // Ejemplo: el usuario compró los cursos con ID 1 y 4

  // 5. Verificamos si el curso actual ya fue comprado por el usuario logeado
  const yaComprado = isLoggedIn && cursosCompradosPorUsuario.includes(parseInt(cursoId));
  // --- FIN DE LA LÓGICA ---

  if (!curso) {
    return <div><h2>Curso no encontrado</h2></div>;
  }

  const handleAgregarClick = () => {
    agregarAlCarrito(curso);
  };

  return (
    <div className={estilos.pagina}>
      <header className={estilos.hero}>
        <h1>{curso.titulo}</h1>
        <p className={estilos.descripcion}>{curso.descripcionLarga}</p>
        <p>Creado por: {curso.instructor} | Puntuación: {curso.rating}</p>
      </header>
      
      <main className={estilos.contenidoPrincipal}>
        <div className={estilos.columnaIzquierda}>
          <div className={estilos.cajaTemario}>
            <h2>Temario del curso</h2>
            <ul>
              {curso.temario.map((item, index) => (
                <li key={index}>
                  <FiCheckCircle className={estilos.iconoCheck} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={estilos.columnaDerecha}>
          <div className={estilos.cajaCompra}>
            <img src={curso.imagen} alt={`Imagen de ${curso.titulo}`} className={estilos.imagenCurso} />
            
            {/* --- 6. RENDERIZADO CONDICIONAL --- */}
            {/* Si ya está comprado, muestra el botón para ir al curso */}
            {yaComprado ? (
              <div className={estilos.yaCompradoContenedor}>
                <p>Ya tienes acceso a este curso.</p>
                <Link to={`/ver-curso/${curso.id}`} className={estilos.botonIrCurso}>
                  <FiPlayCircle />
                  <span>Empezar a aprender</span>
                </Link>
              </div>
            ) : (
              // Si no, muestra el precio y el botón para añadir a la cesta
              <>
                <h3 className={estilos.precio}>{curso.precio}</h3>
                <button onClick={handleAgregarClick} className={estilos.botonComprar}>Añadir a la cesta</button>
                <p className={estilos.garantia}>Garantía de reembolso de 30 días</p>
              </>
            )}
            {/* --- FIN DEL RENDERIZADO CONDICIONAL --- */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalleCurso;