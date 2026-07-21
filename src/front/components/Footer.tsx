import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react'; // <-- NOVO IMPORT

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 2,
        position: 'fixed', // <-- NOVO: Gruda o rodapé na tela
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000 // Fica acima do conteúdo que está rolando
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} Baana Project. Desenvolvido para fins de estudo.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
          <Icon icon="lucide:mail" style={{ fontSize: '18px' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            anamilly03@gmail.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};