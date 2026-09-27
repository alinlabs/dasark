import React from 'react';
import { 
  Gavel, 
  Globe2, 
  RefreshCw,
  Scale,
  MessageSquare
} from 'lucide-react';
import { RegulationSubTab } from '../types';
import { REGULATORY_DATABASE } from '../../../data/regulationsDatabase';
import { EXPERT_REGULATORY_KNOWLEDGE } from '../data/expertKnowledge';

interface RegulationsHeaderProps {
  activeSubTab: RegulationSubTab;
  onSelectSubTab: (subTab: RegulationSubTab) => void;
  onRunDeterministicEvaluation?: () => void;
  isEvaluating?: boolean;
}

export const RegulationsHeader: React.FC<RegulationsHeaderProps> = ({
  activeSubTab,
  onSelectSubTab,
  onRunDeterministicEvaluation,
  isEvaluating = false,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Header Banner - Clean, Pure White, Humanist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <Gavel className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Matriks Regulasi & Kepatuhan K3 PT. Dame Alam Sejahtera</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pusat Regulasi & Basis Hukum K3
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Kompilasi regulasi ketenagakerjaan RI, standar internasional (ISO 45001, ISO 14001, ISO 9001, ISO 19011), matriks komparasi yuridis PKWT vs PKWTT vs Alih Daya, serta basis pengetahuan tanya jawab hukum operasional.
          </p>
        </div>

        {onRunDeterministicEvaluation && (
          <button
            onClick={onRunDeterministicEvaluation}
            disabled={isEvaluating}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50 shrink-0 self-start md:self-auto justify-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
            <span>{isEvaluating ? 'Mengevaluasi Kepatuhan...' : 'Evaluasi Kepatuhan Otomatis'}</span>
          </button>
        )}
      </div>

      {/* Navigation Sub-Tabs Switcher - Clean & High Contrast */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <button
          onClick={() => onSelectSubTab('LAW_ISO')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'LAW_ISO'
              ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span>Hukum & Standar ISO ({REGULATORY_DATABASE.length})</span>
        </button>

        <button
          onClick={() => onSelectSubTab('COMPARISON')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'COMPARISON'
              ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Komparasi PKWT, PKWTT & Alih Daya</span>
        </button>

        <button
          onClick={() => onSelectSubTab('LEGAL_QA')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'LEGAL_QA'
              ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Tanya Hukum ({EXPERT_REGULATORY_KNOWLEDGE.length})</span>
        </button>
      </div>
    </div>
  );
};
