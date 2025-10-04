# Design Principles

## Core Principles

1. **User-Centric Design**: Every interface decision prioritizes user needs and business goals
2. **Consistency**: Uniform patterns create predictable, learnable experiences
3. **Accessibility First**: WCAG 2.1 AA compliance is non-negotiable
4. **Mobile-First**: Responsive design starting from mobile devices
5. **Performance**: Fast, smooth interactions enhance user experience
6. **Scalability**: Design system supports rapid feature development

## Brand Values

- **Trust**: Professional, reliable, and secure appearance
- **Efficiency**: Streamlined workflows and clear information hierarchy
- **Quality**: Attention to detail in every interaction
- **Innovation**: Modern, cutting-edge user experience

## Mobile-First Development

- All components are designed for mobile first
- Touch targets minimum 44px
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Component Design

- Components should be under 50 lines when possible
- Single responsibility principle
- Consistent prop interfaces
- Proper TypeScript typing

## State Management

- Local state for UI components
- React Query for server state
- Zustand for global application state
- URL state for shareable data

## Color System

### Kleaners Brand Palette

#### Primary Brand Colors

- **Orange Peel (#ffa000)**: Logo & CTA Buttons
- **Oxford Blue (#001b2e)**: Navigation & Footer
- **Seasalt (#f7f7f7)**: Main Background

#### Supporting Brand Colors

- **Dark Spring Green (#177245)**: Success & Positive States
- **Blue Green (#0d98ba)**: Info & Accent States

### Color Usage Guidelines

#### Primary Usage
- **Orange Peel (#ffa000)**: Logo, CTA buttons, primary interactive elements, focus states, warning states

#### Secondary Usage
- **Oxford Blue (#001b2e)**: Navigation bar, footer, primary text, headers, dark mode primary

#### Background Usage
- **Seasalt (#f7f7f7)**: Main page background, card backgrounds, secondary surface areas

#### Semantic Usage
- **Dark Spring Green (#177245)**: Success messages, positive feedback, completed states
- **Blue Green (#0d98ba)**: Information messages, help text, secondary accent elements

### Color Accessibility

- All color combinations meet WCAG 2.1 AA contrast requirements
- Oxford Blue on Seasalt: 8.2:1 contrast ratio (exceeds AA standards)
- Orange Peel on Black: 12.6:1 contrast ratio (exceeds AA standards)
- Color is never the only means of conveying information

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Monospace**: "Fira Code", "JetBrains Mono", monospace

### Type Scale

```css
/* Headings */
.heading-1 { @apply text-4xl font-bold leading-tight; } /* 36px */
.heading-2 { @apply text-3xl font-bold leading-tight; } /* 30px */
.heading-3 { @apply text-2xl font-semibold leading-snug; } /* 24px */
.heading-4 { @apply text-xl font-semibold leading-snug; } /* 20px */
.heading-5 { @apply text-lg font-medium leading-normal; } /* 18px */
.heading-6 { @apply text-base font-medium leading-normal; } /* 16px */

/* Body Text */
.body-large { @apply text-lg leading-relaxed; } /* 18px */
.body-regular { @apply text-base leading-relaxed; } /* 16px */
.body-small { @apply text-sm leading-normal; } /* 14px */
.body-xs { @apply text-xs leading-normal; } /* 12px */
```

### Typography Hierarchy

1. **Page Title**: `heading-1` - Main page headings
2. **Section Title**: `heading-2` - Major section headers
3. **Card Title**: `heading-3` - Component titles
4. **Subsection**: `heading-4` - Subsection headers
5. **Form Label**: `heading-5` - Form field labels
6. **Body Text**: `body-regular` - Default text content
7. **Small Text**: `body-small` - Supporting information
8. **Caption**: `caption` - Image captions, metadata

## Spacing & Layout

### 8px Grid System

All spacing follows an 8px base unit for visual consistency:

```css
/* Spacing Scale */
.spacing-xs { margin: var(--spacing-xs); } /* 4px */
.spacing-sm { margin: var(--spacing-sm); } /* 8px */
.spacing-md { margin: var(--spacing-md); } /* 16px */
.spacing-lg { margin: var(--spacing-lg); } /* 24px */
.spacing-xl { margin: var(--spacing-xl); } /* 32px */
.spacing-2xl { margin: var(--spacing-2xl); } /* 48px */
.spacing-3xl { margin: var(--spacing-3xl); } /* 64px */
.spacing-4xl { margin: var(--spacing-4xl); } /* 96px */
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: 0px+ (Mobile) */
/* sm: 640px+ (Small tablets) */
/* md: 768px+ (Tablets) */
/* lg: 1024px+ (Laptops) */
/* xl: 1280px+ (Desktops) */
/* 2xl: 1536px+ (Large desktops) */
```

## Component Standards

### Component Architecture

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

## Animation & Motion

### Animation Principles

1. **Purposeful**: Every animation serves a functional purpose
2. **Consistent**: Standardized timing and easing functions
3. **Accessible**: Respects `prefers-reduced-motion` setting
4. **Performance**: 60fps animations using transform and opacity

### Duration Scale

```css
--duration-fast: 150ms; /* Micro-interactions */
--duration-normal: 300ms; /* Standard transitions */
--duration-slow: 500ms; /* Page transitions */
```

### Animation Guidelines

- **Entrance**: Fade in with slight upward movement
- **Exit**: Fade out with slight downward movement
- **Hover**: Subtle scale (1.02) with smooth transition
- **Loading**: Skeleton screens or progress indicators
- **Success**: Checkmark animation or color change
- **Error**: Shake animation for form validation

## Accessibility Standards

### WCAG 2.1 AA Compliance

All interfaces must meet WCAG 2.1 AA standards:

#### Color Contrast
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio
- UI components: 3:1 minimum contrast ratio

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are visible and clear
- Tab order follows logical flow

#### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and roles
- Descriptive alt text for images
- Form labels properly associated

### Accessibility Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Screen reader announces content correctly
- [ ] Focus indicators are visible and clear
- [ ] Form labels are properly associated
- [ ] Error messages are announced to screen readers
- [ ] Images have appropriate alt text
- [ ] Headings follow logical hierarchy
- [ ] Links have descriptive text
- [ ] Tables have proper headers and captions

## Responsive Design

### Mobile-First Approach

Design and develop for mobile devices first, then enhance for larger screens:

```css
/* Mobile First Example */
.component {
  /* Mobile styles (0px+) */
  padding: 1rem;
  font-size: 0.875rem;

  /* Small tablets (640px+) */
  @media (min-width: 640px) {
    padding: 1.5rem;
    font-size: 1rem;
  }

  /* Tablets (768px+) */
  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1.125rem;
  }

  /* Laptops (1024px+) */
  @media (min-width: 1024px) {
    padding: 2.5rem;
    font-size: 1.25rem;
  }
}
```

### Touch Targets

- Minimum touch target size: 44px × 44px
- Adequate spacing between interactive elements
- Thumb-friendly navigation for mobile

### Responsive Typography

```css
/* Fluid Typography */
.heading-responsive {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.body-responsive {
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}
```

## Code Standards

### TypeScript Standards

```typescript
// Strict TypeScript Configuration
interface ComponentProps {
  title: string;
  description?: string;
  onAction: () => void;
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Generic Components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Files**: kebab-case for non-components (`user-profile.utils.ts`)
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`user-profile-card`)

### Import Organization

```typescript
// 1. React and Next.js imports
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';

// 3. Internal utilities and hooks
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// 4. UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 5. Types and interfaces
import type { User, BookingData } from '@/types';
```

## Quality Assurance

### Code Review Checklist

#### Functionality
- [ ] Component works as expected across all breakpoints
- [ ] All interactive elements are functional
- [ ] Error states are handled gracefully
- [ ] Loading states provide appropriate feedback
- [ ] Form validation works correctly

#### Design System Compliance
- [ ] Uses shadcn/ui components where possible
- [ ] Follows color system guidelines
- [ ] Implements proper typography hierarchy
- [ ] Uses consistent spacing scale
- [ ] Applies appropriate animations

#### Accessibility
- [ ] Keyboard navigation works correctly
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Focus indicators are visible
- [ ] ARIA labels are properly implemented

#### Performance
- [ ] Component renders efficiently
- [ ] Images are optimized
- [ ] Animations are smooth (60fps)
- [ ] Bundle size impact is minimal

#### Code Quality
- [ ] TypeScript types are properly defined
- [ ] Code follows established patterns
- [ ] No console errors or warnings
- [ ] Proper error handling implemented
- [ ] Code is well-documented

---

_This document establishes the core design principles that guide all UI/UX decisions in the Kleaners platform._
