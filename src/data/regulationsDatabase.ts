export interface ISOClauseDetail {
  clauseNumber: string;
  clauseTitle: string;
  description: string;
  auditPoint: string;
  mandatoryEvidence: string[];
}

export interface RegulationClause {
  lawLevel: 'UU' | 'PP' | 'PERMENAKER' | 'PERMEN_LHK' | 'PERMENKES' | 'KEPMEN' | 'ISO';
  code: string;
  title: string;
  article: string;
  derivativeOf?: string;
  isoCrossReference?: string;
  category: 'K3_KESELAMATAN' | 'KESEHATAN_KERJA' | 'LIMBAH_B3_LINGKUNGAN' | 'HUBUNGAN_KERJA' | 'JAMINAN_SOSIAL' | 'MANAJEMEN_MUTU_AUDIT';
  summary: string;
  legalSanction: string;
  mandatoryEvidence: string[];
  detailedClauses?: ISOClauseDetail[];
}

export const REGULATORY_DATABASE: RegulationClause[] = [
  // ==========================================
  // --- STANDAR INTERNASIONAL ISO (ISO STANDARDS) ---
  // ==========================================
  {
    lawLevel: 'ISO',
    code: 'ISO 45001:2018',
    title: 'Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3 Internasional)',
    article: 'Klausul 4 s/d Klausul 10 (High Level Structure)',
    derivativeOf: 'OHSAS 18001:2007 (Superseded)',
    isoCrossReference: 'Setara PP No. 50 Tahun 2012 (SMK3 Indonesia)',
    category: 'K3_KESELAMATAN',
    summary: 'Standar internasional utama untuk sistem manajemen K3. Menekankan pendekatan proaktif dalam pencegahan kecelakaan kerja dan penyakit akibat kerja (PAK), kepemimpinan manajemen puncak, partisipasi aktif pekerja, manajemen risiko berbasis HIRADC/IBPR, serta perbaikan berkelanjutan (PDCA Cycle).',
    legalSanction: 'Penerbitan Temuan Audit Major NC (Audit Sertifikasi ISO); Penundaan/Pencabutan Sertifikat ISO 45001:2018 oleh Badan Sertifikasi Internasional (Akreditasi KAN/IAF).',
    mandatoryEvidence: [
      'Manual & Kebijakan K3 ISO 45001 bertanda tangan Direksi',
      'Dokumen HIRADC / IBPR terupdate untuk seluruh zona kerja',
      'Matriks Kepatuhan Peraturan Perundangan K3 (Legal Register)',
      'Laporan Audit Internal K3 & Notulen Tinjauan Manajemen (Management Review)'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Klausul 4',
        clauseTitle: 'Konteks Organisasi & Partisipasi Pekerja',
        description: 'Menentukan isu internal/eksternal yang relevan dengan K3, memahami kebutuhan dan harapan pekerja serta pihak berkepentingan (Disnaker, BPJS, Masyarakat), dan menetapkan ruang lingkup Sistem Manajemen K3.',
        auditPoint: 'Apakah entitas telah mengidentifikasi seluruh isu internal & eksternal dan memetakan kebutuhan pekerja di stasiun pemrosesan limbah berisiko tinggi?',
        mandatoryEvidence: ['Dokumen Matriks Konteks Organisasi', 'Register Pihak Berkepentingan']
      },
      {
        clauseNumber: 'Klausul 5',
        clauseTitle: 'Kepemimpinan & Partisipasi Pekerja',
        description: 'Manajemen puncak wajib menunjukkan kepemimpinan dan komitmen terhadap SMK3, menetapkan Kebijakan K3, membagikan peran & tanggung jawab (P2K3), serta menjamin konsultasi dan partisipasi pekerja non-manajerial.',
        auditPoint: 'Apakah Kebijakan K3 dipublikasikan, dipahami pekerja, dan ada bukti konsultasi dengan perwakilan panitia K3/serikat pekerja?',
        mandatoryEvidence: ['Kebijakan K3 Sah', 'SKP P2K3 Disnaker', 'Notulen Konsultasi Pekerja']
      },
      {
        clauseNumber: 'Klausul 6',
        clauseTitle: 'Perencanaan K3 (Risiko & Peluang)',
        description: 'Proses identifikasi bahaya secara terus-menerus dan proaktif (HIRADC/IBPR), penilaian risiko K3, penentuan kewajiban penataan hukum K3, dan penetapan sasaran K3 yang terukur (Zero Accident, Zero PAK).',
        auditPoint: 'Apakah daftar IBPR mencakup bahaya kimia toksik, bahaya kebakaran TPS B3, bahaya ergonomi, dan kecelakaan armada transporter?',
        mandatoryEvidence: ['Dokumen Matriks IBPR/HIRADC 5x5', 'Matriks Evaluasi Kepatuhan Hukum K3']
      },
      {
        clauseNumber: 'Klausul 7',
        clauseTitle: 'Dukungan (Sumber Daya, Kompetensi, & Informasi Terdokumentasi)',
        description: 'Penyediaan sumber daya manusia & fasilitas, pemastian kompetensi pekerja (Lisensi K3 Kemnaker/BNSP), kepedulian K3 (Induksi K3, Safety Talk), komunikasi K3, serta pengendalian informasi terdokumentasi (SOP & Rekam K3).',
        auditPoint: 'Apakah operator insinerator, forklift, dan driver transporter memiliki lisensi K3 aktif dan tersimpan dalam sistem dokumentasi teratur?',
        mandatoryEvidence: ['Matriks Kompetensi & Lisensi K3', 'Absensi Safety Talk', 'SOP Terkendali']
      },
      {
        clauseNumber: 'Klausul 8',
        clauseTitle: 'Perencanaan & Pengendalian Operasional',
        description: 'Pelaksanaan pengendalian operasional hierarki K3 (Eliminasi, Subtitusi, Rekayasa Teknik, Pengendalian Administratif, APD), Manajemen Perubahan (MOC), Pengadaan Barang/Jasa Subkontraktor, serta Kesiapsiagaan & Tanggap Darurat (Emergency Response).',
        auditPoint: 'Apakah terdapat hirarki pengendalian bahaya yang terbukti di lapangan (interlock mesin, eyewash, APD respirator) serta skenario tanggap darurat tumpahan B3/kebakaran?',
        mandatoryEvidence: ['SOP Pengendalian Operasional B3', 'Prosedur MOC', 'Laporan Simulasi Tanggap Darurat']
      },
      {
        clauseNumber: 'Klausul 9',
        clauseTitle: 'Evaluasi Kinerja (Pemantauan, Audit, & Management Review)',
        description: 'Pemantauan dan pengukuran kinerja K3 (pengujian K3 lingkungan per 6 bulan, pemantauan kesehatan pekerja), evaluasi pemenuhan peraturan hukum, audit internal berkala, dan tinjauan manajemen puncak.',
        auditPoint: 'Apakah hasil tes laboratorium K3 lingkungan kerja dan rekap MCU dievaluasi dalam rapat Tinjauan Manajemen minimal 1 tahun sekali?',
        mandatoryEvidence: ['Laporan Uji Laboratorium K3 Terakreditasi', 'Laporan Audit Internal ISO 45001', 'Risalah Tinjauan Manajemen']
      },
      {
        clauseNumber: 'Klausul 10',
        clauseTitle: 'Peningkatan (Kejadian Insiden, Ketidaksesuaian, & CAPA)',
        description: 'Pelaporan dan penyelidikan insiden/hampir celaka (near-miss), penanganan ketidaksesuaian audit, tindakan korektif (CAPA) dengan analisis akar masalah (5-Why / Diagram Ishikawa), dan peningkatan berkelanjutan.',
        auditPoint: 'Apakah setiap kejadian ketidaksesuaian atau insiden ditindaklanjuti dengan analisis 5-Why dan bukti verifikasi efektif perbaikan?',
        mandatoryEvidence: ['Laporan Penyelidikan Insiden/Near-miss', 'Register CAPA ISO 45001', 'Bukti Verifikasi Perbaikan']
      }
    ]
  },
  {
    lawLevel: 'ISO',
    code: 'ISO 14001:2015',
    title: 'Sistem Manajemen Lingkungan (Environmental Management System)',
    article: 'Klausul 4 s/d Klausul 10 (Siklus Daur Hidup / Life Cycle Perspective)',
    derivativeOf: 'ISO 14001:2004 (Superseded)',
    isoCrossReference: 'Setara PP No. 22 Tahun 2021 & Permen LHK No. 6/2021',
    category: 'LIMBAH_B3_LINGKUNGAN',
    summary: 'Standar internasional pengelolaan lingkungan hidup. Mewajibkan organisasi memetakan Aspek & Dampak Lingkungan Penting (ADL), mengendalikan limbah B3, emisi cerobong, air limbah IPAL, serta mencegah pencemaran lingkungan dengan perspektif daur hidup (Life Cycle Perspective).',
    legalSanction: 'Temuan Major/Minor NC Audit ISO 14001; Risiko pembekuan sertifikat internasional dan sanksi penurunan peringkat PROPER Lingkungan Hidup KLHK.',
    mandatoryEvidence: [
      'Kebijakan Lingkungan Hidup ISO 14001',
      'Register Aspek & Dampak Lingkungan Penting (ADL / Aspect-Impact Matrix)',
      'Dokumen Persetujuan Lingkungan (Amdal/UKL-UPL) & Rintek TPS B3',
      'Laporan Hasil Pengujian Emisi Cerobong & Effluent IPAL berkala'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Klausul 6.1.2',
        clauseTitle: 'Aspek Lingkungan Penting (Aspect & Impact Assessment)',
        description: 'Identifikasi aspek lingkungan dari kegiatan, produk, dan jasa yang dapat dikendalikan dan dipengaruhi, dengan mempertimbangkan perspektif daur hidup (life cycle) mulai dari penerimaan limbah, pengangkutan, hingga pengolahan akhir.',
        auditPoint: 'Apakah penilaian aspek-dampak lingkungan mencakup potensi tumpahan limbah B3 cair, ceceran oli transporter, dan emisi gas dioksin/furans insinerator?',
        mandatoryEvidence: ['Matriks Identifikasi Aspek & Dampak Lingkungan (ADL)', 'Peta Alir Daur Hidup Limbah B3']
      },
      {
        clauseNumber: 'Klausul 8.1',
        clauseTitle: 'Pengendalian Operasional Lingkungan Hidup',
        description: 'Menetapkan kriteria operasional untuk proses pengolahan limbah B3, pengoperasian IPAL, pengelolaan TPS B3 (pencatatan logbook, masa simpan maks 90 hari), dan transportasi limbah B3 berizin.',
        auditPoint: 'Apakah operasional TPS B3 dan IPAL dijalankan sesuai kriteria teknis Permen LHK 6/2021 dengan neraca limbah B3 yang sesuai?',
        mandatoryEvidence: ['SOP Pengoperasian IPAL & Insinerator', 'Logbook & Neraca Limbah B3', 'Manifesto Festronik']
      },
      {
        clauseNumber: 'Klausul 8.2',
        clauseTitle: 'Kesiapsiagaan & Tanggap Darurat Lingkungan',
        description: 'Membuat prosedur tanggap darurat pencemaran lingkungan (tumpahan bahan kimia B3, kebocoran kolam IPAL, kebakaran TPS) dan melakukan pengujian berkala terhadap respon emergency.',
        auditPoint: 'Apakah ketersediaan spill kit bahan kimia dan simulasi tanggap darurat tumpahan B3 dilakukan dan didokumentasikan secara teratur?',
        mandatoryEvidence: ['Prosedur Tanggap Darurat Tumpahan B3', 'Checklist Inspeksi Spill Kit', 'Laporan Dril Tumpahan B3']
      },
      {
        clauseNumber: 'Klausul 9.1.2',
        clauseTitle: 'Evaluasi Pemenuhan Kewajiban Penataan (Compliance Evaluation)',
        description: 'Secara berkala mengevaluasi tingkat kepatuhan terhadap seluruh peraturan perundang-undangan lingkungan hidup (UU 32/2009, PP 22/2021, Permen LHK) dan persyaratan lain yang disepakati.',
        auditPoint: 'Apakah entitas memiliki bukti evaluasi kepatuhan hukum lingkungan hidup triwulanan yang diserahkan ke Dinas Lingkungan Hidup?',
        mandatoryEvidence: ['Laporan Evaluasi Kepatuhan Hukum Lingkungan', 'Tanda Terima Laporan RKL-RPL / UKL-UPL ke DLH']
      }
    ]
  },
  {
    lawLevel: 'ISO',
    code: 'ISO 9001:2015',
    title: 'Sistem Manajemen Mutu (Quality Management System)',
    article: 'Klausul 4 s/d Klausul 10 (Orientasi Kepuasan Pelanggan & Mutu Proses)',
    derivativeOf: 'ISO 9001:2008 (Superseded)',
    isoCrossReference: 'Pengendalian Mutu Jasa Pengolahan & Transporter Limbah B3',
    category: 'MANAJEMEN_MUTU_AUDIT',
    summary: 'Standar manajemen mutu internasional yang memastikan proses jasa pengolahan dan pengangkutan limbah B3 berjalan konsisten sesuai spesifikasi teknis, regulasi, dan ekspektasi penghasil limbah (tenants/clients).',
    legalSanction: 'Temuan Audit Ketidaksesuaian Mutu Jasa; Klaim ganti rugi pelanggan dan risikonya terhadap sertifikasi mutu.',
    mandatoryEvidence: [
      'Manual Mutu & Sasaran Mutu Operasional Pengolahan Limbah',
      'SOP Penerimaan & Verifikasi Manifest Limbah B3 Masuk (Inbound Inspection)',
      'Laporan Sertifikat Analisis (CoA) Hasil Pengolahan / Abu Insinerator',
      'Survei Kepuasan Pelanggan & Penanganan Keluhan (Customer Complaint Log)'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Klausul 8.5',
        clauseTitle: 'Pengendalian Penanganan, Pengangkutan & Pengolahan Limbah B3',
        description: 'Memastikan seluruh proses penerimaan, penimbangan, pengangkutan, hingga pemusnahan limbah B3 teridentifikasi (*traceability*) dan memiliki catatan penanganan yang akurat.',
        auditPoint: 'Apakah setiap drum limbah B3 yang masuk dapat dilacak nomor manifes, jenis kode limbah, dan lokasi penimbunan/pengolahannya?',
        mandatoryEvidence: ['SOP Traceability Limbah B3', 'Barcode/QR Code Label Tracking System']
      },
      {
        clauseNumber: 'Klausul 8.7',
        clauseTitle: 'Pengendalian Output Tidak Sesuai (Non-Conforming Output)',
        description: 'Prosedur penanganan limbah masuk yang tidak sesuai dengan karakteristik kesepakatan kontrak (*off-spec waste*) atau kerusakan kemasan drum saat pengangkutan.',
        auditPoint: 'Apakah terdapat karantina khusus dan berita acara penolakan/re-packaging untuk limbah off-spec yang tidak sesuai manifest?',
        mandatoryEvidence: ['SOP Karantina Limbah Off-Spec', 'Formulir Berita Acara Ketidaksesuaian Limbah']
      }
    ]
  },
  {
    lawLevel: 'ISO',
    code: 'ISO 19011:2018',
    title: 'Panduan Audit Sistem Manajemen (Guidelines for Auditing Management Systems)',
    article: 'Klausul 4 s/d Klausul 7 (Metodologi Audit Terpadu K3 & Lingkungan)',
    derivativeOf: 'ISO 19011:2011 (Superseded)',
    isoCrossReference: 'Metodologi Audit Standar untuk ISO 45001, ISO 14001 & SMK3 PP 50/2012',
    category: 'MANAJEMEN_MUTU_AUDIT',
    summary: 'Panduan internasional penyelenggaraan audit sistem manajemen. Menetapakan 7 prinsip utama audit (Integritas, Penyajian Objektif, Kerahasiaan, Independensi, Pendekatan Berbasis Bukti/Facts Over Opinions, Pendekatan Berbasis Risiko, dan Profesionalisme).',
    legalSanction: 'Gugurnya keabsahan (*invalidity*) Laporan Hasil Audit jika proses audit melanggar prinsip independensi dan kriteria bukti objektif.',
    mandatoryEvidence: [
      'Audit Charter (Piagam Audit Intern & Kode Etik Auditor)',
      'Dokumen Rencana Audit (Audit Plan) & Kertas Kerja Audit (KKA)',
      'Laporan Hasil Audit Resmi dengan Bukti Sampel Terverifikasi'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Klausul 5 & 6',
        clauseTitle: 'Pengelolaan Program Audit & Pelaksanaan Audit Lapangan',
        description: 'Menyusun jadwal program audit tahunan, menentukan ruang lingkup dan kriteria audit, mengumpulkan bukti objektif melalu wawancara, observasi fisik, dan verifikasi dokumen, serta menyusun temuan audit.',
        auditPoint: 'Apakah lead auditor menjalankan audit lapangan berbasis bukti nyata (foto, logbook, data kalibrasi) bukan asumsi?',
        mandatoryEvidence: ['Program Audit Tahunan', 'Daftar Periksa / Checklist Audit Terverifikasi', 'Kertas Kerja Audit (KKA)']
      },
      {
        clauseNumber: 'Klausul 7',
        clauseTitle: 'Kompetensi & Evaluasi Auditor',
        description: 'Auditor wajib memiliki kompetensi teknis di bidang K3, peraturan limbah B3, dan teknik pengujian audit, serta terdaftar dalam lisensi auditor sah (SKP Kemnaker / IRCA Registered).',
        auditPoint: 'Apakah tim auditor memiliki sertifikasi Lead Auditor ISO 45001/14001 atau SKP Auditor SMK3 Kemnaker?',
        mandatoryEvidence: ['Sertifikat Lead Auditor IRCA/Kemnaker', 'Evaluasi Kinerja Auditor']
      }
    ]
  },
  {
    lawLevel: 'ISO',
    code: 'ISO 31000:2018',
    title: 'Manajemen Risiko - Pedoman (Risk Management - Guidelines)',
    article: 'Klausul 5 s/d Klausul 6 (Kerangka Kerja & Proses Penilaian Risiko)',
    derivativeOf: 'ISO 31000:2009 (Superseded)',
    isoCrossReference: 'Terintegrasi dengan HIRADC / IBPR K3 & Analisis Risiko Lingkungan',
    category: 'K3_KESELAMATAN',
    summary: 'Pedoman pengelolaan risiko organisasi secara komprehensif. Mengatur prinsip penetapan konteks risiko, identifikasi risiko bahaya industri limbah, analisis probabilitas & dampak, evaluasi risiko, dan perlakuan risiko (risk treatment).',
    legalSanction: 'Risiko kegagalan penanganan bahaya kritis (kebakaran masif, pencemaran tanah, kematian pekerja) akibat penilaian risiko yang keliru.',
    mandatoryEvidence: [
      'Kerangka Kerja Manajemen Risiko Perusahaan (Risk Management Framework)',
      'Profil Risiko Korporat & Matriks Risiko 5x5 Terintegrasi',
      'Rencana Aksi Mitigasi Risiko Bahaya Tinggi (High-Risk Mitigation Plan)'
    ]
  },

  // ==========================================
  // --- UNDANG-UNDANG (UU) INDONESIA ---
  // ==========================================
  {
    lawLevel: 'UU',
    code: 'UU No. 1 Tahun 1970',
    title: 'Undang-Undang tentang Keselamatan Kerja',
    article: 'Pasal 3, Pasal 8, Pasal 9, Pasal 14',
    category: 'K3_KESELAMATAN',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 5, 6 & 8',
    summary: 'Landasan yuridis tertinggi keselamatan kerja di Indonesia. Mewajibkan pengurus memeriksa kesehatan fisik dan mental tenaga kerja (pra-kerja, berkala, purna tugas/exit MCU), menyelenggarakan pembinaan pencegahan kecelakaan, serta menyediakan APD secara cuma-cuma.',
    legalSanction: 'Pidana kurungan selama-lamanya 3 bulan atau denda setinggi-tingginya Rp 100.000,- (dapat ditingkatkan sanksi administratif penghentian izin alat/pabrik).',
    mandatoryEvidence: [
      'Buku Pengesahan P2K3 Disnaker',
      'Arsip Sertifikat Dokter Pemeriksa Kesehatan Kerja (SKP Hiperkes)',
      'Tanda terima penyerahan APD lengkap gratis',
      'Pemasangan rambu K3 di seluruh titik bahaya'
    ]
  },
  {
    lawLevel: 'UU',
    code: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
    title: 'UU Ketenagakerjaan jo. UU Penetapan Perppu Cipta Kerja (Regulasi Pokok Hubungan Kerja & K3)',
    article: 'Pasal 56 s/d 66 (PKWT, PKWTT, Alih Daya) & Pasal 86-87 (SMK3)',
    category: 'HUBUNGAN_KERJA',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 5 & ISO 9001 Klausul 8',
    summary: 'Undang-Undang pokok yang mengatur bentuk hubungan kerja di Indonesia: Perjanjian Kerja Waktu Tertentu (PKWT/Kontrak), Perjanjian Kerja Waktu Tidak Tertentu (PKWTT/Karyawan Tetap), dan Alih Daya (Outsourcing). Mengatur larangan masa percobaan (probation) pada PKWT, kewajiban pembayaran uang kompensasi PKWT saat kontrak berakhir (Pasal 61A), pemisahan pekerjaan alih daya, perlindungan prinsip TUPE, serta kewajiban penerapan SMK3.',
    legalSanction: 'PKWT yang melanggar ketentuan jenis pekerjaan atau masa percobaan batal demi hukum dan beralih status menjadi PKWTT (Pekerja Tetap) sejak awal; sanksi administratif hingga pidana denda/kurungan untuk pelanggaran hak-hak normatif upah lembur dan pesangon.',
    mandatoryEvidence: [
      'Naskah Fisik & Digital PKWT/PKWTT yang sah ditandatangani kedua pihak',
      'Bukti Pendaftaran/Pencatatan PKWT Daring ke Portal Resmi Kemnaker RI',
      'Bukti Hitung & Kuitansi Pembayaran Uang Kompensasi PKWT (Pasal 61A)',
      'Perjanjian Kerja Sama (PKS) Alih Daya dengan Vendor Berizin NIB OSS RBA',
      'Klausul Jaminan Hak Pekerja Alih Daya & Bukti Penerapan Prinsip TUPE'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Pasal 56 - 59',
        clauseTitle: 'Ketentuan PKWT vs PKWTT & Larangan Masa Percobaan',
        description: 'Perjanjian kerja dibuat untuk waktu tertentu (PKWT) atau waktu tidak tertentu (PKWTT). PKWT hanya dapat dibuat untuk pekerjaan yang selesai dalam waktu tertentu, musiman, atau produk baru. PKWT dilarang untuk pekerjaan yang bersifat tetap/rutin. PKWT dilarang mensyaratkan masa percobaan kerja (probation). Jika disyaratkan masa percobaan, maka ketentuan masa percobaan batal demi hukum dan masa kerja tetap dihitung.',
        auditPoint: 'Apakah terdapat pekerja operasional inti (core business) yang di-PKWT-kan terus-menerus atau ada klausul masa percobaan (probation) di dalam draft PKWT?',
        mandatoryEvidence: ['Dokumen PKWT Karyawan', 'Struktur Skala Upah & Uraian Jabatan', 'Bukti Catat Disnaker']
      },
      {
        clauseNumber: 'Pasal 61A',
        clauseTitle: 'Kewajiban Pembayaran Uang Kompensasi PKWT',
        description: 'Pengusaha wajib memberikan uang kompensasi kepada pekerja PKWT yang masa kerjanya telah berakhir atau telah diselesaikan. Uang kompensasi diberikan kepada pekerja yang mempunyai masa kerja minimal 1 (satu) bulan secara terus-menerus, dengan perhitungan proporsional berdasarkan formula regulasi.',
        auditPoint: 'Apakah setiap karyawan kontrak yang masa kontraknya selesai atau diperpanjang telah menerima transfer uang kompensasi PKWT sesuai rumus PP 35/2021?',
        mandatoryEvidence: ['Slip Gaji & Bukti Transfer Uang Kompensasi PKWT', 'Rekapitulasi Data Payroll PKWT']
      },
      {
        clauseNumber: 'Pasal 64 - 66',
        clauseTitle: 'Rezim Alih Daya (Outsourcing) & Prinsip Perlindungan TUPE',
        description: 'Perusahaan dapat menyerahkan sebagian pelaksanaan pekerjaan kepada perusahaan alih daya (vendor) melalui perjanjian penyediaan jasa berbadan hukum PT. Hubungan kerja antara pekerja alih daya dengan vendor berbentuk PKWT atau PKWTT. Wajib menerapkan prinsip TUPE (Transfer of Undertaking Protection of Employment) yaitu jaminan kelangsungan bekerja bagi pekerja jika terjadi pergantian vendor alih daya sepanjang objek pekerjaan tetap ada.',
        auditPoint: 'Apakah perusahaan vendor outsourcing (cleaning, security, transporter pendukung) memiliki NIB aktif, membayar upah minimal UMK, dan memuat klausul TUPE?',
        mandatoryEvidence: ['Kontrak PKS Vendor Alih Daya', 'Audit Kepatuhan Hak Normatif Vendor Outsourcing', 'Klausul TUPE Perjanjian']
      }
    ]
  },
  {
    lawLevel: 'UU',
    code: 'UU No. 2 Tahun 2004',
    title: 'Penyelesaian Perselisihan Hubungan Industrial (PPHI)',
    article: 'Pasal 3 s/d Pasal 54, Pasal 81 s/d Pasal 122',
    category: 'HUBUNGAN_KERJA',
    isoCrossReference: 'Mendukung ISO 9001:2015 Klausul 8.2 & Tata Kelola Sengketa',
    summary: 'Mengatur tata cara formal penyelesaian perselisihan hak, perselisihan kepentingan, perselisihan PHK, dan perselisihan antar serikat pekerja. Menetapkan tahapan wajib perundingan Bipartit (maksimal 30 hari kerja), Mediasi/Konsiliasi Tripartit di Kantor Dinas Tenaga Kerja (penerbitan Risalah & Anjuran Tertulis), hingga pengajuan gugatan ke Pengadilan Hubungan Industrial (PHI) dan Kasasi Mahkamah Agung.',
    legalSanction: 'Gugatan sengketa di PHI dapat berakibat putusan eksekusi pembayaran upah proses, penetapan status pekerja PKWT menjadi PKWTT, dan denda kompensasi kerugian hak pekerja.',
    mandatoryEvidence: [
      'Risalah Perundingan Bipartit & Daftar Hadir Resmi',
      'Perjanjian Bersama (PB) yang didaftarkan ke Kepaniteraan PHI',
      'Surat Bukti Pencatatan Perselisihan ke Kantor Dinas Tenaga Kerja'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Pasal 3 - 7',
        clauseTitle: 'Tahapan Perundingan Bipartit Wajib',
        description: 'Perselisihan hubungan industrial wajib diupayakan penyelesaiannya terlebih dahulu melalui perundingan bipartit secara musyawarah untuk mufakat dalam jangka waktu paling lama 30 hari kerja sejak tanggal dimulainya perundingan.',
        auditPoint: 'Apakah setiap perselisihan status kerja atau pemutusan hubungan kerja selalu didahului risalah resmi perundingan bipartit bertanda tangan?',
        mandatoryEvidence: ['Buku Notulen Bipartit', 'Risalah Perundingan Bipartit Lengkap']
      },
      {
        clauseNumber: 'Pasal 8 - 14',
        clauseTitle: 'Mediasi Tripartit Disnaker & Anjuran Tertulis',
        description: 'Jika bipartit gagal, salah satu atau kedua belah pihak mencatatkan perselisihannya kepada instansi yang bertanggung jawab di bidang ketenagakerjaan setempat untuk dilakukan mediasi tripartit.',
        auditPoint: 'Apakah perusahaan menaati anjuran tertulis mediator atau mendaftarkan Perjanjian Bersama ke PHI?',
        mandatoryEvidence: ['Anjuran Tertulis Mediator Hubungan Industrial', 'Akta Pendaftaran Perjanjian Bersama PHI']
      }
    ]
  },
  {
    lawLevel: 'UU',
    code: 'UU No. 32 Tahun 2009 jo. UU No. 6 Tahun 2023',
    title: 'UU Perlindungan dan Pengelolaan Lingkungan Hidup (PPLH)',
    article: 'Pasal 59, Pasal 69 ayat (1), Pasal 102, Pasal 104',
    category: 'LIMBAH_B3_LINGKUNGAN',
    isoCrossReference: 'Mendukung ISO 14001:2015 Klausul 6.1, 8.1 & 9.1.2',
    summary: 'Setiap orang/badan usaha yang menghasilkan limbah B3 wajib melakukan pengelolaan limbah B3 dengan izin kelayakan lingkungan. Melarang keras pembuangan limbah B3 ke media lingkungan tanpa izin (dumping/bypassing IPAL).',
    legalSanction: 'Pidana penjara paling singkat 1 tahun dan paling lama 3 tahun serta denda paling sedikit Rp 1 miliar dan paling banyak Rp 3 miliar (Pasal 104).',
    mandatoryEvidence: [
      'Persetujuan Lingkungan (Amdal/UKL-UPL) & Rintek Limbah B3',
      'Izin Operasional TPS B3 & IPAL aktif',
      'Manifesto Elektronik Festronik KLHK lengkap'
    ]
  },
  {
    lawLevel: 'UU',
    code: 'UU No. 24 Tahun 2011',
    title: 'Undang-Undang Badan Penyelenggara Jaminan Sosial (BPJS)',
    article: 'Pasal 14, Pasal 15, Pasal 19',
    category: 'JAMINAN_SOSIAL',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 5.4 & 7.1',
    summary: 'Pemberi kerja wajib mendaftarkan dirinya dan seluruh pekerjanya sebagai peserta BPJS Ketenagakerjaan (JKK, JKM, JHT, JP) dan BPJS Kesehatan, serta memungut dan menyetorkan iuran tepat waktu.',
    legalSanction: 'Sanksi administratif teguran tertulis, denda, hingga tidak mendapatkan pelayanan publik tertentu (izin usaha, tender, dsb), serta pidana kurungan maksimal 8 tahun atau denda Rp 1 miliar bagi pemotong iuran yang tidak menyetorkan.',
    mandatoryEvidence: [
      'Sertifikat Kepesertaan BPJS Ketenagakerjaan Perusahaan',
      'Kuitansi bukti bayar iuran bulanan 100% headcount karyawan',
      'Data kepesertaan tenaga kerja alih daya/kontraktor'
    ]
  },
  {
    lawLevel: 'UU',
    code: 'UU No. 3 Tahun 2014 jo. UU No. 6 Tahun 2023',
    title: 'Undang-Undang Perindustrian & Standardisasi Teknis',
    article: 'Pasal 44, Pasal 84 s/d Pasal 90',
    category: 'MANAJEMEN_MUTU_AUDIT',
    isoCrossReference: 'Mendukung ISO 9001:2015 Klausul 8.2 & 8.5',
    summary: 'Mengatur standar teknis industri pengolahan bahan berbahaya, penerapan Standar Nasional Indonesia (SNI) wajib untuk peralatan berisiko tinggi, serta pengelolaan limbah hasil industri.',
    legalSanction: 'Pencabutan Izin Usaha Industri (IUI) dan pemblokiran perizinan berusaha di portal OSS RBA.',
    mandatoryEvidence: [
      'Izin Usaha Industri (IUI) Pengolahan Limbah B3 RBA',
      'Sertifikat SNI Produk/Peralatan Kerja Teknis'
    ]
  },

  // ==========================================
  // --- PERATURAN PEMERINTAH (PP) ---
  // ==========================================
  {
    lawLevel: 'PP',
    code: 'PP No. 50 Tahun 2012',
    title: 'Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)',
    article: 'Pasal 5 s/d Pasal 16, Lampiran Kriteria Audit',
    derivativeOf: 'UU No. 13 Tahun 2003 Pasal 87',
    isoCrossReference: 'Padanan Nasional ISO 45001:2018',
    category: 'K3_KESELAMATAN',
    summary: 'Turunan wajib bagi perusahaan yang mempekerjakan minimal 100 pekerja atau memiliki tingkat potensi bahaya tinggi (seperti industri pengolahan limbah B3). Menetapkan 5 prinsip SMK3: Kebijakan K3, Perencanaan K3, Pelaksanaan Rencana K3, Pemantauan dan Evaluasi Kinerja K3, serta Peninjauan & Peningkatan Kinerja K3.',
    legalSanction: 'Audit SMK3 wajib berkala oleh Lembaga Audit Independen Kemenaker; kegagalan penerapan berakibat rekomendasi pencabutan izin operasional dari instansi ketenagakerjaan.',
    mandatoryEvidence: [
      'Laporan Hasil Audit SMK3 (Kategori 166 Kriteria Tingkat Lanjutan)',
      'Dokumen HIRADC / IBPR (Identifikasi Bahaya dan Penilaian Risiko)',
      'Notulen Tinjauan Manajemen (Management Review) K3 tahunan'
    ]
  },
  {
    lawLevel: 'PP',
    code: 'PP No. 22 Tahun 2021',
    title: 'Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup',
    article: 'Pasal 274 s/d Pasal 490 (Bab VII Pengelolaan Limbah B3)',
    derivativeOf: 'UU No. 32 Tahun 2009 & UU Cipta Kerja',
    isoCrossReference: 'Padanan Nasional ISO 14001:2015',
    category: 'LIMBAH_B3_LINGKUNGAN',
    summary: 'Regulasi induk teknis limbah B3. Mengatur tata cara penetapan limbah B3, pengurangan, penyimpanan di TPS B3, pengumpulan, pengangkutan berizin Ditjen Hubdat & KLHK, pemanfaatan, pengolahan (termal/insinerator & stabilisasi), serta penimbunan (landfill). Menetapkan kewajiban kompetensi personil penanggung jawab.',
    legalSanction: 'Sanksi administratif bertingkat: Teguran tertulis, Paksaan Pemerintah, Denda Administratif, Pembekuan Perizinan Berusaha, hingga Pencabutan Perizinan Berusaha.',
    mandatoryEvidence: [
      'Sertifikat Kompetensi BNSP POPLB3 dan POPAL bagi personel kunci',
      'Logbook pencatatan limbah B3 keluar-masuk TPS (Maksimal simpan 90/180 hari)',
      'Neraca Limbah B3 Triwulanan ke Dinas Lingkungan Hidup'
    ]
  },
  {
    lawLevel: 'PP',
    code: 'PP No. 35 Tahun 2021',
    title: 'Perjanjian Kerja Waktu Tertentu (PKWT), Alih Daya (Outsourcing), Waktu Kerja & Istirahat, serta Pemutusan Hubungan Kerja (PHK)',
    article: 'Pasal 4 s/d Pasal 61 (Bab II, III, IV, & V)',
    derivativeOf: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
    category: 'HUBUNGAN_KERJA',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 7.1 & ISO 9001:2015 Klausul 7.1.2',
    summary: 'Peraturan Pemerintah komprehensif pelaksana klaster ketenagakerjaan. Mengatur secara mendalam: 1) PKWT (batasan jangka waktu maks 5 tahun, larangan masa percobaan, kewajiban pencatatan daring maks 3 hari), 2) Uang Kompensasi PKWT wajib dibayarkan saat kontrak berakhir (rumus proporsional masa kerja), 3) Alih Daya/Outsourcing (perizinan vendor, perlindungan upah, prinsip TUPE), 4) Waktu Kerja & Upah Lembur (maks 4 jam/hari, 18 jam/minggu), dan 5) Tata Cara PHK serta formula Uang Pesangon (UP), Uang Penghargaan Masa Kerja (UPMK), dan Uang Penggantian Hak (UPH).',
    legalSanction: 'PKWT yang melanggar jangka waktu atau objek kerja berubah demi hukum menjadi PKWTT (Pekerja Tetap); pelanggaran uang kompensasi dan pesangon berakibat sanksi denda keterlambatan, nota pemeriksaan pengawas ketenagakerjaan, hingga putusan sita eksekusi PHI.',
    mandatoryEvidence: [
      'Bukti Tanda Terima Pendaftaran PKWT Daring di Sistem Kemnaker RI',
      'Arsip Matriks Kontrak PKWT (Masa Kerja, Nilai Upah, & Tanggal Berakhir)',
      'Formula & Kuitansi Pembayaran Uang Kompensasi PKWT Setiap Periode',
      'Perjanjian Kerja Sama (PKS) Vendor Alih Daya Berbadan Hukum PT & NIB OSS',
      'Surat Pernyataan Pemenuhan Prinsip TUPE dari Vendor Alih Daya',
      'Surat Pemberitahuan PHK, Risalah Bipartit, & Bukti Transfer Pesangon PP 35'
    ],
    detailedClauses: [
      {
        clauseNumber: 'Pasal 4 - 14 (Bab II)',
        clauseTitle: 'Persyaratan Sah, Jenis Pekerjaan & Jangka Waktu PKWT',
        description: 'PKWT didasarkan atas jangka waktu (maksimal 5 tahun termasuk perpanjangan) atau selesainya suatu pekerjaan tertentu. PKWT tidak dapat diadakan untuk pekerjaan yang bersifat tetap. Pengusaha wajib mencatatkan PKWT pada kementerian ketenagakerjaan secara daring paling lama 3 (tiga) hari kerja sejak penandatanganan PKWT. Jika melanggar, demi hukum berubah menjadi PKWTT.',
        auditPoint: 'Apakah seluruh kontrak PKWT telah dicatatkan secara online di Kemnaker dalam tempo <3 hari kerja dan durasi total tidak melebihi 5 tahun?',
        mandatoryEvidence: ['Bukti Registrasi Daring Kemnaker RI', 'Logbook Kontrak PKWT HRD']
      },
      {
        clauseNumber: 'Pasal 15 - 17 (Bab II Bagian Keempat)',
        clauseTitle: 'Ketentuan & Formula Matematis Uang Kompensasi PKWT',
        description: 'Pengusaha wajib memberikan uang kompensasi kepada pekerja PKWT yang mempunyai masa kerja minimal 1 bulan terus menerus. Besaran uang kompensasi: 1) PKWT 12 bulan terus menerus = 1 bulan upah. 2) PKWT kurang/lebih dari 12 bulan = (Masa Kerja / 12) x 1 bulan upah. Upah yang digunakan adalah Upah Pokok + Tunjangan Tetap.',
        auditPoint: 'Apakah perhitungan uang kompensasi PKWT dihitung dengan rumus (Masa Kerja / 12) x Upah sebulan dan dibayarkan saat berakhirnya kontrak/perpanjangan?',
        mandatoryEvidence: ['Slip Transfer Kompensasi PKWT', 'Kertas Kerja Perhitungan Kompensasi HR Payroll']
      },
      {
        clauseNumber: 'Pasal 18 - 20 (Bab III)',
        clauseTitle: 'Rezim Alih Daya (Outsourcing) & Perlindungan Prinsip TUPE',
        description: 'Perusahaan alih daya berbentuk badan hukum PT dan wajib memenuhi perizinan berusaha OSS RBA. Hubungan kerja antara perusahaan alih daya dengan pekerja dituangkan dalam PKWT atau PKWTT. Dalam hal pekerja alih daya diikat dengan PKWT, perjanjian kerja harus mensyaratkan pengalihan perlindungan hak-hak bagi pekerja apabila terjadi pergantian perusahaan alih daya sepanjang objek pekerjaannya tetap ada (TUPE).',
        auditPoint: 'Apakah kontrak kerja vendor alih daya mencantumkan klausul TUPE dan bukti kepatuhan pembayaran UMK serta BPJS Ketenagakerjaan seluruh pekerjanya?',
        mandatoryEvidence: ['Naskah PKS Vendor Alih Daya', 'Klausul TUPE Perjanjian', 'Laporan Audit Kepatuhan Vendor']
      },
      {
        clauseNumber: 'Pasal 26 - 34 (Bab IV)',
        clauseTitle: 'Batasan Waktu Kerja Lembur & Formula Upah Lembur',
        description: 'Waktu kerja lembur hanya dapat dilakukan paling banyak 4 jam dalam 1 hari dan 18 jam dalam 1 minggu (tidak termasuk lembur pada hari libur resmi). Pengusaha wajib membayar upah kerja lembur: Untuk jam kerja lembur pertama sebesar 1,5 x upah sejam, dan untuk jam kerja lembur berikutnya sebesar 2 x upah sejam. Upah sejam = 1/173 x Upah Sebulan.',
        auditPoint: 'Apakah terdapat over-limit lembur di atas 18 jam/minggu pada operator dan supir B3, serta apakah formula lembur dihitung per 1/173?',
        mandatoryEvidence: ['Surat Perintah Lembur (SPL)', 'Kertas Kerja Audit Overtime Formula 1/173']
      },
      {
        clauseNumber: 'Pasal 36 - 61 (Bab V)',
        clauseTitle: 'Tata Cara PHK, Formula Uang Pesangon (UP), UPMK, & UPH',
        description: 'PHK dilakukan melalui tahapan pemberitahuan resmi. Jika menolak, dilakukan Bipartit dan mediasi. Besaran hak PHK karyawan tetap (PKWTT) meliputi: 1) Uang Pesangon (UP) hingga 9 bulan upah, 2) Uang Penghargaan Masa Kerja (UPMK) hingga 10 bulan upah, 3) Uang Penggantian Hak (UPH) cuti belum gugur & ongkos pulang. Besaran pengali pesangon disesuaikan dengan alasan PHK (efisiensi, pelanggaran SP3, pensiun, dsb).',
        auditPoint: 'Apakah pembayaran pesangon PKWTT yang mengalami PHK sesuai dengan tabel pengali alasan PHK Pasal 40 - 58 PP 35/2021?',
        mandatoryEvidence: ['Surat Pemberitahuan PHK', 'Perjanjian Bersama PHK', 'Bukti Transfer Pesangon']
      }
    ]
  },
  {
    lawLevel: 'PP',
    code: 'PP No. 44 Tahun 2015 jo. PP No. 82 Tahun 2019',
    title: 'Penyelenggaraan Program Jaminan Kecelakaan Kerja dan Jaminan Kematian',
    article: 'Pasal 16, Lampiran Tarif Iuran Tingkat Risiko',
    derivativeOf: 'UU No. 24 Tahun 2011',
    category: 'JAMINAN_SOSIAL',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 5.4',
    summary: 'Mengklasifikasikan industri limbah B3 dan bahan kimia berbahaya ke dalam Tingkat Risiko Sangat Tinggi (Kelompok V) dengan besaran iuran JKK sebesar 1,74% dari upah sebulan yang wajib ditanggung 100% oleh pemberi kerja.',
    legalSanction: 'Jika terjadi kecelakaan kerja dan pekerja belum terdaftar, pengusaha wajib menanggung seluruh santunan kecelakaan kerja dan pengobatan sesuai standar manfaat BPJS.',
    mandatoryEvidence: [
      'Formulir pendaftaran kode kelompok usaha KBLI Industri Limbah B3',
      'Slip gaji bukti tidak ada pemotongan iuran JKK terhadap upah pekerja'
    ]
  },
  {
    lawLevel: 'PP',
    code: 'PP No. 5 Tahun 2021',
    title: 'Penyelenggaraan Perizinan Berusaha Berbasis Risiko (OSS RBA)',
    article: 'Pasal 10 s/d Pasal 45 (KBLI Industri Limbah B3 Risiko Tinggi)',
    derivativeOf: 'UU No. 6 Tahun 2023 Cipta Kerja',
    category: 'LIMBAH_B3_LINGKUNGAN',
    isoCrossReference: 'Mendukung ISO 14001:2015 & ISO 45001:2018 Klausul 6.1.3',
    summary: 'Menetapakan bahwa kegiatan usaha pengolahan dan pengangkutan limbah B3 masuk dalam kategori Risiko Tinggi (High Risk), yang membutuhkan NIB, Sertifikat Standar terverifikasi, dan Izin Operasional KLHK & Kemenhub.',
    legalSanction: 'Pembekuan otomatis akses perizinan OSS RBA dan penutupan paksa lokasi kegiatan usaha.',
    mandatoryEvidence: [
      'NIB & Izin Usaha Risiko Tinggi Terverifikasi OSS RBA',
      'Dokumen Penilaian Kesesuaian Standar Usaha'
    ]
  },

  // ==========================================
  // --- PERATURAN MENTERI (PERMEN) ---
  // ==========================================
  {
    lawLevel: 'PERMENAKER',
    code: 'Permenaker No. 5 Tahun 2018',
    title: 'Keselamatan dan Kesehatan Kerja Lingkungan Kerja',
    article: 'Pasal 5 s/d Pasal 44 & Lampiran Standar NAB',
    derivativeOf: 'UU No. 1 Tahun 1970 & PP No. 50 Tahun 2012',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 8.1 & 9.1',
    category: 'KESEHATAN_KERJA',
    summary: 'Standar wajib faktor fisika, kimia, biologi, ergonomi, dan psikologi kerja. Menetapkan Nilai Ambang Batas (NAB) pajanan uap kimia, kewajiban pengujian kualitas udara lingkungan kerja per 6 bulan, biomonitoring indikator biologis pajanan (BEI), serta fasilitas sanitasi loker ganda (double locker) dan ruang dekontaminasi.',
    legalSanction: 'Nota Pemeriksaan Pengawas Ketenagakerjaan; penghentian sementara operasional lini proses yang melebihi NAB tanpa pengendalian teknis.',
    mandatoryEvidence: [
      'Laporan Pengujian Higiene Industri oleh Laboratorium Penguji K3 Terakreditasi',
      'Sertifikat Kalibrasi alat ukur gas detektor & sound level meter',
      'SOP Sistem Loker Ganda & Fasilitas Bilas Mandi Dekontaminasi'
    ]
  },
  {
    lawLevel: 'PERMENAKER',
    code: 'Permenakertrans No. Per.02/MEN/1980',
    title: 'Pemeriksaan Kesehatan Tenaga Kerja Dalam Penyelenggaraan Keselamatan Kerja',
    article: 'Pasal 2, Pasal 3, Pasal 4, Pasal 5',
    derivativeOf: 'UU No. 1 Tahun 1970 Pasal 8',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 8.1.2 & 9.1',
    category: 'KESEHATAN_KERJA',
    summary: 'Mewajibkan 3 jenis pemeriksaan kesehatan kerja: 1) MCU Pra-Kerja (Sebelum diterima bekerja), 2) MCU Berkala (Minimal 1 tahun sekali atau per 6 bulan untuk bahaya toksik tinggi), dan 3) MCU Akhir / Purna Tugas (Exit MCU) sebelum berhenti/PHK untuk memastikan ada/tidaknya Penyakit Akibat Kerja (PAK).',
    legalSanction: 'Tuntutan ganti rugi perdata dan klaim Penyakit Akibat Kerja (PAK) dari eks-pekerja bila tidak ada rekam medis Exit MCU pembukti kondisi purna tugas.',
    mandatoryEvidence: [
      'Buku Rekam Medis Kerja Karyawan tersimpan aman dan konfidensial',
      'Formulir Exit MCU bertanda tangan dokter hiperkes dan pekerja',
      'Laporan Rekapitulasi Tahunan MCU ke Dinas Tenaga Kerja'
    ]
  },
  {
    lawLevel: 'PERMENAKER',
    code: 'Permenakertrans No. Per.08/MEN/VII/2010',
    title: 'Alat Pelindung Diri (APD)',
    article: 'Pasal 2, Pasal 3, Pasal 6, Pasal 7',
    derivativeOf: 'UU No. 1 Tahun 1970 Pasal 14',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 8.1.2',
    category: 'K3_KESELAMATAN',
    summary: 'Pengusaha wajib menyediakan APD yang memenuhi SNI atau standar internasional secara cuma-cuma kepada seluruh pekerja dan pengunjung. Wajib mengumumkan cara pemakaian yang benar serta melakukan pengujian fit-test respirator penahan uap kimia.',
    legalSanction: 'Teguran tertulis dan penghentian pekerjaan berisiko tanpa APD memadai.',
    mandatoryEvidence: [
      'Sertifikat Standar Uji APD (SNI / ANSI / EN Standard)',
      'Lembar Fit-Test Kerapatan Respirator (Metode Uji Asap/Bitrex)',
      'Kartu Matriks Kebutuhan APD per Zona Bahaya'
    ]
  },
  {
    lawLevel: 'PERMENAKER',
    code: 'Permenaker No. Kep.187/MEN/1999',
    title: 'Pengendalian Bahan Kimia Berbahaya di Tempat Kerja',
    article: 'Pasal 3 s/d Pasal 17',
    derivativeOf: 'UU No. 1 Tahun 1970',
    isoCrossReference: 'Mendukung ISO 45001:2018 & ISO 14001:2015 Klausul 8.1',
    category: 'K3_KESELAMATAN',
    summary: 'Perusahaan dengan potensi bahaya besar/menengah wajib memiliki Petugas K3 Kimia dan Ahli K3 Kimia, menyediakan Lembar Data Keselamatan Bahan (LDKB/MSDS) 16 Bab dalam Bahasa Indonesia, dan memasang label/piktogram bahaya GHS.',
    legalSanction: 'Pemberian Nota Peringatan dan penghentian penanganan bahan kimia jika tidak memiliki personil Ahli K3 Kimia bersertifikat Kemnaker.',
    mandatoryEvidence: [
      'SKP & Lisensi Ahli K3 Kimia / Petugas K3 Kimia aktif Kemnaker',
      'Dokumen Penetapan Potensi Bahaya Bahan Kimia (Kategori Besar/Menengah)',
      'Katalog MSDS/LDKB 16 Bab berbahasa Indonesia di setiap stasiun kerja'
    ]
  },
  {
    lawLevel: 'PERMENAKER',
    code: 'Permenaker No. Per.04/MEN/1987',
    title: 'Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3)',
    article: 'Pasal 2 s/d Pasal 12',
    derivativeOf: 'UU No. 1 Tahun 1970 Pasal 10',
    isoCrossReference: 'Mendukung ISO 45001:2018 Klausul 5.4',
    category: 'K3_KESELAMATAN',
    summary: 'Tempat kerja dengan 100 orang pekerja atau bahaya tinggi wajib membentuk P2K3. Sekretaris P2K3 wajib Ahli K3 Umum bersertifikat. Wajib mengadakan rapat K3 minimal 1 kali sebulan dan menyerahkan laporan triwulan ke Disnaker.',
    legalSanction: 'Pemeriksaan khusus oleh Pengawas Ketenagakerjaan dan penundaan rekomendasi perizinan ketenagakerjaan.',
    mandatoryEvidence: [
      'Surat Keputusan (SK) Pengesahan P2K3 dari Disnaker Provinsi',
      'Notulen Rapat Bulanan P2K3 bertanda tangan pimpinan',
      'Tanda Terima Laporan Triwulan P2K3 ke Kantor Disnaker'
    ]
  },
  {
    lawLevel: 'PERMEN_LHK',
    code: 'Permen LHK No. 6 Tahun 2021',
    title: 'Tata Cara dan Persyaratan Pengelolaan Limbah Bahan Berbahaya dan Beracun',
    article: 'Pasal 5 s/d Pasal 189',
    derivativeOf: 'PP No. 22 Tahun 2021',
    isoCrossReference: 'Mendukung ISO 14001:2015 Klausul 8.1 & 8.2',
    category: 'LIMBAH_B3_LINGKUNGAN',
    summary: 'Mengatur standar teknis bangunan TPS Limbah B3, sistem kemasan, penempatan simbol dan label limbah B3, tata cara pengoperasian insinerator, tata cara pelaporan manifes elektronik Festronik, serta prosedur tanggap darurat tumpahan (spill kit).',
    legalSanction: 'Pencabutan rekomendasi teknis pengolahan limbah B3 dan penyegelan fasilitas pengolahan oleh Pejabat Pengawas Lingkungan Hidup (PPLH).',
    mandatoryEvidence: [
      'Persetujuan Teknis (Pertek) Penyimpanan & Pengolahan Limbah B3',
      'Logbook Harian & Simbol Label terpasang pada seluruh kemasan drum B3',
      'Akun & Rekap Pengiriman Festronik KLHK'
    ]
  },
  {
    lawLevel: 'PERMEN_LHK',
    code: 'Permen LHK No. P.05/2018',
    title: 'Standar Kompetensi Personil Operasional Pengendalian Pencemaran Lingkungan',
    article: 'Pasal 2 s/d Pasal 8',
    derivativeOf: 'PP No. 22 Tahun 2021',
    isoCrossReference: 'Mendukung ISO 14001:2015 Klausul 7.2',
    category: 'LIMBAH_B3_LINGKUNGAN',
    summary: 'Menetapkan standar kompetensi kerja nasional untuk Penanggung Jawab Pengendalian Pencemaran Air (PPPA), Penanggung Jawab Operasional Pengolahan Air Limbah (POPAL), dan Penanggung Jawab Operasional Pengelolaan Limbah B3 (POPLB3).',
    legalSanction: 'Pemberian nilai ketidaksesuaian PROPER Lingkungan Hidup (PROPER Merah/Hitam) jika fasilitas limbah diawaki oleh personil tanpa sertifikasi BNSP aktif.',
    mandatoryEvidence: [
      'Sertifikat Kompetensi BNSP POPLB3 / POPAL / PPPA yang masih aktif',
      'Logbook pemeliharaan kompetensi tahunan'
    ]
  }
];
