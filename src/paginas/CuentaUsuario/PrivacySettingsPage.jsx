// src/paginas/CuentaUsuario/PrivacySettingsPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './PrivacySettingsPage.module.css';

const API_BASE_URL = 'http://localhost:8081/api';

const PrivacySettingsPage = () => {
    const { user, isLoggedIn, loading: authLoading } = useAuth(); // Obtén el estado de carga del AuthContext
    const navigate = useNavigate();

    const [receiveEmailNotifications, setReceiveEmailNotifications] = useState(false);
    const [profileVisibleToPublic, setProfileVisibleToPublic] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); // Estado para la carga de los ajustes de privacidad
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Primer useEffect: Maneja la autenticación y la redirección
    useEffect(() => {
        // Espera a que el AuthContext termine de cargar el estado del usuario
        if (authLoading) {
            return;
        }

        // Si el usuario no está logeado después de la carga inicial del AuthContext, redirige
        if (!isLoggedIn) {
            toast.error('Necesitas iniciar sesión para gestionar tu privacidad.');
            navigate('/login');
            return; // No continúa con el resto del useEffect
        }

        // Si está logeado, carga los ajustes de privacidad
        const fetchPrivacySettings = async () => {
            setPageLoading(true); // Inicia la carga de los ajustes de privacidad
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/users/privacy-settings`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const settings = response.data;
                setReceiveEmailNotifications(settings.receiveEmailNotifications || false);
                setProfileVisibleToPublic(settings.profileVisibleToPublic || false);
            } catch (err) {
                console.error('Error al cargar ajustes de privacidad:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Error al cargar ajustes de privacidad.');
                toast.error(err.response?.data?.message || 'Error al cargar ajustes de privacidad.');
            } finally {
                setPageLoading(false); // Finaliza la carga de los ajustes de privacidad
            }
        };

        // Solo carga los ajustes si el usuario y el token están disponibles
        if (user && user.token) {
            fetchPrivacySettings();
        }
    }, [isLoggedIn, navigate, user, authLoading]); // Dependencias: user, isLoggedIn, navigate, authLoading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const response = await axios.put(
                `${API_BASE_URL}/users/privacy-settings`,
                { receiveEmailNotifications, profileVisibleToPublic },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );
            toast.success(response.data.message || 'Ajustes de privacidad actualizados!');
            // No redirigimos aquí para que el usuario pueda ver la confirmación y los cambios reflejados
        } catch (err) {
            console.error('Error al actualizar ajustes de privacidad:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error al actualizar ajustes de privacidad. Intenta de nuevo.');
            toast.error(err.response?.data?.message || 'Error al actualizar ajustes de privacidad.');
        } finally {
            setSubmitting(false);
        }
    };

    // Muestra un mensaje de carga mientras se obtienen los datos o se verifica la autenticación
    if (pageLoading || authLoading) {
        return <div className={estilos.contenedorCarga}>Cargando ajustes de privacidad...</div>;
    }

    return (
        <div className={estilos.contenedorPrivacidad}>
            <h1>Ajustes de Privacidad</h1>
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                <div className={estilos.grupoToggle}>
                    <label htmlFor="emailNotifications">Recibir notificaciones por correo electrónico:</label>
                    <input
                        type="checkbox"
                        id="emailNotifications"
                        checked={receiveEmailNotifications}
                        onChange={(e) => setReceiveEmailNotifications(e.target.checked)}
                        disabled={submitting}
                        className={estilos.toggleSwitch}
                    />
                </div>
                <div className={estilos.grupoToggle}>
                    <label htmlFor="profileVisibility">Hacer mi perfil visible públicamente:</label>
                    <input
                        type="checkbox"
                        id="profileVisibility"
                        checked={profileVisibleToPublic}
                        onChange={(e) => setProfileVisibleToPublic(e.target.checked)}
                        disabled={submitting}
                        className={estilos.toggleSwitch}
                    />
                </div>

                {error && <p className={estilos.mensajeError}>{error}</p>}
                <button type="submit" className={estilos.botonEnviar} disabled={submitting}>
                    {submitting ? 'Guardando...' : 'Guardar Ajustes'}
                </button>
            </form>
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link>
        </div>
    );
};

export default PrivacySettingsPage;
