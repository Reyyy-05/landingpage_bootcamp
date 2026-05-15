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
import { LogOut, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { DashboardSidebarContent } from "./DashboardSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DashboardHeader({ admin }: { admin: any }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-slate-900 border-r-slate-800 text-white flex flex-col">
            <SheetTitle className="sr-only">Navigasi Mobile</SheetTitle>
            <DashboardSidebarContent admin={admin} pathname={pathname} onClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
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
