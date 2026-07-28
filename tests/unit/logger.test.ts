import { describe, it, expect, vi } from "vitest";
import { logger } from "@/lib/logger";

describe("Logger Abstraction (src/lib/logger.ts)", () => {
  it("provides info, warn, error, and debug methods", () => {
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.debug).toBe("function");
  });

  it("handles logging without throwing exceptions", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => logger.error("Test Error", "UnitTest", new Error("Boom"))).not.toThrow();
    spy.mockRestore();
  });
});
