import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  FileText, 
  FileSpreadsheet, 
  File, 
  Download, 
  Check, 
  FileCheck, 
  Eye
} from 'lucide-react';
import { AuditEvidenceAttachment } from '../types/audit';

export interface PendingUploadData {
  originalFileName: string;
  title: string;
  dataUrl: string;
  type: 'PHOTO_INSPECTION' | 'DOCUMENT' | 'LAB_RESULT';
  caption: string;
  locationTag?: string;
  fileSize?: string;
  isImage: boolean;
  mimeType: string;
}

interface DocumentAttachmentModalProps {
  isOpen: boolean;
  mode: 'ADD' | 'PREVIEW';
  onClose: () => void;
  // ADD mode props
  pendingUpload?: PendingUploadData | null;
  onConfirmAdd?: (title: string) => void;
  // PREVIEW mode props
  attachment?: AuditEvidenceAttachment | null;
  onSaveCaption?: (id: string, newCaption: string) => void;
  onRemoveAttachment?: (id: string) => void;
  // Common context props
  clauseCode?: string;
  clauseTitle?: string;
  readOnly?: boolean;
}

export const DocumentAttachmentModal: React.FC<DocumentAttachmentModalProps> = ({
  isOpen,
  mode,
  onClose,
  pendingUpload,
  onConfirmAdd,
  attachment,
  onSaveCaption,
  onRemoveAttachment,
  clauseCode,
  clauseTitle,
  readOnly = false,
}) => {
  const [captionInput, setCaptionInput] = useState('');
  const [isEditingCaption, setIsEditingCaption] = useState(false);

  useEffect(() => {
    if (mode === 'ADD' && pendingUpload) {
      setCaptionInput(pendingUpload.title || pendingUpload.originalFileName);
    } else if (mode === 'PREVIEW' && attachment) {
      setCaptionInput(attachment.caption || attachment.name);
      setIsEditingCaption(false);
    }
  }, [isOpen, mode, pendingUpload, attachment]);

  if (!isOpen) return null;

  // Render document icon based on file extension
  const renderDocIcon = (filename: string, className = "w-10 h-10") => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
      return <FileText className={`${className} text-slate-700`} />;
    }
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return <FileSpreadsheet className={`${className} text-slate-700`} />;
    }
    return <File className={`${className} text-slate-700`} />;
  };

  const handleConfirmAdd = () => {
    if (!captionInput.trim()) return;
    if (onConfirmAdd) {
      onConfirmAdd(captionInput.trim());
    }
    onClose();
  };

  const handleSaveCaption = () => {
    if (attachment && onSaveCaption) {
      onSaveCaption(attachment.id, captionInput);
      setIsEditingCaption(false);
    }
  };

  const handleRemove = () => {
    if (attachment && onRemoveAttachment) {
      if (confirm(`Hapus lampiran "${attachment.caption || attachment.name}"?`)) {
        onRemoveAttachment(attachment.id);
        onClose();
      }
    }
  };

  const isImage = mode === 'ADD' 
    ? pendingUpload?.isImage 
    : (attachment?.dataUrl.startsWith('data:image/') || attachment?.type === 'PHOTO_INSPECTION');

  const fileName = mode === 'ADD' 
    ? pendingUpload?.originalFileName || 'File Lampiran' 
    : attachment?.name || 'File Lampiran';

  const dataUrl = mode === 'ADD' 
    ? pendingUpload?.dataUrl 
    : attachment?.dataUrl;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
              {mode === 'ADD' ? (
                <FileCheck className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              ) : (
                <Eye className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {mode === 'ADD' ? 'Tambah Dokumen Lampiran' : 'Pratinjau Dokumen Lampiran'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Klausul: {clauseCode || clauseTitle || 'Audit Lapangan'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: White / Dark Background */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-800 dark:text-slate-200 flex-1 bg-white dark:bg-slate-900">
          {/* File Preview Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2">
            {isImage && dataUrl ? (
              <div className="w-full max-h-[40vh] flex items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1">
                <img
                  src={dataUrl}
                  alt={fileName}
                  className="max-h-[38vh] w-auto max-w-full object-contain rounded"
                />
              </div>
            ) : (
              <div className="w-full py-6 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center">
                {renderDocIcon(fileName, "w-12 h-12")}
                <p className="text-xs font-bold text-slate-900 dark:text-white max-w-xs truncate">{fileName}</p>
                {mode === 'PREVIEW' && dataUrl && (
                  <a
                    href={dataUrl}
                    download={fileName}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-2xs mt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Dokumen</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Simple Form Fields: Nama File & Keterangan Only */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama File:
              </label>
              <p className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 break-all">
                {fileName}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Keterangan Lampiran: <span className="text-rose-500">*</span>
              </label>

              {mode === 'ADD' ? (
                <input
                  type="text"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Masukkan keterangan dokumen..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  autoFocus
                />
              ) : (
                <div>
                  {isEditingCaption ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={captionInput}
                        onChange={(e) => setCaptionInput(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleSaveCaption}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingCaption(false)}
                        className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                        {attachment?.caption || attachment?.name}
                      </p>
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => setIsEditingCaption(true)}
                          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold underline cursor-pointer shrink-0 ml-2"
                        >
                          Ubah Keterangan
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between space-x-2">
          {mode === 'PREVIEW' && !readOnly ? (
            <button
              type="button"
              onClick={handleRemove}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:text-rose-700 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-900/60 transition cursor-pointer flex items-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Lampiran</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              {mode === 'ADD' ? 'Batal' : 'Tutup'}
            </button>

            {mode === 'ADD' && (
              <button
                type="button"
                onClick={handleConfirmAdd}
                disabled={!captionInput.trim()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-2xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Lampiran</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
