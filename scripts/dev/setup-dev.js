#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Kleaners development environment...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('\n📝 Creating .env.local from template...');
  try {
    if (fs.existsSync('env.example')) {
      fs.copyFileSync('env.example', '.env.local');
      console.log('✅ .env.local created from template');
      console.log('⚠️  Please update .env.local with your actual environment variables');
    } else {
      console.log('⚠️  env.example not found, please create .env.local manually');
    }
  } catch (error) {
    console.error('❌ Failed to create .env.local:', error.message);
  }
} else {
  console.log('✅ .env.local already exists');
}

// Run type check
console.log('\n🔍 Running TypeScript type check...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ TypeScript type check passed');
} catch (error) {
  console.log('⚠️  TypeScript type check failed. Please fix the errors.');
}

// Run lint check
console.log('\n🔍 Running ESLint...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ ESLint check passed');
} catch (error) {
  console.log('⚠️  ESLint check failed. Please fix the errors.');
}

// Run format check
console.log('\n🔍 Running Prettier format check...');
try {
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('✅ Prettier format check passed');
} catch (error) {
  console.log('⚠️  Prettier format check failed. Please run "npm run format" to fix.');
}

// Setup husky
console.log('\n🐕 Setting up Husky...');
try {
  execSync('npx husky install', { stdio: 'inherit' });
  console.log('✅ Husky installed successfully');
} catch (error) {
  console.log('⚠️  Failed to setup Husky:', error.message);
}

console.log('\n🎉 Development environment setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your environment variables');
console.log('2. Run "npm run dev" to start the development server');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n🔧 Available commands:');
console.log('- npm run dev: Start development server');
console.log('- npm run build: Build for production');
console.log('- npm run lint: Run ESLint');
console.log('- npm run lint:fix: Fix ESLint errors');
console.log('- npm run format: Format code with Prettier');
console.log('- npm run type-check: Run TypeScript type check');
console.log('- npm run standards:validate: Run all validation checks');
console.log('- npm run analyze: Analyze bundle size');
console.log('- npm run clean: Clean build artifacts');
