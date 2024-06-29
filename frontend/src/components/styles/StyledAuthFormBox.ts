import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledAuthFormBox = styled(Box)(({ theme }) => ({
    maxWidth: 500,
    margin: '0 auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        maxWidth: 500,
    },
}));

export default StyledAuthFormBox;