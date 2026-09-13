import React, { useState } from 'react';
import { BoardAnswerTemplate } from '../../types';
import { BionicText } from '../BionicText';
import { CheckCircle, Lightbulb, BookmarkCheck, FileText, Sparkles } from 'lucide-react';

interface AnswerFramerProps {
  template: BoardAnswerTemplate;
  bionicEnabled: boolean;
}

export const AnswerFramer: React.FC<AnswerFramerProps> = ({ template, bionicEnabled }) => {
  const [showEli5, setShowEli5] = useState(false);
  const [showMarkingScheme, setShowMarkingScheme] = useState(true);

  return (
    <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-teal-950/80 border border-teal-700/50 text-teal-300 font-semibold">
            {template.subject} • {template.chapter}
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
            {template.marks} Marks Structured Answer
          </span>
        </div>

        <button
          onClick={() => setShowEli5(!showEli5)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition ${
            showEli5
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'border-slate-700 bg-slate-850 text-slate-300 hover:text-white'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>{showEli5 ? 'Hide Intuitive Analogy' : 'Dumb It Down (ELI5)'}</span>
        </button>
      </div>

      {/* ELI5 if active */}
      {showEli5 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 space-y-2">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Plain-English Conceptual Grasp:
          </div>
          <p className="leading-relaxed">
            <BionicText text={template.eli5Explanation} enabled={bionicEnabled} />
          </p>
        </div>
      )}

      {/* Board Question */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
        <div className="text-[11px] font-mono text-slate-400 uppercase">CBSE Board Exam Question:</div>
        <div className="text-sm font-semibold text-slate-100 leading-relaxed">
          <BionicText text={template.question} enabled={bionicEnabled} />
        </div>
      </div>

      {/* CBSE Marking Scheme Rubric */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4" />
            CBSE Official Step-Marking Scheme
          </span>
          <button
            onClick={() => setShowMarkingScheme(!showMarkingScheme)}
            className="text-[11px] text-slate-400 hover:text-slate-200"
          >
            {showMarkingScheme ? 'Collapse Rubric' : 'Expand Rubric'}
          </button>
        </div>

        {showMarkingScheme && (
          <div className="p-4 rounded-xl bg-[#080d17] border border-slate-800 space-y-2">
            {template.markingSchemePoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-teal-200/90 font-mono">
                <span className="text-teal-400 shrink-0 mt-0.5">✓</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Model Answer Framed with Step Markings */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-400" />
          Model Answer (How to Write in Exam for Full Marks)
        </span>
        <div className="p-5 rounded-xl bg-[#080d17] border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-3 font-sans whitespace-pre-line">
          <BionicText text={template.modelAnswer} enabled={bionicEnabled} />
        </div>
      </div>

      {/* Must Underline Keywords */}
      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-2">
        <span className="text-[11px] font-mono text-indigo-400 uppercase font-bold block">
          Key Technical Terms You MUST Underline in Your Answer Sheet:
        </span>
        <div className="flex flex-wrap gap-2">
          {template.keyDefinitionsToUnderline.map((kw, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/40 text-indigo-200 font-mono text-xs"
            >
              <u>{kw}</u>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
