import React from 'react';
import { AuditSession, LifecycleStage } from '../../types/audit';

export interface DashboardContainerProps {
  auditSession: AuditSession;
  onNavigateToStage: (stage: LifecycleStage) => void;
  onNavigateToTab: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
  onRunAiAnalysis: () => void;
  isAiLoading: boolean;
}

export type DashboardOverviewProps = DashboardContainerProps;

export interface ComplianceMetrics {
  compliantCount: number;
  minorNcCount: number;
  majorNcCount: number;
  criticalHazardCount: number;
  totalItems: number;
  compliantRate: number;
}

export interface CapaMetrics {
  totalCapa: number;
  openCapaCount: number;
  inProgressCapaCount: number;
  resolvedCapaCount: number;
  verifiedCapaCount: number;
  closedCapaCount: number;
  closureRate: number;
  verificationRate: number;
}

export interface SeverityLeadTime {
  count: number;
  resolvedCount: number;
  avgDays: number;
  targetDays: number;
  isOnTrack: boolean;
}

export interface LeadTimeStats {
  avgResponseText: string;
  avgResolutionDays: string;
  avgResolutionHours: number;
  avgVerificationDays: string;
  critical: SeverityLeadTime;
  major: SeverityLeadTime;
  minor: SeverityLeadTime;
}

export interface RadarStagePoint {
  id: LifecycleStage;
  shortLabel: string;
  complianceScore: number;
  resRate: number;
  compX: number;
  compY: number;
  resX: number;
  resY: number;
  axisX: number;
  axisY: number;
  labelX: number;
  labelY: number;
  angleDeg: number;
}

export interface RadarRing {
  level: number;
  points: string;
}

export interface RadarChartData {
  cx: number;
  cy: number;
  maxR: number;
  stages: RadarStagePoint[];
  compPolygonPoints: string;
  resPolygonPoints: string;
  rings: RadarRing[];
}

export interface TrendPoint {
  label: string;
  dateRange: string;
  leadTime: number;
  rate: number;
  resolvedCount: number;
  newCount: number;
  x: number;
  y: number;
}

export interface TrendLineData {
  width: number;
  height: number;
  points: TrendPoint[];
  linePath: string;
  areaPath: string;
}

export interface UnitScorecardItem {
  id: string;
  name: string;
  scope: string;
  icon: React.ElementType;
  color: string;
  benchmarkTarget: string;
  totalFindings: number;
  verified: number;
  resolved: number;
  active: number;
  rate: number;
  crit: number;
  maj: number;
  min: number;
  avgDays: string;
}

export interface AuditMethodologyStep {
  num: string;
  name: string;
  desc: string;
}

export interface BarStageItem {
  id: LifecycleStage;
  label: string;
  shortLabel: string;
  compliant: number;
  minorNc: number;
  majorNc: number;
  criticalHazard: number;
  totalItems: number;
  totalFindings: number;
  capaOpen: number;
  capaInProgress: number;
  capaResolved: number;
  capaVerified: number;
  capaTotal: number;
}

export interface BarChartData {
  stages: BarStageItem[];
  maxItemsPerStage: number;
  maxCapaPerStage: number;
}

export interface PieSliceData {
  id: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
  hoverColor: string;
  badgeBg: string;
  subText?: string;
  pathData: string;
  textAngle?: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
}

export interface PieChartDataset {
  id: string;
  title: string;
  subtitle: string;
  total: number;
  unit: string;
  slices: PieSliceData[];
}
