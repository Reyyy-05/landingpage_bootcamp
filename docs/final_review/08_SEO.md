# 08. TECHNICAL SEO REVIEW

## 1. Audit Scope
This review evaluates search engine optimization readiness including metadata completeness, OpenGraph protocols, canonical indexing tags, crawl configuration, heading structure, and Schema.org structured data.

---

## 2. Key Findings

### Finding SEO-01: Canonical Domain Misalignment in Metadata Base
- **File Reference**: [`src/app/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/layout.tsx#L41-L43) & [`src/app/robots.ts`](file:///home/user/Projects/landingpage_bootcamp/src/app/robots.ts#L4)
- **Root Cause**: `layout.tsx` defines `metadataBase` with fallback to `'https://landingpagebootcamp-omega.vercel.app'` while `robots.ts` and `sitemap.ts` default to `'https://creativemuacademy.com'`.
- **Impact**: Googlebot sees mismatched canonical targets (`https://landingpagebootcamp-omega.vercel.app/` vs `https://creativemuacademy.com/`), risking indexation dilution or duplicate content flags.
- **Recommended Solution**: Standardize single canonical production domain in centralized environment variable (`NEXT_PUBLIC_APP_URL="https://creativemuacademy.com"`).

### Finding SEO-02: Missing Schema.org Structured Data (`Course` / `EducationalOccupationalProgram`)
- **File Reference**: [`src/app/(public)/page.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/%28public%29/page.tsx#L1-L28)
- **Root Cause**: No JSON-LD structured data script is injected for Google Rich Results.
- **Impact**: Missed opportunity for Rich Snippets (Course price, duration, rating, provider) in Google Search Result Pages (SERPs).
- **Recommended Solution**: Inject JSON-LD `Course` or `Event` schema in `HomePage`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Bootcamp Laravel Web Developer",
    "description": "Pelatihan intensif Full-Stack Laravel 3 Bulan",
    "provider": { "@type": "Organization", "name": "Creativemu Academy" }
  }
  ```

### Finding SEO-03: Single H1 Tag Hierarchy Compliance
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L73)
- **Evaluation**: The page contains exactly one `<h1>` tag in `HeroSection.tsx`. All subsequent section headings (`ProblemSection`, `AgitationSection`, `FeaturesSection`, `RoadmapSection`, `MentorSection`, `FAQSection`) use `<h2>` or `<h3>`. Excellent heading hierarchy compliance.

---

## 3. SEO Checklist Matrix

| Feature | Status | Notes |
|---|:---:|---|
| **Title & Meta Description** | **PASS** | Present and unique |
| **OpenGraph Metadata** | **PASS** | og:title, og:description, og:image configured |
| **Twitter Card** | **PASS** | summary_large_image configured |
| **Robots.ts** | **PASS** | Disallows `/admin/` and `/dashboard/` |
| **Sitemap.ts** | **PASS** | Dynamic sitemap generated |
| **Canonical Alignment** | **WARNING** | Domain fallback mismatch (`vercel.app` vs `creativemuacademy.com`) |
| **JSON-LD Schema** | **FAIL** | Missing Course / Event schema |
