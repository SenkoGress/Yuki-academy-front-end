import React from 'react';
import { useCarrito } from '../context/CarritoContext.jsx';
import CarritoItem from '../componentes/CarritoItem/CarritoItem.jsx';
import estilos from './Carrito.module.css';

const Carrito = () => {
  const { items, eliminarDelCarrito } = useCarrito();

  // --- LÓGICA DEL TOTAL CORREGIDA ---
  const total = items.reduce((sum, item) => {
    // 1. Tomamos el string del precio, ej: "14,290 CLPs" o "Gratis"
    const precioTexto = item.precio;

    // Si el precio es "Gratis", simplemente no sumamos nada.
    if (precioTexto.toLowerCase() === 'gratis') {
      return sum;
    }

    // 2. Usamos una expresión regular para quitar TODO lo que NO sea un número.
    // "14,290 CLPs" se convierte en "14290".
    const soloNumeros = precioTexto.replace(/\D/g, '');

    // 3. Convertimos el texto limpio a un número entero.
    const precioNumerico = parseInt(soloNumeros, 10);

    // 4. Sumamos al total, asegurándonos de que no sea NaN (Not-a-Number)
    return sum + (isNaN(precioNumerico) ? 0 : precioNumerico);
  }, 0);

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
            {/* Esta línea formatea el número como moneda chilena (ej: $14.290) */}
            <p className={estilos.precioTotal}>{total.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
            <button className={estilos.botonPagar}>Pagar</button>
            <p className={estilos.info}>Yuki se requiere para completar tu compra</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;