// src/paginas/UsuarioLogeado/UsuarioLogeado.jsx

import React from 'react';
// import estilos from './UsuarioLogeado.module.css'; // Comentado/Eliminado: no se usan estilos directamente aquí

// 1. Importamos todos los componentes de la página de inicio
import Carrusel from '../../componentes/Carrusel/Carrusel.jsx';
import CursosDestacados from '../../componentes/CursosDestacados/CursosDestacados.jsx';
import MasVisto from '../../componentes/MasVisto/MasVisto.jsx';
import Informacion from '../../componentes/Informacion/Informacion.jsx';
import Alianzas from '../../componentes/Alianzas/Alianzas.jsx';
import Precios from '../../componentes/Precios/Precios.jsx';

const UsuarioLogeado = () => {
    return (
        // Usamos un Fragment (<>) para envolver todos los elementos
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

export default UsuarioLogeado;
