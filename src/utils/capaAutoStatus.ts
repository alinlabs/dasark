import { CAPAItem, RequiredEvidenceCriterion } from '../types/audit';

export interface CapaAutoEvaluation {
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED';
  isFullyFilled: boolean;
  hasAnyInput: boolean;
  totalQuestions: number;
  completedQuestions: number;
  totalColumns: number; // questions * 3
  filledColumns: number; // basedOn + answer + by
  isConclusionFilled: boolean;
  requiredEvidenceCount: number;
  uploadedEvidenceCount: number;
  isEvidenceComplete: boolean;
  progressPercentage: number;
  missingItems: string[];
}

/**
 * Checks if a string has non-empty trimmed content
 */
export const isNonEmpty = (val?: string | null): boolean => {
  return Boolean(val && val.trim().length > 0);
};

/**
 * Format ISO string into Indonesian standard Date & Time string:
 * e.g. "24 Sep 2026, 08:30 WIB"
 */
export function formatCapaDateTime(isoStr?: string): string {
  if (!isoStr) return '-';
  const rawDate = new Date(isoStr);
  const date = isNaN(rawDate.getTime()) ? new Date() : rawDate;

  try {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(date);
    const partMap: Record<string, string> = {};
    parts.forEach(p => { partMap[p.type] = p.value; });

    const day = partMap.day || String(date.getDate()).padStart(2, '0');
    let month = partMap.month ? partMap.month.replace(/\./g, '') : 'Sep';
    if (month.length > 3) month = month.substring(0, 3);
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    const year = partMap.year || String(date.getFullYear());
    const hour = partMap.hour || String(date.getHours()).padStart(2, '0');
    const minute = partMap.minute || String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year}, ${hour}:${minute} WIB`;
  } catch (e) {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  }
}

/**
 * Format Date Only: "24 Sep 2026"
 */
export function formatCapaDateOnly(isoStr?: string): string {
  if (!isoStr) return '-';
  const rawDate = new Date(isoStr);
  const date = isNaN(rawDate.getTime()) ? new Date() : rawDate;

  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Calculate Humanized Duration Lead Time between two timestamps
 */
export function calculateDurationLeadTime(startIso?: string, endIso?: string): string {
  if (!startIso) return '-';
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();

  if (isNaN(start) || isNaN(end)) return '-';
  const diffMs = Math.max(0, end - start);

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    const remainingHours = diffHours % 24;
    return remainingHours > 0 ? `${diffDays} hari ${remainingHours} jam` : `${diffDays} hari`;
  }
  if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return remainingMinutes > 0 ? `${diffHours} jam ${remainingMinutes} mnt` : `${diffHours} jam`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit`;
  }
  return 'Kurang dari 1 menit';
}

export interface CapaLeadTimeAnalysis {
  responseStatusText: string;
  responseDurationText: string;
  executionDurationText: string;
  verificationDurationText: string;
  totalCycleTimeText: string;
  isOverdue: boolean;
  isFastResponse: boolean;
}

/**
 * Provides comprehensive SLA / Lead Time Analysis for CAPA Audit Review
 */
export function getCapaLeadTimeAnalysis(capa: CAPAItem): CapaLeadTimeAnalysis {
  const isStarted = Boolean(capa.inProgressAt);
  const isResolved = Boolean(capa.resolvedAt);
  const isVerified = Boolean(capa.verifiedAt || (capa.status === 'VERIFIED' && capa.resolvedAt));

  // 1. Initial Response Time (Dibuat -> Mulai Dikerjakan)
  let responseStatusText = 'Belum Direspon PIC';
  let responseDurationText = '-';
  let isFastResponse = false;

  if (isStarted && capa.inProgressAt) {
    responseDurationText = calculateDurationLeadTime(capa.createdAt, capa.inProgressAt);
    const startMs = new Date(capa.createdAt).getTime();
    const progMs = new Date(capa.inProgressAt).getTime();
    const diffHours = (progMs - startMs) / (1000 * 3600);
    
    if (diffHours <= 2) {
      responseStatusText = 'Respon Sangat Cepat (< 2 Jam)';
      isFastResponse = true;
    } else if (diffHours <= 24) {
      responseStatusText = 'Respon Cepat (< 24 Jam)';
      isFastResponse = true;
    } else {
      responseStatusText = `Respon Tertunda (${Math.round(diffHours / 24)} hari setelah temuan)`;
    }
  } else {
    const waitTime = calculateDurationLeadTime(capa.createdAt);
    responseDurationText = `${waitTime} menunggu respon`;
  }

  // 2. Execution Duration (Mulai Dikerjakan -> Selesai Pada)
  let executionDurationText = '-';
  if (capa.inProgressAt && capa.resolvedAt) {
    executionDurationText = calculateDurationLeadTime(capa.inProgressAt, capa.resolvedAt);
  } else if (capa.inProgressAt) {
    executionDurationText = `${calculateDurationLeadTime(capa.inProgressAt)} berjalan`;
  }

  // 3. Verification Duration (Selesai -> Diverifikasi)
  let verificationDurationText = '-';
  const effectiveVerifiedAt = capa.verifiedAt || (capa.status === 'VERIFIED' ? capa.resolvedAt : undefined);
  if (capa.resolvedAt && effectiveVerifiedAt) {
    verificationDurationText = calculateDurationLeadTime(capa.resolvedAt, effectiveVerifiedAt);
  } else if (capa.resolvedAt) {
    verificationDurationText = `${calculateDurationLeadTime(capa.resolvedAt)} menunggu auditor`;
  }

  // 4. Total Cycle Time
  let totalCycleTimeText = '-';
  const endLifecycle = effectiveVerifiedAt || capa.resolvedAt;
  if (endLifecycle) {
    totalCycleTimeText = calculateDurationLeadTime(capa.createdAt, endLifecycle);
  } else {
    totalCycleTimeText = `${calculateDurationLeadTime(capa.createdAt)} berjalan`;
  }

  // Check Due Date Overdue
  const dueDateMs = new Date(`${capa.dueDate}T23:59:59+07:00`).getTime();
  const finishMs = endLifecycle ? new Date(endLifecycle).getTime() : Date.now();
  const isOverdue = !isNaN(dueDateMs) && finishMs > dueDateMs;

  return {
    responseStatusText,
    responseDurationText,
    executionDurationText,
    verificationDurationText,
    totalCycleTimeText,
    isOverdue,
    isFastResponse
  };
}

/**
 * Synchronize status transition timestamps cleanly
 */
export function syncCapaTimestamps(
  existingCapa: CAPAItem, 
  nextStatus: CAPAItem['status'],
  nowIso: string = new Date().toISOString()
): Partial<CAPAItem> {
  const updates: Partial<CAPAItem> = {
    status: nextStatus
  };

  if (nextStatus === 'IN_PROGRESS' || nextStatus === 'RESOLVED' || nextStatus === 'VERIFIED') {
    if (!existingCapa.inProgressAt) {
      updates.inProgressAt = nowIso;
    }
  }

  if (nextStatus === 'RESOLVED' || nextStatus === 'VERIFIED') {
    if (!existingCapa.resolvedAt) {
      updates.resolvedAt = nowIso;
    }
  }

  if (nextStatus === 'VERIFIED') {
    if (!existingCapa.verifiedAt) {
      updates.verifiedAt = nowIso;
    }
  }

  return updates;
}

/**
 * Evaluates the automatic progress status of a CAPA item:
 * 1. If questions (3 columns), conclusion, and evidence are NOT filled/uploaded: status is "OPEN" (Buka).
 * 2. If ANY one of them has been filled: status is "IN_PROGRESS" (Sedang Dikerjakan).
 * 3. If ALL of them are completely filled: status is "RESOLVED" (Selesai).
 * 4. From "RESOLVED", the auditor can click "Verifikasi sebagai auditor" which sets status to "VERIFIED"
 *    and automatically updates the date of the corresponding Work Paper item.
 */
export function evaluateCapaAutoStatus(capa: CAPAItem): CapaAutoEvaluation {
  const questions = capa.rootCause5Why || [];
  const details = capa.rootCause5WhyDetails || {};
  const missingItems: string[] = [];

  let filledColumns = 0;
  let completedQuestions = 0;
  const totalColumns = questions.length * 3;

  questions.forEach((_, idx) => {
    const d = details[idx];
    const hasBasedOn = isNonEmpty(d?.basedOn);
    const hasAnswer = isNonEmpty(d?.answer);
    const hasBy = isNonEmpty(d?.by);

    if (hasBasedOn) filledColumns++;
    if (hasAnswer) filledColumns++;
    if (hasBy) filledColumns++;

    if (hasBasedOn && hasAnswer && hasBy) {
      completedQuestions++;
    } else {
      const stepNum = idx + 1;
      const missingFields: string[] = [];
      if (!hasBasedOn) missingFields.push('Berdasarkan apa');
      if (!hasAnswer) missingFields.push('Hasil temuan');
      if (!hasBy) missingFields.push('Oleh siapa');
      missingItems.push(`Pertanyaan #${stepNum}: ${missingFields.join(', ')}`);
    }
  });

  const isConclusionFilled = isNonEmpty(capa.rootCause);
  if (!isConclusionFilled) {
    missingItems.push('Kesimpulan akar masalah');
  }

  // Evidence attachments check
  const attachments = capa.attachments || [];
  const evidenceList: RequiredEvidenceCriterion[] = (capa.requiredEvidenceList && capa.requiredEvidenceList.length > 0)
    ? capa.requiredEvidenceList
    : [{ id: 'ev-default', name: 'Bukti Verifikasi Lapangan', format: 'Gambar' }];

  const requiredEvidenceCount = evidenceList.length;
  const uploadedEvidenceCount = attachments.length;
  const isEvidenceComplete = uploadedEvidenceCount > 0 && uploadedEvidenceCount >= requiredEvidenceCount;

  if (!isEvidenceComplete) {
    if (uploadedEvidenceCount === 0) {
      missingItems.push('Upload bukti verifikasi');
    } else {
      missingItems.push(`Upload sisa bukti verifikasi (${uploadedEvidenceCount}/${requiredEvidenceCount})`);
    }
  }

  const hasAnyQuestionInput = filledColumns > 0;
  const hasAnyInput = hasAnyQuestionInput || isConclusionFilled || uploadedEvidenceCount > 0;

  const areAllQuestionsFilled = questions.length === 0 || completedQuestions === questions.length;
  const isFullyFilled = areAllQuestionsFilled && isConclusionFilled && isEvidenceComplete;

  // Calculate progress percentage
  const totalWeight = Math.max(1, totalColumns + 1 + requiredEvidenceCount);
  const achievedWeight = filledColumns + (isConclusionFilled ? 1 : 0) + Math.min(uploadedEvidenceCount, requiredEvidenceCount);
  const progressPercentage = Math.min(100, Math.round((achievedWeight / totalWeight) * 100));

  let computedStatus: CAPAItem['status'];

  if (capa.status === 'VERIFIED') {
    computedStatus = 'VERIFIED';
  } else if (capa.status === 'OPEN' && (!capa.inProgressAt || capa.inProgressAt === '')) {
    computedStatus = 'OPEN';
  } else if (capa.status === 'RESOLVED' && isFullyFilled) {
    computedStatus = 'RESOLVED';
  } else {
    if (!hasAnyInput) {
      computedStatus = 'OPEN';
    } else if (isFullyFilled) {
      computedStatus = 'RESOLVED';
    } else {
      computedStatus = 'IN_PROGRESS';
    }
  }

  return {
    status: computedStatus,
    isFullyFilled,
    hasAnyInput,
    totalQuestions: questions.length,
    completedQuestions,
    totalColumns,
    filledColumns,
    isConclusionFilled,
    requiredEvidenceCount,
    uploadedEvidenceCount,
    isEvidenceComplete,
    progressPercentage,
    missingItems
  };
}
