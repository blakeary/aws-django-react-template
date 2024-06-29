import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#536dfe',
        },
        secondary: {
            main: '#cbd3fe',
        },
        background: {
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    // Customize breakpoints, spacing, etc.
});

export default defaultTheme;
