// src/paginas/Login/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './Login.module.css';
import logoYuki from '../../assets/yuki.png';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify'; // ¡Importa la función toast!

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(
            data.token,
            data.id,
            data.email,
            data.firstName,
            data.lastName,
            data.roles,
            data.profilePictureUrl,
            data.bio
        );

        // ¡¡¡CAMBIO AQUÍ!!! Reemplazar alert por toast.success
        toast.success('¡Inicio de sesión exitoso!'); // <-- ¡CORREGIDO A TOAST!
        navigate('/dashboard'); // Redirige a la página principal o dashboard
      } else {
        let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        if (data && data.message) {
          errorMessage = data.message;
        } else if (data && data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.map(err => err.defaultMessage || err.message || (err.field ? err.field + ': ' + err.code : '')).filter(Boolean).join('. ');
        } else if (Object.keys(data).length > 0) {
          errorMessage = Object.values(data).join('. ');
        }
        setError(errorMessage); // Para el error en pantalla
        toast.error(errorMessage); // <-- También añadir toast para el error si quieres
        console.error('Error del backend:', data);
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      toast.error('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'); // <-- Toast para error de red
      console.error('Error de red o del servidor:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={estilos.paginaLogin}>
        <div className={estilos.formContainer}>
          <img src={logoYuki} alt="Logo de Yuki" className={estilos.logo} />
          <h2>Iniciar sesión para continuar</h2>

          <form onSubmit={handleSubmit}>
            {/* El mensaje de error en pantalla */}
            {error && <p className={estilos.errorMessage}>{error}</p>}
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
            <button type="submit" className={estilos.botonLogin} disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className={estilos.linksFooter}>
            <Link to="/olvide-password">¿Olvidaste tu contraseña?</Link>
            <span>•</span>
            <Link to="/registro">¿No tienes una cuenta? Regístrate</Link>
          </div>
        </div>
      </div>
  );
};

export default Login;