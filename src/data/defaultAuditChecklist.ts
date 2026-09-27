import { ChecklistItem, StageMetadata, AuditSession, CAPAItem } from '../types/audit';
import { calculateStageScores } from '../utils/auditCalculator';
import { populateItemCriterionEvaluations } from '../utils/criteriaEvaluationHelper';
import { RECRUITMENT_CHECKLIST } from './checklist/recruitmentChecklist';
import { ONBOARDING_CHECKLIST } from './checklist/onboardingChecklist';
import { OPERATIONAL_CHECKLIST } from './checklist/operationalChecklist';
import { COMPENSATION_CHECKLIST } from './checklist/compensationChecklist';
import { RELATIONS_CHECKLIST } from './checklist/relationsChecklist';
import { TERMINATION_CHECKLIST } from './checklist/terminationChecklist';
import { HISTORICAL_CAPA_LIST } from './historicalCapaData';

export const STAGE_METADATA: StageMetadata[] = [
  {
    id: 'RECRUITMENT',
    label: 'Siklus Rekrutmen, Seleksi & Skrining Pra-Kerja',
    shortLabel: 'Rekrutmen & Seleksi',
    description: '8 Sesi: Kualifikasi & lisensi Driver B3/POPLB3, background check SKCK, wawancara bertingkat (HR, User & K3 Safety Behavioral), tes praktik driving/forklift, MCU pra-kerja (spirometri/EKG/NAPZA), biomonitoring baseline logam berat, PKWT & pakta integritas zero dumping, serta perlindungan pekerja rentan.',
    iconName: 'UserCheck',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
    regulations: ['UU No. 1/1970', 'Permenaker No. 02/1980', 'PP No. 22/2021', 'SK Dirjen Hubdat Pengemudi B3', 'PP No. 35/2021']
  },
  {
    id: 'ONBOARDING_TRAINING',
    label: 'Siklus Induksi, Onboarding & Pelatihan K3 Terpadu',
    shortLabel: 'Induksi & Pelatihan',
    description: '8 Sesi: Induksi budaya "One Team, One Goal, One Spirit", sosialisasi Peraturan Perusahaan, pelatihan MSDS 16 bab oli bekas & sludge, fit-test respirator & clean-shaven policy, spill kit drill armada jalan raya & plant, tanggap darurat kebakaran gudang B3 pasca-insiden Karawang, sertifikasi resmi, dan evaluasi Safety Passport.',
    iconName: 'BookOpenCheck',
    color: 'blue',
    badgeBg: 'bg-blue-500/10 text-blue-700 border-blue-300',
    regulations: ['PP No. 50/2012', 'Permenaker No. Kep.187/1999', 'Permenaker No. 08/2010', 'Kepmenaker No. 186/1999']
  },
  {
    id: 'OPERATIONAL_K3',
    label: 'Siklus Operasional, Proteksi Fasilitas & Higiene Industri',
    shortLabel: 'Operasional K3 & Karawang',
    description: '8 Sesi: Daily safety talk & fit-to-work, kepatuhan APD khusus, proteksi kebakaran aktif/pasif gudang Karawang Barat (hydrant 7 bar, foam, flame detector pasca-insiden), segregasi flammable & bund-wall 110%, de-watering & drying sludge Sukabumi, re-refining oli bekas & biomonitoring rutin, fatigue management GPS, dan permit-to-work (PTW) & 5R.',
    iconName: 'ShieldAlert',
    color: 'amber',
    badgeBg: 'bg-amber-500/10 text-amber-700 border-amber-300',
    regulations: ['Permenaker No. 04/1980', 'Permenaker No. 05/2018', 'Kepmenaker No. 186/1999', 'PP No. 22/2021', 'UU No. 22/2009']
  },
  {
    id: 'COMPENSATION_WELFARE',
    label: 'Siklus Kompensasi, Uang Jalan & Kesejahteraan',
    shortLabel: 'Kompensasi & Nutrisi',
    description: '6 Sesi: Upah pokok sesuai UMK Karawang/Sukabumi & lembur PP 35/2021, tunjangan bahaya kimia (hazard pay) & insentif no-accident driver B3, kepesertaan 100% BPJS TK Risiko Kelompok V (1.74%) & BPJS Kesehatan, nutrisi susu steril harian, fasilitas sanitasi/eyewash shower, dan transparansi uang jalan & dana darurat.',
    iconName: 'HeartHandshake',
    color: 'purple',
    badgeBg: 'bg-purple-500/10 text-purple-700 border-purple-300',
    regulations: ['UU No. 13/2003', 'PP No. 36/2021', 'PP No. 44/2015', 'PP No. 82/2019', 'Instruksi Menakertrans Ins.03/1999']
  },
  {
    id: 'RELATIONS_DISCIPLINE',
    label: 'Siklus Hubungan Industrial, Disiplin & Kepatuhan Lingkungan',
    shortLabel: 'Disiplin & SOP Limbah',
    description: '6 Sesi: Penegakan Peraturan Perusahaan & prosedur SP bertingkat, sanksi tegas zero-tolerance pembuangan limbah ilegal / manipulasi manifes Festronik, kelembagaan komite P2K3 Karawang & Sukabumi, saluran Whistleblowing System (WBS) terlindungi, komunikasi warga sekitar pasca-kebakaran, dan annual MCU berkala.',
    iconName: 'Scale',
    color: 'indigo',
    badgeBg: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
    regulations: ['UU No. 32/2009 Pasal 104', 'PP No. 35/2021', 'Permenaker No. 04/1987', 'Permenakertrans No. 02/1980']
  },
  {
    id: 'TERMINATION_EXIT',
    label: 'Siklus Terminasi, Exit MCU & Purna Tugas',
    shortLabel: 'Terminasi & Exit MCU',
    description: '6 Sesi: Exit MCU wajib sebelum tanggal berhenti, pengarsipan rekam pajanan limbah kimia 30 tahun, penarikan surat tugas driver B3 & penonaktifan akun Festronik KLHK < 24 jam, exit interview terstruktur, pembayaran kompensasi/pesangon PP 35/2021, serta penerbitan paklaring & penonaktifan BPJS.',
    iconName: 'LogOut',
    color: 'rose',
    badgeBg: 'bg-rose-500/10 text-rose-700 border-rose-300',
    regulations: ['Permenaker No. 02/1980 Pasal 4', 'Permenaker No. 05/2018 Pasal 30', 'PP No. 35/2021', 'PP No. 22/2021']
  }
];

export const INITIAL_CHECKLIST_TEMPLATE: ChecklistItem[] = [
  ...RECRUITMENT_CHECKLIST,
  ...ONBOARDING_CHECKLIST,
  ...OPERATIONAL_CHECKLIST,
  ...COMPENSATION_CHECKLIST,
  ...RELATIONS_CHECKLIST,
  ...TERMINATION_CHECKLIST
].map(item => populateItemCriterionEvaluations(item));

export const INITIAL_CAPA_LIST: CAPAItem[] = HISTORICAL_CAPA_LIST;

const calculatedScores = calculateStageScores(INITIAL_CHECKLIST_TEMPLATE);

export const INITIAL_AUDIT_SESSION: AuditSession = {
  id: 'aud-das-2026-0925-01',
  auditCode: 'AUD-DAS-CORP-2026-Q3',
  title: 'Audit Kepatuhan HR-K3 Terpadu Siklus Kerja PT. DAME ALAM SEJAHTERA (DAS GROUP)',
  facilityName: 'PT. DAME ALAM SEJAHTERA (DAS GROUP)',
  facilityLocation: 'Pusat Operasional Plant Karawang Barat & Plant Sukabumi',
  wasteType: 'INTEGRATED_PLANT',
  operationalUnit: 'ALL',
  auditorName: 'Alvareza H. Pratama, S.M',
  auditorRole: 'Lead Auditor SMK3 & Lingkungan Hidup',
  leadAuditorLicense: 'SKP-KEMNAKER-AUD-2024/0991-K3',
  auditDate: '2026-09-25',
  status: 'IN_PROGRESS',
  items: INITIAL_CHECKLIST_TEMPLATE,
  capaList: INITIAL_CAPA_LIST,
  overallScore: calculatedScores.overallScore,
  stageScores: calculatedScores.stageScores,
  aiAnalysis: {
    summary: 'Audit kepatuhan siklus hidup ketenagakerjaan dan K3 terpadu pada PT. DAME ALAM SEJAHTERA (DAS GROUP) menunjukkan pemenuhan komprehensif pada seluruh 6 tahapan siklus kerja dengan rincian per sub-sesi terstruktur. Rekonstruksi proteksi kebakaran gudang B3 Karawang Barat pasca-insiden Oktober 2025 telah beroperasi optimal (hydrant bertekanan 7 bar, sistem deteksi api 24 jam, pemisahan blok penyimpanan berjarak minimal 2 meter, dan tanggul tumpahan 110%). Tindak lanjut perbaikan difokuskan pada penegakan Clean-Shaven Policy pada operator decanting Karawang, penataan jam istirahat pengemudi armada B3 rute Sabang-Merauke, dan pelaksanaan Exit MCU wajib bagi seluruh pekerja purna tugas sesuai Permenaker 02/1980.',
    legalRisks: [
      'Potensi sengketa hukum Penyakit Akibat Kerja (PAK) dari mantan karyawan jika Exit MCU diabaikan sesuai Permenakertrans No. 02/1980.',
      'Tanggung jawab hukum pengangkutan jalan raya jika pengemudi armada B3 mengalami insiden akibat kelelahan (fatigue) melebihi jam batas UU 22/2009 Pasal 90.',
      'Kewajiban pengawasan ketat sistem proteksi kebakaran aktif gudang Karawang Barat agar tidak terjadi insiden berulang yang dapat memicu sanksi paksaan pemerintah sesuai PP 22/2021.'
    ],
    actionPriorities: [
      'Laksanakan segera Exit MCU susulan untuk 2 eks-operator pengolah limbah Karawang dalam 7 hari kerja.',
      'Terapkan kebijakan Clean-Shaven Policy dan uji kabut fit-test rutin sebelum rotasi shift di gudang Karawang dan pengolahan oli Sukabumi.',
      'Pasang sistem notifikasi peringatan telematika GPS di kabin seluruh armada truk B3 jika melaju lebih dari 4 jam tanpa istirahat.',
      'Perbarui secara berkala simulasi pemadaman kebakaran gudang Karawang bersama Regu Damkar DAS Group dan tim Damkar Pemkab Karawang.'
    ],
    auditVerdict: 'Kepatuhan Baik Bersyarat (Conditional Pass). Sistem K3 PT. Dame Alam Sejahtera telah menunjukkan komitmen perbaikan nyata pasca-insiden Oktober 2025. Sertifikat audit dapat disahkan penuh setelah CAPA Major NC selesai diverifikasi.'
  }
};

