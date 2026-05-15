"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Ticket, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Data Pendaftar",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Program Bootcamp",
    href: "/dashboard/bootcamps",
    icon: BookOpen,
  },
  {
    title: "Vouchers",
    href: "/dashboard/vouchers",
    icon: Ticket,
  },
];

export function DashboardSidebarContent({ admin, pathname, onClick }: { admin: any, pathname: string, onClick?: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          CreativeMU Admin
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-violet-600 text-white" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon size={18} className={cn(
                "transition-colors",
                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 mt-auto shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
            {admin.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-medium truncate">{admin.full_name}</p>
            <p className="text-xs text-slate-400 truncate">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function DashboardSidebar({ admin }: { admin: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full hidden md:flex shrink-0">
      <DashboardSidebarContent admin={admin} pathname={pathname} />
    </aside>
  );
}
