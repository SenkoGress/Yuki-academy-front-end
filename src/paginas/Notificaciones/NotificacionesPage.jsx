import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './NotificacionesPage.module.css';
import { FiEye, FiTrash2 } from 'react-icons/fi'; // Importa solo los iconos necesarios

const API_BASE_URL = 'http://localhost:8081/api';

const NotificacionesPage = () => {
    const { user, isLoggedIn, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            toast.error('Necesitas iniciar sesión para ver tus notificaciones.');
            navigate('/login');
        }
    }, [isLoggedIn, navigate, authLoading]);

    // Cargar notificaciones cuando el usuario está autenticado y tiene un token
    useEffect(() => {
        const fetchNotifications = async () => {
            if (isLoggedIn && user?.token) {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`${API_BASE_URL}/notifications`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });
                    setNotifications(response.data);
                } catch (err) {
                    console.error('Error al cargar notificaciones:', err.response?.data || err.message);
                    setError('Error al cargar las notificaciones. Intenta de nuevo.');
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!authLoading) { // Asegurarse de que la autenticación haya terminado de cargar
            fetchNotifications();
        }
    }, [user, isLoggedIn, authLoading]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`, {}, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setNotifications(prev =>
                prev.map(n =>
                    n.id === notificationId ? { ...n, isRead: true } : n
                )
            );
            toast.success('Notificación marcada como leída.');
        } catch (err) {
            console.error('Error al marcar como leída:', err.response?.data || err.message);
            toast.error('Error al marcar como leída.');
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setNotifications(prev => prev.filter(n => n.id !== notificationId));
            toast.info('Notificación eliminada.');
        } catch (err) {
            console.error('Error al eliminar notificación:', err.response?.data || err.message);
            toast.error('No se pudo eliminar la notificación.');
        }
    };

    if (authLoading || loading) {
        return <div className={estilos.contenedorCarga}>Cargando notificaciones...</div>;
    }

    if (error) {
        return <p className={estilos.mensajeError}>{error}</p>;
    }

    return (
        <div className={estilos.contenedorNotificaciones}>
            <h1>Mis Notificaciones</h1>
            {notifications.length === 0 ? (
                <p className={estilos.mensajeVacio}>No tienes notificaciones.</p>
            ) : (
                <ul className={estilos.listaNotificaciones}>
                    {notifications.map(notif => (
                        <li key={notif.id} className={`${estilos.notificacionItem} ${notif.isRead ? estilos.leida : estilos.noLeida}`}>
                            <div className={estilos.notificacionContenido}>
                                {notif.type === 'NEW_COURSE' && notif.relatedEntityId ? (
                                    <Link to={`/cursos/${notif.relatedEntityId}`} className={estilos.enlaceNotificacion}>
                                        {notif.message}
                                    </Link>
                                ) : (
                                    <span>{notif.message}</span>
                                )}
                                <span className={estilos.notificacionFecha}>
                                    {new Date(notif.createdAt).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className={estilos.botonesAccion}>
                                {!notif.isRead && (
                                    <button
                                        onClick={() => handleMarkAsRead(notif.id)}
                                        className={`${estilos.botonAccion} ${estilos.botonMarcarLeida}`}
                                        title="Marcar como leída"
                                    >
                                        <FiEye />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteNotification(notif.id)}
                                    className={`${estilos.botonAccion} ${estilos.botonBorrar}`}
                                    title="Eliminar notificación"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link>
        </div>
    );
};

export default NotificacionesPage;