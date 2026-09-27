import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ChecklistItem } from '../../../types/audit';
import { AutoResizeTextarea } from '../../../components/AutoResizeTextarea';

interface ItemCriteriaEvaluationsProps {
  item: ChecklistItem;
  disabled?: boolean;
  isExpanded: boolean;
  onToggleCriteriaAccordion: (itemId: string) => void;
  onToggleCriterionStatus: (
    item: ChecklistItem, 
    criterionIdx: number, 
    newStatus: 'COMPLIANT' | 'NON_COMPLIANT'
  ) => void;
  onUpdateCriterionNote: (
    item: ChecklistItem,
    criterionIdx: number,
    noteText: string
  ) => void;
}

export const ItemCriteriaEvaluations: React.FC<ItemCriteriaEvaluationsProps> = ({
  item,
  disabled = false,
  isExpanded,
  onToggleCriteriaAccordion,
  onToggleCriterionStatus,
  onUpdateCriterionNote,
}) => {
  if (!item.verificationCriteria || item.verificationCriteria.length === 0) {
    return null;
  }

  const evaluatedCount = item.criterionEvaluations?.filter(e => e.status !== 'UNCHECKED').length || 0;
  const compliantCount = item.criterionEvaluations?.filter(e => e.status === 'COMPLIANT').length || 0;
  const nonCompliantCount = item.criterionEvaluations?.filter(e => e.status === 'NON_COMPLIANT').length || 0;

  return (
    <div className="space-y-2.5 w-full pt-1">
      <div 
        onClick={() => onToggleCriteriaAccordion(item.id)}
        className="flex items-center justify-between cursor-pointer select-none group/crit transition"
        title="Klik untuk menyembunyikan/menampilkan kriteria kelulusan"
      >
        <div className="text-[11px] font-bold text-slate-900 dark:text-white transition-colors">
          <span>Kriteria Kepatuhan</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-semibold text-right">
          {evaluatedCount > 0 ? (
            <span className="text-slate-700 dark:text-slate-300">
              Evaluasi Kriteria: <strong className="text-emerald-700 dark:text-emerald-400">{compliantCount} Sesuai</strong>
              {nonCompliantCount > 0 && <>, <strong className="text-rose-700 dark:text-rose-400">{nonCompliantCount} Tidak Sesuai</strong></>}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              {item.verificationCriteria.length} Poin Kriteria
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-600 dark:text-slate-200' : ''}`} />
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 animate-fadeIn pt-1">
          {item.verificationCriteria.map((critText, idx) => {
            const evalItem = item.criterionEvaluations?.find(e => e.criterionIndex === idx) || {
              criterionIndex: idx,
              criterionText: critText,
              status: 'UNCHECKED' as const,
              notes: ''
            };

            const isOk = evalItem.status === 'COMPLIANT';
            const isNc = evalItem.status === 'NON_COMPLIANT';

            return (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  isOk 
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs' :
                  isNc 
                    ? 'bg-rose-600 border-rose-700 text-white shadow-xs' :
                    'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/80 dark:hover:bg-slate-800/90 border-slate-200 hover:border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Text without bullet point */}
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs leading-relaxed ${
                      isOk || isNc ? 'text-white font-medium' : 'text-slate-900 dark:text-slate-100 font-medium'
                    }`}>
                      {critText}
                    </span>
                  </div>

                  {/* Action Buttons: Segmented Tab Style without Icons */}
                  <div className={`inline-flex items-center p-0.5 rounded-lg shrink-0 self-end sm:self-center ${
                    isOk ? 'bg-emerald-700/90 border border-emerald-500/40' :
                    isNc ? 'bg-rose-700/90 border border-rose-500/40' :
                    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs'
                  }`}>
                    {/* Sesuai Tab Button */}
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && onToggleCriterionStatus(item, idx, 'COMPLIANT')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                        disabled
                          ? 'cursor-not-allowed opacity-75'
                          : 'cursor-pointer'
                      } ${
                        isOk
                          ? 'bg-white text-emerald-800 font-bold shadow-xs'
                          : isNc
                          ? 'text-rose-100 hover:text-white hover:bg-rose-600/50'
                          : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title={disabled ? "Terkunci dalam pengawasan CAPA" : "Tandai kriteria ini Sesuai"}
                    >
                      Sesuai
                    </button>

                    {/* Tidak Sesuai Tab Button */}
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && onToggleCriterionStatus(item, idx, 'NON_COMPLIANT')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                        disabled
                          ? 'cursor-not-allowed opacity-75'
                          : 'cursor-pointer'
                      } ${
                        isNc
                          ? 'bg-white text-rose-800 font-bold shadow-xs'
                          : isOk
                          ? 'text-emerald-100 hover:text-white hover:bg-emerald-600/50'
                          : 'text-slate-600 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title={disabled ? "Terkunci dalam pengawasan CAPA" : "Tandai kriteria ini Tidak Sesuai"}
                    >
                      Tidak Sesuai
                    </button>
                  </div>
                </div>

                {/* Input Catatan Temuan jika Tidak Sesuai */}
                {isNc && (
                  <div className="mt-2.5 pt-2 border-t border-rose-400/40">
                    <AutoResizeTextarea
                      minRows={1}
                      disabled={disabled}
                      value={evalItem.notes || ''}
                      onChange={(e) => !disabled && onUpdateCriterionNote(item, idx, e.target.value)}
                      placeholder={disabled ? "Terkunci dalam pengawasan CAPA..." : "Ketik rincian temuan ketidaksesuaian spesifik untuk kriteria ini..."}
                      className={`w-full px-3 py-1.5 text-xs leading-normal rounded-lg placeholder-slate-400 shadow-inner ${
                        disabled
                          ? 'bg-rose-900/40 text-rose-100 border-rose-500/50 cursor-not-allowed'
                          : 'bg-white text-slate-900 border border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-400'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
