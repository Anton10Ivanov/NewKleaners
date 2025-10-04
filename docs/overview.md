# Kleaners Platform Overview

## Project Summary

Kleaners is a comprehensive cleaning services marketplace platform that connects customers with professional cleaning service providers across multiple service categories. The platform facilitates seamless booking, management, and payment for residential, commercial, and specialized cleaning services.

## Core Value Proposition

- **For Customers:** Easy booking, verified providers, transparent pricing, quality guarantee
- **For Providers:** Increased bookings, streamlined operations, secure payments, customer management tools
- **For Platform:** Commission-based revenue model (15-20% per booking)

## Target Market

- **Primary:** Homeowners and businesses in Frankfurt, Germany
- **Market Size:** €8.2 billion German cleaning services market
- **Growth:** 15% annual growth rate

## Project Status

- **Version:** 1.1.0
- **Status:** Production-Ready MVP (85% Complete)
- **Launch Date:** Q1 2025
- **Platform:** Next.js 15 + Supabase + Stripe

## Key Features

### ✅ Completed Features (Production Ready)

1. **User Authentication & Authorization (100%)**
   - Supabase Auth with email/password, social login
   - Role-based access control (client/provider/admin)
   - Email verification, password reset

2. **Service Catalog & Discovery (100%)**
   - 40+ cleaning services with advanced search and filtering
   - Service categories (Residential, Commercial, Specialized, Windows, Garden, Health & Safety)
   - Real-time availability updates

3. **Multi-Step Booking System (100%)**
   - Comprehensive booking flow with form persistence
   - Date/time picker with provider availability
   - Address input, special instructions

4. **Payment Processing (100%)**
   - Full Stripe integration with multiple payment methods
   - Credit card, SEPA, PayPal support
   - Automatic provider payments, refund processing

5. **Provider Management Dashboard (100%)**
   - Complete provider dashboard with analytics
   - Availability calendar management
   - Booking request handling, customer communication

6. **Admin Panel (95%)**
   - Comprehensive admin dashboard
   - User verification, service approval
   - Analytics, system configuration

7. **Real-time Communication (100%)**
   - In-app messaging system with file sharing
   - Message history, notifications
   - Support escalation

8. **Review & Rating System (100%)**
   - 5-star rating system with review moderation
   - Written reviews with photos
   - Provider responses, rating aggregation

9. **Mobile Responsive Design (100%)**
   - Mobile-first responsive design
   - PWA capabilities
   - Touch-friendly interface

### 🔄 In Progress Features

1. **Content Moderation API** - Advanced content moderation for reviews and messages
2. **Fraud Detection System** - Enhanced payment security and fraud prevention
3. **Real-time Notifications** - Push notification system for mobile and web

### 📋 Planned Features

1. **Native Mobile Apps** - iOS and Android applications with full feature parity
2. **AI-Powered Matching** - Machine learning recommendation engine
3. **Advanced Analytics** - Enhanced reporting and business intelligence

## Business Model

### Revenue Streams

- **Commission:** 15-20% per booking
- **Subscriptions:** Premium provider features
- **Advertising:** Service provider promotions

### Key Performance Indicators

- **Users:** 10,000+ registered users within 12 months
- **Providers:** 500+ verified cleaning service providers
- **Revenue:** €2M+ GMV within 18 months
- **Satisfaction:** 95%+ customer satisfaction rating

## Technical Architecture

### Frontend Stack
- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript 5.3.3
- **Styling:** Tailwind CSS 3.3.6 + shadcn/ui components
- **State Management:** Zustand 4.4.7 + TanStack React Query 5.14.2
- **Forms:** React Hook Form 7.48.2 + Zod 3.22.4 validation
- **Animations:** Framer Motion 10.16.16

### Backend Stack
- **Database:** Supabase PostgreSQL 2.38.4
- **Authentication:** Supabase Auth with role-based access control
- **Real-time:** Supabase real-time subscriptions
- **Storage:** Supabase Storage for files and images
- **Payment:** Stripe 13.11.0 integration
- **Maps:** Google Maps API (planned)

## Design System

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

## Security & Compliance

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

## Performance Requirements

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

## Success Criteria

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

**Last Updated:** December 2024
**Version:** 1.1.0
**Status:** Active Development

_This overview serves as the high-level introduction to the Kleaners platform for all stakeholders._
