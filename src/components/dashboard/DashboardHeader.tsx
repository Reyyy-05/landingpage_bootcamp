"use client";

import { useTransition } from "react";
import { logoutAdmin } from "@/app/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function DashboardHeader({ admin }: { admin: any }) {
  const [isPending, startTransition] = useTransition();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex-1">
        {/* Can put a search bar here later or breadcrumbs */}
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="bg-violet-100 text-violet-700 font-bold">
                  {getInitials(admin.full_name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{admin.full_name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {admin.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault();
                startTransition(async () => {
                  await logoutAdmin();
                });
              }}
              disabled={isPending} 
              className="w-full cursor-pointer text-red-600 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isPending ? "Keluar..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
