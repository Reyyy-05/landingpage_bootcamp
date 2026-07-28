# TECHNICAL DEBT REGISTER

## 1. Overview
This register tracks active, resolved, and deferred technical debt within the `landingpage_bootcamp` project.

---

## 2. Resolved Technical Debt (Sprint 1, Sprint 2 & Sprint 3)

| Debt Identifier | Category | Resolution Detail | Resolved In |
|---|---|---|:---:|
| **TD-SEC-01** | Security | Exposed `.env` password string removed & `.env.example` created | Sprint 1 |
| **TD-SEC-02** | Security | Security headers (CSP, HSTS, X-Frame-Options: DENY) added | Sprint 1 |
| **TD-ARCH-01** | Architecture | Monolithic `StudentRegistrationForm.tsx` (712 LOC) refactored into `src/components/forms/` sub-components (280 LOC) | Sprint 2 |
| **TD-PERF-01** | Performance | Migrated all `<img>` tags (`HeroSection`, `Mentor`, `Trusted`) to Next.js `<Image />` | Sprint 2 |
| **TD-PERF-02** | Performance | Dynamic code splitting (`next/dynamic`) added for below-the-fold components | Sprint 2 |
| **TD-RES-01** | Resilience | Implemented `ErrorBoundary.tsx`, `app/error.tsx`, and `app/loading.tsx` fallbacks | Sprint 2 |
| **TD-TEST-01** | Testing | Set up Vitest unit & component test suite + Playwright E2E scenarios | Sprint 3 |
| **TD-OBS-01** | Observability | Implemented centralized `logger.ts` and `analytics.ts` layers | Sprint 3 |
| **TD-ENV-01** | Security | Implemented fail-fast Zod environment variable parser (`src/lib/env.ts`) | Sprint 3 |

---

## 3. Deferred Technical Debt (Backlog)

| Debt Identifier | Category | Description | Deferred Reason | Priority |
|---|---|---|---|:---:|
| **TD-FORM-02** | UX / CRO | 14-field single-step registration form (progressive 2-step disclosure) | Requires product design sign-off for multi-step UI flow | P2 |
