import { z } from "zod";

// ─── Base Common Fields ───────────────────────────────────────
const baseStudentSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  full_name: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),

  phone_number: z
    .string()
    .min(10, "Nomor telepon/WhatsApp minimal 10 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka"),

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

  instagram_handle: z
    .string()
    .min(1, "Akun Instagram wajib diisi")
    .regex(/^@?[a-zA-Z0-9._]{1,30}$/, "Format Instagram tidak valid"),

  gender: z.enum(["laki-laki", "perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),

  bootcamp_id: z
    .string()
    .min(1, "Pilihan program wajib diisi")
    .uuid("Program tidak valid"),

  package_selected: z.enum(["reguler", "premium", "intensif", "laravel_full_online"], {
    required_error: "Paket wajib dipilih",
  }),

  voucher_code: z.string().max(50).optional().nullable(),
});

// ─── Discriminated Union based on student_status ───────────────
export const studentSchema = z.discriminatedUnion("student_status", [
  baseStudentSchema.extend({
    student_status: z.literal("PELAJAR"),
    school_name: z.string().min(1, "Nama sekolah wajib diisi"),
    major: z.string().min(1, "Jurusan wajib diisi"),
    university_name: z.null().optional().or(z.literal("")),
    workplace: z.null().optional().or(z.literal("")),
    job_title: z.null().optional().or(z.literal("")),
  }),
  baseStudentSchema.extend({
    student_status: z.literal("MAHASISWA"),
    university_name: z.string().min(1, "Nama universitas/kampus wajib diisi"),
    major: z.string().min(1, "Jurusan/Program studi wajib diisi"),
    school_name: z.null().optional().or(z.literal("")),
    workplace: z.null().optional().or(z.literal("")),
    job_title: z.null().optional().or(z.literal("")),
  }),
  baseStudentSchema.extend({
    student_status: z.literal("KARYAWAN"),
    workplace: z.string().min(1, "Tempat kerja/Perusahaan wajib diisi"),
    job_title: z.string().min(1, "Posisi/Jabatan wajib diisi"),
    school_name: z.null().optional().or(z.literal("")),
    university_name: z.null().optional().or(z.literal("")),
    major: z.null().optional().or(z.literal("")),
  }),
  baseStudentSchema.extend({
    student_status: z.literal("UMUM"),
    school_name: z.null().optional().or(z.literal("")),
    university_name: z.null().optional().or(z.literal("")),
    workplace: z.null().optional().or(z.literal("")),
    job_title: z.null().optional().or(z.literal("")),
    major: z.null().optional().or(z.literal("")),
  }),
]);

export type StudentSchema = z.infer<typeof studentSchema>;
