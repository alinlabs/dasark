import React from 'react';
import { AlertCircle, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { CAPAItem } from '../../../types/audit';
import { CapaStatusFilter } from '../types';

interface CapaStatsGridProps {
  capaList: CAPAItem[];
  activeFilter: CapaStatusFilter;
  onSelectFilter: (filter: CapaStatusFilter) => void;
}

export const CapaStatsGrid: React.FC<CapaStatsGridProps> = ({ 
  capaList, 
  activeFilter, 
  onSelectFilter 
}) => {
  const total = capaList.length || 1;
  const openCount = capaList.filter(c => c.status === 'OPEN').length;
  const inProgressCount = capaList.filter(c => c.status === 'IN_PROGRESS').length;
  const resolvedCount = capaList.filter(c => c.status === 'RESOLVED').length;
  const verifiedCount = capaList.filter(c => c.status === 'VERIFIED').length;

  const stats = [
    {
      statusKey: 'OPEN' as CapaStatusFilter,
      title: 'Buka',
      count: openCount,
      pct: ((openCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-rose-600 via-rose-600 to-red-500 border-rose-500/50 hover:shadow-rose-500/20',
      activeRing: 'ring-4 ring-rose-400/80 scale-[1.02] shadow-lg z-10',
      icon: AlertCircle
    },
    {
      statusKey: 'IN_PROGRESS' as CapaStatusFilter,
      title: 'Sedang Dikerjakan',
      count: inProgressCount,
      pct: ((inProgressCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 border-orange-400/50 hover:shadow-orange-500/20',
      activeRing: 'ring-4 ring-orange-400/80 scale-[1.02] shadow-lg z-10',
      icon: Clock
    },
    {
      statusKey: 'RESOLVED' as CapaStatusFilter,
      title: 'Selesai',
      count: resolvedCount,
      pct: ((resolvedCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-blue-600 via-blue-600 to-sky-500 border-blue-500/50 hover:shadow-blue-500/20',
      activeRing: 'ring-4 ring-blue-400/80 scale-[1.02] shadow-lg z-10',
      icon: CheckCircle
    },
    {
      statusKey: 'VERIFIED' as CapaStatusFilter,
      title: 'Terverifikasi Auditor',
      count: verifiedCount,
      pct: ((verifiedCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-500 border-emerald-500/50 hover:shadow-emerald-500/20',
      activeRing: 'ring-4 ring-emerald-400/80 scale-[1.02] shadow-lg z-10',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const IconComp = stat.icon;
        const isActive = activeFilter === stat.statusKey;

        return (
          <button
            key={stat.title} 
            type="button"
            onClick={() => {
              if (isActive) {
                onSelectFilter('ALL'); // toggle off back to ALL
              } else {
                onSelectFilter(stat.statusKey);
              }
            }}
            className={`group relative overflow-hidden ${stat.cardBg} rounded-xl p-4 border shadow-xs text-white flex flex-col justify-between transition-all duration-300 text-left cursor-pointer ${
              isActive 
                ? stat.activeRing 
                : 'hover:translate-y-[-3px] hover:shadow-md opacity-95 hover:opacity-100'
            }`}
          >
            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

            <div className="relative z-10">
              {/* Header Row: Label & Active Status / Icon */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-extrabold text-white/90 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-1">
                  {isActive && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-white text-slate-900 rounded uppercase tracking-wider shadow-2xs">
                      Aktif
                    </span>
                  )}
                  <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold shrink-0 backdrop-blur-xs group-hover:scale-105 transition-transform">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Big Count Number */}
              <p className="text-3xl font-black text-white leading-none">
                {stat.count}
              </p>

              {/* Full-Width Line Progress Bar */}
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mt-3 mb-2.5">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500 shadow-xs"
                  style={{ width: `${Math.max(Number(stat.pct), stat.count > 0 ? 6 : 0)}%` }}
                />
              </div>
            </div>

            {/* Percentage Subtext Footer */}
            <div className="relative z-10 flex items-center justify-between text-[11px]">
              <span className="font-extrabold text-white text-xs">{stat.pct}%</span>
              <span className="text-white/85 font-medium text-[10px]">
                {isActive ? 'Klik untuk Melepas' : 'Klik untuk Filter'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
