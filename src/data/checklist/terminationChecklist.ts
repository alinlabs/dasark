import { ChecklistItem } from '../../types/audit';

export const TERMINATION_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Pemeriksaan Kesehatan Akhir Kerja (Exit MCU) Wajib
  {
    id: 'trm-01',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Pemeriksaan Kesehatan Akhir Kerja (Exit MCU) Wajib',
    code: 'TRM-01',
    category: 'Exit Medical Check-Up Wajib',
    title: 'Pemeriksaan Kesehatan Akhir Kerja (Exit MCU) Wajib Sebelum Tanggal Efektif Berakhirnya Hubungan Kerja',
    description: 'Kewajiban Exit MCU komprehensif bagi seluruh teknisi pengolah limbah B3, operator pabrik Karawang/Sukabumi, dan pengemudi armada sebelum tanggal efektif pengunduran diri/PHK untuk memastikan status kesehatan bebas dari Penyakit Akibat Kerja (PAK) kronis.',
    legalBasis: 'Permenakertrans No. Per.02/MEN/1980 Pasal 4 ayat (1)',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8 ayat 2)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenakertrans No. Per.02/MEN/1980 tentang Pemeriksaan Kesehatan Tenaga Kerja (Pasal 4)'
    },
    legalSanction: 'Jika diabaikan, eks-karyawan berhak menuntut ganti rugi PAK di kemudian hari tanpa batas waktu sanggahan.',
    guidelines: 'Integrasikan alur clearance HRD DAS Group: pembayaran kompensasi/pesangon tidak dapat dicairkan sebelum bukti Exit MCU terlampir.',
    auditSteps: [
      'Periksa apakah ada jadwal dan bukti pelaksanaan Exit MCU untuk seluruh karyawan yang purna tugas dalam 3 bulan terakhir.',
      'Cek kelengkapan parameter pemeriksaan: rontgen dada, spirometri, tes fungsi hati/ginjal, biomonitoring akhir.',
      'Pastikan biaya pemeriksaan Exit MCU 100% ditanggung oleh perusahaan di lab klinik rekanan resmi.',
      'Verifikasi ketiadaan tanda tangan persetujuan clearance pesangon sebelum lembar hasil Exit MCU keluar.'
    ],
    verificationCriteria: [
      'Pelaksanaan Exit MCU diselesaikan sebelum tanggal efektif berakhirnya hubungan kerja (Last Working Day).',
      'Parameter pemeriksaan mencakup Rontgen Dada, Spirometri Paru, Biomonitoring Logam Berat/Pelarut, dan Pemeriksaan Fisik Lengkap.',
      'Biaya seluruh rangkaian pemeriksaan Exit MCU ditanggung penuh 100% oleh perusahaan pada klinik hiperkes rekanan resmi.',
      'Surat Keterangan Kelaikan Kesehatan Akhir diterbitkan oleh Dokter Pemeriksa Kesehatan Tenaga Kerja bersertifikasi Kemnaker.',
      'Hasil pemeriksaan Exit MCU menjadi syarat wajib dalam formulir Exit Clearance sebelum pencairan uang pesangon/kompensasi.',
      'Salinan hasil Exit MCU diserahkan secara resmi kepada pekerja yang bersangkutan dan diarsipkan dalam rekam medis perusahaan.'
    ],
    riskLevel: 'CRITICAL',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'ALL',
    notes: 'Ditemukan 2 mantan operator pengolahan limbah Karawang Barat yang berhenti bulan lalu belum dilakukan Exit MCU oleh HRD namun formulir clearance pesangon telah disetujui.',
    evidenceText: 'Formulir Exit Clearance HRD-DAS bulan Agustus 2026 yang belum terisi kolom hasil MCU.'
  },

  // SESI 2: Pengarsipan & Penyerahan Riwayat Pajanan Kerja 30 Tahun
  {
    id: 'trm-02',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Pengarsipan & Riwayat Pajanan Kimia 30 Tahun',
    code: 'TRM-02',
    category: 'Riwayat Paparan & Rekam Medis Kerja 30 Tahun',
    title: 'Dokumentasi & Penyerahan Salinan Riwayat Pajanan Bahan Berbahaya Serta Rekam Higiene Kerja 30 Tahun',
    description: 'Pemberian dokumen rekapitulasi riwayat pajanan uap kimia, jenis limbah B3 yang pernah ditangani, dan rekam hasil MCU berkala selama masa pengabdian di PT. Dame Alam Sejahtera, serta kewajiban perusahaan mengarsipkan rekam medis tersebut selama minimal 30 tahun.',
    legalBasis: 'Permenaker No. 5 Tahun 2018 Pasal 30 tentang Penyimpanan Rekam Higiene 30 Tahun',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 11.2)',
      ministerialReg: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja (Pasal 30)'
    },
    legalSanction: 'Sanksi teguran tertulis dari Pengawas Ketenagakerjaan dan kehilangan alat bukti hukum apabila timbul gugatan PAK masa depan.',
    guidelines: 'Kaji format lampiran paklaring K3 DAS Group yang mencantumkan rekam paparan zat kimia spesifik dan masa kerja.',
    auditSteps: [
      'Periksa sistem penyimpanan arsip rekam medis digital dan fisik yang terkunci aman di bawah tanggung jawab dokter perusahaan.',
      'Cek apakah eks-karyawan menerima salinan ringkasan pajanan okupasi saat serah terima dokumen purna tugas.',
      'Pastikan retensi dokumen diatur minimal 30 tahun sesuai Permenaker 05/2018.',
      'Verifikasi enkripsi database kesehatan digital untuk menjaga kerahasiaan data medis pekerja.'
    ],
    verificationCriteria: [
      'Penyimpanan arsip rekam medis dan data riwayat pajanan higienis kerja dijamin masa retensinya minimal selama 30 (tiga puluh) tahun.',
      'Ringkasan rekam pajanan zat kimia (Job Exposure Profile) diserahkan sebagai lampiran resmi surat keterangan kerja (Paklaring).',
      'Database arsip rekam kesehatan tersimpan dalam sistem terkunci dan terenkripsi di bawah tanggung jawab Dokter Perusahaan.',
      'Mencantumkan riwayat jenis limbah B3 yang ditangani, area kerja penempatan, dan rekapitulasi hasil MCU berkala selama masa kerja.',
      'Tersedia tanda terima penyerahan salinan riwayat pajanan okupasi bertanda tangan pekerja dan HRD.'
    ],
    riskLevel: 'HIGH',
    status: 'MAJOR_NC',
    operationalScope: 'ALL',
    notes: 'Format resume paparan higienis kerja 30 tahun eks-karyawan masih dibuat manual belum terintegrasi otomatis di software HRIS.',
    evidenceText: 'Contoh Surat Keterangan Kerja (Paklaring) standar HRD DAS Group.'
  },

  // SESI 3: Exit Clearance Fisik & Digital Sistem Festronik KLHK
  {
    id: 'trm-03',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Exit Clearance Fisik & Pencabutan Festronik KLHK',
    code: 'TRM-03',
    category: 'Clearance Aset, ID Card Driver & Festronik KLHK',
    title: 'Penarikan Surat Tugas Driver B3, ID Card, APD Khusus, dan Penonaktifan Akun Festronik KLHK Maksimal 1x24 Jam',
    description: 'Prosedur pemutusan akses operasional fisik dan digital secara ketat: pencabutan akun sistem manifes elektronik (Festronik KLHK), penarikan kartu identitas pengemudi resmi, surat tugas angkutan B3, kunci armada, serta penarikan APD dan badge akses fasilitas Karawang/Sukabumi.',
    legalBasis: 'PP No. 22 Tahun 2021 tentang Akuntabilitas Manifes Limbah B3',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 59)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 274-340)',
      ministerialReg: 'Permen LHK No. 6 Tahun 2021 tentang Tata Cara Manifes Limbah B3'
    },
    legalSanction: 'Penyalahgunaan manifes limbah berpotensi menyeret perusahaan ke pidana lingkungan hidup jika limbah diselundupkan oleh mantan karyawan.',
    guidelines: 'Wajib ada serah terima form clearance resmi antara Divisi IT, Divisi Logistik Armada, dan HR Corporate.',
    auditSteps: [
      'Periksa formulir Exit Clearance bertanda tangan Departemen IT, Departemen Logistik, Gudang, dan HSE.',
      'Cek log audit sistem Festronik KLHK untuk memastikan akun mantan driver langsung dinonaktifkan.',
      'Pastikan seragam kerja dan kartu identitas berlogo DAS Group telah ditarik dan dimusnahkan/diarsipkan.',
      'Verifikasi penarikan kunci kontak kendaraan armada dan kartu akses pintu gudang TPS.'
    ],
    verificationCriteria: [
      'Penonaktifan akun digital sistem manifes elektronik (Festronik KLHK), email korporasi, dan akses ERP selesai dalam waktu < 24 jam.',
      'Surat tugas pengemudi angkutan B3, kartu Safety Passport, dan ID Card perusahaan ditarik kembali secara fisik.',
      'Kunci kontak armada, kunci loker, serta kartu akses gerbang TPS Karawang dan Sukabumi diserahkan kepada kepala pool.',
      'Seragam kerja dinas berlogo perusahaan ditarik guna mencegah penyalahgunaan identitas korporasi di lapangan.',
      'Formulir serah terima aset (Asset Clearance Form) ditandatangani lengkap oleh Divisi IT, Logistik, HSE, dan HRD.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Seluruh akun digital Festronik mantan karyawan langsung dinonaktifkan dalam waktu maksimal 1x24 jam.',
    evidenceText: 'Log audit autentikasi sistem informasi IT & Form Exit Clearance No. CLR-DAS-2026-022.'
  },

  // SESI 4: Wawancara Akhir Kerja (Exit Interview) Terstandarisasi
  {
    id: 'trm-04',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Sesi Wawancara Akhir Kerja (Exit Interview)',
    code: 'TRM-04',
    category: 'Wawancara Akhir Kerja & Evaluasi Budaya K3',
    title: 'Pelaksanaan Sesi Wawancara Akhir Kerja (Exit Interview) untuk Evaluasi Budaya K3 & Masukan Operasional',
    description: 'Sesi wawancara tatap muka atau kuesioner rahasia antara HR Corporate dengan karyawan yang akan berhenti guna menggali umpan balik mengenai iklim keselamatan kerja, perilaku atasan langsung, kondisi alat pelindung diri, serta saran perbaikan penanganan limbah.',
    legalBasis: 'SOP Manajemen Terminasi PT. Dame Alam Sejahtera (SOP-HR-012)',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Elemen 1 & 12)',
      ministerialReg: 'Pedoman Sistem Tata Kelola HR & K3 DAS Group'
    },
    legalSanction: 'Tingginya angka turnover tanpa solusi dan tidak terdeteksinya potensi bahaya tersembunyi di lapangan.',
    guidelines: 'Periksa rangkuman analitik hasil Exit Interview kuartalan yang disampaikan ke Direksi DAS Group.',
    auditSteps: [
      'Periksa formulir wawancara Exit Interview yang telah diisi oleh mantan karyawan.',
      'Cek apakah ada masukan kritis mengenai kondisi peralatan atau kelelahan jam mengemudi.',
      'Pastikan data Exit Interview dianalisa berkala sebagai bahan evaluasi perbaikan P2K3.',
      'Verifikasi kerahasiaan identitas dan data kuesioner wawancara akhir.'
    ],
    verificationCriteria: [
      '100% pekerja yang mengundurkan diri (resign) mengikuti sesi wawancara tatap muka atau mengisi kuesioner Exit Interview terstandarisasi.',
      'Kuesioner memuat evaluasi iklim keselamatan kerja, kepemimpinan atasan langsung, kecukupan APD, dan beban jam kerja.',
      'Data hasil wawancara dianalisis secara statistik setiap kuartal guna mengidentifikasi akar penyebab turnover karyawan.',
      'Masukan penting terkait potensi bahaya K3 diteruskan secara rahasia kepada Komite P2K3 untuk ditindaklanjuti.',
      'Arsip formulir Exit Interview terkelola rapi dan terpisah dari berkas administrasi umum.'
    ],
    riskLevel: 'MEDIUM',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Exit interview dilaksanakan rutin; poin masukan pengemudi rute jauh telah ditindaklanjuti dengan penataan rest area resmi.',
    evidenceText: 'Formulir Exit Interview Karyawan HR-DAS-EXIT-2026.'
  },

  // SESI 5: Perhitungan & Pembayaran Uang Kompensasi PKWT / Pesangon
  {
    id: 'trm-05',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Penyelesaian Hak Kompensasi & Pesangon PP 35/2021',
    code: 'TRM-05',
    category: 'Penyelesaian Hak Finansial & Kompensasi Regulasi',
    title: 'Pembayaran Uang Kompensasi PKWT / Pesangon / UPMK Sesuai Perhitungan Regulasi PP No. 35/2021 Tepat Waktu',
    description: 'Penyelesaian seluruh hak finansial pekerja tetap maupun pekerja kontrak (PKWT) transporter & plant: uang kompensasi PKWT (masa kerja/12 x 1 bulan upah), uang pesangon, uang penghargaan masa kerja (UPMK), dan uang penggantian hak (sisa cuti tahunan belum gugur) via transfer bank resmi.',
    legalBasis: 'PP No. 35 Tahun 2021 Pasal 15 s/d 17 & Pasal 40 s/d 59',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023 tentang Cipta Kerja (Pasal 156 & 61A)',
      governmentReg: 'PP No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja dan PHK (Pasal 15 & 40-59)',
      ministerialReg: 'Permenaker No. 5 Tahun 2021'
    },
    legalSanction: 'Pasal 187 UU 13/2003: Sanksi pidana denda dan gugatan perselisihan hak ke Disnaker serta Pengadilan Hubungan Industrial (PHI).',
    guidelines: 'Periksa slip perhitungan kompensasi PKWT, surat Perjanjian Bersama (PB), dan bukti transfer payroll rekening eks-karyawan.',
    auditSteps: [
      'Verifikasi kebenaran formula perhitungan kompensasi PKWT sesuai masa kerja aktual.',
      'Cek bukti transfer bank pada hari kerja terakhir efektif masa kerja.',
      'Pastikan penandatanganan Perjanjian Bersama (PB) bermaterai telah dilakukan tanpa paksaan.',
      'Periksa perhitungan pembayaran sisa hak cuti tahunan yang belum gugur.'
    ],
    verificationCriteria: [
      'Perhitungan uang kompensasi PKWT mematuhi formula resmi Pasal 15 PP No. 35/2021 (Masa Kerja / 12 x 1 Bulan Upah Terakhir).',
      'Uang pesangon, UPMK, dan uang penggantian hak (sisa cuti tahunan belum gugur) bagi pekerja tetap dihitung tepat sesuai regulasi.',
      'Seluruh hak finansial dibayarkan lunas 100% via transfer bank resmi pada hari kerja terakhir masa hubungan kerja.',
      'Tersedia dokumen Perjanjian Bersama (PB) yang ditandatangani kedua belah pihak di atas materai sah Rp 10.000.',
      'Bukti transfer bank terarsip rapi bersama rekapitulasi perhitungan payroll kompensasi pemutusan kerja.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Pembayaran uang kompensasi PKWT dan pesangon karyawan selesai 100% via transfer bank sesuai rumus PP 35/2021.',
    evidenceText: 'Bukti transfer rekening bank dan Form Perjanjian Bersama (PB) resmi.'
  },

  // SESI 6: Penerbitan Paklaring & Penonaktifan BPJS
  {
    id: 'trm-06',
    stage: 'TERMINATION_EXIT',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Penerbitan Paklaring & Penonaktifan BPJS',
    code: 'TRM-06',
    category: 'Surat Pengalaman Kerja (Paklaring) & BPJS',
    title: 'Penerbitan Surat Keterangan Kerja (Paklaring) Resmi & Penonaktifan BPJS Ketenagakerjaan untuk Pencairan JHT',
    description: 'Pemberian Surat Keterangan Pengalaman Kerja (Paklaring) bertanda tangan Direksi yang memuat masa kerja dan jabatan tanpa catatan mendiskreditkan, serta pembaruan status penonaktifan di sistem BPJS TK dalam waktu maksimal 3 hari kerja agar mantan pekerja dapat mencairkan Jaminan Hari Tua (JHT).',
    legalBasis: 'UU No. 13/2003 Pasal 160 ayat (1) jo. UU No. 24/2011',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 160 ayat 1)',
      governmentReg: 'PP No. 46 Tahun 2015 tentang Penyelenggaraan Jaminan Hari Tua',
      ministerialReg: 'Permenaker No. 18 Tahun 2022 tentang Tata Cara Pembayaran JHT'
    },
    legalSanction: 'Pengaduan ke Disnaker jika perusahaan menahan paklaring atau lalai menonaktifkan BPJS sehingga hak JHT tertahan.',
    guidelines: 'Periksa kecepatan penerbitan surat paklaring dan bukti status non-aktif pada portal SIPP BPJS TK.',
    auditSteps: [
      'Periksa register penerbitan surat paklaring kepada karyawan yang telah menyelesaikan proses clearance.',
      'Cek tanggal pelaporan penonaktifan karyawan di aplikasi SIPP BPJS TK.',
      'Pastikan eks-karyawan menerima formulir klaim JHT beserta berkas pendukungnya.',
      'Pastikan isi surat paklaring tidak memuat keterangan yang merugikan atau mendiskreditkan mantan pekerja.'
    ],
    verificationCriteria: [
      'Surat Keterangan Pengalaman Kerja (Paklaring) resmi berkop surat dan bertanda tangan Direksi diterbitkan maksimal 3 hari kerja.',
      'Isi surat paklaring memuat periode masa kerja dan posisi jabatan terakhir secara positif tanpa catatan mendiskreditkan.',
      'Pelaporan status penonaktifan kepesertaan pada portal SIPP Online BPJS TK diproses tepat waktu agar klaim JHT/JKP tidak terhambat.',
      'Eks-pekerja diberikan panduan dan formulir berkas pendukung klaim manfaat Jaminan Hari Tua (JHT).',
      'Tersedia buku register penyerahan surat paklaring dengan bukti tanda terima fisik/digital oleh penerima.'
    ],
    riskLevel: 'MEDIUM',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Penerbitan surat paklaring untuk 1 mantan staf administrasi melebihi SLA 3 hari kerja akibat keterlambatan tanda tangan basah manajemen.',
    evidenceText: 'Register Surat Keterangan Kerja HR-DAS-PAKLARING-2026.'
  }
];
