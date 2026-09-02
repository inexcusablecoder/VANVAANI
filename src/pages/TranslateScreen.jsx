import React, { useState } from 'react';
import { Languages, Volume2, CheckCircle, RefreshCw, ThumbsUp, Edit3, Sparkles } from 'lucide-react';
import { AIService } from '../services/mockAIService';
import { SUPPORTED_LANGUAGES, MOCK_FLN_DICTIONARY } from '../services/languageService';

export default function TranslateScreen({ selectedLang, targetGrade }) {
  const [inputText, setInputText] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleTranslate = async (textToTranslate = inputText) => {
    if (!textToTranslate.trim()) return;
    setLoading(true);
    const result = await AIService.translateText(textToTranslate, selectedLang);
    setTranslationResult(result);
    setLoading(false);
  };

  const playAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Curriculum-Bounded Text Translator</h2>
            <p className="text-xs text-slate-400">Hindi ↔ {currentLang.name} ({currentLang.script})</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
          Domain Scope: ~2,500 FLN Phrases
        </span>
      </div>

      {/* Dual Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HINDI INPUT PANEL */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-extrabold text-amber-400 uppercase tracking-wide">
                Teacher Spoken / Written Hindi
              </label>
              <span className="text-[10px] text-slate-400 font-medium">Input Source</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="यहाँ शिक्षक वाक्य या निर्देश लिखें... (उदाहरण: बच्चों, आज हम 1 से 10 तक संख्याएँ सीखेंगे)"
              className="w-full h-36 bg-slate-950/80 text-slate-100 placeholder-slate-500 p-4 rounded-xl border border-slate-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 outline-none text-sm leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setInputText('बच्चों, अपनी किताब निकालिए और पृष्ठ 5 खोलिए।')}
              className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Sample Instruction
            </button>

            <button
              onClick={() => handleTranslate()}
              disabled={loading || !inputText.trim()}
              className="btn-primary py-2.5 px-5 text-xs font-bold"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Matching...
                </>
              ) : (
                <>
                  Translate to {currentLang.name}
                </>
              )}
            </button>
          </div>
        </div>

        {/* TARGET TRIBAL LANGUAGE OUTPUT PANEL */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-extrabold text-teal-400 uppercase tracking-wide flex items-center gap-2">
                <span>{currentLang.name} Output</span>
                <span className="text-[10px] text-amber-300 font-serif font-bold">({currentLang.nativeName})</span>
              </label>
              {translationResult && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {translationResult.confidence * 100}% Confidence
                </span>
              )}
            </div>

            <div className="w-full h-36 bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              {translationResult ? (
                <div>
                  <p className="text-base font-bold text-amber-300 font-serif leading-relaxed mb-2">
                    {translationResult.translatedText}
                  </p>
                  <p className="text-xs text-slate-400">
                    Match Type: <span className="text-slate-200 font-medium">{translationResult.matchType}</span>
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic my-auto text-center">
                  Select a phrase or enter Hindi text above to see localized {currentLang.name} classroom output.
                </p>
              )}
            </div>
          </div>

          {/* Action Row */}
          {translationResult && (
            <div className="flex items-center justify-between mt-4 border-t border-slate-800/80 pt-3">
              <button
                onClick={playAudio}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 animate-pulse'
                    : 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Synthesizing TTS...' : 'Play Audio Speech'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Translation marked as validated by teacher.')}
                  className="p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-1"
                  title="Confirm Translation"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert('Correction queued in local SyncQueue for expert review.')}
                  className="p-2 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-1"
                  title="Suggest Correction"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK FLN PHRASE TILES */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Frequent NIPUN Bharat FLN Classroom Phrases
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_FLN_DICTIONARY.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setInputText(item.hindi);
                handleTranslate(item.hindi);
              }}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-teal-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400">{item.confidence} Match</span>
              </div>
              <p className="text-xs font-semibold text-slate-200 line-clamp-1">{item.hindi}</p>
              <p className="text-xs text-amber-300 font-serif mt-1 line-clamp-1">
                {item[selectedLang === 'sat' ? 'santhali' : selectedLang === 'mun' ? 'mundari' : 'ho']}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
