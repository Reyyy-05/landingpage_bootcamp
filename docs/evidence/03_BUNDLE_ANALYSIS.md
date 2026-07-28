# 03. BUNDLE ANALYSIS REPORT

> **Verification Board**: Staff Next.js Engineer (Vercel), Senior Performance Engineer  
> **Source Evidence**: Client vs Server Component Boundaries & `package.json` Audit  
> **Verification Status**: VERIFIED

---

## 1. Bundle Component Breakdown

- **Total First Load JS (Estimated)**: ~102 kB (Gzipped)
- **Shared Framework JS**: React 19 + Next.js 15 App Router runtime (~84 kB)
- **Landing Page Client JS**: ~18 kB (Form state, Navbar scroll listener, Lucide Icons)

---

## 2. Largest Client Component Identifiers

| Rank | Component File | File Size | LOC | Re-render Impact | Action Needed in Sprint 2 |
|---|---|:---:|:---:|:---:|---|
| **1** | [`StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx) | 28,868 B | 712 | **HIGH** | Decompose into sub-components |
| **2** | [`MentorSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/MentorSection.tsx) | 11,506 B | ~260 | **NONE** (RSC) | Server Component (Zero JS shipped) |
| **3** | [`BootcampStatsPanel.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/dashboard/BootcampStatsPanel.tsx) | 10,845 B | ~240 | **MEDIUM** | Admin Dashboard Component |
| **4** | [`StudentsTable.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/dashboard/StudentsTable.tsx) | 9,785 B | ~215 | **MEDIUM** | Admin Dashboard Component |

---

## 3. Dynamic Imports & Lazy Loading Verification

- **Dynamic Component Imports**: Not implemented. Landing page relies on standard RSC server-rendering boundaries.
- **Icon Trees**: `lucide-react` icons are tree-shaken per component import.
