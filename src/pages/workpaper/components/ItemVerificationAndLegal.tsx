import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ChecklistItem } from '../../../types/audit';

interface ItemVerificationAndLegalProps {
  item: ChecklistItem;
  isExpanded: boolean;
  onToggleBothAccordions: (itemId: string) => void;
}

export const ItemVerificationAndLegal: React.FC<ItemVerificationAndLegalProps> = ({
  item,
  isExpanded,
  onToggleBothAccordions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Column 1: Langkah Verifikasi Card (Accordion) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-lg p-3 border border-slate-200 dark:border-slate-700/80 transition-all">
        <div 
          onClick={() => onToggleBothAccordions(item.id)}
          className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none group/hdr transition"
          title="Klik untuk menyembunyikan/menampilkan detail Langkah Verifikasi & Dasar Hukum"
        >
          <span>Langkah Verifikasi</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-600 dark:text-slate-200' : ''}`} />
        </div>
        {isExpanded && (
          <div className="mt-1.5 animate-fadeIn">
            {item.auditSteps && item.auditSteps.length > 0 ? (
              <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                {item.auditSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-slate-950 dark:text-white shrink-0 min-w-[16px]">{idx + 1}.</span>
                    <span className="leading-relaxed flex-1">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">Belum ada langkah audit khusus yang dicatat.</p>
            )}
          </div>
        )}
      </div>

      {/* Column 2: Dasar Hukum & Hirarki Peraturan Card (Accordion) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-lg p-3 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-200 transition-all">
        <div 
          onClick={() => onToggleBothAccordions(item.id)}
          className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none group/hdr transition"
          title="Klik untuk menyembunyikan/menampilkan detail Langkah Verifikasi & Dasar Hukum"
        >
          <span>Dasar Hukum</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-600 dark:text-slate-200' : ''}`} />
        </div>
        
        {isExpanded && (
          <div className="mt-1.5 space-y-2 animate-fadeIn">
            {(() => {
              const legalList: string[] = [];
              if (item.legalHierarchy) {
                if (item.legalHierarchy.primaryLaw?.trim()) legalList.push(item.legalHierarchy.primaryLaw.trim());
                if (item.legalHierarchy.governmentReg?.trim()) legalList.push(item.legalHierarchy.governmentReg.trim());
                if (item.legalHierarchy.ministerialReg?.trim()) legalList.push(item.legalHierarchy.ministerialReg.trim());
              }
              if (item.legalBasis) {
                item.legalBasis
                  .split(/(?:;|\n|\|)/)
                  .map(s => s.trim())
                  .filter(s => s.length > 0)
                  .forEach(s => {
                    if (!legalList.includes(s)) legalList.push(s);
                  });
              }

              return (
                <>
                  {legalList.length > 0 ? (
                    <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      {legalList.map((law, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0 mt-0.5">•</span>
                          <span className="flex-1">{law}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    !item.legalSanction && (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">Belum ada dasar hukum yang dicatat.</p>
                    )
                  )}

                  {item.legalSanction && (
                    <div className="bg-rose-50/50 dark:bg-rose-950/40 rounded-lg p-2 border border-rose-100/80 dark:border-rose-900/60 text-[11px] text-rose-800 dark:text-rose-200 w-full mt-1">
                      <span className="font-bold text-rose-900 dark:text-rose-100">Konsekuensi Hukum / Sanksi:</span> {item.legalSanction}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
