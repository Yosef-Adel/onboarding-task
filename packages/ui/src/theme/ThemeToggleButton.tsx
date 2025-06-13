import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  type SelectChangeEvent
} from '@mui/material';
import {
  Star,
  AutoAwesome,
} from '@mui/icons-material';
import { useThemeMode } from './ThemeContext';

// Icon mapping for each theme
const themeConfig = {
  brand: { icon: <Star />, name: 'Brand Theme' },
  brandHybrid: { icon: <AutoAwesome />, name: 'Brand Hybrid' },
};

export const ThemeToggleButton: React.FC = () => {
  const { mode, setThemeMode, availableThemes } = useThemeMode();

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setThemeMode(event.target.value as any);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 150, marginRight: 2 }}>
      <InputLabel>Theme</InputLabel>
      <Select
        value={mode}
        onChange={handleThemeChange}
        label="Theme"
      >
        {availableThemes.map((themeName) => (
          <MenuItem key={themeName} value={themeName}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {themeConfig[themeName as keyof typeof themeConfig]?.icon}
              <span>{themeConfig[themeName as keyof typeof themeConfig]?.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
