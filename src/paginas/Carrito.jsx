// src/paginas/Carrito.jsx

import React, { useState } from 'react'; // Asegúrate de que 'useState' esté importado
import { useCarrito } from '../context/CarritoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // <-- ¡IMPORTACIÓN CRÍTICA DE useAuth!
import CarritoItem from '../componentes/CarritoItem/CarritoItem.jsx';
import estilos from './Carrito.module.css';
import axios from 'axios'; // Asegúrate de que axios esté importado

// Importaciones del SDK de Mercado Pago para React
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// --- IMPORTANTE: Reemplaza con tu Public Key de PRUEBA de Mercado Pago ---
initMercadoPago('TEST-e2097679-70b8-416f-a24a-3496e49d2640');

// URL base de tus endpoints de pago en el backend
const API_BASE_URL = 'http://localhost:8081/api/payments'; // <-- Definida aquí

const Carrito = () => {
  // Obtiene el estado del carrito y funciones del contexto
  const { items, eliminarDelCarrito } = useCarrito();
  // Obtiene el usuario logeado y el estado de autenticación del contexto
  const { user, isLoggedIn } = useAuth(); // <-- useAuth se utiliza aquí

  // Estados para manejar el proceso de pago con Mercado Pago
  const [preferenceId, setPreferenceId] = useState(null); // <-- Definido aquí
  const [loadingPayment, setLoadingPayment] = useState(false); // <-- Definido aquí
  const [paymentError, setPaymentError] = useState(null);       // <-- Definido aquí
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(null); // <-- Definido aquí

  // Calcula el total del carrito
  const total = items.reduce((sum, item) => {
    if (item.price == null || String(item.price).toLowerCase() === 'gratis') {
      return sum;
    }

    const precioNumerico = parseFloat(item.price);

    return sum + (isNaN(precioNumerico) ? 0 : precioNumerico);
  }, 0);

  // Función que se ejecuta cuando el usuario hace clic en el botón "Pagar"
  const handlePagarClick = async () => { // <-- Definida aquí
    // Validar si hay cursos en el carrito
    if (items.length === 0) {
      setPaymentError("No hay cursos en tu cesta para pagar.");
      return;
    }

    // Validar si el usuario está logeado y tiene un token
    if (!isLoggedIn || !user || !user.token) {
      setPaymentError("Debes iniciar sesión para proceder al pago.");
      console.error("Error: Usuario no logeado o token no disponible para el pago.");
      return;
    }

    const firstItem = items[0]; // Asumimos que al menos hay un item
    const courseIdToPay = firstItem.id; // <-- Definida aquí
    const quantityToPay = 1; // <-- Definida aquí

    setLoadingPayment(true);
    setPaymentError(null);
    setPreferenceId(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/create-preference`, // API_BASE_URL utilizada aquí
          {
            courseId: courseIdToPay, // courseIdToPay utilizada aquí
            quantity: quantityToPay, // quantityToPay utilizada aquí
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          }
      );

      const { preferenceId } = response.data; // preferenceId asignado aquí
      setPreferenceId(preferenceId);

      setPaymentSuccessMessage("Preferencia de pago creada. Puedes proceder al checkout.");

    } catch (err) {
      console.error("Error al crear preferencia de pago:", err.response?.data || err.message);
      setPaymentError(err.response?.data?.message || "Error al iniciar el proceso de pago. Intenta de nuevo.");
      setPaymentSuccessMessage(null);
    } finally {
      setLoadingPayment(false);
    }
  };

  const walletProps = {
    initialization: {
      preferenceId: preferenceId,
      redirectMode: "self"
    },
    customization: {
      texts: {
        valueProp: 'smart_option',
      },
      visual: {
        buttonTheme: 'solid',
      },
    },
  };

  return (
      <div className={estilos.pagina}>
        <h1>Tu Cesta</h1>
        <div className={estilos.layout}>
          <div className={estilos.listaItems}>
            <h4>{items.length} Curso(s) en la Cesta</h4>
            {items.length === 0 ? (
                <p>Tu cesta está vacía. ¡Sigue explorando cursos!</p>
            ) : (
                items.map(item => (
                    <CarritoItem key={item.id} item={item} onRemove={eliminarDelCarrito} />
                ))
            )}
          </div>
          {items.length > 0 && (
              <div className={estilos.resumen}>
                <h4>Total:</h4>
                <p className={estilos.precioTotal}>{total.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>

                <button
                    className={estilos.botonPagar}
                    onClick={handlePagarClick} // handlePagarClick utilizada aquí
                    disabled={loadingPayment || preferenceId !== null} // loadingPayment y preferenceId utilizados aquí
                >
                  {loadingPayment ? 'Cargando Pago...' : 'Pagar'}
                </button>

                {paymentError && <p style={{ color: 'red', marginTop: '10px' }}>{paymentError}</p>}
                {paymentSuccessMessage && <p style={{ color: 'green', marginTop: '10px' }}>{paymentSuccessMessage}</p>}

                {preferenceId && (
                    <div className={estilos.mercadopagoWidget}>
                      <Wallet {...walletProps} />
                    </div>
                )}

                <p className={estilos.info}>Yuki se requiere para completar tu compra</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default Carrito;
