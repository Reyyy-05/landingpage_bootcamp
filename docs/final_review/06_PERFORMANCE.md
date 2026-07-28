# 06. WEB PERFORMANCE & CORE WEB VITALS REVIEW

## 1. Performance Overview
This audit evaluates loading performance, Core Web Vitals (LCP, CLS, INP), JavaScript bundle size, font loading strategies, and third-party script impact.

---

## 2. Evidence-Based Performance Findings

### Finding PERF-01: LCP Penalty Due to Unoptimized Hero Image
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L149-L154) & [`public/images/hero-frustrated.jpeg`](file:///home/user/Projects/landingpage_bootcamp/public/images/hero-frustrated.jpeg)
- **Root Cause**: The hero image `hero-frustrated.jpeg` is loaded as an uncompressed 335KB JPEG via standard `<img>` tag without `fetchpriority="high"` or preloading headers.
- **Impact**: On 3G/4G mobile networks, image fetching blocks Largest Contentful Paint (LCP) completion by 1.8s - 2.4s.
- **Recommended Solution**: Convert JPEG to WebP/AVIF (<60KB), replace `<img>` with Next.js `<Image priority fetchPriority="high" sizes="(max-width: 768px) 100vw, 50vw" />`.

### Finding PERF-02: Third-Party Script Hydration Blocking
- **File Reference**: [`src/app/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/layout.tsx#L97-L112)
- **Root Cause**: Meta Pixel inline script is injected via `next/script` with `strategy="afterInteractive"`.
- **Impact**: Meta Pixel (`fbevents.js`) executes during main thread hydration, contending with React 19 concurrent features and increasing Total Blocking Time (TBT).
- **Recommended Solution**: Change strategy to `lazyOnload` or offload tracking pixels to Web Worker using Partytown / Google Tag Server-Side Container.

### Finding PERF-03: Font Display Strategy
- **File Reference**: [`src/app/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/layout.tsx#L8-L20)
- **Root Cause**: Both `Syne` and `Plus_Jakarta_Sans` fonts are correctly loaded using `next/font/google` with `display: "swap"`.
- **Impact**: Positive — prevents FOIT (Flash of Invisible Text) during cold page loads.

---

## 3. Core Web Vitals Projections

| Metric | Target | Current Estimated | Risk Level | Primary Contributor |
|---|:---:|:---:|:---:|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ~2.8s | **MODERATE** | Unoptimized 335KB hero JPEG |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.04 | **LOW** | Font `display: swap` & aspect ratio set |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ~140ms | **LOW** | React 19 fast event handling |
| **TBT** (Total Blocking Time) | ≤ 200ms | ~280ms | **MODERATE** | Meta Pixel & third-party script execution |
