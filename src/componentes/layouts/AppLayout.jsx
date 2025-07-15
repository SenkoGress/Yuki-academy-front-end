// src/componentes/layouts/AppLayout.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Encabezado from '../Encabezado/Encabezado.jsx';
import EncabezadoLogeado from '../EncabezadoLogeado/EncabezadoLogeado.jsx';
import Footer from '../Footer/Footer.jsx';

// --- PÁGINAS ---
import Login from '../../paginas/Login/Login.jsx';
import Registro from '../../paginas/Registro/Registro.jsx';
import PaginaDeInicio from '../../paginas/PaginaDeInicio.jsx';
import DetalleCurso from '../../paginas/DetalleCurso/DetalleCurso.jsx';
import Cursos from '../../paginas/Cursos/Cursos.jsx';
import Carrito from '../../paginas/Carrito.jsx';
import PaymentSuccess from '../../paginas/PaymentSuccess.jsx';
import PaymentFailure from '../../paginas/PaymentFailure.jsx';
import PaymentPending from '../../paginas/PaymentPending.jsx';
import CuentaUsuario from '../../paginas/Usuario/CuentaUsuario.jsx';
import EditProfilePage from '../../paginas/CuentaUsuario/EditProfilePage.jsx';
import PaymentHistoryPage from '../../paginas/CuentaUsuario/PaymentHistoryPage.jsx';
import PerfilUsuario from '../../paginas/Usuario/PerfilUsuario.jsx';
import ChangePasswordPage from '../../paginas/CuentaUsuario/ChangePasswordPage.jsx';
import PrivacySettingsPage from '../../paginas/CuentaUsuario/PrivacySettingsPage.jsx';
import TerminosInstructor from '../../paginas/TerminosInstructor/TerminosInstructor.jsx';
import PanelProfesor from '../../paginas/PanelProfesor.jsx';
import CrearCursoPagina from '../../paginas/CrearCursoPagina/CrearCursoPagina.jsx';
import EditarCursoPagina from '../../paginas/EditarCursoPagina/EditarCursoPagina.jsx';
import MisCursosComprados from '../../paginas/MisCursosComprados/MisCursosComprados.jsx';
import NotificacionesPage from '../../paginas/Notificaciones/NotificacionesPage.jsx';

// --- IMPORTACIÓN AÑADIDA ---
import VerCursoPagina from '../../paginas/VerCursoPagina/VerCursoPagina.jsx';


const AppLayout = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="layout-container">
            {isLoggedIn ? <EncabezadoLogeado /> : <Encabezado />}

            <main>
                <Routes>
                    {/* Rutas de autenticación */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    {/* Rutas públicas o de inicio */}
                    <Route path="/" element={<PaginaDeInicio />} />
                    <Route path="/pagina-del-inicio" element={<PaginaDeInicio />} />

                    {/* Rutas de cursos públicas */}
                    <Route path="/cursos" element={<Cursos />} />
                    <Route path="/cursos/:cursoId" element={<DetalleCurso />} />

                    {/* --- RUTA AÑADIDA --- */}
                    <Route path="/ver-curso/:cursoId" element={<VerCursoPagina />} />

                    {/* Rutas de carrito y pagos */}
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/pending" element={<PaymentPending />} />
                    <Route path="/payment/failure" element={<PaymentFailure />} />

                    {/* --- Rutas de gestión de cuenta de usuario (todas bajo /cuenta) --- */}
                    <Route path="/cuenta" element={<CuentaUsuario />} />
                    <Route path="/cuenta/cambiar-contrasena" element={<ChangePasswordPage />} />
                    <Route path="/cuenta/editar-perfil" element={<EditProfilePage />} />
                    <Route path="/cuenta/historial-pagos" element={<PaymentHistoryPage />} />
                    <Route path="/cuenta/ajustes-privacidad" element={<PrivacySettingsPage />} />
                    <Route path="/notificaciones" element={<NotificacionesPage />} />

                    {/* Rutas de Instructor/Profesor */}
                    <Route path="/convertirse-en-instructor" element={<TerminosInstructor />} />
                    <Route path="/panel-profesor" element={<PanelProfesor />} />
                    <Route path="/panel-profesor/crear-curso" element={<CrearCursoPagina />} />
                    <Route path="/panel-profesor/editar-curso/:cursoId" element={<EditarCursoPagina />} />
                    <Route path="/mis-cursos-comprados" element={<MisCursosComprados />} />

                    {/* Otras rutas */}
                    <Route path="/perfil" element={<PerfilUsuario />} />
                    <Route path="/dashboard" element={<PaginaDeInicio />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default AppLayout;