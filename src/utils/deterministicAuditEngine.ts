import { ChecklistItem, AuditSession, CAPAItem, AIAnalysisResult } from '../types/audit';

// Pre-defined expert system rule database for each audit clause in PT. Dame Alam Sejahtera (DAS Group)
export interface ClauseRuleAction {
  rootCause5Why: string[];
  correctiveAction: string;
  preventiveAction: string;
  requiredEvidence: string;
  targetDays: number;
  legalRiskStatement: string;
  picDefault: string;
}

export const DETERMINISTIC_CLAUSE_RULES: Record<string, ClauseRuleAction> = {
  'REC-01': {
    rootCause5Why: [
      'Mengapa 1: Pekerja baru belum melampirkan hasil uji fungsi organ sensitif (spirometri/faal hati/ginjal).',
      'Mengapa 2: Lab klinik rujukan rekrutmen hanya melakukan tes darah rutin biasa.',
      'Mengapa 3: HR Recruitment belum menerbitkan spesifikasi paket MCU khusus paparan limbah B3 ke vendor klinik.',
      'Mengapa 4: Belum ada koordinasi teknis antara Dokter Hiperkes perusahaan dan tim talent acquisition.',
      'Mengapa 5: Prosedur seleksi belum menetapkan Surat Bebas Hambatan Kerja dari Dokter Hiperkes sebagai syarat mutlak terbitnya PKWT.'
    ],
    correctiveAction: 'Wajibkan seluruh calon pekerja area limbah menjalani MCU susulan dengan parameter spirometri, SGOT/SGPT, dan kreatinin di lab rekanan resmi terakreditasi dalam 3x24 jam.',
    preventiveAction: 'Tetapkan Standar Operasional Baku (SOP-HR-002) Paket MCU Pra-Kerja B3 dan integrasikan verifikasi clearance medis ke dalam sistem onboarding sebelum penandatanganan kontrak.',
    requiredEvidence: 'Sertifikat kelayakan kerja (Fit-to-Work) bertanda tangan Dokter Hiperkes ber-SKP Kemenaker dan arsip rekam medis klinik.',
    targetDays: 7,
    legalRiskStatement: 'Potensi pelanggaran Permenakertrans No. 02/MEN/1980 Pasal 2 dan ancaman sanksi nota pengawasan Disnaker jika mempekerjakan personil tanpa rekam kesehatan pra-kerja.',
    picDefault: 'Dewi Lestari (Corporate HR)'
  },
  'REC-02': {
    rootCause5Why: [
      'Mengapa 1: Teknisi de-watering dan pengolah oli bekas Sukabumi belum memiliki data kadar logam berat awal.',
      'Mengapa 2: Biomonitoring baseline dianggap sebagai biaya tambahan dan belum dijadwalkan.',
      'Mengapa 3: Protokol higiene industri belum mewajibkan baseline toksikologi darah/urin sebelum penempatan.',
      'Mengapa 4: Tidak adanya integrasi antara penilaian risiko HIRA dengan dokumen rekrutmen HRD.',
      'Mengapa 5: Kebijakan perlindungan liabilitas Penyakit Akibat Kerja (PAK) jangka panjang belum dipahami secara menyeluruh.'
    ],
    correctiveAction: 'Lakukan pengujian toksikologi darah/urin baseline (Pb, Hg, Cd, metabolit pelarut) untuk seluruh karyawan baru divisi operasional pengolahan.',
    preventiveAction: 'Buat basis data rekam pajanan digital pekerja yang wajib diisi data baseline sebelum hari pertama dinas di plant operasional DAS Group.',
    requiredEvidence: 'Laporan Hasil Uji Toksikologi Laboratorium Rujukan Terakreditasi KAN / Balai K3 Kemenaker.',
    targetDays: 5,
    legalRiskStatement: 'Hilangnya bukti pembelaan hukum perusahaan terhadap klaim Penyakit Akibat Kerja (PAK) kronis di kemudian hari sesuai Permenaker 05/2018.',
    picDefault: 'Bambang Suryono (HSE Manager)'
  },
  'REC-03': {
    rootCause5Why: [
      'Mengapa 1: Driver tangki limbah B3 Transporter Nasional Sabang-Merauke tidak memiliki lisensi K3 Angkutan B3 aktif.',
      'Mengapa 2: Perekrutan driver hanya memverifikasi SIM BII Umum tanpa mengecek lisensi pelatihan B3 Kemenhub/KLHK.',
      'Mengapa 3: Matriks kualifikasi personil logistik limbah belum diperbarui sesuai PP 22/2021.',
      'Mengapa 4: Tingginya turnover driver pengiriman jarak jauh sehingga verifikasi sertifikasi terlewatkan.',
      'Mengapa 5: Tidak adanya sistem otomatis pengingat masa berlaku sertifikat kompetensi pengemudi di sistem HRD.'
    ],
    correctiveAction: 'Tarik sementara driver terkait dari rute pengangkutan limbah B3 dan daftarkan pelatihan sertifikasi Pengemudi Angkutan B3 resmi Kemenhub/KLHK.',
    preventiveAction: 'Kunci penugasan surat jalan armada limbah di sistem logistik DAS Group agar hanya dapat diterbitkan bagi driver dengan lisensi B3 aktif.',
    requiredEvidence: 'Sertifikat Kompetensi Pengemudi Angkutan Bahan/Limbah B3 dari Kemenhub/KLHK & Lisensi BNSP aktif.',
    targetDays: 14,
    legalRiskStatement: 'Penghentian armada dan penilangan oleh Ditjen Hubdat & Gakkum KLHK saat pemeriksaan manifes jalan raya Sabang-Merauke.',
    picDefault: 'Rian Hidayat (Head of Logistics Fleet)'
  },
  'REC-04': {
    rootCause5Why: [
      'Mengapa 1: Ditemukan personil magang atau pekerja berumur di bawah ketentuan di area pengolahan Karawang.',
      'Mengapa 2: Verifikasi berkas identitas KTP dan ijazah saat seleksi awal tidak menggunakan verifikasi silang.',
      'Mengapa 3: Kebijakan zonasi umur belum ditempel di pos keamanan pintu masuk instalasi limbah.',
      'Mengapa 4: Kurangnya pengawasan dari supervisor lapangan terhadap tenaga bantuan harian.',
      'Mengapa 5: Belum ada SOP tertulis mengenai pembatasan ketat penempatan pekerja muda di fasilitas berbahaya.'
    ],
    correctiveAction: 'Lakukan mutasi segera ke unit administrasi non-operasional dan terbitkan teguran tertulis kepada tim seleksi rekrutmen.',
    preventiveAction: 'Terapkan validasi otomatis tanggal lahir pada formulir pelamar HRIS untuk memblokir penempatan di bawah 18 tahun di area B3.',
    requiredEvidence: 'Surat Keputusan Mutasi, salinan KTP terverifikasi, dan Berita Acara Teguran Disiplin.',
    targetDays: 2,
    legalRiskStatement: 'Pelanggaran pidana ketenagakerjaan UU No. 13/2003 Pasal 68 dengan ancaman pidana penjara 1 hingga 4 tahun.',
    picDefault: 'Dewi Lestari (Corporate HR)'
  },
  'ONB-01': {
    rootCause5Why: [
      'Mengapa 1: Kru transporter dan pekerja baru langsung masuk area plant Karawang tanpa sertifikat induksi.',
      'Mengapa 2: Jadwal induksi K3 hanya diadakan seminggu sekali sehingga pekerja baru menunggu sambil bekerja.',
      'Mengapa 3: Belum tersedia modul induksi kilat terstandarisasi sebelum memasuki gerbang plant.',
      'Mengapa 4: Satpam pos gerbang belum diwajibkan memeriksa Safety Passport / kartu pas induksi.',
      'Mengapa 5: Lemahnya koordinasi antara divisi operasional logistik dengan seksi keselamatan kerja (HSE).'
    ],
    correctiveAction: 'Hentikan aktivitas kerja personil terkait dan selenggarakan induksi K3 keselamatan limbah 16 jam komprehensif hari ini.',
    preventiveAction: 'Pasang sistem kontrol akses palang otomatis (*turnstile barrier*) berbasis barcode Safety Passport yang hanya aktif setelah lulus post-test induksi.',
    requiredEvidence: 'Daftar hadir induksi K3, lembar evaluasi pre/post-test (skor >= 80%), dan kartu Safety Passport.',
    targetDays: 1,
    legalRiskStatement: 'Pelanggaran langsung UU No. 1 Tahun 1970 Pasal 9 ayat (1) dan PP 50/2012 kriteria audit SMK3 12.1.',
    picDefault: 'Bambang Suryono (HSE Manager)'
  },
  'ONB-02': {
    rootCause5Why: [
      'Mengapa 1: Pekerja di area de-watering Sukabumi tidak memahami arti piktogram bahaya drum limbah.',
      'Mengapa 2: Lembar Data Keselamatan Bahan (MSDS/LDKB) yang terpasang masih berbahasa asing dan berukuran kecil.',
      'Mengapa 3: Sosialisasi MSDS 16 Bab belum pernah diuji secara acak dalam safety talk mingguan.',
      'Mengapa 4: Belum ada pelatihan visual interaktif mengenai simbol GHS limbah B3.',
      'Mengapa 5: Tanggung jawab pemeliharaan papan MSDS tidak didelegasikan ke level pengawas shift.'
    ],
    correctiveAction: 'Ganti seluruh MSDS/LDKB dengan format Bahasa Indonesia 16 Bab berukuran besar dan pasang stiker piktogram GHS tahan cuaca di tiap tangki/drum.',
    preventiveAction: 'Wajibkan sesi "15 Menit Kupas MSDS Bahan Kimia" di setiap apel pagi (Toolbox Meeting) bergilir tiap shift.',
    requiredEvidence: 'Foto papan informasi LDKB 16 Bab terpasang dan logbook daftar hadir safety briefing harian.',
    targetDays: 3,
    legalRiskStatement: 'Pelanggaran Kepmenaker No. Kep.187/MEN/1999 tentang Pengendalian Bahan Kimia Berbahaya di Tempat Kerja.',
    picDefault: 'Supervisor K3 Plant Sukabumi'
  },
  'ONB-03': {
    rootCause5Why: [
      'Mengapa 1: Operator plant Karawang memakai respirator full-face dengan kondisi janggut tebal sehingga segel bocor.',
      'Mengapa 2: Pekerja menganggap kerapatan masker tidak terpengaruh oleh rambut wajah.',
      'Mengapa 3: Belum pernah dilakukan uji kerapatan kabut (smoke fit test) secara berkala.',
      'Mengapa 4: Belum diterbitkan kebijakan resmi mengenai standar kerapatan wajah (Clean-Shaven Policy).',
      'Mengapa 5: Tidak tersedianya alternatif perlindungan seperti Powered Air-Purifying Respirator (PAPR) untuk pekerja khusus.'
    ],
    correctiveAction: 'Instruksikan operator mencukur rambut wajah yang menghalangi segel silikon dan laksanakan smoke fit-test ulang sebelum shift berlanjut.',
    preventiveAction: 'Terbitkan Surat Edaran Direksi Kebijakan Bebas Janggut di Zona Uap Toksik dan lakukan pengadaan masker tipe PAPR bertudung untuk kondisi khusus.',
    requiredEvidence: 'Lembar hasil uji smoke fit-test bertanda tangan dan Surat Edaran Kebijakan K3 DAS Group No. SE-015/HSE/2026.',
    targetDays: 2,
    legalRiskStatement: 'Pelanggaran Permenakertrans No. 08/MEN/VII/2010 tentang APD dan risiko keracunan inhalasi uap kimia beracun.',
    picDefault: 'Koordinator K3 Karawang'
  },
  'ONB-04': {
    rootCause5Why: [
      'Mengapa 1: Truk transporter Sabang-Merauke tidak membawa kotak spill kit lengkap atau bahan penyerapnya habis.',
      'Mengapa 2: Driver tidak melakukan inspeksi checklist perlengkapan darurat sebelum keberangkatan armada.',
      'Mengapa 3: Belum ada stok cadangan absorben pad dan pasir/serbuk gergaji di pool logistik.',
      'Mengapa 4: Formulir serah terima kendaraan hanya memeriksa kondisi ban dan mesin tanpa item K3 limbah.',
      'Mengapa 5: Lemahnya audit berkala kelayakan unit angkutan B3 sebelum rilis surat perintah jalan.'
    ],
    correctiveAction: 'Lengkapi seketika kotak spill kit on-board dengan absorbent boom, pad, sarung tangan nitril tebal, kacamata goggle, dan kantong limbah kuning di seluruh unit truk.',
    preventiveAction: 'Wajibkan verifikasi fisik checklist K3 On-Board (APAR, Spill Kit, Eyewash Portable, Manifes) oleh dispatcher sebelum gate-pass armada dibuka.',
    requiredEvidence: 'Foto perlengkapan spill kit on-board per nomor polisi truk dan tanda tangan checklist inspeksi armada.',
    targetDays: 2,
    legalRiskStatement: 'Sanksi pencabutan izin rekomendasi pengangkutan limbah B3 oleh Ditjen PSLB3 KLHK sesuai PP 22/2021 Pasal 339.',
    picDefault: 'Kepala Pool Armada Logistik'
  },
  'K3-01': {
    rootCause5Why: [
      'Mengapa 1: Tekanan pompa hydrant gudang B3 Karawang di bawah 7 bar atau katup macet saat pengujian.',
      'Mengapa 2: Pemeliharaan berkala pompa hydrant diesel tidak dijalankan sesuai jadwal mingguan pasca-kebakaran Oktober 2025.',
      'Mengapa 3: Tidak ada kontrak servis berkala dengan vendor proteksi kebakaran profesional bersertifikasi.',
      'Mengapa 4: Logbook inspeksi hydrant hanya diisi secara formalitas tanpa pengetesan aliran air nyata.',
      'Mengapa 5: Anggaran pemeliharaan sarana penanggulangan kebakaran belum dijadikan prioritas utama.'
    ],
    correctiveAction: 'Lakukan servis darurat pompa hydrant diesel, kalibrasi pressure switch ke 7.5 bar, dan lakukan uji pancar (flow test) di hadapan Lead Auditor.',
    preventiveAction: 'Jalin kontrak pemeliharaan preventif resmi (service contract) dengan vendor kebakaran berizin Disnaker dan adakan uji coba otomatis pompa tiap hari Senin.',
    requiredEvidence: 'Berita Acara Flow-Test Hydrant dan sertifikat laik uji instalasi penyalur air pemadam dari Dinas Pemadam Kebakaran & Disnaker.',
    targetDays: 3,
    legalRiskStatement: 'Pelanggaran berat Permenaker No. 04/MEN/1980 dan instruksi pencegahan kebakaran berulang pasca-insiden Karawang Oktober 2025.',
    picDefault: 'Koordinator Fire & Safety Karawang'
  },
  'K3-02': {
    rootCause5Why: [
      'Mengapa 1: Drum bahan pelarut mudah terbakar di gudang Karawang ditumpuk bersebelahan tanpa jarak aman 2 meter.',
      'Mengapa 2: Luas area gudang terbatas sementara volume limbah masuk dari klien BUMN/swasta melonjak.',
      'Mengapa 3: Petugas forklift tidak mengikuti panduan zonasi denah tata letak penempatan limbah B3.',
      'Mengapa 4: Garis marka penataan lantai gudang telah pudar dan belum dicat ulang pasca renovasi.',
      'Mengapa 5: Kurangnya pengawasan harian dari Kepala Gudang terhadap kapasitas daya tampung blok.'
    ],
    correctiveAction: 'Atur ulang tata letak drum limbah dengan forklift, terapkan jarak lorong sirkulasi minimal 2 meter, dan pisahkan drum pelarut ke blok tahan api.',
    preventiveAction: 'Cat ulang marka lantai tahan kimia kuning-hitam dan pasang sensor pembatas kapasitas maksimal per blok penyimpanan.',
    requiredEvidence: 'Foto denah tata letak aktual pasca-penataan dan kartu inventaris limbah per blok TPS B3.',
    targetDays: 2,
    legalRiskStatement: 'Pelanggaran PP No. 22 Tahun 2021 Pasal 295 tentang Tata Cara Penyimpanan Limbah B3 dan risiko percikan api memicu kebakaran hebat.',
    picDefault: 'Kepala Gudang TPS B3 Karawang'
  },
  'K3-03': {
    rootCause5Why: [
      'Mengapa 1: Pengujian udara ambien permukiman warga sekitar gudang Karawang terlambat dari jadwal komitmen triwulan.',
      'Mengapa 2: Koordinasi dengan laboratorium lingkungan terakreditasi KAN belum dijadwalkan tepat waktu.',
      'Mengapa 3: Hubungan komunikasi dengan tokoh masyarakat sekitar belum memiliki forum berkala yang formal.',
      'Mengapa 4: Tim CSR dan HSE belum menyatukan agenda audit sosial pasca-insiden Oktober 2025.',
      'Mengapa 5: Monitoring dampak lingkungan permukiman belum diintegrasikan ke laporan UKL-UPL semesteran.'
    ],
    correctiveAction: 'Panggil laboratorium lingkungan rekanan terakreditasi KAN untuk melakukan sampling udara ambien di 4 titik permukiman warga dalam 48 jam.',
    preventiveAction: 'Bentuk Tim Tanggap Warga Lingkungan Karawang dan buat papan transparansi indeks kualitas udara di dekat gerbang plant.',
    requiredEvidence: 'Laporan Hasil Pengujian (LHP) Udara Ambien dari Laboratorium Terakreditasi KAN dan tanda terima sosialisasi ke pengurus RW/Desa.',
    targetDays: 7,
    legalRiskStatement: 'Tuntutan ganti rugi lingkungan masyarakat dan sanksi paksaan pemerintah dari Dinas Lingkungan Hidup Kab. Karawang sesuai UU 32/2009.',
    picDefault: 'Public Relations & Environmental Officer'
  },
  'K3-04': {
    rootCause5Why: [
      'Mengapa 1: Operator de-watering lumpur Sukabumi tidak memakai kacamata goggle saat membersihkan saringan filter press.',
      'Mengapa 2: Kacamata goggle yang disediakan berembun akibat uap panas pengeringan (drying).',
      'Mengapa 3: Pengadaan APD belum memilih kacamata anti-fog tahan uap kimia suhu tinggi.',
      'Mengapa 4: Prosedur operasional standar (IK) pembersihan saringan lumpur tidak ditempel di mesin.',
      'Mengapa 5: Supervisor produksi membiarkan pelanggaran demi mengejar target kapasitas tonase pengeringan.'
    ],
    correctiveAction: 'Sediakan kacamata goggle tipe anti-fog ventilasi tidak langsung dan face shield pelindung percikan bagi seluruh kru mesin de-watering.',
    preventiveAction: 'Pasang tirai pelindung percikan transparan pada area pelepasan cake lumpur filter press dan evaluasi KPI keselamatan supervisor.',
    requiredEvidence: 'Foto kelengkapan APD anti-fog terdistribusi dan tanda terima serah terima perlengkapan.',
    targetDays: 3,
    legalRiskStatement: 'Kecelakaan kerja cedera kornea mata akibat percikan lumpur korosif, melanggar Permenaker 08/2010.',
    picDefault: 'Supervisor Plant Sukabumi'
  },
  'K3-05': {
    rootCause5Why: [
      'Mengapa 1: Pekerja instalasi pengolahan oli bekas terpapar uap hidrokarbon tanpa sirkulasi blower vakum yang memadai.',
      'Mengapa 2: Saluran exhaust hood penyedot uap reboiler mengalami sumbatan jelaga oli.',
      'Mengapa 3: Jadwal pembersihan cerobong dan saringan uap tidak dijalankan teratur.',
      'Mengapa 4: Tidak ada alat ukur portabel pendeteksi gas hidrokarbon (VOC detector) di ruang proses.',
      'Mengapa 5: Evaluasi higene industri ruang kerja oli belum mencakup pemantauan laju aliran udara ventilasi.'
    ],
    correctiveAction: 'Lakukan overhaul pembersihan saluran cerobong exhaust reboiler oli bekas dan pastikan laju hisap udara kembali di atas standar Permenaker.',
    preventiveAction: 'Pasang sensor detektor gas uap hidrokarbon otomatis yang menyalakan blower sekunder jika konsentrasi uap mendekati ambang bahaya.',
    requiredEvidence: 'Laporan Pengukuran Higiene Udara Ruang Kerja dan Berita Acara Perawatan Sistem Exhaust.',
    targetDays: 5,
    legalRiskStatement: 'Paparan uap hidrokarbon karsinogenik melebihi NAB Permenaker No. 5 Tahun 2018 Lampiran I.',
    picDefault: 'Kepala Unit Pemanfaatan Oli Bekas Sukabumi'
  },
  'K3-06': {
    rootCause5Why: [
      'Mengapa 1: Driver tangki limbah lintas pulau Sabang-Merauke menyetir lebih dari 5 jam tanpa henti.',
      'Mengapa 2: Target jadwal bongkar di pabrik klien mendesak sehingga driver memaksakan perjalanan.',
      'Mengapa 3: Belum diwajibkannya sopir cadangan (driver tandem) untuk perjalanan ekspedisi di atas 500 km.',
      'Mengapa 4: Pemantauan GPS telematika armada hanya memonitor posisi rute tanpa memicu alarm batas durasi lelah.',
      'Mengapa 5: Prosedur Fatigue Management belum memiliki sanksi tegas bagi pelanggaran batas jam istirahat.'
    ],
    correctiveAction: 'Tugaskan sopir pengganti (tandem driver) di pos check-point terdekat dan berikan waktu istirahat tidur teratur minimal 8 jam.',
    preventiveAction: 'Integrasikan sistem GPS Fleet DAS Group dengan alarm otomatis jika mesin menyala kontinu lebih dari 4 jam, serta wajibkan 2 driver untuk rute di atas 12 jam.',
    requiredEvidence: 'Log telematika GPS perjalanan armada dan formulir deklarasi kebugaran pengemudi (Fit-to-Drive Checklist).',
    targetDays: 4,
    legalRiskStatement: 'Kecelakaan fatal lalu lintas akibat kelelahan (micro-sleep), melanggar UU No. 22/2009 tentang LLAJ Pasal 90 dan PP 22/2021.',
    picDefault: 'Fleet Safety Supervisor'
  },
  'TRM-01': {
    rootCause5Why: [
      'Mengapa 1: Operator purna tugas berhenti kerja tanpa menjalani Exit Medical Check-Up.',
      'Mengapa 2: HR Payroll mencairkan hak pesangon tanpa melihat tanda tangan clearance dokter klinik.',
      'Mengapa 3: Prosedur Exit Clearance masih menggunakan formulir kertas yang terpisah dari sistem penggajian.',
      'Mengapa 4: Manajemen belum menyadari risiko gugatan Penyakit Akibat Kerja yang dapat diajukan bertahun-tahun setelah berhenti.',
      'Mengapa 5: Tidak adanya juknis resmi integrasi klinik dengan HR Corporate dalam proses PHK.'
    ],
    correctiveAction: 'Segera terbitkan surat panggilan resmi pelaksanaan Exit MCU susulan di lab klinik rekanan terdekat dengan seluruh biaya ditanggung 100% oleh DAS Group.',
    preventiveAction: 'Kunci secara sistem digital proses settlement akhir di sistem HRIS sebelum ada lampiran resume medis Exit MCU dari dokter berwenang.',
    requiredEvidence: 'Surat Panggilan Exit MCU, Bukti Registrasi Lab, dan Lembar Verifikasi Exit Clearance HRD-HSE.',
    targetDays: 5,
    legalRiskStatement: 'Pelanggaran langsung Permenakertrans No. 02/MEN/1980 Pasal 4 ayat (1) dan potensi gugatan perdata ganti rugi cacat kerja pasca-hubungan kerja berakhir.',
    picDefault: 'Dewi Lestari (Corporate HR)'
  }
};

// Pure deterministic algorithm to analyze live audit session without AI
export function generateDeterministicAuditAnalysis(auditSession: AuditSession): AIAnalysisResult {
  const { overallScore, items, facilityName } = auditSession;
  
  const ncItems = items.filter(i => i.status === 'MINOR_NC' || i.status === 'MAJOR_NC');
  const criticalItems = items.filter(i => i.status === 'CRITICAL_HAZARD');
  const compliantItems = items.filter(i => i.status === 'COMPLIANT');

  // Identify specific domain breaches deterministically
  const hasFireRisk = items.some(i => (i.code === 'K3-01' || i.code === 'K3-02') && i.status !== 'COMPLIANT');
  const hasTransporterRisk = items.some(i => (i.code === 'REC-03' || i.code === 'ONB-04' || i.code === 'K3-06') && i.status !== 'COMPLIANT');
  const hasMedicalExitRisk = items.some(i => (i.code === 'TRM-01' || i.code === 'REC-01' || i.code === 'K3-02') && i.status !== 'COMPLIANT');
  const hasSludgeOilRisk = items.some(i => (i.code === 'K3-04' || i.code === 'K3-05') && i.status !== 'COMPLIANT');
  const hasCommunityRisk = items.some(i => i.code === 'K3-03' && i.status !== 'COMPLIANT');

  // Deterministic Legal Risks calculation
  const legalRisks: string[] = [];
  if (hasFireRisk) {
    legalRisks.push('Potensi sanksi penghentian sementara izin TPS B3 Karawang sesuai PP No. 22/2021 & instruksi pengawasan K3 Disnaker pasca-insiden kebakaran Oktober 2025.');
  }
  if (hasTransporterRisk) {
    legalRisks.push('Risiko pencegatan dan pembekuan izin trayek angkutan limbah B3 Sabang-Merauke oleh Ditjen Hubdat & Gakkum KLHK akibat lisensi driver atau spill kit tidak lengkap.');
  }
  if (hasMedicalExitRisk) {
    legalRisks.push('Liabilitas hukum perselisihan hubungan industrial dan gugatan ganti rugi Penyakit Akibat Kerja (PAK) kronis sesuai Permenakertrans 02/1980 & UU 13/2003.');
  }
  if (hasSludgeOilRisk) {
    legalRisks.push('Penyimpangan Nilai Ambang Batas (NAB) faktor kimia & higiene industri pada unit de-watering dan pengolahan oli bekas Sukabumi sesuai Permenaker 05/2018.');
  }
  if (hasCommunityRisk) {
    legalRisks.push('Tuntutan ganti rugi lingkungan masyarakat permukiman sekitar Karawang Barat jika pengujian udara ambien terlewatkan sesuai UU 32/2009.');
  }
  if (legalRisks.length === 0) {
    legalRisks.push('Tingkat kepatuhan tinggi; risiko hukum minimal selama pemeliharaan sistem proteksi dan administrasi dipertahankan konsisten.');
  }

  // Deterministic Action Priorities
  const actionPriorities: string[] = [];
  if (criticalItems.length > 0) {
    actionPriorities.push(`SEGERA terbitkan Nota Stop-Work / Mitigasi Darurat untuk ${criticalItems.length} klausul bahaya kritis (${criticalItems.map(c => c.code).join(', ')}) dalam 1x24 jam.`);
  }
  if (hasFireRisk) {
    actionPriorities.push('Lakukan uji coba aliran pompa hydrant 7.5 bar dan penataan segregasi lorong drum limbah pelarut mudah terbakar di plant Karawang Barat.');
  }
  if (hasMedicalExitRisk) {
    actionPriorities.push('Kunci alur pencairan pesangon di sistem HRIS sebelum sertifikat Exit MCU dari dokter pemeriksa kerja terverifikasi.');
  }
  if (hasTransporterRisk) {
    actionPriorities.push('Wajibkan verifikasi checklist K3 on-board (Spill Kit, lisensi B3 driver) sebelum surat perintah jalan transporter Sabang-Merauke dirilis.');
  }
  if (actionPriorities.length < 3) {
    actionPriorities.push('Lakukan sosialisasi budaya K3 "One Team, One Goal, One Spirit" pada apel pagi shift Karawang & Sukabumi.');
    actionPriorities.push('Lengkapi bukti dokumen verifikasi fisik di seluruh titik inspeksi sesuai matriks klausul SMK3.');
  }

  // Deterministic Audit Verdict
  let auditVerdict = '';
  if (overallScore >= 90 && criticalItems.length === 0 && ncItems.length <= 1) {
    auditVerdict = 'Kepatuhan Istimewa (Memenuhi Standar Sertifikasi SMK3 Emas & ISO 45001/14001).';
  } else if (overallScore >= 80 && criticalItems.length === 0) {
    auditVerdict = 'Kepatuhan Baik Bersyarat (Lulus Bersyarat dengan Penyelesaian CAPA Minor Terjadwal).';
  } else if (overallScore >= 70 && criticalItems.length === 0) {
    auditVerdict = 'Kepatuhan Cukup (Wajib Penyelesaian CAPA Prioritas Tinggi Sebelum Audit Eksternal).';
  } else {
    auditVerdict = 'Kepatuhan Kritis (Terdapat Bahaya Kritis / Ketidaksesuaian Mayor yang Membutuhkan Tindakan Penghentian Sementara).';
  }

  // Deterministic Executive Summary
  const summary = `Berdasarkan evaluasi otomatis terprogram sistem pakar audit PT. Dame Alam Sejahtera (DAS Group) terhadap fasilitas ${facilityName}, tercatat indeks kepatuhan ${overallScore}%. Dari ${items.length} klausul audit siklus kerja dan K3 limbah, ${compliantItems.length} klausul dinyatakan Sesuai, ${ncItems.length} klausul berstatus Ketidaksesuaian (NC), dan ${criticalItems.length} klausul Bahaya Kritis. Fokus pengendalian mencakup keandalan hydrant pasca-insiden Karawang, kepatuhan keselamatan armada Transporter Sabang-Merauke, proteksi de-watering & pemanfaatan oli bekas di Plant Sukabumi, serta jaminan perlindungan Exit MCU karyawan.`;

  return {
    summary,
    legalRisks,
    actionPriorities,
    auditVerdict
  };
}

// Pure deterministic algorithm to generate CAPA for an item without AI
export function generateDeterministicCapaDraft(item: ChecklistItem): {
  rootCause5Why: string[];
  correctiveAction: string;
  preventiveAction: string;
  requiredEvidence: string;
  targetDays: number;
  pic: string;
} {
  const rule = DETERMINISTIC_CLAUSE_RULES[item.code];

  if (rule) {
    return {
      rootCause5Why: rule.rootCause5Why,
      correctiveAction: rule.correctiveAction,
      preventiveAction: rule.preventiveAction,
      requiredEvidence: rule.requiredEvidence,
      targetDays: item.status === 'CRITICAL_HAZARD' ? Math.min(3, rule.targetDays) : rule.targetDays,
      pic: rule.picDefault
    };
  }

  // Standard fallback deterministic rule
  const isCritical = item.status === 'CRITICAL_HAZARD';
  const isMajor = item.status === 'MAJOR_NC';

  return {
    rootCause5Why: [
      `Mengapa 1: Ketidaksesuaian pada klausul ${item.code} (${item.title}) terjadi di lapangan.`,
      `Mengapa 2: Kurangnya inspeksi pengawasan harian dari pengawas shift terkait.`,
      `Mengapa 3: Instruksi kerja standar (IK) belum disosialisasikan secara merata kepada seluruh personil pelaksana.`,
      `Mengapa 4: Belum adanya mekanisme verifikasi silang (cross-check checklist) sebelum kegiatan operasional dijalankan.`,
      `Mengapa 5: Budaya kepatuhan keselamatan "One Team, One Goal, One Spirit" belum dijadikan indikator penilaian kinerja utama (KPI) personil.`
    ],
    correctiveAction: `Lakukan perbaikan langsung terhadap temuan "${item.title}": lengkapi berkas dan perbaiki kondisi fisik dalam batas waktu ${isCritical ? '2x24 jam' : '7 hari kerja'} serta terbitkan Berita Acara Perbaikan.`,
    preventiveAction: `Perbarui Prosedur Operasional Standar (SOP) DAS Group terkait, masukkan klausul verifikasi wajib ke checklist harian pengawas, dan laksanakan evaluasi ulang pada rapat P2K3 bulanan.`,
    requiredEvidence: 'Foto dokumentasi fisik perbaikan, logbook verifikasi lapangan, dan Berita Acara yang ditandatangani Supervisor HSE.',
    targetDays: isCritical ? 2 : isMajor ? 7 : 14,
    pic: 'Bambang Suryono (HSE Manager) & Dewi Lestari (Corporate HR)'
  };
}
