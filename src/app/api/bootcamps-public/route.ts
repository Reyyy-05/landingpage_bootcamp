import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ApiError } from "@/types";

export const dynamic = "force-dynamic";

type PublicBootcamp = {
  id: string;
  name: string;
  batch_number: number;
  program_type: string;
  location: string | null;
  price_reguler: number;
  price_premium: number | null;
  price_intensif: number | null;
  is_open: boolean;
};

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

    return NextResponse.json<{ data: PublicBootcamp[] }>({
      data: (data ?? []) as PublicBootcamp[],
    });
  } catch (error) {
    console.error("[bootcamps-public] error:", error);
    return NextResponse.json<ApiError>(
      { error: "Gagal memuat daftar program" },
      { status: 500 }
    );
  }
}
