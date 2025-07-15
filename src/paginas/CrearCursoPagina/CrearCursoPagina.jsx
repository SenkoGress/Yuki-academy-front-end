import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './CrearCursoPagina.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';

const API_BASE_URL = 'http://localhost:8081/api';

const CrearCursoPagina = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cursoData, setCursoData] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        nivel: '',
        precio: '',
        imagenUrl: '',
        summaryTemario: '', // resumen
        idioma: ''
    });

    const categoriasDisponibles = [
        'Programación', 'Diseño Web', 'Marketing Digital', 'Ciencia de Datos',
        'Desarrollo Personal', 'Negocios', 'Modelado 3D', 'VR', 'AR', 'Diseño de Videojuegos'
    ];

    const nivelesDisponibles = [
        'Principiante', 'Intermedio', 'Avanzado'
    ];

    const idiomasDisponibles = [
        'Español', 'Inglés', 'Portugués', 'Francés', 'Alemán'
    ];

    const mapLevelToBackend = (frontendLevel) => {
        switch (frontendLevel) {
            case 'Principiante': return 'BEGINNER';
            case 'Intermedio': return 'INTERMEDIATE';
            case 'Avanzado': return 'ADVANCED';
            default: return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCursoData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            toast.error("Necesitas iniciar sesión para crear un curso.");
            navigate('/login');
            return;
        }

        if (!cursoData.nivel) {
            toast.error("Por favor, selecciona el nivel del curso.");
            return;
        }
        if (!cursoData.idioma) {
            toast.error("Por favor, selecciona el idioma del curso.");
            return;
        }
        if (!cursoData.imagenUrl.trim()) {
            toast.error("Por favor, ingresa la URL de la imagen de portada.");
            return;
        }
        if (!cursoData.summaryTemario.trim()) {
            toast.error("Por favor, ingresa el temario resumen del curso.");
            return;
        }

        const backendLevel = mapLevelToBackend(cursoData.nivel);
        if (!backendLevel) {
            toast.error("Error interno: nivel de curso no reconocido.");
            return;
        }

        const cursoParaEnviar = {
            title: cursoData.titulo,
            description: cursoData.descripcion,
            category: cursoData.categoria,
            level: backendLevel,
            price: parseFloat(cursoData.precio),
            imageUrl: cursoData.imagenUrl,
            language: cursoData.idioma,
            summarySyllabus: cursoData.summaryTemario, // Se envía el temario resumen
            lessons: [] // Las lecciones detalladas se crean vacías
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/courses`, cursoParaEnviar, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                toast.success('¡Curso creado exitosamente!');
                navigate('/panel-profesor');
            } else {
                toast.error('Error al crear el curso. Inténtalo de nuevo.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Hubo un error al crear el curso.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className={estilos.paginaContenedor}>
            <div className={estilos.formularioContenedor}>
                <h1>Crear un Nuevo Curso</h1>
                <p>Completa la siguiente información para poner tu curso a la venta en Yuki.</p>

                <form onSubmit={handleSubmit} className={estilos.formulario}>
                    {/* ... (campos de título, descripción, categoría, idioma, nivel, precio, imagenUrl) */}
                    <div className={estilos.campo}>
                        <label htmlFor="titulo">Título del Curso</label>
                        <input type="text" id="titulo" name="titulo" value={cursoData.titulo} onChange={handleChange} required />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="descripcion">Descripción del Curso</label>
                        <textarea id="descripcion" name="descripcion" value={cursoData.descripcion} onChange={handleChange} rows="4" required />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="categoria">Categoría</label>
                        <select id="categoria" name="categoria" value={cursoData.categoria} onChange={handleChange} required>
                            <option value="" disabled>Selecciona una categoría</option>
                            {categoriasDisponibles.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="idioma">Idioma del Curso</label>
                        <select id="idioma" name="idioma" value={cursoData.idioma} onChange={handleChange} required>
                            <option value="" disabled>Selecciona un idioma</option>
                            {idiomasDisponibles.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    <div className={estilos.campo}>
                        <label>Nivel del Curso</label>
                        <div className={estilos.grupoRadio}>
                            {nivelesDisponibles.map(nivel => (
                                <label key={nivel}>
                                    <input type="radio" name="nivel" value={nivel} checked={cursoData.nivel === nivel} onChange={handleChange} required />
                                    {nivel}
                                </label>
                            ))}\
                        </div>
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="precio">Precio (CLP)</label>
                        <input type="number" id="precio" name="precio" placeholder="Ej: 19990" value={cursoData.precio} onChange={handleChange} required />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="imagenUrl">URL de la Imagen de Portada</label>
                        <input type="url" id="imagenUrl" name="imagenUrl" placeholder="https://ejemplo.com/imagen.jpg" value={cursoData.imagenUrl} onChange={handleChange} required />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="summaryTemario">Temario Resumen (un tema por línea para la vista de venta)</label>
                        <textarea
                            id="summaryTemario"
                            name="summaryTemario"
                            value={cursoData.summaryTemario}
                            onChange={handleChange}
                            rows="6"
                            placeholder="- Módulos principales&#10;- Habilidades a adquirir&#10;- Proyecto final"
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