/**
 * Contrast Validation Utility
 *
 * This utility helps validate color contrast ratios to ensure WCAG compliance
 */

import { parseHex } from 'culori';

/**
 * Calculate relative luminance of a color
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
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  try {
    const c1 = parseHex(color1);
    const c2 = parseHex(color2);

    if (!c1 || !c2) {
      return 0;
    }

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
 * Validate Kleaners color system contrast
 */
export function validateKleanersContrast(): {
  passes: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Test key color combinations
  const tests = [
    {
      name: 'Primary text on background',
      foreground: '#001b2e', // Oxford Blue
      background: '#f7f7f7', // Seasalt
      minContrast: 4.5,
    },
    {
      name: 'Muted text on background',
      foreground: '#666666', // Muted text
      background: '#f7f7f7', // Seasalt
      minContrast: 4.5,
    },
    {
      name: 'Primary button text',
      foreground: '#000000', // Black on orange
      background: '#ffa000', // Orange Peel
      minContrast: 4.5,
    },
    {
      name: 'Card text on card background',
      foreground: '#001b2e', // Oxford Blue
      background: '#ffffff', // White card
      minContrast: 4.5,
    },
    {
      name: 'Border visibility',
      foreground: '#cccccc', // Light border
      background: '#f7f7f7', // Seasalt
      minContrast: 3.0, // Lower threshold for borders
    },
  ];

  tests.forEach(test => {
    const contrast = getContrastRatio(test.foreground, test.background);

    if (contrast < test.minContrast) {
      issues.push(
        `${test.name}: Contrast ratio ${contrast.toFixed(2)} is below ${test.minContrast}`
      );

      if (test.name.includes('text')) {
        recommendations.push(`Consider darkening ${test.name} for better readability`);
      } else if (test.name.includes('border')) {
        recommendations.push(`Consider darkening ${test.name} for better definition`);
      }
    }
  });

  return {
    passes: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Generate contrast report
 */
export function generateContrastReport(): string {
  const validation = validateKleanersContrast();

  let report = '🎨 Kleaners Color Contrast Report\n\n';

  if (validation.passes) {
    report += '✅ All color combinations meet WCAG AA standards!\n\n';
  } else {
    report += '❌ Contrast issues found:\n\n';
    validation.issues.forEach(issue => {
      report += `• ${issue}\n`;
    });

    if (validation.recommendations.length > 0) {
      report += '\n💡 Recommendations:\n';
      validation.recommendations.forEach(rec => {
        report += `• ${rec}\n`;
      });
    }
  }

  return report;
}

export { getRelativeLuminance };
