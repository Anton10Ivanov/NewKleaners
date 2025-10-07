# Kleaners UI/UX Design Standards & Guidelines

## Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Technology Stack](#technology-stack)
4. [Design System Foundation](#design-system-foundation)
5. [Color System](#color-system)
6. [Typography](#typography)
7. [Spacing & Layout](#spacing--layout)
8. [Component Standards](#component-standards)
9. [Animation & Motion](#animation--motion)
10. [Accessibility Standards](#accessibility-standards)
11. [Responsive Design](#responsive-design)
12. [Performance Guidelines](#performance-guidelines)
13. [Code Standards](#code-standards)
14. [Quality Assurance](#quality-assurance)

---

## Overview

This document establishes comprehensive UI/UX standards for the Kleaners
cleaning service platform. These standards ensure consistency, accessibility,
and maintainability across all user interfaces while leveraging our modern
technology stack.

**Target Audience**: Developers, Designers, Product Managers, QA Engineers

---

## Design Philosophy

### Core Principles

1. **User-Centric Design**: Every interface decision prioritizes user needs and
   business goals
2. **Consistency**: Uniform patterns create predictable, learnable experiences
3. **Accessibility First**: WCAG 2.1 AA compliance is non-negotiable
4. **Mobile-First**: Responsive design starting from mobile devices
5. **Performance**: Fast, smooth interactions enhance user experience
6. **Scalability**: Design system supports rapid feature development

### Brand Values

- **Trust**: Professional, reliable, and secure appearance
- **Efficiency**: Streamlined workflows and clear information hierarchy
- **Quality**: Attention to detail in every interaction
- **Innovation**: Modern, cutting-edge user experience

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

## Design System Foundation

### CSS Variables Architecture

All design tokens are defined as CSS custom properties for consistent theming:

```css
:root {
  /* Brand Color System - Kleaners Palette */
  --oxford-blue: 205 100% 9%; /* #001b2e - Oxford Blue */
  --oxford-blue-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt */
  --orange-peel: 38 100% 50%; /* #ffa000 - Orange Peel */
  --orange-peel-foreground: 0 0% 0%; /* #000000 - Black */
  --dark-spring-green: 150 66% 27%; /* #177245 - Dark Spring Green */
  --dark-spring-green-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt */
  --seasalt: 0 0% 97%; /* #f7f7f7 - Seasalt */
  --seasalt-foreground: 205 100% 9%; /* #001b2e - Oxford Blue */
  --blue-green: 192 87% 39%; /* #0d98ba - Blue Green */
  --blue-green-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt */

  /* Primary Brand Colors */
  --primary: 38 100% 50%; /* Orange Peel - CTA buttons, logo */
  --primary-foreground: 0 0% 0%; /* Black text on orange */
  --primary-hover: 38 100% 45%; /* Darker orange on hover */

  /* Secondary Brand Colors */
  --secondary: 0 0% 97%; /* Seasalt - Secondary backgrounds */
  --secondary-foreground: 205 100% 9%; /* Oxford Blue text on seasalt */

  /* Navigation & Footer */
  --nav-bg: 205 100% 9%; /* Oxford Blue - Navbar/Footer */
  --nav-foreground: 0 0% 97%; /* Seasalt text on nav */

  /* Background System */
  --background: 0 0% 97%; /* Seasalt - Main background */
  --foreground: 205 100% 9%; /* Oxford Blue - Primary text */

  /* Surface Colors */
  --card: 0 0% 100%; /* White cards */
  --card-foreground: 205 100% 9%; /* Oxford Blue text on cards */
  --popover: 0 0% 100%; /* White popovers */
  --popover-foreground: 205 100% 9%; /* Oxford Blue text on popovers */

  /* Semantic Colors */
  --success: 150 66% 27%; /* Dark Spring Green - Success states */
  --success-foreground: 0 0% 97%; /* Seasalt text on green */
  --success-light: 150 66% 90%; /* Light green backgrounds */

  --warning: 38 100% 50%; /* Orange Peel - Warning states */
  --warning-foreground: 0 0% 0%; /* Black text on orange */
  --warning-light: 38 100% 90%; /* Light orange backgrounds */

  --destructive: 0 84% 60%; /* Red - Error states */
  --destructive-foreground: 0 0% 97%; /* Seasalt text on red */
  --destructive-light: 0 84% 90%; /* Light red backgrounds */

  --info: 192 87% 39%; /* Blue Green - Info states */
  --info-foreground: 0 0% 97%; /* Seasalt text on blue-green */
  --info-light: 192 87% 90%; /* Light blue-green backgrounds */

  /* Interactive Colors */
  --accent: 0 0% 94%; /* Light gray - Accent backgrounds */
  --accent-foreground: 205 100% 9%; /* Oxford Blue text on accent */
  --muted: 0 0% 94%; /* Light gray - Muted backgrounds */
  --muted-foreground: 205 100% 20%; /* Muted Oxford Blue text */
  --border: 0 0% 90%; /* Light gray borders */
  --input: 0 0% 90%; /* Light gray input borders */
  --ring: 38 100% 50%; /* Orange Peel - Focus rings */

  /* Text Hierarchy */
  --text-primary: 205 100% 9%; /* Oxford Blue - H1, H2, H3 */
  --text-secondary: 205 100% 20%; /* Muted Oxford Blue - Subtext */
  --text-muted: 205 100% 40%; /* Light Oxford Blue - Captions */

  /* Spacing Scale */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
  --spacing-3xl: 4rem; /* 64px */
  --spacing-4xl: 6rem; /* 96px */

  /* Typography Scale */
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */

  /* Border Radius */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Animation Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

---

## Color System

### Kleaners Brand Palette

#### Primary Brand Colors

```css
/* Orange Peel - Logo & CTA Buttons */
--orange-peel: 38 100% 50%; /* #ffa000 - Primary brand color */
--orange-peel-foreground: 0 0% 0%; /* #000000 - Black text on orange */
--orange-peel-hover: 38 100% 45%; /* Darker orange on hover */
--orange-peel-light: 38 100% 90%; /* Light orange backgrounds */

/* Oxford Blue - Navigation & Footer */
--oxford-blue: 205 100% 9%; /* #001b2e - Navbar/Footer color */
--oxford-blue-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt text on blue */
--oxford-blue-light: 205 100% 20%; /* Muted Oxford Blue */
--oxford-blue-lighter: 205 100% 40%; /* Light Oxford Blue */

/* Seasalt - Background */
--seasalt: 0 0% 97%; /* #f7f7f7 - Main background */
--seasalt-foreground: 205 100% 9%; /* #001b2e - Oxford Blue text on seasalt */
--seasalt-dark: 0 0% 94%; /* Slightly darker seasalt */
--seasalt-darker: 0 0% 90%; /* Even darker for borders */
```

#### Supporting Brand Colors

```css
/* Dark Spring Green - Success & Positive States */
--dark-spring-green: 150 66% 27%; /* #177245 - Success states */
--dark-spring-green-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt text on green */
--dark-spring-green-light: 150 66% 90%; /* Light green backgrounds */

/* Blue Green - Info & Accent States */
--blue-green: 192 87% 39%; /* #0d98ba - Info states */
--blue-green-foreground: 0 0% 97%; /* #f7f7f7 - Seasalt text on blue-green */
--blue-green-light: 192 87% 90%; /* Light blue-green backgrounds */
```

### Color Usage Guidelines

#### Primary Usage

- **Orange Peel (#ffa000)**:
  - Logo and brand elements
  - Call-to-action buttons
  - Primary interactive elements
  - Focus states and highlights
  - Warning states

#### Secondary Usage

- **Oxford Blue (#001b2e)**:
  - Navigation bar background
  - Footer background
  - Primary text color (H1, H2, H3)
  - Headers and important text
  - Dark mode primary color

#### Background Usage

- **Seasalt (#f7f7f7)**:
  - Main page background
  - Card backgrounds (when needed)
  - Secondary surface areas
  - Light mode primary background

#### Semantic Usage

- **Dark Spring Green (#177245)**:
  - Success messages and confirmations
  - Positive feedback indicators
  - Completed states
  - Environmental/eco-friendly messaging

- **Blue Green (#0d98ba)**:
  - Information messages
  - Help text and tooltips
  - Secondary accent elements
  - Water/cleaning related elements

### Text Color Hierarchy

```css
/* Primary Text - Headings */
--text-primary: 205 100% 9%; /* Oxford Blue - H1, H2, H3 */
--text-primary-light: 205 100% 20%; /* Muted Oxford Blue - H4, H5, H6 */

/* Secondary Text - Body Content */
--text-secondary: 205 100% 30%; /* Medium Oxford Blue - Body text */
--text-muted: 205 100% 40%; /* Light Oxford Blue - Subtext, captions */

/* Special Text Colors */
--text-success: 150 66% 27%; /* Dark Spring Green - Success text */
--text-info: 192 87% 39%; /* Blue Green - Info text */
--text-warning: 38 100% 50%; /* Orange Peel - Warning text */
```

### Component-Specific Color Usage

#### Buttons

```css
/* Primary Button (CTA) */
.btn-primary {
  background: hsl(var(--orange-peel));
  color: hsl(var(--orange-peel-foreground));
  border: 2px solid hsl(var(--orange-peel));
}

/* Secondary Button */
.btn-secondary {
  background: hsl(var(--seasalt));
  color: hsl(var(--oxford-blue));
  border: 2px solid hsl(var(--oxford-blue));
}

/* Success Button */
.btn-success {
  background: hsl(var(--dark-spring-green));
  color: hsl(var(--dark-spring-green-foreground));
  border: 2px solid hsl(var(--dark-spring-green));
}
```

#### Navigation

```css
/* Navigation Bar */
.navbar {
  background: hsl(var(--oxford-blue));
  color: hsl(var(--oxford-blue-foreground));
}

/* Navigation Links */
.nav-link {
  color: hsl(var(--oxford-blue-foreground));
}

.nav-link:hover {
  color: hsl(var(--orange-peel));
}
```

#### Cards and Surfaces

```css
/* Card Background */
.card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
}

/* Card with Oxford Blue Accent */
.card-accent {
  border-left: 4px solid hsl(var(--oxford-blue));
}
```

### Color Accessibility

- All color combinations meet WCAG 2.1 AA contrast requirements
- Oxford Blue on Seasalt: 8.2:1 contrast ratio (exceeds AA standards)
- Orange Peel on Black: 12.6:1 contrast ratio (exceeds AA standards)
- Dark Spring Green on Seasalt: 4.8:1 contrast ratio (meets AA standards)
- Blue Green on Seasalt: 3.1:1 contrast ratio (meets AA standards for large
  text)
- Color is never the only means of conveying information

### TailwindCSS Configuration

Update your `tailwind.config.js` to include the new color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Kleaners Brand Colors
        'oxford-blue': {
          DEFAULT: '#001b2e',
          100: '#000509',
          200: '#000b12',
          300: '#00101c',
          400: '#001525',
          500: '#001b2e',
          600: '#00518b',
          700: '#0087e8',
          800: '#45b2ff',
          900: '#a2d8ff',
        },
        'orange-peel': {
          DEFAULT: '#ffa000',
          100: '#332000',
          200: '#664100',
          300: '#996100',
          400: '#cc8100',
          500: '#ffa000',
          600: '#ffb433',
          700: '#ffc766',
          800: '#ffda99',
          900: '#ffeccc',
        },
        'dark-spring-green': {
          DEFAULT: '#177245',
          100: '#05170e',
          200: '#092e1c',
          300: '#0e4529',
          400: '#135b37',
          500: '#177245',
          600: '#24b06a',
          700: '#46d98f',
          800: '#83e6b5',
          900: '#c1f2da',
        },
        seasalt: {
          DEFAULT: '#f7f7f7',
          100: '#313131',
          200: '#636363',
          300: '#949494',
          400: '#c6c6c6',
          500: '#f7f7f7',
          600: '#f9f9f9',
          700: '#fafafa',
          800: '#fcfcfc',
          900: '#fdfdfd',
        },
        'blue-green': {
          DEFAULT: '#0d98ba',
          100: '#031e25',
          200: '#053d4a',
          300: '#085b70',
          400: '#0a7995',
          500: '#0d98ba',
          600: '#16c4ef',
          700: '#50d2f3',
          800: '#8be1f7',
          900: '#c5f0fb',
        },
        // Semantic color mappings
        primary: {
          DEFAULT: '#ffa000', // Orange Peel
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#f7f7f7', // Seasalt
          foreground: '#001b2e', // Oxford Blue
        },
        background: '#f7f7f7', // Seasalt
        foreground: '#001b2e', // Oxford Blue
        success: '#177245', // Dark Spring Green
        warning: '#ffa000', // Orange Peel
        info: '#0d98ba', // Blue Green
        destructive: '#ef4444', // Red for errors
      },
    },
  },
};
```

### Usage Examples

```jsx
// Primary CTA Button
<button className="bg-orange-peel text-black hover:bg-orange-peel-600">
  Book Now
</button>

// Navigation Bar
<nav className="bg-oxford-blue text-seasalt">
  <div className="text-orange-peel">Logo</div>
</nav>

// Success Message
<div className="bg-dark-spring-green-100 text-dark-spring-green-800 border border-dark-spring-green-200">
  Booking confirmed!
</div>

// Info Card
<div className="bg-blue-green-50 text-blue-green-800 border-l-4 border-blue-green">
  Cleaning tips and information
</div>

// Main Background
<div className="bg-seasalt text-oxford-blue">
  <h1 className="text-oxford-blue">Welcome to Kleaners</h1>
  <p className="text-oxford-blue-300">Professional cleaning services</p>
</div>
```

---

## Typography

### Font Family

- Primary: Inter
- Fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Monospace: "Fira Code", "JetBrains Mono", monospace
- Weights: 300, 400, 500, 600, 700 (avoid 800+ except display)
- Features (optional): stylistic sets `ss01`, contextual alternates, and
  case-sensitive forms

### Usage

- Root: load Inter via `next/font` and apply `inter.className` on `<body>`
- Tailwind: ensure `font-sans` maps to Inter via `theme.extend.fontFamily.sans`
- Headings: 600–700 weight; Body: 400–500; Captions: 400
- Line-height: 1.2 for headings, 1.6 for body

```css
/* Example utilities */
.heading-1 {
  @apply font-sans text-4xl font-bold leading-tight;
}
.body-regular {
  @apply font-sans text-base leading-relaxed;
}
```

### Type Scale

```css
/* Headings */
.heading-1 {
  @apply text-4xl font-bold leading-tight;
} /* 36px */
.heading-2 {
  @apply text-3xl font-bold leading-tight;
} /* 30px */
.heading-3 {
  @apply text-2xl font-semibold leading-snug;
} /* 24px */
.heading-4 {
  @apply text-xl font-semibold leading-snug;
} /* 20px */
.heading-5 {
  @apply text-lg font-medium leading-normal;
} /* 18px */
.heading-6 {
  @apply text-base font-medium leading-normal;
} /* 16px */

/* Body Text */
.body-large {
  @apply text-lg leading-relaxed;
} /* 18px */
.body-regular {
  @apply text-base leading-relaxed;
} /* 16px */
.body-small {
  @apply text-sm leading-normal;
} /* 14px */
.body-xs {
  @apply text-xs leading-normal;
} /* 12px */

/* Specialized Text */
.caption {
  @apply text-xs text-muted-foreground;
}
.label {
  @apply text-sm font-medium;
}
.overline {
  @apply text-xs font-semibold uppercase tracking-wider;
}
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

---

## Spacing & Layout

### 8px Grid System

All spacing follows an 8px base unit for visual consistency:

```css
/* Spacing Scale */
.spacing-xs {
  margin: var(--spacing-xs);
} /* 4px */
.spacing-sm {
  margin: var(--spacing-sm);
} /* 8px */
.spacing-md {
  margin: var(--spacing-md);
} /* 16px */
.spacing-lg {
  margin: var(--spacing-lg);
} /* 24px */
.spacing-xl {
  margin: var(--spacing-xl);
} /* 32px */
.spacing-2xl {
  margin: var(--spacing-2xl);
} /* 48px */
.spacing-3xl {
  margin: var(--spacing-3xl);
} /* 64px */
.spacing-4xl {
  margin: var(--spacing-4xl);
} /* 96px */
```

### Layout Containers

```css
/* Page Container */
.page-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Content Container */
.content-container {
  @apply max-w-4xl mx-auto px-4 sm:px-6;
}

/* Card Container */
.card-container {
  @apply max-w-2xl mx-auto;
}

/* Section Spacing */
.section-spacing {
  @apply py-16 md:py-24;
}

/* Component Spacing */
.component-spacing {
  @apply space-y-6;
}
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

---

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

### Button Standards

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-orange-peel text-black hover:bg-orange-peel-600 shadow-lg',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline:
          'border-2 border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt',
        secondary:
          'bg-seasalt text-oxford-blue hover:bg-seasalt-200 border border-oxford-blue-200',
        ghost: 'hover:bg-orange-peel-100 hover:text-orange-peel-800',
        link: 'underline-offset-4 hover:underline text-orange-peel',
        success:
          'bg-dark-spring-green text-white hover:bg-dark-spring-green-600',
        info: 'bg-blue-green text-white hover:bg-blue-green-600',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
```

### Card Standards

```typescript
const cardVariants = cva(
  'rounded-lg border bg-white text-oxford-blue shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-seasalt-300',
        elevated: 'shadow-md hover:shadow-lg border-seasalt-200',
        outlined: 'border-2 border-oxford-blue-200',
        accent: 'border-l-4 border-orange-peel bg-orange-peel-50',
        success: 'border-l-4 border-dark-spring-green bg-dark-spring-green-50',
        info: 'border-l-4 border-blue-green bg-blue-green-50',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
);
```

### Form Standards

```typescript
// Input Field
const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-seasalt-300 bg-white px-3 py-2 text-sm text-oxford-blue ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-oxford-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
);

// Label
const labelVariants = cva(
  'text-sm font-medium text-oxford-blue leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

// Error Message
const errorVariants = cva('text-sm text-red-600 font-medium');

// Success Message
const successVariants = cva('text-sm text-dark-spring-green font-medium');

// Info Message
const infoVariants = cva('text-sm text-blue-green font-medium');
```

---

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

### Easing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Framer Motion Patterns

```typescript
// Page Transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
};

// Component Animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hover Animations
const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};
```

### Animation Guidelines

- **Entrance**: Fade in with slight upward movement
- **Exit**: Fade out with slight downward movement
- **Hover**: Subtle scale (1.02) with smooth transition
- **Loading**: Skeleton screens or progress indicators
- **Success**: Checkmark animation or color change
- **Error**: Shake animation for form validation

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

All interfaces must meet WCAG 2.1 AA standards:

#### Color Contrast

- Normal text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio
- UI components: 3:1 minimum contrast ratio

#### Keyboard Navigation

```typescript
// Focus Management
const focusableElements = [
  'button',
  'input',
  'select',
  'textarea',
  'a[href]',
  'area[href]',
  '[tabindex]:not([tabindex="-1"])',
];

// Focus Trap for Modals
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    focusableElements.join(','),
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  // Implementation details...
};
```

#### Screen Reader Support

```typescript
// ARIA Labels
<button aria-label="Close dialog">×</button>
<div role="alert" aria-live="polite">Error message</div>
<div aria-hidden="true">Decorative icon</div>

// Semantic HTML
<main>
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
  </section>
</main>
```

#### Form Accessibility

```typescript
// Form Field with Error
<div className="form-field">
  <label htmlFor="email" className="label">
    Email Address
    <span className="required" aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    className="input"
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <div id="email-error" className="error" role="alert">
      Please enter a valid email address
    </div>
  )}
</div>
```

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

---

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

### Breakpoint Strategy

```typescript
// TailwindCSS Breakpoints
const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large desktops
};

// Usage in Components
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
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

### Animation Performance

```typescript
// GPU-accelerated animations
const optimizedAnimation = {
  transform: 'translateZ(0)', // Force GPU acceleration
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
};
```

---

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

---

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

### Testing Strategy

1. **Manual Testing**: Cross-browser and device testing
2. **Accessibility Testing**: Screen reader and keyboard navigation
3. **Performance Testing**: Lighthouse audits and bundle analysis
4. **Visual Regression**: Screenshot comparisons for UI changes

---

## Implementation Examples

### Complete Component Example

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const serviceCardVariants = cva(
  "group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white text-oxford-blue",
  {
    variants: {
      variant: {
        default: "border-2 border-seasalt-300 hover:border-orange-peel/50",
        featured: "border-2 border-orange-peel ring-2 ring-orange-peel/20 shadow-lg",
        success: "border-2 border-dark-spring-green ring-2 ring-dark-spring-green/20",
        info: "border-2 border-blue-green ring-2 ring-blue-green/20",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof serviceCardVariants> {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, size, title, description, price, features, isPopular, onSelect, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={cn(serviceCardVariants({ variant, size, className }))}
          ref={ref}
          onClick={onSelect}
          {...props}
        >
          {isPopular && (
            <div className="absolute -top-2 right-4">
              <span className="bg-gradient-to-r from-orange-peel to-orange-peel-600 text-black px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                Most Popular
              </span>
            </div>
          )}

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold mb-2 text-oxford-blue">{title}</CardTitle>
            <p className="text-oxford-blue-400">{description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-peel">{price}</div>
              <div className="text-sm text-oxford-blue-400">per hour</div>
            </div>

            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-oxford-blue">
                  <div className="w-2 h-2 bg-orange-peel rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button className="w-full bg-orange-peel hover:bg-orange-peel-600 text-black" size="lg">
              Select {title}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard, serviceCardVariants };
```

---

## Conclusion

This UI/UX standards document serves as the definitive guide for creating
consistent, accessible, and maintainable user interfaces for the Kleaners
platform. All team members should reference this document when designing or
implementing new features.

### Key Takeaways

1. **Consistency**: Follow established patterns and use the design system
2. **Accessibility**: WCAG 2.1 AA compliance is mandatory
3. **Performance**: Optimize for speed and smooth interactions
4. **Mobile-First**: Design for mobile devices first
5. **Quality**: Thorough testing and code review processes

### Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility Guide](https://reactjs.org/docs/accessibility.html)

---

_This document is a living resource and should be updated as the design system
evolves._
