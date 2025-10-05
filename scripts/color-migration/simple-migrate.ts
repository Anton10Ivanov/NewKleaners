/**
 * Simple Color Migration Script
 *
 * This script migrates all components from brand-specific colors
 * to semantic color tokens.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

interface MigrationStats {
  filesProcessed: number;
  replacementsMade: number;
  errors: string[];
}

/**
 * Migration mapping for common color replacements
 */
const colorMappings = {
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

  // Additional variations
  'text-oxford-blue-600': 'text-muted-foreground',
  'bg-seasalt-50': 'bg-background',
  'from-seasalt': 'from-background',
  'via-seasalt-50': 'via-background',
  'to-orange-peel-50': 'to-primary/10',
  'from-oxford-blue': 'from-secondary-foreground',
  'to-oxford-blue-800': 'to-secondary-foreground/80',
  'bg-white/80': 'bg-card/80',
  'bg-white/10': 'bg-card/10',
  'border-white/20': 'border-card/20',
  'text-seasalt/80': 'text-secondary/80',
  'border-seasalt/20': 'border-secondary/20',
} as const;

/**
 * Migrate a single file from brand colors to semantic tokens
 */
function migrateFile(filePath: string): { replacements: number; errors: string[] } {
  const errors: string[] = [];
  let replacements = 0;

  try {
    let content = readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Apply all color mappings
    for (const [oldPattern, newPattern] of Object.entries(colorMappings)) {
      const regex = new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);

      if (matches) {
        content = content.replace(regex, newPattern);
        replacements += matches.length;
      }
    }

    // Only write if changes were made
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf-8');
    }
  } catch (error) {
    errors.push(`Error processing ${filePath}: ${error}`);
  }

  return { replacements, errors };
}

/**
 * Migrate all component files
 */
async function migrateComponents(): Promise<MigrationStats> {
  const stats: MigrationStats = {
    filesProcessed: 0,
    replacementsMade: 0,
    errors: [],
  };

  try {
    // Find all component files
    const patterns = [
      'components/**/*.{tsx,ts}',
      'app/**/*.{tsx,ts}',
      '!**/*.d.ts',
      '!**/node_modules/**',
    ];

    const files = await glob(patterns);

    console.log(`Found ${files.length} files to process...`);

    for (const file of files) {
      if (existsSync(file)) {
        const result = migrateFile(file);
        stats.filesProcessed++;
        stats.replacementsMade += result.replacements;
        stats.errors.push(...result.errors);

        if (result.replacements > 0) {
          console.log(`✓ ${file}: ${result.replacements} replacements`);
        }
      }
    }
  } catch (error) {
    stats.errors.push(`Migration failed: ${error}`);
  }

  return stats;
}

/**
 * Main migration function
 */
async function main() {
  console.log('🎨 Starting Kleaners Color Migration...\n');

  // Step 1: Migrate components
  console.log('📁 Migrating component files...');
  const stats = await migrateComponents();

  // Step 2: Report results
  console.log('\n📊 Migration Results:');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Replacements made: ${stats.replacementsMade}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    stats.errors.forEach(error => console.log(`  - ${error}`));
  }

  console.log('\n🎉 Color migration complete!');
  console.log('\nNext steps:');
  console.log('1. Test your application: npm run dev');
  console.log('2. Check for any visual regressions');
  console.log('3. Run accessibility tests');
  console.log('4. Update documentation');
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { migrateComponents, migrateFile };
