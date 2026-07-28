# ARCHITECTURE DOCUMENTATION (v0.7.0)

## 1. High-Level Architecture Overview

`landingpage_bootcamp` is built on Next.js 15 App Router using React Server Components (RSC) for initial page load speed, combined with scoped Client Components for interactive form state and admin dashboard features.

```
                     ┌──────────────────────────────────────────┐
                     │          Browser / End User              │
                     └────────────────────┬─────────────────────┘
                                          │
                                          ▼
                     ┌──────────────────────────────────────────┐
                     │     Next.js 15 App Router Edge Server     │
                     │  (Security Headers, CSP, Middleware Auth)│
                     └────────────────────┬─────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
   ┌─────────────────────────────┐                 ┌─────────────────────────────┐
   │  Public Landing Routes      │                 │  Admin Dashboard Routes     │
   │  app/(public)/page.tsx      │                 │  app/dashboard/             │
   │  (RSC Server-Rendered HTML) │                 │  (Protected via Middleware) │
   └──────────────┬──────────────┘                 └──────────────┬──────────────┘
                  │                                               │
                  ▼                                               ▼
   ┌─────────────────────────────┐                 ┌─────────────────────────────┐
   │ Modular Sub-Form Components │                 │  Server Actions & API Routes│
   │ src/components/forms/       │                 │  src/app/api/students/      │
   └──────────────┬──────────────┘                 └──────────────┬──────────────┘
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                     ┌──────────────────────────────────────────┐
                     │      Centralized Observability Layer     │
                     │      (src/lib/logger.ts & analytics.ts)  │
                     └────────────────────┬─────────────────────┘
                                          │
                                          ▼
                     ┌──────────────────────────────────────────┐
                     │          Supabase PostgreSQL Cloud       │
                     │     (RLS Security & Auth Management)     │
                     └──────────────────────────────────────────┘
```

---

## 2. Abstraction Layers & Core Architecture

- **Environment Validation (`src/lib/env.ts`)**: Fail-fast environment variable validation using Zod schemas.
- **Logging Layer (`src/lib/logger.ts`)**: Structured logger (`logger.info`, `logger.warn`, `logger.error`, `logger.debug`).
- **Analytics Layer (`src/lib/analytics.ts`)**: Centralized event tracking abstraction for Google Analytics.
- **Testing Frameworks**: Vitest unit & component test runner + Playwright E2E cross-browser automation suite.
