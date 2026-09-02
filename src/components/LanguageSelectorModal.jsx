import React from 'react';
import { X, Check, Globe, Info, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function LanguageSelectorModal({ isOpen, onClose, selectedLang, setSelectedLang, targetGrade, setTargetGrade }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Select Tribal Target Language</h2>
            <p className="text-xs text-slate-400">Aligned with Jharkhand PALASH MTB-MLE Programme</p>
          </div>
        </div>

        {/* Language Options List */}
        <div className="space-y-3 mb-6">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-md shadow-amber-950/30'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.badgeColor }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-100 text-sm">{lang.name}</h3>
                      <span className="text-xs text-amber-300 font-serif font-bold">{lang.nativeName}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Script: <span className="text-slate-200 font-medium">{lang.script}</span> • Speakers: {lang.speakerCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-semibold">
                    {lang.status}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Target Grade Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Classroom Grade Level (NIPUN Bharat FLN Scope)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Grade 1', 'Grade 2', 'Grade 3'].map((grade) => (
              <button
                key={grade}
                onClick={() => setTargetGrade(grade)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  targetGrade === grade
                    ? 'bg-gradient-to-r from-amber-600 to-rose-600 border-amber-400 text-white shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Language packs run 100% on-device via quantized TFLite/ONNX models without relying on remote API calls.
          </span>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="btn-primary w-full mt-4 justify-center"
        >
          Confirm Language & Grade
        </button>
      </div>
    </div>
  );
}
