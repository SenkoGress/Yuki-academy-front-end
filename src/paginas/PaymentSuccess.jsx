// src/paginas/PaymentSuccess.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './PaymentStatus.module.css';
// Asumo que tienes estas imágenes en tu carpeta 'public' o 'assets'


const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleVolverACursos = () => {
        navigate('/cursos'); // Redirige específicamente a /cursos
    };

    return (
        <div className={estilos.contenedor}>
            <h1 className={estilos.tituloExito}>¡Listo! Tu pago ya se acreditó ✅</h1>
            <p className={estilos.mensaje}>Operación #1338740511</p>

            <div className={estilos.cardDetallePago}>
                <p>Pagaste 1x $18.986 (Total $18.986)</p>
                <p>American Express **** 1804 American Express Crédito</p>
                <p className={estilos.infoAdicional}>En el resumen de tu tarjeta verás el cargo a nombre de Mercadopago/fake</p>
            </div>

            {/* Botón para volver a la página de Cursos */}
            <button
                onClick={handleVolverACursos}
                className={estilos.botonVolver}
            >
                Volver a los Cursos
            </button>

            {/* Tu botón original "Ir a Mis Cursos" */}
            <Link to="/mis-cursos-comprados" className={estilos.botonAccion}>
                Ir a Mis Cursos
            </Link>

            <div className={estilos.seccionAppMercadoPago}>
                <p className={estilos.appMercadoPagoTitulo}>¡La próxima paga más rápido!</p>
                <p className={estilos.appMercadoPagoMensaje}>Baja la app de Mercado Pago a tu celular escaneando el código QR.</p>
                <img src={qrCodeImage} alt="Código QR Mercado Pago" className={estilos.qrCode} />
                <div className={estilos.appButtons}>
                    <a href="https://play.google.com/store/apps/details?id=com.mercadopago.wallet" target="_blank" rel="noopener noreferrer">
                        <img src={googlePlayBtn} alt="Descargar en Google Play" className={estilos.appButtonImg} />
                    </a>
                    <a href="https://apps.apple.com/app/id893110593" target="_blank" rel="noopener noreferrer">
                        <img src={appStoreBtn} alt="Descargar en App Store" className={estilos.appButtonImg} />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default PaymentSuccess;