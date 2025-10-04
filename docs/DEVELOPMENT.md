# Development Workflow & Standards

## 🚀 Quick Start

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd kleaners

# Run the setup script
npm run setup

# Start development server
npm run dev
```

### Manual Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Setup husky
npx husky install

# Start development server
npm run dev
```

## 🔧 Development Tools

### Code Quality Tools

- **TypeScript**: Strict type checking with enhanced parsing options
- **ESLint**: Comprehensive linting with TypeScript, React, and accessibility
  rules
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for pre-commit validation
- **Lint-staged**: Run linters on staged files only

### Parsing & Compilation

- **Target**: ES2022 for modern JavaScript features
- **Module Resolution**: Bundler for optimal Next.js compatibility
- **Strict Mode**: Enhanced TypeScript strict checking
- **SWC**: Fast compilation and minification
- **Tree Shaking**: Optimized bundle size

## 📋 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run clean        # Clean build artifacts
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
npm run standards:validate # Run all validation checks
```

### Analysis & Debugging

```bash
npm run analyze      # Analyze bundle size
npm run setup        # Setup development environment
```

### Database

```bash
npm run db:generate  # Generate TypeScript types from Supabase
npm run db:push      # Push database changes to Supabase
npm run db:reset     # Reset the database
```

## 🎯 Code Standards

### TypeScript Configuration

- **Target**: ES2022 for modern JavaScript features
- **Strict Mode**: All strict checks enabled
- **Enhanced Parsing**:
  - `noUncheckedIndexedAccess`: Prevents undefined array access
  - `noImplicitReturns`: Ensures all code paths return
  - `noFallthroughCasesInSwitch`: Prevents switch fallthrough
  - `exactOptionalPropertyTypes`: Strict optional property handling
  - `noPropertyAccessFromIndexSignature`: Prevents unsafe property access

### ESLint Rules

- **TypeScript**: Comprehensive TypeScript-specific rules
- **React**: React and React Hooks best practices
- **Accessibility**: WCAG 2.1 AA compliance
- **Import Organization**: Automatic import sorting and grouping
- **Code Style**: Consistent formatting and naming conventions

### Prettier Configuration

- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Quotes**: Single quotes for consistency
- **Semicolons**: Always required
- **Trailing Commas**: ES5 compatible

## 🏗️ Project Structure

```
kleaners/
├── .vscode/              # VSCode configuration
├── .husky/               # Git hooks
├── app/                  # Next.js App Router
├── components/           # React components
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
├── scripts/              # Development scripts
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .editorconfig         # Editor configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🔍 Code Review Checklist

### Before Committing

- [ ] Run `npm run standards:validate`
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Code formatted with Prettier
- [ ] Components follow naming conventions
- [ ] Props properly typed
- [ ] Accessibility considerations addressed

### Code Quality

- [ ] Single responsibility principle
- [ ] Components under 50 lines when possible
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Mobile-first responsive design
- [ ] Performance optimizations applied

### TypeScript

- [ ] Strict type checking enabled
- [ ] No `any` types used
- [ ] Proper interface definitions
- [ ] Generic types used appropriately
- [ ] Type imports used for types only

### React Best Practices

- [ ] Functional components used
- [ ] Hooks used correctly
- [ ] Props destructured
- [ ] Key props for lists
- [ ] Event handlers properly typed
- [ ] Memoization used when appropriate

## 🚨 Common Issues & Solutions

### TypeScript Errors

```bash
# Run type check to see all errors
npm run type-check

# Common fixes:
# - Add proper type annotations
# - Use type imports: import type { Type } from 'module'
# - Fix strict null checks
# - Add proper return types
```

### ESLint Errors

```bash
# Fix automatically where possible
npm run lint:fix

# Common fixes:
# - Import organization
# - Unused variables
# - Missing dependencies in useEffect
# - Accessibility issues
```

### Prettier Issues

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 🔧 VSCode Setup

### Recommended Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense
- CSS Peek

### Settings

The project includes `.vscode/settings.json` with:

- Format on save enabled
- ESLint auto-fix on save
- Import organization on save
- TypeScript preferences
- Tailwind CSS support

## 📊 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# This will:
# - Build the project
# - Generate bundle analysis
# - Open in browser (if configured)
```

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🧪 Testing Strategy

### Manual Testing

1. **Cross-browser testing**: Chrome, Firefox, Safari, Edge
2. **Device testing**: Mobile, tablet, desktop
3. **Accessibility testing**: Screen readers, keyboard navigation
4. **Performance testing**: Lighthouse audits

### Automated Testing

- **Type checking**: TypeScript compiler
- **Linting**: ESLint with comprehensive rules
- **Formatting**: Prettier consistency checks
- **Build validation**: Next.js build process

## 🚀 Deployment

### Pre-deployment Checklist

- [ ] All tests pass
- [ ] TypeScript compilation successful
- [ ] ESLint warnings resolved
- [ ] Bundle size optimized
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Performance metrics acceptable

### Build Process

```bash
# Production build
npm run build

# Start production server
npm run start
```

## 📚 Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Best Practices

- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)

---

**Remember**: Consistency is key. Follow the established patterns and use the
provided tools to maintain code quality throughout the project.
