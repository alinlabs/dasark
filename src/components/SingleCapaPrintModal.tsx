import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Loader2 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { CAPAItem, ChecklistItem, AuditSession } from '../types/audit';
import { generateSingleCapaPdf, loadLogoBase64, loadInterFonts } from '../utils/capaPdfGenerator';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface SingleCapaPrintModalProps {
  capa: CAPAItem;
  auditSession: AuditSession;
  workPaperItem?: ChecklistItem | null;
  onClose: () => void;
  autoPrint?: boolean;
}

export const SingleCapaPrintModal: React.FC<SingleCapaPrintModalProps> = ({
  capa,
  auditSession,
  workPaperItem,
  onClose,
  autoPrint = false,
}) => {
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');
  const [activePdfInstance, setActivePdfInstance] = useState<jsPDF | null>(null);
  const [isBuildingPdf, setIsBuildingPdf] = useState<boolean>(true);

  const cleanFindingCode = (capa.findingCode || capa.id || 'CAPA').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `CAPA_DASAR_${cleanFindingCode}.pdf`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Build Native jsPDF Document with Inter Font & Editorial Action-Focused Design
  useEffect(() => {
    let isMounted = true;
    let createdUrl: string | null = null;

    const buildPdfDocument = async () => {
      setIsBuildingPdf(true);
      try {
        // Load company logo and Inter fonts concurrently
        const [logoBase64, interFonts] = await Promise.all([
          loadLogoBase64(),
          loadInterFonts()
        ]);
        
        // Generate pristine text-based jsPDF document focusing on CAPA response & actions
        const doc = generateSingleCapaPdf(capa, auditSession, workPaperItem, logoBase64, interFonts);
        
        if (!isMounted) return;

        // Output binary ArrayBuffer for native canvas rendering
        const arrayBuf = doc.output('arraybuffer');
        setPdfArrayBuffer(arrayBuf.slice(0));

        // Output real binary PDF blob for download/open
        const pdfBlob = doc.output('blob');
        createdUrl = URL.createObjectURL(pdfBlob);

        setPdfBlobUrl(createdUrl);
        setActivePdfInstance(doc);
      } catch (err) {
        console.error('Error constructing native jsPDF CAPA preview:', err);
      } finally {
        if (isMounted) {
          setIsBuildingPdf(false);
        }
      }
    };

    buildPdfDocument();

    // Cleanup Blob URL from browser memory to prevent memory leaks
    return () => {
      isMounted = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [capa, auditSession, workPaperItem]);

  // Direct Download of the jsPDF instance
  const handleDownloadPdf = () => {
    if (activePdfInstance) {
      activePdfInstance.save(fileName);
    } else {
      const doc = generateSingleCapaPdf(capa, auditSession, workPaperItem, null, null);
      doc.save(fileName);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[94vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 relative">
        
        {/* Floating Minimalist Close Button in Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white transition shadow-lg cursor-pointer backdrop-blur-sm border border-slate-700/60"
          title="Tutup (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Body: Direct PDF Document Viewer (No Header) */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex flex-col">
          {isBuildingPdf ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs z-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Mengompilasi Dokumen CAPA...
                </p>
                <p className="text-xs text-slate-500">
                  Format teks presisi dengan tipografi Inter
                </p>
              </div>
            </div>
          ) : (
            <PdfCanvasViewer pdfData={pdfArrayBuffer || pdfBlobUrl} className="w-full h-full" />
          )}
        </div>

        {/* Modal Footer Bar: ONLY file name and download button */}
        <div className="bg-slate-50 dark:bg-slate-900/90 px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 truncate">
            <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {fileName}
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isBuildingPdf}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Berkas</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
