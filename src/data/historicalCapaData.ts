import { CAPAItem } from '../types/audit';

export const HISTORICAL_CAPA_LIST: CAPAItem[] = [
  // =========================================================================
  // 1. SIKLUS REKRUTMEN, SELEKSI & SKRINING PRA-KERJA (REC)
  // =========================================================================
  {
    id: 'capa-das-rec-01',
    checklistItemId: 'rec-01',
    findingCode: 'REC-01',
    findingTitle: 'Verifikasi Kualifikasi Standar Lisensi SIM BII Umum & Sertifikasi Pengemudi Angkutan B3',
    category: 'Kualifikasi Jabatan & Sertifikasi Driver B3',
    severity: 'MAJOR',
    rootCause: 'Dua orang pengemudi mutasi armada rute lintas Sumatera belum memiliki salinan legalisir Sertifikat Pengemudi Angkutan B3 dari Ditjen Hubdat di berkas induk HRD pusat.',
    rootCause5Why: [
      'Mengapa 1: Dua pengemudi rute Sumatera tidak memiliki sertifikat pelatihan angkutan B3 di file personalia.',
      'Mengapa 2: Berkas sertifikat asli masih tersimpan di pool perwakilan cabang Medan dan belum dikirimkan ke Head Office.',
      'Mengapa 3: Proses pengarsipan berkas mutasi antar-cabang dilakukan secara manual tanpa sistem sinkronisasi cloud.',
      'Mengapa 4: Belum ada SOP digitalisasi berkas wajib (e-Dossier) untuk seluruh pengemudi mutasi.',
      'Mengapa 5: Audit kepatuhan berkas armada cabang dilakukan hanya setahun sekali.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan berkas arsip pengemudi batch mutasi Sumatera di HRIS',
        answer: 'Ditemukan dokumen fisik sertifikat Ditjen Hubdat belum diunggah dan terverifikasi.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Klarifikasi ke Koordinator Pool Logistik Cabang Medan',
        answer: 'Sertifikat asli telah diverifikasi fisik di Medan dan discan untuk diupload ke portal pusat.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      2: {
        basedOn: 'Validasi database perizinan BPTD Wilayah II Sumatera Utara',
        answer: 'Nomor registrasi sertifikat terkonfirmasi sah dan terdaftar aktif sampai 2027.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      3: {
        basedOn: 'Penerapan e-Dossier driver di HRIS DAS Group',
        answer: 'Seluruh 32 pengemudi telah memiliki rekam digital sertifikat lisensi 100%.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan oleh Lead Auditor',
        answer: 'Tindakan perbaikan dan pencegahan telah tuntas dilaksanakan dengan bukti lengkap.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lakukan scan resolusi tinggi sertifikat B3 asli pengemudi Medan, unggah ke e-Dossier HRIS, dan terbitkan kartu identitas pengemudi resmi ber-barcode verifikasi.',
    preventiveAction: 'Terapkan integrasi portal e-Dossier Pengemudi DAS Group di mana setiap mutasi pool wajib lolos verifikasi berkas digital sebelum surat jalan diterbitkan.',
    requiredEvidence: 'Salinan digital sertifikat Ditjen Hubdat terverifikasi dan tautan e-Dossier aktif',
    requiredEvidenceList: [
      { id: 'ev-rec01-1', name: 'Salinan Sertifikat Pengemudi B3 Ditjen Hubdat', format: 'PDF' },
      { id: 'ev-rec01-2', name: 'Screenshot Verifikasi e-Dossier HRIS', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-rec01-1',
        name: 'Sertifikat_B3_Driver_Sumatera_Verified.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-03-10T11:00:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Salinan legalisir Sertifikat Pengemudi B3 resmi Ditjen Perhubungan Darat',
        fileSize: '1.4 MB'
      },
      {
        id: 'att-rec01-2',
        name: 'Screenshot_Portal_eDossier_Driver.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-03-11T09:30:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Tampilan e-Dossier Driver DAS Group terverifikasi 100%',
        fileSize: '950 KB'
      }
    ],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-03-15',
    status: 'VERIFIED',
    createdAt: '2026-03-01T08:00:00.000Z',
    inProgressAt: '2026-03-02T09:00:00.000Z',
    resolvedAt: '2026-03-11T14:00:00.000Z',
    verifiedAt: '2026-03-14T10:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas oleh Lead Auditor. Database e-Dossier seluruh driver telah terkoneksi secara online.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-rec-02',
    checklistItemId: 'rec-02',
    findingCode: 'REC-02',
    findingTitle: 'Kualifikasi Sertifikasi BNSP POPLB3/POPAL & Ahli K3 Kimia / Umum Personel Plant',
    category: 'Kualifikasi Kompetensi Personel Plant (POPLB3 & K3)',
    severity: 'MINOR',
    rootCause: 'Sertifikat kompetensi BNSP POPLB3 calon supervisor teknis pengolahan limbah Sukabumi terlambat diperpanjang karena jadwal asesmen LSP Lingkungan Hidup tertunda.',
    rootCause5Why: [
      'Mengapa 1: 1 calon supervisor teknis pengolahan limbah masa berlaku sertifikat POPLB3 habis 2 minggu.',
      'Mengapa 2: LSP Lingkungan Hidup menunda jadwal assessment asesor ke Sukabumi.',
      'Mengapa 3: Pengajuan perpanjangan sertifikasi baru diajukan 15 hari sebelum masa berlaku habis.',
      'Mengapa 4: Belum ada sistem calendar alert H-90 masa berlaku sertifikasi profesi BNSP.',
      'Mengapa 5: Monitoring sertifikasi keahlian teknis belum dimasukkan dalam KPI berkala HRD.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan portofolio sertifikasi BNSP personel kunci Sukabumi',
        answer: 'Sertifikat POPLB3 telah kadaluarsa per 31 Juli 2026 dan menunggu jadwal asesmen.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Konfirmasi surat resmi LSP Lingkungan Hidup No. 112/LSP-LH/VIII/2026',
        answer: 'Jadwal asesmen ulang ditetapkan pada tanggal 5 Oktober 2026.',
        by: 'Dewi Anggraini (HR Specialist)'
      }
    },
    correctiveAction: 'Daftarkan supervisor ke jadwal assessment percepatan LSP LHK dan terbitkan surat penunjukan pendamping teknis bersertifikasi aktif.',
    preventiveAction: 'Buat sistem kalender kepatuhan (Compliance Calendar) di HRIS DAS Group dengan reminder otomatis H-90 sebelum sertifikat profesi berakhir.',
    requiredEvidence: 'Sertifikat POPLB3 BNSP terbit baru dan Surat Keputusan Penunjukan Sementara',
    requiredEvidenceList: [
      { id: 'ev-rec02-1', name: 'Sertifikat Kompetensi POPLB3 BNSP Baru', format: 'PDF' },
      { id: 'ev-rec02-2', name: 'Surat Penunjukan Pendamping Teknis Bersertifikat Aktif', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-12',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T08:30:00.000Z',
    inProgressAt: '2026-09-25T09:00:00.000Z'
  },
  {
    id: 'capa-das-rec-07',
    checklistItemId: 'rec-07',
    findingCode: 'REC-07',
    findingTitle: 'Uji Praktik Lapangan Mengemudi Truk Tangki/Box B3 (Driving Skill, Reverse Parking & Hazard Perception)',
    category: 'Uji Praktik Mengemudi Truk B3 Lapangan',
    severity: 'CRITICAL',
    rootCause: 'Instruktur safety driving meloloskan bersyarat 1 calon pengemudi tronton tangki muatan cair yang gagal dalam simulasi pengereman basah di turunan curam tanpa melakukan re-test resmi.',
    rootCause5Why: [
      'Mengapa 1: 1 calon pengemudi tronton tangki diluluskan meski gagal simulasi pengereman darurat di jalan basah.',
      'Mengapa 2: Kebutuhan mendesak pengemudi armada untuk rute transporter lintas Jawa-Sumatera.',
      'Mengapa 3: Instruktur memberikan dispensasi kelulusan bersyarat tanpa re-test lapangan.',
      'Mengapa 4: Prosedur seleksi belum menetapkan sistem lock-out otomatis pada form penilaian jika ada parameter kritis bernilai 0.',
      'Mengapa 5: Otorisasi kelulusan uji praktik belum memerlukan persetujuan ganda dari Lead HSE.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit lembar skor penilaian berkendara truk B3 tanggal 15 September 2026',
        answer: 'Terdapat catatan nilai pengereman basah di bawah standar yang ditandai lulus.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Bekukan sementara izin penugasan mengemudi armada kargo B3 bagi pengemudi bersangkutan dan jadwalkan uji praktik ulang pengereman di sirkuit safety driving terakreditasi.',
    preventiveAction: 'Revisi SOP Uji Praktik Berkendara Truk B3 dengan klausul "Zero Tolerance": kegagalan pada modul pengereman basah dan manuver blind spot wajib otomatis dinyatakan tidak lulus tanpa dispensasi.',
    requiredEvidence: 'Berita acara uji ulang pengereman darurat basah dengan hasil Lulus murni dan form revisi SOP Driving Test',
    requiredEvidenceList: [
      { id: 'ev-rec07-1', name: 'Berita Acara Re-Test Driving Skill di Sirkuit Terakreditasi', format: 'PDF' },
      { id: 'ev-rec07-2', name: 'SOP Uji Praktik Pengemudi B3 Terkunci Digital', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-10-02',
    status: 'OPEN',
    createdAt: '2026-09-25T08:00:00.000Z'
  },
  {
    id: 'capa-das-rec-09',
    checklistItemId: 'rec-09',
    findingCode: 'REC-09',
    findingTitle: 'Pemeriksaan Kesehatan Pra-Kerja (Pre-Employment Medical Check-Up / MCU) Standar Hiperkes',
    category: 'Pemeriksaan Kesehatan Pra-Kerja (MCU)',
    severity: 'MINOR',
    rootCause: 'Formulir verifikasi referensi kerja dan hasil spirometri paru 3 calon driver rute Jawa Timur belum diinput lengkap oleh staf administrasi rekrutmen.',
    rootCause5Why: [
      'Mengapa 1: Berkas spirometri dan formulir reference check 3 driver tertahan di map fisik HR.',
      'Mengapa 2: Beban kerja staf rekrutmen meningkat pada periode penambahan 10 armada tronton.',
      'Mengapa 3: Tidak ada checklist kelengkapan berkas pra-kerja sebelum penandatanganan PKWT.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit sampel berkas rekrutmen driver batch Agustus 2026',
        answer: '2 dari 3 berkas telah dilengkapi hasil tes lab paru dan lolos uji spirometri.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      1: {
        basedOn: 'Pengecekan ke Lab Hiperkes rekanan',
        answer: 'Hasil tes fisik 1 driver sisa sedang dalam proses konfirmasi dokter spesialis okupasi.',
        by: 'Dewi Anggraini (HR Specialist)'
      }
    },
    correctiveAction: 'Lengkapi seluruh dokumen spirometri dan form referensi kerja pada modul HRIS selambatnya akhir pekan ini.',
    preventiveAction: 'Terapkan mandatory checklist validasi digital: sistem HRIS menolak penerbitan PKWT jika salah satu parameter MCU Pra-Kerja belum tervalidasi.',
    requiredEvidence: 'Dokumen hasil tes spirometri terverifikasi dokter hiperkes dan checklist kelengkapan berkas',
    requiredEvidenceList: [
      { id: 'ev-rec09-1', name: 'Lembar Hasil Uji Spirometri Paru Dokter Hiperkes', format: 'PDF' },
      { id: 'ev-rec09-2', name: 'Checklist Validasi Digital Berkas Pra-Kerja', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-08',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T10:00:00.000Z',
    inProgressAt: '2026-09-25T11:00:00.000Z'
  },
  {
    id: 'capa-das-rec-12',
    checklistItemId: 'rec-12',
    findingCode: 'REC-12',
    findingTitle: 'Pemeriksaan Toksikologi Baseline Logam Berat (Biomonitoring Timbal, Kadmium & Merkuri)',
    category: 'Biomonitoring Baseline Logam Berat & Toksikologi',
    severity: 'MAJOR',
    rootCause: 'Belum tersedianya data baseline kadar Timbal Darah (BLL) dan Kadmium Urin bagi calon operator reaktor daur ulang oli bekas Plant Sukabumi pada audit tahun 2025.',
    rootCause5Why: [
      'Mengapa 1: Operator baru langsung bertugas di area furnace tanpa pemeriksaan biomonitoring awal.',
      'Mengapa 2: Paket MCU standar klinik belum mencakup panel toksikologi logam berat spesifik.',
      'Mengapa 3: MoU layanan kesehatan kerja belum disesuaikan dengan profil risiko limbah oli & sludge.',
      'Mengapa 4: Belum ada daftar matriks pajanan kimia spesifik per stasiun kerja.',
      'Mengapa 5: Anggaran K3 belum mengalokasikan pos pengujian biomonitoring pra-kerja.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit MCU baseline karyawan Plant Sukabumi Q4 2025',
        answer: 'Panel logam berat BLL dan Cd-Urin belum tercantum dalam lembar hasil klinik.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Revisi PKS dengan Laboratorium Terakreditasi Kemenkes',
        answer: 'Paket MCU B3 Khusus telah mencakup BLL, Cd-Urin, Phenol urin, dan Benzene.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Hasil pemeriksaan baseline susulan 12 operator Sukabumi',
        answer: 'Seluruh operator berada di bawah ambang batas (BLL < 10 µg/dL, Cd < 2 µg/g kreatinin).',
        by: 'Dr. Farhan (Dokter Hiperkes Perusahaan)'
      },
      3: {
        basedOn: 'Matriks Pajanan Kimia DAS Group (Chemical Exposure Matrix)',
        answer: 'Matriks telah disahkan oleh Manajemen dan diterapkan untuk setiap rekrutmen baru.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      4: {
        basedOn: 'Verifikasi fisik laporan audit Q1 2026',
        answer: 'Seluruh berkas baseline toksikologi telah diarsipkan dalam rekam medis 30 tahun.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lakukan pemeriksaan toksikologi baseline susulan untuk seluruh operator Sukabumi dan masukkan ke dalam rekam medis okupasi.',
    preventiveAction: 'Wajibkan penambahan panel logam berat (BLL & Cd) dalam formulir pengantar MCU pra-kerja untuk seluruh kandidat unit pengolahan oli dan TPS B3.',
    requiredEvidence: 'Laporan hasil lab toksikologi baseline dan surat keterangan kelaikan kerja dokter hiperkes',
    requiredEvidenceList: [
      { id: 'ev-rec12-1', name: 'Laporan Lab Biomonitoring Baseline Logam Berat', format: 'PDF' },
      { id: 'ev-rec12-2', name: 'Matriks Pajanan Kimia Karyawan DAS Group', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-rec12-1',
        name: 'Laporan_Biomonitoring_Baseline_Operator_Sukabumi.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
        type: 'LAB_RESULT',
        uploadedAt: '2026-01-20T14:30:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Hasil uji lab baseline timbal darah dan kadmium urin 12 operator reaktor',
        fileSize: '2.8 MB'
      }
    ],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-02-05',
    status: 'VERIFIED',
    createdAt: '2025-12-10T09:00:00.000Z',
    inProgressAt: '2025-12-15T10:00:00.000Z',
    resolvedAt: '2026-01-22T16:00:00.000Z',
    verifiedAt: '2026-02-01T11:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas. Seluruh operator baru unit distilasi oli memiliki baseline toksikologi yang lengkap.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },

  // =========================================================================
  // 2. SIKLUS INDUKSI, ONBOARDING & PELATIHAN K3 TERPADU (ONB)
  // =========================================================================
  {
    id: 'capa-das-onb-02',
    checklistItemId: 'onb-02',
    findingCode: 'ONB-02',
    findingTitle: 'Sosialisasi Hak-Kewajiban, Tata Tertib Kerja, Disiplin Waktu & Struktur Organisasi',
    category: 'Sosialisasi Peraturan Perusahaan (PP)',
    severity: 'MINOR',
    rootCause: 'Tanda terima fisik buku saku Peraturan Perusahaan dan pakta integritas 3 operator baru plant Sukabumi belum diunggah dan diverifikasi ke modul administrasi HRIS.',
    rootCause5Why: [
      'Mengapa 1: Tanda terima fisik buku saku PP 3 operator Sukabumi belum tercatat di HRIS.',
      'Mengapa 2: Berkas masih tersimpan di kantor administrasi plant Sukabumi dan belum dikirimkan ke HR pusat.',
      'Mengapa 3: Petugas HR plant sedang fokus pada perpanjangan izin lingkungan semesteran.',
      'Mengapa 4: Belum ada scanner dokumen otomatis di pos sekuriti/administrasi Sukabumi.',
      'Mengapa 5: Prosedur onboarding belum mengunci approval karyawan sebelum berkas PP terunggah.'
    ],
    rootCause5WhyDetails: {},
    correctiveAction: 'Unggah salinan tanda terima buku saku PP bertandatangan pekerja ke sistem HRIS dan lakukan verifikasi silang.',
    preventiveAction: 'Terapkan tanda tangan digital berbasis e-Sign pada modul penerimaan buku Peraturan Perusahaan saat proses induksi hari pertama.',
    requiredEvidence: 'Bukti tanda terima buku saku PP bertandatangan 3 pekerja Sukabumi dan screenshot verifikasi HRIS',
    requiredEvidenceList: [
      { id: 'ev-onb02-1', name: 'Form Tanda Terima Buku Peraturan Perusahaan', format: 'PDF' },
      { id: 'ev-onb02-2', name: 'Screenshot Verifikasi Modul HRIS', format: 'Gambar' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-06',
    status: 'OPEN',
    createdAt: '2026-09-25T08:30:00.000Z'
  },
  {
    id: 'capa-das-onb-04',
    checklistItemId: 'onb-04',
    findingCode: 'ONB-04',
    findingTitle: 'Pelatihan Donning/Doffing Masker Respirator Gas/Uap & Uji Kerapatan Muka (Smoke Fit-Test)',
    category: 'Fit-Test Respirator & Kebijakan Rambut Muka',
    severity: 'MAJOR',
    rootCause: 'Operator gudang B3 Karawang Barat belum memahami bahwa rambut wajah tebal menghalangi penyekatan silikon respirator saat terpapar gas uap kimia mudah terbakar.',
    rootCause5Why: [
      'Mengapa 1: Dua operator memiliki janggut tebal saat bertugas di gudang B3 Karawang.',
      'Mengapa 2: Pekerja menganggap masker tetap rapat meski terhalang janggut.',
      'Mengapa 3: Belum pernah dilakukan simulasi uji kabut asap (smoke fit-test) di depan pekerja.',
      'Mengapa 4: Standar Clean-Shaven Policy belum dipasang sebagai rambu visual di pintu masuk gudang.',
      'Mengapa 5: Supervisor shift belum memeriksa kerapatan masker secara rutin sebelum mulai kerja.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit sampling visual di gerbang gudang TPS Karawang',
        answer: 'Ditemukan rambut janggut tebal menekan bantalan silikon respirator.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Pelaksanaan smoke fit-test ulang dengan kit iritan stannic chloride',
        answer: 'Seluruh operator dinyatakan lulus uji kerapatan setelah mencukur rambut wajah bersih.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      2: {
        basedOn: 'Pemasangan poster Clean-Shaven Policy di seluruh akses masuk',
        answer: 'Papan edukasi visual terpasang di 4 titik strategis gudang TPS Karawang.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      3: {
        basedOn: 'Pemeriksaan checklist briefing pagi (toolbox meeting)',
        answer: 'Pemeriksaan kerapatan respirator dimasukkan sebagai item wajib sebelum shift.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      4: {
        basedOn: 'Dokumentasi foto inspeksi penutupan temuan',
        answer: 'Seluruh personel patuh terhadap Clean-Shaven Policy dan menggunakan respirator sesuai SOP.',
        by: 'Rian Kurniawan (HSE Officer)'
      }
    },
    correctiveAction: 'Terapkan Clean-Shaven Policy seketika, wajibkan cukur rambut wajah bagi operator terpapar, dan lakukan smoke fit-test ulang dengan kit iritan stannic chloride.',
    preventiveAction: 'Pasang poster visual Standar Cukur Bersih di pintu masuk gudang B3 Karawang dan wajibkan checklist fit-test pada briefing safety pagi (toolbox meeting).',
    requiredEvidence: 'Sertifikat lolos smoke fit-test terbaru, foto kepatuhan cukur bersih (clean-shaven), SOP revisi pemakaian APD respirator',
    requiredEvidenceList: [
      { id: 'ev-onb04-1', name: 'Sertifikat lolos smoke fit-test terbaru', format: 'PDF' },
      { id: 'ev-onb04-2', name: 'Foto kepatuhan cukur bersih (clean-shaven) operator Karawang', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-onb04-1',
        name: 'Foto_Verifikasi_Clean_Shaven_Operator.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-09-25T10:30:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Foto bukti seluruh operator gudang Karawang telah mencukur janggut bersih dan lulus smoke fit-test',
        fileSize: '2.1 MB'
      },
      {
        id: 'att-onb04-2',
        name: 'Sertifikat_Smoke_Fit_Test_Karawang.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-09-25T11:15:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Rekap sertifikasi hasil smoke fit-test seluruh operator shift TPS Karawang',
        fileSize: '1.2 MB'
      }
    ],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-09-30',
    status: 'RESOLVED',
    createdAt: '2026-09-24T08:30:00.000Z',
    inProgressAt: '2026-09-24T10:15:00.000Z',
    resolvedAt: '2026-09-25T11:30:00.000Z',
    resolutionNotes: 'Seluruh operator telah melaksanakan cukur bersih dan lulus uji smoke fit-test dengan dokumen sertifikasi lengkap terlampir.'
  },
  {
    id: 'capa-das-onb-05',
    checklistItemId: 'onb-05',
    findingCode: 'ONB-05',
    findingTitle: 'Simulasi Tanggap Darurat Tumpahan Limbah B3 Jalan Raya (Spill Kit Drill & Netralisasi Bahan Kimia)',
    category: 'Pelatihan Spill Kit & Tanggap Darurat Tumpahan',
    severity: 'MAJOR',
    rootCause: 'Kru armada transporter rute Pantura belum menguasai urutan penggunaan boom oil absorbent saat terjadi kebocoran tangki di permukaan air mengalir.',
    rootCause5Why: [
      'Mengapa 1: Waktu penahanan simulasi tumpahan cairan oli di bahu jalan melebihi target SLA (> 15 menit).',
      'Mengapa 2: Kru belum pernah mempraktikkan pemasangan boom absorbent di saluran parit jalan.',
      'Mengapa 3: Modul drill spill kit sebelumnya hanya difokuskan pada lantai beton pool kendaraan.',
      'Mengapa 4: Belum ada skenario drill realistis untuk medan jalan raya basah dan saluran drainase terbuka.',
      'Mengapa 5: Evaluasi pasca-drill belum menyertakan audit kecepatan penanganan tumpahan di jalan umum.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Laporan evaluasi Emergency Drill Q2 2026 di Rest Area Tol Cipali',
        answer: 'Kru armada membutuhkan waktu 22 menit untuk membendung tumpahan oli uji.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      1: {
        basedOn: 'Pelaksanaan Re-Drill Spill Kit bersama Tim Patroli Jalan Tol',
        answer: 'Kru berhasil menyelesaikan deployment boom dan bantal absorbent dalam waktu 7 menit.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      2: {
        basedOn: 'Pembaruan isi kotak Spill Kit di 32 armada',
        answer: 'Setiap truk telah dilengkapi absorbent sock 3 meter, pads 50 lembar, dan serbuk netralisir.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      3: {
        basedOn: 'Penerbitan Buku Saku Tanggap Darurat Tumpahan Jalan Raya',
        answer: 'Buku panduan laminasi tahan air telah ditaruh di saku pintu kabin setiap armada.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      4: {
        basedOn: 'Verifikasi hasil audit penutupan temuan oleh Lead Auditor',
        answer: 'Seluruh bukti rekaman video drill dan berita acara dinyatakan memenuhi standar.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lakukan re-drill penanganan tumpahan jalan raya di sirkuit terbuka dengan skenario pembendungan saluran parit dan serahkan video evaluasi.',
    preventiveAction: 'Wajibkan pelatihan drill tumpahan jalan raya setiap 6 bulan sekali untuk seluruh pengemudi aktif dan kenektan armada B3.',
    requiredEvidence: 'Berita acara pelaksanaan drill tanggap darurat jalan raya, foto-foto penanganan tumpahan, dan SOP Spill Kit Kabin',
    requiredEvidenceList: [
      { id: 'ev-onb05-1', name: 'Berita Acara Drill Penanganan Tumpahan B3 Jalan Raya', format: 'PDF' },
      { id: 'ev-onb05-2', name: 'Foto Dokumentasi Deployment Spill Kit Cepat', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-onb05-1',
        name: 'Berita_Acara_Drill_SpillKit_TolCipali.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-06-15T15:00:00.000Z',
        uploadedBy: 'Capt. Hendro P.',
        caption: 'Berita acara kelulusan re-drill tanggap tumpahan jalan raya armada DAS Group',
        fileSize: '3.1 MB'
      },
      {
        id: 'att-onb05-2',
        name: 'Foto_Drill_SpillKit_Armada.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-06-15T15:30:00.000Z',
        uploadedBy: 'Capt. Hendro P.',
        caption: 'Dokumentasi simulasi pembendungan tumpahan cairan limbah oli di parit jalan',
        fileSize: '1.7 MB'
      }
    ],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-06-25',
    status: 'VERIFIED',
    createdAt: '2026-06-01T08:00:00.000Z',
    inProgressAt: '2026-06-03T09:00:00.000Z',
    resolvedAt: '2026-06-18T16:00:00.000Z',
    verifiedAt: '2026-06-22T10:00:00.000Z',
    resolutionNotes: 'Drill tanggap darurat tumpahan jalan raya telah diverifikasi tuntas. Waktu respon kru mencapai 7 menit (target < 10 menit).',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-onb-06',
    checklistItemId: 'onb-06',
    findingCode: 'ONB-06',
    findingTitle: 'Pelatihan Operasional Hydrant 7 Bar, Foam Extinguisher & Evakuasi Gudang B3 Karawang Barat',
    category: 'Proteksi & Tanggap Darurat Api Fasilitas',
    severity: 'CRITICAL',
    rootCause: 'Simulasi tanggap darurat kebakaran gudang TPS B3 Karawang Barat belum menguji skenario pemadaman listrik total dan respons start otomatis pompa diesel cadangan.',
    rootCause5Why: [
      'Mengapa 1: Simulasi kebakaran semester I tidak menguji respons saat pemadaman listrik total PLN.',
      'Mengapa 2: Skenario drill hanya fokus pada evakuasi jalan kaki ke Assembly Point.',
      'Mengapa 3: Switch otomatis transfer panel (ATS) pompa diesel belum terhubung ke modul simulasi darurat.',
      'Mengapa 4: Belum ada protokol integrasi skenario black-out pada simulasi kebakaran industri B3.',
      'Mengapa 5: Evaluasi pasca-rekonstruksi Karawang belum memasukkan pengujian multi-kegagalan daya.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan laporan berita acara simulasi drill kebakaran Karawang',
        answer: 'Tidak ada catatan durasi jeda start pompa diesel saat power cut.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lakukan pengujian black-out drill khusus pompa diesel hydrant 7 bar bersama Dinas Damkar Karawang dan catat waktu respons sistem otomatis.',
    preventiveAction: 'Wajibkan seluruh skenario drill tanggap darurat semesteran menyertakan uji pemadaman listrik total dan verifikasi fungsi pompa diesel otomatis < 10 detik.',
    requiredEvidence: 'Berita acara uji coba pompa diesel hydrant skenario pemadaman listrik dan rekaman video drill',
    requiredEvidenceList: [
      { id: 'ev-onb06-1', name: 'Berita Acara Black-Out Drill Pompa Diesel Hydrant', format: 'PDF' },
      { id: 'ev-onb06-2', name: 'Video Dokumentasi Start Otomatis Pompa Hydrant', format: 'Gambar' }
    ],
    attachments: [],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-10-04',
    status: 'OPEN',
    createdAt: '2026-09-25T09:00:00.000Z'
  },
  {
    id: 'capa-das-onb-07',
    checklistItemId: 'onb-07',
    findingCode: 'ONB-07',
    findingTitle: 'Penerbitan Sertifikasi Lisensi K3 Pengemudi B3, POPLB3 & Operator K3 Pesawat Tenaga',
    category: 'Sertifikasi K3 Resmi Kemnaker / Kemenhub / BNSP',
    severity: 'MINOR',
    rootCause: 'Proses perpanjangan fisik kartu lisensi K3 pengemudi angkutan B3 2 driver rute timur tertahan di loket administrasi BPTD.',
    rootCause5Why: [
      'Mengapa 1: 2 pengemudi rute Jawa Timur memegang surat keterangan sementara bukan kartu lisensi fisik.',
      'Mengapa 2: Antrean pencetakan kartu lisensi BPTD Wilayah Jabar mengalami keterlambatan blanko.',
      'Mengapa 3: Pengajuan perpanjangan diajukan mepet H-14 sebelum tanggal kedaluwarsa.',
      'Mengapa 4: Belum ada pengawalan langsung petugas liaison logistik ke kantor BPTD.',
      'Mengapa 5: Prosedur pembaruan belum mengalokasikan lead-time 60 hari kerja.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan fisik dokumen driver armada B-9201-DAS & B-9202-DAS',
        answer: 'Surat keterangan sementara sah dari BPTD terlampir namun kartu fisik belum diterbitkan.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      1: {
        basedOn: 'Liaison ke loket perizinan BPTD Wilayah Jabar',
        answer: 'Pencetakan blanko fisik dijadwalkan selesai pada awal pekan depan.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      }
    },
    correctiveAction: 'Kawal proses penerbitan kartu fisik di BPTD dan pastikan surat keterangan resmi BPTD selalu dibawa pengemudi saat bertugas.',
    preventiveAction: 'Terapkan SOP perpanjangan lisensi Kemenhub minimal 60 hari kalender sebelum masa berlaku kartu fisik habis.',
    requiredEvidence: 'Salinan kartu fisik lisensi K3 pengemudi B3 terbitan BPTD Kemenhub',
    requiredEvidenceList: [
      { id: 'ev-onb07-1', name: 'Salinan Kartu Lisensi K3 Pengemudi B3 Baru', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-10-10',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T10:00:00.000Z',
    inProgressAt: '2026-09-25T08:30:00.000Z'
  },

  // =========================================================================
  // 3. SIKLUS OPERASIONAL, PROTEKSI FASILITAS & HIGIENE INDUSTRI (K3)
  // =========================================================================
  {
    id: 'capa-das-k3-01',
    checklistItemId: 'k3-01',
    findingCode: 'K3-01',
    findingTitle: 'Pelaksanaan Daily Safety Talk (Toolbox Meeting) & Skrining Kebugaran Pra-Shift (Fit-to-Work)',
    category: 'Daily Safety Talk & Fit-to-Work Screening',
    severity: 'MAJOR',
    rootCause: 'Pencatatan hasil pemeriksaan tensi darah dan skrining fit-to-work operator shift malam TPS Karawang masih menggunakan buku tulis manual yang tidak terekam di sistem K3 pusat.',
    rootCause5Why: [
      'Mengapa 1: Data tensi darah shift malam tidak terupdate di dashboard kesehatan HSE.',
      'Mengapa 2: Petugas medis jaga malam hanya mencatat pada buku logbook fisik.',
      'Mengapa 3: Tablet digital pos kesehatan sempat mengalami gangguan sinkronisasi Wi-Fi.',
      'Mengapa 4: Belum ada prosedur upload offline-first pada aplikasi mobile skrining fit-to-work.',
      'Mengapa 5: Tidak ada verifikasi harian oleh HSE supervisor terhadap logbook manual.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan catatan fit-to-work shift malam bulan Januari 2026',
        answer: 'Ditemukan selisih data 8 hari yang belum terinput ke server HSE pusat.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Upgrade aplikasi mobile Fit-to-Work DAS Group dengan fitur offline storage',
        answer: 'Aplikasi dapat menyimpan data tensi lokal dan otomatis sync saat terhubung internet.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      2: {
        basedOn: 'Pemasangan tensimeter digital barcode scanner di Pos Jaga Karawang & Sukabumi',
        answer: 'Setiap pekerja men-scan ID badge sebelum pengukuran tensi secara otomatis.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      3: {
        basedOn: 'Rekapitulasi log digital 100% presensi fit-to-work shift malam',
        answer: 'Tingkat kepatuhan input mencapai 100% selama 60 hari berturut-turut.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan audit Q1 2026',
        answer: 'Sistem presensi fit-to-work barcode terbukti andal dan tuntas diverifikasi.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lengkapi Pos Medis Karawang dengan tensimeter digital terintegrasi barcode scanner dan digitalkan seluruh arsip logbook manual.',
    preventiveAction: 'Wajibkan seluruh stasiun kerja menggunakan aplikasi skrining fit-to-work digital dengan alert otomatis bagi pekerja dengan tensi sistolik > 140 mmHg.',
    requiredEvidence: 'Log digital dashboard fit-to-work dan SOP Skrining Kebugaran Terintegrasi',
    requiredEvidenceList: [
      { id: 'ev-k301-1', name: 'Log Ekspor Data Skrining Fit-to-Work Digital', format: 'PDF' },
      { id: 'ev-k301-2', name: 'Foto Alat Tensimeter Barcode Terpasang di Pos Medis', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-k301-1',
        name: 'Dashboard_FitToWork_Digital_Export.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-02-18T10:00:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Laporan log digital presensi dan hasil tensimeter seluruh kru shift kerja',
        fileSize: '1.6 MB'
      },
      {
        id: 'att-k301-2',
        name: 'Tensimeter_Barcode_Pos_Medis.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-02-18T10:30:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Unit tensimeter barcode scanner di Pos Jaga Kesehatan Karawang',
        fileSize: '1.1 MB'
      }
    ],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-02-25',
    status: 'VERIFIED',
    createdAt: '2026-01-28T09:00:00.000Z',
    inProgressAt: '2026-01-29T10:00:00.000Z',
    resolvedAt: '2026-02-19T15:00:00.000Z',
    verifiedAt: '2026-02-24T14:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas oleh Lead Auditor. Sistem barcode tensimeter berjalan sempurna.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-k3-02',
    checklistItemId: 'k3-02',
    findingCode: 'K3-02',
    findingTitle: 'Kepatuhan Pemakaian Alat Pelindung Diri (APD) Khusus Limbah Berbahaya & Buffer Stock APD',
    category: 'Penyediaan & Kepatuhan APD Khusus Kimia B3',
    severity: 'MINOR',
    rootCause: 'Stok pengaman (buffer stock) sarung tangan nitril ketebalan 15 mil dan respirator uap organik di pos TPS Karawang menipis di bawah batas minimum 2 minggu.',
    rootCause5Why: [
      'Mengapa 1: Stok sarung tangan nitril 15 mil di lemari APD Karawang tersisa 6 pasang (standar minimal 30 pasang).',
      'Mengapa 2: Terjadi lonjakan pemakaian saat penanganan limbah pelarut otomotif pekan lalu.',
      'Mengapa 3: Pengajuan Purchase Request (PR) tertahan di bagian purchasing selama 5 hari.',
      'Mengapa 4: Belum ada batas minimum stok (Re-Order Point) otomatis di aplikasi inventory pergudangan.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Inspeksi fisik lemari APD Pos TPS Karawang tanggal 24 September 2026',
        answer: 'Stok sarung tangan nitril dan cartridge uap organik di bawah safety level.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Surat Pesanan Cepat (Emergency PO) No. PO-APD-2026-098',
        answer: 'Vendor APD telah mengonfirmasi pengiriman 50 pasang sarung tangan nitril dan 30 pasang cartridge.',
        by: 'Rian Kurniawan (HSE Officer)'
      }
    },
    correctiveAction: 'Terbitkan Emergency PO untuk pengadaan 50 pasang sarung tangan nitril kimia dan 30 cartridge respirator gas organik.',
    preventiveAction: 'Atur sistem Re-Order Point (ROP) otomatis pada ERP Inventory dengan threshold pemesanan saat stok tersisa untuk 30 hari pemakaian.',
    requiredEvidence: 'Surat jalan penerimaan barang APD dari vendor dan foto stok lemari APD penuh',
    requiredEvidenceList: [
      { id: 'ev-k302-1', name: 'Surat Jalan Penerimaan APD Khusus Kimia B3', format: 'PDF' },
      { id: 'ev-k302-2', name: 'Foto Lemari Buffer Stock APD Terisi Penuh', format: 'Gambar' }
    ],
    attachments: [],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-10-05',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T14:00:00.000Z',
    inProgressAt: '2026-09-25T08:00:00.000Z'
  },
  {
    id: 'capa-das-k3-04',
    checklistItemId: 'k3-04',
    findingCode: 'K3-04',
    findingTitle: 'Penataan Denah TPS B3, Jarak Antar-Blok Drum Minimal 2 Meter, & Tanggul Penampung Tumpahan (Bund-Wall 110%)',
    category: 'Segregasi Bahan Kimia & Penataan Gudang B3',
    severity: 'MAJOR',
    rootCause: 'Kapasitas penataan ruang gudang blok B Karawang sempat over-capacity sehingga drum solvent ditaruh mendekati zona non-flammable.',
    rootCause5Why: [
      'Mengapa 1: Jarak drum pelarut di blok B Karawang berjarak < 2 meter dari material non-flammable.',
      'Mengapa 2: Volume penerimaan limbah pelarut dari pabrik otomotif Cikarang meningkat 40% pekan ini.',
      'Mengapa 3: Blok cadangan penyimpanan belum selesai dibersihkan.',
      'Mengapa 4: Perencanaan zonasi penempatan limbah harian belum di-update di sistem WMS.',
      'Mengapa 5: Belum ada sensor peringatan jarak batas antar-zona limbah inkompatibel.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pengukuran jarak fisik lorong antar-blok penyimpanan',
        answer: 'Jarak lorong terukur 1.4 meter, di bawah standar minimal 2 meter bebas hambatan.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      1: {
        basedOn: 'Verifikasi kapasitas tanggul bund-wall sekunder',
        answer: 'Tanggul penampung perlu pembersihan kerak sedimen lumpur oli.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      2: {
        basedOn: 'Penyusunan ulang tata letak (re-layout) Blok B Karawang',
        answer: 'Drum solvent dipindahkan ke Blok A dengan jarak lorong 2.2 meter.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      3: {
        basedOn: 'Pembersihan sedimen tanggul bund-wall sekunder',
        answer: 'Tanggul penampung 110% telah dibersihkan bebas endapan.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      4: {
        basedOn: 'Pemberian marka garis kuning (yellow safety line) di lantai gudang',
        answer: 'Marka visual pembatas zona lorong 2 meter telah dicat permanen.',
        by: 'Rian Kurniawan (HSE Officer)'
      }
    },
    correctiveAction: 'Pindahkan drum solvent ke blok penyimpanan A yang telah memiliki firewall 2 jam dan bersihkan tanggul bund-wall sekunder.',
    preventiveAction: 'Terapkan visual demarcation garis kuning pembatas jarak aman 2 meter dan pasang batas kuota maksimal per blok gudang di sistem WMS.',
    requiredEvidence: 'Foto tata letak baru blok B dengan jarak lorong >= 2 meter, Berita acara inspeksi kebersihan bund-wall 110%',
    requiredEvidenceList: [
      { id: 'ev-k304-1', name: 'Foto tata letak baru blok B dengan jarak lorong >= 2 meter', format: 'Gambar' },
      { id: 'ev-k304-2', name: 'Berita acara inspeksi kebersihan bund-wall 110%', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-k304-1',
        name: 'Foto_Relayout_Lorong_BlokB_2Meter.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-09-25T16:30:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Foto tata letak baru blok B dengan jarak lorong >= 2 meter bebas hambatan',
        fileSize: '1.9 MB'
      },
      {
        id: 'att-k304-2',
        name: 'Berita_Acara_Inspeksi_BundWall.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-09-25T17:00:00.000Z',
        uploadedBy: 'Rian Kurniawan',
        caption: 'Berita acara pembersihan dan kalibrasi volume tanggul penampung 110%',
        fileSize: '1.3 MB'
      }
    ],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-10-02',
    status: 'RESOLVED',
    createdAt: '2026-09-23T11:00:00.000Z',
    inProgressAt: '2026-09-23T14:00:00.000Z',
    resolvedAt: '2026-09-25T17:00:00.000Z',
    resolutionNotes: 'Penataan ulang denah blok gudang Karawang telah selesai dengan jarak lorong 2.2 meter dan bund-wall bersih.'
  },
  {
    id: 'capa-das-k3-06',
    checklistItemId: 'k3-06',
    findingCode: 'K3-06',
    findingTitle: 'Pencegahan Kebakaran Unit Daur Ulang Oli Bekas (Re-refining / Distilasi Vacuum) & Pengawasan LEL Gas Detector',
    category: 'Operasional Re-refining Oli Bekas & LEL Detector',
    severity: 'MAJOR',
    rootCause: 'Sertifikat kalibrasi sensor gas Lower Explosive Limit (LEL) di area reaktor distilasi oli Plant Sukabumi telah melewati jadwal kalibrasi 6 bulanan.',
    rootCause5Why: [
      'Mengapa 1: Sensor gas detector LEL belum dikalibrasi oleh laboratorium uji terakreditasi KAN.',
      'Mengapa 2: Jadwal kalibrasi terlewat karena pergantian teknisi instrumen pabrik.',
      'Mengapa 3: Tidak ada sistem pengingat otomatis untuk jadwal kalibrasi instrumen K3.',
      'Mengapa 4: Logbook kalibrasi instrumen masih dikelola secara parsial oleh divisi engineering.',
      'Mengapa 5: Prosedur pemeliharaan preventif belum mencakup integrasi kalibrasi sensor keselamatan.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit instrumen keselamatan Plant Sukabumi Q2 2026',
        answer: 'Label kalibrasi pada 4 sensor LEL menunjukkan masa berlaku berakhir Mei 2026.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Pelaksanaan kalibrasi langsung oleh PT. Sucofindo',
        answer: 'Seluruh 4 unit sensor LEL telah dikalibrasi dengan gas standar metana dan dinyatakan akurat.',
        by: 'Suryadi (Supervisor K3 Sukabumi)'
      },
      2: {
        basedOn: 'Pemasangan stiker label kalibrasi baru dengan barcode KAN',
        answer: 'Label masa berlaku terpasang valid hingga Desember 2026.',
        by: 'Suryadi (Supervisor K3 Sukabumi)'
      },
      3: {
        basedOn: 'Integrasi modul pemeliharaan sensor ke aplikasi Computerized Maintenance Management (CMMS)',
        answer: 'Notifikasi H-30 otomatis aktif untuk seluruh sensor deteksi gas.',
        by: 'Suryadi (Supervisor K3 Sukabumi)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan oleh Lead Auditor',
        answer: 'Sertifikat kalibrasi KAN dan fungsi sensor telah diverifikasi normal.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Lakukan kalibrasi on-site seluruh sensor LEL oleh lembaga uji terakreditasi KAN dan pasang stiker masa berlaku terbaru.',
    preventiveAction: 'Daftarkan seluruh instrumen sensor keselamatan ke dalam sistem CMMS dengan jadwal pengingat otomatis H-30 sebelum masa kalibrasi berakhir.',
    requiredEvidence: 'Sertifikat kalibrasi resmi dari laboratorium KAN dan foto sensor dengan stiker kalibrasi baru',
    requiredEvidenceList: [
      { id: 'ev-k306-1', name: 'Sertifikat Kalibrasi Sensor LEL dari Laboratorium KAN', format: 'PDF' },
      { id: 'ev-k306-2', name: 'Foto Stiker Kalibrasi Terpasang pada Sensor Ruang Distilasi', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-k306-1',
        name: 'Sertifikat_Kalibrasi_LEL_Sucofindo.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-06-20T11:00:00.000Z',
        uploadedBy: 'Suryadi',
        caption: 'Sertifikat kalibrasi sensor gas LEL resmi dari PT Sucofindo terakreditasi KAN',
        fileSize: '1.8 MB'
      },
      {
        id: 'att-k306-2',
        name: 'Foto_Sensor_LEL_Distilasi_Sukabumi.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-06-20T11:30:00.000Z',
        uploadedBy: 'Suryadi',
        caption: 'Foto sensor gas LEL terkalibrasi dengan stiker masa berlaku aktif di ruang reaktor oli',
        fileSize: '1.5 MB'
      }
    ],
    pic: 'Suryadi (Supervisor K3 Plant Sukabumi)',
    dueDate: '2026-06-30',
    status: 'VERIFIED',
    createdAt: '2026-06-05T09:00:00.000Z',
    inProgressAt: '2026-06-08T10:00:00.000Z',
    resolvedAt: '2026-06-21T14:00:00.000Z',
    verifiedAt: '2026-06-26T09:30:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas. Seluruh 4 sensor gas LEL terkalibrasi akurat dengan sertifikat KAN resmi.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-k3-07',
    checklistItemId: 'k3-07',
    findingCode: 'K3-07',
    findingTitle: 'Manajemen Kelelahan Pengemudi (Fatigue Management), Batasan Jam Kerja Mengemudi & Telematika GPS 24 Jam',
    category: 'Fatigue Management & Jam Kerja Mengemudi',
    severity: 'MAJOR',
    rootCause: 'Driver tangki B3 mengejar target jadwal bongkar muat sehingga melebihi batas waktu mengemudi tanpa jeda istirahat 30 menit.',
    rootCause5Why: [
      'Mengapa 1: Driver tangki B3 melaju > 4 jam kontinu tanpa henti 30 menit.',
      'Mengapa 2: Jadwal ritase penjemputan limbah di plant penghasil sangat ketat.',
      'Mengapa 3: Belum ada buzzer alarm pembatas otomatis telematika di kabin truk.',
      'Mengapa 4: Dispatcher tidak memantau live geofencing waktu berkendara.',
      'Mengapa 5: Belum ada sanksi tegas bagi pengemudi yang melanggar batas istirahat.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Data telematika GPS armada B-9122-DAS',
        answer: 'Terpantau laju kendaraan 6 jam tanpa henti pada rute Cilegon-Surabaya.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      1: {
        basedOn: 'Konseling keselamatan berkendara terhadap driver bersangkutan',
        answer: 'Driver diberikan teguran tertulis pertama dan pemahaman aturan UU 22/2009.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      }
    },
    correctiveAction: 'Beri teguran tertulis kepada driver terkait dan lakukan konseling keselamatan berkendara bersama instruktur fleet safety.',
    preventiveAction: 'Pasang sistem notifikasi peringatan otomatis berbasis GPS telematika yang membunyikan buzzer di kabin truk jika kendaraan melaju > 4 jam kontinu tanpa henti 30 menit.',
    requiredEvidence: 'Log telematika GPS terpasang sensor fatigue, notulen konseling driver',
    requiredEvidenceList: [
      { id: 'ev-k307-1', name: 'Log telematika GPS terpasang sensor fatigue', format: 'PDF' },
      { id: 'ev-k307-2', name: 'Notulen konseling driver armada B3', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-10-10',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T11:00:00.000Z',
    inProgressAt: '2026-09-25T08:30:00.000Z'
  },

  // =========================================================================
  // 4. SIKLUS KOMPENSASI, UANG JALAN & KESEJAHTERAAN (CMP)
  // =========================================================================
  {
    id: 'capa-das-cmp-01',
    checklistItemId: 'cmp-01',
    findingCode: 'CMP-01',
    findingTitle: 'Struktur Skala Upah Pokok Sesuai UMK Sektor & Perhitungan Upah Lembur Akurat Sesuai PP 35/2021',
    category: 'Upah Minimum & Perhitungan Upah Lembur',
    severity: 'MAJOR',
    rootCause: 'Formula perhitungan lembur hari libur resmi pada sistem payroll lama masih mengacu pada Kepmenakertrans 102/2004 dan belum dimutakhirkan ke PP No. 35 Tahun 2021.',
    rootCause5Why: [
      'Mengapa 1: Terdapat selisih perhitungan lembur 2 operator pada hari libur nasional.',
      'Mengapa 2: Rumus formula spreadsheet penggajian belum diperbarui ke aturan turunan UU Cipta Kerja.',
      'Mengapa 3: Sosialisasi PP 35/2021 dari Disnaker belum diadaptasi ke modul HRIS.',
      'Mengapa 4: Tim HRD belum melakukan audit berkala terhadap rumus formula payroll.',
      'Mengapa 5: Tidak ada konsultasi hukum ketenagakerjaan berkala sebelum tahun buku berganti.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit sampel slip gaji lembur libur nasional periode Desember 2025',
        answer: 'Ditemukan selisih pengali lembur jam ke-8 pada 5 sampel karyawan.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Pembaruan formula modul Payroll HRIS sesuai PP 35/2021 Pasal 31',
        answer: 'Formula upah lembur resmi diperbarui dengan pengali bertingkat 2x, 3x, dan 4x upah per jam.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Pembayaran rapel selisih lembur kepada 14 karyawan terdampak',
        answer: 'Rapel kompensasi sebesar total Rp 4.250.000 telah ditransfer tuntas.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      3: {
        basedOn: 'Sosialisasi transparansi slip gaji lembur kepada seluruh pekerja plant',
        answer: 'Pekerja memahami rincian jam lembur dan pengali resmi pada aplikasi mobile employee.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan audit Q1 2026',
        answer: 'Formula payroll terbukti akurat dan sesuai regulasi ketenagakerjaan.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Bayarkan rapel selisih upah lembur kepada seluruh pekerja terdampak dan perbarui formula sistem penggajian digital.',
    preventiveAction: 'Lakukan audit berkala tahunan terhadap seluruh formula penggajian dan sesuaikan otomatis saat terbit aturan ketenagakerjaan baru.',
    requiredEvidence: 'Bukti transfer pembayaran rapel lembur dan dokumentasi konfigurasi modul payroll PP 35/2021',
    requiredEvidenceList: [
      { id: 'ev-cmp01-1', name: 'Bukti Rekap Transfer Pembayaran Rapel Lembur', format: 'PDF' },
      { id: 'ev-cmp01-2', name: 'Dokumen Konfigurasi Rumus Lembur HRIS Sesuai PP 35/2021', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-cmp01-1',
        name: 'Bukti_Transfer_Rapel_Lembur_Karyawan.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-01-15T11:00:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Bukti transfer bank pembayaran rapel selisih upah lembur 14 karyawan plant',
        fileSize: '1.2 MB'
      }
    ],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-01-25',
    status: 'VERIFIED',
    createdAt: '2025-12-20T08:00:00.000Z',
    inProgressAt: '2025-12-22T09:00:00.000Z',
    resolvedAt: '2026-01-16T15:00:00.000Z',
    verifiedAt: '2026-01-20T10:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas. Seluruh rapel lembur telah dibayarkan dan formula HRIS telah memenuhi PP 35/2021.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-cmp-02',
    checklistItemId: 'cmp-02',
    findingCode: 'CMP-02',
    findingTitle: 'Pemberian Tunjangan Bahaya Kimia (Hazard Pay) & Insentif Risiko Keselamatan Pengemudi B3',
    category: 'Tunjangan Bahaya & Insentif Kinerja K3',
    severity: 'MINOR',
    rootCause: 'Format template slip gaji pada sistem HRIS lama menggabungkan tunjangan bahaya kimia ke dalam kolom tunjangan operasional umum.',
    rootCause5Why: [
      'Mengapa 1: Slip gaji operator pengolah sludge Sukabumi belum mencantumkan rincian nominal hazard pay secara transparan.',
      'Mengapa 2: Template slip gaji sistem HRIS lama masih menggunakan format tunggal non-diferensiasi.',
      'Mengapa 3: Modul penggajian belum dipisahkan antara divisi kantor pusat dan zona bahaya kimia.',
      'Mengapa 4: Pembaruan template payroll tertunda oleh proses audit tahunan.',
      'Mengapa 5: Sosialisasi komponen upah PP 36/2021 belum mencakup penjelasan rinci slip digital.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan 10 sampel slip gaji karyawan lapangan Plant Sukabumi',
        answer: 'Komponen hazard pay Rp 900.000 tercampur dengan tunjangan kehadiran tanpa label terpisah.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      1: {
        basedOn: 'Desain template slip gaji digital baru',
        answer: 'Baris "Tunjangan Bahaya Kimia (Hazard Pay)" dan "Insentif No-Accident" telah dibuat terpisah.',
        by: 'Dewi Anggraini (HR Specialist)'
      }
    },
    correctiveAction: 'Terbitkan surat penjelasan rincian tunjangan hazard pay kepada seluruh operator Sukabumi dan kirimkan slip revisi.',
    preventiveAction: 'Kustomisasi modul payslip HRIS dengan itemisasi baris khusus "Tunjangan Bahaya Kimia (Hazard Pay)" dan "Insentif No-Accident".',
    requiredEvidence: 'Template slip gaji baru ter-itemisasi, bukti sosialisasi rincian komponen upah kepada serikat/pekerja',
    requiredEvidenceList: [
      { id: 'ev-cmp02-1', name: 'Template slip gaji baru ter-itemisasi', format: 'PDF' },
      { id: 'ev-cmp02-2', name: 'Bukti sosialisasi komponen upah kepada pekerja', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-08',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T14:00:00.000Z',
    inProgressAt: '2026-09-25T09:00:00.000Z'
  },
  {
    id: 'capa-das-cmp-04',
    checklistItemId: 'cmp-04',
    findingCode: 'CMP-04',
    findingTitle: 'Pemberian Nutrisi Tambahan Ekstra Fooding & Suplemen Detoksifikasi (Susu Steril & Antioksidan)',
    category: 'Nutrisi Ekstra Fooding & Suplemen Detoksifikasi',
    severity: 'MAJOR',
    rootCause: 'Distribusi susu steril harian bagi operator reaktor oli bekas Sukabumi sempat terhenti 4 hari karena keterlambatan pengiriman dari distributor lokal.',
    rootCause5Why: [
      'Mengapa 1: Operator reaktor oli Sukabumi tidak menerima jatah susu steril selama 4 hari kerja.',
      'Mengapa 2: Stok gudang kantin kosong dan vendor distributor lokal mengalami kendala armada pasokan.',
      'Mengapa 3: Tidak ada stok penyangga (buffer stock) susu steril di gudang pantry plant.',
      'Mengapa 4: Kontrak pengadaan nutrisi ekstra fooding hanya mengandalkan satu distributor tunggal.',
      'Mengapa 5: Belum ada klausul penalti SLA pengiriman pada perjanjian kerjasama vendor katering.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Laporan logbook distribusi nutrisi kantin Plant Sukabumi',
        answer: 'Terjadi kekosongan pasokan pada tanggal 12 s/d 15 September 2026.',
        by: 'Suryadi (Supervisor K3 Sukabumi)'
      },
      1: {
        basedOn: 'Penambahan vendor cadangan pengadaan susu steril',
        answer: 'MoU pengadaan cadangan disepakati dengan minimarket jaringan nasional terdekat.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Penyediaan ruang penyimpanan berpendingin (chiller) khusus pantry',
        answer: 'Buffer stock untuk konsumsi 14 hari kerja telah tersimpan rapi.',
        by: 'Suryadi (Supervisor K3 Sukabumi)'
      },
      3: {
        basedOn: 'Distribusi ganti rugi nutrisi ekstra bagi operator terdampak',
        answer: 'Seluruh operator menerima kompensasi nutrisi ganda pada pekan berikutnya.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      4: {
        basedOn: 'Verifikasi checklist harian kepatuhan distribusi nutrisi',
        answer: 'Log distribusi harian ditandatangani oleh masing-masing operator penerima 100%.',
        by: 'Rian Kurniawan (HSE Officer)'
      }
    },
    correctiveAction: 'Sediakan stok penyangga susu steril di pantry plant untuk 14 hari ke depan dan distribusikan jatah pengganti bagi operator.',
    preventiveAction: 'Tunjuk distributor cadangan (second vendor) dan tambahkan klausul garansi pengiriman maksimal 24 jam dalam kontrak penyediaan nutrisi.',
    requiredEvidence: 'Foto lemari pendingin buffer stock susu steril dan logbook tanda terima nutrisi harian',
    requiredEvidenceList: [
      { id: 'ev-cmp04-1', name: 'Foto Lemari Pendingin Buffer Stock Susu Steril', format: 'Gambar' },
      { id: 'ev-cmp04-2', name: 'Logbook Tanda Terima Distribusi Susu Harian Pekerja', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-cmp04-1',
        name: 'Foto_Buffer_Stock_Susu_Pantry.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-09-24T16:00:00.000Z',
        uploadedBy: 'Suryadi',
        caption: 'Foto ketersediaan stok susu steril di chiller pantry Plant Sukabumi untuk 14 hari kerja',
        fileSize: '1.4 MB'
      },
      {
        id: 'att-cmp04-2',
        name: 'Logbook_Tanda_Terima_Nutrisi_Harian.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-09-24T16:30:00.000Z',
        uploadedBy: 'Suryadi',
        caption: 'Logbook tanda tangan penerimaan harian susu steril oleh seluruh operator',
        fileSize: '890 KB'
      }
    ],
    pic: 'Suryadi (Supervisor K3 Plant Sukabumi)',
    dueDate: '2026-09-30',
    status: 'RESOLVED',
    createdAt: '2026-09-20T08:00:00.000Z',
    inProgressAt: '2026-09-21T09:00:00.000Z',
    resolvedAt: '2026-09-24T17:00:00.000Z',
    resolutionNotes: 'Stok susu steril telah dipulihkan dengan ketersediaan buffer stock 14 hari di chiller pantry.'
  },
  {
    id: 'capa-das-cmp-05',
    checklistItemId: 'cmp-05',
    findingCode: 'CMP-05',
    findingTitle: 'Penyediaan Unit Emergency Eyewash & Safety Shower Dekontaminasi Bertekanan Serta Ruang Loker Terpisah',
    category: 'Fasilitas Sanitasi & Emergency Eyewash / Shower',
    severity: 'CRITICAL',
    rootCause: 'Kerak endapan lumpur dan kavitasi pada booster pump darurat unit safety shower area distilasi oli Sukabumi menyebabkan penurunan debit semprotan air saat tuas darurat ditarik.',
    rootCause5Why: [
      'Mengapa 1: Tekanan debit semprotan safety shower reaktor Sukabumi turun drastis di bawah 1.5 bar.',
      'Mengapa 2: Filter inlet pipa booster pump tersumbat kerak sedimen air sumur dalam.',
      'Mengapa 3: Jadwal flushing mingguan pipa shower sempat terlewat 2 minggu berturut-turut.',
      'Mengapa 4: Sensor pressure switch otomatis pada jalur pipa darurat tidak mengirim alert ke pos HSE.',
      'Mengapa 5: Prosedur pemeliharaan fasilitas dekontaminasi darurat belum memiliki jadwal overhaul pompa terpisah.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Uji tarik tuas mendadak stasiun Emergency Shower Sukabumi',
        answer: 'Debit terukur hanya 0.8 L/menit, tidak memenuhi standar minimal 1.5 L/menit.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Ganti filter cartridge booster pump, bersihkan kerak nozzle shower seketika, dan lakukan uji debit air stabil minimal 1.5 L/menit pada tekanan 2.5 bar.',
    preventiveAction: 'Pasang sistem sirkulasi air tertutup (closed-loop filtered system) khusus safety shower dan wajibkan checklist uji semprot harian sebelum shift pagi.',
    requiredEvidence: 'Laporan perbaikan pompa booster, foto uji semprot shower dengan debit air stabil 2.5 bar, log checklist harian',
    requiredEvidenceList: [
      { id: 'ev-cmp05-1', name: 'Laporan Perbaikan Pompa Booster Shower', format: 'PDF' },
      { id: 'ev-cmp05-2', name: 'Foto Pengujian Debit Air Stabil 2.5 Bar', format: 'Gambar' }
    ],
    attachments: [],
    pic: 'Suryadi (Supervisor K3 Plant Sukabumi)',
    dueDate: '2026-09-30',
    status: 'OPEN',
    createdAt: '2026-09-25T08:30:00.000Z'
  },

  // =========================================================================
  // 5. SIKLUS HUBUNGAN INDUSTRIAL, DISIPLIN & KEPATUHAN LINGKUNGAN (REL)
  // =========================================================================
  {
    id: 'capa-das-rel-02',
    checklistItemId: 'rel-02',
    findingCode: 'REL-02',
    findingTitle: 'Penegakan Sanksi Zero-Tolerance Terhadap Pembuangan Limbah Ilegal (Illegal Dumping) & Manipulasi Festronik',
    category: 'Zero-Tolerance Illegal Dumping & Manipulasi Manifes',
    severity: 'CRITICAL',
    rootCause: 'Terjadi indikasi penyimpangan rute singgah armada transporter B3 tanpa persetujuan dispatcher logistik dan tanpa pencatatan alasan operasional di manifes Festronik.',
    rootCause5Why: [
      'Mengapa 1: Satu unit armada tangki B3 berhenti selama 2 jam di luar titik rute resmi Tol Trans Jawa.',
      'Mengapa 2: Pengemudi singgah di bengkel rekanan non-rekomendasi untuk perbaikan ban.',
      'Mengapa 3: Pengemudi tidak melapor ke call center monitoring GPS 24 jam.',
      'Mengapa 4: Geofencing alert di sistem telematika sempat diabaikan oleh petugas piket.',
      'Mengapa 5: Prosedur deviasi rute darurat belum mewajibkan konfirmasi video call ke Fleet Manager.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit geofencing telematika GPS armada B-9310-DAS rute Cikarang-Sukabumi',
        answer: 'Terdeteksi deviasi rute sejauh 8 km dari koridor perjalanan resmi.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      1: {
        basedOn: 'Investigasi tim K3 & Logistik ke lokasi armada',
        answer: 'Tidak ditemukan indikasi tumpahan atau pembuangan limbah, murni perbaikan darurat ban bocor.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      }
    },
    correctiveAction: 'Berikan Surat Peringatan Keras (SP-2) kepada pengemudi dan petugas piket dispatcher yang lalai, serta pasang kunci segel digital (e-Seal) pada kran tangki.',
    preventiveAction: 'Terapkan integrasi otomatis: deviasi rute GPS > 500 meter tanpa izin seketika memicu alarm darurat di ruang kontrol dan mengunci sistem Festronik secara otomatis.',
    requiredEvidence: 'Berita acara investigasi rute GPS, surat peringatan disipliner, dan bukti aktivasi alarm geofencing',
    requiredEvidenceList: [
      { id: 'ev-rel02-1', name: 'Berita Acara Investigasi Deviasi Rute Armada B3', format: 'PDF' },
      { id: 'ev-rel02-2', name: 'Surat Peringatan Disipliner dan Bukti e-Seal Aktif', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-10-05',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T15:00:00.000Z',
    inProgressAt: '2026-09-25T08:00:00.000Z'
  },
  {
    id: 'capa-das-rel-03',
    checklistItemId: 'rel-03',
    findingCode: 'REL-03',
    findingTitle: 'Kelembagaan Komite Panitia Pembina K3 (P2K3) & Pelaporan Kinerja K3 Triwulan ke Disnaker',
    category: 'Kelembagaan P2K3 & Laporan Triwulan',
    severity: 'MAJOR',
    rootCause: 'Surat Keputusan (SK) Pengesahan Struktur P2K3 Plant Karawang Barat terlambat diperbarui ke Disnaker Kabupaten Karawang pasca restrukturisasi organisasi manajemen.',
    rootCause5Why: [
      'Mengapa 1: Struktur pengurus P2K3 yang tercatat di Disnaker Karawang masih mencantumkan nama Sekretaris P2K3 lama.',
      'Mengapa 2: Sekretaris P2K3 lama telah mutasi promosi ke kantor pusat sejak November 2025.',
      'Mengapa 3: Pengajuan susunan baru tertunda oleh kelengkapan SKP Ahli K3 Umum pejabat pengganti.',
      'Mengapa 4: Belum ada SLA waktu maksimal 30 hari untuk registrasi perubahan susunan P2K3.',
      'Mengapa 5: Divisi legal dan HRD belum melakukan sinkronisasi berkas perizinan berkala.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan berkas legalitas P2K3 pada audit Q1 2026',
        answer: 'Ditemukan ketidaksesuaian nama Sekretaris P2K3 pada SK Disnaker.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Penerbitan SK Kepengurusan P2K3 Baru oleh Direksi DAS Group',
        answer: 'Rian Kurniawan, S.T resmi ditunjuk sebagai Sekretaris P2K3 Plant Karawang.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Pengesahan resmi dari Disnaker Kabupaten Karawang',
        answer: 'SK No. 566/P2K3-DAS/III/2026 telah terbit dan disahkan.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      3: {
        basedOn: 'Penyampaian Laporan Triwulan I P2K3 ke Disnaker dan Pengawas Ketenagakerjaan',
        answer: 'Tanda terima pelaporan tertanggal 15 Maret 2026 telah diarsipkan.',
        by: 'Rian Kurniawan (HSE Officer)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan oleh Lead Auditor',
        answer: 'Struktur kepengurusan dan laporan triwulan telah sesuai regulasi Permenaker 04/1987.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Ajukan pembaharuan susunan pengurus P2K3 ke Disnaker Karawang dan sampaikan Laporan Kinerja K3 Triwulan lengkap.',
    preventiveAction: 'Buat kalender pelaporan wajib P2K3 triwulanan dan tetapkan SLA maksimal 14 hari untuk pendaftaran perubahan pejabat P2K3 ke Disnaker.',
    requiredEvidence: 'SK Pengesahan P2K3 baru dari Disnaker Karawang dan bukti tanda terima laporan triwulanan',
    requiredEvidenceList: [
      { id: 'ev-rel03-1', name: 'SK Pengesahan Struktur P2K3 Baru dari Disnaker Karawang', format: 'PDF' },
      { id: 'ev-rel03-2', name: 'Tanda Terima Laporan Triwulan P2K3 di Disnaker', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-rel03-1',
        name: 'SK_Pengesahan_P2K3_Disnaker_Karawang.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-03-20T10:00:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Surat Keputusan Pengesahan P2K3 resmi dari Dinas Tenaga Kerja Kabupaten Karawang',
        fileSize: '1.5 MB'
      }
    ],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-03-30',
    status: 'VERIFIED',
    createdAt: '2026-02-15T08:00:00.000Z',
    inProgressAt: '2026-02-18T09:00:00.000Z',
    resolvedAt: '2026-03-22T14:00:00.000Z',
    verifiedAt: '2026-03-25T11:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas. SK P2K3 baru telah disahkan oleh Disnaker Karawang.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-rel-06',
    checklistItemId: 'rel-06',
    findingCode: 'REL-06',
    findingTitle: 'Pelaksanaan Annual MCU Wajib (Rontgen, Spirometri, EKG) & Evaluasi Tren Toksikologi Biomonitoring',
    category: 'Pemeriksaan Kesehatan Berkala Tahunan',
    severity: 'MAJOR',
    rootCause: 'Koordinasi vendor laboratorium hiperkes eksternal mengalami kendala penjadwalan alat spirometri portabel ke Plant Sukabumi.',
    rootCause5Why: [
      'Mengapa 1: Jadwal pengambilan sampel darah dan urine untuk kadar timbal (Pb) 5 operator furnace tertunda 2 minggu.',
      'Mengapa 2: Alat uji spirometri dan tim analis laboratorium rekanan sedang dalam masa kalibrasi berkala.',
      'Mengapa 3: Tidak ada vendor laboratorium cadangan (second vendor) yang terikat kontrak PKS.',
      'Mengapa 4: Penjadwalan MCU semesteran baru diajukan 1 minggu sebelum jatuh tempo.',
      'Mengapa 5: Prosedur pengadaan layanan kesehatan kerja belum menetapkan vendor contingency plan.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan timeline jadwal MCU berkala semester II 2026',
        answer: 'Sampling 5 operator furnace Sukabumi tertunda 14 hari kerja.',
        by: 'Dewi Anggraini (HR Specialist)'
      }
    },
    correctiveAction: 'Terbitkan PO percepatan ke RS Paru / Lab Hiperkes rekanan kedua untuk melaksanakan pengambilan sampel darah dan urine 5 operator Sukabumi minggu ini.',
    preventiveAction: 'Buat Perjanjian Kerja Sama (PKS) dengan 2 laboratorium uji hiperkes terakreditasi dan tetapkan timeline booking jadwal H-30 sebelum jatuh tempo semesteran.',
    requiredEvidence: 'Jadwal konfirmasi MCU susulan dari Lab Hiperkes, Berita acara pengambilan sampel darah biomonitoring Pb/Cd',
    requiredEvidenceList: [
      { id: 'ev-rel06-1', name: 'Surat konfirmasi pelaksanaan MCU susulan dari Lab Hiperkes', format: 'PDF' },
      { id: 'ev-rel06-2', name: 'Berita acara pengambilan sampel darah biomonitoring Pb/Cd', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-07',
    status: 'OPEN',
    createdAt: '2026-09-25T08:00:00.000Z'
  },

  // =========================================================================
  // 6. SIKLUS TERMINASI, EXIT MCU & PURNA TUGAS (TRM)
  // =========================================================================
  {
    id: 'capa-das-trm-01',
    checklistItemId: 'trm-01',
    findingCode: 'TRM-01',
    findingTitle: 'Pemeriksaan Kesehatan Akhir Kerja (Exit MCU) Wajib Sebelum Tanggal Efektif Berakhirnya Hubungan Kerja',
    category: 'Exit Medical Check-Up Wajib',
    severity: 'CRITICAL',
    rootCause: 'Form exit clearance karyawan masih berbentuk lembaran kertas manual dan belum terkunci digital dengan approval dokter hiperkes.',
    rootCause5Why: [
      'Mengapa 1: 2 mantan operator pengolahan limbah Karawang Barat keluar tanpa Exit MCU terverifikasi dokter hiperkes.',
      'Mengapa 2: HR melepaskan clearance pesangon tanpa melihat bukti hasil pemeriksaan klinik kerja.',
      'Mengapa 3: Form clearance masih berbentuk kertas manual dan mudah terlewati.',
      'Mengapa 4: Tidak ada sistem digital kunci pembayaran gaji akhir sebelum MCU selesai.',
      'Mengapa 5: Manajemen menganggap Exit MCU hanya opsional jika karyawan terlihat sehat saat mengajukan resign.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan 5 berkas exit clearance karyawan bulan Agustus 2026',
        answer: 'Kolom hasil Exit MCU 2 operator masih kosong namun pesangon telah ditransfer.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Panggil segera 2 mantan operator tersebut untuk menjalani Exit MCU susulan di Lab Prodia/Pramita dengan biaya 100% ditanggung PT. Dame Alam Sejahtera.',
    preventiveAction: 'Kunci otomatis proses payroll kompensasi di sistem HRIS sebelum ada hasil unggahan sertifikat Exit MCU dari dokter hiperkes berwenang.',
    requiredEvidence: 'Surat panggilan Exit MCU susulan, kuitansi lab, dokumen revisi alur SOP Exit Clearance DAS Group',
    requiredEvidenceList: [
      { id: 'ev-trm01-1', name: 'Surat panggilan Exit MCU susulan', format: 'PDF' },
      { id: 'ev-trm01-2', name: 'Kuitansi pembayaran pemeriksaan lab klinik', format: 'Gambar' },
      { id: 'ev-trm01-3', name: 'Dokumen revisi alur SOP Exit Clearance DAS Group', format: 'PDF' }
    ],
    attachments: [],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-10-05',
    status: 'OPEN',
    createdAt: '2026-09-24T09:15:00.000Z'
  },
  {
    id: 'capa-das-trm-02',
    checklistItemId: 'trm-02',
    findingCode: 'TRM-02',
    findingTitle: 'Perhitungan Kompensasi Pengakhiran PKWT Sesuai PP 35/2021 & Bukti Serah Terima Pesangon',
    category: 'Kompensasi Pengakhiran PKWT & Pesangon',
    severity: 'MAJOR',
    rootCause: 'Karyawan kontrak yang berakhir masa kerjanya belum menerima lembar simulasi rincian formula uang kompensasi PKWT secara tertulis sebelum hari kerja terakhir.',
    rootCause5Why: [
      'Mengapa 1: Dua mantan teknisi kontrak Sukabumi mempertanyakan rincian nominal uang kompensasi masa kerja.',
      'Mengapa 2: Slip kompensasi baru diserahkan bersamaan dengan transfer bank tanpa sesi penjelasan rinci.',
      'Mengapa 3: Format slip pesangon belum menampilkan rumus pembagian (Masa Kerja / 12 x 1 Bulan Upah).',
      'Mengapa 4: HR plant belum mengadakan sesi Exit Interview formal sebelum hari terakhir.',
      'Mengapa 5: Prosedur terminasi belum mewajibkan penandatanganan lembar kesepakatan rincian hak kompensasi.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan berkas pengakhiran PKWT batch Juli 2026',
        answer: 'Ditemukan bukti transfer bank ada namun tidak disertai tanda terima rincian perhitungan.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Penerbitan template Rincian Uang Kompensasi PKWT PP 35/2021',
        answer: 'Format baru memuat masa kerja presisi per bulan dan dasar upah pokok.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Penyerahan formulir rincian dan penandatanganan bersama kedua mantan teknisi',
        answer: 'Kedua mantan karyawan telah menyepakati dan menandatangani tanda terima resmi.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      3: {
        basedOn: 'Integrasi modul otomatis kalkulator kompensasi PKWT di portal HRIS',
        answer: 'Karyawan dapat melihat simulasi hak kompensasi H-30 sebelum masa kontrak berakhir.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      4: {
        basedOn: 'Dokumentasi tanda terima bermaterai',
        answer: 'Seluruh berkas telah diarsipkan rapi dalam map personalia digital.',
        by: 'Dewi Anggraini (HR Specialist)'
      }
    },
    correctiveAction: 'Kirimkan lembar rincian perhitungan resmi uang kompensasi PKWT kepada mantan pekerja dan mintakan tanda terima persetujuan tertulis.',
    preventiveAction: 'Sediakan modul kalkulator kompensasi transparan di HRIS DAS Group dan wajibkan sesi Exit Interview H-7 sebelum tanggal pengakhiran hubungan kerja.',
    requiredEvidence: 'Lembar rincian perhitungan kompensasi bertandatangan pekerja dan bukti transfer bank lunas',
    requiredEvidenceList: [
      { id: 'ev-trm02-1', name: 'Lembar Rincian Kompensasi PKWT Sesuai PP 35/2021', format: 'PDF' },
      { id: 'ev-trm02-2', name: 'Bukti Transfer Bank Pembayaran Kompensasi PKWT', format: 'Gambar' }
    ],
    attachments: [
      {
        id: 'att-trm02-1',
        name: 'Lembar_Rincian_Kompensasi_PKWT_Signed.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-08-05T14:00:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Lembar rincian uang kompensasi masa kerja PKWT bermaterai bertandatangan kedua pihak',
        fileSize: '1.1 MB'
      },
      {
        id: 'att-trm02-2',
        name: 'Bukti_Transfer_Pesangon_Kompensasi.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-08-05T14:30:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Bukti transfer pembayaran uang kompensasi pesangon rekening payroll bank',
        fileSize: '820 KB'
      }
    ],
    pic: 'Dewi Anggraini (HR Corporate Specialist DAS Group)',
    dueDate: '2026-08-15',
    status: 'RESOLVED',
    createdAt: '2026-07-28T09:00:00.000Z',
    inProgressAt: '2026-07-29T10:00:00.000Z',
    resolvedAt: '2026-08-06T15:00:00.000Z',
    resolutionNotes: 'Rincian kompensasi PKWT telah ditandatangani dan disetujui tuntas oleh mantan pekerja sesuai PP 35/2021.'
  },
  {
    id: 'capa-das-trm-03',
    checklistItemId: 'trm-03',
    findingCode: 'TRM-03',
    findingTitle: 'Penarikan Surat Tugas Driver B3, ID Card, APD Khusus & Penonaktifan Akun Festronik KLHK < 24 Jam',
    category: 'Penonaktifan Hak Akses & Penarikan Identitas B3',
    severity: 'MAJOR',
    rootCause: 'Penonaktifan akun login Festronik KLHK mantan driver pengangkut B3 sempat terlambat 36 jam dari batas maksimal 24 jam purna tugas pada audit tahun 2025.',
    rootCause5Why: [
      'Mengapa 1: Akun Festronik mantan driver masih aktif selama 36 jam setelah pengunduran diri.',
      'Mengapa 2: Admin logistik belum menerima notifikasi resmi dari HR bahwa driver telah menandatangani exit form.',
      'Mengapa 3: Alur kerja penonaktifan akses sistem masih mengandalkan memo kertas antar-divisi.',
      'Mengapa 4: Tidak ada integrasi notifikasi otomatis antara sistem HRIS dan bagian operasional transporter.',
      'Mengapa 5: Prosedur offboarding belum menetapkan SLA penutupan akun digital secara ketat.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Audit kepatuhan akun sistem KLHK Festronik Q2 2026',
        answer: 'Ditemukan jeda waktu 36 jam pada satu akun mantan driver sebelum dinonaktifkan.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Penerapan modul Offboarding Webhook otomatis di HRIS DAS Group',
        answer: 'Begitu status karyawan di-resign-kan, notifikasi instan terkirim ke Admin Festronik KLHK.',
        by: 'Dewi Anggraini (HR Specialist)'
      },
      2: {
        basedOn: 'Uji simulasi penonaktifan akun purna tugas',
        answer: 'Waktu penonaktifan akun berhasil ditekan menjadi rata-rata 35 menit (< target 2 jam).',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      3: {
        basedOn: 'Pemeriksaan log serah terima ID Card, kartu izin B3, dan kunci kabin',
        answer: 'Seluruh aset fisik diserahkan pada hari H dan diverifikasi tanda tangan sekuriti.',
        by: 'Capt. Hendro P. (Fleet & Logistics Manager)'
      },
      4: {
        basedOn: 'Verifikasi penutupan temuan oleh Lead Auditor',
        answer: 'Sistem integrasi penonaktifan akun Festronik terbukti handal dan tuntas.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      }
    },
    correctiveAction: 'Nonaktifkan seketika akun Festronik dan lakukan penarikan fisik seluruh atribut pengemudi (kartu izin B3, ID Card, seragam berlogo).',
    preventiveAction: 'Hubungkan modul resign HRIS dengan bot integrasi API Festronik untuk penonaktifan akun otomatis dalam waktu < 60 menit setelah approval exit interview.',
    requiredEvidence: 'Screenshot penonaktifan akun user Festronik KLHK dan formulir serah terima atribut pengemudi',
    requiredEvidenceList: [
      { id: 'ev-trm03-1', name: 'Screenshot Log Penonaktifan Akun Festronik KLHK', format: 'Gambar' },
      { id: 'ev-trm03-2', name: 'Formulir Pengembalian Atribut & ID Card Driver B3', format: 'PDF' }
    ],
    attachments: [
      {
        id: 'att-trm03-1',
        name: 'Screenshot_Deaktivasi_Festronik_KLHK.jpg',
        dataUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop&q=80',
        type: 'PHOTO_INSPECTION',
        uploadedAt: '2026-05-10T10:00:00.000Z',
        uploadedBy: 'Capt. Hendro P.',
        caption: 'Screenshot bukti akun Festronik KLHK driver purna tugas telah berstatus Non-Aktif',
        fileSize: '920 KB'
      },
      {
        id: 'att-trm03-2',
        name: 'Form_Pengembalian_ID_Card_Driver.pdf',
        dataUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
        type: 'DOCUMENT',
        uploadedAt: '2026-05-10T10:30:00.000Z',
        uploadedBy: 'Dewi Anggraini',
        caption: 'Formulir tanda terima pengembalian kartu lisensi, ID Card, dan kunci kabin truk',
        fileSize: '1.0 MB'
      }
    ],
    pic: 'Capt. Hendro P. (Fleet & Logistics Manager DAS Group)',
    dueDate: '2026-05-15',
    status: 'VERIFIED',
    createdAt: '2026-05-02T08:00:00.000Z',
    inProgressAt: '2026-05-03T09:00:00.000Z',
    resolvedAt: '2026-05-11T14:00:00.000Z',
    verifiedAt: '2026-05-14T11:00:00.000Z',
    resolutionNotes: 'Temuan telah diverifikasi tuntas. Sistem penonaktifan akun Festronik berjalan otomatis < 1 jam.',
    verifiedBy: 'Alvareza H. Pratama, S.M (Lead Auditor)'
  },
  {
    id: 'capa-das-trm-06',
    checklistItemId: 'trm-06',
    findingCode: 'TRM-06',
    findingTitle: 'Pengarsipan Rekam Medis & Riwayat Pajanan Limbah B3 Karyawan Selama 30 Tahun',
    category: 'Penyimpanan Rekam Pajanan 30 Tahun',
    severity: 'MAJOR',
    rootCause: 'Penyimpanan berkas rekam medis dan data histori pajanan uap solvent 4 mantan operator Karawang Barat masih berupa salinan kertas di lemari arsip tanpa salinan cadangan digital terenkripsi.',
    rootCause5Why: [
      'Mengapa 1: Rekam medis 4 mantan operator belum terdigitalisasi ke dalam sistem arsip cloud terenkripsi.',
      'Mengapa 2: Scanner dokumen berkapasitas besar di unit K3 baru dialokasikan bulan ini.',
      'Mengapa 3: Petugas rekam medis K3 belum menyelesaikan proses tagging metadata pajanan kimia.',
      'Mengapa 4: Prosedur retensi arsip 30 tahun Permenaker 05/2018 belum dituangkan dalam petunjuk teknis digital.'
    ],
    rootCause5WhyDetails: {
      0: {
        basedOn: 'Pemeriksaan ruang arsip rekam medis HSE Karawang',
        answer: 'Sebagian berkas lama berisiko rusak karena kelembapan ruangan.',
        by: 'Alvareza H. Pratama, S.M (Lead Auditor)'
      },
      1: {
        basedOn: 'Proses scanning dan enkripsi berkas rekam medis ke server cloud AWS S3 terenkripsi AES-256',
        answer: '2 dari 4 berkas telah selesai discan dengan metadata pajanan lengkap.',
        by: 'Rian Kurniawan (HSE Officer)'
      }
    },
    correctiveAction: 'Lakukan scanning menyeluruh berkas rekam medis mantan pekerja dan simpan dalam repositori digital terenkripsi dengan masa retensi 30 tahun.',
    preventiveAction: 'Wajibkan seluruh rekam medis pemeriksaan kesehatan (Awal, Berkala, Khusus, Akhir) langsung diinput secara paperless dan dicadangkan mingguan ke secure cloud.',
    requiredEvidence: 'Laporan digitalisasi arsip rekam medis dan screenshot repositori cloud terenkripsi',
    requiredEvidenceList: [
      { id: 'ev-trm06-1', name: 'Laporan Digitalisasi Berkas Rekam Medis Retensi 30 Tahun', format: 'PDF' },
      { id: 'ev-trm06-2', name: 'Screenshot Folder Terenkripsi Cloud Medical Record', format: 'Gambar' }
    ],
    attachments: [],
    pic: 'Rian Kurniawan (HSE Officer Plant Karawang)',
    dueDate: '2026-10-15',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-24T16:00:00.000Z',
    inProgressAt: '2026-09-25T09:30:00.000Z'
  }
];
