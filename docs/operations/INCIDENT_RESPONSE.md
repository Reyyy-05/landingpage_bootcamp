# INCIDENT RESPONSE PROCEDURES

---

## 1. Severity Classification Framework

| Severity Level | Response SLA | Trigger Condition | Escalation Lead |
|---|:---:|---|---|
| **SEV-1 (Critical)** | < 15 mins | Registration API (`POST /api/students`) completely unresponsive or database down | Lead SRE & Tech Lead |
| **SEV-2 (Major)** | < 1 hour | Voucher validation RPC throwing 500 errors or Meta Pixel script failing | Senior Backend Engineer |
| **SEV-3 (Minor)** | < 4 hours | Formatting glitch in secondary section or non-blocking console warnings | Frontend Engineer |

---

## 2. Response Steps for SEV-1 Outage

1. **Acknowledge & Triage**: Identify if issue is edge routing, database outage, or application error using server logs in Vercel.
2. **Containment**: If build error or deployment corruption, trigger Instant Rollback via Vercel Dashboard (see [`ROLLBACK_GUIDE.md`](file:///home/user/Projects/landingpage_bootcamp/docs/operations/ROLLBACK_GUIDE.md)).
3. **Communication**: Notify marketing team if registration conversion funnel is impacted.
4. **Post-Mortem**: Document root cause, resolution timeline, and preventative actions in `docs/operations/post_mortems/`.
