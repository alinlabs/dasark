import { AuditSession } from '../../types/audit';
import { RegulationClause } from '../../data/regulationsDatabase';

export type RegulationSubTab = 'LAW_ISO' | 'COMPARISON' | 'LEGAL_QA';

export interface RegulatoryQA {
  id: string;
  category: 'K3_KEBAKARAN' | 'TRANSPORTER' | 'PLANT_SUKABUMI' | 'EXIT_MCU' | 'DISIPLIN_PHK' | 'KOMPENSASI' | 'PKWT_PKWTT' | 'OUTSOURCING_TUPE';
  title: string;
  tags: string[];
  question: string;
  legalBasis: string;
  expertAnswer: string;
  operationalProcedure: string;
  sanctionRisk: string;
}

export interface RegulatoryContainerProps {
  auditSession?: AuditSession;
  activeSubTab?: RegulationSubTab;
  onSelectSubTab?: (subTab: RegulationSubTab) => void;
  onRunDeterministicEvaluation?: () => void;
  isEvaluating?: boolean;
  onSelectLawForChecklist?: (lawCode: string) => void;
}

export interface RegulationsLawIsoProps {
  onRunDeterministicEvaluation?: () => void;
  isEvaluating?: boolean;
  onSelectLawForChecklist?: (lawCode: string) => void;
}

export interface RegulationsComparisonProps {
  auditSession?: AuditSession;
}

export interface RegulationsLegalQaProps {
  auditSession?: AuditSession;
}
