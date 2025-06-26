import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom'; // Importa Link
import estilos from './PerfilUsuario.module.css'; // Asegúrate de crear este CSS

const PerfilUsuario = () => {
    const { user, isLoggedIn } = useAuth();

    // Si no está logeado, redirige o muestra un mensaje
    if (!isLoggedIn) {
        return (
            <div className={estilos.contenedorMensaje}>
                <h2>Acceso denegado</h2>
                <p>Por favor, inicia sesión para ver tu perfil.</p>
                <Link to="/login" className={estilos.botonLogin}>Ir a Iniciar Sesión</Link>
            </div>
        );
    }

    return (
        <div className={estilos.contenedorPerfil}>
            <h1>Perfil de Usuario</h1>
            {user ? (
                <div className={estilos.datosPerfil}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Roles:</strong> {user.roles ? user.roles.join(', ') : 'N/A'}</p>
                    {/* Puedes añadir más campos del perfil aquí */}
                    <button className={estilos.botonEditar}>Editar Perfil</button>
                </div>
            ) : (
                <p>Cargando datos del perfil...</p>
            )}
        </div>
    );
};

export default PerfilUsuario;