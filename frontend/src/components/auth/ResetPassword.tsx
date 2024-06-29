import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import messages from '../../constants/messages';
import useResetPassword from '../../hooks/auth/useResetPassword';
import { ResetPasswordRequest } from '../../types/authTypes';
import StyledAuthFormAlert from '../styles/StyledAuthFormAlert';
import StyledAuthFormBox from '../styles/StyledAuthFormBox';
import StyledAuthFormContainer from '../styles/StyledAuthFormContainer';

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { alertMessage, alertSeverity, handleResetPassword, setAlertMessage } = useResetPassword();
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertMessage('');
        setValidationErrors([]);

        if (!token) {
            setAlertMessage(messages.auth.resetPasswordFailure);
            return;
        }

        if (newPassword !== confirmPassword) {
            setValidationErrors(['Passwords do not match']);
            return;
        }

        const resetPasswordRequest: ResetPasswordRequest = { token, new_password: newPassword };
        handleResetPassword(resetPasswordRequest)
            .then(() => {
                navigate('/login');
            })
            .catch(() => {
                setAlertMessage(messages.auth.resetPasswordFailure);
            });
    };

    return (
        <StyledAuthFormContainer maxWidth="sm">
            <StyledAuthFormBox>
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
                    Reset Password
                </Typography>
                {alertMessage && (
                    <StyledAuthFormAlert severity={alertSeverity}>
                        {alertMessage}
                    </StyledAuthFormAlert>
                )}
                {validationErrors.length > 0 && (
                    <Box mt={2}>
                        {validationErrors.map((error, index) => (
                            <StyledAuthFormAlert severity="error" key={index}>
                                {error}
                            </StyledAuthFormAlert>
                        ))}
                    </Box>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="password"
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Reset Password
                    </Button>
                </Box>
            </StyledAuthFormBox>
        </StyledAuthFormContainer>
    );
};

export default ResetPassword;
