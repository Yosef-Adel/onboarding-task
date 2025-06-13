import { createContext, useContext } from 'react';
import type { ThemeMode } from './types';

interface ThemeModeContextType {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  availableThemes: ThemeMode[];
}

const ThemeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const useThemeMode = (): ThemeModeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export { ThemeContext };
export type { ThemeModeContextType };
