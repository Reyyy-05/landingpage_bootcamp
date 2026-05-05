// ─── Database Row Types ────────────────────────────────────────

export type ProgramType = "bootcamp" | "magang" | "sertifikasi";
export type PackageType = "reguler" | "premium" | "intensif";
export type DiscountType = "fixed" | "percentage";
export type Gender = "laki-laki" | "perempuan";
export type RegistrationStatus = "pending" | "confirmed" | "rejected";

export type StudentStatus =
  | "pelajar_sma_smk_1"
  | "pelajar_sma_smk_2"
  | "pelajar_sma_smk_3"
  | "mahasiswa_1"
  | "mahasiswa_2"
  | "mahasiswa_3"
  | "mahasiswa_4"
  | "lainnya";

// ─── Admin ────────────────────────────────────────────────────
export interface Admin {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Bootcamp ─────────────────────────────────────────────────
export interface Bootcamp {
  id: string;
  name: string;
  program_type: ProgramType;
  batch_number: number;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  registration_open: string | null;
  registration_close: string | null;
  max_capacity: number;
  price_reguler: number;
  price_premium: number | null;
  price_intensif: number | null;
  location: string | null;
  is_active: boolean;
  is_open: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Voucher ──────────────────────────────────────────────────
export interface Voucher {
  id: string;
  code: string;
  bootcamp_id: string | null;
  description: string | null;
  discount_type: DiscountType;
  discount_value: number;
  max_uses: number;
  used_count: number;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Student ──────────────────────────────────────────────────
export interface Student {
  id: string;
  email: string;
  full_name: string;
  birth_place: string;
  birth_date: string;
  address: string;
  phone_wa: string;
  instagram_handle: string;
  gender: Gender;
  student_status: StudentStatus;
  major: string | null;
  school_name: string | null;
  university_name: string | null;
  bootcamp_id: string | null;
  package_selected: PackageType | null;
  voucher_id: string | null;
  voucher_code_used: string | null;
  registration_status: RegistrationStatus;
  admin_notes: string | null;
  confirmed_at: string | null;
  confirmed_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  bootcamp?: Bootcamp;
  voucher?: Voucher;
  confirmed_by_admin?: Admin;
}

// ─── Form Types ───────────────────────────────────────────────
export interface StudentFormData {
  email: string;
  full_name: string;
  birth_place: string;
  birth_date: Date;
  address: string;
  phone_wa: string;
  instagram_handle: string;
  gender: Gender;
  student_status: StudentStatus;
  major?: string;
  school_name?: string;
  university_name?: string;
  bootcamp_id: string;
  package_selected: PackageType;
  voucher_code?: string;
}

export interface BootcampFormData {
  name: string;
  program_type: ProgramType;
  batch_number: number;
  description?: string;
  start_date?: string;
  end_date?: string;
  registration_open?: string;
  registration_close?: string;
  max_capacity: number;
  price_reguler: number;
  price_premium?: number;
  price_intensif?: number;
  location?: string;
  is_active: boolean;
  is_open: boolean;
}

export interface VoucherFormData {
  code: string;
  bootcamp_id?: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  max_uses: number;
  valid_from?: string;
  valid_until?: string;
  is_active: boolean;
}

// ─── API Response Types ───────────────────────────────────────
export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

export interface VoucherValidationResult {
  valid: boolean;
  voucher?: Voucher;
  discount_amount?: number;
  error?: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────
export interface DashboardStats {
  total: number;
  pending: number;
  confirmed: number;
  rejected: number;
}

// ─── Table Filter Types ───────────────────────────────────────
export interface StudentFilters {
  search: string;
  status: RegistrationStatus | "all";
  program_type: ProgramType | "all";
  bootcamp_id: string | "all";
  gender: Gender | "all";
  student_status: StudentStatus | "all";
}
