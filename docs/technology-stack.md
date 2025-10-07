# Technology Stack

## Frontend Framework

Next.js 15

- **Version**: 15.5.3
- **Features**: App Router, Server Components, Static Generation
- **Benefits**: Full-stack React framework, SEO optimization, performance

### React 18

- **Version**: 18.x
- **Features**: Concurrent features, Suspense, Server Components
- **Benefits**: Modern React patterns, better performance

### TypeScript

- **Version**: 5.3.3
- **Configuration**: Strict mode enabled
- **Benefits**: Type safety, better developer experience, fewer runtime errors

## Styling & UI

### Fonts

- Primary: Inter (Google Fonts) via `next/font`
- Loading: `import { Inter } from 'next/font/google'` with `subsets: ['latin']`
- Usage: Apply `inter.className` on `<body>` in `app/layout.tsx`
- Tailwind mapping:
  `theme.extend.fontFamily.sans = ['Inter','system-ui','sans-serif']`
- Weights used: 300, 400, 500, 600, 700; styles: normal
- Features: `font-feature-settings: 'cv02','cv03','cv04','cv11','ss01'`
  (optional)
- Fallbacks:
  `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Accessibility: prefer 1.5 line-height for body, use `clamp()` for fluid sizes

### Tailwind CSS

- **Version**: 3.3.6
- **Configuration**: Custom design system integration
- **Benefits**: Utility-first CSS, consistent spacing, responsive design

### shadcn/ui

- **Components**: 76+ installed components
- **Base**: Radix UI primitives
- **Benefits**: Accessible, customizable, TypeScript support

### Class Variance Authority (CVA)

- **Purpose**: Component variant management
- **Benefits**: Type-safe component variants, consistent API

### Framer Motion

- **Version**: 10.16.16
- **Purpose**: Animations and transitions
- **Benefits**: Smooth 60fps animations, gesture support

## State Management

### Zustand

- **Version**: 4.4.7
- **Purpose**: Global application state
- **Benefits**: Simple API, TypeScript support, minimal boilerplate

### TanStack React Query

- **Version**: 5.14.2
- **Purpose**: Server state management
- **Benefits**: Caching, synchronization, background updates

### React Hook Form

- **Version**: 7.48.2
- **Purpose**: Form state management
- **Benefits**: Performance, validation, minimal re-renders

### Zod

- **Version**: 3.22.4
- **Purpose**: Schema validation
- **Benefits**: Type-safe validation, runtime type checking

## Backend & Database

### Supabase

- **PostgreSQL**: 2.38.4
- **Auth**: Built-in authentication system
- **Real-time**: WebSocket subscriptions
- **Storage**: File and image storage
- **Benefits**: Backend-as-a-Service, PostgreSQL, real-time features

### Database Features

- **Row Level Security (RLS)**: Data access control
- **Real-time subscriptions**: Live data updates
- **Edge Functions**: Serverless functions
- **Migrations**: Version-controlled schema changes

## Payment Processing

### Stripe

- **Version**: 13.11.0
- **Features**: Payment processing, webhooks, subscriptions
- **Payment Methods**: Credit cards, SEPA, PayPal
- **Benefits**: PCI compliance, fraud protection, global support

## External Services

### Google Maps API

- **Purpose**: Location services and validation
- **Features**: Geocoding, distance calculation, address validation
- **Status**: Planned integration

### Email Services

- **Provider**: Supabase Auth
- **Features**: Email verification, password reset, notifications
- **Benefits**: Integrated with authentication system

## Development Tools

### Build Tools

- **Next.js**: Built-in bundling and optimization
- **TypeScript**: Compilation and type checking
- **Tailwind CSS**: CSS processing and purging

### Code Quality

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Lint-staged**: Pre-commit linting

### Testing (Planned)

- **Vitest**: Unit and integration testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking
- **Testing Library**: React component testing

## Performance & Monitoring

### Bundle Analysis

- **Webpack Bundle Analyzer**: Bundle size analysis
- **Next.js Analytics**: Built-in performance monitoring

### Code Splitting

- **Next.js**: Automatic route-based code splitting
- **React.lazy**: Component-level lazy loading
- **Dynamic imports**: Conditional loading

### Image Optimization

- **Next.js Image**: Automatic image optimization
- **WebP/AVIF**: Modern image formats
- **Responsive images**: Multiple sizes for different devices

## Security

### Authentication

- **Supabase Auth**: JWT-based authentication
- **Role-based Access Control**: User permissions
- **Multi-factor Authentication**: Enhanced security

### Data Protection

- **HTTPS**: Encrypted data transmission
- **Environment Variables**: Secure configuration
- **CORS**: Cross-origin request security

### Payment Security

- **PCI DSS Compliance**: Stripe handles card data
- **Tokenization**: Secure payment processing
- **Webhook Verification**: Secure event handling

## Deployment & Infrastructure

### Hosting

- **Vercel**: Recommended hosting platform
- **Edge Functions**: Global edge computing
- **CDN**: Global content delivery

### Database

- **Supabase Cloud**: Managed PostgreSQL
- **Backups**: Automated database backups
- **Scaling**: Automatic scaling

### Environment Management

- **Development**: Local development environment
- **Staging**: Pre-production testing
- **Production**: Live application environment

## Browser Support

### Modern Browsers

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Mobile Browsers

- **iOS Safari**: 14+
- **Chrome Mobile**: 90+
- **Samsung Internet**: 14+

## Performance Targets

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Load Times

- **Initial Page Load**: < 3 seconds
- **Service Search**: < 1 second
- **Booking Confirmation**: < 2 seconds

## Scalability

### User Capacity

- **Concurrent Users**: 10,000+
- **Daily Bookings**: 1,000+
- **Database Connections**: Auto-scaling

### Performance Optimization

- **Code Splitting**: Route and component level
- **Image Optimization**: Next.js Image component
- **Caching**: React Query and browser caching
- **CDN**: Global content delivery

## Development Environment

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Git**: Version control

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Future Considerations

### Planned Upgrades

- **Next.js 16**: When stable
- **React 19**: Concurrent features
- **TypeScript 5.4+**: Latest features

### Potential Additions

- **Redis**: Caching layer
- **Elasticsearch**: Advanced search
- **Docker**: Containerization
- **Kubernetes**: Container orchestration

---

_This technology stack provides a modern, scalable, and maintainable foundation
for the Kleaners platform._
