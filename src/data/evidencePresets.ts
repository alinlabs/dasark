import { AuditEvidenceAttachment } from '../types/audit';

// Helper to generate rich realistic SVG Data URLs for audit evidence exhibits
const createSvgDataUrl = (svgContent: string): string => {
  const cleaned = svgContent.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
};

export const EVIDENCE_PRESETS: AuditEvidenceAttachment[] = [
  {
    id: 'ev-preset-hydrant',
    name: 'Foto_Uji_Tekanan_Hydrant_Karawang_7.5Bar.jpg',
    type: 'PHOTO_INSPECTION',
    uploadedAt: '2026-09-25T10:15:00Z',
    uploadedBy: 'Ir. Hendra Gunawan, S.T. (Lead Auditor)',
    caption: 'Foto Manometer Tekanan Jaringan Hydrant Pilar 2 Gudang B3 Karawang Barat - Tekanan Aktif 7.5 Bar (Standar min 7.0 Bar)',
    fileSize: '1.4 MB',
    locationTag: 'TPS B3 Karawang Barat - Zona Proteksi Kebakaran',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
          <linearGradient id="gaugeBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="100%" stop-color="#e2e8f0" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#bg)" />
        
        <!-- Frame header -->
        <rect x="20" y="20" width="560" height="45" rx="8" fill="#1e293b" stroke="#334155" />
        <circle cx="45" cy="42" r="8" fill="#ef4444" />
        <text x="65" y="47" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f8fafc">BUKTI FISIK: MANOMETER HYDRANT 7.5 BAR - TPS KARAWANG</text>
        <text x="460" y="46" font-family="monospace" font-size="11" fill="#10b981">PASSED (7.5 BAR)</text>

        <!-- Pressure Gauge Drawing -->
        <circle cx="300" cy="220" r="120" fill="url(#gaugeBg)" stroke="#cbd5e1" stroke-width="8" />
        <circle cx="300" cy="220" r="105" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        
        <!-- Green safe zone arc -->
        <path d="M 235 150 A 90 90 0 0 1 365 150" fill="none" stroke="#10b981" stroke-width="12" />
        
        <!-- Gauge ticks -->
        <line x1="220" y1="220" x2="235" y2="220" stroke="#334155" stroke-width="3" />
        <text x="240" y="224" font-family="sans-serif" font-size="10" fill="#64748b">0</text>
        <line x1="240" y1="160" x2="252" y2="170" stroke="#334155" stroke-width="3" />
        <text x="256" y="180" font-family="sans-serif" font-size="10" fill="#64748b">5</text>
        <line x1="300" y1="130" x2="300" y2="145" stroke="#10b981" stroke-width="4" />
        <text x="295" y="160" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981">7.5</text>
        <line x1="360" y1="160" x2="348" y2="170" stroke="#ef4444" stroke-width="3" />
        <text x="330" y="180" font-family="sans-serif" font-size="10" fill="#64748b">10</text>

        <!-- Gauge Needle pointing to 7.5 Bar -->
        <line x1="300" y1="220" x2="300" y2="135" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />
        <circle cx="300" cy="220" r="10" fill="#1e293b" />
        <circle cx="300" cy="220" r="4" fill="#ffffff" />
        
        <text x="282" y="260" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">BAR</text>
        <text x="260" y="278" font-family="sans-serif" font-size="10" fill="#64748b">WATER PRESSURE</text>

        <!-- Metadata footer badge -->
        <rect x="30" y="345" width="540" height="35" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="45" y="367" font-family="sans-serif" font-size="11" fill="#94a3b8">Lokasi: Karawang Barat (Hydrant Pilar #2) | Timestamp: 25-09-2026 10:15:22 WIB | GPS: -6.3128, 107.2891</text>
      </svg>
    `)
  },
  {
    id: 'ev-preset-festronik',
    name: 'Scan_Manifest_Elektronik_Festronik_KLHK_B107d.png',
    type: 'DOCUMENT',
    uploadedAt: '2026-09-25T09:40:00Z',
    uploadedBy: 'Capt. Hendro P. (Fleet Manager)',
    caption: 'Lembar Manifes Elektronik (Festronik) KLHK - Kode Limbah B107d Pelarut Bekas, Truk B-9122-DAS dengan QR Code Resmi',
    fileSize: '890 KB',
    locationTag: 'Logistik DAS Group - Transporter Armada Sabang-Merauke',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
        <rect width="600" height="400" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
        
        <!-- Header KLHK Barcode -->
        <rect x="25" y="25" width="550" height="60" rx="4" fill="#047857" />
        <text x="45" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN RI</text>
        <text x="45" y="70" font-family="sans-serif" font-size="11" fill="#a7f3d0">SISTEM MANIFES ELEKTRONIK LIMBAH B3 (FESTRONIK) • RESMI</text>
        
        <!-- Document Content -->
        <rect x="25" y="95" width="370" height="230" rx="4" fill="#ffffff" stroke="#e2e8f0" />
        <text x="40" y="125" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a">NO. MANIFEST: KLHK-FST-2026-0925-88412</text>
        <text x="40" y="150" font-family="sans-serif" font-size="11" fill="#334155">Pengangkut: PT. DAME ALAM SEJAHTERA (DAS GROUP)</text>
        <text x="40" y="175" font-family="sans-serif" font-size="11" fill="#334155">No. Polisi Armada: B 9122 DAS (Truk Tangki B3)</text>
        <text x="40" y="200" font-family="sans-serif" font-size="11" fill="#334155">Nama Pengemudi: Agus Pratama (SIM BII Umum / K3 B3)</text>
        <text x="40" y="225" font-family="sans-serif" font-size="11" fill="#334155">Jenis Limbah: B107d (Pelarut Terhalogenasi Bekas)</text>
        <text x="40" y="250" font-family="sans-serif" font-size="11" fill="#334155">Volume Muatan: 8.500 Liter (Timbangan Digital OK)</text>
        <text x="40" y="275" font-family="sans-serif" font-size="11" fill="#334155">Tujuan: Fasilitas Pengolahan PT. DAS Karawang Barat</text>
        <text x="40" y="305" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">STATUS: TERVERIFIKASI SISTEM (VERIFIED)</text>

        <!-- QR Code Simulation Box -->
        <rect x="410" y="95" width="165" height="230" rx="4" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="430" y="115" width="125" height="125" fill="#0f172a" />
        <rect x="445" y="130" width="30" height="30" fill="#ffffff" />
        <rect x="450" y="135" width="20" height="20" fill="#0f172a" />
        <rect x="505" y="130" width="30" height="30" fill="#ffffff" />
        <rect x="510" y="135" width="20" height="20" fill="#0f172a" />
        <rect x="445" y="190" width="30" height="30" fill="#ffffff" />
        <rect x="450" y="195" width="20" height="20" fill="#0f172a" />
        <text x="435" y="265" font-family="monospace" font-size="9" fill="#64748b">SCAN UNTUK CEK DI</text>
        <text x="435" y="280" font-family="monospace" font-size="9" font-weight="bold" fill="#047857">festronik.menlhk.go.id</text>

        <!-- Footer Bar -->
        <rect x="25" y="340" width="550" height="40" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="40" y="365" font-family="sans-serif" font-size="10" fill="#475569">Dokumen sah elektronik ini telah disinkronkan dengan Kementerian Lingkungan Hidup RI.</text>
      </svg>
    `)
  },
  {
    id: 'ev-preset-respirator',
    name: 'Foto_Temuan_Smoke_Fit_Test_Respirator_Karawang.jpg',
    type: 'PHOTO_INSPECTION',
    uploadedAt: '2026-09-25T11:20:00Z',
    uploadedBy: 'Rian Kurniawan (HSE Officer Karawang)',
    caption: 'Foto Bukti Uji Smoke Fit-Test: Operator Decanting dengan Rambut Janggut Tebal Menolak Segel Silikon (Temuan MAJOR NC ONB-04)',
    fileSize: '1.8 MB',
    locationTag: 'Gudang Decanting Limbah B3 Karawang Barat',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
        <rect width="600" height="400" fill="#18181b" />
        
        <!-- Header -->
        <rect x="20" y="20" width="560" height="45" rx="8" fill="#27272a" stroke="#3f3f46" />
        <circle cx="45" cy="42" r="8" fill="#f59e0b" />
        <text x="65" y="47" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f4f4f5">TEMUAN AUDIT K3: SMOKE FIT-TEST RESPIRATOR LEAKAGE</text>
        <text x="475" y="46" font-family="monospace" font-size="11" fill="#f59e0b">MAJOR NC</text>

        <!-- Graphic visual of respirator mask and beard leak warning -->
        <rect x="50" y="85" width="240" height="235" rx="8" fill="#27272a" stroke="#52525b" />
        <circle cx="170" cy="185" r="70" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3" />
        <!-- Respirator silicone mask -->
        <path d="M 125 180 Q 170 140 215 180 L 205 235 Q 170 255 135 235 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
        <!-- Cartridges -->
        <circle cx="130" cy="210" r="20" fill="#eab308" stroke="#fde047" stroke-width="2" />
        <circle cx="210" cy="210" r="20" fill="#eab308" stroke="#fde047" stroke-width="2" />
        <!-- Red leak indicator on beard area -->
        <path d="M 140 235 Q 170 260 200 235" stroke="#ef4444" stroke-width="6" stroke-dasharray="4,4" fill="none" />
        <text x="95" y="300" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444">KEBOCORAN PADA RAMBUT MUKA</text>

        <!-- Description Box -->
        <rect x="310" y="85" width="240" height="235" rx="8" fill="#27272a" stroke="#52525b" />
        <text x="325" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f4f4f5">Rincian Temuan Lapangan:</text>
        <text x="325" y="145" font-family="sans-serif" font-size="11" fill="#d4d4d8">• Klausul: ONB-04 & K3-03</text>
        <text x="325" y="170" font-family="sans-serif" font-size="11" fill="#d4d4d8">• Uji kabut stannic chloride tercium</text>
        <text x="325" y="195" font-family="sans-serif" font-size="11" fill="#d4d4d8">• Rambut janggut menghalangi segel</text>
        <text x="325" y="220" font-family="sans-serif" font-size="11" fill="#d4d4d8">• Regulasi: Permenaker 08/2010</text>
        <text x="325" y="250" font-family="sans-serif" font-size="11" font-weight="bold" fill="#f59e0b">Tindakan CAPA Diperlukan:</text>
        <text x="325" y="275" font-family="sans-serif" font-size="10" fill="#a1a1aa">Wajib Clean-Shaven Policy & re-test</text>
        <text x="325" y="295" font-family="sans-serif" font-size="10" fill="#a1a1aa">sebelum rotasi shift berikutnya.</text>

        <!-- Footer -->
        <rect x="20" y="340" width="560" height="40" fill="#18181b" stroke="#3f3f46" />
        <text x="35" y="365" font-family="sans-serif" font-size="10" fill="#a1a1aa">Foto diambil dengan Timestamp Kamera Lapangan Lead Auditor | ID Bukti: DAS-IMG-2026-004</text>
      </svg>
    `)
  },
  {
    id: 'ev-preset-mcu',
    name: 'Sertifikat_MCU_Berkala_Biomonitoring_Prodia.png',
    type: 'LAB_RESULT',
    uploadedAt: '2026-09-25T08:30:00Z',
    uploadedBy: 'Dewi Anggraini (HR Specialist)',
    caption: 'Hasil Uji Laboratorium & Spirometri Biomonitoring Rutin Pekerja Pengolahan Limbah Sukabumi (Prodia OHI Clinic)',
    fileSize: '2.1 MB',
    locationTag: 'Klinik OHI Rekanan - Plant Sukabumi',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
        <rect width="600" height="400" fill="#ffffff" stroke="#cbd5e1" stroke-width="4" />
        
        <!-- Header Medical Clinic -->
        <rect x="25" y="25" width="550" height="60" rx="4" fill="#1e3a8a" />
        <text x="45" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">PRODIA OCCUPATIONAL HEALTH INSTITUTE (OHI)</text>
        <text x="45" y="70" font-family="sans-serif" font-size="11" fill="#93c5fd">SERTIFIKAT KESEHATAN KERJA & BIOMONITORING PAJANAN KIMIA</text>
        
        <!-- Patient Details -->
        <rect x="25" y="95" width="550" height="65" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="40" y="120" font-family="sans-serif" font-size="11" fill="#334155">Nama Tenaga Kerja: <strong>Ahmad Fauzi</strong> | NIK: DAS-2022-094 | Umur: 34 Tahun</text>
        <text x="40" y="145" font-family="sans-serif" font-size="11" fill="#334155">Perusahaan: <strong>PT. DAME ALAM SEJAHTERA</strong> | Bagian: Operator De-Watering Sukabumi</text>

        <!-- Lab Results Table -->
        <rect x="25" y="170" width="550" height="150" fill="#ffffff" stroke="#cbd5e1" />
        <line x1="25" y1="200" x2="575" y2="200" stroke="#cbd5e1" stroke-width="2" />
        <text x="40" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Parameter Pemeriksaan</text>
        <text x="240" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Hasil Uji</text>
        <text x="360" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Nilai Rujukan NAB</text>
        <text x="490" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Status</text>

        <text x="40" y="225" font-family="sans-serif" font-size="11" fill="#334155">Spirometri (FVC / FEV1)</text>
        <text x="240" y="225" font-family="sans-serif" font-size="11" fill="#059669">94% (Normal)</text>
        <text x="360" y="225" font-family="sans-serif" font-size="11" fill="#64748b">> 80% Prediksi</text>
        <text x="490" y="225" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669">NORMAL</text>

        <text x="40" y="255" font-family="sans-serif" font-size="11" fill="#334155">Timbal Darah (Pb Blood)</text>
        <text x="240" y="255" font-family="sans-serif" font-size="11" fill="#059669">12 µg/dL</text>
        <text x="360" y="255" font-family="sans-serif" font-size="11" fill="#64748b">&lt; 30 µg/dL (BEI)</text>
        <text x="490" y="255" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669">NORMAL</text>

        <text x="40" y="285" font-family="sans-serif" font-size="11" fill="#334155">Fenol Urine (Biomarker Benzena)</text>
        <text x="240" y="285" font-family="sans-serif" font-size="11" fill="#059669">18 mg/g Creatinine</text>
        <text x="360" y="285" font-family="sans-serif" font-size="11" fill="#64748b">&lt; 25 mg/g</text>
        <text x="490" y="285" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669">NORMAL</text>

        <text x="40" y="310" font-family="sans-serif" font-size="11" fill="#334155">Audiometri Nada Murni</text>
        <text x="240" y="310" font-family="sans-serif" font-size="11" fill="#059669">Ambang Dengar 15 dB</text>
        <text x="360" y="310" font-family="sans-serif" font-size="11" fill="#64748b">&lt; 25 dB</text>
        <text x="490" y="310" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669">NORMAL</text>

        <!-- Footer Sign-off -->
        <rect x="25" y="335" width="550" height="45" fill="#f1f5f9" />
        <text x="40" y="360" font-family="sans-serif" font-size="10" fill="#475569">Dokter Pemeriksa: dr. H. Setyawan, Sp.Ok (Dokter Kesehatan Kerja Bersertifikat Kemenaker RI)</text>
      </svg>
    `)
  }
];
