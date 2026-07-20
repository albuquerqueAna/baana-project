import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { StarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Ave } from '../../types/bird'; 

interface TodaysPickProps {
  ave: Ave;
}

export const TodaysPick = ({ ave }: TodaysPickProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: '24px',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${isDark ? theme.palette.divider : '#e2e8f0'}`,
        overflow: 'hidden',
        mb: 6,
      }}
    >
      <Grid container spacing={4} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 5 }} component="div">
          <Box
            sx={{
              height: { xs: 260, md: 360 },
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
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

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ height: '100%', display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                icon={<StarOutlined style={{ color: '#eab308' }} />}
                label="Escolha do Dia"
                size="small"
                sx={{
                  backgroundColor: isDark ? '#3e3a17' : '#fef9c3',
                  color: isDark ? '#fef08a' : '#a16207',
                  fontWeight: 'bold',
                  border: 'none'
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.primary' }}>
                Família: <i>{ave.family}</i>
              </Typography>
            </Box>

            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {ave.name}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
               Uma espécie fascinante pertencente à ordem <strong>{ave.order || 'Não catalogada'}</strong>, habitualmente encontrada na região de <strong>{ave.region?.[0] || 'Diversas'}</strong>. Atualmente, seu status de conservação é classificado como: <em>{ave.status || 'Desconhecido'}</em>.
            </Typography>

            {ave.sciName && (
              <Box
                sx={{
                  mt: 2,
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                  borderLeft: `4px solid ${theme.palette.success.main}`,
                  display: 'flex',
                  gap: 1.5
                }}
              >
                <InfoCircleOutlined style={{ color: theme.palette.success.main, fontSize: '20px', marginTop: '2px' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>
                    Você sabia?
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    O nome científico desta espécie é <strong>{ave.sciName}</strong>.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};