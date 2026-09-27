import React, { useState, useRef } from 'react';
import { PieChartDataset, PieSliceData } from '../types';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';

interface DashboardPieChartProps {
  severityDataset: PieChartDataset;
  complianceDataset: PieChartDataset;
  statusDataset: PieChartDataset;
}

export const DashboardPieChart: React.FC<DashboardPieChartProps> = ({
  severityDataset,
  complianceDataset,
  statusDataset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pieWrapperRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'SEVERITY' | 'COMPLIANCE' | 'CAPA_STATUS'>('SEVERITY');
  const [hoveredSlice, setHoveredSlice] = useState<PieSliceData | null>(null);
  const [floatingSliceInfo, setFloatingSliceInfo] = useState<{
    x: number;
    y: number;
    slice: PieSliceData;
  } | null>(null);

  const { ref: inViewRef, isInView, animationKey } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  const currentDataset: PieChartDataset =
    activeTab === 'SEVERITY'
      ? severityDataset
      : activeTab === 'COMPLIANCE'
      ? complianceDataset
      : statusDataset;

  const { subtitle, total, unit, slices } = currentDataset;

  // Solid Pie Chart Geometry
  const size = 320;
  const center = size / 2;
  const radius = 112;

  // Identify slice with largest value/percentage for the exploded effect
  const maxSlice = slices.reduce(
    (prev, curr) => (curr.value > prev.value ? curr : prev),
    slices[0] || null
  );

  // Helper to generate Solid Pie Slice Wedge Path with Explode Offset
  const createPieWedge = (sl: PieSliceData, isHovered: boolean) => {
    const isLargest = maxSlice ? sl.id === maxSlice.id : false;
    const isExploded = hoveredSlice ? isHovered : isLargest;
    const offset = isExploded ? 14 : 0;

    const midAngle = (sl.startAngle + sl.endAngle) / 2;
    const midRad = ((midAngle - 90) * Math.PI) / 180;

    const sliceCx = center + offset * Math.cos(midRad);
    const sliceCy = center + offset * Math.sin(midRad);

    const startRad = ((sl.startAngle - 90) * Math.PI) / 180;
    const endRad = ((sl.endAngle - 90) * Math.PI) / 180;

    const x1 = sliceCx + radius * Math.cos(startRad);
    const y1 = sliceCy + radius * Math.sin(startRad);
    const x2 = sliceCx + radius * Math.cos(endRad);
    const y2 = sliceCy + radius * Math.sin(endRad);

    const largeArcFlag = sl.endAngle - sl.startAngle > 180 ? 1 : 0;

    const pathData = `M ${sliceCx.toFixed(2)} ${sliceCy.toFixed(2)} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    const labelR = radius * 0.65;
    const labelX = sliceCx + labelR * Math.cos(midRad);
    const labelY = sliceCy + labelR * Math.sin(midRad);

    return {
      pathData,
      isExploded,
      labelX,
      labelY,
    };
  };

  const handleArcHover = (sl: PieSliceData, e: React.MouseEvent) => {
    setHoveredSlice(sl);
    if (!pieWrapperRef.current) return;
    const rect = pieWrapperRef.current.getBoundingClientRect();
    const x = Math.max(60, Math.min(rect.width - 60, e.clientX - rect.left));
    const y = Math.max(110, Math.min(rect.height - 10, e.clientY - rect.top));
    setFloatingSliceInfo({
      x,
      y,
      slice: sl,
    });
  };

  const handleMouseMove = (sl: PieSliceData, e: React.MouseEvent) => {
    if (!pieWrapperRef.current) return;
    const rect = pieWrapperRef.current.getBoundingClientRect();
    const x = Math.max(60, Math.min(rect.width - 60, e.clientX - rect.left));
    const y = Math.max(110, Math.min(rect.height - 10, e.clientY - rect.top));
    setFloatingSliceInfo({
      x,
      y,
      slice: sl,
    });
  };

  const handleMouseLeave = () => {
    setHoveredSlice(null);
    setFloatingSliceInfo(null);
  };

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        inViewRef.current = el;
      }}
      className="p-5 md:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5 relative shadow-2xs transition-colors duration-200 min-h-[520px]"
    >
      {/* Header and Dataset Tabs (No Divider Line) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            Proporsi &amp; Sebaran Analitik Audit
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-1 rounded-lg border border-slate-300/80 dark:border-slate-700 self-start sm:self-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('SEVERITY');
              setHoveredSlice(null);
              setFloatingSliceInfo(null);
            }}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'SEVERITY'
                ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tingkat Keparahan
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('COMPLIANCE');
              setHoveredSlice(null);
              setFloatingSliceInfo(null);
            }}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'COMPLIANCE'
                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Status 42 Klausul
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('CAPA_STATUS');
              setHoveredSlice(null);
              setFloatingSliceInfo(null);
            }}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'CAPA_STATUS'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Siklus CAPA
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center space-y-6 py-2">
        {/* SVG Solid Pie Chart with Scale & Rotate Entrance Animation */}
        <div className="w-full flex justify-center items-center h-[280px] sm:h-[300px]">
          <div ref={pieWrapperRef} className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] shrink-0">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full overflow-visible select-none drop-shadow-xs"
              style={{
                transform: isInView ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-15deg)',
                opacity: isInView ? 1 : 0,
                transition: 'transform 1.8s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 1.2s ease-out',
                transformOrigin: 'center center',
              }}
            >
              {/* Solid Pie Slices */}
              {slices.map((sl) => {
                const isHovered = hoveredSlice?.id === sl.id;
                const { pathData, isExploded, labelX, labelY } = createPieWedge(sl, isHovered);

                return (
                  <g key={sl.id}>
                    <path
                      d={pathData}
                      fill={sl.color}
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        filter: isExploded
                          ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.22))'
                          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
                        opacity: hoveredSlice && !isHovered ? 0.45 : 1,
                      }}
                      onMouseEnter={(e) => handleArcHover(sl, e)}
                      onMouseMove={(e) => handleMouseMove(sl, e)}
                      onMouseLeave={handleMouseLeave}
                    />

                    {sl.percentage >= 10 && (
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize={sl.percentage >= 25 ? '13.5' : '11'}
                        fontWeight="800"
                        className="font-mono select-none drop-shadow-md pointer-events-none"
                      >
                        {sl.percentage}%
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Center Hub Badge with Animated Total */}
              <g className="pointer-events-none select-none">
                <circle
                  cx={center}
                  cy={center}
                  r="23"
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  className="drop-shadow-xs"
                />
                <text
                  x={center}
                  y={center - 4.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#64748b"
                  fontSize="8"
                  fontWeight="700"
                  className="uppercase font-mono tracking-wider"
                >
                  Total
                </text>
                <text
                  x={center}
                  y={center + 7.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#0f172a"
                  fontSize="12.5"
                  fontWeight="800"
                  className="font-mono"
                >
                  {total}
                </text>
              </g>
            </svg>

            {/* Floating Tooltip Info anchored inside pieWrapperRef */}
            {floatingSliceInfo && (
              <div 
                className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full pb-2 transition-opacity duration-150 animate-in fade-in zoom-in-95"
                style={{ 
                  left: `${floatingSliceInfo.x}px`, 
                  top: `${floatingSliceInfo.y}px` 
                }}
              >
                <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-xl p-2.5 shadow-2xl min-w-[200px] text-xs">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: floatingSliceInfo.slice.color }} 
                      />
                      <span className="font-bold text-white text-xs truncate max-w-[120px]">
                        {floatingSliceInfo.slice.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-white border border-slate-700">
                      {floatingSliceInfo.slice.percentage}%
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-[11px]">Kuantitas Riil:</span>
                      <span className="font-bold font-mono text-white text-xs">
                        {floatingSliceInfo.slice.value} {unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-[11px]">Porsi Distribusi:</span>
                      <span className="font-mono text-slate-300 text-[11px]">
                        {floatingSliceInfo.slice.value} dari {total} {unit}
                      </span>
                    </div>

                    {floatingSliceInfo.slice.subText && (
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                        {floatingSliceInfo.slice.subText}
                      </div>
                    )}
                  </div>
                </div>
                {/* Arrow indicator */}
                <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown Cards Placed Below with Animated Progress Bars */}
        <div className="w-full">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${slices.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-3 w-full`}>
            {slices.map((sl, idx) => {
              return (
                <div
                  key={sl.id}
                  onMouseEnter={(e) => handleArcHover(sl, e)}
                  onMouseMove={(e) => handleMouseMove(sl, e)}
                  onMouseLeave={handleMouseLeave}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-2xs transition-all cursor-pointer flex flex-col justify-between h-[96px] hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: sl.color }}
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        {sl.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono shrink-0">
                      <AnimatedNumber value={sl.percentage} suffix="%" duration={4000} />
                    </span>
                  </div>

                  {/* Percentage Progress Bar Animating Width on Enter */}
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden my-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: isInView ? `${Math.min(100, Math.max(sl.percentage, 4))}%` : '0%',
                        backgroundColor: sl.color,
                        transition: 'width 3.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${idx * 160 + 150}ms`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/80">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold font-mono shrink-0">
                      <AnimatedNumber value={sl.value} duration={4000} /> {unit}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] truncate text-right">
                      {sl.subText || `${Math.round((sl.value / total) * 100)}% dari total`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
        <span>
          {activeTab === 'SEVERITY'
            ? 'Prioritas: 7 Temuan Kritis wajib diselesaikan 1x24 jam.'
            : activeTab === 'COMPLIANCE'
            ? 'Kepatuhan: 24% Sesuai dan 76% Temuan NC/Kritis.'
            : 'Penyelesaian CAPA: 81% tiket terverifikasi/selesai.'}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">Real-time DB</span>
      </div>
    </div>
  );
};
