# 10. COMPONENT ARCHITECTURE & DECOMPOSITION AUDIT

> **Verification Board**: Principal Frontend Engineer (Google), Staff Next.js Engineer (Vercel)  
> **Source Evidence**: File tree count & LOC metric inspection  
> **Verification Status**: VERIFIED

---

## 1. Quantitative Component Metrics

- **Total Component Count**: 41 components
- **Client Components (`"use client"`)**: 26 components
- **Server Components (RSC)**: 18 components / pages
- **Largest Component File**: [`src/components/landing/StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx) (712 LOC, 28,868 Bytes)
- **Second Largest Component File**: [`src/components/landing/MentorSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/MentorSection.tsx) (260 LOC, 11,506 Bytes)

---

## 2. Directory Architecture Breakdown

```
src/
├── app/                  # App Router pages, actions, & API endpoints
│   ├── (auth)/           # Admin authentication routes (/admin/login)
│   ├── (public)/         # Public landing page routes (/ and /daftar)
│   ├── actions/          # Server Actions (students, bootcamps, vouchers, auth)
│   ├── api/              # API Route Handlers
│   ├── dashboard/        # Admin Dashboard SPA pages
│   ├── globals.css       # Design tokens, keyframe animations, typography
│   ├── layout.tsx        # Root HTML layout with fonts & analytics
│   ├── robots.ts         # Dynamic robots.txt builder
│   └── sitemap.ts        # Dynamic sitemap.xml builder
├── components/           # React UI components
│   ├── dashboard/        # Admin UI primitives & data tables
│   ├── landing/          # Public landing page section components
│   ├── organisms/        # Complex landing page organisms
│   ├── shared/           # Cross-cutting animation provider
│   └── ui/               # 15 Shadcn UI primitive components
├── constants/            # Static data constants
├── hooks/                # Custom React client hooks
├── lib/                  # Utility functions & Supabase clients
├── schemas/              # Zod validation schemas (studentSchema.ts)
└── types/                # TypeScript type definitions
```
