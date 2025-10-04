# Performance Guidelines

## Overview

This document outlines performance optimization strategies and guidelines for the Kleaners platform. Following these guidelines ensures fast, responsive, and efficient user experiences across all devices and network conditions.

## Performance Targets

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Load Times

- **Initial Page Load**: < 3 seconds
- **Service Search Results**: < 1 second
- **Booking Confirmation**: < 2 seconds
- **Image Loading**: < 2 seconds

### Scalability Targets

- **Concurrent Users**: 10,000+
- **Daily Bookings**: 1,000+
- **Database Connections**: Auto-scaling
- **Uptime**: 99.9%

## Image Optimization

### Next.js Image Component

```typescript
import Image from 'next/image';

// Optimized image loading
<Image
  src="/hero-image.jpg"
  alt="Professional cleaning service"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Responsive images
<Image
  src="/service-image.jpg"
  alt="Cleaning service"
  width={400}
  height={300}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  className="w-full h-auto"
/>
```

### Image Formats

```typescript
// Use modern formats
const imageFormats = {
  webp: 'image/webp',
  avif: 'image/avif',
  jpeg: 'image/jpeg'
};

// Fallback strategy
<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  onError={(e) => {
    e.currentTarget.src = '/image.jpg';
  }}
/>
```

### Lazy Loading

```typescript
// Lazy load images below the fold
<Image
  src="/below-fold-image.jpg"
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Code Splitting

### Route-Based Splitting

```typescript
// Automatic route-based code splitting
// pages/booking/index.tsx - automatically split
// pages/services/index.tsx - automatically split
// pages/dashboard/index.tsx - automatically split
```

### Component-Level Splitting

```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const Chart = lazy(() => import('./Chart'));
const DataTable = lazy(() => import('./DataTable'));

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <Chart />
      </Suspense>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

### Dynamic Imports

```typescript
// Conditional loading
const loadAdminPanel = () => import('./AdminPanel');

export function AdminButton() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [AdminPanel, setAdminPanel] = useState(null);

  const handleClick = async () => {
    if (!AdminPanel) {
      const module = await loadAdminPanel();
      setAdminPanel(() => module.default);
    }
    setShowAdmin(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Open Admin</button>
      {showAdmin && AdminPanel && <AdminPanel />}
    </div>
  );
}
```

## Bundle Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for duplicate dependencies
npm run deps:check
```

### Tree Shaking

```typescript
// ✅ Good - Import only what you need
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ❌ Avoid - Importing entire libraries
import * as UI from '@/components/ui';
import * as lodash from 'lodash';

// ✅ Good - Specific imports
import { debounce } from 'lodash/debounce';
import { format } from 'date-fns/format';
```

### Dependency Optimization

```typescript
// Use lighter alternatives
// Instead of moment.js (67kb)
import { format, parseISO } from 'date-fns'; // 13kb

// Instead of lodash (71kb)
import { debounce } from 'lodash/debounce'; // 2kb
// or use native alternatives
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
```

## React Performance

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
export const ExpensiveCard = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }));
  }, [data]);

  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Memoize expensive calculations
export function ServiceList({ services, filters }) {
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      if (filters.category && service.category !== filters.category) {
        return false;
      }
      if (filters.priceMin && service.price < filters.priceMin) {
        return false;
      }
      return true;
    });
  }, [services, filters]);

  return (
    <div>
      {filteredServices.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

### Virtual Scrolling

```typescript
import { FixedSizeList as List } from 'react-window';

export function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ServiceCard service={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

### Optimized Re-renders

```typescript
// Use proper dependency arrays
useEffect(() => {
  fetchData(userId);
}, [userId]); // Only re-run when userId changes

// Memoize callbacks
const handleSubmit = useCallback((data) => {
  onSubmit(data);
}, [onSubmit]);

// Use refs for values that don't need to trigger re-renders
const timeoutRef = useRef(null);

useEffect(() => {
  timeoutRef.current = setTimeout(() => {
    // Do something
  }, 1000);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);
```

## Caching Strategies

### React Query Caching

```typescript
import { useQuery } from '@tanstack/react-query';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Background refetching
export function useLiveBookings() {
  return useQuery({
    queryKey: ['bookings', 'live'],
    queryFn: fetchBookings,
    refetchInterval: 30000, // 30 seconds
    refetchIntervalInBackground: true,
  });
}
```

### Browser Caching

```typescript
// Service Worker for caching
// public/sw.js
const CACHE_NAME = 'kleaners-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

### CDN Configuration

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

## Database Performance

### Query Optimization

```sql
-- Use indexes for frequently queried columns
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_services_category ON services(category);

-- Use compound indexes for complex queries
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);

-- Use partial indexes for filtered queries
CREATE INDEX idx_active_services ON services(id) WHERE is_active = true;
```

### Connection Pooling

```typescript
// Supabase connection configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: { 'x-my-custom-header': 'my-app-name' },
    },
  }
);
```

### Real-time Optimization

```typescript
// Selective subscriptions
useEffect(() => {
  const channel = supabase
    .channel('bookings')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        // Handle update
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [userId]);
```

## Network Optimization

### Request Batching

```typescript
// Batch multiple requests
export async function batchRequests(requests: Request[]) {
  const responses = await Promise.all(requests);
  return responses;
}

// Use React Query for automatic batching
export function useMultipleServices(serviceIds: string[]) {
  return useQueries({
    queries: serviceIds.map(id => ({
      queryKey: ['service', id],
      queryFn: () => fetchService(id),
    })),
  });
}
```

### Request Deduplication

```typescript
// React Query automatically deduplicates identical requests
export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => fetchService(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Compression

```typescript
// Enable gzip compression
// next.config.js
module.exports = {
  compress: true,
  // ... other config
};
```

## Monitoring and Analytics

### Performance Monitoring

```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking

```typescript
// Error boundary with performance tracking
export class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Log error with performance context
    console.error('Error caught:', error, errorInfo);

    // Send to error tracking service
    if (typeof window !== 'undefined') {
      // Send error report
    }
  }
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for performance issues
npm run lighthouse

# Monitor bundle size over time
npm run bundle-size
```

## Testing Performance

### Performance Testing

```typescript
// Performance test example
describe('Performance Tests', () => {
  it('should load page within 3 seconds', async () => {
    const start = performance.now();
    await page.goto('/');
    const end = performance.now();

    expect(end - start).toBeLessThan(3000);
  });

  it('should have good Core Web Vitals', async () => {
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          resolve(list.getEntries());
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });

    expect(metrics[0].startTime).toBeLessThan(2500);
  });
});
```

### Load Testing

```bash
# Load testing with Artillery
artillery quick --count 100 --num 10 http://localhost:3000

# Load testing with k6
k6 run load-test.js
```

## Best Practices

### 1. Image Optimization
- Use Next.js Image component
- Implement lazy loading
- Use modern formats (WebP, AVIF)
- Provide appropriate sizes

### 2. Code Splitting
- Split by route
- Lazy load heavy components
- Use dynamic imports
- Monitor bundle size

### 3. Caching
- Implement proper caching strategies
- Use React Query for server state
- Cache static assets
- Set appropriate cache headers

### 4. Database
- Use indexes effectively
- Optimize queries
- Implement connection pooling
- Monitor query performance

### 5. Monitoring
- Track Core Web Vitals
- Monitor bundle size
- Set up error tracking
- Use performance budgets

### 6. Testing
- Test performance regularly
- Use automated performance tests
- Monitor performance over time
- Set performance budgets

---

_These performance guidelines ensure the Kleaners platform delivers fast, responsive, and efficient user experiences across all devices and network conditions._
