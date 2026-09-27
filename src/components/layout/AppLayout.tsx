import React, { useRef, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { OfflineIndicator } from '../pwa/OfflineIndicator';
import { AppLayoutProps } from './types';

export const AppLayout: React.FC<AppLayoutProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  currentTab,
  setCurrentTab,
  activeStage,
  setActiveStage,
  isWorkPaperExpanded,
  setIsWorkPaperExpanded,
  capaStatusFilter,
  setCapaStatusFilter,
  isCapaExpanded,
  setIsCapaExpanded,
  isRegulationsExpanded,
  setIsRegulationsExpanded,
  regulationSubTab,
  setRegulationSubTab,
  auditSession,
  isWorkPaperEditMode = false,
  editingWorkPaperItem = null,
  isCapaEditMode = false,
  editingCapaItem = null,
  onCancelEdit,
  onAutoGenerateAllMissingCapa,
  isGeneratingAi = false,
  ncItemsWithoutCapaCount = 0,
  children,
}) => {
  const mainScrollRef = useRef<HTMLElement>(null);

  // Automatically reset scroll position to top (scrollTop = 0) whenever user switches tabs, stages, sub-tabs, or enters/exits edit mode
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [
    currentTab, 
    activeStage, 
    regulationSubTab, 
    capaStatusFilter, 
    isWorkPaperEditMode, 
    isCapaEditMode,
    editingWorkPaperItem?.id,
    editingCapaItem?.id
  ]);

  return (
    <div className="h-screen w-screen bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row font-sans relative overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden no-print cursor-pointer"
        />
      )}

      {/* Sidebar Navigation */}
      <AppSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={onToggleSidebarCollapse}
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
        auditorName="Alvareza H. P"
        auditorRole="Lead Auditor"
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <AppHeader
          currentTab={currentTab}
          activeStage={activeStage}
          regulationSubTab={regulationSubTab}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={onToggleSidebarCollapse}
          onOpenMobileSidebar={() => setIsSidebarOpen(true)}
          isWorkPaperEditMode={isWorkPaperEditMode}
          editingWorkPaperItem={editingWorkPaperItem}
          isCapaEditMode={isCapaEditMode}
          editingCapaItem={editingCapaItem}
          onCancelEdit={onCancelEdit}
          companyName="PT. DAME ALAM SEJAHTERA · DAS GROUP"
          onAutoGenerateAllMissingCapa={onAutoGenerateAllMissingCapa}
          isGeneratingAi={isGeneratingAi}
          ncItemsWithoutCapaCount={ncItemsWithoutCapaCount}
        />

        {/* Scrollable View Canvas */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
          {children}
        </main>

        {/* Global Offline Connectivity Indicator */}
        <OfflineIndicator />
      </div>
    </div>
  );
};
