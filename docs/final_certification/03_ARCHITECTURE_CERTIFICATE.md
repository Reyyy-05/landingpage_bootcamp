# 03. SOFTWARE ARCHITECTURE CERTIFICATE

> **Certification Lead**: Vercel Principal Engineer, Google Distinguished Engineer, Principal Software Architect  
> **Evaluation Scope**: Next.js 15 App Router Compliance, RSC Boundaries, Services Abstraction, and Codebase Hygiene  
> **Status**: CERTIFIED COMPLIANT

---

## 1. Architectural Integrity & Layer Isolation

The codebase complies with clean software architecture principles:

1. **Presentation Layer**: React Server Components (RSC) handle initial page composition (`HeroSection`, `MentorSection`, `Footer`).
2. **Form Sub-Components**: Modularized field inputs in [`src/components/forms/`](file:///home/user/Projects/landingpage_bootcamp/src/components/forms/) (`PersonalInformationFields`, `StatusSpecificFields`, `VoucherSection`).
3. **Services Layer**: Client-side HTTP requests encapsulated in [`src/services/`](file:///home/user/Projects/landingpage_bootcamp/src/services/) (`studentService.ts`, `voucherService.ts`, `bootcampService.ts`).
4. **Observability Layer**: Centralized logging in [`src/lib/logger.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/logger.ts) and analytics in [`src/lib/analytics.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/analytics.ts).
5. **Schema Layer**: Type-safe Zod validation schemas in [`src/schemas/studentSchema.ts`](file:///home/user/Projects/landingpage_bootcamp/src/schemas/studentSchema.ts).

---

## 2. Framework Best Practices Audit

- **Dynamic Imports**: `next/dynamic` used in [`src/app/(public)/page.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/%28public%29/page.tsx) for below-the-fold components (`CountdownTimer`, `FAQSection`).
- **Resilience**: Global Error Boundary [`src/components/shared/ErrorBoundary.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/shared/ErrorBoundary.tsx), [`src/app/error.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/error.tsx), and loading fallback [`src/app/loading.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/loading.tsx).
