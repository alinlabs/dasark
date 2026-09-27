import React, { useState, useMemo } from 'react';
import { FileCheck } from 'lucide-react';
import { CapaTrackerProps, CapaStatusFilter } from './types';
import { CAPAItem, ChecklistItem } from '../../types/audit';
import { CapaHeader } from './components/CapaHeader';
import { CapaStatsGrid } from './components/CapaStatsGrid';
import { CapaCard } from './components/CapaCard';
import { CapaEditPage } from './CapaEditPage';
import { SingleCapaPrintModal } from '../../components/SingleCapaPrintModal';

export const CapaContainer: React.FC<CapaTrackerProps> = ({
  auditSession,
  onUpdateCapaStatus,
  onUpdateCapaAttachments,
  onSaveCapa,
  onDeleteCapa,
  onVerifyAsAuditor,
  onAutoGenerateAllMissingCapa,
  isGeneratingAi,
  editingItem: propEditingItem,
  isCreatingNew: propIsCreatingNew,
  initialChecklistItem: propInitialChecklistItem,
  onStartEditItem,
  onStartCreateItem,
  onCloseEdit,
  onRequestAiDraft,
  statusFilter: propStatusFilter,
  onSelectStatusFilter: propOnSelectStatusFilter,
}) => {
  // Local fallback state for full-page editing and creation
  const [localEditingItem, setLocalEditingItem] = useState<CAPAItem | null>(null);
  const [localIsCreatingNew, setLocalIsCreatingNew] = useState(false);
  const [localInitialChecklistItem, setLocalInitialChecklistItem] = useState<ChecklistItem | null>(null);
  const [printingCapa, setPrintingCapa] = useState<CAPAItem | null>(null);

  const activeEditItem = propEditingItem !== undefined ? propEditingItem : localEditingItem;
  const isCreating = propIsCreatingNew !== undefined ? propIsCreatingNew : localIsCreatingNew;
  const targetChecklistItem = propInitialChecklistItem !== undefined ? propInitialChecklistItem : localInitialChecklistItem;
  const isInEditMode = Boolean(activeEditItem || isCreating);

  const handleStartEdit = (item: CAPAItem) => {
    if (onStartEditItem) {
      onStartEditItem(item);
    } else {
      setLocalEditingItem(item);
    }
  };

  const handleStartCreate = (item?: ChecklistItem | null) => {
    if (onStartCreateItem) {
      onStartCreateItem(item);
    } else {
      setLocalInitialChecklistItem(item || null);
      setLocalIsCreatingNew(true);
    }
  };

  const handleCloseEdit = () => {
    if (onCloseEdit) {
      onCloseEdit();
    } else {
      setLocalEditingItem(null);
      setLocalIsCreatingNew(false);
      setLocalInitialChecklistItem(null);
    }
  };

  // Filter state (Selected by clicking CapaStatsGrid cards or via sidebar)
  const [localStatusFilter, setLocalStatusFilter] = useState<CapaStatusFilter>('ALL');
  const statusFilter = propStatusFilter !== undefined ? propStatusFilter : localStatusFilter;
  const setStatusFilter = (filter: CapaStatusFilter) => {
    if (propOnSelectStatusFilter) {
      propOnSelectStatusFilter(filter);
    } else {
      setLocalStatusFilter(filter);
    }
  };

  const { capaList = [], items = [] } = auditSession;

  // Identify NC items that do not have a CAPA yet
  const ncItemsWithoutCapa = useMemo(() => {
    return items.filter(
      it => (it.status === 'MINOR_NC' || it.status === 'MAJOR_NC' || it.status === 'CRITICAL_HAZARD') &&
            !capaList.some(c => c.checklistItemId === it.id)
    );
  }, [items, capaList]);

  // Filtered CAPA items based on selected stat card
  const filteredCapa = useMemo(() => {
    return capaList.filter(c => {
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
      return true;
    });
  }, [capaList, statusFilter]);

  // Render Full-Page Edit Form if in edit mode (NO MODAL!)
  if (isInEditMode) {
    return (
      <CapaEditPage
        capa={activeEditItem}
        initialChecklistItem={targetChecklistItem}
        allItems={items}
        onSave={(savedCapa) => {
          if (onSaveCapa) {
            onSaveCapa(savedCapa);
          }
          handleCloseEdit();
        }}
        onCancel={handleCloseEdit}
        onDelete={(capaId) => {
          if (onDeleteCapa) {
            onDeleteCapa(capaId);
          }
          handleCloseEdit();
        }}
        onRequestAiDraft={onRequestAiDraft}
      />
    );
  }

  const getFilterLabel = (filter: CapaStatusFilter) => {
    switch (filter) {
      case 'OPEN': return 'Buka';
      case 'IN_PROGRESS': return 'Sedang Dikerjakan';
      case 'RESOLVED': return 'Selesai';
      case 'VERIFIED': return 'Terverifikasi Auditor';
      default: return 'Semua CAPA';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Info Banner */}
      <CapaHeader capaList={capaList} />

      {/* Interactive Stats Summary Cards - User clicks card to filter */}

      {/* Interactive Stats Summary Cards - User clicks card to filter */}
      <CapaStatsGrid 
        capaList={capaList} 
        activeFilter={statusFilter}
        onSelectFilter={setStatusFilter}
      />

      {/* Active Filter Indicator Bar */}
      {statusFilter !== 'ALL' && (
        <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
          <span className="font-medium">
            Menampilkan filter status: <strong className="text-slate-900 dark:text-white font-bold">{getFilterLabel(statusFilter)}</strong> ({filteredCapa.length} dari {capaList.length} CAPA)
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 font-bold text-slate-800 dark:text-slate-100 transition cursor-pointer text-xs"
          >
            Tampilkan Semua CAPA ({capaList.length})
          </button>
        </div>
      )}

      {/* CAPA Items List */}
      <div className="space-y-4">
        {filteredCapa.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shadow-2xs">
            <FileCheck className="w-9 h-9 mx-auto text-slate-300 dark:text-slate-600 mb-2.5" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Tidak ada item CAPA pada status {getFilterLabel(statusFilter)}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
              Klik kartu status lain di atas atau tombol &quot;Tampilkan Semua CAPA&quot; untuk melihat seluruh rencana perbaikan.
            </p>
          </div>
        ) : (
          filteredCapa.map((capa) => {
            const linkedWorkPaperItem = items.find(
              it => it.id === capa.checklistItemId || it.code === capa.findingCode || it.code === capa.checklistItemId
            );
            return (
              <CapaCard
                key={capa.id}
                capa={capa}
                workPaperItem={linkedWorkPaperItem}
                onUpdateStatus={onUpdateCapaStatus}
                onUpdateAttachments={onUpdateCapaAttachments}
                onSaveCapa={onSaveCapa}
                onEdit={handleStartEdit}
                onDelete={onDeleteCapa}
                onVerifyAsAuditor={onVerifyAsAuditor}
                onPrintCard={(targetCapa) => setPrintingCapa(targetCapa)}
              />
            );
          })
        )}
      </div>

      {/* Single CAPA Action & Response Print Modal */}
      {printingCapa && (
        <SingleCapaPrintModal
          capa={printingCapa}
          workPaperItem={items.find(
            it => it.id === printingCapa.checklistItemId || it.code === printingCapa.findingCode || it.code === printingCapa.checklistItemId
          )}
          auditSession={auditSession}
          onClose={() => setPrintingCapa(null)}
          autoPrint={false}
        />
      )}
    </div>
  );
};

