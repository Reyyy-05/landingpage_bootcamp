import { describe, it, expect, vi } from "vitest";
import { analytics } from "@/lib/analytics";

describe("Analytics Layer Abstraction (src/lib/analytics.ts)", () => {
  it("provides trackCTA, trackFormStart, trackFormSubmit, trackSuccess, and trackWhatsAppRedirect methods", () => {
    expect(typeof analytics.trackCTA).toBe("function");
    expect(typeof analytics.trackFormStart).toBe("function");
    expect(typeof analytics.trackFormSubmit).toBe("function");
    expect(typeof analytics.trackSuccess).toBe("function");
    expect(typeof analytics.trackWhatsAppRedirect).toBe("function");
  });

  it("executes tracking methods safely without throwing errors", () => {
    expect(() => analytics.trackCTA("Daftar Sekarang", "HeroSection")).not.toThrow();
    expect(() => analytics.trackSuccess("Bootcamp Laravel")).not.toThrow();
    expect(() => analytics.trackWhatsAppRedirect("reg-123")).not.toThrow();
  });
});
