import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/auth/useLogin';
import { LoginRequest } from '../../types/authTypes';
import StyledAuthFormAlert from '../styles/StyledAuthFormAlert';
import StyledAuthFormBox from '../styles/StyledAuthFormBox';
import StyledAuthFormContainer from '../styles/StyledAuthFormContainer';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { alertMessage, alertSeverity, handleLogin, setAlertMessage } = useLogin();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertMessage('');
        const loginRequest: LoginRequest = { username, password };
        handleLogin(loginRequest);
    };

    return (
        <StyledAuthFormContainer maxWidth="sm">
            <StyledAuthFormBox>
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
                    Login
                </Typography>
                {alertMessage && (
                    <StyledAuthFormAlert severity={alertSeverity}>
                        {alertMessage}
                    </StyledAuthFormAlert>
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
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        Login
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Button component={Link} to="/register" variant="text">
                        Register here
                    </Button>
                </Typography>
                <Typography variant="body2">
                    Forgot your password?{' '}
                    <Button component={Link} to="/forgot-password" variant="text">
                        Click here
                    </Button>
                </Typography>
            </StyledAuthFormBox>
        </StyledAuthFormContainer>
    );
};

export default Login;
