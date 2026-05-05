import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Ticket, Percent, Hash, AlertTriangle } from "lucide-react";
import { VoucherFormDialog } from "@/components/dashboard/VoucherFormDialog";
import { VoucherStatusToggle } from "@/components/dashboard/VoucherStatusToggle";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "Manajemen Voucher | Dashboard",
};

export default async function VouchersPage() {
  const supabase = await createClient();

  const { data: vouchers, error } = await supabase
    .from("vouchers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-600">Error memuat data: {error.message}</div>;
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Manajemen Voucher
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola kode diskon promosi untuk pendaftaran.
          </p>
        </div>
        <VoucherFormDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vouchers?.map((voucher) => {
          const isExpired = new Date(voucher.valid_until) < new Date();
          const isExhausted = voucher.used_count >= voucher.max_uses;
          const usagePercent = Math.min(100, Math.round((voucher.used_count / voucher.max_uses) * 100));

          return (
            <Card key={voucher.id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="font-mono text-base px-2 border-violet-200 bg-violet-50 text-violet-700">
                    {voucher.code}
                  </Badge>
                  {isExpired ? (
                    <Badge variant="destructive">Kedaluwarsa</Badge>
                  ) : isExhausted ? (
                    <Badge variant="secondary">Habis</Badge>
                  ) : null}
                </div>
                <CardTitle className="text-2xl font-bold flex items-center">
                  {voucher.discount_type === "percentage" ? (
                    <>
                      {voucher.discount_value}<Percent className="h-5 w-5 ml-1 text-emerald-600" />
                    </>
                  ) : (
                    <>{formatCurrency(voucher.discount_value)}</>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Masa Berlaku</span>
                    <span className={isExpired ? "text-red-600 font-medium" : ""}>
                      {format(new Date(voucher.valid_until), "d MMM yyyy", { locale: localeId })}
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center"><Hash className="h-3 w-3 mr-1"/> Penggunaan</span>
                      <span className="font-medium text-slate-900">{voucher.used_count} / {voucher.max_uses}</span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-slate-50 border-t pt-4">
                <div className="w-full flex items-center justify-between">
                  <VoucherStatusToggle id={voucher.id} initialStatus={voucher.is_active} />
                  
                  {(isExpired || isExhausted) && voucher.is_active && (
                    <div className="flex items-center text-xs text-amber-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Status aktif tapi tidak bisa dipakai
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}

        {(!vouchers || vouchers.length === 0) && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
            <Ticket className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Belum ada Voucher</h3>
            <p className="text-slate-500">Klik "Buat Voucher Baru" untuk membuat kode promosi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
