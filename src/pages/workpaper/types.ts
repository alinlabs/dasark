import { 
  ChecklistItem, 
  ComplianceStatus, 
  LifecycleStage, 
  AuditSession, 
  AuditEvidenceAttachment, 
  RiskLevel, 
  CriterionEvaluation, 
  LegalHierarchy 
} from '../../types/audit';

export interface WorkPaperProps {
  auditSession: AuditSession;
  activeStage: LifecycleStage;
  onSelectStage: (stage: LifecycleStage) => void;
  onUpdateItemStatus: (itemId: string, status: ComplianceStatus) => void;
  onUpdateItemDetails: (
    itemId: string, 
    notes: string, 
    evidenceText: string, 
    attachments?: AuditEvidenceAttachment[],
    riskLevel?: RiskLevel,
    auditSteps?: string[],
    verificationCriteria?: string[],
    criterionEvaluations?: CriterionEvaluation[],
    newStatus?: ComplianceStatus,
    operationalScope?: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT',
    auditPeriod?: 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE',
    legalHierarchy?: LegalHierarchy,
    legalSanction?: string
  ) => void;
  onUpdateItemAttachments?: (itemId: string, attachments: AuditEvidenceAttachment[]) => void;
  onGenerateCapaForItem: (item: ChecklistItem) => void;
  onMarkAllStageCompliant?: (stage: LifecycleStage) => void;
  onNavigateToTab?: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
  onSaveItem?: (item: ChecklistItem) => void;
  onDeleteItem?: (itemId: string) => void;
  editingItem?: ChecklistItem | null;
  isCreatingNew?: boolean;
  onStartEditItem?: (item: ChecklistItem) => void;
  onStartCreateItem?: () => void;
  onCloseEdit?: () => void;
}

export type ChecklistStageViewProps = WorkPaperProps;
