import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Material Design 3 Color Tokens
const materialDesign3Tokens = {
  light: {
    primary: {
      main: '#6750A4',
      light: '#EADDFF',
      dark: '#21005D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#E8DEF8',
      dark: '#1D192B',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#7D5260',
      light: '#FFD8E4',
      dark: '#31111D',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#BA1A1A',
      light: '#FFDAD6',
      dark: '#410002',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFBFE',
      paper: '#FFFBFE',
    },
    surface: {
      main: '#FFFBFE',
      variant: '#E7E0EC',
      container: '#F3EDF7',
      containerHigh: '#ECE6F0',
      containerHighest: '#E6E0E9',
    },
    outline: {
      main: '#79747E',
      variant: '#CAC4D0',
    }
  },
  dark: {
    primary: {
      main: '#D0BCFF',
      light: '#6750A4',
      dark: '#EADDFF',
      contrastText: '#21005D',
    },
    secondary: {
      main: '#CCC2DC',
      light: '#625B71',
      dark: '#E8DEF8',
      contrastText: '#1D192B',
    },
    tertiary: {
      main: '#EFB8C8',
      light: '#7D5260',
      dark: '#FFD8E4',
      contrastText: '#31111D',
    },
    error: {
      main: '#FFB4AB',
      light: '#BA1A1A',
      dark: '#FFDAD6',
      contrastText: '#410002',
    },
    background: {
      default: '#1C1B1F',
      paper: '#1C1B1F',
    },
    surface: {
      main: '#1C1B1F',
      variant: '#49454F',
      container: '#211F26',
      containerHigh: '#2B2930',
      containerHighest: '#36343B',
    },
    outline: {
      main: '#938F99',
      variant: '#49454F',
    }
  }
};

// Custom breakpoints for responsive design
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 1920,
  },
};

// Material Design 3 Typography Scale
const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  
  // Material Design 3 Typography Tokens
  h1: {
    fontSize: '3.5rem', // 56px - Display Large
    fontWeight: 400,
    lineHeight: 1.14,
    letterSpacing: '-0.25px',
  },
  h2: {
    fontSize: '2.8125rem', // 45px - Display Medium
    fontWeight: 400,
    lineHeight: 1.16,
    letterSpacing: '0px',
  },
  h3: {
    fontSize: '2.25rem', // 36px - Display Small
    fontWeight: 400,
    lineHeight: 1.22,
    letterSpacing: '0px',
  },
  h4: {
    fontSize: '2rem', // 32px - Headline Large
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: '0px',
  },
  h5: {
    fontSize: '1.75rem', // 28px - Headline Medium
    fontWeight: 400,
    lineHeight: 1.29,
    letterSpacing: '0px',
  },
  h6: {
    fontSize: '1.5rem', // 24px - Headline Small
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: '0px',
  },
  subtitle1: {
    fontSize: '1.125rem', // 18px - Title Large
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: '0px',
  },
  subtitle2: {
    fontSize: '1rem', // 16px - Title Medium
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.15px',
  },
  body1: {
    fontSize: '1rem', // 16px - Body Large
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
  body2: {
    fontSize: '0.875rem', // 14px - Body Medium
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.25px',
  },
  caption: {
    fontSize: '0.75rem', // 12px - Body Small
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: '0.4px',
  },
  button: {
    fontSize: '0.875rem', // 14px - Label Large
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: '0.1px',
    textTransform: 'none' as const,
  },
};

// Material Design 3 Shape System
const shape = {
  borderRadius: 12, // Medium corner radius
};

// Material Design 3 Spacing System
const spacing = (factor: number) => `${0.25 * factor}rem`;

// Enhanced Animation Settings for 60fps
const transitions = {
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
    // Material Design 3 Motion Tokens
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
    standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  },
};

// Custom component styles with 60fps optimizations
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollBehavior: 'smooth',
        // Enable hardware acceleration for smooth animations
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden' as const,
        perspective: 1000,
      },
      '*': {
        // Optimize rendering for 60fps
        willChange: 'auto',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(121, 116, 126, 0.3)',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(121, 116, 126, 0.5)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '20px', // Material Design 3 button shape
        textTransform: 'none' as const,
        fontWeight: 500,
        padding: '10px 24px',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '16px', // Material Design 3 card shape
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontWeight: 500,
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        borderRadius: '16px',
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
    },
  },
};

export const createMaterialDesign3Theme = (mode: PaletteMode) => {
  const colors = materialDesign3Tokens[mode];
  
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...colors,
      // Add custom surface colors to the palette
      surfaceVariant: colors.surface.variant,
      outline: colors.outline.main,
      outlineVariant: colors.outline.variant,
    } as any,
    typography,
    shape,
    spacing,
    breakpoints,
    transitions,
    components,
    // Custom properties for Material Design 3
    customShadows: {
      elevation1: mode === 'light' 
        ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        : '0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.36)',
      elevation2: mode === 'light'
        ? '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
        : '0 3px 6px rgba(0, 0, 0, 0.24), 0 3px 6px rgba(0, 0, 0, 0.35)',
      elevation3: mode === 'light'
        ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
        : '0 10px 20px rgba(0, 0, 0, 0.28), 0 6px 6px rgba(0, 0, 0, 0.35)',
      elevation4: mode === 'light'
        ? '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
        : '0 14px 28px rgba(0, 0, 0, 0.35), 0 10px 10px rgba(0, 0, 0, 0.32)',
      elevation5: mode === 'light'
        ? '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)'
        : '0 19px 38px rgba(0, 0, 0, 0.40), 0 15px 12px rgba(0, 0, 0, 0.32)',
    },
  } as any;

  return createTheme(themeOptions);
};

export default createMaterialDesign3Theme('light');
