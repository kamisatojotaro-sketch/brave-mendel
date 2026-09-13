import React from 'react';
import { ChapterSummary } from '../../types';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { BionicText } from '../BionicText';
import { Sparkles, AlertTriangle, Key, BookOpen, Compass } from 'lucide-react';

interface ChapterSummarizerProps {
  summary: ChapterSummary;
  bionicEnabled: boolean;
}

export const ChapterSummarizer: React.FC<ChapterSummarizerProps> = ({ summary, bionicEnabled }) => {
  return (
    <div className="space-y-6">
      {/* Chapter Overview (ELI5) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e172a] to-[#0c1220] border border-indigo-500/20 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
            {summary.chapterName} • Intuitive Mental Model
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <BionicText text={summary.eli5QuickGrasp} enabled={bionicEnabled} />
        </p>
      </div>

      {/* NCERT Line-by-Line Traps */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-amber-500/20 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
            NCERT Line-by-Line "Catch The Trap" Bullets
          </h3>
        </div>
        <div className="space-y-2.5">
          {summary.ncertTraps.map((trap, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                !
              </span>
              <div className="leading-relaxed">
                <BionicText text={trap} enabled={bionicEnabled} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Must Know Formulas */}
      {summary.mustKnowFormulas && summary.mustKnowFormulas.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0c121e] border border-cyan-500/20 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Key className="w-5 h-5" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
              Must-Know Formulas & Quantitative Relations
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summary.mustKnowFormulas.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
              >
                <div className="text-xs font-semibold text-slate-300">{item.name}</div>
                <div className="p-2 rounded-lg bg-[#070b13] border border-slate-800 text-center text-cyan-300 text-sm overflow-x-auto">
                  <KaTeXRenderer math={item.formula} block={true} />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  💡 {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mnemonics */}
      {summary.mnemonics && summary.mnemonics.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0c121e] border border-purple-500/20 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Compass className="w-5 h-5" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
              ADHD Memory Palace & Mnemonics
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {summary.mnemonics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2"
              >
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/40 font-semibold">
                  {m.topic}
                </span>
                <div className="text-xs font-bold text-white tracking-wide">
                  "{m.trick}"
                </div>
                <p className="text-[11px] text-purple-200/80">
                  <BionicText text={m.meaning} enabled={bionicEnabled} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
