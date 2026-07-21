import { motion } from 'framer-motion';
import { Card as AntdCard, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
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
      style={{ height: '100%', width: '100%' }}
    >
      <AntdCard
        onClick={() => navigate(`/ave/${ave.id}`)}
        hoverable
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.background.lighter,
          transition: 'all 0.3s ease',
        }}
        styles={{ body: { display: 'flex', flexDirection: 'column', flexGrow: 1 } }}
        cover={
          <Box
            sx={{
              height: 260,
              width: '100%',
              bgcolor: theme.palette.grey[100],
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
                  objectPosition: 'center 30%',
                  transition: 'transform .3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 5, 
                  gap: 2,
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 1,
                  }}
                >
                  <Icon
                    icon="mdi:image-off-outline"
                    width={36}
                    color={theme.palette.text.secondary}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    px: 3,
                    maxWidth: 280,
                  }}
                >
                  Ainda não há uma foto cadastrada para esta ave.
                </Typography>
              </Box>
            )}
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              m: 0,
              lineHeight: 1.2
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
            {ave.family || 'Família não informada'}
          </Typography>

          <Box sx={{ mt: 'auto', pt: 2 }}>
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