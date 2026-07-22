import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { CloseOutlined } from '@ant-design/icons';

export const BirdImageGallery = ({ images, birdName }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <Box sx={{ height: 400, borderRadius: '16px', bgcolor: isDark ? 'action.hover' : 'grey.100', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Não há imagens disponíveis.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Imagem Principal */}
      <Box
        onClick={() => setIsLightboxOpen(true)}
        sx={{
          height: 400,
          borderRadius: '16px',
          overflow: 'hidden',
          bgcolor: isDark ? 'action.hover' : 'grey.100',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          cursor: 'zoom-in',
          position: 'relative',
          '&:hover .zoom-hint': { opacity: 1 }
        }}
      >
        <img
          src={images[activeImageIndex]}
          alt={birdName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />
        <Box className="zoom-hint" sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 2, py: 0.5, borderRadius: '20px', opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none', fontSize: '0.8rem' }}>
          Clique para ampliar
        </Box>
      </Box>

      {/* Miniaturas */}
      {images.length > 1 && (
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: isDark ? '#475569' : '#cbd5e1', borderRadius: '4px' } }}>
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setActiveImageIndex(index)}
              sx={{
                width: 80, height: 80, flexShrink: 0, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
                opacity: activeImageIndex === index ? 1 : 0.5,
                border: activeImageIndex === index ? `3px solid ${theme.palette.success.main}` : '3px solid transparent',
                transition: 'all 0.3s ease', '&:hover': { opacity: 1 }
              }}
            >
              <img src={img} alt={`Miniatura ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
      )}

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} maxWidth="lg" fullWidth PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', m: 2, overflow: 'hidden' } }}>
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton onClick={() => setIsLightboxOpen(false)} sx={{ position: 'absolute', top: 0, right: 0, color: 'white', bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }, zIndex: 10 }}>
            <CloseOutlined />
          </IconButton>
          <img src={images[activeImageIndex]} alt={birdName} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px' }} />
        </Box>
      </Dialog>
    </Box>
  );
};