# PRODUCTION ROLLBACK & RECOVERY GUIDE

---

## 1. Instant Vercel Rollback Procedure

When a critical production defect is detected post-deployment:

1. Open Vercel Project Dashboard -> **Deployments** tab.
2. Locate the previous stable production deployment (e.g. `v0.8.0` / Sprint 4 build).
3. Click `...` menu -> **Instant Rollback**.
4. Vercel instantly routes edge traffic to the previous deployment build within <5 seconds.

---

## 2. Git Release Branch Rollback Procedure

```bash
# 1. Revert main branch to last stable release tag
git checkout main
git revert HEAD -m 1

# 2. Tag rollback commit
git tag -a v1.0.0-rollback1 -m "Emergency Rollback to stable release"

# 3. Push to origin to trigger automated CI build
git push origin main --tags
```

---

## 3. Database Schema Migration Rollback

Since Supabase handles table schemas via SQL migrations:
- New columns added during sprints are non-breaking (`NULLABLE` or default values).
- If an RPC function needs rollback, re-execute the previous SQL RPC definition in Supabase SQL Editor.
