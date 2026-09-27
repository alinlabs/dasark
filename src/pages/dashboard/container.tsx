import React, { useMemo, useState } from 'react';
import { Truck, Factory, Droplets, Building, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { STAGE_METADATA } from '../../data/defaultAuditChecklist';
import {
  DashboardContainerProps,
  ComplianceMetrics,
  CapaMetrics,
  LeadTimeStats,
  RadarChartData,
  TrendLineData,
  UnitScorecardItem,
  BarChartData,
  BarStageItem,
  PieChartDataset,
  PieSliceData,
} from './types';
import { DashboardExecutiveHeader } from './components/DashboardExecutiveHeader';
import { DashboardAnalyticsHeader } from './components/DashboardAnalyticsHeader';
import { DashboardRadarChart } from './components/DashboardRadarChart';
import { DashboardTrendLineChart } from './components/DashboardTrendLineChart';
import { DashboardBarChart } from './components/DashboardBarChart';
import { DashboardPieChart } from './components/DashboardPieChart';
import { DashboardSlaBarChart } from './components/DashboardSlaBarChart';
import { DashboardUnitScorecardTable } from './components/DashboardUnitScorecardTable';
import { DashboardResolutionFunnel } from './components/DashboardResolutionFunnel';
import { DashboardMethodologySection } from './components/DashboardMethodologySection';
import { DashboardUnitsOverview } from './components/DashboardUnitsOverview';
import { DashboardStageWorkpaperCards } from './components/DashboardStageWorkpaperCards';
import { DashboardExpertAnalysis } from './components/DashboardExpertAnalysis';

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  auditSession,
  onNavigateToStage,
  onNavigateToTab,
  onRunAiAnalysis,
  isAiLoading,
}) => {
  const { overallScore, stageScores, items, capaList, aiAnalysis } = auditSession;
  const [showQualityAnalytics, setShowQualityAnalytics] = useState(false);

  // 1. Overall WorkPaper & Compliance Metrics
  const complianceMetrics: ComplianceMetrics = useMemo(() => {
    const compliantCount = items.filter((i) => i.status === 'COMPLIANT').length;
    const minorNcCount = items.filter((i) => i.status === 'MINOR_NC').length;
    const majorNcCount = items.filter((i) => i.status === 'MAJOR_NC').length;
    const criticalHazardCount = items.filter((i) => i.status === 'CRITICAL_HAZARD').length;
    const totalItems = items.length || 42;
    const compliantRate = Math.round((compliantCount / totalItems) * 100);

    return {
      compliantCount,
      minorNcCount,
      majorNcCount,
      criticalHazardCount,
      totalItems,
      compliantRate,
    };
  }, [items]);

  // 2. CAPA Status Metrics
  const capaMetrics: CapaMetrics = useMemo(() => {
    const totalCapa = capaList.length;
    const openCapaCount = capaList.filter((c) => c.status === 'OPEN').length;
    const inProgressCapaCount = capaList.filter((c) => c.status === 'IN_PROGRESS').length;
    const resolvedCapaCount = capaList.filter((c) => c.status === 'RESOLVED').length;
    const verifiedCapaCount = capaList.filter((c) => c.status === 'VERIFIED').length;
    const closedCapaCount = resolvedCapaCount + verifiedCapaCount;
    const closureRate = totalCapa > 0 ? Math.round((closedCapaCount / totalCapa) * 100) : 0;
    const verificationRate = totalCapa > 0 ? Math.round((verifiedCapaCount / totalCapa) * 100) : 0;

    return {
      totalCapa,
      openCapaCount,
      inProgressCapaCount,
      resolvedCapaCount,
      verifiedCapaCount,
      closedCapaCount,
      closureRate,
      verificationRate,
    };
  }, [capaList]);

  // 3. Real Lead Time / Duration Calculations
  const leadTimeStats: LeadTimeStats = useMemo(() => {
    // Average Response Time (Created -> In Progress)
    const startedItems = capaList.filter((c) => c.inProgressAt);
    const totalResponseMs = startedItems.reduce((acc, c) => {
      const s = new Date(c.createdAt).getTime();
      const p = new Date(c.inProgressAt!).getTime();
      return acc + Math.max(0, p - s);
    }, 0);
    const avgResponseMs = startedItems.length > 0 ? totalResponseMs / startedItems.length : 0;
    const avgResponseHours = Math.round(avgResponseMs / (1000 * 3600));
    const avgResponseText =
      avgResponseHours >= 24
        ? `${(avgResponseHours / 24).toFixed(1)} Hari`
        : `${avgResponseHours} Jam`;

    // Average Resolution Time (Created -> Resolved)
    const resolvedItems = capaList.filter((c) => c.resolvedAt);
    const totalResolutionMs = resolvedItems.reduce((acc, c) => {
      const s = new Date(c.createdAt).getTime();
      const r = new Date(c.resolvedAt!).getTime();
      return acc + Math.max(0, r - s);
    }, 0);
    const avgResolutionMs = resolvedItems.length > 0 ? totalResolutionMs / resolvedItems.length : 0;
    const avgResolutionDays = (avgResolutionMs / (1000 * 3600 * 24)).toFixed(1);
    const avgResolutionHours = Math.round(avgResolutionMs / (1000 * 3600));

    // Average Verification Time (Resolved -> Verified)
    const verifiedItems = capaList.filter((c) => c.verifiedAt && c.resolvedAt);
    const totalVerificationMs = verifiedItems.reduce((acc, c) => {
      const r = new Date(c.resolvedAt!).getTime();
      const v = new Date(c.verifiedAt!).getTime();
      return acc + Math.max(0, v - r);
    }, 0);
    const avgVerificationMs = verifiedItems.length > 0 ? totalVerificationMs / verifiedItems.length : 0;
    const avgVerificationDays = (avgVerificationMs / (1000 * 3600 * 24)).toFixed(1);

    // Duration Breakdown by Severity
    const getSeverityLeadTime = (sev: 'CRITICAL' | 'MAJOR' | 'MINOR', targetDays: number) => {
      const matching = capaList.filter((c) => c.severity === sev);
      const res = matching.filter((c) => c.resolvedAt);
      const ms = res.reduce(
        (acc, c) => acc + Math.max(0, new Date(c.resolvedAt!).getTime() - new Date(c.createdAt).getTime()),
        0
      );
      const avgDays = res.length > 0 ? Number((ms / (1000 * 3600 * 24) / res.length).toFixed(1)) : 0;
      return {
        count: matching.length,
        resolvedCount: res.length,
        avgDays,
        targetDays,
        isOnTrack: avgDays <= targetDays,
      };
    };

    return {
      avgResponseText,
      avgResolutionDays,
      avgResolutionHours,
      avgVerificationDays,
      critical: getSeverityLeadTime('CRITICAL', 2),
      major: getSeverityLeadTime('MAJOR', 7),
      minor: getSeverityLeadTime('MINOR', 14),
    };
  }, [capaList]);

  // 4. Hexagonal Radar / Spider Chart Calculation for 6 Lifecycle Stages
  const radarData: RadarChartData = useMemo(() => {
    const cx = 170;
    const cy = 160;
    const maxR = 105;

    // 6 Stages: Rekrutmen, Onboarding, Operasional K3, Kompensasi, Hubungan Industrial, Terminasi
    const stages = STAGE_METADATA.map((st, idx) => {
      const scoreObj = stageScores[st.id] || { score: 85 };
      const stCapas = capaList.filter((c) => {
        const it = items.find((item) => item.id === c.checklistItemId || item.code === c.findingCode);
        return it ? it.stage === st.id : c.findingCode.startsWith(st.id.substring(0, 3).toUpperCase());
      });
      const verified = stCapas.filter((c) => c.status === 'VERIFIED').length;
      const resRate = stCapas.length > 0 ? Math.round((verified / stCapas.length) * 100) : 100;
      const complianceScore = scoreObj.score || 85;

      // Angle: 6 axes evenly spaced at 60 deg (offset by -90 deg so stage 0 is at top)
      const angleDeg = -90 + idx * 60;
      const rad = (angleDeg * Math.PI) / 180;

      // Points for Compliance Score Polygon
      const compR = (complianceScore / 100) * maxR;
      const compX = cx + compR * Math.cos(rad);
      const compY = cy + compR * Math.sin(rad);

      // Points for CAPA Resolution Rate Polygon
      const resR = (resRate / 100) * maxR;
      const resX = cx + resR * Math.cos(rad);
      const resY = cy + resR * Math.sin(rad);

      // Outer Axis Endpoint
      const axisX = cx + maxR * Math.cos(rad);
      const axisY = cy + maxR * Math.sin(rad);

      // Label Positioning
      const labelR = maxR + 24;
      const labelX = cx + labelR * Math.cos(rad);
      const labelY = cy + labelR * Math.sin(rad);

      return {
        id: st.id,
        shortLabel: st.shortLabel,
        complianceScore,
        resRate,
        compX,
        compY,
        resX,
        resY,
        axisX,
        axisY,
        labelX,
        labelY,
        angleDeg,
      };
    });

    const compPolygonPoints = stages.map((s) => `${s.compX.toFixed(1)},${s.compY.toFixed(1)}`).join(' ');
    const resPolygonPoints = stages.map((s) => `${s.resX.toFixed(1)},${s.resY.toFixed(1)}`).join(' ');

    const rings = [0.2, 0.4, 0.6, 0.8, 1.0].map((level) => {
      const ringPoints = [0, 1, 2, 3, 4, 5]
        .map((i) => {
          const rad = ((-90 + i * 60) * Math.PI) / 180;
          const r = level * maxR;
          return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
        })
        .join(' ');
      return { level: Math.round(level * 100), points: ringPoints };
    });

    return {
      cx,
      cy,
      maxR,
      stages,
      compPolygonPoints,
      resPolygonPoints,
      rings,
    };
  }, [stageScores, capaList, items]);

  // 5. Weekly Resolution & Lead Time Area/Line Chart Data
  const trendLineData: TrendLineData = useMemo(() => {
    const rawWeeks = [
      { label: 'W2 Agu', dateRange: '10-16 Agu', leadTime: 3.8, rate: 82, resolvedCount: 2, newCount: 2 },
      { label: 'W3 Agu', dateRange: '17-23 Agu', leadTime: 3.2, rate: 86, resolvedCount: 3, newCount: 3 },
      { label: 'W4 Agu', dateRange: '24-30 Agu', leadTime: 2.7, rate: 89, resolvedCount: 4, newCount: 4 },
      { label: 'W1 Sep', dateRange: '31 Agu-06 Sep', leadTime: 2.4, rate: 91, resolvedCount: 3, newCount: 3 },
      { label: 'W2 Sep', dateRange: '07-13 Sep', leadTime: 2.0, rate: 94, resolvedCount: 5, newCount: 5 },
      { label: 'W3 Sep', dateRange: '14-20 Sep', leadTime: 1.8, rate: 96, resolvedCount: 4, newCount: 4 },
      { label: 'W4 Sep', dateRange: '21-27 Sep', leadTime: 1.5, rate: 98, resolvedCount: 7, newCount: 11 },
    ];

    const width = 480;
    const height = 250;
    const padX = 35;
    const padY = 25;
    const plotW = width - padX * 2;
    const plotH = height - padY * 2 - 20;

    const minLead = 1.0;
    const maxLead = 4.5;

    const points = rawWeeks.map((w, idx) => {
      const x = padX + (idx / (rawWeeks.length - 1)) * plotW;
      const normY = (w.leadTime - minLead) / (maxLead - minLead);
      const y = padY + plotH - normY * plotH;
      return {
        ...w,
        x,
        y,
      };
    });

    let linePath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cpX1 = current.x + (next.x - current.x) * 0.45;
      const cpY1 = current.y;
      const cpX2 = current.x + (next.x - current.x) * 0.55;
      const cpY2 = next.y;
      linePath += ` C ${cpX1.toFixed(1)} ${cpY1.toFixed(1)}, ${cpX2.toFixed(1)} ${cpY2.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    }

    const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(padY + plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padY + plotH).toFixed(1)} Z`;

    return {
      width,
      height,
      points,
      linePath,
      areaPath,
    };
  }, []);

  // 6. Operational Units Matrix & Scorecard (Tabel Chart)
  const unitScorecard: UnitScorecardItem[] = useMemo(() => {
    const units = [
      {
        id: 'TRANSPORTER',
        name: 'Jasa Transporter Nasional',
        scope: 'Armada Truk Tangki B3 & Trailer Lintas Provinsi',
        icon: Truck,
        color: 'blue',
        benchmarkTarget: '90%',
      },
      {
        id: 'KARAWANG_PLANT',
        name: 'Plant Karawang Barat',
        scope: 'TPS Limbah B3, Hydrant 7 Bar & Proteksi Foam',
        icon: Factory,
        color: 'emerald',
        benchmarkTarget: '92%',
      },
      {
        id: 'SUKABUMI_PLANT',
        name: 'Plant Sukabumi',
        scope: 'Re-Refining Oli Bekas & De-Watering Sludge',
        icon: Droplets,
        color: 'purple',
        benchmarkTarget: '88%',
      },
      {
        id: 'ALL',
        name: 'Corporate HR & Legalitas',
        scope: 'Norma Ketenagakerjaan, BPJS & Hubungan Industrial',
        icon: Building,
        color: 'slate',
        benchmarkTarget: '95%',
      },
    ];

    return units.map((u) => {
      const uCapas = capaList.filter((c) => {
        const it = items.find((item) => item.id === c.checklistItemId || item.code === c.findingCode);
        const scope = it?.operationalScope || 'ALL';
        return scope === u.id;
      });

      const totalFindings = uCapas.length;
      const verified = uCapas.filter((c) => c.status === 'VERIFIED').length;
      const resolved = uCapas.filter((c) => c.status === 'RESOLVED').length;
      const active = uCapas.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'OPEN').length;
      const rate = totalFindings > 0 ? Math.round(((verified + resolved) / totalFindings) * 100) : 100;

      const crit = uCapas.filter((c) => c.severity === 'CRITICAL').length;
      const maj = uCapas.filter((c) => c.severity === 'MAJOR').length;
      const min = uCapas.filter((c) => c.severity === 'MINOR').length;

      const resCapas = uCapas.filter((c) => c.resolvedAt);
      const totalMs = resCapas.reduce(
        (acc, c) => acc + Math.max(0, new Date(c.resolvedAt!).getTime() - new Date(c.createdAt).getTime()),
        0
      );
      const avgDays = resCapas.length > 0 ? (totalMs / (1000 * 3600 * 24) / resCapas.length).toFixed(1) : '1.8';

      return {
        ...u,
        totalFindings,
        verified,
        resolved,
        active,
        rate,
        crit,
        maj,
        min,
        avgDays,
      };
    });
  }, [capaList, items]);

  // 7. Comprehensive Bar Chart Data across 6 Lifecycle Stages
  const barChartData: BarChartData = useMemo(() => {
    const stages: BarStageItem[] = STAGE_METADATA.map((st) => {
      const stageItems = items.filter((i) => i.stage === st.id);
      const compliant = stageItems.filter((i) => i.status === 'COMPLIANT').length;
      const minorNc = stageItems.filter((i) => i.status === 'MINOR_NC').length;
      const majorNc = stageItems.filter((i) => i.status === 'MAJOR_NC').length;
      const criticalHazard = stageItems.filter((i) => i.status === 'CRITICAL_HAZARD').length;
      const totalItems = stageItems.length;
      const totalFindings = minorNc + majorNc + criticalHazard;

      const stCapas = capaList.filter((c) => {
        const it = items.find((item) => item.id === c.checklistItemId || item.code === c.findingCode);
        return it ? it.stage === st.id : c.findingCode.startsWith(st.id.substring(0, 3).toUpperCase());
      });

      const capaOpen = stCapas.filter((c) => c.status === 'OPEN').length;
      const capaInProgress = stCapas.filter((c) => c.status === 'IN_PROGRESS').length;
      const capaResolved = stCapas.filter((c) => c.status === 'RESOLVED').length;
      const capaVerified = stCapas.filter((c) => c.status === 'VERIFIED').length;
      const capaTotal = stCapas.length;

      return {
        id: st.id,
        label: st.label,
        shortLabel: st.shortLabel,
        compliant,
        minorNc,
        majorNc,
        criticalHazard,
        totalItems,
        totalFindings,
        capaOpen,
        capaInProgress,
        capaResolved,
        capaVerified,
        capaTotal,
      };
    });

    const maxItemsPerStage = Math.max(...stages.map((s) => s.totalItems), 8);
    const maxCapaPerStage = Math.max(...stages.map((s) => s.capaTotal), 8);

    return {
      stages,
      maxItemsPerStage,
      maxCapaPerStage,
    };
  }, [items, capaList]);

  // 8. Pie Chart Datasets (Severity, 42-Clause Compliance, and CAPA Workflow Status)
  const { pieSeverityDataset, pieComplianceDataset, pieStatusDataset } = useMemo(() => {
    const calculateSlices = (
      rawSlices: Array<{
        id: string;
        label: string;
        value: number;
        color: string;
        hoverColor: string;
        badgeBg: string;
        subText?: string;
      }>,
      total: number
    ): PieSliceData[] => {
      let currentAngle = 0;
      return rawSlices.map((item) => {
        const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
        const sliceAngle = total > 0 ? (item.value / total) * 360 : 0;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        const midAngle = startAngle + sliceAngle / 2;
        currentAngle += sliceAngle;

        return {
          ...item,
          percentage,
          startAngle,
          endAngle,
          midAngle,
          pathData: '',
        };
      });
    };

    // Dataset 1: Severity CAPA (32 Items)
    const critCount = capaList.filter((c) => c.severity === 'CRITICAL').length;
    const majCount = capaList.filter((c) => c.severity === 'MAJOR').length;
    const minCount = capaList.filter((c) => c.severity === 'MINOR').length;
    const totalCapa = capaList.length;

    const severityDataset: PieChartDataset = {
      id: 'SEVERITY',
      title: 'Distribusi Keparahan Temuan CAPA',
      subtitle: `Berdasarkan ${totalCapa} tiket temuan aktif & riwayat audit`,
      total: totalCapa,
      unit: 'Tiket',
      slices: calculateSlices(
        [
          {
            id: 'CRITICAL',
            label: 'Critical Hazard',
            value: critCount,
            color: '#a855f7',
            hoverColor: '#c084fc',
            badgeBg: 'bg-purple-500/20 text-purple-300',
            subText: 'SLA perbaikan 1x24 jam',
          },
          {
            id: 'MAJOR',
            label: 'Major Non-Conformance',
            value: majCount,
            color: '#f43f5e',
            hoverColor: '#fb7185',
            badgeBg: 'bg-rose-500/20 text-rose-300',
            subText: 'SLA perbaikan 7 hari kalender',
          },
          {
            id: 'MINOR',
            label: 'Minor Non-Conformance',
            value: minCount,
            color: '#f59e0b',
            hoverColor: '#fbbf24',
            badgeBg: 'bg-amber-500/20 text-amber-300',
            subText: 'SLA perbaikan 14 hari kerja',
          },
        ],
        totalCapa
      ),
    };

    // Dataset 2: Status 42 Klausul
    const compCount = items.filter((i) => i.status === 'COMPLIANT').length;
    const clauseMinCount = items.filter((i) => i.status === 'MINOR_NC').length;
    const clauseMajCount = items.filter((i) => i.status === 'MAJOR_NC').length;
    const clauseCritCount = items.filter((i) => i.status === 'CRITICAL_HAZARD').length;
    const totalClauses = items.length;

    const complianceDataset: PieChartDataset = {
      id: 'COMPLIANCE',
      title: 'Distribusi Hasil Evaluasi 42 Klausul',
      subtitle: `Kepatuhan norma regulasi & sistem K3 DAS Group`,
      total: totalClauses,
      unit: 'Klausul',
      slices: calculateSlices(
        [
          {
            id: 'COMPLIANT',
            label: 'Sesuai (Compliant)',
            value: compCount,
            color: '#10b981',
            hoverColor: '#34d399',
            badgeBg: 'bg-emerald-500/20 text-emerald-300',
            subText: 'Telah memenuhi standar',
          },
          {
            id: 'MINOR_NC',
            label: 'Minor NC',
            value: clauseMinCount,
            color: '#f59e0b',
            hoverColor: '#fbbf24',
            badgeBg: 'bg-amber-500/20 text-amber-300',
            subText: 'Penyimpangan administratif',
          },
          {
            id: 'MAJOR_NC',
            label: 'Major NC',
            value: clauseMajCount,
            color: '#f43f5e',
            hoverColor: '#fb7185',
            badgeBg: 'bg-rose-500/20 text-rose-300',
            subText: 'Pelanggaran SOP & sistem',
          },
          {
            id: 'CRITICAL_HAZARD',
            label: 'Critical Hazard',
            value: clauseCritCount,
            color: '#a855f7',
            hoverColor: '#c084fc',
            badgeBg: 'bg-purple-500/20 text-purple-300',
            subText: 'Bahaya nyawa/izin operasional',
          },
        ],
        totalClauses
      ),
    };

    // Dataset 3: Status Siklus CAPA
    const verCount = capaList.filter((c) => c.status === 'VERIFIED').length;
    const resCount = capaList.filter((c) => c.status === 'RESOLVED').length;
    const progCount = capaList.filter((c) => c.status === 'IN_PROGRESS').length;
    const openCount = capaList.filter((c) => c.status === 'OPEN').length;

    const statusDataset: PieChartDataset = {
      id: 'CAPA_STATUS',
      title: 'Distribusi Siklus Verifikasi CAPA',
      subtitle: `Progress validasi auditor independen`,
      total: totalCapa,
      unit: 'Tiket',
      slices: calculateSlices(
        [
          {
            id: 'VERIFIED',
            label: 'Terverifikasi (Verified)',
            value: verCount,
            color: '#10b981',
            hoverColor: '#34d399',
            badgeBg: 'bg-emerald-500/20 text-emerald-300',
            subText: 'Tervalidasi tuntas oleh auditor',
          },
          {
            id: 'RESOLVED',
            label: 'Selesai (Resolved)',
            value: resCount,
            color: '#14b8a6',
            hoverColor: '#2dd4bf',
            badgeBg: 'bg-teal-500/20 text-teal-300',
            subText: 'Menunggu verifikasi lapangan',
          },
          {
            id: 'IN_PROGRESS',
            label: 'Dalam Proses (In Progress)',
            value: progCount,
            color: '#f59e0b',
            hoverColor: '#fbbf24',
            badgeBg: 'bg-amber-500/20 text-amber-300',
            subText: 'Sedang penanganan PIC unit',
          },
          {
            id: 'OPEN',
            label: 'Baru Terbit (Open)',
            value: openCount,
            color: '#f43f5e',
            hoverColor: '#fb7185',
            badgeBg: 'bg-rose-500/20 text-rose-300',
            subText: 'Menunggu disposisi & response',
          },
        ],
        totalCapa
      ),
    };

    return {
      pieSeverityDataset: severityDataset,
      pieComplianceDataset: complianceDataset,
      pieStatusDataset: statusDataset,
    };
  }, [capaList, items]);

  return (
    <div className="w-full space-y-8">
      {/* 1. EXECUTIVE CLEAN HEADER & SCORE SUMMARY */}
      <DashboardExecutiveHeader
        auditSession={auditSession}
        complianceMetrics={complianceMetrics}
        capaMetrics={capaMetrics}
        leadTimeStats={leadTimeStats}
      />

      {/* 2. FULL-WIDTH INTERACTIVE BUTTON: LIHAT DETAIL ANALISIS KINERJA MUTU */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setShowQualityAnalytics((prev) => !prev)}
          className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 active:scale-[0.995] text-white p-4 sm:py-4.5 sm:px-6 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-between cursor-pointer border border-white/15"
        >
          {/* Subtle light sweep animation on hover */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-wide text-white drop-shadow-xs flex items-center gap-2">
                <span>Lihat Detail Analisis Kinerja Mutu</span>
                {!showQualityAnalytics && (
                  <span className="hidden sm:inline-flex text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
                    Buka Panel
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100/90 font-medium">
                {showQualityAnalytics
                  ? 'Klik untuk menyembunyikan grafik radar 6 siklus, tren resolusi, matriks temuan, dan funnel CAPA'
                  : 'Eksplorasi visualisasi radar 6 siklus, tren resolusi SLA, sebaran temuan, matriks scorecard, & funnel CAPA'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-2">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
              {showQualityAnalytics ? (
                <ChevronUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce" />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* 3. ADVANCED MODERN ANALYTICS SUITE (Dihadirkan saat tombol diklik) */}
      {showQualityAnalytics && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-8 transition-all duration-300 animate-in fade-in-50 slide-in-from-top-4">
          <DashboardAnalyticsHeader
            capaMetrics={capaMetrics}
            leadTimeStats={leadTimeStats}
            onNavigateToTab={onNavigateToTab}
          />

          {/* PRIMARY VISUAL ROW: HEXAGONAL RADAR CHART + SMOOTH LINE/AREA TREND CHART */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <DashboardRadarChart radarData={radarData} />
            <DashboardTrendLineChart
              trendLineData={trendLineData}
              leadTimeStats={leadTimeStats}
            />
          </div>

          {/* VISUAL ROW 2: CHART BAR DISTRIBUSI EVALUASI PER SIKLUS (FULL WIDTH - LONGGAR & LAPANG) */}
          <DashboardBarChart
            barChartData={barChartData}
            onNavigateToStage={onNavigateToStage}
          />

          {/* VISUAL ROW 3: CHART PIE PROPORSI SEBARAN (FULL WIDTH) */}
          <DashboardPieChart
            severityDataset={pieSeverityDataset}
            complianceDataset={pieComplianceDataset}
            statusDataset={pieStatusDataset}
          />

          {/* VISUAL ROW 4: TARGET SLA VS REALISASI (FULL WIDTH BELOW PROPORSI SEBARAN) */}
          <DashboardSlaBarChart leadTimeStats={leadTimeStats} />

          {/* VISUAL ROW 4: TABEL SCORECARD MATRIX (FULL WIDTH) */}
          <DashboardUnitScorecardTable
            unitScorecard={unitScorecard}
            overallScore={overallScore}
          />

          {/* VISUAL ROW 5: 4-STAGE RESOLUTION FUNNEL */}
          <DashboardResolutionFunnel capaMetrics={capaMetrics} />
        </div>
      )}

      {/* 3. AUDITOR'S METHODOLOGY & FORMULA SECTION (10 Tahapan • 2 Baris) */}
      <DashboardMethodologySection onNavigateToTab={onNavigateToTab} />

      {/* 4. 3 OPERATIONAL FACILITIES OVERVIEW */}
      <DashboardUnitsOverview />

      {/* 5. 6 STAGE EVALUATION CARDS (Kertas Kerja Work Paper Rekap) */}
      <DashboardStageWorkpaperCards
        items={items}
        stageScores={stageScores}
        onNavigateToStage={onNavigateToStage}
        onNavigateToTab={onNavigateToTab}
      />

      {/* 6. EXPERT SYSTEM ANALYSIS SECTION */}
      <DashboardExpertAnalysis
        aiAnalysis={aiAnalysis}
        onRunAiAnalysis={onRunAiAnalysis}
        isAiLoading={isAiLoading}
        onNavigateToTab={onNavigateToTab}
      />
    </div>
  );
};
