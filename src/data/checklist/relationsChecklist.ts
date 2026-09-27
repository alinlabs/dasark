import { ChecklistItem } from '../../types/audit';

export const RELATIONS_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Sosialisasi & Penegakan Peraturan Perusahaan (PP)
  {
    id: 'rel-01',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Penegakan Peraturan Perusahaan & Disiplin Bertingkat',
    code: 'REL-01',
    category: 'Penegakan Peraturan Perusahaan & Prosedur SP',
    title: 'Penegakan Disiplin Kerja Melalui Prosedur Surat Peringatan (SP1, SP2, SP3) yang Akuntabel',
    description: 'Penerapan jenjang sanksi disipliner yang objektif dan terdokumentasi sesuai Peraturan Perusahaan yang terdaftar di Disnaker Karawang & Sukabumi: surat panggilan klarifikasi, hak pembelaan diri pekerja, dan penerbitan SP1-SP3 dengan masa berlaku 6 bulan.',
    legalBasis: 'UU No. 13/2003 Pasal 161 jo. PP No. 35/2021 Pasal 52',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 161)',
      governmentReg: 'PP No. 35 Tahun 2021 tentang PKWT, Waktu Kerja dan PHK (Pasal 52)',
      ministerialReg: 'Peraturan Perusahaan PT. Dame Alam Sejahtera (Bab Tata Tertib & Sanksi)'
    },
    legalSanction: 'Gugatan pembatalan sanksi di Pengadilan Hubungan Industrial (PHI) jika surat peringatan diterbitkan sepihak tanpa berita acara investigasi.',
    guidelines: 'Periksa arsip Berita Acara Pemeriksaan (BAP) pelanggaran disiplin dan surat peringatan di HRD Corporate.',
    auditSteps: [
      'Periksa apakah setiap penerbitan SP didahului dengan sesi klarifikasi / BAP resmi.',
      'Cek masa berlaku surat peringatan (maksimal 6 bulan sejak tanggal diterbitkan).',
      'Pastikan salinan SP diserahkan langsung dan ditandatangani oleh pekerja yang bersangkutan.',
      'Verifikasi kepatuhan jenjang sanksi bertingkat sesuai tingkat keparahan pelanggaran.'
    ],
    verificationCriteria: [
      'Penerbitan Surat Peringatan (SP1, SP2, SP3) didasarkan pada Berita Acara Pemeriksaan (BAP) klarifikasi resmi yang objektif.',
      'Pekerja diberikan hak untuk memberikan keterangan dan pembelaan diri sebelum sanksi disipliner dijatuhkan.',
      'Masa berlaku setiap Surat Peringatan dibatasi paling lama 6 (enam) bulan sesuai ketentuan perundang-undangan.',
      'Salinan fisik surat peringatan diserahkan langsung dan ditandatangani bukti terimanya oleh pekerja.',
      'Buku register sanksi disipliner terkelola rapi pada sistem HRIS dengan riwayat status pembinaan yang jelas.'
    ],
    riskLevel: 'MEDIUM',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Penerbitan sanksi disiplin terlaksana tertib; tidak ada sengketa ketenagakerjaan yang bergulir ke Disnaker.',
    evidenceText: 'Buku Register Surat Peringatan & Berita Acara Klarifikasi Disiplin HR-DAS-SP-2026.'
  },

  // SESI 2: Sanksi Disiplin Keras Zero Tolerance Pelanggaran Lingkungan
  {
    id: 'rel-02',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Sanksi Zero Tolerance Pelanggaran Lingkungan Hidup',
    code: 'REL-02',
    category: 'Penegakan SOP Limbah & Sanksi Berat',
    title: 'Sanksi Disiplin Keras (SP3 / PHK Langsung & Jalur Hukum) atas Pembuangan Limbah Ilegal / Manipulasi Manifes',
    description: 'Ketentuan tanpa kompromi (Zero Tolerance) bahwa setiap pengemudi atau staf operasional yang terbukti membuang limbah B3 di luar titik tujuan izin KLHK (Dumping Ilegal), mematikan GPS armada secara sengaja, memalsukan timbangan/manifes Festronik, atau mencuri oli bekas akan dikenakan PHK seketika dan diserahkan ke aparat penegak hukum.',
    legalBasis: 'UU No. 32 Tahun 2009 Pasal 104 jo. PP No. 35 Tahun 2021 Pasal 52',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 104 ancaman pidana 1-3 tahun & denda Rp 3 Milyar)',
      governmentReg: 'PP No. 35 Tahun 2021 tentang PHK Alasan Pelanggaran Berat (Pasal 52 ayat 2)',
      ministerialReg: 'Peraturan Perusahaan PT. Dame Alam Sejahtera (Pasal 38 Pelanggaran Kategori Fatal)'
    },
    legalSanction: 'Pidana penjara 3 tahun dan denda Rp 3.000.000.000 bagi oknum pelaku pembuangan limbah tanpa izin resmi.',
    guidelines: 'Klausul tertulis tercantum tegas di Peraturan Perusahaan dan formulir Pakta Integritas seluruh pengemudi.',
    auditSteps: [
      'Periksa apakah pasal pelanggaran berat lingkungan tercantum di buku Peraturan Perusahaan.',
      'Verifikasi mekanisme pelaporan cepat ke manajemen bila terdeteksi anomali rute pengangkutan di GPS.',
      'Cek sosialisasi sanksi hukum pidana lingkungan hidup pada saat briefing pengemudi.',
      'Pastikan ada koordinasi dengan tim legal perusahaan untuk penindakan kasus tindak pidana lingkungan.'
    ],
    verificationCriteria: [
      'Klausul Zero Tolerance terhadap pembuangan limbah ilegal (illegal dumping) tertuang tegas dalam Peraturan Perusahaan dan kontrak kerja.',
      'Larangan keras mematikan perangkat GPS telematika atau mengubah rute angkutan tanpa izin tertulis dari pengendali operasi.',
      'Sanksi Pemutusan Hubungan Kerja (PHK) seketika dan pelaporan pidana ke aparat penegak hukum (Gakkum KLHK/Polri) dipahami seluruh staf.',
      'Verifikasi manifes elektronik Festronik dilakukan secara real-time dengan cross-check timbangan digital plant.',
      'Tidak ada toleransi bagi tindakan pemalsuan dokumen manifes, pencurian oli bekas, atau pengalihan limbah ke pihak ilegal.'
    ],
    riskLevel: 'CRITICAL',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'ALL',
    notes: 'Terdeteksi anomali rute pada 1 unit armada truk pengangkut limbah padat B3 yang melenceng sejauh 15 km dari rute koridor resmi tanpa izin dan laporan dari driver.',
    evidenceText: 'Log Data Tracking GPS Armada No. Pol B-9831-DAS & Laporan Peringatan Anomali Rute.'
  },

  // SESI 3: Kelembagaan & Aktivitas Rutin Panitia Pembina K3 (P2K3)
  {
    id: 'rel-03',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Kelembagaan Panitia Pembina K3 (P2K3) & LKS Bipartit',
    code: 'REL-03',
    category: 'Kelembagaan P2K3 PT. Dame Alam Sejahtera',
    title: 'Aktivitas Panitia Pembina K3 (P2K3) Terdaftar Resmi di Disnaker Karawang & Sukabumi Serta Rapat Bulanan',
    description: 'Komite P2K3 DAS Group beranggotakan perwakilan manajemen dan pekerja aktif menggelar rapat bulanan membahas evaluasi keselamatan armada, audit kondisi gudang B3 pasca-kebakaran Karawang, tindak lanjut temuan inspeksi, serta pelaporan triwulan ke Pengawas Ketenagakerjaan Disnaker.',
    legalBasis: 'Permenaker No. Per.04/MEN/1987 tentang P2K3',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 10)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Elemen 1)',
      ministerialReg: 'Permenaker No. Per.04/MEN/1987 tentang Panitia Pembina Keselamatan dan Kesehatan Kerja'
    },
    legalSanction: 'Sanksi administratif dan penghentian sementara operasional jika P2K3 tidak dibentuk pada industri berisiko tinggi.',
    guidelines: 'Periksa SK Pengesahan P2K3 dari Disnaker Kab. Karawang dan Disnaker Kab. Sukabumi serta notulen rapat 3 bulan terakhir.',
    auditSteps: [
      'Cek SK Pengesahan P2K3 dari Disnaker setempat yang masih berlaku.',
      'Periksa daftar absensi dan notulen rapat bulanan komite P2K3.',
      'Verifikasi tanda terima penyerahan Laporan Triwulan P2K3 ke Kantor Pengawas Ketenagakerjaan.',
      'Pastikan tindak lanjut rekomendasi perbaikan P2K3 dievaluasi dalam rapat manajemen.'
    ],
    verificationCriteria: [
      'Surat Keputusan (SK) Pengesahan Komite P2K3 dari Dinas Tenaga Kerja setempat berstatus aktif dan berlaku.',
      'Struktur organisasi P2K3 memuat Sekretaris yang memegang sertifikat penunjukan Ahli K3 Umum aktif Kemnaker RI.',
      'Rapat koordinasi bulanan P2K3 terselenggara rutin dengan notulen pembahasan bahaya kerja dan daftar hadir lengkap.',
      'Laporan kegiatan triwulanan P2K3 diserahkan tepat waktu ke Kantor Pengawas Ketenagakerjaan Disnaker setempat.',
      'Rekomendasi perbaikan keselamatan dari komite P2K3 ditindaklanjuti oleh manajemen puncak dengan alokasi sumber daya nyata.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'SK P2K3 aktif; notulen rapat bulanan terakhir membahas simulasi penanggulangan kebakaran bersama Damkar Karawang.',
    evidenceText: 'SK Disnaker Kab. Karawang No. 566/SK-P2K3/2024 & Tanda Terima Laporan Triwulan II-2026.'
  },

  // SESI 4: Saluran Whistleblowing System (WBS) & Perlindungan Pelapor
  {
    id: 'rel-04',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Saluran Pengaduan WBS & Perlindungan Pelapor',
    code: 'REL-04',
    category: 'Whistleblowing System & Perlindungan Saksi',
    title: 'Saluran Pengaduan Pelanggaran K3/Lingkungan (WBS) Bebas Intimidasi & Perlindungan Identitas Pelapor',
    description: 'Penyediaan kanal pengaduan independen (Kotak Pengaduan Fisik, Hotline WhatsApp Khusus, Email Compliance) bagi karyawan untuk melaporkan kecurangan manifes limbah, pemaksaan jam kerja lembur tanpa istirahat, atau kondisi tidak aman dengan jaminan kerahasiaan identitas 100%.',
    legalBasis: 'UU No. 32 Tahun 2009 Pasal 66 & Pedoman Tata Kelola Integritas DAS Group',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 66: Perlindungan hukum pejuang hak lingkungan hidup)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 1.4)',
      ministerialReg: 'SOP Whistleblowing System PT. Dame Alam Sejahtera (SOP-WBS-001)'
    },
    legalSanction: 'Perusahaan dilarang memberikan sanksi balasan / mutasi merugikan bagi karyawan yang melaporkan pelanggaran lingkungan hidup.',
    guidelines: 'Uji aksesibilitas nomor hotline WBS dan periksa buku log tindak lanjut investigasi pengaduan.',
    auditSteps: [
      'Pastikan informasi kontak WBS terpasang di papan pengumuman seluruh plant dan pool armada.',
      'Cek buku register pengaduan WBS dan verifikasi status penanganannya oleh Tim Kepatuhan.',
      'Pastikan pelapor dilindungi dari ancaman sanksi atau diskriminasi kerja.',
      'Uji respons hotline pengaduan digital untuk memastikan saluran aktif.'
    ],
    verificationCriteria: [
      'Saluran pengaduan pelanggaran (Whistleblowing System / WBS) tersedia melalui multi-kanal (WhatsApp Hotline, Email Rahasia, Kotak Surat Fisik).',
      'Kerahasiaan identitas pelapor (whistleblower) dijamin 100% dan dilindungi dari segala bentuk intimidasi atau mutasi kerja yang merugikan.',
      'Setiap laporan pengaduan yang masuk ditanggapi dan dilakukan verifikasi awal oleh Komite Kepatuhan dalam waktu maksimal 7 hari kerja.',
      'Hasil tindak lanjut investigasi pengaduan dicatat dalam register rahasia yang dilaporkan langsung kepada Direksi.',
      'Poster sosialisasi kanal WBS terpasang pada area strategis yang mudah terlihat oleh seluruh pekerja di setiap lokasi plant.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Poster informasi hotline saluran pengaduan WBS di area kantin pekerja plant Sukabumi pudar dan nomor telepon kontak belum diperbarui dengan nomor hotline baru.',
    evidenceText: 'Foto Dokumentasi Papan Informasi Kantin Sukabumi & Lembar Observasi Kepatuhan.'
  },

  // SESI 5: Keterlibatan Masyarakat & Kemitraan Lingkungan Pasca-Insiden Karawang
  {
    id: 'rel-05',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Hubungan Warga Sekitar & Kemitraan Lingkungan',
    code: 'REL-05',
    category: 'Hubungan Masyarakat & Kemitraan Komunitas',
    title: 'Forum Komunikasi Warga Sekitar Fasilitas Karawang & Sukabumi Serta Pemantauan Udara Ambien Pemukiman',
    description: 'Kelanjutan komitmen hubungan sosial pasca-insiden kebakaran Oktober 2025 di Karawang Barat: pertemuan berkala dengan pengurus RT/RW dan tokoh masyarakat tetangga fasilitas, penyampaian hasil uji kualitas udara pemukiman, penyediaan sirene peringatan terkoordinasi, dan program CSR kemitraan lingkungan.',
    legalBasis: 'UU No. 32/2009 Pasal 54 & PP No. 22 Tahun 2021',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 54 & Pasal 87)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 340)',
      ministerialReg: 'Permen LHK No. 10 Tahun 2024 tentang Tanggap Darurat B3'
    },
    legalSanction: 'Gejolak sosial, pemblokiran akses fasilitas oleh warga, dan potensi gugatan perdata ganti rugi lingkungan.',
    guidelines: 'Periksa notulen forum pertemuan warga dan hasil lab pengujian udara ambien pemukiman radius 500 meter.',
    auditSteps: [
      'Periksa berita acara pertemuan rutin dengan perwakilan masyarakat Karawang Barat.',
      'Cek laporan pengujian kualitas udara ambien (SO2, NO2, CO, Debu Partikulat) di pemukiman sekitar plant.',
      'Verifikasi pelaksanaan program CSR kesehatan dan lingkungan untuk warga sekitar.',
      'Pastikan protokol sirine peringatan dini telah dikoordinasikan dengan pengurus RT/RW setempat.'
    ],
    verificationCriteria: [
      'Pertemuan forum komunikasi warga (Community Relations Forum) dilaksanakan secara periodik minimal 1 kali per semester.',
      'Hasil pengujian kualitas udara ambien pemukiman (SO2, NO2, CO, PM2.5, PM10) memenuhi baku mutu Lampiran VII PP No. 22/2021.',
      'Tersedia jalur komunikasi cepat (hotline darurat warga) antara aparat desa/RT/RW dengan koordinator CSR/HSE plant.',
      'Pelaksanaan program Tanggung Jawab Sosial dan Lingkungan (CSR) bidang kesehatan dan sanitasi lingkungan berjalan nyata.',
      'SOP sistem peringatan dini (Early Warning Siren) telah disosialisasikan tata caranya kepada warga tetangga batas pagar fasilitas.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'KARAWANG_PLANT',
    notes: 'Hasil pengujian kualitas udara ambien pemukiman radius 500m Karawang Barat periode Februari 2026 memenuhi baku mutu PP 22/2021.',
    evidenceText: 'Laporan Pengujian Udara Ambien Lab Envirolab No. LAB-AMB-2026/04 & Notulen Forum Warga.'
  },

  // SESI 6: Pemeriksaan Kesehatan Berkala Tahunan (Annual MCU & Biomonitoring)
  {
    id: 'rel-06',
    stage: 'RELATIONS_DISCIPLINE',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Pemeriksaan Kesehatan Berkala (Annual MCU) & Biomonitoring',
    code: 'REL-06',
    category: 'Pemeriksaan Kesehatan Berkala Tahunan',
    title: 'Pelaksanaan Annual MCU Wajib (Rontgen, Spirometri, EKG) & Evaluasi Tren Toksikologi Biomonitoring',
    description: 'Pemeriksaan kesehatan berkala setiap 1 tahun sekali bagi 100% tenaga kerja aktif (teknisi, driver, staf) di klinik hiperkes terakreditasi: rontgen paru, spirometri, tes fungsi ginjal/hati, EKG, serta analisis tren metabolit logam berat/pelarut dibandingkan data baseline saat rekrutmen.',
    legalBasis: 'Permenakertrans No. Per.02/MEN/1980 Pasal 3 jo. Permenaker No. 05/2018',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8 ayat 2)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenakertrans No. Per.02/MEN/1980 tentang Pemeriksaan Kesehatan Tenaga Kerja (Pasal 3)'
    },
    legalSanction: 'Sanksi teguran tertulis dari Pengawas Ketenagakerjaan dan risiko tuntutan ganti rugi jika penyakit akibat kerja terlambat terdeteksi.',
    guidelines: 'Periksa laporan rekapitulasi kesehatan tahunan dan tren hasil biomonitoring yang dilaporkan ke Disnaker.',
    auditSteps: [
      'Periksa rekapitulasi keikutsertaan karyawan dalam Annual MCU periode 2025/2026 (target 100%).',
      'Cek analisa tren fungsi paru dan kadar logam berat oleh Dokter Spesialis Okupasi (Sp.Ok).',
      'Pastikan ada program tindak lanjut medis bagi karyawan dengan status "Fit with Restriction".',
      'Verifikasi tanda terima penyerahan laporan hasil MCU tahunan ke Disnaker.'
    ],
    verificationCriteria: [
      'Pemeriksaan kesehatan berkala tahunan (Annual MCU) mencakup 100% karyawan aktif operasional dan logistik.',
      'Paket pengujian mencakup Rontgen Paru, Spirometri, EKG 12-lead, Audiometri, Hematologi, dan Uji Fungsi Hati/Ginjal.',
      'Analisis perbandingan tren biomonitoring (kadar Pb darah dan fenol urin) dievaluasi terhadap data baseline pra-kerja oleh Dokter Hiperkes.',
      'Tersedia laporan tindak lanjut medis dan program penyesuaian kerja bagi karyawan dengan rekomendasi "Fit with Restriction".',
      'Rekapitulasi komprehensif hasil pemeriksaan kesehatan berkala dilaporkan secara resmi kepada Kantor Disnaker setempat.'
    ],
    riskLevel: 'HIGH',
    status: 'MAJOR_NC',
    operationalScope: 'ALL',
    notes: 'Jadwal pengambilan sampel darah dan urine untuk parameter kadar timbal (Pb) 5 operator furnace re-refining Sukabumi tertunda 2 minggu dari jadwal semesteran.',
    evidenceText: 'Laporan Komprehensif Pemeriksaan Kesehatan Berkala PT. DAS oleh RS Paru & Lab Hiperkes.'
  }
];
