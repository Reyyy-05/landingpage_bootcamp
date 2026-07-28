"use client";

import { useState, useEffect } from "react";
import { useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { AlertCircle, CheckCircle2, Loader2, Tag } from "lucide-react";
import type { StudentSchema } from "@/schemas/studentSchema";

import { validateVoucherCode } from "@/services/voucherService";
import { analytics } from "@/lib/analytics";

// ─── Debounce hook ───────────────────────────────────────────
function useDebounce<T>(value: T, delay = 600): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
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
  control: Control<any>;
  register: UseFormRegister<StudentSchema>;
  errors: FieldErrors<StudentSchema>;
  setValue: UseFormSetValue<StudentSchema>;
}

export function VoucherSection({ control, register, errors, setValue }: VoucherSectionProps) {
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
    const code = debouncedVoucher?.trim().toUpperCase();

    if (!code || code.length < 3) {
      setVoucherState({ status: "idle" });
      return;
    }

    let isMounted = true;
    setVoucherState({ status: "checking" });

    validateVoucherCode(code, bootcampId).then((res) => {
      if (!isMounted) return;
      analytics.trackVoucherCheck(code, res.valid, res.discountLabel);
      if (res.valid) {
        setVoucherState({
          status: "valid",
          message: res.message ?? "Voucher valid!",
          discountLabel: res.discountLabel ?? "Voucher valid!",
        });
      } else {
        setVoucherState({
          status: "invalid",
          message: res.message ?? "Kode voucher tidak berlaku",
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [debouncedVoucher, bootcampId]);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        Kode Voucher / Promo{" "}
        <span className="text-xs font-normal text-gray-500">(Opsional)</span>
      </label>
      <div className="relative">
        <input
          {...register("voucher_code")}
          type="text"
          placeholder="Contoh: CREATIVEMU100"
          className={`${
            errors.voucher_code || voucherState.status === "invalid"
              ? inputErrorClass
              : inputClass
          } uppercase tracking-wider font-semibold placeholder:font-normal placeholder:normal-case pr-10`}
          onChange={(e) => {
            setValue("voucher_code", e.target.value.toUpperCase());
          }}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {voucherState.status === "checking" && (
            <Loader2 size={16} className="animate-spin text-violet-600" />
          )}
          {voucherState.status === "valid" && (
            <CheckCircle2 size={16} className="text-emerald-500" />
          )}
          {voucherState.status === "invalid" && (
            <AlertCircle size={16} className="text-red-500" />
          )}
          {voucherState.status === "idle" && <Tag size={16} />}
        </div>
      </div>

      {voucherState.status === "valid" && (
        <p className="mt-1.5 text-xs text-emerald-600 font-medium flex items-center gap-1">
          <CheckCircle2 size={13} />
          {voucherState.message}
        </p>
      )}
      {voucherState.status === "invalid" && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={13} />
          {voucherState.message}
        </p>
      )}
      <FieldError message={errors.voucher_code?.message} />
    </div>
  );
}
