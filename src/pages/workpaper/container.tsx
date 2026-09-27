import React, { useState, useMemo } from 'react';
import { ChevronDown, FileText, Plus } from 'lucide-react';
import { WorkPaperProps } from './types';
import { ChecklistItem, CriterionEvaluation } from '../../types/audit';
import { STAGE_METADATA } from '../../data/defaultAuditChecklist';
import { StageHeader } from './components/StageHeader';
import { StageStatsGrid } from './components/StageStatsGrid';
import { WorkPaperCard } from './components/WorkPaperCard';
import { WorkPaperEditPage } from './WorkPaperEditPage';
import { SingleWorkpaperPrintModal } from '../../components/SingleWorkpaperPrintModal';

export const WorkPaperContainer: React.FC<WorkPaperProps> = ({
  auditSession,
  activeStage,
  onSelectStage,
  onUpdateItemStatus,
  onUpdateItemDetails,
  onUpdateItemAttachments,
  onGenerateCapaForItem,
  onNavigateToTab,
  onSaveItem,
  onDeleteItem,
  editingItem: propEditingItem,
  isCreatingNew: propIsCreatingNew,
  onStartEditItem,
  onStartCreateItem,
  onCloseEdit,
}) => {
  // State fallback for full-page editing and creation
  const [localEditingItem, setLocalEditingItem] = useState<ChecklistItem | null>(null);
  const [localIsCreatingNew, setLocalIsCreatingNew] = useState(false);
  const [printingItem, setPrintingItem] = useState<ChecklistItem | null>(null);

  const activeEditItem = propEditingItem !== undefined ? propEditingItem : localEditingItem;
  const isCreating = propIsCreatingNew !== undefined ? propIsCreatingNew : localIsCreatingNew;
  const isInEditMode = Boolean(activeEditItem || isCreating);

  // Reset scroll position to top whenever stage or edit mode changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [activeStage, isInEditMode]);

  const handleStartEdit = (item: ChecklistItem) => {
    const capaItem = auditSession.capaList?.find(c => 
      c.checklistItemId === item.id || 
      (c.findingCode && item.code && c.findingCode.trim().toLowerCase() === item.code.trim().toLowerCase()) ||
      (c.findingTitle && item.title && c.findingTitle.trim().toLowerCase() === item.title.trim().toLowerCase())
    );
    if (capaItem && capaItem.status !== 'RESOLVED' && capaItem.status !== 'VERIFIED') {
      return;
    }
    if (onStartEditItem) {
      onStartEditItem(item);
    } else {
      setLocalEditingItem(item);
    }
  };

  const handleStartCreate = () => {
    if (onStartCreateItem) {
      onStartCreateItem();
    } else {
      setLocalIsCreatingNew(true);
    }
  };

  const handleCloseEdit = () => {
    if (onCloseEdit) {
      onCloseEdit();
    } else {
      setLocalEditingItem(null);
      setLocalIsCreatingNew(false);
    }
  };

  // Accordion toggle states (default to false/collapsed)
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [expandedLegal, setExpandedLegal] = useState<Record<string, boolean>>({});
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({});
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});

  // Unified accordion toggle for both Langkah Verifikasi & Dasar Hukum
  const toggleBothAccordions = (itemId: string) => {
    const isCurrentlyExpanded = !!expandedSteps[itemId] || !!expandedLegal[itemId];
    const nextState = !isCurrentlyExpanded;
    setExpandedSteps(prev => ({ ...prev, [itemId]: nextState }));
    setExpandedLegal(prev => ({ ...prev, [itemId]: nextState }));
  };

  const toggleCriteriaAccordion = (itemId: string) => {
    setExpandedCriteria(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const stageMeta = STAGE_METADATA.find(s => s.id === activeStage) || STAGE_METADATA[0];
  const stageScore = auditSession.stageScores[activeStage] || { total: 0, compliant: 0, minorNc: 0, majorNc: 0, criticalHazard: 0, score: 0 };
  
  // Get all items in current stage
  const stageItems = useMemo(() => {
    return auditSession.items.filter(item => item.stage === activeStage);
  }, [auditSession.items, activeStage]);

  // Group all stage items by session
  const groupedBySession = useMemo(() => {
    const map = new Map<number, { number: number; title: string; items: ChecklistItem[] }>();
    stageItems.forEach(item => {
      const sNum = item.sessionNumber || 1;
      const rawTitle = item.sessionTitle || item.category;
      const cleanTitle = rawTitle.replace(/^Sesi\s*\d*\s*[:\-]?\s*/i, '').trim() || item.category;
      if (!map.has(sNum)) {
        map.set(sNum, { number: sNum, title: cleanTitle, items: [] });
      }
      map.get(sNum)!.items.push(item);
    });
    return Array.from(map.values()).sort((a, b) => a.number - b.number);
  }, [stageItems]);

  // Toggle individual criterion status (Sesuai vs Tidak Sesuai)
  const handleToggleCriterionStatus = (
    item: ChecklistItem, 
    criterionIdx: number, 
    newStatus: 'COMPLIANT' | 'NON_COMPLIANT'
  ) => {
    const criteriaList = item.verificationCriteria || [];
    
    // Get existing criterion evaluations or initialize
    const currentEvals: CriterionEvaluation[] = criteriaList.map((critText, idx) => {
      const existing = item.criterionEvaluations?.find(e => e.criterionIndex === idx);
      return existing || {
        criterionIndex: idx,
        criterionText: critText,
        status: 'UNCHECKED' as const,
        notes: ''
      };
    });

    // Toggle logic: if clicking same status, set back to UNCHECKED; otherwise set newStatus
    const targetEval = currentEvals[criterionIdx];
    const updatedStatus = targetEval.status === newStatus ? 'UNCHECKED' : newStatus;
    currentEvals[criterionIdx] = {
      ...targetEval,
      status: updatedStatus
    };

    // Aggregate non-compliant notes to append to item notes automatically
    const ncNotesList = currentEvals
      .filter(e => e.status === 'NON_COMPLIANT' && e.notes && e.notes.trim())
      .map(e => `[Kriteria #${e.criterionIndex + 1}]: ${e.notes}`);
    
    const updatedNotes = ncNotesList.length > 0 ? ncNotesList.join('\n') : item.notes;

    onUpdateItemDetails(
      item.id,
      updatedNotes,
      item.evidenceText,
      item.attachments,
      item.riskLevel,
      item.auditSteps,
      item.verificationCriteria,
      currentEvals
    );
  };

  // Update specific note for a criterion
  const handleUpdateCriterionNote = (
    item: ChecklistItem,
    criterionIdx: number,
    noteText: string
  ) => {
    const criteriaList = item.verificationCriteria || [];
    const currentEvals: CriterionEvaluation[] = criteriaList.map((critText, idx) => {
      const existing = item.criterionEvaluations?.find(e => e.criterionIndex === idx);
      return existing || {
        criterionIndex: idx,
        criterionText: critText,
        status: 'UNCHECKED' as const,
        notes: ''
      };
    });

    if (currentEvals[criterionIdx]) {
      currentEvals[criterionIdx] = {
        ...currentEvals[criterionIdx],
        notes: noteText
      };
    }

    // Aggregate notes
    const ncNotesList = currentEvals
      .filter(e => e.status === 'NON_COMPLIANT' && e.notes && e.notes.trim())
      .map(e => `[Kriteria #${e.criterionIndex + 1}]: ${e.notes}`);

    const updatedNotes = ncNotesList.length > 0 ? ncNotesList.join('\n') : item.notes;

    onUpdateItemDetails(
      item.id,
      updatedNotes,
      item.evidenceText,
      item.attachments,
      item.riskLevel,
      item.auditSteps,
      item.verificationCriteria,
      currentEvals
    );
  };

  // If in edit or create mode, render full-page editor
  if (isInEditMode) {
    return (
      <WorkPaperEditPage
        item={activeEditItem}
        defaultStage={activeStage}
        onSave={(savedItem) => {
          if (onSaveItem) {
            onSaveItem(savedItem);
          }
          handleCloseEdit();
        }}
        onCancel={handleCloseEdit}
        onDelete={(itemId) => {
          if (onDeleteItem) {
            onDeleteItem(itemId);
          }
          handleCloseEdit();
        }}
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Stage Header Info Banner */}
      <StageHeader
        label={stageMeta.label}
        description={stageMeta.description}
        regulations={stageMeta.regulations}
        score={stageScore.score}
      />

      {/* Action bar with clause count and Create New Clause button */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <span className="font-bold text-slate-800">Daftar Klausul:</span>
          <span>{stageItems.length} klausul audit terdaftar dalam tahap ini</span>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer flex items-center space-x-1.5 shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Klausul Baru</span>
        </button>
      </div>

      {/* Stage Statistics Summary Cards with Full Solid Color Backgrounds */}
      <StageStatsGrid stageItems={stageItems} />

      {/* Grouped By Session Checklist Items View */}
      <div className="space-y-6">
        {groupedBySession.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <FileText className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tidak ada klausul yang cocok dengan filter</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Coba ubah kata kunci pencarian, filter status, atau pilih sesi lainnya.</p>
          </div>
        ) : (
          groupedBySession.map(({ number: sessionNumber, title: sessionTitle, items }) => {
            const isSessionExpanded = expandedSessions[`${sessionNumber}`] !== false;
            
            return (
              <div key={sessionNumber} className="space-y-3">
                {/* Session Header (Flat unboxed text title) */}
                <div 
                  onClick={() => {
                    setExpandedSessions(prev => ({
                      ...prev,
                      [`${sessionNumber}`]: !isSessionExpanded
                    }));
                  }}
                  className="flex items-center justify-between cursor-pointer select-none py-3.5"
                >
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      {sessionTitle}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold">
                      {items.filter(i => i.status === 'COMPLIANT').length}/{items.length} Patuh
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform ${isSessionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Session Items */}
                {isSessionExpanded && (
                  <div className="space-y-4 pt-2 pb-6">
                    {items.map(item => {
                      const capaItem = auditSession.capaList?.find(capa => 
                        capa.checklistItemId === item.id ||
                        (capa.findingCode && item.code && capa.findingCode.trim().toLowerCase() === item.code.trim().toLowerCase()) ||
                        (capa.findingTitle && item.title && capa.findingTitle.trim().toLowerCase() === item.title.trim().toLowerCase())
                      );
                      const hasCapa = Boolean(capaItem);
                      const isBothExpanded = !!expandedSteps[item.id] || !!expandedLegal[item.id];
                      const isCriteriaExpanded = !!expandedCriteria[item.id];

                      return (
                        <WorkPaperCard
                          key={item.id}
                          item={item}
                          hasCapa={hasCapa}
                          capaItem={capaItem}
                          isBothExpanded={isBothExpanded}
                          isCriteriaExpanded={isCriteriaExpanded}
                          onToggleBothAccordions={toggleBothAccordions}
                          onToggleCriteriaAccordion={toggleCriteriaAccordion}
                          onToggleCriterionStatus={handleToggleCriterionStatus}
                          onUpdateCriterionNote={handleUpdateCriterionNote}
                          onUpdateItemDetails={onUpdateItemDetails}
                          onUpdateItemAttachments={onUpdateItemAttachments}
                          onGenerateCapaForItem={onGenerateCapaForItem}
                          onEditItem={(targetItem) => handleStartEdit(targetItem)}
                          onDeleteItem={onDeleteItem}
                          onPrintCard={(targetItem) => setPrintingItem(targetItem)}
                          onPrintReport={() => onNavigateToTab?.('REPORT')}
                          onNavigateToTab={onNavigateToTab}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Single WorkPaper Detail Print Modal */}
      {printingItem && (
        <SingleWorkpaperPrintModal
          item={printingItem}
          capaItem={auditSession.capaList?.find(capa => 
            capa.checklistItemId === printingItem.id ||
            (capa.findingCode && printingItem.code && capa.findingCode.trim().toLowerCase() === printingItem.code.trim().toLowerCase()) ||
            (capa.findingTitle && printingItem.title && capa.findingTitle.trim().toLowerCase() === printingItem.title.trim().toLowerCase())
          )}
          auditSession={auditSession}
          onClose={() => setPrintingItem(null)}
          autoPrint={false}
        />
      )}
    </div>
  );
};
