// src/componentes/CarritoItem/CarritoItem.jsx

import React from 'react';
import estilos from './CarritoItem.module.css';

const CarritoItem = ({ item, onRemove }) => {

    // Formatea el precio para mostrarlo como moneda chilena (CLP).
    // Esta lógica es robusta para manejar números y el string "Gratis".
    const formattedPrice = item.price != null && !isNaN(parseFloat(item.price))
        ? parseFloat(item.price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
        : (String(item.price).toLowerCase() === 'gratis' ? 'Gratis' : 'Precio no disponible');

    // Muestra el nombre del profesor. Si 'item.professor' es un objeto completo,
    // usa 'firstName' y 'lastName'. Si solo está 'professorId', muestra eso.
    const instructorName = item.professor
        ? `${item.professor.firstName} ${item.professor.lastName}`
        : (item.professorId ? `ID Profesor: ${item.professorId}` : 'Instructor Desconocido');

    return (
        <div className={estilos.item}>
            {/* Usamos item.imageUrl para la imagen y item.title para el texto alternativo */}
            <img src={item.imageUrl} alt={item.title} className={estilos.imagen} />
            <div className={estilos.detalles}>
                {/* Usamos item.title para el título del curso */}
                <h4 className={estilos.titulo}>{item.title}</h4>
                {/* Usamos la variable instructorName calculada para mostrar el instructor */}
                <p className={estilos.instructor}>Por {instructorName}</p>
            </div>
            <div className={estilos.acciones}>
                {/* El botón de eliminar usa item.id para identificar qué curso borrar */}
                <button onClick={() => onRemove(item.id)} className={estilos.botonEliminar}>Eliminar</button>
                {/* Mostramos el precio formateado */}
                <p className={estilos.precio}>{formattedPrice}</p>
            </div>
        </div>
    );
};

export default CarritoItem;
