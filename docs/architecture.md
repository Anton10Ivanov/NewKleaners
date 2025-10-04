# Kleaners Architecture Guide

## Table of Contents

1. [Overview](#overview)
2. [Application Structure](#application-structure)
3. [Design Principles](#design-principles)
4. [Technology Stack](#technology-stack)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Container System](#container-system)
8. [Development Workflow](#development-workflow)
9. [Performance Guidelines](#performance-guidelines)
10. [Security Architecture](#security-architecture)

---

## Overview

The Kleaners application follows a feature-based architecture with clear
separation of concerns, built on modern web technologies and best practices.
This comprehensive guide covers the entire architectural foundation of the
platform.

**Target Audience**: Developers, Architects, Technical Leads, QA Engineers

---

## Application Structure

The Kleaners application follows a feature-based architecture with clear
separation of concerns:

```
app/                    # Next.js App Router pages
├── (auth)/            # Authentication pages
├── (dashboard)/       # Dashboard layouts
├── (public)/          # Public pages
├── admin/             # Admin-specific pages
├── booking/           # Booking flow pages
├── client/            # Client dashboard pages
├── provider/          # Provider dashboard pages
└── services/          # Service listing pages

components/            # Reusable UI components
├── ui/                # Base UI components (shadcn/ui)
├── booking/           # Booking-specific components
├── navbar/            # Navigation components
├── forms/             # Form components
├── payments/          # Payment processing components
├── layout/            # Layout components
└── features/          # Feature-specific components

hooks/                 # Custom React hooks
lib/                   # Utility functions and configurations
schemas/               # Zod validation schemas
types/                 # TypeScript type definitions
utils/                 # Helper functions
services/              # Business logic services
supabase/              # Database migrations and functions
```

---

## Design Principles

### Mobile-First Development

- All components are designed for mobile first
- Touch targets minimum 44px
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

### Component Design

- Components should be under 50 lines when possible
- Single responsibility principle
- Consistent prop interfaces
- Proper TypeScript typing

### State Management

- Local state for UI components
- React Query for server state
- Zustand for global application state
- URL state for shareable data

---

## Technology Stack

### Frontend Framework

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations

### UI Component Library

- **shadcn/ui** as the foundation
- **Radix UI** primitives for accessibility
- **Class Variance Authority (CVA)** for component variants
- **Lucide React** for icons

### State Management

- **Zustand** for global state
- **React Query** for server state
- **React Hook Form** with Zod validation

### Backend & Services

- **Supabase** (PostgreSQL, Auth, Real-time, Storage)
- **Stripe** for payments
- **Google Maps API** for location services

---

## Component Architecture

All components follow this structure:

```typescript
// 1. Imports
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 2. Variants Definition
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        md: "medium-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 3. Props Interface
interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

// 4. Component Implementation
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// 5. Display Name
Component.displayName = "Component";

// 6. Export
export { Component, componentVariants };
```

### Component Organization

```
components/
├── ui/                    # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── forms/                 # Form components
│   ├── BookingForm.tsx
│   └── ContactForm.tsx
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
└── features/              # Feature-specific components
    ├── booking/
    ├── auth/
    └── dashboard/
```

---

## State Management

### When to Use What

- **useState**: Component-local UI state
- **React Query**: Server data, caching, synchronization
- **Zustand**: Global application state (user preferences, etc.)
- **URL state**: Shareable, bookmarkable state

### Error Handling

Always use the standardized error utilities:

```typescript
import { handleApiError } from '@/utils/errors';

try {
  await apiCall();
} catch (error) {
  handleApiError(error, 'Failed to load data');
}
```

---

## Container System

### UnifiedContainer (Primary)

**Location**: `components/layout/UnifiedContainer.tsx` **Status**: ✅ Active -
Use for all new components

#### Features:

- Standardized responsive widths
- Enhanced padding system
- Breakout and centering options
- Mobile-first design

#### Size Classes:

```typescript
sm: "max-w-2xl"      // 672px - Forms, narrow content
md: "max-w-4xl"      // 896px - Articles, medium content
lg: "max-w-6xl"      // 1152px - Wide content, dashboards
xl: "max-w-7xl"      // 1280px - Main content areas (default)
"2xl": "max-w-[1400px]" // 1400px - Ultra-wide content
"ultra-wide": "max-w-[1600px]" // 1600px - Maximum width
full: "max-w-none"   // No constraint
```

#### Padding System:

```typescript
// Boolean padding (default: true)
padding={true}  // Responsive: 16px → 24px → 32px → 40px → 48px → 64px

// Granular padding control
padding="sm"    // Smaller padding for compact layouts
padding="md"    // Medium padding for standard layouts
padding="lg"    // Large padding for spacious layouts
padding="xl"    // Extra large padding for hero sections
padding={false} // No padding
```

### Implementation Guidelines

#### For New Components:

```tsx
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";

// Standard content area
<UnifiedContainer size="xl" padding="md">
  {content}
</UnifiedContainer>

// Hero section with breakout
<UnifiedContainer size="2xl" padding="lg" breakout>
  {heroContent}
</UnifiedContainer>

// Compact form
<UnifiedContainer size="sm" padding="sm">
  {formContent}
</UnifiedContainer>
```

---

## Development Workflow

### Getting Started

1. **Environment Setup**

   ```bash
   npm install
   cp .env.example .env.local
   # Configure your Supabase credentials
   npm run dev
   ```

2. **Code Standards**
   - Follow existing TypeScript patterns
   - Use mobile-first responsive design
   - Keep components under 50 lines
   - Write descriptive commit messages

### Creating New Components

1. **Location**: Place in appropriate feature folder
2. **Naming**: Use PascalCase for components
3. **Props**: Define clear TypeScript interfaces
4. **Export**: Use default exports for components

Example component structure:

```typescript
interface ComponentProps {
  title: string;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default Component;
```

### Styling Guidelines

#### Design System Integration

- **Use shadcn/ui components** as the foundation - prefer composition over
  custom styling
- **Leverage CSS variables** for theming: `hsl(var(--primary))` instead of
  hardcoded colors
- **Use Class Variance Authority (CVA)** for component variants when extending
  shadcn/ui components
- **Follow semantic naming**: Use `primary`, `secondary`, `muted`, `accent`
  instead of color names

#### TailwindCSS Best Practices

- **Mobile-first approach**: Default styles for mobile, then `md:`, `lg:`,
  `xl:`, `2xl:`
- **Use design tokens**: Prefer custom spacing (`spacing-sm`, `spacing-md`) over
  arbitrary values
- **Consistent spacing scale**: Use the defined scale (`xs`, `sm`, `md`, `lg`,
  `xl`, `2xl`, `3xl`, `4xl`)
- **Typography hierarchy**: Use semantic font sizes (`text-xs`, `text-sm`,
  `text-base`, etc.)

### Code Review Checklist

#### Functionality

- [ ] Component works as expected across all breakpoints
- [ ] All interactive elements are functional
- [ ] Error states are handled gracefully
- [ ] Loading states provide appropriate feedback
- [ ] Form validation works correctly

#### Design System Compliance

- [ ] Uses shadcn/ui components where possible
- [ ] Leverages CSS variables for theming (`hsl(var(--primary))`)
- [ ] Follows semantic color naming (`primary`, `secondary`, `muted`)
- [ ] Uses design system spacing tokens (`spacing-sm`, `card-spacing-md`)
- [ ] Implements proper responsive design (mobile-first)
- [ ] Uses CVA for component variants when extending shadcn/ui
- [ ] Avoids hardcoded colors and arbitrary values
- [ ] Consistent with existing component patterns

---

## Performance Guidelines

### Image Optimization

```typescript
// Next.js Image Component
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Professional cleaning service"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```typescript
// Lazy Loading Components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### Bundle Optimization

- Use dynamic imports for non-critical components
- Implement proper tree shaking
- Optimize bundle size with webpack-bundle-analyzer
- Use React.memo for expensive components

---

## Security Architecture

### Authentication

- Supabase Auth integration
- Role-based access control
- Protected routes with proper redirects

### Data Protection

- Input sanitization
- XSS prevention
- CSRF protection
- Secure form handling

### Payment Security

- PCI DSS compliance
- Tokenized payments
- Secure API communication
- Fraud detection

---

## Key Patterns

### Error Handling

- Comprehensive error boundaries
- Standardized error utilities in `utils/errors/`
- Toast notifications for user feedback
- Development-friendly error logging

### Performance

- React.memo for expensive components
- Lazy loading for route-based code splitting
- Optimized re-renders with proper dependencies

### Testing Strategy

1. **Manual Testing**: Cross-browser and device testing
2. **Accessibility Testing**: Screen reader and keyboard navigation
3. **Performance Testing**: Lighthouse audits and bundle analysis
4. **Visual Regression**: Screenshot comparisons for UI changes

---

_This comprehensive architecture guide serves as the definitive reference for
understanding and working with the Kleaners platform architecture._
