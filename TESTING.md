# TESTING AUTOMATION & STRATEGY GUIDE

## 1. Overview & Test Suite Architecture

`landingpage_bootcamp` employs a multi-tiered automated testing strategy using **Vitest** for Unit & Component testing and **Playwright** for End-to-End (E2E) cross-browser verification.

```
tests/
├── unit/                       # Vitest Unit Tests
│   ├── analytics.test.ts       # Centralized analytics layer tests
│   ├── env.test.ts             # Zod environment parser tests
│   ├── logger.test.ts          # Centralized logger abstraction tests
│   ├── studentSchema.test.ts   # Zod registration schema validation tests
│   └── utils.test.ts           # Helper & formatter utility tests
├── component/                  # React Testing Library Behavior Tests
│   ├── CountdownTimer.test.tsx # Countdown timer rendering tests
│   └── VoucherSection.test.tsx # Voucher section & RPC feedback tests
└── e2e/                        # Playwright Cross-Browser E2E Scenarios
    └── registration.spec.ts    # Scenarios A, B, C, D (Submit, Invalid Input, Double Click, Network Error)
```

---

## 2. Running Test Commands

```bash
# Run all Unit & Component Tests (Vitest)
npm run test

# Run Vitest in Watch Mode
npm run test:watch

# Generate Test Coverage Report
npm run test:coverage

# Run Playwright End-to-End Tests
npm run test:e2e
```

---

## 3. Test Coverage Thresholds

- **Lines**: 80% Minimum Threshold
- **Functions**: 80% Minimum Threshold
- **Branches**: 80% Minimum Threshold
- **Statements**: 80% Minimum Threshold
