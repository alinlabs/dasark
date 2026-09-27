import React from 'react';
import { Pencil, Printer, Trash2, Wrench } from 'lucide-react';
import { ChecklistItem, ComplianceStatus, RiskLevel, AuditEvidenceAttachment, CriterionEvaluation, LegalHierarchy, CAPAItem } from '../../../types/audit';
import { headStyleMap, formatLastUpdatedIndonesian } from '../utils';
import { ItemScopeRiskCards } from './ItemScopeRiskCards';
import { ItemVerificationAndLegal } from './ItemVerificationAndLegal';
import { ItemCriteriaEvaluations } from './ItemCriteriaEvaluations';
import { AutoResizeTextarea } from '../../../components/AutoResizeTextarea';
import { EvidenceAttachmentPicker } from '../../../components/EvidenceAttachmentPicker';

interface WorkPaperCardProps {
  item: ChecklistItem;
  hasCapa: boolean;
  capaItem?: CAPAItem;
  isBothExpanded: boolean;
  isCriteriaExpanded: boolean;
  onToggleBothAccordions: (itemId: string) => void;
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
  onUpdateItemDetails: (
    itemId: string, 
    notes: string, 
    evidenceText: string, 
    attachments?: AuditEvidenceAttachment[],
    riskLevel?: RiskLevel,
    auditSteps?: string[],
    verificationCriteria?: string[],
    criterionEvaluations?: CriterionEvaluation[],
    newStatus?: ComplianceStatus,
    operationalScope?: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT',
    auditPeriod?: 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE',
    legalHierarchy?: LegalHierarchy,
    legalSanction?: string
  ) => void;
  onUpdateItemAttachments?: (itemId: string, attachments: AuditEvidenceAttachment[]) => void;
  onGenerateCapaForItem: (item: ChecklistItem) => void;
  onEditItem?: (item: ChecklistItem) => void;
  onDeleteItem?: (itemId: string) => void;
  onPrintCard?: (item: ChecklistItem) => void;
  onPrintReport?: () => void;
  onNavigateToTab?: (tab: 'DASHBOARD' | 'CHECKLIST' | 'CAPA' | 'REGULATIONS' | 'REPORT' | 'GLOSSARY') => void;
}

export const WorkPaperCard: React.FC<WorkPaperCardProps> = ({
  item,
  hasCapa,
  capaItem,
  isBothExpanded,
  isCriteriaExpanded,
  onToggleBothAccordions,
  onToggleCriteriaAccordion,
  onToggleCriterionStatus,
  onUpdateCriterionNote,
  onUpdateItemDetails,
  onUpdateItemAttachments,
  onGenerateCapaForItem,
  onEditItem,
  onDeleteItem,
  onPrintCard,
  onPrintReport,
  onNavigateToTab,
}) => {
  const isCapaVerified = capaItem?.status === 'VERIFIED';
  const isCapaResolved = capaItem?.status === 'RESOLVED' || isCapaVerified;
  const isUnderCapaSupervision = Boolean(capaItem && !isCapaResolved);
  const effectiveStatus: ComplianceStatus = isCapaVerified ? 'COMPLIANT' : item.status;
  const headStyle = headStyleMap[effectiveStatus] || headStyleMap.UNCHECKED;

  // Evaluation completeness checks
  const totalCriteria = item.verificationCriteria?.length || 0;
  const evaluatedCriteriaCount = item.criterionEvaluations?.filter(
    e => e.status === 'COMPLIANT' || e.status === 'NON_COMPLIANT'
  ).length || 0;

  // Bottom button ONLY appears if all compliance criteria are evaluated
  const areAllCriteriaFilled = totalCriteria > 0
    ? (evaluatedCriteriaCount === totalCriteria)
    : (item.status !== 'UNCHECKED');

  // Check if any criterion is non-compliant or item itself is marked NC
  const hasNonCompliantCriterion = !isCapaVerified && (
    Boolean(item.criterionEvaluations?.some(e => e.status === 'NON_COMPLIANT')) ||
    item.status === 'MINOR_NC' ||
    item.status === 'MAJOR_NC' ||
    item.status === 'CRITICAL_HAZARD'
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-xs overflow-hidden">
      {/* Item Card Colored Header (Scope Line 1 & Primary Title Line 2 with Action Icons) - GRADIENT & SHIMMER */}
      <div className={`group/cardheader relative overflow-hidden ${headStyle.bg} px-5 py-3.5 border-b border-black/5 flex items-start justify-between gap-4 transition-all duration-300`}>
        {/* Shimmer Light Sweep on Hover */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover/cardheader:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

        <div className="relative z-10 space-y-1 flex-1 min-w-0">
          <p className={`text-[11px] font-semibold leading-normal ${headStyle.subText}`}>
            {item.category}
          </p>
          <h4 className={`text-sm font-extrabold leading-snug ${headStyle.titleText}`}>
            {item.title}
          </h4>
          
          <p className={`text-[10px] font-medium leading-normal ${headStyle.subText}`}>
            {formatLastUpdatedIndonesian(item.lastUpdated)}
          </p>
        </div>

        {/* Header Action Icons: Edit Full Form | Print | Trash */}
        <div className="relative z-10 flex items-center space-x-1 shrink-0 text-white/80 pt-0.5">
          {onEditItem && (
            <button
              type="button"
              disabled={isUnderCapaSupervision}
              onClick={(e) => {
                e.stopPropagation();
                if (isUnderCapaSupervision) return;
                onEditItem(item);
              }}
              className={`p-1.5 rounded-lg transition ${
                isUnderCapaSupervision
                  ? 'opacity-40 cursor-not-allowed text-white/50'
                  : 'hover:bg-white/20 hover:text-white cursor-pointer'
              }`}
              title={
                isUnderCapaSupervision
                  ? "Terkunci: Klausul ini sedang dalam pengawasan CAPA. Tidak dapat diubah di sini sampai selesai di CAPA."
                  : "Edit Klausul & Form Lengkap (Full Page)"
              }
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onPrintCard) {
                onPrintCard(item);
              } else {
                window.print();
              }
            }}
            className="p-1.5 hover:bg-white/20 hover:text-white rounded-lg transition cursor-pointer"
            title="Cetak / Print Detail WorkPaper Ini"
          >
            <Printer className="w-4 h-4" />
          </button>
          {onDeleteItem && (
            <button
              type="button"
              disabled={isUnderCapaSupervision}
              onClick={(e) => {
                e.stopPropagation();
                if (isUnderCapaSupervision) return;
                if (confirm(`Hapus workpaper "${item.title}"?`)) {
                  onDeleteItem(item.id);
                }
              }}
              className={`p-1.5 rounded-lg transition ${
                isUnderCapaSupervision
                  ? 'opacity-40 cursor-not-allowed text-white/50'
                  : 'hover:bg-white/20 hover:text-white cursor-pointer'
              }`}
              title={
                isUnderCapaSupervision
                  ? "Klausul ini tidak dapat dihapus saat dalam pengawasan CAPA."
                  : "Hapus WorkPaper"
              }
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* CAPA Supervision Info Card (Inset with top margin, side padding, soft amber fill & clear outline) */}
      {isUnderCapaSupervision && (
        <div className="px-5 pt-4 pb-1">
          <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 border border-amber-200 dark:border-amber-700/60 shrink-0">
                <Wrench className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              </div>
              <span className="font-bold text-amber-950 dark:text-amber-200 leading-snug">
                Klausul ini sedang dalam pengawasan aktif Corrective &amp; Preventive Action (CAPA).
              </span>
            </div>
            {onNavigateToTab && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTab('CAPA');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-extrabold transition cursor-pointer shrink-0 self-start sm:self-auto shadow-2xs"
              >
                Buka Modul CAPA
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Card Body - Grayscale & reduced opacity when under CAPA supervision */}
      <div className={`p-5 transition-all duration-200 ${
        isUnderCapaSupervision
          ? 'grayscale saturate-0 opacity-50 select-none'
          : ''
      }`}>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Scope & Risk Cards Grid (Disabled during CAPA supervision) */}
        <ItemScopeRiskCards
          item={item}
          disabled={isUnderCapaSupervision}
          onUpdateItemDetails={onUpdateItemDetails}
        />

        {/* Layout Container: 2-Column Grid (Langkah Audit & Dasar Hukum) and Full-Width (Kriteria Kelulusan) */}
        <div className="space-y-3 mb-3">
          {/* Top Row: Langkah Audit & Dasar Hukum Side-by-Side (Synchronized Accordions) */}
          <ItemVerificationAndLegal
            item={item}
            isExpanded={isBothExpanded}
            onToggleBothAccordions={onToggleBothAccordions}
          />

          {/* Bottom Row: Full-Width Kriteria Kelulusan (Interactive Per-Criterion Evaluation, disabled during CAPA supervision) */}
          <ItemCriteriaEvaluations
            item={item}
            disabled={isUnderCapaSupervision}
            isExpanded={isCriteriaExpanded}
            onToggleCriteriaAccordion={onToggleCriteriaAccordion}
            onToggleCriterionStatus={onToggleCriterionStatus}
            onUpdateCriterionNote={onUpdateCriterionNote}
          />
        </div>

        {/* Notes, Evidence & Physical File Attachments Section - Direct Clean Flow */}
        <div className="space-y-3 mb-3 text-xs">
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1 text-[11px]">
              Catatan Auditor
            </label>
            <AutoResizeTextarea
              minRows={1}
              disabled={isUnderCapaSupervision}
              value={item.notes || ''}
              onChange={(e) => {
                if (isUnderCapaSupervision) return;
                onUpdateItemDetails(
                  item.id,
                  e.target.value,
                  item.evidenceText || '',
                  item.attachments,
                  item.riskLevel,
                  item.auditSteps,
                  item.verificationCriteria,
                  item.criterionEvaluations,
                  item.status
                );
              }}
              placeholder="Ketik ringkasan umum hasil inspeksi atau catatan observasi lapangan di sini..."
              className={`w-full px-3 py-1.5 rounded-lg text-xs leading-normal transition bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-slate-400 ${
                isUnderCapaSupervision ? 'cursor-not-allowed bg-slate-100 dark:bg-slate-800/60' : ''
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1 text-[11px]">
              Daftar Dokumen Lain <span className="font-normal text-slate-500 dark:text-slate-400">(yang tidak dapat dilampirkan)</span>
            </label>
            <input
              type="text"
              disabled={isUnderCapaSupervision}
              value={item.evidenceText || ''}
              onChange={(e) => {
                if (isUnderCapaSupervision) return;
                onUpdateItemDetails(
                  item.id,
                  item.notes || '',
                  e.target.value,
                  item.attachments,
                  item.riskLevel,
                  item.auditSteps,
                  item.verificationCriteria,
                  item.criterionEvaluations,
                  item.status
                );
              }}
              placeholder="Contoh: Pasal 285 UU PPLH, Berkas Arsip Fisik Besar, Database Sertifikasi Driver..."
              className={`w-full px-3 py-1.5 rounded-lg text-xs leading-normal font-sans transition bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-slate-400 ${
                isUnderCapaSupervision ? 'cursor-not-allowed bg-slate-100 dark:bg-slate-800/60' : ''
              }`}
            />
          </div>

          {/* Physical Evidence Attachment Picker & Lightbox Gallery */}
          <div>
            <EvidenceAttachmentPicker
              readOnly={isUnderCapaSupervision}
              attachments={item.attachments || []}
              onUpdateAttachments={(atts) => {
                if (isUnderCapaSupervision) return;
                if (onUpdateItemAttachments) {
                  onUpdateItemAttachments(item.id, atts);
                } else {
                  onUpdateItemDetails(item.id, item.notes, item.evidenceText, atts);
                }
              }}
              clauseCode={item.code}
              clauseTitle={item.title}
              defaultLocation={
                item.operationalScope === 'KARAWANG_PLANT' ? 'TPS Karawang Barat' :
                item.operationalScope === 'SUKABUMI_PLANT' ? 'Plant Sukabumi' :
                item.operationalScope === 'TRANSPORTER' ? 'Armada Transporter DAS' : 'Fasilitas DAS Group'
              }
            />
          </div>
        </div>

        {/* Bottom Action: Only rendered when ALL compliance criteria are filled and not under CAPA */}
        {areAllCriteriaFilled && !isUnderCapaSupervision && (
          <div className="pt-3 mt-1 border-t border-slate-100 dark:border-slate-800 w-full">
            {hasNonCompliantCriterion ? (
              <button
                type="button"
                onClick={() => onGenerateCapaForItem(item)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-white shadow-2xs hover:opacity-90 ${headStyle.bg || 'bg-rose-600 hover:bg-rose-700'}`}
              >
                <Wrench className="w-4 h-4 shrink-0" />
                <span>{hasCapa ? 'Buka Modul CAPA' : 'Buat Tindakan CAPA'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onPrintCard) {
                    onPrintCard(item);
                  } else {
                    onPrintReport?.();
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Simpan &amp; Cetak Laporan Detail</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
