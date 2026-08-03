import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { VoucherSection } from "@/components/forms/VoucherSection";
import type { StudentSchema } from "@/schemas/studentSchema";

function TestWrapper() {
  const { control, register, formState: { errors }, setValue } = useForm<StudentSchema>();
  return <VoucherSection control={control as any} register={register} errors={errors} setValue={setValue} />;
}

describe("VoucherSection Component (src/components/forms/VoucherSection.tsx)", () => {
  it("renders voucher code label and input placeholder", () => {
    render(<TestWrapper />);
    expect(screen.getByText(/Kode Voucher \/ Promo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contoh: MERDEKA81/i)).toBeInTheDocument();
  });
});
