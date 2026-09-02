import React from 'react';
import { BookOpen, Sparkles, Award, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function SplashScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-md w-full glass-panel-elevated p-8 rounded-3xl text-center z-10 animate-fade-in border border-amber-500/30">
        {/* SIH Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 mb-6 text-amber-300 text-xs font-bold shadow-inner">
          <Award className="w-4 h-4 text-amber-400" />
          <span>SIH 2026 • Problem Statement SIH26042</span>
        </div>

        {/* Logo Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-amber-600 via-rose-500 to-teal-400 p-0.5 shadow-xl shadow-amber-950/50 animate-pulse-glow">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        {/* App Title & Tagline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          VANVAANI
        </h1>
        <p className="text-sm font-semibold text-amber-300 mb-4 tracking-wide uppercase">
          Every Language. Every Classroom.
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          AI-Powered Vernacular Pedagogy & Real-Time Classroom Translation Assistant for Primary Education in Jharkhand.
        </p>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 gap-2 mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
            <Cpu className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Sub-3s Offline MT</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>PALASH MTB-MLE</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300 col-span-2">
            <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Santhali (Ol Chiki) • Mundari • Ho</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="btn-primary w-full py-4 text-base font-bold justify-center rounded-2xl group shadow-lg shadow-amber-900/40"
        >
          <span>Enter Classroom Companion</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Department Footer */}
        <p className="text-[11px] text-slate-500 mt-6 font-medium">
          Department of Higher & Technical Education / Department of School Education & Literacy, Govt. of Jharkhand
        </p>
      </div>
    </div>
  );
}
