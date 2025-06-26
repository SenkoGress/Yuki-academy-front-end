import React from 'react';
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';
import estilos from './MasVisto.module.css';
import CursoCard from '../CursoCard/CursoCard.jsx';

const cursosMasVistos = [
  {
    id: 10, 
    titulo: 'Seguridad Informática Práctica',
    instructor: 'ESET Academy',
    rating: '⭐4.7',
    precio: '18.990 CLPs',
    imagen: 'https://web-assets.esetstatic.com/tn/-x700/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg'
  },
  {
    id: 11,
    titulo: 'Desarrollo Web Full Stack Moderno',
    instructor: 'Juan Pablo De la torre',
    rating: '⭐4.9',
    precio: '24.990 CLPs',
    imagen: 'https://d3puay5pkxu9s4.cloudfront.net/courses/12523/img/web/800_imagen.jpg'
  },
  {
    id: 12,
    titulo: 'Introducción a la Computación',
    instructor: 'Aprender21',
    rating: '⭐4.5',
    precio: 'Gratis',
    imagen: 'https://www.aprender21.com.ve/images/colaboradores/cursos-de-computacion1.jpeg'
  },
  {
    id: 13,
    titulo: 'Curso de Informática Básica',
    instructor: 'Headsem',
    rating: '⭐4.6',
    precio: 'Gratis',
    imagen: 'https://www.headsem.com/wp-content/uploads/2018/06/Cursos-de-informatica.jpg'
  },
  {
    id: 14,
    titulo: 'Big Data: Análisis y Procesamiento',
    instructor: 'Data Corp',
    rating: '⭐4.9',
    precio: '35.000 CLPs',
    imagen: 'https://www.headsem.com/wp-content/uploads/2018/06/Big-Data.png'
  },
];

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
  return (
    <section className={estilos.seccionMasVisto}>
      <h2 className={estilos.titulo}>Los Cursos mas vistos</h2>
      <Carousel 
        responsive={responsive}
        infinite={true}
        containerClass={estilos.carouselContainer}
        itemClass={estilos.carouselItem}
      >
        {cursosMasVistos.map(curso => (
          <CursoCard key={curso.id} curso={curso} mostrarBotonCarrito={false} />
        ))}
      </Carousel>
    </section>
  );
};

export default MasVisto;