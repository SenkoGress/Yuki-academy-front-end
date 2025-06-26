import React from 'react';
import estilos from './CarritoItem.module.css';

const CarritoItem = ({ item, onRemove }) => {
  return (
    <div className={estilos.item}>
      <img src={item.imagen} alt={item.titulo} className={estilos.imagen} />
      <div className={estilos.detalles}>
        <h4 className={estilos.titulo}>{item.titulo}</h4>
        <p className={estilos.instructor}>Por {item.instructor}</p>
      </div>
      <div className={estilos.acciones}>
        <button onClick={() => onRemove(item.id)} className={estilos.botonEliminar}>Eliminar</button>
        <p className={estilos.precio}>{item.precio}</p>
      </div>
    </div>
  );
};

export default CarritoItem;