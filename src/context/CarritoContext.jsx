// Archivo: src/context/CarritoContext.jsx

import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const agregarAlCarrito = (curso) => {
    const yaEstaEnCarrito = items.find(item => item.id === curso.id);
    
    if (!yaEstaEnCarrito) {
      setItems(prevItems => [...prevItems, curso]);
      // La alerta ha sido eliminada de aquí.
    } else {
      // La alerta para cursos duplicados también ha sido eliminada.
      // Opcional: Dejo un mensaje en la consola que solo verás tú como desarrollador.
      console.log(`Intento de añadir "${curso.titulo}", que ya está en la cesta.`);
    }
  };

  const eliminarDelCarrito = (cursoId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== cursoId));
  };

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};