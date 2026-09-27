import React, { useState, useRef, useEffect } from 'react';
import { TrendLineData, LeadTimeStats, TrendPoint } from '../types';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';
import { AnimatedNumber } from '../../../components/common/AnimatedNumber';

interface DashboardTrendLineChartProps {
  trendLineData: TrendLineData;
  leadTimeStats: LeadTimeStats;
}

const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

export const DashboardTrendLineChart: React.FC<DashboardTrendLineChartProps> = ({
  trendLineData,
  leadTimeStats,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTrendWeek, setActiveTrendWeek] = useState<number | null>(null);
  const [floatingInfo, setFloatingInfo] = useState<{
    x: number;
    y: number;
    point: TrendPoint;
  } | null>(null);

  const { ref: inViewRef, isInView, animationKey } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  const [animProgress, setAnimProgress] = useState(0);
  const pathTotalLength = 700;

  useEffect(() => {
    if (!isInView) {
      setAnimProgress(0);
      return;
    }

    let startTime = performance.now();
    const duration = 4500; // Relaxed, cinematic line drawing (4.5s)
    let animId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      setAnimProgress(easeOutCubic(t));

      if (t < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, animationKey]);

  const handleMouseEnter = (idx: number, pt: TrendPoint, e: React.MouseEvent) => {
    setActiveTrendWeek(idx);
    updateFloatingPosition(pt, e);
  };

  const handleMouseMove = (pt: TrendPoint, e: React.MouseEvent) => {
    updateFloatingPosition(pt, e);
  };

  const updateFloatingPosition = (pt: TrendPoint, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setFloatingInfo({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      point: pt,
    });
  };

  const handleMouseLeave = () => {
    setActiveTrendWeek(null);
    setFloatingInfo(null);
  };

  const strokeOffset = pathTotalLength * (1 - animProgress);
  const avgDaysNum = parseFloat(leadTimeStats.avgResolutionDays) || 0;

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        inViewRef.current = el;
      }}
      className="lg:col-span-6 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 relative shadow-2xs transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Penurunan Durasi Resolusi (Lead Time)
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Tren percepatan penuntasan dari 3.8 hari menjadi 1.5 hari.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono shrink-0">
          -60% Lebih Cepat
        </span>
      </div>

      {/* SVG Line / Area Graph with Path Drawing Animation */}
      <div className="w-full flex items-center justify-center py-2 relative">
        <svg 
          viewBox={`0 0 ${trendLineData.width} ${trendLineData.height}`} 
          className="w-full h-auto drop-shadow-xs overflow-visible"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal Guideline Rings */}
          <line x1="30" y1="50" x2="445" y2="50" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" opacity={animProgress} />
          <line x1="30" y1="127" x2="445" y2="127" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" opacity={animProgress} />
          <line x1="30" y1="205" x2="445" y2="205" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" opacity={animProgress} />

          {/* Y-Axis Labels */}
          <text x="22" y="53" textAnchor="end" className="text-[8.5px] fill-slate-400 dark:fill-slate-500 font-mono">4.0h</text>
          <text x="22" y="130" textAnchor="end" className="text-[8.5px] fill-slate-400 dark:fill-slate-500 font-mono">2.5h</text>
          <text x="22" y="208" textAnchor="end" className="text-[8.5px] fill-slate-400 dark:fill-slate-500 font-mono">1.0h</text>

          {/* Target SLA Line (2.0 Hari) */}
          <line 
            x1="30" 
            y1="153" 
            x2={30 + (445 - 30) * animProgress} 
            y2="153" 
            stroke="#f59e0b" 
            strokeWidth="1.2" 
            strokeDasharray="4,2" 
          />
          <text 
            x="440" 
            y="148" 
            textAnchor="end" 
            opacity={animProgress}
            className="text-[8.5px] font-bold fill-amber-600 dark:fill-amber-400"
          >
            Target SLA &le; 2.0 Hari
          </text>

          {/* Shaded Area Under Curve with Fade-In */}
          <path 
            d={trendLineData.areaPath} 
            fill="url(#areaGrad)" 
            opacity={Math.max(0, (animProgress - 0.2) / 0.8)} 
          />

          {/* Continuous Line Curve with Smooth Drawing Stroke */}
          <path 
            d={trendLineData.linePath} 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            strokeDasharray={pathTotalLength}
            strokeDashoffset={strokeOffset}
          />

          {/* Data Points popping in as line reaches them */}
          {trendLineData.points.map((pt, idx) => {
            const isHovered = activeTrendWeek === idx;
            // Point progress threshold (from 0 to 1)
            const pointThreshold = idx / (trendLineData.points.length - 1);
            const isPointVisible = animProgress >= pointThreshold * 0.9;
            const pointScale = isPointVisible ? (isHovered ? 1.4 : 1) : 0;

            return (
              <g 
                key={idx} 
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(idx, pt, e)}
                onMouseMove={(e) => handleMouseMove(pt, e)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Large hit area for easy hover */}
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r="18" 
                  fill="transparent" 
                />

                {/* Vertical guideline on hover */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1="25"
                    x2={pt.x}
                    y2="225"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    opacity="0.8"
                  />
                )}

                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r={4.5 * pointScale} 
                  fill="#ffffff" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  className="transition-all duration-200 drop-shadow-xs"
                />

                {/* Week Label */}
                <text 
                  x={pt.x} 
                  y="232" 
                  textAnchor="middle" 
                  opacity={isPointVisible ? 1 : 0}
                  className={`text-[9.5px] transition-all duration-300 ${isHovered ? 'fill-emerald-700 dark:fill-emerald-400 font-bold text-[10px]' : 'fill-slate-500 dark:fill-slate-400'}`}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Info Card */}
        {floatingInfo && (
          <div 
            className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full pb-3 transition-opacity duration-150 animate-in fade-in zoom-in-95"
            style={{ 
              left: `${floatingInfo.x}px`, 
              top: `${floatingInfo.y}px` 
            }}
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-xl p-3 shadow-2xl min-w-[210px] text-xs">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="font-bold text-white text-xs">{floatingInfo.point.label}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {floatingInfo.point.dateRange}
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-300 text-[11px]">Lead Time Rata-rata:</span>
                  </div>
                  <span className="font-bold font-mono text-emerald-400 text-xs">
                    {floatingInfo.point.leadTime} Hari
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-slate-300 text-[11px]">Rasio Penyelesaian:</span>
                  </div>
                  <span className="font-bold font-mono text-blue-400 text-xs">
                    {floatingInfo.point.rate}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span>Tiket Selesai:</span>
                  <span className="text-slate-200 font-mono font-medium">{floatingInfo.point.resolvedCount} Tiket</span>
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Target SLA (&le; 2.0h):</span>
                <span className={floatingInfo.point.leadTime <= 2.0 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {floatingInfo.point.leadTime <= 2.0 ? 'Memenuhi Standar SLA' : 'Masa Transisi Optimal'}
                </span>
              </div>
            </div>
            {/* Arrow indicator */}
            <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>

      {/* Footer Insight */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
        <span>Rata-rata Aktual: <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
          <AnimatedNumber value={avgDaysNum} decimals={1} suffix=" Hari" />
        </strong></span>
        <span>Target SLA: &le; 2.0 Hari <strong className="text-emerald-700 dark:text-emerald-400 font-semibold ml-1">(On-Track)</strong></span>
      </div>
    </div>
  );
};
