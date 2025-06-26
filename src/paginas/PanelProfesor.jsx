import React from 'react';

const panelEstilos = {
  padding: '32px',
  maxWidth: '1200px',
  margin: '0 auto',
};

import CrearCurso from '../componentes/CrearCurso/CrearCurso.jsx';
import MisCursos from '../componentes/MisCursos/MisCursos.jsx';

const PanelProfesor = () => {
  return (
    <div style={panelEstilos}>
      <CrearCurso />
      <MisCursos />
    </div>
  );
};

export default PanelProfesor;