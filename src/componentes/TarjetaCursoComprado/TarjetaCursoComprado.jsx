import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './TarjetaCursoComprado.module.css';
import { FiPlayCircle } from 'react-icons/fi';

const TarjetaCursoComprado = ({ curso }) => {
    // Si el curso no se pasa correctamente, usamos valores por defecto para evitar errores
    const { 
        id = 0,
        imagen = 'https://placehold.co/600x400/e0e0e0/757575?text=Curso', 
        titulo = 'Título no disponible', 
        instructor = 'Instructor Desconocido', 
        progreso = 0 
    } = curso || {};

    return (
        <div className={estilos.card}>
            <Link to={`/cursos/${id}`} className={estilos.imagenContenedor}>
                <img src={imagen} alt={`Portada de ${titulo}`} className={estilos.imagenCurso} />
                <div className={estilos.overlay}>
                    <FiPlayCircle size={40} />
                </div>
            </Link>
            <div className={estilos.info}>
                <h3 className={estilos.titulo}>{titulo}</h3>
                <p className={estilos.instructor}>Por {instructor}</p>
                <div className={estilos.progresoContenedor}>
                    <div className={estilos.barraProgreso} style={{ width: `${progreso}%` }}></div>
                </div>
                <Link to={`/cursos/${id}`} className={estilos.botonContinuar}>
                    Continuar Aprendiendo
                </Link>
            </div>
        </div>
    );
};

export default TarjetaCursoComprado;
