import type { StudentSchema } from "@/schemas/studentSchema";
import type { ApiSuccess, ApiError } from "@/types";
import { logger } from "@/lib/logger";

export async function submitStudentRegistration(
  data: StudentSchema
): Promise<{ success: true; data: ApiSuccess<{ student: unknown; waLink: string; bootcampName: string }>["data"] } | { success: false; error: string }> {
  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      const apiErr = result as ApiError;
      logger.warn("Student registration API returned non-OK status", "StudentService", apiErr);
      return {
        success: false,
        error: apiErr.error ?? "Gagal mendaftar, coba lagi.",
      };
    }

    return {
      success: true,
      data: (result as ApiSuccess<{ student: unknown; waLink: string; bootcampName: string }>).data,
    };
  } catch (error) {
    logger.error("Unexpected error submitting student registration", "StudentService", error);
    return {
      success: false,
      error: "Terjadi kesalahan koneksi jaringan. Periksa koneksi internet Anda.",
    };
  }
}
