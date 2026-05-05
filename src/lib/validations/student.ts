import { z } from "zod";
import { STUDENT_STATUSES, GENDER_OPTIONS, PACKAGES } from "@/constants";

// ── Helper: check student status category ─────────────────────
export function isPelajarStatus(status: string | undefined): boolean {
  return !!status?.startsWith("pelajar_sma_smk_");
}

export function isMahasiswaStatus(status: string | undefined): boolean {
  return !!status?.startsWith("mahasiswa_");
}

// ── Base schema (without conditional validation) ──────────────
const studentFormBaseSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  full_name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),

  birth_place: z
    .string()
    .min(2, "Tempat lahir wajib diisi")
    .max(100),

  birth_date: z
    .string()
    .min(1, "Tanggal lahir wajib diisi")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const minAge = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
      return date <= minAge;
    }, "Tanggal lahir tidak valid"),

  address: z
    .string()
    .min(10, "Alamat minimal 10 karakter")
    .max(500, "Alamat maksimal 500 karakter"),

  phone_wa: z
    .string()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(/^(08|628|\+628)\d{8,12}$/, "Format nomor WA tidak valid (contoh: 08xxxxxxxxxx)"),

  instagram_handle: z
    .string()
    .min(1, "Akun Instagram wajib diisi")
    .regex(/^@?[a-zA-Z0-9._]{1,30}$/, "Format Instagram tidak valid"),

  gender: z.enum(["laki-laki", "perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),

  student_status: z.enum(
    STUDENT_STATUSES.map((s) => s.value) as [string, ...string[]],
    { required_error: "Status wajib dipilih" }
  ),

  major: z.string().max(100).optional(),
  school_name: z.string().max(200).optional(),
  university_name: z.string().max(200).optional(),

  bootcamp_id: z
    .string()
    .min(1, "Program wajib dipilih")
    .uuid("Program tidak valid"),

  package_selected: z.enum(
    PACKAGES.map((p) => p.value) as [string, ...string[]],
    { required_error: "Paket wajib dipilih" }
  ),

  voucher_code: z.string().max(50).optional(),
});

// ── Full schema with conditional validation ───────────────────
export const studentFormSchema = studentFormBaseSchema.superRefine((data, ctx) => {
  // Pelajar SMA/SMK → Nama Sekolah wajib
  if (isPelajarStatus(data.student_status)) {
    if (!data.school_name || data.school_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nama sekolah wajib diisi (minimal 2 karakter)",
        path: ["school_name"],
      });
    }
  }

  // Mahasiswa → Nama Kampus wajib
  if (isMahasiswaStatus(data.student_status)) {
    if (!data.university_name || data.university_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nama kampus/universitas wajib diisi (minimal 2 karakter)",
        path: ["university_name"],
      });
    }
  }
});

export type StudentFormSchema = z.infer<typeof studentFormSchema>;

// Server-side: additional validation for API route
export const studentApiSchema = studentFormBaseSchema.extend({
  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
}).superRefine((data, ctx) => {
  if (isPelajarStatus(data.student_status)) {
    if (!data.school_name || data.school_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nama sekolah wajib diisi",
        path: ["school_name"],
      });
    }
  }
  if (isMahasiswaStatus(data.student_status)) {
    if (!data.university_name || data.university_name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nama kampus/universitas wajib diisi",
        path: ["university_name"],
      });
    }
  }
});

export type StudentApiSchema = z.infer<typeof studentApiSchema>;
