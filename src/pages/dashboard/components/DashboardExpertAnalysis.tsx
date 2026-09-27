import React from 'react';
import { AuditSession } from '../../../types/audit';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface DashboardExpertAnalysisProps {
  aiAnalysis?: AuditSession['aiAnalysis'];
  onRunAiAnalysis: () => void;
  isAiLoading: boolean;
  onNavigateToTab: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
}

export const DashboardExpertAnalysis: React.FC<DashboardExpertAnalysisProps> = ({
  aiAnalysis,
  onRunAiAnalysis,
  isAiLoading,
  onNavigateToTab,
}) => {
  return (
    <ScrollReveal direction="up" duration={600}>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Sistem Pakar Audit &amp; Analisis Risiko
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi kepatuhan otomatis regulasi ketenagakerjaan RI &amp; standar ISO.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRunAiAnalysis}
              disabled={isAiLoading}
              className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition cursor-pointer disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isAiLoading ? 'Mengevaluasi...' : 'Jalankan Evaluasi'}
            </button>
            <button
              onClick={() => onNavigateToTab('REGULATIONS')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Matriks Regulasi &amp; Pakar Hukum
            </button>
          </div>
        </div>

        {aiAnalysis ? (
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">Rangkuman Eksekutif:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{aiAnalysis.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-2.5">Potensi Risiko Hukum:</span>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  {aiAnalysis.legalRisks?.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-500 font-bold shrink-0 leading-relaxed select-none">•</span>
                      <span className="flex-1 leading-relaxed text-slate-700 dark:text-slate-300">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-2.5">Prioritas Tindakan:</span>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  {aiAnalysis.actionPriorities?.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-500 font-bold shrink-0 leading-relaxed select-none">•</span>
                      <span className="flex-1 leading-relaxed text-slate-700 dark:text-slate-300">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Klik tombol &quot;Jalankan Evaluasi&quot; untuk menghasilkan analisis yuridis komprehensif.
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};
