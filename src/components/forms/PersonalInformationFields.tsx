"use client";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import type { StudentSchema } from "@/schemas/studentSchema";
import { GENDER_OPTIONS } from "@/constants";

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

interface PersonalInformationFieldsProps {
  register: UseFormRegister<StudentSchema>;
  errors: FieldErrors<StudentSchema>;
}

export function PersonalInformationFields({ register, errors }: PersonalInformationFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Nama Lengkap */}
      <div>
        <Label required>Nama Lengkap</Label>
        <input
          {...register("full_name")}
          type="text"
          placeholder="Contoh: Ahmad Rizky"
          className={errors.full_name ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.full_name?.message} />
      </div>

      {/* Email & Nomor WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Email (Aktif)</Label>
          <input
            {...register("email")}
            type="email"
            placeholder="ahmad@gmail.com"
            className={errors.email ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Label required>Nomor WhatsApp</Label>
          <input
            {...register("phone_number")}
            type="tel"
            placeholder="081234567890"
            className={errors.phone_number ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.phone_number?.message} />
        </div>
      </div>

      {/* Tempat & Tanggal Lahir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Tempat Lahir</Label>
          <input
            {...register("birth_place")}
            type="text"
            placeholder="Contoh: Yogyakarta"
            className={errors.birth_place ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.birth_place?.message} />
        </div>

        <div>
          <Label required>Tanggal Lahir</Label>
          <input
            {...register("birth_date")}
            type="date"
            className={errors.birth_date ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.birth_date?.message} />
        </div>
      </div>

      {/* Alamat Domisili */}
      <div>
        <Label required>Alamat Domisili Lengkap</Label>
        <textarea
          {...register("address")}
          rows={2}
          placeholder="Jl. Malioboro No. 12, Sleman, DIY"
          className={`${errors.address ? inputErrorClass : inputClass} resize-none`}
        />
        <FieldError message={errors.address?.message} />
      </div>

      {/* Gender & Instagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Jenis Kelamin</Label>
          <select
            {...register("gender")}
            className={errors.gender ? inputErrorClass : inputClass}
          >
            <option value="">-- Pilih Jenis Kelamin --</option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.gender?.message} />
        </div>

        <div>
          <Label required>Username Instagram</Label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
              @
            </span>
            <input
              {...register("instagram_handle")}
              type="text"
              placeholder="ahmadrizky"
              className={`${errors.instagram_handle ? inputErrorClass : inputClass} pl-8`}
            />
          </div>
          <FieldError message={errors.instagram_handle?.message} />
        </div>
      </div>
    </div>
  );
}
