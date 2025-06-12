import type { Theme, Components } from '@mui/material/styles';

const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.background.default,
    }),
  },
};

export const paper = {
  MuiPaper,
};
