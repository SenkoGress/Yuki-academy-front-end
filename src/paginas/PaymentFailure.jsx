// src/paginas/PaymentFailure.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // ¡CORREGIDO: Usar 'import { Link } from ...' !
import estilos from './PaymentStatus.module.css'; // Usa un CSS compartido para los estados de pago

const PaymentFailure = () => {
    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloFallo}>¡Pago Fallido! ❌</h1>
            <p className={estilos.mensaje}>No pudimos procesar tu pago. Por favor, inténtalo de nuevo.</p>
            <Link to="/carrito" className={estilos.botonAccion}>Volver al Carrito</Link>
            <p className={estilos.infoAdicional}>Si el problema persiste, contacta a soporte.</p>
        </div>
    );
};

export default PaymentFailure;
