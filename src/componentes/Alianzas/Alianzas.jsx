import React from 'react';
import Marquee from "react-fast-marquee"; 
import estilos from './Alianzas.module.css';



const alianzasLogos = [
  {
    id: 1,
    src: 'https://yukidt.com/wp-content/uploads/2025/01/8.png',
    alt: 'Logo1' 
  },
  {
    id: 2,
    src: 'https://yukidt.com/wp-content/uploads/2025/01/partner-logo.png',
    alt: 'Logo2'
  },
  {
    id: 3,
    src: 'https://yukidt.com/wp-content/uploads/2024/11/cropped-Logo-HC.png',
    alt: 'Logo3'
  },
  {
    id: 4,
    src: 'https://yukidt.com/wp-content/uploads/2024/11/logo-color.png',
    alt: 'Logo4'
  },
  {
    id: 5,
    src: 'https://yukidt.com/wp-content/uploads/2025/01/Imagen-de-WhatsApp-2025-01-10-a-las-14.56.23_ac16004f.jpg',
    alt: 'Logo5'
  },
];

const Alianzas = () => {
  return (
    <section className={estilos.seccionAlianzas}>
      <h2 className={estilos.titulo}>Empresas que confían en nosotros</h2>
      <div className={estilos.contenedorMarquee}>
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
        >
          {alianzasLogos.map(logo => (
            <div key={logo.id} className={estilos.contenedorLogo}>
              <img src={logo.src} alt={logo.alt} className={estilos.logoImagen} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Alianzas;