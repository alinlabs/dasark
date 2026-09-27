import { ChecklistItem } from '../../types/audit';

export const ONBOARDING_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Induksi K3 Umum & Budaya Kerja DAS Group
  {
    id: 'onb-01',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Induksi K3 Umum & Budaya Perusahaan',
    code: 'ONB-01',
    category: 'Induksi Keselamatan Terstruktur',
    title: 'Induksi Keselamatan 16 Jam & Internalisasi Budaya "One Team, One Goal, One Spirit"',
    description: 'Setiap karyawan baru (kru logistik, operator gudang Karawang, teknisi Sukabumi) wajib menyelesaikan program induksi K3 selama minimal 16 jam, mencakup pengenalan bahaya limbah industri, keselamatan berkendara, komitmen zero accident, dan nilai inti korporasi DAS Group.',
    legalBasis: 'UU No. 1/1970 Pasal 9 ayat (1) jo. PP No. 50/2012 Elemen 12',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 9 ayat 1)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Elemen 12)',
      ministerialReg: 'Permenaker No. 05/2018 tentang K3 Lingkungan Kerja'
    },
    legalSanction: 'Pelanggaran penerapan SMK3 mengakibatkan penurunan predikat bendera audit atau tidak lulus sertifikasi SMK3.',
    guidelines: 'Verifikasi silabus induksi, daftar hadir, dan lembar post-test dengan nilai kelulusan minimal 85%.',
    auditSteps: [
      'Cek daftar absensi modul induksi 16 jam seluruh karyawan baru.',
      'Periksa materi silabus: identifikasi bahaya limbah B3, hak stop work, dan respon darurat.',
      'Verifikasi lembar ujian post-test kelulusan calon tenaga kerja.',
      'Pastikan bukti tanda tangan instruktur K3 dan peserta tertera pada logbook pelatihan.'
    ],
    verificationCriteria: [
      'Modul pelatihan induksi K3 16 jam diselesaikan 100% sebelum hari pertama penugasan mandiri di area kerja.',
      'Silabus mencakup identifikasi bahaya limbah B3, prosedur keselamatan berkendara, dan hak Stop Work Authority.',
      'Seluruh peserta mencapai nilai ambang kelulusan evaluasi pemahaman keselamatan (post-test score ≥ 85 poin).',
      'Tersedia rekapitulasi absensi fisik dan digital bertanda tangan peserta serta instruktur HSE tersertifikasi.',
      'Masing-masing peserta menerima buku saku panduan K3 induksi dan menandatangani lembar pemahaman materi.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Semua 18 staf dan pengemudi baru lulus ujian pemahaman keselamatan dengan skor rata-rata 91%.',
    evidenceText: 'Dokumen absensi induksi dan kartu Safety Passport DAS Group No. SP-2026-001 s/d 018.'
  },

  // SESI 2: Sosialisasi Peraturan Perusahaan (PP) & Tata Tertib Kerja
  {
    id: 'onb-02',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Sosialisasi Peraturan Perusahaan & Tata Tertib',
    code: 'ONB-02',
    category: 'Sosialisasi Peraturan Perusahaan (PP)',
    title: 'Sosialisasi Hak-Kewajiban, Tata Tertib Kerja, Disiplin Waktu & Struktur Organisasi',
    description: 'Pemberian pemahaman mendalam mengenai buku Peraturan Perusahaan (PP) PT. Dame Alam Sejahtera yang telah terdaftar di Disnaker, mencakup aturan jam kerja, lembur, hak cuti, tata tertib pool armada, dan jenjang sanksi bertingkat (SP1, SP2, SP3, hingga PHK).',
    legalBasis: 'UU No. 13/2003 Pasal 108-115 jo. PP No. 35/2021',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 108 & 114)',
      governmentReg: 'PP No. 35 Tahun 2021 tentang PKWT, Waktu Kerja dan PHK',
      ministerialReg: 'Permenaker No. 28 Tahun 2014 tentang Tata Cara Pembuatan & Pengesahan Peraturan Perusahaan'
    },
    legalSanction: 'Perusahaan wajib membagikan naskah PP kepada seluruh pekerja; kelalaian dapat dikenakan sanksi denda administratif Disnaker.',
    guidelines: 'Periksa tanda terima penyerahan buku saku Peraturan Perusahaan kepada setiap karyawan baru.',
    auditSteps: [
      'Periksa lembar tanda terima fisik buku saku PP bertanda tangan karyawan.',
      'Wawancara acak pemahaman karyawan baru mengenai hak cuti dan tata cara izin sakit.',
      'Cek keabsahan masa berlaku Surat Keputusan Pengesahan PP dari Disnaker.',
      'Pastikan tata tertib sanksi pelanggaran disosialisasikan secara terbuka dan transparan.'
    ],
    verificationCriteria: [
      'Setiap karyawan baru menerima naskah salinan buku saku Peraturan Perusahaan (PP) yang disahkan Disnaker.',
      'Tersedia formulir bukti tanda terima naskah PP bertanda tangan basah pekerja yang disimpan dalam map personalia.',
      'Karyawan memahami struktur jam kerja, formula lembur, tata tertib absensi, dan hak cuti tahunan/khusus.',
      'Karyawan memahami mekanisme jenjang sanksi disipliner bertingkat (SP1, SP2, SP3, hingga PHK).',
      'Sosialisasi PP dibuktikan dengan notulen sesi briefing serta lembar evaluasi pemahaman karyawan baru.'
    ],
    riskLevel: 'MEDIUM',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Tanda terima fisik buku saku PP 3 operator baru plant Sukabumi belum diunggah dan diverifikasi ke modul administrasi HRIS.',
    evidenceText: 'Checklist Serah Terima Buku Peraturan Perusahaan Batch September 2026.'
  },

  // SESI 3: Pelatihan Pemahaman MSDS / LDKB 16 Bab & Simbol B3
  {
    id: 'onb-03',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Pelatihan MSDS 16 Bab & Simbol Bahaya B3',
    code: 'ONB-03',
    category: 'MSDS 16 Bab & Piktogram Bahaya GHS',
    title: 'Pelatihan Mendalam Pembacaan Lembar Data Keselamatan Bahan (MSDS/LDKB 16 Bab) & Piktogram B3',
    description: 'Pelatihan wajib bagi pengemudi truk dan operator pabrik mengenai cara membaca dokumen LDKB 16 Bab (komposisi, sifat fisika-kimia, bahaya kebakaran, pertolongan pertama, penanganan tumpahan) untuk oli bekas, sludge IPAL, pelarut aromatik, asam, dan basa.',
    legalBasis: 'Permenaker No. Kep.187/MEN/1999 tentang Pengendalian Bahan Kimia Berbahaya',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.8)',
      ministerialReg: 'Permenaker No. Kep.187/MEN/1999 (Pasal 3 & 4) jo. Permen LHK No. 6/2021'
    },
    legalSanction: 'Penghentian operasional pengangkutan atau penyimpanan bahan kimia jika pekerja tidak memahami karakteristik bahaya zat yang ditangani.',
    guidelines: 'Uji petik lisan kepada 3 pengemudi armada tentang tindakan darurat saat terjadi kontak mata dengan oli limbah.',
    auditSteps: [
      'Periksa ketersediaan buku saku MSDS di setiap kabin truk armada Sabang-Merauke.',
      'Cek ketersediaan lembar MSDS bahasa Indonesia pada papan display TPS Karawang dan Plant Sukabumi.',
      'Uji pemahaman arti piktogram B3: Flammable, Toxic, Corrosive, Harmful.',
      'Verifikasi kemampuan menjelaskan langkah P3K darurat kimia saat terkena paparan pada mata atau kulit.'
    ],
    verificationCriteria: [
      'Buku saku ringkasan LDKB/MSDS 16 Bab berbahasa Indonesia tersedia di setiap kabin armada dan area operasional pabrik.',
      'Pekerja mampu menguraikan dengan benar arti piktogram bahaya GHS (mudah menyala, beracun, korosif, reaktif, iritan).',
      'Pekerja menguasai tindakan Pertolongan Pertama Pada Kecelakaan (P3K) khusus kontak bahan kimia korosif dan uap beracun.',
      'Tersedia lembar MSDS yang terpasang jelas pada papan informasi di dekat titik penampungan limbah oli dan pelarut.',
      'Dilakukan uji petik pemahaman MSDS kepada kru dengan tingkat kelulusan evaluasi lisan 100% benar.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Buku saku mini MSDS telah dibagikan dan terpasang di setiap kabin truk armada serta papan display Karawang/Sukabumi.',
    evidenceText: 'Buku Saku MSDS Limbah B3 Edisi Revisi 2026 & Checklist Serah Terima Driver.'
  },

  // SESI 4: Fit-Test APD & Kebijakan Bebas Janggut (Clean-Shaven)
  {
    id: 'onb-04',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Fit-Test Masker Respirator & Clean-Shaven Policy',
    code: 'ONB-04',
    category: 'Fit-Test Respirator & Kebijakan Rambut Muka',
    title: 'Pelatihan Donning/Doffing Masker Respirator Gas/Uap & Uji Kerapatan Muka (Smoke Fit-Test)',
    description: 'Pelatihan cara pemakaian dan pelepasan masker respirator full-face/half-face cartridge uap organik, penggantian filter berkala, serta uji kabut asap (smoke test) untuk memastikan tidak ada celah kebocoran silikon akibat janggut tebal (Clean-Shaven Policy).',
    legalBasis: 'Permenakertrans No. Per.08/MEN/VII/2010 tentang Alat Pelindung Diri (APD)',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 14 huruf c)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Kriteria 6.1)',
      ministerialReg: 'Permenakertrans No. Per.08/MEN/VII/2010 (Pasal 6 & 7)'
    },
    legalSanction: 'Pekerja dilarang memasuki area operasional dan perusahaan wajib memfasilitasi APD yang sesuai anatomi wajah pekerja.',
    guidelines: 'Lakukan uji kerapatan muka (fit-test) berkala dan terapkan kebijakan wajib bebas janggut di area decanting Karawang.',
    auditSteps: [
      'Periksa rekaman hasil smoke fit-test seluruh operator decanting dan pengolah oli.',
      'Inspeksi kepatuhan kerapatan masker silikon pada wajah tanpa terhalang rambut janggut.',
      'Cek jadwal penggantian cartridge filter respirator (maksimal 30 hari atau saat hambatan nafas meningkat).',
      'Verifikasi kepatuhan penerapan Clean-Shaven Policy di zona uap kimia berbahaya.'
    ],
    verificationCriteria: [
      '100% pekerja di area uap kimia berbahaya lulus pengujian kerapatan respirator (Qualitative/Quantitative Fit-Test).',
      'Penerapan Clean-Shaven Policy (bebas janggut/rambut wajah pada garis segel masker) dipatuhi tanpa pengecualian.',
      'Prosedur pemeriksaan segel tekanan positif dan negatif (User Seal Check) dilakukan setiap kali memakai masker.',
      'Kartrid filter uap organik diganti berkala sesuai logbook operasional atau maksimal 30 hari masa pakai aktif.',
      'Masker respirator disimpan dalam wadah tertutup kedap udara dan bersih setelah selesai digunakan.'
    ],
    riskLevel: 'CRITICAL',
    status: 'MAJOR_NC',
    operationalScope: 'KARAWANG_PLANT',
    notes: 'Ditemukan 2 operator di gudang Karawang Barat memiliki rambut wajah tebal yang menyebabkan kebocoran segel karet respirator gas.',
    evidenceText: 'Laporan temuan inspeksi internal K3 tanggal 20 September 2026.'
  },

  // SESI 5: Pelatihan & Simulasi Praktis Spill Kit (Tanggap Darurat Tumpahan)
  {
    id: 'onb-05',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Pelatihan & Praktik Spill Kit On-Board & Plant',
    code: 'ONB-05',
    category: 'Tanggap Darurat Tumpahan B3 (Spill Kit)',
    title: 'Pelatihan Praktik Penanganan Tumpahan Bahan Berbahaya (Spill Kit Drill On-Board Armada & Plant)',
    description: 'Simulasi praktis penggunaan kotak spill kit on-board pada armada truk di jalan raya saat kebocoran tangki oli/drum B3, serta prosedur respon spill kit kapasitas besar (absorbent boom, serbuk sawit, kantong kuning) di Plant Karawang dan Sukabumi.',
    legalBasis: 'PP No. 22 Tahun 2021 Pasal 339 & Standar Tanggap Darurat B3',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 54)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 339)',
      ministerialReg: 'Permen LHK No. 6 Tahun 2021 tentang Pengelolaan Limbah B3'
    },
    legalSanction: 'Kelalaian penanganan tumpahan di jalan umum berakibat sanksi pidana pencemaran lingkungan UU 32/2009.',
    guidelines: 'Uji kesiapan kotak spill kit di 10 unit truk acak: serbuk absorben, absorbent pad, sekop anti-percikan, dan kantong limbah kuning.',
    auditSteps: [
      'Inspeksi fisik kelengkapan spill kit on-board di kabin truk: pad absorben, sarung tangan nitril, sekop non-sparking, kantong kuning B3.',
      'Uji praktik pengemudi: teknik melokalisir ceceran oli dengan absorbent boom dalam waktu < 3 menit.',
      'Periksa berita acara simulasi penanganan tumpahan limbah B3 tahunan.',
      'Pastikan segel kotak spill kit dalam kondisi utuh dan masa kedaluwarsa absorben terpantau.'
    ],
    verificationCriteria: [
      'Kotak Spill Kit On-Board tersedia lengkap dan tersegel pada 100% armada transporter pengangkut B3.',
      'Isi spill kit mencakup pad absorben minyak, absorbent boom/sock, sekop non-sparking, kacamata goggle, dan kantong kuning B3.',
      'Pengemudi mampu memperagakan teknik isolasi dan pembendungan tumpahan dalam waktu respons kurang dari 3 menit.',
      'Limbah hasil serapan tumpahan dikemas dalam kantong kuning berlabel limbah B3 dan dicatatkan ke neraca limbah.',
      'Pelaksanaan simulasi drill tanggap darurat tumpahan terdokumentasi dalam berita acara dan rekaman video evaluasi.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'TRANSPORTER',
    notes: 'Seluruh armada logistik Sabang-Merauke dilengkapi kotak spill kit standar, dan drill tumpahan terakhir digelar 12 Agustus 2026.',
    evidenceText: 'Berita Acara & Video Drill Penanganan Tumpahan Armada Truk B3 BA-SPILL-DAS-2026-02.'
  },

  // SESI 6: Pelatihan Tanggap Darurat Kebakaran Gudang B3 (Pasca-Insiden Karawang)
  {
    id: 'onb-06',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Pelatihan Tanggap Darurat Kebakaran Gudang B3',
    code: 'ONB-06',
    category: 'Proteksi & Tanggap Darurat Api Fasilitas',
    title: 'Pelatihan Operasional Hydrant 7 Bar, Foam Extinguisher & Evakuasi Gudang B3 Karawang Barat',
    description: 'Pelatihan intensif tanggap kebakaran pasca-insiden Oktober 2025: teknik menggelar selang hydrant, pengoperasian nozzle foam pemadam cairan mudah terbakar, pembacaan panel fire alarm, dan jalur evakuasi menuju titik kumpul aman (Assembly Point).',
    legalBasis: 'Kepmenaker No. Kep.186/MEN/1999 & Permenaker No. 04/1980',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3 ayat 1)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.4)',
      ministerialReg: 'Kepmenaker No. Kep.186/MEN/1999 tentang Penanggulangan Kebakaran di Tempat Kerja'
    },
    legalSanction: 'Pencabutan izin penyimpanan limbah B3 dari KLHK dan penyegelan lokasi usaha bila fasilitas pemadam kebakaran tidak terawat.',
    guidelines: 'Simulasi gabungan pemadaman api menggunakan APAR Foam AFFF dan Hydrant bertekanan dengan Regu Damkar Plant.',
    auditSteps: [
      'Periksa sertifikasi personel Regu Peran Kebakaran Kelas D/C di Plant Karawang.',
      'Cek berita acara drill evakuasi kebakaran dan pencapaian waktu evakuasi < 3 menit.',
      'Uji kemampuan operator dalam menggunakan tabung APAR Foam pada cairan minyak menyala.',
      'Periksa keterbacaan denah jalur evakuasi dan rambu Assembly Point di seluruh sudut pabrik.'
    ],
    verificationCriteria: [
      'Seluruh pekerja pabrik dan operator gudang mampu mengoperasikan APAR Foam AFFF pada simulasi kebakaran cairan mudah menyala.',
      'Regu tanggap darurat kebakaran mampu menggelar selang hydrant dan mengalirkan air bertekanan 7 bar dalam waktu < 2 menit.',
      'Waktu evakuasi seluruh personel dari dalam gedung menuju Assembly Point tercapai di bawah batas waktu standar (< 3 menit).',
      'Panel fire alarm dan manual call point (break glass) dipahami cara pengoperasian serta kode zonasinya.',
      'Dokumentasi drill kebakaran gabungan bersama Dinas Damkar setempat terlaksana sekurang-kurangnya 1 kali per semester.'
    ],
    riskLevel: 'CRITICAL',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'KARAWANG_PLANT',
    notes: 'Drill simulasi evakuasi kebakaran gudang B3 Karawang Barat semester I belum menguji respons penyalaan otomatis pompa diesel cadangan saat skenario listrik padam total.',
    evidenceText: 'Laporan Evaluasi Simulasi Kebakaran Internal Plant Karawang No. HSE-DRILL-2026-01.'
  },

  // SESI 7: Sertifikasi Lisensi K3 Resmi
  {
    id: 'onb-07',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 7,
    sessionTitle: 'Sesi 7: Sertifikasi Lisensi K3 Resmi & Penugasan',
    code: 'ONB-07',
    category: 'Sertifikasi K3 Resmi Kemnaker / Kemenhub / BNSP',
    title: 'Penerbitan Sertifikasi Lisensi K3 Pengemudi B3, POPLB3 & Operator K3 Pesawat Tenaga',
    description: 'Pendaftaran dan penyelesaian sertifikasi lisensi resmi pemerintah: K3 Pengemudi Angkutan B3 dari Kemenhub, Sertifikasi POPLB3 dari BNSP, Lisensi K3 Listrik & Teknisi Boiler/Pesawat Angkut dari Kemenaker.',
    legalBasis: 'PP No. 22/2021 jo. Permenaker No. 02/1992 jo. SK Dirjen Hubdat',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 jo. UU No. 22 Tahun 2009',
      governmentReg: 'PP No. 22 Tahun 2021 & PP No. 50 Tahun 2012',
      ministerialReg: 'Permenaker No. Per.02/MEN/1992 tentang Penunjukan Ahli K3'
    },
    legalSanction: 'Operasional unit dihentikan dan pengemudi tidak diizinkan membawa armada B3 tanpa lisensi aktif.',
    guidelines: 'Pastikan seluruh sertifikat resmi diterbitkan oleh instansi pembina atau LSP berlisensi BNSP.',
    auditSteps: [
      'Periksa database masa berlaku sertifikat kompetensi seluruh staf teknik & driver.',
      'Pastikan proses perpanjangan (renewal) lisensi diajukan minimal 3 bulan sebelum masa berlaku habis.',
      'Cek keabsahan barcode sertifikat pada sistem registrasi Kemenaker/BNSP.',
      'Verifikasi kepemilikan lisensi Ahli K3 Kimia untuk fasilitas pengolahan limbah.'
    ],
    verificationCriteria: [
      '100% personel pada posisi jabatan wajib memiliki sertifikat lisensi K3 resmi (BNSP POPLB3, Kemnaker Ahli K3, Kemenhub Driver B3).',
      'Tersedia matriks database masa berlaku sertifikasi dengan sistem notifikasi otomatis 90 hari sebelum kedaluwarsa.',
      'Seluruh lisensi K3 terverifikasi keasliannya pada sistem registrasi instansi pemerintah penerbit.',
      'Operator pesawat angkat/angkut memegang Lisensi K3 (SIO) aktif kelas yang sesuai dengan kapasitas beban alat.',
      'Perusahaan memfasilitasi program resertifikasi berkala tanpa ada lisensi personel yang dibiarkan kedaluwarsa.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Proses perpanjangan kartu lisensi K3 pengemudi B3 2 driver rute timur masih menunggu terbitnya surat keputusan BPTD.',
    evidenceText: 'Surat Keterangan Pengurusan Perpanjangan Lisensi Pengemudi B3 No. 420/BPTD-JABAR/2026.'
  },

  // SESI 8: Evaluasi Akhir & Penerbitan Safety Passport DAS Group
  {
    id: 'onb-08',
    stage: 'ONBOARDING_TRAINING',
    sessionNumber: 8,
    sessionTitle: 'Sesi 8: Evaluasi Kelulusan & Safety Passport DAS Group',
    code: 'ONB-08',
    category: 'Safety Passport & Kelulusan Masa Onboarding',
    title: 'Evaluasi Komprehensif Masa Orientasi 3 Bulan & Penerbitan ID Card "Safety Passport" DAS Group',
    description: 'Penilaian akhir kinerja K3 selama masa percobaan 3 bulan (On-the-Job Evaluation): catatan insiden nol, kepatuhan APD 100%, kehadiran toolbox meeting harian, dan penerbitan ID Card Safety Passport sebagai izin kerja mandiri.',
    legalBasis: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 Elemen 12',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3',
      ministerialReg: 'Pedoman Sistem Manajemen K3 DAS Group (SMK3-DAS-MANUAL)'
    },
    legalSanction: 'Karyawan yang tidak lulus evaluasi keselamatan tidak diperkenankan mengemudikan armada atau mengoperasikan reaktor limbah.',
    guidelines: 'Verifikasi berkas logbook evaluasi 3 bulan dan otorisasi kartu Safety Passport dari Lead HSE DAS Group.',
    auditSteps: [
      'Periksa penilaian perilaku keselamatan dari Supervisor langsung dan HSE Officer.',
      'Cek rekam jejak insiden/pelanggaran selama masa OJT.',
      'Validasi pencetakan dan barcode ID Safety Passport yang terpasang di seragam kerja.',
      'Pastikan ada verifikasi pencapaian target kehadiran dan keaktifan toolbox meeting.'
    ],
    verificationCriteria: [
      'Karyawan mencapai skor evaluasi perilaku keselamatan selama masa percobaan 3 bulan (skor OJT K3 ≥ 85 poin).',
      'Memiliki catatan nol insiden (Zero Accident Record) dan 100% kepatuhan pemakaian APD selama masa penilaian.',
      'Tingkat kehadiran pada toolbox meeting keselamatan harian mencapai minimal 95%.',
      'Kartu identitas "Safety Passport" resmi diterbitkan dengan barcode verifikasi digital bertanda tangan Lead HSE.',
      'Pemberian otorisasi kerja mandiri disetujui bersama oleh Kepala Departemen terkait dan Komite P2K3.'
    ],
    riskLevel: 'MEDIUM',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Semua 18 personil baru telah menyelesaikan masa OJT dan menerima Safety Passport resmi.',
    evidenceText: 'Buku Registrasi Safety Passport DAS Group No. REG-SP-2026-Q3.'
  }
];
