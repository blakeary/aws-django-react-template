import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useForgotPassword from '../../hooks/auth/useForgotPassword';
import { ForgotPasswordRequest } from '../../types/authTypes';
import StyledAuthFormAlert from '../styles/StyledAuthFormAlert';
import StyledAuthFormBox from '../styles/StyledAuthFormBox';
import StyledAuthFormContainer from '../styles/StyledAuthFormContainer';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const { alertMessage, alertSeverity, handleForgotPassword, setAlertMessage } = useForgotPassword();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertMessage('');
        const forgotPasswordRequest: ForgotPasswordRequest = { email };
        handleForgotPassword(forgotPasswordRequest);
    };

    return (
        <StyledAuthFormContainer maxWidth="sm">
            <StyledAuthFormBox>
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
                    Forgot Password
                </Typography>
                {alertMessage && (
                    <StyledAuthFormAlert severity={alertSeverity}>
                        {alertMessage}
                    </StyledAuthFormAlert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </StyledAuthFormBox>
        </StyledAuthFormContainer>
    );
};

export default ForgotPassword;
