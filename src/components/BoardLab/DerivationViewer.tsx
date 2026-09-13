import React, { useState } from 'react';
import { Derivation } from '../../types';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { BionicText } from '../BionicText';
import { Lightbulb, CheckCircle2, ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, BookOpen } from 'lucide-react';

interface DerivationViewerProps {
  derivation: Derivation;
  bionicEnabled: boolean;
}

export const DerivationViewer: React.FC<DerivationViewerProps> = ({ derivation, bionicEnabled }) => {
  // Array of revealed step numbers (starts with step 1 visible)
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [showEli5, setShowEli5] = useState<boolean>(true);

  const handleRevealNext = () => {
    if (revealedCount < derivation.steps.length) {
      setRevealedCount(prev => prev + 1);
    }
  };

  const handleRevealAll = () => {
    setRevealedCount(derivation.steps.length);
  };

  const handleReset = () => {
    setRevealedCount(1);
  };

  return (
    <div className="space-y-6">
      {/* Derivation Header */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-teal-500/30 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-teal-950/80 border border-teal-700/50 text-teal-300 font-semibold">
                {derivation.subject} • {derivation.chapter}
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                CBSE Frequency: {derivation.cbseFrequency}
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              {derivation.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {derivation.marksTypical} Marks Question
            </span>
          </div>
        </div>

        {/* Aim & Target Formula */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
          <div className="text-slate-400 font-mono">🎯 AIM OF DERIVATION:</div>
          <p className="text-slate-200">
            <BionicText text={derivation.aim} enabled={bionicEnabled} />
          </p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] font-mono text-teal-400 uppercase">Target Result:</span>
            <div className="text-teal-300 text-sm font-semibold">
              <KaTeXRenderer math={derivation.finalFormula} block={false} />
            </div>
          </div>
        </div>

        {/* ELI5 Summary */}
        <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <Lightbulb className="w-4 h-4 text-teal-400" />
              Dumb It Down (ELI5 Intuition):
            </div>
            <button
              onClick={() => setShowEli5(!showEli5)}
              className="text-[11px] text-teal-400 hover:text-teal-300"
            >
              {showEli5 ? 'Hide' : 'Show'}
            </button>
          </div>
          {showEli5 && (
            <p className="text-teal-200/90 leading-relaxed">
              <BionicText text={derivation.eli5Summary} enabled={bionicEnabled} />
            </p>
          )}
        </div>
      </div>

      {/* Step by step interactive reveal */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Step-by-Step Derivation Flow ({revealedCount}/{derivation.steps.length} Unlocked)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            >
              Reset to Step 1
            </button>
            <button
              onClick={handleRevealAll}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            >
              Reveal All Steps
            </button>
          </div>
        </div>

        {derivation.steps.map((step, idx) => {
          const isRevealed = idx < revealedCount;
          const isLatest = idx === revealedCount - 1;

          if (!isRevealed) {
            return (
              <div
                key={step.stepNumber}
                onClick={handleRevealNext}
                className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center cursor-pointer hover:border-teal-500/40 hover:bg-slate-900/30 transition group"
              >
                <div className="text-xs font-mono text-slate-500 group-hover:text-teal-400 flex items-center justify-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to Test Yourself & Reveal Step {step.stepNumber}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={step.stepNumber}
              className={`p-5 rounded-2xl border transition ${
                isLatest
                  ? 'bg-[#0f1a24] border-teal-500/50 shadow-lg shadow-teal-950/20'
                  : 'bg-[#0c121e] border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-600/30 border border-teal-500/50 text-teal-300 font-mono text-xs font-bold flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <span className="text-xs font-bold text-white">
                    Step {step.stepNumber}
                  </span>
                </div>

                {step.cbseMarkAllocation && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-700/40 text-emerald-300">
                    {step.cbseMarkAllocation}
                  </span>
                )}
              </div>

              {/* Instruction */}
              <div className="text-xs text-slate-300 mb-3 leading-relaxed">
                <BionicText text={step.instruction} enabled={bionicEnabled} />
              </div>

              {/* KaTeX Math line */}
              <div className="p-3 rounded-xl bg-[#070b13] border border-slate-800 text-center text-teal-300 text-sm overflow-x-auto my-2">
                <KaTeXRenderer math={step.math} block={true} />
              </div>

              {/* Pro-Tip for CBSE step-marking */}
              {step.proTip && (
                <div className="mt-2 text-[11px] text-amber-300/90 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>CBSE Examiner Tip: {step.proTip}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Next step button */}
        {revealedCount < derivation.steps.length && (
          <div className="text-center pt-2">
            <button
              onClick={handleRevealNext}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-950/50 transition flex items-center gap-2 mx-auto"
            >
              <span>Unlock Next Step ({revealedCount + 1}/{derivation.steps.length})</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
