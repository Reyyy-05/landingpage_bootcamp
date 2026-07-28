import "@testing-library/jest-dom";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    };
  },
  usePathname() {
    return "/";
  },
}));

// Mock Google Analytics
vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: vi.fn(),
}));
