import React, { useState, useRef, useEffect } from 'react';
import { RadarChartData, RadarStagePoint } from '../types';
import { useInViewAnimation } from '../../../hooks/useInViewAnimation';

interface DashboardRadarChartProps {
  radarData: RadarChartData;
}

// Ease out cubic for natural, stately blooming effect
const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

export const DashboardRadarChart: React.FC<DashboardRadarChartProps> = ({ radarData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRadarStage, setActiveRadarStage] = useState<number | null>(null);
  const [floatingInfo, setFloatingInfo] = useState<{
    x: number;
    y: number;
    stage: RadarStagePoint;
  } | null>(null);

  const { ref: inViewRef, isInView, animationKey } = useInViewAnimation({
    threshold: 0.15,
    retriggerOnScroll: true,
  });

  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setAnimProgress(0);
      return;
    }

    let startTime = performance.now();
    const duration = 4500; // Relaxed, majestic bloom (4.5s)
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

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    setActiveRadarStage(idx);
    updateFloatingPosition(idx, e);
  };

  const handleMouseMove = (idx: number, e: React.MouseEvent) => {
    updateFloatingPosition(idx, e);
  };

  const updateFloatingPosition = (idx: number, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setFloatingInfo({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      stage: radarData.stages[idx],
    });
  };

  const handleMouseLeave = () => {
    setActiveRadarStage(null);
    setFloatingInfo(null);
  };

  // Interpolated animated polygon points based on animProgress
  const currentCompPolygonPoints = radarData.stages
    .map((s) => {
      const x = radarData.cx + (s.compX - radarData.cx) * animProgress;
      const y = radarData.cy + (s.compY - radarData.cy) * animProgress;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const currentResPolygonPoints = radarData.stages
    .map((s) => {
      const x = radarData.cx + (s.resX - radarData.cx) * animProgress;
      const y = radarData.cy + (s.resY - radarData.cy) * animProgress;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

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
            Kepatuhan 6 Siklus Ketenagakerjaan
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Komparasi skor kepatuhan klausul vs rasio resolusi CAPA.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">Kepatuhan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">Resolusi</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Hexagonal Radar Display with Center Blooming Animation */}
      <div className="flex items-center justify-center py-2 relative">
        <svg 
          viewBox="0 0 340 320" 
          className="w-full max-w-[340px] h-auto drop-shadow-xs overflow-visible"
        >
          <defs>
            <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="resGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* 1. Concentric Hexagonal Grid Rings */}
          {radarData.rings.map((ring, idx) => (
            <polygon
              key={idx}
              points={ring.points}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={idx === 4 ? '1.5' : '0.8'}
              strokeDasharray={idx === 4 ? 'none' : '2,2'}
              opacity={animProgress}
              className="transition-opacity duration-300"
            />
          ))}

          {/* 2. Grid Radial Axes Lines from Center to Vertices */}
          {radarData.stages.map((st, idx) => {
            const axisEndX = radarData.cx + (st.axisX - radarData.cx) * animProgress;
            const axisEndY = radarData.cy + (st.axisY - radarData.cy) * animProgress;
            return (
              <line
                key={idx}
                x1={radarData.cx}
                y1={radarData.cy}
                x2={axisEndX}
                y2={axisEndY}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            );
          })}

          {/* 3. Polygon Layer 1: CAPA Historical Resolution Polygon */}
          <polygon
            points={currentResPolygonPoints}
            fill="url(#resGrad)"
            stroke="#10b981"
            strokeWidth="2"
            opacity={animProgress > 0.05 ? 1 : 0}
          />

          {/* 4. Polygon Layer 2: Compliance Score Polygon */}
          <polygon
            points={currentCompPolygonPoints}
            fill="url(#compGrad)"
            stroke="#2563eb"
            strokeWidth="2.5"
            opacity={animProgress > 0.05 ? 1 : 0}
          />

          {/* 5. Center Core Dot */}
          <circle cx={radarData.cx} cy={radarData.cy} r="3" fill="#64748b" />

          {/* 6. Nodes & Labels for each vertex */}
          {radarData.stages.map((st, idx) => {
            const isHovered = activeRadarStage === idx;
            const curCompX = radarData.cx + (st.compX - radarData.cx) * animProgress;
            const curCompY = radarData.cy + (st.compY - radarData.cy) * animProgress;
            const curResX = radarData.cx + (st.resX - radarData.cx) * animProgress;
            const curResY = radarData.cy + (st.resY - radarData.cy) * animProgress;

            return (
              <g 
                key={idx} 
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(idx, e)}
                onMouseMove={(e) => handleMouseMove(idx, e)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Invisible large hit area for easy hover targeting */}
                <circle
                  cx={st.axisX}
                  cy={st.axisY}
                  r="22"
                  fill="transparent"
                />

                {/* Node Dots on Polygons */}
                <circle 
                  cx={curCompX} 
                  cy={curCompY} 
                  r={isHovered ? 6 : 3.5} 
                  fill="#2563eb" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                  opacity={animProgress}
                  className="transition-all duration-150 drop-shadow-sm" 
                />
                <circle 
                  cx={curResX} 
                  cy={curResY} 
                  r={isHovered ? 5.5 : 3} 
                  fill="#10b981" 
                  stroke="#ffffff" 
                  strokeWidth="1"
                  opacity={animProgress}
                  className="transition-all duration-150 drop-shadow-sm" 
                />

                {/* Vertex Axis Label */}
                <text
                  x={st.labelX}
                  y={st.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  opacity={animProgress}
                  className={`text-[9.5px] font-bold transition-all ${
                    isHovered ? 'fill-blue-700 font-extrabold text-[10.5px]' : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {st.shortLabel}
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
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-xl p-3 shadow-2xl min-w-[200px] text-xs">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="font-bold text-white text-xs">{floatingInfo.stage.shortLabel}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Siklus #{radarData.stages.indexOf(floatingInfo.stage) + 1}
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-300 text-[11px]">Skor Kepatuhan:</span>
                  </div>
                  <span className="font-bold font-mono text-blue-400 text-xs">
                    {floatingInfo.stage.complianceScore}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-300 text-[11px]">Resolusi CAPA:</span>
                  </div>
                  <span className="font-bold font-mono text-emerald-400 text-xs">
                    {floatingInfo.stage.resRate}%
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Evaluasi Status:</span>
                <span className={floatingInfo.stage.complianceScore >= 80 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {floatingInfo.stage.complianceScore >= 80 ? 'Tingkat Kepatuhan Baik' : 'Butuh Atensi Khusus'}
                </span>
              </div>
            </div>
            {/* Arrow indicator */}
            <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>

      {/* Footer Reference */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
        <span>Cakupan: 6 Siklus Kerja DAS Group</span>
        <span>Standar: UU Ketenagakerjaan &amp; PP 50/2012</span>
      </div>
    </div>
  );
};
