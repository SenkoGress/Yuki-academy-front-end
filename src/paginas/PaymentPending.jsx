// src/paginas/PaymentPending.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './PaymentStatus.module.css'; // Usa un CSS compartido para los estados de pago

const PaymentPending = () => {
    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloPendiente}>¡Pago Pendiente! ⏳</h1>
            <p className={estilos.mensaje}>Tu pago está en proceso de verificación. Te notificaremos cuando se complete.</p>
            <Link to="/mis-cursos-comprados" className={estilos.botonAccion}>Ir a Mis Cursos</Link>
            <p className={estilos.infoAdicional}>Puedes verificar el estado de tu pago en la sección "Mis Compras" o contactar a soporte si tienes dudas.</p>
        </div>
    );
};

export default PaymentPending;
