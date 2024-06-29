import { useState } from 'react';
import { forgotPassword } from '../../api/authApi';
import messages from '../../constants/messages';
import { ForgotPasswordRequest } from '../../types/authTypes';

const useForgotPassword = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'error' | 'success'>('error');

    const handleForgotPassword = async (data: ForgotPasswordRequest) => {
        try {
            await forgotPassword(data);
            setAlertSeverity('success');
            setAlertMessage(messages.auth.forgotPasswordSuccess);
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(messages.auth.forgotPasswordFailure);
            console.error('Forgot password failed', error);
        }
    };

    return {
        alertMessage,
        alertSeverity,
        handleForgotPassword,
        setAlertMessage,
    };
};

export default useForgotPassword;
