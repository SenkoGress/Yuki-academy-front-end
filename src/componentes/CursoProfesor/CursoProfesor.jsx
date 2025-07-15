import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './CursoProfesor.module.css';
import { FiEdit, FiBarChart2, FiEye } from 'react-icons/fi';

const CursoProfesor = ({ curso }) => {
    // Determina la clase del estado para aplicar diferentes colores
    const estadoClase = curso.estado === 'Publicado' ? estilos.publicado : estilos.borrador;

    return (
        <div className={estilos.card}>
            <img src={curso.imagen} alt={`Portada de ${curso.titulo}`} className={estilos.imagen} />
            <div className={estilos.infoContenedor}>
                <div className={estilos.infoPrincipal}>
                    <h3 className={estilos.titulo}>{curso.titulo}</h3>
                    <div className={estilos.estadisticas}>
                        <span>{curso.estudiantes} Estudiantes</span>
                        <span className={estilos.separador}>•</span>
                        <span>${curso.ingresos.toLocaleString('es-CL')} Ingresos</span>
                    </div>
                </div>
                <div className={estilos.infoSecundaria}>
                    <span className={`${estilos.estado} ${estadoClase}`}>{curso.estado}</span>
                    <div className={estilos.acciones}>
                        <Link to={`/panel-profesor/editar-curso/${curso.id}`} className={estilos.botonAccion}>
                            <FiEdit />
                        </Link>
                        <button className={estilos.botonAccion}>
                            <FiBarChart2 />
                        </button>
                        <Link to={`/cursos/${curso.id}`} className={estilos.botonAccion}>
                            <FiEye />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CursoProfesor;
