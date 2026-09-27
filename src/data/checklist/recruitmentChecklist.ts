import { ChecklistItem } from '../../types/audit';

export const RECRUITMENT_CHECKLIST: ChecklistItem[] = [
  // SESI 1: Perencanaan Formasi & Kualifikasi Kompetensi K3/Driver
  {
    id: 'rec-01',
    stage: 'RECRUITMENT',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Perencanaan Formasi & Kualifikasi Kompetensi K3/Driver',
    code: 'REC-01',
    category: 'Kualifikasi Jabatan & Sertifikasi Driver B3',
    title: 'Verifikasi Kualifikasi Standar Lisensi SIM BII Umum & Sertifikasi Pengemudi Angkutan B3',
    description: 'Seluruh formasi pengemudi armada transporter B3 Sabang-Merauke wajib memiliki SIM BII Umum aktif, minimal pengalaman 3 tahun angkutan berat, dan Sertifikat K3 Pengemudi B3 dari Kemenhub/KLHK.',
    legalBasis: 'PP No. 22/2021 Pasal 285 & SK Dirjen Hubdat No. SK.725/AJ.302/DRJD/2004',
    legalHierarchy: {
      primaryLaw: 'UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (Pasal 77)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 285)',
      ministerialReg: 'SK Dirjen Hubdat No. SK.725/AJ.302/DRJD/2004 tentang Penyelenggaraan Pengangkutan B3'
    },
    legalSanction: 'Armada dapat ditahan oleh petugas dan izin penyelenggaraan angkutan B3 DAS Group dicabut.',
    guidelines: 'Lakukan verifikasi fisik kartu lisensi, cek masa berlaku, dan validasi ke database BPTD/Kemenhub.',
    auditSteps: [
      'Periksa keabsahan fisik SIM BII Umum dan kesesuaian identitas calon driver.',
      'Cek sertifikat pelatihan Pengemudi Angkutan B3 resmi dari lembaga terakreditasi Ditjen Hubdat.',
      'Periksa logbook riwayat berkendara dan masa berlaku lisensi minimal 1 tahun ke depan.',
      'Verifikasi keabsahan kartu kompetensi melalui portal digital atau konfirmasi ke instansi penerbit.'
    ],
    verificationCriteria: [
      'SIM BII Umum berstatus aktif dengan sisa masa berlaku sekurang-kurangnya 12 bulan.',
      'Memiliki Sertifikat Pelatihan Pengemudi Angkutan B3 yang diterbitkan Ditjen Perhubungan Darat / KLHK.',
      'Memiliki rekam jejak pengalaman mengemudi kendaraan berat/tangki tronton minimal 3 tahun berturut-turut.',
      'Data identitas pada SIM, KTP, dan sertifikat kompetensi cocok 100% tanpa inkonsistensi nama atau NIK.',
      'Telah lulus verifikasi riwayat tilang dan tidak tercatat dalam daftar sanksi pelanggaran laka lantas berat.',
      'Tercatat dalam matriks lisensi logistik dengan jadwal pengingat perpanjangan berkala.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'TRANSPORTER',
    notes: 'Dari 32 driver aktif, 30 telah lengkap tersertifikasi; 2 driver baru dalam proses penerbitan kartu BPTD.',
    evidenceText: 'Database Sertifikasi Driver DAS-LOG-CERT-2026 dan Surat Keterangan BPTD.'
  },
  {
    id: 'rec-02',
    stage: 'RECRUITMENT',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Perencanaan Formasi & Kualifikasi Kompetensi K3/Driver',
    code: 'REC-02',
    category: 'Kualifikasi Kompetensi Personel Plant (POPLB3 & K3)',
    title: 'Kualifikasi Sertifikasi BNSP POPLB3/POPAL & Ahli K3 Kimia / Umum Personel Plant',
    description: 'Penanggung jawab operasional TPS Karawang Barat dan unit Pemanfaat Sukabumi wajib memiliki sertifikasi kompetensi BNSP POPLB3 (Pengolahan Limbah B3) serta Ahli K3 Umum/Kimia Kemenaker.',
    legalBasis: 'Permen LHK No. P.05/MENLHK/SETJEN/KUM.1/2/2018 jo. Permenaker No. 02/1992',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH & UU No. 1 Tahun 1970',
      governmentReg: 'PP No. 22 Tahun 2021 & PP No. 50 Tahun 2012',
      ministerialReg: 'Permen LHK No. P.05/2018 tentang Standar Kompetensi Personel Pengelolaan Limbah B3'
    },
    legalSanction: 'Peringatan tertulis dan penurunan nilai kelayakan fasilitas TPS/Pemanfaat pada audit KLHK.',
    guidelines: 'Cek sertifikat BNSP POPLB3 / POPAL penanggung jawab operasional Karawang Barat dan Sukabumi.',
    auditSteps: [
      'Cek sertifikat BNSP POPLB3 supervisor operasional Plant Karawang dan Sukabumi.',
      'Verifikasi keaktifan SKP Ahli K3 Umum/Kimia penanggung jawab keselamatan.',
      'Bandingkan kebutuhan formasi matrix kompetensi dengan sertifikasi yang ada.',
      'Periksa masa berlaku Lisensi K3 dan Surat Keputusan Penunjukan dari Kemnaker.'
    ],
    verificationCriteria: [
      'Supervisor TPS B3 memegang sertifikat kompetensi BNSP Penanggung Jawab Operasional Pengolahan Limbah B3 (POPLB3) aktif.',
      'Penanggung jawab K3 Plant memegang Surat Keputusan Penunjukan (SKP) Ahli K3 Umum/Kimia aktif dari Kemnaker RI.',
      'Personel penanggung jawab instalasi air limbah memegang sertifikasi kompetensi POPAL/OPAL yang valid.',
      'Matrix kompetensi seluruh personil kunci operasional diperbarui sekurang-kurangnya 1 tahun sekali.',
      'Tersedia salinan resmi legalisir sertifikat kompetensi dalam berkas audit lingkungan dan personalia.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Ditemukan 1 calon supervisor teknis pengolahan limbah Sukabumi masa berlaku sertifikat kompetensi BNSP POPLB3 telah habis 2 minggu dan sedang dalam antrean resertifikasi LSP.',
    evidenceText: 'Salinan Sertifikat BNSP No. REG.PLB3.0089.2024 dan Formulir Pendaftaran Uji Resertifikasi LSP.'
  },

  // SESI 2: Skrining Dokumen Legal & Background Check Integritas
  {
    id: 'rec-03',
    stage: 'RECRUITMENT',
    sessionNumber: 2,
    sessionTitle: 'Sesi 2: Skrining Dokumen Legal & Background Check Integritas',
    code: 'REC-03',
    category: 'Skrining Dokumen & SKCK Kepolisian',
    title: 'Verifikasi Bebas Catatan Kriminal (SKCK) & Integritas Rekam Jejak Disiplin',
    description: 'Skrining ketat dokumen calon tenaga kerja: keaslian SKCK kepolisian dengan status aktif, rekam jejak bebas tindak pidana pencurian/penimbunan BBM/limbah ilegal, dan klarifikasi referensi kerja tempat sebelumnya.',
    legalBasis: 'UU No. 13/2003 jo. PP No. 35/2021 & Prosedur Rekrutmen DAS Group',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 35)',
      governmentReg: 'PP No. 35 Tahun 2021',
      ministerialReg: 'SOP Rekrutmen dan Seleksi PT. Dame Alam Sejahtera (SOP-HR-001)'
    },
    legalSanction: 'Pembatalan hubungan kerja masa percobaan jika terbukti memalsukan dokumen atau pernah terlibat mafia limbah.',
    guidelines: 'Cek riwayat kerja calon driver dan teknisi ke perusahaan sebelumnya melalui direct reference check call.',
    auditSteps: [
      'Validasi keaslian lembar SKCK dari Polres/Polsek setempat.',
      'Lakukan reference check ke minimal 2 perusahaan tempat kerja sebelumnya.',
      'Periksa apakah calon pernah masuk daftar hitam (blacklist) pengangkutan limbah atau penggelapan kargo.',
      'Pastikan dokumen terverifikasi langsung oleh tim HRD sebelum penawaran kerja diterbitkan.'
    ],
    verificationCriteria: [
      'Lembar SKCK asli dari Kepolisian RI dengan masa berlaku aktif saat proses seleksi berlangsung.',
      'Tersedia formulir verifikasi referensi kerja (reference check form) tertandatangani HRD dari minimal 2 atasan terdahulu.',
      'Tidak memiliki riwayat pelanggaran berat atau keterlibatan dalam kasus penimbunan kargo/pencurian solar di tempat kerja lama.',
      'Bebas dari catatan hitam pada database asosiasi pengangkut B3 dan serikat pekerja terkait insiden fatal.',
      'Seluruh dokumen ijazah, KTP, dan surat pengalaman kerja telah diverifikasi keabsahannya dengan dokumen pembanding.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Seluruh berkas karyawan baru periode 2026 dilengkapi SKCK dan log reference check terverifikasi.',
    evidenceText: 'Dokumen Berkas Rekrutmen Batch 2026/01 dan Form Reference Check HR-DAS-REF-01 s/d 14.'
  },

  // SESI 3: Sesi Wawancara Bertingkat (HR, User & K3 Safety Behavioral)
  {
    id: 'rec-04',
    stage: 'RECRUITMENT',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Sesi Wawancara Bertingkat (HR, User & K3 Behavioral)',
    code: 'REC-04',
    category: 'Wawancara HR & Kesiapan Kerja Jarak Jauh',
    title: 'Sesi Wawancara HR: Evaluasi Komitmen, Ketahanan Mental & Kesiapan Rute Nasional',
    description: 'Wawancara pendalaman psikologis oleh HRD mengenai kesiapan pengemudi rute ekspedisi lintas pulau (Sabang-Merauke), pemahaman kerja sistem shift pabrik, stabilitas emosi, dan motivasi kerja.',
    legalBasis: 'UU No. 13/2003 Pasal 35 & Standar Seleksi HR DAS Group',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 35)',
      governmentReg: 'PP No. 35 Tahun 2021',
      ministerialReg: 'Pedoman Tata Kelola HR PT. Dame Alam Sejahtera'
    },
    legalSanction: 'Tingkat turnover driver tinggi dan risiko kecelakaan akibat ketidaksiapan mental perjalanan jauh.',
    guidelines: 'Verifikasi lembar scoring interview HR, penilaian kestabilan emosi, dan kesepakatan penugasan rute dinas.',
    auditSteps: [
      'Periksa form wawancara HR terstandarisasi untuk setiap kandidat.',
      'Pastikan ada evaluasi psikologis kesiapan menghadapi kondisi jalan raya dan shift malam.',
      'Verifikasi persetujuan tertulis kandidat terkait penempatan dinas luar kota/rute transporter.',
      'Uji konsistensi jawaban kandidat mengenai pola adaptasi stres dan jadwal shift rotasi.'
    ],
    verificationCriteria: [
      'Formulir wawancara HR terstruktur terisi lengkap dengan penilaian kompetensi perilaku mencapai skor kelulusan (≥ 75).',
      'Surat pernyataan kesediaan penugasan rute nasional Sabang-Merauke ditandatangani di atas materai.',
      'Evaluasi stabilitas emosi dan kesiapan kerja shift malam dinilai dalam kategori memadai oleh pewawancara HR.',
      'Catatan kesepakatan target kehadiran dan kepatuhan disiplin jam kerja terdokumentasi rapi.',
      'Kandidat memahami skema uang jalan dinas dan sistem rotasi pergantian pengemudi jarak jauh.'
    ],
    riskLevel: 'MEDIUM',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Prosedur wawancara HR terlaksana terstruktur menggunakan lembar penilaian berbasis kompetensi.',
    evidenceText: 'Formulir Penilaian Wawancara HRD DAS-HR-INT-2026.'
  },
  {
    id: 'rec-05',
    stage: 'RECRUITMENT',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Sesi Wawancara Bertingkat (HR, User & K3 Behavioral)',
    code: 'REC-05',
    category: 'Wawancara Teknis User (Logistik & Plant)',
    title: 'Sesi Wawancara Teknis User: Pemahaman Karakteristik Fisika-Kimia Limbah B3 & SOP Operasional',
    description: 'Wawancara langsung oleh Fleet Manager / Kepala Plant menguji pemahaman teknis: penanganan oli bekas, sludge IPAL, titik nyala (flash point), pencegahan tumpahan, dan mekanisme decanting/loading.',
    legalBasis: 'PP No. 22 Tahun 2021 & SOP Penanganan Limbah DAS Group',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 59)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH',
      ministerialReg: 'Permen LHK No. 6 Tahun 2021'
    },
    legalSanction: 'Kesalahan operasional pemuatan/pengangkutan limbah yang memicu insiden tumpahan atau ledakan di plant.',
    guidelines: 'Evaluasi hasil tes wawancara teknis mengenai penanganan limbah korosif, mudah menyala, dan beracun.',
    auditSteps: [
      'Periksa lembar uji lisan pemahaman teknis limbah B3 oleh Kepala Bagian Operasional.',
      'Cek pemahaman kandidat mengenai kode limbah (B105d, B353-1, dll.) dan manifes Festronik.',
      'Pastikan kandidat mampu menjelaskan langkah saat katup tangki bocor di jalan.',
      'Verifikasi kemampuan identifikasi bahaya inkompatibilitas antar-jenis limbah kimia.'
    ],
    verificationCriteria: [
      'Kandidat mampu menjelaskan sifat fisika-kimia, titik nyala, dan tingkat bahaya limbah oli bekas serta sludge IPAL.',
      'Memahami mekanisme darurat penutupan katup tangki (emergency shut-off valve) saat terjadi kebocoran pada unit angkutan.',
      'Memahami kodefikasi limbah B3 sesuai Lampiran IX PP 22/2021 dan alur pengisian manifes elektronik Festronik.',
      'Memahami prinsip segregasi penataan drum agar tidak terjadi reaksi pencampuran zat kimia inkompatibel.',
      'Mendapatkan rekomendasi tertulis "Disetujui Masuk Tahap K3" dari Fleet Manager atau Kepala Plant bersangkutan.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Lembar evaluasi uji teknis lisan pemahaman sifat limbah 2 calon staf magang logistik belum diunggah dan ditandatangani lengkap oleh Fleet Manager.',
    evidenceText: 'Berkas Wawancara Teknis Seleksi Calon Kru Logistik DAS-LOG-INT-2026/03.'
  },
  {
    id: 'rec-06',
    stage: 'RECRUITMENT',
    sessionNumber: 3,
    sessionTitle: 'Sesi 3: Sesi Wawancara Bertingkat (HR, User & K3 Behavioral)',
    code: 'REC-06',
    category: 'Wawancara K3 / Safety Behavioral Interview',
    title: 'Sesi Wawancara K3 Khusus: Pengujian Sikap Keselamatan (Safety Attitude) & Respon Darurat',
    description: 'Wawancara oleh HSE Officer menilai kesadaran risiko bahaya, kepatuhan APD mutlak, budaya "Stop Work Authority", dan respon calon pekerja saat menghadapi tumpahan atau indikasi kebakaran gudang/armada.',
    legalBasis: 'UU No. 1/1970 & PP No. 50/2012 Penerapan SMK3',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 9 & 12)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Elemen 6 & 12)',
      ministerialReg: 'Permenaker No. 05/2018 tentang K3 Lingkungan Kerja'
    },
    legalSanction: 'Kecelakaan kerja fatal akibat pengabaian prosedur keselamatan dan tidak adanya budaya saling mengingatkan.',
    guidelines: 'Tinjau skenario darurat yang diberikan saat wawancara keselamatan calon tenaga kerja.',
    auditSteps: [
      'Verifikasi skor Safety Behavioral Assessment dari petugas K3.',
      'Pastikan kandidat paham hak menghentikan pekerjaan berbahaya (Stop Work Authority).',
      'Uji pemahaman kandidat terkait larangan merokok di area TPS Karawang Barat dan unit oli Sukabumi.',
      'Evaluasi pemahaman tindakan awal evakuasi saat alarm darurat berbunyi.'
    ],
    verificationCriteria: [
      'Skor pengujian sikap keselamatan (Safety Behavioral Assessment) mencapai predikat minimal "Baik" (≥ 80).',
      'Memahami dan menyetujui hak dan kewajiban menghentikan pekerjaan tidak aman (Stop Work Authority).',
      'Memahami kepatuhan mutlak atas larangan membawa pemantik api/rokok di seluruh area TPS B3 dan pabrik.',
      'Mampu menguraikan langkah komunikasi darurat saat melihat potensi bahaya ceceran zat kimia atau asap.',
      'Menandatangani komitmen kepatuhan pemakaian APD lengkap tanpa kompromi selama masa bertugas.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Wawancara K3 mendalam telah dilakukan untuk seluruh kandidat kru gudang Karawang dan kru armada.',
    evidenceText: 'Formulir Safety Behavioral Assessment HSE-DAS-INT-2026.'
  },

  // SESI 4: Uji Kompetensi Teknis & Tes Praktik Lapangan
  {
    id: 'rec-07',
    stage: 'RECRUITMENT',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Uji Praktik Berkendara & Operasional Alat Berat',
    code: 'REC-07',
    category: 'Uji Praktik Mengemudi Truk B3 Lapangan',
    title: 'Uji Praktik Lapangan Mengemudi Truk Tangki/Box B3 (Driving Skill, Reverse Parking & Hazard Perception)',
    description: 'Pengujian langsung kemampuan berkendara truk tronton/tangki muatan penuh: manuver jalur sempit, pengereman di turunan/tanjakan, parkir mundur loading dock, dan inspeksi pra-jalan (Pre-Trip Inspection).',
    legalBasis: 'UU No. 22/2009 Pasal 77 jo. Permenhub PM 60/2019',
    legalHierarchy: {
      primaryLaw: 'UU No. 22 Tahun 2009 tentang LLAJ (Pasal 77 & 90)',
      governmentReg: 'PP No. 74 Tahun 2014 tentang Angkutan Jalan',
      ministerialReg: 'Permenhub No. PM 60 Tahun 2019 tentang Angkutan Barang Khusus'
    },
    legalSanction: 'Truk terguling atau kecelakaan lalu lintas fatal berisiko tumpahan limbah di jalan tol/arteri nasional.',
    guidelines: 'Tinjau lembar penilaian berkendara oleh Master Driver / Instruktur Uji Safety Driving DAS Group.',
    auditSteps: [
      'Cek lembar skor uji praktik mengemudi truk tronton/tangki muatan limbah.',
      'Periksa penguasaan Pre-Trip Inspection (cek rem angin, ban, lampu, APAR on-board, grounding rod).',
      'Pastikan nilai kelulusan driving test minimal 80 poin.',
      'Uji keterampilan parkir mundur di loading dock dengan toleransi ruang sempit.'
    ],
    verificationCriteria: [
      'Lulus pengujian manuver jalan raya dan jalur sempit dengan instruktur safety driving tersertifikasi (skor ≥ 80).',
      'Melaksanakan Pre-Trip Inspection secara mandiri dan lengkap (tekanan angin ban, rem udara, APAR on-board, grounding strip).',
      'Mampu melakukan manuver parkir mundur loading dock dengan tepat tanpa menyentuh batas pembatas (bollard).',
      'Memperagakan respon antisipatif terhadap blind spot kendaraan besar dan jarak aman pengereman muatan berat.',
      'Memahami prosedur pemantauan temperatur rem dan roda saat menempuh turunan panjang.'
    ],
    riskLevel: 'CRITICAL',
    status: 'CRITICAL_HAZARD',
    operationalScope: 'TRANSPORTER',
    notes: 'Hasil evaluasi uji jalan raya menemukan 1 calon pengemudi tronton tangki limbah cair gagal dalam simulasi pengereman darurat di jalan basah namun tetap direkomendasikan lulus bersyarat tanpa re-test resmi.',
    evidenceText: 'Lembar Penilaian Uji Praktik Berkendara Truk B3 DAS-LOG-DRIVE-2026/02 Catatan Instruktur.'
  },
  {
    id: 'rec-08',
    stage: 'RECRUITMENT',
    sessionNumber: 4,
    sessionTitle: 'Sesi 4: Uji Praktik Berkendara & Operasional Alat Berat',
    code: 'REC-08',
    category: 'Uji Praktik Operator Forklift & Mesin De-Watering',
    title: 'Uji Keterampilan Pengoperasian Forklift TPS B3 & Mesin Filter Press / De-Watering Sludge',
    description: 'Pengujian lisensi SIO Kemenaker operator forklift untuk penataan drum B3 di gudang Karawang serta uji pemahaman pengoperasian pompa transfer dan filter press lumpur di Sukabumi.',
    legalBasis: 'Permenaker No. 08/2020 tentang K3 Pesawat Angkat dan Angkut jo. Permenaker 38/2016',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.5)',
      ministerialReg: 'Permenaker No. 08 Tahun 2020 tentang K3 Pesawat Angkat dan Angkut'
    },
    legalSanction: 'Penyitaan alat dan sanksi denda ketenagakerjaan jika forklift dioperasikan personel tanpa SIO.',
    guidelines: 'Periksa keabsahan SIO Forklift Kemenaker dan lembar observasi praktik lifting drum pallet.',
    auditSteps: [
      'Verifikasi kepemilikan Surat Izin Operator (SIO) Forklift Kelas II/I yang masih berlaku.',
      'Uji praktik penataan drum palet 4 susun tanpa benturan di gudang TPS.',
      'Uji pemahaman emergency shut-off pada panel mesin filter press.',
      'Cek kelengkapan checklist inspeksi harian sebelum pengoperasian alat.'
    ],
    verificationCriteria: [
      'Operator memegang Surat Izin Operator (SIO) Forklift / Pesawat Tenaga Produksi aktif yang diterbitkan Kemnaker RI.',
      'Mampu melaksanakan pengujian pre-operational check forklift (kebocoran oli hidrolik, klakson, lampu rotary, rem tangan).',
      'Mampu menyusun palet drum B3 4 susun dengan stabilitas sempurna tanpa terjadinya guncangan atau tumpahan.',
      'Memahami prosedur pemutusan daya darurat (Emergency Stop Switch) pada unit mesin filter press / centrifuge de-watering.',
      'Mematuhi kapasitas beban kerja aman (Safe Working Load / SWL) dan batas kecepatan manuver di dalam area gudang (maks 5 km/jam).'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Operator forklift TPS Karawang dan operator mesin Sukabumi memegang SIO Kemenaker resmi.',
    evidenceText: 'Buku Lisensi K3 SIO Forklift Kemnaker RI No. SIO-FORK-2025/112.'
  },

  // SESI 5: Medical Check-Up (MCU) Pra-Kerja Komprehensif
  {
    id: 'rec-09',
    stage: 'RECRUITMENT',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Medical Check-Up (MCU) Pra-Kerja & Skrining Kardiovaskular',
    code: 'REC-09',
    category: 'MCU Fisik & Penunjang Pra-Kerja',
    title: 'Medical Check-Up (MCU) Pra-Kerja Lengkap: Fisik, Rontgen Thorax, Spirometri & Audiometri',
    description: 'Pemeriksaan kesehatan menyeluruh sebelum penempatan di lab hiperkes rekanan resmi: rontgen dada, spirometri fungsi paru, audiometri pendengaran, hematologi lengkap, dan fungsi hati/ginjal.',
    legalBasis: 'Permenakertrans No. Per.02/MEN/1980 tentang Pemeriksaan Kesehatan Tenaga Kerja',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang Penerapan SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenakertrans No. Per.02/MEN/1980 (Pasal 2 & 3)'
    },
    legalSanction: 'Pasal 15 UU 1/1970: Pelanggaran kewajiban MCU pra-kerja dikenakan sanksi denda dan pidana kurungan.',
    guidelines: 'Verifikasi sertifikat kelaikan kerja "Fit to Work" bertanda tangan dokter bersertifikat Hiperkes.',
    auditSteps: [
      'Cek laporan hasil laboratorium MCU 100% calon karyawan baru.',
      'Pastikan hasil spirometri paru normal (bebas restriksi/obstruksi) bagi pekerja paparan uap oli/sludge.',
      'Pastikan dokter pemeriksa memiliki Surat Izin Dokter Hiperkes Kemenaker.',
      'Verifikasi parameter fungsi ginjal (Ureum/Kreatinin) dan fungsi hati (SGOT/SGPT).'
    ],
    verificationCriteria: [
      'Sertifikat kelaikan kerja resmi (Fit to Work Certificate) diterbitkan oleh Dokter Pemeriksa Kesehatan Tenaga Kerja teregistrasi Kemnaker.',
      'Hasil rontgen thorax dinyatakan normal tanpa adanya indikasi penyakit paru kronis, TB aktif, atau fibrosis.',
      'Pemeriksaan fungsi pernafasan (spirometri) menunjukkan kapasitas vital paksa (FVC) dan FEV1 di atas 80% prediksi normal.',
      'Hasil audiometri pendengaran berada dalam rentang ambang dengar normal (0-25 dB) untuk kedua telinga.',
      'Profil fungsi ginjal (ureum/kreatinin) dan fungsi hati (SGOT/SGPT) berada dalam batas rujukan medis standar.',
      'Tidak ada satupun calon pekerja yang memulai tugas sebelum seluruh hasil pemeriksaan MCU pra-kerja tuntas diverifikasi.'
    ],
    riskLevel: 'HIGH',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Seluruh 18 karyawan baru telah menjalani MCU di Laboratorium Klinik Prodia/Pramita.',
    evidenceText: 'Laporan Rekap MCU Pra-Kerja HRD-DAS-MCU-2026/01 tertanda tangan dr. Sp.Ok.'
  },
  {
    id: 'rec-10',
    stage: 'RECRUITMENT',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Medical Check-Up (MCU) Pra-Kerja & Skrining Kardiovaskular',
    code: 'REC-10',
    category: 'Skrining Jantung & Visus Driver B3',
    title: 'Skrining Kardiovaskular (Rekam Jantung EKG), Profil Lipid & Tes Ketajaman Penglihatan Malam/Warna',
    description: 'Skrining khusus pengemudi angkutan B3: rekam jantung EKG untuk mendeteksi risiko serangan jantung mendadak (sudden cardiac arrest) saat berkendara, profil kolesterol/trigliserida, visus malam, dan tes buta warna Ishihara.',
    legalBasis: 'UU No. 22/2009 & SK Dirjen Hubdat Pengemudi Angkutan B3',
    legalHierarchy: {
      primaryLaw: 'UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (Pasal 77 ayat 4)',
      governmentReg: 'PP No. 74 Tahun 2014 tentang Angkutan Jalan',
      ministerialReg: 'Permenkes No. 70 Tahun 2016 tentang Standar Kesehatan Kerja Pengemudi'
    },
    legalSanction: 'Kecelakaan maut di jalan raya akibat pengemudi mengalami serangan jantung mendadak atau buta warna simbol B3.',
    guidelines: 'Periksa hasil rekam jantung EKG dan lembar tes Ishihara pengemudi di berkas rekrutmen logistik.',
    auditSteps: [
      'Cek hasil EKG pengemudi (bebas iskemia / aritmia berat).',
      'Pastikan pengemudi bebas buta warna total maupun parsial agar mampu membedakan simbol piktogram B3.',
      'Periksa riwayat tekanan darah dan batas aman sebelum izin berkendara dikeluarkan.',
      'Cek profil kolesterol total, HDL, LDL, dan trigliserida dalam batas aman.'
    ],
    verificationCriteria: [
      'Rekaman Elektrokardiogram (EKG 12-lead) menunjukkan irama sinus normal tanpa iskemia miokard, aritmia berbahaya, atau blok konduksi.',
      'Hasil pengujian buta warna dengan metode Ishihara 24/38 plates membuktikan 100% bebas buta warna parsial maupun total.',
      'Ketajaman penglihatan (visus mata) memenuhi standar minimal 6/6 dengan atau tanpa kacamata koreksi serta uji lapang pandang normal.',
      'Tekanan darah istirahat terukur stabil pada ambang aman (< 140/90 mmHg) tanpa riwayat hipertensi emergensi.',
      'Kadar gula darah puasa dan profil lipid (kolesterol/trigliserida) tergolong dalam batas risiko kardiovaskular rendah-sedang.'
    ],
    riskLevel: 'CRITICAL',
    status: 'MAJOR_NC',
    operationalScope: 'TRANSPORTER',
    notes: 'Ditemukan 3 berkas pengemudi rute ekspedisi malam belum melampirkan hasil tes lapang pandang dan ketajaman penglihatan malam (night vision test) dari dokter spesialis mata.',
    evidenceText: 'Laporan Skrining Kardiovaskular & Visus Pengemudi B3 DAS-LOG-MED-2026.'
  },
  {
    id: 'rec-11',
    stage: 'RECRUITMENT',
    sessionNumber: 5,
    sessionTitle: 'Sesi 5: Medical Check-Up (MCU) Pra-Kerja & Skrining Kardiovaskular',
    code: 'REC-11',
    category: 'Tes Bebas Narkoba (NAPZA 6 Parameter)',
    title: 'Pengujian Laboratorium Bebas Narkoba / NAPZA 6 Parameter Wajib',
    description: 'Skrining ketat bebas narkotika, psikotropika, dan zat adiktif dengan 6 parameter urin: Amphetamine (AMP), THC/Ganja, Morphine (MOP), Cocaine (COC), Benzodiazepine (BZO), dan Methamphetamine (MET/Sabu).',
    legalBasis: 'UU No. 35 Tahun 2009 tentang Narkotika jo. Permenakertrans No. 11/2005',
    legalHierarchy: {
      primaryLaw: 'UU No. 35 Tahun 2009 tentang Narkotika',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Kriteria 6.7)',
      ministerialReg: 'Permenakertrans No. Per.11/MEN/VI/2005 tentang Pencegahan dan Penanggulangan NAPZA di Tempat Kerja'
    },
    legalSanction: 'Pemutusan hubungan kerja seketika dan penyerahan oknum ke pihak BNN / Kepolisian RI.',
    guidelines: 'Verifikasi surat keterangan bebas narkoba 6 parameter dari BNN atau lab kesehatan terakreditasi.',
    auditSteps: [
      'Periksa hasil uji lab NAPZA 6 parameter untuk setiap karyawan baru.',
      'Pastikan pengambilan sampel urin diawasi oleh petugas medis berwenang (chain of custody).',
      'Pastikan ada klausul persetujuan tes urine acak berkala di masa kerja.',
      'Cek keabsahan cap dan legalitas laboratorium pemeriksa rujukan BNN.'
    ],
    verificationCriteria: [
      'Hasil pengujian laboratorium 6 parameter NAPZA (AMP, MET, THC, MOP, COC, BZO) menunjukkan hasil 100% Negatif.',
      'Pemeriksaan dilaksanakan oleh Laboratorium Klinik terakreditasi / Badan Narkotika Nasional (BNN) dengan protokol chain of custody.',
      'Sampel urin diverifikasi suhu, berat jenis, dan keasliannya guna mencegah pemalsuan atau substitusi cairan.',
      'Kandidat menandatangani klausul persetujuan pemeriksaan tes urine acak berkala tanpa pemberitahuan sewaktu-waktu (random drug test).',
      'Surat Keterangan Bebas Narkoba (SKBN) resmi terlampir pada map personalia induk karyawan.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Seluruh kru operasional dan pengemudi baru lulus tes bebas narkoba 6 parameter dengan hasil negatif.',
    evidenceText: 'Sertifikat Uji Bebas Narkoba Lab Medika No. SKBN-DAS-2026-021.'
  },

  // SESI 6: Biomonitoring Baseline Toksikologi
  {
    id: 'rec-12',
    stage: 'RECRUITMENT',
    sessionNumber: 6,
    sessionTitle: 'Sesi 6: Biomonitoring Baseline Logam Berat & Toksikologi',
    code: 'REC-12',
    category: 'Biomonitoring Baseline Pra-Penempatan',
    title: 'Pengujian Baseline Toksikologi Biomonitoring Darah (Pb, Cd) & Urin (Fenol / Pelarut) Pra-Penempatan',
    description: 'Pengambilan sampel baseline darah dan urin untuk teknisi de-watering lumpur, operator distilasi oli Sukabumi, dan kru TPS Karawang guna menetapkan kadar awal Timbal (Pb), Kadmium (Cd), dan fenol/hidrokarbon aromatik sebelum terpapar lingkungan kerja.',
    legalBasis: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja Pasal 29',
    legalHierarchy: {
      primaryLaw: 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Pasal 8)',
      governmentReg: 'PP No. 50 Tahun 2012 tentang SMK3 (Elemen 6)',
      ministerialReg: 'Permenaker No. 5 Tahun 2018 tentang K3 Lingkungan Kerja (Pasal 29 & Lampiran Higiene Industri)'
    },
    legalSanction: 'Perusahaan kehilangan dasar hukum sanggahan jika mantan pekerja mengklaim Penyakit Akibat Kerja di masa mendatang.',
    guidelines: 'Validasi database baseline biomonitoring yang disimpan di rekam medis K3 perusahaan.',
    auditSteps: [
      'Pastikan sampling darah dan urine dilakukan sebelum pekerja mulai bertugas di area produksi/pengumpulan.',
      'Cek kadar baseline logam berat dibandingkan baku mutu Indeks Pajanan Biologi (Biological Exposure Indices / BEI).',
      'Arsipkan hasil uji ke rekam kesehatan khusus yang berlaku 30 tahun.',
      'Verifikasi kualifikasi laboratorium penguji yang memiliki akreditasi KAN LP-Hiperkes.'
    ],
    verificationCriteria: [
      'Kadar baseline Timbal dalam darah (Blood Lead Level / Pb-B) berada di bawah ambang batas baku mutu (< 20 µg/dL).',
      'Kadar baseline Kadmium (Cd) darah dan urin berada dalam batas nilai rujukan populasi non-terpapar (< 5 µg/g kreatinin).',
      'Hasil pengujian metabolit pelarut organik (fenol urin / asam mandelat) menunjukkan nilai baseline normal.',
      'Pengambilan sampel biologis dilakukan oleh tenaga medis terlatih sebelum hari pertama penugasan di zona limbah.',
      'Rekam hasil uji biomonitoring terdokumentasi dalam rekam medis okupasi berstatus rahasia dengan retensi 30 tahun.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'SUKABUMI_PLANT',
    notes: 'Kadar baseline darah/urin seluruh teknisi baru di bawah baku mutu ambang batas Permenaker 05/2018.',
    evidenceText: 'Sertifikat Uji Baseline Toksikologi Balai K3 Kemenaker No. TOX-DAS-2026-03.'
  },

  // SESI 7: Penawaran Kerja, PKWT/PKWTT & Pakta Integritas
  {
    id: 'rec-13',
    stage: 'RECRUITMENT',
    sessionNumber: 7,
    sessionTitle: 'Sesi 7: Penawaran Kerja, Kontrak & Pakta Integritas K3',
    code: 'REC-13',
    category: 'Kontrak Kerja PKWT / PKWTT & Hubungan Kerja',
    title: 'Penandatanganan Surat Penawaran Kerja (Offering Letter) & Perjanjian Kerja Sesuai PP 35/2021',
    description: 'Penerbitan offering letter resmi yang mencantumkan hak upah, tunjangan bahaya kimia, skema insentif driver, jam kerja, status hubungan kerja (PKWT/PKWTT) serta pencatatan PKWT ke Disnaker.',
    legalBasis: 'PP No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja, dan PHK',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023 (Pasal 54-61A)',
      governmentReg: 'PP No. 35 Tahun 2021 tentang PKWT (Pasal 4-14)',
      ministerialReg: 'Permenaker No. 5 Tahun 2021'
    },
    legalSanction: 'PKWT demi hukum berubah menjadi PKWTT jika tidak dicatatkan atau klausul waktu melanggar PP 35/2021.',
    guidelines: 'Periksa kelengkapan tanda tangan kedua belah pihak di atas materai dan bukti registrasi e-PKWT Disnaker.',
    auditSteps: [
      'Periksa draft kontrak PKWT memuat hak, kewajiban, dan masa berlaku yang jelas.',
      'Pastikan hak kompensasi PKWT di akhir kontrak dicantumkan secara eksplisit sesuai Pasal 15 PP 35/2021.',
      'Cek bukti pendaftaran PKWT ke Dinas Tenaga Kerja setempat.',
      'Pastikan tidak ada klausul penahanan ijazah atau pemotongan upah ilegal di luar undang-undang.'
    ],
    verificationCriteria: [
      'Dokumen Perjanjian Kerja (PKWT/PKWTT) ditandatangani kedua belah pihak di atas materai sah Rp 10.000.',
      'Mencantumkan rincian hak upah pokok, tunjangan bahaya kimia, jadwal kerja, dan hak kompensasi akhir kontrak sesuai PP 35/2021.',
      'Tersedia bukti tanda terima pendaftaran / pencatatan elektronik e-PKWT pada portal SIAPKerja Disnaker setempat.',
      'Tidak memuat klausul penahanan dokumen asli (ijazah/KTP) yang bertentangan dengan norma ketenagakerjaan.',
      'Karyawan menerima 1 (satu) rangkap salinan asli kontrak kerja yang telah ditandatangani lengkap.'
    ],
    riskLevel: 'HIGH',
    status: 'MINOR_NC',
    operationalScope: 'ALL',
    notes: 'Bukti registrasi pencatatan elektronik e-PKWT 4 staf baru di Disnaker Karawang masih berstatus menunggu verifikasi antrean (melebihi 7 hari kerja).',
    evidenceText: 'Tangkapan Layar Status Pendaftaran e-PKWT SIAPKerja Disnaker No. REG-PKWT-2026/088.'
  },
  {
    id: 'rec-14',
    stage: 'RECRUITMENT',
    sessionNumber: 7,
    sessionTitle: 'Sesi 7: Penawaran Kerja, Kontrak & Pakta Integritas K3',
    code: 'REC-14',
    category: 'Pakta Integritas Zero Dumping & Larangan Subkontrak Gelap',
    title: 'Penandatanganan Pakta Integritas Anti-Dumping Liar, Kepatuhan Festronik & Larangan Alih Angkutan Gelap',
    description: 'Penandatanganan komitmen bermaterai oleh seluruh pengemudi dan teknisi: larangan keras membuang limbah B3 di luar titik izin KLHK, larangan mematikan GPS telematika, larangan memalsukan timbangan, dan larangan mengalihkan muatan ke pihak ketiga tanpa izin.',
    legalBasis: 'UU No. 32 Tahun 2009 Pasal 104 jo. PP No. 22 Tahun 2021',
    legalHierarchy: {
      primaryLaw: 'UU No. 32 Tahun 2009 tentang PPLH (Pasal 104 ancaman pidana 1-3 tahun)',
      governmentReg: 'PP No. 22 Tahun 2021 tentang Penyelenggaraan PPLH (Pasal 280)',
      ministerialReg: 'Peraturan Perusahaan PT. Dame Alam Sejahtera (Pasal 38 Sanksi PHK Pelanggaran Kategori Fatal)'
    },
    legalSanction: 'PHK seketika tanpa pesangon dan pelaporan pidana lingkungan hidup ke Ditjen Gakkum KLHK & Kepolisian.',
    guidelines: 'Periksa formulir asli Pakta Integritas bermaterai di berkas personalia masing-masing pengemudi.',
    auditSteps: [
      'Pastikan setiap pengemudi menandatangani lembar Pakta Integritas bermaterai Rp 10.000.',
      'Verifikasi klausul pertanggungjawaban hukum bila dengan sengaja membuang oli/limbah sembarangan.',
      'Cek pemahaman pengemudi terhadap sanksi hukum pidana lingkungan hidup UU 32/2009.',
      'Pastikan ada larangan tegas mematikan GPS atau mengalihkan kargo ke pihak ketiga tanpa izin tertulis.'
    ],
    verificationCriteria: [
      '100% pengemudi dan teknisi menandatangani Pakta Integritas Anti-Dumping Ilegal bermaterai resmi sebelum penugasan.',
      'Memuat pernyataan komitmen tidak mematikan alat pelacak GPS telematika armada selama masa pengangkutan.',
      'Memuat larangan keras subkontrak/pemindahan muatan limbah ke pihak ketiga tanpa persetujuan resmi manajemen.',
      'Klausul sanksi tegas berupa PHK seketika dan penuntutan pidana UU 32/2009 dipahami dan disetujui secara tertulis.',
      'Arsip digital dan fisik dokumen pakta integritas tersimpan lengkap dalam database kepatuhan hukum corporate.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'TRANSPORTER',
    notes: 'Form Pakta Integritas telah ditandatangani 100% kru armada transporter dan teknisi plant.',
    evidenceText: 'Form Pakta Integritas Anti-Dumping Ilegal bertanda tangan seluruh pengemudi DAS Group.'
  },

  // SESI 8: Kebijakan Perlindungan Pekerja Rentan
  {
    id: 'rec-15',
    stage: 'RECRUITMENT',
    sessionNumber: 8,
    sessionTitle: 'Sesi 8: Kebijakan Perlindungan Pekerja Rentan & Zona Berbahaya',
    code: 'REC-15',
    category: 'Perlindungan Pekerja Rentan & Larangan Penempatan',
    title: 'Larangan Mutlak Penempatan Tenaga Kerja Wanita Hamil/Menyusui & Anak di Zona Limbah Berbahaya',
    description: 'Penerapan ketat kebijakan bebas pekerja di bawah umur (< 18 tahun) serta larangan penempatan wanita hamil/menyusui di area gudang B3 Karawang Barat, area decanting, dan unit distilasi oli bekas Sukabumi karena bahaya teratogenik/karsinogenik.',
    legalBasis: 'UU No. 13/2003 Pasal 68 & Pasal 76 ayat (2); PP No. 22/2021',
    legalHierarchy: {
      primaryLaw: 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 68 & Pasal 76 ayat 2)',
      governmentReg: 'PP No. 35 Tahun 2021 & PP No. 22 Tahun 2021',
      ministerialReg: 'Kepmenakertrans No. Kep.224/MEN/2003 tentang Perlindungan Pekerja Perempuan'
    },
    legalSanction: 'Pasal 185 UU 13/2003: Sanksi pidana penjara paling singkat 1 tahun dan denda maksimal Rp 400.000.000.',
    guidelines: 'Periksa data demografi usia staf dan SOP mutasi otomatis ke bagian administrasi saat staf wanita hamil.',
    auditSteps: [
      'Verifikasi KTP seluruh pekerja lapangan (minimal 21 tahun untuk operasional B3).',
      'Cek implementasi SOP perlindungan kehamilan (mutasi tugas non-lapangan tanpa pemotongan upah pokok).',
      'Pastikan papan larangan masuk pekerja rentan terpasang di gerbang TPS B3.',
      'Cek data pemantauan berkala kondisi staf wanita melalui klinik perusahaan.'
    ],
    verificationCriteria: [
      'Zero child labor (0% tenaga kerja di bawah batas usia minimum 18 tahun) terbukti melalui verifikasi KTP dan data kependudukan.',
      'Larangan mutlak penempatan tenaga kerja wanita hamil atau menyusui di area paparan kimia B3 diterapkan tanpa pengecualian.',
      'Tersedia SOP mutasi kerja sementara ke divisi non-paparan kimia (administrasi/office) bagi pekerja wanita hamil tanpa pemotongan hak upah.',
      'Rambu larangan masuk bagi pekerja rentan dan pengunjung non-otoritas terpasang jelas di setiap akses masuk plant.',
      'Kebijakan perlindungan pekerja rentan tercantum secara eksplisit dalam Peraturan Perusahaan dan Buku Saku K3.'
    ],
    riskLevel: 'CRITICAL',
    status: 'COMPLIANT',
    operationalScope: 'ALL',
    notes: 'Semua pekerja lapangan berusia minimal 21 tahun; kebijakan mutasi otomatis ke bagian admin kantor bagi staf wanita yang hamil telah berjalan efektif.',
    evidenceText: 'Data HRIS demografi karyawan DAS Group dan SOP Perlindungan Kehamilan K3-DAS-007.'
  }
];
