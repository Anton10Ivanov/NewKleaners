/**
 * Color Migration Utility
 *
 * This script helps convert existing hex colors to OKLCH
 * and provides utilities for color system migration.
 */

import { oklch, parseHex } from 'culori';

/**
 * Convert hex color to OKLCH format
 */
export function hexToOklch(hex: string): string {
  try {
    const parsed = parseHex(hex);
    if (!parsed) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    const oklchColor = oklch(parsed);
    return `oklch(${oklchColor.l} ${oklchColor.c} ${oklchColor.h})`;
  } catch (error) {
    console.error(`Error converting ${hex} to OKLCH:`, error);
    return hex; // Return original if conversion fails
  }
}

/**
 * Convert HSL color to OKLCH format
 */
export function hslToOklch(hsl: string): string {
  try {
    // Parse HSL string like "217 32% 17%"
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
    if (h === undefined || s === undefined || l === undefined) {
      throw new Error(`Invalid HSL format: ${hsl}`);
    }
    const parsed = { h, s: s / 100, l: l / 100, mode: 'hsl' as const };
    const oklchColor = oklch(parsed);
    return `oklch(${oklchColor.l} ${oklchColor.c} ${oklchColor.h})`;
  } catch (error) {
    console.error(`Error converting HSL ${hsl} to OKLCH:`, error);
    return hsl;
  }
}

/**
 * Generate color scale variations
 */
export function generateColorScale(baseColor: string, steps: number[]): Record<string, string> {
  const scale: Record<string, string> = {};

  try {
    const parsed = parseHex(baseColor);
    if (!parsed) {
      throw new Error(`Invalid base color: ${baseColor}`);
    }

    steps.forEach(step => {
      const lightness = step / 1000; // Convert to 0-1 range
      const variation = { ...parsed, l: lightness };
      const oklchColor = oklch(variation);
      scale[step] = `oklch(${oklchColor.l} ${oklchColor.c} ${oklchColor.h})`;
    });

    return scale;
  } catch (error) {
    console.error(`Error generating scale for ${baseColor}:`, error);
    return {};
  }
}

/**
 * Validate OKLCH color format
 */
export function isValidOklch(color: string): boolean {
  return /^oklch\([\d.]+%?\s+[\d.]+%?\s+[\d.]+%?\)$/.test(color);
}

/**
 * Get contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  // This is a simplified version - in production you'd want a more robust implementation
  try {
    const c1 = parseHex(color1);
    const c2 = parseHex(color2);

    if (!c1 || !c2) {
      return 0;
    }

    // Convert to relative luminance and calculate contrast
    const l1 = getRelativeLuminance(c1);
    const l2 = getRelativeLuminance(c2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  } catch (error) {
    console.error('Error calculating contrast ratio:', error);
    return 0;
  }
}

/**
 * Get relative luminance of a color
 */
function getRelativeLuminance(color: any): number {
  const { r, g, b } = color;

  const toLinear = (c: number) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(color1: string, color2: string): boolean {
  const contrast = getContrastRatio(color1, color2);
  return contrast >= 4.5; // WCAG AA standard for normal text
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(color1: string, color2: string): boolean {
  const contrast = getContrastRatio(color1, color2);
  return contrast >= 7; // WCAG AAA standard for normal text
}

/**
 * Migration mapping for common color replacements
 */
export const colorMappings = {
  // Direct brand color replacements
  'bg-orange-peel': 'bg-primary',
  'text-orange-peel': 'text-primary',
  'border-orange-peel': 'border-primary',
  'hover:bg-orange-peel': 'hover:bg-primary-hover',
  'hover:bg-orange-peel-600': 'hover:bg-primary-hover',
  'hover:text-orange-peel': 'hover:text-primary',

  'bg-oxford-blue': 'bg-secondary-foreground',
  'text-oxford-blue': 'text-foreground',
  'border-oxford-blue': 'border-secondary-foreground',
  'hover:bg-oxford-blue': 'hover:bg-secondary-foreground',
  'hover:text-oxford-blue': 'hover:text-foreground',

  'bg-seasalt': 'bg-background',
  'text-seasalt': 'text-background',
  'border-seasalt': 'border-border',

  // Semantic replacements
  'bg-blue-green': 'bg-info',
  'text-blue-green': 'text-info',
  'border-blue-green': 'border-info',
  'hover:bg-blue-green': 'hover:bg-info',

  'bg-dark-spring-green': 'bg-success',
  'text-dark-spring-green': 'text-success',
  'border-dark-spring-green': 'border-success',
  'hover:bg-dark-spring-green': 'hover:bg-success',

  // Opacity variations
  'bg-orange-peel/10': 'bg-primary/10',
  'bg-orange-peel/20': 'bg-primary/20',
  'border-orange-peel/20': 'border-primary/20',
  'text-orange-peel/80': 'text-primary/80',

  'bg-oxford-blue/10': 'bg-secondary-foreground/10',
  'bg-oxford-blue/20': 'bg-secondary-foreground/20',
  'border-oxford-blue/20': 'border-secondary-foreground/20',
  'text-oxford-blue/80': 'text-foreground/80',
} as const;

export type ColorMappings = typeof colorMappings;
