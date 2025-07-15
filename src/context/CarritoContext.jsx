

import React, { createContext, useContext, useState, useEffect } from 'react';


const CarritoContext = createContext();


export const useCarrito = () => {
  return useContext(CarritoContext);
};


export const CarritoProvider = ({ children }) => {

  const [items, setItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem('carritoItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error al parsear carrito de localStorage:", error);
      return []; 
    }
  });

  
  useEffect(() => {
    localStorage.setItem('carritoItems', JSON.stringify(items));
  }, [items]);


  const agregarAlCarrito = (item) => {
    console.log("Llamando a agregarAlCarrito con item:", item); 
    const itemExistente = items.find(i => i.id === item.id);

    if (itemExistente) {
      console.log("Item ya está en el carrito, no se añade de nuevo."); 
      return;
    } else {

      setItems((prevItems) => [...prevItems, item]);
      console.log("Item añadido al carrito:", item); 
    }
  };


  const eliminarDelCarrito = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    console.log("Item eliminado del carrito con ID:", itemId); 
  };


  const vaciarCarrito = () => {
    setItems([]);
    console.log("Carrito vaciado."); 
  };


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
