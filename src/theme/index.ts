export const theme = {
  colors: {
    // Primary Colors
    primary: '#8B172D',
    primaryDark: '#5C0012',
    primaryLight: '#B2485E',

    // Secondary Colors
    secondary: '#33191B',
    secondaryLight: '#4F2B2D',

    // Background Colors
    background: '#F5F3F2',
    cardBackground: '#FFFFFF',

    // Text Colors
    textPrimary: '#33191B',
    textSecondary: '#664A4D',
    textLight: '#997D7F',

    // Border Colors
    border: '#E0D9D9',

    // Status Colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',

    // Special Colors
    accent: '#D4AF37',
    highlight: '#D4AF37',

    // Gradients
    gradientPrimary: ['#8B172D', '#B2485E'],
    gradientSecondary: ['#33191B', '#4F2B2D'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 9.51,
      elevation: 16,
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    full: 9999,
  },
};

export type Theme = typeof theme;
