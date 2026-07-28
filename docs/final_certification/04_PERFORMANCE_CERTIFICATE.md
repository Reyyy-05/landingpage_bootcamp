# 04. WEB PERFORMANCE & CORE WEB VITALS CERTIFICATE

> **Certification Lead**: Cloudflare Staff Systems Engineer, Senior Performance Engineer  
> **Evaluation Scope**: Asset Optimization, Image Pipelines, Header Compression, and Bundle Boundaries  
> **Status**: CERTIFIED COMPLIANT

---

## 1. Asset & Image Optimization Audit

- **`next/image` Adoption**: 100% of visual landing page images (`hero-frustrated.jpeg`, `PasFoto.png`, `logo-creativemu.png`, partner logos) utilize Next.js `<Image />` component.
- **Hero Image Priority**: [`HeroSection.tsx:L149`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L149) sets `priority` and explicit `sizes` attribute for mobile/desktop LCP optimization.
- **Format Formats**: [`next.config.ts:L21`](file:///home/user/Projects/landingpage_bootcamp/next.config.ts#L21) configures AVIF and WebP image generation.

---

## 2. Server Configuration & Payload Reduction

- **Gzip/Brotli Compression**: `compress: true` enabled in `next.config.ts`.
- **Header Suppression**: `poweredByHeader: false` suppresses `X-Powered-By` fingerprinting.
- **Code-Splitting**: Below-the-fold dynamic imports reduce initial hydration JavaScript payload.
