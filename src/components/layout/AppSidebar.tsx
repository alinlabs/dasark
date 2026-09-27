import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  LayoutDashboard, 
  CheckSquare, 
  Wrench, 
  Gavel, 
  BookMarked, 
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { AppSidebarProps, TabItemConfig } from './types';
import { STAGE_METADATA } from '../../data/defaultAuditChecklist';
import { CapaStatusFilter } from '../../pages/capa/types';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const AppSidebar: React.FC<AppSidebarProps> = ({
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
  capaStatusFilter = 'ALL',
  setCapaStatusFilter,
  isCapaExpanded = true,
  setIsCapaExpanded,
  isRegulationsExpanded = true,
  setIsRegulationsExpanded,
  regulationSubTab = 'LAW_ISO',
  setRegulationSubTab,
  auditSession,
  auditorName = 'Alvareza H. P',
  auditorRole = 'Lead Auditor',
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('wasteguard_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('wasteguard_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('wasteguard_theme', 'light');
      }
    } catch (e) {
      /* ignore */
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const tabs: TabItemConfig[] = [
    { id: 'DASHBOARD', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'CHECKLIST', label: 'WorkPaper', icon: CheckSquare },
    { id: 'CAPA', label: 'CAPA Tracker', icon: Wrench },
    { id: 'REGULATIONS', label: 'Matriks Regulasi', icon: Gavel },
    { id: 'GLOSSARY', label: 'Glosarium K3', icon: BookMarked },
    { id: 'REPORT', label: 'Laporan Final', icon: FileText },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-300 ease-in-out md:static md:translate-x-0 no-print shrink-0 border-r border-slate-200 dark:border-slate-800 shadow-sm relative ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isSidebarCollapsed ? 'md:w-[68px] w-64' : 'md:w-64 w-64'}`}
    >
      {/* Desktop Slide Toggle Button - Positioned exactly at the midpoint of the border line dividing sidebar & header */}
      {onToggleSidebarCollapse && (
        <button
          type="button"
          onClick={onToggleSidebarCollapse}
          className="hidden md:flex absolute -right-3 top-5 z-50 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition select-none"
          title={isSidebarCollapsed ? "Perluas Sidebar" : "Kecilkan Sidebar (Mode Fokus Luas)"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      )}
      {/* Brand/Logo header inside Sidebar */}
      <div className={`flex h-16 items-center border-b border-slate-100 dark:border-slate-800 px-3 transition-all ${
        isSidebarCollapsed ? 'md:justify-center justify-between' : 'justify-between px-4'
      }`}>
        <div 
          className={`flex items-center ${isSidebarCollapsed ? 'md:justify-center space-x-2.5' : 'space-x-2.5'}`}
          title="DASAR · DAS Audit & Risk"
        >
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          {(!isSidebarCollapsed || isSidebarOpen) && (
            <div className="overflow-hidden transition-opacity duration-200">
              <h1 className="font-extrabold text-xs tracking-wider text-slate-900 dark:text-white uppercase truncate">
                DASAR
              </h1>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold leading-none truncate">
                DAS Audit &amp; Risk
              </p>
            </div>
          )}
        </div>

        {/* Close button on mobile */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="Tutup Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation tabs */}
      <nav className={`flex-1 space-y-1.5 py-4 overflow-y-auto no-scrollbar ${
        isSidebarCollapsed ? 'md:px-2 px-3' : 'px-3'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.id === 'CHECKLIST') {
            const isWorkPaperActive = currentTab === 'CHECKLIST';
            
            if (isSidebarCollapsed) {
              // Compact icon-only button with vertical line and bullet dots for the 6 stages
              return (
                <div key={tab.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (currentTab !== 'CHECKLIST') {
                        setCurrentTab('CHECKLIST');
                      }
                      setIsWorkPaperExpanded(prev => !prev);
                    }}
                    title={`WorkPaper (${auditSession.items.length} Klausul)`}
                    className={`group relative flex items-center justify-center w-full p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isWorkPaperActive
                        ? 'text-slate-950 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isWorkPaperActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    {isWorkPaperActive && (
                      <span className="absolute right-1.5 top-1.5 w-2 h-2 rounded-full bg-slate-900 dark:bg-white ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>

                  {/* Compact Stage Bullets List with Vertical Line (No Text, Pure Bullets & Line) */}
                  {isWorkPaperExpanded && (
                    <div className="relative flex flex-col items-center py-1.5 space-y-2">
                      {/* Vertical line through centers */}
                      <div className="absolute top-1 bottom-1 w-[1.5px] bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                      {STAGE_METADATA.map((stage) => {
                        const isStageActive = currentTab === 'CHECKLIST' && activeStage === stage.id;
                        return (
                          <button
                            key={stage.id}
                            type="button"
                            onClick={() => {
                              setCurrentTab('CHECKLIST');
                              setActiveStage(stage.id);
                              setIsSidebarOpen(false);
                            }}
                            title={stage.label}
                            aria-label={stage.label}
                            className="relative z-10 p-1 flex items-center justify-center group cursor-pointer"
                          >
                            <span
                              className={`rounded-full transition-all duration-200 block ${
                                isStageActive
                                  ? 'w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-slate-900 ring-2 ring-blue-500/50 shadow-xs scale-110'
                                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-slate-500 dark:group-hover:bg-slate-400 group-hover:scale-125'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={tab.id} className="space-y-1">
                {/* Parent WorkPaper Button */}
                <button
                  onClick={() => {
                    if (currentTab !== 'CHECKLIST') {
                      setCurrentTab('CHECKLIST');
                    }
                    setIsWorkPaperExpanded(prev => !prev);
                  }}
                  className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isWorkPaperActive
                      ? 'text-slate-950 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isWorkPaperActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {isWorkPaperExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Collapsible Sub-Menu for 6 Stages */}
                {isWorkPaperExpanded && (
                  <div className="relative border-l border-slate-200 dark:border-slate-800 ml-5 my-1.5 pl-3 space-y-1">
                    {STAGE_METADATA.map((stage) => {
                      const isStageActive = currentTab === 'CHECKLIST' && activeStage === stage.id;

                      return (
                        <button
                          key={stage.id}
                          onClick={() => {
                            setCurrentTab('CHECKLIST');
                            setActiveStage(stage.id);
                            setIsSidebarOpen(false); // Close mobile drawer
                          }}
                          className={`group relative w-full flex items-center py-1.5 pl-2.5 pr-2 rounded-md text-[11px] transition-all cursor-pointer ${
                            isStageActive
                              ? 'text-slate-950 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {/* Bullet dot positioned directly on the vertical line */}
                          <span
                            className={`absolute -left-[16px] top-1/2 -translate-y-1/2 rounded-full transition-all ${
                              isStageActive
                                ? 'w-2.5 h-2.5 -left-[17px] bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 ring-2 ring-slate-200 dark:ring-slate-700 shadow-2xs'
                                : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-slate-400 dark:group-hover:bg-slate-500'
                            }`}
                          />

                          <span className="truncate text-left">{stage.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (tab.id === 'CAPA') {
            const isCapaActive = currentTab === 'CAPA';

            const capaStatuses: Array<{
              id: CapaStatusFilter;
              label: string;
              dotBg: string;
            }> = [
              { id: 'OPEN', label: 'Terbuka', dotBg: 'bg-rose-600' },
              { id: 'IN_PROGRESS', label: 'Dikerjakan', dotBg: 'bg-orange-500' },
              { id: 'RESOLVED', label: 'Selesai', dotBg: 'bg-blue-600' },
              { id: 'VERIFIED', label: 'Terverifikasi', dotBg: 'bg-emerald-600' },
            ];

            if (isSidebarCollapsed) {
              return (
                <div key={tab.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (currentTab !== 'CAPA') {
                        setCurrentTab('CAPA');
                      }
                      if (setIsCapaExpanded) {
                        setIsCapaExpanded(prev => !prev);
                      }
                    }}
                    title={`CAPA Tracker (${auditSession.capaList.length} Rencana Koreksi)`}
                    className={`group relative flex items-center justify-center w-full p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isCapaActive
                        ? 'text-slate-950 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isCapaActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    {isCapaActive && (
                      <span className="absolute right-1.5 top-1.5 w-2 h-2 rounded-full bg-slate-900 dark:bg-white ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>

                  {/* Compact CAPA Status Bullets with Vertical Line */}
                  {isCapaExpanded && (
                    <div className="relative flex flex-col items-center py-1.5 space-y-2">
                      <div className="absolute top-1 bottom-1 w-[1.5px] bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                      {capaStatuses.map((stat) => {
                        const isStatusActive = currentTab === 'CAPA' && capaStatusFilter === stat.id;
                        return (
                          <button
                            key={stat.id}
                            type="button"
                            onClick={() => {
                              setCurrentTab('CAPA');
                              if (setCapaStatusFilter) {
                                if (currentTab === 'CAPA' && capaStatusFilter === stat.id) {
                                  setCapaStatusFilter('ALL');
                                } else {
                                  setCapaStatusFilter(stat.id);
                                }
                              }
                              setIsSidebarOpen(false);
                            }}
                            title={`Status: ${stat.label}`}
                            aria-label={`Status: ${stat.label}`}
                            className="relative z-10 p-1 flex items-center justify-center group cursor-pointer"
                          >
                            <span
                              className={`rounded-full transition-all duration-200 block ${
                                isStatusActive
                                  ? `w-2.5 h-2.5 ${stat.dotBg} border-2 border-white dark:border-slate-900 ring-2 ring-slate-400/50 dark:ring-slate-500 shadow-xs scale-110`
                                  : `w-2 h-2 ${stat.dotBg} opacity-60 border-2 border-white dark:border-slate-900 group-hover:opacity-100 group-hover:scale-125`
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={tab.id} className="space-y-1">
                {/* Parent CAPA Tracker Button */}
                <button
                  onClick={() => {
                    if (currentTab !== 'CAPA') {
                      setCurrentTab('CAPA');
                    }
                    if (setIsCapaExpanded) {
                      setIsCapaExpanded(prev => !prev);
                    }
                  }}
                  className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isCapaActive
                      ? 'text-slate-950 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isCapaActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {isCapaExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Collapsible Sub-Menu for 4 CAPA Statuses */}
                {isCapaExpanded && (
                  <div className="relative border-l border-slate-200 dark:border-slate-800 ml-5 my-1.5 pl-3 space-y-1">
                    {capaStatuses.map((stat) => {
                      const isStatusActive = currentTab === 'CAPA' && capaStatusFilter === stat.id;

                      return (
                        <button
                          key={stat.id}
                          onClick={() => {
                            if (currentTab !== 'CAPA') {
                              setCurrentTab('CAPA');
                            }
                            if (setCapaStatusFilter) {
                              if (currentTab === 'CAPA' && capaStatusFilter === stat.id) {
                                setCapaStatusFilter('ALL');
                              } else {
                                setCapaStatusFilter(stat.id);
                              }
                            }
                            setIsSidebarOpen(false); // Close mobile drawer
                          }}
                          className={`group relative w-full flex items-center py-1.5 pl-2.5 pr-2 rounded-md text-[11px] transition-all cursor-pointer ${
                            isStatusActive
                              ? 'text-slate-950 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {/* Bullet dot positioned directly on the vertical line */}
                          <span
                            className={`absolute -left-[16px] top-1/2 -translate-y-1/2 rounded-full transition-all ${
                              isStatusActive
                                ? `w-2.5 h-2.5 -left-[17px] ${stat.dotBg} border-2 border-white dark:border-slate-900 ring-2 ring-slate-200 dark:ring-slate-700 shadow-2xs`
                                : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-slate-400 dark:group-hover:bg-slate-500'
                            }`}
                          />

                          <span className="truncate text-left">{stat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (tab.id === 'REGULATIONS') {
            const isRegActive = currentTab === 'REGULATIONS';

            const regulationSections: Array<{
              id: 'LAW_ISO' | 'COMPARISON' | 'LEGAL_QA';
              label: string;
            }> = [
              { id: 'LAW_ISO', label: 'Hukum & Standar ISO' },
              { id: 'COMPARISON', label: 'Komparasi Yuridis' },
              { id: 'LEGAL_QA', label: 'Tanya Hukum' },
            ];

            if (isSidebarCollapsed) {
              return (
                <div key={tab.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (currentTab !== 'REGULATIONS') {
                        setCurrentTab('REGULATIONS');
                      }
                      if (setIsRegulationsExpanded) {
                        setIsRegulationsExpanded(prev => !prev);
                      }
                    }}
                    title="Matriks Regulasi & Standar ISO (23 Klausul)"
                    className={`group relative flex items-center justify-center w-full p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isRegActive
                        ? 'text-slate-950 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isRegActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    {isRegActive && (
                      <span className="absolute right-1.5 top-1.5 w-2 h-2 rounded-full bg-slate-900 dark:bg-white ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>

                  {/* Compact Regulation Bullets with Vertical Line */}
                  {isRegulationsExpanded && (
                    <div className="relative flex flex-col items-center py-1.5 space-y-2">
                      <div className="absolute top-1 bottom-1 w-[1.5px] bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                      {regulationSections.map((sec) => {
                        const isSubActive = currentTab === 'REGULATIONS' && regulationSubTab === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setCurrentTab('REGULATIONS');
                              if (setRegulationSubTab) setRegulationSubTab(sec.id);
                              setIsSidebarOpen(false);
                            }}
                            title={sec.label}
                            aria-label={sec.label}
                            className="relative z-10 p-1 flex items-center justify-center group cursor-pointer"
                          >
                            <span
                              className={`rounded-full transition-all duration-200 block ${
                                isSubActive
                                  ? 'w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-slate-900 ring-2 ring-blue-500/50 shadow-xs scale-110'
                                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-slate-500 dark:group-hover:bg-slate-400 group-hover:scale-125'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={tab.id} className="space-y-1">
                {/* Parent Matriks Regulasi Button */}
                <button
                  onClick={() => {
                    if (currentTab !== 'REGULATIONS') {
                      setCurrentTab('REGULATIONS');
                    }
                    if (setIsRegulationsExpanded) {
                      setIsRegulationsExpanded(prev => !prev);
                    }
                  }}
                  className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isRegActive
                      ? 'text-slate-950 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isRegActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {isRegulationsExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>

                {/* Collapsible Sub-Menu for 3 Regulation Sections */}
                {isRegulationsExpanded && (
                  <div className="relative border-l border-slate-200 dark:border-slate-800 ml-5 my-1.5 pl-3 space-y-1">
                    {regulationSections.map((sec) => {
                      const isSubActive = currentTab === 'REGULATIONS' && regulationSubTab === sec.id;

                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setCurrentTab('REGULATIONS');
                            if (setRegulationSubTab) {
                              setRegulationSubTab(sec.id);
                            }
                            setIsSidebarOpen(false); // Close mobile drawer
                          }}
                          className={`group relative w-full flex items-center py-1.5 pl-2.5 pr-2 rounded-md text-[11px] transition-all cursor-pointer ${
                            isSubActive
                              ? 'text-slate-950 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {/* Bullet dot positioned directly on the vertical line */}
                          <span
                            className={`absolute -left-[16px] top-1/2 -translate-y-1/2 rounded-full transition-all ${
                              isSubActive
                                ? 'w-2.5 h-2.5 -left-[17px] bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 ring-2 ring-slate-200 dark:ring-slate-700 shadow-2xs'
                                : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-slate-400 dark:group-hover:bg-slate-500'
                            }`}
                          />

                          <span className="truncate text-left">{sec.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (isSidebarCollapsed) {
            // Compact icon-only button
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                title={tab.label}
                className={`group relative flex items-center justify-center w-full p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'text-slate-950 dark:text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                {isActive && (
                  <span className="absolute right-1.5 top-1.5 w-2 h-2 rounded-full bg-slate-900 dark:bg-white ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                setIsSidebarOpen(false); // Close drawer on mobile selection
              }}
              className={`group w-full flex items-center px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                isActive
                  ? 'text-slate-950 dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                <span>{tab.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* PWA In-App Install Callout */}
      {!isSidebarCollapsed && (
        <div className="px-3 pb-2 pt-1 shrink-0">
          <PWAInstallButton />
        </div>
      )}

      {/* Sticky Role & Theme Toggle Footer at Bottom */}
      <div 
        className={`p-3 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center transition-all ${
          isSidebarCollapsed ? 'md:justify-center justify-between' : 'justify-between'
        }`}
      >
        {isSidebarCollapsed ? (
          <button
            type="button"
            onClick={toggleTheme}
            title={isDarkMode ? "Mode Terang (Light Mode)" : "Mode Gelap (Dark Mode)"}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-2xs cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-500" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-700 dark:text-slate-300" />
            )}
          </button>
        ) : (
          <>
            <div className="flex items-center space-x-2.5 min-w-0 pr-1">
              <User className="w-5 h-5 text-slate-600 dark:text-slate-300 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {auditorName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Role: {auditorRole || 'Lead Auditor'}
                </span>
              </div>
            </div>

            {/* Sun / Moon Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs cursor-pointer shrink-0 flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
