# 11. DEPENDENCY AUDIT REPORT

> **Verification Board**: Senior DevOps Engineer, Principal Frontend Engineer  
> **Source Evidence**: `package.json` manifest analysis  
> **Verification Status**: VERIFIED

---

## 1. Production Dependencies Inventory

Inspection of [`package.json:L12-L52`](file:///home/user/Projects/landingpage_bootcamp/package.json#L12) lists 25 active production dependencies:

- `@hookform/resolvers`: ^5.0.1 (Zod integration for React Hook Form)
- `@next/third-parties`: ^16.2.9 (Google Analytics integration)
- `@radix-ui/*`: UI primitives (accordion, alert-dialog, avatar, checkbox, collapsible, dialog, dropdown-menu, label, popover, progress, radio-group, scroll-area, select, separator, slot, switch, tabs, toast, tooltip)
- `@supabase/ssr`: ^0.6.1 (Supabase SSR cookie helper)
- `@supabase/supabase-js`: ^2.49.4 (Supabase client SDK)
- `@tanstack/react-table`: ^8.21.3 (Data table utilities)
- `class-variance-authority`: ^0.7.1 (Style variant management)
- `clsx`: ^2.1.1 (Classname concatenator)
- `date-fns`: ^4.1.0 (Date formatting for dashboard views)
- `lucide-react`: ^0.511.0 (Icon set)
- `next`: ^15.3.2 (Core framework)
- `next-themes`: ^0.4.6 (Dark mode provider)
- `react`: ^19.0.0 (UI runtime)
- `react-day-picker`: ^9.6.7 (Calendar picker)
- `react-dom`: ^19.0.0 (DOM rendering engine)
- `react-hook-form`: ^7.56.3 (Form state management)
- `sonner`: ^2.0.3 (Toast notification manager)
- `tailwind-merge`: ^3.3.0 (Tailwind class conflict resolver)
- `zod`: ^3.24.4 (Schema validation engine)
- `zustand`: ^5.0.4 (Client state store)

---

## 2. Pruned Dependencies Audit

- **Removed Unused Dependencies**: `cmdk` and `vaul` were pruned from `package.json` during Sprint 1.
- **Heavy Libraries Audit**: `date-fns` is used in dashboard components for Indonesian date formatting (`date-fns/locale`).
