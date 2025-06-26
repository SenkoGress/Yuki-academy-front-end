import React from 'react';
import estilos from './PlanPrecios.module.css';
import { useCarrito } from '../../context/CarritoContext.jsx'; // 1. Importamos el hook del carrito

const PlanPrecios = ({ profesor }) => {
  // 2. Obtenemos la función para agregar al carrito desde el contexto
  const { agregarAlCarrito } = useCarrito();

  // 3. Creamos una función que se ejecutará al hacer clic en el botón
  const handleComprarPack = () => {
    // Creamos un objeto con el formato que nuestro carrito espera (id, titulo, precio, etc.)
    const itemParaElCarrito = {
      id: `pack-${profesor.id}`, // Creamos un ID único para el pack
      titulo: `Pack de Cursos de ${profesor.nombre}`,
      precio: profesor.precioTotal,
      imagen: profesor.imagen,
      instructor: profesor.nombre // El profesor es el "instructor" del pack
    };
    
    // Llamamos a la función del contexto para añadir este nuevo item
    agregarAlCarrito(itemParaElCarrito);
  };

  return (
    <div className={estilos.card}>
      <img src={profesor.imagen} alt={`Foto de ${profesor.nombre}`} className={estilos.imagenProfesor} />
      <h3 className={estilos.nombreProfesor}>{profesor.nombre}</h3>
      <p className={estilos.tituloProfesor}>{profesor.titulo}</p>
      
      <div className={estilos.seccionCursos}>
        <h4 className={estilos.subtituloCursos}>Cursos Incluidos:</h4>
        <ul className={estilos.listaCursos}>
          {profesor.cursos.map((curso, index) => (
            <li key={index}>{curso}</li>
          ))}
        </ul>
      </div>

      <div className={estilos.footerCard}>
        <p className={estilos.precioTotal}>{profesor.precioTotal}</p>
        {/* 4. Conectamos la función al onClick del botón */}
        <button onClick={handleComprarPack} className={estilos.botonCTA}>
          Comprar el pack acá
        </button>
      </div>
    </div>
  );
};

export default PlanPrecios;