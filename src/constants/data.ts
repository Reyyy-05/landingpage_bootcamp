// ─── Landing Page Sales Funnel Data ────────────────────────────
// All hard-selling copy, value stack, and pricing data centralized here.
// This file is separate from `index.ts` (which holds app/dashboard config).

import { ADMIN_WA_NUMBER } from "./index";

// ─── Types ────────────────────────────────────────────────────

export interface ValueStackItem {
  /** Lucide icon name */
  icon: string;
  /** Short title displayed in the value stack row */
  title: string;
  /** One-line description of what's included */
  description: string;
  /** Perceived individual IDR value */
  value: number;
}

export interface PricingConfig {
  /** Sum of all ValueStackItem values — must equal 7_500_000 */
  totalValue: number;
  /** The actual discounted offer price */
  offerPrice: number;
  /** Savings amount (totalValue - offerPrice) — auto-derived, but explicit for templates */
  savings: number;
  /** Currency label */
  currency: string;
}

export interface ProblemPoint {
  /** Emoji prefix for the bullet */
  emoji: string;
  /** The pain-point copy */
  text: string;
}

export interface DangerPoint {
  /** Numbered consequence title */
  title: string;
  /** Consequence description */
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  /** Avatar initials (auto-derived from name if omitted) */
  initials?: string;
}

// ─── Offer Deadline ───────────────────────────────────────────
// Hard deadline for the countdown timer.
// July 6, 2026 at 23:59:59 WIB (UTC+7)
export const OFFER_DEADLINE = "2026-07-06T23:59:59+07:00";

/** Toggle for the flash sale promo banner on /daftar. Set to true to activate. */
export const IS_FLASH_SALE_ACTIVE = false;

// ─── Value Stack Data ─────────────────────────────────────────
// 5 line items. Sum MUST equal exactly 3_500_000.
export const VALUE_STACK_DATA: ValueStackItem[] = [
  {
    icon: "Code",
    title: "Kurikulum Industri Laravel (3 Modul Intensif)",
    description:
      "Dari PHP dasar, OOP, hingga Laravel advanced — kurikulum lengkap yang dirancang oleh praktisi industri aktif.",
    value: 1_200_000,
  },
  {
    icon: "FolderGit2",
    title: "3 Proyek Portfolio Production-Grade",
    description:
      "Bangun 3 aplikasi nyata yang bisa langsung ditampilkan di GitHub dan interview kerja.",
    value: 800_000,
  },
  {
    icon: "UserCheck",
    title: "Personal Code Review & Mentoring 1-on-1",
    description:
      "Sesi review kode pribadi dengan mentor praktisi. Bukan cuma teori — kamu dikoreksi langsung.",
    value: 600_000,
  },
  {
    icon: "Handshake",
    title: "Career Support & Job Referral Network (Selamanya)",
    description:
      "Akses seumur hidup ke jaringan hiring partner, job board eksklusif, dan sesi mock interview.",
    value: 500_000,
  },
  {
    icon: "PlayCircle",
    title: "Akses Seumur Hidup ke Materi & Rekaman",
    description:
      "Semua rekaman kelas, materi, dan update kurikulum bisa diakses kapanpun tanpa batas waktu.",
    value: 400_000,
  },
] as const;

// ── Compile-time validation: ensure sum === 3_500_000 ─────────
const _valueStackSum = VALUE_STACK_DATA.reduce((sum, item) => sum + item.value, 0);
if (_valueStackSum !== 3_500_000) {
  throw new Error(
    `VALUE_STACK_DATA sum mismatch: expected 3_500_000, got ${_valueStackSum}`
  );
}

// ─── Pricing Config ───────────────────────────────────────────
export const PRICING: PricingConfig = {
  totalValue: 3_500_000,
  offerPrice: 750_000,
  savings: 3_500_000 - 750_000, // 2_750_000
  currency: "IDR",
};

// ─── Problem Section Data (PAS Framework — "Problem") ─────────
export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    emoji: "😵",
    text: "Belajar coding sendiri berbulan-bulan, tapi masih stuck di tutorial hell — nggak bisa bikin project sendiri dari nol.",
  },
  {
    emoji: "📄",
    text: "Portofolio kosong, CV ditolak terus. Perusahaan minta pengalaman, tapi darimana kalau nggak pernah diajari bikin project nyata?",
  },
  {
    emoji: "💸",
    text: "Bootcamp lain harganya jutaan, tapi nggak ada career support — ujung-ujungnya cuma dapat sertifikat \"selesai kelas\".",
  },
  {
    emoji: "🔄",
    text: "Sudah coba kursus online gratisan sana-sini, hasilnya? Materi berantakan, gak ada mentor, dan tetap bingung arah karir.",
  },
];

// ─── Danger Section Data (PAS Framework — "Agitate") ──────────
export const DANGER_POINTS: DangerPoint[] = [
  {
    title: "Gap skill makin lebar",
    description:
      "Setiap bulan yang terlewat, lulusan bootcamp lain sudah lebih siap bersaing di pasar kerja. Posisimu makin tertinggal.",
  },
  {
    title: "Peluang karir tech 2026 terbuang",
    description:
      "Demand developer Laravel di Indonesia sedang tinggi. Tapi window-nya tidak selamanya terbuka — perusahaan butuh sekarang.",
  },
  {
    title: "Biaya belajar sendiri justru lebih mahal",
    description:
      "Kursus sana-sini Rp 500rb di sini, Rp 1jt di sana — totalnya bisa lebih mahal dari bootcamp, tapi hasilnya setengah-setengah.",
  },
];

// ─── Testimonials Data ────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Siti Rahma",
    role: "Alumni Batch 10 · Digital Marketer",
    quote:
      "Portfolio project dari sini beneran ngebuka jalan karirku. Kurikulumnya daging banget dan mentornya super asik plus solutif!",
  },
  {
    name: "Bagas Pratama",
    role: "Alumni Batch 11 · Web Developer",
    quote:
      "Awalnya ngira bakal susah ngikutin, ternyata belajarnya full praktek. Vibesnya seru parah, sekarang udah pede megang project gede.",
  },
  {
    name: "Nabila Aurel",
    role: "Alumni Batch 11 · Freelance Web Dev",
    quote:
      "Jujur worth it banget. Ga cuma diajarin coding, tapi diajarin juga cara dapet klien. Mentornya the best lah pokoknya, super sabar!",
  },
  {
    name: "Rizky Fauzi",
    role: "Alumni Batch 12 · Tech Enthusiast",
    quote:
      "Relate banget sama studi kasusnya, beneran kepake di dunia kerja. Ga nyangka dalam 3 bulan skillku bisa loncat sejauh ini. GGWP!",
  },
];

// ─── Smart WA Funnel CTA ──────────────────────────────────────
export const WA_CTA = {
  /** Pre-filled WA message for registration interest */
  registrationMessage:
    "Halo Admin Creativemu Academy 👋\n\nSaya tertarik mendaftar *Bootcamp Laravel Full-Stack 3 Bulan* dengan harga spesial Rp 750.000.\n\nMohon info lebih lanjut tentang cara pendaftaran dan pembayaran. Terima kasih!",
  /** Pre-filled WA message for general consultation */
  consultationMessage:
    "Halo Admin Creativemu Academy 👋\n\nSaya ingin konsultasi tentang program Bootcamp Laravel. Bisa bantu jelaskan lebih detail? Terima kasih!",
  /** Generate the full WA API URL */
  getRegistrationUrl: () =>
    `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(WA_CTA.registrationMessage)}`,
  getConsultationUrl: () =>
    `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(WA_CTA.consultationMessage)}`,
} as const;
