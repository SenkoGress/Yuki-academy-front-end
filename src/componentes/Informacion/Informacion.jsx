import React from 'react';
import estilos from './Informacion.module.css';

const urlImagenInformatica = 'https://traine.com.br/wp-content/uploads/2021/07/curso-de-informatica-5-motivos-para-voce-se-matricular.jpg';

const Informacion = () => {
  return (
    <section className={estilos.seccionInformacion}>
      <div className={estilos.contenedorTexto}>
        <h2 className={estilos.tituloPrincipal}>Aprendizaje que se adapta a ti</h2>
        <div className={estilos.bloque}>
          <h3 className={estilos.tituloBloque}>Formación práctica</h3>
          <p className={estilos.descripcionBloque}>
            Desarrolla eficazmente tus habilidades con ejercicios de codificación basados en IA, exámenes de prueba y cuestionarios.
          </p>
        </div>

        <div className={estilos.bloque}>
          <h3 className={estilos.tituloBloque}>Preparación para certificaciones</h3>
          <p className={estilos.descripcionBloque}>
            Prepárate para obtener certificaciones reconocidas en el sector resolviendo desafíos reales y consigue insignias durante el proceso.
          </p>
        </div>

        <div className={estilos.bloque}>
          <h3 className={estilos.tituloBloque}>Contenido personalizable <span className={estilos.etiqueta}>Plan Enterprise</span></h3>
          <p className={estilos.descripcionBloque}>
            Crea vías de aprendizaje personalizadas para los objetivos de tu equipo y organización con tus propios recursos.
          </p>
        </div>
      </div>
      <div className={estilos.contenedorImagen}>
        <img src={urlImagenInformatica} alt="Informacion" className={estilos.imagen} />
      </div>
    </section>
  );
};

export default Informacion;