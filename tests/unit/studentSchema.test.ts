import { describe, it, expect } from "vitest";
import { studentSchema } from "@/schemas/studentSchema";

describe("Student Validation Schema (src/schemas/studentSchema.ts)", () => {
  const validPelajarData = {
    full_name: "Ahmad Rizky",
    email: "ahmad@gmail.com",
    phone_number: "081234567890",
    birth_place: "Yogyakarta",
    birth_date: "2005-05-15",
    address: "Jl. Malioboro No. 12, Sleman",
    instagram_handle: "ahmadrizky",
    gender: "L" as const,
    student_status: "PELAJAR" as const,
    school_name: "SMKN 1 Bantul",
    bootcamp_id: "bootcamp-laravel-1",
    package_selected: "REGULER" as const,
    voucher_code: "CREATIVEMU100",
  };

  const validMahasiswaData = {
    full_name: "Siti Rahma",
    email: "siti@gmail.com",
    phone_number: "085678901234",
    birth_place: "Bantul",
    birth_date: "2003-08-20",
    address: "Jl. Kaliurang Km 5",
    instagram_handle: "@sitirahma",
    gender: "P" as const,
    student_status: "MAHASISWA" as const,
    university_name: "Universitas Gadjah Mada",
    major: "Teknik Informatika",
    bootcamp_id: "bootcamp-laravel-1",
    package_selected: "REGULER" as const,
  };

  it("validates correct Pelajar submission payload", () => {
    const result = studentSchema.safeParse(validPelajarData);
    expect(result.success).toBe(true);
  });

  it("validates correct Mahasiswa submission payload", () => {
    const result = studentSchema.safeParse(validMahasiswaData);
    expect(result.success).toBe(true);
  });

  it("fails when email is invalid", () => {
    const invalid = { ...validPelajarData, email: "invalid-email" };
    const result = studentSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("fails when phone number is too short", () => {
    const invalid = { ...validPelajarData, phone_number: "0812" };
    const result = studentSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("fails when PELAJAR status omits school_name", () => {
    const invalid = { ...validPelajarData, school_name: "" };
    const result = studentSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("fails when MAHASISWA status omits university_name or major", () => {
    const invalid = { ...validMahasiswaData, university_name: "" };
    const result = studentSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
