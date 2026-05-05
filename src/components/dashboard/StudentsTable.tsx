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
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau email..."
            value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("full_name")?.setFilterValue(event.target.value)
            }
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
