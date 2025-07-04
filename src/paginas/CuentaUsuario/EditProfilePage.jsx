// src/paginas/CuentaUsuario/EditProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './EditProfilePage.module.css';

const API_BASE_URL = 'http://localhost:8081/api';

const EditProfilePage = () => {
    const { user, isLoggedIn, updateUserInContext } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('Necesitas iniciar sesión para editar tu perfil.');
            navigate('/login');
            return;
        }

        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const userData = response.data;
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
                setBio(userData.bio || '');
                setProfilePictureUrl(userData.profilePictureUrl || '');
            } catch (err) {
                console.error('Error al cargar el perfil:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Error al cargar el perfil. Intenta de nuevo.');
                toast.error(err.response?.data?.message || 'Error al cargar el perfil.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserProfile();
        }

    }, [isLoggedIn, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        if (!firstName || !lastName) {
            setError('Nombre y apellido son obligatorios.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await axios.put(
                `${API_BASE_URL}/users/profile`,
                { firstName, lastName, bio, profilePictureUrl },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );
            updateUserInContext(response.data);
            toast.success('Perfil actualizado con éxito!');
            navigate('/cuenta'); // <-- ¡RUTA CORREGIDA AQUÍ!
        } catch (err) {
            console.error('Error al actualizar perfil:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error al actualizar perfil. Intenta de nuevo.');
            toast.error(err.response?.data?.message || 'Error al actualizar perfil.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className={estilos.contenedorCarga}>Cargando perfil...</div>;
    }

    return (
        <div className={estilos.contenedorEditarPerfil}>
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={submitting}
                    />
                </div>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={submitting}
                    />
                </div>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="bio">Biografía:</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength="500"
                        disabled={submitting}
                    ></textarea>
                    <small>Máximo 500 caracteres.</small>
                </div>
                <div className={estilos.grupoFormulario}>
                    <label htmlFor="profilePictureUrl">URL de Imagen de Perfil:</label>
                    <input
                        type="url"
                        id="profilePictureUrl"
                        value={profilePictureUrl}
                        onChange={(e) => setProfilePictureUrl(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {error && <p className={estilos.mensajeError}>{error}</p>}
                <button type="submit" className={estilos.botonEnviar} disabled={submitting}>
                    {submitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link> {/* <-- ¡RUTA CORREGIDA AQUÍ! */}
        </div>
    );
};

export default EditProfilePage;
