import { AlertColor } from '@mui/material';
import { useState } from 'react';
import { register } from '../../api/authApi';
import messages from '../../constants/messages';
import { RegisterRequest } from '../../types/authTypes';

const useRegister = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(undefined);

    const handleRegister = async (data: RegisterRequest) => {
        try {
            await register(data);
            setAlertSeverity('success');
            setAlertMessage(messages.auth.registrationSuccess);
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(messages.auth.registrationFailure);
            console.error('Registration failed', error);
        }
    };

    return {
        alertMessage,
        alertSeverity,
        handleRegister,
        setAlertMessage,
    };
};

export default useRegister;
