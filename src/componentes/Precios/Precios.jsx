import React from 'react';
import estilos from './Precios.module.css';
import PlanPrecios from '../PlanPrecios/PlanPrecios.jsx';


const profesoresDestacados = [
  {
    id: 1,
    nombre: 'Juan Carlos Bodoque',
    titulo: 'Experto en Periodismo Investigativo',
    imagen: 'https://i.pinimg.com/736x/f5/04/24/f504246d7f9ffe6aa412a15d7bc33fb2.jpg',
    cursos: ['La Nota Verde 101', 'Entrevistas de Alto Riesgo', 'Ecología para Dummies'],
    precioTotal: 'Pack por 35.000 CLPs'
  },
  {
    id: 2,
    nombre: 'Gwen',
    titulo: 'Maestra de las Artes Místicas y Costura',
    imagen: 'https://pm1.aminoapps.com/7879/c6719293c21b3c190db09a9f6b8947b92b02d73er1-300-300v2_hq.jpg',
    cursos: ['Técnicas de Corte y Confección', 'Hechizos de Protección Textil', 'Invocación de Niebla Sagrada'],
    precioTotal: 'Pack por 50.000 CLPs'
  },
  {
    id: 3,
    nombre: 'Satoru Gojo',
    titulo: 'Hechicero de Grado Especial',
    imagen: 'https://senpaitv.com/wp-content/uploads/2023/12/gojo-satoru.webp',
    cursos: ['Introducción a los Seis Ojos', 'Expansión de Dominio: Vacío Infinito', 'Control de Energía Maldita'],
    precioTotal: 'Pack por 69.000 CLPs'
  }
];

const Precios = () => {
  return (
    <section className={estilos.seccionPrecios}>
      <div className={estilos.cabecera}>
        <h2 className={estilos.titulo}>packs de nuestros mejores profesores</h2>
        <p className={estilos.subtitulo}>
          Aprende de los mejores expertos en cada campo. Revisa los packs de cursos que han preparado para ti.
        </p>
      </div>
      <div className={estilos.contenedorPlanes}>
        {profesoresDestacados.map(profesor => (
          <PlanPrecios key={profesor.id} profesor={profesor} />
        ))}
      </div>
    </section>
  );
};

export default Precios;