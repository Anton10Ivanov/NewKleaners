# Kleaners - Professional Cleaning Services Platform

Welcome to the Kleaners project documentation. This directory contains
comprehensive guides and references for developing and maintaining the
application.

## 🚀 Project Overview

**Kleaners** is a comprehensive cleaning services marketplace platform that
connects customers with professional cleaning service providers across multiple
service categories. The platform facilitates seamless booking, management, and
payment for residential, commercial, and specialized cleaning services.

### 📊 Current Status (December 2024)

- **Development Phase**: MVP Development Phase
- **Implementation Progress**: 85% of planned features completed
- **Core Platform**: 100% complete and production ready
- **Target Launch**: Q1 2025

### 🎯 Key Features

- **40+ Cleaning Services** with advanced search and filtering
- **Multi-Step Booking System** with form persistence and validation
- **Full Payment Integration** with Stripe and multiple payment methods
- **Real-time Communication** with in-app messaging
- **Comprehensive Admin Panel** with analytics and user management
- **Provider Dashboard** with earnings tracking and booking management
- **Mobile-Responsive Design** with PWA capabilities

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.3.6 with shadcn/ui components
- **State Management**: Zustand 4.4.7 + TanStack React Query 5.14.2
- **Forms**: React Hook Form 7.48.2 with Zod 3.22.4 validation
- **Animations**: Framer Motion 10.16.16

### Backend

- **Database**: Supabase PostgreSQL 2.38.4
- **Authentication**: Supabase Auth with role-based access
- **Real-time**: Supabase real-time subscriptions
- **Storage**: Supabase Storage for files and images
- **Payment**: Stripe 13.11.0 integration

## 📚 Documentation Structure

### 🚀 Quick Start

- **[Setup Instructions](./setup-instructions.md)** - Complete development
  environment setup
- **[Development Workflow](./development-workflow.md)** - Best practices for
  contributing
- **[Architecture Overview](./architecture/architecture.md)** - Application
  structure and patterns

### 📋 Core Documentation

- **[Product Requirements Document (PRD)](./PRD.md)** - Complete project
  specifications and current status
- **[Architecture](./architecture/)** - Application structure and design
  patterns
  - [Comprehensive Architecture](./architecture/comprehensive-architecture.md)
- **[Development Standards](./standards/)** - Coding conventions and best
  practices
  - [shadcn Implementation Guide](./standards/shadcn-implementation-guide.md)
- **[UI/UX Standards](./UI_UX_STANDARDS.md)** - Design system and component
  guidelines
- **[Deployment Guide](./deployment.md)** - Production deployment instructions

### 🔧 Feature Documentation

- **[Booking System](./booking/)** - Comprehensive booking flow documentation
  - [Comprehensive Booking System](./booking/comprehensive-booking-system.md)
- **[Payment System](./payment/)** - Payment processing and integration
  - [Comprehensive Payment System](./payment/comprehensive-payment-system.md)
  - [Payment Integration Guide](./payment/payment-integration-guide.md)

### 📖 Reference Documentation

- **[Rules & Standards](./rules/)** - Detailed coding and design standards
  - [Component Standards](./rules/component-standards.md)
  - [Code Quality](./rules/code-quality.md)
  - [Accessibility Rules](./rules/accessibility-rules.md)
  - [Animation Guidelines](./rules/animation-guidelines.md)
  - [Responsive Design](./rules/responsive-design.md)
- **[Database Migration Guide](./database-migration-guide.md)** - Database
  schema changes
- **[Container Standardization Guide](./container-standardization-guide.md)** -
  Docker setup

### 📚 Additional Resources

- **[FAQ](./faq.md)** - Frequently asked questions
- **[Cursor Branch README](./CURSOR_BRANCH_README.md)** - Cursor-specific
  development notes

## 🏗 Project Structure

```
kleaners/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard layouts
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin-specific pages
│   ├── booking/           # Booking flow pages
│   ├── client/            # Client dashboard pages
│   ├── provider/          # Provider dashboard pages
│   └── services/          # Service listing pages
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── booking/           # Booking flow components
│   ├── forms/             # Form components
│   ├── payments/          # Payment processing components
│   ├── ui/                # Base UI components (shadcn/ui)
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── schemas/               # Zod validation schemas
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
├── services/              # Business logic services
└── supabase/              # Database migrations and functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payment processing)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy from `.env.example`)
4. Run database migrations: `npx supabase db push`
5. Start development server: `npm run dev`

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 📊 Implementation Status

### ✅ Completed Features (Production Ready)

- User Authentication & Authorization (100%)
- Service Catalog & Discovery (100%)
- Multi-Step Booking System (100%)
- Payment Processing (100%)
- Provider Management Dashboard (100%)
- Admin Panel (95%)
- Real-time Communication (100%)
- Review & Rating System (100%)
- Mobile Responsive Design (100%)

### 🔄 In Progress

- Content Moderation API
- Fraud Detection System
- Real-time Notifications

### 📋 Planned Features

- Native Mobile Apps (iOS/Android)
- AI-Powered Matching
- Advanced Analytics
- Push Notifications

## 🤝 Contributing

Please read our [Development Workflow](./development-workflow.md) before
contributing to the project.

### Development Guidelines

1. Follow the [Component Standards](./rules/component-standards.md)
2. Adhere to [Code Quality](./rules/code-quality.md) guidelines
3. Use [shadcn/ui components](./standards/shadcn-implementation-guide.md)
4. Follow [Accessibility Rules](./rules/accessibility-rules.md)
5. Implement [Responsive Design](./rules/responsive-design.md) principles

## 🆘 Need Help?

- Check the [FAQ](./faq.md) for common questions
- Review the [PRD](./PRD.md) for complete project specifications
- Follow our [Troubleshooting Guide](./faq.md#troubleshooting)
- Consult the [Architecture Documentation](./architecture/architecture.md)

## 📄 License

This project is proprietary software. All rights reserved.

---

**Last Updated**: December 2024  
**Version**: 1.1.0  
**Status**: Active Development
