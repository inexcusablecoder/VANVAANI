import React, { useState } from 'react';
import { Globe, BookOpen, WifiOff, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function OnboardingScreen({ onComplete, selectedLang, setSelectedLang, targetGrade, setTargetGrade }) {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl animate-fade-in relative">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-10 bg-amber-500'
                    : s < step
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400">Step {step} of 3</span>
        </div>

        {/* STEP 1: Language Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-100">Select Classroom Mother Tongue</h2>
                <p className="text-xs text-slate-400">Which tribal language do your primary students speak at home?</p>
              </div>
            </div>

            <div className="space-y-3 my-6">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.id;
                return (
                  <div
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/40'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: lang.badgeColor }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-100">{lang.name}</h3>
                          <span className="text-xs text-amber-300 font-bold">{lang.nativeName}</span>
                        </div>
                        <p className="text-xs text-slate-400">Script: {lang.script} • {lang.speakerCount} Speakers</p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-amber-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Grade Selection */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-100">Select Primary Grade Level</h2>
                <p className="text-xs text-slate-400">Aligned with NIPUN Bharat Foundational Literacy & Numeracy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 my-6">
              {[
                { id: 'Grade 1', title: 'Grade 1 (Foundational)', desc: 'Focus on oral communication, picture vocabulary, numbers 1-20' },
                { id: 'Grade 2', title: 'Grade 2 (Intermediate)', desc: 'Focus on short sentences, counting 1-50, EVS surroundings' },
                { id: 'Grade 3', title: 'Grade 3 (Advanced FLN)', desc: 'Focus on basic reading comprehension, addition/subtraction, bilingual tasks' }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setTargetGrade(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    targetGrade === item.id
                      ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-100 text-sm">{item.title}</h3>
                    {targetGrade === item.id && <CheckCircle2 className="w-5 h-5 text-rose-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Offline Ready Overview */}
        {step === 3 && (
          <div className="animate-fade-in text-center">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 mb-4">
              <WifiOff className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100 mb-2">Ready for Offline Classroom Teaching</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
              VANVAANI has loaded your <span className="text-amber-300 font-bold">{selectedLang.toUpperCase()}</span> offline language pack and <span className="text-amber-300 font-bold">{targetGrade}</span> NIPUN Bharat FLN phrase dictionary into memory.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2 mb-6">
              <div className="flex items-center justify-between text-slate-300">
                <span>Selected Language:</span>
                <span className="font-bold text-amber-400 uppercase">{selectedLang}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Target Grade:</span>
                <span className="font-bold text-teal-400">{targetGrade}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>On-Device Storage:</span>
                <span className="font-bold text-emerald-400">142 MB Cached</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn-primary"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="btn-primary py-3.5 px-6"
            >
              Launch Dashboard <CheckCircle2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
