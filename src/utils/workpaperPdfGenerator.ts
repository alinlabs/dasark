import { jsPDF } from 'jspdf';
import { ChecklistItem, CAPAItem, AuditSession } from '../types/audit';
import { STAGE_METADATA } from '../data/defaultAuditChecklist';

/**
 * Cache for company logo Base64
 */
let cachedLogoBase64: string | null = null;

export const loadLogoBase64 = async (): Promise<string | null> => {
  if (cachedLogoBase64) return cachedLogoBase64;
  try {
    const res = await fetch('/gambar/logo_das.png', {
      mode: 'cors',
      headers: { Accept: 'image/*' },
    });
    if (res.ok) {
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = typeof reader.result === 'string' ? reader.result : null;
          cachedLogoBase64 = result;
          resolve(result);
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    }
  } catch {
    // ignore
  }
  return null;
};

/**
 * Cache for Inter Font Base64 (Regular and Bold)
 */
let cachedInterFonts: { regular: string; bold: string } | null = null;

export const loadInterFonts = async (): Promise<{ regular: string; bold: string } | null> => {
  if (cachedInterFonts) return cachedInterFonts;
  try {
    const [regRes, boldRes] = await Promise.all([
      fetch('/fonts/Inter-Regular.ttf'),
      fetch('/fonts/Inter-Bold.ttf')
    ]);

    if (!regRes.ok || !boldRes.ok) return null;

    const [regBuf, boldBuf] = await Promise.all([
      regRes.arrayBuffer(),
      boldRes.arrayBuffer()
    ]);

    const toBase64 = (buf: ArrayBuffer): string => {
      let binary = '';
      const bytes = new Uint8Array(buf);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    };

    cachedInterFonts = {
      regular: toBase64(regBuf),
      bold: toBase64(boldBuf)
    };
    return cachedInterFonts;
  } catch (err) {
    console.warn('Inter font loading fallback to helvetica:', err);
    return null;
  }
};

const formatScopeLabel = (scope?: string) => {
  switch (scope) {
    case 'TRANSPORTER': return 'Armada Transporter Sabang-Merauke';
    case 'KARAWANG_PLANT': return 'Plant Karawang Barat (TPS & IPAL)';
    case 'SUKABUMI_PLANT': return 'Plant Sukabumi';
    default: return 'Seluruh Fasilitas & Unit Operasional DAS Group';
  }
};

const formatPeriodLabel = (period?: string) => {
  if (!period) return 'Bulanan';
  const u = period.toUpperCase();
  if (u === 'DAILY' || u === 'HARIAN') return 'Harian';
  if (u === 'MONTHLY' || u === 'BULANAN') return 'Bulanan';
  if (u === 'QUARTERLY' || u === 'TRIWULANAN') return 'Triwulanan';
  if (u === 'ANNUAL' || u === 'TAHUNAN') return 'Tahunan';
  if (u === 'WEEKLY' || u === 'MINGGUAN') return 'Mingguan';
  if (u === 'BIWEEKLY' || u === 'DWIMINGGUAN') return 'Dwi-Mingguan';
  return period;
};

const formatIndonesianDateOnly = (dateStr?: string): string => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  let d = new Date();
  if (dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      d = new Date(year, month, day);
    } else {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) d = parsed;
    }
  }

  const dateNum = String(d.getDate()).padStart(2, '0');
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dateNum} ${monthName} ${year}`;
};

const formatIndonesianFullDayDate = (dateStr?: string): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  let d = new Date();
  if (dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      d = new Date(year, month, day);
    } else {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) d = parsed;
    }
  }

  const dayName = days[d.getDay()];
  const dateNum = String(d.getDate()).padStart(2, '0');
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
};

const extractLegalBasisList = (item: ChecklistItem): string[] => {
  const result: string[] = [];

  if (item.legalHierarchy) {
    if (item.legalHierarchy.primaryLaw?.trim()) result.push(item.legalHierarchy.primaryLaw.trim());
    if (item.legalHierarchy.governmentReg?.trim()) result.push(item.legalHierarchy.governmentReg.trim());
    if (item.legalHierarchy.ministerialReg?.trim()) result.push(item.legalHierarchy.ministerialReg.trim());
  }

  if (item.legalBasis) {
    const splitItems = item.legalBasis
      .split(/(?:;|\n|\|)/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const s of splitItems) {
      if (!result.includes(s)) {
        result.push(s);
      }
    }
  }

  if (result.length === 0) {
    result.push('UU No. 1 Tahun 1970 tentang Keselamatan Kerja');
  }

  return result;
};

/**
 * Pristine Text-Based jsPDF Generator for Single Workpaper
 * Clean, card-free, prestigious editorial format using Inter font
 */
export const generateSingleWorkpaperPdf = (
  item: ChecklistItem,
  auditSession: AuditSession,
  capaItem?: CAPAItem,
  logoBase64?: string | null,
  interFonts?: { regular: string; bold: string } | null
): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let fontFamily = 'helvetica';

  // Register Inter Font if loaded
  if (interFonts?.regular && interFonts?.bold) {
    try {
      doc.addFileToVFS('Inter-Regular.ttf', interFonts.regular);
      doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
      doc.addFileToVFS('Inter-Bold.ttf', interFonts.bold);
      doc.addFont('Inter-Bold.ttf', 'Inter', 'bold');
      fontFamily = 'Inter';
    } catch {
      fontFamily = 'helvetica';
    }
  }

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let currentY = 14;
  let currentPage = 1;

  // Refined Executive Palette (RGB)
  const primaryNavy = [15, 23, 42];     // Slate 900
  const brandBlue = [30, 64, 175];      // Blue 800
  const secondarySlate = [71, 85, 105]; // Slate 600
  const borderLight = [226, 232, 240];  // Slate 200
  const borderDark = [148, 163, 184];   // Slate 400
  const textDark = [15, 23, 42];        // Slate 900
  const textMuted = [100, 116, 139];    // Slate 500

  const stageMeta = STAGE_METADATA.find(s => s.id === item.stage);

  // Helper for dynamic page breaks
  const standardPageTopMargin = 22; // Standar margin atas halaman lanjutan (aman dari staples/potongan)
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 20) {
      // Save current caller font state
      const curFont = doc.getFont();
      const curFontSize = doc.getFontSize();

      // Add running footer for current page
      doc.setFont(fontFamily, 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(
        `Kertas Kerja & Pemeriksaan Audit`,
        margin,
        pageHeight - 10
      );
      doc.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

      doc.addPage();
      currentPage++;
      currentY = standardPageTopMargin; // Halaman ke-2 dan seterusnya mulai dengan margin atas standar 22mm

      // Restore caller font settings
      doc.setFont(curFont.fontName, curFont.fontStyle);
      doc.setFontSize(curFontSize);
      doc.setLineHeightFactor(1.25);
    }
  };

  // ==========================================
  // 1. KOP SURAT RESMI (NO CARDS, CLEAN EDITORIAL)
  // ==========================================
  const headerStartY = currentY;
  const logoWidth = 22;
  const logoHeight = 14;

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', margin, headerStartY, logoWidth, logoHeight);
    } catch {
      doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
      doc.rect(margin, headerStartY, logoWidth, logoHeight, 'F');
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text('DAS', margin + logoWidth / 2, headerStartY + 8.5, { align: 'center' });
    }
  } else {
    doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.rect(margin, headerStartY, logoWidth, logoHeight, 'F');
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('DAS', margin + logoWidth / 2, headerStartY + 8.5, { align: 'center' });
  }

  // Header Title Text
  const textLeftX = margin + logoWidth + 4;
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(2, 125, 196); // Biru khas #027DC4
  doc.text('PT. DAME ALAM SEJAHTERA', textLeftX, headerStartY + 4);

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105); // Warna abu-abu netral (Slate-600)
  doc.text('KERTAS KERJA & PEMERIKSAAN AUDIT', textLeftX, headerStartY + 7.8);

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Transporter Sabang-Merauke • Plant Karawang Barat • Plant Sukabumi', textLeftX, headerStartY + 11.2);

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.text('Standar: PP 50/2012 (SMK3) • ISO 45001:2018 • Permenaker 05/2018', textLeftX, headerStartY + 14.5);

  // Right Side Header Metadata (Id Klausul, Tanggal, Dokumen, Nama - Clean Subtle Grey, No Prefixes)
  const metaRightX = pageWidth - margin;
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]); // Subtle professional slate-600

  // 1. Id Klausul
  doc.text(item.code, metaRightX, headerStartY + 4, { align: 'right' });

  // 2. Tanggal Audit (Format: 02 Agustus 2024 / 25 September 2026)
  const formattedHeaderDate = formatIndonesianDateOnly(auditSession.auditDate);
  doc.text(formattedHeaderDate, metaRightX, headerStartY + 7.5, { align: 'right' });

  // 3. Dokumen Code
  doc.text(auditSession.auditCode, metaRightX, headerStartY + 11.0, { align: 'right' });

  // 4. Nama Auditor
  doc.text(auditSession.auditorName || 'Alvareza H. Pratama, S.M', metaRightX, headerStartY + 14.5, { align: 'right' });

  currentY += 17.5;

  // Solid Crisp Primary Divider Line
  doc.setDrawColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8.5; // Berikan jarak lebih lapang dari garis kop header ke sub-judul

  // ==========================================
  // 2. OBJEK PEMERIKSAAN AUDIT & STATUS BADGE
  // ==========================================
  checkPageBreak(30);

  // 1) SUB-HEADER DOKUMEN: OBJEK PEMERIKSAAN AUDIT (Normal 11.5pt, Centered)
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('OBJEK PEMERIKSAAN AUDIT', pageWidth / 2, currentY, { align: 'center' });
  currentY += 7.5; // Jarak proporsional ke Judul Klausul Utama

  // 2) Main Title of Clause (Centered, bold 15.5pt)
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(15.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  const titleLines = doc.splitTextToSize(item.title, contentWidth - 10);
  titleLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, currentY, { align: 'center' });
    currentY += 6.2;
  });

  // 3) Full Color Status Badge (Binary: Memenuhi Standar Kriteria vs Tidak Memenuhi Standar Kriteria)
  let statusText = 'Tidak Memenuhi Standar Kriteria';
  let badgeBgColor = [220, 38, 38]; // red-600 (Semua kategori ketidaksesuaian/temuan)
  if (item.status === 'COMPLIANT') {
    statusText = 'Memenuhi Standar Kriteria';
    badgeBgColor = [22, 163, 74]; // green-600
  }

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  const badgeTextWidth = doc.getTextWidth(statusText);
  const badgeWidth = badgeTextWidth + 14;
  const badgeHeight = 6.6;
  const badgeX = (pageWidth - badgeWidth) / 2;
  const badgeY = currentY - 0.6; // Geser sedikit lebih ke atas agar proporsional dan pas

  // Draw full color pill/badge
  doc.setFillColor(badgeBgColor[0], badgeBgColor[1], badgeBgColor[2]);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 1.6, 1.6, 'F');

  // Draw white centered text inside badge
  doc.setTextColor(255, 255, 255);
  doc.text(statusText, pageWidth / 2, badgeY + badgeHeight / 2 + 1.15, { align: 'center' });
  currentY = badgeY + badgeHeight + 8.8; // Jarak diperluas agar Berita Acara lebih ke bawah dan lapang

  // 4) Berita Acara Hasil Audit & Clause Description (Justified, 11pt, 1.25 Spacing)
  const formattedAuditDayDate = formatIndonesianFullDayDate(auditSession.auditDate);
  const auditorPosition = auditSession.auditorRole 
    ? auditSession.auditorRole.replace(/\s*\(Reg\..*?\)/i, '').replace(/\s*\(SKP.*?\)/i, '').trim() 
    : 'Lead Auditor SMK3 & Lingkungan Hidup';
  const auditorAccount = `${auditSession.auditorName || 'Alvareza H. Pratama, S.M'} (${auditorPosition})`;
  const inspectionTimeStr = (item as any).inspectionTime || (item as any).timeSlot || '09:00 WIB';
  const formattedTime = inspectionTimeStr.includes('WIB') || inspectionTimeStr.includes('WITA') || inspectionTimeStr.includes('WIT') 
    ? inspectionTimeStr 
    : `${inspectionTimeStr} WIB`;

  const beritaAcaraHeader = `Berdasarkan Hasil Pemeriksaan Audit terhadap klausul : ${item.title} yang di lakukan oleh ${auditorAccount} pada ${formattedAuditDayDate} pukul ${formattedTime} memastikan bahwa :`;

  doc.setLineHeightFactor(1.25);
  const lineH11 = 4.85; // 11pt * 1.25 line spacing in mm

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);

  const headerLines = doc.splitTextToSize(beritaAcaraHeader, contentWidth);
  checkPageBreak(headerLines.length * lineH11 + 4);
  doc.text(beritaAcaraHeader, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += headerLines.length * lineH11 + 3;

  if (item.description) {
    const descLines = doc.splitTextToSize(item.description, contentWidth);
    checkPageBreak(descLines.length * lineH11 + 4);
    doc.text(item.description, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += descLines.length * lineH11 + 3;
  }

  // Kalimat penghubung narasi berita acara
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  const transitionText = 'Adapun ketentuan normatif dan rujukan regulasi yang menjadi landasan kepatuhan audit meliputi :';
  const transLines = doc.splitTextToSize(transitionText, contentWidth);
  checkPageBreak(transLines.length * lineH11 + 4);
  doc.text(transitionText, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += transLines.length * lineH11 + 3;

  // ==========================================
  // DASAR HUKUM & KONSEKUENSI YURIDIS
  // ==========================================
  checkPageBreak(20);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Dasar Hukum & Konsekuensi Yuridis', margin, currentY);
  currentY += lineH11 + 2;

  const legalList = extractLegalBasisList(item);

  legalList.forEach((law) => {
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text('•', margin + 1, currentY);

    const bulletWidth = contentWidth - 6;
    const valLines = doc.splitTextToSize(law, bulletWidth);
    const itemH = valLines.length * lineH11;
    checkPageBreak(itemH + 2);
    doc.text(law, margin + 6, currentY, { align: 'justify', maxWidth: bulletWidth });

    currentY += itemH + 2;
  });

  if (item.legalSanction) {
    currentY += 2;
    checkPageBreak(16);
    
    // Teks pengantar sanksi formal & tertata
    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
    const sanctionIntro = 'Dengan mempertimbangkan potensi dampak risiko kepatuhan dan konsekuensi yuridis / sanksi berupa :';
    const sancIntroLines = doc.splitTextToSize(sanctionIntro, contentWidth);
    checkPageBreak(sancIntroLines.length * lineH11 + 3);
    doc.text(sanctionIntro, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += sancIntroLines.length * lineH11 + 1.5;

    // Isi sanksi tebal berwarna hitam (tegas & formal, rata kanan-kiri)
    doc.setFont(fontFamily, 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const sancLines = doc.splitTextToSize(item.legalSanction, contentWidth);
    const sancH = sancLines.length * lineH11;
    checkPageBreak(sancH + 2);
    doc.text(item.legalSanction, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += sancH + 3.5;
  }

  // Kalimat penghubung sebelum langkah-langkah pengujian audit
  currentY += 1.5;
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  const procTransition = 'Berdasarkan landasan regulasi dan mitigasi risiko tersebut, proses pengujian audit dilaksanakan secara sistematis melalui tahapan prosedur berikut :';
  const procTransLines = doc.splitTextToSize(procTransition, contentWidth);
  checkPageBreak(procTransLines.length * lineH11 + 6);
  doc.text(procTransition, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += procTransLines.length * lineH11 + 3.5;

  // ==========================================
  // LANGKAH-LANGKAH PENGUJIAN AUDIT
  // ==========================================
  if (item.auditSteps && item.auditSteps.length > 0) {
    checkPageBreak(20);
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text('Langkah-Langkah Pengujian Audit (Audit Procedures)', margin, currentY);
    currentY += lineH11 + 2;

    item.auditSteps.forEach((step, idx) => {
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(11);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const prefix = `${idx + 1}.`;
      doc.text(prefix, margin + 1, currentY);

      const stepWidth = contentWidth - 7;
      const stepLines = doc.splitTextToSize(step, stepWidth);
      const stepH = stepLines.length * lineH11;

      checkPageBreak(stepH + 2);
      doc.text(step, margin + 7, currentY, { align: 'justify', maxWidth: stepWidth });
      currentY += stepH + 2.5;
    });

    currentY += 2;
  }

  // ==========================================
  // TABEL KRITERIA VERIFIKASI & EVALUASI
  // ==========================================
  if (item.verificationCriteria && item.verificationCriteria.length > 0) {
    // Kalimat pengantar formulir checklist / work paper yang profesional
    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
    const checklistTransition = 'Berdasarkan pelaksanaan prosedur pengujian di atas, hasil evaluasi dan verifikasi kepatuhan terhadap kriteria audit dituangkan dalam tabel berikut :';
    const checklistTransLines = doc.splitTextToSize(checklistTransition, contentWidth);
    checkPageBreak(checklistTransLines.length * lineH11 + 14);
    doc.text(checklistTransition, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += checklistTransLines.length * lineH11 + 4.5;

    // Table Column Widths (3 Kolom: NO, KRITERIA, STATUS)
    const colWNo = 12;
    const colWStatus = 24;
    const colWReq = contentWidth - colWNo - colWStatus; // ~146mm

    // Table Header (Modern Financial Statement Style with Vibrant Blue & Crisp Thin Borders)
    const headerHeight = 6.8;
    checkPageBreak(headerHeight + 10);
    
    doc.setFillColor(37, 99, 235); // Tailwind Blue-600 #2563eb
    doc.setDrawColor(203, 213, 225); // Modern Slate-300 Thin Border
    doc.setLineWidth(0.2);
    doc.rect(margin, currentY, contentWidth, headerHeight, 'FD');

    // Header vertical dividers (Thin hairline)
    doc.line(margin + colWNo, currentY, margin + colWNo, currentY + headerHeight);
    doc.line(margin + colWNo + colWReq, currentY, margin + colWNo + colWReq, currentY + headerHeight);

    // Header Titles (Perfect Vertical Centering)
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    const headerTextY = currentY + headerHeight / 2 + 1.2;
    doc.text('NO', margin + colWNo / 2, headerTextY, { align: 'center' });
    doc.text('KRITERIA', margin + colWNo + colWReq / 2, headerTextY, { align: 'center' });
    doc.text('STATUS', margin + colWNo + colWReq + colWStatus / 2, headerTextY, { align: 'center' });
    currentY += headerHeight;

    // Table Rows with Central Vertical Gravity and Modern Bank-Statement Thin Hairlines
    item.verificationCriteria.forEach((critText, idx) => {
      const evalObj = item.criterionEvaluations?.find(e => e.criterionIndex === idx);
      const isCompliant = evalObj?.status === 'COMPLIANT';
      const isNonCompliant = evalObj?.status === 'NON_COMPLIANT';

      const noteContent = evalObj?.notes?.trim();
      const hasNote = Boolean(noteContent && noteContent !== '' && noteContent !== '—');

      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(7.5);
      const reqLines = doc.splitTextToSize(critText, colWReq - 7);
      const reqHeight = (reqLines.length - 1) * 3.6;

      let noteLines: string[] = [];
      let noteBlockHeight = 0;
      if (hasNote && noteContent) {
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(7);
        noteLines = doc.splitTextToSize(noteContent, colWReq - 7);
        // Label line + gap + note lines
        noteBlockHeight = 3.6 + 1.2 + ((noteLines.length - 1) * 3.3);
      }

      // Total content block height for vertical centering calculation
      const totalBlockHeight = reqHeight + (hasNote ? (noteBlockHeight + 3.2) : 0);
      const rowHeight = Math.max(7.2, totalBlockHeight + 5.2);
      checkPageBreak(rowHeight);

      // Alternating background: Row 0 pure white, Row 1 subtle ultra-light tint
      const isEven = idx % 2 === 0;
      if (isEven) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(248, 250, 252); // slate-50 subtle tint
      }

      doc.setDrawColor(203, 213, 225); // Slate-300 modern hairline outline
      doc.setLineWidth(0.18);
      doc.rect(margin, currentY, contentWidth, rowHeight, 'FD');

      // Vertical column cell dividers (Thin hairline)
      doc.line(margin + colWNo, currentY, margin + colWNo, currentY + rowHeight);
      doc.line(margin + colWNo + colWReq, currentY, margin + colWNo + colWReq, currentY + rowHeight);

      // 1. Column NO (Perfect Vertical & Horizontal Central Gravity)
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(`${idx + 1}`, margin + colWNo / 2, currentY + rowHeight / 2 + 1.2, { align: 'center' });

      // 2. Column KRITERIA (Perfect Vertical Central Gravity)
      const blockStartY = currentY + (rowHeight - totalBlockHeight) / 2 + 0.8;

      // Criterion text
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(reqLines, margin + colWNo + 3.5, blockStartY);

      // Optional Catatan Khusus block (Vertically grouped inside cell)
      if (hasNote && noteContent) {
        const labelY = blockStartY + reqHeight + 3.4;
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(7);
        doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
        doc.text('Catatan Khusus :', margin + colWNo + 3.5, labelY);

        const noteContentY = labelY + 3.3;
        doc.text(noteLines, margin + colWNo + 3.5, noteContentY);
      }

      // 3. Column STATUS (Perfect Vertical & Horizontal Central Gravity)
      const statusCenterX = margin + colWNo + colWReq + colWStatus / 2;
      const statusCenterY = currentY + rowHeight / 2 + 1.2;

      if (isNonCompliant) {
        // Direct clean bold X
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text('X', statusCenterX, statusCenterY, { align: 'center' });
      } else if (isCompliant) {
        // Direct clean bold ✓
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(22, 101, 52);
        doc.text('✓', statusCenterX, statusCenterY, { align: 'center' });
      } else {
        // Modern slim square box □
        const boxSize = 4.2;
        const boxTop = currentY + (rowHeight - boxSize) / 2;
        const boxLeft = statusCenterX - boxSize / 2;
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(148, 163, 184); // Slate-400 thin border
        doc.setLineWidth(0.25);
        doc.rect(boxLeft, boxTop, boxSize, boxSize, 'FD');
      }

      currentY += rowHeight;
    });

    currentY += 8; // 1 baris kosong pemisah setelah tabel kriteria
  }

  // ==========================================
  // NARASI KESIMPULAN HASIL PEMERIKSAAN KLAUSUL (FULL-WIDTH CARD)
  // ==========================================
  const isClauseCompliant = item.status === 'COMPLIANT';
  let conclusionCategoryLabel = 'Minor';
  if (item.status === 'MAJOR_NC') {
    conclusionCategoryLabel = 'Mayor';
  } else if (item.status === 'CRITICAL_HAZARD') {
    conclusionCategoryLabel = 'Kritis';
  }

  const ncCount = (item.criterionEvaluations || []).filter(e => e.status === 'NON_COMPLIANT').length || (isClauseCompliant ? 0 : 1);

  const clauseStatement = `Klausul : ${item.title} Dinyatakan ${isClauseCompliant ? 'Memenuhi' : 'Tidak Memenuhi'} Standar Kriteria`;
  const ncDetailLine = !isClauseCompliant 
    ? `Ditemukan sebanyak ${ncCount} Non Conformity sehingga dikategorikan sebagai ${conclusionCategoryLabel} yang perlu di tindak lanjuti` 
    : '';

  const cardPadX = 4;
  const cardPadY = 3.2;
  const cardTextWidth = contentWidth - (cardPadX * 2);

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  const clauseLines = doc.splitTextToSize(clauseStatement, cardTextWidth);
  const cardLineH = 4.5;
  
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(9.5);
  const ncLines = ncDetailLine ? doc.splitTextToSize(ncDetailLine, cardTextWidth) : [];
  const ncLineH = 3.8;

  const cardContentHeight = (clauseLines.length * cardLineH) + (ncLines.length > 0 ? (ncLines.length * ncLineH + 1.8) : 0);
  const cardHeight = cardContentHeight + (cardPadY * 2) - 0.5;

  const totalConclusionBlockHeight = 2.2 + cardHeight + 8;
  checkPageBreak(totalConclusionBlockHeight);

  // Render Header Intro
  doc.setLineHeightFactor(1.25);
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Hasil dari pemeriksaan dan evaluasi audit menunjukkan bahwa :', margin, currentY);
  currentY += 2.2; // Jarak rapat & proporsional langsung di bawah teks pengantar

  // Render Full-Width Card (Green if Compliant, Red if Not Compliant)
  const cardBgColor = isClauseCompliant ? [22, 163, 74] : [220, 38, 38];
  doc.setFillColor(cardBgColor[0], cardBgColor[1], cardBgColor[2]);
  doc.roundedRect(margin, currentY, contentWidth, cardHeight, 1.8, 1.8, 'F');

  // Draw crisp white bold text inside card
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  const textStartY = currentY + cardPadY + 3.2;
  doc.text(clauseLines, margin + cardPadX, textStartY, { maxWidth: cardTextWidth });

  // Render NC Details inside card with 9.5pt normal font
  if (ncLines.length > 0) {
    const ncStartY = textStartY + (clauseLines.length * cardLineH) + 1.2;
    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(ncLines, margin + cardPadX, ncStartY, { maxWidth: cardTextWidth });
  }

  currentY += cardHeight + 8; // Diberikan 1 baris kosong (8mm) sebelum bagian catatan auditor

  // 1) Catatan Auditor (Keep Intro + Body together)
  const notesText = item.notes && item.notes.trim() ? item.notes.trim() : 'Tidak ada catatan observasi khusus.';
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  const noteLines = doc.splitTextToSize(notesText, contentWidth);
  const totalNotesBlockHeight = (1 + noteLines.length) * lineH11 + 1.5 + 3.5;
  checkPageBreak(totalNotesBlockHeight);

  doc.setLineHeightFactor(1.25);
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Temuan tersebut diperkuat oleh catatan observasi auditor yang menyatakan :', margin, currentY);
  currentY += lineH11 + 1.5;

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(notesText, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += noteLines.length * lineH11 + 3.5;

  // 2) Bukti Lampiran Dokumen/Gambar (Keep Intro + Body together)
  const attachmentNames = item.attachments && item.attachments.length > 0
    ? item.attachments.map(a => a.name).join(', ')
    : 'Tidak ada lampiran dokumen atau berkas fisik khusus.';
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  const attLines = doc.splitTextToSize(attachmentNames, contentWidth);
  const totalAttBlockHeight = (1 + attLines.length) * lineH11 + 1.5 + 3.5;
  checkPageBreak(totalAttBlockHeight);

  doc.setLineHeightFactor(1.25);
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Serta didukung dengan bukti objektif dan lampiran dokumen berupa :', margin, currentY);
  currentY += lineH11 + 1.5;

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(attachmentNames, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += attLines.length * lineH11 + 5;

  // ==========================================
  // CLOSING LAPORAN & TANDA TANGAN ELEKTRONIK
  // ==========================================
  const closingText = 'Demikian kertas kerja pemeriksaan audit ini disusun berdasarkan fakta dan temuan objektif di lapangan sesuai dengan standar tata kelola kepatuhan yang berlaku, serta disepakati bersama oleh pihak auditor dan perwakilan manajemen untuk ditindaklanjuti sebagaimana mestinya.';
  
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  const closingLines = doc.splitTextToSize(closingText, contentWidth);
  const totalClosingAndSignHeight = (closingLines.length * lineH11) + 8 + 35; // closing + gap + taller signature box
  
  checkPageBreak(totalClosingAndSignHeight);

  doc.setLineHeightFactor(1.25);
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text(closingText, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += closingLines.length * lineH11 + 8; // 1 baris kosong pemisah sebelum area TTD

  // Signatures (Langsung TTD tanpa judul pengesahan, area lebih tinggi & leluasa)
  const sigColW = contentWidth / 2;

  // Left Signature: Lead Auditor
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Lead Auditor K3 & Legal Perusahaan:', margin + sigColW / 2, currentY, { align: 'center' });

  // Electronic Verification watermark (very subtle & light)
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(175, 185, 198); // Ultra subtle slate
  doc.text('[ Terverifikasi Berita Acara Elektronik ]', margin + sigColW / 2, currentY + 16, { align: 'center' });

  // Name
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(auditSession.auditorName, margin + sigColW / 2, currentY + 24, { align: 'center' });

  // Position only (1 line)
  const cleanAuditorRole = (auditSession.auditorRole || 'Lead Auditor SMK3 & Lingkungan Hidup')
    .replace(/\s*\(.*?\)/g, '')
    .trim();
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text(cleanAuditorRole, margin + sigColW / 2, currentY + 29.5, { align: 'center' });

  // Right Signature: Plant Manager / Facility Rep
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Perwakilan Manajemen Unit / Plant:', margin + sigColW + sigColW / 2, currentY, { align: 'center' });

  // Electronic Verification watermark (very subtle & light)
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(175, 185, 198); // Ultra subtle slate
  doc.text('[ Terverifikasi Berita Acara Elektronik ]', margin + sigColW + sigColW / 2, currentY + 16, { align: 'center' });

  // Name
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Bambang Suryono, S.T.', margin + sigColW + sigColW / 2, currentY + 24, { align: 'center' });

  // Position only (1 line)
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('HSE & Plant Manager', margin + sigColW + sigColW / 2, currentY + 29.5, { align: 'center' });

  currentY += 35;

  // Final Page Running Footer
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Kertas Kerja & Pemeriksaan Audit`,
    margin,
    pageHeight - 10
  );
  doc.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

  return doc;
};
