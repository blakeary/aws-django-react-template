import { AlertColor } from '@mui/material';
import { useState } from 'react';
import { verifyEmail } from '../../api/authApi';
import messages from '../../constants/messages';
import { VerifyEmailRequest } from '../../types/authTypes';

const useVerifyEmail = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(undefined);

    const handleVerifyEmail = async (data: VerifyEmailRequest) => {
        try {
            await verifyEmail(data);
            setAlertSeverity('success');
            setAlertMessage(messages.auth.verificationSuccess);
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(messages.auth.verificationFailure);
            console.error('Verification failed', error);
        }
    };

    return {
        alertMessage,
        alertSeverity,
        handleVerifyEmail,
        setAlertMessage,
    };
};

export default useVerifyEmail;
