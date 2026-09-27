import { DailyAuditLog } from '../types/audit';

export const INITIAL_DAILY_AUDIT_LOGS: DailyAuditLog[] = [
  {
    id: 'log-day-01',
    date: '2026-09-01',
    dayName: 'Senin (Minggu ke-1)',
    weekNumber: 1,
    shift: 'PAGI_OPERASIONAL',
    operationalUnit: 'TRANSPORTER',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'Rian Kurniawan (HSE Officer)',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 3,
    dailyNcIdentifiedCount: 0,
    dailySummary: 'Kick-off audit harian, TBM keselamatan driver rute Sumatera, dan skrining Fit-to-Work 12 pengemudi tangki B3.',
    keyEvidenceSummary: 'Lembar Tensi & Tes Alkohol Breathalyzer 100% 0.00 mg/L; logbook Pre-Trip Inspection armada B-9011-DAS s/d B-9022-DAS.',
    weatherCondition: 'Cerah Berawan',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-01-1',
        timeSlot: '07:00 - 08:00',
        taskTitle: 'Skrining Fit-to-Work Harian (Cek Tensi, Breathalyzer & Visus Driver)',
        category: 'FIT_TO_WORK',
        targetUnit: 'TRANSPORTER',
        pic: 'Paramedis K3 DAS',
        isCompleted: true,
        notes: '12 pengemudi dinyatakan Fit to Drive.'
      },
      {
        id: 'task-01-2',
        timeSlot: '08:30 - 10:30',
        taskTitle: 'Inspeksi Fisik Kelengkapan Spill Kit & APAR Truk Tangki B3',
        category: 'INSPECTION',
        targetUnit: 'TRANSPORTER',
        pic: 'Rian Kurniawan',
        isCompleted: true,
        notes: 'Absorbent pad, boom, dan APAR 6kg terpasang tersegel.'
      },
      {
        id: 'task-01-3',
        timeSlot: '11:00 - 12:00',
        taskTitle: 'Verifikasi Sinkronisasi Festronik KLHK & Surat Jalan Driver',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'TRANSPORTER',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: true,
        notes: 'Barcode QR Festronik aktif.'
      }
    ]
  },
  {
    id: 'log-day-02',
    date: '2026-09-02',
    dayName: 'Selasa (Minggu ke-1)',
    weekNumber: 1,
    shift: 'SIANG_INSPEKSI',
    operationalUnit: 'KARAWANG_PLANT',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'Bambang Sudibyo (Plant HSE)',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 4,
    dailyNcIdentifiedCount: 1,
    dailySummary: 'Inspeksi TPS Limbah B3 Karawang Barat, uji pilar hydrant paska-insiden, dan smoke fit-test operator decanting.',
    keyEvidenceSummary: 'Temuan Major NC: 2 operator memiliki rambut janggut tebal yang menyebabkan kebocoran seal masker respirator full-face.',
    weatherCondition: 'Panas Terik (33°C)',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-02-1',
        timeSlot: '08:00 - 10:00',
        taskTitle: 'Uji Tekanan Jaringan Pompa Hydrant Mandiri Gudang Karawang',
        category: 'TESTING',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Tim Damkar Plant',
        isCompleted: true,
        notes: 'Tekanan mencapai 7.5 bar pada pilar 1 dan 2 (Lulus).'
      },
      {
        id: 'task-02-2',
        timeSlot: '10:30 - 12:00',
        taskTitle: 'Smoke Fit-Test & Pemeriksaan Respirator Gas Kimia Full-Face',
        category: 'TESTING',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: true,
        findingIdentified: 'ONB-04 (Major NC): Kebocoran segel uap gas karena janggut tebal.',
        notes: 'Diterbitkan formulir CAPA perbaikan Clean-Shaven Policy.'
      },
      {
        id: 'task-02-3',
        timeSlot: '13:30 - 15:30',
        taskTitle: 'Walkthrough Segregasi Drum Flammable & Tanggul Tumpahan (Bund-Wall)',
        category: 'WALKTHROUGH',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Bambang Sudibyo',
        isCompleted: true,
        notes: 'Jarak blok drum solvent 2.2 meter, kapasitas tanggul 115% volume drum terbesar.'
      }
    ]
  },
  {
    id: 'log-day-03',
    date: '2026-09-03',
    dayName: 'Rabu (Minggu ke-1)',
    weekNumber: 1,
    shift: 'FULL_DAY',
    operationalUnit: 'SUKABUMI_PLANT',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'Ahmad Fauzi (Supervisor Plant)',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 4,
    dailyNcIdentifiedCount: 0,
    dailySummary: 'Inspeksi unit de-watering lumpur (filter press), cerobong pengering rotary dryer, dan penampungan oli bekas Sukabumi.',
    keyEvidenceSummary: 'Interlock emergency stop berfungsi dalam 0.6 detik; scrubber cerobong basah berfungsi menyerap partikulat debu.',
    weatherCondition: 'Hujan Ringan',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-03-1',
        timeSlot: '08:30 - 10:30',
        taskTitle: 'Uji Emergency Stop Interlock Mesin Filter Press & Centrifuge',
        category: 'TESTING',
        targetUnit: 'SUKABUMI_PLANT',
        pic: 'Ahmad Fauzi',
        isCompleted: true,
        notes: 'Sistem hidrolik mati seketika saat tombol darurat ditekan.'
      },
      {
        id: 'task-03-2',
        timeSlot: '11:00 - 12:30',
        taskTitle: 'Pemeriksaan Unit Eyewash & Safety Shower Bertekanan Plant Pemanfaat',
        category: 'INSPECTION',
        targetUnit: 'SUKABUMI_PLANT',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: true,
        notes: 'Aliran air bersih kontinu 78 liter/menit, tuas mudah dijangkau < 10 detik.'
      },
      {
        id: 'task-03-3',
        timeSlot: '14:00 - 16:00',
        taskTitle: 'Verifikasi Log Biomonitoring Logam Berat & Metabolit Urin Operator Sukabumi',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'SUKABUMI_PLANT',
        pic: 'Dokter Hiperkes PT DAS',
        isCompleted: true,
        notes: 'Hasil lab BBLKI menunjukkan kadar fenol dan timbal dalam batas normal.'
      }
    ]
  },
  {
    id: 'log-day-04',
    date: '2026-09-04',
    dayName: 'Kamis (Minggu ke-1)',
    weekNumber: 1,
    shift: 'MALAM_LOGISTIK',
    operationalUnit: 'TRANSPORTER',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'Capt. Hendro P. (Fleet Manager)',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 3,
    dailyNcIdentifiedCount: 1,
    dailySummary: 'Audit malam kontrol telematika GPS fleet armada Sabang-Merauke dan kepatuhan manajemen kelelahan (Fatigue).',
    keyEvidenceSummary: 'Temuan Minor NC: 1 unit truk tronton B-9122-DAS melaju 6 jam tanpa jeda istirahat 30 menit pada rute Pantura.',
    weatherCondition: 'Malam Cerah',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-04-1',
        timeSlot: '19:00 - 21:00',
        taskTitle: 'Audit Log GPS Telematika Kecepatan & Jam Berkendara Kontinu Driver',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'TRANSPORTER',
        pic: 'Capt. Hendro P.',
        isCompleted: true,
        findingIdentified: 'K3-07 (Minor NC): Truk B-9122-DAS mengemudi > 4 jam kontinu.',
        notes: 'Rekomendasi aktivasi buzzer alarm otomatis kabin truk.'
      },
      {
        id: 'task-04-2',
        timeSlot: '21:30 - 23:00',
        taskTitle: 'Inspeksi Rest Area & Fasilitas Istirahat Driver Pool Karawang',
        category: 'WALKTHROUGH',
        targetUnit: 'HEAD_OFFICE',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: true,
        notes: 'Kamar istirahat ber-AC, tempat tidur bersih, dispenser air mineral tersedia.'
      }
    ]
  },
  {
    id: 'log-day-05',
    date: '2026-09-05',
    dayName: 'Jumat (Minggu ke-1)',
    weekNumber: 1,
    shift: 'PAGI_OPERASIONAL',
    operationalUnit: 'INTEGRATED',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'HR Corporate & HSE Coordinator',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 3,
    dailyNcIdentifiedCount: 1,
    dailySummary: 'Audit berkas terminasi purna tugas HRD dan verifikasi kepatuhan Exit MCU serta arsip pajanan 30 tahun.',
    keyEvidenceSummary: 'Temuan Major NC: 2 mantan operator gudang Karawang yang berhenti pada Agustus 2026 belum dilakukan Exit MCU oleh HRD.',
    weatherCondition: 'Cerah',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-05-1',
        timeSlot: '08:30 - 11:00',
        taskTitle: 'Audit Berkas Exit Clearance & Pemeriksaan Kesehatan Akhir (Exit MCU)',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'HEAD_OFFICE',
        pic: 'HR Corporate',
        isCompleted: true,
        findingIdentified: 'TRM-01 (Major NC): 2 mantan pekerja belum Exit MCU.',
        notes: 'Diterbitkan CAPA pemanggilan eks-pekerja untuk MCU di klinik rekanan.'
      },
      {
        id: 'task-05-2',
        timeSlot: '13:30 - 15:30',
        taskTitle: 'Verifikasi Arsip Rekam Pajanan Bahan Kimia 30 Tahun di Server HRIS',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'HEAD_OFFICE',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: true,
        notes: 'File digital tersimpan terenkripsi dengan masa retensi 30 tahun.'
      }
    ]
  },
  {
    id: 'log-day-06',
    date: '2026-09-06',
    dayName: 'Sabtu (Minggu ke-1)',
    weekNumber: 1,
    shift: 'PAGI_OPERASIONAL',
    operationalUnit: 'KARAWANG_PLANT',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'Rian Kurniawan (HSE Officer)',
    status: 'COMPLETED',
    dailyVerifiedItemsCount: 2,
    dailyNcIdentifiedCount: 0,
    dailySummary: 'Simulasi tanggap darurat tumpahan kimia (Chemical Spill Kit Drill) di loading dock Karawang Barat.',
    keyEvidenceSummary: 'Waktu respon tanggap darurat 2 menit 45 detik (standar < 3 menit); seluruh ceceran terbendung tanpa masuk saluran drainase umum.',
    weatherCondition: 'Berawan',
    emergencyStatus: 'DRILL_ACTIVE',
    tasks: [
      {
        id: 'task-06-1',
        timeSlot: '09:00 - 11:00',
        taskTitle: 'Simulasi Tanggap Darurat Tumpahan Pelarut B3 di Area Decanting',
        category: 'TESTING',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Tim Emergency Response DAS',
        isCompleted: true,
        notes: 'Penggelaran absorbent sock dan penetralan limbah berlangsung sempurna.'
      }
    ]
  },
  {
    id: 'log-day-07',
    date: '2026-09-08',
    dayName: 'Senin (Minggu ke-2)',
    weekNumber: 2,
    shift: 'PAGI_OPERASIONAL',
    operationalUnit: 'INTEGRATED',
    leadAuditorPic: 'Alvareza H. Pratama, S.M',
    hseInspector: 'HSE Coordinator & Paramedis K3',
    status: 'IN_PROGRESS',
    dailyVerifiedItemsCount: 4,
    dailyNcIdentifiedCount: 0,
    dailySummary: 'Audit kepatuhan kompensasi ekstra nutrisi (susu steril murni harian) dan verifikasi bukti setor BPJS TK Kelompok V.',
    keyEvidenceSummary: 'Distribusi 168 kaleng susu murni harian tercatat lengkap di logbook gizi; bukti bayar BPJS TK Kelompok V (1.74%) lunas tanpa tunggakan.',
    weatherCondition: 'Cerah',
    emergencyStatus: 'NORMAL',
    tasks: [
      {
        id: 'task-07-1',
        timeSlot: '08:00 - 09:30',
        taskTitle: 'Inspeksi Gudang Penyimpanan & Distribusi Ekstra Nutrisi Susu Steril',
        category: 'INSPECTION',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Paramedis K3 DAS',
        isCompleted: true,
        notes: 'Susu steril tidak kedaluwarsa, suhu ruang simpan terjaga 24°C.'
      },
      {
        id: 'task-07-2',
        timeSlot: '10:00 - 12:00',
        taskTitle: 'Audit Slip Gaji UMK Karawang/Sukabumi & Formula Lembur PP 35/2021',
        category: 'DOCUMENT_REVIEW',
        targetUnit: 'HEAD_OFFICE',
        pic: 'HR Payroll Head',
        isCompleted: true,
        notes: 'Formula 1.5x jam pertama dan 2x jam berikutnya diterapkan akurat.'
      },
      {
        id: 'task-07-3',
        timeSlot: '13:30 - 15:30',
        taskTitle: 'Verifikasi Tindak Lanjut CAPA-DAS-01 (Cukur Rambut Wajah & Re-Fit Test)',
        category: 'CLOSURE_VERIFICATION',
        targetUnit: 'KARAWANG_PLANT',
        pic: 'Alvareza H. Pratama, S.M',
        isCompleted: false,
        notes: 'Operator telah mencukur rambut wajah; jadwal re-fit test siang ini.'
      }
    ]
  }
];
