# PROJECT ROADMAP

---

## Release Milestones

### Sprint 0: Audit Baseline (COMPLETED)
- Comprehensive technical audit across Security, Performance, Next.js, React, SEO, and Accessibility.

### Sprint 1: Security & Production Foundation (COMPLETED)
- Credentials isolation (`.gitignore`, `.env.example`).
- Security headers (CSP, HSTS, X-Frame-Options: DENY).
- Middleware protection (`/dashboard/*`, `/admin`).

### Sprint 2: Performance Optimization & Architecture Improvement (COMPLETED)
- Refactored `StudentRegistrationForm.tsx` (712 LOC -> 280 LOC).
- Extracted sub-components into `src/components/forms/`.
- Migrated native `<img>` tags to `next/image` (`<Image />`).
- Implemented dynamic code splitting (`next/dynamic`) in `page.tsx`.
- Implemented Error Boundaries (`ErrorBoundary.tsx`, `app/error.tsx`, `app/loading.tsx`).

### Sprint 3: Testing Automation & CRO Refinements (PLANNED)
- Automated testing suite (Vitest & Playwright).
- Progressive 2-Step Registration Form flow.
- Mobile persistent floating CTA.
- JSON-LD Course schema for Rich Results.
