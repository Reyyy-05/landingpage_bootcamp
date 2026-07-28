# 02. UI/UX REVIEW

## 1. Interface & Visual Design Evaluation

This review evaluates the UI/UX implementation of the landing page against established human interface guidelines (Nielsen Norman Group 10 Usability Heuristics, Apple HIG spacing principles, Material Design typography scale, and SaaS landing page design benchmarks).

---

## 2. Evidence-Based Findings

### Finding UI-01: Typography Scale Inconsistency & Custom Utility Class Collisions
- **File Reference**: [`src/app/globals.css`](file:///home/user/Projects/landingpage_bootcamp/src/app/globals.css#L44-L46) & [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L74)
- **Root Cause**: Custom CSS variables `--font-display` (`Syne`) and `--font-sans` (`Plus Jakarta Sans`) are declared, but font sizes are arbitrarily hardcoded in Tailwind utilities (`text-3xl md:text-5xl`) rather than using semantic heading classes (`.heading-xl`, `.heading-lg`) defined in `globals.css`.
- **Impact**: Inconsistent heading scaling across viewport sizes and broken visual hierarchy when dynamic content scales.
- **Recommended Solution**: Enforce semantic typographic scale classes (`.heading-xl`, `.heading-lg`, `.heading-md`) systematically across all landing components.

### Finding UI-02: Fixed Height and Whitespace Gaps on Mobile Viewports
- **File Reference**: [`src/app/globals.css`](file:///home/user/Projects/landingpage_bootcamp/src/app/globals.css#L268-L272)
- **Root Cause**: `.hero-section` specifies `min-height: calc(100vh - 70px)` with `padding-top: 40px; padding-bottom: 60px;`.
- **Impact**: On short mobile viewports (e.g. 667px height landscape or mobile webview headers), content overflows the viewport boundary, forcing double scrollbars or awkward vertical gaps between the Hero Section and `TrustedSection`.
- **Recommended Solution**: Replace fixed `min-height: calc(100vh - 70px)` with fluid padding bounds (`py-12 md:py-20`).

### Finding UI-03: Lack of Interactive Feedback States on Secondary CTAs
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L134-L141)
- **Root Cause**: Secondary CTA button `Konsultasi Program` utilizes `.btn-secondary` class which lacks explicit active/pressed visual feedback (`active:scale-[0.98]`).
- **Impact**: Touch device users receive weak tactile confirmation when tapping the WhatsApp consultation link.
- **Recommended Solution**: Add explicit `:active` state transforms and focus ring indicators to all secondary CTA elements.

### Finding UI-04: Card Elevation & Hover State Jitter
- **File Reference**: [`src/components/landing/FeaturesSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/FeaturesSection.tsx#L1-L80) & [`src/app/globals.css`](file:///home/user/Projects/landingpage_bootcamp/src/app/globals.css#L171-L184)
- **Root Cause**: `.card-feature:hover` applies `transform: translateY(-2px)` combined with `border-color` change on hover without GPU acceleration hint (`will-change: transform`).
- **Impact**: Micro-stuttering and repaint flickering on lower-tier mobile GPUs during fast scrolling.
- **Recommended Solution**: Add `will-change: transform` and `transform-gpu` to hovered feature card containers.

---

## 3. Heuristic Usability Rating

| Heuristic | Rating (1–5) | Observation |
|---|:---:|---|
| **Visibility of System Status** | 4 / 5 | Clear registration status updates via Toast notifications |
| **Match Between System & Real World** | 4 / 5 | Clear Indonesian domain vocabulary used |
| **User Control & Freedom** | 3 / 5 | Modal registration dialog cannot be minimized, only closed |
| **Consistency & Standards** | 4 / 5 | Unified color palette (`violet-600` primary) |
| **Error Prevention** | 4 / 5 | Client-side Zod validation prevents invalid submissions |
| **Recognition Rather Than Recall** | 4 / 5 | Clear pricing, batch information, and curriculum roadmap |
| **Flexibility & Efficiency of Use** | 3 / 5 | Single long registration form on `/daftar` page |
| **Aesthetic & Minimalist Design** | 4 / 5 | Modern glassmorphism accents and cohesive card layouts |
