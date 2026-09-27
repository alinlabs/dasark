import React from 'react';

interface StageHeaderProps {
  label: string;
  description: string;
  regulations: string[];
  score: number;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  label,
  description,
  regulations,
  score,
}) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-white via-slate-50/70 to-slate-100/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-stretch md:justify-between gap-4 transition-all duration-300 hover:shadow-md">
      {/* Shimmer Light Sweep Effect on Hover */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

      <div className="relative z-10 space-y-1 flex-1 max-w-3xl flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
            {label.replace(/^\d+\.\s*/, '')}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-300">Rujukan Wajib</span>
          <span className="text-slate-700 dark:text-slate-300 font-normal">
            {regulations.join(', ')}
          </span>
        </div>
      </div>

      {/* Stage Completion Score Circle Chart (Large, 2-Color: Green = Compliant, Red = Non-compliant) */}
      <div className="relative z-10 flex items-center justify-center shrink-0 self-center md:self-stretch my-auto pl-0 md:pl-2">
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 56 56">
            {/* Base Ring: Red for Non-Compliant / Remaining */}
            <circle
              cx="28"
              cy="28"
              r="23"
              className="text-rose-500"
              strokeWidth="4.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Overlay Arc: Green for Compliant Score */}
            <circle
              cx="28"
              cy="28"
              r="23"
              className="text-emerald-500"
              strokeWidth="4.5"
              strokeDasharray={2 * Math.PI * 23}
              strokeDashoffset={2 * Math.PI * 23 - (2 * Math.PI * 23 * Math.min(100, Math.max(0, score))) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <span className="absolute text-sm font-black text-slate-900 dark:text-white tracking-tight">
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
};
