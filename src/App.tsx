import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AppLayout, TabType } from './components/layout';
import { SplashScreen } from './components/common/SplashScreen';
import { DashboardOverview } from './pages/dashboard';
import { WorkPaper } from './pages/workpaper';
import { CapaTracker } from './pages/capa';
import { RegulatoryContainer as RegulatoryMatrixView, RegulationSubTab } from './pages/regulations';
import { GlossaryView } from './components/GlossaryView';
import { PrintableReport } from './components/PrintableReport';
import { NewAuditModal } from './components/NewAuditModal';
import { 
  AuditSession, 
  LifecycleStage, 
  ComplianceStatus, 
  ChecklistItem, 
  CAPAItem, 
  AuditEvidenceAttachment, 
  RiskLevel, 
  CriterionEvaluation, 
  LegalHierarchy 
} from './types/audit';
import { INITIAL_AUDIT_SESSION } from './data/defaultAuditChecklist';
import { calculateStageScores } from './utils/auditCalculator';
import { generateDeterministicAuditAnalysis, generateDeterministicCapaDraft } from './utils/deterministicAuditEngine';
import { saveSessionToIndexedDB, loadSessionFromIndexedDB } from './utils/indexedDBStorage';
import { CapaStatusFilter } from './pages/capa/types';
import { evaluateCapaAutoStatus, syncCapaTimestamps } from './utils/capaAutoStatus';
import { evaluateItemStatusFromCriteria, syncCriteriaToStatus } from './utils/criteriaEvaluationHelper';

const STORAGE_KEY = 'wasteguard_das_group_session_v15_criteria_evaluated_sync';

const syncVerifiedCapaToWorkPaperItem = (item: ChecklistItem, verifiedAtIso: string): ChecklistItem => {
  return {
    ...item,
    status: 'COMPLIANT',
    notes: 'Telah terverifikasi tuntas melalui tindakan perbaikan CAPA.',
    criterionEvaluations: (item.verificationCriteria || []).map((critText, idx) => ({
      criterionIndex: idx,
      criterionText: critText,
      status: 'COMPLIANT',
      notes: 'Sesuai setelah verifikasi tindakan perbaikan CAPA.'
    })),
    lastUpdated: verifiedAtIso
  };
};

export default function App() {
  const [auditSession, setAuditSession] = useState<AuditSession>(() => {
    try {
      // Clean up old storage keys to prevent stale session
      [
        'wasteguard_das_group_session_v13_realistic_stage_findings',
        'wasteguard_das_group_session_v12_enriched_criteria',
        'wasteguard_das_group_session_v11_historical_capa_records',
        'wasteguard_das_group_session_v10_capa_analytics_dashboard',
        'wasteguard_das_group_session_v9_capa_leadtime_tracker',
        'wasteguard_das_group_session_v8_auto_capa_status',
        'wasteguard_das_group_session_v7_alvareza_pratama',
        'wasteguard_das_group_session_v6_ams_18_stages',
        'wasteguard_das_group_session_v5'
      ].forEach(oldKey => {
        try { localStorage.removeItem(oldKey); } catch (e) { /* ignore */ }
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: AuditSession = JSON.parse(saved);
        if (parsed.items && parsed.items.length >= 40) {
          if (!parsed.auditorName || parsed.auditorName.includes('Hendra')) {
            parsed.auditorName = 'Alvareza H. Pratama, S.M';
          }
          if (parsed.capaList) {
            parsed.capaList = parsed.capaList.map(c => {
              const evalResult = evaluateCapaAutoStatus(c);
              const targetStatus = c.status === 'VERIFIED' ? (evalResult.hasAnyInput ? 'VERIFIED' : 'OPEN') : evalResult.status;
              const tsUpdates = syncCapaTimestamps(c, targetStatus);
              return {
                ...c,
                ...tsUpdates,
                status: targetStatus
              };
            });

            // Synchronize verified CAPAs to workpaper items (green, clear notes, evidence text, attachments, and unselect criteria)
            const verifiedCapas = parsed.capaList.filter(c => c.status === 'VERIFIED');
            if (verifiedCapas.length > 0 && parsed.items) {
              parsed.items = parsed.items.map(item => {
                const verifiedCapa = verifiedCapas.find(
                  c => c.checklistItemId === item.id || c.checklistItemId === item.code || c.findingCode === item.code
                );
                if (verifiedCapa) {
                  return syncVerifiedCapaToWorkPaperItem(item, verifiedCapa.verifiedAt || item.lastUpdated || new Date().toISOString());
                }
                return item;
              });
            }
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved audit session', e);
    }
    return INITIAL_AUDIT_SESSION;
  });

  const [currentTab, setCurrentTab] = useState<TabType>('DASHBOARD');
  const [activeStage, setActiveStage] = useState<LifecycleStage>('RECRUITMENT');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  
  // Navigation & Modals state
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // WorkPaper full-page edit & creation state
  const [isWorkPaperExpanded, setIsWorkPaperExpanded] = useState(true);
  const [editingWorkPaperItem, setEditingWorkPaperItem] = useState<ChecklistItem | null>(null);
  const [isCreatingWorkPaper, setIsCreatingWorkPaper] = useState<boolean>(false);
  const isWorkPaperEditMode = currentTab === 'CHECKLIST' && (Boolean(editingWorkPaperItem) || isCreatingWorkPaper);

  // CAPA full-page edit & creation state (mirroring WorkPaper full-page architecture)
  const [editingCapaItem, setEditingCapaItem] = useState<CAPAItem | null>(null);
  const [isCreatingCapa, setIsCreatingCapa] = useState<boolean>(false);
  const [initialCapaChecklistItem, setInitialCapaChecklistItem] = useState<ChecklistItem | null>(null);
  const isCapaEditMode = currentTab === 'CAPA' && (Boolean(editingCapaItem) || isCreatingCapa);

  // CAPA Tracker sidebar expansion & status filter state
  const [isCapaExpanded, setIsCapaExpanded] = useState<boolean>(true);
  const [capaStatusFilter, setCapaStatusFilter] = useState<CapaStatusFilter>('ALL');

  // Matriks Regulasi sidebar expansion & sub-tab state
  const [isRegulationsExpanded, setIsRegulationsExpanded] = useState<boolean>(true);
  const [regulationSubTab, setRegulationSubTab] = useState<RegulationSubTab>('LAW_ISO');

  // Load from IndexedDB on initial launch
  useEffect(() => {
    loadSessionFromIndexedDB().then(savedIDBSession => {
      if (savedIDBSession && savedIDBSession.items && savedIDBSession.items.length > 0) {
        if (savedIDBSession.capaList) {
          savedIDBSession.capaList = savedIDBSession.capaList.map(c => {
            const evalResult = evaluateCapaAutoStatus(c);
            return {
              ...c,
              status: c.status === 'VERIFIED' ? (evalResult.hasAnyInput ? 'VERIFIED' : 'OPEN') : evalResult.status
            };
          });

          // Synchronize verified CAPAs to workpaper items (green, clear notes, evidence text, attachments, and unselect criteria)
          const verifiedCapas = savedIDBSession.capaList.filter(c => c.status === 'VERIFIED');
          if (verifiedCapas.length > 0 && savedIDBSession.items) {
            savedIDBSession.items = savedIDBSession.items.map(item => {
              const verifiedCapa = verifiedCapas.find(
                c => c.checklistItemId === item.id || c.checklistItemId === item.code || c.findingCode === item.code
              );
              if (verifiedCapa) {
                return syncVerifiedCapaToWorkPaperItem(item, verifiedCapa.verifiedAt || item.lastUpdated || new Date().toISOString());
              }
              return item;
            });
          }
        }
        setAuditSession(savedIDBSession);
      }
    }).catch(err => {
      console.warn('Gagal membaca sesi awal dari IndexedDB:', err);
    });
  }, []);

  // Sync to local storage & IndexedDB
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auditSession));
    } catch (e) {
      console.error('Error saving audit session to localStorage', e);
    }

    saveSessionToIndexedDB(auditSession).catch(err => {
      console.warn('Error saving audit session to IndexedDB:', err);
    });
  }, [auditSession]);

  // Update item status and recalculate (with automatic criteria synchronization)
  const handleUpdateItemStatus = (itemId: string, status: ComplianceStatus) => {
    setAuditSession(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          // Synchronize criteria evaluations when status is changed directly
          const syncedCriterionEvals = syncCriteriaToStatus(
            status, 
            item.verificationCriteria || [], 
            item.criterionEvaluations,
            item.notes
          );

          return {
            ...item,
            status,
            criterionEvaluations: syncedCriterionEvals,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      });

      const { stageScores, overallScore } = calculateStageScores(updatedItems);

      // Trigger confetti celebration if score improves to >= 90
      if (overallScore >= 90 && prev.overallScore < 90) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Automatically refresh the deterministic evaluation in real time
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
  };

  // Update item notes, text evidence & physical image attachments, risk level, audit steps, criteria & criterion evaluations
  const handleUpdateItemDetails = (
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
  ) => {
    setAuditSession(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          const updatedCriterionEvals = criterionEvaluations !== undefined ? criterionEvaluations : item.criterionEvaluations;
          const currentRiskLevel = riskLevel !== undefined ? riskLevel : item.riskLevel;
          
          // Compute status dynamically based on criterion evaluations if newStatus is not explicitly passed
          let calculatedStatus: ComplianceStatus = newStatus !== undefined 
            ? newStatus 
            : (updatedCriterionEvals && updatedCriterionEvals.length > 0 
                ? evaluateItemStatusFromCriteria(updatedCriterionEvals, currentRiskLevel) 
                : item.status);

          return { 
            ...item, 
            notes, 
            evidenceText,
            attachments: attachments !== undefined ? attachments : item.attachments,
            riskLevel: currentRiskLevel,
            auditSteps: auditSteps !== undefined ? auditSteps : item.auditSteps,
            verificationCriteria: verificationCriteria !== undefined ? verificationCriteria : item.verificationCriteria,
            criterionEvaluations: updatedCriterionEvals,
            status: calculatedStatus,
            operationalScope: operationalScope !== undefined ? operationalScope : item.operationalScope,
            auditPeriod: auditPeriod !== undefined ? auditPeriod : item.auditPeriod,
            legalHierarchy: legalHierarchy !== undefined ? legalHierarchy : item.legalHierarchy,
            legalSanction: legalSanction !== undefined ? legalSanction : item.legalSanction,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      });

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
  };

  const handleUpdateItemAttachments = (itemId: string, attachments: AuditEvidenceAttachment[]) => {
    setAuditSession(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          return { 
            ...item, 
            attachments,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      })
    }));
  };

  // Mark all remaining in stage as compliant
  const handleMarkAllStageCompliant = (stage: LifecycleStage) => {
    setAuditSession(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.stage === stage && (item.status === 'UNCHECKED' || item.status === 'NOT_APPLICABLE')) {
          return { ...item, status: 'COMPLIANT' as const };
        }
        return item;
      });

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
  };

  // Save or create a WorkPaper item (persists to state and IndexedDB)
  const handleSaveWorkPaperItem = (savedItem: ChecklistItem) => {
    setAuditSession(prev => {
      const exists = prev.items.some(i => i.id === savedItem.id);
      let updatedItems: ChecklistItem[];
      if (exists) {
        updatedItems = prev.items.map(i => i.id === savedItem.id ? savedItem : i);
      } else {
        updatedItems = [savedItem, ...prev.items];
      }

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
    setEditingWorkPaperItem(null);
    setIsCreatingWorkPaper(false);
  };

  // Delete a WorkPaper item
  const handleDeleteWorkPaperItem = (itemId: string) => {
    const capa = auditSession.capaList?.find(c => c.checklistItemId === itemId && c.status !== 'RESOLVED' && c.status !== 'VERIFIED');
    if (capa) {
      setToastMessage('Klausul ini sedang dalam pengawasan CAPA dan tidak dapat dihapus.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }
    setAuditSession(prev => {
      const updatedItems = prev.items.filter(i => i.id !== itemId);
      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
    setEditingWorkPaperItem(null);
    setIsCreatingWorkPaper(false);
  };

  // Deterministic automatic CAPA generator for a single item (zero AI)
  const handleRequestDeterministicCapaDraft = async (item: ChecklistItem) => {
    return generateDeterministicCapaDraft(item);
  };

  // Run pure deterministic rule-based audit evaluation (zero AI)
  const handleRunDeterministicEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const deterministicResult = generateDeterministicAuditAnalysis(auditSession);
      setAuditSession(prev => ({
        ...prev,
        aiAnalysis: deterministicResult
      }));
      setIsEvaluating(false);
    }, 200);
  };

  // Save or update CAPA item (Full page form or inline save)
  const handleSaveCapa = (capaItem: CAPAItem) => {
    // Auto evaluate status according to 3-column answers, conclusion, and attachments
    const evalResult = evaluateCapaAutoStatus(capaItem);
    const targetStatus = capaItem.status === 'VERIFIED' ? (evalResult.hasAnyInput ? 'VERIFIED' : 'OPEN') : evalResult.status;
    const timestampUpdates = syncCapaTimestamps(capaItem, targetStatus);
    const resolvedItem: CAPAItem = {
      ...capaItem,
      ...timestampUpdates,
      status: targetStatus
    };

    setAuditSession(prev => {
      const exists = prev.capaList.some(c => c.id === resolvedItem.id);
      let updatedCapaList: CAPAItem[];
      if (exists) {
        updatedCapaList = prev.capaList.map(c => c.id === resolvedItem.id ? resolvedItem : c);
      } else {
        updatedCapaList = [resolvedItem, ...prev.capaList];
      }

      let updatedItems = prev.items;
      if (targetStatus === 'VERIFIED') {
        const nowIso = resolvedItem.verifiedAt || new Date().toISOString();
        updatedItems = prev.items.map(item => {
          if (item.id === resolvedItem.checklistItemId || item.code === resolvedItem.checklistItemId || item.code === resolvedItem.findingCode) {
            return syncVerifiedCapaToWorkPaperItem(item, nowIso);
          }
          return item;
        });
      }

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        capaList: updatedCapaList,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
    setEditingCapaItem(null);
    setIsCreatingCapa(false);
    setInitialCapaChecklistItem(null);
  };

  // Delete CAPA item
  const handleDeleteCapa = (capaId: string) => {
    setAuditSession(prev => ({
      ...prev,
      capaList: prev.capaList.filter(c => c.id !== capaId)
    }));
    setEditingCapaItem(null);
    setIsCreatingCapa(false);
    setInitialCapaChecklistItem(null);
  };

  // Update CAPA status
  const handleUpdateCapaStatus = (capaId: string, status: CAPAItem['status'], resolutionNotes?: string) => {
    const nowIso = new Date().toISOString();
    setAuditSession(prev => {
      let targetChecklistItemId: string | undefined;
      let targetFindingCode: string | undefined;

      const updatedCapaList = prev.capaList.map(c => {
        if (c.id === capaId) {
          targetChecklistItemId = c.checklistItemId;
          targetFindingCode = c.findingCode;
          const timestampUpdates = syncCapaTimestamps(c, status, nowIso);
          return {
            ...c,
            ...timestampUpdates,
            status,
            resolutionNotes: resolutionNotes || c.resolutionNotes,
            resolvedAt: status === 'RESOLVED' || status === 'VERIFIED' ? (c.resolvedAt || nowIso) : c.resolvedAt,
            verifiedAt: status === 'VERIFIED' ? (c.verifiedAt || nowIso) : c.verifiedAt,
            verifiedBy: status === 'VERIFIED' ? (prev.auditorName || 'Alvareza H. Pratama, S.M (Lead Auditor)') : c.verifiedBy
          };
        }
        return c;
      });

      // If verified as auditor, automatically return work paper item to compliant & clear inputs/attachments/criteria
      const updatedItems = prev.items.map(item => {
        if (status === 'VERIFIED' && (item.id === targetChecklistItemId || item.code === targetChecklistItemId || item.code === targetFindingCode)) {
          return syncVerifiedCapaToWorkPaperItem(item, nowIso);
        }
        return item;
      });

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        capaList: updatedCapaList,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });
  };

  // Dedicated handler: Verifikasi sebagai auditor
  // Updates CAPA to VERIFIED and automatically updates the corresponding Work Paper item
  const handleVerifyCapaAsAuditor = (capaId: string) => {
    const nowIso = new Date().toISOString();
    setAuditSession(prev => {
      let targetChecklistItemId: string | undefined;
      let targetFindingCode: string | undefined;

      const updatedCapaList = prev.capaList.map(c => {
        if (c.id === capaId) {
          targetChecklistItemId = c.checklistItemId;
          targetFindingCode = c.findingCode;
          return {
            ...c,
            status: 'VERIFIED' as const,
            inProgressAt: c.inProgressAt || nowIso,
            resolvedAt: c.resolvedAt || nowIso,
            verifiedAt: nowIso,
            verifiedBy: prev.auditorName || 'Alvareza H. Pratama, S.M (Lead Auditor)'
          };
        }
        return c;
      });

      // Automatically return work paper item to compliant & clear inputs/attachments/criteria
      const updatedItems = prev.items.map(item => {
        if (targetChecklistItemId && (item.id === targetChecklistItemId || item.code === targetChecklistItemId || item.code === targetFindingCode)) {
          return syncVerifiedCapaToWorkPaperItem(item, nowIso);
        }
        return item;
      });

      const { stageScores, overallScore } = calculateStageScores(updatedItems);
      const deterministicResult = generateDeterministicAuditAnalysis({
        ...prev,
        items: updatedItems,
        stageScores,
        overallScore
      });

      return {
        ...prev,
        items: updatedItems,
        capaList: updatedCapaList,
        stageScores,
        overallScore,
        aiAnalysis: deterministicResult
      };
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleUpdateCapaAttachments = (capaId: string, attachments: AuditEvidenceAttachment[]) => {
    setAuditSession(prev => ({
      ...prev,
      capaList: prev.capaList.map(c => c.id === capaId ? { ...c, attachments } : c)
    }));
  };

  // Deterministic auto-generation of all missing CAPAs (zero AI)
  const handleAutoGenerateAllMissingCapa = () => {
    setIsEvaluating(true);
    const ncItems = auditSession.items.filter(
      it => (it.status === 'MINOR_NC' || it.status === 'MAJOR_NC' || it.status === 'CRITICAL_HAZARD') &&
            !auditSession.capaList.some(c => c.checklistItemId === it.id)
    );

    const generatedCapas: CAPAItem[] = [];

    for (const item of ncItems) {
      const draft = generateDeterministicCapaDraft(item);
      const severity = item.status === 'CRITICAL_HAZARD' ? 'CRITICAL' : item.status === 'MAJOR_NC' ? 'MAJOR' : 'MINOR';
      const d = new Date();
      d.setDate(d.getDate() + draft.targetDays);

      generatedCapas.push({
        id: `capa-${Date.now()}-${item.id}`,
        checklistItemId: item.id,
        findingCode: item.code,
        findingTitle: item.title,
        category: item.category,
        severity,
        rootCause: draft.rootCause5Why[4] || 'Perlu perbaikan SOP dan peningkatan pengawasan harian.',
        rootCause5Why: draft.rootCause5Why,
        correctiveAction: draft.correctiveAction,
        preventiveAction: draft.preventiveAction,
        requiredEvidence: draft.requiredEvidence,
        pic: draft.pic,
        dueDate: d.toISOString().split('T')[0],
        status: 'OPEN',
        createdAt: new Date().toISOString()
      });
    }

    setAuditSession(prev => ({
      ...prev,
      capaList: [...generatedCapas, ...prev.capaList]
    }));
    setIsEvaluating(false);
  };

  const handleNavigateToStage = (stage: LifecycleStage) => {
    setActiveStage(stage);
    setCurrentTab('CHECKLIST');
    setIsWorkPaperExpanded(true);
  };

  if (showSplash) {
    return (
      <SplashScreen
        duration={5000}
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  return (
    <>
      <AppLayout
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        isWorkPaperExpanded={isWorkPaperExpanded}
        setIsWorkPaperExpanded={setIsWorkPaperExpanded}
        capaStatusFilter={capaStatusFilter}
        setCapaStatusFilter={setCapaStatusFilter}
        isCapaExpanded={isCapaExpanded}
        setIsCapaExpanded={setIsCapaExpanded}
        isRegulationsExpanded={isRegulationsExpanded}
        setIsRegulationsExpanded={setIsRegulationsExpanded}
        regulationSubTab={regulationSubTab}
        setRegulationSubTab={setRegulationSubTab}
        auditSession={auditSession}
        isWorkPaperEditMode={isWorkPaperEditMode}
        editingWorkPaperItem={editingWorkPaperItem}
        isCapaEditMode={isCapaEditMode}
        editingCapaItem={editingCapaItem}
        onAutoGenerateAllMissingCapa={handleAutoGenerateAllMissingCapa}
        isGeneratingAi={isEvaluating}
        ncItemsWithoutCapaCount={
          auditSession.items.filter(
            it => (it.status === 'MINOR_NC' || it.status === 'MAJOR_NC' || it.status === 'CRITICAL_HAZARD') &&
                  !auditSession.capaList.some(c => c.checklistItemId === it.id)
          ).length
        }
        onCancelEdit={() => {
          if (isCapaEditMode) {
            setEditingCapaItem(null);
            setIsCreatingCapa(false);
            setInitialCapaChecklistItem(null);
          } else {
            setEditingWorkPaperItem(null);
            setIsCreatingWorkPaper(false);
          }
        }}
      >
        {currentTab === 'DASHBOARD' && (
          <DashboardOverview
            auditSession={auditSession}
            onNavigateToStage={handleNavigateToStage}
            onNavigateToTab={setCurrentTab}
            onRunAiAnalysis={handleRunDeterministicEvaluation}
            isAiLoading={isEvaluating}
          />
        )}

        {currentTab === 'CHECKLIST' && (
          <WorkPaper
            auditSession={auditSession}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            onUpdateItemStatus={handleUpdateItemStatus}
            onUpdateItemDetails={handleUpdateItemDetails}
            onUpdateItemAttachments={handleUpdateItemAttachments}
            onGenerateCapaForItem={(item) => {
              const existingCapa = auditSession.capaList?.find(c => 
                c.checklistItemId === item.id || 
                (c.findingCode && item.code && c.findingCode.trim().toLowerCase() === item.code.trim().toLowerCase()) ||
                (c.findingTitle && item.title && c.findingTitle.trim().toLowerCase() === item.title.trim().toLowerCase())
              );
              if (existingCapa) {
                setCurrentTab('CAPA');
                return;
              }
              setInitialCapaChecklistItem(item);
              setEditingCapaItem(null);
              setIsCreatingCapa(true);
              setCurrentTab('CAPA');
            }}
            onMarkAllStageCompliant={handleMarkAllStageCompliant}
            onNavigateToTab={setCurrentTab}
            onSaveItem={handleSaveWorkPaperItem}
            onDeleteItem={handleDeleteWorkPaperItem}
            editingItem={editingWorkPaperItem}
            isCreatingNew={isCreatingWorkPaper}
            onStartEditItem={(item) => {
              setEditingWorkPaperItem(item);
              setIsCreatingWorkPaper(false);
            }}
            onStartCreateItem={() => {
              setEditingWorkPaperItem(null);
              setIsCreatingWorkPaper(true);
            }}
            onCloseEdit={() => {
              setEditingWorkPaperItem(null);
              setIsCreatingWorkPaper(false);
            }}
          />
        )}

        {currentTab === 'CAPA' && (
          <CapaTracker
            auditSession={auditSession}
            statusFilter={capaStatusFilter}
            onSelectStatusFilter={setCapaStatusFilter}
            onUpdateCapaStatus={handleUpdateCapaStatus}
            onUpdateCapaAttachments={handleUpdateCapaAttachments}
            onSaveCapa={handleSaveCapa}
            onDeleteCapa={handleDeleteCapa}
            onVerifyAsAuditor={handleVerifyCapaAsAuditor}
            onAutoGenerateAllMissingCapa={handleAutoGenerateAllMissingCapa}
            isGeneratingAi={isEvaluating}
            editingItem={editingCapaItem}
            isCreatingNew={isCreatingCapa}
            initialChecklistItem={initialCapaChecklistItem}
            onStartEditItem={(capa) => {
              setEditingCapaItem(capa);
              setIsCreatingCapa(false);
              setInitialCapaChecklistItem(null);
            }}
            onStartCreateItem={(item) => {
              setEditingCapaItem(null);
              setIsCreatingCapa(true);
              setInitialCapaChecklistItem(item || null);
            }}
            onCloseEdit={() => {
              setEditingCapaItem(null);
              setIsCreatingCapa(false);
              setInitialCapaChecklistItem(null);
            }}
            onRequestAiDraft={handleRequestDeterministicCapaDraft}
          />
        )}

        {currentTab === 'REGULATIONS' && (
          <RegulatoryMatrixView
            auditSession={auditSession}
            activeSubTab={regulationSubTab}
            onSelectSubTab={setRegulationSubTab}
            onRunDeterministicEvaluation={handleRunDeterministicEvaluation}
            isEvaluating={isEvaluating}
          />
        )}

        {currentTab === 'GLOSSARY' && (
          <GlossaryView />
        )}

        {currentTab === 'REPORT' && (
          <PrintableReport
            auditSession={auditSession}
            onClose={() => setCurrentTab('DASHBOARD')}
          />
        )}
      </AppLayout>

      {/* Global Modals */}
      <NewAuditModal
        isOpen={isNewAuditModalOpen}
        onClose={() => setIsNewAuditModalOpen(false)}
        onCreateAudit={(newSession) => {
          setAuditSession(newSession);
          setCurrentTab('DASHBOARD');
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-amber-900/90 text-amber-100 px-4 py-3 rounded-xl shadow-2xl border border-amber-700/60 backdrop-blur-md flex items-center justify-between space-x-3 text-xs animate-slide-up">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-amber-300 hover:text-white text-sm font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
