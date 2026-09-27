import { ChecklistItem, ComplianceStatus, CriterionEvaluation, RiskLevel } from '../types/audit';

/**
 * Calculates the overall compliance status of an audit clause based on its individual criteria evaluations.
 * - All evaluated criteria are COMPLIANT -> COMPLIANT (Sesuai)
 * - 1 evaluated criterion is NON_COMPLIANT -> MINOR_NC (Ketidaksesuaian Minor)
 * - 2 evaluated criteria are NON_COMPLIANT -> MAJOR_NC (Ketidaksesuaian Mayor)
 * - 3 or more evaluated criteria are NON_COMPLIANT (or critical risk failure) -> CRITICAL_HAZARD (Temuan Kritis)
 * - If no criteria have been evaluated -> UNCHECKED (Belum Diperiksa)
 */
export function evaluateItemStatusFromCriteria(
  criteriaEvaluations: CriterionEvaluation[] | undefined,
  riskLevel: RiskLevel = 'MEDIUM'
): ComplianceStatus {
  if (!criteriaEvaluations || criteriaEvaluations.length === 0) {
    return 'UNCHECKED';
  }

  const evaluated = criteriaEvaluations.filter(e => e.status !== 'UNCHECKED');
  if (evaluated.length === 0) {
    return 'UNCHECKED';
  }

  const nonCompliant = criteriaEvaluations.filter(e => e.status === 'NON_COMPLIANT');
  const nonCompliantCount = nonCompliant.length;
  const totalEvaluated = evaluated.length;

  if (nonCompliantCount === 0) {
    return 'COMPLIANT';
  } else if (nonCompliantCount === 1) {
    // 1 criterion failed out of criteria
    return 'MINOR_NC';
  } else if (nonCompliantCount === 2) {
    // 2 criteria failed
    return 'MAJOR_NC';
  } else {
    // 3 or more criteria failed
    return riskLevel === 'LOW' ? 'MAJOR_NC' : 'CRITICAL_HAZARD';
  }
}

/**
 * Synchronizes the individual criterion evaluations when an auditor updates the item status directly.
 */
export function syncCriteriaToStatus(
  targetStatus: ComplianceStatus,
  criteriaList: string[] = [],
  existingEvals?: CriterionEvaluation[],
  defaultNote?: string
): CriterionEvaluation[] {
  if (!criteriaList || criteriaList.length === 0) return [];

  if (targetStatus === 'COMPLIANT') {
    return criteriaList.map((critText, idx) => ({
      criterionIndex: idx,
      criterionText: critText,
      status: 'COMPLIANT',
      notes: existingEvals?.[idx]?.status === 'COMPLIANT' ? (existingEvals[idx].notes || 'Sesuai dengan kriteria.') : 'Sesuai dengan kriteria audit dan bukti fisik terverifikasi.'
    }));
  }

  if (targetStatus === 'UNCHECKED') {
    return criteriaList.map((critText, idx) => ({
      criterionIndex: idx,
      criterionText: critText,
      status: 'UNCHECKED',
      notes: ''
    }));
  }

  if (targetStatus === 'MINOR_NC') {
    // Exactly 1 criterion is NON_COMPLIANT (prefer existing NC or index 0), remaining COMPLIANT
    const existingNcIdx = existingEvals?.findIndex(e => e.status === 'NON_COMPLIANT');
    const targetNcIdx = existingNcIdx !== undefined && existingNcIdx >= 0 ? existingNcIdx : 0;

    return criteriaList.map((critText, idx) => ({
      criterionIndex: idx,
      criterionText: critText,
      status: idx === targetNcIdx ? 'NON_COMPLIANT' : 'COMPLIANT',
      notes: idx === targetNcIdx 
        ? (existingEvals?.[idx]?.notes || defaultNote || 'Terdapat 1 kriteria minor yang belum terpenuhi.') 
        : 'Sesuai standar verifikasi.'
    }));
  }

  if (targetStatus === 'MAJOR_NC') {
    // 2 criteria are NON_COMPLIANT, remaining COMPLIANT
    const existingNcIndices = existingEvals
      ?.map((e, i) => (e.status === 'NON_COMPLIANT' ? i : -1))
      .filter(i => i >= 0) || [];
    
    const ncIndices = existingNcIndices.length >= 2 
      ? existingNcIndices.slice(0, 2) 
      : [0, 1].filter(i => i < criteriaList.length);

    return criteriaList.map((critText, idx) => {
      const isNc = ncIndices.includes(idx);
      return {
        criterionIndex: idx,
        criterionText: critText,
        status: isNc ? 'NON_COMPLIANT' : 'COMPLIANT',
        notes: isNc 
          ? (existingEvals?.[idx]?.notes || defaultNote || 'Parameter kriteria signifikan belum memenuhi standar.') 
          : 'Sesuai standar verifikasi.'
      };
    });
  }

  if (targetStatus === 'CRITICAL_HAZARD') {
    // 3 or more criteria are NON_COMPLIANT
    const maxNc = Math.min(3, criteriaList.length);
    return criteriaList.map((critText, idx) => {
      const isNc = idx < maxNc;
      return {
        criterionIndex: idx,
        criterionText: critText,
        status: isNc ? 'NON_COMPLIANT' : 'COMPLIANT',
        notes: isNc 
          ? (existingEvals?.[idx]?.notes || defaultNote || 'Kriteria keselamatan kritis tidak terpenuhi.') 
          : 'Sesuai standar verifikasi.'
      };
    });
  }

  return criteriaList.map((critText, idx) => ({
    criterionIndex: idx,
    criterionText: critText,
    status: 'UNCHECKED',
    notes: ''
  }));
}

/**
 * Specifically populated mapping for realistic findings across all 6 audit cycles.
 */
const SPECIFIC_FINDINGS_CRITERIA_MAP: Record<string, { ncIndices: number[]; ncNotes: Record<number, string> }> = {
  // SIKLUS 1: REKRUTMEN
  'REC-02': {
    ncIndices: [0],
    ncNotes: {
      0: 'Sertifikat kompetensi BNSP POPLB3 supervisor operasional Sukabumi terlambat diperpanjang (habis 31 Juli 2026).'
    }
  },
  'REC-07': {
    ncIndices: [0, 1, 2],
    ncNotes: {
      0: '1 calon pengemudi tronton tangki muatan cair gagal pada simulasi pengereman basah di turunan curam.',
      1: 'Respon jarak pengereman melebihi batas toleransi keselamatan jalan basah.',
      2: 'Instruktur memberikan dispensasi kelulusan bersyarat tanpa prosedur re-test resmi.'
    }
  },
  'REC-09': {
    ncIndices: [1],
    ncNotes: {
      1: 'Formulir verifikasi referensi kerja dan hasil spirometri paru 3 calon driver belum diunggah lengkap ke HRIS.'
    }
  },

  // SIKLUS 2: INDUKSI & PELATIHAN
  'ONB-02': {
    ncIndices: [0],
    ncNotes: {
      0: 'Tanda terima fisik buku saku Peraturan Perusahaan dan pakta integritas 3 operator plant Sukabumi belum diunggah ke HRIS.'
    }
  },
  'ONB-04': {
    ncIndices: [1, 2],
    ncNotes: {
      1: 'Ditemukan operator gudang TPS Karawang memiliki janggut tebal yang menekan silikon respirator (melanggar Clean-Shaven Policy).',
      2: 'Hasil smoke fit-test awal menunjukkan kebocoran uap akibat rambut wajah.'
    }
  },
  'ONB-06': {
    ncIndices: [0, 1, 2],
    ncNotes: {
      0: 'Simulasi tanggap darurat kebakaran Karawang belum menguji skenario pemadaman listrik total (black-out).',
      1: 'Waktu respon start otomatis pompa diesel cadangan 7 bar belum tercatat dalam berita acara.',
      2: 'Modul pengujian transfer daya darurat (ATS) belum terintegrasi ke SOP drill tahunan.'
    }
  },
  'ONB-07': {
    ncIndices: [0],
    ncNotes: {
      0: 'Kartu fisik lisensi K3 Pengemudi B3 untuk 2 driver rute Jawa Timur masih tertahan di loket BPTD Jabar (memegang suket sementara).'
    }
  },

  // SIKLUS 3: OPERASIONAL K3 & FASILITAS
  'K3-02': {
    ncIndices: [1],
    ncNotes: {
      1: 'Stok pengaman (buffer stock) sarung tangan nitril 15 mil di pos Karawang tersisa 6 pasang (di bawah batas minimum 30 pasang).'
    }
  },
  'K3-04': {
    ncIndices: [0, 2],
    ncNotes: {
      0: 'Jarak lorong antar-blok penyimpanan drum pelarut di Blok B Karawang terukur 1.4 meter (standar minimal 2 meter bebas hambatan).',
      2: 'Tanggul penampung tumpahan sekunder (bund-wall 110%) memerlukan pembersihan endapan sedimen lumpur oli.'
    }
  },
  'K3-07': {
    ncIndices: [0, 1],
    ncNotes: {
      0: 'Driver armada B-9122-DAS terpantau melaju > 4 jam kontinu tanpa jeda istirahat 30 menit pada rute Cilegon-Surabaya.',
      1: 'Sistem buzzer alarm pembatas otomatis telematika di kabin belum diaktifkan pada armada tersebut.'
    }
  },

  // SIKLUS 4: KOMPENSASI & KESEJAHTERAAN
  'CMP-02': {
    ncIndices: [0],
    ncNotes: {
      0: 'Rincian tunjangan bahaya kimia (hazard pay) belum diitemisasi terpisah pada slip gaji operator pengolahan oli Sukabumi bulan Agustus.'
    }
  },
  'CMP-05': {
    ncIndices: [0, 1, 2],
    ncNotes: {
      0: 'Tekanan debit air safety shower area distilasi reaktor oli Sukabumi hanya 0.8 bar (di bawah standar minimum 2.0 bar).',
      1: 'Durasi aliran pancuran air mandiri belum mencapai standar kontinu 15 menit.',
      2: 'Jarak tempuh eyewash terhalang tumpukan palet transit.'
    }
  },

  // SIKLUS 5: HUBUNGAN INDUSTRIAL & DISIPLIN
  'REL-02': {
    ncIndices: [0, 1],
    ncNotes: {
      0: 'Armada transporter B3 melintas di luar rute SK persetujuan Kemenhub saat menghindari kemacetan tanpa izin dispatcher.',
      1: 'Pemberitahuan deviasi rute darurat terlambat dilaporkan ke pos pengendali logistik pusat.'
    }
  },
  'REL-06': {
    ncIndices: [0, 1, 2],
    ncNotes: {
      0: 'Pemeriksaan kesehatan berkala (annual MCU) 3 operator reaktor daur ulang oli Sukabumi terlambat 2 bulan dari jadwal tahunan.',
      1: 'Panel toksikologi timbal darah (BLL) dan spirometri belum diserahkan ke rekam medis okupasi.',
      2: 'Evaluasi tren kebugaran tahunan belum ditandatangani dokter penanggung jawab pelayanan kesehatan kerja.'
    }
  },

  // SIKLUS 6: TERMINASI & EXIT MCU
  'TRM-01': {
    ncIndices: [0, 1, 2],
    ncNotes: {
      0: 'Exit MCU 2 mantan operator pengolahan limbah Karawang belum terlaksana sebelum tanggal pengakhiran hubungan kerja.',
      1: 'Tidak ada surat keterangan kelaikan kesehatan purna tugas dari dokter hiperkes perusahaan.',
      2: 'Potensi risiko tuntutan Penyakit Akibat Kerja (PAK) di masa mendatang belum terproteksi dokumen medis sah.'
    }
  },
  'TRM-02': {
    ncIndices: [0, 1],
    ncNotes: {
      0: 'Rincian perhitungan uang kompensasi PKWT terlambat disosialisasikan kepada 3 karyawan purna tugas (H-1 sebelum berakhir).',
      1: 'Tanda terima rincian perhitungan hak kompensasi belum ditandatangani lengkap oleh pekerja.'
    }
  },
  'TRM-06': {
    ncIndices: [0],
    ncNotes: {
      0: 'Penonaktifan akun login Festronik KLHK 1 staf administrasi transporter terlambat 48 jam pasca-surat pemberhentian (SLA < 24 jam).'
    }
  }
};

/**
 * Enriches a ChecklistItem with realistic, fully populated CriterionEvaluation objects.
 */
export function populateItemCriterionEvaluations(item: ChecklistItem): ChecklistItem {
  const criteria = item.verificationCriteria || [];
  if (criteria.length === 0) {
    return item;
  }

  // If already populated and has valid evaluated items, keep or return
  if (item.criterionEvaluations && item.criterionEvaluations.length === criteria.length) {
    const hasAnyEvaluated = item.criterionEvaluations.some(e => e.status !== 'UNCHECKED');
    if (hasAnyEvaluated) {
      return item;
    }
  }

  const findingConfig = SPECIFIC_FINDINGS_CRITERIA_MAP[item.code];

  if (item.status === 'COMPLIANT') {
    const evaluations: CriterionEvaluation[] = criteria.map((critText, idx) => ({
      criterionIndex: idx,
      criterionText: critText,
      status: 'COMPLIANT',
      notes: 'Sesuai dengan kriteria audit dan bukti fisik terverifikasi.'
    }));
    return {
      ...item,
      criterionEvaluations: evaluations
    };
  }

  if (item.status === 'MINOR_NC') {
    const ncIndices = findingConfig ? findingConfig.ncIndices : [0];
    const evaluations: CriterionEvaluation[] = criteria.map((critText, idx) => {
      const isNc = ncIndices.includes(idx);
      const note = isNc 
        ? (findingConfig?.ncNotes[idx] || item.notes || 'Terdapat 1 ketidaksesuaian minor pada parameter ini.') 
        : 'Sesuai dengan kriteria audit.';
      return {
        criterionIndex: idx,
        criterionText: critText,
        status: isNc ? 'NON_COMPLIANT' : 'COMPLIANT',
        notes: note
      };
    });
    return {
      ...item,
      criterionEvaluations: evaluations
    };
  }

  if (item.status === 'MAJOR_NC') {
    const ncIndices = findingConfig ? findingConfig.ncIndices : [0, 1].filter(i => i < criteria.length);
    const evaluations: CriterionEvaluation[] = criteria.map((critText, idx) => {
      const isNc = ncIndices.includes(idx);
      const note = isNc 
        ? (findingConfig?.ncNotes[idx] || item.notes || 'Ketidaksesuaian mayor: parameter ini belum memenuhi ketentuan regulasi.') 
        : 'Sesuai dengan kriteria audit.';
      return {
        criterionIndex: idx,
        criterionText: critText,
        status: isNc ? 'NON_COMPLIANT' : 'COMPLIANT',
        notes: note
      };
    });
    return {
      ...item,
      criterionEvaluations: evaluations
    };
  }

  if (item.status === 'CRITICAL_HAZARD') {
    const ncIndices = findingConfig ? findingConfig.ncIndices : [0, 1, 2].filter(i => i < criteria.length);
    const evaluations: CriterionEvaluation[] = criteria.map((critText, idx) => {
      const isNc = ncIndices.includes(idx);
      const note = isNc 
        ? (findingConfig?.ncNotes[idx] || item.notes || 'Temuan kritis: parameter proteksi keselamatan wajib segera diperbaiki.') 
        : 'Sesuai dengan kriteria audit.';
      return {
        criterionIndex: idx,
        criterionText: critText,
        status: isNc ? 'NON_COMPLIANT' : 'COMPLIANT',
        notes: note
      };
    });
    return {
      ...item,
      criterionEvaluations: evaluations
    };
  }

  // Default fallback for UNCHECKED
  const evaluations: CriterionEvaluation[] = criteria.map((critText, idx) => ({
    criterionIndex: idx,
    criterionText: critText,
    status: 'UNCHECKED',
    notes: ''
  }));

  return {
    ...item,
    criterionEvaluations: evaluations
  };
}
