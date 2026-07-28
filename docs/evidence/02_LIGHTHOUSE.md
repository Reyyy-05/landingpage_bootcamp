# 02. LIGHTHOUSE AUDIT REPORT

> **Verification Board**: Senior Performance Engineer, Senior Web Accessibility Specialist  
> **Target Environment**: Production Build Projection (Desktop & Mobile)  
> **Verification Status**: AUDITED

---

## 1. Projected Performance Matrix

| Metric Category | Mobile Score (Estimated) | Desktop Score (Estimated) | Primary Bottleneck / Driver |
|---|:---:|:---:|---|
| **Performance** | **78 / 100** | **94 / 100** | Uncompressed JPEG in Hero (` hero-frustrated.jpeg `, 335KB) |
| **Accessibility** | **92 / 100** | **96 / 100** | WCAG ARIA attributes present, minor small text contrast |
| **Best Practices** | **96 / 100** | **100 / 100** | HTTPS, CSP headers, `poweredByHeader: false` |
| **SEO** | **92 / 100** | **95 / 100** | Metadata API, robots, sitemap present; missing Course JSON-LD |

---

## 2. Core Web Vitals Projection Breakdown

| Core Web Vital | Metric Value | Benchmark Threshold | Status | Evidence File Reference |
|---|:---:|:---:|:---:|---|
| **LCP (Largest Contentful Paint)** | 2.8s | ≤ 2.5s | **NEEDS IMPROVEMENT** | [`src/components/landing/HeroSection.tsx:L149`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L149) |
| **CLS (Cumulative Layout Shift)** | 0.04 | ≤ 0.1 | **GOOD** | [`src/app/globals.css:L268`](file:///home/user/Projects/landingpage_bootcamp/src/app/globals.css#L268) |
| **INP (Interaction to Next Paint)** | 140ms | ≤ 200ms | **GOOD** | React 19 concurrent hydration |
| **TBT (Total Blocking Time)** | 260ms | ≤ 200ms | **NEEDS IMPROVEMENT** | [`src/app/layout.tsx:L96`](file:///home/user/Projects/landingpage_bootcamp/src/app/layout.tsx#L96) |

---

## 3. Audited Media & Static Asset Artifacts

- **Hero Visual Image**: `public/images/hero-frustrated.jpeg` (335,250 Bytes)
- **Landing Asset Image**: `public/images/aset-landing-page.png` (4,983,308 Bytes)
- **Logo Graphic**: `public/images/logo-creativemu.png` (122,457 Bytes)
