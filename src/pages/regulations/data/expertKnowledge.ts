import { RegulatoryQA } from '../types';

export const EXPERT_REGULATORY_KNOWLEDGE: RegulatoryQA[] = [
  {
    id: 'kb-01',
    category: 'EXIT_MCU',
    title: 'Kewajiban Exit MCU Purna Tugas Karyawan Pengolah Limbah B3',
    tags: ['exit mcu', 'purna tugas', 'phk', 'permenaker 02/1980', 'kesehatan kerja'],
    question: 'Apakah Exit MCU (Pemeriksaan Kesehatan Akhir) wajib bagi karyawan purna tugas di industri limbah B3? Apa dasar hukum dan sanksinya jika perusahaan mengabaikannya?',
    legalBasis: 'Permenakertrans No. Per.02/MEN/1980 Pasal 4 ayat (1) & UU No. 1 Tahun 1970 Pasal 8',
    expertAnswer: 'WAJIB HUKUM. Pengusaha wajib menyelenggarakan pemeriksaan kesehatan akhir kerja (Exit MCU) bagi tenaga kerja yang akan berhenti atau diputus hubungan kerjanya (PHK) yang bekerja pada tempat kerja berisiko bahaya toksik limbah B3. Tujuannya adalah membuktikan status kesehatan aktual pekerja sebelum meninggalkan perusahaan, guna memastikan pekerja bebas dari Penyakit Akibat Kerja (PAK) kronis.',
    operationalProcedure: '1. HR Corporate mengunci form clearance PHK sebelum ada sertifikat Exit MCU dari dokter pemeriksa hiperkes.\n2. Jika karyawan menolak, wajib dibuatkan Berita Acara Penolakan bermaterai Rp 10.000 disaksikan pengurus P2K3.\n3. Salinan rekam medis akhir disimpan dalam arsip K3 selama minimal 30 tahun sesuai Permenaker 05/2018 Pasal 30.',
    sanctionRisk: 'Risiko gugatan perdata ganti rugi cacat seumur hidup dari mantan karyawan yang tidak dapat disanggah perusahaan di kemudian hari, serta Nota Pengawasan dari Pengawas Ketenagakerjaan Disnaker.'
  },
  {
    id: 'kb-02',
    category: 'K3_KEBAKARAN',
    title: 'Standar Proteksi Kebakaran Gudang B3 & Mitigasi Pasca-Insiden Karawang Barat',
    tags: ['kebakaran', 'karawang', 'hydrant', 'permenaker 04/1980', 'pp 50/2012', 'flame detector'],
    question: 'Bagaimana standar proteksi kebakaran gudang penyimpanan B3 dan kewajiban mitigasi pasca-insiden kebakaran Oktober 2025 di Karawang Barat?',
    legalBasis: 'Instruksi Menaker No. Ins.11/M/BW/1997, Permenaker No. 04/MEN/1980, dan PP No. 22/2021 Pasal 295',
    expertAnswer: 'Instalasi penyimpanan limbah B3 mudah terbakar (flammable solvent) wajib dilengkapi proteksi aktif berlapis: jaringan pipa hydrant bertekanan minimal 7.5 bar, sistem detektor api/asap (flame & smoke detector) 24/7 yang terhubung ke panel kontrol pusat, serta sprinkler/foam system otomatis. Pasca-insiden kebakaran gudang Karawang Barat Oktober 2025, perusahaan terikat komitmen pemulihan dan penataan ulang total zonasi penyimpanan.',
    operationalProcedure: '1. Pemeliharaan dan uji alir (flow-test) hydrant mingguan dengan pengujian diesel pump tiap Senin pagi.\n2. Segregasi drum pelarut mudah terbakar dengan lorong pemisah minimal 2 meter dan dinding pemisah tahan api 2 jam.\n3. Pengujian berkala mutu udara ambien permukiman warga sekitar oleh lab terakreditasi KAN setiap triwulan.',
    sanctionRisk: 'Pencabutan izin operasional TPS B3 oleh Dinas Lingkungan Hidup Kab. Karawang dan KLHK, penghentian total kegiatan usaha, serta tuntutan ganti rugi lingkungan masyarakat (UU 32/2009 Pasal 87).'
  },
  {
    id: 'kb-03',
    category: 'TRANSPORTER',
    title: 'Kualifikasi Pengemudi & Perlengkapan Armada Transporter Sabang-Merauke',
    tags: ['transporter', 'sabang merauke', 'driver', 'spill kit', 'pp 22/2021', 'kemenhub'],
    question: 'Apa saja syarat wajib bagi pengemudi dan armada angkutan limbah B3 PT. Dame Alam Sejahtera yang melayani rute nasional dari Sabang sampai Merauke?',
    legalBasis: 'PP No. 22 Tahun 2021 Pasal 339, Permenhub No. PM 60/2019, dan UU No. 22 Tahun 2009',
    expertAnswer: 'Seluruh armada logistik limbah B3 wajib mengantongi Rekomendasi Pengangkutan Limbah B3 dari KLHK dan Izin Penyelenggaraan Angkutan Barang Khusus dari Kemenhub. Pengemudi wajib memiliki SIM BII Umum aktif serta Sertifikat Pelatihan Penanganan Bahan/Limbah B3 resmi.',
    operationalProcedure: '1. Setiap unit armada wajib membawa Spill Kit On-Board lengkap (absorbent boom, pad, kantong limbah kuning, sarung tangan nitril tebal, kacamata goggle).\n2. Dilengkapi GPS tracking telematika untuk memantau rute dan alarm batas waktu lelah (fatigue alarm).\n3. Pembatasan jam mengemudi maksimal 4 jam berturut-turut tanpa jeda istirahat 30 menit; rute perjalanan > 12 jam wajib menggunakan 2 driver (tandem).',
    sanctionRisk: 'Pencegatan unit, penahanan truk di jalan raya, tilang Ditjen Hubdat & Gakkum KLHK, serta pencabutan izin trayek transporter limbah B3.'
  },
  {
    id: 'kb-04',
    category: 'PLANT_SUKABUMI',
    title: 'Prosedur K3 Pemanfaatan Oli Bekas & Teknik De-Watering Lumpur di Sukabumi',
    tags: ['sukabumi', 'oli bekas', 'de-watering', 'sludge', 'lumpur', 'filter press', 'permenaker 05/2018'],
    question: 'Bagaimana standar keselamatan kerja pada teknik pengolahan de-watering/drying lumpur dan unit pemurnian oli bekas di Plant Sukabumi?',
    legalBasis: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja & Permenaker No. 38 Tahun 2016 tentang K3 Pesawat Tenaga dan Produksi',
    expertAnswer: 'Teknik de-watering and drying bertujuan mengurangi kadar air dan memperkecil volume lumpur limbah. Proses ini menggunakan mesin mekanik hidrolik bertekanan tinggi (filter press/centrifuge) dan suhu panas (dryer). Sementara unit oli bekas melibatkan pemanasan reboiler yang melepaskan uap hidrokarbon. Perlindungan mencakup sistem ventilasi hisap uap (exhaust hood), grounding pembuang listrik statis, dan APD tahan bahan kimia korosif & uap panas.',
    operationalProcedure: '1. Pengujian Nilai Ambang Batas (NAB) uap hidrokarbon di ruang kerja oli bekas per semester.\n2. Pemeriksaan interlock safety switch pada filter press de-watering agar mesin mati otomatis saat pelindung dibuka.\n3. Operator wajib mengenakan face shield, respirator cartridge uap organik, dan sarung tangan tahan asam/minyak.',
    sanctionRisk: 'Kecelakaan jepit mesin hidrolik, ledakan uap hidrokarbon oli bekas, serta paparan karsinogenik uap pelarut kronis pada teknisi.'
  },
  {
    id: 'kb-05',
    category: 'DISIPLIN_PHK',
    title: 'Penegakan Sanksi Disiplin (SP1-SP3 & PHK) Pelanggaran SOP Limbah & Lingkungan',
    tags: ['disiplin', 'phk', 'sp1', 'sp3', 'bypass ipal', 'pp 35/2021', 'uu 32/2009'],
    question: 'Bagaimana prosedur penegakan sanksi disiplin dan dasar hukum PHK bagi personil yang sengaja membuang limbah ilegal atau mem-bypass IPAL?',
    legalBasis: 'PP No. 35 Tahun 2021 Pasal 52 ayat (2) & UU No. 32 Tahun 2009 Pasal 104',
    expertAnswer: 'Pembuangan limbah B3 ke media lingkungan tanpa izin (*bypassing* IPAL) atau pemalsuan manifes Festronik dikualifikasikan sebagai Pelanggaran Berat yang merugikan perusahaan dan negara. Berdasarkan PP 35/2021 Pasal 52 ayat (2), perusahaan dapat melakukan Pemutusan Hubungan Kerja (PHK) tanpa pesangon (hanya diberikan uang penggantian hak dan uang pisah sesuai PKB) setelah melalui pembuktian Berita Acara Investigasi K3.',
    operationalProcedure: '1. Pembentukan Tim Investigasi Gabungan (HSE, HR Corporate, dan Security) dalam 1x24 jam sejak temuan.\n2. Penerbitan Surat Peringatan Terakhir (SP3) atau Surat Skorsing menuju PHK.\n3. Pelaporan koordinasi ke Dinas Tenaga Kerja setempat untuk pencatatan perselisihan jika ada keberatan.',
    sanctionRisk: 'Pekerja dan pengusaha dapat dipidana penjara 1 hingga 3 tahun dan denda Rp 1.000.000.000 s/d Rp 3.000.000.000 sesuai UU 32/2009 Pasal 104.'
  },
  {
    id: 'kb-06',
    category: 'KOMPENSASI',
    title: 'Hak Tunjangan Bahaya Kimia, Ekstra Puding & BPJS TK Risiko Sangat Tinggi',
    tags: ['kompensasi', 'hazard allowance', 'susu murni', 'bpjs tk', 'pp 44/2015', 'gizi kerja'],
    question: 'Apakah pekerja penanganan limbah B3 berhak atas tunjangan bahaya, nutrisi ekstra detoksifikasi, dan jaminan kecelakaan kerja khusus?',
    legalBasis: 'Instruksi Menakertrans No. Ins.03/M/BW/1999 dan PP No. 44 Tahun 2015 Lampiran Tarif JKK Kelompok V',
    expertAnswer: 'Perusahaan wajib mendaftarkan seluruh pekerja (termasuk tenaga alih daya dan kru transporter) pada Program JKK BPJS Ketenagakerjaan dengan kategori Tingkat Risiko Sangat Tinggi (Kelompok V dengan tarif iuran 1,74% upah). Selain itu, pekerja yang terpapar uap toksik, debu lumpur, atau logam berat wajib diberikan makanan tambahan (ekstra puding berupa susu murni/vitamin C harian) untuk menjaga daya tahan tubuh metabolisme.',
    operationalProcedure: '1. Pembagian rutin susu murni 250ml setiap pukul 10.00 WIB di kantin bersih (di luar zona operasional).\n2. Pembayaran tunjangan risiko bahaya (hazard pay) tertera jelas pada rincian slip gaji bulanan.\n3. Audit bukti pembayaran iuran BPJS Ketenagakerjaan 100% headcount tiap awal bulan.',
    sanctionRisk: 'Denda administratif ketenagakerjaan dan sanksi tidak mendapatkan pelayanan publik tertentu (TMPT) bagi perusahaan yang tidak mendaftarkan pekerjanya pada program jaminan sosial.'
  },
  {
    id: 'kb-07',
    category: 'PKWT_PKWTT',
    title: 'Audit Kepatuhan Kontrak PKWT vs PKWTT, Larangan Probation & Uang Kompensasi',
    tags: ['pkwt', 'pkwtt', 'probation', 'kompensasi pkwt', 'pp 35/2021', 'uu ciptaker', 'peralihan status'],
    question: 'Apa saja titik rawan audit pada kontrak PKWT? Bagaimana konsekuensi hukum bila PKWT memuat klausul masa percobaan (probation) atau tidak dibayarkan uang kompensasinya?',
    legalBasis: 'UU No. 13/2003 jo. UU No. 6/2023 Pasal 58, Pasal 59, Pasal 61A dan PP No. 35 Tahun 2021 Pasal 4 s/d 17',
    expertAnswer: 'TITIK RAWAN KRITIS AUDIT. 1) PKWT dilarang mensyaratkan masa percobaan kerja (probation). Jika dicantumkan, klausul tersebut BATAL DEMI HUKUM dan masa kerja dihitung sejak hari pertama. 2) PKWT yang melanggar ketentuan jenis pekerjaan (misal untuk core business tetap rutin) atau melampaui batas akumulasi 5 tahun, DEMI HUKUM BERUBAH MENJADI PKWTT (Pekerja Tetap). 3) Setiap berakhirnya masa kontrak PKWT (minimal 1 bulan bekerja terus-menerus), pengusaha WAJIB membayar Uang Kompensasi PKWT dengan rumus (Masa Kerja / 12) x 1 Bulan Upah Pokok + Tunjangan Tetap.',
    operationalProcedure: '1. Review seluruh draf kontrak PKWT sebelum ditandatangani untuk memastikan tidak ada kata "Masa Percobaan / Probation".\n2. HRD mengunggah dan mencatatkan kontrak PKWT ke portal resmi Kemnaker RI dalam tempo maksimal 3 hari kerja.\n3. HR Payroll menyusun kertas kerja perhitungan Uang Kompensasi PKWT secara otomatis setiap periode kontrak berakhir/diperpanjang.',
    sanctionRisk: 'Peralihan status pekerja kontrak menjadi karyawan tetap secara hukum, tuntutan pembayaran rapel kompensasi di PHI, serta sanksi denda ketenagakerjaan.'
  },
  {
    id: 'kb-08',
    category: 'OUTSOURCING_TUPE',
    title: 'Legalitas Vendor Alih Daya (Outsourcing) & Klausul Perlindungan Prinsip TUPE',
    tags: ['outsourcing', 'alih daya', 'tupe', 'vendor', 'pks', 'pp 35/2021', 'cleaning', 'security'],
    question: 'Bagaimana standar legalitas perusahaan alih daya (outsourcing) dan kewajiban klausul TUPE (Transfer of Undertaking Protection of Employment) menurut PP 35/2021?',
    legalBasis: 'UU No. 13/2003 jo. UU No. 6/2023 Pasal 64-66 dan PP No. 35 Tahun 2021 Bab III Pasal 18-20',
    expertAnswer: 'Perusahaan alih daya (vendor) WAJIB berbadan hukum Perseroan Terbatas (PT) dan memiliki izin berusaha berbasis risiko (NIB OSS RBA KBLI Aktivitas Penempatan/Penyediaan Tenaga Kerja). Dalam hal pekerja alih daya diikat dengan PKWT oleh vendor, perjanjian kerja WAJIB memuat klausul TUPE (Transfer of Undertaking Protection of Employment), yaitu jaminan kelangsungan bekerja bagi pekerja alih daya apabila terjadi pergantian vendor penyedia jasa di lokasi kerja sepanjang objek pekerjaannya tetap ada.',
    operationalProcedure: '1. Melakukan audit uji tuntas (due diligence) izin legalitas PT vendor alih daya sebelum penandatanganan Kontrak PKS B2B.\n2. Menyisipkan klausul kewajiban kepatuhan upah minimum (UMK), pembayaran BPJS Ketenagakerjaan & Kesehatan, serta klausul TUPE dalam naskah PKS.\n3. Meminta bukti rekapitulasi transfer gaji dan kuitansi setor BPJS vendor setiap bulan sebagai lampiran invoice penagihan jasa.',
    sanctionRisk: 'Risiko Tanggung Renteng (Joint Liability) di mana sengketa upah dan pesangon pekerja vendor alih daya dapat dibebankan langsung ke DAS Group sebagai perusahaan pemberi kerja utama bila vendor terbukti bodong/ilegal.'
  }
];
