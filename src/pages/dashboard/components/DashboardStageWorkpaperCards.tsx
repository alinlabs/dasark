import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { LifecycleStage, ChecklistItem } from '../../../types/audit';
import { STAGE_METADATA } from '../../../data/defaultAuditChecklist';
import { ScrollReveal } from '../../../components/common/ScrollReveal';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';

interface DashboardStageWorkpaperCardsProps {
  items: ChecklistItem[];
  stageScores: Record<string, { total: number; compliant: number; minorNc: number; majorNc: number; criticalHazard: number; score: number }>;
  onNavigateToStage: (stage: LifecycleStage) => void;
  onNavigateToTab: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
}

export const DashboardStageWorkpaperCards: React.FC<DashboardStageWorkpaperCardsProps> = ({
  items,
  stageScores,
  onNavigateToStage,
  onNavigateToTab,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Evaluasi 6 Tahap Siklus Tenaga Kerja
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToTab('CHECKLIST')}
          className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition cursor-pointer flex items-center gap-1 hover:translate-x-0.5"
        >
          <span>Semua WorkPaper</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAGE_METADATA.map((stage, idx) => {
          const scoreData = stageScores[stage.id] || { total: 0, compliant: 0, minorNc: 0, majorNc: 0, criticalHazard: 0, score: 0 };
          const stageItems = items.filter((i) => i.stage === stage.id);

          return (
            <ScrollReveal key={stage.id} delay={idx * 80} direction="up" duration={1000}>
              <div
                onClick={() => onNavigateToStage(stage.id)}
                className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 h-full hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {stage.label.replace(/^\d+\.\s*/, '')}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    {stageItems.length} Klausul
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300 text-xs">
                    <AnimatedNumber value={scoreData.score} suffix="%" duration={4000} />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};
