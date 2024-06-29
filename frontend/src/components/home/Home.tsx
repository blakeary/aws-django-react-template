import Box from '@mui/material/Box';
import Announcement from './sections/Announcement';
import Hero from './sections/Hero';

const Home = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Hero section */}
            <Box sx={{ padding: 2, marginTop: 2, backgroundColor: 'primary.main', color: 'white' }}>
                <Hero />
            </Box>
            {/* Announcement section */}
            <Box sx={{ padding: 2, marginTop: 2, backgroundColor: 'secondary.main', color: 'black' }}>
                <Announcement />
            </Box>
        </Box>
    );
};

export default Home;
