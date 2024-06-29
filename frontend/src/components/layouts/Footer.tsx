import { Container, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import React from 'react';
import defaultTheme from '../../themes/defaultTheme';

const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: 'auto',
}));

const Footer: React.FC = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <FooterContainer>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                        your-app-name
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        © {new Date().getFullYear()} <your-app-name>. All rights reserved.
                    </Typography>
                </Container>
            </FooterContainer>
        </ThemeProvider>
    );
};

export default Footer;
