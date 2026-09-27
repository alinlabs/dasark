import React from 'react';
import { 
  Menu, 
  ChevronLeft, 
  Save, 
  Wrench,
  Loader2
} from 'lucide-react';
import { AppHeaderProps, TabType } from './types';
import { LifecycleStage } from '../../types/audit';
import { STAGE_METADATA } from '../../data/defaultAuditChecklist';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  activeStage,
  regulationSubTab,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  onOpenMobileSidebar,
  isWorkPaperEditMode = false,
  editingWorkPaperItem = null,
  isCapaEditMode = false,
  editingCapaItem = null,
  onCancelEdit,
  companyName = 'PT. DAME ALAM SEJAHTERA · DAS GROUP',
  onAutoGenerateAllMissingCapa,
  isGeneratingAi = false,
  ncItemsWithoutCapaCount = 0,
}) => {
  const getTabTitle = (tab: TabType, stage: LifecycleStage): string => {
    switch (tab) {
      case 'DASHBOARD': 
        return 'Dashboard Overview';
      case 'CHECKLIST': {
        const stageLabels: Record<LifecycleStage, string> = {
          RECRUITMENT: '1. Rekrutmen & Seleksi',
          ONBOARDING_TRAINING: '2. Induksi & Pelatihan',
          OPERATIONAL_K3: '3. Operasional K3 & Karawang',
          COMPENSATION_WELFARE: '4. Kompensasi & Nutrisi',
          RELATIONS_DISCIPLINE: '5. Disiplin & SOP Limbah',
          TERMINATION_EXIT: '6. Terminasi & Exit MCU'
        };
        return `WorkPaper (${stageLabels[stage] || 'Lainnya'})`;
      }
      case 'CAPA': 
        return 'CAPA Tracker';
      case 'REGULATIONS': {
        if (regulationSubTab === 'LAW_ISO') return 'Matriks Regulasi (Hukum & Standar ISO)';
        if (regulationSubTab === 'COMPARISON') return 'Matriks Regulasi (Komparasi Yuridis)';
        if (regulationSubTab === 'LEGAL_QA') return 'Matriks Regulasi (Tanya Hukum)';
        return 'Matriks Regulasi & Pakar Hukum K3';
      }
      case 'GLOSSARY': 
        return 'Glosarium & Kumpulan Istilah';
      case 'REPORT': 
        return 'Laporan Audit Final';
      default: 
        return 'HR & K3 Corporate Audit System';
    }
  };

  const isEditMode = isWorkPaperEditMode || isCapaEditMode;
  const editTitle = isCapaEditMode
    ? (editingCapaItem ? `Edit CAPA: ${editingCapaItem.findingCode}` : 'Buat Rencana CAPA Baru')
    : (editingWorkPaperItem ? `Edit Klausul: ${editingWorkPaperItem.code}` : 'Buat Klausul Baru');
  const editSubtitle = isCapaEditMode
    ? 'Pelacak Tindakan Perbaikan & Pencegahan (CAPA)'
    : (STAGE_METADATA.find(s => s.id === (editingWorkPaperItem?.stage || activeStage))?.label || 'WorkPaper');
  const editFormId = isCapaEditMode ? 'capa-edit-form' : 'workpaper-edit-form';

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 px-4 md:px-6 flex items-center justify-between shrink-0 no-print transition-colors duration-200">
      {isEditMode ? (
        <>
          {/* Back button and Edit Title without vertical divider dash */}
          <div className="flex items-center space-x-3">
            {onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shrink-0"
                title={isCapaEditMode ? "Kembali ke CAPA Tracker" : "Kembali ke WorkPaper"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                {editTitle}
              </h2>
              <p className="hidden sm:block text-[10px] font-medium text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                {editSubtitle}
              </p>
            </div>
          </div>

          {/* Tombol Simpan di Paling Kanan Header Utama */}
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              form={editFormId}
              className="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-xs cursor-pointer bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
              title="Simpan"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Hamburger Menu Trigger (Mobile) + Tab Breadcrumb */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenMobileSidebar}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                {getTabTitle(currentTab, activeStage)}
              </h2>
              <p className="hidden sm:block text-[10px] font-medium text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                {companyName}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2">
            <PWAInstallButton compact />

            {/* Generate CAPA Otomatis Button when on CAPA tab */}
            {currentTab === 'CAPA' && onAutoGenerateAllMissingCapa && (
              <button
                type="button"
                onClick={onAutoGenerateAllMissingCapa}
                disabled={isGeneratingAi}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-2xs transition-all cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Menyusun CAPA...</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-3.5 h-3.5 text-white" />
                    <span>
                      {ncItemsWithoutCapaCount > 0 
                        ? `Generate ${ncItemsWithoutCapaCount} CAPA Otomatis`
                        : 'Generate CAPA Otomatis'}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </header>
  );
};

