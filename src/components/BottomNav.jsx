import React from 'react';
import { 
  Home, 
  Languages, 
  Mic, 
  BookOpenCheck, 
  FileText, 
  Layers, 
  HardDriveDownload, 
  MessageSquareDiff 
} from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'translate', label: 'Translate', icon: Languages },
    { id: 'voice', label: 'Voice AI', icon: Mic, highlight: true },
    { id: 'lessons', label: 'Lessons', icon: BookOpenCheck },
    { id: 'worksheets', label: 'Worksheets', icon: FileText },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'offline', label: 'Offline', icon: HardDriveDownload },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareDiff },
  ];

  return (
    <nav className="glass-panel fixed bottom-0 left-0 right-0 z-40 border-t border-slate-700/80 px-2 py-2 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-around gap-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all min-w-[58px] ${
                isActive
                  ? item.highlight 
                    ? 'bg-gradient-to-tr from-amber-600 to-rose-500 text-white shadow-lg shadow-amber-900/40 scale-105' 
                    : 'bg-slate-800 text-amber-400 border border-slate-700 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-semibold tracking-tight mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
