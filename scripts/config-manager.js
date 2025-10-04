#!/usr/bin/env node

/**
 * Configuration Management Script
 *
 * This script helps manage and validate all configuration files
 * in the project to maintain consistency and reduce chaos.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPaths = {
  eslint: 'eslint.config.js',
  prettier: '.prettierrc',
  typescript: 'tsconfig.json',
  vitest: 'vitest.config.ts',
  playwright: 'playwright.config.ts',
  nextjs: 'next.config.js',
  tailwind: 'tailwind.config.ts',
  postcss: 'postcss.config.js',
  knip: 'config/knip.json',
  dependencyCruiser: '.dependency-cruiser.js',
  auditCi: 'config/audit-ci.json',
  lighthouse: 'config/lighthouserc.js',
  renovate: 'config/renovate.json',
  dependabot: '.github/dependabot.yml',
  husky: '.husky/',
  lintStaged: 'config/.lintstagedrc.json',
  vscode: '.vscode/',
  editorconfig: '.editorconfig',
};

function checkConfigFiles() {
  console.log('🔍 Checking configuration files...\n');

  const missing = [];
  const present = [];

  Object.entries(configPaths).forEach(([name, filePath]) => {
    if (fs.existsSync(filePath)) {
      present.push({ name, path: filePath });
      console.log(`✅ ${name}: ${filePath}`);
    } else {
      missing.push({ name, path: filePath });
      console.log(`❌ ${name}: ${filePath} (missing)`);
    }
  });

  console.log(`\n📊 Summary: ${present.length} present, ${missing.length} missing`);

  if (missing.length > 0) {
    console.log('\n⚠️  Missing configuration files:');
    missing.forEach(({ name, path: filePath }) => {
      console.log(`   - ${name}: ${filePath}`);
    });
  }

  return { present, missing };
}

function validateConfigs() {
  console.log('\n🔧 Validating configuration files...\n');

  const validations = [
    {
      name: 'TypeScript',
      command: 'npm run type-check',
      description: 'TypeScript compilation'
    },
    {
      name: 'ESLint',
      command: 'npm run lint',
      description: 'ESLint validation'
    },
    {
      name: 'Prettier',
      command: 'npm run format:check',
      description: 'Code formatting'
    },
    {
      name: 'Tests',
      command: 'npm run test --run',
      description: 'Unit tests'
    }
  ];

  const results = [];

  validations.forEach(({ name, command, description }) => {
    try {
      console.log(`⏳ Running ${name}...`);
      execSync(command, { stdio: 'pipe' });
      console.log(`✅ ${name}: ${description} passed`);
      results.push({ name, status: 'passed' });
    } catch (error) {
      console.log(`❌ ${name}: ${description} failed`);
      results.push({ name, status: 'failed', error: error.message });
    }
  });

  return results;
}

function showConfigSummary() {
  console.log('\n📋 Configuration Summary\n');
  console.log('This project uses the following configuration files:');
  console.log('');
  console.log('🔧 Code Quality:');
  console.log('   - eslint.config.js (ESLint with TypeScript, React, accessibility)');
  console.log('   - .prettierrc (Code formatting)');
  console.log('   - tsconfig.json (TypeScript compiler)');
  console.log('');
  console.log('🧪 Testing:');
  console.log('   - vitest.config.ts (Unit testing with coverage)');
  console.log('   - playwright.config.ts (E2E testing)');
  console.log('');
  console.log('🏗️  Build & Development:');
  console.log('   - next.config.js (Next.js framework)');
  console.log('   - tailwind.config.ts (Tailwind CSS)');
  console.log('   - postcss.config.js (PostCSS processing)');
  console.log('');
  console.log('📊 Code Analysis:');
  console.log('   - config/knip.json (Unused code detection)');
  console.log('   - .dependency-cruiser.js (Dependency analysis)');
  console.log('   - config/audit-ci.json (Security scanning)');
  console.log('');
  console.log('⚡ Performance:');
  console.log('   - config/lighthouserc.js (Performance auditing)');
  console.log('');
  console.log('📦 Dependencies:');
  console.log('   - config/renovate.json (Automated updates)');
  console.log('   - .github/dependabot.yml (GitHub updates)');
  console.log('');
  console.log('🔗 Git Hooks:');
  console.log('   - .husky/ (Pre-commit hooks)');
  console.log('   - .lintstagedrc.json (Staged file linting)');
  console.log('');
  console.log('💻 Editor:');
  console.log('   - .vscode/ (VSCode settings)');
  console.log('   - .editorconfig (Cross-editor config)');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'check':
      checkConfigFiles();
      break;
    case 'validate':
      validateConfigs();
      break;
    case 'summary':
      showConfigSummary();
      break;
    case 'all':
    default:
      checkConfigFiles();
      validateConfigs();
      showConfigSummary();
      break;
  }
}

main();

export {
  checkConfigFiles, configPaths, showConfigSummary, validateConfigs
};
