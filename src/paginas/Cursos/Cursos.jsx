import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import estilos from './Cursos.module.css';
import CursoCard from '../../componentes/CursoCard/CursoCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8081/api';

const nivelDisplayNames = {
    'BEGINNER': 'Principiante',
    'INTERMEDIATE': 'Intermedio',
    'ADVANCED': 'Avanzado',
    'ALL_LEVELS': 'Todos los niveles'
};

const categoriasEspecificasFijas = [
    'Todos', // Esta opción se mantendrá al principio
    'Programación',
    'Diseño Web',
    'Marketing Digital',
    'Ciencia de Datos',
    'Desarrollo Personal',
    'Negocios',
    'Modelado 3D',
    'VR',
    'AR',
    'Diseño de Videojuegos'
];

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();

    const [busqueda, setBusqueda] = useState('');
    const [filtroIdioma, setFiltroIdioma] = useState('Todos');
    const [filtroNivel, setFiltroNivel] = useState('Todos los niveles');
    const [filtroCategoriaEspecifica, setFiltroCategoriaEspecifica] = useState('Todos');

    const cursosCargadosToastMostrado = useRef(false);

    // --- ¡NUEVO: Lista de categorías ordenada! ---
    const categoriasOrdenadas = useMemo(() => {
        const sinTodos = categoriasEspecificasFijas.filter(cat => cat !== 'Todos');
        sinTodos.sort((a, b) => a.localeCompare(b)); // Ordena alfabéticamente el resto
        return ['Todos', ...sinTodos]; // Vuelve a poner 'Todos' al principio
    }, []); // Se calcula una única vez al montar el componente

    // Efecto 1: Carga inicial de todos los cursos
    useEffect(() => {
        const fetchCursos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/courses`);
                setCursos(response.data);
                if (!cursosCargadosToastMostrado.current) {
                    toast.success('Cursos cargados exitosamente!');
                    cursosCargadosToastMostrado.current = true;
                }
            } catch (err) {
                console.error('Error al cargar cursos:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Error al cargar los cursos. Intenta de nuevo.');
                toast.error(err.response?.data?.message || 'Error al cargar los cursos.');
                cursosCargadosToastMostrado.current = false;
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    // Efecto 2: Lee el parámetro 'q' de la URL y actualiza el estado 'busqueda'
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromUrl = params.get('q');

        if (queryFromUrl) {
            setBusqueda(decodeURIComponent(queryFromUrl));
        } else {
            setBusqueda('');
        }
    }, [location.search]);

    const idiomasDisponibles = useMemo(() => {
        const setDeIdiomas = new Set(cursos.map(c => c.language));
        const idiomasArray = ['Todos', ...Array.from(setDeIdiomas)];
        return idiomasArray.sort((a, b) => a.localeCompare(b));
    }, [cursos]);

    const nivelesDisponibles = useMemo(() => {
        const nivelesUnicos = new Set(cursos.map(c => c.level));
        const nivelesParaFiltro = Array.from(nivelesUnicos)
            .map(nivel => nivelDisplayNames[nivel] || nivel)
            .filter(nivel => nivel !== 'Todos los niveles');

        return ['Todos los niveles', ...nivelesParaFiltro].sort((a, b) => {
            if (a === 'Todos los niveles') return -1;
            if (b === 'Todos los niveles') return 1;
            const ordenNiveles = { 'Principiante': 1, 'Intermedio': 2, 'Avanzado': 3 };
            return (ordenNiveles[a] || 0) - (ordenNiveles[b] || 0);
        });
    }, [cursos]);

    const cursosFiltrados = useMemo(() => {
        return cursos.filter(curso => {
            const normalizedBusqueda = busqueda.toLowerCase().replace(/\s+/g, ' ').trim();

            const coincideBusqueda =
                (curso.title && curso.title.toLowerCase().includes(normalizedBusqueda)) ||
                (curso.category && curso.category.toLowerCase().replace(/\s+/g, ' ').trim().includes(normalizedBusqueda));

            const coincideIdioma = filtroIdioma === 'Todos' || curso.language === filtroIdioma;
            const coincideNivel = filtroNivel === 'Todos los niveles' || nivelDisplayNames[curso.level] === filtroNivel;

            const normalizedCursoCategory = curso.category ? curso.category.replace(/\s+/g, ' ').trim().toLowerCase() : '';
            const normalizedFiltroCategoria = filtroCategoriaEspecifica.toLowerCase();

            const coincideCategoria =
                filtroCategoriaEspecifica === 'Todos' ||
                (normalizedCursoCategory === normalizedFiltroCategoria);

            return coincideBusqueda && coincideIdioma && coincideNivel && coincideCategoria;
        });
    }, [busqueda, filtroIdioma, filtroNivel, filtroCategoriaEspecifica, cursos]);

    const limpiarBusqueda = () => {
        setBusqueda('');
    };

    return (
        <div className={estilos.paginaCursos}>
            <header className={estilos.cabecera}>
                <h1>Todos los Cursos</h1>
                <p>Explora tu próxima gran oportunidad de aprendizaje y lleva tus habilidades al siguiente nivel con nuestro catálogo de cursos creado para ti.</p>
            </header>

            <div className={estilos.campoBusquedaSuperior}>
                <FiSearch className={estilos.iconoBusqueda} />
                <input
                    type="text"
                    placeholder="¿Qué quieres aprender hoy?"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                    <button
                        className={estilos.botonBorrarBusqueda}
                        onClick={limpiarBusqueda}
                        aria-label="Borrar búsqueda"
                    >
                        <FiX />
                    </button>
                )}
            </div>

            <div className={estilos.panelDeFiltros}>
                <div className={estilos.filtrosGrupo}>
                    <FiFilter className={estilos.iconoFiltro} />
                    {idiomasDisponibles.map(idioma => (
                        <button
                            key={idioma}
                            className={filtroIdioma === idioma ? estilos.botonActivo : estilos.botonFiltro}
                            onClick={() => setFiltroIdioma(idioma)}
                        >
                            {idioma}
                        </button>
                    ))}
                </div>
                <div className={estilos.filtroNivel}>
                    <label htmlFor="selectNivel" className={estilos.labelFiltro}>Nivel:</label>
                    <select
                        id="selectNivel"
                        className={estilos.selectFiltro}
                        value={filtroNivel}
                        onChange={(e) => setFiltroNivel(e.target.value)}
                    >
                        {nivelesDisponibles.map(nivel => (
                            <option key={nivel} value={nivel}>{nivel}</option>
                        ))}
                    </select>
                </div>
                <div className={estilos.filtroCategoriaEspecifica}>
                    <label htmlFor="selectCategoria" className={estilos.labelFiltro}>Categoría:</label>
                    <select
                        id="selectCategoria"
                        className={estilos.selectFiltro}
                        value={filtroCategoriaEspecifica}
                        onChange={(e) => setFiltroCategoriaEspecifica(e.target.value)}
                    >
                        {/* ¡CAMBIO CLAVE AQUÍ! Usar categoriasOrdenadas en lugar de categoriasEspecificasFijas */}
                        {categoriasOrdenadas.map(categoria => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                </div>
            </div>

            <main className={estilos.cuadriculaCursos}>
                {loading ? (
                    <p className={estilos.mensajeCarga}>Cargando cursos...</p>
                ) : error ? (
                    <p className={estilos.mensajeError}>{error}</p>
                ) : cursosFiltrados.length > 0 ? (
                    cursosFiltrados.map(curso => (
                        <CursoCard key={curso.id} curso={curso} />
                    ))
                ) : (
                    <p className={estilos.sinResultados}>No se encontraron cursos que coincidan con tu búsqueda.</p>
                )}
            </main>
        </div>
    );
};

export default Cursos;