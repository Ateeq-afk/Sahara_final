// Apple Design System Utilities
// Consistent design tokens and utilities for Apple-style UI

export const appleDesignSystem = {
  // Typography Scale
  typography: {
    headline: 'font-display font-bold tracking-[-0.04em] leading-[1.07]',
    title: 'font-display font-semibold tracking-[-0.025em] leading-[1.2]',
    body: 'font-text font-normal tracking-[-0.015em] leading-[1.47]',
    caption: 'font-text font-normal tracking-[-0.01em] leading-[1.33] text-sm',
    
    // Font sizes with responsive variants
    sizes: {
      xs: 'text-[11px]',
      sm: 'text-[13px]',
      base: 'text-[16px] md:text-[17px]',
      lg: 'text-[19px] md:text-[21px]',
      xl: 'text-[22px] md:text-[24px]',
      '2xl': 'text-[28px] md:text-[32px]',
      '3xl': 'text-[34px] md:text-[40px]',
      '4xl': 'text-[40px] md:text-[48px]',
      '5xl': 'text-[48px] md:text-[56px]',
      '6xl': 'text-[56px] md:text-[64px]',
      '7xl': 'text-[64px] md:text-[80px]',
      '8xl': 'text-[80px] md:text-[96px]',
    },
  },

  // Spacing (8pt grid)
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
  },

  // Colors
  colors: {
    primary: 'rgb(0, 122, 255)',
    primaryHover: 'rgb(0, 113, 227)',
    gray: {
      50: 'rgb(251, 251, 253)',
      100: 'rgb(242, 242, 247)',
      200: 'rgb(229, 229, 234)',
      300: 'rgb(209, 209, 214)',
      400: 'rgb(174, 174, 178)',
      500: 'rgb(142, 142, 147)',
      600: 'rgb(99, 99, 102)',
      700: 'rgb(72, 72, 74)',
      800: 'rgb(48, 48, 51)',
      900: 'rgb(28, 28, 30)',
    },
  },

  // Shadows
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.06)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
    md: '0 4px 14px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 32px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 48px rgba(0, 0, 0, 0.12)',
    hover: '0 12px 28px rgba(0, 0, 0, 0.15)',
  },

  // Border Radius
  radius: {
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '18px',
    full: '980px',
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    medium: '250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    slow: '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    spring: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Glass Effects
  glass: {
    light: 'bg-white/78 backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/30',
    dark: 'bg-gray-900/78 backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/10',
    subtle: 'bg-white/50 backdrop-blur-[20px]',
    navbar: 'bg-gray-50/85 backdrop-blur-[20px] backdrop-saturate-[1.8] border-b border-black/10',
  },

  // Container Widths
  containers: {
    narrow: 'max-w-[800px]',
    default: 'max-w-[980px]',
    wide: 'max-w-[1200px]',
  },
};

// Helper function to create Apple-style buttons
export const appleButton = (variant: 'primary' | 'secondary' | 'ghost' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center font-normal transition-all duration-[250ms] rounded-[980px] hover:scale-[1.015] active:scale-[0.985] focus:outline-none focus:ring-[3px] focus:ring-primary/50 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
    ghost: 'bg-transparent text-primary hover:text-primary-hover',
  };
  
  const sizeClasses = {
    sm: 'h-9 px-4 text-[15px]',
    md: 'h-11 px-5 text-[17px]',
    lg: 'h-14 px-8 text-[19px]',
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

// Helper function to create Apple-style cards
export const appleCard = (variant: 'default' | 'flat' | 'outlined' = 'default') => {
  const baseClasses = 'rounded-[18px] transition-all duration-[400ms]';
  
  const variantClasses = {
    default: 'bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-black/[0.04]',
    flat: 'bg-gray-50 rounded-[12px]',
    outlined: 'bg-transparent border border-gray-200',
  };
  
  return `${baseClasses} ${variantClasses[variant]}`;
};

// Helper function to create Apple-style inputs
export const appleInput = () => {
  return 'w-full px-4 py-3 rounded-[10px] bg-gray-50 border border-gray-300 focus:bg-white focus:border-primary focus:ring-0 focus:outline-none transition-all duration-[250ms] text-[17px] leading-[1.23] tracking-[-0.01em] hover:border-gray-400';
};

// Helper function to create Apple-style sections
export const appleSection = (size: 'small' | 'default' | 'large' = 'default') => {
  const sizeClasses = {
    small: 'py-12 md:py-16 lg:py-20',
    default: 'py-20 md:py-24 lg:py-32',
    large: 'py-32 md:py-40 lg:py-48',
  };
  
  return sizeClasses[size];
};