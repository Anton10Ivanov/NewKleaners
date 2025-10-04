# Kleaners Project Structure

**Generated:** December 19, 2024  
**Project:** Kleaners - Professional Cleaning Services Platform  
**Version:** 1.1.0

## Root Directory Structure

```
kleaners-950da1517f080802f2d42aded18b6b9ef80fe236/
├── app/                                    # Next.js App Router pages
│   ├── (auth)/                            # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── verify-provider/
│   ├── (dashboard)/                       # Dashboard layouts
│   │   ├── admin/
│   │   ├── client/
│   │   └── provider/
│   ├── (public)/                          # Public pages
│   │   ├── about/
│   │   ├── contact/
│   │   └── faq/
│   ├── admin/                             # Admin-specific pages
│   │   ├── adminpanel/
│   │   ├── adminsettings/
│   │   └── dashboard/
│   ├── auth/                              # Auth pages (legacy)
│   ├── booking/                           # Booking flow pages
│   ├── client/                            # Client dashboard pages
│   ├── provider/                          # Provider dashboard pages
│   ├── services/                          # Service listing pages
│   │   ├── homecleaning/
│   │   └── officecleaning/
│   ├── globals.css                        # Global styles
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Home page
│   └── not-found.tsx                      # 404 page
├── components/                            # Reusable UI components
│   ├── ui/                                # shadcn/ui base components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── toaster.tsx
│   ├── admin/                             # Admin-specific components
│   │   ├── AdminHeader.tsx
│   │   ├── AdminQuickActions.tsx
│   │   ├── AdminTabs.tsx
│   │   ├── AdminForm.tsx
│   │   └── Dashboard.tsx
│   ├── booking/                           # Booking components
│   ├── forms/                             # Form components
│   ├── layout/                            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── UnifiedContainer.tsx
│   ├── navbar/                            # Navigation components
│   ├── payments/                          # Payment components
│   ├── seo/                               # SEO components
│   │   └── GlobalSEO.tsx
│   └── features/                          # Feature-specific components
├── docs/                                  # Documentation
│   ├── architecture/
│   │   └── architecture.md
│   ├── rules/
│   │   └── code-quality.md
│   ├── standards/
│   │   └── shadcn-implementation-guide.md
│   ├── CURSOR_BRANCH_README.md
│   ├── database-migration-guide.md
│   ├── development-workflow.md
│   ├── deployment.md
│   ├── faq.md
│   ├── PRD.md
│   └── README.md
├── hooks/                                 # Custom React hooks
│   ├── useBookingSubmission.ts
│   ├── useEnhancedBookingSubmission.ts
│   ├── use-media-query.ts
│   └── useAuth.ts
├── lib/                                   # Utility functions and configurations
│   ├── utils.ts
│   ├── auth.ts
│   └── validations.ts
├── schemas/                               # Zod validation schemas
│   └── booking.ts
├── types/                                 # TypeScript type definitions
│   ├── auth.ts
│   ├── booking.ts
│   ├── supabase.ts
│   └── index.ts
├── utils/                                 # Helper functions
│   ├── errors/
│   ├── scripts/
│   └── index.ts
├── services/                              # Business logic services
│   ├── auth.ts
│   ├── booking.ts
│   └── payment.ts
├── store/                                 # State management (Zustand)
│   ├── authStore.ts
│   ├── bookingStore.ts
│   └── uiStore.ts
├── contexts/                              # React contexts
│   └── AuthContext.tsx
├── integrations/                          # External service integrations
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   └── stripe/
│       ├── client.ts
│       └── server.ts
├── scripts/                               # Build and utility scripts
│   ├── analyze-bundle.js
│   ├── analyze-dependencies.js
│   ├── audit-shadcn-components.js
│   ├── enforce-ui-ux-standards.js
│   ├── fix-shadcn-syntax-errors.js
│   ├── implement-seo-standards.js
│   ├── implement-shadcn-components.js
│   ├── next.config.js
│   ├── performance-monitor.js
│   ├── tailwind.config.js
│   └── validate-standards-compliance.js
├── public/                                # Static assets
│   ├── Images/
│   │   └── Logo.png
│   ├── icons/
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── .cursor/                               # Cursor IDE configuration
│   └── rules/
│       └── PRD.md
├── .next/                                 # Next.js build output (generated)
├── node_modules/                          # Dependencies (generated)
├── .env.local                             # Environment variables (local)
├── .env.example                           # Environment variables template
├── .gitignore                             # Git ignore rules
├── .eslintrc.json                         # ESLint configuration
├── .prettierrc                            # Prettier configuration
├── components.json                        # shadcn/ui configuration
├── next.config.js                         # Next.js configuration
├── package.json                           # Project dependencies and scripts
├── package-lock.json                      # Dependency lock file
├── postcss.config.js                      # PostCSS configuration
├── tailwind.config.js                     # Tailwind CSS configuration
├── tsconfig.json                          # TypeScript configuration
├── bundle-analysis-report.json            # Bundle analysis report
├── standards-compliance-report.json       # Standards compliance report
├── fix_database_structure.sql             # Database migration script
└── README.md                              # Project documentation
```

## Key Directories Explained

### `/app` - Next.js App Router

- **Purpose**: Contains all pages and layouts using Next.js 15 App Router
- **Structure**: Route groups `(auth)`, `(dashboard)`, `(public)` for
  organization
- **Key Files**: `layout.tsx`, `page.tsx`, `globals.css`

### `/components` - UI Components

- **Purpose**: Reusable React components organized by feature
- **Structure**:
  - `ui/` - shadcn/ui base components (76 components)
  - `admin/` - Admin-specific components
  - `layout/` - Layout and container components
  - `features/` - Feature-specific components

### `/docs` - Documentation

- **Purpose**: Comprehensive project documentation
- **Key Files**:
  - `PRD.md` - Product Requirements Document
  - `README.md` - Main project documentation
  - `architecture/` - Technical architecture guides

### `/hooks` - Custom React Hooks

- **Purpose**: Reusable React hooks for state and side effects
- **Key Files**: `useBookingSubmission.ts`, `useAuth.ts`

### `/lib` - Utilities

- **Purpose**: Shared utility functions and configurations
- **Key Files**: `utils.ts`, `auth.ts`, `validations.ts`

### `/types` - TypeScript Definitions

- **Purpose**: TypeScript type definitions and interfaces
- **Key Files**: `supabase.ts`, `booking.ts`, `auth.ts`

### `/scripts` - Build Scripts

- **Purpose**: Custom build, analysis, and utility scripts
- **Key Files**:
  - `validate-standards-compliance.js`
  - `audit-shadcn-components.js`
  - `implement-shadcn-components.js`

## File Count Summary

- **Total Components**: 76 shadcn/ui components installed
- **Active Components**: 36 components in use
- **Unused Components**: 40 components available but not used
- **Pages**: 20+ pages across different route groups
- **Documentation Files**: 15+ comprehensive documentation files
- **Scripts**: 10+ custom build and analysis scripts

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.3.6
- **UI Library**: shadcn/ui with Radix UI primitives
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **Payments**: Stripe 13.11.0
- **State Management**: Zustand 4.4.7, TanStack React Query 5.14.2
- **Forms**: React Hook Form 7.48.2 with Zod 3.22.4
- **Animations**: Framer Motion 10.16.16

## Project Status

- **Version**: 1.1.0
- **Status**: Production-ready with minor optimizations needed
- **Compliance Score**: 78% (Good - Some Issues to Address)
- **Bundle Size**: 2.1MB total, 650KB gzipped
- **Performance**: Good Core Web Vitals scores

## Next Steps

1. Fix remaining build and TypeScript errors
2. Remove unused shadcn components (~200KB savings)
3. Add missing metadata to service pages
4. Implement component lazy loading
5. Deploy to production environment

---

_This structure represents the current state of the Kleaners platform as of
December 19, 2024._
