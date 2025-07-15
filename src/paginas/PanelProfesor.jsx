import React from 'react';
import CrearCurso from '../componentes/CrearCurso/CrearCurso.jsx';
import MisCursos from '../componentes/MisCursos/MisCursos.jsx';
import CursosCreados from '../componentes/CursosCreados/CursosCreados.jsx';

const panelEstilos = {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
};

const PanelProfesor = () => {
    return (
        <div style={panelEstilos}>
            <CrearCurso />
            <CursosCreados />
        </div>
    );
};

export default PanelProfesor;
