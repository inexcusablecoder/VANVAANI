import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Radio, CheckCircle2, User, UserCheck, RefreshCw } from 'lucide-react';
import { AIService } from '../services/mockAIService';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function VoiceTranslatorScreen({ selectedLang, targetGrade }) {
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleToggleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('Listening to classroom speech...');
      setTranslation(null);

      // Simulate 2.5 second classroom speech capture
      setTimeout(async () => {
        setIsRecording(false);
        setProcessing(true);
        const res = await AIService.transcribeAudio(null);
        setTranscript(res.text);

        const trans = await AIService.translateText(res.text, selectedLang);
        setTranslation(trans);
        setProcessing(false);

        // Auto trigger audio playback
        setIsPlayingAudio(true);
        setTimeout(() => setIsPlayingAudio(false), 2800);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in text-center">
      {/* Title & Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner">
        <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Two-Way Live Voice Companion • On-Device ASR & TTS</span>
      </div>

      <h2 className="text-2xl font-extrabold text-white">
        Classroom Spoken Voice Translator
      </h2>
      <p className="text-xs text-slate-400 max-w-md mx-auto">
        Speak Hindi classroom instructions naturally. VANVAANI transcribes, maps FLN keywords, and speaks out in <span className="text-amber-300 font-bold">{currentLang.name} ({currentLang.script})</span>.
      </p>

      {/* Main Microphone Interaction Circle */}
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="relative">
          {/* Animated Wave Rings when recording */}
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
              <div className="absolute -inset-4 rounded-full bg-rose-500/10 animate-pulse" />
            </>
          )}

          <button
            onClick={handleToggleRecord}
            disabled={processing}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative z-10 shadow-2xl ${
              isRecording
                ? 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white scale-110 shadow-rose-950/80 ring-4 ring-amber-400'
                : 'bg-gradient-to-tr from-amber-600 via-rose-600 to-teal-600 text-white hover:scale-105 shadow-amber-950/50'
            }`}
          >
            {processing ? (
              <RefreshCw className="w-10 h-10 animate-spin text-white" />
            ) : isRecording ? (
              <Mic className="w-12 h-12 text-white animate-bounce" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
            <span className="text-[11px] font-extrabold mt-1 uppercase tracking-wider">
              {processing ? 'Processing' : isRecording ? 'Listening...' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-400 mt-4">
          {isRecording
            ? '🎙️ Capturing Hindi audio buffer...'
            : processing
            ? '🧠 Running IndicWav2Vec ASR & Match Engine...'
            : 'Tap mic button to speak classroom instruction'}
        </p>
      </div>

      {/* Live Audio Waveform Simulation */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1.5 h-12 py-2">
          {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70].map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-amber-500 to-rose-500 rounded-full animate-pulse"
              style={{ height: `${height}%`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      )}

      {/* RESULT CARDS DISPLAY */}
      {translation && (
        <div className="glass-panel-elevated p-6 rounded-3xl border border-amber-500/40 text-left space-y-4 animate-fade-in shadow-2xl">
          {/* Hindi Recognized Speech */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <User className="w-3.5 h-3.5" /> Teacher Spoken Hindi (ASR)
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">IndicWav2Vec • 96% Match</span>
            </div>
            <p className="text-sm font-semibold text-slate-100">{transcript}</p>
          </div>

          {/* Target Tribal Language Translation & Audio Output */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1 font-bold text-teal-400">
                <UserCheck className="w-3.5 h-3.5" /> Student Classroom Audio ({currentLang.name})
              </span>
              <span className="text-[10px] text-amber-300 font-serif font-bold">{currentLang.nativeName}</span>
            </div>

            <p className="text-lg font-bold text-amber-300 font-serif mb-3 leading-relaxed">
              {translation.translatedText}
            </p>

            {/* Audio Synthesis Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPlayingAudio(true);
                    setTimeout(() => setIsPlayingAudio(false), 2500);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40 animate-pulse'
                      : 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Playing VITS TTS Audio...' : 'Replay Audio Output'}</span>
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-medium">Latency: &lt;1.4s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
