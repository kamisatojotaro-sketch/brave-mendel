import React, { useState } from 'react';
import { Question } from '../../types';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { saveMistake } from '../../utils/storage';
import { Check, X, Lightbulb, AlertCircle, BookMarked, HelpCircle, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  bionicEnabled: boolean;
  onNextQuestion?: () => void;
  onMistakeLogged?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  bionicEnabled,
  onNextQuestion,
  onMistakeLogged
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEli5, setShowEli5] = useState(false);
  const [mistakeSaved, setMistakeSaved] = useState(false);
  const [errorTag, setErrorTag] = useState<'concept' | 'trap' | 'calculation' | 'careless'>('trap');

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);

    // If incorrect, automatically log to mistake vault
    if (selectedOption !== question.correctIndex) {
      saveMistake({
        questionId: question.id,
        question: question,
        selectedOption: selectedOption,
        errorType: errorTag
      });
      setMistakeSaved(true);
      if (onMistakeLogged) onMistakeLogged();
    }
  };

  const handleManualLogMistake = (type: 'concept' | 'trap' | 'calculation' | 'careless') => {
    setErrorTag(type);
    saveMistake({
      questionId: question.id,
      question: question,
      selectedOption: selectedOption ?? -1,
      errorType: type
    });
    setMistakeSaved(true);
    if (onMistakeLogged) onMistakeLogged();
  };

  const isCorrect = selectedOption === question.correctIndex;

  return (
    <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 shadow-xl space-y-6">
      {/* Question Header & Meta */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 font-semibold">
            {question.subject}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Level {question.difficulty} • {question.type.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* The "Dumb It Down" Toggle Button */}
        <button
          onClick={() => setShowEli5(!showEli5)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition ${
            showEli5
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-950/40'
              : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-slate-600'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>{showEli5 ? 'Hide Intuitive Analogy' : 'Dumb It Down (ELI5)'}</span>
        </button>
      </div>

      {/* ELI5 Explanation Box (When toggled) */}
      {showEli5 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Plain-English Mental Model (ELI5):
          </div>
          <p className="leading-relaxed">
            <BionicText text={question.eli5Explanation} enabled={bionicEnabled} />
          </p>
        </div>
      )}

      {/* Main Question Body */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-slate-100 leading-relaxed">
          <BionicText text={question.question} enabled={bionicEnabled} />
        </div>

        {/* Assertion & Reason specific display */}
        {question.assertion && question.reason && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 font-mono">
            <div className="text-indigo-300">
              <strong className="text-white">Assertion (A):</strong> {question.assertion}
            </div>
            <div className="text-indigo-300">
              <strong className="text-white">Reason (R):</strong> {question.reason}
            </div>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          let btnStyle = 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50';

          if (isSubmitted) {
            if (idx === question.correctIndex) {
              btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 shadow-md shadow-emerald-950/40';
            } else if (idx === selectedOption) {
              btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 shadow-md shadow-rose-950/40';
            } else {
              btnStyle = 'border-slate-800/50 bg-slate-900/20 text-slate-500 opacity-60';
            }
          } else if (selectedOption === idx) {
            btnStyle = 'border-indigo-500 bg-indigo-950/50 text-indigo-100 shadow-md shadow-indigo-950/40';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-start gap-3 ${btnStyle}`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-mono shrink-0 mt-0.5 ${
                isSubmitted && idx === question.correctIndex
                  ? 'border-emerald-400 bg-emerald-500 text-white font-bold'
                  : isSubmitted && idx === selectedOption
                  ? 'border-rose-400 bg-rose-500 text-white font-bold'
                  : selectedOption === idx
                  ? 'border-indigo-400 bg-indigo-600 text-white font-bold'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <div className="flex-1 leading-relaxed">
                <BionicText text={option} enabled={bionicEnabled} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        {!isSubmitted ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500">
              {selectedOption === null ? 'Select an answer to evaluate' : 'Ready to verify'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-lg shadow-indigo-950/50 transition"
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {/* Feedback alert */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isCorrect
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            }`}>
              {isCorrect ? (
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-sm">
                  {isCorrect ? 'Correct! Concept Mastered.' : 'Incorrect. Added to Mistake Vault for Spaced Repetition.'}
                </div>
                <div className="text-slate-300 pt-1">
                  <strong>Explanation:</strong> <BionicText text={question.explanation} enabled={bionicEnabled} />
                </div>
                {question.ncertPageRef && (
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    📖 NCERT Reference: {question.ncertPageRef}
                  </div>
                )}
                {question.trapWarning && (
                  <div className="text-[11px] text-amber-300 pt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                    Trap Alert: {question.trapWarning}
                  </div>
                )}
              </div>
            </div>

            {/* Mistake Vault tagging & Next Question */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">Mistake Tag:</span>
                {(['concept', 'trap', 'calculation', 'careless'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => handleManualLogMistake(t)}
                    className={`px-2 py-0.5 text-[10px] rounded border font-mono capitalize transition ${
                      errorTag === t
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
                {mistakeSaved && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Logged
                  </span>
                )}
              </div>

              {onNextQuestion && (
                <button
                  onClick={onNextQuestion}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
