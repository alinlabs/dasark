import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Gavel, 
  ChevronDown, 
  ChevronUp, 
  Globe2, 
  ArrowRightLeft, 
  FileCheck2, 
  ListFilter,
  CheckCircle2
} from 'lucide-react';
import { REGULATORY_DATABASE, RegulationClause } from '../../../data/regulationsDatabase';
import { RegulationsLawIsoProps } from '../types';

export const RegulationsLawIsoPage: React.FC<RegulationsLawIsoProps> = () => {
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIsoCode, setExpandedIsoCode] = useState<string | null>('ISO 45001:2018');

  // Filter for Regulations Database
  const filteredRegulations = REGULATORY_DATABASE.filter(reg => {
    // Level Filter
    const matchesLevel = levelFilter === 'ALL' || reg.lawLevel === levelFilter;
    
    // Category Filter
    const matchesCategory = categoryFilter === 'ALL' || reg.category === categoryFilter;
    
    // Search Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      reg.code.toLowerCase().includes(query) ||
      reg.title.toLowerCase().includes(query) ||
      reg.article.toLowerCase().includes(query) ||
      reg.summary.toLowerCase().includes(query) ||
      reg.legalSanction.toLowerCase().includes(query) ||
      (reg.isoCrossReference && reg.isoCrossReference.toLowerCase().includes(query)) ||
      (reg.detailedClauses && reg.detailedClauses.some(c => 
        c.clauseNumber.toLowerCase().includes(query) ||
        c.clauseTitle.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.auditPoint.toLowerCase().includes(query)
      ));
    
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getLevelBadge = (level: RegulationClause['lawLevel']) => {
    switch (level) {
      case 'ISO':
        return { 
          label: 'Standar ISO', 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
      case 'UU':
        return { 
          label: 'Undang-Undang (UU)', 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
      case 'PP':
        return { 
          label: 'Peraturan Pemerintah (PP)', 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
      case 'PERMENAKER':
        return { 
          label: 'Permenaker', 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
      case 'PERMEN_LHK':
        return { 
          label: 'Permen LHK', 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
      default:
        return { 
          label: level, 
          class: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
        };
    }
  };

  const getCategoryLabel = (category: RegulationClause['category']) => {
    switch (category) {
      case 'K3_KESELAMATAN': return 'K3 & Keselamatan Kerja';
      case 'KESEHATAN_KERJA': return 'Kesehatan Kerja & MCU';
      case 'LIMBAH_B3_LINGKUNGAN': return 'Limbah B3 & Lingkungan';
      case 'HUBUNGAN_KERJA': return 'Ketenagakerjaan, PKWT & Alih Daya';
      case 'JAMINAN_SOSIAL': return 'Jaminan Sosial & BPJS';
      case 'MANAJEMEN_MUTU_AUDIT': return 'Manajemen Mutu & Audit';
      default: return category;
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Top Search & Level Filter Bar - Clean Pure White */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'Semua', count: REGULATORY_DATABASE.length },
            { id: 'UU', label: 'Undang-Undang (UU)', count: REGULATORY_DATABASE.filter(r => r.lawLevel === 'UU').length },
            { id: 'PP', label: 'PP RI', count: REGULATORY_DATABASE.filter(r => r.lawLevel === 'PP').length },
            { id: 'PERMENAKER', label: 'Permenaker', count: REGULATORY_DATABASE.filter(r => r.lawLevel === 'PERMENAKER').length },
            { id: 'PERMEN_LHK', label: 'Permen LHK', count: REGULATORY_DATABASE.filter(r => r.lawLevel === 'PERMEN_LHK').length },
            { id: 'ISO', label: 'Standar ISO', count: REGULATORY_DATABASE.filter(r => r.lawLevel === 'ISO').length },
          ].map(lvl => (
            <button
              key={lvl.id}
              onClick={() => setLevelFilter(lvl.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                levelFilter === lvl.id
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <span>{lvl.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                levelFilter === lvl.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {lvl.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari regulasi, pasal, klausul, sanksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto text-xs pb-1">
        <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1 shrink-0 flex items-center text-xs">
          <ListFilter className="w-3.5 h-3.5 mr-1" /> Bidang:
        </span>
        {[
          { id: 'ALL', label: 'Semua Bidang' },
          { id: 'HUBUNGAN_KERJA', label: 'Ketenagakerjaan & Hubungan Kerja' },
          { id: 'K3_KESELAMATAN', label: 'K3 & Keselamatan' },
          { id: 'KESEHATAN_KERJA', label: 'Kesehatan Kerja & MCU' },
          { id: 'LIMBAH_B3_LINGKUNGAN', label: 'Limbah B3 & Lingkungan' },
          { id: 'JAMINAN_SOSIAL', label: 'BPJS & Jaminan Sosial' },
          { id: 'MANAJEMEN_MUTU_AUDIT', label: 'Mutu & Metodologi Audit' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Reference Summary Grid - Subtle, Clean & Structured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center text-xs">
            <Gavel className="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
            <span>Hierarki Hukum Ketenagakerjaan & K3 RI</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-[10px]">LEVEL I: UU</span>
              <p className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5 leading-snug">
                UU 1/1970, UU 13/2003 jo. UU 6/2023, UU 32/2009
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-[10px]">LEVEL II: PP</span>
              <p className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5 leading-snug">
                PP 35/2021, PP 50/2012, PP 22/2021
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-[10px]">LEVEL III: PERMEN</span>
              <p className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5 leading-snug">
                Permenaker 5/2018, Permen LHK 6/2021
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center text-xs">
            <ArrowRightLeft className="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
            <span>Integrasi Standar ISO & Regulasi Nasional</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">ISO 45001:2018 ↔ PP 50/2012</span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                SMK3 Internasional terintegrasi 166 Kriteria Audit Kemnaker RI.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">ISO 14001:2015 ↔ PP 22/2021</span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Manajemen Lingkungan terintegrasi pengelolaan Limbah B3 & IPAL.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulation Clauses List Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span>Daftar Regulasi & Standar ({filteredRegulations.length})</span>
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Menampilkan {filteredRegulations.length} dari {REGULATORY_DATABASE.length} instrumen
        </span>
      </div>

      {/* Regulations List (Clean White Cards) */}
      <div className="space-y-4">
        {filteredRegulations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border border-slate-200 dark:border-slate-800 text-slate-500 shadow-xs">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada regulasi yang sesuai</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang berbeda atau reset filter.</p>
          </div>
        ) : (
          filteredRegulations.map((reg, idx) => {
            const levelInfo = getLevelBadge(reg.lawLevel);
            const isExpanded = expandedIsoCode === reg.code;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-xs overflow-hidden"
              >
                {/* Main Card Content */}
                <div className="p-5 space-y-3.5">
                  {/* Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-800 text-white">
                        {reg.code}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded border ${levelInfo.class}`}>
                        {levelInfo.label}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {getCategoryLabel(reg.category)}
                      </span>
                    </div>

                    {reg.isoCrossReference && (
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded flex items-center self-start sm:self-auto">
                        <ArrowRightLeft className="w-3 h-3 mr-1 text-slate-400" />
                        {reg.isoCrossReference}
                      </span>
                    )}
                  </div>

                  {/* Title & Key Clause */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {reg.title}
                    </h3>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center">
                      <FileCheck2 className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      <span>Pasal/Klausul Kunci: {reg.article}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {reg.summary}
                  </p>

                  {/* Legal Sanctions & Mandatory Evidence - Clean 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    {/* Legal Sanctions */}
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-[11px]">
                        Konsekuensi Audit & Sanksi Hukum:
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        {reg.legalSanction}
                      </p>
                    </div>

                    {/* Mandatory Verification Evidence */}
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-[11px]">
                        Bukti Dokumen Wajib Diverifikasi:
                      </div>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                        {reg.mandatoryEvidence.map((ev, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-slate-400 mr-1.5">•</span>
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detailed Clauses Accordion */}
                {reg.detailedClauses && reg.detailedClauses.length > 0 && (
                  <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
                    <button
                      onClick={() => setExpandedIsoCode(isExpanded ? null : reg.code)}
                      className="w-full px-5 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-between"
                    >
                      <span>Rincian Klausul & Poin Pengujian Auditor ({reg.detailedClauses.length} Klausul)</span>
                      <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                        <span>{isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-1 space-y-3 border-t border-slate-200 dark:border-slate-800">
                        <div className="grid grid-cols-1 gap-3 pt-2">
                          {reg.detailedClauses.map((clause, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs"
                            >
                              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs">
                                  {clause.clauseNumber}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white text-xs">
                                  {clause.clauseTitle}
                                </span>
                              </div>

                              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                                {clause.description}
                              </p>

                              <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded border border-slate-200 dark:border-slate-700 text-[11px] space-y-0.5">
                                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[10px] uppercase tracking-wide">
                                  Poin Pengujian Auditor:
                                </span>
                                <p className="text-slate-600 dark:text-slate-300 italic">&quot;{clause.auditPoint}&quot;</p>
                              </div>

                              {clause.mandatoryEvidence && clause.mandatoryEvidence.length > 0 && (
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center flex-wrap gap-1 pt-1">
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">Dokumen Uji:</span>
                                  {clause.mandatoryEvidence.map((doc, dIdx) => (
                                    <span key={dIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-700 dark:text-slate-300">
                                      {doc}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
