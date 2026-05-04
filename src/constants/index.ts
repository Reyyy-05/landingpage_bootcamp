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
    value: "reguler",
    label: "Reguler",
    description: "Cocok untuk belajar mandiri dengan komunitas",
  },
  {
    value: "premium",
    label: "Premium (BNSP)",
    description: "Paket lengkap menuju karir profesional",
    popular: true,
  },
  {
    value: "intensif",
    label: "Intensif",
    description: "Bootcamp offline full-time dengan fasilitas",
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
    icon: "Users",
    title: "Mentor Praktisi Industri",
    description:
      "Belajar langsung dari developer aktif yang sudah mengerjakan proyek nyata di perusahaan teknologi terkemuka.",
  },
  {
    icon: "Briefcase",
    title: "Proyek Portfolio Nyata",
    description:
      "Bangun 3 proyek production-grade yang bisa kamu tampilkan di GitHub dan interview kerja.",
  },
  {
    icon: "HeadphonesIcon",
    title: "Career Support 1 Tahun",
    description:
      "Akses eksklusif ke jaringan alumni, job board, dan sesi mock interview selama satu tahun penuh.",
  },
  {
    icon: "RefreshCw",
    title: "Kurikulum Selalu Update",
    description:
      "Materi diperbarui setiap semester mengikuti tren industri — tidak ada materi kadaluarsa.",
  },
  {
    icon: "MessageSquare",
    title: "Komunitas Discord Aktif",
    description:
      "Bergabung dengan ribuan developer dalam komunitas eksklusif yang saling mendukung seumur hidup.",
  },
] as const;

// ─── Social Media ─────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/creativemuid",
  youtube: "https://youtube.com/@creativemuofficial7496",
  facebook: "https://facebook.com/creativemuid",
  whatsapp: `https://wa.me/${ADMIN_WA_NUMBER}`,
} as const;

// ─── Pagination ───────────────────────────────────────────────
export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
export const DEFAULT_PAGE_SIZE = 10;
