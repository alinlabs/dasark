import React from 'react';
import { ArrowRight, Zap, Timer, Award } from 'lucide-react';
import { CapaMetrics, LeadTimeStats } from '../types';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface DashboardAnalyticsHeaderProps {
  capaMetrics: CapaMetrics;
  leadTimeStats: LeadTimeStats;
  onNavigateToTab: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
}

export const DashboardAnalyticsHeader: React.FC<DashboardAnalyticsHeaderProps> = ({
  capaMetrics,
  leadTimeStats,
  onNavigateToTab,
}) => {
  const avgDaysNum = parseFloat(leadTimeStats.avgResolutionDays) || 0;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Analisis Kinerja Mutu &amp; Resolusi CAPA
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Peta siklus kepatuhan, tren durasi lead time mingguan, dan sebaran temuan per unit operasional.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab('CAPA')}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition cursor-pointer shadow-xs self-start sm:self-center hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Buka CAPA Tracker</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Metric Velocity Cards with Dynamic Count-Up Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ScrollReveal delay={80} direction="up" duration={1400}>
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-slate-800/90 dark:to-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-200 block">Resolusi CAPA</span>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-400 tabular-nums mt-0.5">
                <AnimatedNumber value={capaMetrics.closureRate} suffix="%" duration={4200} />{' '}
                <span className="text-xs font-normal text-blue-600 dark:text-blue-300">tuntas</span>
              </div>
              <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                <AnimatedNumber value={capaMetrics.closedCapaCount} duration={4000} /> dari {capaMetrics.totalCapa} temuan diselesaikan
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180} direction="up" duration={1400}>
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-slate-800/90 dark:to-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 block">Kepatuhan SLA (≤ 7 Hari)</span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                <AnimatedNumber value={94} suffix="%" duration={4200} />{' '}
                <span className="text-xs font-normal text-emerald-600 dark:text-emerald-300">on-track</span>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                Rata-rata aktual <AnimatedNumber value={avgDaysNum} decimals={1} duration={4000} /> hari
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Timer className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={280} direction="up" duration={1400}>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/80 to-slate-50 dark:from-slate-800/90 dark:to-purple-950/60 border border-purple-200/80 dark:border-purple-800/80 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5">
            <div>
              <span className="text-xs font-semibold text-purple-900 dark:text-purple-200 block">Verifikasi Auditor</span>
              <div className="text-2xl font-black text-purple-700 dark:text-purple-400 tabular-nums mt-0.5">
                <AnimatedNumber value={capaMetrics.verificationRate} suffix="%" duration={4200} />{' '}
                <span className="text-xs font-normal text-purple-600 dark:text-purple-300">terverifikasi</span>
              </div>
              <span className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                <AnimatedNumber value={capaMetrics.verifiedCapaCount} duration={4000} /> tiket berkas bukti sah
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
