// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import CuentaUsuario from './paginas/Usuario/CuentaUsuario.jsx'; // Tu componente principal de cuenta
// import UsuarioLogeado from './paginas/UsuarioLogeado/UsuarioLogeado.jsx'; // Eliminado o reubicado si es un dashboard diferente
import CrearCursoPagina from './paginas/CrearCursoPagina/CrearCursoPagina.jsx';

// --- PÁGINAS DE ESTADO DE PAGO ---
import PaymentSuccess from './paginas/PaymentSuccess.jsx';
import PaymentFailure from './paginas/PaymentFailure.jsx';
import PaymentPending from './paginas/PaymentPending.jsx';

// --- PÁGINAS DE GESTIÓN DE CUENTA DE USUARIO ---
// Asegúrate de que las rutas relativas sean correctas para tu estructura de carpetas
import ChangePasswordPage from './paginas/CuentaUsuario/ChangePasswordPage.jsx';
import EditProfilePage from './paginas/CuentaUsuario/EditProfilePage.jsx';
import PaymentHistoryPage from './paginas/CuentaUsuario/PaymentHistoryPage.jsx';
import PrivacySettingsPage from './paginas/CuentaUsuario/PrivacySettingsPage.jsx';

// --- CSS ---
import './App.css';

const AppLayout = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="layout-container">
            {isLoggedIn ? <EncabezadoLogeado /> : <Encabezado />}

            <main>
                <Routes>
                    <Route path="/" element={<PaginaDeInicio />} />
                    <Route path="/cursos/:cursoId" element={<DetalleCurso />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/convertirse-en-instructor" element={<TerminosInstructor />} />
                    <Route path="/panel-profesor" element={<PanelProfesor />} />
                    <Route path="/panel-profesor/crear-curso" element={<CrearCursoPagina />} />
                    <Route path="/mis-cursos-comprados" element={<MisCursosComprados />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                    <Route path="/dashboard" element={<PaginaDeInicio />} /> {/* Si dashboard es PaginaDeInicio */}

                    {/* --- RUTAS ESPECÍFICAS DE MERCADO PAGO --- */}
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/failure" element={<PaymentFailure />} />
                    <Route path="/payment/pending" element={<PaymentPending />} />

                    {/* --- RUTAS DE GESTIÓN DE CUENTA DE USUARIO (¡TODAS BAJO /cuenta!) --- */}
                    <Route path="/cuenta" element={<CuentaUsuario />} /> {/* Página principal de la cuenta */}
                    <Route path="/cuenta/cambiar-contrasena" element={<ChangePasswordPage />} />
                    <Route path="/cuenta/editar-perfil" element={<EditProfilePage />} />
                    <Route path="/cuenta/historial-pagos" element={<PaymentHistoryPage />} />
                    <Route path="/cuenta/ajustes-privacidad" element={<PrivacySettingsPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <CarritoProvider>
                    <AppLayout />
                </CarritoProvider>
            </AuthProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
