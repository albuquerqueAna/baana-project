import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { EnvironmentOutlined } from '@ant-design/icons';

const traduzirStatus = (status?: string) => {
  if (!status) return 'Status Desconhecido';
  const dicionario: Record<string, string> = {
    'Low Concern': 'Pouco Preocupante', 'Declining': 'Em Declínio', 'Restricted Range': 'Distribuição Restrita',
    'Red Watch List': 'Lista Vermelha', 'Common Bird in Steep Decline': 'Em Forte Declínio'
  };
  return dicionario[status] || status;
};

const obterCorStatus = (status?: string): "success" | "warning" | "error" | "default" => {
  if (status === 'Low Concern') return 'success';
  if (status === 'Red Watch List' || status === 'Common Bird in Steep Decline') return 'error';
  if (status === 'Declining' || status === 'Restricted Range') return 'warning';
  return 'default';
};

export const BirdInfos = ({ ave }: { ave: any }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Aqui já aplicamos a correção de texto longo quebrando a tela! */}
      <Typography variant="h2" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', sm: '3rem', md: '3.75rem' }, wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
        {ave.name}
      </Typography>

      <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', wordBreak: 'break-word' }}>
        {ave.sciName || 'Nome científico desconhecido'}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
        <Chip label={`Família: ${ave.family || 'N/A'}`} variant="outlined" />
        <Chip label={`Ordem: ${ave.order || 'N/A'}`} variant="outlined" />
        <Chip label={`Status: ${traduzirStatus(ave.status)}`} color={obterCorStatus(ave.status)} sx={{ fontWeight: 'bold' }} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Regiões Encontradas:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {ave.region?.map((reg: string, idx: number) => (
            <Chip key={idx} icon={<EnvironmentOutlined />} label={reg} sx={{ bgcolor: isDark ? '#334155' : '#f1f5f9' }} />
          ))}
        </Box>
      </Box>

      {ave.lengthMin && ave.lengthMax && (
        <Box sx={{ mt: 2, p: 2, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Tamanho estimado:</strong> Entre {ave.lengthMin}cm e {ave.lengthMax}cm.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BirdInfos;