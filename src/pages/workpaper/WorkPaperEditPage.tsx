import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  FolderPlus
} from 'lucide-react';
import { 
  ChecklistItem, 
  LifecycleStage, 
  RiskLevel, 
  ComplianceStatus, 
  LegalHierarchy 
} from '../../types/audit';
import { STAGE_METADATA, INITIAL_CHECKLIST_TEMPLATE } from '../../data/defaultAuditChecklist';
import { AutoResizeTextarea } from '../../components/AutoResizeTextarea';
import { formatLastUpdatedIndonesian } from './utils';

interface WorkPaperEditPageProps {
  item: ChecklistItem | null; // null means create new item
  defaultStage: LifecycleStage;
  onSave: (savedItem: ChecklistItem) => void;
  onCancel: () => void;
  onDelete?: (itemId: string) => void;
}

// Helper to extract existing unique sessions for a stage
const getAvailableSessionsForStage = (stg: LifecycleStage) => {
  const stageItems = INITIAL_CHECKLIST_TEMPLATE.filter(i => i.stage === stg);
  const sessionMap = new Map<number, string>();
  stageItems.forEach(it => {
    if (it.sessionNumber && it.sessionTitle) {
      sessionMap.set(it.sessionNumber, it.sessionTitle);
    }
  });
  return Array.from(sessionMap.entries())
    .map(([num, title]) => ({ sessionNumber: num, sessionTitle: title }))
    .sort((a, b) => a.sessionNumber - b.sessionNumber);
};

export const WorkPaperEditPage: React.FC<WorkPaperEditPageProps> = ({
  item,
  defaultStage,
  onSave,
  onCancel,
  onDelete,
}) => {
  const isEditing = Boolean(item);

  // Form states
  const [stage, setStage] = useState<LifecycleStage>(item?.stage || defaultStage);
  const availableSessions = getAvailableSessionsForStage(stage);
  const maxSessionNum = availableSessions.reduce((max, s) => Math.max(max, s.sessionNumber), 0);

  // Session selection states
  const [sessionNumber, setSessionNumber] = useState<number>(() => item?.sessionNumber || availableSessions[0]?.sessionNumber || 1);
  const [sessionTitle, setSessionTitle] = useState<string>(() => item?.sessionTitle || availableSessions[0]?.sessionTitle || '');
  const [isCustomSession, setIsCustomSession] = useState<boolean>(() => {
    if (!item) return false;
    if (!item.sessionTitle) return false;
    const exists = availableSessions.some(s => s.sessionNumber === item.sessionNumber && s.sessionTitle === item.sessionTitle);
    return !exists;
  });
  const [customSessionTitle, setCustomSessionTitle] = useState<string>(() => item?.sessionTitle || '');

  const [code, setCode] = useState(item?.code || `K3-${Math.floor(10 + Math.random() * 90)}`);
  const [category, setCategory] = useState(item?.category || 'Standar Operasional K3 & Kepatuhan Legal');
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  
  // Operational Scope
  const [operationalScope, setOperationalScope] = useState<'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT'>(
    item?.operationalScope || 'ALL'
  );

  // Risk Level
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(item?.riskLevel || 'HIGH');

  // Audit Period
  const [auditPeriod, setAuditPeriod] = useState<'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE'>(
    item?.auditPeriod || 'MONTHLY'
  );

  // Legal Basis List (Dynamic Input List) & Sanctions
  const [legalBasisList, setLegalBasisList] = useState<string[]>(() => {
    if (item?.legalHierarchy) {
      const list = [
        item.legalHierarchy.primaryLaw,
        item.legalHierarchy.governmentReg,
        item.legalHierarchy.ministerialReg
      ].filter(s => s && s.trim().length > 0);
      if (list.length > 0) return list;
    }
    if (item?.legalBasis) {
      const split = item.legalBasis.split(/(?:;|\n|\|)/).map(s => s.trim()).filter(s => s.length > 0);
      if (split.length > 0) return split;
    }
    return [
      'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 12)',
      'PP No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan & Pengelolaan Lingkungan Hidup',
      'Permenaker No. 05/MEN/1996 / SK Dirjen Hubdat'
    ];
  });

  const [legalSanction, setLegalSanction] = useState(
    item?.legalSanction || 'Sanksi administratif peringatan tertulis, pembekuan izin operasional pengangkutan, hingga sanksi pidana kelalaian K3.'
  );

  // Langkah Verifikasi (Steps)
  const [auditSteps, setAuditSteps] = useState<string[]>(() => {
    if (item?.auditSteps && item.auditSteps.length > 0) return [...item.auditSteps];
    return [
      'Lakukan pemeriksaan fisik keabsahan dokumen legalitas terkait.',
      'Cek kesesuaian data personel/armada dengan sistem manifest operasional.',
      'Verifikasi masa berlaku lisensi dan catatan riwayat pemeriksaan berkala.'
    ];
  });

  // List Kolom Input Bukti Kepatuhan (Verification Criteria / Required Evidence List)
  const [verificationCriteria, setVerificationCriteria] = useState<string[]>(() => {
    if (item?.verificationCriteria && item.verificationCriteria.length > 0) {
      return [...item.verificationCriteria];
    }
    return [
      'Dokumen fisik/digital asli yang masih aktif dan terverifikasi',
      'Logbook pencatatan berkala atau sertifikat kualifikasi resmi',
      'Surat penunjukan atau bukti sign-off penanggung jawab teknis'
    ];
  });

  // Auditor Evidence Text
  const [evidenceText, setEvidenceText] = useState(item?.evidenceText || '');
  const [notes, setNotes] = useState(item?.notes || '');
  const [status, setStatus] = useState<ComplianceStatus>(item?.status || 'UNCHECKED');

  // Multi-step paste helper modal state
  const [showBulkPasteModal, setShowBulkPasteModal] = useState(false);
  const [bulkPasteType, setBulkPasteType] = useState<'STEPS' | 'CRITERIA' | 'LEGAL'>('STEPS');
  const [bulkPasteText, setBulkPasteText] = useState('');

  // Save feedback state
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // When stage changes, adjust session defaults if not custom
  const handleStageChange = (newStage: LifecycleStage) => {
    setStage(newStage);
    const newAvail = getAvailableSessionsForStage(newStage);
    if (newAvail.length > 0 && !isCustomSession) {
      setSessionNumber(newAvail[0].sessionNumber);
      setSessionTitle(newAvail[0].sessionTitle);
    }
  };

  // Handle Legal Basis List
  const handleAddLegalBasis = () => {
    setLegalBasisList(prev => [...prev, '']);
  };

  const handleUpdateLegalBasis = (index: number, val: string) => {
    setLegalBasisList(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveLegalBasis = (index: number) => {
    setLegalBasisList(prev => prev.filter((_, i) => i !== index));
  };

  // Handle Steps
  const handleAddStep = () => {
    setAuditSteps(prev => [...prev, '']);
  };

  const handleUpdateStep = (index: number, val: string) => {
    setAuditSteps(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveStep = (index: number) => {
    setAuditSteps(prev => prev.filter((_, i) => i !== index));
  };

  // Handle Criteria (Bukti Kepatuhan)
  const handleAddCriteria = () => {
    setVerificationCriteria(prev => [...prev, '']);
  };

  const handleUpdateCriteria = (index: number, val: string) => {
    setVerificationCriteria(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveCriteria = (index: number) => {
    setVerificationCriteria(prev => prev.filter((_, i) => i !== index));
  };

  // Bulk paste handler
  const handleApplyBulkPaste = () => {
    const lines = bulkPasteText
      .split('\n')
      .map(line => line.replace(/^[\d+.-]+[.)]\s*/, '').trim())
      .filter(line => line.length > 0);

    if (lines.length > 0) {
      if (bulkPasteType === 'STEPS') {
        setAuditSteps(prev => [...prev.filter(s => s.trim().length > 0), ...lines]);
      } else if (bulkPasteType === 'CRITERIA') {
        setVerificationCriteria(prev => [...prev.filter(c => c.trim().length > 0), ...lines]);
      } else if (bulkPasteType === 'LEGAL') {
        setLegalBasisList(prev => [...prev.filter(l => l.trim().length > 0), ...lines]);
      }
    }

    setBulkPasteText('');
    setShowBulkPasteModal(false);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Judul klausul workpaper wajib diisi!');
      return;
    }
    if (!code.trim()) {
      setErrorMessage('Kode klausul wajib diisi!');
      return;
    }

    const finalSessionTitle = isCustomSession
      ? (customSessionTitle.trim() || `Sesi ${sessionNumber}: Sesi Kustom`)
      : (sessionTitle.trim() || `Sesi ${sessionNumber}`);

    if (isCustomSession && !customSessionTitle.trim()) {
      setErrorMessage('Judul sesi baru wajib diisi jika memilih opsi buat sesi baru!');
      return;
    }

    const cleanSteps = auditSteps.map(s => s.trim()).filter(s => s.length > 0);
    const cleanCriteria = verificationCriteria.map(c => c.trim()).filter(c => c.length > 0);
    const cleanLegal = legalBasisList.map(l => l.trim()).filter(l => l.length > 0);

    const legalHierarchyObj: LegalHierarchy = {
      primaryLaw: cleanLegal[0] || '',
      governmentReg: cleanLegal[1] || '',
      ministerialReg: cleanLegal[2] || '',
    };

    const finalItem: ChecklistItem = {
      id: item?.id || `custom-wp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      stage,
      code: code.trim().toUpperCase(),
      category: category.trim(),
      title: title.trim(),
      description: description.trim() || 'Pemeriksaan standar audit operasional K3 dan regulasi kepatuhan lingkungan DAS Group.',
      legalBasis: cleanLegal.join('; ') || 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja',
      legalHierarchy: legalHierarchyObj,
      legalSanction: legalSanction.trim(),
      guidelines: item?.guidelines || 'Periksa kelengkapan fisik, kecocokan logbook, dan keabsahan izin institusi terkait.',
      auditSteps: cleanSteps.length > 0 ? cleanSteps : ['Verifikasi dokumen fisik dan kesesuaian operasional di lapangan.'],
      verificationCriteria: cleanCriteria.length > 0 ? cleanCriteria : ['Bukti dokumen legalitas aktif dan terverifikasi.'],
      riskLevel,
      status,
      notes: notes.trim(),
      evidenceText: evidenceText.trim(),
      attachments: item?.attachments || [],
      operationalScope,
      auditPeriod,
      sessionNumber: sessionNumber,
      sessionTitle: finalSessionTitle,
      lastUpdated: new Date().toISOString(),
    };

    setIsSavedNotice(true);
    setTimeout(() => {
      onSave(finalItem);
    }, 400);
  };

  return (
    <div className="w-full pb-16">
      {/* Feedback Notice Toast */}
      {isSavedNotice && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-bold">Klausul berhasil disimpan!</span>
        </div>
      )}

      {/* Main Content Form */}
      <div className="w-full space-y-6">
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-xs font-medium">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-900">Perhatian Form</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form id="workpaper-edit-form" onSubmit={handleSubmit} className="space-y-5">
          {/* CARD SEGMENT 1: IDENTITAS & SCOPE KLAUSUL */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-800 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Identitas &amp; Scope Klausul
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Tentukan ruang lingkup siklus kerja, penetapan sesi audit, kode registrasi, serta penamaan klausul.
                </p>
              </div>
              {item && (
                <span className="text-[10px] text-slate-300 font-medium">
                  {formatLastUpdatedIndonesian(item.lastUpdated)}
                </span>
              )}
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Lifecycle Stage (Scope) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Scope Lifecycle Stage <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => handleStageChange(e.target.value as LifecycleStage)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400 font-medium"
                  >
                    {STAGE_METADATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label} ({s.shortLabel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sesi Audit Selection / Custom Session */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Sesi Audit WorkPaper <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={isCustomSession ? 'NEW_CUSTOM' : `${sessionNumber}|${sessionTitle}`}
                    onChange={(e) => {
                      if (e.target.value === 'NEW_CUSTOM') {
                        setIsCustomSession(true);
                        const nextNum = maxSessionNum + 1 || 1;
                        setSessionNumber(nextNum);
                        setCustomSessionTitle(`Sesi ${nextNum}: Sesi Audit Tambahan`);
                      } else {
                        setIsCustomSession(false);
                        const [numStr, ...titleParts] = e.target.value.split('|');
                        const num = parseInt(numStr, 10);
                        const titleText = titleParts.join('|');
                        setSessionNumber(num);
                        setSessionTitle(titleText);
                      }
                    }}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400 font-medium"
                  >
                    <optgroup label="Pilih Dari Sesi Yang Ada">
                      {availableSessions.map((s) => (
                        <option key={s.sessionNumber} value={`${s.sessionNumber}|${s.sessionTitle}`}>
                          Sesi {s.sessionNumber}: {s.sessionTitle}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Opsi Buat Sesi Baru">
                      <option value="NEW_CUSTOM">
                        + Buat &amp; Jadikan Sesi Baru Sendiri...
                      </option>
                    </optgroup>
                  </select>
                </div>

                {/* Klausul Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Kode Klausul <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Contoh: RC-01 / OB-03 / K3-08"
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400 uppercase"
                    required
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Kategori / Kelompok Klausul <span className="text-rose-500">*</span>
                  </label>
                  <AutoResizeTextarea
                    minRows={1}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Persyaratan Legalitas Pengemudi B3"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Custom Session Input Box (Shown if option '+ Buat Sesi Baru Sendiri' selected) */}
              {isCustomSession && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="flex items-center space-x-1.5">
                      <FolderPlus className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      <span>Buat &amp; Jadikan Sesi Baru Sendiri</span>
                    </span>
                    {availableSessions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomSession(false);
                          setSessionNumber(availableSessions[0].sessionNumber);
                          setSessionTitle(availableSessions[0].sessionTitle);
                        }}
                        className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline font-semibold cursor-pointer"
                      >
                        Pilih Sesi Terdaftar Kembalil
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nomor Sesi
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={sessionNumber}
                        onChange={(e) => setSessionNumber(parseInt(e.target.value, 10) || 1)}
                        className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-bold"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Judul Sesi Baru <span className="text-rose-500">*</span>
                      </label>
                      <AutoResizeTextarea
                        minRows={1}
                        value={customSessionTitle}
                        onChange={(e) => setCustomSessionTitle(e.target.value)}
                        placeholder="Contoh: Sesi 9: Tinjauan Khusus Tanggap Darurat Kebakaran Karawang"
                        className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:border-slate-400"
                        required={isCustomSession}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Judul Klausul */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Judul Klausul WorkPaper <span className="text-rose-500">*</span>
                </label>
                <AutoResizeTextarea
                  minRows={1}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Verifikasi Kualifikasi SIM BII Umum & Sertifikasi Driver B3"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                  required
                />
              </div>

              {/* Deskripsi Klausul */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Deskripsi Rinci Klausul &amp; Sasaran Pemeriksaan
                </label>
                <AutoResizeTextarea
                  minRows={1}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan objek pemeriksaan, tujuan, dan sasaran dari klausul audit ini..."
                  className="w-full text-xs text-slate-800 dark:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* CARD SEGMENT 2: PARAMETER OPERASIONAL, RISIKO & PERIODE */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-800 dark:border-slate-700">
              <h3 className="text-sm font-extrabold text-white">
                Parameter Operasional, Tingkat Risiko &amp; Periode
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Sesuaikan cakupan lokasi fasilitas, dampak kegagalan, dan frekuensi inspeksi.
              </p>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Operasional Cakupan */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Operasional Cakupan
                  </label>
                  <select
                    value={operationalScope}
                    onChange={(e) => setOperationalScope(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                  >
                    <option value="ALL">Seluruh Fasilitas (Head Office, Warehouse, Fleet B3, Site)</option>
                    <option value="TRANSPORTER">Armada Angkutan B3 (Transporter &amp; Fleet)</option>
                    <option value="KARAWANG_PLANT">Fasilitas Pengolahan Limbah Karawang</option>
                    <option value="SUKABUMI_PLANT">Depot &amp; Storage Pengumpulan Sukabumi</option>
                  </select>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Lokasi audit di mana klausul ini berlaku.
                  </p>
                </div>

                {/* Tingkat Risiko */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Tingkat Risiko
                  </label>
                  <select
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                  >
                    <option value="LOW">LOW - Prosedural Minor (Peringatan)</option>
                    <option value="MEDIUM">MEDIUM - Operasional Internal</option>
                    <option value="HIGH">HIGH - Sanksi Regulasi / K3 Kritis</option>
                    <option value="CRITICAL">CRITICAL - Pidana / Pencabutan Izin / Fatal</option>
                  </select>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Menentukan bobot penalti skor jika terjadi ketidaksesuaian.
                  </p>
                </div>

                {/* Periode Audit */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Periode / Frekuensi Inspeksi
                  </label>
                  <select
                    value={auditPeriod}
                    onChange={(e) => setAuditPeriod(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                  >
                    <option value="DAILY">Harian (Pre-trip Inspection / Daily Log)</option>
                    <option value="MONTHLY">Bulanan (Evaluasi Periodik K3)</option>
                    <option value="QUARTERLY">Triwulanan (Audit Komite P2K3)</option>
                    <option value="ANNUAL">Tahunan (Riksa Uji / Tera Lisensi)</option>
                    <option value="ONCE">Insidental / Awal Masa Kontrak Driver</option>
                  </select>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Siklus waktu audit berkala wajib dilakukan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD SEGMENT 3: LANGKAH VERIFIKASI */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-800 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Langkah-Langkah Verifikasi Lapangan
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Prosedur audit yang harus dijalankan auditor saat memeriksa kondisi riil.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setBulkPasteType('STEPS');
                    setShowBulkPasteModal(true);
                  }}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-600 hover:bg-slate-500 rounded-lg transition cursor-pointer"
                >
                  Paste Banyak Baris
                </button>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="px-3 py-1.5 text-[11px] font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition cursor-pointer flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Langkah</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-2.5">
              {auditSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <AutoResizeTextarea
                    minRows={1}
                    value={step}
                    onChange={(e) => handleUpdateStep(idx, e.target.value)}
                    placeholder={`Langkah verifikasi poin ${idx + 1}...`}
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    disabled={auditSteps.length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                    title="Hapus langkah ini"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CARD SEGMENT 4: DASAR HUKUM REGULASI & KONSEKUENSI SANKSI */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-800 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Dasar Hukum Regulasi &amp; Konsekuensi Sanksi
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Daftar undang-undang, peraturan pemerintah, permen/SK dirjen, atau standar acuan resmi.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setBulkPasteType('LEGAL');
                    setShowBulkPasteModal(true);
                  }}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-600 hover:bg-slate-500 rounded-lg transition cursor-pointer"
                >
                  Paste Banyak Baris
                </button>
                <button
                  type="button"
                  onClick={handleAddLegalBasis}
                  className="px-3 py-1.5 text-[11px] font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition cursor-pointer flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Dasar Hukum</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* List Input Baris Dasar Hukum */}
              <div className="space-y-2.5">
                {legalBasisList.map((legal, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <AutoResizeTextarea
                      minRows={1}
                      value={legal}
                      onChange={(e) => handleUpdateLegalBasis(idx, e.target.value)}
                      placeholder={`Dasar hukum / regulasi acuan poin #${idx + 1}...`}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLegalBasis(idx)}
                      disabled={legalBasisList.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                      title="Hapus dasar hukum ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Konsekuensi Hukum & Sanksi */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Konsekuensi Hukum &amp; Sanksi (Bila Terjadi Pelanggaran)
                </label>
                <AutoResizeTextarea
                  minRows={1}
                  value={legalSanction}
                  onChange={(e) => setLegalSanction(e.target.value)}
                  placeholder="Jelaskan dampak hukum, sanksi tilang/penahanan armada, pencabutan izin pengangkutan, hingga sanksi pidana..."
                  className="w-full text-xs text-slate-800 dark:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* CARD SEGMENT 5: LIST KOLOM INPUT KRITERIA KEPATUHAN (VERIFICATION CRITERIA) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="bg-slate-700 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-800 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Daftar Kriteria Kepatuhan yang Diverifikasi
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Kriteria wajib &amp; checklist kriteria kepatuhan yang harus diperiksa dan dievaluasi (Sesuai / Tidak Sesuai).
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setBulkPasteType('CRITERIA');
                    setShowBulkPasteModal(true);
                  }}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-600 hover:bg-slate-500 rounded-lg transition cursor-pointer"
                >
                  Paste Banyak Baris
                </button>
                <button
                  type="button"
                  onClick={handleAddCriteria}
                  className="px-3 py-1.5 text-[11px] font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition cursor-pointer flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Kriteria</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2.5">
                {verificationCriteria.map((crit, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <AutoResizeTextarea
                      minRows={1}
                      value={crit}
                      onChange={(e) => handleUpdateCriteria(idx, e.target.value)}
                      placeholder={`Nama kriteria kepatuhan poin #${idx + 1}...`}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCriteria(idx)}
                      disabled={verificationCriteria.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
                      title="Hapus kriteria ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Optional Auditor Findings & Observations */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Daftar Dokumen Lain (yang tidak dapat dilampirkan)
                  </label>
                  <AutoResizeTextarea
                    minRows={1}
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                    placeholder="Contoh: Pasal/Regulasi terkait, Berkas arsip fisik besar, Database sistem internal..."
                    className="w-full text-xs text-slate-800 dark:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Catatan Temuan / Rekomendasi Tambahan Auditor
                  </label>
                  <AutoResizeTextarea
                    minRows={1}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan tambahan untuk penanganan perbaikan (CAPA)..."
                    className="w-full text-xs text-slate-800 dark:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-slate-400 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Optional Delete Action (Only for existing items) */}
          {isEditing && onDelete && (
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Yakin ingin menghapus klausul "${item?.title}" dari daftar audit?`)) {
                    onDelete(item!.id);
                  }
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer flex items-center space-x-1.5"
                title="Hapus Klausul"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Klausul Ini</span>
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Bulk Paste Modal */}
      {showBulkPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Paste Banyak Baris Sekaligus (
                {bulkPasteType === 'STEPS' ? 'Langkah Verifikasi' : bulkPasteType === 'LEGAL' ? 'Dasar Hukum' : 'Kriteria Kepatuhan'}
                )
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Tempel daftar teks dari SOP atau peraturan. Setiap baris baru akan otomatis diubah menjadi 1 poin terpisah.
              </p>
            </div>

            <AutoResizeTextarea
              minRows={3}
              value={bulkPasteText}
              onChange={(e) => setBulkPasteText(e.target.value)}
              placeholder="1. Poin pertama&#10;2. Poin kedua&#10;3. Poin ketiga..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-400 font-mono"
            />

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setBulkPasteText('');
                  setShowBulkPasteModal(false);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyBulkPaste}
                disabled={!bulkPasteText.trim()}
                className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer disabled:opacity-40"
              >
                Terapkan Baris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
