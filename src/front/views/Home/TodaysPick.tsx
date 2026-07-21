import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

interface Ave {
  id: number;
  name: string;
  sciName: string;
  status: string;
  region: string[];
  family: string;
  order: string;
  images: string[];
}

const traduzirStatus = (status?: string) => {
  if (!status) return 'Status Desconhecido';
  
  const dicionario: Record<string, string> = {
    'Low Concern': 'Pouco Preocupante',
    'Declining': 'Em Declínio',
    'Restricted Range': 'Distribuição Restrita',
    'Red Watch List': 'Lista Vermelha (Ameaçado)',
    'Common Bird in Steep Decline': 'Espécie Comum em Forte Declínio'
  };

  return dicionario[status] || status;
};

const obterCorStatus = (status?: string): "success" | "warning" | "error" | "default" => {
  if (status === 'Low Concern') return 'success';
  if (status === 'Red Watch List' || status === 'Common Bird in Steep Decline') return 'error';
  if (status === 'Declining' || status === 'Restricted Range') return 'warning';
  return 'default';
};

export const TodaysPick = ({ ave }: { ave: Ave }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Icon icon="fluent-emoji-flat:star" style={{ fontSize: '24px' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Escolha do Dia
        </Typography>
      </Box>

      <Paper
        elevation={0}
        onClick={() => navigate(`/ave/${ave.id}`)} 
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: '24px',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${isDark ? theme.palette.divider : '#e2e8f0'}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[4],
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: 280,
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: theme.palette.background.lighter,
              }}
            >
              {ave.images && ave.images.length > 0 ? (
                <img
                  src={ave.images[0]}
                  alt={ave.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant="body2" color="text.secondary">Não há imagens disponíveis.</Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={`Família: ${ave.family || 'N/A'}`} size="small" variant="outlined" />
                <Chip 
                  label={traduzirStatus(ave.status)} 
                  size="small" 
                  color={obterCorStatus(ave.status)} 
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>

              <Typography variant="h3" component="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                {ave.name}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Uma espécie fascinante pertencente à ordem <strong>{ave.order || 'N/A'}</strong>, habitualmente 
                encontrada na região de <strong>{ave.region?.[0] || 'várias regiões'}</strong>.
              </Typography>

              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: isDark ? 'rgba(129, 199, 132, 0.08)' : 'rgba(129, 199, 132, 0.12)', 
                  borderRadius: '12px',
                  borderLeft: `4px solid ${theme.palette.primary.main}`
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                  💡 <strong>Você sabia?</strong> O Greater Roadrunner (famoso Papa-Léguas) é conhecido por conseguir correr a velocidades de até 30 km/h para caçar presas como lagartos e até cascavéis!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};