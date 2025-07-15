import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import estilos from '../Cursos/Cursos.module.css'; // Reutilizamos los mismos estilos para un look consistente
import CursoCard from '../../componentes/CursoCard/CursoCard.jsx';
import { FiSearch, FiFilter, FiX, FiBookOpen } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';

const API_BASE_URL = 'http://localhost:8081/api';

const nivelDisplayNames = {
  'BEGINNER': 'Principiante',
  'INTERMEDIATE': 'Intermedio',
  'ADVANCED': 'Avanzado',
  'ALL_LEVELS': 'Todos los niveles'
};

// --- LISTAS DE FILTROS FIJAS Y ORDENADAS ---
const categoriasFijas = ['Programación', 'Diseño Web', 'Marketing Digital', 'Ciencia de Datos', 'Desarrollo Personal', 'Negocios', 'Modelado 3D', 'VR', 'AR', 'Diseño de Videojuegos'];
const nivelesFijos = ['Todos los niveles', 'Principiante', 'Intermedio', 'Avanzado'];
const idiomasFijos = ['Todos', 'Español', 'Inglés', 'Portugués']; // Puedes expandir esta lista

const MisCursosComprados = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useAuth();

  const [busqueda, setBusqueda] = useState('');
  const [filtroIdioma, setFiltroIdioma] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos los niveles');
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  // Categorías ordenadas alfabéticamente
  const categoriasOrdenadas = useMemo(() => {
    const sinTodos = categoriasFijas.slice(); // Copia el array
    sinTodos.sort((a, b) => a.localeCompare(b));
    return ['Todos', ...sinTodos];
  }, []);

  // Se obtienen solo los cursos comprados por el usuario
  useEffect(() => {
    if (!isLoggedIn) {
      setError("Debes iniciar sesión para ver tus cursos.");
      setLoading(false);
      return;
    }
    const fetchCursosComprados = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${user.id}/purchased-courses`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setCursos(response.data);
      } catch (err) {
        setError("No se pudieron cargar tus cursos.");
        toast.error("No se pudieron cargar tus cursos.");
      } finally {
        setLoading(false);
      }
    };
    fetchCursosComprados();
  }, [isLoggedIn, user]);

  // Lógica de filtrado que opera sobre los cursos comprados
  const cursosFiltrados = useMemo(() => {
    return cursos.filter(curso => {
      const coincideBusqueda = busqueda === '' || curso.title.toLowerCase().includes(busqueda.toLowerCase());
      const coincideIdioma = filtroIdioma === 'Todos' || curso.language === filtroIdioma;
      const coincideNivel = filtroNivel === 'Todos los niveles' || nivelDisplayNames[curso.level] === filtroNivel;
      const coincideCategoria = filtroCategoria === 'Todos' || curso.category === filtroCategoria;
      return coincideBusqueda && coincideIdioma && coincideNivel && coincideCategoria;
    });
  }, [busqueda, filtroIdioma, filtroNivel, filtroCategoria, cursos]);

  return (
      <div className={estilos.paginaCursos}>
        <header className={estilos.cabecera}>
          <h1><FiBookOpen /> Mis Cursos</h1>
          <p>Aquí encontrarás todos los cursos que has adquirido. ¡Continúa tu viaje de aprendizaje!</p>
        </header>

        <div className={estilos.campoBusquedaSuperior}>
          <FiSearch className={estilos.iconoBusqueda} />
          <input
              type="text"
              placeholder="Buscar en mis cursos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
              <button className={estilos.botonBorrarBusqueda} onClick={() => setBusqueda('')}>
                <FiX />
              </button>
          )}
        </div>

        <div className={estilos.panelDeFiltros}>
          <div className={estilos.filtrosGrupo}>
            <FiFilter className={estilos.iconoFiltro} />
            {idiomasFijos.map(idioma => (
                <button key={idioma} className={filtroIdioma === idioma ? estilos.botonActivo : estilos.botonFiltro} onClick={() => setFiltroIdioma(idioma)}>
                  {idioma}
                </button>
            ))}
          </div>
          <div className={estilos.filtroNivel}>
            <label htmlFor="selectNivel">Nivel:</label>
            <select id="selectNivel" className={estilos.selectFiltro} value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
              {nivelesFijos.map(nivel => <option key={nivel} value={nivel}>{nivel}</option>)}
            </select>
          </div>
          <div className={estilos.filtroCategoriaEspecifica}>
            <label htmlFor="selectCategoria">Categoría:</label>
            <select id="selectCategoria" className={estilos.selectFiltro} value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
              {categoriasOrdenadas.map(categoria => <option key={categoria} value={categoria}>{categoria}</option>)}
            </select>
          </div>
        </div>

        <main className={estilos.cuadriculaCursos}>
          {loading ? <p className={estilos.mensajeCarga}>Cargando...</p> :
              error ? <p className={estilos.mensajeError}>{error}</p> :
                  cursos.length > 0 && cursosFiltrados.length > 0 ? (
                      cursosFiltrados.map(curso => (
                          <CursoCard key={curso.id} curso={curso} mostrarBotonCarrito={false} forceRedirectTo={`/ver-curso/${curso.id}`} />
                      ))
                  ) : (
                      <div className={estilos.sinResultados}>
                        <h2>{cursos.length === 0 ? 'Aún no tienes cursos' : 'No se encontraron cursos'}</h2>
                        <p>{cursos.length === 0 ? 'Parece que todavía no te has inscrito en ningún curso.' : 'No tienes cursos que coincidan con los filtros seleccionados.'}</p>
                        <Link to="/cursos" className={estilos.botonExplorar}>Explorar Todos los Cursos</Link>
                      </div>
                  )}
        </main>
      </div>
  );
};

export default MisCursosComprados;