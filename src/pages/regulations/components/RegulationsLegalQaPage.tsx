import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { EXPERT_REGULATORY_KNOWLEDGE } from '../data/expertKnowledge';
import { RegulationsLegalQaProps } from '../types';

export const RegulationsLegalQaPage: React.FC<RegulationsLegalQaProps> = () => {
  const [selectedExpertCategory, setSelectedExpertCategory] = useState<string>('ALL');
  const [expandedExpertId, setExpandedExpertId] = useState<string | null>('kb-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter for Expert Knowledge Base
  const filteredKnowledge = EXPERT_REGULATORY_KNOWLEDGE.filter((item) => {
    const matchesCategory = selectedExpertCategory === 'ALL' || item.category === selectedExpertCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) ||
      item.question.toLowerCase().includes(query) ||
      item.legalBasis.toLowerCase().includes(query) ||
      item.expertAnswer.toLowerCase().includes(query) ||
      item.operationalProcedure.toLowerCase().includes(query) ||
      item.sanctionRisk.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full space-y-5">
      {/* Knowledge Base Header Card - Clean White */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Basis Pengetahuan & Konsultasi Hukum Operasional</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Tanya Jawab Analisis Hukum & Standar Prosedur Lapangan
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-4xl leading-relaxed">
              Panduan praktis analisis dasar hukum, instruksi verifikasi kerja auditor, dan sanksi liabilitas untuk kasus spesifik operasional PT. Dame Alam Sejahtera (Exit MCU, proteksi kebakaran Karawang, transporter, limbah B3, disiplin SOP & PHK, kompensasi, PKWT & alih daya).
            </p>
          </div>

          <span className="text-xs font-mono font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-auto">
            {filteredKnowledge.length} Kasus Terverifikasi
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari tanya jawab: exit mcu, kebakaran, transporter, de-watering, PHK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-blue-500"
          />
        </div>

        {/* Expert Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
          {[
            { id: 'ALL', label: `Semua Topik (${EXPERT_REGULATORY_KNOWLEDGE.length})` },
            { id: 'PKWT_PKWTT', label: 'PKWT vs PKWTT (PP 35)' },
            { id: 'OUTSOURCING_TUPE', label: 'Alih Daya & TUPE' },
            { id: 'EXIT_MCU', label: 'Exit MCU & Kesehatan' },
            { id: 'K3_KEBAKARAN', label: 'Proteksi Kebakaran' },
            { id: 'TRANSPORTER', label: 'Transporter B3' },
            { id: 'PLANT_SUKABUMI', label: 'Plant Pengolahan Limbah' },
            { id: 'DISIPLIN_PHK', label: 'Disiplin SOP & PHK' },
            { id: 'KOMPENSASI', label: 'Kompensasi & Ekstra Nutrisi' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedExpertCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedExpertCategory === cat.id
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expert Knowledge Cards Accordion */}
      <div className="space-y-3">
        {filteredKnowledge.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border border-slate-200 dark:border-slate-800 text-slate-500 shadow-xs">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada materi tanya jawab yang sesuai</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Coba gunakan kata kunci umum seperti &apos;mcu&apos;, &apos;transporter&apos;, atau &apos;kebakaran&apos;.</p>
          </div>
        ) : (
          filteredKnowledge.map((item) => {
            const isExpanded = expandedExpertId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs overflow-hidden transition"
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedExpertId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 dark:bg-slate-800 text-white">
                        {item.id.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {item.legalBasis}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.question}
                    </p>
                  </div>

                  <button 
                    type="button"
                    className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 p-1 font-semibold text-xs shrink-0 cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Content - Clean Structured Slate Panels */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                    {/* Jawaban Analisis Pakar */}
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Analisis Yuridis & Penjelasan Hukum:
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-xs">
                        {item.expertAnswer}
                      </p>
                    </div>

                    {/* Prosedur Operasional di Lapangan */}
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Instruksi Verifikasi Kerja Auditor & Prosedur Operasional:
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-xs">
                        {item.operationalProcedure}
                      </p>
                    </div>

                    {/* Sanksi Hukum Jika Melanggar */}
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Risiko Liabilitas & Sanksi Hukum Pelanggaran:
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                        {item.sanctionRisk}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Tag:</span>
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, `${item.title}\n\nDasar Hukum: ${item.legalBasis}\n\nJawaban Pakar:\n${item.expertAnswer}\n\nProsedur Kerja:\n${item.operationalProcedure}\n\nSanksi:\n${item.sanctionRisk}`)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Ringkasan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
