import React, { useState, useEffect } from 'react';
import { 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Printer,
  Trash2,
  Image as ImageIcon,
  FileText,
  Video,
  File,
  FileSpreadsheet,
  Upload,
  Eye,
  X,
  Info
} from 'lucide-react';
import { 
  CAPAItem, 
  ChecklistItem,
  AuditEvidenceAttachment, 
  CAPAInvestigationDetail, 
  RequiredEvidenceCriterion, 
  EvidenceFormat 
} from '../../../types/audit';
import { AutoResizeTextarea } from '../../../components/AutoResizeTextarea';
import { 
  evaluateCapaAutoStatus, 
  formatCapaDateTime, 
  formatCapaDateOnly, 
  getCapaLeadTimeAnalysis,
  syncCapaTimestamps 
} from '../../../utils/capaAutoStatus';
import { formatLastUpdatedIndonesian } from '../../workpaper/utils';

interface FloatingInputCardProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const FloatingInputCard: React.FC<FloatingInputCardProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || Boolean(value && value.trim() !== '');

  return (
    <div
      className={`relative bg-white dark:bg-slate-800 border rounded-xl px-3 py-2.5 transition-all duration-200 ${
        isFocused
          ? 'border-slate-400 dark:border-slate-500 ring-0 outline-none'
          : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 ring-0 outline-none'
      }`}
    >
      <label
        className={`absolute left-3 bg-white dark:bg-slate-800 px-1 leading-none transition-all duration-200 pointer-events-none select-none ${
          isFloating
            ? '-top-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase'
            : 'top-3 text-xs text-slate-400 dark:text-slate-500 font-normal'
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isFocused ? placeholder : ''}
        className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 font-medium border-none outline-none focus:outline-none focus:ring-0 pt-0.5"
      />
    </div>
  );
};

interface FloatingTextareaCardProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minRows?: number;
  variant?: 'default' | 'orange';
}

const FloatingTextareaCard: React.FC<FloatingTextareaCardProps> = ({
  label,
  value,
  onChange,
  placeholder,
  minRows = 1,
  variant = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || Boolean(value && value.trim() !== '');

  const borderClass = variant === 'orange'
    ? (isFocused
        ? 'border-orange-500 ring-1 ring-orange-400/20 shadow-xs'
        : 'border-orange-500 hover:border-orange-600 shadow-2xs')
    : (isFocused
        ? 'border-slate-400 dark:border-slate-500 ring-0 outline-none shadow-2xs'
        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 ring-0 outline-none shadow-2xs');

  const labelClass = variant === 'orange'
    ? (isFloating
        ? '-top-2 text-[10px] text-orange-600 dark:text-orange-400 font-bold tracking-wide uppercase'
        : 'top-3 text-xs text-slate-400 dark:text-slate-500 font-normal')
    : (isFloating
        ? '-top-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase'
        : 'top-3 text-xs text-slate-400 dark:text-slate-500 font-normal');

  return (
    <div
      className={`relative bg-white dark:bg-slate-800 border rounded-xl px-3 py-2.5 transition-all duration-200 ${borderClass}`}
    >
      <label
        className={`absolute left-3 bg-white dark:bg-slate-800 px-1 leading-none transition-all duration-200 pointer-events-none select-none z-10 ${labelClass}`}
      >
        {label}
      </label>
      <AutoResizeTextarea
        minRows={minRows}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isFocused ? placeholder : ''}
        className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 font-medium border-none outline-none focus:outline-none focus:ring-0 resize-none leading-normal placeholder:text-slate-400 dark:placeholder:text-slate-500 p-0 m-0 pt-0.5"
        style={{ minHeight: '18px', lineHeight: '1.3' }}
      />
    </div>
  );
};

const getFormatBadge = (format: EvidenceFormat = 'Gambar') => {
  switch (format) {
    case 'Gambar':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: <ImageIcon className="w-3.5 h-3.5" />
      };
    case 'PDF':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        icon: <FileText className="w-3.5 h-3.5" />
      };
    case 'Video':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        icon: <Video className="w-3.5 h-3.5" />
      };
    case 'Word':
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        icon: <File className="w-3.5 h-3.5" />
      };
    case 'PPT':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: <FileSpreadsheet className="w-3.5 h-3.5" />
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        icon: <FileText className="w-3.5 h-3.5" />
      };
  }
};

const getAcceptForFormat = (format: EvidenceFormat = 'Gambar'): string => {
  switch (format) {
    case 'Gambar':
      return 'image/*';
    case 'PDF':
      return 'application/pdf';
    case 'Video':
      return 'video/*';
    case 'Word':
      return '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'PPT':
      return '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
    default:
      return '*/*';
  }
};

const getEvidenceCriteriaList = (capaItem: CAPAItem): RequiredEvidenceCriterion[] => {
  if (capaItem.requiredEvidenceList && capaItem.requiredEvidenceList.length > 0) {
    return capaItem.requiredEvidenceList;
  }
  if (capaItem.requiredEvidence) {
    const rawItems = capaItem.requiredEvidence
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    if (rawItems.length > 0) {
      return rawItems.map((name, idx) => {
        const formatMatch = name.match(/\((Gambar|Video|PDF|Word|PPT)\)/i);
        const cleanName = name.replace(/\((Gambar|Video|PDF|Word|PPT)\)/i, '').trim();
        const format: EvidenceFormat = formatMatch 
          ? (formatMatch[1] as EvidenceFormat)
          : (cleanName.toLowerCase().includes('video') ? 'Video' : cleanName.toLowerCase().includes('pdf') ? 'PDF' : 'Gambar');
        return {
          id: `ev-${idx + 1}`,
          name: cleanName,
          format
        };
      });
    }
  }
  return [
    { id: 'ev-1', name: 'Foto Fisik Perbaikan & Verifikasi Lapangan', format: 'Gambar' }
  ];
};

interface CapaCardProps {
  capa: CAPAItem;
  workPaperItem?: ChecklistItem;
  onUpdateStatus: (capaId: string, status: CAPAItem['status'], resolutionNotes?: string) => void;
  onUpdateAttachments?: (capaId: string, attachments: AuditEvidenceAttachment[]) => void;
  onSaveCapa?: (updatedCapa: CAPAItem) => void;
  onEdit: (capa: CAPAItem) => void;
  onDelete?: (capaId: string) => void;
  onVerifyAsAuditor?: (capaId: string) => void;
  onPrintCard?: (capa: CAPAItem) => void;
}

export const CapaCard: React.FC<CapaCardProps> = ({
  capa,
  workPaperItem,
  onUpdateStatus,
  onUpdateAttachments,
  onSaveCapa,
  onEdit,
  onDelete,
  onVerifyAsAuditor,
  onPrintCard,
}) => {
  // Always expanded by default so 5-Why steps are immediately visible
  const [isWhyExpanded, setIsWhyExpanded] = useState(true);
  const [showTimeRecap, setShowTimeRecap] = useState(false);
  const [openStepDetails, setOpenStepDetails] = useState<Record<number, boolean>>({});
  const [stepDetails, setStepDetails] = useState<Record<number, CAPAInvestigationDetail>>(() => {
    return capa.rootCause5WhyDetails || {};
  });
  const [rootCauseText, setRootCauseText] = useState(capa.rootCause || '');
  const [selectedPreviewAttachment, setSelectedPreviewAttachment] = useState<AuditEvidenceAttachment | null>(null);

  // Synchronize state when capa prop updates
  useEffect(() => {
    setRootCauseText(capa.rootCause || '');
    setStepDetails(capa.rootCause5WhyDetails || {});
  }, [capa.id, capa.rootCause, capa.rootCause5WhyDetails]);

  const evidenceList = getEvidenceCriteriaList(capa);
  const currentAttachments = capa.attachments || [];

  // Re-evaluate automatic status based on:
  // 1. Questions answered with 3 columns (basedOn, answer, by)
  // 2. Root cause conclusion filled
  // 3. Verification evidence documents attached
  const evaluation = evaluateCapaAutoStatus({
    ...capa,
    rootCause: rootCauseText,
    rootCause5WhyDetails: stepDetails,
    attachments: currentAttachments,
    requiredEvidenceList: evidenceList
  });

  const effectiveStatus = evaluation.status;
  const leadTime = getCapaLeadTimeAnalysis(capa);
  const effectiveVerifiedAt = capa.verifiedAt || (effectiveStatus === 'VERIFIED' ? capa.resolvedAt : undefined);

  const handleUploadForCriterion = (
    e: React.ChangeEvent<HTMLInputElement>,
    criterion: RequiredEvidenceCriterion,
    criterionIndex: number
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const isImage = file.type.startsWith('image/');
      const newAtt: AuditEvidenceAttachment = {
        id: `att-${criterion.id || criterionIndex}-${Date.now()}`,
        name: file.name,
        dataUrl,
        type: isImage ? 'PHOTO_INSPECTION' : 'DOCUMENT',
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Auditor',
        caption: criterion.name,
        fileSize: file.size >= 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`
      };

      const filtered = currentAttachments.filter(
        att => att.caption !== criterion.name && att.id !== criterion.id && !att.id.startsWith(`att-${criterion.id || criterionIndex}-`)
      );
      const updatedAttachments = [...filtered, newAtt];

      // Auto evaluate status with newly uploaded attachment
      const nextEval = evaluateCapaAutoStatus({
        ...capa,
        rootCause: rootCauseText,
        rootCause5WhyDetails: stepDetails,
        attachments: updatedAttachments,
        requiredEvidenceList: evidenceList
      });

      const timestampUpdates = syncCapaTimestamps(capa, nextEval.status);

      const updatedCapa: CAPAItem = {
        ...capa,
        ...timestampUpdates,
        attachments: updatedAttachments,
        rootCause: rootCauseText,
        rootCause5WhyDetails: stepDetails,
        status: nextEval.status
      };

      if (onSaveCapa) {
        onSaveCapa(updatedCapa);
      }
      if (onUpdateAttachments) {
        onUpdateAttachments(capa.id, updatedAttachments);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAttachmentForCriterion = (attId: string) => {
    const updatedAttachments = currentAttachments.filter(att => att.id !== attId);

    const nextEval = evaluateCapaAutoStatus({
      ...capa,
      rootCause: rootCauseText,
      rootCause5WhyDetails: stepDetails,
      attachments: updatedAttachments,
      requiredEvidenceList: evidenceList
    });

    const timestampUpdates = syncCapaTimestamps(capa, nextEval.status);

    const updatedCapa: CAPAItem = {
      ...capa,
      ...timestampUpdates,
      attachments: updatedAttachments,
      rootCause: rootCauseText,
      rootCause5WhyDetails: stepDetails,
      status: nextEval.status
    };

    if (onSaveCapa) {
      onSaveCapa(updatedCapa);
    }
    if (onUpdateAttachments) {
      onUpdateAttachments(capa.id, updatedAttachments);
    }
  };

  const toggleStepDetail = (idx: number) => {
    setOpenStepDetails(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleUpdateDetailField = (idx: number, field: keyof CAPAInvestigationDetail, value: string) => {
    const updatedDetails = {
      ...stepDetails,
      [idx]: {
        ...stepDetails[idx],
        [field]: value
      }
    };
    setStepDetails(updatedDetails);

    // Compute automatic status transition & sync lifecycle timestamps
    const nextEval = evaluateCapaAutoStatus({
      ...capa,
      rootCause: rootCauseText,
      rootCause5WhyDetails: updatedDetails,
      attachments: currentAttachments,
      requiredEvidenceList: evidenceList
    });

    const timestampUpdates = syncCapaTimestamps(capa, nextEval.status);

    const updatedCapa: CAPAItem = {
      ...capa,
      ...timestampUpdates,
      rootCause5WhyDetails: updatedDetails,
      rootCause: rootCauseText,
      status: nextEval.status
    };

    if (onSaveCapa) {
      onSaveCapa(updatedCapa);
    }
  };

  const handleUpdateRootCause = (value: string) => {
    setRootCauseText(value);

    // Compute automatic status transition & sync lifecycle timestamps
    const nextEval = evaluateCapaAutoStatus({
      ...capa,
      rootCause: value,
      rootCause5WhyDetails: stepDetails,
      attachments: currentAttachments,
      requiredEvidenceList: evidenceList
    });

    const timestampUpdates = syncCapaTimestamps(capa, nextEval.status);

    const updatedCapa: CAPAItem = {
      ...capa,
      ...timestampUpdates,
      rootCause: value,
      rootCause5WhyDetails: stepDetails,
      status: nextEval.status
    };

    if (onSaveCapa) {
      onSaveCapa(updatedCapa);
    }
  };

  const getStatusHeaderStyle = (status: CAPAItem['status']) => {
    switch (status) {
      case 'VERIFIED':
        return {
          bg: 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-500 text-white',
          statusLabel: 'Terverifikasi Auditor',
          statusBadge: 'bg-emerald-700/80 text-white border-emerald-400/40',
          subText: 'text-emerald-100'
        };
      case 'RESOLVED':
        return {
          bg: 'bg-gradient-to-r from-blue-600 via-blue-600 to-sky-500 text-white',
          statusLabel: 'Selesai (Menunggu Verifikasi Auditor)',
          statusBadge: 'bg-blue-700/80 text-white border-blue-400/40',
          subText: 'text-blue-100'
        };
      case 'IN_PROGRESS':
        return {
          bg: 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white',
          statusLabel: 'Sedang Dikerjakan',
          statusBadge: 'bg-orange-600/80 text-white border-orange-300/40',
          subText: 'text-orange-100'
        };
      case 'OPEN':
      default:
        return {
          bg: 'bg-gradient-to-r from-rose-600 via-rose-600 to-red-500 text-white',
          statusLabel: 'Buka',
          statusBadge: 'bg-rose-700/80 text-white border-rose-400/40',
          subText: 'text-rose-100'
        };
    }
  };

  const getSeverityText = (severity: 'MINOR' | 'MAJOR' | 'CRITICAL') => {
    switch (severity) {
      case 'CRITICAL': return 'Tingkat Kritis';
      case 'MAJOR': return 'Tingkat Mayor';
      case 'MINOR':
      default: return 'Tingkat Minor';
    }
  };

  const statusStyle = getStatusHeaderStyle(effectiveStatus);

  // Parse PIC Name and Position
  const picMatch = capa.pic ? capa.pic.match(/^(.*?)(?:\s*\((.*?)\))?$/) : null;
  const picName = picMatch ? picMatch[1].trim() : (capa.pic || 'Belum Ditentukan');
  const picRole = picMatch && picMatch[2] ? picMatch[2].trim() : 'Penanggung Jawab (PIC)';

  const questions = capa.rootCause5Why || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-2xs overflow-hidden">
      {/* WorkPaper-Style Colored Header Bar with Gradient & Shimmer */}
      <div className={`group/cardheader relative overflow-hidden ${statusStyle.bg} px-5 py-3.5 border-b border-black/5 flex items-start justify-between gap-4 transition-all duration-300`}>
        {/* Shimmer Light Sweep on Hover */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover/cardheader:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

        <div className="relative z-10 space-y-1 flex-1 min-w-0">
          <div className={`text-[11px] font-semibold tracking-wide ${statusStyle.subText}`}>
            {capa.category} • Klausul {capa.findingCode}
          </div>

          <h3 className="text-base font-extrabold leading-snug text-white">
            {capa.findingTitle}
          </h3>
        </div>

        {/* Action Buttons in Header */}
        <div className="relative z-10 flex items-center space-x-1 shrink-0 text-white/80 pt-0.5">
          <button
            type="button"
            onClick={() => onEdit(capa)}
            className="p-1.5 hover:bg-white/20 hover:text-white rounded-lg transition cursor-pointer text-white"
            title="Edit Klausul CAPA (Full Form)"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onPrintCard) {
                onPrintCard(capa);
              } else {
                window.print();
              }
            }}
            className="p-1.5 hover:bg-white/20 hover:text-white rounded-lg transition cursor-pointer text-white"
            title="Cetak / Print Laporan Tindakan Perbaikan (CAPA) Ini"
          >
            <Printer className="w-4 h-4" />
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={() => {
                if (confirm(`Yakin ingin menghapus Rencana CAPA ini?`)) {
                  onDelete(capa.id);
                }
              }}
              className="p-1.5 hover:bg-white/20 hover:text-white rounded-lg transition cursor-pointer text-white"
              title="Hapus CAPA"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-5 space-y-4">
        {/* Row 1: PIC Card | Tingkat & Status Card | Tanggal Lifecycle Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Card 1: PIC */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
            <p className="font-extrabold text-slate-900 dark:text-slate-100 text-xs truncate leading-snug">
              {picName}
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate leading-snug mt-0.5">
              {picRole}
            </p>
          </div>

          {/* Card 2: Tingkat & Status */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center space-y-1">
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
              Tingkat : <span className="font-bold text-slate-900 dark:text-white">{getSeverityText(capa.severity)}</span>
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
              Status : <span className="font-bold text-slate-900 dark:text-white">{statusStyle.statusLabel}</span>
            </p>
          </div>

          {/* Card 3: Tanggal Dibuat & Batas Pengerjaan (2 Lines) + Icon Circle Info (i) */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 min-w-0">
            <div className="flex flex-col justify-center space-y-1 min-w-0 flex-1">
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug truncate">
                Dibuat pada : <span className="font-bold text-slate-900 dark:text-white">{formatCapaDateOnly(capa.createdAt)}</span>
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug truncate">
                Batas Pengerjaan : <span className="font-bold text-slate-900 dark:text-white">{formatCapaDateOnly(capa.dueDate)}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTimeRecap(prev => !prev)}
              className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 ${
                showTimeRecap
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border-slate-200 dark:border-slate-700'
              }`}
              title={showTimeRecap ? 'Sembunyikan Rekap Waktu' : 'Tampilkan Rekap Waktu'}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rekap Durasi & Audit Trail Lead Time Responsivitas PIC - Sembunyi Secara Default, Muncul Saat Klik Icon (i) */}
        {showTimeRecap && (
          <div className="space-y-2 text-xs pt-0.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
                Rekap Waktu &amp; Audit Trail Durasi Pengerjaan CAPA
              </span>

              <button
                type="button"
                onClick={() => setShowTimeRecap(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Tutup rekap waktu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Status Cards: Dibuat | Dikerjakan | Selesai | Verifikasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-0.5">
              {/* Step 1: Dibuat */}
              <div className="p-2.5 bg-white dark:bg-slate-800/90 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Dibuat</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                </div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate" title={formatCapaDateTime(capa.createdAt)}>
                  {formatCapaDateTime(capa.createdAt)}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Temuan audit diterbitkan
                </p>
              </div>

              {/* Step 2: Dikerjakan */}
              <div className="p-2.5 bg-white dark:bg-slate-800/90 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Dikerjakan</span>
                  <span className={`w-2 h-2 rounded-full ${capa.inProgressAt ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                </div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate" title={capa.inProgressAt ? formatCapaDateTime(capa.inProgressAt) : 'Belum Dimulai'}>
                  {capa.inProgressAt ? formatCapaDateTime(capa.inProgressAt) : 'Belum Dimulai'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {capa.inProgressAt ? `Respon PIC: ${leadTime.responseDurationText}` : 'Menunggu PIC notice & mengisi'}
                </p>
              </div>

              {/* Step 3: Selesai */}
              <div className="p-2.5 bg-white dark:bg-slate-800/90 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Selesai</span>
                  <span className={`w-2 h-2 rounded-full ${capa.resolvedAt ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                </div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate" title={capa.resolvedAt ? formatCapaDateTime(capa.resolvedAt) : 'Dalam Proses'}>
                  {capa.resolvedAt ? formatCapaDateTime(capa.resolvedAt) : 'Dalam Proses'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {capa.resolvedAt ? `Waktu pengerjaan: ${leadTime.executionDurationText}` : 'Lengkapi 3 kolom & bukti'}
                </p>
              </div>

              {/* Step 4: Verifikasi */}
              <div className="p-2.5 bg-white dark:bg-slate-800/90 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Verifikasi</span>
                  <span className={`w-2 h-2 rounded-full ${effectiveVerifiedAt ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                </div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate" title={effectiveVerifiedAt ? formatCapaDateTime(effectiveVerifiedAt) : 'Menunggu Verifikasi'}>
                  {effectiveVerifiedAt ? formatCapaDateTime(effectiveVerifiedAt) : 'Menunggu Verifikasi'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {effectiveVerifiedAt ? `Siklus: ${leadTime.totalCycleTimeText}` : 'Lead auditor sign-off'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Investigation Accordion (3 Columns per question: Berdasarkan, Hasil Temuan, Oleh) */}
        {questions.length > 0 && (
          <div className="pt-1">
            <div 
              onClick={() => setIsWhyExpanded(!isWhyExpanded)}
              className="flex items-center justify-between cursor-pointer select-none group/why pb-1.5"
              title="Klik untuk menyembunyikan/menampilkan investigasi akar masalah"
            >
              <div className="text-xs text-slate-800 dark:text-slate-200 group-hover/why:text-slate-900 dark:group-hover/why:text-white font-extrabold transition-colors flex items-center gap-1.5">
                <span>Investigasi Akar Masalah (Metodologi 5-Why)</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>
                  <span className="text-slate-900 dark:text-white font-bold">{evaluation.completedQuestions}/{evaluation.totalQuestions}</span> Terjawab
                </span>
                {isWhyExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/why:text-slate-800 dark:group-hover/why:text-slate-200 transition-colors" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/why:text-slate-800 dark:group-hover/why:text-slate-200 transition-colors" />
                )}
              </div>
            </div>

            {isWhyExpanded && (
              <div className="mt-1 space-y-2.5 text-xs">
                {questions.map((step, idx) => {
                  const cleanStepText = step.replace(/^(Mengapa|Tahap|W)\s*\d+:\s*/i, '').trim();
                  const isOpen = Boolean(openStepDetails[idx]);

                  const currentDetail = stepDetails[idx] || {};
                  const basedOnVal = currentDetail.basedOn || '';
                  const answerVal = currentDetail.answer || '';
                  const byVal = currentDetail.by || '';

                  // Compose basedOn, by, and answer into requested format:
                  const composeInvestigationParagraph = () => {
                    const b = basedOnVal.trim();
                    const a = answerVal.trim();
                    const o = byVal.trim();

                    if (!b && !a && !o) {
                      return 'Belum ada data investigasi. Klik kartu untuk mengisi kolom berdasarkan apa, hasil temuan, dan oleh siapa.';
                    }

                    let intro = '';
                    if (b && o) {
                      intro = `Berdasarkan ${b} yang di lakukan oleh ${o} bahwa terdapat temuan :`;
                    } else if (b) {
                      intro = `Berdasarkan ${b} bahwa terdapat temuan :`;
                    } else if (o) {
                      intro = `Investigasi yang di lakukan oleh ${o} bahwa terdapat temuan :`;
                    } else {
                      intro = `Terdapat temuan :`;
                    }

                    if (a) {
                      return `${intro}\n${a}`;
                    }
                    return intro;
                  };

                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleStepDetail(idx)}
                      className={`p-3.5 bg-white dark:bg-slate-800/90 rounded-xl border transition cursor-pointer group shadow-2xs space-y-2.5 ${
                        isOpen 
                          ? 'border-slate-400 dark:border-slate-600 ring-1 ring-slate-300/40 dark:ring-slate-700/40' 
                          : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {/* Question Row with only dropdown chevron icon */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {cleanStepText}
                          </p>

                          {/* Plain paragraph composed from berdasarkan, temuan, dan oleh */}
                          {!isOpen && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-normal leading-relaxed whitespace-pre-line">
                              {composeInvestigationParagraph()}
                            </p>
                          )}
                        </div>

                        {/* Dropdown Chevron Icon */}
                        <div className="shrink-0 pt-0.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded 3 Floating-Label White Cards: Berdasarkan | Hasil Temuan | Oleh */}
                      {isOpen && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="pt-1 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-in fade-in duration-150 cursor-default"
                        >
                          <FloatingInputCard
                            label="Berdasarkan"
                            value={basedOnVal}
                            onChange={(val) => handleUpdateDetailField(idx, 'basedOn', val)}
                            placeholder="Metode/Sumber (e.g. Wawancara 1-on-1, Observasi)..."
                          />

                          <FloatingInputCard
                            label="Hasil Temuan"
                            value={answerVal}
                            onChange={(val) => handleUpdateDetailField(idx, 'answer', val)}
                            placeholder="Jawaban / hasil temuan penyelidikan..."
                          />

                          <FloatingInputCard
                            label="Oleh"
                            value={byVal}
                            onChange={(val) => handleUpdateDetailField(idx, 'by', val)}
                            placeholder="Nama / PIC Penjawab..."
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Kesimpulan Akar Masalah Floating Input Card */}
                <div className="mt-3.5 pt-1">
                  <FloatingTextareaCard
                    variant="orange"
                    label="Jawaban Kesimpulan Akar Masalah (Root Cause Conclusion)"
                    value={rootCauseText}
                    onChange={(val) => handleUpdateRootCause(val)}
                    placeholder="Tuliskan jawaban kesimpulan akar masalah dari hasil penyelidikan di atas..."
                    minRows={1}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action List (Corrective & Preventive Stacked Vertically) */}
        <div className="flex flex-col gap-3 text-xs">
          {/* Corrective Action: Red outline & Red title */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-rose-950/15 border border-rose-300 dark:border-rose-900/60 shadow-2xs">
            <div className="font-extrabold text-rose-600 dark:text-rose-400 mb-1 text-xs">
              Tindakan Koreksi Langsung (Corrective):
            </div>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-xs">
              {capa.correctiveAction}
            </p>
          </div>

          {/* Preventive Action: Green outline & Green title */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-emerald-950/15 border border-emerald-300 dark:border-emerald-900/60 shadow-2xs">
            <div className="font-extrabold text-emerald-600 dark:text-emerald-400 mb-1 text-xs">
              Tindakan Pencegahan Sistemik (Preventive):
            </div>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-xs">
              {capa.preventiveAction}
            </p>
          </div>
        </div>

        {/* Bukti Verifikasi yang Wajib Dikirim */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center space-x-1.5">
              <span>Upload Bukti Verifikasi (Dokumen Terlampir):</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {currentAttachments.length}/{evidenceList.length} Terlampir
            </span>
          </div>

          <div className="space-y-2">
            {evidenceList.map((criterion, cIdx) => {
              const matchedAttachment = currentAttachments.find(
                (att, aIdx) =>
                  att.caption === criterion.name ||
                  att.id === criterion.id ||
                  att.id.startsWith(`att-${criterion.id || cIdx}-`) ||
                  (currentAttachments.length === 1 && evidenceList.length === 1) ||
                  aIdx === cIdx
              );

              const formatInfo = getFormatBadge(criterion.format);

              return (
                <div key={criterion.id || cIdx} className="flex items-center gap-2">
                  {/* Evidence Card */}
                  <div className="flex-1 p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs flex items-center justify-between gap-3 text-xs">
                    {/* Left info: Icon, Name & Format (Terlampir) plain text */}
                    <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${formatInfo.bg} ${formatInfo.text} border ${formatInfo.border}`}>
                        {formatInfo.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs leading-snug break-words">
                          {criterion.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                          Format : {criterion.format}{matchedAttachment ? ' (Terlampir)' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Right inside card: ONLY Eye icon button if attached, or Upload button if not attached */}
                    <div className="shrink-0 flex items-center">
                      {matchedAttachment ? (
                        matchedAttachment.dataUrl && (
                          <button
                            type="button"
                            onClick={() => setSelectedPreviewAttachment(matchedAttachment)}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                            title="Lihat Bukti"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )
                      ) : (
                        <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200 font-semibold text-xs transition shadow-2xs">
                          <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span>Unggah</span>
                          <input
                            type="file"
                            accept={getAcceptForFormat(criterion.format)}
                            onChange={(e) => handleUploadForCriterion(e, criterion, cIdx)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Outside the card on the right: Delete icon button to remove the uploaded file */}
                  {matchedAttachment && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachmentForCriterion(matchedAttachment.id)}
                      className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition cursor-pointer shrink-0"
                      title="Hapus Bukti Terlampir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for viewing preview attachment if clicked */}
        {selectedPreviewAttachment && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedPreviewAttachment(null)}
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-4 shadow-2xl relative space-y-3 border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedPreviewAttachment.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedPreviewAttachment.caption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreviewAttachment(null)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl p-2">
                {selectedPreviewAttachment.dataUrl.startsWith('data:image/') || selectedPreviewAttachment.dataUrl.startsWith('http') ? (
                  <img
                    src={selectedPreviewAttachment.dataUrl}
                    alt={selectedPreviewAttachment.name}
                    className="max-h-[60vh] object-contain rounded-lg shadow-xs"
                  />
                ) : (
                  <div className="p-8 text-center space-y-3">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{selectedPreviewAttachment.name}</p>
                    <a
                      href={selectedPreviewAttachment.dataUrl}
                      download={selectedPreviewAttachment.name}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                    >
                      <span>Unduh Dokumen</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SECTION: Full-Width Verification Button when resolved, or Verified Banner */}
        {effectiveStatus === 'RESOLVED' && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-3">
            {/* Full-width button: Verifikasi sebagai auditor */}
            <button
              type="button"
              onClick={() => {
                if (onVerifyAsAuditor) {
                  onVerifyAsAuditor(capa.id);
                } else {
                  onUpdateStatus(capa.id, 'VERIFIED');
                }
              }}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center space-x-2 cursor-pointer border border-emerald-500 hover:scale-[1.002] active:scale-[0.998]"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Verifikasi sebagai auditor</span>
            </button>
          </div>
        )}

        {effectiveStatus === 'VERIFIED' && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-3">
            <div className="w-full p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center space-x-3 text-xs shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm">
                  Tuntas Terverifikasi Sebagai Auditor
                </p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  Diverifikasi oleh <span className="font-bold text-emerald-950 dark:text-emerald-100">{capa.verifiedBy || 'Lead Auditor'}</span> pada <span className="font-bold text-emerald-950 dark:text-emerald-100">{formatCapaDateTime(effectiveVerifiedAt)}</span>
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  ✓ Status Work Paper Klausul <strong className="font-bold text-emerald-900 dark:text-emerald-200">{capa.findingCode}</strong> otomatis kembali Compliant ({formatLastUpdatedIndonesian(workPaperItem?.lastUpdated || effectiveVerifiedAt)})
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
