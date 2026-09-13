import React from 'react';
import { DifficultyLevel } from '../../types';
import { Gauge, Zap, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface DifficultySliderProps {
  level: DifficultyLevel;
  onChange: (level: DifficultyLevel) => void;
}

export const DifficultySlider: React.FC<DifficultySliderProps> = ({ level, onChange }) => {
  const meta: Record<DifficultyLevel, { label: string; desc: string; color: string; border: string; bg: string; icon: React.ReactNode }> = {
    1: {
      label: 'Level 1: Direct Recall',
      desc: 'NCERT definitions, direct fact retrieval & baseline memory checks',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/30',
      icon: <Gauge className="w-4 h-4 text-emerald-400" />
    },
    2: {
      label: 'Level 2: Standard Application',
      desc: 'Single-formula calculations, straightforward conceptual connections',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/30',
      icon: <Zap className="w-4 h-4 text-cyan-400" />
    },
    3: {
      label: 'Level 3: NEET Standard',
      desc: 'Typical NTA examination questions, past-year-question standard',
      color: 'text-indigo-400',
      border: 'border-indigo-500/40',
      bg: 'bg-indigo-950/30',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />
    },
    4: {
      label: 'Level 4: Assertion & Reason / Traps',
      desc: 'Carefully placed language traps, multi-statement evaluations & A/R',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/30',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />
    },
    5: {
      label: 'Level 5: Brain-Twister',
      desc: 'High-order multi-step synthesis, cross-chapter links & deep traps',
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/30',
      icon: <Flame className="w-4 h-4 text-rose-400" />
    }
  };

  const current = meta[level];

  return (
    <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {current.icon}
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${current.color}`}>
            {current.label}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Difficulty {level}/5
        </span>
      </div>

      <p className="text-xs text-slate-400">
        {current.desc}
      </p>

      {/* Discrete 5-step buttons */}
      <div className="grid grid-cols-5 gap-1.5 pt-1">
        {([1, 2, 3, 4, 5] as DifficultyLevel[]).map(lvl => (
          <button
            key={lvl}
            onClick={() => onChange(lvl)}
            className={`py-2 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center gap-1 border ${
              level === lvl
                ? `${meta[lvl].bg} ${meta[lvl].border} ${meta[lvl].color} shadow-lg`
                : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
            }`}
          >
            <span>L{lvl}</span>
            <div className={`w-2 h-2 rounded-full ${level === lvl ? 'bg-current' : 'bg-slate-700'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
