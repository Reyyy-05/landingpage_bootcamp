"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";
import { logger } from "@/lib/logger";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { studentSchema, type StudentSchema } from "@/schemas/studentSchema";
import type { Bootcamp } from "@/types";

// Sub-component imports for form modularity (Task 1 Architecture Improvement)
import { PersonalInformationFields } from "@/components/forms/PersonalInformationFields";
import { StatusSpecificFields } from "@/components/forms/StatusSpecificFields";
import { VoucherSection } from "@/components/forms/VoucherSection";
import { fetchPublicBootcamps } from "@/services/bootcampService";
import { submitStudentRegistration } from "@/services/studentService";

// ─── Configuration: Admin WhatsApp Number ─────────────────────
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

  const messageText = `Halo Admin Creativemu Academy\n\nSaya ingin mengonfirmasi pendaftaran kelas gratis *${bootcampName}*. Sebagai informasi, ${identityString}.\n\nMohon info detail akses Zoom dan materi kelas. Terima kasih!`;
  const fullText = messageText + "\n\n_Ref: LP-FREECLASS_";
  
  return `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(fullText)}`;
};

// ─── Helper Components ─────────────────────────────────────────
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

// ─── Success Card Overlay ─────────────────────────────────────
function SuccessCard({ data, bootcampName }: { data: StudentSchema; bootcampName: string }) {
  const waLink = buildPersonalizedWaLink(data, bootcampName);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={36} className="text-emerald-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Pendaftaran Berhasil!
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Terima kasih <strong className="text-gray-900">{data.full_name}</strong>. Data Anda telah terdaftar untuk program <strong className="text-violet-700">{bootcampName}</strong>.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
          Langkah Terakhir:
        </p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Klik tombol di bawah untuk mengonfirmasi pendaftaran Anda ke WhatsApp Admin. Tim kami akan mengirimkan detail akses kelas & grup belajar.
        </p>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.trackWhatsAppRedirect(data.email)}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
      >
        Konfirmasi via WhatsApp (Admin)
      </a>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
interface StudentRegistrationFormProps {
  bootcamps?: Bootcamp[];
  defaultBootcampId?: string;
}

export function StudentRegistrationForm({
  bootcamps: initialBootcamps = [],
  defaultBootcampId,
}: StudentRegistrationFormProps) {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>(initialBootcamps);
  const [isLoadingBootcamps, setIsLoadingBootcamps] = useState(initialBootcamps.length === 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<StudentSchema | null>(null);
  const [targetBootcampName, setTargetBootcampName] = useState("Bootcamp Laravel Web Developer");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      birth_place: "",
      birth_date: "",
      address: "",
      instagram_handle: "",
      gender: undefined,
      student_status: undefined,
      school_name: "",
      university_name: "",
      major: "",
      workplace: "",
      job_title: "",
      bootcamp_id: defaultBootcampId || "",
      package_selected: "reguler",
      voucher_code: "MERDEKA81",
    },
  });

  const selectedBootcampId = useWatch({
    control,
    name: "bootcamp_id",
  });

  const FALLBACK_BOOTCAMP: Bootcamp = {
    id: "fallback-laravel-batch-1",
    name: "Bootcamp Laravel Web Developer",
    program_type: "bootcamp",
    description: "Pelatihan intensif 3 Bulan siap kerja",
    batch_number: 1,
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    registration_open: new Date().toISOString(),
    registration_close: new Date().toISOString(),
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

  // ── Load bootcamps if not supplied ─────────────────────────
  useEffect(() => {
    if (initialBootcamps.length > 0) return;
    fetchPublicBootcamps()
      .then((data) => {
        if (data && data.length > 0) {
          setBootcamps(data);
          if (!selectedBootcampId) {
            setValue("bootcamp_id", data[0].id);
          }
        } else {
          setBootcamps([FALLBACK_BOOTCAMP]);
          if (!selectedBootcampId) {
            setValue("bootcamp_id", FALLBACK_BOOTCAMP.id);
          }
        }
      })
      .finally(() => setIsLoadingBootcamps(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Submit Handler ─────────────────────────────────────────
  const onSubmit = async (data: StudentSchema) => {
    setIsSubmitting(true);
    try {
      const response = await submitStudentRegistration(data);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      const selectedBootcamp = bootcamps.find((b) => b.id === data.bootcamp_id);
      const nameOfBootcamp = selectedBootcamp ? selectedBootcamp.name : "Bootcamp Laravel Web Developer";
      
      analytics.trackSuccess(nameOfBootcamp);

      setTargetBootcampName(nameOfBootcamp);
      setSubmittedData(data);
      setIsSuccess(true);
    } catch (err) {
      logger.error("Error submitting registration form", "StudentRegistrationForm", err);
      toast.error("Terjadi kesalahan. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (formErrors: FieldErrors<StudentSchema>) => {
    toast.error("Mohon lengkapi semua field yang wajib diisi dengan benar.");

    Object.entries(formErrors).forEach(([key, err]) => {
      if (err && 'message' in err) {
        analytics.trackValidationError(key, String(err.message));
      }
    });

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

  if (isSuccess && submittedData) {
    return <SuccessCard data={submittedData} bootcampName={targetBootcampName} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any, onError as any)}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Form header */}
      <div className="bg-violet-700 px-8 py-6 text-white">
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Formulir Pendaftaran Program
        </h2>
        <p className="text-violet-200 text-sm mt-1">
          Lengkapi data diri Anda untuk mengamankan slot pendaftaran
        </p>
      </div>

      <div className="p-8 flex flex-col gap-6">
        {/* Loading state for bootcamps */}
        {isLoadingBootcamps ? (
          <div className="py-8 flex items-center justify-center text-violet-600 gap-2">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-sm font-medium">Memuat data program...</span>
          </div>
        ) : (
          <>
            {/* Program Selection Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Program Bootcamp yang Dipilih <span className="text-red-500">*</span>
              </label>
              <select
                {...register("bootcamp_id")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600"
              >
                {bootcamps.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — Batch {b.batch_number}
                  </option>
                ))}
              </select>
              {errors.bootcamp_id && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={13} />
                  {errors.bootcamp_id.message}
                </p>
              )}
            </div>

            {/* ─── SECTION 1: Personal Information ──────────────── */}
            <div>
              <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
                Data Pribadi
              </h3>
              <PersonalInformationFields register={register} errors={errors} />
            </div>

            {/* ─── SECTION 2: Status & Academic Background ──────── */}
            <div>
              <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
                Status & Latar Belakang
              </h3>
              <StatusSpecificFields control={control as any} register={register} errors={errors} />
            </div>

            {/* ─── SECTION 3: Voucher & Promo ──────────────────── */}
            <div>
              <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-4 pb-2 border-b border-violet-100">
                Voucher / Kode Promo
              </h3>
              <VoucherSection
                control={control as any}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Memproses Pendaftaran...
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
