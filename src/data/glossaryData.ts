export interface GlossaryTerm {
  id: string;
  term: string;
  abbreviation?: string;
  englishTerm?: string;
  category: 'AUDIT_QUALITY' | 'MANPOWER_LEGAL' | 'K3_SAFETY' | 'BENEFITS_BPJS' | 'INDUSTRIAL_STANDARDS';
  simpleMeaning: string; // Penyederhanaan Bahasa Awam
  technicalDefinition: string; // Definisi Teknis Audit HR & K3
  practicalExample: string; // Contoh Lapangan di Plant / Transporter B3
  relatedRegulation?: string; // Acuan Regulasi / ISO
  tags: string[];
}

export const GLOSSARY_CATEGORIES = [
  { id: 'ALL', label: 'Semua Istilah', icon: 'BookOpen' },
  { id: 'AUDIT_QUALITY', label: 'Audit & Quality Management', icon: 'ClipboardCheck' },
  { id: 'MANPOWER_LEGAL', label: 'Ketenagakerjaan & Legal HR', icon: 'Gavel' },
  { id: 'K3_SAFETY', label: 'K3, HSE & Keselamatan Kerja', icon: 'ShieldAlert' },
  { id: 'BENEFITS_BPJS', label: 'Gaji, Remunerasi & BPJS', icon: 'CreditCard' },
  { id: 'INDUSTRIAL_STANDARDS', label: 'Standar Industri & ISO', icon: 'Award' }
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'capa',
    term: 'CAPA',
    abbreviation: 'CAPA',
    englishTerm: 'Corrective and Preventive Action',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Tindakan perbaikan untuk menyelesaikan masalah hari ini (Corrective) sekaligus langkah pencegahan agar masalah yang sama tidak terulang lagi besok (Preventive).',
    technicalDefinition: 'Metode sistematis dalam manajemen kualitas dan audit ISO 19011/45001 untuk merespons ketidaksesuaian (Non-Conformity) melalui identifikasi akar masalah (Root Cause Analysis) dan mitigasi risiko berulang.',
    practicalExample: 'Ditemukan operator forklift bekerja tanpa helm K3 (Minor NC). Corrective: Teguran langsung & wajib memakai helm saat itu juga. Preventive: Pemasangan sign K3 di pintu masuk depo dan inspeksi harian oleh Supervisor.',
    relatedRegulation: 'ISO 19011:2018, PP 50/2012 SMK3 Elemen 11',
    tags: ['capa', 'corrective', 'preventive', 'perbaikan', 'pencegahan', 'akar masalah']
  },
  {
    id: 'non-conformity',
    term: 'Non-Conformity (NC)',
    englishTerm: 'Non-Conformity',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Kondisi di mana pelaksanaan di lapangan tidak sesuai dengan aturan, SOP, atau undang-undang yang berlaku.',
    technicalDefinition: 'Penyimpangan atau ketidakmampuan untuk memenuhi persyaratan yang telah ditetapkan dalam standar audit, regulasi ketenagakerjaan, atau prosedur internal perusahaan.',
    practicalExample: 'SOP rekrutmen mewajibkan hasil tes kesehatan/MCU sebelum penandatanganan kontrak, namun ada 2 karyawan baru ditandatangani kontraknya sebelum MCU keluar.',
    relatedRegulation: 'ISO 9001:2015 / ISO 45001:2018 Klasifikasi Audit',
    tags: ['nc', 'non-conformity', 'ketidaksesuaian', 'temuan', 'pelanggaran']
  },
  {
    id: 'minor-nc',
    term: 'Minor Non-Conformity (NC Minor)',
    englishTerm: 'Minor Non-Conformity',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Penyimpangan kecil yang sifatnya administratif atau insidental dan tidak langsung membahayakan keselamatan atau operasional utama.',
    technicalDefinition: 'Kegagalan tunggal dalam menerapkan satu bagian dari prosedur/SOP yang tidak berdampak langsung pada kegagalan sistemik atau keselamatan jiwa pekerja.',
    practicalExample: 'Satu berkas karyawan tidak melampirkan salinan KTP di dalam folder fisik, meskipun data nomor KTP sudah terdaftar lengkap di database HRIS.',
    relatedRegulation: 'ISO 19011:2018 Kriteria Audit',
    tags: ['minor', 'nc minor', 'penyimpangan kecil', 'temuan ringan']
  },
  {
    id: 'major-nc',
    term: 'Major Non-Conformity (NC Major)',
    englishTerm: 'Major Non-Conformity',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Penyimpangan berat atau berulang yang berpotensi menimbulkan sanksi hukum, denda Disnaker, atau kerugian operasional signifikan.',
    technicalDefinition: 'Kegagalan total atau penyimpangan sistemik dalam menerapkan persyaratan regulasi UU Ketenagakerjaan atau standar ISO yang merusak integritas sistem.',
    practicalExample: 'Perusahaan tidak mendaftarkan 30 pekerja pabrik ke BPJS Ketenagakerjaan selama 6 bulan berturut-turut, atau tidak membayar upah lembur sesuai rumus regulasi.',
    relatedRegulation: 'UU No. 24 Tahun 2011 tentang BPJS, PP 35/2021',
    tags: ['major', 'nc major', 'penyimpangan berat', 'pelanggaran hukum']
  },
  {
    id: 'critical-hazard',
    term: 'Critical Hazard (Bahaya Kritis)',
    englishTerm: 'Critical Safety Hazard',
    category: 'K3_SAFETY',
    simpleMeaning: 'Kondisi bahaya darurat di mana keselamatan jiwa pekerja terancam langsung dan butuh tindakan penyetopan operasional detik itu juga.',
    technicalDefinition: 'Kondisi berbahaya berkategori High/Extreme Risk yang bertentangan langsung dengan standar keselamatan kerja (K3) serta berpotensi menimbulkan kecelakaan fatal (Fatality) atau cacat permanen.',
    practicalExample: 'Driver armada pengangkut Limbah B3 mengemudikan truk tangki tanpa Lisensi SIO yang masih berlaku, atau bekerja di ketinggian 4 meter tanpa Harness/APD.',
    relatedRegulation: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja, PP 22/2021',
    tags: ['hazard', 'bahaya kritis', 'critical', 'fatality', 'emergency', 'stop work']
  },
  {
    id: '5-why-analysis',
    term: 'Root Cause 5-Why Analysis',
    englishTerm: '5-Why Root Cause Analysis',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Teknik bertanya "Mengapa?" sebanyak 5 kali secara berturut-turut untuk menemukan akar masalah yang sebenarnya, bukan hanya menyembuhkan gejalanya.',
    technicalDefinition: 'Metode analisis pemecahan masalah yang mengeksplorasi hubungan sebab-akibat yang mendasari suatu masalah audit atau kecelakaan kerja hingga ditemukan kegagalan sistemik utamanya.',
    practicalExample: 'Mengapa lembur membengkak? -> Karena mesin macet. Mengapa macet? -> Karena tidak dirawat. Mengapa tidak dirawat? -> Karena tidak ada jadwal pemeliharaan. Akar Masalah: Belum ada SOP Maintenance Terjadwal.',
    relatedRegulation: 'Metodologi Quality Management System (QMS)',
    tags: ['5 why', 'root cause', 'akar masalah', 'analisis sebab akibat']
  },
  {
    id: 'pkwt',
    term: 'PKWT (Perjanjian Kerja Waktu Tertentu)',
    abbreviation: 'PKWT',
    englishTerm: 'Fixed-Term Employment Contract',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Kontrak kerja untuk karyawan tidak tetap / kontrak yang memiliki jangka waktu tertentu atau selesai berdasarkan selesainya suatu pekerjaan.',
    technicalDefinition: 'Perjanjian kerja antara pekerja/buruh dengan pengusaha untuk mengadakan hubungan kerja dalam waktu tertentu atau untuk pekerjaan tertentu sesuai PP 35/2021.',
    practicalExample: 'Pekerja proyek penanganan pembersihan limbah B3 di Sukabumi disatukan dalam kontrak PKWT selama 12 bulan dan didaftarkan ke Disnaker via WLKP.',
    relatedRegulation: 'PP No. 35 Tahun 2021 Bab II',
    tags: ['pkwt', 'kontrak', 'karyawan tidak tetap', 'jangka waktu']
  },
  {
    id: 'pkwtt',
    term: 'PKWTT (Perjanjian Kerja Waktu Tidak Tertentu)',
    abbreviation: 'PKWTT',
    englishTerm: 'Permanent Employment Contract',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Kontrak kerja untuk karyawan tetap yang berlaku sampai usia pensiun atau pengunduran diri/PHK.',
    technicalDefinition: 'Perjanjian kerja antara pekerja/buruh dengan pengusaha untuk mengadakan hubungan kerja yang bersifat tetap dan dapat mensyaratkan masa percobaan (probation) paling lama 3 bulan.',
    practicalExample: 'Kepala Plant Karawang dan Supervisor HSE diangkat menjadi pegawai tetap (PKWTT) setelah lulus masa percobaan 3 bulan.',
    relatedRegulation: 'UU No. 13/2003 jo. UU No. 6/2023 Cipta Kerja',
    tags: ['pkwtt', 'karyawan tetap', 'probation', 'permanen']
  },
  {
    id: 'wlkp',
    term: 'WLKP (Wajib Lapor Ketenagakerjaan Perusahaan)',
    abbreviation: 'WLKP',
    englishTerm: 'Mandatory Corporate Manpower Reporting',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Kewajiban perusahaan untuk melaporkan data jumlah pekerja, kondisi hubungan kerja, dan K3 kepada Kementerian Ketenagakerjaan setiap 1 tahun sekali secara online.',
    technicalDefinition: 'Laporan tahunan yang wajib disampaikan oleh setiap pengusaha atau pengurus fasilitas kerja mengenai keadaan ketenagakerjaan secara daring melalui portal kemnaker.go.id.',
    practicalExample: 'HR Corporate DAS Group mengunggah bukti tanda terima pelaporan online WLKP tahun 2026 untuk Plant Karawang dan Plant Sukabumi.',
    relatedRegulation: 'UU No. 7 Tahun 1981 tentang Wajib Lapor Ketenagakerjaan',
    tags: ['wlkp', 'wajib lapor', 'kemnaker', 'disnaker', 'laporan tahunan']
  },
  {
    id: 'sio',
    term: 'SIO (Surat Izin Operator)',
    abbreviation: 'SIO',
    englishTerm: 'Operator Permit / Competency License',
    category: 'K3_SAFETY',
    simpleMeaning: 'Lisensi resmi dari Kemnaker yang menyatakan seseorang kompeten dan diizinkan mengoperasikan alat berat / bahaya (Forklift, Boiler, Crane, Truk B3).',
    technicalDefinition: 'Sertifikat lisensi K3 yang diterbitkan oleh Kementerian Ketenagakerjaan RI kepada tenaga kerja yang telah mengikuti pelatihan & sertifikasi pengoperasian pesawat angkat/angkut atau alat berbahaya.',
    practicalExample: 'Driver penarik armada trailer tangki limbah B3 wajib mengantongi SIO K3 Kelas I dan SIM B2 Umum yang masih aktif.',
    relatedRegulation: 'Permenaker No. 8 Tahun 2020 tentang Pesawat Angkat dan Angkut',
    tags: ['sio', 'surat izin operator', 'forklift', 'kemnaker', 'lisensi k3']
  },
  {
    id: 'p2k3',
    term: 'P2K3 (Panitia Pembina K3)',
    abbreviation: 'P2K3',
    englishTerm: 'Occupational Safety & Health Committee',
    category: 'K3_SAFETY',
    simpleMeaning: 'Tim gabungan antara perwakilan manajemen dan perwakilan pekerja yang khusus mengurus keselamatan dan kesehatan kerja di tempat kerja.',
    technicalDefinition: 'Badan pembantu di tempat kerja yang merupakan wadah kerja sama antara pengusaha dan pekerja untuk mengembangkan kerja sama saling pengertian dan partisipasi efektif dalam penerapan K3.',
    practicalExample: 'P2K3 Plant DAS Group Karawang mengadakan rapat pleno triwulanan dan menyerahkan laporan kegiatan K3 ke Disnaker Kabupaten Karawang.',
    relatedRegulation: 'Permenaker No. PER.04/MEN/1987',
    tags: ['p2k3', 'panitia k3', 'komite k3', 'disnaker', 'safety committee']
  },
  {
    id: 'overtime-threshold',
    term: 'Overtime Threshold (Batas Maksimum Lembur)',
    englishTerm: 'Maximum Overtime Hours',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Batas paling banyak jam kerja lembur yang diperbolehkan hukum, yaitu maksimal 4 jam dalam 1 hari dan 18 jam dalam 1 minggu.',
    technicalDefinition: 'Batas legal durasi waktu kerja melebihi 7 jam sehari/40 jam seminggu sesuai regulasi pemerintah untuk mencegah kelelahan berlebih (fatigue) dan menjaga kesehatan pekerja.',
    practicalExample: 'Auditor mengecek log lembur staf operasional shift malam. Jika ada pekerja yang lembur 5 jam sehari tanpa istirahat memadai, ini dicatat sebagai Temuan Lembur Berlebih.',
    relatedRegulation: 'PP No. 35 Tahun 2021 Pasal 26',
    tags: ['lembur', 'overtime', 'batas lembur', '4 jam sehari', '18 jam seminggu']
  },
  {
    id: 'statutory-benefit',
    term: 'Statutory Benefit (Manfaat Perlindungan Hukum)',
    englishTerm: 'Mandatory Employee Benefits',
    category: 'BENEFITS_BPJS',
    simpleMeaning: 'Hak dan perlindungan kesehatan/jaminan sosial karyawan yang hukumnya wajib disediakan perusahaan oleh undang-undang (bukan sukarela).',
    technicalDefinition: 'Fasilitas kesejahteraan dan jaminan sosial wajib yang diamanatkan oleh regulasi ketenagakerjaan negara, mencakup BPJS Ketenagakerjaan, BPJS Kesehatan, THR, dan Cuti Berbayar.',
    practicalExample: 'Pendaftaran program BPJS Ketenagakerjaan (JKK, JK, JHT, JP, JKP) untuk seluruh kru pengangkut limbah sejak hari pertama kerja.',
    relatedRegulation: 'UU No. 24 Tahun 2011, PP 36/2021',
    tags: ['statutory benefit', 'bpjs', 'thr', 'hak pekerja', 'jaminan sosial']
  },
  {
    id: 'audit-trail',
    term: 'Audit Trail (Jejak Rekam Audit)',
    englishTerm: 'Audit Trail / Log History',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Catatan tanggal, waktu, dan nama petugas yang mengubah data audit atau dokumen HR dari waktu ke waktu sehingga bisa dilacak urutannya.',
    technicalDefinition: 'Urutan catatan kronologis berbasis sistem yang menyediakan bukti dokumenter dari urutan aktivitas yang telah mempengaruhi operasi, prosedur, atau peristiwa audit.',
    practicalExample: 'Setiap kali auditor mengubah status temuan checklist dari UNCHECKED menjadi MINOR_NC, sistem mencatat timestamp dan nama auditor secara permanen.',
    relatedRegulation: 'Standar Dokumentasi ISO 19011:2018',
    tags: ['audit trail', 'jejak rekam', 'timestamp', 'log perubahan', 'history']
  },
  {
    id: 'physical-evidence-checking',
    term: 'Physical Evidence Checking (Verifikasi Bukti Fisik)',
    englishTerm: 'Physical Evidence Verification',
    category: 'AUDIT_QUALITY',
    simpleMeaning: 'Proses mengecek langsung dokumen asli, foto lokasi, atau sertifikat fisik, bukan hanya percaya ucapan lisan.',
    technicalDefinition: 'Metode verifikasi audit dengan cara memeriksa secara fisik bentuk nyata dari dokumen, foto fasilitas, sertifikat kualifikasi, atau kondisi lapangan.',
    practicalExample: 'Auditor tidak hanya menanyakan "Apakah ada APD?", melainkan mendatangi gudang K3 dan mengecek stok fisik Box APD, foto serah terima APD, dan tanda tangan pekerja.',
    relatedRegulation: 'ISO 19011:2018 Pengumpulan Bukti Audit',
    tags: ['evidence', 'bukti fisik', 'verifikasi', 'foto lokasi', 'inspeksi fisik']
  },
  {
    id: 'umk',
    term: 'UMK (Upah Minimum Kabupaten/Kota)',
    abbreviation: 'UMK',
    englishTerm: 'Regency Minimum Wage',
    category: 'BENEFITS_BPJS',
    simpleMeaning: 'Batas upah paling rendah yang wajib dibayarkan perusahaan kepada pekerja di kabupaten/kota tempat plant beroperasi.',
    technicalDefinition: 'Upah bulanan terendah yang ditetapkan oleh Gubernur untuk kabupaten/kota tertentu sebagai jaring pengaman sosial bagi pekerja dengan masa kerja di bawah 1 tahun.',
    practicalExample: 'Upah pokok pekerja Plant Karawang disesuaikan dengan UMK Kabupaten Karawang, sedangkan pekerja Plant Sukabumi mengikuti UMK Kabupaten Sukabumi.',
    relatedRegulation: 'PP No. 51 Tahun 2023 tentang Pengupahan',
    tags: ['umk', 'upah minimum', 'gaji pokok', 'karawang', 'sukabumi']
  },
  {
    id: 'iso-45001',
    term: 'ISO 45001:2018',
    englishTerm: 'Occupational Health and Safety Management System',
    category: 'INDUSTRIAL_STANDARDS',
    simpleMeaning: 'Standar internasional untuk sistem manajemen keselamatan dan kesehatan kerja (K3) agar tidak ada pekerja yang kecelakaan atau sakit karena pekerjaan.',
    technicalDefinition: 'Standar global yang menetapkan persyaratan untuk sistem manajemen K3 yang memberikan panduan penggunaannya untuk meminimalkan risiko bahaya dan penyakit akibat kerja.',
    practicalExample: 'DAS Group menerapkan kerangka ISO 45001 untuk memastikan seluruh fasilitas pengolahan & armada pengangkut limbah memenuhi standar keselamatan internasional.',
    relatedRegulation: 'ISO 45001:2018 Global Standard',
    tags: ['iso 45001', 'standar internasional', 'k3', 'ohsas', 'keselamatan kerja']
  },
  {
    id: 'pp-50-2012',
    term: 'PP 50 Tahun 2012 (SMK3)',
    englishTerm: 'Government Regulation on OSH Management System',
    category: 'INDUSTRIAL_STANDARDS',
    simpleMeaning: 'Aturan pemerintah Indonesia tentang wajibnya perusahaan (terutama yang berisiko tinggi / punya 100+ pekerja) menerapkan Sistem Manajemen K3.',
    technicalDefinition: 'Peraturan Pemerintah RI mengenai penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) yang mencakup 12 elemen audit audit kepatuhan nasional.',
    practicalExample: 'Pemeriksaan 166 kriteria SMK3 untuk memperoleh Bendera Emas (Sertifikat Emas SMK3 dari Kemnaker RI).',
    relatedRegulation: 'PP No. 50 Tahun 2012 tentang SMK3',
    tags: ['pp 50/2012', 'smk3', 'kemnaker', 'audit smk3', 'bendera emas']
  },
  {
    id: 'limbah-b3-transporter',
    term: 'Kualifikasi Transporter Limbah B3',
    englishTerm: 'Hazardous Waste Transporter Compliance',
    category: 'INDUSTRIAL_STANDARDS',
    simpleMeaning: 'Kualifikasi khusus bagi pengemudi dan armada kendaraan yang membawa limbah Bahan Berbahaya dan Beracun (B3), meliputi izin KLHK, SIO Driver, & APD Kimia.',
    technicalDefinition: 'Kepatuhan regulasi transportasi limbah B3 sesuai aturan KLHK dan Kemenhub yang mewajibkan Izin Rekomendasi Pengangkutan, GPS Tracking, Manifest Festronik, dan kualifikasi K3 spesifik.',
    practicalExample: 'Setiap pengemudi armada DAS Group wajib dibekali Festronik Manifest, Tanggap Darurat Spill Kit, dan SIO K3 Kimia/Transportasi.',
    relatedRegulation: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan Lingkungan Hidup',
    tags: ['limbah b3', 'transporter', 'klhk', 'festronik', 'spill kit', 'das group']
  },
  {
    id: 'iso-19011',
    term: 'ISO 19011:2018',
    englishTerm: 'Guidelines for Auditing Management Systems',
    category: 'INDUSTRIAL_STANDARDS',
    simpleMeaning: 'Panduan standar dunia mengenai cara melakukan audit sistem manajemen yang independen, obyektif, dan terstruktur.',
    technicalDefinition: 'Standar internasional panduan untuk pelaksanaan audit sistem manajemen, termasuk prinsip-prinsip audit, pengelolaan program audit, dan evaluasi kompetensi auditor.',
    practicalExample: 'Metodologi Audit Management System (AMS) DAS Group disusun dengan mengacu penuh pada panduan ISO 19011:2018.',
    relatedRegulation: 'ISO 19011:2018 Guidelines',
    tags: ['iso 19011', 'panduan audit', 'ams', 'metodologi audit']
  },
  {
    id: 'outsourcing-alih-daya',
    term: 'Alih Daya (Outsourcing)',
    englishTerm: 'Outsourcing / Contract Manpower Agency',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Penggunaan tenaga kerja dari perusahaan penyedia jasa pihak ketiga (vendor) untuk pekerjaan penunjang non-inti di perusahaan.',
    technicalDefinition: 'Penyelenggaraan hubungan kerja di mana perusahaan menyerahkan sebagian pelaksanaan pekerjaan kepada perusahaan alih daya berbadan hukum PT dengan izin OSS RBA sesuai Pasal 64-66 UU 13/2003 jo. UU 6/2023 dan PP 35/2021.',
    practicalExample: 'Tenaga keamanan (security) dan pembersihan umum (cleaning service) di Plant Karawang disediakan oleh PT Vendor Alih Daya Berizin Resmi.',
    relatedRegulation: 'UU No. 6 Tahun 2023 & PP No. 35 Tahun 2021 Bab III',
    tags: ['outsourcing', 'alih daya', 'vendor', 'tenaga kerja kontrak pihak ketiga', 'tupe']
  },
  {
    id: 'tupe-protection',
    term: 'Prinsip TUPE (Transfer of Undertaking Protection of Employment)',
    abbreviation: 'TUPE',
    englishTerm: 'Transfer of Undertaking Protection of Employment',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Jaminan bahwa pekerja outsourcing tetap bekerja dan tidak boleh langsung di-PHK sepihak saat perusahaan berganti vendor penyedia jasa.',
    technicalDefinition: 'Klausul wajib dalam perjanjian kerja alih daya (PKWT) yang menjamin pengalihan perlindungan hak-hak dan kelangsungan masa kerja bagi pekerja alih daya apabila terjadi pergantian perusahaan penyedia alih daya sepanjang objek pekerjaannya tetap ada.',
    practicalExample: 'Ketika kontrak vendor security lama habis dan diganti vendor baru, 15 personil security tetap dipekerjakan oleh vendor baru dengan masa kerja yang diakui.',
    relatedRegulation: 'Pasal 19 PP No. 35 Tahun 2021',
    tags: ['tupe', 'alih daya', 'perlindungan kerja', 'pergantian vendor', 'jaminan kerja']
  },
  {
    id: 'uang-kompensasi-pkwt',
    term: 'Uang Kompensasi PKWT',
    englishTerm: 'Fixed-Term Contract End Compensation',
    category: 'BENEFITS_BPJS',
    simpleMeaning: 'Uang pesangon/bonus wajib dari perusahaan kepada karyawan kontrak setiap kali masa kontrak kerjanya berakhir atau selesai.',
    technicalDefinition: 'Kewajiban finansial pengusaha kepada pekerja PKWT dengan masa kerja minimal 1 bulan terus menerus yang dihitung dengan rumus proporsional: (Masa Kerja / 12) x 1 Bulan Upah Pokok + Tunjangan Tetap sesuai Pasal 61A UU 13/2003 jo. UU 6/2023 & PP 35/2021.',
    practicalExample: 'Karyawan PKWT masa kerja 6 bulan dengan gaji Rp 5.500.000,- yang kontraknya selesai berhak menerima kompensasi: (6/12) x Rp 5.500.000 = Rp 2.750.000,-.',
    relatedRegulation: 'PP No. 35 Tahun 2021 Pasal 15 - 17',
    tags: ['kompensasi pkwt', 'uang kompensasi', 'kontrak berakhir', 'pesangon kontrak']
  },
  {
    id: 'masa-percobaan-probation',
    term: 'Masa Percobaan Kerja (Probation)',
    englishTerm: 'Probationary Period',
    category: 'MANPOWER_LEGAL',
    simpleMeaning: 'Masa evaluasi kerja awal maksimal 3 bulan yang HANYA BOLEH diadakan untuk karyawan tetap (PKWTT) dan DILARANG KERAS untuk karyawan kontrak (PKWT).',
    technicalDefinition: 'Jangka waktu pengujian kinerja calon pekerja tetap paling lama 3 bulan dengan upah tidak boleh di bawah UMK. Jika perusahaan mencantumkan probation pada kontrak PKWT, maka demi hukum probation tersebut batal dan masa kerja dihitung sejak hari pertama.',
    practicalExample: 'Ditemukan draft PKWT operator limbah dengan klausul "Masa percobaan 3 bulan". Auditor mencatat Major NC karena melanggar Pasal 58 UU Ketenagakerjaan.',
    relatedRegulation: 'Pasal 58 UU No. 13/2003 jo. UU No. 6/2023',
    tags: ['probation', 'masa percobaan', 'larangan pkwt', 'pkwtt', 'evaluasi kerja']
  }
];

