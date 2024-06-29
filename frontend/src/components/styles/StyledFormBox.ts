import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledFormBox = styled(Box)(({ theme }) => ({
    maxWidth: 750,
    mx: 'auto',
    my: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        maxWidth: 750,
    },
}));

export default StyledFormBox;