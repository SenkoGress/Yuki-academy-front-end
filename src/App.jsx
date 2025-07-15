// src/App.jsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- CONTEXTOS ---
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


import AppLayout from './componentes/layouts/AppLayout.jsx'; 


// --- CSS.modules ---
import './App.css';

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