import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  FileBadge, 
  Building2, 
  Calendar, 
  UserCheck, 
  FileCheck2,
  X,
  Loader2
} from 'lucide-react';
import { exportElementToPdf } from '../utils/pdfExport';
import { AuditSession } from '../types/audit';
import { STAGE_METADATA } from '../data/defaultAuditChecklist';

interface PrintableReportProps {
  auditSession: AuditSession;
  onClose?: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  auditSession,
  onClose,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const { 
    auditCode, 
    facilityName, 
    facilityLocation, 
    auditorName, 
    auditorRole, 
    leadAuditorLicense, 
    auditDate, 
    overallScore, 
    stageScores, 
    items, 
    capaList, 
    aiAnalysis 
  } = auditSession;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      await exportElementToPdf(reportRef.current, `Laporan_Audit_DASAR_${auditCode}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditSession, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `DASAR_Audit_${auditCode}_${auditDate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const ncItems = items.filter(i => i.status === 'MINOR_NC' || i.status === 'MAJOR_NC' || i.status === 'CRITICAL_HAZARD');

  return (
    <div className="w-full space-y-6">
      {/* Top action buttons (hidden when printed) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Laporan Resmi &amp; Berita Acara Audit (DASAR)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dirender menggunakan jsPDF &amp; html2canvas. Siap diunduh sebagai PDF atau dicetak.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
            title="Build & Unduh PDF"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Membuat PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Simpan PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            disabled={isGeneratingPdf}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white text-xs font-bold transition shadow-sm cursor-pointer border border-slate-700 disabled:opacity-50"
            title="Cetak via Printer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <span>Ekspor JSON</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Official Printable Document Container */}
      <div ref={reportRef} className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-lg print:border-none print:shadow-none print:p-0 text-slate-900 font-sans space-y-8">
        
        {/* Document Header / Kop Dokumen */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-auto max-w-[130px] flex items-center justify-center shrink-0">
              <img 
                src="/gambar/logo_das.png" 
                alt="DAS Logo" 
                crossOrigin="anonymous"
                className="max-h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.className = "h-14 w-14 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0";
                    parent.innerHTML = '<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>';
                  }
                }}
              />
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-wider text-slate-950">
                PT. DAME ALAM SEJAHTERA (DAS GROUP)
              </div>
              <div className="text-xs font-bold tracking-tight text-blue-800 print:text-black uppercase">
                DASAR · DAS Audit &amp; Risk — Waste Management &amp; Transport Services
              </div>
              <div className="text-[11px] font-semibold text-slate-600 italic">
                Slogan: &quot;One Team, One Goal, One Spirit&quot; — Transporter Sabang-Merauke • Plant Karawang • Plant Sukabumi
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Kepatuhan: PP 50/2012 (SMK3) • PP 22/2021 (PPLH) • PP 35/2021 (Ketenagakerjaan) • Permenaker 05/2018
              </div>
            </div>
          </div>

          <div className="text-right text-xs space-y-1 font-mono">
            <div><strong>No. Audit:</strong> {auditCode}</div>
            <div><strong>Tanggal Audit:</strong> {auditDate}</div>
            <div className="text-emerald-700 font-bold print:text-black">AUDIT SIKLUS RESMI</div>
          </div>
        </div>

        {/* Audit Title */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold tracking-widest uppercase bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-300 print:border-black">
            BERITA ACARA AUDIT KEPATUHAN KETENAGAKERJAAN & K3 TERPADU
          </span>
          <h1 className="text-2xl font-black text-slate-950 pt-2">
            Audit Kepatuhan HR-K3 (Recruitment s/d Termination) & Mitigasi Operasional
          </h1>
          <p className="text-xs text-slate-600">
            Entitas: <strong className="text-slate-900">PT. DAME ALAM SEJAHTERA (DAS GROUP)</strong> — Unit Operasional: Transporter Nasional, Plant Karawang Barat & Plant Sukabumi
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs print:bg-transparent print:border-black">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Fasilitas / Entitas</span>
            <strong className="text-slate-900">{facilityName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Lead Auditor K3</span>
            <strong className="text-slate-900">{auditorName}</strong>
            <span className="block text-[10px] text-slate-500 font-mono">{leadAuditorLicense}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Klasifikasi Limbah</span>
            <strong className="text-slate-900">Limbah B3 & IPAL Terpadu</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Indeks Kepatuhan Total</span>
            <span className="text-lg font-black text-emerald-700 print:text-black">
              {overallScore}%
            </span>
          </div>
        </div>

        {/* Section 1: Ringkasan Eksekutif & Opini Kepatuhan */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center">
            <span className="w-2 h-2 bg-slate-900 mr-2 rounded-full" />
            1. Ringkasan Eksekutif & Opini Legal Auditor
          </h3>

          <div className="p-4 rounded-lg bg-slate-50/70 border border-slate-200 text-xs text-slate-800 leading-relaxed text-justify print:bg-transparent print:border-black">
            {aiAnalysis?.summary || 'Audit komprehensif telah dilaksanakan mencakup seluruh siklus hidup ketenagakerjaan dan kepatuhan K3 lingkungan.'}
          </div>

          {aiAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40 print:bg-transparent print:border-black">
                <h4 className="font-bold text-rose-900 print:text-black mb-2 flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-1 text-rose-600 print:text-black" />
                  Potensi Liabilitas Regulasi & Hukum:
                </h4>
                <ul className="space-y-1.5 text-rose-950 print:text-black">
                  {aiAnalysis.legalRisks?.map((risk, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1.5 font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 print:bg-transparent print:border-black">
                <h4 className="font-bold text-amber-900 print:text-black mb-2 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-amber-600 print:text-black" />
                  Rekomendasi Tindakan Koreksi Utama:
                </h4>
                <ul className="space-y-1.5 text-amber-950 print:text-black">
                  {aiAnalysis.actionPriorities?.map((action, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1.5 font-bold">{i + 1}.</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Rekapitulasi Nilai 6 Tahap Siklus Hidup */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-1">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-slate-900 mr-2 rounded-full" />
              2. Rekapitulasi Skor Kepatuhan & Metodologi Audit
            </h3>
            <span className="text-[10px] font-mono text-slate-500 italic">
              Metode: PLAN → SCOPE → CRITERIA → EVIDENCE → FINDINGS → ROOT CAUSE → ACTION (CAPA) → EVALUATION → CLOSING → REPORTING
            </span>
          </div>

          {/* Auditor Creed & Formula Reference Box in Report */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-700 space-y-1 print:bg-transparent print:border-black">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Formula Penentuan Auditor (ISO 19011 & PP 50/2012):</span>
              <span className="italic text-emerald-800 print:text-black">"No Evidence, No Compliance. Facts Over Opinions, Rules Over Assumptions."</span>
            </div>
            <p className="text-[10px] text-slate-600 font-mono">
              Rumus Kepatuhan: Skor (%) = [ (Compliant × 1.0) + (Minor NC × 0.5) + (Major NC × 0.0) + (Critical Hazard × -0.5) ] / Total Klausul Teruji × 100
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden print:border-black">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 print:border-black">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Tahap Siklus HR & K3</th>
                  <th className="py-2.5 px-3 text-center">Jumlah Item</th>
                  <th className="py-2.5 px-3 text-center">Sesuai</th>
                  <th className="py-2.5 px-3 text-center">Minor NC</th>
                  <th className="py-2.5 px-3 text-center">Major NC / Bahaya</th>
                  <th className="py-2.5 px-3 text-right">Skor Kepatuhan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-black text-slate-700">
                {STAGE_METADATA.map((stage, idx) => {
                  const scoreInfo = stageScores[stage.id] || { total: 0, compliant: 0, minorNc: 0, majorNc: 0, criticalHazard: 0, score: 0 };
                  return (
                    <tr key={stage.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono font-bold">{idx + 1}</td>
                      <td className="py-2 px-3 font-semibold text-slate-900">{stage.label}</td>
                      <td className="py-2 px-3 text-center">{scoreInfo.total}</td>
                      <td className="py-2 px-3 text-center text-emerald-700 font-semibold">{scoreInfo.compliant}</td>
                      <td className="py-2 px-3 text-center text-amber-700">{scoreInfo.minorNc}</td>
                      <td className="py-2 px-3 text-center text-rose-700 font-semibold">
                        {scoreInfo.majorNc + scoreInfo.criticalHazard}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">
                        {scoreInfo.score}%
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-900 print:border-black text-slate-950">
                  <td colSpan={6} className="py-2.5 px-3 text-right uppercase tracking-wider">
                    Rata-Rata Indeks Kepatuhan Terpadu:
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-800 print:text-black font-extrabold text-sm">
                    {overallScore}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Daftar Temuan Ketidaksesuaian (NC) & Rencana CAPA */}
        <div className="space-y-3 page-break">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center">
            <span className="w-2 h-2 bg-slate-900 mr-2 rounded-full" />
            3. Rincian Temuan Ketidaksesuaian & Tindakan Perbaikan (CAPA)
          </h3>

          {ncItems.length === 0 ? (
            <div className="p-4 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              Tidak ditemukan adanya ketidaksesuaian (Zero Non-Conformance). Fasilitas memenuhi seluruh klausul audit K3 limbah dengan sempurna.
            </div>
          ) : (
            <div className="space-y-4">
              {ncItems.map((nc) => {
                const capa = capaList.find(c => c.checklistItemId === nc.id);
                return (
                  <div key={nc.id} className="p-4 rounded-lg border border-slate-300 text-xs space-y-2 print:border-black">
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded print:border print:border-black">
                        {nc.code} — {nc.category}
                      </span>
                      <span className="text-rose-700 font-bold">
                        {nc.status} ({nc.riskLevel})
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900">{nc.title}</h4>
                    <p className="text-slate-600"><strong>Observasi Temuan: </strong>{nc.notes || 'Ditemukan ketidaksesuaian dengan klausul regulasi.'}</p>
                    <p className="text-slate-500 font-mono text-[11px]"><strong>Daftar Dokumen Lain (yang tidak dapat dilampirkan): </strong>{nc.evidenceText || '-'}</p>

                    {capa && (
                      <div className="mt-2 pt-2 border-t border-dashed border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded print:bg-transparent">
                        <div>
                          <strong className="text-orange-900 block font-semibold">Tindakan Koreksi (Corrective):</strong>
                          <span className="text-slate-800">{capa.correctiveAction}</span>
                        </div>
                        <div>
                          <strong className="text-blue-900 block font-semibold">Tindakan Pencegahan (Preventive):</strong>
                          <span className="text-slate-800">{capa.preventiveAction}</span>
                        </div>
                        <div className="col-span-2 text-[11px] text-slate-500 pt-1 flex justify-between">
                          <span>PIC: <strong>{capa.pic}</strong></span>
                          <span>Batas Waktu: <strong>{capa.dueDate}</strong></span>
                          <span>Status: <strong>{capa.status}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 4: Matriks Pemetaan Kepatuhan Regulasi UU & Turunannya */}
        <div className="space-y-3 page-break">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center">
            <span className="w-2 h-2 bg-slate-900 mr-2 rounded-full" />
            4. Matriks Kepatuhan Regulasi Pokok (UU) & Peraturan Turunannya
          </h3>

          <div className="border border-slate-200 rounded-lg overflow-hidden print:border-black text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 print:border-black">
                  <th className="py-2 px-3">Tingkat</th>
                  <th className="py-2 px-3">Nomor Regulasi</th>
                  <th className="py-2 px-3">Ruang Lingkup Wajib di Industri Limbah</th>
                  <th className="py-2 px-3 text-center">Status Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-black text-slate-700">
                <tr>
                  <td className="py-2 px-3 font-bold text-purple-800 print:text-black">UU</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">UU No. 1 Tahun 1970</td>
                  <td className="py-2 px-3">Pasal 3, 8, 9, 14: MCU pra-kerja, berkala, exit MCU, induksi K3, penyediaan APD cuma-cuma</td>
                  <td className="py-2 px-3 text-center text-amber-700 font-bold">Sebagian Sesuai (Major NC Exit MCU)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-purple-800 print:text-black">UU</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">UU No. 32 Tahun 2009 jo. UU Cipta Kerja</td>
                  <td className="py-2 px-3">Pasal 59, 104: Larangan pembuangan limbah B3 tanpa izin, sanksi pidana bypass IPAL</td>
                  <td className="py-2 px-3 text-center text-emerald-700 font-bold">100% Sesuai</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-purple-800 print:text-black">UU</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">UU No. 13 Tahun 2003 jo. UU Cipta Kerja</td>
                  <td className="py-2 px-3">Pasal 68, 76, 87: Kewajiban SMK3, larangan mempekerjakan anak & wanita hamil di zona B3</td>
                  <td className="py-2 px-3 text-center text-emerald-700 font-bold">100% Sesuai</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-blue-800 print:text-black">PP</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">PP No. 50 Tahun 2012 (SMK3)</td>
                  <td className="py-2 px-3">Kriteria audit 166: Kebijakan K3, HIRADC bahaya limbah, pemeliharaan rekam K3</td>
                  <td className="py-2 px-3 text-center text-emerald-700 font-bold">92% Sesuai</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-blue-800 print:text-black">PP</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">PP No. 22 Tahun 2021 (Lingkungan Hidup)</td>
                  <td className="py-2 px-3">Pasal 274-340: Pengelolaan Limbah B3, TPS B3, personil bersertifikat BNSP POPLB3/POPAL</td>
                  <td className="py-2 px-3 text-center text-amber-700 font-bold">Minor NC (Re-sertifikasi BNSP)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-blue-800 print:text-black">PP</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">PP No. 35 Tahun 2021 (PKWT & PHK)</td>
                  <td className="py-2 px-3">Pasal 40-59: Waktu lembur maks 4 jam, formula pesangon PHK & uang kompensasi PKWT</td>
                  <td className="py-2 px-3 text-center text-emerald-700 font-bold">100% Sesuai</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-800 print:text-black">Permen</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">Permenaker No. 5 Tahun 2018</td>
                  <td className="py-2 px-3">Pasal 5-38: Pengujian NAB uap kimia 6 bulanan, double locker, bilas eyewash & shower</td>
                  <td className="py-2 px-3 text-center text-emerald-700 font-bold">95% Sesuai</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-800 print:text-black">Permen</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">Permenakertrans No. 02/MEN/1980</td>
                  <td className="py-2 px-3">Pasal 2-4: Kewajiban Exit MCU purna tugas dan biomonitoring berkala logam berat</td>
                  <td className="py-2 px-3 text-center text-orange-700 font-bold">Major NC (Exit MCU Terlewat)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-800 print:text-black">Permen</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">Permenaker No. 08/MEN/VII/2010</td>
                  <td className="py-2 px-3">Pasal 6-7: Standar respirator cartridge & fit-test kerapatan segel muka</td>
                  <td className="py-2 px-3 text-center text-orange-700 font-bold">Major NC (Respirator Bocor/Janggut)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Tripartite Formal Sign-off Block */}
        <div className="pt-8 border-t-2 border-slate-900 space-y-6">
          <div className="text-xs text-slate-600 text-center italic">
            Berita Acara Audit Kepatuhan HR-K3 ini diterbitkan secara sah dan mengikat para pihak untuk segera melaksanakan rekomendasi perbaikan sesuai jadwal yang telah ditetapkan.
          </div>

          <div className="grid grid-cols-3 gap-6 text-center text-xs">
            {/* Lead Auditor */}
            <div className="space-y-16">
              <span className="font-bold text-slate-800 block">Diverifikasi & Disahkan oleh:</span>
              <div>
                <div className="font-bold text-slate-900 underline">{auditorName}</div>
                <div className="text-[11px] text-slate-500">{auditorRole}</div>
                <div className="text-[10px] text-slate-400 font-mono">{leadAuditorLicense}</div>
              </div>
            </div>

            {/* HSE Director */}
            <div className="space-y-16">
              <span className="font-bold text-slate-800 block">Perwakilan Manajemen K3 DAS Group:</span>
              <div>
                <div className="font-bold text-slate-900 underline">Bambang Suryono, S.T.</div>
                <div className="text-[11px] text-slate-500">HSE & Plant Manager (DAS Group)</div>
                <div className="text-[10px] text-slate-400 font-mono">Reg. POPLB3 #90214-BNSP</div>
              </div>
            </div>

            {/* HR Corporate Director */}
            <div className="space-y-16">
              <span className="font-bold text-slate-800 block">Perwakilan HR Corporate DAS Group:</span>
              <div>
                <div className="font-bold text-slate-900 underline">Dewi Lestari, S.Psi., M.M.</div>
                <div className="text-[11px] text-slate-500">Corporate HR Director (DAS Group)</div>
                <div className="text-[10px] text-slate-400 font-mono">Industrial Relations Specialist</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
