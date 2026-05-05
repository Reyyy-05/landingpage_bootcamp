import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Users, Calendar, BookOpen } from "lucide-react";
import { BootcampFormDialog } from "@/components/dashboard/BootcampFormDialog";
import { BootcampStatusToggle } from "@/components/dashboard/BootcampStatusToggle";

export const metadata: Metadata = {
  title: "Manajemen Bootcamp | Dashboard",
};

export default async function BootcampsPage() {
  const supabase = await createClient();

  // Fetch bootcamps and calculate registered students from students table
  const { data: bootcamps, error } = await supabase
    .from("bootcamps")
    .select(`
      *,
      students:students(id, registration_status)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-600">Error memuat data: {error.message}</div>;
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Program Bootcamp
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola program, kapasitas, dan status pendaftaran.
          </p>
        </div>
        <BootcampFormDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bootcamps?.map((bootcamp) => {
          // Calculate active students (not rejected)
          const activeStudents = bootcamp.students.filter(
            (s: any) => s.registration_status !== "rejected"
          ).length;
          
          const isFull = activeStudents >= bootcamp.max_capacity;

          return (
            <Card key={bootcamp.id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-slate-100">Batch {bootcamp.batch_number}</Badge>
                  {isFull && bootcamp.is_open && (
                    <Badge variant="destructive">Penuh</Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2 leading-tight">{bootcamp.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1">
                {bootcamp.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bootcamp.description}
                  </p>
                )}

                <div className="space-y-2 text-sm pt-2">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {bootcamp.start_date 
                        ? format(new Date(bootcamp.start_date), "d MMM yyyy", { locale: localeId }) 
                        : "TBA"}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{activeStudents} / {bootcamp.max_capacity} Terisi</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Paket Harga</p>
                  <div className="flex justify-between text-sm">
                    <span>Reguler</span>
                    <span className="font-medium">{formatCurrency(bootcamp.price_reguler)}</span>
                  </div>
                  {bootcamp.price_premium && (
                    <div className="flex justify-between text-sm">
                      <span>Premium</span>
                      <span className="font-medium">{formatCurrency(bootcamp.price_premium)}</span>
                    </div>
                  )}
                  {bootcamp.price_intensif && (
                    <div className="flex justify-between text-sm">
                      <span>Intensif</span>
                      <span className="font-medium">{formatCurrency(bootcamp.price_intensif)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="bg-slate-50 border-t pt-4">
                <div className="w-full flex items-center justify-between">
                  <BootcampStatusToggle id={bootcamp.id} initialStatus={bootcamp.is_open} />
                </div>
              </CardFooter>
            </Card>
          );
        })}

        {(!bootcamps || bootcamps.length === 0) && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Belum ada Program</h3>
            <p className="text-slate-500">Klik "Tambah Program Baru" untuk membuat program pertamamu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
