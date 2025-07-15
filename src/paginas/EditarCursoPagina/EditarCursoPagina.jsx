import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import estilos from './EditarCursoPagina.module.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiInfo, FiVideo, FiUsers, FiSave, FiXCircle, FiPlus, FiTrash2, FiEdit2, FiUploadCloud, FiFileText, FiArrowLeft, FiAlertTriangle, FiSend } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:8081/api';

const mapLevelToBackend = (frontendLevel) => {
    switch (frontendLevel) {
        case 'Principiante': return 'BEGINNER';
        case 'Intermedio': return 'INTERMEDIATE';
        case 'Avanzado': return 'ADVANCED';
        case 'Todos los Niveles': return 'ALL_LEVELS';
        default: return '';
    }
};

const mapLevelToFrontend = (backendLevel) => {
    if (!backendLevel) return '';
    if (backendLevel === 'ALL_LEVELS') return 'Todos los Niveles';
    return backendLevel.charAt(0) + backendLevel.slice(1).toLowerCase();
};

const FormularioEditarInfo = ({ curso, onSave }) => {
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', precio: '', categoria: '',
        nivel: '', imagenUrl: '', idioma: '', summaryTemario: ''
    });

    useEffect(() => {
        if (curso) {
            const frontendLevel = mapLevelToFrontend(curso.level);
            setFormData({
                titulo: curso.title || '',
                descripcion: curso.description || '',
                precio: curso.price || '',
                categoria: curso.category || '',
                nivel: frontendLevel,
                imagenUrl: curso.imageUrl || '',
                idioma: curso.language || '',
                summaryTemario: curso.summarySyllabus || ''
            });
        }
    }, [curso]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: curso.id,
            title: formData.titulo,
            description: formData.descripcion,
            price: parseFloat(formData.precio),
            category: formData.categoria,
            level: formData.nivel,
            imageUrl: formData.imagenUrl,
            language: formData.idioma,
            summarySyllabus: formData.summaryTemario
        });
    };

    const categoriasDisponibles = ['Programación', 'Diseño Web', 'Marketing Digital', 'Ciencia de Datos', 'Desarrollo Personal', 'Negocios', 'Modelado 3D', 'VR', 'AR', 'Diseño de Videojuegos', 'Arte Digital', 'Música', 'Idiomas', 'Ciencias', 'Historia', 'Salud y Fitness', 'Finanzas'];
    const nivelesDisponibles = ['Principiante', 'Intermedio', 'Avanzado', 'Todos los Niveles'];
    const idiomasDisponibles = ['Español', 'Inglés', 'Portugués', 'Francés', 'Alemán', 'Chino', 'Japonés', 'Italiano'];

    return (
        <form onSubmit={handleSubmit} className={estilos.form}>
            <div className={estilos.campo}><label htmlFor="titulo">Título del Curso</label><input name="titulo" id="titulo" value={formData.titulo} onChange={handleChange} required /></div>
            <div className={estilos.campo}><label htmlFor="descripcion">Descripción del Curso</label><textarea name="descripcion" id="descripcion" value={formData.descripcion} onChange={handleChange} rows="6" required></textarea></div>
            <div className={estilos.campo}><label htmlFor="categoria">Categoría</label><select name="categoria" id="categoria" value={formData.categoria} onChange={handleChange} required><option value="" disabled>Selecciona una categoría</option>{categoriasDisponibles.map(cat => (<option key={cat} value={cat}>{cat}</option>))}</select></div>
            <div className={estilos.campo}><label htmlFor="idioma">Idioma del Curso</label><select name="idioma" id="idioma" value={formData.idioma} onChange={handleChange} required><option value="" disabled>Selecciona un idioma</option>{idiomasDisponibles.map(lang => (<option key={lang} value={lang}>{lang}</option>))}</select></div>
            <div className={estilos.campo}><label>Nivel del Curso</label><div className={estilos.grupoRadio}>{nivelesDisponibles.map(nivel => (<label key={nivel}><input type="radio" name="nivel" value={nivel} checked={formData.nivel === nivel} onChange={handleChange} required />{nivel}</label>))}</div></div>
            <div className={estilos.campo}><label htmlFor="precio">Precio (CLP)</label><input name="precio" id="precio" type="number" value={formData.precio} onChange={handleChange} required /></div>
            <div className={estilos.campo}><label htmlFor="imagenUrl">URL de la Imagen de Portada</label><input name="imagenUrl" id="imagenUrl" type="url" value={formData.imagenUrl} onChange={handleChange} required /></div>
            <div className={estilos.campo}><label htmlFor="summaryTemario">Temario Resumen (para la vista de venta)</label><textarea id="summaryTemario" name="summaryTemario" value={formData.summaryTemario} onChange={handleChange} rows="6" placeholder="- Módulos principales&#10;- Habilidades a adquirir&#10;- Proyecto final" required /></div>
            <div className={estilos.formActions}><button type="submit" className={estilos.botonGuardar}><FiSave /> Guardar Cambios</button></div>
        </form>
    );
};

const alumnosEstaticos = [{ id: 1, nombre: 'Ana García', email: 'ana.g@mail.com', fechaInscripcion: '2025-06-15' }, { id: 2, nombre: 'Carlos Sánchez', email: 'carlos.s@mail.com', fechaInscripcion: '2025-06-20' }, { id: 3, nombre: 'Laura Martínez', email: 'laura.m@mail.com', fechaInscripcion: '2025-07-01' }];

const ListaAlumnos = () => (
    <table className={estilos.tablaAlumnos}><thead><tr><th>Nombre</th><th>Email</th><th>Fecha de Inscripción</th></tr></thead><tbody>{alumnosEstaticos.map(alumno => (<tr key={alumno.id}><td>{alumno.nombre}</td><td>{alumno.email}</td><td>{alumno.fechaInscripcion}</td></tr>))}</tbody></table>
);

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => (
    <div className={estilos.modalBackdrop}><div className={`${estilos.modalContent} ${estilos.modalConfirmacion}`}><div className={estilos.modalHeader}><h3><FiAlertTriangle style={{ marginRight: '8px', color: '#f59e0b' }}/> Confirmar Acción</h3></div><div className={estilos.modalBody}><p>{mensaje}</p></div><div className={estilos.modalFooter}><button type="button" onClick={onCancelar} className={estilos.botonCancelar}>Cancelar</button><button type="button" onClick={onConfirmar} className={estilos.botonEliminarConfirmar}>Sí, Eliminar</button></div></div></div>
);

const GestionContenido = ({ curso, onSaveContenido }) => {
    const [secciones, setSecciones] = useState([]);
    const [claseAbierta, setClaseAbierta] = useState(null);
    const [vistaEditor, setVistaEditor] = useState({});
    const [itemEditando, setItemEditando] = useState({ id: null, tipo: null });
    const [textoTemporal, setTextoTemporal] = useState('');
    const [itemParaEliminar, setItemParaEliminar] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (curso && curso.sections) {
            const initialSections = curso.sections.map(section => ({ id: section.id, titulo: section.title, sectionOrder: section.sectionOrder, clases: section.lessons ? section.lessons.map(lesson => ({ id: lesson.id, title: lesson.title, contentType: lesson.contentType, videoUrl: lesson.videoUrl, articleContent: lesson.articleContent, lessonOrder: lesson.lessonOrder })) : [] }));
            setSecciones(initialSections);
        } else if (curso && !curso.sections) {
            // Asegúrate de que las secciones se inicialicen correctamente si el curso no tiene secciones
            setSecciones([]); // Iniciar con un array vacío si no hay secciones
        }
    }, [curso]);

    const handleAñadirSeccion = () => {
        const nuevaSeccion = { id: `seccion_temp_${Date.now()}`, titulo: `Nueva Sección ${secciones.length + 1}`, sectionOrder: secciones.length, clases: [] };
        setSecciones([...secciones, nuevaSeccion]);
    };

    const handleAñadirClase = (idSeccion) => {
        const nuevasSecciones = secciones.map(seccion => {
            if (seccion.id === idSeccion) {
                const nuevaClase = { id: `clase_temp_${Date.now()}`, title: `Nueva Clase ${seccion.clases.length + 1}`, contentType: null, videoUrl: null, articleContent: null, lessonOrder: seccion.clases.length };
                return { ...seccion, clases: [...seccion.clases, nuevaClase] };
            }
            return seccion;
        });
        setSecciones(nuevasSecciones);
    };

    const handleIniciarEdicion = (id, tipo, tituloActual) => {
        setItemEditando({ id, tipo });
        setTextoTemporal(tituloActual);
    };

    const handleGuardarEdicion = () => {
        if (!itemEditando.id) return;
        if (itemEditando.tipo === 'seccion') {
            setSecciones(secciones.map(s => s.id === itemEditando.id ? { ...s, titulo: textoTemporal } : s));
        } else if (itemEditando.tipo === 'clase') {
            setSecciones(secciones.map(s => ({ ...s, clases: s.clases.map(c => c.id === itemEditando.id ? { ...c, title: textoTemporal } : c) })));
        }
        setItemEditando({ id: null, tipo: null });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleGuardarEdicion();
        else if (event.key === 'Escape') setItemEditando({ id: null, tipo: null });
    };

    const handleConfirmarEliminacion = () => {
        if (!itemParaEliminar) return;
        if (itemParaEliminar.tipo === 'seccion') {
            setSecciones(secciones.filter(s => s.id !== itemParaEliminar.id));
        } else if (itemParaEliminar.tipo === 'clase') {
            setSecciones(secciones.map(s => {
                if (s.id === itemParaEliminar.idSeccion) {
                    return { ...s, clases: s.clases.filter(c => c.id !== itemParaEliminar.id) };
                }
                return s;
            }));
        }
        setItemParaEliminar(null);
    };

    const toggleEditorContenido = (claseId, currentContentType) => {
        setClaseAbierta(claseAbierta === claseId ? null : claseId);
        if (claseAbierta !== claseId) {
            setVistaEditor(prev => ({ ...prev, [claseId]: currentContentType || 'seleccionar' }));
        }
    };

    const handleSelectTipoContenido = (claseId, tipo) => {
        setVistaEditor(prev => ({ ...prev, [claseId]: tipo.toUpperCase() }));
        setSecciones(prevSecciones => prevSecciones.map(seccion => ({ ...seccion, clases: seccion.clases.map(clase => { if (clase.id === claseId) { return { ...clase, contentType: tipo.toUpperCase() }; } return clase; }) })));
    };

    const handleContentChange = (claseId, field, value) => {
        setSecciones(prevSecciones => prevSecciones.map(seccion => ({ ...seccion, clases: seccion.clases.map(clase => { if (clase.id === claseId) { return { ...clase, [field]: value }; } return clase; }) })));
    };

    const handleFileChange = (event, claseId) => {
        const files = event.target.files;
        if (files.length > 0) {
            toast.info(`Video para '${claseId}' seleccionado: ${files[0].name}. Simulación de subida.`);
            const simulatedVideoUrl = `https://example.com/videos/${claseId}_${files[0].name.replace(/\s/g, '_')}`;
            handleContentChange(claseId, 'videoUrl', simulatedVideoUrl);
        }
    };

    const handleGuardarPrograma = () => {
        const sectionsToSave = secciones.map((seccion, sectionIndex) => ({ id: typeof seccion.id === 'number' ? seccion.id : null, title: seccion.titulo, sectionOrder: sectionIndex, lessons: seccion.clases.map((clase, lessonIndex) => ({ id: typeof clase.id === 'number' ? clase.id : null, title: clase.title, contentType: clase.contentType, videoUrl: clase.videoUrl || null, articleContent: clase.articleContent || null, lessonOrder: lessonIndex })) }));
        onSaveContenido({ sections: sectionsToSave });
    };

    return (
        <div className={estilos.curriculumContainer}>
            <p className={estilos.infoTexto}>Empieza a dar forma a tu curso creando secciones, clases y ejercicios prácticos.</p>
            <button type="button" onClick={handleAñadirSeccion} className={estilos.botonAñadirSeccion}><FiPlus /> Añadir Sección</button>
            <div className={estilos.listaCurriculum}>{secciones.map((seccion, index) => (
                <div key={seccion.id} className={estilos.seccionContenedor}>
                    <div className={estilos.seccionHeader}>{itemEditando.id === seccion.id ? (<input type="text" value={textoTemporal} onChange={(e) => setTextoTemporal(e.target.value)} onBlur={handleGuardarEdicion} onKeyDown={handleKeyDown} className={estilos.inputEdicion} autoFocus />) : (<span><strong>Sección {index + 1}:</strong> {seccion.titulo}</span>)}<div className={estilos.seccionAcciones}><button type="button" onClick={() => handleIniciarEdicion(seccion.id, 'seccion', seccion.titulo)} className={estilos.botonIcono}><FiEdit2 size={16} /></button><button type="button" onClick={() => setItemParaEliminar({ id: seccion.id, tipo: 'seccion' })} className={estilos.botonIcono}><FiTrash2 size={16} /></button></div></div>
                    <div className={estilos.listaClases}>{seccion.clases.map((clase, idx) => (
                        <div key={clase.id} className={estilos.claseWrapper}>
                            <div className={estilos.claseItem}>{itemEditando.id === clase.id ? (<input type="text" value={textoTemporal} onChange={(e) => setTextoTemporal(e.target.value)} onBlur={handleGuardarEdicion} onKeyDown={handleKeyDown} className={estilos.inputEdicion} autoFocus />) : (<span><strong>Clase {idx + 1}:</strong> {clase.title}</span>)}<div className={estilos.claseAcciones}><button type="button" onClick={() => toggleEditorContenido(clase.id, clase.contentType)} className={estilos.botonContenido}><FiPlus /> Contenido</button><button type="button" onClick={() => handleIniciarEdicion(clase.id, 'clase', clase.title)} className={estilos.botonIcono}><FiEdit2 size={16} /></button><button type="button" onClick={() => setItemParaEliminar({ id: clase.id, tipo: 'clase', idSeccion: seccion.id })} className={estilos.botonIcono}><FiTrash2 size={16} /></button></div></div>
                            {claseAbierta === clase.id && (<div className={estilos.editorContenido}><div className={estilos.editorHeader}><h4>Añadir contenido a: <strong>{clase.title}</strong></h4>{vistaEditor[clase.id] !== 'seleccionar' && (<button type="button" onClick={() => handleSelectTipoContenido(clase.id, 'seleccionar')} className={estilos.botonVolverSeleccion}><FiArrowLeft /> Volver a seleccionar</button>)}</div>{vistaEditor[clase.id] === 'seleccionar' && (<div className={estilos.selectorTipoContenido}><p>Seleccionar tipo de contenido principal.</p><div className={estilos.botonesTipo}><button type="button" onClick={() => handleSelectTipoContenido(clase.id, 'video')} className={estilos.botonTipoContenido}><FiVideo size={24} /><span>Video</span></button><button type="button" onClick={() => handleSelectTipoContenido(clase.id, 'article')} className={estilos.botonTipoContenido}><FiFileText size={24} /><span>Artículo</span></button></div></div>)}{vistaEditor[clase.id] === 'VIDEO' && (<div><input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e, clase.id)} style={{ display: 'none' }} accept="video/*" /><div className={estilos.uploadContainer} onClick={() => fileInputRef.current.click()}><FiUploadCloud size={40} /><p>{clase.videoUrl ? `Video actual: ${clase.videoUrl.substring(clase.videoUrl.lastIndexOf('/') + 1)}` : 'Arrastra y suelta o haz clic para seleccionar tu video.'}</p>{clase.videoUrl && <span className={estilos.textoUrlActual}>URL: {clase.videoUrl}</span>}</div></div>)}{vistaEditor[clase.id] === 'ARTICLE' && (<div className={estilos.editorArticulo}><textarea placeholder="Escribe tu artículo aquí..." rows="15" value={clase.articleContent || ''} onChange={(e) => handleContentChange(clase.id, 'articleContent', e.target.value)}></textarea></div>)}</div>)}
                        </div>
                    ))}<button type="button" onClick={() => handleAñadirClase(seccion.id)} className={estilos.botonAñadir}><FiPlus /> Añadir Elemento</button></div>
                </div>
            ))}</div>
            <div className={estilos.curriculumFooter}><button type="button" onClick={handleGuardarPrograma} className={estilos.botonGuardarPrograma}><FiSave /> Guardar Programa</button></div>
            {itemParaEliminar && (<ModalConfirmacion mensaje={`¿Estás seguro de que quieres eliminar esta ${itemParaEliminar.tipo}? Esta acción no se puede deshacer.`} onConfirmar={handleConfirmarEliminacion} onCancelar={() => setItemParaEliminar(null)} />)}
        </div>
    );
};

const EditarCursoPagina = () => {
    const { cursoId } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn, loading: authLoading } = useAuth();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('info');

    useEffect(() => {
        const fetchCurso = async () => {
            if (authLoading) return;
            if (!isLoggedIn || !user || !user.token) {
                toast.error("No autorizado. Inicia sesión para editar cursos.");
                navigate('/login');
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${API_BASE_URL}/courses/${cursoId}`, { headers: { 'Authorization': `Bearer ${user.token}` } });
                setCurso(response.data);
            } catch (err) {
                console.error('Error al cargar curso para edición:', err.response?.data || err.message);
                setError('No se pudo cargar el curso para edición. Verifica el ID o tus permisos.');
                toast.error('No se pudo cargar el curso para edición.');
                if (err.response && (err.response.status === 404 || err.response.status === 403 || err.response.status === 401)) {
                    navigate('/panel-profesor');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCurso();
    }, [cursoId, isLoggedIn, user, authLoading, navigate]);

    const handleSave = async (dataToSend) => {
        if (!user || !user.token) {
            toast.error("No estás autenticado.");
            navigate('/login');
            return;
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/courses/${curso.id}`, dataToSend, { headers: { 'Authorization': `Bearer ${user.token}` } });
            setCurso(response.data); // Actualiza el estado con la respuesta del servidor
            toast.success("Curso actualizado con éxito.");
        } catch (err) {
            console.error('Error al guardar el curso:', err.response?.data || err.message);
            toast.error('Error al actualizar el curso.');
        }
    };

    const handleSaveInfo = async (updatedData) => {
        const backendLevel = mapLevelToBackend(updatedData.level);
        if (!backendLevel) {
            toast.error("Nivel del curso no reconocido.");
            return;
        }
        const dataToSend = { ...curso, ...updatedData, level: backendLevel, summarySyllabus: updatedData.summarySyllabus };
        handleSave(dataToSend);
    };

    const handleSaveContenido = async (updatedContent) => {
        const dataToSend = { ...curso, sections: updatedContent.sections };
        handleSave(dataToSend);
    };

    const handlePublicarCurso = async () => {
        if (!curso || !curso.id) return;
        try {
            const newPublishStatus = !curso.isPublished;
            const response = await axios.put(`${API_BASE_URL}/courses/${curso.id}/publish?publish=${newPublishStatus}`, null, { headers: { 'Authorization': `Bearer ${user.token}` } });
            if (response.status === 200) {
                toast.success(`Curso ${newPublishStatus ? 'publicado' : 'despublicado'} exitosamente!`);
                setCurso(prev => ({ ...prev, isPublished: newPublishStatus }));
            }
        } catch (err) {
            console.error('Error al publicar/despublicar curso:', err.response?.data || err.message);
            // Mostrar un mensaje de error más detallado si viene del backend
            const errorMessage = err.response?.data?.message || `Error al ${curso.isPublished ? 'despublicar' : 'publicar'} el curso.`;
            toast.error(errorMessage);
        }
    };

    if (loading) return <div className={estilos.paginaContenedor}>Cargando curso para edición...</div>;
    if (error) return <div className={estilos.paginaContenedor}><p className={estilos.mensajeError}>{error}</p><Link to="/panel-profesor" className={estilos.botonVolver}>Volver al Panel</Link></div>;
    if (!curso) return <div className={estilos.paginaContenedor}>Curso no encontrado para edición.</div>;

    const renderVista = () => {
        switch (vistaActiva) {
            case 'info': return <FormularioEditarInfo curso={curso} onSave={handleSaveInfo} />;
            case 'contenido': return <GestionContenido curso={curso} onSaveContenido={handleSaveContenido} />;
            case 'alumnos': return <ListaAlumnos />;
            default: return <FormularioEditarInfo curso={curso} onSave={handleSaveInfo} />;
        }
    };

    return (
        <div className={estilos.paginaContenedor}>
            <header className={estilos.cabeceraPagina}><div><span className={estilos.navegacion}><Link to="/panel-profesor">Panel del Profesor</Link> / Editar Curso</span><h1>{curso.title}</h1></div><Link to="/panel-profesor" className={estilos.botonVolver}><FiXCircle /> Salir</Link></header>
            <div className={estilos.layoutPrincipal}>
                <aside className={estilos.sidebar}><nav><button type="button" onClick={() => setVistaActiva('info')} className={vistaActiva === 'info' ? estilos.linkActivo : ''}><FiInfo /> Información</button><button type="button" onClick={() => setVistaActiva('contenido')} className={vistaActiva === 'contenido' ? estilos.linkActivo : ''}><FiVideo /> Contenido</button><button type="button" onClick={() => setVistaActiva('alumnos')} className={vistaActiva === 'alumnos' ? estilos.linkActivo : ''}><FiUsers /> Alumnos</button><button type="button" onClick={handlePublicarCurso} className={estilos.botonPublicar}><FiSend /> {curso.isPublished ? 'Despublicar Curso' : 'Publicar Curso'}</button></nav></aside>
                <main className={estilos.contenido}>{renderVista()}</main>
            </div>
        </div>
    );
};

export default EditarCursoPagina;