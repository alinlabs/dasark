import React, { useState, useRef } from 'react';
import { LeadTimeStats, SeverityLeadTime } from '../types';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';

interface DashboardSlaBarChartProps {
  leadTimeStats: LeadTimeStats;
}

interface SlaHoverData {
  title: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  slaDays: number;
  actualDays: number;
  data: SeverityLeadTime;
}

export const DashboardSlaBarChart: React.FC<DashboardSlaBarChartProps> = ({ leadTimeStats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingSlaInfo, setFloatingSlaInfo] = useState<{
    x: number;
    y: number;
    data: SlaHoverData;
  } | null>(null);

  const { ref: inViewRef, isInView } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  const handleHover = (data: SlaHoverData, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setFloatingSlaInfo({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      data,
    });
  };

  const handleMouseMove = (data: SlaHoverData, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setFloatingSlaInfo({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      data,
    });
  };

  const handleMouseLeave = () => {
    setFloatingSlaInfo(null);
  };

  const criticalData: SlaHoverData = {
    title: 'Critical Hazard (Tingkat Kritis)',
    color: '#f43f5e',
    badgeBg: 'bg-rose-500/20',
    badgeBorder: 'border-rose-500/30',
    textColor: 'text-rose-400',
    slaDays: leadTimeStats.critical.targetDays,
    actualDays: leadTimeStats.critical.avgDays,
    data: leadTimeStats.critical,
  };

  const majorData: SlaHoverData = {
    title: 'Major Non-Conformance (Temuan Berat)',
    color: '#f97316',
    badgeBg: 'bg-orange-500/20',
    badgeBorder: 'border-orange-500/30',
    textColor: 'text-orange-400',
    slaDays: leadTimeStats.major.targetDays,
    actualDays: leadTimeStats.major.avgDays,
    data: leadTimeStats.major,
  };

  const minorData: SlaHoverData = {
    title: 'Minor Non-Conformance (Temuan Ringan)',
    color: '#eab308',
    badgeBg: 'bg-yellow-500/20',
    badgeBorder: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    slaDays: leadTimeStats.minor.targetDays,
    actualDays: leadTimeStats.minor.avgDays,
    data: leadTimeStats.minor,
  };

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        inViewRef.current = el;
      }}
      className="p-5 md:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 relative shadow-2xs h-full transition-colors duration-200"
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Target SLA vs Realisasi Lapangan
          </h3>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Unit: Hari Kerja</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Realisasi waktu penyelesaian seluruh temuan memenuhi batas target.
        </p>
      </div>

      {/* Visual Comparative Bars with Smooth Expansion */}
      <div className="space-y-4 pt-1">
        {/* Critical Hazard */}
        <div 
          onMouseEnter={(e) => handleHover(criticalData, e)}
          onMouseMove={(e) => handleMouseMove(criticalData, e)}
          onMouseLeave={handleMouseLeave}
          className="space-y-1.5 p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200/80 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-500/50 hover:shadow-xs transition-all cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Critical Hazard
            </span>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Batas SLA: 2.0h</span>
              <span className="text-slate-700 dark:text-slate-300">
                Realisasi: <strong className="text-rose-700 dark:text-rose-400 font-mono">
                  <AnimatedNumber value={leadTimeStats.critical.avgDays} decimals={1} suffix=" Hari" duration={4200} />
                </strong>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
            <div 
              style={{ 
                width: isInView ? `${Math.min(100, (leadTimeStats.critical.avgDays / leadTimeStats.critical.targetDays) * 100)}%` : '0%',
                transition: 'width 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '150ms'
              }}
              className="bg-rose-500 rounded-full flex items-center justify-end pr-1 text-[8px] text-white font-bold"
            />
          </div>
        </div>

        {/* Major NC */}
        <div 
          onMouseEnter={(e) => handleHover(majorData, e)}
          onMouseMove={(e) => handleMouseMove(majorData, e)}
          onMouseLeave={handleMouseLeave}
          className="space-y-1.5 p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200/80 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-xs transition-all cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-orange-800 dark:text-orange-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Major NC
            </span>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Batas SLA: 7.0h</span>
              <span className="text-slate-700 dark:text-slate-300">
                Realisasi: <strong className="text-orange-700 dark:text-orange-400 font-mono">
                  <AnimatedNumber value={leadTimeStats.major.avgDays} decimals={1} suffix=" Hari" duration={4200} />
                </strong>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
            <div 
              style={{ 
                width: isInView ? `${Math.min(100, (leadTimeStats.major.avgDays / leadTimeStats.major.targetDays) * 100)}%` : '0%',
                transition: 'width 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms'
              }}
              className="bg-orange-500 rounded-full flex items-center justify-end pr-1 text-[8px] text-white font-bold"
            />
          </div>
        </div>

        {/* Minor NC */}
        <div 
          onMouseEnter={(e) => handleHover(minorData, e)}
          onMouseMove={(e) => handleMouseMove(minorData, e)}
          onMouseLeave={handleMouseLeave}
          className="space-y-1.5 p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200/80 dark:border-slate-700 hover:border-yellow-300 dark:hover:border-yellow-500/50 hover:shadow-xs transition-all cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-yellow-800 dark:text-yellow-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Minor NC
            </span>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Batas SLA: 14.0h</span>
              <span className="text-slate-700 dark:text-slate-300">
                Realisasi: <strong className="text-yellow-700 dark:text-yellow-400 font-mono">
                  <AnimatedNumber value={leadTimeStats.minor.avgDays} decimals={1} suffix=" Hari" duration={4200} />
                </strong>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
            <div 
              style={{ 
                width: isInView ? `${Math.min(100, (leadTimeStats.minor.avgDays / leadTimeStats.minor.targetDays) * 100)}%` : '0%',
                transition: 'width 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '450ms'
              }}
              className="bg-yellow-500 rounded-full flex items-center justify-end pr-1 text-[8px] text-white font-bold"
            />
          </div>
        </div>
      </div>

      {/* Floating Info Card */}
      {floatingSlaInfo && (
        <div 
          className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full pb-3 transition-opacity duration-150 animate-in fade-in zoom-in-95"
          style={{ 
            left: `${floatingSlaInfo.x}px`, 
            top: `${floatingSlaInfo.y}px` 
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-xl p-3 shadow-2xl min-w-[220px] text-xs">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: floatingSlaInfo.data.color }} 
                />
                <span className="font-bold text-white text-xs truncate max-w-[140px]">
                  {floatingSlaInfo.data.title.split(' ')[0]} {floatingSlaInfo.data.title.split(' ')[1]}
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                100% On-Track
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Target Toleransi SLA:</span>
                <span className="font-bold font-mono text-slate-300 text-xs">
                  {floatingSlaInfo.data.slaDays}.0 Hari Kerja
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-[11px]">Realisasi Aktual:</span>
                <span className="font-bold font-mono text-white text-xs">
                  {floatingSlaInfo.data.actualDays} Hari Kerja
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1 border-t border-slate-800/80 font-medium">
                <span>Efisiensi Waktu:</span>
                <span className="font-mono font-bold">
                  {(floatingSlaInfo.data.slaDays - floatingSlaInfo.data.actualDays).toFixed(1)} Hari Lebih Cepat
                </span>
              </div>
            </div>
          </div>
          {/* Arrow indicator */}
          <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
        <span>Respon PIC: <strong className="text-blue-700 dark:text-blue-400 font-medium">{leadTimeStats.avgResponseText}</strong></span>
        <span>Validasi Auditor: <strong className="text-emerald-700 dark:text-emerald-400 font-medium">{leadTimeStats.avgVerificationDays} Hari</strong></span>
      </div>
    </div>
  );
};
