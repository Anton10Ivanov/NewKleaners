# Component Architecture

## Overview

The Kleaners platform uses a comprehensive component architecture built on shadcn/ui components with custom extensions and patterns. This architecture ensures consistency, accessibility, and maintainability across the entire application.

## Component Foundation

### shadcn/ui Base
- **76+ Components**: Complete shadcn/ui component library
- **Radix UI Primitives**: Accessible component primitives
- **TypeScript Support**: Full type safety and IntelliSense
- **Tailwind CSS**: Utility-first styling approach

### Component Structure

All components follow this standardized structure:

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

## Component Organization

### Directory Structure

```
components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── form.tsx
│   └── ...
├── forms/                 # Form components
│   ├── BookingForm.tsx
│   ├── ContactForm.tsx
│   └── AuthForm.tsx
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── UnifiedContainer.tsx
├── features/              # Feature-specific components
│   ├── booking/
│   │   ├── BookingCard.tsx
│   │   ├── BookingForm.tsx
│   │   └── BookingList.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthProvider.tsx
│   └── dashboard/
│       ├── DashboardCard.tsx
│       ├── StatsWidget.tsx
│       └── ActivityFeed.tsx
└── providers/             # Context providers
    ├── AuthProvider.tsx
    ├── ThemeProvider.tsx
    └── QueryProvider.tsx
```

## Core UI Components

### Button Component

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-orange-peel text-black hover:bg-orange-peel-600 shadow-lg',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border-2 border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt',
        secondary: 'bg-seasalt text-oxford-blue hover:bg-seasalt-200 border border-oxford-blue-200',
        ghost: 'hover:bg-orange-peel-100 hover:text-orange-peel-800',
        link: 'underline-offset-4 hover:underline text-orange-peel',
        success: 'bg-dark-spring-green text-white hover:bg-dark-spring-green-600',
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
  }
);
```

### Card Component

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
  }
);
```

### Form Components

```typescript
// Input Field
const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-seasalt-300 bg-white px-3 py-2 text-sm text-oxford-blue ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-oxford-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
);

// Label
const labelVariants = cva(
  'text-sm font-medium text-oxford-blue leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

// Error Message
const errorVariants = cva('text-sm text-red-600 font-medium');

// Success Message
const successVariants = cva('text-sm text-dark-spring-green font-medium');
```

## Component Usage Patterns

### Composition Pattern

```typescript
// ✅ Good - Compose components properly
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ServiceCard({ service }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {service.name}
          <Badge variant="secondary">{service.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{service.description}</p>
        <Button className="w-full mt-4">
          Book Now
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Form Integration

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
```

## Component Variants

### Button Variants

```typescript
// Primary Actions
<Button variant="default">Primary Action</Button>
<Button variant="success">Success Action</Button>
<Button variant="info">Info Action</Button>

// Secondary Actions
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Action</Button>
<Button variant="ghost">Ghost Action</Button>

// Destructive Actions
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### Card Variants

```typescript
// Standard Cards
<Card variant="default">Default Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="outlined">Outlined Card</Card>

// Accent Cards
<Card variant="accent">Accent Card</Card>
<Card variant="success">Success Card</Card>
<Card variant="info">Info Card</Card>

// Padding Variants
<Card padding="none">No Padding</Card>
<Card padding="sm">Small Padding</Card>
<Card padding="md">Medium Padding</Card>
<Card padding="lg">Large Padding</Card>
```

## Responsive Design

### Mobile-First Approach

```typescript
// ✅ Good - Use responsive classes
<Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
  <CardContent className="p-4 md:p-6">
    <Button className="w-full sm:w-auto">
      Responsive Button
    </Button>
  </CardContent>
</Card>
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

## Accessibility

### ARIA Support

```typescript
// ✅ Good - Include accessibility attributes
<Button
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  variant="ghost"
  size="sm"
>
  <X className="h-4 w-4" />
</Button>

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription id="dialog-description">
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

### Keyboard Navigation

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
    focusableElements.join(',')
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  // Implementation details...
};
```

## Performance Optimization

### Component Memoization

```typescript
// ✅ Good - Memoize expensive components
import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export const ExpensiveCard = memo(({ data }) => {
  return (
    <Card>
      <CardContent>
        {/* Expensive rendering logic */}
      </CardContent>
    </Card>
  )
})
```

### Lazy Loading

```typescript
// ✅ Good - Lazy load heavy components
import { lazy, Suspense } from 'react'

const DataTable = lazy(() => import('@/components/ui/data-table'))
const Chart = lazy(() => import('@/components/ui/chart'))

export function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable />
      <Chart />
    </Suspense>
  )
}
```

### Bundle Size Optimization

```typescript
// ✅ Good - Import only what you need
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ❌ Avoid - Importing entire component library
import * as UI from '@/components/ui';
```

## Component Testing

### Testing Strategy

1. **Unit Tests**: Individual component functionality
2. **Integration Tests**: Component interactions
3. **Visual Regression**: UI consistency
4. **Accessibility Tests**: Screen reader compatibility

### Testing Checklist

- [ ] Component renders without errors
- [ ] Props are properly typed and validated
- [ ] Variants work correctly
- [ ] Responsive design functions properly
- [ ] Accessibility requirements met
- [ ] Performance benchmarks achieved

## Component Documentation

### Documentation Standards

Each component should include:

1. **Purpose**: What the component does
2. **Props**: All available props with types
3. **Variants**: Available variants and their usage
4. **Examples**: Code examples for common use cases
5. **Accessibility**: Accessibility considerations
6. **Performance**: Performance notes and optimizations

### Example Documentation

```typescript
/**
 * ServiceCard - Displays service information in a card format
 *
 * @param service - Service object with name, description, price, etc.
 * @param variant - Card variant (default, elevated, outlined, accent, success, info)
 * @param size - Card size (sm, md, lg)
 * @param onSelect - Callback when card is selected
 *
 * @example
 * <ServiceCard
 *   service={serviceData}
 *   variant="elevated"
 *   onSelect={() => handleSelect(serviceData.id)}
 * />
 */
export function ServiceCard({ service, variant, size, onSelect }) {
  // Component implementation
}
```

## Migration Guide

### From Custom Components to shadcn/ui

#### Before (Custom Component)

```typescript
// components/CustomButton.tsx
interface CustomButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function CustomButton({ children, onClick, variant = 'primary', size = 'md' }: CustomButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  }
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

#### After (shadcn/ui Component)

```typescript
// Use shadcn/ui Button component
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <Button variant="default" size="lg" onClick={handleClick}>
      Click me
    </Button>
  )
}
```

## Best Practices

### 1. Component Composition
- Prefer composition over inheritance
- Use shadcn/ui as foundation
- Extend with CVA when needed

### 2. Props Design
- Use clear, descriptive prop names
- Provide sensible defaults
- Use TypeScript for type safety

### 3. Styling
- Use CSS variables for theming
- Follow design system tokens
- Avoid hardcoded values

### 4. Performance
- Memoize expensive components
- Use lazy loading for heavy components
- Optimize bundle size

### 5. Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

---

_This component architecture provides a solid foundation for building consistent, accessible, and maintainable user interfaces in the Kleaners platform._
