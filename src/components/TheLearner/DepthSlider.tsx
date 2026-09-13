import React from 'react';
import { LearnerDepth } from '../../types';
import { Compass, BookOpen, Cpu, Sparkles, FileCode } from 'lucide-react';

interface DepthSliderProps {
  depth: LearnerDepth;
  onChange: (depth: LearnerDepth) => void;
}

export const DepthSlider: React.FC<DepthSliderProps> = ({ depth, onChange }) => {
  const meta: Record<LearnerDepth, { label: string; desc: string; color: string; border: string; bg: string; icon: React.ReactNode }> = {
    1: {
      label: 'Tier 1: Dumb It Down (ELI5)',
      desc: 'Zero equations, everyday metaphors, visual intuition first',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/30',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />
    },
    2: {
      label: 'Tier 2: Undergraduate Foundations',
      desc: 'Vectors, linear algebra, fundamental mechanics and mathematical setup',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/30',
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />
    },
    3: {
      label: 'Tier 3: Advanced Architecture & Code',
      desc: 'Formulas in KaTeX, PyTorch implementation snippets, tensor shapes',
      color: 'text-indigo-400',
      border: 'border-indigo-500/40',
      bg: 'bg-indigo-950/30',
      icon: <FileCode className="w-4 h-4 text-indigo-400" />
    },
    4: {
      label: 'Tier 4: Frontier Research (ArXiv)',
      desc: 'Seminal papers, FlashAttention, Mamba, memory bottlenecks & modern SOTA',
      color: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/30',
      icon: <Cpu className="w-4 h-4 text-purple-400" />
    },
    5: {
      label: 'Tier 5: The Obscure Rabbit Hole',
      desc: 'Continuous Hopfield energy, Erlangen symmetries, over-squashing & deep paradoxes',
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/30',
      icon: <Compass className="w-4 h-4 text-rose-400" />
    }
  };

  const current = meta[depth];

  return (
    <div className="p-4 rounded-xl bg-[#0c121e] border border-purple-500/30 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {current.icon}
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${current.color}`}>
            {current.label}
          </span>
        </div>
        <span className="text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
          Cognitive Depth {depth}/5
        </span>
      </div>

      <p className="text-xs text-slate-400">
        {current.desc}
      </p>

      {/* Discrete 5-tier buttons */}
      <div className="grid grid-cols-5 gap-1.5 pt-1">
        {([1, 2, 3, 4, 5] as LearnerDepth[]).map(d => (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`py-2 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center gap-1 border ${
              depth === d
                ? `${meta[d].bg} ${meta[d].border} ${meta[d].color} shadow-lg`
                : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
            }`}
          >
            <span>Tier {d}</span>
            <div className={`w-2 h-2 rounded-full ${depth === d ? 'bg-current' : 'bg-slate-700'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
