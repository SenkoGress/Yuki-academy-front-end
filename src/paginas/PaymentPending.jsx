// src/paginas/PaymentPending.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './PaymentStatus.module.css';

const PaymentPending = () => {
    const navigate = useNavigate();

    const handleVolverACursos = () => {
        navigate('/cursos'); // Redirige específicamente a /cursos
    };

    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloPendiente}>¡Pago Pendiente! ⏳</h1>
            <p className={estilos.mensaje}>Tu pago está en proceso de verificación. Te notificaremos cuando se complete.</p>
            {/* Botón para volver a la página de Cursos */}
            <button
                onClick={handleVolverACursos}
                className={estilos.botonVolver}
            >
                Volver a los Cursos
            </button>
            {/* Tu botón original */}
            <Link to="/mis-cursos-comprados" className={estilos.botonAccion}>Ir a Mis Cursos</Link>
            <p className={estilos.infoAdicional}>Puedes verificar el estado de tu pago en la sección "Mis Compras" o contactar a soporte si tienes dudas.</p>
        </div>
    );
};

export default PaymentPending;