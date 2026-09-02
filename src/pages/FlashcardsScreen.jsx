import React, { useState } from 'react';
import { Layers, Volume2, ArrowLeft, ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function FlashcardsScreen({ selectedLang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const flashcards = [
    {
      id: 1,
      hindi: 'एक (One)',
      santhali: 'ᱢᱤᱫ',
      phonetic: 'Mid',
      mundari: 'मिद',
      ho: 'मिद',
      category: 'Numbers',
      icon: '1️⃣'
    },
    {
      id: 2,
      hindi: 'पानी (Water)',
      santhali: 'ᱫᱟᱜ',
      phonetic: 'Daah',
      mundari: 'दाः',
      ho: 'दाः',
      category: 'EVS / Essentials',
      icon: '💧'
    },
    {
      id: 3,
      hindi: 'किताब (Book)',
      santhali: 'ᱯᱩᱛᱷᱤ',
      phonetic: 'Puthi',
      mundari: 'पुथी',
      ho: 'पुथी',
      category: 'Classroom',
      icon: '📚'
    },
    {
      id: 4,
      hindi: 'सूर्य / धूप (Sun)',
      santhali: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ',
      phonetic: 'Sing Chando',
      mundari: 'सिंग चांदो',
      ho: 'सिंग चांदो',
      category: 'Nature',
      icon: '☀️'
    }
  ];

  const card = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const playAudio = (e) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2200);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in text-center">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="text-base font-extrabold text-white">Visual Vocabulary Flashcards</h2>
            <p className="text-xs text-slate-400">Mother Tongue Script & Audio • {currentLang.name}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      {/* FLASHCARD CONTAINER */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 glass-panel-elevated rounded-3xl p-8 border border-amber-500/40 cursor-pointer relative flex flex-col items-center justify-between shadow-2xl transition-all duration-500 hover:scale-[1.02]"
      >
        {/* Top Card Badge */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-amber-400">{card.category}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <RotateCw className="w-3.5 h-3.5" /> Tap to Flip
          </span>
        </div>

        {/* Card Content */}
        <div className="my-auto">
          <div className="text-5xl mb-4 animate-bounce">{card.icon}</div>

          {!isFlipped ? (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Hindi Word</p>
              <h3 className="text-3xl font-extrabold text-white">{card.hindi}</h3>
            </div>
          ) : (
            <div className="animate-fade-in">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">
                {currentLang.name} ({currentLang.script.split(' ')[0]})
              </p>
              <h3 className="text-4xl font-extrabold text-amber-300 font-serif mb-2">
                {selectedLang === 'sat' ? card.santhali : selectedLang === 'mun' ? card.mundari : card.ho}
              </h3>
              <p className="text-sm font-semibold text-slate-300">Phonetic: "{card.phonetic}"</p>
            </div>
          )}
        </div>

        {/* Audio Button */}
        <div className="w-full flex items-center justify-center pt-4 border-t border-slate-800">
          <button
            onClick={playAudio}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isPlayingAudio
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40 animate-pulse'
                : 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Playing TTS Audio...' : 'Listen Pronunciation'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button onClick={handlePrev} className="btn-secondary flex-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Previous Card
        </button>
        <button onClick={handleNext} className="btn-primary flex-1 justify-center">
          Next Card <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
