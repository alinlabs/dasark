import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { UnitScorecardItem } from '../types';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';

interface DashboardUnitScorecardTableProps {
  unitScorecard: UnitScorecardItem[];
  overallScore: number;
}

export const DashboardUnitScorecardTable: React.FC<DashboardUnitScorecardTableProps> = ({
  unitScorecard,
  overallScore,
}) => {
  const { ref: inViewRef, isInView } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  return (
    <div 
      ref={inViewRef}
      className="lg:col-span-7 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-2xs transition-colors duration-200"
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Scorecard per Unit Operasional
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Kepatuhan, sebaran temuan, dan lead time per entitas operasional.
        </p>
      </div>

      {/* High-Fidelity Executive Matrix Scorecard Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Unit Operasional</th>
              <th className="py-2.5 px-2.5 text-center">Temuan</th>
              <th className="py-2.5 px-2.5 text-center">Komposisi NC</th>
              <th className="py-2.5 px-2.5 text-center">Rata Lead Time</th>
              <th className="py-2.5 px-3 text-right">Tingkat Penutupan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {unitScorecard.map((u, uIdx) => {
              const IconComponent = u.icon;
              return (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 dark:text-white block leading-tight">{u.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{u.scope}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <span className="font-bold text-slate-900 dark:text-slate-200">
                      <AnimatedNumber value={u.verified + u.resolved} duration={4000} />
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500"> / {u.totalFindings}</span>
                  </td>

                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 text-[10px]">
                      {u.crit > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold" title="Critical">
                          {u.crit}C
                        </span>
                      )}
                      <span className="px-1.5 py-0.2 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-bold" title="Major">
                        {u.maj}M
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 font-bold" title="Minor">
                        {u.min}m
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                      <AnimatedNumber value={parseFloat(String(u.avgDays))} decimals={1} duration={4000} />
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500"> Hari</span>
                  </td>

                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          style={{ 
                            width: isInView ? `${u.rate}%` : '0%',
                            transition: 'width 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            transitionDelay: `${uIdx * 140}ms`
                          }} 
                          className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full"
                        />
                      </div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <AnimatedNumber value={u.rate} suffix="%" duration={4000} />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-white bg-emerald-600 dark:bg-emerald-700 p-3 rounded-xl border border-emerald-700 dark:border-emerald-600 flex items-center justify-between shadow-2xs">
        <span className="flex items-center gap-2 font-medium text-white">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          Seluruh 4 fasilitas memenuhi kriteria kepatuhan SMK3 PP 50/2012 dan ISO 45001.
        </span>
        <span className="text-xs font-extrabold text-white bg-emerald-700 dark:bg-emerald-800 px-2.5 py-1 rounded-md border border-emerald-500/40">
          Skor: <AnimatedNumber value={overallScore} suffix="%" duration={4200} />
        </span>
      </div>
    </div>
  );
};
