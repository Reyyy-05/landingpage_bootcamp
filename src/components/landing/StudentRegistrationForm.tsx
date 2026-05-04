"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle, Tag, ChevronDown } from "lucide-react";
import { studentFormSchema, type StudentFormSchema } from "@/lib/validations/student";
import { STUDENT_STATUSES, GENDER_OPTIONS, PACKAGES } from "@/constants";
import { formatCurrency } from "@/lib/utils";
import type { Bootcamp } from "@/types";

// ─── Debounce hook ───────────────────────────────────────────
function useDebounce<T>(value: T, delay = 600): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ─── Field Components ─────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
      <AlertCircle size={13} />
      {message}
    </p>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all";

const inputErrorClass =
  "w-full px-4 py-3 rounded-xl border border-red-300 bg-red-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all";

// ─── Main Component ───────────────────────────────────────────
export function StudentRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get("package") as StudentFormSchema["package_selected"] | null;

  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [isLoadingBootcamps, setIsLoadingBootcamps] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voucherState, setVoucherState] = useState<{
    status: "idle" | "checking" | "valid" | "invalid";
    message?: string;
    discountLabel?: string;
  }>({ status: "idle" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentFormSchema>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      package_selected: preselectedPackage ?? undefined,
    },
  });

  const watchedStatus = watch("student_status");
  const watchedVoucher = watch("voucher_code");
  const watchedBootcamp = watch("bootcamp_id");
  const debouncedVoucher = useDebounce(watchedVoucher, 700);
  const isMahasiswa = watchedStatus?.startsWith("mahasiswa_");

  // ── Load bootcamps ─────────────────────────────────────────
  useEffect(() => {
    fetch("/api/bootcamps-public")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setBootcamps(d.data);
      })
      .catch(() => {})
      .finally(() => setIsLoadingBootcamps(false));
  }, []);

  // ── Validate voucher on debounce ───────────────────────────
  useEffect(() => {
    if (!debouncedVoucher || debouncedVoucher.length < 3) {
      setVoucherState({ status: "idle" });
      return;
    }
    setVoucherState({ status: "checking" });
    fetch("/api/vouchers/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: debouncedVoucher,
        bootcamp_id: watchedBootcamp || undefined,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        const result = res?.data;
        if (result?.valid) {
          setVoucherState({
            status: "valid",
            message: "Voucher valid!",
            discountLabel: result.discountLabel,
          });
        } else {
          setVoucherState({ status: "invalid", message: result?.error ?? "Voucher tidak valid" });
        }
      })
      .catch(() => setVoucherState({ status: "idle" }));
  }, [debouncedVoucher, watchedBootcamp]);

  // ── Submit ─────────────────────────────────────────────────
  const onSubmit = async (data: StudentFormSchema) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          birth_date: data.birth_date instanceof Date
            ? data.birth_date.toISOString().split("T")[0]
            : data.birth_date,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error ?? "Gagal mendaftar, coba lagi.");
        return;
      }

      // Redirect to confirmation page with student data
      const params = new URLSearchParams({
        id: result.data.student.id,
        name: result.data.student.full_name,
        program: result.data.bootcampName,
        wa: result.data.waLink,
      });
      router.push(`/konfirmasi?${params.toString()}`);
    } catch {
      toast.error("Terjadi kesalahan. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Form header */}
      <div className="bg-violet-700 px-8 py-6 text-white">
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Data Pendaftaran
        </h2>
        <p className="text-violet-200 text-sm mt-1">
          Isi semua field dengan tanda * sesuai data asli Anda
        </p>
      </div>

      <div className="p-8 flex flex-col gap-6">

        {/* ─── SECTION 1: Data Pribadi ─────────────────────── */}
        <div>
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
            Data Pribadi
          </h3>
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <Label required>Email</Label>
              <input
                {...register("email")}
                type="email"
                placeholder="contoh: budi@email.com"
                className={errors.email ? inputErrorClass : inputClass}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Nama Lengkap */}
            <div>
              <Label required>Nama Lengkap</Label>
              <input
                {...register("full_name")}
                type="text"
                placeholder="Nama sesuai KTP/Kartu Pelajar"
                className={errors.full_name ? inputErrorClass : inputClass}
              />
              <FieldError message={errors.full_name?.message} />
            </div>

            {/* Tempat & Tanggal Lahir */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label required>Tempat Lahir</Label>
                <input
                  {...register("birth_place")}
                  type="text"
                  placeholder="Yogyakarta"
                  className={errors.birth_place ? inputErrorClass : inputClass}
                />
                <FieldError message={errors.birth_place?.message} />
              </div>
              <div>
                <Label required>Tanggal Lahir</Label>
                <input
                  {...register("birth_date")}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className={errors.birth_date ? inputErrorClass : inputClass}
                />
                <FieldError message={errors.birth_date?.message} />
              </div>
            </div>

            {/* Alamat */}
            <div>
              <Label required>Alamat Lengkap</Label>
              <textarea
                {...register("address")}
                rows={3}
                placeholder="Jl. Raya No. 1, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi"
                className={`${errors.address ? inputErrorClass : inputClass} resize-none`}
              />
              <FieldError message={errors.address?.message} />
            </div>

            {/* WA & Instagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label required>Nomor WhatsApp</Label>
                <input
                  {...register("phone_wa")}
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  className={errors.phone_wa ? inputErrorClass : inputClass}
                />
                <FieldError message={errors.phone_wa?.message} />
              </div>
              <div>
                <Label required>Akun Instagram</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                  <input
                    {...register("instagram_handle")}
                    type="text"
                    placeholder="username"
                    className={`${errors.instagram_handle ? inputErrorClass : inputClass} pl-8`}
                  />
                </div>
                <FieldError message={errors.instagram_handle?.message} />
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div>
              <Label required>Jenis Kelamin</Label>
              <div className="flex gap-4">
                {GENDER_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      {...register("gender")}
                      type="radio"
                      value={opt.value}
                      className="w-4 h-4 accent-violet-600"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError message={errors.gender?.message} />
            </div>

          </div>
        </div>

        {/* ─── SECTION 2: Status Pendidikan ────────────────── */}
        <div>
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
            Status Pendidikan
          </h3>
          <div className="flex flex-col gap-4">

            {/* Status */}
            <div>
              <Label required>Status</Label>
              <div className="relative">
                <select
                  {...register("student_status")}
                  className={`${errors.student_status ? inputErrorClass : inputClass} appearance-none pr-10`}
                >
                  <option value="">-- Pilih Status --</option>
                  {STUDENT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <FieldError message={errors.student_status?.message} />
            </div>

            {/* Jurusan — conditional */}
            {isMahasiswa && (
              <div>
                <Label>Jurusan / Program Studi</Label>
                <input
                  {...register("major")}
                  type="text"
                  placeholder="Manajemen Bisnis, Teknik Informatika, dll."
                  className={errors.major ? inputErrorClass : inputClass}
                />
                <FieldError message={errors.major?.message} />
              </div>
            )}

          </div>
        </div>

        {/* ─── SECTION 3: Pilih Program ────────────────────── */}
        <div>
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
            Pilih Program
          </h3>
          <div className="flex flex-col gap-4">

            {/* Bootcamp */}
            <div>
              <Label required>Program / Batch</Label>
              {isLoadingBootcamps ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 py-3">
                  <Loader2 size={14} className="animate-spin" />
                  Memuat daftar program...
                </div>
              ) : bootcamps.length === 0 ? (
                <div className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-3">
                  Saat ini tidak ada program yang membuka pendaftaran.
                </div>
              ) : (
                <div className="relative">
                  <select
                    {...register("bootcamp_id")}
                    className={`${errors.bootcamp_id ? inputErrorClass : inputClass} appearance-none pr-10`}
                  >
                    <option value="">-- Pilih Program --</option>
                    {bootcamps.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              )}
              <FieldError message={errors.bootcamp_id?.message} />
            </div>

            {/* Paket */}
            <div>
              <Label required>Pilih Paket</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => {
                  const selectedBootcamp = bootcamps.find(b => b.id === watchedBootcamp);
                  const price = selectedBootcamp
                    ? pkg.value === "reguler"
                      ? selectedBootcamp.price_reguler
                      : pkg.value === "premium"
                        ? selectedBootcamp.price_premium
                        : selectedBootcamp.price_intensif
                    : null;

                  return (
                    <label
                      key={pkg.value}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        watch("package_selected") === pkg.value
                          ? "border-violet-600 bg-violet-50"
                          : "border-gray-200 hover:border-violet-300"
                      } ${pkg.popular ? "ring-1 ring-violet-400" : ""}`}
                    >
                      <input
                        {...register("package_selected")}
                        type="radio"
                        value={pkg.value}
                        className="sr-only"
                      />
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                          Populer
                        </span>
                      )}
                      <p className="font-semibold text-gray-900 text-sm mb-0.5"
                        style={{ fontFamily: "var(--font-display)" }}>
                        {pkg.label}
                      </p>
                      {price !== null && price !== undefined && (
                        <p className="text-violet-700 font-bold text-sm">
                          {formatCurrency(price)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>
                    </label>
                  );
                })}
              </div>
              <FieldError message={errors.package_selected?.message} />
            </div>

            {/* Kode Voucher */}
            <div>
              <Label>Kode Voucher <span className="text-gray-400 font-normal">(opsional)</span></Label>
              <div className="relative">
                <Tag size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("voucher_code")}
                  type="text"
                  placeholder="Masukkan kode voucher"
                  className={`${inputClass} pl-10 uppercase`}
                  style={{ textTransform: "uppercase" }}
                />
                {/* Voucher status indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {voucherState.status === "checking" && (
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  )}
                  {voucherState.status === "valid" && (
                    <CheckCircle2 size={16} className="text-green-500" />
                  )}
                  {voucherState.status === "invalid" && (
                    <AlertCircle size={16} className="text-red-400" />
                  )}
                </div>
              </div>
              {/* Voucher feedback */}
              {voucherState.status === "valid" && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  <CheckCircle2 size={14} />
                  <span>{voucherState.message} — <strong>{voucherState.discountLabel}</strong></span>
                </div>
              )}
              {voucherState.status === "invalid" && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={13} />
                  {voucherState.message}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ─── Submit ───────────────────────────────────────── */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-violet-700 text-white font-semibold text-base hover:bg-violet-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Mengirim Pendaftaran...
              </>
            ) : (
              "Kirim Pendaftaran →"
            )}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Data kamu aman dan tidak akan disebarkan kepada pihak ketiga.
          </p>
        </div>

      </div>
    </form>
  );
}
