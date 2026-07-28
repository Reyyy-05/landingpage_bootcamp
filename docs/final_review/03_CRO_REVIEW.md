# 03. CONVERSION RATE OPTIMIZATION (CRO) REVIEW

## 1. Overview & Funnel Analysis
This audit evaluates the user journey, conversion triggers, messaging clarity, and friction points across the registration funnel from landing page entry to completed WhatsApp confirmation.

---

## 2. Detailed CRO Findings

### Finding CRO-01: Form Length & Friction Point on Initial Registration Step
- **File Reference**: [`src/components/landing/StudentRegistrationForm.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/StudentRegistrationForm.tsx#L380-L650)
- **Root Cause**: The registration form requests 14 input fields (Full Name, Email, Phone/WA, Birth Place, Birth Date, Address, Instagram, Gender, Status, School/University/Workplace, Major/Job Title, Package, Voucher) in a single dense view.
- **Impact**: High cognitive load and form drop-off rate, particularly on mobile devices where soft keyboards cover 50% of the screen height.
- **Recommended Solution**: Transition to a 2-step micro-funnel (Step 1: Contact Info -> Step 2: Educational background & Package selection).

### Finding CRO-02: Absence of Sticky / Persistent CTA on Mobile Viewports
- **File Reference**: [`src/components/landing/Navbar.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/Navbar.tsx#L1-L120) & [`src/app/(public)/layout.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/app/(public)/layout.tsx#L1-L26)
- **Root Cause**: When scrolling past the Hero Section on mobile devices, the primary CTA button (`Daftar Sekarang`) disappears from the viewport as the navbar condenses.
- **Impact**: Users reading curriculum or mentor details must scroll back to the top or bottom to initiate registration.
- **Recommended Solution**: Implement a floating bottom CTA bar for mobile viewports (`fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur md:hidden`).

### Finding CRO-03: Secondary CTA Redirects Directly to WhatsApp External Link
- **File Reference**: [`src/components/landing/HeroSection.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/landing/HeroSection.tsx#L134-L141)
- **Root Cause**: `Konsultasi Program` button opens `https://wa.me/...` directly in a new tab without tracking lead intent in analytical storage or database.
- **Impact**: Inability to calculate true Consultation CTR vs Registration CTR in attribution analytics.
- **Recommended Solution**: Intercept WhatsApp consultation clicks with an analytics event logger (`gtag('event', 'lead_consultation')`) prior to opening the external tab.

### Finding CRO-04: Static Countdown Timer & Urgency Signal Degradation
- **File Reference**: [`src/components/organisms/CountdownTimer.tsx`](file:///home/user/Projects/landingpage_bootcamp/src/components/organisms/CountdownTimer.tsx#L1-L100)
- **Root Cause**: The urgency countdown timer calculates time remaining against a hardcoded static date target.
- **Impact**: Once the target date passes, the component renders zeroes (`00:00:00:00`) or negative values, destroying trust and brand authenticity.
- **Recommended Solution**: Bind countdown timer dynamically to active bootcamp registration deadlines retrieved from database (`bootcamps.registration_deadline`).

---

## 3. High-Impact CRO Checklist

- [x] Primary CTA above the fold (`HeroSection.tsx`)
- [x] Value Proposition clear in headline
- [x] Social proof present (Alumni stats & logos in `TrustedSection.tsx`)
- [ ] Mobile persistent floating CTA bar
- [ ] 2-Step progressive form disclosure
- [ ] Analytics tracking on external WhatsApp consultation links
- [ ] Dynamic deadline sync with Supabase backend
