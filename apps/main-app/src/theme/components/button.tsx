import type { Components, Theme } from '@mui/material/styles';

export const button: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
          duration: theme.transitions.duration.short,
        }),
        textTransform: 'none',
      }),
      contained: ({ theme }) => ({
        backgroundColor: theme.palette.buttons.primary.main,
        color: theme.palette.buttons.primary.text,
        '&:hover': {
          backgroundColor: theme.palette.buttons.primary.hover,
        },
        '&:active': {
          backgroundColor: theme.palette.buttons.primary.active,
        },
        '&:disabled': {
          backgroundColor: theme.palette.buttons.primary.disabled,
          color: theme.palette.buttons.primary.text,
          opacity: 0.6,
        },
      }),
      outlined: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.palette.buttons.outline.text,
        borderColor: theme.palette.buttons.outline.border || theme.palette.buttons.outline.main,
        '&:hover': {
          backgroundColor: theme.palette.buttons.outline.hover,
          color: theme.palette.buttons.outline.textHover || theme.palette.buttons.outline.text,
          borderColor: theme.palette.buttons.outline.border || theme.palette.buttons.outline.main,
        },
        '&:active': {
          backgroundColor: theme.palette.buttons.outline.active,
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: theme.palette.buttons.outline.disabled,
          borderColor: theme.palette.buttons.outline.disabled,
          opacity: 0.6,
        },
      }),
      text: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.palette.buttons.ghost.text,
        '&:hover': {
          backgroundColor: theme.palette.buttons.ghost.hover,
        },
        '&:active': {
          backgroundColor: theme.palette.buttons.ghost.active,
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: theme.palette.buttons.ghost.disabled,
          opacity: 0.6,
        },
      }),
    },
    variants: [
      // Secondary variant
      {
        props: { variant: 'contained', color: 'secondary' },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.buttons.secondary.main,
          color: theme.palette.buttons.secondary.text,
          '&:hover': {
            backgroundColor: theme.palette.buttons.secondary.hover,
            color: theme.palette.buttons.secondary.textHover || theme.palette.buttons.secondary.text,
          },
          '&:active': {
            backgroundColor: theme.palette.buttons.secondary.active,
          },
          '&:disabled': {
            backgroundColor: theme.palette.buttons.secondary.disabled,
            color: theme.palette.buttons.secondary.text,
            opacity: 0.6,
          },
        }),
      },
      // Danger variant (you can use this with a custom prop or color)
      {
        props: { variant: 'contained', color: 'error' },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.buttons.danger.main,
          color: theme.palette.buttons.danger.text,
          '&:hover': {
            backgroundColor: theme.palette.buttons.danger.hover,
          },
          '&:active': {
            backgroundColor: theme.palette.buttons.danger.active,
          },
          '&:disabled': {
            backgroundColor: theme.palette.buttons.danger.disabled,
            color: theme.palette.buttons.danger.text,
            opacity: 0.6,
          },
        }),
      },
    ],
  },
};


// HOW TO USE
{/* <Button variant="contained">Primary Button</Button> */ }
{/* <Button variant="contained" color="secondary">Secondary Button</Button> */ }
{/* <Button variant="outlined">Outline Button</Button> */ }
{/* <Button variant="text">Ghost Button</Button> */ }
{/* <Button variant="contained" color="error">Danger Button</Button> */ }
