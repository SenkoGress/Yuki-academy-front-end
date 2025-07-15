// src/paginas/PaymentFailure.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './PaymentStatus.module.css';

const PaymentFailure = () => {
    const navigate = useNavigate();

    const handleVolverACursos = () => {
        navigate('/cursos'); // Redirige específicamente a /cursos
    };

    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloFallo}>¡Pago Fallido! ❌</h1>
            <p className={estilos.mensaje}>No pudimos procesar tu pago. Por favor, inténtalo de nuevo.</p>
            <button
                onClick={handleVolverACursos}
                className={estilos.botonVolver}
            >
                Volver a los Cursos
            </button>
            <Link to="/carrito" className={estilos.botonAccion}>Volver al Carrito</Link>
            <p className={estilos.infoAdicional}>Si el problema persiste, contacta a soporte.</p>
        </div>
    );
};

export default PaymentFailure;