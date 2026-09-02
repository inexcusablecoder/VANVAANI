import React from 'react';
import { 
  Mic, 
  Languages, 
  BookOpenCheck, 
  FileText, 
  Layers, 
  HardDriveDownload, 
  MessageSquareDiff, 
  Sparkles, 
  Award, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function HomeDashboard({ setActiveTab, selectedLang, targetGrade, openLangModal }) {
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const quickActions = [
    {
      id: 'voice',
      title: 'Live Voice Companion',
      subtitle: 'Two-way teacher-student voice translation',
      icon: Mic,
      gradient: 'from-amber-600 to-rose-600',
      badge: '<3s Offline Latency'
    },
    {
      id: 'translate',
      title: 'Text Translation',
      subtitle: 'Classroom phrase & sentence lookup',
      icon: Languages,
      gradient: 'from-teal-600 to-emerald-600',
      badge: 'FLN Phrase Bank'
    },
    {
      id: 'lessons',
      title: 'Lesson Builder',
      subtitle: 'Structured NIPUN Bharat lesson plans',
      icon: BookOpenCheck,
      gradient: 'from-indigo-600 to-blue-600',
      badge: 'Curriculum Synced'
    },
    {
      id: 'worksheets',
      title: 'Worksheet Studio',
      subtitle: 'Generate printable bilingual exercise sheets',
      icon: FileText,
      gradient: 'from-purple-600 to-pink-600',
      badge: 'Printable Cards'
    },
    {
      id: 'flashcards',
      title: 'Visual Flashcards',
      subtitle: 'Interactive script & audio word cards',
      icon: Layers,
      gradient: 'from-rose-600 to-amber-600',
      badge: 'Ol Chiki Audio'
    },
    {
      id: 'offline',
      title: 'Offline Language Center',
      subtitle: 'Manage local language packs & storage',
      icon: HardDriveDownload,
      gradient: 'from-emerald-600 to-teal-700',
      badge: '142MB Cached'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-24 space-y-8 animate-fade-in">
      {/* Top Banner: Teacher Greeting & Context */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-sih">SIH26042</span>
              <span className="text-xs font-bold text-amber-400">Govt. of Jharkhand • Department of Education</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Jharkhand Primary Classroom Assistant
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Bridging Hindi-medium educators and primary students in <span className="text-amber-300 font-bold">{currentLang.name} ({currentLang.nativeName})</span> under the <span className="text-teal-300 font-bold">PALASH MTB-MLE</span> rollout.
            </p>
          </div>

          {/* Context Card */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Active Target</p>
              <p className="text-sm font-extrabold text-amber-400">{currentLang.name}</p>
              <p className="text-[11px] text-slate-300 font-medium">{targetGrade} • {currentLang.script.split(' ')[0]}</p>
            </div>
            <button
              onClick={openLangModal}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Primary Feature Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Classroom Tools & Pedagogy Assistants
          </h3>
          <span className="text-xs text-slate-400">Select any tool to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-md hover:shadow-xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${action.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-700">
                    {action.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  {action.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {action.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FLN Pedagogical Tip & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NIPUN Bharat FLN Daily Tip */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-extrabold text-slate-200">Daily NIPUN Bharat FLN Teaching Insight</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            "When introducing counting in Grade 1, start with physical classroom objects (pebbles, leaves) while saying numbers first in the student's mother tongue ({currentLang.nativeName}), then bridging to Hindi."
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PALASH Curriculum Verified</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Topic: Foundational Numeracy</span>
          </div>
        </div>

        {/* Classroom Activity Metric Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Offline Status</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">100% Ready</div>
            <p className="text-xs text-emerald-400 font-semibold mt-1">
              {currentLang.name} FLN Dictionary Active
            </p>
          </div>
          <button
            onClick={() => setActiveTab('feedback')}
            className="btn-secondary w-full text-xs justify-center mt-4"
          >
            <MessageSquareDiff className="w-4 h-4 text-amber-400" /> Submit Teacher Correction
          </button>
        </div>
      </div>
    </div>
  );
}
