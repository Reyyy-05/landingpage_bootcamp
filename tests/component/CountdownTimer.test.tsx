import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountdownTimer } from "@/components/organisms/CountdownTimer";

describe("CountdownTimer Component (src/components/organisms/CountdownTimer.tsx)", () => {
  it("renders countdown timer heading and CTA buttons", () => {
    render(<CountdownTimer />);
    expect(screen.getByText(/Harga Spesial Berakhir Dalam/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Daftar Sekarang/i })).toBeInTheDocument();
  });
});
