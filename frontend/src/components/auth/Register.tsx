import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import messages from '../../constants/messages';
import useRegister from '../../hooks/auth/useRegister';
import { RegisterRequest } from '../../types/authTypes';
import { PasswordValidationResult, validatePassword } from '../../utils/passwordValidator';
import StyledAuthFormAlert from '../styles/StyledAuthFormAlert';
import StyledAuthFormBox from '../styles/StyledAuthFormBox';
import StyledAuthFormContainer from '../styles/StyledAuthFormContainer';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { alertMessage, alertSeverity, handleRegister, setAlertMessage } = useRegister();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertMessage('');
        setValidationErrors([]);
        if (password !== confirmPassword) {
            setValidationErrors([messages.auth.passwordMismatch]);
            return;
        }

        const { isValid, errors }: PasswordValidationResult = validatePassword(password, { username, email });

        if (!isValid) {
            setValidationErrors(errors);
            return;
        }

        const registerRequest: RegisterRequest = { username, email, password };
        handleRegister(registerRequest);
    };

    return (
        <StyledAuthFormContainer maxWidth="sm">
            <StyledAuthFormBox>
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
                    Register
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
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
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
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="password"
                        label="Confirm Password"
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
                        Register
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account?{' '}
                    <Button component={Link} to="/login" variant="text">
                        Login here
                    </Button>
                </Typography>
            </StyledAuthFormBox>
        </StyledAuthFormContainer>
    );
};

export default Register;
