import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BarChartData, BarStageItem } from '../types';
import { LifecycleStage } from '../../../types/audit';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';

interface DashboardBarChartProps {
  barChartData: BarChartData;
  onNavigateToStage?: (stage: LifecycleStage) => void;
}

interface FloatingBarData {
  stageName: string;
  categoryLabel: string;
  count: number;
  pct: number;
  color: string;
  totalInStage: number;
  mode: 'CLAUSES' | 'CAPA';
}

export const DashboardBarChart: React.FC<DashboardBarChartProps> = ({
  barChartData,
  onNavigateToStage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'CLAUSES' | 'CAPA'>('CLAUSES');
  const [hoveredStage, setHoveredStage] = useState<BarStageItem | null>(null);
  const [floatingBarInfo, setFloatingBarInfo] = useState<{
    x: number;
    y: number;
    data: FloatingBarData;
  } | null>(null);

  const { ref: inViewRef, isInView, animationKey } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  const { stages, maxItemsPerStage, maxCapaPerStage } = barChartData;

  // Chart Dimensions (Wide, spacious layout for all 6 lifecycle stages)
  const chartHeight = 250;
  const chartWidth = 860;
  const paddingLeft = 40;
  const paddingRight = 28;
  const paddingTop = 32;
  const paddingBottom = 48;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const yMax = activeMode === 'CLAUSES' ? Math.max(maxItemsPerStage, 8) : Math.max(maxCapaPerStage, 8);
  const yTicks = [0, Math.round(yMax * 0.25), Math.round(yMax * 0.5), Math.round(yMax * 0.75), yMax];

  const groupWidth = plotWidth / stages.length;
  const barWidth = 15;

  const updateFloatingPosition = (data: FloatingBarData, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setFloatingBarInfo({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      data,
    });
  };

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        inViewRef.current = el;
      }}
      className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5 relative shadow-2xs transition-colors duration-200"
    >
      {/* Header with Title, Legend Indicators, and Mode Switcher (No Subtitle & No Dividers) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            Distribusi Evaluasi per Siklus Kerja
          </h3>
          
          {/* Legend Indicators directly under title */}
          <div className="text-xs">
            {activeMode === 'CLAUSES' ? (
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Sesuai (Compliant)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Minor NC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Major NC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Critical Hazard</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Terverifikasi (Verified)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-teal-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Selesai (Resolved)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Dalam Proses (In Progress)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Baru Terbit (Open)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mode Toggle Buttons (42 Klausul Audit | 32 Tiket CAPA) */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start md:self-center text-xs shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveMode('CLAUSES');
              setFloatingBarInfo(null);
              setHoveredStage(null);
            }}
            className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeMode === 'CLAUSES'
                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-2xs border border-slate-200 dark:border-slate-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            42 Klausul Audit
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('CAPA');
              setFloatingBarInfo(null);
              setHoveredStage(null);
            }}
            className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeMode === 'CAPA'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs border border-slate-200 dark:border-slate-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            32 Tiket CAPA
          </button>
        </div>
      </div>

      {/* Main SVG Bar Chart Container with Spacious ViewBox */}
      <div className="py-2 relative w-full">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Grid lines and Y-axis values */}
          {yTicks.map((val) => {
            const yPos = paddingTop + plotHeight - (val / yMax) * plotHeight;
            return (
              <g key={`y-grid-${val}`}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={chartWidth - paddingRight}
                  y2={yPos}
                  strokeDasharray="3 3"
                  className="stroke-slate-200/80 dark:stroke-slate-800/80"
                  strokeWidth="1"
                  opacity={val === 0 ? 0.9 : 0.6}
                />
                <text
                  x={paddingLeft - 10}
                  y={yPos + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="600"
                  className="fill-slate-500 dark:fill-slate-400 font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Render Stage Columns with Generous Spacing */}
          {stages.map((st, sIdx) => {
            const groupCenterX = paddingLeft + sIdx * groupWidth + groupWidth / 2;
            const isHovered = hoveredStage?.id === st.id;

            // Bar definitions depending on mode
            const barItems =
              activeMode === 'CLAUSES'
                ? [
                    {
                      category: 'Sesuai (Compliant)',
                      label: `${st.shortLabel} - Sesuai`,
                      count: st.compliant,
                      color: '#10b981',
                      hoverColor: '#059669',
                      pct: st.totalItems > 0 ? Math.round((st.compliant / st.totalItems) * 100) : 0,
                    },
                    {
                      category: 'Minor Non-Conformance',
                      label: `${st.shortLabel} - Minor NC`,
                      count: st.minorNc,
                      color: '#f59e0b',
                      hoverColor: '#d97706',
                      pct: st.totalItems > 0 ? Math.round((st.minorNc / st.totalItems) * 100) : 0,
                    },
                    {
                      category: 'Major Non-Conformance',
                      label: `${st.shortLabel} - Major NC`,
                      count: st.majorNc,
                      color: '#f43f5e',
                      hoverColor: '#e11d48',
                      pct: st.totalItems > 0 ? Math.round((st.majorNc / st.totalItems) * 100) : 0,
                    },
                    {
                      category: 'Critical Hazard',
                      label: `${st.shortLabel} - Critical Hazard`,
                      count: st.criticalHazard,
                      color: '#a855f7',
                      hoverColor: '#9333ea',
                      pct: st.totalItems > 0 ? Math.round((st.criticalHazard / st.totalItems) * 100) : 0,
                    },
                  ]
                : [
                    {
                      category: 'CAPA Terverifikasi',
                      label: `${st.shortLabel} - Terverifikasi`,
                      count: st.capaVerified,
                      color: '#10b981',
                      hoverColor: '#059669',
                      pct: st.capaTotal > 0 ? Math.round((st.capaVerified / st.capaTotal) * 100) : 0,
                    },
                    {
                      category: 'CAPA Selesai (Resolved)',
                      label: `${st.shortLabel} - Resolved`,
                      count: st.capaResolved,
                      color: '#14b8a6',
                      hoverColor: '#0d9488',
                      pct: st.capaTotal > 0 ? Math.round((st.capaResolved / st.capaTotal) * 100) : 0,
                    },
                    {
                      category: 'CAPA Dalam Proses',
                      label: `${st.shortLabel} - In Progress`,
                      count: st.capaInProgress,
                      color: '#f59e0b',
                      hoverColor: '#d97706',
                      pct: st.capaTotal > 0 ? Math.round((st.capaInProgress / st.capaTotal) * 100) : 0,
                    },
                    {
                      category: 'CAPA Baru Terbit (Open)',
                      label: `${st.shortLabel} - Open`,
                      count: st.capaOpen,
                      color: '#f43f5e',
                      hoverColor: '#e11d48',
                      pct: st.capaTotal > 0 ? Math.round((st.capaOpen / st.capaTotal) * 100) : 0,
                    },
                  ];

            // 4 sub-bars in group: generous 3px gap between bars
            const totalBarsWidth = barItems.length * barWidth + (barItems.length - 1) * 3;
            const startX = groupCenterX - totalBarsWidth / 2;

            return (
              <g
                key={st.id}
                className="cursor-pointer transition-opacity"
                onClick={() => onNavigateToStage?.(st.id)}
              >
                {/* Stage Backdrop Card for clear, spacious grouping (Dark Mode Ready) */}
                <rect
                  x={groupCenterX - 52}
                  y={paddingTop - 10}
                  width={104}
                  height={plotHeight + 18}
                  strokeWidth="1"
                  rx="8"
                  className={`transition-all duration-200 ${
                    isHovered
                      ? 'fill-slate-200/80 dark:fill-slate-800/70 stroke-slate-300 dark:stroke-slate-700'
                      : 'fill-slate-100/50 dark:fill-slate-800/30 stroke-slate-200/40 dark:stroke-slate-800/40'
                  }`}
                />

                {/* Sub Bars */}
                {barItems.map((bar, bIdx) => {
                  const bX = startX + bIdx * (barWidth + 3);
                  const bHeight = Math.max((bar.count / yMax) * plotHeight, bar.count > 0 ? 4 : 0);
                  const bY = paddingTop + plotHeight - bHeight;

                  const barData: FloatingBarData = {
                    stageName: st.label,
                    categoryLabel: bar.category,
                    count: bar.count,
                    pct: bar.pct,
                    color: bar.color,
                    totalInStage: activeMode === 'CLAUSES' ? st.totalItems : st.capaTotal,
                    mode: activeMode,
                  };

                  return (
                    <g
                      key={`${st.id}-bar-${bIdx}`}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredStage(st);
                        updateFloatingPosition(barData, e);
                      }}
                      onMouseMove={(e) => {
                        e.stopPropagation();
                        updateFloatingPosition(barData, e);
                      }}
                      onMouseLeave={() => {
                        setHoveredStage(null);
                        setFloatingBarInfo(null);
                      }}
                    >
                      {/* Invisible larger hit area around bar for effortless interaction */}
                      <rect
                        x={bX - 3}
                        y={paddingTop}
                        width={barWidth + 6}
                        height={plotHeight}
                        fill="transparent"
                      />

                      {/* Bar Rectangle with Smooth Rising Animation */}
                      <rect
                        x={bX}
                        y={isInView ? bY : paddingTop + plotHeight}
                        width={barWidth}
                        height={isInView ? bHeight : 0}
                        rx="3.5"
                        fill={bar.color}
                        style={{
                          transition: 'height 3.8s cubic-bezier(0.16, 1, 0.3, 1), y 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${sIdx * 150 + bIdx * 60}ms`,
                        }}
                        className="hover:brightness-110 drop-shadow-2xs cursor-pointer"
                      />

                      {/* Number on top if > 0 with comfortable padding */}
                      {bar.count > 0 && (
                        <text
                          x={bX + barWidth / 2}
                          y={bY - 5}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="700"
                          style={{
                            opacity: isInView ? 1 : 0,
                            transform: isInView ? 'translateY(0)' : 'translateY(6px)',
                            transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
                            transitionDelay: `${sIdx * 150 + bIdx * 60 + 1200}ms`,
                          }}
                          className="fill-slate-700 dark:fill-slate-200 font-mono"
                        >
                          {bar.count}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* X Axis Labels: Spacious Stage Title & Total Pill */}
                <text
                  x={groupCenterX}
                  y={chartHeight - 20}
                  textAnchor="middle"
                  fontSize="10.5"
                  className={`tracking-tight transition-colors ${
                    isHovered
                      ? 'fill-blue-600 dark:fill-blue-400 font-extrabold'
                      : 'fill-slate-800 dark:fill-slate-200 font-bold'
                  }`}
                >
                  {st.shortLabel}
                </text>
                <text
                  x={groupCenterX}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  className="fill-slate-500 dark:fill-slate-400 font-mono"
                >
                  {activeMode === 'CLAUSES' ? `${st.totalItems} Klausul` : `${st.capaTotal} Tiket CAPA`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Info Card */}
        {floatingBarInfo && (
          <div 
            className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full pb-3 transition-opacity duration-150"
            style={{ 
              left: `${floatingBarInfo.x}px`, 
              top: `${floatingBarInfo.y}px` 
            }}
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-xl p-3 shadow-2xl min-w-[210px] text-xs">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="font-bold text-white text-xs truncate max-w-[140px]">
                  {floatingBarInfo.data.stageName}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {floatingBarInfo.data.mode === 'CLAUSES' ? 'Klausul' : 'CAPA'}
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: floatingBarInfo.data.color }} 
                    />
                    <span className="text-slate-300 text-[11px] font-medium">
                      {floatingBarInfo.data.categoryLabel}:
                    </span>
                  </div>
                  <span className="font-bold font-mono text-white text-xs">
                    {floatingBarInfo.data.count} ({floatingBarInfo.data.pct}%)
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span>Total Tahap Ini:</span>
                  <span className="text-slate-200 font-mono font-medium">
                    {floatingBarInfo.data.totalInStage} {floatingBarInfo.data.mode === 'CLAUSES' ? 'Klausul' : 'Tiket'}
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-blue-400">
                <span>Klik untuk buka Kertas Kerja</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            {/* Arrow indicator */}
            <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};
