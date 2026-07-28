"use client";

import { useWatch, type Control, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import type { StudentSchema } from "@/schemas/studentSchema";
import { STUDENT_STATUSES } from "@/constants";

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

interface StatusSpecificFieldsProps {
  control: Control<any>;
  register: UseFormRegister<StudentSchema>;
  errors: FieldErrors<StudentSchema>;
}

export function StatusSpecificFields({ control, register, errors }: StatusSpecificFieldsProps) {
  const studentStatus = useWatch({
    control,
    name: "student_status",
  });

  return (
    <div className="space-y-4">
      {/* Status Mahasiswa / Pelajar / Karyawan / Umum */}
      <div>
        <Label required>Status Saat Ini</Label>
        <select
          {...register("student_status")}
          className={errors.student_status ? inputErrorClass : inputClass}
        >
          <option value="">-- Pilih Status --</option>
          {STUDENT_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <FieldError message={errors.student_status?.message} />
      </div>

      {/* Field kondisional berdasarkan status */}
      {studentStatus === "PELAJAR" && (
        <div>
          <Label required>Nama Sekolah (SMA/SMK/MA)</Label>
          <input
            {...register("school_name")}
            type="text"
            placeholder="Contoh: SMKN 1 Bantul"
            className={errors.school_name ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.school_name?.message} />
        </div>
      )}

      {studentStatus === "MAHASISWA" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>Nama Universitas / Kampus</Label>
            <input
              {...register("university_name")}
              type="text"
              placeholder="Contoh: Universitas Gadjah Mada"
              className={errors.university_name ? inputErrorClass : inputClass}
            />
            <FieldError message={errors.university_name?.message} />
          </div>
          <div>
            <Label required>Program Studi / Jurusan</Label>
            <input
              {...register("major")}
              type="text"
              placeholder="Contoh: Teknik Informatika"
              className={errors.major ? inputErrorClass : inputClass}
            />
            <FieldError message={errors.major?.message} />
          </div>
        </div>
      )}

      {studentStatus === "KARYAWAN" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>Nama Perusahaan / Instansi</Label>
            <input
              {...register("workplace")}
              type="text"
              placeholder="Contoh: PT Creativemu Digital"
              className={errors.workplace ? inputErrorClass : inputClass}
            />
            <FieldError message={errors.workplace?.message} />
          </div>
          <div>
            <Label required>Posisi / Jabatan</Label>
            <input
              {...register("job_title")}
              type="text"
              placeholder="Contoh: Frontend Developer"
              className={errors.job_title ? inputErrorClass : inputClass}
            />
            <FieldError message={errors.job_title?.message} />
          </div>
        </div>
      )}
    </div>
  );
}
