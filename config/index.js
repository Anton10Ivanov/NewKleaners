/**
 * Consolidated Configuration Reference
 *
 * This file serves as a central reference for all configuration files
 * in the project to reduce chaos and improve maintainability.
 */

export const configPaths = {
  // Code Quality
  eslint: 'eslint.config.js',
  prettier: '.prettierrc',
  typescript: 'tsconfig.json',

  // Testing
  vitest: 'vitest.config.ts',
  playwright: 'playwright.config.ts',

  // Build & Development
  nextjs: 'next.config.js',
  tailwind: 'tailwind.config.ts',
  postcss: 'postcss.config.js',

  // Code Analysis
  knip: 'config/knip.json',
  dependencyCruiser: '.dependency-cruiser.js',
  auditCi: 'config/audit-ci.json',

  // Performance
  lighthouse: 'config/lighthouserc.js',

  // Dependencies
  renovate: 'config/renovate.json',
  dependabot: '.github/dependabot.yml',

  // Git Hooks
  husky: '.husky/',
  lintStaged: 'config/.lintstagedrc.json',

  // Editor
  vscode: '.vscode/',
  editorconfig: '.editorconfig',

  // Package Management
  packageJson: 'package.json',
  packageLock: 'package-lock.json',
};

export const configDescriptions = {
  eslint: 'ESLint configuration with TypeScript, React, and accessibility rules',
  prettier: 'Code formatting configuration',
  typescript: 'TypeScript compiler configuration with strict settings',
  vitest: 'Unit testing configuration with coverage',
  playwright: 'End-to-end testing configuration',
  nextjs: 'Next.js framework configuration',
  tailwind: 'Tailwind CSS configuration with custom design system',
  postcss: 'PostCSS configuration for CSS processing',
  knip: 'Unused code detection and analysis',
  dependencyCruiser: 'Dependency architecture analysis',
  auditCi: 'Security vulnerability scanning',
  lighthouse: 'Performance and accessibility auditing',
  renovate: 'Automated dependency updates',
  dependabot: 'GitHub-native dependency updates',
  husky: 'Git hooks for pre-commit validation',
  lintStaged: 'Lint-staged configuration for staged files',
  vscode: 'VSCode workspace settings and extensions',
  editorconfig: 'Cross-editor configuration',
  packageJson: 'Project dependencies and scripts',
  packageLock: 'Locked dependency versions',
};

export default {
  paths: configPaths,
  descriptions: configDescriptions,
};
