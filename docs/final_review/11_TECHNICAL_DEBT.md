# 11. TECHNICAL DEBT REGISTER

## 1. Executive Summary
This document categorizes accumulated technical debt within the `landingpage_bootcamp` project across architectural, testing, operational, and documentation layers.

---

## 2. Categorized Technical Debt Inventory

### Category A: Testing & Automation Debt (Severity: HIGH)
- **Item**: **Zero Automated Test Coverage (0% Test Suite)**
- **Evidence**: `package.json` contains no test runner (`jest`, `vitest`, or `playwright`). No test files (`*.test.ts`, `*.spec.ts`) exist in the repository.
- **Impact**: High risk of regression failures during feature additions, schema migrations, or dependency updates.
- **Refactoring Effort**: 3–5 days (Implement Vitest unit tests for validation schemas & Playwright E2E tests for registration funnel).

### Category B: Architectural Debt (Severity: MEDIUM)
- **Item**: **Monolithic Client Component Form State**
- **Evidence**: [`src/components/landing/StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx#L1-L712)
- **Impact**: Inhibits code reuse, increases bundle size, complicates state debugging.
- **Refactoring Effort**: 1–2 days (Extract sub-components and modularize Zod validation handlers).

### Category C: Environment & Configuration Debt (Severity: CRITICAL)
- **Item**: **Unchecked Database Credential Storage**
- **Evidence**: [`.env`](file:///home/user/Projects/landingpage_bootcamp/.env#L2) containing plaintext password string.
- **Impact**: Security vulnerability exposure.
- **Refactoring Effort**: 1 hour (Rotate credentials, migrate to Vercel Environment Variables).

---

## 3. Debt Prioritization Matrix

| Debt Item | Impact | Effort | Priority | Target Sprint |
|---|:---:|:---:|:---:|:---:|
| Rotate & Remove Plaintext DB Password | **CRITICAL** | Low (1h) | **P0** | Immediate |
| Add Image Optimization (`next/image`) | High | Low (2h) | **P1** | Next Release |
| Implement Automated Testing Suite | High | Medium (3d) | **P1** | Next Sprint |
| Refactor Monolithic Registration Form | Medium | Medium (2d) | **P2** | Backlog |
| Standardize Canonical Domain URL | Medium | Low (1h) | **P2** | Next Release |
