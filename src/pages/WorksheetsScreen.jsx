import React, { useState } from 'react';
import { FileText, Printer, Download, Sparkles, CheckSquare } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function WorksheetsScreen({ selectedLang, targetGrade }) {
  const [worksheetTitle, setWorksheetTitle] = useState('Counting & Matching Exercise 1-5');
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const exercises = [
    {
      qNum: 1,
      hindiQ: 'चित्रों को गिनिए और सही संख्या मिलाइए:',
      targetQ: currentLang.id === 'sat' ? 'ᱪᱤᱛᱟᱹᱨ ᱞᱮᱠᱷᱟ ᱯᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱞᱮᱠᱷᱟ ᱥᱟᱶ ᱢᱤᱞᱟᱹᱣ ᱯᱮ:' : 'चित्र को लेका पे और सही संख्या मिलाओ पे:',
      items: ['🍎 🍎 🍎 (3)', '🐶 🐶 (2)', '⭐ (1)']
    },
    {
      qNum: 2,
      hindiQ: 'रिक्त स्थान भरिए (Fill in the blanks):',
      targetQ: currentLang.id === 'sat' ? 'ᱯᱷᱟᱸᱠᱟ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡ ᱯᱮ:' : 'खाली ठाव पेरेज पे:',
      items: ['1, __, 3, 4, __', 'ᱢᱤᱫ, __, ᱯᱮ, ᱯᱩᱱ, __']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Bilingual Worksheet Studio</h2>
            <p className="text-xs text-slate-400">Hindi + {currentLang.name} Activity Sheets</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs py-2 px-3"
          >
            <Printer className="w-4 h-4 text-purple-400" /> Print Sheet
          </button>
        </div>
      </div>

      {/* WORKSHEET PREVIEW CARD */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-6">
        {/* Worksheet Header Box */}
        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                NIPUN FLN Worksheet • {targetGrade}
              </span>
              <span className="text-[10px] font-bold text-amber-300 font-serif">{currentLang.nativeName}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">{worksheetTitle}</h3>
          </div>
          <div className="text-xs text-slate-400">
            <span>School: ________________</span>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {exercises.map((ex) => (
            <div key={ex.qNum} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  Q{ex.qNum}
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-300">{ex.hindiQ}</p>
                  <p className="text-sm font-bold text-amber-300 font-serif mt-0.5">{ex.targetQ}</p>
                </div>
              </div>

              {/* Items / Options */}
              <div className="pl-8 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ex.items.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>VANVAANI Classroom Assistant • Govt. of Jharkhand</span>
          <span>FLN Competency Code: FLN-MATH-G1-04</span>
        </div>
      </div>
    </div>
  );
}
