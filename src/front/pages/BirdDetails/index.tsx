import { useState } from 'react';
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
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ArrowLeftOutlined, EnvironmentOutlined, CloseOutlined } from '@ant-design/icons';

import { useBirdDetails } from '../../hooks/useBirdDetails';
import { ThemeToggle } from '../../components/ThemeToggle';

// FUNÇÃO TRADUTORA DE ÁUDIOS
const traduzirTipoAudio = (type?: string) => {
  if (!type) return 'Vocalização';
  
  let traduzido = type.toLowerCase();
  
  const dicionario: Record<string, string> = {
    'flight call': 'Chamado em voo',
    'call': 'Chamado',
    'song': 'Canto',
    'drumming': 'Tamborilar',
    'female': 'Fêmea',
    'male': 'Macho',
    'adult': 'Adulto',
    'juvenile': 'Juvenil',
    'uncertain': 'Indeterminado'
  };

  Object.keys(dicionario).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    traduzido = traduzido.replace(regex, dicionario[key]);
  });

  return traduzido.charAt(0).toUpperCase() + traduzido.slice(1);
};

// NOVA FUNÇÃO: TRADUTORA DE STATUS DE CONSERVAÇÃO
const traduzirStatus = (status?: string) => {
  if (!status) return 'Status Desconhecido';
  
  const dicionario: Record<string, string> = {
    'Low Concern': 'Pouco Preocupante',
    'Declining': 'Em Declínio',
    'Restricted Range': 'Distribuição Restrita',
    'Red Watch List': 'Lista Vermelha (Ameaçado)',
    'Common Bird in Steep Decline': 'Espécie Comum em Forte Declínio'
  };

  // Retorna a tradução ou, se não encontrar no dicionário, retorna o texto original
  return dicionario[status] || status;
};

const obterCorStatus = (status?: string): "success" | "warning" | "error" | "default" => {
  if (status === 'Low Concern') return 'success';
  if (status === 'Red Watch List' || status === 'Common Bird in Steep Decline') return 'error';
  if (status === 'Declining' || status === 'Restricted Range') return 'warning';
  return 'default';
};

export const BirdDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { ave, loading, error, refetch } = useBirdDetails(Number(id));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
            <Grid container spacing={6}>
              {/* LADO ESQUERDO: Galeria de Imagens E Áudios */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Imagem Principal */}
                  <Box
                    onClick={() => {
                      if (ave.images && ave.images.length > 0) setIsLightboxOpen(true);
                    }}
                    sx={{
                      height: 400,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      bgcolor: isDark ? 'action.hover' : 'grey.100',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      cursor: ave.images && ave.images.length > 0 ? 'zoom-in' : 'default',
                      position: 'relative',
                      '&:hover .zoom-hint': { opacity: 1 }
                    }}
                  >
                    {ave.images && ave.images.length > 0 ? (
                      <>
                        <img
                          src={ave.images[activeImageIndex]}
                          alt={ave.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                        <Box
                          className="zoom-hint"
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: '20px',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            pointerEvents: 'none',
                            fontSize: '0.8rem'
                          }}
                        >
                          Clique para ampliar
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                          Não há imagens disponíveis.
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Miniaturas (Thumbnails) */}
                  {ave.images && ave.images.length > 1 && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        overflowX: 'auto', 
                        pb: 1,
                        '&::-webkit-scrollbar': { height: '8px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: isDark ? '#475569' : '#cbd5e1', borderRadius: '4px' }
                      }}
                    >
                      {ave.images.map((img, index) => (
                        <Box
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          sx={{
                            width: 80,
                            height: 80,
                            flexShrink: 0,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            opacity: activeImageIndex === index ? 1 : 0.5,
                            border: activeImageIndex === index 
                              ? `3px solid ${theme.palette.success.main}` 
                              : '3px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': { opacity: 1 }
                          }}
                        >
                          <img 
                            src={img} 
                            alt={`${ave.name} - miniatura ${index + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* SEÇÃO DE ÁUDIOS */}
                  {ave.recordings && ave.recordings.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                        Cantos e Chamados:
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {ave.recordings.slice(0, 2).map((gravacao, idx) => (
                          <Paper 
                            key={idx} 
                            elevation={0}
                            sx={{ 
                              p: 2, 
                              bgcolor: isDark ? '#1e293b' : '#f8fafc',
                              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                              borderRadius: '12px'
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                {traduzirTipoAudio(gravacao.type)}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Gravado por: {gravacao.rec}
                              </Typography>
                            </Box>
                            
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, fontStyle: 'italic' }}>
                              📍 {gravacao.loc}
                            </Typography>
                            
                            <audio 
                              controls 
                              src={gravacao.file} 
                              style={{ width: '100%', height: '36px' }}
                            >
                              Seu navegador não suporta a tag de áudio.
                            </audio>
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* LADO DIREITO: Informações da Ave */}
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
                      label={`Status: ${traduzirStatus(ave.status)}`} 
                      color={obterCorStatus(ave.status)} 
                      sx={{ fontWeight: 'bold' }}
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

                  {(ave as any).lengthMin && (ave as any).lengthMax && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Tamanho estimado:</strong> Entre {(ave as any).lengthMin}cm e {(ave as any).lengthMax}cm.
                      </Typography>
                    </Box>
                  )}

                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {ave && ave.images && ave.images.length > 0 && (
          <Dialog
            open={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: { 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                m: 2,
                overflow: 'hidden'
              }
            }}
          >
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton
                onClick={() => setIsLightboxOpen(false)}
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.6)', 
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                  zIndex: 10
                }}
              >
                <CloseOutlined />
              </IconButton>
              <img
                src={ave.images[activeImageIndex]}
                alt={ave.name}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '90vh', 
                  objectFit: 'contain', 
                  borderRadius: '12px' 
                }}
              />
            </Box>
          </Dialog>
        )}

      </Container>
    </Box>
  );
};