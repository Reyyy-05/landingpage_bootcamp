"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateRegistrationStatus } from "@/app/actions/students";
import { toast } from "sonner";
import { CheckCircle, XCircle, MessageCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function StudentActionButtons({ 
  student, 
  isPending, 
  waLink 
}: { 
  student: any; 
  isPending: boolean; 
  waLink: string; 
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (status: "confirmed" | "rejected") => {
    setIsLoading(true);
    try {
      const res = await updateRegistrationStatus(student.id, status, "");
      if (res.error) {
        toast.error(`Gagal: ${res.error}`);
      } else {
        toast.success(`Pendaftaran berhasil di-${status === "confirmed" ? "konfirmasi" : "tolak"}`);
        setIsConfirmOpen(false);
        setIsRejectOpen(false);
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="shadow-sm border border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">Aksi Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isPending && (
            <div className="grid grid-cols-2 gap-2.5">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all text-xs sm:text-sm px-2" 
                onClick={() => setIsConfirmOpen(true)}
              >
                <CheckCircle className="mr-1.5 h-4 w-4 shrink-0" />
                Konfirmasi
              </Button>
              <Button 
                variant="destructive" 
                className="w-full font-medium shadow-sm transition-all text-xs sm:text-sm px-2"
                onClick={() => setIsRejectOpen(true)}
              >
                <XCircle className="mr-1.5 h-4 w-4 shrink-0" />
                Tolak
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium text-xs sm:text-sm"
            asChild
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4 text-emerald-600 shrink-0" />
              Hubungi via WhatsApp
            </a>
          </Button>

          {student.admin_notes && (
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <p className="font-semibold text-slate-800 mb-1">Catatan Admin:</p>
              <p className="text-slate-600 leading-relaxed">{student.admin_notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Konfirmasi */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Pendaftaran</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mengkonfirmasi pendaftaran {student.full_name}?
              Data akan ditandai sebagai peserta resmi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => handleAction("confirmed")} 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ya, Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Tolak */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Pendaftaran</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menolak pendaftaran {student.full_name}?
              Aksi ini akan mengubah status menjadi Ditolak.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleAction("rejected")} 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ya, Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
