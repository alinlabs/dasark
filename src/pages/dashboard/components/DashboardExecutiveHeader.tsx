import React from 'react';
import { AuditSession } from '../../../types/audit';
import { ComplianceMetrics, CapaMetrics, LeadTimeStats } from '../types';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface DashboardExecutiveHeaderProps {
  auditSession: AuditSession;
  complianceMetrics: ComplianceMetrics;
  capaMetrics: CapaMetrics;
  leadTimeStats: LeadTimeStats;
}

export const DashboardExecutiveHeader: React.FC<DashboardExecutiveHeaderProps> = ({
  auditSession,
  complianceMetrics,
  capaMetrics,
  leadTimeStats,
}) => {
  const { overallScore } = auditSession;

  const getScoreStatusText = (score: number) => {
    if (score >= 90) return 'Tingkat Kepatuhan Sangat Tinggi';
    if (score >= 80) return 'Memenuhi Syarat (Catatan Minor)';
    if (score >= 70) return 'Perlu Tindakan Perbaikan (CAPA)';
    return 'Kritis (Di Bawah Standar Kepatuhan)';
  };

  const avgDaysNum = parseFloat(leadTimeStats.avgResolutionDays) || 0;

  return (
    <ScrollReveal direction="up" duration={1100}>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>PT. DAME ALAM SEJAHTERA (DAS GROUP)</span>
              <span aria-hidden="true">·</span>
              <span>Kode Audit: {auditSession.auditCode}</span>
              <span aria-hidden="true">·</span>
              <span>Auditor: {auditSession.auditorName}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ringkasan Kepatuhan HR Corporate &amp; K3 Industri
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Evaluasi audit kepatuhan terpadu lintas fasilitas DAS Group (Transporter, Plant Karawang, Plant Sukabumi) sesuai regulasi ketenagakerjaan RI, ISO 45001, dan PP 50/2012.
            </p>
          </div>

          {/* Big Score Box with Dynamic Count-Up Animation */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 p-5 min-w-[220px] text-center flex flex-col justify-center shrink-0 shadow-2xs group hover:scale-[1.02] transition-transform duration-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Indeks Kepatuhan
            </span>
            <div className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight my-1 tabular-nums">
              <AnimatedNumber value={overallScore} suffix="%" duration={4500} />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {getScoreStatusText(overallScore)}
            </span>
          </div>
        </div>

        {/* Key Metrics Bar (Staggered Animated Colored Gradient Cards with Shimmer Effect) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-1">
          {/* Klausul Sesuai -> Emerald to Green Gradient */}
          <ScrollReveal delay={70} direction="up" duration={1400}>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-500 dark:from-emerald-700 dark:via-emerald-700 dark:to-teal-600 text-white border border-emerald-500/50 dark:border-emerald-500/40 shadow-xs space-y-1 h-full hover:translate-y-[-3px] hover:shadow-md hover:shadow-emerald-500/20 transition-all duration-300">
              {/* Shimmer Light Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="text-xs font-medium text-emerald-100 block">Klausul Sesuai</span>
              <div className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber value={complianceMetrics.compliantCount} duration={4200} />{' '}
                <span className="text-xs text-emerald-200 font-normal">/ {complianceMetrics.totalItems}</span>
              </div>
              <span className="text-[11px] text-emerald-100 font-semibold block">
                <AnimatedNumber value={complianceMetrics.compliantRate} suffix="% total klausul" duration={4500} />
              </span>
            </div>
          </ScrollReveal>

          {/* Temuan Aktif -> Amber to Yellow/Orange Gradient */}
          <ScrollReveal delay={140} direction="up" duration={1400}>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-amber-500 via-amber-500 to-orange-400 dark:from-amber-600 dark:via-amber-600 dark:to-orange-500 text-white border border-amber-400/50 dark:border-amber-400/40 shadow-xs space-y-1 h-full hover:translate-y-[-3px] hover:shadow-md hover:shadow-amber-500/20 transition-all duration-300">
              {/* Shimmer Light Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="text-xs font-medium text-amber-100 block">Temuan Aktif</span>
              <div className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber 
                  value={complianceMetrics.minorNcCount + complianceMetrics.majorNcCount + complianceMetrics.criticalHazardCount} 
                  duration={4200} 
                />
              </div>
              <span className="text-[11px] text-amber-100 font-semibold block">
                {complianceMetrics.majorNcCount} Major · {complianceMetrics.minorNcCount} Minor
              </span>
            </div>
          </ScrollReveal>

          {/* Tiket CAPA -> Blue to Sky Gradient */}
          <ScrollReveal delay={210} direction="up" duration={1400}>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-sky-500 dark:from-blue-700 dark:via-blue-700 dark:to-sky-600 text-white border border-blue-500/50 dark:border-blue-500/40 shadow-xs space-y-1 h-full hover:translate-y-[-3px] hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300">
              {/* Shimmer Light Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="text-xs font-medium text-blue-100 block">Tiket CAPA</span>
              <div className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber value={capaMetrics.totalCapa} duration={4200} />
              </div>
              <span className="text-[11px] text-blue-100 font-semibold block">
                {capaMetrics.closedCapaCount} Selesai · {capaMetrics.openCapaCount + capaMetrics.inProgressCapaCount} Berjalan
              </span>
            </div>
          </ScrollReveal>

          {/* CAPA Terverifikasi -> Teal to Cyan Gradient */}
          <ScrollReveal delay={280} direction="up" duration={1400}>
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-teal-600 via-teal-600 to-emerald-500 dark:from-teal-700 dark:via-teal-700 dark:to-emerald-600 text-white border border-teal-500/50 dark:border-teal-500/40 shadow-xs space-y-1 h-full hover:translate-y-[-3px] hover:shadow-md hover:shadow-teal-500/20 transition-all duration-300">
              {/* Shimmer Light Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="text-xs font-medium text-teal-100 block">CAPA Terverifikasi</span>
              <div className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber value={capaMetrics.verifiedCapaCount} duration={4200} />{' '}
                <span className="text-xs text-teal-200 font-normal">
                  (<AnimatedNumber value={capaMetrics.verificationRate} suffix="%" duration={4500} />)
                </span>
              </div>
              <span className="text-[11px] text-teal-100 font-semibold block">Validasi Lead Auditor</span>
            </div>
          </ScrollReveal>

          {/* Rata-rata Penyelesaian -> Indigo to Violet Gradient */}
          <ScrollReveal delay={350} direction="up" duration={1400} className="col-span-2 sm:col-span-1">
            <div className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-500 dark:from-indigo-700 dark:via-indigo-700 dark:to-purple-600 text-white border border-indigo-500/50 dark:border-indigo-500/40 shadow-xs space-y-1 h-full hover:translate-y-[-3px] hover:shadow-md hover:shadow-indigo-500/20 transition-all duration-300">
              {/* Shimmer Light Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="text-xs font-medium text-indigo-100 block">Rata-rata Penyelesaian</span>
              <div className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber value={avgDaysNum} decimals={1} duration={4200} />{' '}
                <span className="text-xs font-normal text-indigo-200">Hari</span>
              </div>
              <span className="text-[11px] text-indigo-100 font-semibold block">Respon PIC: {leadTimeStats.avgResponseText}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ScrollReveal>
  );
};
