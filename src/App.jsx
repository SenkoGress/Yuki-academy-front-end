// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- CONTEXTOS ---
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// --- COMPONENTES DE LAYOUT ---
import Encabezado from './componentes/Encabezado/Encabezado.jsx';
import EncabezadoLogeado from './componentes/EncabezadoLogeado/EncabezadoLogeado.jsx';
import Footer from './componentes/Footer/Footer.jsx';

// --- PÁGINAS ---
import PaginaDeInicio from './paginas/PaginaDeInicio.jsx';
import DetalleCurso from './paginas/DetalleCurso/DetalleCurso.jsx';
import Registro from './paginas/Registro/Registro.jsx';
import Login from './paginas/Login/Login.jsx';
import Carrito from './paginas/Carrito.jsx';
import TerminosInstructor from './paginas/TerminosInstructor/TerminosInstructor.jsx';
import PanelProfesor from './paginas/PanelProfesor.jsx';
import MisCursosComprados from './paginas/MisCursosComprados/MisCursosComprados.jsx';
import PerfilUsuario from './paginas/Usuario/PerfilUsuario.jsx';
import CuentaUsuario from './paginas/Usuario/CuentaUsuario.jsx';
import UsuarioLogeado from './paginas/UsuarioLogeado/UsuarioLogeado.jsx';
import CrearCursoPagina from './paginas/CrearCursoPagina/CrearCursoPagina.jsx'; // 1. IMPORTACIÓN AÑADIDA


// --- CSS ---
import './App.css';

// Componente interno para organizar el layout
const AppLayout = () => {
    // Obtenemos el estado de autenticación desde el contexto
    const { isLoggedIn, _user } = useAuth();
    
    return (
        <div className="layout-container">
            {/* LÓGICA CONDICIONAL PARA EL ENCABEZADO */}
            {isLoggedIn ? (
                <EncabezadoLogeado />
            ) : (
                <Encabezado />
            )}

            <main>
                <Routes>
                    <Route path="/" element={<PaginaDeInicio />} />
                    <Route path="/cursos/:cursoId" element={<DetalleCurso />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/convertirse-en-instructor" element={<TerminosInstructor />} />
                    <Route path="/panel-profesor" element={<PanelProfesor />} />
                    
                    {/* 2. RUTA AÑADIDA PARA CREAR CURSOS */}
                    <Route path="/panel-profesor/crear-curso" element={<CrearCursoPagina />} />

                    <Route path="/mis-cursos-comprados" element={<MisCursosComprados />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                    <Route path="/cuenta" element={<CuentaUsuario />} />
                    <Route path="/mi-cuenta" element={<UsuarioLogeado />} />
                    <Route path="/dashboard" element={<PaginaDeInicio />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};


// El componente principal App ahora solo se encarga de los Providers
function App() {
    return (
        <Router>
            <AuthProvider>
                <CarritoProvider>
                    <AppLayout />
                </CarritoProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;