import React, { useState } from 'react';
import estilos from './TerminosInstructor.module.css';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook 'useNavigate'

const TerminosInstructor = () => {
  const [aceptado, setAceptado] = useState(false);
  const navigate = useNavigate(); // 2. Obtenemos la función de navegación

  const handleAceptarTerminos = () => {
    if (aceptado) {
      // En una aplicación real, aquí se llamaría al back-end para cambiar el rol.
      alert('¡Felicidades! Has aceptado los términos. Serás redirigido a tu panel.');
      
      // 3. Después de la alerta, le decimos a la app que navegue al panel del profesor.
      navigate('/panel-profesor');
    }
  };

  return (
    <div className={estilos.paginaContenedor}>
      <div className={estilos.cajaTerminos}>
        <h1 className={estilos.titulo}>Conviértete en Instructor de Yuki</h1>
        <p className={estilos.subtitulo}>Revisa y acepta nuestros términos para empezar a crear y vender tus cursos.</p>
        <div className={estilos.textoTerminos}>
          <h4>1. Acuerdo de Servicio</h4>
          <p>Este es un acuerdo legalmente vinculante...</p>
          <h4>2. Publicación de Contenido</h4>
          <p>El Instructor es el único responsable de todo el contenido que publica...</p>
        </div>
        <div className={estilos.areaConfirmacion}>
          <label>
            <input 
              type="checkbox"
              checked={aceptado}
              onChange={(e) => setAceptado(e.target.checked)}
            />
            He leído y acepto los términos y condiciones.
          </label>
        </div>
        <button 
          className={estilos.botonAceptar} 
          onClick={handleAceptarTerminos}
          disabled={!aceptado}
        >
          Aceptar y Continuar
        </button>
      </div>
    </div>
  );
};

export default TerminosInstructor;