# TECHNICAL DEBT & RISK ANALYSIS

> **Post-Sprint 2 Technical Debt Inventory**

---

## 1. Resolved Debt Items in Sprint 2

| ID | Category | Description | Status |
|---|---|---|:---:|
| **TD-01** | Architecture | Monolithic `StudentRegistrationForm` (712 LOC) broken into `src/components/forms/` sub-components (280 LOC) | **RESOLVED** |
| **TD-02** | Performance | Native `<img>` tags in `HeroSection`, `MentorSection`, and `TrustedSection` migrated to Next.js `<Image />` | **RESOLVED** |
| **TD-03** | Performance | Dynamic code-splitting (`next/dynamic`) added for `CountdownTimer` and `FAQSection` | **RESOLVED** |
| **TD-04** | Resilience | Error Boundary (`ErrorBoundary.tsx`, `error.tsx`, `loading.tsx`) fallbacks implemented | **RESOLVED** |

---

## 2. Deferred Debt Items (Target for Sprint 3+)

| ID | Category | Description | Target Sprint | Priority |
|---|---|---|:---:|:---:|
| **TD-05** | Testing | Zero automated unit / E2E test coverage | Sprint 3 | P2 |
| **TD-06** | UX / CRO | 14-field single-step registration form (progressive 2-step disclosure) | Sprint 3 | P2 |
