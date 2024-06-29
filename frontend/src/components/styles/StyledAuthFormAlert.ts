import { Alert, AlertProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAuthFormAlert = styled(Alert)<AlertProps>(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: theme.spacing(2),
    textAlign: 'left',
}));

export default StyledAuthFormAlert;