"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, CheckCircle2, XCircle, TrendingUp, AlertTriangle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
interface BootcampStat {
  bootcamp_id: string;
  bootcamp_name: string;
  batch_number: number;
  total: number;
  pending: number;
  confirmed: number;
  rejected: number;
  max_capacity: number;
  remaining_capacity: number;
}

// ─── Component ────────────────────────────────────────────────
export function BootcampStatsPanel({ stats }: { stats: BootcampStat[] }) {
  const [selectedId, setSelectedId] = useState(stats[0]?.bootcamp_id ?? "");
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const selected = stats.find((s) => s.bootcamp_id === selectedId) ?? stats[0];

  // Capacity calculations
  const activeStudents = selected ? selected.total - selected.rejected : 0;
  const capacityPercent = selected
    ? Math.min(Math.round((activeStudents / selected.max_capacity) * 100), 100)
    : 0;
  const conversionPercent = selected && selected.total > 0
    ? Math.round((selected.confirmed / selected.total) * 100)
    : 0;

  // Determine progress bar color based on capacity threshold
  const isNearlyFull = capacityPercent > 80;
  const isFull = capacityPercent >= 100;

  // Animate progress bars on tab switch
  useEffect(() => {
    setAnimatedWidth(0);
    const timer = setTimeout(() => setAnimatedWidth(capacityPercent), 50);
    return () => clearTimeout(timer);
  }, [selectedId, capacityPercent]);

  if (!selected) return null;

  return (
    <div className="space-y-5">
      {/* ── Section Header ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Statistik per Program
        </h2>
      </div>

      {/* ── Tab Selector (Horizontal Pills) ────────────── */}
      <div className="flex flex-wrap gap-2">
        {stats.map((bootcamp) => {
          const isActive = bootcamp.bootcamp_id === selectedId;
          return (
            <button
              key={bootcamp.bootcamp_id}
              onClick={() => setSelectedId(bootcamp.bootcamp_id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-violet-500/40
                ${isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }
              `}
            >
              {bootcamp.bootcamp_name}
              <span className={`ml-1.5 text-xs ${isActive ? "text-violet-200" : "text-slate-400"}`}>
                Batch {bootcamp.batch_number}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Selected Bootcamp Detail Panel ──────────────── */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4">
          <h3 className="font-semibold text-white text-lg">{selected.bootcamp_name}</h3>
          <p className="text-violet-200 text-sm">
            Batch {selected.batch_number} • {selected.max_capacity} Kuota Total
          </p>
        </div>

        <CardContent className="p-0">
          {/* ── Stats Grid ─────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
            {/* Total */}
            <div className="p-5 text-center group hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Users className="h-4 w-4 text-violet-500" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Total
                </p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{selected.total}</p>
            </div>

            {/* Pending */}
            <div className="p-5 text-center group hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold">
                  Pending
                </p>
              </div>
              <p className="text-2xl font-bold text-amber-600">{selected.pending}</p>
            </div>

            {/* Confirmed */}
            <div className="p-5 text-center group hover:bg-emerald-50/50 transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">
                  Confirmed
                </p>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{selected.confirmed}</p>
            </div>

            {/* Rejected */}
            <div className="p-5 text-center group hover:bg-red-50/50 transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <p className="text-xs text-red-500 uppercase tracking-wider font-semibold">
                  Ditolak
                </p>
              </div>
              <p className="text-2xl font-bold text-red-500">{selected.rejected}</p>
            </div>
          </div>

          {/* ── Progress Bars Section ──────────────── */}
          <div className="border-t border-slate-100 p-6 space-y-5">
            {/* Capacity Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isNearlyFull ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className="text-sm font-medium text-slate-700">
                    Kapasitas Terisi
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {activeStudents} / {selected.max_capacity}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isFull
                        ? "bg-red-100 text-red-700"
                        : isNearlyFull
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {capacityPercent}%
                  </span>
                </div>
              </div>
              {/* Progress bar track */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isFull
                      ? "bg-red-500 animate-pulse"
                      : isNearlyFull
                        ? "bg-amber-500 animate-pulse"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${animatedWidth}%` }}
                />
              </div>
              {isFull && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">
                  ⚠️ Kuota penuh! Pendaftaran baru tidak dapat diterima.
                </p>
              )}
            </div>

            {/* Conversion Rate Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">
                  Rasio Konfirmasi
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {conversionPercent}%
                  <span className="text-xs text-slate-400 font-normal ml-1">
                    ({selected.confirmed} dari {selected.total} pendaftar)
                  </span>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${animatedWidth > 0 ? conversionPercent : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-sm text-slate-500">
                Sisa kuota:{" "}
                <span className={`font-semibold ${
                  selected.remaining_capacity <= 5 ? "text-red-600" : "text-slate-800"
                }`}>
                  {selected.remaining_capacity} slot
                </span>
              </div>
              <div
                className={`text-xs px-3 py-1.5 rounded-full font-medium border ${
                  isFull
                    ? "bg-red-50 border-red-200 text-red-700"
                    : isNearlyFull
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}
              >
                {isFull
                  ? "Kuota Penuh"
                  : isNearlyFull
                    ? "Hampir Penuh"
                    : "Kuota Tersedia"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
