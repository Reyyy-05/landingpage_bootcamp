# ARCHITECTURE ANALYSIS

> **Post-Sprint 2 Architectural Evaluation**  
> **Source Evidence**: Component tree, imports, and App Router structure

---

## 1. Component Modularization & Sub-Forms

In Sprint 2, the monolithic `StudentRegistrationForm.tsx` (712 LOC) was refactored into focused, domain-bounded sub-components inside `src/components/forms/`:

```
src/components/forms/
├── PersonalInformationFields.tsx  # Full Name, Email, Phone/WA, Birth Date, Address, Gender, Instagram
├── StatusSpecificFields.tsx       # Student Status & Conditional Fields (School/University/Workplace)
└── VoucherSection.tsx             # Voucher Code Input & Asynchronous RPC Validation
```

- **Separation of Concerns**: Form section components only handle field layout and validation message bindings.
- **Form State Scope**: React Hook Form `control`, `register`, and `errors` are explicitly typed and passed down.

---

## 2. Server vs Client Component Boundaries

```
[Server Component Boundary] (Zero Client JS)
  ├── app/(public)/page.tsx
  ├── HeroSection.tsx (Fetches active bootcamp server-side)
  ├── ProblemSection.tsx
  ├── AgitationSection.tsx
  ├── FeaturesSection.tsx
  ├── RoadmapSection.tsx
  ├── MentorSection.tsx
  ├── ValueStackSection.tsx
  └── Footer.tsx

[Client Component Boundary] ("use client")
  ├── StudentRegistrationForm.tsx (Form state & validation)
  ├── PersonalInformationFields.tsx
  ├── StatusSpecificFields.tsx
  ├── VoucherSection.tsx
  ├── Navbar.tsx (Scroll state & mobile sheet)
  ├── CountdownTimer.tsx (Loaded via next/dynamic)
  └── FAQSection.tsx (Loaded via next/dynamic)
```
