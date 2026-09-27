import React from 'react';
import { AuditSession, ChecklistItem, LifecycleStage, CAPAItem } from '../../types/audit';
import { CapaStatusFilter } from '../../pages/capa/types';
import { RegulationSubTab } from '../../pages/regulations/types';

export type TabType = 
  | 'DASHBOARD' 
  | 'CHECKLIST' 
  | 'CAPA' 
  | 'REGULATIONS' 
  | 'REPORT' 
  | 'GLOSSARY';

export interface TabItemConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface AppSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse?: () => void;
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  activeStage: LifecycleStage;
  setActiveStage: (stage: LifecycleStage) => void;
  isWorkPaperExpanded: boolean;
  setIsWorkPaperExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  capaStatusFilter?: CapaStatusFilter;
  setCapaStatusFilter?: (filter: CapaStatusFilter) => void;
  isCapaExpanded?: boolean;
  setIsCapaExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  isRegulationsExpanded?: boolean;
  setIsRegulationsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  regulationSubTab?: RegulationSubTab;
  setRegulationSubTab?: (subTab: RegulationSubTab) => void;
  auditSession: AuditSession;
  auditorName?: string;
  auditorRole?: string;
}

export interface AppHeaderProps {
  currentTab: TabType;
  activeStage: LifecycleStage;
  regulationSubTab?: RegulationSubTab;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  onOpenMobileSidebar: () => void;
  isWorkPaperEditMode?: boolean;
  editingWorkPaperItem?: ChecklistItem | null;
  isCapaEditMode?: boolean;
  editingCapaItem?: CAPAItem | null;
  onCancelEdit?: () => void;
  companyName?: string;
  onAutoGenerateAllMissingCapa?: () => void;
  isGeneratingAi?: boolean;
  ncItemsWithoutCapaCount?: number;
}

export interface AppLayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  activeStage: LifecycleStage;
  setActiveStage: (stage: LifecycleStage) => void;
  isWorkPaperExpanded: boolean;
  setIsWorkPaperExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  capaStatusFilter?: CapaStatusFilter;
  setCapaStatusFilter?: (filter: CapaStatusFilter) => void;
  isCapaExpanded?: boolean;
  setIsCapaExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  isRegulationsExpanded?: boolean;
  setIsRegulationsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  regulationSubTab?: RegulationSubTab;
  setRegulationSubTab?: (subTab: RegulationSubTab) => void;
  auditSession: AuditSession;
  isWorkPaperEditMode?: boolean;
  editingWorkPaperItem?: ChecklistItem | null;
  isCapaEditMode?: boolean;
  editingCapaItem?: CAPAItem | null;
  onCancelEdit?: () => void;
  onAutoGenerateAllMissingCapa?: () => void;
  isGeneratingAi?: boolean;
  ncItemsWithoutCapaCount?: number;
  children: React.ReactNode;
}

