import { useState } from 'react';
import { resetPassword } from '../../api/authApi';
import messages from '../../constants/messages';
import { ResetPasswordRequest } from '../../types/authTypes';

const useResetPassword = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'error' | 'success'>('error');

    const handleResetPassword = async (data: ResetPasswordRequest) => {
        try {
            await resetPassword(data);
            setAlertSeverity('success');
            setAlertMessage(messages.auth.resetPasswordSuccess);
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(messages.auth.resetPasswordFailure);
            console.error('Reset password failed', error);
        }
    };

    return {
        alertMessage,
        alertSeverity,
        handleResetPassword,
        setAlertMessage,
    };
};

export default useResetPassword;
