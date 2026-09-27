import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AuditMethodologyStep } from '../types';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface DashboardMethodologySectionProps {
  onNavigateToTab: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
}

const ALL_STEPS: AuditMethodologyStep[] = [
  { num: '01', name: 'Plan', desc: 'Jadwal audit & penugasan tim independen' },
  { num: '02', name: 'Scope', desc: 'Ruang lingkup: Transporter, Karawang & Sukabumi' },
  { num: '03', name: 'Criteria', desc: 'Standar UU Ketenagakerjaan & PP 50/2012' },
  { num: '04', name: 'Evidence', desc: 'Uji petik dokumen & sampling fisik K3' },
  { num: '05', name: 'Findings & NC', desc: 'Klasifikasi temuan (Minor, Major, Kritis)' },
  { num: '06', name: 'Root Cause', desc: 'Analisis akar masalah 5-Why & Fishbone' },
  { num: '07', name: 'Action (CAPA)', desc: 'Rencana korektif terstruktur dengan PIC' },
  { num: '08', name: 'Evaluation', desc: 'Verifikasi efektivitas tindakan perbaikan' },
  { num: '09', name: 'Closing', desc: 'Berita acara penutupan temuan resmi' },
  { num: '10', name: 'Reporting', desc: 'Penerbitan laporan eksekutif & indeks skor' },
];

export const DashboardMethodologySection: React.FC<DashboardMethodologySectionProps> = ({
  onNavigateToTab,
}) => {
  return (
    <ScrollReveal direction="up" duration={1000}>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors duration-200">
        {/* Header without Divider Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Metodologi &amp; Tahapan Audit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mengacu pada ISO 19011:2018, ISO 45001, dan SMK3 PP 50/2012.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('CHECKLIST')}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition cursor-pointer shadow-xs self-start sm:self-center hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Buka Modul WorkPaper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 10 Card Grid in 2 rows of 5 with Micro Stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {ALL_STEPS.map((step, idx) => (
            <ScrollReveal key={step.num} delay={idx * 60} direction="up" duration={900}>
              <div
                className="p-3.5 rounded-xl bg-gradient-to-br from-white to-blue-50/70 dark:from-slate-900 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between space-y-2.5 shadow-2xs h-full hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider truncate">
                    {step.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-white bg-blue-600 dark:bg-blue-500 px-2 py-0.5 rounded-md shadow-2xs shrink-0">
                    {step.num}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};
