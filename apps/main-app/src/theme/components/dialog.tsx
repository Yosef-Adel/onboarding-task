import type { Theme, Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

const MuiDialog: Components<Theme>['MuiDialog'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paper: ({ ownerState, theme }) => ({
      backgroundColor: theme.palette.background.paper,
      ...(!ownerState.fullScreen && { margin: theme.spacing(2) }),
      backgroundImage: 'none',
      '--Paper-shadow': 'unset',
      '--Paper-overlay': 'unset',
      borderColor: theme.palette.table.border,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: "8px"
    }),
    paperFullScreen: { borderRadius: 0 },
  },
};

const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({

      padding: theme.spacing(3),
    }),
  },
};

const MuiDialogContent: Components<Theme>['MuiDialogContent'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(0, 3),
    }),
    dividers: ({ theme }) => ({
      borderTop: 0,
      borderBottomStyle: 'dashed',
      paddingBottom: theme.spacing(3),
    }),
  },
};

const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { disableSpacing: true },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3),
      '& > :not(:first-of-type)': {
        marginLeft: theme.spacing(1.5),
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const dialog = {
  MuiDialog,
  MuiDialogTitle,
  MuiDialogContent,
  MuiDialogActions,
};
