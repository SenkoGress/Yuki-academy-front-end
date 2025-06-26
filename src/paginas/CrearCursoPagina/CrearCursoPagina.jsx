import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './CrearCursoPagina.module.css';

const CrearCursoPagina = () => {
    const navigate = useNavigate();
    const [cursoData, setCursoData] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        precio: '',
        imagenUrl: '',
        temario: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCursoData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // En una aplicación real, aquí enviarías los datos al back-end
        console.log('Datos del curso para enviar:', cursoData);
        alert('¡Curso creado con éxito! (Revisa la consola para ver los datos)');
        // Redirigir de vuelta al panel del profesor después de crear
        navigate('/panel-profesor');
    };

    return (
        <div className={estilos.paginaContenedor}>
            <div className={estilos.formularioContenedor}>
                <h1>Crear un Nuevo Curso</h1>
                <p>Completa la siguiente información para poner tu curso a la venta en Yuki.</p>
                
                <form onSubmit={handleSubmit} className={estilos.formulario}>
                    <div className={estilos.campo}>
                        <label htmlFor="titulo">Título del Curso</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            value={cursoData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="descripcion">Descripción del Curso</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={cursoData.descripcion}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="categoria">Categoría</label>
                        <input
                            type="text"
                            id="categoria"
                            name="categoria"
                            placeholder="Ej: Programación, Diseño, Marketing"
                            value={cursoData.categoria}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="precio">Precio (CLP)</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            placeholder="Ej: 19990"
                            value={cursoData.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="imagenUrl">URL de la Imagen de Portada</label>
                        <input
                            type="url"
                            id="imagenUrl"
                            name="imagenUrl"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            value={cursoData.imagenUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="temario">Temario (un tema por línea)</label>
                        <textarea
                            id="temario"
                            name="temario"
                            value={cursoData.temario}
                            onChange={handleChange}
                            rows="6"
                            placeholder="- Introducción a React&#10;- Componentes y Props&#10;- Estado y Ciclo de Vida"
                            required
                        />
                    </div>

                    <button type="submit" className={estilos.botonCrear}>
                        Crear Curso y Publicar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CrearCursoPagina;