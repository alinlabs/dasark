import React, { useState, useEffect } from 'react';
import { RegulatoryContainerProps, RegulationSubTab } from './types';
import { RegulationsHeader } from './components/RegulationsHeader';
import { RegulationsLawIsoPage } from './components/RegulationsLawIsoPage';
import { RegulationsComparisonPage } from './components/RegulationsComparisonPage';
import { RegulationsLegalQaPage } from './components/RegulationsLegalQaPage';

export const RegulatoryContainer: React.FC<RegulatoryContainerProps> = ({
  auditSession,
  activeSubTab = 'LAW_ISO',
  onSelectSubTab,
  onRunDeterministicEvaluation,
  isEvaluating = false,
  onSelectLawForChecklist,
}) => {
  const [subTab, setSubTab] = useState<RegulationSubTab>(activeSubTab);

  useEffect(() => {
    if (activeSubTab) {
      setSubTab(activeSubTab);
    }
  }, [activeSubTab]);

  // Reset scroll when switching sub-tabs
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [subTab]);

  const handleSelectSubTab = (newTab: RegulationSubTab) => {
    setSubTab(newTab);
    if (onSelectSubTab) {
      onSelectSubTab(newTab);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header & Clean Sub-Tab Switcher */}
      <RegulationsHeader
        activeSubTab={subTab}
        onSelectSubTab={handleSelectSubTab}
        onRunDeterministicEvaluation={onRunDeterministicEvaluation}
        isEvaluating={isEvaluating}
      />

      {/* Dynamic Sub-Tab Content */}
      {subTab === 'LAW_ISO' && (
        <RegulationsLawIsoPage
          onRunDeterministicEvaluation={onRunDeterministicEvaluation}
          isEvaluating={isEvaluating}
          onSelectLawForChecklist={onSelectLawForChecklist}
        />
      )}

      {subTab === 'COMPARISON' && (
        <RegulationsComparisonPage
          auditSession={auditSession}
        />
      )}

      {subTab === 'LEGAL_QA' && (
        <RegulationsLegalQaPage
          auditSession={auditSession}
        />
      )}
    </div>
  );
};
