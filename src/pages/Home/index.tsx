import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BirdCard } from '../../views/Home/BirdCard';
import { SearchBar } from '../../views/Home/SearchBar';
import { aves } from '../../data/aves';
import { ThemeToggle } from '../../components/ThemeToggle';

export const Home = () => {
  const [busca, setBusca] = useState('');

  const avesFiltradas = aves.filter(ave => 
    ave.nome.toLowerCase().includes(busca.toLowerCase()) ||
    ave.regiao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 4,
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Botão de Dark Mode fixo no topo direito */}
      <Box sx={{ position: 'fixed', top: 24, right: 24, zIndex: 1100 }}>
        <ThemeToggle />
      </Box>

      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3,
            fontSize: { xs: '2.5rem', md: '3.75rem' }
          }}
        >
          Baana Project
        </Typography>
        <SearchBar value={busca} onChange={setBusca} />
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {avesFiltradas.map(ave => (
            <Grid key={ave.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BirdCard ave={ave} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
