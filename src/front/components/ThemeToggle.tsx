import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useThemeContext } from '../../ThemeContext';
import { Icon } from '@iconify/react';

export const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <IconButton 
      onClick={toggleColorMode} 
      sx={{ 
        color: mode === 'dark' ? '#fbbf24' : '#475569',
        backgroundColor: mode === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(71, 85, 105, 0.1)',
        '&:hover': {
          backgroundColor: mode === 'dark' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(71, 85, 105, 0.2)',
        }
      }}
    >
      {mode === 'dark' ? <Icon icon="line-md:moon-off-loop" width="24" height="24" /> : <Icon icon="line-md:moon-alt-loop" width="24" height="24" />}
    </IconButton>
  );
};
