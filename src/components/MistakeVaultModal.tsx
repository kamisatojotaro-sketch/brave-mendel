import React, { useState } from 'react';
import { X, BookOpen, Trash2, AlertTriangle, Lightbulb, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MistakeEntry } from '../types';
import { getMistakes, removeMistake } from '../utils/storage';
import { BionicText } from './BionicText';

interface MistakeVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  bionicEnabled: boolean;
}

export const MistakeVaultModal: React.FC<MistakeVaultModalProps> = ({ isOpen, onClose, bionicEnabled }) => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(getMistakes());
  const [filter, setFilter] = useState<'all' | 'concept' | 'trap' | 'calculation' | 'careless'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    removeMistake(id);
    setMistakes(getMistakes());
  };

  const filteredMistakes = mistakes.filter(m => {
    if (filter === 'all') return true;
    return m.errorType === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0c121e] border border-rose-500/30 shadow-2xl shadow-rose-950/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Mistake Vault (Error Notebook)
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-700/50 text-rose-300 font-mono">
                  {mistakes.length} Logged
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                The #1 NEET Topper habit: Categorize and eliminate recurring traps with spaced repetition.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#080d17] border-b border-slate-800/80 overflow-x-auto">
          <span className="text-xs font-mono text-slate-500 uppercase mr-1">Filter:</span>
          {(['all', 'concept', 'trap', 'calculation', 'careless'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${
                filter === f
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mistakes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredMistakes.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-60" />
              <p className="text-sm font-medium">No mistakes found in this category.</p>
              <p className="text-xs text-slate-600 mt-1">Missed questions in the NEET Arena automatically appear here for review.</p>
            </div>
          ) : (
            filteredMistakes.map(entry => {
              const isExpanded = expandedId === entry.id;
              return (
                <div
                  key={entry.id}
                  className="p-5 rounded-xl bg-[#0f172a]/70 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                        entry.errorType === 'concept'
                          ? 'bg-purple-950/60 border-purple-800 text-purple-300'
                          : entry.errorType === 'trap'
                          ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                          : entry.errorType === 'calculation'
                          ? 'bg-cyan-950/60 border-cyan-800 text-cyan-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}>
                        {entry.errorType} Error
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 capitalize">
                        {entry.question.subject} • Level {entry.question.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                        title="Delete from Vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-slate-200 mb-3">
                    <BionicText text={entry.question.question} enabled={bionicEnabled} />
                  </div>

                  {/* Correct answer indicator */}
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs mb-3 space-y-1">
                    <div className="text-rose-400">
                      <strong>Your Answer:</strong> Option {entry.selectedOption + 1}: {entry.question.options[entry.selectedOption]}
                    </div>
                    <div className="text-emerald-400">
                      <strong>Correct Answer:</strong> Option {entry.question.correctIndex + 1}: {entry.question.options[entry.question.correctIndex]}
                    </div>
                  </div>

                  {/* Toggle details */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {isExpanded ? 'Hide Solution & ELI5' : 'View Solution & Dumb-It-Down'}
                    </button>
                    {entry.question.ncertPageRef && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {entry.question.ncertPageRef}
                      </span>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                      {/* Standard Explanation */}
                      <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200">
                        <strong className="block text-indigo-400 mb-1">Standard Scientific Explanation:</strong>
                        <BionicText text={entry.question.explanation} enabled={bionicEnabled} />
                      </div>

                      {/* ELI5 Dumb it down */}
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
                        <strong className="block text-emerald-400 mb-1">💡 Dumb It Down (Intuitive Mental Model):</strong>
                        <BionicText text={entry.question.eli5Explanation} enabled={bionicEnabled} />
                      </div>

                      {entry.question.trapWarning && (
                        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                          <div>
                            <strong>Why students get trapped:</strong> {entry.question.trapWarning}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
