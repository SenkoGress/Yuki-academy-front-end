// src/paginas/CuentaUsuario/PaymentHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './PaymentHistoryPage.module.css';

const API_BASE_URL = 'http://localhost:8081/api'; // Asegúrate de que esta URL sea correcta

const PaymentHistoryPage = () => {
    const { user, isLoggedIn, loading: authLoading } = useAuth(); // Obtén también authLoading para esperar al contexto
    const navigate = useNavigate();

    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true); // Controla la carga inicial de datos del historial
    const [error, setError] = useState(null);

    // Primer useEffect: Manejar la autenticación y redirección
    useEffect(() => {
        // Si el AuthContext todavía está cargando el usuario, no hagas nada aún.
        if (authLoading) {
            return;
        }

        // Si el usuario NO está logeado después de que el contexto haya terminado de cargar, redirige.
        if (!isLoggedIn) {
            toast.error('Necesitas iniciar sesión para ver tu historial de pagos.');
            navigate('/login');
            // No hay 'return null' aquí directamente en el cuerpo del componente,
            // el renderizado continuará con los estados iniciales (loading: true).
        }
        // Este useEffect también podría disparar la carga de datos si todo está bien.
        // Pero es mejor tener la carga de datos en otro useEffect para mayor claridad.
    }, [isLoggedIn, navigate, authLoading]); // Dependencias: se ejecuta cuando cambian estos valores


    // Segundo useEffect: Cargar el historial de pagos (solo si el usuario está logeado y disponible)
    useEffect(() => {
        // Asegúrate de que el contexto haya terminado de cargar y el usuario esté logeado
        if (!authLoading && isLoggedIn && user && user.id && user.token) {
            const fetchPaymentHistory = async () => {
                setLoading(true); // Inicia la carga
                setError(null);   // Limpia errores anteriores
                try {
                    const response = await axios.get(`${API_BASE_URL}/users/${user.id}/payments`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });
                    setPaymentHistory(response.data);
                } catch (err) {
                    console.error('Error al cargar el historial de pagos:', err.response?.data || err.message);
                    setError(err.response?.data?.message || 'Error al cargar el historial de pagos. Intenta de nuevo.');
                    toast.error(err.response?.data?.message || 'Error al cargar el historial de pagos.');
                } finally {
                    setLoading(false); // Finaliza la carga
                }
            };

            fetchPaymentHistory();
        }
        // Si authLoading es true, o isLoggedIn es false, este useEffect no hará nada,
        // esperando al primer useEffect para manejar la redirección.
    }, [user, isLoggedIn, authLoading]); // Dependencias: se ejecuta cuando cambian user, isLoggedIn o authLoading

    // Renderizado condicional para estados de carga/error/vacío
    if (authLoading || (loading && !error && paymentHistory.length === 0)) {
        return <div className={estilos.contenedorCarga}>Cargando historial de pagos...</div>;
    }

    if (error) {
        return <p className={estilos.mensajeError}>{error}</p>;
    }

    if (!isLoggedIn) { // Mostrar algo si todavía no está logeado y no fue redirigido al principio del useEffect
        // Esto solo se mostraría brevemente si la redirección en useEffect no es instantánea.
        return <div className={estilos.contenedorCarga}>Redirigiendo para iniciar sesión...</div>;
    }

    return (
        <div className={estilos.contenedorHistorialPagos}>
            <h1>Historial de Pagos</h1>
            {paymentHistory.length === 0 ? (
                <p className={estilos.mensajeVacio}>Aún no tienes pagos registrados.</p>
            ) : (
                <table className={estilos.tablaHistorial}>
                    <thead>
                    <tr>
                        <th>ID Orden</th>
                        <th>Fecha</th>
                        <th>Curso</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>ID Mercado Pago</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paymentHistory.map((payment) => (
                        <tr key={payment.orderId}>
                            <td data-label="ID Orden">{payment.orderId}</td>
                            <td data-label="Fecha">{new Date(payment.orderDate).toLocaleDateString()}</td>
                            <td data-label="Curso">{payment.courseTitle || 'N/A'}</td>
                            <td data-label="Monto">
                                {payment.totalAmount ?
                                    parseFloat(payment.totalAmount).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
                                    : 'N/A'
                                }
                            </td>
                            <td data-label="Estado">
                                <span className={`${estilos.estado} ${estilos[String(payment.status).toLowerCase()]}`}>
                                    {payment.status}
                                </span>
                            </td>
                            <td data-label="ID Mercado Pago">{payment.mpPaymentId || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link>
        </div>
    );
};

export default PaymentHistoryPage;