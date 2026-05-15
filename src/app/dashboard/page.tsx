import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Overview Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Ambil statistik per bootcamp dari view `student_stats`
  const { data: stats, error } = await supabase
    .from("student_stats")
    .select("*");

  // Jika error atau kosong
  if (error || !stats || stats.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Overview</h1>
        <Card>
          <CardContent className="p-6 text-muted-foreground text-center">
            Belum ada data program yang aktif atau terjadi kesalahan saat mengambil data.
          </CardContent>
        </Card>
      </div>
    );
  }

  // Agregasi total semua bootcamp (jika ada lebih dari 1)
  const totalStudents = stats.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalPending = stats.reduce((acc, curr) => acc + (curr.pending || 0), 0);
  const totalConfirmed = stats.reduce((acc, curr) => acc + (curr.confirmed || 0), 0);
  const totalRejected = stats.reduce((acc, curr) => acc + (curr.rejected || 0), 0);

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan data pendaftaran CreativeMU Academy.
        </p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
            <Users className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Semua program aktif
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Konfirmasi</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground">
              Perlu direview
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dikonfirmasi</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConfirmed}</div>
            <p className="text-xs text-muted-foreground">
              Pendaftar valid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak/Batal</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRejected}</div>
            <p className="text-xs text-muted-foreground">
              Pendaftaran tidak valid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detail per Bootcamp */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Statistik per Program
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((bootcamp) => (
            <Card key={bootcamp.bootcamp_id} className="overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b">
                <h3 className="font-semibold">{bootcamp.bootcamp_name}</h3>
                <p className="text-xs text-muted-foreground">Batch {bootcamp.batch_number}</p>
              </div>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x divide-y md:divide-y-0 border-b">
                  <div className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Total</p>
                    <p className="text-xl font-bold">{bootcamp.total}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-amber-600 mb-1 uppercase tracking-wider font-semibold">Pending</p>
                    <p className="text-xl font-bold text-amber-600">{bootcamp.pending}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-emerald-600 mb-1 uppercase tracking-wider font-semibold">Confirmed</p>
                    <p className="text-xl font-bold text-emerald-600">{bootcamp.confirmed}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between">
                  <div className="text-sm">
                    Kapasitas: <span className="font-semibold">{bootcamp.total - bootcamp.rejected}</span> / {bootcamp.max_capacity}
                  </div>
                  <div className="text-xs px-2 py-1 bg-white border rounded-full font-medium">
                    {bootcamp.remaining_capacity} Sisa Kuota
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Link 
          href="/dashboard/students" 
          className="text-sm text-violet-600 font-medium hover:underline flex items-center gap-1"
        >
          Lihat semua pendaftar →
        </Link>
      </div>
    </div>
  );
}
