import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useBirdDetails } from '../../hooks/useBirdDetails';
import { ThemeToggle } from '../../components/ThemeToggle';

import { BirdImageGallery } from '../../components/BirdDetails/BirdImageGallery';
import { BirdAudioPlayer } from '../../components/BirdDetails/BirdAudios';
import { BirdInfos } from '../../components/BirdDetails/BirdInfos';

export const BirdDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { ave, loading, error, refetch } = useBirdDetails(Number(id));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', p: 4, transition: 'background-color 0.3s ease' }}>
      <Box sx={{ position: 'fixed', top: 24, right: 24, zIndex: 1100 }}>
        <ThemeToggle />
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate('/')} sx={{ mb: 4, color: 'text.secondary', textTransform: 'none', fontSize: '1rem' }}>
          Voltar para Home
        </Button>

        {error && (
          <Alert severity="error" action={<Button color="inherit" size="small" onClick={refetch}>Tentar Novamente</Button>}>
            {error}
          </Alert>
        )}

        {loading && !error && (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rounded" height={400} sx={{ borderRadius: '24px' }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="text" height={80} width="80%" />
              <Skeleton variant="text" height={40} width="40%" />
              <Skeleton variant="rounded" height={120} sx={{ mt: 4, borderRadius: '12px' }} />
            </Grid>
          </Grid>
        )}

        {!loading && ave && (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', backgroundColor: theme.palette.background.paper, border: `1px solid ${isDark ? theme.palette.divider : '#e2e8f0'}` }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 6 }}>
                <BirdImageGallery images={ave.images} birdName={ave.name} />
                <BirdAudioPlayer recordings={ave.recordings} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <BirdInfos ave={ave} />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
};