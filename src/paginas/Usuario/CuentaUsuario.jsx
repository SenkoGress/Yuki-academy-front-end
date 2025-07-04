// src/paginas/CuentaUsuario/CuentaUsuario.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate
import axios from 'axios'; // Importa axios
import { toast } from 'react-toastify'; // Importa toast
import estilos from './CuentaUsuario.module.css'; // Asegúrate de crear este CSS

const API_BASE_URL = 'http://localhost:8081/api';

const CuentaUsuario = () => {
    const { user, isLoggedIn, logout } = useAuth(); // También obtenemos `logout` para eliminar cuenta
    const navigate = useNavigate(); // Hook para la navegación programática

    const [loading, setLoading] = useState(false); // Para el estado de la UI (eliminar cuenta)
    const [error, setError] = useState(null); // Para errores específicos de eliminar cuenta
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Estado para el modal de confirmación

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

    // Funciones para manejar las acciones de los botones (principalmente navegación)

    const handleDeleteAccount = async () => {
        if (!user || !user.token || !user.id) {
            setError("No se pudo eliminar la cuenta: Token o ID de usuario no disponible.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            toast.success(response.data.message || '¡Cuenta eliminada exitosamente!');
            logout(); // Cierra la sesión del usuario después de eliminar la cuenta
            navigate('/'); // Redirige a la página de inicio
        } catch (err) {
            console.error("Error al eliminar la cuenta:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Error al eliminar la cuenta. Intenta de nuevo.");
            toast.error(err.response?.data?.message || "Error al eliminar la cuenta.");
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false); // Cierra el modal de confirmación
        }
    };

    return (
        <div className={estilos.contenedorCuenta}>
            <h1>Configuración de la Cuenta</h1>
            {user ? (
                <div className={estilos.seccionesCuenta}>
                    <div className={estilos.seccion}>
                        <h3>Información General</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                        <Link to="/cuenta/cambiar-contrasena" className={estilos.botonGestion}> {/* <-- ¡RUTA CORREGIDA! */}
                            Cambiar Contraseña
                        </Link>
                        <Link to="/cuenta/editar-perfil" className={estilos.botonGestion}> {/* <-- ¡RUTA CORREGIDA! */}
                            Actualizar Información
                        </Link>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Suscripción y Pagos</h3>
                        <p>Gestiona tus planes de suscripción y métodos de pago.</p>
                        <Link to="/cuenta/historial-pagos" className={estilos.botonGestion}> {/* <-- ¡RUTA CORREGIDA! */}
                            Ver Historial de Pagos
                        </Link>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Preferencias</h3>
                        <p>Configura tus preferencias de notificación y privacidad.</p>
                        <Link to="/cuenta/ajustes-privacidad" className={estilos.botonGestion}> {/* <-- ¡RUTA CORREGIDA! */}
                            Ajustes de Privacidad
                        </Link>
                    </div>
                    <div className={estilos.seccion}>
                        <h3>Eliminar Cuenta</h3>
                        <p>Si deseas eliminar tu cuenta, ten en cuenta que esta acción es irreversible.</p>
                        <button
                            className={`${estilos.botonGestion} ${estilos.botonPeligro}`}
                            onClick={() => setShowDeleteConfirm(true)} // Muestra el modal de confirmación
                            disabled={loading}
                        >
                            Eliminar Cuenta
                        </button>
                    </div>
                </div>
            ) : (
                <p>Cargando opciones de cuenta...</p>
            )}

            {loading && <p className={estilos.loadingMessage}>Procesando...</p>}
            {error && <p className={estilos.errorMessage}>{error}</p>}

            {/* Modal de Confirmación para Eliminar Cuenta */}
            {showDeleteConfirm && (
                <div className={estilos.modalOverlay}>
                    <div className={estilos.modalContent}>
                        <h2>Confirmar Eliminación de Cuenta</h2>
                        <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se perderán todos tus datos asociados.</p>
                        <div className={estilos.modalActions}>
                            <button
                                className={`${estilos.botonGestion} ${estilos.botonPeligro}`}
                                onClick={handleDeleteAccount}
                                disabled={loading}
                            >
                                Sí, Eliminar Cuenta
                            </button>
                            <button
                                className={estilos.botonGestion}
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CuentaUsuario;
