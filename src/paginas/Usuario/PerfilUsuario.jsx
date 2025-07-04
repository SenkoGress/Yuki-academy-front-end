// src/paginas/Usuario/PerfilUsuario.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './PerfilUsuario.module.css';

const PerfilUsuario = () => {
    const { user, isLoggedIn, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        if (authLoading) {
            return;
        }
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        setProfileLoaded(true);
    }, [isLoggedIn, navigate, authLoading]);

    if (!profileLoaded || !user) {
        return <div className={estilos.contenedorCarga}>Cargando perfil...</div>;
    }

    const defaultProfilePicture = 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=Usuario';

    return (
        <div className={estilos.contenedorPerfil}>
            <h1>Perfil de Usuario</h1>
            <div className={estilos.infoPerfil}>
                <div className={estilos.seccionImagen}>
                    <img
                        src={user.profilePictureUrl || defaultProfilePicture}
                        alt="Imagen de Perfil"
                        className={estilos.imagenPerfil}
                        onError={(e) => { e.target.onerror = null; e.target.src=defaultProfilePicture; }}
                    />
                </div>
                <div className={estilos.seccionDetalles}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    {/* LÍNEA PARA MOSTRAR ROLES */}
                    <p>
                        <strong>Roles:</strong>{' '}
                        {user.roles && user.roles.length > 0
                            ? user.roles.map(role => role.replace('ROLE_', '')).join(', ')
                            : 'N/A'
                        }
                    </p>
                    {user.bio && <p><strong>Biografía:</strong> {user.bio}</p>}
                    <Link to="/cuenta/editar-perfil" className={estilos.botonEditar}>Editar Perfil</Link>
                </div>
            </div>
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link>
        </div>
    );
};

export default PerfilUsuario;