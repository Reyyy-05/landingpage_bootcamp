import { describe, it, expect } from "vitest";
import { buildWALink, buildStudentWAMessage, formatCurrency, formatWANumber } from "@/lib/utils";

describe("Utility Functions (src/lib/utils.ts)", () => {
  describe("formatWANumber", () => {
    it("converts leading 08 to 628", () => {
      expect(formatWANumber("081234567890")).toBe("6281234567890");
    });

    it("strips plus signs, dashes, and spaces", () => {
      expect(formatWANumber("+62 812-3456-7890")).toBe("6281234567890");
    });

    it("leaves already formatted 628 numbers intact", () => {
      expect(formatWANumber("6281234567890")).toBe("6281234567890");
    });
  });

  describe("formatCurrency", () => {
    it("formats 750000 into Indonesian Rupiah format", () => {
      const formatted = formatCurrency(750000);
      expect(formatted).toContain("750");
      expect(formatted).toContain("Rp");
    });

    it("handles zero amounts cleanly", () => {
      expect(formatCurrency(0)).toContain("0");
    });
  });

  describe("buildStudentWAMessage & buildWALink", () => {
    it("generates structured WhatsApp message text", () => {
      const msg = buildStudentWAMessage({
        name: "Budi Santoso",
        program: "Bootcamp Laravel Web Developer — Batch 1",
        registrationId: "reg-12345",
      });

      expect(msg).toContain("Budi Santoso");
      expect(msg).toContain("Bootcamp Laravel Web Developer");
      expect(msg).toContain("reg-12345");
    });

    it("encodes valid WhatsApp link URL", () => {
      const link = buildWALink("6285177114036", "Halo Admin!");
      expect(link).toBe("https://wa.me/6285177114036?text=Halo%20Admin!");
    });
  });
});
