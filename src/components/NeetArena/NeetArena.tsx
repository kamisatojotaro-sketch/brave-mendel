import React, { useState, useMemo, useEffect } from 'react';
import { syllabusData } from '../../data/syllabusData';
import { questionsData } from '../../data/questionsData';
import { chapterSummaries } from '../../data/summarizersData';
import { SubjectType, ClassLevel, DifficultyLevel, Question } from '../../types';
import { generateProceduralQuestions } from '../../utils/aiGenerator';
import { DifficultySlider } from './DifficultySlider';
import { QuestionCard } from './QuestionCard';
import { ChapterSummarizer } from './ChapterSummarizer';
import { Target, BookOpen, Layers, Sparkles, Filter, RefreshCw, Zap, Award } from 'lucide-react';

interface NeetArenaProps {
  bionicEnabled: boolean;
  onMistakeLogged: () => void;
}

export const NeetArena: React.FC<NeetArenaProps> = ({ bionicEnabled, onMistakeLogged }) => {
  const [subject, setSubject] = useState<SubjectType>('biology');
  const [classLevel, setClassLevel] = useState<ClassLevel>('12');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(3);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bio-12-genetics-principles');
  const [mode, setMode] = useState<'practice' | 'summarizer'>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [proceduralBank, setProceduralBank] = useState<Question[]>([]);

  // Filter chapters by subject and class
  const availableChapters = useMemo(() => {
    return syllabusData.filter(c => c.subject === subject && c.classLevel === classLevel);
  }, [subject, classLevel]);

  // Keep selected chapter valid
  const currentChapter = useMemo(() => {
    const found = availableChapters.find(c => c.id === selectedChapterId);
    if (found) return found;
    return availableChapters[0] || syllabusData[0];
  }, [availableChapters, selectedChapterId]);

  // Combine curated questions with procedural generator for this specific chapter and difficulty
  const chapterQuestions = useMemo(() => {
    // 1. Direct curated matches for this chapter and difficulty
    const directMatches = questionsData.filter(
      q => q.chapterId === currentChapter.id && q.difficulty === difficulty
    );

    // 2. Procedural questions generated for this chapter
    const activeProcedural = proceduralBank.filter(
      q => q.chapterId === currentChapter.id && q.difficulty === difficulty
    );

    let combined = [...directMatches, ...activeProcedural];

    // If still empty, automatically generate high-yield procedural questions for this chapter!
    if (combined.length === 0) {
      const generated = generateProceduralQuestions(currentChapter, difficulty, 3);
      combined = generated;
    }

    return combined;
  }, [currentChapter, difficulty, proceduralBank]);

  // Reset index when chapter or difficulty changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [currentChapter.id, difficulty]);

  const currentQuestion = chapterQuestions[currentQuestionIndex % chapterQuestions.length] || chapterQuestions[0];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleGenerateMoreQuestions = () => {
    const newQuestions = generateProceduralQuestions(currentChapter, difficulty, 3);
    setProceduralBank(prev => [...newQuestions, ...prev]);
    setCurrentQuestionIndex(chapterQuestions.length);
  };

  // Find summary for the current chapter or subject
  const currentSummary = useMemo(() => {
    return chapterSummaries.find(s => s.chapterId === currentChapter.id) ||
      chapterSummaries.find(s => s.subject === subject) || {
        chapterId: currentChapter.id,
        chapterName: currentChapter.name,
        subject: currentChapter.subject,
        eli5QuickGrasp: `In ${currentChapter.name}, the fundamental principle is that all observable interactions follow strict conservation and symmetry laws. Start by mastering the primary definition, then track how variables change when external stress is applied!`,
        ncertTraps: [
          `TRAP 1: Never assume direct linearity without verifying whether the governing equation involves an inverse square or exponential factor.`,
          `TRAP 2: NCERT specifically highlights exceptions at extreme boundaries (e.g. infinite dilution or extreme temperature). Always read standard state conditions!`,
          `TRAP 3: Questions involving ratios often swap numerator and denominator in false options. Double-check the target ratio!`
        ],
        mustKnowFormulas: [
          { name: `${currentChapter.name} Fundamental Relation`, formula: '\\Phi = \\int \\vec{F} \\cdot d\\vec{A} \\quad \\text{or} \\quad \\Delta G = \\Delta H - T\\Delta S', note: 'Primary governing equation for this unit.' }
        ],
        mnemonics: [
          { topic: 'Key Sequence', trick: 'RAPID (Recall, Apply, Predict, Inspect, Decide)', meaning: 'Follow this 5-step checklist for tricky NEET questions.' }
        ]
      };
  }, [currentChapter, subject]);

  return (
    <div className="space-y-6">
      {/* Top Filter & Subject Selector */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 shadow-xl space-y-4">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'biology', label: '🧬 Biology', color: 'from-emerald-600 to-teal-700' },
              { id: 'physics', label: '⚡ Physics', color: 'from-indigo-600 to-blue-700' },
              { id: 'chemistry', label: '🧪 Chemistry', color: 'from-amber-600 to-orange-700' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSubject(s.id as SubjectType);
                  setCurrentQuestionIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                  subject === s.id
                    ? `bg-gradient-to-r ${s.color} text-white shadow-md`
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Class Level Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['11', '12'] as ClassLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setClassLevel(lvl);
                  setCurrentQuestionIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  classLevel === lvl
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Class {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Selection Dropdown & High-Weightage Tags */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase mb-1 block">
              Syllabus Chapter ({availableChapters.length} Chapters Available)
            </label>
            <select
              value={currentChapter.id}
              onChange={e => {
                setSelectedChapterId(e.target.value);
                setCurrentQuestionIndex(0);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {availableChapters.map(chap => (
                <option key={chap.id} value={chap.id}>
                  {chap.name} {chap.isHighWeightage ? '★ [High Weightage]' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Practice vs Summarizer toggle */}
          <div className="flex items-center gap-2 pt-2 sm:pt-4">
            <button
              onClick={() => setMode('practice')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                mode === 'practice'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Active Recall ({chapterQuestions.length} Qs)</span>
            </button>
            <button
              onClick={() => setMode('summarizer')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                mode === 'summarizer'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>NCERT Traps & Formulas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Active Recall with Difficulty Slider */}
      {mode === 'practice' && (
        <div className="space-y-6">
          {/* Difficulty Slider */}
          <DifficultySlider level={difficulty} onChange={setDifficulty} />

          {/* Question Meta Bar with Generate More button */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Question {(currentQuestionIndex % chapterQuestions.length) + 1} of {chapterQuestions.length}</span>
              <span className="text-slate-600">•</span>
              <span className="text-indigo-300 capitalize">{currentChapter.name}</span>
            </div>

            <button
              onClick={handleGenerateMoreQuestions}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono bg-indigo-950/50 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/50 transition"
              title="Generate new questions for this topic"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Generate More Questions</span>
            </button>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <QuestionCard
              key={`${currentQuestion.id}-${currentQuestionIndex}`}
              question={currentQuestion}
              bionicEnabled={bionicEnabled}
              onNextQuestion={handleNextQuestion}
              onMistakeLogged={onMistakeLogged}
            />
          )}
        </div>
      )}

      {/* Mode 2: Chapter High-Yield Summarizer */}
      {mode === 'summarizer' && (
        <ChapterSummarizer summary={currentSummary} bionicEnabled={bionicEnabled} />
      )}
    </div>
  );
};
