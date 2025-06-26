// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Cargar el estado de autenticación desde localStorage al iniciar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const storedEmail = localStorage.getItem('userEmail');
        const storedRoles = localStorage.getItem('userRoles');

        if (token && storedEmail && storedRoles) {
            try {
                setUser({
                    id: localStorage.getItem('userId'),
                    email: storedEmail,
                    firstName: localStorage.getItem('userFirstName'),
                    lastName: localStorage.getItem('userLastName'),
                    roles: JSON.parse(storedRoles)
                });
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Error al parsear roles o datos de usuario desde localStorage", e);
                // Limpiar datos inválidos si no se pueden parsear
                localStorage.clear();
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    }, []);

    const login = (token, id, email, firstName, lastName, roles) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userFirstName', firstName);
        localStorage.setItem('userLastName', lastName);
        localStorage.setItem('userRoles', JSON.stringify(roles));

        setUser({ id, email, firstName, lastName, roles });
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.clear(); // Limpia todos los datos de la sesión
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login'); // Redirige al usuario a la página de login
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};