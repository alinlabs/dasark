export interface DASGroupProfile {
  name: string;
  shortName: string;
  tagline: string;
  establishedYear: number;
  businessSector: string;
  employeeScale: string;
  headquarters: string;
  operationalUnits: {
    id: 'ALL' | 'TRANSPORTER' | 'KARAWANG_PLANT' | 'SUKABUMI_PLANT';
    name: string;
    location: string;
    description: string;
    keyProcesses: string[];
    specialFocus: string;
  }[];
  incidentHistoryNote: {
    period: string;
    location: string;
    description: string;
    mitigationActions: string[];
  };
}

export const DAS_GROUP_PROFILE: DASGroupProfile = {
  name: 'PT. DAME ALAM SEJAHTERA (DAS GROUP)',
  shortName: 'DAS GROUP',
  tagline: 'One Team, One Goal, One Spirit',
  establishedYear: 2010,
  businessSector: 'Waste Management Service (Pengelolaan Limbah B3 dan Non-B3)',
  employeeScale: '50 - 250 Karyawan',
  headquarters: 'Karawang Barat, Jawa Barat, Indonesia',
  operationalUnits: [
    {
      id: 'ALL',
      name: 'Semua Unit Terpadu (DAS Group)',
      location: 'Nasional (Sabang s/d Merauke)',
      description: 'Audit terintegrasi seluruh rantai nilai jasa pengelolaan limbah dari hulu ke hilir.',
      keyProcesses: ['Transporter Nasional', 'Pengumpul Karawang', 'Pemanfaat Sukabumi', 'De-watering & Drying'],
      specialFocus: 'Sistem Manajemen K3 (SMK3 PP 50/2012) & Kepatuhan KLHK PP 22/2021',
    },
    {
      id: 'TRANSPORTER',
      name: 'Divisi Transporter Nasional (Armada Logistik B3)',
      location: 'Rute Seluruh Indonesia (Sabang s/d Merauke)',
      description: 'Armada angkutan logistik limbah B3 khusus berizin resmi Dirjen Hubdat & KLHK, melayani penjemputan limbah langsung di site klien swasta dan BUMN.',
      keyProcesses: [
        'Pengangkutan Limbah B3 Antar-Provinsi',
        'Pelatihan Driver & Kru Tanggap Keluhan Klien',
        'SOP Tanggap Darurat Tumpahan di Jalan Raya (Spill Kit On-Board)',
        'Inspeksi Kelayakan Truk B3 & Uji Emisi / KIR'
      ],
      specialFocus: 'Sertifikasi K3 Pengemudi B3, SIM BII Umum, Batasan Jam Mengemudi (Fatigue Management), dan Pengawasan GPS Telematika.',
    },
    {
      id: 'KARAWANG_PLANT',
      name: 'Fasilitas Pengumpul Utama (Plant Karawang Barat)',
      location: 'Karawang Barat, Jawa Barat',
      description: 'Pusat operasional dan fasilitas penampungan serta pengumpulan limbah industri B3 & Non-B3 skala besar.',
      keyProcesses: [
        'Penerimaan & Verifikasi Manifes Digital (Festronik)',
        'Penyimpanan Sementara di Gudang TPS Limbah B3 Berizin',
        'Segregasi Karakteristik Limbah (Mudah Terbakar, Reaktif, Korosif)',
        'Pengelolaan Sistem Proteksi Kebakaran Aktif & Pasif'
      ],
      specialFocus: 'Audit Ketat Pasca-Insiden Kebakaran Okt 2025: Sistem Hydrant/Foam Otomatis, Pemantauan Emisi Gas, Protokol Tanggap Darurat Warga, dan Tanggung Jawab Sosial Pembersihan Permukiman.',
    },
    {
      id: 'SUKABUMI_PLANT',
      name: 'Fasilitas Pemanfaat & Daur Ulang (Plant Sukabumi)',
      location: 'Sukabumi, Jawa Barat',
      description: 'Pusat pemanfaatan kembali limbah bernilai guna, spesialisasi pengolahan oli bekas (used oil recycling) dan reduksi lumpur limbah.',
      keyProcesses: [
        'Pengolahan & Pemurnian Oli Bekas (Used Oil Re-refining)',
        'Teknik Pengolahan De-watering & Drying Lumpur Limbah (Sludge)',
        'Reduksi Kadar Air & Pengecilan Volume Limbah',
        'Quality Control Produk Pemanfaatan Kembali'
      ],
      specialFocus: 'Pengendalian Uap Panas & Hidrokarbon, Keselamatan Operasi Unit Filter Press / Centrifuge / Rotary Dryer, dan Biomonitoring Pelarut/PAH Pekerja.',
    }
  ],
  incidentHistoryNote: {
    period: 'Oktober 2025',
    location: 'Gudang Penyimpanan Limbah B3, Karawang Barat',
    description: 'Insiden kebakaran gudang penyimpanan limbah B3 yang sempat berdampak pada lingkungan sekitar dan pemukiman warga.',
    mitigationActions: [
      'Pembersihan dan remediasi lingkungan permukiman warga terdampak secara komprehensif.',
      'Instalasi ulang sistem deteksi api (flame/smoke detector) dan jaringan pemadam foam/sprinkler otomatis berstandar NFPA.',
      'Pemberian kompensasi dan pemeriksaan kesehatan gratis (medical screening) bagi warga sekitar.',
      'Pengetatan SOP segregasi drum limbah mudah terbakar (flammable) dengan jarak aman antar-blok minimal 2 meter.',
      'Pelatihan rutin drill pemadaman api tingkat lanjutan untuk seluruh regu pemadam internal (Fire Brigade DAS Group).'
    ]
  }
};
