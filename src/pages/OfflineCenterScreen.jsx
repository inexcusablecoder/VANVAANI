import React from 'react';
import { HardDriveDownload, WifiOff, CheckCircle2, RefreshCw, Cpu, Database, Server } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/languageService';

export default function OfflineCenterScreen({ selectedLang }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <HardDriveDownload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Offline Language Pack & Storage Center</h2>
            <p className="text-xs text-slate-400">Zero Connectivity Classroom Engine</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <WifiOff className="w-3.5 h-3.5" /> 100% Offline Active
        </span>
      </div>

      {/* Storage & Memory Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Cached Dictionary</p>
            <p className="text-base font-extrabold text-white">2,850 FLN Phrases</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Quantized AI Models</p>
            <p className="text-base font-extrabold text-white">142 MB (INT8 TFLite)</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">RAM Footprint</p>
            <p className="text-base font-extrabold text-white">184 MB / 2 GB Max</p>
          </div>
        </div>
      </div>

      {/* Language Packs List */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-extrabold text-slate-100 mb-4">Downloaded Language Packs</h3>

        <div className="space-y-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <div
                key={lang.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.badgeColor }} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{lang.name} ({lang.nativeName})</h4>
                    <p className="text-xs text-slate-400">Script: {lang.script} • Version 1.0.4</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isSelected ? (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Installed & Active
                    </span>
                  ) : (
                    <button
                      onClick={() => alert(`Language Pack for ${lang.name} queued for download.`)}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      <HardDriveDownload className="w-4 h-4 text-amber-400" /> Download Pack (45MB)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
