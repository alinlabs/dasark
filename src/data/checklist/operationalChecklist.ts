import { ChecklistItem } from '../../types/audit';

export const OPERATIONAL_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Daily Safety Talk & Fit-to-Work Screening
  {
    id: 'k3-01',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Daily Safety Talk & Fit-to-Work Screening',
    code: 'K3-01',
    category: 'Daily Safety Talk & Skrining Fit-to-Work',
    title: 'Pelaksanaan Toolbox Meeting Harian, Cek Tensi Darah & Uji Alkohol/Kebugaran Driver B3',
    description: 'Setiap awal shift kerja di Karawang, Sukabumi, dan sebelum keberangkatan armada, wajib dilaksanakan briefing keselamatan (Toolbox Meeting) 15 menit serta skrining medis cepat: tensi darah (< 140/90 mmHg), cek suhu tubuh, dan uji nafas alkohol (breathalyzer).',
    legalBasis: 'Permenaker No. 05/2018 jo. PP No. 50/2012 Elemen 6',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 9 & 12)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenaker No. 05/2018 tentang K3 Lingkungan Kerja'
    },
    legalSanction: 'Pengemudi dengan tensi tinggi atau terindikasi kelelahan/alkohol dilarang jalan; pelanggaran berakibat kecelakaan fatal di jalan raya.',
    guidelines: 'Inspeksi formulir checklist Fit-to-Work di pos sekuriti gerbang keluar pool armada DAS Group.',
    auditSteps: [
      'Periksa lembar absensi dan dokumentasi foto briefing Toolbox Meeting harian.',
      'Cek buku log tensi darah dan hasil uji breathalyzer seluruh pengemudi sebelum start perjalanan.',
      'Pastikan ada prosedur penggantian driver cadangan jika driver utama dinyatakan "Unfit".',
      'Verifikasi kalibrasi alat tensimeter dan breathalyzer di pos pemeriksaan HSE.'
    ],
    verificationCriteria: [
      'Briefing keselamatan (Toolbox Meeting) dilaksanakan setiap awal shift kerja (15 menit) dan tercatat pada buku absensi harian.',
      '100% pengemudi dan operator plant menjalani pemeriksaan tensi darah dengan batas aman (< 140/90 mmHg) sebelum memulai tugas.',
      'Uji nafas alkohol (Breathalyzer Test) menunjukkan kadar 0.00% BAC untuk seluruh kru armada yang akan diberangkatkan.',
      'Tersedia prosedur operasional standar (SOP) penggantian pengemudi cadangan apabila pengemudi utama dinyatakan berstatus "Unfit to Work".',
      'Peralatan skrining kesehatan (tensimeter digital, termometer, dan breathalyzer) terkalibrasi secara periodik oleh instansi berwenang.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Prosedur skrining kebugaran harian di pool Karawang dan Sukabumi berjalan konsisten setiap pergantian shift.',
    evidenceText: 'Buku Log Skrining Fit-to-Work Harian DAS-HSE-FIT-2026/09.'
  },

  // SESI 2: Kepatuhan Standar APD Lengkap di Zona Operasional
  {
    id: 'k3-02',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Kepatuhan Standar APD Lengkap di Zona B3',
    code: 'K3-02',
    category: 'Kepatuhan APD Lapangan Spesifik Bahaya',
    title: 'Kepatuhan Penggunaan APD Wajib: Respirator Cartridge Uap Organik, Safety Shoes Tahan Kimia & Sarung Tangan Nitril',
    description: 'Pemeriksaan mandatori penggunaan APD bersertifikasi SNI/ANSI/EN: masker respirator cartridge uap organik saat decanting/pemanasan oli, sepatu safety berbahan karet nitril tahan cairan kimia/minyak, sarung tangan heavy-duty nitrile, kacamata goggle, dan helm keselamatan.',
    legalBasis: 'Permenakertrans No. Per.08/MEN/VII/2010 tentang APD',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 14 huruf c)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.1)',
      ministerialReg: 'Permenakertrans No. Per.08/MEN/VII/2010 (Pasal 2-8)'
    },
    legalSanction: 'Perusahaan wajib menyediakan APD cuma-cuma; jika pekerja tidak memakai, dikenakan sanksi disiplin dan dilarang masuk area kerja.',
    guidelines: 'Lakukan audit visual acak ke area TPS Karawang Barat dan unit filter press Sukabumi.',
    auditSteps: [
      'Cek ketersediaan stok APD pengganti di gudang K3 minimal untuk kebutuhan 1 bulan.',
      'Periksa apakah respirator yang dipakai sesuai dengan jenis uap zat kimia (kartrid organik vs asam).',
      'Pastikan sepatu safety yang digunakan berbahan tahan penetrasi zat kimia B3 dan anti-slip.',
      'Verifikasi kepatuhan pemakaian safety helmet, kacamata goggle, dan sarung tangan tahan kimia di zona decanting.'
    ],
    verificationCriteria: [
      '100% pekerja lapangan memakai APD lengkap sesuai dengan matriks risiko bahaya area (Job Safety Analysis / JSA).',
      'Masker respirator menggunakan kartrid uap organik/asam bersertifikasi internasional (NIOSH / EN 14387) dalam masa pakai aktif.',
      'Sepatu safety berbahan sol nitril/karet tahan minyak dan zat kimia korosif dengan pelindung jari baja (steel toe cap 200J).',
      'Sarung tangan tahan bahan kimia (heavy-duty chemical nitrile gloves) digunakan saat menangani drum cairan B3.',
      'Tersedia stok persediaan APD cadangan siap pakai di gudang HSE sekurang-kurangnya untuk kebutuhan operasional 30 hari ke depan.'
    ],
    riskLevel: 'CRITICAL',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Stok cadangan sarung tangan nitril tahan kimia heavy-duty di pos TPS Karawang tersisa 3 pasang (di bawah ambang batas minimum cadangan 1 bulan).',
    evidenceText: 'Formulir Inspeksi Kepatuhan APD K3-DAS-INSP-2026-33 & Kartu Stok Gudang K3.'
  },

  // SESI 3: Proteksi Kebakaran Gudang B3 Karawang Barat (Pasca-Insiden Okt 2025)
  {
    id: 'k3-03',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Proteksi Kebakaran Gudang Karawang (Pasca-Insiden)',
    code: 'K3-03',
    category: 'Proteksi Kebakaran Aktif & Pasif Fasilitas B3',
    title: 'AUDIT PASCA-INSIDEN OKTOBER 2025: Keandalan Sistem Hydrant 7 Bar, Foam Extinguisher & Flame Detector Gudang Karawang',
    description: 'Verifikasi menyeluruh instalasi rekonstruksi pasca insiden kebakaran Oktober 2025 di Karawang Barat: jaringan hydrant mandiri tekanan konstan 7 bar dengan jockey & diesel pump, sistem deteksi api (UV/IR Flame Detector), pasokan foam konsentrat 500 liter, dan sertifikat riksa uji Damkar.',
    legalBasis: 'Permenaker No. 04/1980 jo. Kepmenaker No. Kep.186/MEN/1999',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3 ayat 1 huruf b)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Kriteria 6.4)',
      ministerialReg: 'Permenaker No. 04/1980 & Kepmenaker No. Kep.186/MEN/1999 tentang Regu Penanggulangan Kebakaran'
    },
    legalSanction: 'Pencabutan izin operasional TPS B3 oleh KLHK jika proteksi kebakaran dinilai rentan memicu kebakaran berulang.',
    guidelines: 'Uji hidupkan pompa diesel hydrant dan lakukan test semprot nozzle foam pilar 1 dan 2 Karawang Barat.',
    auditSteps: [
      'Cek catatan uji fungsi mingguan pompa hydrant (tekanan standby 7-8 bar).',
      'Periksa masa kedaluwarsa isi foam AFFF 3% dan sertifikat riksa uji tabung bertekanan Disnaker.',
      'Uji respon panel alarm kebakaran otomatis saat sensor api dipicu.',
      'Verifikasi ketersediaan cadangan air pemadam (reservoir tank) minimal 200 m3 khusus proteksi kebakaran.'
    ],
    verificationCriteria: [
      'Jaringan sistem hydrant mempertahankan tekanan operasional standby pada 7-8 bar dengan pompa diesel dan jockey pump otomatis.',
      'Instalasi sistem deteksi api (UV/IR Flame & Smoke Detectors) terintegrasi ke panel master fire alarm dengan waktu respon < 5 detik.',
      'Tersedia pasokan konsentrat foam pemadam api (AFFF 3%) minimal 500 liter siap pakai di dekat pilar distribusi utama.',
      'Pilar hydrant dan kotak selang (hose box) bebas dari segala halangan material dan siap digunakan 24/7.',
      'Sertifikat Layak Operasi (SLO) Sistem Proteksi Kebakaran dari Dinas Pemadam Kebakaran dan Disnaker masih berlaku aktif.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'KARAWANG_PLANT',
    notes: 'Sistem proteksi aktif baru telah diuji fungsi bersama Dinas Pemadam Kebakaran Kab. Karawang pada Januari 2026.',
    evidenceText: 'Sertifikat Layak Operasi Sistem Proteksi Kebakaran Damkar Karawang No. 602/SLO-DAMKAR/I/2026.'
  },

  // SESI 4: Segregasi Penyimpanan Flammable & Secondary Containment
  {
    id: 'k3-04',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Segregasi Bahan Flammable & Tanggul Tumpahan',
    code: 'K3-04',
    category: 'Segregasi Bahan Kimia & Penataan Gudang B3',
    title: 'Penataan Denah TPS B3, Jarak Antar-Blok Drum Minimal 2 Meter, & Tanggul Penampung Tumpahan (Bund-Wall 110%)',
    description: 'Pencegahan insiden api berulang dengan memastikan tata letak drum limbah solvent/oli bekas diatur dalam blok maksimal 4x4 palet berjarak lorong minimal 2 meter untuk akses damkar, lantai kedap air dilapisi epoxy, tanggul bund-wall berkapasitas 110% drum terbesar, dan pemisahan zat oksidator/asam.',
    legalBasis: 'PP No. 22 Tahun 2021 Pasal 295 & Standar NFPA 30 Flammable Liquids Code',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 59)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 295 & Lampiran IX)',
      ministerialReg: 'Permen LHK No. 6 Tahun 2021 tentang Tata Kelola Penyimpanan Limbah B3'
    },
    legalSanction: 'Sanksi paksaan pemerintah berupa penutupan sementara gudang limbah jika terjadi pencampuran zat inkompatibel.',
    guidelines: 'Ukur lebar lorong inspeksi antar-blok palet drum dan hitung volume efektif tanggul tumpahan di TPS Karawang Barat.',
    auditSteps: [
      'Ukur jarak lorong antar-blok penyimpanan drum (minimal 2 meter bebas hambatan).',
      'Verifikasi dinding pemisah tahan api (firewall) antara area limbah solvent dan limbah padat non-flammable.',
      'Cek kondisi fisik tanggul penampung (bund-wall) bebas retakan dan katup drainase terkunci rapat.',
      'Pastikan lantai dilapisi bahan kedap air / epoxy tahan zat kimia korosif.'
    ],
    verificationCriteria: [
      'Penataan drum limbah cair diatur dalam blok palet dengan jarak lorong inspeksi dan akses darurat minimal 2.0 meter.',
      'Kapasitas tampung efektif tanggul penampung sekunder (bund-wall) memenuhi minimal 110% dari volume wadah drum terbesar.',
      'Lantai area penyimpanan dilapisi bahan kedap air (epoxy chemical-resistant) tanpa retakan yang berpotensi merembes ke tanah.',
      'Pemisahan ketat (segregasi) antara bahan mudah menyala (flammable), bahan oksidator, dan limbah asam/basa korosif.',
      'Pintu drainase tanggul tumpahan dalam posisi terkunci normal tertutup (normally closed) dengan pengawasan ketat.'
    ],
    riskLevel: 'CRITICAL',
    status: 'MAJOR_NC',
    operationalScope: 'KARAWANG_PLANT',
    notes: 'Penempatan drum solvent mudah terbakar di Blok B Karawang berjarak kurang dari 2 meter dari material non-flammable dan tanggul sekunder perlu pembersihan kerak.',
    evidenceText: 'Laporan Observasi Audit K3 Lapangan TPS B3 Karawang Barat.'
  },

  // SESI 5: Operasional De-Watering & Drying Sludge Sukabumi
  {
    id: 'k3-05',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Operasional De-Watering & Pengering Sludge',
    code: 'K3-05',
    category: 'Keselamatan Pengolahan Sludge & De-Watering',
    title: 'Operasional Aman Filter Press / Centrifuge De-Watering & Pengendalian Emisi Dryer Lumpur Plant Sukabumi',
    description: 'Pengawasan keselamatan proses mekanis pengecilan volume lumpur (sludge de-watering): pengaman interlock hidrolik filter press, sistem grounding statis untuk mencegah ledakan debu kering lumpur, saluran buang uap pengering menuju scrubber basah, dan SOP pembersihan kain saring bertekanan.',
    legalBasis: 'Permenaker No. 38 Tahun 2016 tentang K3 Pesawat Tenaga dan Produksi',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3 ayat 1)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.5)',
      ministerialReg: 'Permenaker No. 38 Tahun 2016 tentang K3 Pesawat Tenaga dan Produksi'
    },
    legalSanction: 'Penghentian operasional mesin oleh Pengawas Disnaker jika alat keselamatan (emergency stop) dinonaktifkan.',
    guidelines: 'Inspeksi switch Emergency Stop pada kedua sisi unit filter press dan uji kontinuitas grounding grounding tester.',
    auditSteps: [
      'Uji fungsi tombol darurat (Emergency Stop) pada mesin filter press dan centrifuge.',
      'Periksa nilai resistansi pentanahan grounding mesin (maksimal 5 Ohm sesuai Permenaker 02/1989).',
      'Cek efisiensi alat pengendali pencemaran udara (wet scrubber) cerobong pengering lumpur.',
      'Verifikasi SOP Lockout/Tagout (LOTO) saat pembersihan kain saring (filter cloth).'
    ],
    verificationCriteria: [
      'Sistem pemutus darurat (Emergency Stop Wire / Button) pada unit mesin filter press berfungsi aktif di seluruh sisi kerja operator.',
      'Sistem interlock hidrolik otomatis menghentikan pergerakan pelat penekan saat tirai sensor pengaman (safety light curtain) terputus.',
      'Nilai tahanan pembumian (grounding resistance) pada mesin dan tangki pengering terukur < 2.5 Ohm untuk mencegah listrik statis.',
      'Unit pengendali pencemaran udara (Wet Scrubber) cerobong dryer beroperasi dengan parameter debit air sirkulasi dan pH terpantau stabil.',
      'Prosedur Lockout Tagout (LOTO) diterapkan secara tertib setiap kali dilakukan perawatan kain saring atau pembersihan kerak pompa.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'SUKABUMI_PLANT',
    notes: 'Unit de-watering beroperasi normal; interlock pengaman otomatis telah dites dan berfungsi baik.',
    evidenceText: 'Checklist Pemeliharaan Mesin De-Watering No. PM-SLUDGE-2026-08.'
  },

  // SESI 6: Re-Refining Oli Bekas & Higiene Industri Sukabumi
  {
    id: 'k3-06',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Re-Refining Oli Bekas & Pemantauan Biomonitoring',
    code: 'K3-06',
    category: 'Higiene Industri Re-Refining & Biomonitoring',
    title: 'Pengendalian Uap Hidrokarbon Unit Re-Refining Oli Bekas Sukabumi & Biomonitoring Metabolit Urin Tiap 6 Bulan',
    description: 'Pemeriksaan higiene industri di unit distilasi pemurnian oli bekas: pengukuran konsentrasi uap hidrokarbon (PAH / VOC), fungsi Local Exhaust Ventilation (LEV), pemeriksaan rutin tekanan reaktor, dan uji metabolit urin berkala setiap 6 bulan bagi operator distilasi.',
    legalBasis: 'Permenaker No. 5 Tahun 2018 Pasal 20 & Kepmenkes No. 70/2016',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja (Pasal 20 & 29)'
    },
    legalSanction: 'Perusahaan dikenakan teguran keras dan sanksi pemulihan kesehatan jika konsentrasi uap melebihi Nilai Ambang Batas (NAB).',
    guidelines: 'Cek laporan pengujian lingkungan kerja 6 bulanan oleh laboratorium hiperkes terakreditasi Kemenaker.',
    auditSteps: [
      'Periksa hasil pengukuran konsentrasi Benzena, Toluena, Xilena di ruang kontrol dan reaktor oli bekas.',
      'Cek kecepatan hisap (capture velocity) Local Exhaust Ventilation (minimal 0.5 m/s).',
      'Validasi rekapitulasi hasil biomonitoring metabolit urin 6 bulanan operator.',
      'Pastikan safety valve dan pressure transmitter pada kolom distilasi terkalibrasi.'
    ],
    verificationCriteria: [
      'Konsentrasi uap hidrokarbon (VOC/PAH) dan gas beracun di zona kerja distilasi berada di bawah Nilai Ambang Batas (NAB) Permenaker 05/2018.',
      'Kecepatan hisap tudung ventilasi lokal (Local Exhaust Ventilation / LEV) terukur minimal 0.5 m/s pada titik sumber emisi uap.',
      'Uji biomonitoring metabolit urin (asam trans,trans-mukonat / 1-hidroksipirena) dilakukan rutin tiap 6 bulan dengan hasil di bawah batas BEI.',
      'Katup pelepas tekanan lebih (Safety Relief Valve) dan sensor temperatur reaktor distilasi memiliki sertifikat tera kalibrasi aktif.',
      'Tersedia detektor gas portabel (4-gas detector: O2, LEL, CO, H2S) yang digunakan setiap kali pengawasan area distilasi berlangsung.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'SUKABUMI_PLANT',
    notes: 'Kalibrasi tahunan sensor pemantau konsentrasi uap hidrokarbon/VOC pada ruang kontrol reaktor distilasi oli Sukabumi telah melewati batas jatuh tempo 1 minggu.',
    evidenceText: 'Log Sertifikat Kalibrasi Alat Ukur Higiene Industri No. CAL-VOC-2025/08.'
  },

  // SESI 7: Fatigue Management Armada Transporter Sabang-Merauke
  {
    id: 'k3-07',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 7,
    sessionTitle: 'Sesi 7: Manajemen Kelelahan Driver & GPS Telematika',
    code: 'K3-07',
    category: 'Fatigue Management & Jam Kerja Mengemudi',
    title: 'Manajemen Kelelahan Pengemudi (Fatigue Management), Batasan Jam Kerja Mengemudi & Telematika GPS 24 Jam',
    description: 'Pemberlakuan aturan ketat perjalanan armada Sabang-Merauke: pengemudi wajib istirahat 30 menit setelah 4 jam mengemudi terus menerus, maksimal 8 jam mengemudi sehari, pemantauan real-time kecepatan GPS telematika, dan integrasi data manifes Festronik KLHK.',
    legalBasis: 'UU No. 22 Tahun 2009 Pasal 90 & Permenhub No. PM 60/2019',
    legalHierarchy: {
      primaryLaw: 'UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (Pasal 90)',
      governmentReg: 'PP No. 74 Tahun 2014 tentang Angkutan Jalan',
      ministerialReg: 'Permenhub No. PM 60 Tahun 2019 tentang Penyelenggaraan Angkutan Barang'
    },
    legalSanction: 'Perusahaan angkutan bertanggung jawab mutlak atas kecelakaan akibat kelelahan pengemudi yang dipaksa mengemudi tanpa henti.',
    guidelines: 'Periksa logbook GPS fleet management dan nota istirahat rest area pengemudi rute Jawa-Sumatera.',
    auditSteps: [
      'Tarik data telematika GPS acak 5 armada rute jarak jauh lintas provinsi.',
      'Periksa apakah ada rekaman armada berjalan > 4 jam tanpa berhenti minimal 30 menit.',
      'Cek kecepatan maksimal kendaraan terpantau tidak melebihi batas (maksimal 70 km/jam untuk truk tangki B3).',
      'Pastikan sistem pengawasan kontrol armada (Fleet Control Tower) beroperasi 24 jam.'
    ],
    verificationCriteria: [
      'Pemberlakuan waktu istirahat wajib minimal 30 menit setelah 4 jam mengemudi tanpa henti dipatuhi 100% oleh seluruh driver.',
      'Total waktu mengemudi tidak melebihi batas maksimal 8 jam per hari untuk pengemudi tunggal atau diberlakukan sistem sopir ganda (co-driver).',
      'Sistem GPS telematika dan kamera pemantau kabin (Driver Fatigue Sensor / DMS) beroperasi aktif 24 jam tanpa terputus.',
      'Kecepatan kendaraan terpantau tidak melampaui batas kecepatan aman angkutan B3 (maksimal 70 km/jam di jalan tol, 50 km/jam di jalan arteri).',
      'Data histori perjalanan, logbook pemberhentian rest area, dan rute manifes Festronik KLHK tersinkronisasi otomatis.'
    ],
    riskLevel: 'HIGH',
    status: 'MAJOR_NC',
    operationalScope: 'TRANSPORTER',
    notes: 'Ditemukan 1 kasus pengemudi truk tangki rute Cilegon-Surabaya mengemudi 6 jam berturut-turut tanpa jeda karena mengejar jadwal bongkar di site klien.',
    evidenceText: 'Laporan Log GPS Armada No. B-9122-DAS periode 10-15 September 2026.'
  },

  // SESI 8: Permit to Work (PTW) & Housekeeping 5R
  {
    id: 'k3-08',
    stage: 'OPERATIONAL_K3',
    sessionNumber: 8,
    sessionTitle: 'Sesi 8: Izin Kerja Khusus (PTW) & Housekeeping 5R',
    code: 'K3-08',
    category: 'Permit-to-Work (PTW) & Standar 5R Lapangan',
    title: 'Penerapan Sistem Izin Kerja Aman (Permit to Work) Khusus Hot Work / Confined Space & Housekeeping 5R',
    description: 'Kewajiban surat izin kerja khusus (Permit to Work) untuk pekerjaan pengelasan/api terbuka (Hot Work) di zona B3, pembersihan tangki reaktor (Confined Space Entry) dengan gas test oksigen/explosimeter, serta pemeliharaan standar kebersihan Ringkas, Rapi, Resik, Rawat, Rajin (5R).',
    legalBasis: 'Permenaker No. 05/2018 Pasal 38 jo. Kepmenaker No. 187/1999',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.1 & 6.4)',
      ministerialReg: 'Permenaker No. 05/2018 tentang K3 Lingkungan Kerja'
    },
    legalSanction: 'Ledakan fatal atau keracunan gas di ruang terbatas; pelanggaran PTW dapat memicu penutupan plant seketika.',
    guidelines: 'Periksa arsip formulir PTW Hot Work dan lembar uji konsentrasi gas (Gas Testing Record) sebelum pekerjaan dimulai.',
    auditSteps: [
      'Periksa lembar otorisasi PTW tertanda tangan Lead HSE dan Fire Safety Officer.',
      'Cek hasil pengukuran kadar Oksigen (19.5% - 23.5%) dan LEL (< 5%) pada pekerjaan confined space.',
      'Inspeksi kepatuhan penempatan peralatan kerja dan bebas ceceran oli (Housekeeping 5R).',
      'Pastikan adanya petugas jaga api (fire-watch) bersertifikat selama pekerjaan panas berlangsung.'
    ],
    verificationCriteria: [
      'Setiap pekerjaan berisiko tinggi (Hot Work, Confined Space, Ketinggian, Penggalian) mengantongi Surat Izin Kerja Aman (PTW) yang telah disetujui HSE.',
      'Pengukuran konsentrasi gas (uji Oksigen 19.5-23.5%, LEL < 5%, H2S < 10 ppm, CO < 25 ppm) dilakukan dan dicatat sebelum izin masuk ruang terbatas disahkan.',
      'Pekerjaan pengelasan / api terbuka di area B3 dijaga oleh petugas pengawas api (Standby Fire-Watcher) dengan APAR Foam siap pakai di lokasi.',
      'Penerapan standar kebersihan 5R terjaga: tidak ada ceceran oli bekas di lantai kerja dan jalur lintasan pejalan kaki bebas rintangan.',
      'Penutupan izin kerja (PTW Handover/Closure) dilakukan setelah area kerja dipastikan bersih, dingin, dan aman dari bahaya sisa api.'
    ],
    riskLevel: 'CRITICAL',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'ALL',
    notes: 'Ditemukan pekerjaan pemotongan pipa besi dengan gerinda/api di dekat tangki penyimpanan oli bekas tanpa lembar Permit to Work Hot Work bertanda tangan Lead HSE dan tidak ada APAR standby di lokasi kerja.',
    evidenceText: 'Foto Dokumentasi Observasi Audit K3 Lapangan No. FOTO-K3-PTW-2026/09.'
  }
];
