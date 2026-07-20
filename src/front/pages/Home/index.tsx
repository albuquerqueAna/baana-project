import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Empty } from 'antd'; 

import { BirdCard } from '../../views/Home/BirdCard';
import { SearchBar } from '../../views/Home/SearchBar';
import { ThemeToggle } from '../../components/ThemeToggle';
import { TodaysPick } from '../../views/Home/TodaysPick';
import { useBirds } from '../../hooks/useBirds';

export const Home = () => {
  const [busca, setBusca] = useState('');

  const { aves, loading, error, refetch } = useBirds(busca);

  const aveDoDia = aves && aves.length > 0 ? aves[0] : undefined;

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
        
        {!busca && !loading && aveDoDia && (
          <TodaysPick ave={aveDoDia} />
        )}

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
          {busca ? 'Resultados da Busca' : 'Explore Outras Espécies'}
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={refetch}>
                Tentar Novamente
              </Button>
            }
            sx={{ mb: 4, borderRadius: '12px' }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rounded" width="100%" height={380} sx={{ borderRadius: '16px' }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          !error && aves.length === 0 ? (
            <Box sx={{ py: 8, display: 'flex', justifyContent: 'center', bgcolor: 'background.paper', borderRadius: '24px' }}>
              <Empty 
                description={<Typography color="text.secondary">Nenhuma ave encontrada para essa busca.</Typography>} 
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {aves.map((ave) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ave.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <BirdCard ave={ave} />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Container>
    </Box>
  );
};