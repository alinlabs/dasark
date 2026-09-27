import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  ClipboardCheck, 
  Gavel, 
  ShieldAlert, 
  CreditCard, 
  Award, 
  Sparkles, 
  Lightbulb, 
  Check, 
  Copy, 
  Info, 
  Layers, 
  X, 
  ArrowRight,
  BookMarked,
  RotateCw,
  Eye,
  HelpCircle
} from 'lucide-react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossaryData';

export const GlossaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'GRID' | 'FLASHCARD'>('GRID');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_TERMS.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstLetter)) {
        letters.add(firstLetter);
      }
    });
    return Array.from(letters).sort();
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedLetter !== 'ALL') {
        const firstLetter = item.term.charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTerm = item.term.toLowerCase().includes(query);
        const inAbbr = item.abbreviation?.toLowerCase().includes(query);
        const inEng = item.englishTerm?.toLowerCase().includes(query);
        const inSimple = item.simpleMeaning.toLowerCase().includes(query);
        const inTech = item.technicalDefinition.toLowerCase().includes(query);
        const inEx = item.practicalExample.toLowerCase().includes(query);
        const inTags = item.tags.some(t => t.toLowerCase().includes(query));

        return inTerm || inAbbr || inEng || inSimple || inTech || inEx || inTags;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleCopyTerm = (term: GlossaryTerm) => {
    const text = `📌 ${term.term}${term.abbreviation ? ` (${term.abbreviation})` : ''}\n💡 Penyederhanaan: ${term.simpleMeaning}\n⚙️ Definisi Teknis: ${term.technicalDefinition}\n🏢 Contoh Lapangan: ${term.practicalExample}${term.relatedRegulation ? `\n⚖️ Regulasi: ${term.relatedRegulation}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AUDIT_QUALITY': return <ClipboardCheck className="w-3.5 h-3.5 text-blue-700" />;
      case 'MANPOWER_LEGAL': return <Gavel className="w-3.5 h-3.5 text-blue-700" />;
      case 'K3_SAFETY': return <ShieldAlert className="w-3.5 h-3.5 text-blue-700" />;
      case 'BENEFITS_BPJS': return <CreditCard className="w-3.5 h-3.5 text-blue-700" />;
      case 'INDUSTRIAL_STANDARDS': return <Award className="w-3.5 h-3.5 text-blue-700" />;
      default: return <BookOpen className="w-3.5 h-3.5 text-blue-700" />;
    }
  };

  const currentFlashcard = filteredTerms[flashcardIndex] || filteredTerms[0];

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <BookMarked className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Glosarium Istilah Audit & HR Industri
              </span>
              <span className="text-slate-400 dark:text-slate-600 text-xs">•</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">{GLOSSARY_TERMS.length} Istilah Terdaftar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Kamus Istilah Audit, Ketenagakerjaan & K3
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Penyederhanaan istilah teknis, singkatan hukum, dan terminologi regulasi industri ke dalam <strong className="text-blue-700 dark:text-blue-400 font-semibold">bahasa awam yang mudah dipahami</strong> beserta contoh kasus di lapangan.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 self-start md:self-center">
            <button
              onClick={() => setViewMode('GRID')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'GRID' 
                  ? 'bg-blue-600 text-white shadow-xs font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Daftar Istilah</span>
            </button>
            <button
              onClick={() => {
                setViewMode('FLASHCARD');
                setFlashcardIndex(0);
                setShowFlashcardAnswer(false);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'FLASHCARD' 
                  ? 'bg-blue-600 text-white shadow-xs font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mode Uji Pemahaman</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Search Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 transition-colors duration-200">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari istilah atau singkatan (contoh: CAPA, PKWT, SIO, 5-Why, Minor NC)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50/50 dark:bg-slate-800/80"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {GLOSSARY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 dark:bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Alphabet A-Z Index Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-2 shrink-0">Indeks A-Z:</span>
          <button
            onClick={() => setSelectedLetter('ALL')}
            className={`px-2 py-1 rounded text-xs font-semibold shrink-0 transition cursor-pointer ${
              selectedLetter === 'ALL'
                ? 'bg-blue-700 dark:bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Semua
          </button>
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-6 h-6 rounded text-xs font-semibold shrink-0 transition flex items-center justify-center cursor-pointer ${
                selectedLetter === letter
                  ? 'bg-blue-700 dark:bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: GRID VIEW */}
      {viewMode === 'GRID' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Menampilkan <strong className="text-slate-900 dark:text-slate-100 font-semibold">{filteredTerms.length}</strong> istilah</span>
            {(searchQuery || selectedCategory !== 'ALL' || selectedLetter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedLetter('ALL');
                }}
                className="text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>

          {filteredTerms.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Istilah Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Tidak ada istilah yang sesuai dengan kriteria pencarian. Silakan coba kata kunci lain.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedLetter('ALL');
                }}
                className="px-4 py-2 rounded-lg bg-blue-700 dark:bg-blue-600 text-white text-xs font-semibold hover:bg-blue-800 dark:hover:bg-blue-500 transition cursor-pointer"
              >
                Tampilkan Semua Istilah
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTerms.map((term) => {
                const isCopied = copiedId === term.id;

                return (
                  <div 
                    key={term.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 flex flex-col justify-between p-6 space-y-4"
                  >
                    <div className="space-y-4">
                      {/* Term Title & Quiet Category Text */}
                      <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {term.term}
                            </h3>
                            {term.abbreviation && (
                              <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {term.abbreviation}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {GLOSSARY_CATEGORIES.find(c => c.id === term.category)?.label}
                          </span>
                        </div>
                        {term.englishTerm && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            {term.englishTerm}
                          </p>
                        )}
                      </div>

                      {/* Penyederhanaan Bahasa Awam Callout */}
                      <div className="bg-blue-50/60 dark:bg-blue-950/40 rounded-lg p-4 border border-blue-100 dark:border-blue-900/60 space-y-1">
                        <div className="flex items-center space-x-1.5 text-blue-800 dark:text-blue-300 font-semibold text-xs">
                          <Lightbulb className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                          <span>Penyederhanaan Bahasa Awam</span>
                        </div>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                          {term.simpleMeaning}
                        </p>
                      </div>

                      {/* Technical Definition */}
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 block">Definisi Teknis:</span>
                        <p className="leading-relaxed">
                          {term.technicalDefinition}
                        </p>
                      </div>

                      {/* Practical Field Example */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">Contoh Kasus Lapangan:</span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          &quot;{term.practicalExample}&quot;
                        </p>
                      </div>

                      {term.relatedRegulation && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          Acuan Regulasi: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{term.relatedRegulation}</strong>
                        </div>
                      )}
                    </div>

                    {/* Copy Action */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                        {term.tags.slice(0, 3).map(tag => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleCopyTerm(term)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                          isCopied 
                            ? 'bg-blue-700 dark:bg-blue-600 text-white border-blue-700 dark:border-blue-600'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Salin Penjelasan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: FLASHCARD / UJI PEMAHAMAN */}
      {viewMode === 'FLASHCARD' && filteredTerms.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Kartu <strong className="text-slate-900 dark:text-white font-semibold">{flashcardIndex + 1}</strong> dari {filteredTerms.length}</span>
            <span className="text-blue-700 dark:text-blue-400 font-medium">Uji Pemahaman Term</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6">
            <div className="space-y-3 text-center py-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                {GLOSSARY_CATEGORIES.find(c => c.id === currentFlashcard.category)?.label}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentFlashcard.term}
              </h2>
              {currentFlashcard.englishTerm && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {currentFlashcard.englishTerm}
                </p>
              )}
            </div>

            {showFlashcardAnswer ? (
              <div className="space-y-4 bg-blue-50/50 dark:bg-blue-950/40 p-5 rounded-lg border border-blue-100 dark:border-blue-900/60 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-blue-900 dark:text-blue-200 block">Penyederhanaan Bahasa Awam:</span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {currentFlashcard.simpleMeaning}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-blue-100 dark:border-blue-900/40">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Contoh Lapangan:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    &quot;{currentFlashcard.practicalExample}&quot;
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <button
                  onClick={() => setShowFlashcardAnswer(true)}
                  className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer inline-flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Buka Jawaban & Bahasa Awam</span>
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={flashcardIndex === 0}
                onClick={() => {
                  setFlashcardIndex(prev => Math.max(0, prev - 1));
                  setShowFlashcardAnswer(false);
                }}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ← Sebelumnya
              </button>

              <button
                disabled={flashcardIndex === filteredTerms.length - 1}
                onClick={() => {
                  setFlashcardIndex(prev => Math.min(filteredTerms.length - 1, prev + 1));
                  setShowFlashcardAnswer(false);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 dark:bg-blue-600 text-white text-xs font-medium disabled:opacity-40 hover:bg-blue-800 dark:hover:bg-blue-500 cursor-pointer flex items-center gap-1"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
