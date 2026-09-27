import { jsPDF } from 'jspdf';
import { CAPAItem, ChecklistItem, AuditSession } from '../types/audit';
import { loadLogoBase64, loadInterFonts } from './workpaperPdfGenerator';
import { 
  formatCapaDateOnly, 
  formatCapaDateTime, 
  calculateDurationLeadTime 
} from './capaAutoStatus';

export { loadLogoBase64, loadInterFonts };

/**
 * Pristine Text-Based jsPDF Generator for Single CAPA
 * Focused on detailed response, 5-Why root cause investigation, corrective & preventive actions,
 * evidence fulfillment verification, lead time, and auditor sign-off.
 */
export const generateSingleCapaPdf = (
  capa: CAPAItem,
  auditSession: AuditSession,
  workPaperItem?: ChecklistItem | null,
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
  const textDark = [15, 23, 42];        // Slate 900
  const textMuted = [100, 116, 139];    // Slate 500

  // Helper for dynamic page breaks
  const standardPageTopMargin = 22;
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 20) {
      const curFont = doc.getFont();
      const curFontSize = doc.getFontSize();

      // Add running footer for current page
      doc.setFont(fontFamily, 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(
        `Laporan Tindakan Perbaikan & Pencegahan (CAPA) • PT. Dame Alam Sejahtera`,
        margin,
        pageHeight - 10
      );
      doc.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

      doc.addPage();
      currentPage++;
      currentY = standardPageTopMargin;

      // Restore caller font settings
      doc.setFont(curFont.fontName, curFont.fontStyle);
      doc.setFontSize(curFontSize);
      doc.setLineHeightFactor(1.25);
    }
  };

  // ==========================================
  // 1. KOP SURAT RESMI (DAS GROUP EXECUTIVE)
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
  doc.text('LAPORAN TINDAKAN PERBAIKAN & PENCEGAHAN (CAPA)', textLeftX, headerStartY + 7.8);

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Transporter Sabang-Merauke • Plant Karawang Barat • Plant Sukabumi', textLeftX, headerStartY + 11.2);

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.text('Standar: PP 50/2012 (SMK3) • ISO 45001:2018 • Permenaker 05/2018', textLeftX, headerStartY + 14.5);

  // Right Side Header Metadata
  const metaRightX = pageWidth - margin;
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);

  // 1. Nomor / Kode Temuan CAPA
  doc.text(`CAPA: ${capa.findingCode}`, metaRightX, headerStartY + 4, { align: 'right' });

  // 2. Tanggal Diterbitkan / Dibuat
  const formattedCreatedDate = formatCapaDateOnly(capa.createdAt);
  doc.text(`Terbit: ${formattedCreatedDate}`, metaRightX, headerStartY + 7.5, { align: 'right' });

  // 3. Batas Waktu (Due Date)
  const formattedDueDate = formatCapaDateOnly(capa.dueDate);
  doc.text(`Batas: ${formattedDueDate}`, metaRightX, headerStartY + 11.0, { align: 'right' });

  // 4. Kode Sesi Audit
  doc.text(auditSession.auditCode, metaRightX, headerStartY + 14.5, { align: 'right' });

  currentY += 17.5;

  // Solid Crisp Primary Divider Line
  doc.setDrawColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8.5;

  // ==========================================
  // 2. SUB-HEADER & OBJEK TEMUAN CAPA
  // ==========================================
  checkPageBreak(30);

  // Sub-header title
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('RESPON & TINDAKAN PENANGGULANGAN KETIDAKSESUAIAN (CAPA)', pageWidth / 2, currentY, { align: 'center' });
  currentY += 7.5;

  // Main Finding Title (Bold 15.5pt, centered)
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(15.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  const titleLines = doc.splitTextToSize(capa.findingTitle, contentWidth - 10);
  titleLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, currentY, { align: 'center' });
    currentY += 6.2;
  });

  // Status & Severity Badge
  let statusText = 'Buka (Menunggu Tindak Lanjut)';
  let badgeBgColor = [225, 29, 72]; // rose-600
  if (capa.status === 'VERIFIED') {
    statusText = 'Terverifikasi Auditor (Close)';
    badgeBgColor = [22, 163, 74]; // green-600
  } else if (capa.status === 'RESOLVED') {
    statusText = 'Selesai (Menunggu Verifikasi)';
    badgeBgColor = [37, 99, 235]; // blue-600
  } else if (capa.status === 'IN_PROGRESS') {
    statusText = 'Sedang Dikerjakan (In Progress)';
    badgeBgColor = [234, 88, 12]; // orange-600
  }

  const severityLabel = capa.severity === 'CRITICAL' ? 'Tingkat Kritis' : capa.severity === 'MAJOR' ? 'Tingkat Mayor' : 'Tingkat Minor';
  const fullBadgeLabel = `${statusText} • ${severityLabel}`;

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  const badgeTextWidth = doc.getTextWidth(fullBadgeLabel);
  const badgeWidth = badgeTextWidth + 14;
  const badgeHeight = 6.6;
  const badgeX = (pageWidth - badgeWidth) / 2;
  const badgeY = currentY - 0.6;

  // Draw full color pill/badge
  doc.setFillColor(badgeBgColor[0], badgeBgColor[1], badgeBgColor[2]);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 1.6, 1.6, 'F');

  // Draw white centered text inside badge
  doc.setTextColor(255, 255, 255);
  doc.text(fullBadgeLabel, pageWidth / 2, badgeY + badgeHeight / 2 + 1.15, { align: 'center' });
  currentY = badgeY + badgeHeight + 8.8;

  // ==========================================
  // 3. BERITA ACARA RESPON & KOMITMEN PERBAIKAN
  // ==========================================
  const lineH11 = 4.85;
  doc.setLineHeightFactor(1.25);

  const picMatch = capa.pic ? capa.pic.match(/^(.*?)(?:\s*\((.*?)\))?$/) : null;
  const picNameOnly = picMatch ? picMatch[1].trim() : (capa.pic || 'Penanggung Jawab Terkait');
  const picRoleOnly = picMatch && picMatch[2] ? picMatch[2].trim() : 'Unit Operasional Terkait';

  const beritaAcaraHeader = `Berdasarkan temuan ketidaksesuaian pada klausul : ${capa.findingTitle} (Kategori: ${capa.category}), pihak Penanggung Jawab Tindakan Perbaikan ${picNameOnly} (${picRoleOnly}) bersama manajemen operasional DAS Group telah melakukan investigasi mendalam terhadap akar masalah dan menetapkan rencana tindak lanjut perbaikan serta pencegahan secara komprehensif sebagai berikut :`;

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);

  const headerLines = doc.splitTextToSize(beritaAcaraHeader, contentWidth);
  checkPageBreak(headerLines.length * lineH11 + 4);
  doc.text(beritaAcaraHeader, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += headerLines.length * lineH11 + 4;

  // ==========================================
  // 4. TIMELINE & LEAD TIME PENGERJAAN CAPA
  // ==========================================
  checkPageBreak(32);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Informasi Penanggung Jawab & Siklus Waktu Pengerjaan (Lead Time)', margin, currentY);
  currentY += lineH11 + 2;

  // Balanced 2-Column Info Grid spanning full content width (182mm)
  const colGap = 6;
  const infoColW = (contentWidth - colGap) / 2; // 88mm
  const col1X = margin;
  const col2X = margin + infoColW + colGap;

  const leadTimeDuration = calculateDurationLeadTime(capa.createdAt, capa.resolvedAt || (capa.status === 'VERIFIED' ? capa.verifiedAt : undefined));

  const infoRows = [
    {
      left: { label: 'Penanggung Jawab (PIC):', value: `${picNameOnly} (${picRoleOnly})` },
      right: { label: 'Target Batas Waktu (Due Date):', value: formatCapaDateOnly(capa.dueDate) }
    },
    {
      left: { label: 'Tanggal Diterbitkan (Issued):', value: formatCapaDateTime(capa.createdAt) },
      right: { label: 'Mulai Pengerjaan (In Progress):', value: capa.inProgressAt ? formatCapaDateTime(capa.inProgressAt) : 'Menunggu instruksi kerja' }
    },
    {
      left: { label: 'Tanggal Selesai (Resolved):', value: capa.resolvedAt ? formatCapaDateTime(capa.resolvedAt) : (capa.status === 'VERIFIED' ? formatCapaDateTime(capa.verifiedAt) : 'Dalam proses perbaikan') },
      right: { label: 'Total Lead Time Pengerjaan:', value: leadTimeDuration }
    }
  ];

  infoRows.forEach((row) => {
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(9);
    const leftValLines = doc.splitTextToSize(row.left.value, infoColW);
    const rightValLines = doc.splitTextToSize(row.right.value, infoColW);

    const leftHeight = 4.0 + (leftValLines.length * 3.8);
    const rightHeight = 4.0 + (rightValLines.length * 3.8);
    const rowHeight = Math.max(leftHeight, rightHeight) + 2.8;

    checkPageBreak(rowHeight + 2);

    // Left Column
    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
    doc.text(row.left.label, col1X, currentY);

    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(leftValLines, col1X, currentY + 4.0);

    // Right Column
    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
    doc.text(row.right.label, col2X, currentY);

    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(rightValLines, col2X, currentY + 4.0);

    currentY += rowHeight;
  });

  currentY += 2;

  // ==========================================
  // 5. INVESTIGASI AKAR MASALAH
  // ==========================================
  const questions = capa.rootCause5Why || [];
  const stepDetails = capa.rootCause5WhyDetails || {};

  checkPageBreak(25);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Investigasi Akar Masalah', margin, currentY);
  currentY += lineH11 + 2;

  // Intro text
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  const whyIntro = 'Investigasi dilakukan secara mendalam dan sistematis untuk menemukan faktor penyebab fundamental di lapangan :';
  const whyIntroLines = doc.splitTextToSize(whyIntro, contentWidth);
  checkPageBreak(whyIntroLines.length * lineH11 + 4);
  doc.text(whyIntro, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += whyIntroLines.length * lineH11 + 3;

  // Render Investigation Steps with Full Details (Question, Metode, Temuan, Oleh)
  if (questions.length > 0) {
    questions.forEach((qText, idx) => {
      const detail = stepDetails[idx];
      const hasDetail = Boolean(detail && (detail.basedOn || detail.answer || detail.by));

      const innerPadX = 5;
      const innerPadY = 3.5;
      const labelColW = 18; // Width for "Metode :", "Temuan :", "Oleh :"
      const valColX = margin + innerPadX + labelColW;
      const valColW = contentWidth - (innerPadX * 2) - labelColW;
      const subLineH = 3.6;
      const rowGap = 1.8;

      // 1. Question Title (Strip "Mengapa 1:", "Why 1:", etc.)
      const cleanQText = qText.replace(/^(?:mengapa|why)\s*\d*\s*:\s*/i, '').trim();
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(9.5);
      const qLines = doc.splitTextToSize(cleanQText, contentWidth - (innerPadX * 2));
      const qLineH = 4.2;
      const qBlockH = qLines.length * qLineH;

      // 2. Sub-fields (Metode, Temuan, Oleh)
      let metodeLines: string[] = [];
      let temuanLines: string[] = [];
      let olehLines: string[] = [];

      if (hasDetail && detail) {
        if (detail.basedOn && detail.basedOn.trim()) {
          doc.setFont(fontFamily, 'normal');
          doc.setFontSize(8);
          metodeLines = doc.splitTextToSize(detail.basedOn.trim(), valColW);
        }
        if (detail.answer && detail.answer.trim()) {
          doc.setFont(fontFamily, 'normal');
          doc.setFontSize(8);
          temuanLines = doc.splitTextToSize(detail.answer.trim(), valColW);
        }
        if (detail.by && detail.by.trim()) {
          doc.setFont(fontFamily, 'normal');
          doc.setFontSize(8);
          olehLines = doc.splitTextToSize(detail.by.trim(), valColW);
        }
      }

      // Compute exact total card height so there is zero dangling space
      const titleToDetailsGap = 3.2; // Extra comfortable breathing room between question title and sub-fields
      let detailsHeight = 0;
      if (metodeLines.length > 0) {
        detailsHeight += (metodeLines.length * subLineH) + rowGap;
      }
      if (temuanLines.length > 0) {
        detailsHeight += (temuanLines.length * subLineH) + rowGap;
      }
      if (olehLines.length > 0) {
        detailsHeight += (olehLines.length * subLineH) + rowGap;
      }

      const totalCardH = innerPadY + qBlockH + (detailsHeight > 0 ? (titleToDetailsGap + detailsHeight - rowGap) : 0) + innerPadY;

      checkPageBreak(totalCardH + 3);

      // Card / Box for each investigation step
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, currentY, contentWidth, totalCardH, 1.2, 1.2, 'FD');

      // Draw Question Title
      let drawY = currentY + innerPadY + 3.2;
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
      doc.text(qLines, margin + innerPadX, drawY);
      drawY += (qLines.length - 1) * qLineH + 4.2 + titleToDetailsGap;

      // Draw Sub-Fields with Tab-Stop Precision (All in clean non-bold slate gray)
      if (metodeLines.length > 0) {
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
        doc.text('Metode :', margin + innerPadX, drawY);
        doc.text(metodeLines, valColX, drawY);
        drawY += (metodeLines.length * subLineH) + rowGap;
      }

      if (temuanLines.length > 0) {
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
        doc.text('Temuan :', margin + innerPadX, drawY);
        doc.text(temuanLines, valColX, drawY);
        drawY += (temuanLines.length * subLineH) + rowGap;
      }

      if (olehLines.length > 0) {
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
        doc.text('Oleh :', margin + innerPadX, drawY);
        doc.text(olehLines, valColX, drawY);
      }

      currentY += totalCardH + 3.0;
    });
  }

  // Kesimpulan Akar Masalah
  if (capa.rootCause && capa.rootCause.trim()) {
    checkPageBreak(25);
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text('Kesimpulan Akar Masalah', margin, currentY);
    currentY += lineH11 + 2;

    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const rcLines = doc.splitTextToSize(capa.rootCause.trim(), contentWidth);
    checkPageBreak(rcLines.length * 4.5 + 4);
    doc.text(rcLines, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += rcLines.length * 4.5 + 5;
  }

  // ==========================================
  // 6. TINDAKAN KOREKTIF & PENCEGAHAN (SEPARATE STANDALONE SECTIONS)
  // ==========================================
  // 1) Tindakan Korektif Langsung
  checkPageBreak(25);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Tindakan Korektif Langsung', margin, currentY);
  currentY += lineH11 + 2;

  const corrActionText = capa.correctiveAction?.trim() || 'Menindaklanjuti ketidaksesuaian secara langsung di lapangan sesuai petunjuk audit.';
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const corrLines = doc.splitTextToSize(corrActionText, contentWidth);
  checkPageBreak(corrLines.length * 4.5 + 4);
  doc.text(corrLines, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += corrLines.length * 4.5 + 5;

  // 2) Tindakan Pencegahan
  checkPageBreak(25);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Tindakan Pencegahan', margin, currentY);
  currentY += lineH11 + 2;

  const prevActionText = capa.preventiveAction?.trim() || 'Melakukan pembaruan SOP internal dan pengawasan berkala agar temuan tidak berulang.';
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const prevLines = doc.splitTextToSize(prevActionText, contentWidth);
  checkPageBreak(prevLines.length * 4.5 + 4);
  doc.text(prevLines, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += prevLines.length * 4.5 + 5;

  // Optional: Resolution Notes (Catatan Tambahan Pelaksanaan)
  if (capa.resolutionNotes && capa.resolutionNotes.trim()) {
    checkPageBreak(25);
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text('Catatan Pelaksanaan Penyelesaian', margin, currentY);
    currentY += lineH11 + 2;

    doc.setFont(fontFamily, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const resLines = doc.splitTextToSize(capa.resolutionNotes.trim(), contentWidth);
    checkPageBreak(resLines.length * 4.5 + 4);
    doc.text(resLines, margin, currentY, { align: 'justify', maxWidth: contentWidth });
    currentY += resLines.length * 4.5 + 5;
  }

  // ==========================================
  // 7. VERIFIKASI BUKTI OBJEKTIF (CLEAN CHECKLIST STYLE)
  // ==========================================
  const requiredEvidenceItems: Array<{ id: string; name: string; format: string }> = [];
  if (capa.requiredEvidenceList && capa.requiredEvidenceList.length > 0) {
    capa.requiredEvidenceList.forEach(e => requiredEvidenceItems.push({ id: e.id, name: e.name, format: e.format }));
  } else if (capa.requiredEvidence) {
    const splits = capa.requiredEvidence.split(/(?:;|,|\n)/).map(s => s.trim()).filter(s => s.length > 0);
    splits.forEach((s, idx) => requiredEvidenceItems.push({ id: `ev-${idx}`, name: s, format: 'Dokumen' }));
  } else {
    requiredEvidenceItems.push({ id: 'ev-default', name: 'Dokumen Berita Acara & Bukti Foto Perbaikan Fisik', format: 'Dokumen' });
  }

  const attachments = capa.attachments || [];

  checkPageBreak(30);
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Verifikasi Bukti Objektif', margin, currentY);
  currentY += lineH11 + 2;

  // Table Column Widths (3 Kolom: NO, PERSYARATAN BUKTI, STATUS)
  const colWNo = 12;
  const colWStatus = 24;
  const colWReq = contentWidth - colWNo - colWStatus; // ~146mm

  // Table Header (Matching Work Paper Vibrant Blue & Modern Hairline Borders)
  const headerHeight = 6.8;
  checkPageBreak(headerHeight + 10);

  doc.setFillColor(37, 99, 235); // Tailwind Blue-600 #2563eb
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.setLineWidth(0.2);
  doc.rect(margin, currentY, contentWidth, headerHeight, 'FD');

  // Dividers
  doc.line(margin + colWNo, currentY, margin + colWNo, currentY + headerHeight);
  doc.line(margin + colWNo + colWReq, currentY, margin + colWNo + colWReq, currentY + headerHeight);

  // Header Titles
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  const headerTextY = currentY + headerHeight / 2 + 1.2;
  doc.text('NO', margin + colWNo / 2, headerTextY, { align: 'center' });
  doc.text('PERSYARATAN BUKTI', margin + colWNo + colWReq / 2, headerTextY, { align: 'center' });
  doc.text('STATUS', margin + colWNo + colWReq + colWStatus / 2, headerTextY, { align: 'center' });
  currentY += headerHeight;

  // Table Rows
  requiredEvidenceItems.forEach((evItem, idx) => {
    // Check if attachment exists for this requirement
    const matchedAtt = attachments.find(att => 
      att.caption === evItem.name || 
      att.name.toLowerCase().includes(evItem.name.toLowerCase().substring(0, 15)) ||
      att.id.includes(evItem.id)
    ) || (attachments.length > idx ? attachments[idx] : undefined);

    const isUploaded = Boolean(matchedAtt) || capa.status === 'VERIFIED';
    const evidenceFullText = evItem.format && !evItem.name.includes(`(${evItem.format})`)
      ? `${evItem.name} (${evItem.format})`
      : evItem.name;

    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(7.5);
    const reqLines = doc.splitTextToSize(evidenceFullText, colWReq - 7);
    const reqHeight = (reqLines.length - 1) * 3.6;

    const rowHeight = Math.max(7.2, reqHeight + 5.2);
    checkPageBreak(rowHeight);

    // Alternating background
    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(248, 250, 252); // slate-50
    }

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.18);
    doc.rect(margin, currentY, contentWidth, rowHeight, 'FD');

    // Vertical dividers
    doc.line(margin + colWNo, currentY, margin + colWNo, currentY + rowHeight);
    doc.line(margin + colWNo + colWReq, currentY, margin + colWNo + colWReq, currentY + rowHeight);

    // 1. Column NO
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`${idx + 1}`, margin + colWNo / 2, currentY + rowHeight / 2 + 1.2, { align: 'center' });

    // 2. Column PERSYARATAN BUKTI
    const textStartY = currentY + (rowHeight - reqHeight) / 2 + 0.8;
    doc.setFont(fontFamily, 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(reqLines, margin + colWNo + 3.5, textStartY);

    // 3. Column STATUS (Clean centered checklist: ✓ or □)
    const statusCenterX = margin + colWNo + colWReq + colWStatus / 2;
    const statusCenterY = currentY + rowHeight / 2 + 1.2;

    if (isUploaded) {
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(22, 101, 52); // green-700
      doc.text('✓', statusCenterX, statusCenterY, { align: 'center' });
    } else {
      const boxSize = 4.2;
      const boxTop = currentY + (rowHeight - boxSize) / 2;
      const boxLeft = statusCenterX - boxSize / 2;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(148, 163, 184); // slate-400
      doc.setLineWidth(0.25);
      doc.rect(boxLeft, boxTop, boxSize, boxSize, 'FD');
    }

    currentY += rowHeight;
  });

  currentY += 8;

  // ==========================================
  // 9. CLOSING & PENGESAHAN TANDA TANGAN (DUAL SIGNATURE)
  // ==========================================
  const closingText = 'Demikian Laporan Tindakan Perbaikan dan Pencegahan (CAPA) ini diterbitkan sebagai wujud akuntabilitas perbaikan berkelanjutan (Continuous Improvement) dalam pemenuhan standar K3 dan pengelolaan limbah B3 PT. Dame Alam Sejahtera, serta disetujui bersama oleh pelaksana teknis dan auditor verifikator.';

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  const closingLines = doc.splitTextToSize(closingText, contentWidth);
  const totalClosingAndSignHeight = (closingLines.length * lineH11) + 8 + 35;

  checkPageBreak(totalClosingAndSignHeight);

  doc.setLineHeightFactor(1.25);
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text(closingText, margin, currentY, { align: 'justify', maxWidth: contentWidth });
  currentY += closingLines.length * lineH11 + 8;

  // Signatures
  const sigColW = contentWidth / 2;

  // Left Signature: PIC Pelaksana Tindakan Perbaikan
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Penanggung Jawab Tindakan (PIC):', margin + sigColW / 2, currentY, { align: 'center' });

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(175, 185, 198);
  doc.text('[ Terverifikasi Berita Acara Elektronik ]', margin + sigColW / 2, currentY + 16, { align: 'center' });

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(picNameOnly, margin + sigColW / 2, currentY + 24, { align: 'center' });

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text(picRoleOnly, margin + sigColW / 2, currentY + 29.5, { align: 'center' });

  // Right Signature: Lead Auditor K3 & Verifikator
  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text('Auditor Verifikator K3 & Legal:', margin + sigColW + sigColW / 2, currentY, { align: 'center' });

  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(175, 185, 198);
  doc.text('[ Terverifikasi Berita Acara Elektronik ]', margin + sigColW + sigColW / 2, currentY + 16, { align: 'center' });

  doc.setFont(fontFamily, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  const auditorName = capa.verifiedBy || auditSession.auditorName || 'Alvareza H. Pratama, S.M';
  doc.text(auditorName, margin + sigColW + sigColW / 2, currentY + 24, { align: 'center' });

  const cleanAuditorRole = (auditSession.auditorRole || 'Lead Auditor SMK3 & Lingkungan Hidup')
    .replace(/\s*\(.*?\)/g, '')
    .trim();
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondarySlate[0], secondarySlate[1], secondarySlate[2]);
  doc.text(cleanAuditorRole, margin + sigColW + sigColW / 2, currentY + 29.5, { align: 'center' });

  currentY += 35;

  // Final Page Running Footer
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Laporan Tindakan Perbaikan & Pencegahan (CAPA) • PT. Dame Alam Sejahtera`,
    margin,
    pageHeight - 10
  );
  doc.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

  return doc;
};
