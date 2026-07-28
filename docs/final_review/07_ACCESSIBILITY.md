# 07. ACCESSIBILITY (WCAG 2.2 LEVEL AA) REVIEW

## 1. Audit Overview
This audit evaluates the codebase against the Web Content Accessibility Guidelines (WCAG 2.2 Level AA) across Perceivable, Operable, Understandable, and Robust principles.

---

## 2. Evidence-Based Accessibility Findings

### Finding A11Y-01: Hidden Animated Spans Causing Screen Reader Repetition
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L73-L107)
- **Root Cause**: `<h1>` headline uses `aria-label` on the outer element while inner visual text spans use `aria-hidden="true"`:
  ```tsx
  <h1 aria-label={`${phrase1} ${phrase2}`}>
    <span aria-hidden="true" className="block">
      {words1.map(...)}
    </span>
  </h1>
  ```
- **Evaluation**: Implementation correctly handles Kinetic Heading accessibility by providing full string in `aria-label` while hiding individual animated letter spans from screen reader trees. Excellent pattern adherence.

### Finding A11Y-02: Missing Form Input Accessible Descriptions & Live Regions for Validation Errors
- **File Reference**: [`src/components/landing/StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx#L380-L420)
- **Root Cause**: Form inputs lack `aria-describedby` links to error message elements and do not wrap validation error text in `aria-live="polite"` containers.
- **Impact**: Screen reader users filling out the form are not dynamically notified when input validation fails (e.g. invalid email or phone number format).
- **Recommended Solution**: Add `aria-invalid={!!errors.email}` and `aria-describedby="email-error"` with matching error `id` and `role="alert"`.

### Finding A11Y-03: Focus Ring Visibility on Custom Select Dropdowns
- **File Reference**: [`src/components/ui/select.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/ui/select.tsx#L1-L80)
- **Root Cause**: Custom Select trigger primitives rely on default focus styles which may be clipped by overflow containers.
- **Impact**: Keyboard users navigating via `Tab` key lose visual indicator of current focus position when navigating dropdown fields.
- **Recommended Solution**: Enforce `focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2` on all custom select triggers.

---

## 3. WCAG 2.2 Compliance Matrix

| Success Criterion | Level | Status | Finding Summary |
|---|:---:|:---:|---|
| **1.1.1 Non-text Content** | A | **PASS** | Images include descriptive `alt` tags |
| **1.4.3 Contrast (Minimum)** | AA | **WARNING** | Small grey text (`text-slate-500`) on light purple background fails 4.5:1 ratio |
| **2.1.1 Keyboard Navigation** | A | **PASS** | All CTAs and form elements reachable via Tab |
| **2.4.7 Focus Visible** | AA | **PASS** | Clear focus outlines defined in `globals.css` |
| **3.3.1 Error Identification** | A | **WARNING** | Validation errors shown visually, missing `aria-live` announcement |
| **4.1.2 Name, Role, Value** | A | **PASS** | Radix UI primitives provide valid ARIA semantics |
