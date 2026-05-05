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
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/students">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detail Pendaftar</h1>
          <p className="text-muted-foreground text-sm">
            ID: {student.id}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge 
            className="text-sm px-3 py-1"
            variant={isConfirmed ? "default" : isRejected ? "destructive" : "secondary"}
          >
            {student.registration_status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Info Personal */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-violet-600" />
                Data Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Nama Lengkap</p>
                <p className="font-medium">{student.full_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Jenis Kelamin</p>
                <p className="font-medium capitalize">{student.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Tempat, Tanggal Lahir</p>
                <p className="font-medium">
                  {student.birth_place}, {format(new Date(student.birth_date), "d MMMM yyyy", { locale: localeId })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Alamat</p>
                <p className="font-medium">{student.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <School className="h-5 w-5 text-violet-600" />
                Latar Belakang Pendidikan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Status Pendidikan</p>
                <p className="font-medium">{student.student_status.replace(/_/g, " ").toUpperCase()}</p>
              </div>
              
              {student.school_name && (
                <div>
                  <p className="text-muted-foreground mb-1">Nama Sekolah</p>
                  <p className="font-medium">{student.school_name}</p>
                </div>
              )}
              
              {student.university_name && (
                <div>
                  <p className="text-muted-foreground mb-1">Nama Kampus</p>
                  <p className="font-medium">{student.university_name}</p>
                </div>
              )}

              {student.major && (
                <div>
                  <p className="text-muted-foreground mb-1">Jurusan / Program Studi</p>
                  <p className="font-medium">{student.major}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Kontak & Program */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-medium text-violet-600 hover:underline">
                  {student.phone_wa}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 text-muted-foreground font-bold text-center">@</div>
                <span className="font-medium">{student.instagram_handle}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Program Pilihan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Bootcamp</p>
                <p className="font-medium">{student.bootcamp_name || "N/A"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Batch {student.bootcamp_batch}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Paket</p>
                <Badge variant="outline" className="capitalize">{student.package_selected}</Badge>
              </div>
              
              {student.voucher_code && (
                <div className="pt-2 border-t mt-2">
                  <p className="text-muted-foreground mb-1">Voucher Digunakan</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      {student.voucher_code}
                    </Badge>
                    <span className="text-xs font-medium text-emerald-600">
                      -{student.voucher_discount_type === "percentage" 
                        ? `${student.voucher_discount_value}%` 
                        : formatCurrency(student.voucher_discount_value)}
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
