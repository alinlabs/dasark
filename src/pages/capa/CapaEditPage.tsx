import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Sparkles,
  Save,
  ChevronLeft,
  ChevronDown,
  FileText,
  ListOrdered
} from 'lucide-react';
import { CAPAItem, ChecklistItem, AuditEvidenceAttachment, EvidenceFormat, RequiredEvidenceCriterion } from '../../types/audit';
import { AutoResizeTextarea } from '../../components/AutoResizeTextarea';

interface CapaEditPageProps {
  capa: CAPAItem | null; // null for creating new
  initialChecklistItem?: ChecklistItem | null;
  allItems: ChecklistItem[];
  onSave: (savedCapa: CAPAItem) => void;
  onDelete?: (capaId: string) => void;
  onClose?: () => void;
  onCancel?: () => void;
  onRequestAiDraft?: (item: ChecklistItem) => Promise<any>;
  isGeneratingAi?: boolean;
}

const parseTextToList = (rawText: string): string[] => {
  if (!rawText || !rawText.trim()) return [''];
  const lines = rawText.split('\n').map(l => l.replace(/^[\s•\-\d\.]+\s*/, '').trim()).filter(Boolean);
  return lines.length > 0 ? lines : [rawText];
};

const formatListToText = (items: string[]): string => {
  const valid = items.map(i => i.trim()).filter(Boolean);
  if (valid.length === 0) return '';
  if (valid.length === 1) return valid[0];
  return valid.map(i => `• ${i}`).join('\n');
};

export const CapaEditPage: React.FC<CapaEditPageProps> = ({
  capa,
  initialChecklistItem,
  allItems,
  onSave,
  onDelete,
  onClose,
  onRequestAiDraft,
  isGeneratingAi = false
}) => {
  // Pre-fill target checklist item if creating new or editing
  const [selectedItemId, setSelectedItemId] = useState<string>(
    capa?.checklistItemId || initialChecklistItem?.id || (allItems[0]?.id || '')
  );

  const initialLinkedItem = allItems.find(i => i.id === selectedItemId) || initialChecklistItem || allItems[0];

  const [findingCode, setFindingCode] = useState(
    capa?.findingCode || initialLinkedItem?.code || 'NC-01'
  );
  const [findingTitle, setFindingTitle] = useState(
    capa?.findingTitle || initialLinkedItem?.title || ''
  );
  const [category, setCategory] = useState(
    capa?.category || initialLinkedItem?.category || 'Kepatuhan Operasional K3 & Pengelolaan Limbah B3'
  );
  const [severity, setSeverity] = useState<'MINOR' | 'MAJOR' | 'CRITICAL'>(
    capa?.severity || (initialLinkedItem?.status === 'CRITICAL_HAZARD' ? 'CRITICAL' : initialLinkedItem?.status === 'MAJOR_NC' ? 'MAJOR' : 'MINOR')
  );
  const [status, setStatus] = useState<CAPAItem['status']>(
    capa?.status || 'OPEN'
  );

  // 5-Why Analysis Dynamic List
  const [rootCause5Why, setRootCause5Why] = useState<string[]>(() => {
    if (capa?.rootCause5Why && capa.rootCause5Why.length > 0) {
      return [...capa.rootCause5Why];
    }
    return [
      'Pelaksanaan prosedur kerja K3 belum konsisten di area operasional.',
      'Pengawasan harian oleh pengawas shift belum optimal karena beban kerja tinggi.',
      'SOP terbaru belum disosialisasikan secara merata kepada seluruh personil.',
      'Belum ada sistem checklist verifikasi digital sebelum pekerjaan dimulai.',
      'Pemahaman risiko bahaya limbah masih perlu ditingkatkan pada tingkat pelaksana.'
    ];
  });

  const [rootCause, setRootCause] = useState(
    capa?.rootCause || 'Kurangnya pengawasan harian dan belum adanya sistem verifikasi cross-check terstandar.'
  );

  // Corrective Action (Support Descriptive & List Mode)
  const defaultCorrective = capa?.correctiveAction || 'Lakukan perbaikan langsung terhadap temuan di lapangan. Lengkapi bukti fisik dan laporkan kepada Lead Auditor.';
  const [correctiveAction, setCorrectiveAction] = useState(defaultCorrective);
  const [correctiveMode, setCorrectiveMode] = useState<'DESCRIPTIVE' | 'LIST'>(() => {
    return (capa?.correctiveAction && (capa.correctiveAction.includes('\n') || capa.correctiveAction.includes('•'))) ? 'LIST' : 'DESCRIPTIVE';
  });
  const [correctiveList, setCorrectiveList] = useState<string[]>(() => parseTextToList(defaultCorrective));

  // Preventive Action (Support Descriptive & List Mode)
  const defaultPreventive = capa?.preventiveAction || 'Revisi SOP terkait, laksanakan toolbox meeting berkala, dan pasang rambu peringatan keselamatan di lokasi.';
  const [preventiveAction, setPreventiveAction] = useState(defaultPreventive);
  const [preventiveMode, setPreventiveMode] = useState<'DESCRIPTIVE' | 'LIST'>(() => {
    return (capa?.preventiveAction && (capa.preventiveAction.includes('\n') || capa.preventiveAction.includes('•'))) ? 'LIST' : 'DESCRIPTIVE';
  });
  const [preventiveList, setPreventiveList] = useState<string[]>(() => parseTextToList(defaultPreventive));

  // PIC & Due Date
  const [pic, setPic] = useState(
    capa?.pic || 'Bambang S. (Supervisor K3 & Lingkungan)'
  );
  const [dueDate, setDueDate] = useState(() => {
    if (capa?.dueDate) return capa.dueDate;
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  // Evidence Criteria List (Nama Bukti & Format: Gambar, Video, PDF, Word, PPT)
  const [requiredEvidenceList, setRequiredEvidenceList] = useState<RequiredEvidenceCriterion[]>(() => {
    if (capa?.requiredEvidenceList && capa.requiredEvidenceList.length > 0) {
      return [...capa.requiredEvidenceList];
    }
    if (capa?.requiredEvidence) {
      const parts = capa.requiredEvidence.split(',').map((s, idx) => ({
        id: `ev-${idx + 1}`,
        name: s.trim(),
        format: (s.toLowerCase().includes('video') ? 'Video' : s.toLowerCase().includes('pdf') ? 'PDF' : 'Gambar') as EvidenceFormat
      })).filter(i => i.name);
      if (parts.length > 0) return parts;
    }
    return [
      { id: 'ev-1', name: 'Foto Fisik Perbaikan & Pemasangan Rambu/APD', format: 'Gambar' },
      { id: 'ev-2', name: 'Dokumen Logbook / Form Verifikasi Lapangan', format: 'PDF' }
    ];
  });
  const [attachments, setAttachments] = useState<AuditEvidenceAttachment[]>(
    capa?.attachments || []
  );

  // Handlers for evidence criteria list
  const handleAddEvidenceCriterion = () => {
    setRequiredEvidenceList(prev => [
      ...prev,
      { id: `ev-${Date.now()}-${Math.random()}`, name: '', format: 'Gambar' }
    ]);
  };

  const handleUpdateEvidenceCriterion = (id: string, field: 'name' | 'format', value: string) => {
    setRequiredEvidenceList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleRemoveEvidenceCriterion = (id: string) => {
    if (requiredEvidenceList.length <= 1) return;
    setRequiredEvidenceList(prev => prev.filter(item => item.id !== id));
  };

  // Feedback states
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle selecting an existing checklist item to prefill
  const handleSelectChecklistItem = (itemId: string) => {
    setSelectedItemId(itemId);
    const targetItem = allItems.find(i => i.id === itemId);
    if (targetItem) {
      setFindingCode(targetItem.code);
      setFindingTitle(targetItem.title);
      setCategory(targetItem.category);
      if (targetItem.status === 'CRITICAL_HAZARD') setSeverity('CRITICAL');
      else if (targetItem.status === 'MAJOR_NC') setSeverity('MAJOR');
      else setSeverity('MINOR');
    }
  };

  // Run AI / Deterministic Draft Generator
  const handleDraftWithEngine = async () => {
    if (!onRequestAiDraft) return;
    const targetItem = allItems.find(i => i.id === selectedItemId) || initialChecklistItem || allItems[0];
    if (!targetItem) return;

    try {
      const draft = await onRequestAiDraft(targetItem);
      if (draft) {
        if (draft.rootCause) setRootCause(draft.rootCause);
        if (draft.correctiveAction) {
          setCorrectiveAction(draft.correctiveAction);
          setCorrectiveList(parseTextToList(draft.correctiveAction));
        }
        if (draft.preventiveAction) {
          setPreventiveAction(draft.preventiveAction);
          setPreventiveList(parseTextToList(draft.preventiveAction));
        }
        if (draft.rootCause5Why && Array.isArray(draft.rootCause5Why)) {
          setRootCause5Why(draft.rootCause5Why);
          setRootCause(draft.rootCause5Why[draft.rootCause5Why.length - 1] || rootCause);
        }
        if (draft.requiredEvidence) {
          const parts = draft.requiredEvidence.split(',').map((s: string, idx: number) => ({
            id: `ev-ai-${idx + 1}`,
            name: s.trim(),
            format: (s.toLowerCase().includes('video') ? 'Video' : s.toLowerCase().includes('pdf') ? 'PDF' : 'Gambar') as EvidenceFormat
          })).filter((i: any) => i.name);
          if (parts.length > 0) setRequiredEvidenceList(parts);
        }
        if (draft.targetDays) {
          const d = new Date();
          d.setDate(d.getDate() + Number(draft.targetDays));
          setDueDate(d.toISOString().split('T')[0]);
        }
      }
    } catch (err) {
      console.error('Error generating CAPA draft:', err);
    }
  };

  // Dynamic 5-Why list handlers
  const handleAddWhyStep = () => {
    setRootCause5Why(prev => [...prev, '']);
  };

  const handleUpdateWhyStep = (index: number, val: string) => {
    setRootCause5Why(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveWhyStep = (index: number) => {
    setRootCause5Why(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanWhySteps = rootCause5Why.map(s => s.trim()).filter(Boolean);

    const finalCorrective = correctiveMode === 'LIST' 
      ? formatListToText(correctiveList) 
      : correctiveAction.trim();

    const finalPreventive = preventiveMode === 'LIST' 
      ? formatListToText(preventiveList) 
      : preventiveAction.trim();

    if (!finalCorrective) {
      setErrorMessage('Tindakan koreksi langsung wajib diisi!');
      return;
    }

    if (!finalPreventive) {
      setErrorMessage('Tindakan pencegahan sistemik wajib diisi!');
      return;
    }

    const cleanEvidenceList = requiredEvidenceList
      .map(item => ({ ...item, name: item.name.trim() }))
      .filter(item => item.name.length > 0);

    const summaryEvidenceText = cleanEvidenceList.length > 0
      ? cleanEvidenceList.map(item => `${item.name} (${item.format})`).join(', ')
      : 'Foto perbaikan & dokumen verifikasi';

    const finalCapa: CAPAItem = {
      id: capa?.id || `capa-${Date.now()}`,
      checklistItemId: selectedItemId,
      findingCode: findingCode.trim().toUpperCase(),
      findingTitle: findingTitle.trim(),
      category: category.trim(),
      severity,
      rootCause: rootCause.trim() || (cleanWhySteps[cleanWhySteps.length - 1] || 'Perlu peningkatan kepatuhan SOP.'),
      rootCause5Why: cleanWhySteps,
      correctiveAction: finalCorrective,
      preventiveAction: finalPreventive,
      requiredEvidence: summaryEvidenceText,
      requiredEvidenceList: cleanEvidenceList,
      attachments,
      pic: pic.trim(),
      dueDate,
      status,
      resolutionNotes: capa?.resolutionNotes,
      createdAt: capa?.createdAt || new Date().toISOString(),
      inProgressAt: capa?.inProgressAt || (status !== 'OPEN' ? new Date().toISOString() : undefined),
      resolvedAt: status === 'RESOLVED' || status === 'VERIFIED' ? (capa?.resolvedAt || new Date().toISOString()) : undefined,
      verifiedAt: status === 'VERIFIED' ? (capa?.verifiedAt || new Date().toISOString()) : undefined,
      verifiedBy: status === 'VERIFIED' ? (capa?.verifiedBy || 'Alvareza H. Pratama, S.M') : undefined,
      rootCause5WhyDetails: capa?.rootCause5WhyDetails
    };

    setIsSavedNotice(true);
    setTimeout(() => {
      onSave(finalCapa);
    }, 400);
  };

  return (
    <div className="w-full pb-16">
      {/* Feedback Toast Notice */}
      {isSavedNotice && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-bold">Rencana CAPA berhasil disimpan!</span>
        </div>
      )}

      {/* Main Content Form */}
      <div className="w-full space-y-6">
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-xs font-medium">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-900">Perhatian Form CAPA</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form id="capa-edit-form" onSubmit={handleSubmit} className="space-y-6">
          {/* SEGMENT 1: CARD IDENTITAS TEMUAN & KLAUSUL (Dynamic Solid Severity Color, White Text) */}
          {(() => {
            const theme = severity === 'CRITICAL'
              ? { cardBg: 'bg-rose-600 border-rose-700' }
              : severity === 'MAJOR'
              ? { cardBg: 'bg-orange-500 border-orange-600' }
              : { cardBg: 'bg-yellow-500 border-yellow-600' };

            return (
              <div className={`rounded-xl border ${theme.cardBg} p-5 shadow-2xs transition-colors duration-200 text-white`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                  {/* KIRI */}
                  <div className="space-y-2.5">
                    {/* Row 1: ID Klausul */}
                    <div className="flex items-center">
                      <span className="font-bold text-white w-24 shrink-0">ID Klausul</span>
                      <span className="text-white/80 mr-2">:</span>
                      <span className="font-mono font-extrabold text-white">{findingCode || 'NC-01'}</span>
                    </div>
                    {/* Row 2: Kategori */}
                    <div className="flex items-start">
                      <span className="font-bold text-white w-24 shrink-0">Kategori</span>
                      <span className="text-white/80 mr-2">:</span>
                      <span className="font-semibold text-white leading-relaxed">{category || 'Kepatuhan Operasional K3'}</span>
                    </div>
                  </div>

                  {/* KANAN */}
                  <div className="space-y-2.5">
                    {/* Row 1: Tingkat */}
                    <div className="flex items-center">
                      <span className="font-bold text-white w-20 shrink-0">Tingkat</span>
                      <span className="text-white/80 mr-2">:</span>
                      <div className="relative inline-flex items-center group">
                        <select
                          value={severity}
                          onChange={(e) => setSeverity(e.target.value as any)}
                          className="appearance-none bg-transparent border-0 py-0 pl-0 pr-5 text-xs font-extrabold text-white focus:outline-none cursor-pointer transition"
                        >
                          <option value="MINOR" className="bg-white text-slate-800">Minor NC - Penyimpangan Administratif/Rutin</option>
                          <option value="MAJOR" className="bg-white text-slate-800">Major NC - Penyimpangan Prosedur Lapangan Serius</option>
                          <option value="CRITICAL" className="bg-white text-slate-800">Critical Hazard - Bahaya Kritis / Stop Work</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-white opacity-90 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 transition" />
                      </div>
                    </div>
                    {/* Row 2: Scope */}
                    <div className="flex items-start">
                      <span className="font-bold text-white w-20 shrink-0">Scope</span>
                      <span className="text-white/80 mr-2">:</span>
                      <span className="font-semibold text-white leading-relaxed">{findingTitle || 'Judul temuan ketidaksesuaian'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CARD SEGMENT 2: INVESTIGASI AKAR MASALAH (5-WHY ANALYSIS) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-amber-600 px-5 py-3.5 border-b border-amber-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Investigasi Akar Masalah (Metodologi 5-Why)
                </h3>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Rangkaian analisis kausalitas &quot;Mengapa&quot; untuk menggali akar persoalan paling mendasar.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddWhyStep}
                className="px-3 py-1.5 text-[11px] font-bold text-amber-900 bg-white hover:bg-amber-50 rounded-lg transition cursor-pointer flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                <span>Tambah Tahap Why</span>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2.5">
                {rootCause5Why.map((whyText, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <AutoResizeTextarea
                      minRows={1}
                      value={whyText}
                      onChange={(e) => handleUpdateWhyStep(idx, e.target.value)}
                      placeholder={`Poin analisis investigasi mengapa tahap #${idx + 1}...`}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveWhyStep(idx)}
                      disabled={rootCause5Why.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                      title="Hapus tahap ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CARD SEGMENT 3A: TINDAKAN KOREKSI LANGSUNG (SEPARATE CARD) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-rose-600 px-5 py-3.5 border-b border-rose-700 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Tindakan Koreksi Langsung (Immediate Corrective Action)
                </h3>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Aksi perbaikan langsung untuk menghentikan risiko dan memulihkan kepatuhan klausul saat ini.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center bg-rose-800/80 p-1 rounded-lg border border-rose-500 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (correctiveMode === 'LIST') {
                      setCorrectiveAction(formatListToText(correctiveList));
                    }
                    setCorrectiveMode('DESCRIPTIVE');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer flex items-center space-x-1 ${
                    correctiveMode === 'DESCRIPTIVE'
                      ? 'bg-white text-rose-950 shadow-2xs'
                      : 'text-rose-100 hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Deskriptif</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (correctiveMode === 'DESCRIPTIVE') {
                      setCorrectiveList(parseTextToList(correctiveAction));
                    }
                    setCorrectiveMode('LIST');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer flex items-center space-x-1 ${
                    correctiveMode === 'LIST'
                      ? 'bg-white text-rose-950 shadow-2xs'
                      : 'text-rose-100 hover:text-white'
                  }`}
                >
                  <ListOrdered className="w-3 h-3" />
                  <span>Daftar Poin (List)</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {correctiveMode === 'DESCRIPTIVE' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Deskripsi Tindakan Korektif <span className="text-rose-500">*</span>
                  </label>
                  <AutoResizeTextarea
                    minRows={1}
                    value={correctiveAction}
                    onChange={(e) => setCorrectiveAction(e.target.value)}
                    placeholder="Aksi perbaikan langsung untuk memperbarui temuan saat ini..."
                    className="w-full text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-400 leading-relaxed"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Ketik penjelasan paragraf ringkas tindakan penanganan lapangan langsung.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Daftar Poin Tindakan Korektif <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCorrectiveList(prev => [...prev, ''])}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Poin</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {correctiveList.map((itemText, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-slate-400 font-bold text-xs mt-2 shrink-0">•</span>
                        <AutoResizeTextarea
                          minRows={1}
                          value={itemText}
                          onChange={(e) => {
                            const updated = [...correctiveList];
                            updated[idx] = e.target.value;
                            setCorrectiveList(updated);
                          }}
                          placeholder={`Poin tindakan koreksi #${idx + 1}...`}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (correctiveList.length > 1) {
                              setCorrectiveList(correctiveList.filter((_, i) => i !== idx));
                            }
                          }}
                          disabled={correctiveList.length <= 1}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                          title="Hapus poin ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Isi rincian langkah tindakan koreksi dalam bentuk poin-poin terpisah.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CARD SEGMENT 3B: TINDAKAN PENCEGAHAN SISTEMIK (SEPARATE CARD) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-emerald-600 px-5 py-3.5 border-b border-emerald-700 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Tindakan Pencegahan Sistemik (Systemic Preventive Action)
                </h3>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Aksi pencegahan terstruktur (revisi SOP, program pelatihan, tata kelola) agar ketidaksesuaian tidak terulang.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center bg-emerald-800/80 p-1 rounded-lg border border-emerald-500 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (preventiveMode === 'LIST') {
                      setPreventiveAction(formatListToText(preventiveList));
                    }
                    setPreventiveMode('DESCRIPTIVE');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer flex items-center space-x-1 ${
                    preventiveMode === 'DESCRIPTIVE'
                      ? 'bg-white text-emerald-950 shadow-2xs'
                      : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Deskriptif</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (preventiveMode === 'DESCRIPTIVE') {
                      setPreventiveList(parseTextToList(preventiveAction));
                    }
                    setPreventiveMode('LIST');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer flex items-center space-x-1 ${
                    preventiveMode === 'LIST'
                      ? 'bg-white text-emerald-950 shadow-2xs'
                      : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  <ListOrdered className="w-3 h-3" />
                  <span>Daftar Poin (List)</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {preventiveMode === 'DESCRIPTIVE' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Deskripsi Tindakan Preventif <span className="text-rose-500">*</span>
                  </label>
                  <AutoResizeTextarea
                    minRows={1}
                    value={preventiveAction}
                    onChange={(e) => setPreventiveAction(e.target.value)}
                    placeholder="Aksi pencegahan terstruktur (revisi SOP, program pelatihan, checklist berkala)..."
                    className="w-full text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-400 leading-relaxed"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Ketik penjelasan paragraf ringkas tindakan pencegahan jangka panjang.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Daftar Poin Tindakan Preventif <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreventiveList(prev => [...prev, ''])}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Poin</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {preventiveList.map((itemText, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-slate-400 font-bold text-xs mt-2 shrink-0">•</span>
                        <AutoResizeTextarea
                          minRows={1}
                          value={itemText}
                          onChange={(e) => {
                            const updated = [...preventiveList];
                            updated[idx] = e.target.value;
                            setPreventiveList(updated);
                          }}
                          placeholder={`Poin tindakan pencegahan #${idx + 1}...`}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (preventiveList.length > 1) {
                              setPreventiveList(preventiveList.filter((_, i) => i !== idx));
                            }
                          }}
                          disabled={preventiveList.length <= 1}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                          title="Hapus poin ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Isi rincian langkah tindakan pencegahan dalam bentuk poin-poin terpisah.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CARD SEGMENT 4: PENUGASAN PIC, TARGET WAKTU & KRITERIA BUKTI */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 px-5 py-3.5 border-b border-slate-800">
              <h3 className="text-sm font-extrabold text-white">
                Penugasan PIC, Target Waktu &amp; Kriteria Bukti
              </h3>
              <p className="text-[11px] text-white/90 mt-0.5">
                Alokasi personel berwenang, batas waktu penyelesaian, dan penentuan kriteria dokumen bukti wajib.
              </p>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PIC */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Person in Charge (PIC) Penanggung Jawab <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                    placeholder="Contoh: Bambang S. (Supervisor K3) / Tim Transporter"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400"
                    required
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Batas Waktu Penyelesaian (Due Date) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Kriteria Bukti Penyelesaian Wajib */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Kriteria Bukti Penyelesaian Wajib (Required Evidence Criteria) <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddEvidenceCriterion}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer flex items-center space-x-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                    <span>Tambah Kriteria Bukti</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {requiredEvidenceList.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      {/* Nama Bukti */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateEvidenceCriterion(item.id, 'name', e.target.value)}
                          placeholder="Nama kriteria dokumen bukti penyelesaian..."
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400"
                        />
                      </div>

                      {/* Format File Dropdown */}
                      <div className="w-32 shrink-0">
                        <select
                          value={item.format}
                          onChange={(e) => handleUpdateEvidenceCriterion(item.id, 'format', e.target.value as any)}
                          className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-slate-400 cursor-pointer"
                        >
                          <option value="Gambar">Gambar</option>
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
                          <option value="Word">Word</option>
                          <option value="PPT">PPT</option>
                        </select>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidenceCriterion(item.id)}
                        disabled={requiredEvidenceList.length <= 1}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                        title="Hapus kriteria ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
