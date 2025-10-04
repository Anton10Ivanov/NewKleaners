#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up unused code and dependencies...\n');

try {
  // Check for unused dependencies
  console.log('📦 Checking for unused dependencies...');
  execSync('npm run deps:unused', { stdio: 'inherit' });

  // Check for unused code
  console.log('\n📝 Checking for unused code...');
  execSync('npm run unused', { stdio: 'inherit' });

  // Run knip analysis
  console.log('\n🔍 Running knip analysis...');
  execSync('npm run knip', { stdio: 'inherit' });

  console.log('\n✅ Cleanup analysis complete!');
  console.log('Review the output above and remove unused code/dependencies manually.');
} catch (error) {
  console.error('❌ Cleanup analysis failed:', error.message);
  process.exit(1);
}
