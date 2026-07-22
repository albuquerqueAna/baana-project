import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const traduzirTipoAudio = (type?: string) => {
  if (!type) return 'Vocalização';
  let traduzido = type.toLowerCase();
  const dicionario: Record<string, string> = {
    'flight call': 'Chamado em voo', 'call': 'Chamado', 'song': 'Canto', 'drumming': 'Tamborilar',
    'female': 'Fêmea', 'male': 'Macho', 'adult': 'Adulto', 'juvenile': 'Juvenil', 'uncertain': 'Indeterminado'
  };
  Object.keys(dicionario).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    traduzido = traduzido.replace(regex, dicionario[key]);
  });
  return traduzido.charAt(0).toUpperCase() + traduzido.slice(1);
};

export const BirdAudioPlayer = ({ recordings }: { recordings?: any[] }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!recordings || recordings.length === 0) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
        Cantos e Chamados:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recordings.slice(0, 2).map((gravacao, idx) => (
          <Paper key={idx} elevation={0} sx={{ p: 2, bgcolor: isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: '12px' }}>
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
            <audio controls src={gravacao.file} style={{ width: '100%', height: '36px' }}>
              Seu navegador não suporta a tag de áudio.
            </audio>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default BirdAudioPlayer;