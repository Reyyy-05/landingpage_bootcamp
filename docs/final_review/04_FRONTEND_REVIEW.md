# 04. FRONTEND ENGINEERING REVIEW

## 1. Architecture & Component Quality Overview
This document assesses frontend implementation standards, component architecture, state management patterns, hook utilization, and React performance practices within the `src/components` tree.

---

## 2. Key Findings

### Finding FE-01: Monolithic Component Architecture in Registration Form
- **File Reference**: [`src/components/landing/StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx#L1-L712)
- **Root Cause**: A single component handles 14 form fields, voucher validation RPC triggers, status conditional logic, modal confirmation rendering, and direct WhatsApp redirect logic.
- **Impact**: Any state change (e.g. typing a single character in the `full_name` input) triggers a complete re-render tree of all 712 lines of JSX including modal portals and select dropdowns.
- **Recommended Solution**: Break form into isolated field group components (`PersonalDetailsFields`, `AcademicDetailsFields`, `VoucherInputSection`) wrapped in `React.memo` or scoped context.

### Finding FE-02: Over-reliance on Client-Side Context Provider for Animations
- **File Reference**: [`src/components/shared/ScrollAnimationProvider.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/shared/ScrollAnimationProvider.tsx#L1-L20) & [`src/app/(public)/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/(public)/layout.tsx#L19)
- **Root Cause**: `PublicLayout` wraps all public pages in `ScrollAnimationProvider`, forcing client-side hydration for the layout root.
- **Impact**: Reduces server component boundary effectiveness for static landing page content.
- **Recommended Solution**: Replace global `ScrollAnimationProvider` with CSS `view-timeline` or scope `IntersectionObserver` hooks to specific interactive sections.

### Finding FE-03: Redundant Component Class Name Merging Logic
- **File Reference**: [`src/lib/utils.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/utils.ts#L1-L10) & [`src/components/ui/button.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/ui/button.tsx#L1-L50)
- **Root Cause**: Multiple Shadcn UI primitives re-declare class merging wrappers (`cn(clsx(...))`) without centralized memoization.
- **Impact**: Small unnecessary GC object allocations during rapid list re-renders.
- **Recommended Solution**: Standardize utility imports from `@/lib/utils`.

---

## 3. Component Hierarchy & Complexity Breakdown

| Component | Lines of Code | Type | Re-render Risk | Recommendation |
|---|:---:|:---:|:---:|---|
| `StudentRegistrationForm.tsx` | 712 | Client | **HIGH** | Refactor into 3 sub-components |
| `HeroSection.tsx` | 204 | Server | Low | Keep Server Component |
| `BootcampStatsPanel.tsx` | 240 | Client | Medium | Memoize table calculations |
| `StudentsTable.tsx` | 215 | Client | Medium | Virtualize rows for >100 records |
| `Navbar.tsx` | 120 | Client | Low | Good scroll state handling |
