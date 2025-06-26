import React, { useState } from 'react';
import estilos from './CursosDestacados.module.css';
import CursoCard from '../CursoCard/CursoCard.jsx';

import imagenCurso1 from '../../assets/curso1.webp';
import imagenCurso2 from '../../assets/curso2.webp';
import imagenCurso3 from '../../assets/curso3.jpg';
import imagenCurso4 from '../../assets/curso4.jpg';



const todosLosCursos = [
  {
    id: 1,
    titulo: 'Curso de Genexus con ChatGPT-4',
    instructor: 'Yuki',
    rating: '⭐4.8',
    precio: '2,990 CLPs',
    imagen: imagenCurso1,
    categoria: 'ChatGPT' // a que categoria se mostrara
  },
  {
    id: 2,
    titulo: 'VR con Unity y ChatGPT',
    instructor: 'Yuki',
    rating: '⭐4.9',
    precio: '5,000 CLPs',
    imagen: imagenCurso2,
    categoria: 'VR' // a que categoria se mostrara
  },
  {
    id: 3,
    titulo: 'Python para Ciencia de Datos',
    instructor: 'Yuki Coder',
    rating: '⭐5.0',
    precio: 'Gratis',
    imagen: imagenCurso3,
    categoria: 'Python' // a que categoria se mostrara
  },
  {
    id: 4,
    titulo: 'Fundamentos de Machine Learning',
    instructor: 'Yuki',
    rating: '⭐4.7',
    precio: '14,290 CLPs',
    imagen: imagenCurso4,
    categoria: 'Gwen' // a que categoria se mostrara
  }
];

const CursosDestacados = () => {
  const [pestañaActiva, setPestañaActiva] = useState('ChatGPT');
  const pestañas = ['ChatGPT', 'VR', 'Python', 'Gwen'];


  const cursosFiltrados = todosLosCursos.filter(curso => curso.categoria === pestañaActiva);

  return (
    <section className={estilos.contenedorPrincipal}>
      <div className={estilos.cabecera}>
        <h1>Te presentamos los cursos disponibles</h1>
        <p>Aca encontraras todos los cursos que te ayudaran a mejorar.</p>
      </div>

      <div className={estilos.navegacionPestañas}>
        {pestañas.map(pestaña => (
          <button
            key={pestaña}
            className={pestaña === pestañaActiva ? estilos.pestañaActiva : estilos.pestaña}
            onClick={() => setPestañaActiva(pestaña)}
          >
            {pestaña}
          </button>
        ))}
      </div>

      <div className={estilos.cuadriculaCursos}>
        {cursosFiltrados.map(curso => (
          <CursoCard key={curso.id} curso={curso} />
        ))}

        {cursosFiltrados.length === 0 && <p>Próximamente cursos en esta categoría...</p>}
      </div>

      <button className={estilos.botonMostrarTodos}>Mostrar todos los cursos de {pestañaActiva}</button>
    </section>
  );
};

export default CursosDestacados