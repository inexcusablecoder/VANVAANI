import React, { useState } from 'react';
import { MessageSquareDiff, Edit3, Send, CheckCircle2, ShieldAlert, Clock, RefreshCw } from 'lucide-react';
import { AIService } from '../services/mockAIService';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function FeedbackScreen({ selectedLang }) {
  const [originalPhrase, setOriginalPhrase] = useState('');
  const [correctedPhrase, setCorrectedPhrase] = useState('');
  const [queue, setQueue] = useState([
    {
      id: 'SYNC-101',
      originalText: 'बच्चों, अपनी किताब निकालिए',
      correctedText: 'ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱚᱰᱚᱠ ᱯᱮ ( Ol Chiki correction )',
      targetLang: 'sat',
      status: 'Queued in Local SyncQueue (Pending Wi-Fi Sync)'
    }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalPhrase.trim() || !correctedPhrase.trim()) return;

    setSubmitting(true);
    const newItem = await AIService.submitCorrection(originalPhrase, correctedPhrase, selectedLang);
    setQueue([newItem, ...queue]);
    setOriginalPhrase('');
    setCorrectedPhrase('');
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <MessageSquareDiff className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Teacher Feedback & Correction Loop</h2>
            <p className="text-xs text-slate-400">Human-in-the-Loop Validation Pipeline for {currentLang.name}</p>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Human-in-the-Loop Guarantee:</span> Teacher corrections are logged locally and queued for background sync. They enter the central PALASH linguist review queue for validation before inclusion in future phrase-bank updates.
        </div>
      </div>

      {/* Correction Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-amber-400" />
          Submit Translation Correction / New Phrase
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Hindi Original Phrase / Classroom Instruction
            </label>
            <input
              type="text"
              value={originalPhrase}
              onChange={(e) => setOriginalPhrase(e.target.value)}
              placeholder="e.g. पानी स्वच्छ रखना चाहिए"
              className="w-full bg-slate-950 text-slate-100 p-3 rounded-xl border border-slate-800 text-xs focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Suggested {currentLang.name} Correction ({currentLang.script.split(' ')[0]})
            </label>
            <input
              type="text"
              value={correctedPhrase}
              onChange={(e) => setCorrectedPhrase(e.target.value)}
              placeholder={`Write native ${currentLang.name} phrase...`}
              className="w-full bg-slate-950 text-amber-300 font-serif p-3 rounded-xl border border-slate-800 text-xs focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !originalPhrase.trim() || !correctedPhrase.trim()}
          className="btn-primary w-full py-3 text-xs font-bold justify-center"
        >
          {submitting ? 'Queueing Correction...' : 'Submit to Offline SyncQueue'}
        </button>
      </form>

      {/* SYNC QUEUE LIST */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-extrabold text-slate-100 mb-4 flex items-center justify-between">
          <span>Local Sync Queue ({queue.length} Pending Records)</span>
          <span className="text-xs font-normal text-slate-400">Syncs automatically when online</span>
        </h3>

        <div className="space-y-3">
          {queue.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono font-bold text-amber-400">{item.id}</span>
                <span className="flex items-center gap-1 text-[11px] text-amber-300">
                  <Clock className="w-3.5 h-3.5" /> {item.status}
                </span>
              </div>
              <p className="text-slate-200 font-semibold">Hindi: {item.originalText}</p>
              <p className="text-amber-300 font-serif font-bold">Correction: {item.correctedText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
