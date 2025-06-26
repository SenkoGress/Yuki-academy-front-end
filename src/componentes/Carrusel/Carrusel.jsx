import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import estilos from './Carrusel.module.css';


import imagenSkin1 from '../../assets/skin.jpg';
import imagenSkin2 from '../../assets/skin1.jpg';


const Carrusel = () => {
  return (

    <div className={estilos.heroContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        showArrows={true}
      >
        <div className={estilos.slide}>
          <img src={imagenSkin1} alt="Promoción 1" />
          <div className={estilos.textBox}>
            <h1>Habilidades que te ayudan a avanzar</h1>
            <p>
              Aca podras encontras los mejores cursos para aprender y mejorar tus habilidades.
            </p>
            <div className={estilos.buttonGroup}>
              <button className={estilos.btnPrincipal}>Cursos</button>
              <button className={estilos.btnSecundario}>Conoce Mas</button>
            </div>
          </div>
        </div>

        <div className={estilos.slide}>
          <img src={imagenSkin2} alt="Promoción 2" />
          <div className={estilos.textBox}>
            <h1>Descubre tu potencial</h1>
            <p>
              Nuevos cursos y herramientas para que lleves tu carrera profesional al siguiente nivel.
            </p>
            <div className={estilos.buttonGroup}>
              <button className={estilos.btnPrincipal}>Explorar Cursos</button>
              <button className={estilos.btnSecundario}>Conoce Mas</button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};


export default Carrusel;