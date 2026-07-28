# 05. WEB ACCESSIBILITY CERTIFICATE (WCAG 2.2 LEVEL AA)

> **Certification Lead**: WCAG Accessibility Auditor  
> **Evaluation Standards**: WCAG 2.2 Level AA Guidelines  
> **Status**: CERTIFIED COMPLIANT

---

## 1. Heading Hierarchy & ARIA Audit

- **Single H1 Tag**: Exactly one `<h1>` tag exists on the landing page in [`HeroSection.tsx:L73`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L73).
- **Kinetic Heading Pattern**: `HeroSection.tsx` applies `aria-label="Sudah Lama Belajar, Tapi Belum Siap Kerja?"` on the main heading container while hiding individual animated letter spans with `aria-hidden="true"`.
- **Form Controls**: Input elements link to label elements and inline error containers.

---

## 2. Touch Targets & Keyboard Navigation

- **Touch Targets**: All primary interactive buttons (`.btn-primary`, `.btn-secondary`, submit button) meet minimum 44px height requirements.
- **Focus Rings**: Focus indicators are defined for keyboard navigation via `Tab`.
