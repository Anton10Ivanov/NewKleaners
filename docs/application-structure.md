# Kleaners Project Structure

**Generated:** October 7, 2025 **Project:** Kleaners - Professional Cleaning
Services Platform **Version:** 1.1.0

## Root Directory Structure

```
NewKleaners/
├── app/                                   # Next.js App Router pages
│   ├── about/
│   │   └── page.tsx
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── book/
│   │   └── page.tsx
│   ├── booking/
│   │   └── confirmation/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── providers/
│   │   └── page.tsx
│   ├── services/                           # Service listing pages
│   │   ├── commercial/
│   │   │   └── page.tsx
│   │   ├── outdoor/
│   │   │   └── page.tsx
│   │   ├── residential/
│   │   │   └── page.tsx
│   │   ├── specialized/
│   │   │   └── page.tsx
│   │   ├── DeepCleaning.tsx
│   │   ├── HomeCleaning.tsx
│   │   ├── MoveInOut.tsx
│   │   └── OfficeCleaning.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/                             # Reusable UI components
│   ├── booking/
│   │   ├── BookingFlowExample.tsx
│   │   └── steps/
│   │       ├── EstimateStep.tsx
│   │       ├── FrequencySelectionStep.tsx
│   │       ├── PackageSelectionStep.tsx
│   │       ├── PaymentStep.tsx
│   │       ├── PropertyDetailsStep.tsx
│   │       ├── SchedulingStep.tsx
│   │       └── ServiceSelectionStep.tsx
│   ├── features/
│   │   ├── cta/CTA.tsx
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   └── LogoBar.tsx
│   │   ├── how-it-works/HowItWorks.tsx
│   │   └── services/
│   │       ├── ServiceCategoryCard.tsx
│   │       └── ServicesOverview.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── UnifiedContainer.tsx
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   └── Providers.tsx
│   └── ui/                                 # shadcn/ui base components
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── docs/                                    # Documentation
│   ├── application-structure.md
│   ├── architecture.md
│   ├── color-system.md
│   ├── component-architecture.md
│   ├── container-system.md
│   ├── description.md
│   ├── design-principles.md
│   ├── DEVELOPMENT.md
│   ├── icon-system-standards.md
│   ├── MIGRATION_SUMMARY.md
│   ├── overview.md
│   ├── performance-guidelines.md
│   ├── QUALITY_MONITORING.md
│   ├── security-architecture.md
│   ├── shadcn-implementation-guide.md
│   ├── state-management.md
│   ├── technology-stack.md
│   ├── typography.md
│   └── UI_UX_STANDARDS.md
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── colors.ts
│   ├── supabase.ts
│   └── utils.ts
├── mcp-server/                              # MCP server (dev tooling)
│   ├── dist/
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── shadcn-mcp-server.ts
│   └── tsconfig.json
├── public/
│   └── images/
│       ├── AL-logo.webp
│       ├── HWK-logo.webp
│       ├── livingroom.webp
│       ├── maps.webp
│       ├── pixabay-commercial.webp
│       ├── pixabay-industrial.webp
│       ├── pixabay-outdoor.webp
│       └── pixabay-residential.webp
├── scripts/
│   ├── build/
│   ├── color-migration/
│   │   ├── contrast-validator.ts
│   │   ├── migrate-simple.ts
│   │   ├── migrate.ts
│   │   ├── simple-migrate.ts
│   │   └── utils.ts
│   ├── config-manager.js
│   ├── dev/
│   │   ├── setup-dev.js
│   │   └── start-dev.js
│   └── quality/
│       ├── cleanup-unused.js
│       └── quality-check.js
├── tests/
│   ├── e2e/
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── server.ts
│   ├── example.test.ts
│   └── setup.ts
├── types/
│   ├── bookingFlow.ts
│   ├── culori.d.ts
│   ├── index.ts
│   └── supabase.ts
├── COLOR_MIGRATION_SUMMARY.md
├── CONTRAST_IMPROVEMENTS.md
├── MCP_SERVER_EXPANSION_SUMMARY.md
├── MainBookingFlow.tsx
├── components.json
├── config/
│   ├── audit-ci.json
│   ├── index.js
│   ├── knip.json
│   ├── lighthouserc.js
│   ├── playwright.config.ts
│   ├── renovate.json
│   └── vitest.config.ts
├── env.example
├── eslint.config.js
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

## Key Directories Explained

### `/app` - Next.js App Router

- **Purpose**: All pages and layouts using Next.js App Router
- **Key Files**: `layout.tsx`, `page.tsx`, `globals.css`, route folders under
  `services/`

### `/components` - UI Components

- **Purpose**: Reusable components organized by feature
- **Structure**:
  - `ui/` - shadcn/ui base components
  - `layout/` - Layout primitives including `UnifiedContainer`
  - `features/` - Feature-specific UIs (hero, services, etc.)
  - `booking/` - Multi-step booking flow components

### `/docs` - Documentation

- **Purpose**: Project documentation (architecture, standards, guides)
- **Note**: Backup/duplicate docs removed to avoid redundancy

### `/lib` - Utilities

- **Purpose**: Shared utilities and client configs
- **Key Files**: `utils.ts`, `supabase.ts`, `colors.ts`

### `/scripts` - Tooling

- **Purpose**: Development, quality, and migration scripts

### `/types` - TypeScript Definitions

- **Purpose**: Centralized types and interfaces

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe
- **State**: Zustand, React Query
- **Forms**: React Hook Form + Zod

## Status

- **Version**: 1.1.0
- **Status**: Active development
- **Notes**: Documentation aligned with current repository layout

---

_This structure reflects the current state of the Kleaners platform as of
October 2025._
