import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import defaultTheme from '../../themes/defaultTheme';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default DefaultLayout;
