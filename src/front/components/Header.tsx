import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react'; // <-- NOVO IMPORT
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
    const theme = useTheme();

    return (
        <Box
            component="header"
            sx={{
                bgcolor: 'background.paper',
                borderBottom: `1px solid ${theme.palette.divider}`,
                py: 2,
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}
        >
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Icon
                        icon="game-icons:nest-birds"
                        style={{
                            fontSize: '50px',
                            color: theme.palette.primary.main,
                        }}
                    />

                    <Typography
                        sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '1.8rem',
                            fontWeight: 800,
                            letterSpacing: '-0.5px',
                            lineHeight: 1,
                            mt: '4px',
                            userSelect: 'none',
                        }}
                    >
                        Baana
                        <Box
                            component="span"
                            sx={{
                                color: theme.palette.primary.main,
                                ml: 0.5,
                            }}
                        >
                            Project
                        </Box>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <ThemeToggle />
                    <Button
                        variant="outlined"
                        startIcon={<Icon icon="lucide:user" />}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};