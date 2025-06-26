import React from 'react';
import estilos from './MisCursosComprados.module.css';
import CursoCard from '../../componentes/CursoCard/CursoCard.jsx';
import { Link } from 'react-router-dom';

// --- DATOS DE EJEMPLO ---
// En el futuro, estos datos vendrán de una llamada a tu API
const cursosCompradosMock = [
  {
    id: 1,
    titulo: 'Curso de Genexus con ChatGPT-4',
    instructor: 'Yuki',
    rating: '⭐4.8',
    precio: 'Comprado', // No necesitamos el precio aquí
    imagen: 'https://i.ytimg.com/vi/v5t131FvM_k/maxresdefault.jpg',
  },
  {
    id: 4,
    titulo: 'Fundamentos de Machine Learning',
    instructor: 'Yuki',
    rating: '⭐4.7',
    precio: 'Comprado',
    imagen: 'https://www.headsem.com/wp-content/uploads/2018/06/Seguridad-informatica-practica-768x480.png',
  }
];

const MisCursosComprados = () => {
  // En un futuro, aquí harías: const { cursos, loading } = useFetch('/api/mis-cursos-comprados');

  const tieneCursos = cursosCompradosMock.length > 0;

  return (
    <div className={estilos.paginaContenedor}>
      <header className={estilos.cabecera}>
        <h1>Mis Cursos Adquiridos</h1>
        <p>Aquí encontrarás todos los cursos en los que te has inscrito. ¡Sigue aprendiendo!</p>
      </header>
      
      {tieneCursos ? (
        <div className={estilos.cuadriculaCursos}>
          {cursosCompradosMock.map(curso => (
            // Reutilizamos CursoCard, pero ocultamos el botón de "Añadir al carrito"
            <CursoCard key={curso.id} curso={curso} mostrarBotonCarrito={false} />
          ))}
        </div>
      ) : (
        <div className={estilos.sinCursos}>
          <h2>Aún no tienes cursos</h2>
          <p>Parece que todavía no te has inscrito en ningún curso.</p>
          <Link to="/" className={estilos.botonExplorar}>Explorar Cursos</Link>
        </div>
      )}
    </div>
  );
};

export default MisCursosComprados;