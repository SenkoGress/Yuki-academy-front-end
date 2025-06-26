import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './Login.module.css';
import logoYuki from '../../assets/yuki.png';
import { useAuth } from '../../context/AuthContext.jsx'; // Importa useAuth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

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
        // Llama a la función login del AuthContext para guardar la sesión
        login(data.token, data.id, data.email, data.firstName, data.lastName, data.roles);

        alert('¡Inicio de sesión exitoso!');
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
        setError(errorMessage);
        console.error('Error del backend:', data);
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
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