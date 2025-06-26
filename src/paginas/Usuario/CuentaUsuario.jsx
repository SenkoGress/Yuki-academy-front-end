import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom'; // Importa Link
import estilos from './CuentaUsuario.module.css'; // Asegúrate de crear este CSS

const CuentaUsuario = () => {
    const { user, isLoggedIn } = useAuth();

    // Si no está logeado, redirige o muestra un mensaje
    if (!isLoggedIn) {
        return (
            <div className={estilos.contenedorMensaje}>
                <h2>Acceso denegado</h2>
                <p>Por favor, inicia sesión para gestionar tu cuenta.</p>
                <Link to="/login" className={estilos.botonLogin}>Ir a Iniciar Sesión</Link>
            </div>
        );
    }

    return (
        <div className={estilos.contenedorCuenta}>
            <h1>Configuración de la Cuenta</h1>
            {user ? (
                <div className={estilos.seccionesCuenta}>
                    <div className={estilos.seccion}>
                        <h3>Información General</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                        <button className={estilos.botonGestion}>Cambiar Contraseña</button>
                        <button className={estilos.botonGestion}>Actualizar Información</button>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Suscripción y Pagos</h3>
                        <p>Gestiona tus planes de suscripción y métodos de pago.</p>
                        <button className={estilos.botonGestion}>Ver Historial de Pagos</button>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Preferencias</h3>
                        <p>Configura tus preferencias de notificación y privacidad.</p>
                        <button className={estilos.botonGestion}>Ajustes de Privacidad</button>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Eliminar Cuenta</h3>
                        <p>Si deseas eliminar tu cuenta, ten en cuenta que esta acción es irreversible.</p>
                        <button className={`${estilos.botonGestion} ${estilos.botonPeligro}`}>Eliminar Cuenta</button>
                    </div>
                </div>
            ) : (
                <p>Cargando opciones de cuenta...</p>
            )}
        </div>
    );
};

export default CuentaUsuario;