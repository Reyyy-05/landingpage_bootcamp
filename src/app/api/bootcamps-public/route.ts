import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ApiSuccess, ApiError, Bootcamp } from "@/types";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bootcamps")
      .select("id, name, batch_number, program_type, location, price_reguler, price_premium, price_intensif, is_open")
      .eq("is_active", true)
      .eq("is_open", true)
      .order("batch_number", { ascending: false });

    if (error) throw error;

    return NextResponse.json<ApiSuccess<Bootcamp[]>>({
      data: data ?? [],
    });
  } catch (error) {
    console.error("[bootcamps-public] error:", error);
    return NextResponse.json<ApiError>(
      { error: "Gagal memuat daftar program" },
      { status: 500 }
    );
  }
}
