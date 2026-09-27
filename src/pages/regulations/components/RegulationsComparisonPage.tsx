import React, { useState } from 'react';
import { 
  Scale, 
  Calculator, 
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { RegulationsComparisonProps } from '../types';

export const RegulationsComparisonPage: React.FC<RegulationsComparisonProps> = () => {
  // Simulator State for PKWT Compensation vs PKWTT Severance
  const [simTenureMonths, setSimTenureMonths] = useState<number>(12);
  const [simMonthlySalary, setSimMonthlySalary] = useState<number>(5500000);

  const calculatePkwtCompensation = (months: number, salary: number) => {
    if (months < 1) return 0;
    return Math.round((months / 12) * salary);
  };

  const calculatePkwttSeveranceEstimate = (months: number, salary: number) => {
    const years = months / 12;
    // Base UP (Uang Pesangon) estimation (Pasal 40 PP 35/2021)
    let upMultiplier = 1;
    if (years < 1) upMultiplier = 1;
    else if (years < 2) upMultiplier = 2;
    else if (years < 3) upMultiplier = 3;
    else if (years < 4) upMultiplier = 4;
    else if (years < 5) upMultiplier = 5;
    else if (years < 6) upMultiplier = 6;
    else if (years < 7) upMultiplier = 7;
    else if (years < 8) upMultiplier = 8;
    else upMultiplier = 9;

    // Base UPMK (Uang Penghargaan Masa Kerja)
    let upmkMultiplier = 0;
    if (years >= 3 && years < 6) upmkMultiplier = 2;
    else if (years >= 6 && years < 9) upmkMultiplier = 3;
    else if (years >= 9 && years < 12) upmkMultiplier = 4;
    else if (years >= 12 && years < 15) upmkMultiplier = 5;
    else if (years >= 15 && years < 18) upmkMultiplier = 6;
    else if (years >= 18 && years < 21) upmkMultiplier = 7;
    else if (years >= 21 && years < 24) upmkMultiplier = 8;
    else if (years >= 24) upmkMultiplier = 10;

    return {
      upValue: upMultiplier * salary,
      upmkValue: upmkMultiplier * salary,
      totalEstimate: (upMultiplier + upmkMultiplier) * salary
    };
  };

  const pkwtComp = calculatePkwtCompensation(simTenureMonths, simMonthlySalary);
  const pkwttSev = calculatePkwttSeveranceEstimate(simTenureMonths, simMonthlySalary);

  return (
    <div className="w-full space-y-6">
      {/* Overview Card - Clean White & Humanist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-1.5">
              <Scale className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Matriks Yuridis Ketenagakerjaan UU 13/2003 jo. UU 6/2023 & PP 35/2021</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Komparasi Yuridis: PKWT, PKWTT & Alih Daya (Outsourcing)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-4xl leading-relaxed">
              Panduan yuridis resmi verifikasi kepatuhan auditor HR & Legal. Memastikan kesesuaian objek pekerjaan, larangan masa percobaan pada PKWT, kewajiban kompensasi akhir kontrak, dan prinsip TUPE pada alih daya.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 text-xs shrink-0">
            <AlertCircle className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
            <div>
              <span className="font-semibold block text-[11px]">Ketentuan Kunci:</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">PKWT cacat hukum berubah demi hukum menjadi PKWTT</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table - Clean, Legible & High Contrast */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <table className="w-full text-left border-collapse text-xs bg-white dark:bg-slate-900">
            <thead>
              <tr className="bg-slate-900 dark:bg-slate-800 text-white font-mono text-[11px]">
                <th className="p-3.5 w-1/4 border-r border-slate-800 dark:border-slate-700 font-semibold uppercase tracking-wider">
                  Parameter Aspek Hukum
                </th>
                <th className="p-3.5 w-1/4 border-r border-slate-800 dark:border-slate-700 font-semibold uppercase tracking-wider">
                  1. PKWT (Kontrak)
                </th>
                <th className="p-3.5 w-1/4 border-r border-slate-800 dark:border-slate-700 font-semibold uppercase tracking-wider">
                  2. PKWTT (Tetap)
                </th>
                <th className="p-3.5 w-1/4 font-semibold uppercase tracking-wider">
                  3. Alih Daya (Outsourcing)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-[11px] leading-relaxed">
              {/* Row 1: Dasar Hukum & Jenis Pekerjaan */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Dasar Regulasi & Objek Pekerjaan
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">UU 13/03 jo. UU 6/23 Ps. 56-59 & PP 35/21 Bab II</span>
                  Hanya untuk pekerjaan sekali selesai, musiman, produk baru, atau pekerjaan sementara (tidak bersifat tetap / bukan proses inti operasional rutin).
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">UU 13/03 jo. UU 6/23 Ps. 56 & PP 35/21 Bab V</span>
                  Untuk pekerjaan bersifat tetap, terus menerus, operasional inti (*core business*), jabatan manajerial, dan posisi permanen.
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">UU 13/03 jo. UU 6/23 Ps. 64-66 & PP 35/21 Bab III</span>
                  Penyerahan sebagian pelaksanaan pekerjaan penunjang (cleaning, security, catering, driver) melalui vendor berbadan hukum PT resmi.
                </td>
              </tr>

              {/* Row 2: Masa Percobaan (Probation) */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Masa Percobaan Kerja (Probation)
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                    Dilarang Keras (Pasal 58)
                  </span>
                  Jika disyaratkan masa percobaan, ketentuan tersebut <strong>batal demi hukum</strong> dan masa kerja tetap dihitung sejak hari pertama.
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                    Diperbolehkan (Pasal 60)
                  </span>
                  Paling lama 3 bulan. Upah selama masa percobaan dilarang dibayar di bawah upah minimum (UMK) yang berlaku.
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">Mengikuti Perjanjian Vendor:</span>
                  Jika pekerja diikat PKWT oleh vendor alih daya, dilarang probation. Jika diikat PKWTT oleh vendor, maksimal 3 bulan.
                </td>
              </tr>

              {/* Row 3: Batasan Jangka Waktu */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Batasan Jangka Waktu / Durasi
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Maksimal 5 Tahun:</span>
                  Akumulasi jangka waktu kontrak awal ditambah seluruh perpanjangan maksimal 5 tahun (Pasal 8 PP 35/2021).
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Tidak Terbatas Waktu:</span>
                  Berlaku sampai pekerja mencapai batas usia pensiun sesuai Peraturan Perusahaan (PP) atau terjadi PHK resmi.
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Sesuai Perjanjian Kerjasama:</span>
                  Mengikuti durasi kontrak komersial business-to-business (B2B) antara perusahaan pengguna dengan vendor alih daya.
                </td>
              </tr>

              {/* Row 4: Uang Kompensasi vs Pesangon */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Hak Kompensasi / Pesangon
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Uang Kompensasi PKWT (Pasal 61A):</span>
                  Wajib diberikan untuk masa kerja minimal 1 bulan terus-menerus.
                  <div className="p-2 mt-1 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    Formula = (Masa Kerja / 12) × 1 Bulan Upah Pokok + Tunjangan Tetap
                  </div>
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Paket Pesangon PHK (PP 35/21):</span>
                  Jika terjadi PHK resmi, wajib membayar:
                  <ul className="list-disc pl-3 text-[10px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-400">
                    <li><strong>UP:</strong> Uang Pesangon (hingga 9 bulan upah)</li>
                    <li><strong>UPMK:</strong> Uang Penghargaan Masa Kerja (hingga 10 bulan upah)</li>
                    <li><strong>UPH:</strong> Penggantian hak sisa cuti & ongkos</li>
                  </ul>
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Tanggung Jawab Vendor Alih Daya:</span>
                  Vendor alih daya bertanggung jawab penuh membayar uang kompensasi atau pesangon. Pengguna wajib memverifikasi kuitansi transfer.
                </td>
              </tr>

              {/* Row 5: Kewajiban Pencatatan */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Kewajiban Pencatatan Daring
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Wajib Catat Daring &lt; 3 Hari Kerja:</span>
                  Wajib dicatatkan pada portal Kemnaker maksimal 3 hari kerja sejak penandatanganan (Pasal 14 PP 35/2021).
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Tercatat di HRIS & WLKP:</span>
                  Data karyawan tetap tercatat di sistem internal dan dilaporkan berkala via Wajib Lapor Ketenagakerjaan (WLKP).
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Izin Usaha OSS & Bukti Lapor:</span>
                  Vendor wajib memiliki NIB KBLI Alih Daya resmi dan mencatatkan perjanjian kerja sama ke Disnaker terkait.
                </td>
              </tr>

              {/* Row 6: Klausul Perlindungan Khusus (TUPE) */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Klausul Khusus & Pengakhiran
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Ganti Rugi Pemutusan Dini (Pasal 62):</span>
                  Pihak yang mengakhiri kontrak sebelum waktunya wajib membayar ganti rugi sebesar upah sisa masa kontrak + kompensasi proporsional.
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Jaminan Hari Tua & Pensiun:</span>
                  Wajib diikutsertakan seluruh program BPJS Ketenagakerjaan (JKK, JKM, JHT, JP) dan jalur bipartit jika terjadi sengketa.
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Prinsip TUPE (Pasal 19 PP 35/2021):</span>
                  Jaminan kelangsungan bekerja bagi pekerja alih daya apabila terjadi pergantian vendor penyedia sepanjang objek pekerjaan tetap ada.
                </td>
              </tr>

              {/* Row 7: Konsekuensi Audit */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Konsekuensi Audit Pelanggaran
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Beralih Menjadi PKWTT:</span>
                  Jika melanggar batasan jenis pekerjaan atau durasi, demi hukum status pekerja berubah menjadi <strong>Karyawan Tetap (PKWTT)</strong> sejak awal.
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Sengketa PHI & Denda:</span>
                  PHK sepihak tanpa mekanisme bipartit berakibat kewajiban membayar upah proses penuh di Pengadilan Hubungan Industrial (PHI).
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Risiko Tanggung Renteng:</span>
                  Jika vendor tidak berbadan hukum PT atau izin dicabut, demi hukum hubungan kerja beralih langsung ke perusahaan pengguna.
                </td>
              </tr>

              {/* Row 8: Bukti Audit Wajib */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800">
                  Dokumen Wajib Uji (PBC)
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <ul className="space-y-1 text-[10px] text-slate-600 dark:text-slate-400">
                    <li>• Bukti tanda terima catat online Kemnaker</li>
                    <li>• Naskah kontrak PKWT bertanda tangan</li>
                    <li>• Slip transfer uang kompensasi PKWT</li>
                  </ul>
                </td>
                <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <ul className="space-y-1 text-[10px] text-slate-600 dark:text-slate-400">
                    <li>• Surat Keputusan (SK) Pengangkatan Tetap</li>
                    <li>• Bukti setor BPJS Ketenagakerjaan JP & JHT</li>
                    <li>• Risalah Bipartit resmi bila ada mutasi/PHK</li>
                  </ul>
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300">
                  <ul className="space-y-1 text-[10px] text-slate-600 dark:text-slate-400">
                    <li>• Legalitas NIB OSS RBA & Akta PT Vendor</li>
                    <li>• Perjanjian Kerja Sama (PKS) memuat TUPE</li>
                    <li>• Rekap slip gaji pekerja alih daya ≥ UMK</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interactive Simulator: Simulasi Uang Kompensasi PKWT vs Pesangon PKWTT */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Kalkulator Simulasi: Uang Kompensasi PKWT vs Pesangon PKWTT
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uji perhitungan hak finansial pekerja sesuai formula resmi PP 35/2021.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Input Form */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Masa Kerja (Bulan):
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={simTenureMonths}
                    onChange={(e) => setSimTenureMonths(Number(e.target.value))}
                    className="w-full accent-slate-900 dark:accent-blue-600"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-xs w-16 text-right">
                    {simTenureMonths} bln ({(simTenureMonths / 12).toFixed(1)} thn)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upah Pokok + Tunjangan Tetap Bulanan (Rp):
                </label>
                <input
                  type="number"
                  step="100000"
                  value={simMonthlySalary}
                  onChange={(e) => setSimMonthlySalary(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Output Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Uang Kompensasi PKWT
                  </span>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                    Rp {pkwtComp.toLocaleString('id-ID')}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Formula: ({simTenureMonths}/12) × Rp {simMonthlySalary.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Estimasi Pesangon PKWTT (PHK)
                  </span>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                    Rp {pkwttSev.totalEstimate.toLocaleString('id-ID')}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  UP: Rp {pkwttSev.upValue.toLocaleString('id-ID')} + UPMK: Rp {pkwttSev.upmkValue.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
