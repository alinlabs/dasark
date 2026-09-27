import React from 'react';
import { CheckCircle2, AlertTriangle, Flame, ShieldCheck } from 'lucide-react';
import { ChecklistItem } from '../../../types/audit';

interface StageStatsGridProps {
  stageItems: ChecklistItem[];
}

export const StageStatsGrid: React.FC<StageStatsGridProps> = ({ stageItems }) => {
  const total = stageItems.length || 1;
  const compliantCount = stageItems.filter(i => i.status === 'COMPLIANT').length;
  const minorCount = stageItems.filter(i => i.status === 'MINOR_NC').length;
  const majorCount = stageItems.filter(i => i.status === 'MAJOR_NC').length;
  const criticalCount = stageItems.filter(i => i.status === 'CRITICAL_HAZARD').length;

  const stats = [
    {
      title: 'Sesuai',
      count: compliantCount,
      pct: ((compliantCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-500 border-emerald-500/50 hover:shadow-emerald-500/20',
      icon: CheckCircle2
    },
    {
      title: 'Minor',
      count: minorCount,
      pct: ((minorCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-amber-500 via-amber-500 to-orange-400 border-amber-400/50 hover:shadow-amber-500/20',
      icon: AlertTriangle
    },
    {
      title: 'Mayor',
      count: majorCount,
      pct: ((majorCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 border-orange-400/50 hover:shadow-orange-500/20',
      icon: Flame
    },
    {
      title: 'Kritis',
      count: criticalCount,
      pct: ((criticalCount / total) * 100).toFixed(1),
      cardBg: 'bg-gradient-to-br from-rose-600 via-rose-600 to-red-500 border-rose-500/50 hover:shadow-rose-500/20',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const IconComp = stat.icon;
        return (
          <div 
            key={stat.title} 
            className={`group relative overflow-hidden ${stat.cardBg} rounded-xl p-4 border shadow-xs text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-3px] hover:shadow-md`}
          >
            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

            <div className="relative z-10">
              {/* Header Row: Label & White Icon */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-extrabold text-white/90 uppercase tracking-wider">{stat.title}</p>
                <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold shrink-0 backdrop-blur-xs group-hover:scale-105 transition-transform">
                  <IconComp className="w-4.5 h-4.5" />
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
              <span className="text-white/80 font-medium text-[10px]">({stat.count}/{stageItems.length} klausul)</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
