# Security Architecture

## Overview

The Kleaners platform implements a comprehensive security architecture that protects user data, ensures secure transactions, and maintains compliance with industry standards and regulations.

## Security Principles

### Defense in Depth
- Multiple layers of security controls
- Fail-safe defaults
- Principle of least privilege
- Continuous monitoring and improvement

### Data Protection
- Encryption at rest and in transit
- Data minimization
- User consent and control
- Right to deletion

### Compliance
- GDPR compliance for EU users
- PCI DSS for payment processing
- German Data Protection Laws (BDSG)
- Industry best practices

## Authentication & Authorization

### Supabase Auth Integration

```typescript
// Authentication configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
);
```

### Role-Based Access Control (RBAC)

```typescript
// User roles and permissions
interface UserRole {
  id: string;
  name: 'customer' | 'provider' | 'admin';
  permissions: Permission[];
}

interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

// Role definitions
const ROLES = {
  CUSTOMER: {
    permissions: [
      { resource: 'bookings', actions: ['read', 'write'] },
      { resource: 'profile', actions: ['read', 'write'] },
      { resource: 'reviews', actions: ['read', 'write'] }
    ]
  },
  PROVIDER: {
    permissions: [
      { resource: 'bookings', actions: ['read', 'write'] },
      { resource: 'profile', actions: ['read', 'write'] },
      { resource: 'services', actions: ['read', 'write'] },
      { resource: 'reviews', actions: ['read'] }
    ]
  },
  ADMIN: {
    permissions: [
      { resource: '*', actions: ['read', 'write', 'delete', 'admin'] }
    ]
  }
};
```

### JWT Token Management

```typescript
// Token validation and refresh
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
```

### Multi-Factor Authentication

```typescript
// MFA implementation
export async function enableMFA(userId: string) {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp'
  });

  if (error) throw error;

  return data;
}

export async function verifyMFA(factorId: string, code: string) {
  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    code
  });

  if (error) throw error;

  return data;
}
```

## Data Protection

### Encryption

#### Data at Rest
```sql
-- Database encryption (handled by Supabase)
-- All data is encrypted using AES-256 encryption
-- Encryption keys are managed by Supabase

-- Sensitive data encryption
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  encrypted_phone TEXT, -- Encrypted phone numbers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Data in Transit
```typescript
// HTTPS enforcement
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};
```

### Data Minimization

```typescript
// Only collect necessary data
interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  // Don't collect unnecessary data
}

// Data retention policies
const DATA_RETENTION = {
  user_profiles: '7 years',
  booking_records: '7 years',
  payment_data: '7 years',
  chat_messages: '2 years',
  analytics_data: '2 years'
};
```

### User Consent Management

```typescript
// GDPR consent management
interface ConsentPreferences {
  marketing: boolean;
  analytics: boolean;
  functional: boolean;
  necessary: boolean; // Always true
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentPreferences>({
    marketing: false,
    analytics: false,
    functional: true,
    necessary: true
  });

  const updateConsent = (preferences: Partial<ConsentPreferences>) => {
    setConsent(prev => ({ ...prev, ...preferences }));
    // Store consent in database
    saveConsentPreferences(preferences);
  };

  return { consent, updateConsent };
}
```

## Payment Security

### PCI DSS Compliance

```typescript
// Stripe integration with PCI compliance
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Never handle card data directly
export async function createPaymentIntent(amount: number, currency: string) {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, currency }),
  });

  const { client_secret } = await response.json();
  return client_secret;
}
```

### Tokenized Payments

```typescript
// Payment method tokenization
export async function createPaymentMethod(cardElement: any) {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    throw new Error(error.message);
  }

  return paymentMethod;
}
```

### Fraud Detection

```typescript
// Fraud detection integration
export async function processPayment(paymentData: PaymentData) {
  // Risk assessment
  const riskScore = await assessPaymentRisk(paymentData);

  if (riskScore > 0.8) {
    // High risk - require additional verification
    return { status: 'requires_verification', riskScore };
  }

  // Process payment
  const result = await stripe.paymentIntents.confirm(paymentData.paymentIntentId);

  return { status: 'success', result };
}
```

## Input Validation & Sanitization

### Client-Side Validation

```typescript
// Zod schema validation
import { z } from 'zod';

const bookingSchema = z.object({
  serviceId: z.string().uuid(),
  date: z.date().min(new Date()),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  address: z.string().min(10).max(200),
  instructions: z.string().max(500).optional(),
});

export function useBookingForm() {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
  });

  return form;
}
```

### Server-Side Validation

```typescript
// API route validation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = bookingSchema.parse(body);

    // Sanitize data
    const sanitizedData = {
      ...validatedData,
      address: sanitizeHtml(validatedData.address),
      instructions: sanitizeHtml(validatedData.instructions || ''),
    };

    // Process booking
    const booking = await createBooking(sanitizedData);

    return Response.json({ success: true, booking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### XSS Prevention

```typescript
// HTML sanitization
import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
}

// Safe HTML rendering
export function SafeHtml({ content }: { content: string }) {
  const sanitized = useMemo(() => sanitizeHtml(content), [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
```

## API Security

### Rate Limiting

```typescript
// Rate limiting middleware
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function rateLimitMiddleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### CORS Configuration

```typescript
// CORS security
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
    ? 'https://kleaners.com'
    : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};
```

### API Authentication

```typescript
// JWT verification
export async function verifyToken(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authHeader.substring(7);

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

## Database Security

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- User can only access their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Bookings are visible to customer and provider
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid() = customer_id OR
    auth.uid() = provider_id
  );

-- Services are public
CREATE POLICY "Services are public" ON services
  FOR SELECT USING (is_active = true);
```

### Data Encryption

```sql
-- Encrypt sensitive columns
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt phone numbers
UPDATE users SET
  encrypted_phone = pgp_sym_encrypt(phone, 'encryption_key')
WHERE phone IS NOT NULL;

-- Decrypt when needed
SELECT
  id,
  email,
  pgp_sym_decrypt(encrypted_phone, 'encryption_key') as phone
FROM users;
```

## Monitoring & Logging

### Security Event Logging

```typescript
// Security event logging
interface SecurityEvent {
  type: 'login' | 'logout' | 'failed_login' | 'suspicious_activity';
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
}

export async function logSecurityEvent(event: SecurityEvent) {
  await supabase
    .from('security_events')
    .insert({
      type: event.type,
      user_id: event.userId,
      ip_address: event.ip,
      user_agent: event.userAgent,
      timestamp: event.timestamp.toISOString(),
      details: event.details
    });
}
```

### Intrusion Detection

```typescript
// Suspicious activity detection
export function detectSuspiciousActivity(userId: string, activity: string) {
  // Check for unusual patterns
  const patterns = {
    multiple_failed_logins: '5+ failed logins in 10 minutes',
    rapid_requests: '100+ requests in 1 minute',
    unusual_location: 'Login from new country',
    data_exfiltration: 'Large data downloads'
  };

  // Implement detection logic
  // Alert security team if suspicious
}
```

### Audit Logging

```typescript
// Audit trail for sensitive operations
export async function auditLog(action: string, resource: string, userId: string) {
  await supabase
    .from('audit_logs')
    .insert({
      action,
      resource,
      user_id: userId,
      timestamp: new Date().toISOString(),
      ip_address: getClientIP(),
      user_agent: getUserAgent()
    });
}
```

## Compliance

### GDPR Compliance

```typescript
// Data subject rights implementation
export async function handleDataRequest(userId: string, requestType: 'access' | 'portability' | 'deletion') {
  switch (requestType) {
    case 'access':
      return await exportUserData(userId);

    case 'portability':
      return await exportUserDataInPortableFormat(userId);

    case 'deletion':
      return await deleteUserData(userId);
  }
}

// Right to be forgotten
export async function deleteUserData(userId: string) {
  // Anonymize instead of delete for legal requirements
  await supabase
    .from('users')
    .update({
      email: `deleted_${userId}@deleted.com`,
      full_name: 'Deleted User',
      phone: null,
      deleted_at: new Date().toISOString()
    })
    .eq('id', userId);
}
```

### Data Processing Lawfulness

```typescript
// Legal basis for data processing
const LEGAL_BASIS = {
  user_registration: 'consent',
  service_booking: 'contract',
  payment_processing: 'contract',
  marketing_emails: 'consent',
  analytics: 'legitimate_interest',
  security_monitoring: 'legitimate_interest'
};
```

## Security Testing

### Penetration Testing

```typescript
// Security test examples
describe('Security Tests', () => {
  it('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";

    const response = await request(app)
      .post('/api/search')
      .send({ query: maliciousInput });

    expect(response.status).toBe(400);
  });

  it('should prevent XSS attacks', async () => {
    const maliciousScript = '<script>alert("xss")</script>';

    const response = await request(app)
      .post('/api/reviews')
      .send({ content: maliciousScript });

    expect(response.body.content).not.toContain('<script>');
  });
});
```

### Vulnerability Scanning

```bash
# Security scanning
npm audit
npm run security:scan

# Dependency vulnerability check
npm run deps:audit

# SAST (Static Application Security Testing)
npm run security:sast
```

## Incident Response

### Security Incident Plan

```typescript
// Incident response procedures
export class SecurityIncident {
  async handleIncident(type: 'breach' | 'attack' | 'vulnerability', details: any) {
    // 1. Immediate containment
    await this.containIncident(type, details);

    // 2. Assess impact
    const impact = await this.assessImpact(details);

    // 3. Notify stakeholders
    await this.notifyStakeholders(impact);

    // 4. Document incident
    await this.documentIncident(type, details, impact);

    // 5. Implement fixes
    await this.implementFixes(details);

    // 6. Post-incident review
    await this.postIncidentReview();
  }
}
```

### Breach Notification

```typescript
// GDPR breach notification
export async function notifyBreach(breachDetails: BreachDetails) {
  // Notify supervisory authority within 72 hours
  await notifySupervisoryAuthority(breachDetails);

  // Notify affected users if high risk
  if (breachDetails.riskLevel === 'high') {
    await notifyAffectedUsers(breachDetails);
  }
}
```

## Best Practices

### 1. Authentication
- Use strong password policies
- Implement MFA where possible
- Regular security audits
- Monitor for suspicious activity

### 2. Data Protection
- Encrypt sensitive data
- Implement data minimization
- Regular data purging
- User consent management

### 3. API Security
- Input validation and sanitization
- Rate limiting
- Proper error handling
- Security headers

### 4. Monitoring
- Comprehensive logging
- Real-time monitoring
- Incident response procedures
- Regular security reviews

### 5. Compliance
- Stay updated with regulations
- Regular compliance audits
- Document security measures
- Train staff on security

---

_This security architecture ensures the Kleaners platform maintains the highest standards of security and compliance while protecting user data and maintaining trust._
