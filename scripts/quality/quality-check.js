#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running comprehensive quality checks...\n');

const checks = [
  { name: 'TypeScript', command: 'npm run type-check' },
  { name: 'ESLint', command: 'npm run lint' },
  { name: 'Prettier', command: 'npm run format:check' },
  { name: 'Tests', command: 'npm run test' },
  { name: 'Unused Code', command: 'npm run unused' },
  { name: 'Knip Analysis', command: 'npm run knip' },
  { name: 'Dependency Audit', command: 'npm run deps:audit' },
  { name: 'Dependency Cruise', command: 'npm run cruise' },
];

let failedChecks = [];

for (const check of checks) {
  try {
    console.log(`⏳ Running ${check.name}...`);
    execSync(check.command, { stdio: 'inherit' });
    console.log(`✅ ${check.name} passed\n`);
  } catch (error) {
    console.log(`❌ ${check.name} failed\n`);
    failedChecks.push(check.name);
  }
}

if (failedChecks.length > 0) {
  console.log(`❌ ${failedChecks.length} checks failed: ${failedChecks.join(', ')}`);
  process.exit(1);
} else {
  console.log('🎉 All quality checks passed!');
}
