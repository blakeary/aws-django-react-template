import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import defaultTheme from '../../themes/defaultTheme';
import Footer from './Footer';
import Header from './Header';

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Header />
                <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default HomeLayout;
