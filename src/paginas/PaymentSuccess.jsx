// src/paginas/PaymentSuccess.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './PaymentStatus.module.css'; // Usa un CSS compartido para los estados de pago

const PaymentSuccess = () => {
    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloExito}>¡Pago Exitoso! ✅</h1>
            <p className={estilos.mensaje}>Tu compra ha sido procesada correctamente.</p>
            <Link to="/mis-cursos-comprados" className={estilos.botonAccion}>Ir a Mis Cursos</Link>
            <p className={estilos.infoAdicional}>En breve recibirás un correo electrónico con los detalles de tu compra.</p>
        </div>
    );
};

export default PaymentSuccess;
