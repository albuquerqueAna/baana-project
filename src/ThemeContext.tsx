import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ConfigProvider, theme as antdTheme } from 'antd';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    lighter: string;
  }
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as PaletteMode) || 'light';
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#81c784',
                  light: '#b2fab4',
                  dark: '#519657',
                  contrastText: '#ffffff',
                },
                background: {
                  default: '#f4f9f5', // Fundo off-white esverdeado
                  paper: '#ffffff',
                  lighter: '#e8f4ea', // Fundo secundário super leve
                },
                text: {
                  primary: '#0d1a10', // Preto com subtom verde para leitura
                  secondary: '#4a6050',
                },
              }
            : {
                primary: {
                  main: '#a5d6a7',
                  light: '#d7ffd9',
                  dark: '#74a576',
                  contrastText: '#0d1a10',
                },
                background: {
                  default: '#0f1712', // Fundo escuro com leve toque de verde militar/profundo
                  paper: '#162019',
                  lighter: '#1e2b21',
                },
                text: {
                  primary: '#e4f1e5',
                  secondary: '#89a890',
                },
              }),
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ConfigProvider
        theme={{
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            borderRadius: 12,
            colorPrimary: mode === 'light' ? '#81c784' : '#a5d6a7', 
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};