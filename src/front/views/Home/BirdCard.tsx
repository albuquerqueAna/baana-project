import { motion } from 'framer-motion';
import { Card as AntdCard, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

export const BirdCard = ({ ave }: { ave: Ave }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <AntdCard
        hoverable
        onClick={() => navigate(`/ave/${ave.id}`)}
        style={{
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.background.lighter,
          transition: 'all 0.3s ease',
        }}
        cover={
          <Box
            sx={{
              height: 192,
              bgcolor: theme.palette.background.lighter,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {ave.images && ave.images.length > 0 ? (
              <img 
                alt={ave.name} 
                src={ave.images[0]} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Foto não disponível
              </Typography>
            )}
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary',
              m: 0 
            }}
          >
            {ave.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: isDark ? 'success.light' : 'success.main',
              fontWeight: 500,
              fontStyle: 'italic',
              m: 0 
            }}
          >
            {ave.family}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Tag 
              icon={<EnvironmentOutlined />} 
              style={{
                borderRadius: '6px',
                backgroundColor: isDark ? '#334155' : '#f1f5f9',
                color: isDark ? '#cbd5e1' : '#475569',
                border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
              }}
            >
              {ave.region?.[0] || 'Região Desconhecida'}
            </Tag>
          </Box>
        </Box>
      </AntdCard>
    </motion.div>
  );
};