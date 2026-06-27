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
import { createBootcamp } from "@/app/actions/bootcamps";
import { toast } from "sonner";

export function BootcampFormDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createBootcamp(formData);

    setIsLoading(false);

    if (result.error) {
      toast.error(`Gagal: ${result.error}`);
    } else {
      toast.success("Bootcamp berhasil ditambahkan!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah Program Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Program Bootcamp</DialogTitle>
          <DialogDescription>
            Masukkan detail program. Program baru akan otomatis berstatus Aktif dan bisa langsung dipilih calon siswa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nama Program / Bootcamp *</Label>
              <Input id="name" name="name" placeholder="Misal: Pelatihan UI/UX Design" required disabled={isLoading} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi Singkat</Label>
              <Input id="description" name="description" placeholder="Penjelasan singkat program..." disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch_number">Batch Ke- *</Label>
              <Input id="batch_number" name="batch_number" type="number" min="1" required disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_capacity">Kapasitas Maksimal *</Label>
              <Input id="max_capacity" name="max_capacity" type="number" min="1" defaultValue="50" required disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai</Label>
              <Input id="start_date" name="start_date" type="date" disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Selesai</Label>
              <Input id="end_date" name="end_date" type="date" disabled={isLoading} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Lokasi Program</Label>
              <Input id="location" name="location" defaultValue="Online & Hybrid" disabled={isLoading} />
            </div>
            
            <div className="space-y-2 md:col-span-2 pt-4 border-t">
              <h4 className="font-medium text-sm">Pengaturan Harga</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_reguler">Harga Reguler (Rp) *</Label>
              <Input id="price_reguler" name="price_reguler" type="number" min="0" defaultValue="750000" required disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_premium">Harga Premium (Rp)</Label>
              <Input id="price_premium" name="price_premium" type="number" min="0" disabled={isLoading} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="price_intensif">Harga Intensif (Rp)</Label>
              <Input id="price_intensif" name="price_intensif" type="number" min="0" disabled={isLoading} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-violet-600 hover:bg-violet-700 text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Program
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
