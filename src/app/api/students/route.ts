import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { studentSchema } from "@/schemas/studentSchema";
import { buildWALink, buildStudentWAMessage, formatWANumber } from "@/lib/utils";
import type { ApiError, ApiSuccess } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Server-side validation ───────────────────────────────
    const parsed = studentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiError>(
        {
          error: "Data tidak valid",
          details: parsed.error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const supabase = await createAdminClient();

    // ── Check bootcamp exists and is open ────────────────────
    const { data: bootcamp, error: bootcampError } = await supabase
      .from("bootcamps")
      .select("id, name, batch_number, is_open, max_capacity")
      .eq("id", data.bootcamp_id)
      .eq("is_active", true)
      .single();

    if (bootcampError || !bootcamp) {
      return NextResponse.json<ApiError>(
        { error: "Program yang dipilih tidak ditemukan atau tidak aktif" },
        { status: 400 }
      );
    }

    if (!bootcamp.is_open) {
      return NextResponse.json<ApiError>(
        { error: "Pendaftaran untuk program ini sudah ditutup" },
        { status: 400 }
      );
    }

    // ── Check duplicate registration ─────────────────────────
    const { data: existing } = await supabase
      .from("students")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .eq("bootcamp_id", data.bootcamp_id)
      .single();

    if (existing) {
      return NextResponse.json<ApiError>(
        {
          error: "Email ini sudah terdaftar untuk program ini",
          details: "Satu email hanya bisa mendaftar satu kali per program",
        },
        { status: 409 }
      );
    }

    // ── Validate & apply voucher (if provided) ────────────────
    let voucherId: string | null = null;
    if (data.voucher_code && data.voucher_code.trim()) {
      const { data: voucherResult, error: voucherError } = await supabase.rpc(
        "apply_voucher",
        {
          p_voucher_code: data.voucher_code.trim().toUpperCase(),
          p_bootcamp_id: data.bootcamp_id,
        }
      );

      if (voucherError) {
        return NextResponse.json<ApiError>(
          { error: "Gagal memvalidasi voucher", details: voucherError.message },
          { status: 500 }
        );
      }

      const result = voucherResult?.[0];
      if (!result?.success) {
        return NextResponse.json<ApiError>(
          { error: result?.error_message ?? "Kode voucher tidak valid" },
          { status: 400 }
        );
      }
      voucherId = result.voucher_id;
    }

    // ── Normalize phone number ────────────────────────────────
    const normalizedPhone = formatWANumber(data.phone_number);

    // Map new statuses to database enum values
    let dbStudentStatus: any = "lainnya";
    if (data.student_status === "PELAJAR") {
      dbStudentStatus = "pelajar_sma_smk_3";
    } else if (data.student_status === "MAHASISWA") {
      dbStudentStatus = "mahasiswa_4";
    } else if (data.student_status === "KARYAWAN" || data.student_status === "UMUM") {
      dbStudentStatus = "lainnya";
    }

    // ── Insert student ────────────────────────────────────────
    const { data: student, error: insertError } = await supabase
      .from("students")
      .insert({
        email: data.email.toLowerCase().trim(),
        full_name: data.full_name.trim(),
        birth_place: data.birth_place.trim(),
        birth_date: data.birth_date,
        address: data.address.trim(),
        phone_wa: normalizedPhone,
        instagram_handle: data.instagram_handle.trim().replace(/^@/, ""),
        gender: data.gender,
        student_status: dbStudentStatus,
        major: data.major?.trim() || null,
        school_name: data.school_name?.trim() || null,
        university_name: data.university_name?.trim() || null,
        workplace: data.workplace?.trim() || null,
        job_title: data.job_title?.trim() || null,
        bootcamp_id: data.bootcamp_id,
        package_selected: data.package_selected,
        voucher_id: voucherId,
        voucher_code_used: voucherId ? data.voucher_code?.toUpperCase() : null,
        registration_status: "pending",
      })
      .select("id, full_name, registration_status")
      .single();

    if (insertError) {
      // Unique violation: duplicate registration
      if (insertError.code === "23505") {
        return NextResponse.json<ApiError>(
          { error: "Email ini sudah terdaftar untuk program ini" },
          { status: 409 }
        );
      }
      console.error("[students/route] insert error:", insertError);
      return NextResponse.json<ApiError>(
        { error: `Database Error: ${insertError.message || insertError.details || "Gagal menyimpan data"}` },
        { status: 500 }
      );
    }

    // ── Build WA confirmation link ────────────────────────────
    const waMessage = buildStudentWAMessage({
      name: student.full_name,
      program: `${bootcamp.name} — Batch ${bootcamp.batch_number}`,
      registrationId: student.id,
    });
    const waLink = buildWALink(
      process.env.NEXT_PUBLIC_ADMIN_WA_NUMBER ?? "6285177114036",
      waMessage
    );

    return NextResponse.json<ApiSuccess<{ student: typeof student; waLink: string; bootcampName: string }>>(
      {
        data: {
          student,
          waLink,
          bootcampName: bootcamp.name,
        },
        message: "Pendaftaran berhasil! Silakan hubungi admin via WhatsApp.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[students/route] unexpected error:", error);
    return NextResponse.json<ApiError>(
      { error: "Terjadi kesalahan server. Coba lagi." },
      { status: 500 }
    );
  }
}
