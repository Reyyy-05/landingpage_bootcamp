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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aksi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isPending && (
            <div className="flex gap-2">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
                onClick={() => setIsConfirmOpen(true)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Konfirmasi
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setIsRejectOpen(true)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Tolak
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-green-200 text-green-700 hover:bg-green-50"
            asChild
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Hubungi via WhatsApp
            </a>
          </Button>

          {student.admin_notes && (
            <div className="mt-4 p-3 bg-slate-50 border rounded-lg text-sm">
              <p className="font-medium mb-1">Catatan Admin:</p>
              <p className="text-muted-foreground">{student.admin_notes}</p>
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
