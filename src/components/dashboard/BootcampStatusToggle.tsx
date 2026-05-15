"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleBootcampStatus } from "@/app/actions/bootcamps";
import { toast } from "sonner";

export function BootcampStatusToggle({ id, initialStatus }: { id: string; initialStatus: boolean }) {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    // Optimistic UI
    setIsOpen(checked);
    
    const result = await toggleBootcampStatus(id, checked);
    
    if (result.error) {
      toast.error(`Gagal mengubah status: ${result.error}`);
      setIsOpen(!checked); // revert
    } else {
      toast.success(checked ? "Program berhasil dibuka" : "Pendaftaran program ditutup");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id={`status-${id}`} 
        checked={isOpen} 
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
      <Label htmlFor={`status-${id}`} className={isOpen ? "text-emerald-600 font-medium" : "text-muted-foreground"}>
        {isOpen ? "Pendaftaran Buka" : "Ditutup"}
      </Label>
    </div>
  );
}
