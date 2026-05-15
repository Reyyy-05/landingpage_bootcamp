"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleVoucherStatus } from "@/app/actions/vouchers";
import { toast } from "sonner";

export function VoucherStatusToggle({ id, initialStatus }: { id: string; initialStatus: boolean }) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    // Optimistic UI
    setIsActive(checked);
    
    const result = await toggleVoucherStatus(id, checked);
    
    if (result.error) {
      toast.error(`Gagal mengubah status: ${result.error}`);
      setIsActive(!checked); // revert
    } else {
      toast.success(checked ? "Voucher diaktifkan" : "Voucher dinonaktifkan");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id={`status-${id}`} 
        checked={isActive} 
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
      <Label htmlFor={`status-${id}`} className={isActive ? "text-emerald-600 font-medium" : "text-muted-foreground"}>
        {isActive ? "Aktif" : "Nonaktif"}
      </Label>
    </div>
  );
}
