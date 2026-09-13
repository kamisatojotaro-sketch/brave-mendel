import React, { useState } from 'react';
import { X, Upload, Camera, CheckCircle2, AlertCircle, FileText, Sparkles, Loader2 } from 'lucide-react';
import { evaluateHandwrittenAnswer } from '../../utils/aiGenerator';
import { AnswerEvaluationResult } from '../../types';

interface AnswerPhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionText: string;
  modelAnswer: string;
  markingSchemePoints: string[];
  geminiApiKey?: string;
  onCompleteEvaluation?: (marks: number) => void;
}

export const AnswerPhotoUploadModal: React.FC<AnswerPhotoUploadModalProps> = ({
  isOpen,
  onClose,
  questionText,
  modelAnswer,
  markingSchemePoints,
  geminiApiKey,
  onCompleteEvaluation
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [typedNotes, setTypedNotes] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<AnswerEvaluationResult | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEvaluate = async () => {
    if (!imagePreview && !typedNotes.trim()) return;

    setIsEvaluating(true);
    try {
      const evalResult = await evaluateHandwrittenAnswer(
        questionText,
        modelAnswer,
        markingSchemePoints,
        typedNotes,
        imagePreview || undefined,
        geminiApiKey
      );
      setResult(evalResult);
      if (onCompleteEvaluation) {
        onCompleteEvaluation(evalResult.totalMarksAwarded);
      }
    } catch (err) {
      console.error('Evaluation failed', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetState = () => {
    setImagePreview(null);
    setTypedNotes('');
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="tactical-card relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border-emerald-500/30 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-500/20 bg-[#08120b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white uppercase tracking-wider">
                Handwritten Answer &amp; Step-Marking Evaluator
              </h2>
              <p className="text-xs text-text-muted">
                Upload a photo of your handwritten paper sheet to evaluate against CBSE step-marking criteria.
              </p>
            </div>
          </div>

          <button
            onClick={resetState}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Question Reminder */}
          <div className="p-4 rounded-xl bg-[#040806] border border-emerald-500/20 text-xs space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
              Question Under Evaluation:
            </span>
            <div className="text-slate-200 font-medium leading-relaxed">
              {questionText}
            </div>
          </div>

          {!result ? (
            <div className="space-y-5">
              {/* Photo Upload Area */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-300 uppercase font-semibold">
                  1. Upload Photo of Your Handwritten Answer Sheet:
                </span>
                <label className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#050e07] transition group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="space-y-2 text-center">
                      <img
                        src={imagePreview}
                        alt="Handwritten Answer"
                        className="max-h-56 rounded-lg mx-auto border border-emerald-500/40 shadow-lg object-contain"
                      />
                      <span className="text-xs font-mono text-emerald-400 block group-hover:underline">
                        Click to change photo
                      </span>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 py-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-semibold text-slate-200">
                        Take a photo or upload handwritten paper scan
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Supports PNG, JPG, JPEG from mobile or desktop
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Or Optional Typed Transcript */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-300 uppercase font-semibold">
                  2. Optional Notes / Rough Work Transcript:
                </span>
                <textarea
                  rows={3}
                  placeholder="Type any key equations, formulas, or steps you used..."
                  value={typedNotes}
                  onChange={e => setTypedNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040806] border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Evaluate Button */}
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || (!imagePreview && !typedNotes.trim())}
                className="w-full py-3 rounded-xl btn-emerald-pill text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Steps with CBSE Rubric...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluate with AI Step-Marking</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Result Scorecard */
            <div className="space-y-5 animate-fadeIn">
              {/* Score Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#07130a] to-[#0d2212] border border-emerald-500/40 flex items-center justify-between gap-4">
                <div>
                  <span className="telemetry-badge">
                    CBSE STEP-MARKING SCORECARD
                  </span>
                  <div className="text-xs text-slate-300 mt-1">
                    {result.overallSummary}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-3xl font-serif font-bold text-emerald-400">
                    {result.totalMarksAwarded} / {result.maxPossibleMarks}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-300">
                    {result.percentage}% MARKS
                  </div>
                </div>
              </div>

              {/* Criterion Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                  Official Step-Marking Rubric Breakdown:
                </span>
                <div className="space-y-2">
                  {result.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#050e07] border border-emerald-500/20 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{item.criterion}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.feedback}</div>
                      </div>
                      <div className="text-right shrink-0 font-mono text-xs font-bold text-emerald-400">
                        +{item.marksAwarded} / {item.maxMarks}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Nailed vs Lost */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    What You Nailed:
                  </div>
                  <ul className="space-y-1 text-[11px] list-disc list-inside text-emerald-200/90">
                    {result.whatYouNailed.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    Where You Lost Marks:
                  </div>
                  <ul className="space-y-1 text-[11px] list-disc list-inside text-amber-200/90">
                    {result.whereYouLostMarks.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              {/* Re-try button */}
              <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Upload Another Answer
                </button>
                <button
                  onClick={resetState}
                  className="px-5 py-2 rounded-xl btn-emerald-pill text-xs font-mono font-bold"
                >
                  Done &amp; Log Marks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
