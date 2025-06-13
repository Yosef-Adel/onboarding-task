import type { ThemeMode } from "./types";

interface BaseButtonColors {
  main: string;
  hover: string;
  active: string;
  disabled: string;
  text: string;
}
interface ExtendedButtonColors extends BaseButtonColors {
  border?: string;
  textHover?: string;
}

interface ButtonTheme {
  primary: BaseButtonColors;
  secondary: ExtendedButtonColors;
  ghost: BaseButtonColors;
  outline: ExtendedButtonColors;
  danger: BaseButtonColors;
}

declare module '@mui/material/styles' {
  interface Palette {
    buttons: ButtonTheme;
    table: {
      header: string;
      row: string;
      altRow: string;
      border: string;
    };
    gray: {
      [key: string]: string;
    };
  }

  interface PaletteOptions {
    buttons?: ButtonTheme;
    table?: {
      header?: string;
      row?: string;
      altRow?: string;
      border?: string;
    };
    gray?: {
      [key: string]: string;
    };
  }
}


export const getThemeConfig = (mode: ThemeMode) => {
  const configs = {
    brand: {
      palette: {
        mode: 'light' as const,
        primary: {
          main: '#009999',
          light: '#33B2B2',
          dark: '#006666',
          contrastText: '#FFFFFF'
        },
        // Secondary colors using Siemens complementary palette
        secondary: {
          main: '#FF6B35',
          light: '#FF8A5B',
          dark: '#E55A2B',
          contrastText: '#FFFFFF'
        },
        // Background colors for light theme
        background: {
          default: '#F8F9FA',
          paper: '#FFFFFF',
          surface: '#F1F3F4'
        },
        // Text colors following Siemens contrast guidelines
        text: {
          primary: '#1A1A1A',
          secondary: '#6C757D',
          disabled: '#ADB5BD',
          contrast: '#000000'
        },
        // Status colors aligned with Siemens standards
        info: {
          main: '#007BFF',
          light: '#66B2FF',
          dark: '#0056B3',
          contrastText: '#FFFFFF'
        },
        success: {
          main: '#28A745',
          light: '#5CBB2A',
          dark: '#1E7E34',
          contrastText: '#FFFFFF'
        },
        warning: {
          main: '#FFC107',
          light: '#FFD54F',
          dark: '#FF8F00',
          contrastText: '#000000'
        },
        error: {
          main: '#DC3545',
          light: '#FF6B6B',
          dark: '#C82333',
          contrastText: '#FFFFFF'
        },
        // Neutral status color
        neutral: {
          main: '#6C757D',
          light: '#ADB5BD',
          dark: '#495057',
          contrastText: '#FFFFFF'
        },
        // Critical status (between error and warning)
        critical: {
          main: '#FF4500',
          light: '#FF6347',
          dark: '#CC3700',
          contrastText: '#FFFFFF'
        },
        //table
        table: {
          // header: ,
          // row: ,
          // altRow: ,
          border: "#fff",
        },
        // Button color variants
        buttons: {
          primary: {
            main: '#009999',
            hover: '#007A7A',
            active: '#006666',
            disabled: '#B3D9D9',
            text: '#FFFFFF'
          },
          secondary: {
            main: '#FFFFFF',
            hover: '#F8F9FA',
            active: '#E9ECEF',
            disabled: '#F8F9FA',
            text: '#009999',
            border: '#009999'
          },
          ghost: {
            main: 'transparent',
            hover: '#E6F7F7',
            active: '#CCF2F2',
            disabled: 'gray',
            text: '#009999'
          },
          outline: {
            main: 'transparent',
            hover: '#009999',
            active: '#007A7A',
            disabled: 'gray',
            text: '#009999',
            textHover: '#FFFFFF',
            border: '#009999'
          },
          danger: {
            main: '#DC3545',
            hover: '#C82333',
            active: '#A71E2A',
            disabled: '#F5C6CB',
            text: '#FFFFFF'
          }
        },
        // Enhanced gray scale following Siemens design tokens
        gray: {
          "0": "transparent",
          "50": "#F8F9FA",
          "100": "#F1F3F4",
          "200": "#E9ECEF",
          "300": "#DEE2E6",
          "400": "#CED4DA",
          "500": "#ADB5BD",
          "600": "#6C757D",
          "700": "#495057",
          "800": "#343A40",
          "900": "#212529",
          "950": "#1A1A1A"
        },
        // Border colors
        border: {
          contrast: '#000000',
          hard: '#495057',
          standard: '#CED4DA',
          soft: '#DEE2E6',
          weak: '#E9ECEF',
          xWeak: '#F1F3F4'
        },
      },
      typography: {
        fontFamily: '"Siemens Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: '#1A1A1A' },
        h2: { fontWeight: 600, color: '#1A1A1A' },
        h3: { fontWeight: 600, color: '#1A1A1A' },
        h4: { fontWeight: 500, color: '#1A1A1A' },
        h5: { fontWeight: 500, color: '#1A1A1A' },
        h6: { fontWeight: 500, color: '#1A1A1A' },
        body1: { fontWeight: 400, color: '#1A1A1A' },
        body2: { fontWeight: 400, color: '#6C757D' },
        buttons: { fontWeight: 500, textTransform: 'none' as const },
        caption: { fontWeight: 400, color: '#6C757D' },
        overline: { fontWeight: 500, color: '#6C757D', textTransform: 'uppercase' as const }
      },
    },
    brandHybrid: {
      palette: {
        mode: 'dark' as const,
        // Primary colors adjusted for dark theme
        primary: {
          main: '#00CCCC',
          light: '#33D9D9',
          dark: '#009999',
          contrastText: '#000000'
        },
        // Secondary colors for dark theme
        secondary: {
          main: '#FF8A5B',
          light: '#FFAD85',
          dark: '#FF6B35',
          contrastText: '#000000'
        },
        // Dark theme backgrounds
        background: {
          default: '#000028',
          paper: '#000028',
          surface: '#000028'
        },
        // Dark theme text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#B8BCC8',
          disabled: '#6C757D',
          contrast: '#FFFFFF'
        },
        // Status colors for dark theme
        info: {
          main: '#4FC3F7',
          light: '#81D4FA',
          dark: '#0288D1',
          contrastText: '#000000'
        },
        success: {
          main: '#66BB6A',
          light: '#81C784',
          dark: '#388E3C',
          contrastText: '#000000'
        },
        warning: {
          main: '#FFB74D',
          light: '#FFCC02',
          dark: '#F57C00',
          contrastText: '#000000'
        },
        error: {
          main: '#F06292',
          light: '#F48FB1',
          dark: '#C2185B',
          contrastText: '#000000'
        },
        // Neutral status for dark theme
        neutral: {
          main: '#90A4AE',
          light: '#B0BEC5',
          dark: '#607D8B',
          contrastText: '#000000'
        },
        // Critical status for dark theme
        critical: {
          main: '#FF7043',
          light: '#FF8A65',
          dark: '#E64A19',
          contrastText: '#000000'
        },
        //tables
        table: {
          // header: ,
          // row: ,
          // altRow: ,
          border: "#5D607A",
        },
        // Button colors for dark theme
        buttons: {
          primary: {
            main: '#00CCCC',
            hover: '#00E6E6',
            active: '#009999',
            disabled: '#334D4D',
            text: '#000000'
          },
          secondary: {
            main: '#2A3441',
            hover: '#3A4451',
            active: '#1A1F2E',
            disabled: '#2A3441',
            text: '#00CCCC',
            border: '#00CCCC'
          },
          ghost: {
            main: 'transparent',
            hover: '#1A4D4D',
            active: '#0D3333',
            disabled: 'transparent',
            text: '#00CCCC'
          },
          outline: {
            main: 'transparent',
            hover: '#00CCCC',
            active: '#00B3B3',
            disabled: 'gray',
            text: '#00CCCC',
            textHover: '#000000',
            border: '#00CCCC'
          },
          danger: {
            main: '#F06292',
            hover: '#F48FB1',
            active: '#E91E63',
            disabled: '#4D2A3A',
            text: '#000000'
          }
        },
        // Dark theme gray scale
        gray: {
          "0": "transparent",
          "50": "#0A0E1A",
          "100": "#1A1F2E",
          "200": "#2A3441",
          "300": "#3A4451",
          "400": "#4A5462",
          "500": "#6C757D",
          "600": "#8E96A3",
          "700": "#B0B7C3",
          "800": "#D2D7E3",
          "900": "#F4F6F8",
          "950": "#FFFFFF"
        },
        // Dark theme border colors
        border: {
          contrast: '#FFFFFF',
          hard: '#B0B7C3',
          standard: '#4A5462',
          soft: '#3A4451',
          weak: '#2A3441',
          xWeak: '#1A1F2E'
        },
      },
      typography: {
        fontFamily: '"Siemens Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: '#FFFFFF' },
        h2: { fontWeight: 600, color: '#FFFFFF' },
        h3: { fontWeight: 600, color: '#FFFFFF' },
        h4: { fontWeight: 500, color: '#FFFFFF' },
        h5: { fontWeight: 500, color: '#FFFFFF' },
        h6: { fontWeight: 500, color: '#FFFFFF' },
        body1: { fontWeight: 400, color: '#FFFFFF' },
        body2: { fontWeight: 400, color: '#B8BCC8' },
        button: { fontWeight: 500, textTransform: 'none' as const },
        caption: { fontWeight: 400, color: '#B8BCC8' },
        overline: { fontWeight: 500, color: '#B8BCC8', textTransform: 'uppercase' as const }
      },
    },
  };
  return configs[mode];
};
