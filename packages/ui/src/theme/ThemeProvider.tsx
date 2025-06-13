import React, { useMemo, useState, type ReactNode } from 'react';
import { createTheme, type Theme } from '@mui/material/styles';
import type { ThemeMode } from './types';
import { getThemeConfig } from './pallete';
import { components } from './components';
import { ThemeContext } from './ThemeContext';

interface ThemeModeProviderProps {
  children: (theme: Theme) => ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
  defaultMode = 'brand'
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const availableThemes: ThemeMode[] = ['brand', 'brandHybrid'];

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const theme = useMemo(() => {
    const config = getThemeConfig(mode);
    return createTheme({
      components,
      ...config
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{
      mode,
      setThemeMode,
      availableThemes
    }}>
      {children(theme)}
    </ThemeContext.Provider>
  );
};
