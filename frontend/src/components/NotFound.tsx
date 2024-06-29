import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../assets/images/not-found/undraw_page_not_found.svg';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box
                height="90vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <img src={notFoundImage} alt="404 - Page Not Found" style={{ maxWidth: '50%', height: 'auto' }} />
                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{ marginTop: 4 }}
                >
                    Return Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
