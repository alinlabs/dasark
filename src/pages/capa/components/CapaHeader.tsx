import React from 'react';
import { CAPAItem } from '../../../types/audit';

interface CapaHeaderProps {
  capaList: CAPAItem[];
}

export const CapaHeader: React.FC<CapaHeaderProps> = ({ capaList }) => {
  const total = capaList.length;
  const closedCount = capaList.filter(c => c.status === 'RESOLVED' || c.status === 'VERIFIED').length;
  const closeRate = total > 0 ? Math.round((closedCount / total) * 100) : 100;

  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-white via-slate-50/70 to-slate-100/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-300 hover:shadow-md">
      {/* Shimmer Light Sweep Effect on Hover */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

      <div className="relative z-10 space-y-1.5 flex-1 max-w-2xl">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
            Pelacak Tindakan Perbaikan &amp; Pencegahan (CAPA Tracker)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
            Sistem terintegrasi penutupan temuan audit K3 &amp; Pengelolaan Limbah berbasis investigasi akar masalah 5-Why, penunjukan PIC penanggung jawab, batas waktu (due date), dan bukti verifikasi kepatuhan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-300">Standar Acuan:</span>
          <span className="text-slate-600 dark:text-slate-400 font-normal">
            ISO 45001:2018 (Klausul 10.2) · PP No. 50 Tahun 2012 (Elemen 8) · Root Cause Analysis 5-Why
          </span>
        </div>
      </div>

      {/* Completion Score Circle Chart */}
      <div className="relative z-10 w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 56 56">
          {/* Base Ring: Red/Rose for Open / Pending */}
          <circle
            cx="28"
            cy="28"
            r="23"
            className="text-rose-500"
            strokeWidth="4.5"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Overlay Arc: Green for Resolved / Verified */}
          <circle
            cx="28"
            cy="28"
            r="23"
            className="text-emerald-500"
            strokeWidth="4.5"
            strokeDasharray={2 * Math.PI * 23}
            strokeDashoffset={2 * Math.PI * 23 - (2 * Math.PI * 23 * Math.min(100, Math.max(0, closeRate))) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
            {closeRate}%
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
            Tuntas
          </span>
        </div>
      </div>
    </div>
  );
};
