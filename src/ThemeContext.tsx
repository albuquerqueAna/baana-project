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
              background: {
                default: '#e2e8f0',
                paper: '#ffffff',
                lighter: '#f1f5f9',
              },
              text: {
                primary: '#0f172a',
                secondary: '#475569',
              },
            }
          : {
              background: {
                default: '#282d34',
                paper: '#121212',
                lighter: '#212326',
              },
              text: {
                primary: '#f1f5f9',
                secondary: '#475569',
              },
            }),
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
            colorPrimary: '#10b981', // green-500
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
