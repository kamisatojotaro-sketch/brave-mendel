import React from 'react';
import { Target, GraduationCap, Compass, BookOpen, Clock, Eye, Sliders, Sparkles } from 'lucide-react';

export type ActiveWing = 'neet' | 'board' | 'learner';

interface NavbarProps {
  activeWing: ActiveWing;
  onSelectWing: (wing: ActiveWing) => void;
  bionicEnabled: boolean;
  onToggleBionic: () => void;
  onOpenTimer: () => void;
  onOpenMistakes: () => void;
  onOpenSettings: () => void;
  mistakeCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeWing,
  onSelectWing,
  bionicEnabled,
  onToggleBionic,
  onOpenTimer,
  onOpenMistakes,
  onOpenSettings,
  mistakeCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#070b13]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Concept */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-md shadow-indigo-900/40 border border-indigo-400/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white font-mono text-base">SYNAPSE</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-700/50 text-indigo-300">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              ADHD Cognitive Mastery • NEET & Deep Diver
            </p>
          </div>
        </div>

        {/* 3 Core Wings Selector */}
        <nav className="flex items-center p-1 rounded-xl bg-[#0d1424] border border-slate-800">
          <button
            onClick={() => onSelectWing('neet')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeWing === 'neet'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>NEET Arena</span>
          </button>

          <button
            onClick={() => onSelectWing('board')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeWing === 'board'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-teal-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>NCERT Board Lab</span>
          </button>

          <button
            onClick={() => onSelectWing('learner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeWing === 'learner'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>The Learner</span>
          </button>
        </nav>

        {/* ADHD Toolkit Actions */}
        <div className="flex items-center gap-2">
          {/* Bionic Toggle */}
          <button
            onClick={onToggleBionic}
            title="Toggle Bionic Reading Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
              bionicEnabled
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'border-slate-800 bg-[#0d1424] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Bionic</span>
          </button>

          {/* Focus Sprint Timer */}
          <button
            onClick={onOpenTimer}
            title="ADHD Flow State Timer & Ambient Noise"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-800 bg-[#0d1424] text-slate-300 hover:text-white hover:border-indigo-500/50 transition"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Flow Sprint</span>
          </button>

          {/* Mistake Vault Button */}
          <button
            onClick={onOpenMistakes}
            title="Open Error Notebook / Mistake Vault"
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-800 bg-[#0d1424] text-slate-300 hover:text-white hover:border-rose-500/50 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Mistakes</span>
            {mistakeCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold font-mono rounded-full bg-rose-600 text-white">
                {mistakeCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Settings & API Configuration"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
