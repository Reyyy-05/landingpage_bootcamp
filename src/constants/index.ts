// ─── App Constants ──────────────────────────────────────────────
export const ADMIN_WA_NUMBER = process.env.NEXT_PUBLIC_ADMIN_WA_NUMBER ?? "6285177114036";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Enums ──────────────────────────────────────────────────────
export const PROGRAM_TYPES = [
  { value: "bootcamp", label: "Bootcamp Digital Marketing" },
  { value: "magang", label: "Magang / Prakerin" },
  { value: "sertifikasi", label: "Sertifikasi BNSP" },
] as const;

export const PACKAGES = [
  {
    value: "laravel_full_online",
    label: "Bootcamp Laravel Full Online",
    description: "Paket lengkap full online (Juni-Oktober)",
    popular: true,
  },
] as const;

export const STUDENT_STATUSES = [
  { value: "pelajar_sma_smk_1", label: "Pelajar Kelas 1 SMA/SMK" },
  { value: "pelajar_sma_smk_2", label: "Pelajar Kelas 2 SMA/SMK" },
  { value: "pelajar_sma_smk_3", label: "Pelajar Kelas 3 SMA/SMK" },
  { value: "mahasiswa_1", label: "Mahasiswa Tahun ke-1" },
  { value: "mahasiswa_2", label: "Mahasiswa Tahun ke-2" },
  { value: "mahasiswa_3", label: "Mahasiswa Tahun ke-3" },
  { value: "mahasiswa_4", label: "Mahasiswa Tahun ke-4" },
  { value: "lainnya", label: "Lainnya" },
] as const;

export const GENDER_OPTIONS = [
  { value: "perempuan", label: "Perempuan" },
  { value: "laki-laki", label: "Laki-laki" },
] as const;

export const REGISTRATION_STATUSES = [
  { value: "pending", label: "Pending", color: "warning" },
  { value: "confirmed", label: "Confirmed", color: "success" },
  { value: "rejected", label: "Rejected", color: "destructive" },
] as const;

export const DISCOUNT_TYPES = [
  { value: "fixed", label: "Fixed (IDR)" },
  { value: "percentage", label: "Persentase (%)" },
] as const;

// ─── Feature Data (Landing) ────────────────────────────────────
export const FEATURES = [
  {
    icon: "Award",
    title: "Sertifikasi Resmi BNSP",
    description:
      "Sertifikat diakui secara nasional oleh Badan Nasional Sertifikasi Profesi, memperkuat nilai kamu di pasar kerja.",
  },
  {
    icon: "GraduationCap",
    title: "Mentor Praktisi Industri",
    description:
      "Belajar langsung dari developer aktif yang sudah mengerjakan proyek nyata di perusahaan teknologi terkemuka.",
  },
  {
    icon: "BriefcaseBusiness",
    title: "Proyek Portfolio Nyata",
    description:
      "Bangun 3 proyek production-grade yang bisa kamu tampilkan di GitHub dan interview kerja.",
  },
  {
    icon: "Handshake",
    title: "Berkesempatan Di-hire Mitra & Job Connection",
    description:
      "Akses eksklusif ke jaringan mitra perusahaan kami untuk peluang kerja dan penyaluran karir langsung.",
  },
  {
    icon: "LifeBuoy",
    title: "Career Support Selamanya",
    description:
      "Dukungan karir seumur hidup. Akses eksklusif ke jaringan alumni, job board, dan sesi mock interview.",
  },
  {
    icon: "BookOpen",
    title: "Kurikulum Selalu Update",
    description:
      "Materi diperbarui setiap semester mengikuti tren industri — tidak ada materi kadaluarsa.",
  },
] as const;

// ─── Social Media ─────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/creativemu_academy",
  tiktok: "https://tiktok.com/@creativemu_academy",
  facebook: "https://facebook.com/creativemu_academy",
  website: "https://www.creativemuacademy.com",
  youtube: "https://youtube.com/@creativemuofficial7496",
  whatsapp: `https://wa.me/${ADMIN_WA_NUMBER}`,
} as const;

// ─── Pagination ───────────────────────────────────────────────
export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
export const DEFAULT_PAGE_SIZE = 10;
