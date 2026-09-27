import { ChecklistItem } from '../../types/audit';

export const headStyleMap: Record<string, { bg: string; subText: string; titleText: string }> = {
  COMPLIANT: {
    bg: 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-500',
    subText: 'text-emerald-100',
    titleText: 'text-white'
  },
  MINOR_NC: {
    bg: 'bg-gradient-to-r from-amber-500 via-amber-500 to-orange-400',
    subText: 'text-amber-100',
    titleText: 'text-white'
  },
  MAJOR_NC: {
    bg: 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500',
    subText: 'text-orange-100',
    titleText: 'text-white'
  },
  CRITICAL_HAZARD: {
    bg: 'bg-gradient-to-r from-rose-600 via-rose-600 to-red-500',
    subText: 'text-rose-100',
    titleText: 'text-white'
  },
  NOT_APPLICABLE: {
    bg: 'bg-gradient-to-r from-slate-600 via-slate-600 to-slate-500',
    subText: 'text-slate-200',
    titleText: 'text-white'
  },
  NOT_EVALUATED: {
    bg: 'bg-gradient-to-r from-slate-700 via-slate-700 to-slate-600',
    subText: 'text-slate-200',
    titleText: 'text-white'
  }
};

export const riskConfig: Record<string, { label: string; desc: string }> = {
  CRITICAL: {
    label: 'Kritis (Critical / Fatal)',
    desc: 'Berdampak langsung pada keselamatan jiwa, tuntutan hukum pidana, atau penutupan operasi.'
  },
  HIGH: {
    label: 'Tinggi (High / Major)',
    desc: 'Dapat menimbulkan insiden serius, kerusakan lingkungan berat, atau denda administratif besar.'
  },
  MEDIUM: {
    label: 'Sedang (Medium / Minor)',
    desc: 'Ketidakpatuhan sistematis atau kegagalan prosedur administratif tanpa dampak fisik langsung.'
  },
  LOW: {
    label: 'Rendah (Low / Observation)',
    desc: 'Penyimpangan dokumentasi minor atau peluang peningkatan efisiensi kerja (observasi).'
  }
};

export const scopeConfig: Record<string, { label: string; desc: string }> = {
  ALL: {
    label: 'Semua Lini Operasional',
    desc: 'Berlaku universal di seluruh lini bisnis DAS Group (Transporter, Plant Karawang, & Plant Sukabumi).'
  },
  TRANSPORTER: {
    label: 'Transporter Sabang-Merauke',
    desc: 'Berfokus khusus pada armada tangki B3, keselamatan jalan raya, lisensi driver, dan perizinan jalan.'
  },
  KARAWANG_PLANT: {
    label: 'Plant Karawang (Pengumpul & Pusat)',
    desc: 'Berlaku di gudang penyimpanan sementara, penanganan segregasi bahan bakar, dan sistem hydrant.'
  },
  SUKABUMI_PLANT: {
    label: 'Plant Sukabumi (Pemanfaat & De-watering)',
    desc: 'Berlaku di fasilitas pemanfaatan akhir, re-refining pelumas bekas, de-watering, dan pengeringan sludge.'
  }
};

export const getFallbackPeriod = (itm: ChecklistItem): 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONCE' => {
  if (itm.auditPeriod) return itm.auditPeriod;
  
  const titleLower = itm.title.toLowerCase();
  const descLower = itm.description.toLowerCase();
  const idLower = itm.id.toLowerCase();
  
  if (
    titleLower.includes('daily') || 
    titleLower.includes('harian') || 
    descLower.includes('setiap shift') || 
    descLower.includes('setiap hari') ||
    descLower.includes('fit-to-work')
  ) {
    return 'DAILY';
  }
  
  if (
    titleLower.includes('annual') || 
    titleLower.includes('tahunan') || 
    descLower.includes('30 tahun') || 
    descLower.includes('setahun sekali') ||
    idLower.includes('ter-02') ||
    idLower.includes('rel-06')
  ) {
    return 'ANNUAL';
  }

  if (
    titleLower.includes('triwulan') || 
    titleLower.includes('3 bulan') || 
    titleLower.includes('quarterly') || 
    descLower.includes('tiga bulan') ||
    idLower.includes('rel-03')
  ) {
    return 'QUARTERLY';
  }

  if (
    titleLower.includes('onboarding') || 
    titleLower.includes('rekrutmen') || 
    titleLower.includes('awal kerja') || 
    descLower.includes('sebelum bekerja') ||
    idLower.startsWith('rec-') ||
    idLower.startsWith('onb-')
  ) {
    return 'ONCE';
  }
  
  return 'MONTHLY';
};

export const periodConfig: Record<string, { label: string; desc: string }> = {
  DAILY: {
    label: 'Harian (Daily / Shift)',
    desc: 'Wajib diverifikasi setiap shift atau harian oleh HSE Officer / Supervisor Lapangan.'
  },
  MONTHLY: {
    label: 'Bulanan (Monthly Check)',
    desc: 'Ditinjau secara berkala setiap akhir bulan oleh HSE Coordinator & Manajer Operasional.'
  },
  QUARTERLY: {
    label: '3 Bulanan (Quarterly Review)',
    desc: 'Evaluasi triwulan terstruktur oleh Komite P2K3 & Kepala Teknik Lingkungan.'
  },
  ANNUAL: {
    label: 'Tahunan (Annual Audit)',
    desc: 'Audit komprehensif tahunan, uji laboratorium pihak ketiga, atau re-sertifikasi eksternal.'
  },
  ONCE: {
    label: 'Sekali Saja (Onboarding / Initial)',
    desc: 'Verifikasi sekali saja di awal masa kerja karyawan atau saat pendaftaran awal aset.'
  }
};

/**
 * Format timestamp into Indonesian format:
 * "Diperbaharui pada XX Jun 2024 Pukul 10:00 WIB"
 */
export function formatLastUpdatedIndonesian(dateStr?: string): string {
  const rawDate = dateStr ? new Date(dateStr) : new Date('2026-09-25T10:00:00+07:00');
  const date = isNaN(rawDate.getTime()) ? new Date('2026-09-25T10:00:00+07:00') : rawDate;

  try {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(date);
    const partMap: Record<string, string> = {};
    parts.forEach(p => { partMap[p.type] = p.value; });

    const day = partMap.day || String(date.getDate()).padStart(2, '0');
    let month = partMap.month ? partMap.month.replace(/\./g, '') : 'Sep';
    if (month.length > 3) month = month.substring(0, 3);
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    const year = partMap.year || String(date.getFullYear());
    const hour = partMap.hour || String(date.getHours()).padStart(2, '0');
    const minute = partMap.minute || String(date.getMinutes()).padStart(2, '0');

    return `Diperbaharui pada ${day} ${month} ${year} Pukul ${hour}:${minute} WIB`;
  } catch (e) {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Diperbaharui pada ${day} ${month} ${year} Pukul ${hours}:${minutes} WIB`;
  }
}
