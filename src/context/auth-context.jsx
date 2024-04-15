'use client'
import {useRouter} from 'next/navigation';
import React, {createContext, useContext, useState, useEffect} from 'react';

// Create the authentication context
const AuthContext = createContext(undefined);

// Authentication provider component
export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState()

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            try {
                setUserInfo(JSON.parse(savedUserInfo)); // Parse userInfo only if it exists
            } catch (error) {
                console.error('Error parsing user info:', error);
            }
        }
    }, []);

    function register(token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }

    function login(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(user))
        setUserInfo(user)
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/')
    }

    const contextValue = {
        isAuthenticated,
        userInfo,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Custom hook to use the authentication context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}