import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand Colors in OKLCH - Your beloved Orange Peel and Oxford Blue preserved
        'orange-peel': {
          DEFAULT: '#ffa000', // Fallback for older browsers
          50: 'oklch(0.95 0.05 60)',
          100: 'oklch(0.90 0.08 60)',
          200: 'oklch(0.85 0.12 60)',
          300: 'oklch(0.80 0.15 60)',
          400: 'oklch(0.75 0.18 60)',
          500: 'oklch(0.70 0.20 60)', // Your main Orange Peel (#ffa000)
          600: 'oklch(0.65 0.20 60)',
          700: 'oklch(0.60 0.20 60)',
          800: 'oklch(0.55 0.20 60)',
          900: 'oklch(0.50 0.20 60)',
          950: 'oklch(0.45 0.20 60)',
        },
        'oxford-blue': {
          DEFAULT: '#001b2e', // Fallback for older browsers
          50: 'oklch(0.85 0.05 240)',
          100: 'oklch(0.80 0.08 240)',
          200: 'oklch(0.70 0.12 240)',
          300: 'oklch(0.60 0.15 240)',
          400: 'oklch(0.50 0.18 240)',
          500: 'oklch(0.25 0.05 240)', // Your main Oxford Blue (#001b2e)
          600: 'oklch(0.20 0.05 240)',
          700: 'oklch(0.15 0.05 240)',
          800: 'oklch(0.10 0.05 240)',
          900: 'oklch(0.08 0.05 240)',
          950: 'oklch(0.05 0.05 240)',
        },
        seasalt: {
          DEFAULT: '#f7f7f7', // Fallback for older browsers
          50: 'oklch(0.99 0 0)',
          100: 'oklch(0.98 0 0)',
          200: 'oklch(0.96 0 0)',
          300: 'oklch(0.94 0 0)',
          400: 'oklch(0.92 0 0)',
          500: 'oklch(0.90 0 0)', // Your main Seasalt (#f7f7f7)
          600: 'oklch(0.85 0 0)',
          700: 'oklch(0.80 0 0)',
          800: 'oklch(0.70 0 0)',
          900: 'oklch(0.60 0 0)',
          950: 'oklch(0.40 0 0)',
        },
        'dark-spring-green': {
          DEFAULT: '#177245', // Fallback for older browsers
          50: 'oklch(0.95 0.05 140)',
          100: 'oklch(0.90 0.08 140)',
          200: 'oklch(0.85 0.10 140)',
          300: 'oklch(0.80 0.12 140)',
          400: 'oklch(0.70 0.12 140)',
          500: 'oklch(0.45 0.12 140)', // Your main Dark Spring Green (#177245)
          600: 'oklch(0.40 0.12 140)',
          700: 'oklch(0.35 0.12 140)',
          800: 'oklch(0.30 0.12 140)',
          900: 'oklch(0.25 0.12 140)',
          950: 'oklch(0.20 0.12 140)',
        },
        'blue-green': {
          DEFAULT: '#0d98ba', // Fallback for older browsers
          50: 'oklch(0.95 0.05 200)',
          100: 'oklch(0.90 0.08 200)',
          200: 'oklch(0.85 0.10 200)',
          300: 'oklch(0.80 0.12 200)',
          400: 'oklch(0.70 0.15 200)',
          500: 'oklch(0.55 0.15 200)', // Your main Blue Green (#0d98ba)
          600: 'oklch(0.50 0.15 200)',
          700: 'oklch(0.45 0.15 200)',
          800: 'oklch(0.40 0.15 200)',
          900: 'oklch(0.35 0.15 200)',
          950: 'oklch(0.30 0.15 200)',
        },

        // Additional Harmonious Colors - Color theory validated combinations
        teal: {
          DEFAULT: '#14b8a6', // Fallback for older browsers
          50: 'oklch(0.95 0.05 180)',
          100: 'oklch(0.90 0.08 180)',
          200: 'oklch(0.85 0.12 180)',
          300: 'oklch(0.80 0.15 180)',
          400: 'oklch(0.75 0.18 180)',
          500: 'oklch(0.70 0.20 180)', // Main teal - complementary to orange
          600: 'oklch(0.65 0.20 180)',
          700: 'oklch(0.60 0.20 180)',
          800: 'oklch(0.55 0.20 180)',
          900: 'oklch(0.50 0.20 180)',
          950: 'oklch(0.45 0.20 180)',
        },
        gold: {
          DEFAULT: '#fbbf24', // Fallback for older browsers
          50: 'oklch(0.95 0.05 45)',
          100: 'oklch(0.90 0.08 45)',
          200: 'oklch(0.85 0.12 45)',
          300: 'oklch(0.80 0.15 45)',
          400: 'oklch(0.75 0.18 45)',
          500: 'oklch(0.70 0.20 45)', // Main gold - warm luxury
          600: 'oklch(0.65 0.20 45)',
          700: 'oklch(0.60 0.20 45)',
          800: 'oklch(0.55 0.20 45)',
          900: 'oklch(0.50 0.20 45)',
          950: 'oklch(0.45 0.20 45)',
        },
        purple: {
          DEFAULT: '#8b5cf6', // Fallback for older browsers
          50: 'oklch(0.95 0.05 280)',
          100: 'oklch(0.90 0.08 280)',
          200: 'oklch(0.85 0.12 280)',
          300: 'oklch(0.80 0.15 280)',
          400: 'oklch(0.75 0.18 280)',
          500: 'oklch(0.70 0.20 280)', // Main purple - triadic harmony
          600: 'oklch(0.65 0.20 280)',
          700: 'oklch(0.60 0.20 280)',
          800: 'oklch(0.55 0.20 280)',
          900: 'oklch(0.50 0.20 280)',
          950: 'oklch(0.45 0.20 280)',
        },
        pink: {
          DEFAULT: '#ec4899', // Fallback for older browsers
          50: 'oklch(0.95 0.05 330)',
          100: 'oklch(0.90 0.08 330)',
          200: 'oklch(0.85 0.12 330)',
          300: 'oklch(0.80 0.15 330)',
          400: 'oklch(0.75 0.18 330)',
          500: 'oklch(0.70 0.20 330)', // Main pink - warm accent
          600: 'oklch(0.65 0.20 330)',
          700: 'oklch(0.60 0.20 330)',
          800: 'oklch(0.55 0.20 330)',
          900: 'oklch(0.50 0.20 330)',
          950: 'oklch(0.45 0.20 330)',
        },
        emerald: {
          DEFAULT: '#10b981', // Fallback for older browsers
          50: 'oklch(0.95 0.05 150)',
          100: 'oklch(0.90 0.08 150)',
          200: 'oklch(0.85 0.12 150)',
          300: 'oklch(0.80 0.15 150)',
          400: 'oklch(0.75 0.18 150)',
          500: 'oklch(0.70 0.20 150)', // Main emerald - natural trust
          600: 'oklch(0.65 0.20 150)',
          700: 'oklch(0.60 0.20 150)',
          800: 'oklch(0.55 0.20 150)',
          900: 'oklch(0.50 0.20 150)',
          950: 'oklch(0.45 0.20 150)',
        },
        'neutral-gray': {
          DEFAULT: '#6b7280', // Fallback for older browsers
          50: 'oklch(0.95 0.005 0)',
          100: 'oklch(0.90 0.01 0)',
          200: 'oklch(0.85 0.015 0)',
          300: 'oklch(0.80 0.02 0)',
          400: 'oklch(0.75 0.025 0)',
          500: 'oklch(0.70 0.03 0)', // Main neutral gray - text hierarchy
          600: 'oklch(0.65 0.03 0)',
          700: 'oklch(0.60 0.03 0)',
          800: 'oklch(0.55 0.03 0)',
          900: 'oklch(0.50 0.03 0)',
          950: 'oklch(0.45 0.03 0)',
        },
        'warm-gray': {
          DEFAULT: '#78716c', // Fallback for older browsers
          50: 'oklch(0.95 0.005 30)',
          100: 'oklch(0.90 0.01 30)',
          200: 'oklch(0.85 0.015 30)',
          300: 'oklch(0.80 0.02 30)',
          400: 'oklch(0.75 0.025 30)',
          500: 'oklch(0.70 0.03 30)', // Main warm gray - warm neutral
          600: 'oklch(0.65 0.03 30)',
          700: 'oklch(0.60 0.03 30)',
          800: 'oklch(0.55 0.03 30)',
          900: 'oklch(0.50 0.03 30)',
          950: 'oklch(0.45 0.03 30)',
        },
        'cool-gray': {
          DEFAULT: '#64748b', // Fallback for older browsers
          50: 'oklch(0.95 0.005 220)',
          100: 'oklch(0.90 0.01 220)',
          200: 'oklch(0.85 0.015 220)',
          300: 'oklch(0.80 0.02 220)',
          400: 'oklch(0.75 0.025 220)',
          500: 'oklch(0.70 0.03 220)', // Main cool gray - cool neutral
          600: 'oklch(0.65 0.03 220)',
          700: 'oklch(0.60 0.03 220)',
          800: 'oklch(0.55 0.03 220)',
          900: 'oklch(0.50 0.03 220)',
          950: 'oklch(0.45 0.03 220)',
        },
        amber: {
          DEFAULT: '#f59e0b', // Fallback for older browsers
          50: 'oklch(0.95 0.05 40)',
          100: 'oklch(0.90 0.08 40)',
          200: 'oklch(0.85 0.12 40)',
          300: 'oklch(0.80 0.15 40)',
          400: 'oklch(0.75 0.18 40)',
          500: 'oklch(0.70 0.20 40)', // Main amber - attention
          600: 'oklch(0.65 0.20 40)',
          700: 'oklch(0.60 0.20 40)',
          800: 'oklch(0.55 0.20 40)',
          900: 'oklch(0.50 0.20 40)',
          950: 'oklch(0.45 0.20 40)',
        },
        copper: {
          DEFAULT: '#b45309', // Fallback for older browsers
          50: 'oklch(0.95 0.05 25)',
          100: 'oklch(0.90 0.08 25)',
          200: 'oklch(0.85 0.12 25)',
          300: 'oklch(0.80 0.15 25)',
          400: 'oklch(0.75 0.18 25)',
          500: 'oklch(0.70 0.20 25)', // Main copper - warm accent
          600: 'oklch(0.65 0.20 25)',
          700: 'oklch(0.60 0.20 25)',
          800: 'oklch(0.55 0.20 25)',
          900: 'oklch(0.50 0.20 25)',
          950: 'oklch(0.45 0.20 25)',
        },
        silver: {
          DEFAULT: '#94a3b8', // Fallback for older browsers
          50: 'oklch(0.95 0.005 210)',
          100: 'oklch(0.90 0.01 210)',
          200: 'oklch(0.85 0.015 210)',
          300: 'oklch(0.80 0.02 210)',
          400: 'oklch(0.75 0.025 210)',
          500: 'oklch(0.70 0.03 210)', // Main silver - cool accent
          600: 'oklch(0.65 0.03 210)',
          700: 'oklch(0.60 0.03 210)',
          800: 'oklch(0.55 0.03 210)',
          900: 'oklch(0.50 0.03 210)',
          950: 'oklch(0.45 0.03 210)',
        },

        // Semantic Color Tokens - Primary way to use colors
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
          hover: 'oklch(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
          hover: 'oklch(var(--secondary-hover))',
        },
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        success: {
          DEFAULT: 'oklch(var(--success))',
          foreground: 'oklch(var(--success-foreground))',
        },
        info: {
          DEFAULT: 'oklch(var(--info))',
          foreground: 'oklch(var(--info-foreground))',
        },
        warning: {
          DEFAULT: 'oklch(var(--warning))',
          foreground: 'oklch(var(--warning-foreground))',
        },
        error: {
          DEFAULT: 'oklch(var(--error))',
          foreground: 'oklch(var(--error-foreground))',
        },

        // UI Colors - Enhanced Contrast
        border: 'oklch(var(--border))',
        'border-subtle': 'oklch(var(--border-subtle))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
