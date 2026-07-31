import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import type { ApiError, ApiSuccess, VoucherValidationResult } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, bootcamp_id } = body as { code: string; bootcamp_id?: string };

    if (!code || typeof code !== "string" || code.trim().length < 3) {
      return NextResponse.json<ApiError>(
        { error: "Kode voucher tidak valid" },
        { status: 400 }
      );
    }

    const searchCode = code.trim().toUpperCase();

    // Special Theme Vouchers (HUT RI ke-81)
    if (searchCode === "MERDEKA81" || searchCode === "MERDEKA") {
      return NextResponse.json<ApiSuccess<VoucherValidationResult & { discountLabel: string }>>({
        data: {
          valid: true,
          voucher: {
            id: "voucher-merdeka-81",
            code: "MERDEKA81",
            bootcamp_id: null,
            description: "Promo Spesial HUT RI ke-81 — Cukup Bayar 81%",
            discount_type: "percentage",
            discount_value: 19,
            max_uses: 1000,
            used_count: 81,
            valid_from: null,
            valid_until: "2026-08-17T23:59:59+07:00",
            is_active: true,
            created_by: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          discountLabel: "Promo Kemerdekaan RI Aktif (Cukup Bayar 81%!)",
        },
      });
    }

    const supabase = await createAdminClient();

    // Look up voucher (read-only check — don't increment yet)
    const { data: voucher, error } = await supabase
      .from("vouchers")
      .select("*")
      .eq("code", searchCode)
      .single();

    if (error || !voucher) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: { valid: false, error: "Kode voucher tidak ditemukan" },
      });
    }

    if (!voucher.is_active) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: { valid: false, error: "Voucher sudah tidak aktif" },
      });
    }

    if (voucher.used_count >= voucher.max_uses) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: { valid: false, error: "Kuota voucher sudah habis" },
      });
    }

    const now = new Date();
    if (voucher.valid_from && new Date(voucher.valid_from) > now) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: { valid: false, error: "Voucher belum berlaku" },
      });
    }
    if (voucher.valid_until && new Date(voucher.valid_until) < now) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: { valid: false, error: "Voucher sudah kadaluarsa" },
      });
    }

    if (
      voucher.bootcamp_id &&
      bootcamp_id &&
      voucher.bootcamp_id !== bootcamp_id
    ) {
      return NextResponse.json<ApiSuccess<VoucherValidationResult>>({
        data: {
          valid: false,
          error: "Voucher tidak berlaku untuk program ini",
        },
      });
    }

    // Calculate discount display amount
    const discountAmount =
      voucher.discount_type === "percentage"
        ? null // Can't calculate without base price
        : voucher.discount_value;

    const discountLabel =
      voucher.discount_type === "percentage"
        ? `Diskon ${voucher.discount_value}%`
        : `Hemat ${formatCurrency(voucher.discount_value)}`;

    return NextResponse.json<ApiSuccess<VoucherValidationResult & { discountLabel: string }>>({
      data: {
        valid: true,
        voucher,
        discount_amount: discountAmount ?? undefined,
        // @ts-ignore
        discountLabel,
      },
    });
  } catch (error) {
    logger.error("Voucher validate API error", "VoucherValidateRoute", error);
    return NextResponse.json<ApiError>(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
