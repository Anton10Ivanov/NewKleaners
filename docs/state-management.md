# State Management

## Overview

The Kleaners platform uses a layered state management approach that combines different tools for different types of state. This ensures optimal performance, maintainability, and developer experience.

## State Management Strategy

### When to Use What

- **useState**: Component-local UI state
- **React Query**: Server data, caching, synchronization
- **Zustand**: Global application state (user preferences, etc.)
- **URL state**: Shareable, bookmarkable state

## Local State (useState)

### Component-Local UI State

Use `useState` for state that only affects a single component:

```typescript
import { useState } from 'react';

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    address: '',
    instructions: ''
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitBooking(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

### Best Practices for Local State

- Keep state as close to where it's used as possible
- Use descriptive state variable names
- Consider if state should be lifted up to parent components
- Use functional updates for state that depends on previous state

## Server State (React Query)

### Data Fetching and Caching

React Query handles all server state, providing caching, background updates, and synchronization:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch services
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/services');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Fetch user bookings
export function useUserBookings(userId: string) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      const response = await fetch(`/api/bookings?userId=${userId}`);
      return response.json();
    },
    enabled: !!userId,
  });
}

// Create booking mutation
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch bookings
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
```

### Query Configuration

```typescript
// Service-specific query configuration
export function useServiceDetails(serviceId: string) {
  return useQuery({
    queryKey: ['services', serviceId],
    queryFn: () => fetchService(serviceId),
    enabled: !!serviceId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Real-time data with polling
export function useLiveBookings() {
  return useQuery({
    queryKey: ['bookings', 'live'],
    queryFn: fetchBookings,
    refetchInterval: 30000, // 30 seconds
    refetchIntervalInBackground: true,
  });
}
```

### Mutation Patterns

```typescript
// Optimistic updates
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBooking,
    onMutate: async (newBooking) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['bookings'] });

      // Snapshot previous value
      const previousBookings = queryClient.getQueryData(['bookings']);

      // Optimistically update
      queryClient.setQueryData(['bookings'], (old: any) =>
        old?.map((booking: any) =>
          booking.id === newBooking.id ? { ...booking, ...newBooking } : booking
        )
      );

      return { previousBookings };
    },
    onError: (err, newBooking, context) => {
      // Rollback on error
      queryClient.setQueryData(['bookings'], context?.previousBookings);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
```

## Global State (Zustand)

### Store Structure

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User) => set({
        user,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false
      }),

      updateUser: (updates: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
```

### UI State Store

```typescript
// stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  theme: 'system',
  notifications: [],

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  setTheme: (theme) => set({ theme }),

  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      { ...notification, id: Date.now().toString() }
    ]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}));
```

### Booking State Store

```typescript
// stores/bookingStore.ts
import { create } from 'zustand';

interface BookingState {
  currentBooking: Partial<BookingData> | null;
  bookingStep: number;
  setBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  currentBooking: null,
  bookingStep: 0,

  setBookingData: (data) => set((state) => ({
    currentBooking: { ...state.currentBooking, ...data }
  })),

  nextStep: () => set((state) => ({
    bookingStep: state.bookingStep + 1
  })),

  previousStep: () => set((state) => ({
    bookingStep: Math.max(0, state.bookingStep - 1)
  })),

  resetBooking: () => set({
    currentBooking: null,
    bookingStep: 0
  }),
}));
```

## URL State

### Search Parameters

Use URL state for shareable and bookmarkable state:

```typescript
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useServiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    rating: searchParams.get('rating') || '',
    location: searchParams.get('location') || '',
  };

  const updateFilter = useCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, updateFilter, clearFilters };
}
```

### Route State

```typescript
// For complex state that should be in URL
export function useBookingState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const bookingState = {
    serviceId: searchParams.get('serviceId'),
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    step: parseInt(searchParams.get('step') || '0'),
  };

  const updateBookingState = (updates: Partial<typeof bookingState>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return { bookingState, updateBookingState };
}
```

## Error Handling

### Standardized Error Utilities

```typescript
// utils/errors.ts
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export function handleApiError(error: unknown, context: string): ApiError {
  console.error(`Error in ${context}:`, error);

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: (error as any).message,
      code: (error as any).code,
      status: (error as any).status,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
}

// Usage in components
export function useCreateBooking() {
  return useMutation({
    mutationFn: createBooking,
    onError: (error) => {
      const apiError = handleApiError(error, 'createBooking');
      toast.error(apiError.message);
    },
  });
}
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## State Synchronization

### Real-time Updates

```typescript
// hooks/useRealtimeBookings.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRealtimeBookings(userId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Invalidate and refetch bookings
          queryClient.invalidateQueries({ queryKey: ['bookings', userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
```

### Cross-Component Communication

```typescript
// Using custom events for loose coupling
export function useEventBus() {
  const emit = useCallback((event: string, data?: any) => {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  }, []);

  const on = useCallback((event: string, handler: (data: any) => void) => {
    const eventHandler = (e: CustomEvent) => handler(e.detail);
    window.addEventListener(event, eventHandler);
    return () => window.removeEventListener(event, eventHandler);
  }, []);

  return { emit, on };
}

// Usage
export function BookingForm() {
  const { emit } = useEventBus();

  const handleSubmit = async (data: BookingData) => {
    await createBooking(data);
    emit('booking-created', data);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

export function BookingList() {
  const { on } = useEventBus();
  const queryClient = useQueryClient();

  useEffect(() => {
    return on('booking-created', () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    });
  }, [on, queryClient]);

  return <div>...</div>;
}
```

## Performance Optimization

### State Memoization

```typescript
import { useMemo } from 'react';

export function useFilteredServices(services: Service[], filters: Filters) {
  return useMemo(() => {
    return services.filter(service => {
      if (filters.category && service.category !== filters.category) {
        return false;
      }
      if (filters.priceMin && service.price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax && service.price > filters.priceMax) {
        return false;
      }
      return true;
    });
  }, [services, filters]);
}
```

### Selective Subscriptions

```typescript
// Only subscribe to specific parts of the store
export function useUserProfile() {
  return useAuthStore((state) => ({
    user: state.user,
    updateUser: state.updateUser,
  }));
}

// Use shallow equality for object comparisons
export function useBookingData() {
  return useBookingStore(
    (state) => state.currentBooking,
    shallow
  );
}
```

## Testing State Management

### Testing Zustand Stores

```typescript
// __tests__/authStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/stores/authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should login user', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login({ id: '1', email: 'test@example.com' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe('test@example.com');
  });
});
```

### Testing React Query

```typescript
// __tests__/useServices.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useServices } from '@/hooks/useServices';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useServices', () => {
  it('should fetch services', async () => {
    const { result } = renderHook(() => useServices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

## Best Practices

### 1. State Location
- Keep state as close to where it's used as possible
- Lift state up only when necessary
- Use global state sparingly

### 2. State Shape
- Keep state flat and normalized
- Avoid nested objects when possible
- Use consistent naming conventions

### 3. Performance
- Memoize expensive computations
- Use selective subscriptions
- Implement proper cleanup

### 4. Error Handling
- Handle errors at the appropriate level
- Provide user-friendly error messages
- Log errors for debugging

### 5. Testing
- Test state logic in isolation
- Mock external dependencies
- Test error scenarios

---

_This state management approach provides a robust foundation for managing complex application state while maintaining performance and developer experience._
