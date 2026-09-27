import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ChecklistItem, RiskLevel } from '../../../types/audit';
import { riskConfig, scopeConfig, periodConfig, getFallbackPeriod } from '../utils';

interface ItemScopeRiskCardsProps {
  item: ChecklistItem;
  disabled?: boolean;
  onUpdateItemDetails: (
    itemId: string, 
    notes: string, 
    evidenceText: string, 
    attachments?: any,
    riskLevel?: RiskLevel,
    auditSteps?: string[],
    verificationCriteria?: string[],
    criterionEvaluations?: any,
    newStatus?: any,
    operationalScope?: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT',
    auditPeriod?: 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE'
  ) => void;
}

export const ItemScopeRiskCards: React.FC<ItemScopeRiskCardsProps> = ({
  item,
  disabled = false,
  onUpdateItemDetails,
}) => {
  const risk = riskConfig[item.riskLevel] || riskConfig.LOW;
  const scope = scopeConfig[item.operationalScope || 'ALL'] || scopeConfig.ALL;
  const activePeriod = getFallbackPeriod(item);
  const period = periodConfig[activePeriod] || periodConfig.MONTHLY;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
      {/* Card 1: Tingkat Risiko */}
      <div className={`relative p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
        disabled 
          ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-not-allowed' 
          : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 group cursor-pointer hover:shadow-xs'
      }`}>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-light text-slate-400 dark:text-slate-400 uppercase tracking-wider">Tingkat Risiko</span>
            </div>
            {!disabled && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />}
          </div>
          <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
            {risk.label}
          </h5>
          <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
            {risk.desc}
          </p>
        </div>
        <select
          disabled={disabled}
          value={item.riskLevel}
          onChange={(e) => {
            const newRisk = e.target.value as RiskLevel;
            onUpdateItemDetails(
              item.id,
              item.notes,
              item.evidenceText,
              item.attachments,
              newRisk,
              item.auditSteps,
              item.verificationCriteria,
              item.criterionEvaluations,
              undefined,
              item.operationalScope,
              item.auditPeriod
            );
          }}
          className={`absolute inset-0 w-full h-full opacity-0 ${disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
          title={disabled ? "Terkunci dalam pengawasan CAPA" : "Ubah Tingkat Risiko"}
        >
          <option value="CRITICAL">Kritis (Critical / Fatal)</option>
          <option value="HIGH">Tinggi (High / Major)</option>
          <option value="MEDIUM">Sedang (Medium / Minor)</option>
          <option value="LOW">Rendah (Low / Observation)</option>
        </select>
      </div>

      {/* Card 2: Scope / Unit */}
      <div className={`relative p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
        disabled 
          ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-not-allowed' 
          : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 group cursor-pointer hover:shadow-xs'
      }`}>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-light text-slate-400 dark:text-slate-400 uppercase tracking-wider">Cakupan</span>
            </div>
            {!disabled && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />}
          </div>
          <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
            {scope.label}
          </h5>
          <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
            {scope.desc}
          </p>
        </div>
        <select
          disabled={disabled}
          value={item.operationalScope || 'ALL'}
          onChange={(e) => {
            const newScope = e.target.value as 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT';
            onUpdateItemDetails(
              item.id,
              item.notes,
              item.evidenceText,
              item.attachments,
              item.riskLevel,
              item.auditSteps,
              item.verificationCriteria,
              item.criterionEvaluations,
              undefined,
              newScope,
              item.auditPeriod
            );
          }}
          className={`absolute inset-0 w-full h-full opacity-0 ${disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
          title={disabled ? "Terkunci dalam pengawasan CAPA" : "Ubah Cakupan"}
        >
          <option value="ALL">Semua Lini Operasional</option>
          <option value="TRANSPORTER">Transporter Sabang-Merauke</option>
          <option value="KARAWANG_PLANT">Plant Karawang (Pengumpul & Pusat)</option>
          <option value="SUKABUMI_PLANT">Plant Sukabumi (Pemanfaat & De-watering)</option>
        </select>
      </div>

      {/* Card 3: Periode Audit */}
      <div className={`relative p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
        disabled 
          ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-not-allowed' 
          : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 group cursor-pointer hover:shadow-xs'
      }`}>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-light text-slate-400 dark:text-slate-400 uppercase tracking-wider">Periode</span>
            </div>
            {!disabled && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />}
          </div>
          <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
            {period.label}
          </h5>
          <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
            {period.desc}
          </p>
        </div>
        <select
          disabled={disabled}
          value={activePeriod}
          onChange={(e) => {
            const newPeriod = e.target.value as 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE';
            onUpdateItemDetails(
              item.id,
              item.notes,
              item.evidenceText,
              item.attachments,
              item.riskLevel,
              item.auditSteps,
              item.verificationCriteria,
              item.criterionEvaluations,
              undefined,
              item.operationalScope,
              newPeriod
            );
          }}
          className={`absolute inset-0 w-full h-full opacity-0 ${disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
          title={disabled ? "Terkunci dalam pengawasan CAPA" : "Ubah Periode"}
        >
          <option value="DAILY">Harian (Daily / Shift)</option>
          <option value="MONTHLY">Bulanan (Monthly Check)</option>
          <option value="QUARTERLY">3 Bulanan (Quarterly Review)</option>
          <option value="ANNUAL">Tahunan (Annual Audit)</option>
          <option value="ONCE">Sekali Saja (Onboarding / Initial)</option>
        </select>
      </div>
    </div>
  );
};
