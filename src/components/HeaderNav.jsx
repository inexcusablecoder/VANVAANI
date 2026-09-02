import React from 'react';
import { Globe, WifiOff, Award, ChevronDown, BookOpen } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function HeaderNav({ selectedLang, setSelectedLang, openLangModal }) {
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="glass-panel sticky top-0 z-40 px-4 py-3 border-b border-slate-700/60 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Badges */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center shadow-md shadow-amber-900/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-rose-300 to-teal-200 bg-clip-text text-transparent">
                VANVAANI
              </h1>
              <span className="badge-sih hidden sm:inline-flex items-center gap-1">
                <Award className="w-3 h-3 text-teal-400" /> SIH26042
              </span>
              <span className="badge-nipun hidden md:inline-flex">PALASH FLN</span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Every Language. Every Classroom. • Govt. of Jharkhand
            </p>
          </div>
        </div>

        {/* Controls: Language Picker & Offline Indicator */}
        <div className="flex items-center gap-2">
          {/* Offline Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <WifiOff className="w-3.5 h-3.5" />
            <span>100% Offline Mode</span>
          </div>

          {/* Language Selector Button */}
          <button
            onClick={openLangModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/60 text-slate-100 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span className="truncate max-w-[100px] sm:max-w-none">
              Hindi ↔ {currentLang.name} ({currentLang.script.split(' ')[0]})
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
