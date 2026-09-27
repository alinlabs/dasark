import { ChecklistItem, LifecycleStage, StageScore, ComplianceStatus } from '../types/audit';

export function calculateStageScores(items: ChecklistItem[]): {
  stageScores: Record<LifecycleStage, StageScore>;
  overallScore: number;
  totalFindings: {
    compliant: number;
    minorNc: number;
    majorNc: number;
    criticalHazard: number;
    unchecked: number;
    notApplicable: number;
  };
} {
  const stages: LifecycleStage[] = [
    'RECRUITMENT',
    'ONBOARDING_TRAINING',
    'OPERATIONAL_K3',
    'COMPENSATION_WELFARE',
    'RELATIONS_DISCIPLINE',
    'TERMINATION_EXIT',
  ];

  const stageScores: Record<LifecycleStage, StageScore> = {} as any;
  let totalWeightedScore = 0;
  let totalActiveStages = 0;

  const totalFindings = {
    compliant: 0,
    minorNc: 0,
    majorNc: 0,
    criticalHazard: 0,
    unchecked: 0,
    notApplicable: 0,
  };

  for (const stage of stages) {
    const stageItems = items.filter(it => it.stage === stage);
    let compliant = 0;
    let minorNc = 0;
    let majorNc = 0;
    let criticalHazard = 0;
    let unchecked = 0;
    let notApplicable = 0;

    for (const it of stageItems) {
      if (it.status === 'COMPLIANT') {
        compliant++;
        totalFindings.compliant++;
      } else if (it.status === 'MINOR_NC') {
        minorNc++;
        totalFindings.minorNc++;
      } else if (it.status === 'MAJOR_NC') {
        majorNc++;
        totalFindings.majorNc++;
      } else if (it.status === 'CRITICAL_HAZARD') {
        criticalHazard++;
        totalFindings.criticalHazard++;
      } else if (it.status === 'NOT_APPLICABLE') {
        notApplicable++;
        totalFindings.notApplicable++;
      } else {
        unchecked++;
        totalFindings.unchecked++;
      }
    }

    const scoredItems = stageItems.length - notApplicable;
    let stagePercentage = 0;

    if (scoredItems > 0) {
      // Points formula:
      // COMPLIANT = 1.0
      // MINOR_NC = 0.5
      // MAJOR_NC = 0.0
      // CRITICAL_HAZARD = -0.5 penalty
      // UNCHECKED = 0.0
      const rawPoints = (compliant * 1.0) + (minorNc * 0.5) + (criticalHazard * -0.5);
      stagePercentage = Math.max(0, Math.min(100, Math.round((rawPoints / scoredItems) * 100 * 10) / 10));
      totalWeightedScore += stagePercentage;
      totalActiveStages++;
    }

    stageScores[stage] = {
      total: stageItems.length,
      scoredItems,
      compliant,
      minorNc,
      majorNc,
      criticalHazard,
      score: stagePercentage,
    };
  }

  const overallScore = totalActiveStages > 0 
    ? Math.round((totalWeightedScore / totalActiveStages) * 10) / 10 
    : 0;

  return {
    stageScores,
    overallScore,
    totalFindings,
  };
}

export function getStatusBadge(status: ComplianceStatus): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'COMPLIANT':
      return {
        label: 'Sesuai (Compliant)',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        dotClass: 'bg-emerald-500',
      };
    case 'MINOR_NC':
      return {
        label: 'Minor NC',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
        dotClass: 'bg-amber-500',
      };
    case 'MAJOR_NC':
      return {
        label: 'Major NC',
        badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
        dotClass: 'bg-orange-500',
      };
    case 'CRITICAL_HAZARD':
      return {
        label: 'Bahaya Kritis (Stop Work)',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
        dotClass: 'bg-rose-600',
      };
    case 'NOT_APPLICABLE':
      return {
        label: 'Tidak Berlaku (N/A)',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        dotClass: 'bg-slate-400',
      };
    case 'UNCHECKED':
    default:
      return {
        label: 'Belum Diperiksa',
        badgeClass: 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
        dotClass: 'bg-zinc-300',
      };
  }
}

export function getRiskBadge(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): {
  label: string;
  badgeClass: string;
} {
  switch (level) {
    case 'CRITICAL':
      return { label: 'Risiko Kritis', badgeClass: 'bg-red-100 text-red-800 border-red-200 font-semibold' };
    case 'HIGH':
      return { label: 'Risiko Tinggi', badgeClass: 'bg-orange-100 text-orange-800 border-orange-200' };
    case 'MEDIUM':
      return { label: 'Risiko Sedang', badgeClass: 'bg-amber-100 text-amber-800 border-amber-200' };
    case 'LOW':
    default:
      return { label: 'Risiko Rendah', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
}
