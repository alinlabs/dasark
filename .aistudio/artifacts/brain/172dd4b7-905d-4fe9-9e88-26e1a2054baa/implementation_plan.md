# Rencana Implementasi: WasteGuard HR-Audit
**Platform Audit HR & K3 Terpadu untuk Industri Pengolahan Limbah & B3**

Aplikasi web & enterprise dashboard untuk Auditor HR Corporate, EHS Manager, dan Compliance Officer di industri limbah (B3, limbah medis, limbah cair/IPAL, dan daur ulang). Sistem ini memvalidasi siklus penuh karyawan mulai dari rekrutmen hingga terminasi, dengan penegakan regulasi K3 (SMK3 PP 50/2012), Ketenagakerjaan (PP 35/2021), dan Lingkungan Hidup (PP 22/2021).

---

## 1. Arsitektur & Konsep Solusi

### A. Persona Pengguna
- **Corporate HR Auditor**: Melakukan inspeksi berkala, validasi dokumen legalitas & ketenagakerjaan.
- **EHS / K3 Officer**: Memverifikasi sertifikasi kompetensi B3, APD, MCU berkala, dan kesiapsiagaan darurat limbah.
- **HR Plant Manager**: Mengisi checklist self-assessment & menindaklanjuti Corrective and Preventive Action (CAPA).

### B. Cakupan Modul Audit Siklus Karyawan (HR Full Lifecycle)
1. **Recruitment & Selection**:
   - Medical Check-Up (MCU) pra-kerja spesifik paparan limbah B3 (tes faal hati, paru, logam berat).
   - Verifikasi keaslian sertifikat kompetensi wajib (BNSP Pengolah Limbah B3, K3 Umum/Kimia).
   - Penandatanganan Job Hazard Analysis (JHA) & Pakta Integritas Keselamatan Limbah.
2. **Onboarding & Training**:
   - Safety induction intensif zona B3 & tata laksana tumpahan limbah (Spill Kit Protocol).
   - Pelatihan tanggap darurat dan evakuasi kontaminasi kimia/toksik.
   - Kepatuhan PKWT/PKWTT sesuai regulasi ketenagakerjaan dan masa percobaan.
3. **Karyawan Aktif & K3 (Kesehatan & Keselamatan Kerja)**:
   - Standar APD zona limbah (Hazmat, respirator kartrid, safety boots nitrile, goggles).
   - MCU tahunan berkala & pemantauan paparan biomonitoring pekerja lapangan.
   - Jam kerja & batasan shift zona berisiko tinggi (rotasi paparan radiasi/uap beracun).
   - Penegakan SOP penanganan limbah & sistem pelaporan Near-Miss / Insiden K3.
4. **Compensation & Benefit Khusus Risiko**:
   - Tunjangan bahaya / risiko tinggi (Hazard Allowance) pengolah limbah.
   - Jaminan sosial ketenagakerjaan (BPJS Ketenagakerjaan JKK kelas risiko tertinggi & BPJS Kesehatan).
   - Ekstra nutrisi & suplemen detoksifikasi bagi operator zona B3.
5. **Disciplinary & Performance (SOP Enforcement)**:
   - Pelanggaran fatal K3 (misal: merokok di area limbah mudah terbakar, pembuangan ilegal).
   - Prosedur SP1 - SP3 dengan riwayat pembuktian audit.
6. **Termination & Offboarding**:
   - **Exit Medical Check-Up**: Wajib untuk mencatat rekam kesehatan akhir sebelum keluar guna mencegah tuntutan penyakit akibat kerja (PAK) masa depan.
   - Pencabutan akses badge zona terbatas limbah & serah terima APD reusable/dosimeter.
   - Perhitungan pesangon, uang penghargaan, dan surat keterangan kerja sesuai PP 35/2021.

---

## 2. Fitur Utama Aplikasi

1. **Interactive Audit Checklist Engine**:
   - Filter berdasarkan fase (Recruitment, Onboarding, Operational K3, Comp & Ben, Termination).
   - Pilihan evaluasi: *Compliant (Patuh)*, *Minor Non-Conformance (Minor NC)*, *Major Non-Conformance (Major NC)*, *Critical Hazard (Bahaya Kritis)*, atau *N/A*.
   - Input catatan temuan, bukti foto/dokumen (file upload & visual preview), serta bobot penilaian otomatis.
2. **Automated Compliance & Risk Scoring**:
   - Indikator Kepatuhan Total (0 - 100%) dengan status: *Audit Passed*, *Conditional Pass*, atau *Critical Fail*.
   - Risk Heatmap Matrix (Probabilitas vs Dampak Hukum/Keselamatan).
3. **Corrective & Preventive Action (CAPA / CAR) Tracker**:
   - Otomatis membuat tiket perbaikan saat ditemukan *Minor NC*, *Major NC*, atau *Critical Hazard*.
   - Penugasan PIC, batas waktu penyelesaian (deadline), status (Open, In Progress, Verified Closed).
4. **AI-Powered Regulatory Compliance Advisor (Gemini 2.5 Flash)**:
   - Analisis otomatis ringkasan temuan audit terhadap pasal-pasal regulasi Indonesia (Permenaker, PP 50/2012 SMK3, UU Cipta Kerja).
   - Rekomendasi tindakan korektif cepat dan draft rekomendasi audit formal.
5. **Audit Executive Summary & Export**:
   - Grafik radar kepatuhan per departemen/tahap.
   - Ekspor Laporan Resmi Audit (Print/PDF layout berstandar auditor corporate dan ekspor CSV data).
   - Template checklist siap pakai dengan data industri limbah nyata (PT Waste Solution Nusantara).

---

## 3. Rencana Komponen & UI

- **Modern Industrial EHS Theme**:
  - Warna berkarakter: Deep Slate/Charcoal background, Emerald Green (Safety/Passed), Hazard Amber (Warning), Crimson Red (Critical Hazard), Teal Accent.
  - Tipografi bersih, kartu audit terstruktur, dan navigasi tab responsif (Mobile & Desktop).
- **Struktur File**:
  - `src/types/audit.ts`: Tipe data pertanyaan, kriteria checklist, temuan, CAPA, dan skor.
  - `src/data/auditQuestions.ts`: Bank checklist komprehensif 30+ poin audit standar industri limbah.
  - `src/components/Header.tsx`: Ringkasan status audit, metadata inspeksi, tombol ekspor & tindakan cepat.
  - `src/components/AuditDashboard.tsx`: KPI kepatuhan, risk matrix, dan chart radar kategori.
  - `src/components/ChecklistSection.tsx`: Form checklist dinamis dengan filter, evidence simulator, dan evaluasi instan.
  - `src/components/CapaTracker.tsx`: Meja kerja tindakan korektif temuan audit.
  - `src/components/AiAuditAdvisor.tsx`: Konsultan AI untuk analisis risiko kepatuhan hukum lingkungan & ketenagakerjaan.
  - `src/components/ReportModal.tsx`: Format cetak/ekspor formal laporan audit siap tanda tangan.

---

## 4. Rencana Verifikasi

- Verifikasi perhitungan otomatis skor kepatuhan saat jawaban checklist diubah.
- Pengujian filter kategori audit (Recruitment -> K3 -> Termination).
- Pengujian pembuatan tiket CAPA otomatis ketika memilih Major NC / Critical Hazard.
- Verifikasi fitur AI Advisor (Gemini) dalam menghasilkan rekomendasi berbasis temuan.
- Menjalankan `compile_applet` untuk memastikan TypeScript & Vite bundling berhasil tanpa galat.
