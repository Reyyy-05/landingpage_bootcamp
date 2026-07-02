"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendGAEvent } from "@next/third-parties/google";
import { Loader2, CheckCircle2, AlertCircle, Tag, ChevronDown } from "lucide-react";
import { studentSchema, type StudentSchema } from "@/schemas/studentSchema";
import { STUDENT_STATUSES, GENDER_OPTIONS } from "@/constants";
import type { Bootcamp } from "@/types";

// ─── Configuration: Admin WhatsApp Number ─────────────────────
// Easy to modify placeholder value as requested
const WA_ADMIN_NUMBER = "6285177114036";

// ─── Dynamic WhatsApp Link Generator ──────────────────────────
const buildPersonalizedWaLink = (data: StudentSchema, bootcampName: string) => {
  let identityString = "";
  if (data.student_status === "PELAJAR") {
    identityString = `saya *${data.full_name}* (pelajar asal sekolah *${data.school_name}*)`;
  } else if (data.student_status === "MAHASISWA") {
    identityString = `saya *${data.full_name}* (mahasiswa dari kampus *${data.university_name}*)`;
  } else if (data.student_status === "KARYAWAN") {
    identityString = `saya *${data.full_name}* (karyawan dari *${data.workplace}*)`;
  } else {
    identityString = `saya *${data.full_name}* (umum)`;
  }

  const messageText = `Halo Admin Creativemu Academy 👋\n\nSaya ingin mengonfirmasi pendaftaran kelas gratis *${bootcampName}*. Sebagai informasi, ${identityString}.\n\nMohon info detail akses Zoom dan materi kelas. Terima kasih!`;
  const fullText = messageText + "\n\n_Ref: LP-FREECLASS_";
  
  return `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(fullText)}`;
};

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
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600";

const inputErrorClass =
  "w-full px-4 py-3 rounded-xl border border-red-300 bg-red-50 text-gray-900 placeholder-gray-400 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400";

interface VoucherSectionProps {
  control: Control<StudentSchema>;
  register: UseFormRegister<StudentSchema>;
  errors: FieldErrors<StudentSchema>;
  setValue: UseFormSetValue<StudentSchema>;
}

function VoucherSection({ control, register, errors, setValue }: VoucherSectionProps) {
  const voucherCode = useWatch({
    control,
    name: "voucher_code",
    defaultValue: "",
  });

  const bootcampId = useWatch({
    control,
    name: "bootcamp_id",
    defaultValue: "",
  });

  const debouncedVoucher = useDebounce(voucherCode, 700);

  const [voucherState, setVoucherState] = useState<{
    status: "idle" | "checking" | "valid" | "invalid";
    message?: string;
    discountLabel?: string;
  }>({ status: "idle" });

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
        bootcamp_id: bootcampId || undefined,
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
  }, [debouncedVoucher, bootcampId]);

  return (
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
        <div className="mt-2 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <CheckCircle2 size={14} />
          <span>{voucherState.message} — <strong>{voucherState.discountLabel}</strong></span>
        </div>
      )}
      {voucherState.status === "invalid" && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
          <AlertCircle size={13} />
          {voucherState.message}
        </p>
      )}
    </div>
  );
}

// ─── High-Converting Success Card Component ───────────────────
function SuccessCard({ 
  data, 
  bootcampName 
}: { 
  data: StudentSchema; 
  bootcampName: string;
}) {
  const [countdown, setCountdown] = useState(3);
  const waLink = buildPersonalizedWaLink(data, bootcampName);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = waLink;
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, waLink]);

  const handleManualRedirect = () => {
    window.location.href = waLink;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mx-auto size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={36} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Pendaftaran Berhasil!
      </h2>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        Selamat, pendaftaran Anda untuk kelas gratis <strong>{bootcampName}</strong> telah berhasil disimpan.
        Silakan klaim akses Zoom kelas via WhatsApp untuk memulai.
      </p>

      <button
        onClick={handleManualRedirect}
        className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 hover:shadow-lg shadow-emerald-200"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.18 1.448 4.747 1.449 5.424 0 9.838-4.417 9.84-9.846.002-2.63-1.02-5.1-2.871-6.956-1.85-1.855-4.32-2.875-6.956-2.875-5.407 0-9.82 4.415-9.823 9.846-.001 1.83.482 3.619 1.398 5.187L1.875 22.13l5.053-1.849c-.198-.124-.198-.124 0 0zm11.12-6.167c-.247-.123-1.463-.722-1.692-.806-.228-.083-.394-.124-.56.124-.165.247-.641.806-.786.97-.145.165-.29.185-.537.062-.247-.125-1.045-.385-1.99-1.23-.735-.656-1.232-1.47-1.376-1.716-.145-.247-.015-.38.11-.502.11-.11.248-.29.37-.435.124-.145.165-.247.248-.412.083-.165.042-.31-.02-.435-.064-.125-.56-1.35-.768-1.85-.203-.49-.41-.422-.56-.43-.146-.007-.31-.007-.476-.007-.166 0-.436.062-.663.31-.228.248-.87.85-.87 2.072 0 1.22.885 2.4 1.008 2.565.124.165 1.74 2.658 4.218 3.727.59.254 1.05.405 1.41.52.593.187 1.132.16 1.558.097.475-.072 1.463-.6 1.67-1.18.207-.58.207-1.076.145-1.18-.063-.104-.228-.166-.475-.29z"/>
        </svg>
        <span>Klaim Akses Zoom via WhatsApp ({countdown}s)</span>
      </button>
      
      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Sistem akan mengalihkan Anda secara otomatis. Jika tidak beralih, silakan klik tombol di atas.
      </p>
    </div>
  );
}

// ─── StudentRegistrationForm Component ────────────────────────
export function StudentRegistrationForm() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [isLoadingBootcamps, setIsLoadingBootcamps] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Success states
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<StudentSchema | null>(null);
  const [targetBootcampName, setTargetBootcampName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      package_selected: "laravel_full_online",
    } as any,
  });

  const watchedStatus = watch("student_status");
  const isPelajar = watchedStatus === "PELAJAR";
  const isMahasiswa = watchedStatus === "MAHASISWA";

  // ── Explicitly reset/set non-relevant fields to null/empty when status changes ──
  useEffect(() => {
    if (watchedStatus === "PELAJAR") {
      setValue("school_name", "");
      setValue("major", "");
      setValue("university_name", null);
      setValue("workplace", null);
      setValue("job_title", null);
    } else if (watchedStatus === "MAHASISWA") {
      setValue("university_name", "");
      setValue("major", "");
      setValue("school_name", null);
      setValue("workplace", null);
      setValue("job_title", null);
    } else if (watchedStatus === "KARYAWAN") {
      setValue("workplace", "");
      setValue("job_title", "");
      setValue("school_name", null);
      setValue("university_name", null);
      setValue("major", null);
    } else if (watchedStatus === "UMUM") {
      setValue("school_name", null);
      setValue("university_name", null);
      setValue("workplace", null);
      setValue("job_title", null);
      setValue("major", null);
    }
  }, [watchedStatus, setValue]);

  // ── Hardcoded fallback when DB has no open programs ─────────
  const FALLBACK_BOOTCAMP: Bootcamp = {
    id: "batch-1-laravel",
    name: "Batch 1 Laravel Web Developer",
    batch_number: 1,
    program_type: "bootcamp",
    description: null,
    start_date: null,
    end_date: null,
    registration_open: null,
    registration_close: null,
    max_capacity: 50,
    location: "Full Online",
    price_reguler: 750_000,
    price_premium: null,
    price_intensif: null,
    is_active: true,
    is_open: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // ── Load bootcamps ─────────────────────────────────────────
  useEffect(() => {
    fetch("/api/bootcamps-public")
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) {
          setBootcamps(d.data);
        } else {
          setBootcamps([FALLBACK_BOOTCAMP]);
        }
      })
      .catch(() => {
        setBootcamps([FALLBACK_BOOTCAMP]);
      })
      .finally(() => setIsLoadingBootcamps(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Submit ─────────────────────────────────────────────────
  const onSubmit = async (data: StudentSchema) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error ?? "Gagal mendaftar, coba lagi.");
        return;
      }

      // Track conversion event on database insert success
      sendGAEvent({
        event: 'bootcamp_registration_success',
        value: {
          price: 750000,
          currency: 'IDR'
        }
      });

      // Retrieve bootcamp name to show in the Success Card
      const selectedBootcamp = bootcamps.find((b) => b.id === data.bootcamp_id);
      const nameOfBootcamp = selectedBootcamp ? selectedBootcamp.name : "Bootcamp Laravel Web Developer";
      setTargetBootcampName(nameOfBootcamp);
      setSubmittedData(data);
      setIsSuccess(true);
    } catch {
      toast.error("Terjadi kesalahan. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (formErrors: FieldErrors<StudentSchema>) => {
    console.log("Validation Errors:", formErrors);
    toast.error("Mohon lengkapi semua field yang wajib diisi dengan benar.");

    const firstErrorKey = Object.keys(formErrors)[0];
    if (firstErrorKey) {
      const element =
        document.querySelector(`[name="${firstErrorKey}"]`) ||
        document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // ── Success State Overlay ───────────────────────────────────
  if (isSuccess && submittedData) {
    return <SuccessCard data={submittedData} bootcampName={targetBootcampName} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                  {...register("phone_number")}
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  className={errors.phone_number ? inputErrorClass : inputClass}
                />
                <FieldError message={errors.phone_number?.message} />
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

            {/* Conditional input wrapper with smooth fade-in / height transitions to prevent layout shifts */}
            <div className="transition-all duration-300 ease-in-out">
              
              {/* Nama Sekolah & Jurusan — conditional: pelajar SMA/SMK */}
              {isPelajar && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-4">
                  <div>
                    <Label required>Nama Sekolah</Label>
                    <input
                      {...register("school_name")}
                      type="text"
                      placeholder="SMKN 1 Yogyakarta, SMA Negeri 3 Bantul, dll."
                      className={errors.school_name ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.school_name?.message} />
                  </div>
                  <div>
                    <Label required>Jurusan</Label>
                    <input
                      {...register("major")}
                      type="text"
                      placeholder="RPL, TKJ, Multimedia, dll."
                      className={errors.major ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.major?.message} />
                  </div>
                </div>
              )}

              {/* Nama Kampus & Jurusan — conditional: mahasiswa */}
              {isMahasiswa && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-4">
                  <div>
                    <Label required>Nama Kampus / Universitas</Label>
                    <input
                      {...register("university_name")}
                      type="text"
                      placeholder="Universitas Gadjah Mada, UIN Sunan Kalijaga, dll."
                      className={errors.university_name ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.university_name?.message} />
                  </div>
                  <div>
                    <Label required>Jurusan / Program Studi</Label>
                    <input
                      {...register("major")}
                      type="text"
                      placeholder="Manajemen Bisnis, Teknik Informatika, dll."
                      className={errors.major ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.major?.message} />
                  </div>
                </div>
              )}

              {/* Tempat Kerja & Posisi — conditional: KARYAWAN */}
              {watchedStatus === "KARYAWAN" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-4">
                  <div>
                    <Label required>Tempat Kerja / Instansi</Label>
                    <input
                      {...register("workplace")}
                      type="text"
                      placeholder="Nama perusahaan atau instansi tempat bekerja"
                      className={errors.workplace ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.workplace?.message} />
                  </div>
                  <div>
                    <Label required>Posisi / Jabatan</Label>
                    <input
                      {...register("job_title")}
                      type="text"
                      placeholder="Misal: Web Developer, UI Designer, Admin, dll."
                      className={errors.job_title ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.job_title?.message} />
                  </div>
                </div>
              )}
            </div>

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

            {/* Paket (Hidden as there is only 1 package) */}
            <input type="hidden" {...register("package_selected")} value="laravel_full_online" />

            {/* Kode Voucher */}
            <VoucherSection
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
            />

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
