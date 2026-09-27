import React, { useState } from 'react';
import { X, Building2, ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { AuditSession } from '../types/audit';
import { INITIAL_CHECKLIST_TEMPLATE } from '../data/defaultAuditChecklist';
import { calculateStageScores } from '../utils/auditCalculator';

interface NewAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAudit: (newSession: AuditSession) => void;
}

export const NewAuditModal: React.FC<NewAuditModalProps> = ({
  isOpen,
  onClose,
  onCreateAudit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('Audit Kepatuhan HR-K3 Terpadu PT. Dame Alam Sejahtera');
  const [facilityName, setFacilityName] = useState('PT. DAME ALAM SEJAHTERA (DAS GROUP)');
  const [facilityLocation, setFacilityLocation] = useState('Plant Karawang Barat & Plant Sukabumi');
  const [wasteType, setWasteType] = useState<AuditSession['wasteType']>('INTEGRATED_PLANT');
  const [operationalUnit, setOperationalUnit] = useState<'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT'>('ALL');
  const [auditorName, setAuditorName] = useState('Ir. Hendra Gunawan, S.T., M.K.K.K.');
  const [leadAuditorLicense, setLeadAuditorLicense] = useState('SKP-KEMNAKER-AUD-2024/0991-K3');
  const [auditDate, setAuditDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startFresh, setStartFresh] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateStr = auditDate.replace(/-/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const auditCode = `AUD-WST-${dateStr}-${randomSuffix}`;

    // Prepare items
    const baseItems = INITIAL_CHECKLIST_TEMPLATE.map(item => ({
      ...item,
      status: startFresh ? ('UNCHECKED' as const) : item.status,
      notes: startFresh ? '' : item.notes,
      evidenceText: startFresh ? '' : item.evidenceText,
    }));

    const { stageScores, overallScore } = calculateStageScores(baseItems);

    const newSession: AuditSession = {
      id: `aud-${Date.now()}`,
      auditCode,
      title,
      facilityName,
      facilityLocation,
      wasteType,
      operationalUnit,
      auditorName,
      auditorRole: 'Lead Auditor SMK3 & Lingkungan Hidup',
      leadAuditorLicense,
      auditDate,
      status: 'IN_PROGRESS',
      items: baseItems,
      capaList: [],
      overallScore,
      stageScores,
    };

    onCreateAudit(newSession);
    onClose();
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transition-colors duration-200">
        {/* Modal Header: Royal Blue #155DFC with Pure White Text & Icon */}
        <div className="bg-[#155DFC] p-5 text-white flex items-center justify-between border-b border-blue-600">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-white/20 text-white border border-white/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Mulai Sesi Audit HR-K3 Baru</h3>
              <p className="text-xs text-blue-100">Konfigurasi fasilitas industri limbah dan auditor</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            title="Tutup (Batal)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs bg-white dark:bg-slate-900">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul / Ruang Lingkup Audit:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Fasilitas / Perusahaan Pengolah Limbah:</label>
            <input
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              required
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi Fasilitas / Alamat Pabrik:</label>
            <input
              type="text"
              value={facilityLocation}
              onChange={(e) => setFacilityLocation(e.target.value)}
              required
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Operasi Limbah:</label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value as any)}
                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="B3_INDUSTRI">Limbah B3 Kimia & Industri</option>
                <option value="B3_MEDIS">Limbah B3 Medis & Klinis</option>
                <option value="INTEGRATED_PLANT">Fasilitas Pengolahan Terpadu (Insinerator & IPAL)</option>
                <option value="E_WASTE">Limbah Elektronik (E-Waste)</option>
                <option value="NON_B3_RECYCLE">Daur Ulang Non-B3</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tanggal Pelaksanaan Audit:</label>
              <input
                type="date"
                value={auditDate}
                onChange={(e) => setAuditDate(e.target.value)}
                required
                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lead Auditor:</label>
              <input
                type="text"
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                required
                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">No. Lisensi / SKP Auditor:</label>
              <input
                type="text"
                value={leadAuditorLicense}
                onChange={(e) => setLeadAuditorLicense(e.target.value)}
                required
                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Start fresh option */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center space-x-2.5">
            <input
              type="checkbox"
              id="startFresh"
              checked={startFresh}
              onChange={(e) => setStartFresh(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 dark:border-slate-600 focus:ring-emerald-500"
            />
            <label htmlFor="startFresh" className="text-slate-700 dark:text-slate-300 text-xs cursor-pointer">
              Mulai dengan checklist kosong (status &quot;Belum Diperiksa&quot; untuk semua klausul)
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-sm cursor-pointer"
            >
              Mulai Audit Baru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
