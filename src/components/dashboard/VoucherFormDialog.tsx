"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createVoucher } from "@/app/actions/vouchers";
import { toast } from "sonner";

export function VoucherFormDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createVoucher(formData);

    setIsLoading(false);

    if (result.error) {
      toast.error(`Gagal: ${result.error}`);
    } else {
      toast.success("Voucher berhasil dibuat!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Buat Voucher Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat Kode Voucher Baru</DialogTitle>
          <DialogDescription>
            Atur potongan harga khusus untuk peserta. Voucher akan otomatis aktif setelah disimpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode Voucher *</Label>
            <Input id="code" name="code" placeholder="Misal: MERDEKA20" className="uppercase" required disabled={isLoading} />
            <p className="text-xs text-muted-foreground">Otomatis diubah ke huruf kapital. Tanpa spasi.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount_type">Tipe Diskon *</Label>
              <Select name="discount_type" defaultValue="percentage" disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Persentase (%)</SelectItem>
                  <SelectItem value="fixed">Nominal (Rp)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount_value">Nilai Diskon *</Label>
              <Input id="discount_value" name="discount_value" type="number" min="1" required disabled={isLoading} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_uses">Maks. Kuota Penggunaan *</Label>
              <Input id="max_uses" name="max_uses" type="number" min="1" defaultValue="100" required disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valid_until">Masa Berlaku (Kedaluwarsa) *</Label>
              <Input id="valid_until" name="valid_until" type="date" required disabled={isLoading} />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-violet-600 hover:bg-violet-700 text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Voucher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
