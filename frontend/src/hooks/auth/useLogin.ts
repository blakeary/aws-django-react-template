import { AlertColor } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import messages from '../../constants/messages';
import useAuth from '../../contexts/useAuth';
import { LoginRequest } from '../../types/authTypes';

const useLogin = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
    const navigate = useNavigate();
    const { setAccessToken, setIsAuthenticated } = useAuth();

    const handleLogin = async (data: LoginRequest) => {
        try {
            const response = await login(data);
            setAlertSeverity('success');
            setAlertMessage(messages.auth.loginSuccess);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            setAccessToken(response.access);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(messages.auth.loginFailure);
            console.error('Login failed', error);
        }
    };

    return {
        alertMessage,
        alertSeverity,
        handleLogin,
        setAlertMessage,
    };
};

export default useLogin;
