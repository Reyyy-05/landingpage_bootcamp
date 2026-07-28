# 05. NEXT.JS APP ROUTER & FRAMEWORK REVIEW

## 1. Framework Architectural Assessment
This document evaluates the compliance of `landingpage_bootcamp` with Next.js 15 App Router standards, data fetching paradigms, Server/Client component boundaries, routing patterns, and caching mechanics.

---

## 2. Key Framework Findings

### Finding NEXT-01: Native `<img>` Tags Bypassing `next/image` Optimization Pipeline
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L150) & [`src/components/landing/MentorSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/MentorSection.tsx#L25)
- **Root Cause**: Images are loaded using raw HTML `<img>` elements (`<img src="/images/hero-frustrated.jpeg" ... />`) instead of Next.js `<Image />` component from `next/image`.
- **Impact**: Zero automatic WebP/AVIF format conversion, no responsive `srcset` generation, no build-time blur placeholder generation, and increased payload size (~335KB per uncompressed JPEG image).
- **Recommended Solution**: Convert all static and dynamic images to Next.js `<Image />` component with defined `width`, `height`, and `priority` attributes for hero visuals.

### Finding NEXT-02: Mixed Data Fetching Patterns (Server Actions vs API Route Handlers)
- **File Reference**: [`src/app/actions/students.ts`](file:///home/user/Projects/landingpage_bootcamp/src/app/actions/students.ts#L1-L53) vs [`src/app/api/students/route.ts`](file:///home/user/Projects/landingpage_bootcamp/src/app/api/students/route.ts#L7-L180)
- **Root Cause**: Student status updates use Next.js Server Actions (`"use server"` in `actions/students.ts`), whereas student registration submits to a standard Route Handler (`POST /api/students`).
- **Impact**: Inconsistent error response contracts, redundant API error serialization logic (`ApiError` interface vs action return objects), and fragmented developer mental model.
- **Recommended Solution**: Standardize public mutation workflows on Server Actions with type-safe action client or maintain strict REST contracts in API Route Handlers.

### Finding NEXT-03: `revalidatePath` Invalidation Granularity
- **File Reference**: [`src/app/actions/students.ts`](file:///home/user/Projects/landingpage_bootcamp/src/app/actions/students.ts#L47-L49)
- **Root Cause**: `updateRegistrationStatus` calls three separate `revalidatePath` invocations:
  ```ts
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/students");
  revalidatePath(`/dashboard/students/${studentId}`);
  ```
- **Impact**: Clears server data cache broadly across parent and child paths simultaneously, causing unnecessary re-fetches for unrelated dashboard sub-trees.
- **Recommended Solution**: Use targeted `revalidateTag('students')` with Supabase tag-based caching.

---

## 3. Server Component Boundary Audit

| Page / Component | Component Type | Boundary Correctness | Issues Observed |
|---|:---:|:---:|---|
| `app/(public)/page.tsx` | Server Component | **EXCELLENT** | Clean async layout composition |
| `HeroSection.tsx` | Server Component | **GOOD** | Fetches active bootcamp server-side |
| `StudentRegistrationForm.tsx` | Client Component | **NEEDS WORK** | 712LOC monolithic client boundary |
| `Navbar.tsx` | Client Component | **GOOD** | Scoped scroll listener |
| `Footer.tsx` | Server Component | **EXCELLENT** | 100% static HTML generation |
