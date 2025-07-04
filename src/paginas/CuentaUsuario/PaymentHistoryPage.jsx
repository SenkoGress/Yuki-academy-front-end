// src/paginas/CuentaUsuario/PaymentHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import estilos from './PaymentHistoryPage.module.css';

const API_BASE_URL = 'http://localhost:8081/api';

const PaymentHistoryPage = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!isLoggedIn) {
        toast.error('Necesitas iniciar sesión para ver tu historial de pagos.');
        navigate('/login');
        return null;
    }

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/users/${user.id}/payments`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setPaymentHistory(response.data);
            } catch (err) {
                console.error('Error al cargar el historial de pagos:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Error al cargar el historial de pagos.');
                toast.error(err.response?.data?.message || 'Error al cargar el historial de pagos.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.id && user.token) {
            fetchPaymentHistory();
        }

    }, [user, navigate, isLoggedIn]);

    return (
        <div className={estilos.contenedorHistorialPagos}>
            <h1>Historial de Pagos</h1>
            {loading ? (
                <p className={estilos.mensajeCarga}>Cargando historial de pagos...</p>
            ) : error ? (
                <p className={estilos.mensajeError}>{error}</p>
            ) : paymentHistory.length === 0 ? (
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
            <Link to="/cuenta" className={estilos.botonVolver}>Volver a la Cuenta</Link> {/* <-- ¡RUTA CORREGIDA AQUÍ! */}
        </div>
    );
};

export default PaymentHistoryPage;
