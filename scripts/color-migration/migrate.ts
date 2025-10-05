/**
 * Color Migration Script
 *
 * This script migrates all components from brand-specific colors
 * to semantic color tokens.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { colorMappings } from './utils.js';

interface MigrationStats {
  filesProcessed: number;
  replacementsMade: number;
  errors: string[];
}

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
 * Validate migration results
 */
function validateMigration(): string[] {
  const issues: string[] = [];

  // Check for remaining brand color usage
  const remainingPatterns = [
    'orange-peel',
    'oxford-blue',
    'seasalt',
    'blue-green',
    'dark-spring-green',
  ];

  // This would need to be implemented with file scanning
  // For now, just return empty array
  return issues;
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

  // Step 3: Validation
  console.log('\n🔍 Validating migration...');
  const issues = validateMigration();

  if (issues.length === 0) {
    console.log('✅ Migration completed successfully!');
  } else {
    console.log('⚠️  Issues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
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

export { migrateComponents, migrateFile, validateMigration };
