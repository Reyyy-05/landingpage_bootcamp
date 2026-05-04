import { z } from "zod";
import { STUDENT_STATUSES, GENDER_OPTIONS, PACKAGES } from "@/constants";

export const studentFormSchema = z.object({
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

export type StudentFormSchema = z.infer<typeof studentFormSchema>;

// Server-side: additional validation for API route
export const studentApiSchema = studentFormSchema.extend({
  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
});

export type StudentApiSchema = z.infer<typeof studentApiSchema>;
