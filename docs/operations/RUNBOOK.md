# PRODUCTION OPERATIONAL RUNBOOK

> **Target Platform**: Vercel / Node.js Serverless Container + Supabase PostgreSQL  
> **Application**: Creativemu Academy Laravel Bootcamp Landing Page (`landingpage_bootcamp`)

---

## 1. Routine Deployment Operations

### A. Pre-Deployment Verification
```bash
# 1. Verify TypeScript & ESLint Compilation
npm run lint
npm run typecheck

# 2. Execute Automated Unit & Component Tests
npm run test

# 3. Execute Cross-Browser Playwright E2E Tests
npm run test:e2e

# 4. Verify Local Production Build
npm run build
```

### B. Deployment Step-by-Step
1. Merge reviewed pull request into `main` branch.
2. Vercel / CI Pipeline automatically initiates build via `npm run build`.
3. Edge middleware validates routing rules in [`src/lib/supabase/middleware.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/supabase/middleware.ts).
4. Verify HTTPS deployment URL and run post-deploy smoke test on `/` and `/daftar`.

---

## 2. Emergency Operational Procedures

### Incident A: Supabase Connection Outage
- **Symptom**: Registration form submission returns HTTP 500 error ("Terjadi kesalahan server. Coba lagi.").
- **Diagnosis**: Check Supabase Status Dashboard (`status.supabase.com`) or inspect server logs in Vercel.
- **Immediate Mitigation**: Form submit button fails gracefully without crashing the UI. Users receive Sonner error toast.
- **Recovery**: Once Supabase connection restores, form retries process without requiring page reload.

### Incident B: Missing / Expired Voucher Code
- **Symptom**: User receives "Kode voucher tidak berlaku" message during typing.
- **Diagnosis**: Admin can verify voucher `is_active` state and expiration date in Supabase Dashboard `/dashboard/vouchers`.
- **Recovery**: Update voucher `valid_until` or `is_active` boolean in Supabase SQL editor. No application re-deploy required.
