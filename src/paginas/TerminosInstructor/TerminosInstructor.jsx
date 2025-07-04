// src/paginas/TerminosInstructor/TerminosInstructor.jsx

import React, { useState } from 'react';
import estilos from './TerminosInstructor.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8081/api'; // Asegúrate de que esta URL sea correcta para tu backend

const TerminosInstructor = () => {
  const { user, isLoggedIn, updateUserInContext } = useAuth();
  const navigate = useNavigate();
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Redirección si el usuario no está logeado
  if (!isLoggedIn) {
    toast.error('Necesitas iniciar sesión para acceder a los términos de instructor.');
    navigate('/login');
    return null;
  }

  // Redirección si el usuario ya es profesor (se basa en los roles del contexto)
  // user.roles es un Set<String> del backend, en JS será un Array de Strings.
  // Es crucial que tu backend esté enviando los roles en el UserProfileDto.
  if (user?.roles?.includes('ROLE_PROFESSOR')) {
    toast.info('¡Ya eres un instructor en Yuki Academy!');
    navigate('/panel-profesor'); // O a la página de perfil, según lo que quieras
    return null;
  }

  const handleAceptarTerminos = async () => {
    if (!aceptoTerminos) {
      setError('Debes leer y aceptar los términos y condiciones.');
      return;
    }

    setSubmitting(true); // Deshabilita el botón mientras se envía
    setError(null); // Limpia errores previos

    try {
      // Llamada al backend para cambiar el rol del usuario a profesor
      const response = await axios.put(
          `${API_BASE_URL}/users/become-professor`,
          {}, // Body vacío, el backend obtiene el ID del usuario desde el token JWT
          {
            headers: {
              'Authorization': `Bearer ${user.token}` // Envía el token JWT para autenticación
            }
          }
      );

      // El backend debería devolver el UserProfileDto actualizado (con el nuevo rol)
      const updatedUserData = response.data;
      updateUserInContext(updatedUserData); // Actualiza el contexto global con los nuevos datos del usuario

      toast.success('¡Felicidades! Ahora eres un instructor en Yuki Academy.');
      navigate('/panel-profesor'); // Redirige al panel del profesor
    } catch (err) {
      console.error('Error al aceptar términos y convertir en instructor:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al procesar la solicitud. Intenta de nuevo.');
      toast.error(err.response?.data?.message || 'Error al convertirte en instructor.');
    } finally {
      setSubmitting(false); // Habilita el botón de nuevo
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
            {/* Añade aquí el resto de tus términos y condiciones */}
            <p>3. Yuki Academy se reserva el derecho de revisar y aprobar todos los cursos antes de su publicación.</p>
            <p>4. El instructor mantendrá sus cursos actualizados y responderá a las preguntas de los estudiantes.</p>
            <p>5. Yuki Academy proveerá herramientas de marketing básicas para promover los cursos.</p>
            <p>6. El instructor acepta las políticas de pago y regalías establecidas por Yuki Academy.</p>
            <p>7. La cancelación de la cuenta de instructor requiere un aviso de 30 días.</p>
            <p>8. Cualquier violación a estos términos resultará en la suspensión o terminación de la cuenta de instructor.</p>
            <p>9. Este acuerdo está sujeto a las leyes de [Tu País/Región].</p>
            <p>10. Al hacer clic en "Aceptar y Continuar", usted confirma que ha leído, comprendido y aceptado todos los términos aquí expuestos.</p>
          </div>
          <div className={estilos.areaConfirmacion}>
            <label>
              <input
                  type="checkbox"
                  checked={aceptoTerminos}
                  onChange={(e) => setAceptoTerminos(e.target.checked)}
                  disabled={submitting} // Deshabilita el checkbox mientras se envía
              />
              <span className={estilos.checkmark}></span>
              He leído y acepto los términos y condiciones.
            </label>
          </div>
          {error && <p className={estilos.mensajeError}>{error}</p>} {/* Muestra errores */}
          <button
              className={estilos.botonAceptar}
              onClick={handleAceptarTerminos}
              disabled={!aceptoTerminos || submitting}
          >
            {submitting ? 'Procesando...' : 'Aceptar y Continuar'}
          </button>
          <Link to="/" className={estilos.botonVolver}>Volver al Inicio</Link>
        </div>
      </div>
  );
};

export default TerminosInstructor;