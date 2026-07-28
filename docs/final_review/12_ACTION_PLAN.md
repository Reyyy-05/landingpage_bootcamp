# 12. REMEDIATION ACTION PLAN

## 1. Action Plan Framework
This document defines an actionable, prioritized roadmap for resolving all findings identified in the audit. Execution is organized into 4 distinct phases based on severity and risk mitigation impact.

---

## 2. Remediation Roadmap

### Phase 1: Critical Security & Credential Containment (P0 — Immediate)
1. **Rotate Supabase PostgreSQL Password**
   - Reset database password in Supabase Project Settings.
   - Remove plaintext `DATABASE_URL` from local `.env`.
   - Ensure `.env` is listed in `.gitignore`.
   - Move secrets exclusively to Vercel Environment Variable Manager.

2. **Fix Type Safety & Admin Client Guard**
   - Replace `any` type casting in [`src/app/api/students/route.ts`](file:///home/user/Projects/landingpage_bootcamp/src/app/api/students/route.ts#L100).
   - Add explicit runtime verification for `SUPABASE_SERVICE_ROLE_KEY`.

---

### Phase 2: High-Impact Performance & Image Optimization (P1 — Next Release)
1. **Convert Native `<img>` Tags to `next/image`**
   - Replace `<img src="/images/hero-frustrated.jpeg" ... />` in [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L150) with Next.js `<Image priority ... />`.
   - Convert static JPEG assets to WebP format to reduce LCP image weight by 80%.

2. **Standardize Canonical Domain Metadata**
   - Align `metadataBase` in [`src/app/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/layout.tsx#L41) with production domain `https://creativemuacademy.com`.

---

### Phase 3: CRO & Accessibility Improvements (P2 — Next Sprint)
1. **Implement Mobile Floating CTA Bar**
   - Add persistent bottom navigation bar for mobile viewports to maintain registration conversion visibility.

2. **Add Form Validation ARIA Announcements**
   - Attach `aria-describedby` and `aria-live="polite"` to form error labels in [`StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx).

---

### Phase 4: Testing & Refactoring (P3 — Backlog)
1. **Decompose Monolithic Registration Form**
   - Extract personal information, academic details, and voucher selection into modular React components.
2. **Setup Vitest & Playwright Test Suites**
   - Implement unit tests for Zod validation schemas and end-to-end integration tests for the registration flow.
