import { createTheme, ThemeOptions } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Material Design 3 Color Tokens
const colorTokens = {
  primary: {
    0: '#000000',
    10: '#00174c',
    20: '#002d6b',
    25: '#003784',
    30: '#00419e',
    35: '#004cb9',
    40: '#0857d4',
    50: '#3b7df0',
    60: '#649fff',
    70: '#8dbeff',
    80: '#b8ddff',
    90: '#ddeeff',
    95: '#eef7ff',
    98: '#f9fcff',
    99: '#fcfcff',
    100: '#ffffff',
  },
  secondary: {
    0: '#000000',
    10: '#191c2c',
    20: '#2e3142',
    25: '#394251',
    30: '#454760',
    35: '#515270',
    40: '#5d5e81',
    50: '#7677a0',
    60: '#9091c0',
    70: '#abacdb',
    80: '#c7c8f7',
    90: '#e4e3ff',
    95: '#f2f1ff',
    98: '#faf8ff',
    99: '#fefbff',
    100: '#ffffff',
  },
  tertiary: {
    0: '#000000',
    10: '#2a132f',
    20: '#412845',
    25: '#4e3352',
    30: '#5b3e5f',
    35: '#684a6d',
    40: '#75567b',
    50: '#906f96',
    60: '#ac89b2',
    70: '#c8a3cf',
    80: '#e5bfec',
    90: '#f5daff',
    95: '#fbedff',
    98: '#fef7ff',
    99: '#fffbff',
    100: '#ffffff',
  },
  neutral: {
    0: '#000000',
    4: '#0f0f13',
    6: '#141417',
    10: '#1c1b20',
    12: '#201f24',
    17: '#2b2930',
    20: '#313036',
    22: '#35343a',
    24: '#3a393f',
    25: '#3c3b41',
    30: '#48464d',
    35: '#54515a',
    40: '#605d66',
    50: '#79767f',
    60: '#939094',
    70: '#aeaaab',
    80: '#cac5c7',
    87: '#ddd8da',
    90: '#e6e1e3',
    92: '#ece7e9',
    94: '#f1ecee',
    95: '#f4eff1',
    96: '#f7f2f4',
    98: '#fcf7f9',
    99: '#fefbff',
    100: '#ffffff',
  },
  error: {
    0: '#000000',
    10: '#410e0b',
    20: '#601410',
    25: '#6f1c16',
    30: '#7e251c',
    35: '#8e2e23',
    40: '#9e372a',
    50: '#bf4a3b',
    60: '#e05e4d',
    70: '#ff7961',
    80: '#ff9682',
    90: '#ffb4ab',
    95: '#ffdad6',
    98: '#fff8f7',
    99: '#fffbff',
    100: '#ffffff',
  },
  success: {
    0: '#000000',
    10: '#002204',
    20: '#003a0b',
    25: '#004d12',
    30: '#006019',
    35: '#007421',
    40: '#008829',
    50: '#0fa034',
    60: '#33ba42',
    70: '#52d451',
    80: '#72ef72',
    90: '#95ff94',
    95: '#b8ffb7',
    98: '#e8ffe8',
    99: '#f4fff4',
    100: '#ffffff',
  },
  warning: {
    0: '#000000',
    10: '#261900',
    20: '#3f2e00',
    25: '#4d3a00',
    30: '#5c4600',
    35: '#6b5300',
    40: '#7a6000',
    50: '#997b00',
    60: '#b89600',
    70: '#d8b200',
    80: '#f9ce00',
    90: '#ffeb3b',
    95: '#fff59d',
    98: '#fffbf0',
    99: '#fffdf7',
    100: '#ffffff',
  },
};

// Light theme configuration
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colorTokens.primary[40],
      light: colorTokens.primary[80],
      dark: colorTokens.primary[20],
      contrastText: colorTokens.neutral[100],
    },
    secondary: {
      main: colorTokens.secondary[40],
      light: colorTokens.secondary[80],
      dark: colorTokens.secondary[20],
      contrastText: colorTokens.neutral[100],
    },
    tertiary: {
      main: colorTokens.tertiary[40],
      light: colorTokens.tertiary[80],
      dark: colorTokens.tertiary[20],
      contrastText: colorTokens.neutral[100],
    },
    error: {
      main: colorTokens.error[40],
      light: colorTokens.error[80],
      dark: colorTokens.error[20],
      contrastText: colorTokens.neutral[100],
    },
    warning: {
      main: colorTokens.warning[40],
      light: colorTokens.warning[80],
      dark: colorTokens.warning[20],
      contrastText: colorTokens.neutral[0],
    },
    success: {
      main: colorTokens.success[40],
      light: colorTokens.success[80],
      dark: colorTokens.success[20],
      contrastText: colorTokens.neutral[100],
    },
    background: {
      default: colorTokens.neutral[99],
      paper: colorTokens.neutral[100],
    },
    surface: {
      main: colorTokens.neutral[99],
      variant: colorTokens.neutral[90],
    },
    text: {
      primary: colorTokens.neutral[10],
      secondary: colorTokens.neutral[30],
      disabled: alpha(colorTokens.neutral[10], 0.38),
    },
    divider: alpha(colorTokens.neutral[10], 0.12),
  },
  typography: {
    fontFamily: '"Roboto Flex", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 24,
  },
  spacing: 8,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

// Dark theme configuration
const darkTheme: ThemeOptions = {
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: colorTokens.primary[80],
      light: colorTokens.primary[40],
      dark: colorTokens.primary[90],
      contrastText: colorTokens.neutral[10],
    },
    secondary: {
      main: colorTokens.secondary[80],
      light: colorTokens.secondary[40],
      dark: colorTokens.secondary[90],
      contrastText: colorTokens.neutral[10],
    },
    tertiary: {
      main: colorTokens.tertiary[80],
      light: colorTokens.tertiary[40],
      dark: colorTokens.tertiary[90],
      contrastText: colorTokens.neutral[10],
    },
    error: {
      main: colorTokens.error[80],
      light: colorTokens.error[40],
      dark: colorTokens.error[90],
      contrastText: colorTokens.neutral[10],
    },
    warning: {
      main: colorTokens.warning[80],
      light: colorTokens.warning[40],
      dark: colorTokens.warning[90],
      contrastText: colorTokens.neutral[0],
    },
    success: {
      main: colorTokens.success[80],
      light: colorTokens.success[40],
      dark: colorTokens.success[90],
      contrastText: colorTokens.neutral[10],
    },
    background: {
      default: colorTokens.neutral[6],
      paper: colorTokens.neutral[12],
    },
    surface: {
      main: colorTokens.neutral[6],
      variant: colorTokens.neutral[22],
    },
    text: {
      primary: colorTokens.neutral[90],
      secondary: colorTokens.neutral[80],
      disabled: alpha(colorTokens.neutral[90], 0.38),
    },
    divider: alpha(colorTokens.neutral[90], 0.12),
  },
};

export const createAppTheme = (mode: 'light' | 'dark' = 'light') => {
  return createTheme(mode === 'light' ? lightTheme : darkTheme);
};

// Custom module augmentation for tertiary and surface colors
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    surface: {
      main: string;
      variant: string;
    };
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    surface?: {
      main: string;
      variant: string;
    };
  }
}

export default createAppTheme;
