import React, { useState } from 'react';
import { BookOpenCheck, Sparkles, Calculator, Sun, BookOpen, CheckCircle, Download, FileText } from 'lucide-react';
import { AIService } from '../services/mockAIService';
import { FLN_SUBJECTS, SUPPORTED_LANGUAGES } from '../services/languageService';

export default function LessonsScreen({ selectedLang, targetGrade }) {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [topic, setTopic] = useState('Counting Numbers 1 to 10');
  const [lessonPlan, setLessonPlan] = useState(null);
  const [generating, setGenerating] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleGenerateLesson = async () => {
    setGenerating(true);
    const plan = await AIService.generateLessonPlan(selectedSubject, topic, targetGrade, selectedLang);
    setLessonPlan(plan);
    setGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">NIPUN Bharat FLN Lesson Generator</h2>
            <p className="text-xs text-slate-400">Curriculum-Aligned Pedagogy in {currentLang.name}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-blue-300 border border-slate-700">
          {targetGrade} Scope
        </span>
      </div>

      {/* Subject & Topic Selection Form */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wide block">
          1. Select Foundational Subject
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FLN_SUBJECTS.map((subj) => (
            <button
              key={subj.id}
              onClick={() => setSelectedSubject(subj.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedSubject === subj.id
                  ? 'bg-blue-950/40 border-blue-500/80 shadow-md shadow-blue-950/40'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
              }`}
            >
              <p className="text-xs font-bold text-slate-100">{subj.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">{subj.description}</p>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wide block mb-2">
            2. Lesson Topic / FLN Competency
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Counting Numbers 1-10, Clean Water Hygiene..."
            className="w-full bg-slate-950 text-slate-100 p-3 rounded-xl border border-slate-800 text-sm focus:border-blue-500 outline-none"
          />
        </div>

        <button
          onClick={handleGenerateLesson}
          disabled={generating || !topic.trim()}
          className="btn-primary w-full py-3 text-xs font-bold justify-center"
        >
          {generating ? 'Generating Lesson Plan...' : `Generate ${currentLang.name} Lesson Plan`}
        </button>
      </div>

      {/* GENERATED LESSON PLAN CARD */}
      {lessonPlan && (
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/40 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                {lessonPlan.curriculum}
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">{lessonPlan.title}</h3>
            </div>
            <button
              onClick={() => alert('Lesson Plan saved to local offline cache.')}
              className="btn-secondary text-xs"
            >
              <Download className="w-4 h-4 text-blue-400" /> Save Offline
            </button>
          </div>

          {/* Objectives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-1">Hindi Learning Objective</h4>
              <p className="text-xs text-slate-200">{lessonPlan.objectiveHindi}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-xs font-bold text-teal-400 uppercase mb-1">{currentLang.name} Learning Objective</h4>
              <p className="text-xs font-serif font-bold text-amber-300">{lessonPlan.objectiveTarget}</p>
            </div>
          </div>

          {/* Bilingual Vocabulary Table */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wide mb-3">
              Essential Classroom Vocabulary ({currentLang.name})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {lessonPlan.vocabulary.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-xs text-slate-400 font-medium">{v.hindi}</p>
                  <p className="text-sm font-bold text-amber-300 font-serif mt-1">{v.target}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Classroom Activities */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wide mb-2">
              Recommended Classroom Activities
            </h4>
            <ul className="space-y-2">
              {lessonPlan.activities.map((act, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
