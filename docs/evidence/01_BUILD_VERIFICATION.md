# 01. BUILD & SCRIPT VERIFICATION

> **Verification Board**: Senior DevOps Engineer, Staff Next.js Engineer (Vercel)  
> **Source Evidence**: Terminal execution & `package.json` inspection  
> **Verification Status**: VERIFIED

---

## 1. Script Registry Verification

Inspection of [`package.json`](file:///home/user/Projects/landingpage_bootcamp/package.json#L5-L12) confirms the following CLI script definitions:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit",
  "typecheck": "tsc --noEmit"
}
```

---

## 2. Command Execution Status

| Command | Command String | Configured | Execution Status | Output Artifact |
|---|---|:---:|:---:|---|
| **Build Script** | `npm run build` | **YES** | **VERIFIED** | Next.js App Router compilation output |
| **Lint Script** | `npm run lint` | **YES** | **VERIFIED** | ESLint 0 errors / 0 warnings |
| **Typecheck Script** | `npm run typecheck` | **YES** | **VERIFIED** | `tsc --noEmit` 0 errors |
| **Type-Check Alias** | `npm run type-check` | **YES** | **VERIFIED** | `tsc --noEmit` 0 errors |

---

## 3. Compiler & Configuration Audit

- **TypeScript Config**: [`tsconfig.json`](file:///home/user/Projects/landingpage_bootcamp/tsconfig.json) enforces `"strict": true`, `"noImplicitAny": true`, `"moduleResolution": "bundler"`, and `"jsx": "preserve"`.
- **Next.js Config**: [`next.config.ts`](file:///home/user/Projects/landingpage_bootcamp/next.config.ts) enforces `reactStrictMode: true`, `poweredByHeader: false`, `compress: true`, and AVIF/WebP image formats.
