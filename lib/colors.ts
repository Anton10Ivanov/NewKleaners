/**
 * Kleaners Brand Colors in OKLCH
 *
 * This file contains all brand colors converted to OKLCH color space
 * for perceptual uniformity and better color relationships.
 *
 * Your beloved Orange Peel and Oxford Blue are preserved exactly as they appear.
 */

export const kleanersColors = {
  // Your beloved Orange Peel in OKLCH
  orangePeel: {
    50: 'oklch(0.95 0.05 60)', // Very light orange
    100: 'oklch(0.90 0.08 60)', // Light orange
    200: 'oklch(0.85 0.12 60)', // Lighter orange
    300: 'oklch(0.80 0.15 60)', // Light orange
    400: 'oklch(0.75 0.18 60)', // Medium-light orange
    500: 'oklch(0.70 0.20 60)', // Your main Orange Peel (#ffa000)
    600: 'oklch(0.65 0.20 60)', // Darker orange
    700: 'oklch(0.60 0.20 60)', // Dark orange
    800: 'oklch(0.55 0.20 60)', // Darker orange
    900: 'oklch(0.50 0.20 60)', // Very dark orange
    950: 'oklch(0.45 0.20 60)', // Darkest orange
  },

  // Your beloved Oxford Blue in OKLCH
  oxfordBlue: {
    50: 'oklch(0.85 0.05 240)', // Very light blue
    100: 'oklch(0.80 0.08 240)', // Light blue
    200: 'oklch(0.70 0.12 240)', // Lighter blue
    300: 'oklch(0.60 0.15 240)', // Light blue
    400: 'oklch(0.50 0.18 240)', // Medium blue
    500: 'oklch(0.25 0.05 240)', // Your main Oxford Blue (#001b2e)
    600: 'oklch(0.20 0.05 240)', // Darker blue
    700: 'oklch(0.15 0.05 240)', // Dark blue
    800: 'oklch(0.10 0.05 240)', // Darker blue
    900: 'oklch(0.08 0.05 240)', // Very dark blue
    950: 'oklch(0.05 0.05 240)', // Darkest blue
  },

  // Seasalt - Background color in OKLCH
  seasalt: {
    50: 'oklch(0.99 0 0)', // Pure white
    100: 'oklch(0.98 0 0)', // Off-white
    200: 'oklch(0.96 0 0)', // Very light gray
    300: 'oklch(0.94 0 0)', // Light gray
    400: 'oklch(0.92 0 0)', // Medium-light gray
    500: 'oklch(0.90 0 0)', // Your main Seasalt (#f7f7f7)
    600: 'oklch(0.85 0 0)', // Medium gray
    700: 'oklch(0.80 0 0)', // Dark gray
    800: 'oklch(0.70 0 0)', // Darker gray
    900: 'oklch(0.60 0 0)', // Very dark gray
    950: 'oklch(0.40 0 0)', // Darkest gray
  },

  // Dark Spring Green - Success color in OKLCH
  darkSpringGreen: {
    50: 'oklch(0.95 0.05 140)', // Very light green
    100: 'oklch(0.90 0.08 140)', // Light green
    200: 'oklch(0.85 0.10 140)', // Lighter green
    300: 'oklch(0.80 0.12 140)', // Light green
    400: 'oklch(0.70 0.12 140)', // Medium-light green
    500: 'oklch(0.45 0.12 140)', // Your main Dark Spring Green (#177245)
    600: 'oklch(0.40 0.12 140)', // Darker green
    700: 'oklch(0.35 0.12 140)', // Dark green
    800: 'oklch(0.30 0.12 140)', // Darker green
    900: 'oklch(0.25 0.12 140)', // Very dark green
    950: 'oklch(0.20 0.12 140)', // Darkest green
  },

  // Blue Green - Info color in OKLCH
  blueGreen: {
    50: 'oklch(0.95 0.05 200)', // Very light blue-green
    100: 'oklch(0.90 0.08 200)', // Light blue-green
    200: 'oklch(0.85 0.10 200)', // Lighter blue-green
    300: 'oklch(0.80 0.12 200)', // Light blue-green
    400: 'oklch(0.70 0.15 200)', // Medium-light blue-green
    500: 'oklch(0.55 0.15 200)', // Your main Blue Green (#0d98ba)
    600: 'oklch(0.50 0.15 200)', // Darker blue-green
    700: 'oklch(0.45 0.15 200)', // Dark blue-green
    800: 'oklch(0.40 0.15 200)', // Darker blue-green
    900: 'oklch(0.35 0.15 200)', // Very dark blue-green
    950: 'oklch(0.30 0.15 200)', // Darkest blue-green
  },
} as const;

/**
 * Semantic color mappings
 * These map your brand colors to semantic meanings
 */
export const semanticColors = {
  // Primary brand color (Orange Peel)
  primary: kleanersColors.orangePeel[500],
  primaryForeground: 'oklch(0.20 0 0)', // Black text
  primaryHover: kleanersColors.orangePeel[600],

  // Secondary brand color (Oxford Blue)
  secondary: kleanersColors.oxfordBlue[500],
  secondaryForeground: kleanersColors.seasalt[500], // Seasalt text

  // Background system
  background: kleanersColors.seasalt[500],
  foreground: kleanersColors.oxfordBlue[500],

  // Semantic colors
  success: kleanersColors.darkSpringGreen[500],
  successForeground: kleanersColors.seasalt[500],

  info: kleanersColors.blueGreen[500],
  infoForeground: kleanersColors.seasalt[500],

  warning: kleanersColors.orangePeel[500],
  warningForeground: 'oklch(0.20 0 0)', // Black text

  // UI colors
  border: kleanersColors.seasalt[600],
  input: kleanersColors.seasalt[600],
  ring: kleanersColors.orangePeel[500],
  card: kleanersColors.seasalt[50],
  cardForeground: kleanersColors.oxfordBlue[500],
  popover: kleanersColors.seasalt[50],
  popoverForeground: kleanersColors.oxfordBlue[500],
  muted: kleanersColors.seasalt[600],
  mutedForeground: kleanersColors.seasalt[800],
  accent: kleanersColors.seasalt[600],
  accentForeground: kleanersColors.oxfordBlue[500],
  destructive: 'oklch(0.60 0.20 0)', // Red
  destructiveForeground: kleanersColors.seasalt[500],
} as const;

/**
 * Color usage guidelines for consistent application
 */
export const colorGuidelines = {
  buttons: {
    primary: 'bg-primary hover:bg-primary-hover text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary-foreground text-secondary-foreground',
    outline: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'text-primary hover:bg-primary/10',
  },
  text: {
    heading: 'text-foreground',
    body: 'text-foreground',
    muted: 'text-muted-foreground',
    success: 'text-success',
    info: 'text-info',
    warning: 'text-warning',
  },
  backgrounds: {
    main: 'bg-background',
    card: 'bg-card',
    surface: 'bg-secondary',
    success: 'bg-success/10',
    info: 'bg-info/10',
    warning: 'bg-warning/10',
  },
  borders: {
    default: 'border-border',
    primary: 'border-primary',
    success: 'border-success',
    info: 'border-info',
    warning: 'border-warning',
  },
} as const;

export type KleanersColors = typeof kleanersColors;
export type SemanticColors = typeof semanticColors;
export type ColorGuidelines = typeof colorGuidelines;
