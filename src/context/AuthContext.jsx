// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        const loadUserFromLocalStorage = () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const storedId = localStorage.getItem('userId');
                const storedEmail = localStorage.getItem('userEmail');
                const storedFirstName = localStorage.getItem('userFirstName');
                const storedLastName = localStorage.getItem('userLastName');
                let storedRoles = localStorage.getItem('userRoles');
                let storedProfilePictureUrl = localStorage.getItem('userProfilePictureUrl');
                const storedBio = localStorage.getItem('userBio');

                if (token && storedId && storedEmail && storedRoles) {
                    const decodedToken = jwtDecode(token);

                    if (decodedToken.exp * 1000 < Date.now()) {
                        console.log("Token JWT expirado, cerrando sesión automáticamente.");
                        logout();
                    } else {
                        if (storedProfilePictureUrl === '') {
                            storedProfilePictureUrl = null;
                        }
                        try {
                            storedRoles = JSON.parse(storedRoles);
                            if (!Array.isArray(storedRoles)) {
                                storedRoles = [];
                            }
                        } catch (e) {
                            console.error("Error parsing user roles from localStorage:", e);
                            storedRoles = [];
                        }

                        setUser({
                            id: storedId,
                            email: storedEmail,
                            firstName: storedFirstName,
                            lastName: storedLastName,
                            roles: storedRoles,
                            token: token,
                            profilePictureUrl: storedProfilePictureUrl,
                            bio: storedBio || null
                        });
                        setIsLoggedIn(true);
                    }
                }
            } catch (e) {
                console.error("Error al cargar usuario o decodificar token de localStorage:", e);
                localStorage.clear();
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUserFromLocalStorage();
    }, []);

    const login = (token, id, email, firstName, lastName, roles, profilePictureUrl = null, bio = null) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userFirstName', firstName);
        localStorage.setItem('userLastName', lastName);
        localStorage.setItem('userRoles', JSON.stringify(roles));
        if (profilePictureUrl) localStorage.setItem('userProfilePictureUrl', profilePictureUrl);
        else localStorage.removeItem('userProfilePictureUrl');
        if (bio) localStorage.setItem('userBio', bio);
        else localStorage.removeItem('userBio');

        setUser({ id, email, firstName, lastName, roles, token, profilePictureUrl, bio });
        setIsLoggedIn(true);
    };

    const updateUserInContext = (updatedUserData) => {
        setUser(prevUser => {
            const newUser = { ...prevUser, ...updatedUserData };

            if (newUser.id) localStorage.setItem('userId', newUser.id);
            if (newUser.email) localStorage.setItem('userEmail', newUser.email);
            if (newUser.firstName) localStorage.setItem('userFirstName', newUser.firstName);
            if (newUser.lastName) localStorage.setItem('userLastName', newUser.lastName);
            if (newUser.roles) localStorage.setItem('userRoles', JSON.stringify(newUser.roles));
            else localStorage.removeItem('userRoles');

            if (newUser.profilePictureUrl) {
                localStorage.setItem('userProfilePictureUrl', newUser.profilePictureUrl);
            } else {
                localStorage.removeItem('userProfilePictureUrl');
            }
            if (newUser.bio) localStorage.setItem('userBio', newUser.bio);
            else localStorage.removeItem('userBio');

            console.log("AuthContext: Usuario actualizado. Roles:", newUser.roles);
            return newUser;
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, updateUserInContext }}>
            {children}
        </AuthContext.Provider>
    );
};