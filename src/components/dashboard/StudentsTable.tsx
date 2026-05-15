"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Eye, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentTableData {
  id: string;
  full_name: string;
  email: string;
  phone_wa: string;
  registration_status: "pending" | "confirmed" | "rejected";
  created_at: string;
  bootcamp_name: string;
  bootcamp_batch: number;
  package_selected: string;
}

export function StudentsTable({ data }: { data: StudentTableData[] }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<StudentTableData>[] = [
    {
      accessorKey: "full_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4 h-8 data-[state=open]:bg-accent"
          >
            Nama Lengkap
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{row.original.full_name}</span>
          <span className="text-xs text-slate-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "bootcamp_name",
      header: "Program",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm">{row.original.bootcamp_name}</span>
          <span className="text-xs text-slate-500">Batch {row.original.bootcamp_batch} • Paket {row.original.package_selected}</span>
        </div>
      ),
    },
    {
      accessorKey: "registration_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.registration_status;
        return (
          <Badge 
            variant={
              status === "confirmed" ? "default" : 
              status === "rejected" ? "destructive" : "secondary"
            }
            className={
              status === "confirmed" ? "bg-emerald-500 hover:bg-emerald-600" :
              status === "pending" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Tanggal Daftar",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <div className="text-sm">
            {format(date, "d MMM yyyy", { locale: id })}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/dashboard/students/${row.original.id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Detail
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleExportCSV = () => {
    // Ambil data yang sedang di-filter di tabel (bukan cuma halaman aktif)
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    // Header CSV
    const headers = [
      "ID",
      "Nama Lengkap",
      "Email",
      "No. WhatsApp",
      "Program",
      "Batch",
      "Paket",
      "Status",
      "Tanggal Daftar"
    ];

    // Data rows
    const csvData = rows.map((row) => {
      const d = row.original;
      return [
        d.id,
        `"${d.full_name}"`, // Quote strings to handle commas in names
        d.email,
        `'${d.phone_wa}`, // Prefix with tick to prevent excel auto-formatting numbers
        `"${d.bootcamp_name}"`,
        d.bootcamp_batch,
        d.package_selected,
        d.registration_status,
        format(new Date(d.created_at), "yyyy-MM-dd HH:mm:ss")
      ].join(",");
    });

    // Gabungkan Header dan Data
    const csvString = [headers.join(","), ...csvData].join("\n");
    
    // Download File
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Data_Pendaftar_${format(new Date(), "yyyyMMdd_HHmmss")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau email..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <Select
            value={(table.getColumn("registration_status")?.getFilterValue() as string) || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("registration_status")?.setFilterValue("");
              } else {
                table.getColumn("registration_status")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-white">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={handleExportCSV} className="w-full sm:w-auto bg-white">
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada data pendaftar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
