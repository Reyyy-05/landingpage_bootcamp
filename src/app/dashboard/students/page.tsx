import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { StudentsTable } from "@/components/dashboard/StudentsTable";

export const metadata: Metadata = {
  title: "Data Pendaftar | Dashboard",
};

export default async function StudentsPage() {
  const supabase = await createClient();

  const { data: students, error } = await supabase
    .from("students_with_details")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Terjadi kesalahan saat memuat data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Data Pendaftar
        </h1>
        <p className="text-muted-foreground mt-1">
          Daftar seluruh pendaftar program CreativeMU Academy.
        </p>
      </div>

      <StudentsTable data={students || []} />
    </div>
  );
}
