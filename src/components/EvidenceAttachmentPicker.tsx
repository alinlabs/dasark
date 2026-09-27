import React, { useState, useRef } from 'react';
import { 
  Trash2, 
  Maximize2, 
  FileText, 
  FileSpreadsheet, 
  File
} from 'lucide-react';
import { AuditEvidenceAttachment } from '../types/audit';
import { DocumentAttachmentModal, PendingUploadData } from './DocumentAttachmentModal';

interface EvidenceAttachmentPickerProps {
  attachments?: AuditEvidenceAttachment[];
  onUpdateAttachments: (attachments: AuditEvidenceAttachment[]) => void;
  clauseCode?: string;
  clauseTitle?: string;
  defaultLocation?: string;
  readOnly?: boolean;
}

export const EvidenceAttachmentPicker: React.FC<EvidenceAttachmentPickerProps> = ({
  attachments = [],
  onUpdateAttachments,
  clauseCode,
  clauseTitle,
  readOnly = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<AuditEvidenceAttachment | null>(null);
  const [pendingUpload, setPendingUpload] = useState<PendingUploadData | null>(null);

  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };

  // Helper to clean file name for default title
  const cleanFileName = (filename: string): string => {
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return nameWithoutExt.replace(/[-_]+/g, ' ').trim();
  };

  // Handle local file selection -> Opens Modal for Renaming/Captioning
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isImage = file.type.startsWith('image/');
    const defaultType: 'PHOTO_INSPECTION' | 'DOCUMENT' | 'LAB_RESULT' = isImage ? 'PHOTO_INSPECTION' : 'DOCUMENT';

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      setPendingUpload({
        originalFileName: file.name,
        title: cleanFileName(file.name),
        dataUrl,
        type: defaultType,
        caption: `Bukti ${isImage ? 'foto lapangan' : 'dokumen'} untuk verifikasi klausul ${clauseCode || 'audit'}.`,
        fileSize: formatFileSize(file.size),
        isImage,
        mimeType: file.type || 'application/octet-stream'
      });
    };
    reader.readAsDataURL(file);

    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save pending upload into actual attachments
  const handleConfirmAdd = (caption: string) => {
    if (!pendingUpload) return;

    const newAttachment: AuditEvidenceAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: pendingUpload.originalFileName,
      dataUrl: pendingUpload.dataUrl,
      type: pendingUpload.type,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Auditor',
      caption: caption || pendingUpload.title || pendingUpload.originalFileName,
      fileSize: pendingUpload.fileSize,
    };

    onUpdateAttachments([...attachments, newAttachment]);
    setPendingUpload(null);
  };

  // Save caption update for existing attachment
  const handleSaveCaption = (id: string, newCaption: string) => {
    onUpdateAttachments(
      attachments.map((a) => (a.id === id ? { ...a, caption: newCaption } : a))
    );
    if (selectedPreviewImage?.id === id) {
      setSelectedPreviewImage({ ...selectedPreviewImage, caption: newCaption });
    }
  };

  // Remove attachment
  const handleRemoveAttachment = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onUpdateAttachments(attachments.filter((a) => a.id !== id));
    if (selectedPreviewImage?.id === id) {
      setSelectedPreviewImage(null);
    }
  };

  // Render document icon based on name
  const renderDocIcon = (name: string, className = "w-8 h-8") => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
      return <FileText className={`${className} text-slate-700`} />;
    }
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return <FileSpreadsheet className={`${className} text-slate-700`} />;
    }
    return <File className={`${className} text-slate-500`} />;
  };

  return (
    <div className="space-y-3">
      {/* Hidden native file input */}
      {!readOnly && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
          className="hidden"
        />
      )}

      {/* Action Header & Upload Controls */}
      <div>
        {attachments.length === 0 ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px]">
              <span className="font-bold text-slate-800">Lampiran Dokumen</span>
              <span className="text-slate-400 font-normal">(0 Terlampir)</span>
            </div>

            {!readOnly && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/60 hover:bg-slate-100/80 rounded-xl py-3.5 px-4 flex flex-col items-center justify-center text-center transition cursor-pointer group"
              >
                <p className="text-xs text-slate-500 font-normal mb-0.5">
                  Belum ada lampiran dokumen
                </p>
                <p className="text-xs font-bold text-slate-800 group-hover:text-black">
                  Pilih &amp; Cari Dokumen
                </p>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-1.5 text-[11px]">
              <span className="font-bold text-slate-800">Lampiran Dokumen</span>
              <span className="text-slate-400 font-normal">({attachments.length} Terlampir)</span>
            </div>

            {!readOnly && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-slate-800 hover:text-black hover:underline text-xs font-bold transition cursor-pointer"
              >
                Unggah Dokumen
              </button>
            )}
          </div>
        )}
      </div>

      {/* Attachments Thumbnail Grid */}
      {attachments.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
          {attachments.map((att) => {
            const isImage = att.dataUrl.startsWith('data:image/') || att.type === 'PHOTO_INSPECTION';
            const fileExt = att.name.split('.').pop()?.toUpperCase() || 'FILE';

            return (
              <div
                key={att.id}
                onClick={() => setSelectedPreviewImage(att)}
                className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-slate-400 transition cursor-pointer flex flex-col"
              >
                {/* Image or Document Box */}
                <div className="relative h-28 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {isImage ? (
                    <img
                      src={att.dataUrl}
                      alt={att.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-center space-y-1 bg-slate-100 w-full h-full">
                      {renderDocIcon(att.name, "w-8 h-8")}
                      <span className="text-[9px] font-mono font-bold text-slate-600 uppercase px-2 py-0.5 bg-slate-200 rounded">
                        {fileExt}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <span className="p-1.5 bg-white/90 rounded-full text-slate-800 shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Delete Button */}
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveAttachment(att.id, e)}
                      className="absolute top-1.5 right-1.5 p-1 bg-white hover:bg-rose-50 text-rose-600 rounded-md opacity-0 group-hover:opacity-100 transition shadow-xs cursor-pointer border border-rose-200"
                      title="Hapus Bukti"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Caption & File Name Label Only (Simple) */}
                <div className="p-2.5 bg-white text-slate-800 text-[11px] space-y-1 flex-1 flex flex-col justify-between border-t border-slate-100">
                  <p className="font-bold line-clamp-2 text-slate-900 leading-snug text-[11px]">
                    {att.caption || att.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {att.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* UNIFIED ATTACHMENT MODAL (ADD MODE) */}
      <DocumentAttachmentModal
        isOpen={!!pendingUpload}
        mode="ADD"
        onClose={() => setPendingUpload(null)}
        pendingUpload={pendingUpload}
        onConfirmAdd={handleConfirmAdd}
        clauseCode={clauseCode}
        clauseTitle={clauseTitle}
        readOnly={readOnly}
      />

      {/* UNIFIED ATTACHMENT MODAL (PREVIEW MODE) */}
      <DocumentAttachmentModal
        isOpen={!!selectedPreviewImage}
        mode="PREVIEW"
        onClose={() => setSelectedPreviewImage(null)}
        attachment={selectedPreviewImage}
        onSaveCaption={handleSaveCaption}
        onRemoveAttachment={(id) => handleRemoveAttachment(id)}
        clauseCode={clauseCode}
        clauseTitle={clauseTitle}
        readOnly={readOnly}
      />
    </div>
  );
};
