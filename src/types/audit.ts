export type LifecycleStage = 
  | 'RECRUITMENT'
  | 'ONBOARDING_TRAINING'
  | 'OPERATIONAL_K3'
  | 'COMPENSATION_WELFARE'
  | 'RELATIONS_DISCIPLINE'
  | 'TERMINATION_EXIT';

export type ComplianceStatus = 
  | 'UNCHECKED'
  | 'COMPLIANT'
  | 'MINOR_NC'
  | 'MAJOR_NC'
  | 'CRITICAL_HAZARD'
  | 'NOT_APPLICABLE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LegalHierarchy {
  primaryLaw: string;
  governmentReg: string;
  ministerialReg: string;
}

export interface AuditEvidenceAttachment {
  id: string;
  name: string;
  dataUrl: string; // Base64 data URL or preset image URL
  type: 'IMAGE' | 'DOCUMENT' | 'PHOTO_INSPECTION' | 'LAB_RESULT';
  uploadedAt: string;
  uploadedBy?: string;
  caption?: string;
  fileSize?: string;
  locationTag?: string; // e.g. "Gudang Karawang Barat"
}

export interface CriterionEvaluation {
  criterionIndex: number;
  criterionText: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'UNCHECKED';
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  stage: LifecycleStage;
  sessionNumber?: number;
  sessionTitle?: string;
  code: string;
  category: string;
  title: string;
  description: string;
  legalBasis: string;
  legalHierarchy?: LegalHierarchy;
  legalSanction?: string;
  guidelines: string;
  auditSteps?: string[];
  verificationCriteria?: string[];
  criterionEvaluations?: CriterionEvaluation[];
  riskLevel: RiskLevel;
  status: ComplianceStatus;
  notes: string;
  evidenceText: string;
  attachments?: AuditEvidenceAttachment[];
  assignedPic?: string;
  targetResolutionDays?: number;
  lastUpdated?: string;
  operationalScope?: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT';
  auditPeriod?: 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE';
}

export type EvidenceFormat = 'Gambar' | 'Video' | 'PDF' | 'Word' | 'PPT';

export interface RequiredEvidenceCriterion {
  id: string;
  name: string;
  format: EvidenceFormat;
}

export interface CAPAInvestigationDetail {
  basedOn?: string;
  answer?: string;
  by?: string;
}

export interface CAPAItem {
  id: string;
  checklistItemId: string;
  findingCode: string;
  findingTitle: string;
  category: string;
  severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
  rootCause: string;
  rootCause5Why?: string[];
  rootCause5WhyDetails?: Record<number, CAPAInvestigationDetail>;
  correctiveAction: string;
  preventiveAction: string;
  requiredEvidence?: string;
  requiredEvidenceList?: RequiredEvidenceCriterion[];
  attachments?: AuditEvidenceAttachment[];
  pic: string;
  dueDate: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED';
  resolutionNotes?: string;
  verifiedBy?: string;
  createdAt: string;
  inProgressAt?: string; // Waktu pertama kali mulai dikerjakan
  resolvedAt?: string;   // Waktu selesai seluruh investigasi & bukti
  verifiedAt?: string;   // Waktu verifikasi oleh auditor
}

export interface AuditEvaluationResult {
  summary: string;
  legalRisks: string[];
  actionPriorities: string[];
  auditVerdict: string;
}

// Backward compatibility alias
export type AIAnalysisResult = AuditEvaluationResult;

export interface StageScore {
  total: number;
  scoredItems: number;
  compliant: number;
  minorNc: number;
  majorNc: number;
  criticalHazard: number;
  score: number; // percentage 0 - 100
}

export interface AuditSession {
  id: string;
  auditCode: string;
  title: string;
  facilityName: string;
  facilityLocation: string;
  wasteType: 'B3_MEDIS' | 'B3_INDUSTRI' | 'E_WASTE' | 'NON_B3_RECYCLE' | 'INTEGRATED_PLANT';
  auditorName: string;
  auditorRole: string;
  leadAuditorLicense?: string;
  auditDate: string;
  operationalUnit?: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT';
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'SIGNED_OFF';
  items: ChecklistItem[];
  capaList: CAPAItem[];
  overallScore: number;
  stageScores: Record<LifecycleStage, StageScore>;
  aiAnalysis?: AuditEvaluationResult;
  completedAt?: string;
  auditorSignature?: string;
  facilityLeadSignature?: string;
}

export interface StageMetadata {
  id: LifecycleStage;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
  color: string;
  badgeBg: string;
  regulations: string[];
}

// DAILY WORK PROGRESS & INSPECTION TRACKING
export interface DailyAuditTask {
  id: string;
  timeSlot: string; // e.g. "07:00 - 08:30"
  taskTitle: string;
  category: 'FIT_TO_WORK' | 'INSPECTION' | 'WALKTHROUGH' | 'TESTING' | 'INTERVIEW' | 'DOCUMENT_REVIEW' | 'CLOSURE_VERIFICATION';
  targetUnit: 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT' | 'HEAD_OFFICE';
  pic: string;
  isCompleted: boolean;
  findingIdentified?: string;
  notes?: string;
}

export interface DailyAuditLog {
  id: string;
  date: string; // YYYY-MM-DD
  dayName: string; // Senin, Selasa, dst.
  weekNumber: number; // Minggu ke-1 s/d ke-4
  shift: 'PAGI_OPERASIONAL' | 'SIANG_INSPEKSI' | 'MALAM_LOGISTIK' | 'FULL_DAY';
  operationalUnit: 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT' | 'INTEGRATED';
  leadAuditorPic: string;
  hseInspector: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';
  tasks: DailyAuditTask[];
  dailyVerifiedItemsCount: number;
  dailyNcIdentifiedCount: number;
  dailySummary: string;
  keyEvidenceSummary: string;
  weatherCondition?: string;
  emergencyStatus?: 'NORMAL' | 'DRILL_ACTIVE' | 'ALERT';
}


