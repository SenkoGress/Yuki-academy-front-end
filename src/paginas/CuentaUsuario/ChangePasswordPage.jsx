// src/paginas/CuentaUsuario/ChangePasswordPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './ChangePasswordPage.module.css';

const API_BASE_URL = 'http://localhost:8081/api';

const ChangePasswordPage = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redirige si el usuario no está logeado
    if (!isLoggedIn) {
        toast.error('Necesitas iniciar sesión para cambiar tu contraseña.');
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validaciones básicas en el frontend
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('Las nuevas contraseñas no coinciden.');
            setLoading(false);
            return;
        }
        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `${API_BASE_URL}/users/change-password`,
                { currentPassword, newPassword, confirmNewPassword },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );
            toast.success(response.data.message || 'Contraseña actualizada con éxito!');
            navigate('/cuenta'); // <-- ¡RUTA CORREGIDA AQUÍ! Redirige a la página principal de la cuenta
        } catch (err) {
            console.error('Error al cambiar contraseña:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error al actualizar contraseña. Intenta de nuevo.');
            toast.error(err.response?.data?.message || 'Error al actualizar contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={estilos.contenedorCambiarContrasena}>
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="currentPassword">Contraseña Actual:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                {error && <p className={estilos.mensajeError}>{error}</p>}
                <button type="submit" className={estilos.botonEnviar} disabled={loading}>
                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </button>
            </form>
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link> {/* <-- ¡RUTA CORREGIDA AQUÍ! */}
        </div>
    );
};

export default ChangePasswordPage;
