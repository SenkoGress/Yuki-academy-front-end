import React from 'react';

import Carrusel from '../componentes/Carrusel/Carrusel.jsx'; 
import CursosDestacados from '../componentes/CursosDestacados/CursosDestacados.jsx';
import MasVisto from '../componentes/MasVisto/MasVisto.jsx';
import Informacion from '../componentes/Informacion/Informacion.jsx';
import Alianzas from '../componentes/Alianzas/Alianzas.jsx';
import Precios from '../componentes/Precios/Precios.jsx';

const PaginaDeInicio = () => {
  return (

    <>
      <Carrusel />
      <CursosDestacados />
      <MasVisto />
      <Informacion />
      <Alianzas />
      <Precios />
    </>
  );
};



export default PaginaDeInicio;
