import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();
const API_URL = "http://localhost:3000/api/users/login"; //"https://minventory-express-mdb.vercel.app/api/users/login";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const savedUser = localStorage.getItem('admin_user');
        if (savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {

            const data = await authService.login({ email: email, password: password })

            if (data) {
                // Asumiendo que la API devuelve el objeto del usuario o un token
                setUser(data);
                localStorage.setItem('admin_user', JSON.stringify(data));
                return { success: true };
            } else {
                // Manejo de errores que vienen de la API (ej. "Usuario no encontrado")
                return { success: false, message: data.message || "Error al iniciar sesión" };
            }
        } catch (error) {
            return { success: false, message: "Error: " + error };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);