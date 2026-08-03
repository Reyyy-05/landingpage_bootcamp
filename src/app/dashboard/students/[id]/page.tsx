import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Phone, Mail, GraduationCap, School, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { StudentActionButtons } from "@/components/dashboard/StudentActionButtons";

export const metadata: Metadata = {
  title: "Detail Pendaftar | Dashboard",
};

function formatStudentStatusLabel(status?: string): string {
  if (!status) return "N/A";
  const s = status.trim();
  const map: Record<string, string> = {
    pelajar_sma_smk_1: "Pelajar (SMA/SMK Kelas 10)",
    pelajar_sma_smk_2: "Pelajar (SMA/SMK Kelas 11)",
    pelajar_sma_smk_3: "Pelajar (SMA/SMK Kelas 12)",
    mahasiswa_1: "Mahasiswa (Semester 1 - 2)",
    mahasiswa_2: "Mahasiswa (Semester 3 - 4)",
    mahasiswa_3: "Mahasiswa (Semester 5 - 6)",
    mahasiswa_4: "Mahasiswa (Semester 7 - 8+)",
    "MAHASISWA 1": "Mahasiswa (Semester 1 - 2)",
    "MAHASISWA 2": "Mahasiswa (Semester 3 - 4)",
    "MAHASISWA 3": "Mahasiswa (Semester 5 - 6)",
    "MAHASISWA 4": "Mahasiswa (Semester 7 - 8+)",
    PELAJAR: "Pelajar (SMA / SMK / MA)",
    MAHASISWA: "Mahasiswa / Mahasiswi",
    KARYAWAN: "Karyawan / Profesional",
    UMUM: "Umum / Fresh Graduate",
    lainnya: "Lainnya",
  };
  if (map[s]) return map[s];
  if (map[s.toUpperCase()]) return map[s.toUpperCase()];

  const match = s.match(/^(MAHASISWA|PELAJAR|KARYAWAN|UMUM)[\s_]?(\d+)$/i);
  if (match) {
    const role = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    return `${role} (Tingkat ${match[2]})`;
  }
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPackageName(pkg?: string): string {
  if (!pkg) return "N/A";
  const map: Record<string, string> = {
    reguler: "Reguler",
    premium: "Premium",
    intensif: "Intensif",
    laravel_full_online: "Laravel Full Online",
    Laravel_full_online: "Laravel Full Online",
    REGULER: "Reguler",
    PREMIUM: "Premium",
    INTENSIF: "Intensif",
  };
  return map[pkg] || pkg.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: student, error } = await supabase
    .from("students_with_details")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !student) {
    notFound();
  }

  const isConfirmed = student.registration_status === "confirmed";
  const isRejected = student.registration_status === "rejected";
  const isPending = student.registration_status === "pending";

  const waLink = `https://wa.me/${student.phone_wa}`;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/students">
            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Detail Pendaftar</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              ID: {student.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            className={`text-xs px-3 py-1 font-semibold rounded-full ${
              isConfirmed 
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" 
                : isRejected 
                ? "bg-red-100 text-red-800 hover:bg-red-100" 
                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
            }`}
          >
            {isConfirmed ? "TERKONFIRMASI" : isRejected ? "DITOLAK" : "MENUNGGU KONFIRMASI"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Kolom Kiri: Info Personal & Akademik */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-900">
                <User className="h-4 w-4 text-violet-600 shrink-0" />
                Data Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</p>
                <p className="font-semibold text-slate-900">{student.full_name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Jenis Kelamin</p>
                <p className="font-semibold text-slate-900 capitalize">
                  {student.gender === "laki-laki" ? "Laki-laki" : student.gender === "perempuan" ? "Perempuan" : student.gender}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Tempat, Tanggal Lahir</p>
                <p className="font-semibold text-slate-900">
                  {student.birth_place ? `${student.birth_place}, ` : ""}
                  {student.birth_date ? format(new Date(student.birth_date), "d MMMM yyyy", { locale: localeId }) : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Alamat Domisili</p>
                <p className="font-semibold text-slate-900 leading-relaxed">{student.address || "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-900">
                <School className="h-4 w-4 text-violet-600 shrink-0" />
                Latar Belakang Pendidikan / Pekerjaan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Status Saat Ini</p>
                <p className="font-semibold text-slate-900">{formatStudentStatusLabel(student.student_status)}</p>
              </div>
              
              {student.school_name && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nama Sekolah</p>
                  <p className="font-semibold text-slate-900">{student.school_name}</p>
                </div>
              )}
              
              {student.university_name && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nama Kampus</p>
                  <p className="font-semibold text-slate-900">{student.university_name}</p>
                </div>
              )}

              {student.major && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Jurusan / Program Studi</p>
                  <p className="font-semibold text-slate-900">{student.major}</p>
                </div>
              )}

              {student.workplace && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Perusahaan / Workplace</p>
                  <p className="font-semibold text-slate-900">{student.workplace}</p>
                </div>
              )}

              {student.job_title && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Posisi / Jabatan</p>
                  <p className="font-semibold text-slate-900">{student.job_title}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Kontak & Program */}
        <div className="space-y-6">
          <Card className="shadow-sm border border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Kontak Pendaftar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-600 hover:underline truncate">
                  {student.phone_wa}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-800 truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 text-slate-400 font-bold text-center flex items-center justify-center shrink-0">@</div>
                <span className="font-medium text-slate-800 truncate">{student.instagram_handle || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Program Pilihan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-sm">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Bootcamp</p>
                <p className="font-semibold text-slate-900">{student.bootcamp_name || "N/A"}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Batch {student.bootcamp_batch || 1}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Paket Kelas</p>
                <Badge variant="outline" className="font-semibold border-slate-300 text-slate-800">
                  {formatPackageName(student.package_selected)}
                </Badge>
              </div>
              
              {student.voucher_code && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Voucher Digunakan</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-mono font-bold">
                      {student.voucher_code}
                    </Badge>
                    <span className="text-xs font-semibold text-emerald-600">
                      {student.voucher_discount_type === "percentage" 
                        ? `-${student.voucher_discount_value}%` 
                        : `-${formatCurrency(student.voucher_discount_value)}`}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons (Confirm / Reject) */}
          <StudentActionButtons student={student} isPending={isPending} waLink={waLink} />
          
        </div>

      </div>
    </div>
  );
}
