import React, { useState, useMemo } from 'react';
import { syllabusData } from '../../data/syllabusData';
import { questionsData } from '../../data/questionsData';
import { chapterSummaries } from '../../data/summarizersData';
import { SubjectType, ClassLevel, DifficultyLevel, Question } from '../../types';
import { DifficultySlider } from './DifficultySlider';
import { QuestionCard } from './QuestionCard';
import { ChapterSummarizer } from './ChapterSummarizer';
import { Target, BookOpen, Layers, Sparkles, Filter, CheckCircle } from 'lucide-react';

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

  // Filter chapters by subject and class
  const availableChapters = useMemo(() => {
    return syllabusData.filter(c => c.subject === subject && c.classLevel === classLevel);
  }, [subject, classLevel]);

  // Keep selected chapter in sync when filters change
  const currentChapter = useMemo(() => {
    const found = availableChapters.find(c => c.id === selectedChapterId);
    if (found) return found;
    return availableChapters[0] || syllabusData[0];
  }, [availableChapters, selectedChapterId]);

  // Filter questions for the selected subject and difficulty
  const matchingQuestions = useMemo(() => {
    // Look for exact chapter match + difficulty match
    let qList = questionsData.filter(q => q.subject === subject && q.difficulty === difficulty);
    if (qList.length === 0) {
      // Fallback to any difficulty for this subject
      qList = questionsData.filter(q => q.subject === subject);
    }
    return qList;
  }, [subject, difficulty]);

  const currentQuestion = matchingQuestions[currentQuestionIndex % (matchingQuestions.length || 1)] || questionsData[0];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  // Find summary for the current chapter or subject
  const currentSummary = useMemo(() => {
    return chapterSummaries.find(s => s.chapterId === currentChapter.id) ||
      chapterSummaries.find(s => s.subject === subject) ||
      chapterSummaries[0];
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
              Syllabus Chapter ({availableChapters.length} Chapters)
            </label>
            <select
              value={currentChapter.id}
              onChange={e => {
                setSelectedChapterId(e.target.value);
                setCurrentQuestionIndex(0);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-[#080d17] border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {availableChapters.map(chap => (
                <option key={chap.id} value={chap.id}>
                  {chap.name} {chap.isHighWeightage ? '★ (High Weightage)' : ''}
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
              <span>Active Recall</span>
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

          {/* Question Card */}
          <QuestionCard
            key={currentQuestion.id + '-' + currentQuestionIndex}
            question={currentQuestion}
            bionicEnabled={bionicEnabled}
            onNextQuestion={handleNextQuestion}
            onMistakeLogged={onMistakeLogged}
          />
        </div>
      )}

      {/* Mode 2: Chapter High-Yield Summarizer */}
      {mode === 'summarizer' && (
        <ChapterSummarizer summary={currentSummary} bionicEnabled={bionicEnabled} />
      )}
    </div>
  );
};
