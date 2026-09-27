import { ChecklistItem } from '../../types/audit';

export const COMPENSATION_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Standar Pengupahan Sesuai UMK & Perhitungan Lembur
  {
    id: 'cmp-01',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Standar Upah Minimum (UMK) & Perhitungan Lembur',
    code: 'CMP-01',
    category: 'Standar Upah Pokok & Regulasi Lembur',
    title: 'Kepatuhan Upah Pokok Sesuai UMK Karawang/Sukabumi & Perhitungan Lembur PP 35/2021',
    description: 'Pemberian upah pokok tidak boleh di bawah Upah Minimum Kabupaten (UMK) yang berlaku di lokasi kerja pekerja (UMK Karawang untuk Plant Karawang & Driver Pool, UMK Sukabumi untuk Plant Sukabumi), serta perhitungan lembur sesuai formula baku PP No. 35/2021 (jam pertama 1.5x upah per jam, jam berikutnya 2x).',
    legalBasis: 'PP No. 36 Tahun 2021 jo. PP No. 51/2023 & PP No. 35/2021',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023 tentang Cipta Kerja (Pasal 88E & 78)',
      governmentReg: 'PP No. 36 Tahun 2021 tentang Pengupahan jo. PP No. 35 Tahun 2021',
      ministerialReg: 'Keputusan Gubernur Jawa Barat tentang UMK Tahun 2026'
    },
    legalSanction: 'Pasal 185 UU 13/2003: Membayar upah di bawah upah minimum diancam pidana penjara paling singkat 1 tahun dan denda maksimal Rp 400.000.000.',
    guidelines: 'Periksa slip gaji seluruh kategori jabatan (teknisi, operator, pengemudi, staf) dan formula perhitungan lembur.',
    auditSteps: [
      'Bandingkan komponen upah pokok pada slip gaji dengan ketetapan UMK Kab. Karawang dan Kab. Sukabumi tahun berjalan.',
      'Periksa lembar Surat Perintah Kerja Lembur (SPKL) dan kalkulasi lembur pada hari kerja biasa vs hari libur resmi.',
      'Pastikan tidak ada pemotongan upah di luar ketentuan peraturan perundang-undangan.',
      'Cek ketepatan waktu tanggal pembayaran upah (payroll date) setiap bulannya.'
    ],
    verificationCriteria: [
      'Upah pokok seluruh karyawan (100%) berada pada atau di atas Upah Minimum Kabupaten (UMK) yang berlaku di lokasi kerja penempatan.',
      'Perhitungan upah kerja lembur menggunakan formula baku resmi PP No. 35/2021 (1/173 x upah sebulan) dengan faktor pengali yang tepat.',
      'Surat Perintah Kerja Lembur (SPKL) terdokumentasi lengkap dan ditandatangani oleh atasan langsung serta pekerja bersangkutan.',
      'Tidak ada pemotongan upah sepihak yang melanggar ketentuan hukum ketenagakerjaan.',
      'Pembayaran gaji dilakukan tepat waktu sesuai tanggal cut-off payroll yang tercantum dalam Peraturan Perusahaan.',
      'Slip gaji memuat rincian transparansi komponen upah pokok, tunjangan tetap, tunjangan tidak tetap, dan rincian jam lembur.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Upah seluruh karyawan DAS Group di atas UMK wilayah masing-masing; sistem payroll terkomputerisasi menghitung lembur otomatis.',
    evidenceText: 'Rekapitulasi Slip Gaji Karyawan DAS Group Periode Agustus-September 2026.'
  },

  // SESI 2: Tunjangan Bahaya Kimia & Insentif Risiko Driver B3
  {
    id: 'cmp-02',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Tunjangan Bahaya Kimia & Premi Risiko Driver B3',
    code: 'CMP-02',
    category: 'Tunjangan Bahaya & Insentif Kinerja K3',
    title: 'Pemberian Tunjangan Bahaya Kimia (Hazard Pay) & Insentif Risiko Keselamatan Pengemudi B3',
    description: 'Pemberian tunjangan khusus risiko kimia (Hazard Pay) bagi operator decanting, operator filter press de-watering, dan teknisi distilasi oli, serta pemberian premi keselamatan (Safety & No-Accident Bonus) bagi pengemudi armada B3 yang menyelesaikan rute tanpa insiden dan mematuhi batas kecepatan.',
    legalBasis: 'Perjanjian Kerja Bersama (PKB) PT. Dame Alam Sejahtera & UU No. 13/2003',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023 tentang Cipta Kerja (Pasal 88)',
      governmentReg: 'PP No. 36 Tahun 2021 tentang Pengupahan',
      ministerialReg: 'Peraturan Perusahaan PT. Dame Alam Sejahtera Bab Pengupahan & Tunjangan Khusus'
    },
    legalSanction: 'Gugatan perselisihan hak ke Pengadilan Hubungan Industrial (PHI) dan demotivasi kerja kru di zona berbahaya.',
    guidelines: 'Cek transfer payroll rekening bank pekerja mengenai tunjangan risiko dan bonus no-accident.',
    auditSteps: [
      'Verifikasi nominal tunjangan bahaya kimia tertera jelas pada slip gaji pekerja lapangan.',
      'Cek skema pembayaran bonus keselamatan pengemudi yang bebas insiden selama 1 kuartal.',
      'Pastikan pembayaran tunjangan hazard tidak dipotong saat pekerja mengambil hak cuti resmi.',
      'Evaluasi transparansi matriks formula insentif risiko dan keselamatan kerja.'
    ],
    verificationCriteria: [
      'Tunjangan bahaya kimia (Hazard Pay) dibayarkan rutin setiap bulan kepada operator yang bertugas di zona paparan limbah B3.',
      'Skema insentif keselamatan (Safety & No-Accident Bonus) untuk pengemudi memiliki kriteria objektif berbasis data telematika GPS.',
      'Rincian perhitungan premi dan bonus tertera secara jelas dan transparan pada slip gaji masing-masing pekerja.',
      'Pekerja yang mengambil hak cuti tahunan atau izin sakit resmi tetap mendapatkan tunjangan risiko secara proporsional.',
      'Tersedia pedoman tertulis kebijakan tunjangan risiko yang telah disosialisasikan kepada seluruh staf operasional.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Slip rincian perhitungan premi hazard pay operator unit pengolah sludge Sukabumi belum terinci transparan di lampiran slip gaji.',
    evidenceText: 'Sampel slip gaji 10 karyawan DAS Group periode Agustus 2026.'
  },

  // SESI 3: Kepesertaan Penuh BPJS Ketenagakerjaan (Kelompok V) & Kesehatan
  {
    id: 'cmp-03',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Kepesertaan 100% BPJS TK (Kelompok V) & BPJS Kesehatan',
    code: 'CMP-03',
    category: 'Jaminan Sosial Ketenagakerjaan & Kesehatan',
    title: 'Pendaftaran 100% Karyawan pada BPJS TK Kategori Risiko Sangat Tinggi (Kelompok V: 1,74%) & BPJS Kesehatan',
    description: 'Pendaftaran seluruh 168 tenaga kerja (Head Office, TPS Karawang Barat, Plant Pemanfaat Sukabumi, dan Driver Sabang-Merauke) dalam 5 program jaminan sosial: JKK (Iuran Kelompok V 1.74% Risiko Sangat Tinggi Pengelolaan Limbah B3), JKM, JHT, JP, serta BPJS Kesehatan tanpa ada pekerja yang dialihkan atau disembunyikan.',
    legalBasis: 'PP No. 44/2015 jo. PP No. 82/2019 & UU No. 24/2011',
    legalHierarchy: {
      primaryLaw: 'UU No. 24 Tahun 2011 tentang BPJS (Pasal 14 & 15)',
      governmentReg: 'PP No. 44 Tahun 2015 jo. PP No. 82 Tahun 2019 tentang Penyelenggaraan JKK & JKM',
      ministerialReg: 'Permenaker No. 5 Tahun 2021 tentang Tata Cara Penyelenggaraan JKK, JKM, dan JHT'
    },
    legalSanction: 'Pasal 53 UU 24/2011: Sanksi administratif berupa penghentian izin usaha dan denda keterlambatan iuran 2% per bulan.',
    guidelines: 'Bandingkan jumlah karyawan aktif di database HRIS (168 orang) dengan jumlah kartu peserta aktif di SIPP BPJS Ketenagakerjaan.',
    auditSteps: [
      'Cocokkan master data karyawan HRIS dengan rincian data kepesertaan di portal SIPP Online BPJS TK.',
      'Cek bukti setoran iuran bulanan untuk memastikan tidak ada denda tunggakan.',
      'Pastikan klasifikasi tarif JKK tercatat pada Kelompok V (1.74%) sesuai risiko industri pengelolaan limbah B3.',
      'Verifikasi kepesertaan BPJS Kesehatan 100% untuk karyawan dan tanggungan keluarga yang memenuhi syarat.'
    ],
    verificationCriteria: [
      'Tingkat kepesertaan jaminan sosial mencapai 100% (168/168 karyawan aktif terdaftar pada BPJS Ketenagakerjaan dan BPJS Kesehatan).',
      'Iuran Jaminan Kecelakaan Kerja (JKK) dibayarkan sesuai tarif Kelompok V (1.74% upah) kategori risiko sangat tinggi limbah B3.',
      'Seluruh 5 program wajib BPJS TK (JKK, JKM, JHT, JP, JKP) diikutsertakan dan dibayarkan iurannya setiap bulan.',
      'Bukti setor iuran bulanan lunas tepat waktu sebelum tanggal 15 setiap bulannya tanpa riwayat denda tunggakan.',
      'Kartu identitas kepesertaan digital (Kartu BPJS) telah diserahkan dan dapat diakses oleh setiap pekerja melalui aplikasi JMO.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: '168 tenaga kerja aktif terdaftar 100% di BPJS TK Kantor Cabang Karawang tanpa tunggakan iuran.',
    evidenceText: 'Bukti Bayar Elektronik BPJS Ketenagakerjaan bulan September 2026 No. REF-BPJS-DAS-0926.'
  },

  // SESI 4: Program Nutrisi Detoksifikasi Ekstra Harian
  {
    id: 'cmp-04',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Ekstra Nutrisi Detoksifikasi Susu Steril Harian',
    code: 'CMP-04',
    category: 'Nutrisi Tambahan & Suplementasi Kesehatan',
    title: 'Distribusi Susu Steril Murni Harian (1 Kaleng/Hari) & Suplemen Multivitamin Pekerja Terpapar B3',
    description: 'Pemberian ekstra makanan dan minuman bergizi berupa 1 kaleng susu murni steril siap minum per hari kerja serta paket multivitamin antioksidan bulanan bagi pekerja yang bertugas di area gudang B3 Karawang, operator mesin de-watering/re-refining Sukabumi, dan kru bongkar-muat transporter.',
    legalBasis: 'Instruksi Menakertrans No. Ins.03/M/BW/1999 tentang Ekstra Makanan Pekerja',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Instruksi Menakertrans No. Ins.03/M/BW/1999 tentang Penyediaan Tambahan Makanan & Minuman'
    },
    legalSanction: 'Catatan ketidaksesuaian audit SMK3 dan meningkatnya kerentanan pekerja terhadap akumulasi racun kimia.',
    guidelines: 'Periksa buku log tanda terima distribusi susu steril di pos pantau gizi plant Karawang dan Sukabumi.',
    auditSteps: [
      'Periksa faktur pembelian rutin susu steril murni dan vitamin oleh bagian purchasing.',
      'Cek buku log serah terima pembagian susu harian kepada staf operasional.',
      'Pastikan konsumsi susu dilakukan di ruang istirahat bersih (bukan di dalam gudang limbah B3).',
      'Verifikasi ketersediaan paket suplemen multivitamin bulanan untuk pekerja terpapar.'
    ],
    verificationCriteria: [
      'Pemberian susu murni steril siap minum (1 kaleng per hari kerja) terdistribusi 100% kepada seluruh pekerja di zona paparan B3.',
      'Paket suplemen multivitamin antioksidan (Vitamin C, E, dan Zinc) dibagikan secara berkala setiap bulan.',
      'Tersedia buku log catatan distribusi harian yang ditandatangani oleh penerima manfaat nutrisi.',
      'Area konsumsi nutrisi berada di ruang makan / kantin bersih yang terisolasi total dari uap bahan kimia B3.',
      'Stok persediaan nutrisi diatur dengan sistem First In First Out (FIFO) dan masa kedaluwarsa terpantau ketat.'
    ],
    riskLevel: 'MEDIUM',
    status: 'MAJOR_NC',
    operationalScope: 'ALL',
    notes: 'Distribusi ekstra nutrisi susu steril di fasilitas Sukabumi sempat terhenti selama 4 hari kerja berturut-turut pada awal September akibat keterlambatan pengiriman dari vendor lokal tanpa pemberitahuan.',
    evidenceText: 'Buku Log Distribusi Nutrisi Pekerja Plant Sukabumi September 2026.'
  },

  // SESI 5: Fasilitas Higiene Personel & Dekontaminasi Mandi
  {
    id: 'cmp-05',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Fasilitas Higiene, Emergency Shower & Loker Dekontaminasi',
    code: 'CMP-05',
    category: 'Fasilitas Sanitasi & Emergency Eyewash / Shower',
    title: 'Penyediaan Unit Emergency Eyewash & Safety Shower Dekontaminasi Bertekanan Serta Ruang Loker Terpisah',
    description: 'Penyediaan fasilitas sanitasi memadai: stasiun Emergency Eyewash & Safety Shower terhubung suplai air bersih bertekanan konstan di dekat area reaktor dan gudang B3, ruang loker terpisah antara pakaian kerja terkontaminasi (Dirty Locker) dan pakaian bersih (Clean Locker), serta kantin dan toilet higienis.',
    legalBasis: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja (Pasal 33-44)',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 3 ayat 1)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja (Pasal 33-44)'
    },
    legalSanction: 'Peringatan keras dari Pengawas Ketenagakerjaan jika pekerja membawa pulang pakaian kerja beracun ke rumah.',
    guidelines: 'Lakukan uji tarik tuas eyewash & safety shower di Karawang Barat dan Sukabumi; periksa kebersihan ruang loker ganda.',
    auditSteps: [
      'Tarik tuas emergency shower untuk memverifikasi debit air mengalir seketika dengan air bersih jernih.',
      'Periksa pemisahan loker pakaian kerja (dirty area) dan pakaian pribadi (clean area).',
      'Inspeksi ketersediaan sabun dekontaminasi khusus pembersih sisa hidrokarbon/oli di kamar mandi.',
      'Cek hasil uji kualitas air bersih untuk sanitasi dan shower sesuai standar baku mutu air bersih.'
    ],
    verificationCriteria: [
      'Stasiun Emergency Eyewash & Safety Shower beroperasi dengan suplai air bersih bertekanan konstan dan dapat diakses dalam waktu < 10 detik dari titik bahaya.',
      'Uji semprot darurat (flushing test) dilakukan rutin setiap minggu dan dicatatkan pada kartu inspeksi gantung.',
      'Diterapkan sistem pemisahan loker ganda (Clean Locker untuk pakaian pribadi dan Dirty Locker untuk pakaian kerja tercemar B3).',
      'Fasilitas kamar mandi dekontaminasi dilengkapi sabun pembersih khusus minyak/lemak dan air mengalir higienis.',
      'Karyawan dilarang keras membawa pulang seragam kerja yang terkontaminasi limbah kimia ke rumah (pencucian dilakukan di fasilitas laundry internal).'
    ],
    riskLevel: 'HIGH',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'ALL',
    notes: 'Unit Emergency Safety Shower di dekat reaktor distilasi oli Sukabumi mengalami penurunan tekanan debit air di bawah standar (aliran air tersendat) saat tuas ditarik pada uji mendadak.',
    evidenceText: 'Checklist Uji Fungsi Emergency Shower K3-DAS-SAN-2026/08 dan Temuan Audit Visual.'
  },

  // SESI 6: Transparansi Uang Jalan & Dana Kontinjensi Perjalanan
  {
    id: 'cmp-06',
    stage: 'COMPENSATION_WELFARE',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Transparansi Uang Jalan & Dana Kontinjensi Darurat',
    code: 'CMP-06',
    category: 'Uang Jalan Driver & Dana Darurat Perjalanan',
    title: 'Transparansi Komponen Uang Jalan Pengemudi Armada B3 & Alokasi Dana Kontinjensi Darurat Perjalanan',
    description: 'Pemberian uang saku jalan (driver trip allowance) yang adil dan transparan: alokasi BBM sesuai rute GPS, biaya tol elektronik (e-Toll), biaya makan, tarif penyeberangan kapal feri antarpulau, serta tersedianya kartu dana darurat (Emergency Contingency Card) untuk respon cepat kebocoran armada di jalan tanpa menggunakan uang pribadi driver.',
    legalBasis: 'Peraturan Perusahaan PT. Dame Alam Sejahtera Bab Operasional Logistik',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan',
      governmentReg: 'PP No. 36 Tahun 2021 tentang Pengupahan',
      ministerialReg: 'SOP Manajemen Uang Jalan & Kas Operasional Armada DAS Group (SOP-LOG-014)'
    },
    legalSanction: 'Pengemudi memotong rute resmi, mematikan pendingin, atau menghemat BBM secara tidak aman yang memicu risiko tumpahan/kecelakaan.',
    guidelines: 'Periksa rincian transfer uang jalan armada di sistem Fleet Management System DAS Group.',
    auditSteps: [
      'Periksa komponen perhitungan uang jalan apakah mencukupi kebutuhan riil rute Sabang-Merauke.',
      'Cek ketersediaan kartu e-Toll dan saldo darurat operasional armada.',
      'Pastikan proses klaim penggantian biaya perbaikan darurat di jalan diselesaikan maksimal 2x24 jam.',
      'Verifikasi transparansi rincian biaya BBM, uang makan, dan biaya penyeberangan kapal feri.'
    ],
    verificationCriteria: [
      'Uang jalan (trip allowance) ditransfer penuh ke kartu fleet/rekening driver sebelum kendaraan diberangkatkan dari pool.',
      'Kalkulasi alokasi BBM berbasis jarak tempuh riil rute resmi GPS telematika dengan standar konsumsi bahan bakar yang wajar.',
      'Kartu e-Toll terisi saldo mencukupi seluruh ruas jalan tol yang dilalui pada manifes perjalanan rute resmi.',
      'Tersedia alokasi dana kontinjensi darurat (Emergency Contingency Fund) untuk penanganan insiden ban pecah/perbaikan mesin di jalan.',
      'Sistem pertanggungjawaban nota operasional (settlement) berbasis digital tanpa membebankan penalti yang tidak berdasar kepada pengemudi.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'TRANSPORTER',
    notes: 'Sistem uang jalan telah digital via kartu fleet corporate; driver tidak perlu menalangi biaya perjalanan menggunakan uang pribadi.',
    evidenceText: 'Log Transaksi Fleet Corporate Card & Rekapitulasi Uang Jalan Driver DAS-FLEET-2026/09.'
  }
];
