# Container System

## Overview

The Kleaners platform uses a unified container system built around the `UnifiedContainer` component. This system provides consistent layout patterns, responsive design, and standardized spacing across the entire application.

## UnifiedContainer (Primary)

**Location**: `components/layout/UnifiedContainer.tsx`
**Status**: ✅ Active - Use for all new components

### Features

- Standardized responsive widths
- Enhanced padding system
- Breakout and centering options
- Mobile-first design
- Consistent spacing patterns

### Size Classes

```typescript
sm: "max-w-2xl"      // 672px - Forms, narrow content
md: "max-w-4xl"      // 896px - Articles, medium content
lg: "max-w-6xl"      // 1152px - Wide content, dashboards
xl: "max-w-7xl"      // 1280px - Main content areas (default)
"2xl": "max-w-[1400px]" // 1400px - Ultra-wide content
"ultra-wide": "max-w-[1600px]" // 1600px - Maximum width
full: "max-w-none"   // No constraint
```

### Padding System

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

## Implementation Guidelines

### For New Components

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

### Component Props

```typescript
interface UnifiedContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'ultra-wide' | 'full';
  padding?: boolean | 'sm' | 'md' | 'lg' | 'xl';
  breakout?: boolean;
  center?: boolean;
  className?: string;
}
```

## Layout Patterns

### Page Layout

```tsx
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <UnifiedContainer size="xl" padding="md">
          {children}
        </UnifiedContainer>
      </main>
      <Footer />
    </div>
  );
}
```

### Section Layout

```tsx
export function Section({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <UnifiedContainer size="xl" padding="md">
        {children}
      </UnifiedContainer>
    </section>
  );
}
```

### Hero Section

```tsx
export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-20 md:py-32">
      <UnifiedContainer size="2xl" padding="lg" breakout>
        {children}
      </UnifiedContainer>
    </section>
  );
}
```

### Form Container

```tsx
export function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedContainer size="sm" padding="md">
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </UnifiedContainer>
  );
}
```

## Responsive Design

### Mobile-First Approach

The container system follows a mobile-first approach with responsive breakpoints:

```css
/* Mobile (0px+) */
.container {
  padding: 1rem; /* 16px */
  max-width: 100%;
}

/* Small tablets (640px+) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem; /* 24px */
  }
}

/* Tablets (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem; /* 32px */
  }
}

/* Laptops (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: 2.5rem; /* 40px */
  }
}

/* Desktops (1280px+) */
@media (min-width: 1280px) {
  .container {
    padding: 3rem; /* 48px */
  }
}

/* Large desktops (1536px+) */
@media (min-width: 1536px) {
  .container {
    padding: 4rem; /* 64px */
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

// Usage in components
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## Spacing System

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

### CSS Variables

```css
:root {
  /* Spacing Scale */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
  --spacing-3xl: 4rem; /* 64px */
  --spacing-4xl: 6rem; /* 96px */
}
```

## Layout Components

### Grid Layouts

```tsx
export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <UnifiedContainer size="xl" padding="md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </UnifiedContainer>
  );
}
```

### Card Layouts

```tsx
export function CardGrid({ cards }: { cards: CardData[] }) {
  return (
    <UnifiedContainer size="lg" padding="md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => (
          <Card key={card.id} className="p-6">
            <CardContent>
              {card.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </UnifiedContainer>
  );
}
```

### List Layouts

```tsx
export function BookingList({ bookings }: { bookings: Booking[] }) {
  return (
    <UnifiedContainer size="lg" padding="md">
      <div className="space-y-4">
        {bookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </UnifiedContainer>
  );
}
```

## Special Layouts

### Full-Width Sections

```tsx
export function FullWidthSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <UnifiedContainer size="full" padding={false}>
        {children}
      </UnifiedContainer>
    </section>
  );
}
```

### Centered Content

```tsx
export function CenteredContent({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedContainer size="md" padding="lg" center>
      <div className="text-center">
        {children}
      </div>
    </UnifiedContainer>
  );
}
```

### Sidebar Layout

```tsx
export function SidebarLayout({
  sidebar,
  content
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <UnifiedContainer size="xl" padding="md">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {sidebar}
        </aside>
        <main className="lg:col-span-3">
          {content}
        </main>
      </div>
    </UnifiedContainer>
  );
}
```

## Accessibility

### Focus Management

```tsx
export function AccessibleContainer({
  children,
  id
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <UnifiedContainer size="xl" padding="md">
      <div
        id={id}
        role="main"
        aria-label="Main content"
        tabIndex={-1}
      >
        {children}
      </div>
    </UnifiedContainer>
  );
}
```

### Screen Reader Support

```tsx
export function ScreenReaderContainer({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <UnifiedContainer size="lg" padding="md">
      <section aria-labelledby="section-heading">
        <h2 id="section-heading" className="sr-only">
          {label}
        </h2>
        {children}
      </section>
    </UnifiedContainer>
  );
}
```

## Performance Optimization

### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function OptimizedLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedContainer size="xl" padding="md">
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
      {children}
    </UnifiedContainer>
  );
}
```

### Memoization

```tsx
import { memo } from 'react';

export const MemoizedContainer = memo(({
  children,
  size,
  padding
}: {
  children: React.ReactNode;
  size?: string;
  padding?: string | boolean;
}) => {
  return (
    <UnifiedContainer size={size} padding={padding}>
      {children}
    </UnifiedContainer>
  );
});
```

## Testing

### Container Testing

```tsx
// __tests__/UnifiedContainer.test.tsx
import { render, screen } from '@testing-library/react';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';

describe('UnifiedContainer', () => {
  it('should render with default props', () => {
    render(
      <UnifiedContainer>
        <div>Test content</div>
      </UnifiedContainer>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply custom size class', () => {
    render(
      <UnifiedContainer size="sm">
        <div>Test content</div>
      </UnifiedContainer>
    );

    const container = screen.getByText('Test content').parentElement;
    expect(container).toHaveClass('max-w-2xl');
  });

  it('should apply custom padding', () => {
    render(
      <UnifiedContainer padding="lg">
        <div>Test content</div>
      </UnifiedContainer>
    );

    const container = screen.getByText('Test content').parentElement;
    expect(container).toHaveClass('px-8');
  });
});
```

## Migration Guide

### From Custom Containers

#### Before (Custom Container)

```tsx
// Old custom container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {content}
</div>
```

#### After (UnifiedContainer)

```tsx
// New unified container
<UnifiedContainer size="xl" padding="md">
  {content}
</UnifiedContainer>
```

### Gradual Migration

1. **Identify**: Find all custom container patterns
2. **Replace**: Replace with UnifiedContainer
3. **Test**: Verify responsive behavior
4. **Optimize**: Adjust size and padding as needed

## Best Practices

### 1. Size Selection
- Use `sm` for forms and narrow content
- Use `md` for articles and medium content
- Use `lg` for wide content and dashboards
- Use `xl` for main content areas (default)
- Use `2xl` for ultra-wide content
- Use `full` for full-width sections

### 2. Padding Selection
- Use `false` for full-width sections
- Use `sm` for compact layouts
- Use `md` for standard layouts (default)
- Use `lg` for spacious layouts
- Use `xl` for hero sections

### 3. Responsive Design
- Always test on mobile devices first
- Use responsive grid classes
- Consider touch targets for mobile
- Test with different screen sizes

### 4. Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### 5. Performance
- Use lazy loading for heavy components
- Memoize expensive computations
- Optimize images and assets
- Monitor bundle size

---

_This container system provides a consistent, accessible, and maintainable foundation for all layouts in the Kleaners platform._
