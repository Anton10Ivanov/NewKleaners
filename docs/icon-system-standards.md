# Icon System Standards

## Overview

This document defines the standardized icon system for the NewKleaners project
to ensure consistency, maintainability, and optimal performance.

## Primary Icon Library: Lucide React

**Library**: `lucide-react` (v0.294.0) **Why**: High-quality, consistent SVG
icons with excellent tree-shaking support

### Installation

```bash
npm install lucide-react
```

## Icon Categories & Standards

### 🏠 Service Icons

| Icon        | Usage                | Import                                     |
| ----------- | -------------------- | ------------------------------------------ |
| `Home`      | Residential cleaning | `import { Home } from 'lucide-react'`      |
| `Building2` | Commercial cleaning  | `import { Building2 } from 'lucide-react'` |
| `Sparkles`  | Deep cleaning        | `import { Sparkles } from 'lucide-react'`  |
| `Truck`     | Move-in/out cleaning | `import { Truck } from 'lucide-react'`     |
| `Hammer`    | Handyman services    | `import { Hammer } from 'lucide-react'`    |
| `Shield`    | Security/trust       | `import { Shield } from 'lucide-react'`    |

### ⚡ Action Icons

| Icon          | Usage                 | Import                                       |
| ------------- | --------------------- | -------------------------------------------- |
| `ArrowRight`  | Next/Continue actions | `import { ArrowRight } from 'lucide-react'`  |
| `CheckCircle` | Success/completion    | `import { CheckCircle } from 'lucide-react'` |
| `Clock`       | Time/scheduling       | `import { Clock } from 'lucide-react'`       |
| `Calendar`    | Date selection        | `import { Calendar } from 'lucide-react'`    |
| `Star`        | Rating/quality        | `import { Star } from 'lucide-react'`        |
| `Users`       | People/team           | `import { Users } from 'lucide-react'`       |

### 🔧 UI Icons

| Icon          | Usage                | Import                                       |
| ------------- | -------------------- | -------------------------------------------- |
| `X`           | Close/cancel         | `import { X } from 'lucide-react'`           |
| `ChevronDown` | Dropdowns            | `import { ChevronDown } from 'lucide-react'` |
| `Search`      | Search functionality | `import { Search } from 'lucide-react'`      |
| `MapPin`      | Location             | `import { MapPin } from 'lucide-react'`      |
| `Phone`       | Contact              | `import { Phone } from 'lucide-react'`       |
| `Mail`        | Email                | `import { Mail } from 'lucide-react'`        |

### 💳 Payment Icons

| Icon         | Usage              | Import                                      |
| ------------ | ------------------ | ------------------------------------------- |
| `CreditCard` | Credit/Debit cards | `import { CreditCard } from 'lucide-react'` |
| `Smartphone` | Mobile payments    | `import { Smartphone } from 'lucide-react'` |

### 🧹 Cleaning Icons

| Icon     | Usage              | Import                                  |
| -------- | ------------------ | --------------------------------------- |
| `Window` | Window cleaning    | `import { Window } from 'lucide-react'` |
| `Wrench` | Appliance cleaning | `import { Wrench } from 'lucide-react'` |
| `Wind`   | AC/vent cleaning   | `import { Wind } from 'lucide-react'`   |
| `Flame`  | Fireplace cleaning | `import { Flame } from 'lucide-react'`  |
| `Car`    | Garage cleaning    | `import { Car } from 'lucide-react'`    |

## Implementation Standards

### ✅ Correct Usage

```typescript
// Import specific icons
import { Home, Building2, CheckCircle } from 'lucide-react';

// Use in components
const IconComponent = Home;
<IconComponent className="w-4 h-4 text-gray-500" />

// Or directly
<Home className="w-4 h-4 text-gray-500" />
```

### ❌ Avoid These Patterns

```typescript
// Don't use emoji icons
icon: '🏠';

// Don't use string-based icons
icon: 'home';

// Don't import entire library
import * as LucideIcons from 'lucide-react';
```

## Sizing Standards

### Icon Sizes

- **Small**: `w-3 h-3` (12px) - Inline text icons
- **Default**: `w-4 h-4` (16px) - Standard UI icons
- **Medium**: `w-5 h-5` (20px) - Button icons
- **Large**: `w-6 h-6` (24px) - Card headers
- **XLarge**: `w-8 h-8` (32px) - Feature highlights

### Responsive Sizing

```typescript
// Responsive icon sizing
<Home className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
```

## Color Standards

### Default Colors

- **Primary**: `text-primary` - Brand orange
- **Secondary**: `text-muted-foreground` - Gray text
- **Success**: `text-green-500` - Success states
- **Warning**: `text-yellow-500` - Warning states
- **Error**: `text-red-500` - Error states

### Usage Examples

```typescript
// Success icon
<CheckCircle className="w-4 h-4 text-green-500" />

// Muted icon
<Clock className="w-4 h-4 text-muted-foreground" />

// Brand icon
<Star className="w-4 h-4 text-primary" />
```

## Animation Standards

### Hover Effects

```typescript
// Scale on hover
<Home className="w-4 h-4 transition-transform hover:scale-110" />

// Color change on hover
<Star className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
```

### Loading States

```typescript
// Spinning loader
<Loader2 className="w-4 h-4 animate-spin" />
```

## Accessibility

### ARIA Labels

```typescript
// Always provide accessible labels
<Home
  className="w-4 h-4"
  aria-label="Home cleaning service"
  role="img"
/>
```

### Screen Reader Support

- Use `aria-label` for decorative icons
- Use `aria-hidden="true"` for purely decorative icons
- Ensure sufficient color contrast (4.5:1 minimum)

## Performance Best Practices

### Tree Shaking

```typescript
// ✅ Good - Only imports used icons
import { Home, Building2 } from 'lucide-react';

// ❌ Bad - Imports entire library
import * as Icons from 'lucide-react';
```

### Lazy Loading

```typescript
// For large icon sets, consider lazy loading
const DynamicIcon = lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.Home })),
);
```

## Migration Guide

### From Emoji Icons

```typescript
// Before
icon: '🏠';

// After
import { Home } from 'lucide-react';
icon: Home;
```

### From String Icons

```typescript
// Before
icon: 'home';

// After
import { Home } from 'lucide-react';
icon: Home;
```

## File Organization

### Icon Imports

```typescript
// Group related icons
import { Home, Building2, Sparkles } from 'lucide-react';

// Group by category
import {
  // UI Icons
  X,
  ChevronDown,
  Search,
  // Action Icons
  ArrowRight,
  CheckCircle,
  Clock,
} from 'lucide-react';
```

## Quality Checklist

- [ ] All icons use Lucide React
- [ ] No emoji or string-based icons
- [ ] Proper sizing classes applied
- [ ] Appropriate colors for context
- [ ] Accessibility labels provided
- [ ] Consistent import organization
- [ ] Tree-shaking optimized imports

## Resources

- [Lucide React Documentation](https://lucide.dev/)
- [Icon Search](https://lucide.dev/icons)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
