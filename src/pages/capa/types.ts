import { AuditSession, ChecklistItem, CAPAItem, AuditEvidenceAttachment } from '../../types/audit';

export interface CapaTrackerProps {
  auditSession: AuditSession;
  onUpdateCapaStatus: (capaId: string, status: CAPAItem['status'], resolutionNotes?: string) => void;
  onUpdateCapaAttachments?: (capaId: string, attachments: AuditEvidenceAttachment[]) => void;
  onSaveCapa?: (capa: CAPAItem) => void;
  onDeleteCapa?: (capaId: string) => void;
  onVerifyAsAuditor?: (capaId: string) => void;
  onAutoGenerateAllMissingCapa: () => void;
  isGeneratingAi: boolean;
  editingItem?: CAPAItem | null;
  isCreatingNew?: boolean;
  initialChecklistItem?: ChecklistItem | null;
  onStartEditItem?: (item: CAPAItem) => void;
  onStartCreateItem?: (initialItem?: ChecklistItem | null) => void;
  onCloseEdit?: () => void;
  onRequestAiDraft?: (item: ChecklistItem) => Promise<any>;
  statusFilter?: CapaStatusFilter;
  onSelectStatusFilter?: (filter: CapaStatusFilter) => void;
}

export type CapaStatusFilter = 'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED';
export type CapaSeverityFilter = 'ALL' | 'CRITICAL' | 'MAJOR' | 'MINOR';
