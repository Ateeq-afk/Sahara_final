import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'rgb(0, 122, 255)',
          hover: 'rgb(0, 113, 227)',
          50: 'rgb(232, 242, 255)',
          100: 'rgb(219, 235, 255)',
          200: 'rgb(180, 215, 255)',
          300: 'rgb(128, 192, 255)',
          400: 'rgb(64, 156, 255)',
          500: 'rgb(0, 122, 255)',
          600: 'rgb(0, 113, 227)',
          700: 'rgb(0, 88, 224)',
          800: 'rgb(0, 66, 173)',
          900: 'rgb(0, 48, 124)',
        },
        gray: {
          DEFAULT: 'rgb(142, 142, 147)',
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
          950: 'rgb(0, 0, 0)',
        },
        accent: {
          DEFAULT: 'rgb(255, 214, 10)',
          hover: 'rgb(255, 204, 0)',
          light: 'rgb(255, 230, 122)',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        text: ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-15px)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fadeInUp': 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fadeIn': 'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slideInFromRight': 'slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slideInFromLeft': 'slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scaleIn': 'scaleIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scroll': 'scroll 40s linear infinite',
        'scroll-slow': 'scroll 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;