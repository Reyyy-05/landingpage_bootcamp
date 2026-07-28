# ENVIRONMENT VARIABLE MATRIX

> **Operational Scope**: Configuration & Secret Audit  
> **Source Evidence**: `src/lib/env.ts` & `.env.example` inspection

---

## 1. Environment Variable Matrix

| Variable Name | Environment Scope | Secret / Public | Required? | Default Fallback Value | Zod Schema Validation |
|---|---|---|:---:|---|---|
| `DATABASE_URL` | Server Only | **SECRET** | Optional | `undefined` | String URL parser |
| `NEXT_PUBLIC_SUPABASE_URL` | Server & Browser | PUBLIC | **REQUIRED** | `https://ykwhzjrrcpgsxbganqpm.supabase.co` | Valid URL validator |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Server & Browser | PUBLIC | **REQUIRED** | Anon Key String | Minimum length string |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | **SECRET** | Optional | `undefined` | String parser |
| `NEXT_PUBLIC_APP_URL` | Server & Browser | PUBLIC | **REQUIRED** | `https://creativemuacademy.com` | Valid URL validator |
| `NEXT_PUBLIC_ADMIN_WA_NUMBER` | Server & Browser | PUBLIC | **REQUIRED** | `6285177114036` | Sanitized phone string |
| `NEXT_PUBLIC_GA_ID` | Browser Only | PUBLIC | Optional | `""` | String parser |
| `NEXT_PUBLIC_META_PIXEL_ID` | Browser Only | PUBLIC | Optional | `""` | String parser |
| `NODE_ENV` | Build & Server | System | **REQUIRED** | `"development"` | Enum: `development`, `test`, `production` |

---

## 2. Secret Security Rules

1. **`SUPABASE_SERVICE_ROLE_KEY`**: MUST NEVER be prefixed with `NEXT_PUBLIC_` or imported in Client Components. It is strictly guarded in [`src/lib/supabase/server.ts`](file:///home/user/Projects/landingpage_bootcamp/src/lib/supabase/server.ts#L36).
2. **`DATABASE_URL`**: MUST NEVER be committed to Git version control. `.env` and `.env*.local` are explicitly ignored in [`.gitignore`](file:///home/user/Projects/landingpage_bootcamp/.gitignore#L8).
