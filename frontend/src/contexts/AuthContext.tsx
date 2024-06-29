import { jwtDecode } from 'jwt-decode';
import React, { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { login, refreshToken } from '../api/authApi';
import { LoginRequest, LoginResponse, RefreshTokenResponse } from '../types/authTypes';

export interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
    setAccessToken: (token: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

interface JwtPayload {
    exp: number;
    [key: string]: unknown;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('access_token'));

    const isTokenExpired = (token: string): boolean => {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        return decoded.exp < Date.now() / 1000;
    };

    const refreshAuthToken = useCallback(async (): Promise<void> => {
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue || isTokenExpired(refreshTokenValue)) {
            logout();
            return;
        }

        try {
            const response: RefreshTokenResponse = await refreshToken({ refresh: refreshTokenValue });
            const { access } = response;
            localStorage.setItem('access_token', access);
            setAccessToken(access);
            setIsAuthenticated(true);
        } catch (error) {
            logout();
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token && isTokenExpired(token)) {
            refreshAuthToken();
        }
    }, [refreshAuthToken]);

    const loginUser = async (data: LoginRequest) => {
        try {
            const response: LoginResponse = await login(data);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            setAccessToken(response.access);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAccessToken(null);
        setIsAuthenticated(false);
    };

    const value = {
        accessToken,
        isAuthenticated,
        login: loginUser,
        logout,
        setAccessToken,
        setIsAuthenticated,
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};