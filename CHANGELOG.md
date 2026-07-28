# CHANGELOG

All notable changes to the **Creativemu Academy Landing Page** (`landingpage_bootcamp`) project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.8.0] - 2026-07-28 - Sprint 4: Product Intelligence, Analytics & Growth Optimization

### Added
- Expanded centralized analytics layer [`src/lib/analytics.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/analytics.ts) with full GA4 & Meta Pixel event mappings:
  - `trackPageView(path)`
  - `trackCTA(ctaName, location)`
  - `trackFormStart(programId)`
  - `trackFormSubmit(programId)`
  - `trackSuccess(programName, price)`
  - `trackVoucherCheck(code, isValid, discountLabel)`
  - `trackWhatsAppRedirect(registrationId)`
  - `trackFAQToggle(question, isOpen)`
  - `trackValidationError(fieldName, errorMessage)`
  - `trackApiError(endpoint, statusCode, errorMessage)`
- Created future experiment, feature flag, and A/B testing abstraction layer [`src/lib/experiments.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/experiments.ts).
- Created Sprint 4 review document [`docs/project_management/13_SPRINT_4_REVIEW.md`](file:///home/user/Projects/landingpage_bootcamp/docs/project_management/13_SPRINT_4_REVIEW.md).

### Changed
- Connected structured validation error analytics to `StudentRegistrationForm.tsx`'s `onError` handler.
- Connected WhatsApp redirect analytics tracking to `SuccessCard` button click handler.
- Connected voucher validation check analytics to `VoucherSection.tsx`.
- Connected FAQ accordion interaction analytics to `FAQSection.tsx`.
- Connected API error tracking to `src/app/api/students/route.ts` catch block.

---

## [0.7.0] - 2026-07-28 - Sprint 3: Quality Engineering, Testing & Observability

### Added
- Implemented **Vitest** unit & component testing framework (`vitest.config.ts`, `vitest.setup.ts`).
- Implemented **Playwright** cross-browser E2E testing framework (`playwright.config.ts`).
- Implemented centralized application logger [`src/lib/logger.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/logger.ts).
- Implemented fail-fast Zod environment variable validation [`src/lib/env.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/env.ts).

---

## [0.3.0] - 2026-07-28 - Sprint 2: Performance Optimization & Architecture Improvement

### Added
- Created sub-component form structure under `src/components/forms/`.
- Implemented reusable React Error Boundary component [`src/components/shared/ErrorBoundary.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/shared/ErrorBoundary.tsx).
