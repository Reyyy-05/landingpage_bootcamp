import type { VoucherValidationResult, ApiSuccess, ApiError } from "@/types";
import { logger } from "@/lib/logger";

export async function validateVoucherCode(
  code: string,
  bootcampId?: string
): Promise<{ valid: boolean; message?: string; discountLabel?: string }> {
  try {
    const formattedCode = code.trim().toUpperCase();
    if (!formattedCode || formattedCode.length < 3) {
      return { valid: false };
    }

    const res = await fetch("/api/vouchers/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: formattedCode, bootcamp_id: bootcampId }),
    });

    if (!res.ok) {
      const errorJson: ApiError = await res.json().catch(() => ({ error: "Gagal memverifikasi voucher" }));
      return { valid: false, message: errorJson.error ?? "Voucher tidak berlaku" };
    }

    const json: ApiSuccess<VoucherValidationResult & { discountLabel?: string }> = await res.json();
    if (json.data?.valid) {
      const label = json.data.discountLabel ?? "Voucher valid!";
      return { valid: true, message: label, discountLabel: label };
    }

    return {
      valid: false,
      message: json.data?.error ?? "Kode voucher tidak berlaku",
    };
  } catch (error) {
    logger.error("Voucher validation network error", "VoucherService", error);
    return { valid: false, message: "Gagal memverifikasi voucher (koneksi terputus)" };
  }
}
