import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { useBirdDetails } from '../../hooks/useBirdDetails';
import { ThemeToggle } from '../../components/ThemeToggle';

export const BirdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { ave, loading, error, refetch } = useBirdDetails(Number(id));

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

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Button 
          startIcon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          sx={{ mb: 4, color: 'text.secondary', textTransform: 'none', fontSize: '1rem' }}
        >
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
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: '24px',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${isDark ? theme.palette.divider : '#e2e8f0'}`,
            }}
          >
            <Grid container spacing={6} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    height: 400,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    bgcolor: isDark ? 'action.hover' : 'grey.100',
                  }}
                >
                  {ave.images && ave.images.length > 0 ? (
                    <img
                      src={ave.images[0]}
                      alt={ave.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        Foto não disponível
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>
                    {ave.name}
                  </Typography>

                  <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    {ave.sciName || 'Nome científico desconhecido'}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
                    <Chip label={`Família: ${ave.family || 'N/A'}`} variant="outlined" />
                    <Chip label={`Ordem: ${ave.order || 'N/A'}`} variant="outlined" />
                    <Chip 
                      label={ave.status || 'Status Desconhecido'} 
                      color={ave.status === 'Low Concern' ? 'success' : 'warning'} 
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Regiões Encontradas:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {ave.region?.map((reg, idx) => (
                        <Chip 
                          key={idx} 
                          icon={<EnvironmentOutlined />} 
                          label={reg} 
                          sx={{ bgcolor: isDark ? '#334155' : '#f1f5f9' }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
};