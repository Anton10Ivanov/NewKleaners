# Shadcn Components Implementation Guide

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Component Mapping](#component-mapping)
4. [Usage Guidelines](#usage-guidelines)
5. [Best Practices](#best-practices)
6. [Migration Guide](#migration-guide)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## Overview

This guide covers the comprehensive implementation of shadcn/ui components
throughout the Kleaners project. The implementation includes 76+ shadcn
components that have been integrated to provide a consistent, accessible, and
maintainable UI system.

### Key Features

- **76+ Components**: Complete shadcn/ui component library
- **Automated Migration**: Scripts for component replacement and import updates
- **Type Safety**: Full TypeScript support with proper type definitions
- **Accessibility**: Built-in accessibility features and ARIA support
- **Customization**: Tailwind CSS-based styling with design system integration
- **Performance**: Optimized components with minimal bundle impact

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Tailwind CSS configured
- TypeScript setup

### Required Packages

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.294.0",
    "react-day-picker": "^9.9.0",
    "sonner": "^1.2.4",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### Configuration Files

#### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@ai-elements": "https://registry.ai-sdk.dev/{name}.json"
  }
}
```

---

## Component Mapping

### Core UI Components

| Component  | shadcn/ui     | Usage Count | Priority |
| ---------- | ------------- | ----------- | -------- |
| Button     | `button`      | 726 files   | High     |
| Input      | `input`       | 242 files   | High     |
| Card       | `card`        | 526 files   | High     |
| Dialog     | `dialog`      | 71 files    | High     |
| Form       | `form`        | 178 files   | High     |
| Label      | `label`       | 245 files   | High     |
| Select     | `select`      | 153 files   | High     |
| Textarea   | `textarea`    | 79 files    | High     |
| Checkbox   | `checkbox`    | 71 files    | High     |
| Switch     | `switch`      | 71 files    | High     |
| RadioGroup | `radio-group` | 36 files    | Medium   |
| Slider     | `slider`      | 15 files    | Medium   |

### Navigation Components

| Component      | shadcn/ui         | Usage Count | Priority |
| -------------- | ----------------- | ----------- | -------- |
| Tabs           | `tabs`            | 61 files    | High     |
| NavigationMenu | `navigation-menu` | 3 files     | Medium   |
| Breadcrumb     | `breadcrumb`      | 3 files     | Low      |
| Menubar        | `menubar`         | 3 files     | Low      |

### Data Display Components

| Component   | shadcn/ui     | Usage Count | Priority |
| ----------- | ------------- | ----------- | -------- |
| Table       | `table`       | 44 files    | High     |
| Badge       | `badge`       | 265 files   | High     |
| Alert       | `alert`       | 98 files    | High     |
| Avatar      | `avatar`      | 46 files    | Medium   |
| Accordion   | `accordion`   | 15 files    | Medium   |
| Collapsible | `collapsible` | 3 files     | Low      |
| Progress    | `progress`    | 22 files    | Medium   |
| Skeleton    | `skeleton`    | 29 files    | Medium   |

### Layout Components

| Component   | shadcn/ui      | Usage Count | Priority |
| ----------- | -------------- | ----------- | -------- |
| Separator   | `separator`    | 108 files   | High     |
| ScrollArea  | `scroll-area`  | 33 files    | Medium   |
| AspectRatio | `aspect-ratio` | 2 files     | Low      |
| Resizable   | `resizable`    | 2 files     | Low      |

### Advanced Components

| Component    | shadcn/ui          | Usage Count | Priority |
| ------------ | ------------------ | ----------- | -------- |
| Calendar     | `calendar`         | 229 files   | High     |
| Command      | `command`          | 5 files     | Medium   |
| DatePicker   | `date-picker-demo` | 3 files     | High     |
| Toast        | `toast`            | 39 files    | High     |
| Sonner       | `sonner`           | 3 files     | High     |
| DropdownMenu | `dropdown-menu`    | 11 files    | Medium   |
| HoverCard    | `hover-card`       | 3 files     | Low      |
| ContextMenu  | `context-menu`     | 3 files     | Low      |
| Toggle       | `toggle`           | 12 files    | Medium   |
| ToggleGroup  | `toggle-group`     | 3 files     | Low      |
| Pagination   | `pagination`       | 10 files    | Medium   |

---

## Usage Guidelines

### Import Pattern

```typescript
// ✅ Correct - Import from shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ❌ Incorrect - Don't import from other locations
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
```

### Component Usage

```typescript
// ✅ Correct - Use shadcn components with proper props
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Form Components

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

---

## Best Practices

### 1. Component Composition

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

### 2. Variant Usage

```typescript
// ✅ Good - Use appropriate variants
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Action</Button>
<Button variant="ghost">Ghost Action</Button>
<Button variant="destructive">Delete</Button>

// Badge variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### 3. Responsive Design

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

### 4. Accessibility

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

---

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

### Import Updates

```typescript
// Before
import { CustomButton } from '@/components/CustomButton';
import { CustomCard } from '@/components/CustomCard';
import { CustomInput } from '@/components/CustomInput';

// After
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

---

## Troubleshooting

### Common Issues

#### 1. Import Errors

```typescript
// ❌ Error: Module not found
import { Button } from '@/components/ui/button';

// ✅ Solution: Check if component exists
// Run: npm run shadcn:audit
// Install missing components: npm run shadcn:implement
```

#### 2. TypeScript Errors

```typescript
// ❌ Error: Property 'variant' does not exist
<Button variant="custom-variant">

// ✅ Solution: Use valid variants
<Button variant="default">
<Button variant="secondary">
<Button variant="outline">
<Button variant="ghost">
<Button variant="destructive">
```

#### 3. Styling Issues

```typescript
// ❌ Error: Styles not applying
<Button className="bg-red-500">

// ✅ Solution: Use variant prop or extend with CSS variables
<Button variant="destructive">
// or
<Button className="bg-red-500 hover:bg-red-600">
```

### Debugging Steps

1. **Check Component Installation**

   ```bash
   npm run shadcn:audit
   ```

2. **Verify Imports**

   ```bash
   npm run type-check
   ```

3. **Check Tailwind Configuration**

   ```bash
   npm run build
   ```

4. **Validate Component Usage**
   ```bash
   npm run lint
   ```

---

## Performance Optimization

### Bundle Size Optimization

```typescript
// ✅ Good - Import only what you need
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ❌ Avoid - Importing entire component library
import * as UI from '@/components/ui';
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

---

## Scripts Reference

### Available Scripts

```bash
# Audit current shadcn components
npm run shadcn:audit

# Implement/update shadcn components
npm run shadcn:implement

# Add specific component
bunx shadcn@latest add @shadcn/button

# Add multiple components
bunx shadcn@latest add @shadcn/button @shadcn/card @shadcn/input

# Update existing component
bunx shadcn@latest add @shadcn/button --overwrite
```

### Custom Scripts

```bash
# Full shadcn implementation
npm run shadcn:implement

# Audit and report
npm run shadcn:audit

# Combined validation
npm run standards:validate
```

---

## Conclusion

The shadcn/ui implementation provides a robust, accessible, and maintainable
component system for the Kleaners project. With 76+ components installed and
3,159+ files updated, the project now has a consistent design system that
improves developer experience and user interface quality.

### Key Benefits

- **Consistency**: Unified design system across all components
- **Accessibility**: Built-in ARIA support and keyboard navigation
- **Performance**: Optimized bundle size and rendering
- **Maintainability**: Centralized component management
- **Developer Experience**: TypeScript support and IntelliSense
- **Customization**: Easy theming and variant management

### Next Steps

1. Review updated component imports
2. Test component functionality
3. Update component props if needed
4. Run build to ensure everything works
5. Consider removing unused custom components
6. Optimize heavily used components for performance

---

_This guide serves as the definitive reference for shadcn/ui component
implementation in the Kleaners project._
