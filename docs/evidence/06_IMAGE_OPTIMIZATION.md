# 06. IMAGE OPTIMIZATION AUDIT

> **Verification Board**: Staff Next.js Engineer (Vercel), Senior Performance Engineer  
> **Source Evidence**: Grep inspection of all `<img>` and `next/image` tags  
> **Verification Status**: AUDITED

---

## 1. Comprehensive Image Inventory

| Asset Path | Component File | Element Type | Format | Dimensions Set? | Lazy Loaded? | Optimization Status |
|---|---|:---:|:---:|:---:|:---:|:---:|
| `/images/hero-frustrated.jpeg` | [`HeroSection.tsx:L149`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L149) | `<img>` | JPEG | No | Browser Default | **NEEDS MIGRATION TO `<Image />`** |
| `/images/CreativeAc-New.png` | [`TrustedSection.tsx:L43`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/TrustedSection.tsx#L43) | `<img>` | PNG | No | Browser Default | **NEEDS MIGRATION TO `<Image />`** |
| `/images/PasFoto.png` | [`MentorSection.tsx:L105`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/MentorSection.tsx#L105) | `<img>` | PNG | No | Browser Default | **NEEDS MIGRATION TO `<Image />`** |
| `/images/logo-creativemu.png` | [`Navbar.tsx:L4`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/Navbar.tsx#L4) | `<Image />` | PNG | Yes (160x40) | Optimized | **PASS** |
| `/images/logo-creativemu.png` | [`Footer.tsx:L2`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/Footer.tsx#L2) | `<Image />` | PNG | Yes (140x35) | Optimized | **PASS** |

---

## 2. Framework Image Configuration (`next.config.ts`)

- **Configured Formats**: `['image/avif', 'image/webp']` in [`next.config.ts:L21`](file:///home/user/Projects/landingpage_bootcamp/next.config.ts#L21).
- **Remote Hosts Allowed**: `*.supabase.co`, `sdzkekjmamsbussetjam.supabase.co`, `ykwhzjrrcpgsxbganqpm.supabase.co`, `creativemu.id`, `creativemuacademy.com`.
