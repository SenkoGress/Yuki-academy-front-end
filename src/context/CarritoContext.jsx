// src/context/CarritoContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el Contexto del Carrito
const CarritoContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  return useContext(CarritoContext);
};

// Componente Proveedor del Carrito
export const CarritoProvider = ({ children }) => {
  // Inicializa el estado del carrito desde localStorage o un array vacío
  const [items, setItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem('carritoItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error al parsear carrito de localStorage:", error);
      return []; // Devuelve un array vacío si hay un error al leer localStorage
    }
  });

  // Efecto para guardar los items en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('carritoItems', JSON.stringify(items));
  }, [items]);

  // Función para agregar un item al carrito
  const agregarAlCarrito = (item) => {
    console.log("Llamando a agregarAlCarrito con item:", item); // <-- LOG DE DEPURACIÓN
    // Verifica si el item ya está en el carrito
    const itemExistente = items.find(i => i.id === item.id);

    if (itemExistente) {
      // Si el item ya existe, no hacemos nada (o podrías incrementar la cantidad)
      console.log("Item ya está en el carrito, no se añade de nuevo."); // <-- LOG DE DEPURACIÓN
      return;
    } else {
      // Si el item no existe, lo agregamos al carrito
      setItems((prevItems) => [...prevItems, item]);
      console.log("Item añadido al carrito:", item); // <-- LOG DE DEPURACIÓN
    }
  };

  // Función para eliminar un item del carrito
  const eliminarDelCarrito = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    console.log("Item eliminado del carrito con ID:", itemId); // <-- LOG DE DEPURACIÓN
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setItems([]);
    console.log("Carrito vaciado."); // <-- LOG DE DEPURACIÓN
  };

  // Valor del contexto que se proveerá a los componentes hijos
  const contexto = {
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  };

  return (
      <CarritoContext.Provider value={contexto}>
        {children}
      </CarritoContext.Provider>
  );
};
