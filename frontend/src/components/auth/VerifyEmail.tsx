import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useVerifyEmail from '../../hooks/auth/useVerifyEmail';
import { VerifyEmailRequest } from '../../types/authTypes';
import StyledAuthFormAlert from '../styles/StyledAuthFormAlert';
import StyledAuthFormBox from '../styles/StyledAuthFormBox';
import StyledAuthFormContainer from '../styles/StyledAuthFormContainer';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const { alertMessage, alertSeverity, handleVerifyEmail, setAlertMessage } = useVerifyEmail();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertMessage('');
        const verifyEmailRequest: VerifyEmailRequest = { token };
        handleVerifyEmail(verifyEmailRequest);
    };

    return (
        <StyledAuthFormContainer maxWidth="sm">
            <StyledAuthFormBox>
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
                    Verify Email
                </Typography>
                {alertMessage && (
                    <StyledAuthFormAlert severity={alertSeverity}>
                        {alertMessage}
                    </StyledAuthFormAlert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Verify Email
                    </Button>
                </Box>
            </StyledAuthFormBox>
        </StyledAuthFormContainer>
    );
};

export default VerifyEmail;
