import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, AlertCircle, ZoomIn, ZoomOut } from 'lucide-react';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

interface PdfCanvasViewerProps {
  pdfData: ArrayBuffer | Uint8Array | string | null;
  className?: string;
}

// Helper to clone ArrayBuffer / TypedArray safely so PDF.js worker transfer never detaches the original buffer
const cloneBinaryData = (data: ArrayBuffer | Uint8Array): Uint8Array | null => {
  try {
    if (data instanceof ArrayBuffer) {
      if (data.byteLength === 0) return null;
      return new Uint8Array(data.slice(0));
    }
    if (ArrayBuffer.isView(data)) {
      if (data.buffer.byteLength === 0) return null;
      return new Uint8Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
    }
  } catch (err) {
    console.error('Failed to clone binary PDF data:', err);
  }
  return null;
};

// Sub-component for individual PDF Page rendering
const PdfPageItem: React.FC<{
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
}> = ({ pdfDoc, pageNumber, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPageRendered, setIsPageRendered] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext: any = {
          canvasContext: ctx,
          viewport: viewport,
          canvas: canvas,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
        if (!isCancelled) {
          setIsPageRendered(true);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException' && !isCancelled) {
          console.error(`Error rendering page ${pageNumber}:`, err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask && renderTask.cancel) {
        try {
          renderTask.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div className="relative shadow-xl bg-white border border-slate-300 dark:border-slate-800 shrink-0 select-none">
      {!isPageRendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      )}
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ pdfData, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.15);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  // Auto-fit scale to container width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48; // padding
        if (containerWidth > 0) {
          // Standard A4 width is 595.28 points in PDF.js
          const fitScale = Math.max(0.7, Math.min(1.45, containerWidth / 595.28));
          setScale(fitScale);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load PDF document safely
  useEffect(() => {
    if (!pdfData) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    let loadingTask: pdfjsLib.PDFDocumentLoadingTask | null = null;
    setLoading(true);
    setError(null);

    const loadDoc = async () => {
      try {
        let docParams: any = null;

        if (typeof pdfData === 'string') {
          if (pdfData.startsWith('data:')) {
            const base64 = pdfData.split(',')[1] || '';
            const binStr = window.atob(base64);
            const bytes = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
              bytes[i] = binStr.charCodeAt(i);
            }
            docParams = {
              data: bytes,
              cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
              cMapPacked: true,
            };
          } else {
            docParams = {
              url: pdfData,
              cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
              cMapPacked: true,
            };
          }
        } else if (pdfData) {
          const clonedBytes = cloneBinaryData(pdfData);
          if (!clonedBytes) {
            throw new Error('Dokumen PDF kosong atau data buffer telah terlepas (detached).');
          }
          docParams = {
            data: clonedBytes,
            cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
            cMapPacked: true,
          };
        }

        if (!docParams) {
          throw new Error('Data dokumen PDF tidak valid.');
        }

        loadingTask = pdfjsLib.getDocument(docParams);
        const doc = await loadingTask.promise;
        if (!isMounted) {
          doc.cleanup();
          return;
        }

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Failed to load PDF in viewer:', err);
        setError(err?.message || 'Gagal merender dokumen PDF');
        setLoading(false);
      }
    };

    loadDoc();

    return () => {
      isMounted = false;
      if (loadingTask) {
        try {
          loadingTask.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfData]);

  // Clean up PDF document instance when changing document or unmounting
  useEffect(() => {
    return () => {
      if (pdfDoc) {
        try {
          pdfDoc.cleanup();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.6));

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col h-full bg-slate-200/90 dark:bg-slate-950 overflow-y-auto ${className}`}
    >
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-slate-600 dark:text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-xs font-semibold">Memuat rendering halaman PDF...</span>
        </div>
      )}

      {error && (
        <div className="m-6 bg-rose-50 text-rose-700 p-4 rounded-xl border border-rose-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && pdfDoc && (
        <div className="flex flex-col items-center gap-6 p-4 sm:p-6 pb-16 w-full">
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
            <div key={pageNum} className="flex flex-col items-center">
              <PdfPageItem pdfDoc={pdfDoc} pageNumber={pageNum} scale={scale} />
              {numPages > 1 && (
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 select-none">
                  Halaman {pageNum} dari {numPages}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Floating subtle zoom controls in corner */}
      {!loading && pdfDoc && (
        <div className="fixed bottom-16 right-8 z-30 flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full px-2 py-1 shadow-lg space-x-1 text-white">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="p-1.5 hover:bg-slate-700/80 rounded-full transition disabled:opacity-30 cursor-pointer"
            title="Perkecil"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono font-medium px-1 text-slate-300">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 2.0}
            className="p-1.5 hover:bg-slate-700/80 rounded-full transition disabled:opacity-30 cursor-pointer"
            title="Perbesar"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
