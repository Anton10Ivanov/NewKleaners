# Kleaners - Professional Cleaning Services Platform

## AI Agent Development Blueprint

**Project Type:** Full-Stack Web Application  
**Platform:** Next.js 15 + Supabase + Stripe  
**Status:** Production-Ready MVP (85% Complete)  
**Target Market:** Germany (Frankfurt)  
**Launch Date:** Q1 2025

---

## 🎯 Project Overview

Kleaners is a comprehensive cleaning services marketplace platform that connects
customers with professional cleaning service providers across multiple service
categories. The platform facilitates seamless booking, management, and payment
for residential, commercial, and specialized cleaning services.

### Core Value Proposition

- **For Customers:** Easy booking, verified providers, transparent pricing,
  quality guarantee
- **For Providers:** Increased bookings, streamlined operations, secure
  payments, customer management tools
- **For Platform:** Commission-based revenue model (15-20% per booking)

---

## 🏗️ Technical Architecture

### Frontend Stack

- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript 5.3.3
- **Styling:** Tailwind CSS 3.3.6 + shadcn/ui components
- **State Management:** Zustand 4.4.7 + TanStack React Query 5.14.2
- **Forms:** React Hook Form 7.48.2 + Zod 3.22.4 validation
- **Animations:** Framer Motion 10.16.16
- **Icons:** Lucide React

### Backend Stack

- **Database:** Supabase PostgreSQL 2.38.4
- **Authentication:** Supabase Auth with role-based access control
- **Real-time:** Supabase real-time subscriptions
- **Storage:** Supabase Storage for files and images
- **Payment:** Stripe 13.11.0 integration
- **Maps:** Google Maps API (planned)

### Project Structure

```
app/                    # Next.js App Router pages
├── (auth)/            # Authentication pages
├── (dashboard)/       # Dashboard layouts
├── (public)/          # Public pages
├── admin/             # Admin-specific pages
├── booking/           # Booking flow pages
├── client/            # Client dashboard pages
├── provider/          # Provider dashboard pages
└── services/          # Service listing pages

components/            # Reusable UI components
├── ui/                # shadcn/ui base components (76 components)
├── admin/             # Admin-specific components
├── booking/           # Booking flow components
├── forms/             # Form components
├── payments/          # Payment processing components
├── layout/            # Layout components
└── features/          # Feature-specific components

hooks/                 # Custom React hooks
lib/                   # Utility functions and configurations
schemas/               # Zod validation schemas
types/                 # TypeScript type definitions
utils/                 # Helper functions
services/              # Business logic services
supabase/              # Database migrations and functions
```

---

## 🚀 Core Features & Implementation Status

### ✅ COMPLETED FEATURES (Production Ready)

#### 1. User Authentication & Authorization (100%)

- **Implementation:** Supabase Auth with email/password, social login (Google,
  Facebook)
- **Features:** Role-based access control (client/provider/admin), email
  verification, password reset
- **Technical:** JWT token management, session handling

#### 2. Service Catalog & Discovery (100%)

- **Implementation:** 40+ cleaning services with advanced search and filtering
- **Features:** Service categories (Residential, Commercial, Specialized,
  Windows, Garden, Health & Safety)
- **Technical:** Real-time availability updates, service customization options

#### 3. Multi-Step Booking System (100%)

- **Implementation:** Comprehensive booking flow with form persistence and
  validation
- **Features:** Date/time picker with provider availability, address input,
  special instructions
- **Technical:** Conflict resolution, timezone handling, booking
  modification/cancellation

#### 4. Payment Processing (100%)

- **Implementation:** Full Stripe integration with multiple payment methods
- **Features:** Credit card, SEPA, PayPal support, automatic provider payments,
  refund processing
- **Technical:** PCI compliance, webhook handling, payment method management

#### 5. Provider Management Dashboard (100%)

- **Implementation:** Complete provider dashboard with analytics and earnings
  tracking
- **Features:** Availability calendar management, booking request handling,
  customer communication
- **Technical:** Real-time updates, calendar integration, performance analytics

#### 6. Admin Panel (95%)

- **Implementation:** Comprehensive admin dashboard with user management
- **Features:** User verification, service approval, analytics, system
  configuration
- **Technical:** Role-based access control, audit logging

#### 7. Real-time Communication (100%)

- **Implementation:** In-app messaging system with file sharing
- **Features:** Message history, notifications, support escalation
- **Technical:** Supabase Real-time, message encryption

#### 8. Review & Rating System (100%)

- **Implementation:** 5-star rating system with review moderation
- **Features:** Written reviews with photos, provider responses, rating
  aggregation
- **Technical:** Review verification, content moderation

#### 9. Mobile Responsive Design (100%)

- **Implementation:** Mobile-first responsive design with PWA capabilities
- **Features:** Touch-friendly interface, responsive breakpoints
- **Technical:** Progressive Web App features

### 🔄 IN PROGRESS FEATURES

#### 1. Content Moderation API

- **Status:** Advanced content moderation for reviews and messages
- **Complexity:** High
- **Timeline:** 2-3 weeks

#### 2. Fraud Detection System

- **Status:** Enhanced payment security and fraud prevention
- **Complexity:** High
- **Timeline:** 3-4 weeks

#### 3. Real-time Notifications

- **Status:** Push notification system for mobile and web
- **Complexity:** Medium
- **Timeline:** 2-3 weeks

### 📋 PLANNED FEATURES

#### 1. Native Mobile Apps

- **Description:** iOS and Android applications with full feature parity
- **Complexity:** High
- **Timeline:** 12-16 weeks

#### 2. AI-Powered Matching

- **Description:** Machine learning recommendation engine
- **Complexity:** High
- **Timeline:** 8-12 weeks

#### 3. Advanced Analytics

- **Description:** Enhanced reporting and business intelligence
- **Complexity:** Medium
- **Timeline:** 4-6 weeks

---

## 🎨 Design System & UI/UX

### Color Palette

- **Primary:** Orange Peel (#ffa000) - CTA buttons, logo
- **Secondary:** Oxford Blue (#001b2e) - Navigation, headers
- **Background:** Seasalt (#f7f7f7) - Main background
- **Success:** Dark Spring Green (#177245) - Success states
- **Info:** Blue Green (#0d98ba) - Info states

### Typography

- **Font Family:** Inter (Google Fonts)
- **Hierarchy:** H1-H6 with semantic sizing
- **Responsive:** Fluid typography with clamp()

### Component System

- **Base:** shadcn/ui components (76 installed)
- **Pattern:** Class Variance Authority (CVA) for variants
- **Accessibility:** WCAG 2.1 AA compliance
- **Mobile-First:** Touch targets minimum 44px

### Layout System

- **Container:** UnifiedContainer with responsive widths
- **Grid:** 8px base unit spacing system
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)

---

## 🗄️ Database Schema

### Core Tables

- **users** - User profiles and authentication
- **services** - Cleaning service catalog
- **bookings** - Booking records and status
- **providers** - Service provider profiles
- **payments** - Payment transactions
- **messages** - Real-time communication
- **reviews** - Service ratings and reviews

### Key Relationships

- Users → Bookings (One-to-Many)
- Services → Bookings (One-to-Many)
- Providers → Services (One-to-Many)
- Bookings → Payments (One-to-One)
- Users → Messages (One-to-Many)

---

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Installation Steps

1. Clone repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx supabase db push`
5. Start development server: `npm run dev`

---

## 📊 Business Model & Metrics

### Revenue Streams

- **Commission:** 15-20% per booking
- **Subscriptions:** Premium provider features
- **Advertising:** Service provider promotions

### Key Performance Indicators

- **Users:** 10,000+ registered users within 12 months
- **Providers:** 500+ verified cleaning service providers
- **Revenue:** €2M+ GMV within 18 months
- **Satisfaction:** 95%+ customer satisfaction rating

### Target Market

- **Primary:** Homeowners and businesses in Frankfurt, Germany
- **Market Size:** €8.2 billion German cleaning services market
- **Growth:** 15% annual growth rate

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

- [ ] Project setup and infrastructure
- [ ] User authentication system
- [ ] Basic UI component library
- [ ] Database schema design

### Phase 2: Core Features (Weeks 5-12)

- [ ] Service catalog and search
- [ ] Booking system implementation
- [ ] Payment processing integration
- [ ] Provider dashboard development

### Phase 3: Advanced Features (Weeks 13-20)

- [ ] Review and rating system
- [ ] Real-time communication
- [ ] Admin panel development
- [ ] Mobile optimization

### Phase 4: Launch Preparation (Weeks 21-24)

- [ ] Performance optimization
- [ ] Security audit and compliance
- [ ] User acceptance testing
- [ ] Production deployment

---

## 🔒 Security & Compliance

### Authentication

- Supabase Auth integration
- Role-based access control (RBAC)
- JWT token management
- Multi-factor authentication support

### Data Protection

- GDPR compliance for EU users
- Data encryption at rest and in transit
- User data anonymization options
- Right to data deletion (GDPR Article 17)

### Payment Security

- PCI DSS compliance
- Tokenized payments via Stripe
- Secure API communication
- Fraud detection system

---

## 📱 User Flows

### Customer Booking Flow

1. Visit homepage
2. Browse/search services
3. Select service and customize
4. Choose date/time from available slots
5. Enter address and instructions
6. Review booking details and pricing
7. Complete payment
8. Receive confirmation and provider details
9. Communicate with provider via chat
10. Rate experience after service

### Provider Management Flow

1. Register and complete verification
2. Set up profile and service offerings
3. Configure availability calendar
4. Receive booking requests
5. Accept/decline requests
6. Communicate with customers
7. Complete service and update status
8. Receive payment and reviews

---

## 🛠️ Development Guidelines

### Code Standards

- TypeScript strict mode
- ESLint + Prettier configuration
- Component-based architecture
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)

### Component Patterns

- Use shadcn/ui as foundation
- Implement CVA for variants
- Follow single responsibility principle
- Keep components under 50 lines
- Use proper TypeScript interfaces

### State Management

- **useState:** Component-local UI state
- **React Query:** Server data and caching
- **Zustand:** Global application state
- **URL state:** Shareable, bookmarkable state

---

## 📈 Performance Requirements

### Load Times

- Initial page load: < 3 seconds
- Service search results: < 1 second
- Booking confirmation: < 2 seconds
- Image loading: < 2 seconds

### Scalability

- Support 10,000+ concurrent users
- Handle 1,000+ bookings per day
- 99.9% uptime availability
- Auto-scaling infrastructure

---

## 🎯 Success Criteria

### Technical Metrics

- Page load time: < 3 seconds
- System uptime: 99.9%
- API response time: < 500ms
- Mobile app crash rate: < 1%

### Business Metrics

- Monthly active users: 5,000 by Month 6
- Gross merchandise value: €100K by Month 6
- Customer satisfaction: 4.5/5
- Booking completion rate: 95%

---

## 📚 Key Dependencies

### External Services

- **Stripe API:** Payment processing and webhooks
- **Google Maps API:** Location services and validation
- **Twilio API:** SMS notifications
- **Supabase Platform:** Backend services and infrastructure

### Regulatory Requirements

- **GDPR:** Data protection and user privacy
- **PCI DSS:** Payment card industry security
- **German Data Protection Laws (BDSG):** Local compliance

---

## 🔄 Maintenance & Updates

### Regular Tasks

- Security updates and patches
- Performance monitoring and optimization
- User feedback collection and analysis
- Feature enhancement based on usage data

### Monitoring

- Error tracking (Sentry)
- Performance monitoring
- User analytics (Google Analytics)
- Payment processing monitoring

---

## 📞 Support & Resources

### Documentation

- [Architecture Guide](./docs/architecture/architecture.md)
- [Development Workflow](./docs/development-workflow.md)
- [UI/UX Standards](./docs/UI_UX_STANDARDS.md)
- [Setup Instructions](./docs/setup-instructions.md)

### Key Contacts

- **Development Team:** Development Team
- **Product Management:** Product Management Team
- **Support:** Customer Support Team

---

**Last Updated:** December 2024  
**Version:** 1.1.0  
**Status:** Active Development

_This description serves as a comprehensive blueprint for AI agents to
understand, recreate, and maintain the Kleaners platform._
