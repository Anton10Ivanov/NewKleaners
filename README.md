# Kleaners - Professional Cleaning Services Platform

A comprehensive marketplace platform connecting customers with verified
professional cleaning service providers in Frankfurt, Germany.

## 🚀 Project Overview

**Kleaners** is a full-stack web application built with Next.js 15, Supabase,
and Stripe. The platform facilitates seamless booking, management, and payment
for residential, commercial, and specialized cleaning services.

### Key Features

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

## 📁 Project Structure

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
│   ├── ui/                # shadcn/ui base components
│   ├── admin/             # Admin-specific components
│   ├── booking/           # Booking flow components
│   ├── forms/             # Form components
│   ├── payments/          # Payment processing components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
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

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kleaners
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up the database**

   ```bash
   npx supabase db push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser** Navigate to
   [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run db:generate` - Generate TypeScript types from Supabase
- `npm run db:push` - Push database changes to Supabase
- `npm run db:reset` - Reset the database
- `npm run shadcn:add` - Add shadcn/ui components
- `npm run standards:validate` - Run all validation checks

## 🎨 Design System

### Color Palette

- **Primary**: Orange Peel (#ffa000) - CTA buttons, logo
- **Secondary**: Oxford Blue (#001b2e) - Navigation, headers
- **Background**: Seasalt (#f7f7f7) - Main background
- **Success**: Dark Spring Green (#177245) - Success states
- **Info**: Blue Green (#0d98ba) - Info states

### Typography

- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: H1-H6 with semantic sizing
- **Responsive**: Fluid typography with clamp()

### Component System

- **Base**: shadcn/ui components (76 installed)
- **Pattern**: Class Variance Authority (CVA) for variants
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile-First**: Touch targets minimum 44px

## 🗄️ Database Schema

### Core Tables

- **users** - User profiles and authentication
- **services** - Cleaning service catalog
- **bookings** - Booking records and status
- **providers** - Service provider profiles
- **payments** - Payment transactions
- **messages** - Real-time communication
- **reviews** - Service ratings and reviews

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

## 🛠 Development Guidelines

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

- **useState**: Component-local UI state
- **React Query**: Server data and caching
- **Zustand**: Global application state
- **URL state**: Shareable, bookmarkable state

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

## 🤝 Contributing

Please read our [Development Workflow](./development-workflow.md) before
contributing to the project.

### Development Guidelines

1. Follow the [Component Standards](./rules/component-standards.md)
2. Adhere to [Code Quality](./rules/code-quality.md) guidelines
3. Use [shadcn/ui components](./standards/shadcn-implementation-guide.md)
4. Follow [Accessibility Rules](./rules/accessibility-rules.md)
5. Implement [Responsive Design](./rules/responsive-design.md) principles

### MCP Server

This project includes a custom Model Context Protocol (MCP) server for shadcn/ui component management. The MCP server allows AI assistants to:

- Browse and search shadcn/ui components
- Install/remove components
- Get component information
- Update components
- Initialize shadcn/ui in the project

**Usage:**
```bash
# Development mode
npm run mcp:dev

# Build for production
npm run mcp:build

# Start production server
npm run mcp:start
```

**Configuration files:**
- `.mcp.json` - General MCP configuration
- `.cursor/mcp.json` - Cursor IDE specific configuration

See [mcp-server/README.md](./mcp-server/README.md) for detailed documentation.

## 📞 Support & Resources

### Documentation

- [Architecture Guide](./architecture.md)
- [Development Workflow](./development-workflow.md)
- [UI/UX Standards](./UI_UX_STANDARDS.md)
- [shadcn Implementation Guide](./shadcn-implementation-guide.md)

## 📄 License

This project is proprietary software. All rights reserved.

---

**Last Updated**: December 2024
**Version**: 1.1.0
**Status**: Active Development
