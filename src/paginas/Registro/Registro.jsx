import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './Registro.module.css'; // Asegúrate de que esta ruta sea correcta
import logoYuki from '../../assets/yuki.png'; // Asegúrate de que esta ruta sea correcta
import { useAuth } from '../../context/AuthContext.jsx'; // Asegúrate de que esta ruta sea correcta

const Registro = () => {
  // CAMBIO CLAVE: Separar 'nombre' en 'firstName' y añadir 'lastName'
  const [firstName, setFirstName] = useState(''); // Estado para el nombre
  const [lastName, setLastName] = useState('');   // <-- Nuevo estado para el apellido
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Mensaje de éxito o informativo
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    setMessage(''); // Limpiar mensajes previos
    setLoading(true); // Activar estado de carga

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName, // Envía el campo 'firstName'
          lastName: lastName,   // <-- Envía el nuevo campo 'lastName'
          email,
          password,
        }),
      });

      const data = await response.json(); // Parsear la respuesta JSON

      if (response.ok) {
        // Asumiendo que el backend ahora devuelve el token y los datos de usuario en 'data'
        login(data.token, data.id, data.email, data.firstName, data.lastName, data.roles);

        setMessage('¡Registro exitoso! Serás redirigido al dashboard.'); // Mensaje de éxito
        setTimeout(() => { // Esperar un momento antes de redirigir
          navigate('/dashboard'); // Redirige al usuario al dashboard
        }, 1500); // Redirigir después de 1.5 segundos
      } else {
        // Manejo de errores de la API del backend
        let errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo.';
        if (data && data.message) {
          errorMessage = data.message; // Mensaje de error general del backend
        } else if (data && data.errors && Array.isArray(data.errors)) {
          // Si el backend envía errores de validación específicos (ej. por @Valid)
          errorMessage = data.errors
              .map((err) => err.defaultMessage || err.message || (err.field ? `${err.field}: ${err.code}` : ''))
              .filter(Boolean)
              .join('. ');
        } else if (data && Object.keys(data).length > 0) {
          // Si hay un objeto de error no estructurado
          errorMessage = Object.values(data).join('. ');
        }
        setError(errorMessage);
        console.error('Error del backend:', data);
      }
    } catch (err) {
      // Manejo de errores de red o del servidor (ej. backend no accesible)
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      console.error('Error de red o del servidor:', err);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
      <div className={estilos.paginaRegistro}>
        <div className={estilos.formContainer}>
          <img src={logoYuki} alt="Logo de Yuki" className={estilos.logo} />
          <h2>Crea tu cuenta de Yuki</h2>

          <form onSubmit={handleSubmit}>
            {/* Mostrar mensajes de error o éxito */}
            {error && <p className={estilos.errorMessage}>{error}</p>}
            {message && <p className={estilos.successMessage}>{message}</p>} {/* Nuevo para mensajes de éxito */}

            <div className={estilos.campo}>
              <label htmlFor="firstName">Nombre</label> {/* CAMBIO CLAVE: Label a 'Nombre' */}
              <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className={estilos.campo}>
              <label htmlFor="lastName">Apellidos</label> {/* <-- Nuevo campo para Apellidos */}
              <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className={estilos.campo}>
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className={estilos.campo}>
              <label htmlFor="password">Contraseña</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className={estilos.campo}>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <button type="submit" className={estilos.botonRegistro} disabled={loading}>
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          <div className={estilos.linksFooter}>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
  );
};

export default Registro;