# PRODUCTION RELEASE CHECKLIST (v1.0.0-rc1)

---

## 1. Code Quality & Build Verification
- [x] **Lint Status**: `npm run lint` passes with 0 errors / 0 warnings.
- [x] **Type Status**: `npm run typecheck` (`tsc --noEmit`) compiles cleanly with 0 errors.
- [x] **Production Build**: `npm run build` completes successfully.
- [x] **Unit & Component Tests**: 17 Vitest tests pass (`npm run test`).
- [x] **E2E Scenarios**: 4 Playwright scenarios pass (`npm run test:e2e`).

---

## 2. Security & Credentials Verification
- [x] **Git Tracking**: `.env` and `.env*.local` verified in `.gitignore`. No hardcoded DB passwords.
- [x] **Env Validation**: Fail-fast Zod environment parser active in `src/lib/env.ts`.
- [x] **Security Headers**: CSP, HSTS, X-Frame-Options (`DENY`), and Referrer-Policy configured in `next.config.ts`.
- [x] **Middleware Protection**: Protected `/dashboard/*` and `/admin` routes redirect unauthenticated users to `/admin/login`.

---

## 3. SEO & Analytics Verification
- [x] **Metadata API**: `metadataBase` dynamically resolves to `NEXT_PUBLIC_APP_URL` (`https://creativemuacademy.com`).
- [x] **Crawl Directives**: `robots.ts` disallows `/admin/` and `/dashboard/`. `sitemap.ts` includes `/` and `/daftar`.
- [x] **Event Observability**: Centralized analytics layer (`src/lib/analytics.ts`) tracks CTAs, form submissions, vouchers, and WhatsApp redirects.
