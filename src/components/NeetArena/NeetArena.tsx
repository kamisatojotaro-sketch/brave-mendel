import React, { useState, useMemo, useEffect } from 'react';
import { syllabusData } from '../../data/syllabusData';
import { questionsData } from '../../data/questionsData';
import { chapterSummaries } from '../../data/summarizersData';
import { SubjectType, ClassLevel, Chapter, Question } from '../../types';
import { generateProceduralQuestions } from '../../utils/aiGenerator';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import {
  getChapterProgressPercentage,
  getSubjectProgressPercentage,
  markUniversalCompleted,
  saveMistake
} from '../../utils/storage';
import {
  Target,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  Clock,
  Layers,
  Flame,
  ArrowRight,
  Shield,
  Lightbulb,
  Award,
  Zap,
  HelpCircle,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  Eye
} from 'lucide-react';

interface NeetArenaProps {
  bionicEnabled: boolean;
  onMistakeLogged: () => void;
}

export type NeetEdition = 'light' | 'deep';
export type NeetMode = 'study' | 'skim' | 'test';

export const NeetArena: React.FC<NeetArenaProps> = ({ bionicEnabled, onMistakeLogged }) => {
  // Edition: Light Learner (Intuitive/ELI5) vs Deep Learner (PYQ/Traps)
  const [edition, setEdition] = useState<NeetEdition>('light');
  const [subject, setSubject] = useState<SubjectType>('biology');
  const [classLevel, setClassLevel] = useState<ClassLevel>('12');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bio-12-genetics-principles');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [mode, setMode] = useState<NeetMode>('study');
  const [studyTier, setStudyTier] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  // Drill state inside Study Session
  const [drillAnswers, setDrillAnswers] = useState<Record<number, number>>({});
  const [drillSubmitted, setDrillSubmitted] = useState(false);

  // Mock Test Prepper state
  const [testQuestionIndex, setTestQuestionIndex] = useState<number>(0);
  const [testSelectedAnswers, setTestSelectedAnswers] = useState<Record<number, number>>({});
  const [testTimer, setTestTimer] = useState<number>(45);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<{ total: number; correct: number; incorrect: number }>({ total: 0, correct: 0, incorrect: 0 });

  // Available chapters for subject and class
  const availableChapters = useMemo(() => {
    return syllabusData.filter(c => c.subject === subject && c.classLevel === classLevel);
  }, [subject, classLevel]);

  // Current chapter
  const currentChapter = useMemo(() => {
    return availableChapters.find(c => c.id === selectedChapterId) || availableChapters[0] || syllabusData[0];
  }, [availableChapters, selectedChapterId]);

  // Calculate chapter progress
  const chapterProgress = useMemo(() => {
    return getChapterProgressPercentage('neet', currentChapter.id);
  }, [currentChapter.id, refreshTrigger]);

  const subjectProgress = useMemo(() => {
    return getSubjectProgressPercentage('neet', subject);
  }, [subject, refreshTrigger]);

  // Reset drill and test state on chapter change
  useEffect(() => {
    setDrillAnswers({});
    setDrillSubmitted(false);
    setTestQuestionIndex(0);
    setTestSelectedAnswers({});
    setTestCompleted(false);
    setCompletionMessage(null);
    setTestTimer(45);
  }, [currentChapter.id, selectedSubtopic, mode, studyTier]);

  // Timer countdown for Mock Test
  useEffect(() => {
    if (mode !== 'test' || testCompleted) return;
    const interval = setInterval(() => {
      setTestTimer(prev => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, testCompleted, testQuestionIndex]);

  // Mark completed strictly when clicked at end
  const handleMarkCompleted = (taskMode: NeetMode, scoreVal?: number) => {
    markUniversalCompleted('neet', currentChapter.id, taskMode, scoreVal || 100);
    setRefreshTrigger(prev => prev + 1);
    setCompletionMessage(`[VERIFIED] ${currentChapter.name} marked completed in ${taskMode.toUpperCase()} mode! Telemetry updated.`);
    setTimeout(() => setCompletionMessage(null), 4000);
  };

  // Subtopics for current chapter
  const allSubtopics = useMemo(() => {
    const list: string[] = [];
    currentChapter.topics.forEach(t => {
      t.subtopics.forEach(st => list.push(st));
    });
    return list;
  }, [currentChapter]);

  // Curated questions for this chapter
  const testQuestions = useMemo(() => {
    const found = questionsData.filter(q => q.chapterId === currentChapter.id);
    if (found.length >= 3) return found.slice(0, 5);
    const procedural = generateProceduralQuestions(currentChapter, 3, 4);
    return [...found, ...procedural].slice(0, 5);
  }, [currentChapter]);

  // Study Tier Content
  const tierContent = useMemo(() => {
    const title = selectedSubtopic || currentChapter.name;
    const isLight = edition === 'light';

    if (studyTier === 1) {
      return {
        title: 'Tier 1: Intuitive Mental Model & ELI5 Grasp',
        subtitle: `Dumbing down ${title} into effortless visual metaphors`,
        eli5: isLight
          ? `Think of ${title} as an everyday mechanism. In biology, every cell is a chemical factory following simple lock-and-key rules. In physics and chemistry, energy flows strictly from high pressure to low pressure. When you read a NEET question, ask: "What is physically moving here?" before doing any math!`
          : `High-yield overview of ${title}. Understand the biological pathway, reaction mechanism, or vector decomposition before attempting PYQ traps.`,
        keyPoints: [
          `Intuitive Hook: Connect this topic to an observable everyday phenomenon (e.g. soap bubbles, water pumps, electrical switches).`,
          `Primary Actor: Identify the molecule, charge carrier, or force driver that initiates the sequence.`,
          `Core Directionality: Always remember the irreversible step in this cycle.`
        ],
        visualIdea: `Mental Animation: Visualize the pathway as a conveyor belt where each enzyme or force acts as an automated station.`,
        formulas: [
          { name: 'Core Relation', math: '\\Delta G = \\Delta H - T\\Delta S \\quad \\text{or} \\quad p^2 + 2pq + q^2 = 1' }
        ]
      };
    } else if (studyTier === 2) {
      return {
        title: 'Tier 2: NCERT Verbatim Lines & High-Yield Keywords',
        subtitle: `The exact phrases NTA examiners copy-paste into NEET statements and options`,
        eli5: `95% of NEET questions are lifted straight from NCERT lines. Words like "invariably", "solely", "except", or "predominantly" are the exact trigger words that separate true options from false traps!`,
        keyPoints: [
          `NCERT Keyword Focus: Memorize exact adjectives used in the summary section at the end of the chapter.`,
          `Diagram Labels: 10-15 questions in NEET ask about obscure labels in NCERT diagrams.`,
          `Historical Scientist Discoveries: Note the year and organism (e.g. Pisum sativum, Drosophila, T.O. Diener).`
        ],
        visualIdea: `Golden Rule: If it is stated in NCERT, it is absolute truth for NEET, even if advanced research suggests nuances!`,
        formulas: [
          { name: 'Equilibrium Condition', math: 'K_{eq} = \\frac{[\\text{Products}]}{[\\text{Reactants}]} \\quad \\text{at constant } T' }
        ]
      };
    } else if (studyTier === 3) {
      return {
        title: 'Tier 3: PYQ Pattern Recognition & Shortcut Tricks',
        subtitle: `Last 15 Years of NEET/AIPMT recurring question patterns and calculation hacks`,
        eli5: `You don't need 3 minutes per question. NEET requires solving in 45 seconds! Use unit elimination, order-of-magnitude estimation, and boundary checks (plug in 0 or infinity) to instantly delete 2 wrong options.`,
        keyPoints: [
          `Pattern 1: Ratio Questions: When calculating ratios of energies or radii, cancel all constants (h, c, G, pi) immediately.`,
          `Pattern 2: Percentage Changes: For small changes (< 5%), use differential approximations (\\Delta R / R \\approx 2 \\Delta r / r).`,
          `Pattern 3: Assertion-Reason: Check if Statement 2 is true independently first. If false, answer is immediately option C!`
        ],
        visualIdea: `Shortcut Matrix: Look for options with inverse ratios (e.g. 1:4 vs 4:1)—the correct answer is almost always one of these two!`,
        formulas: [
          { name: 'Bohr / De Broglie Relation', math: 'r_n \\propto \\frac{n^2}{Z}, \\quad v_n \\propto \\frac{Z}{n}, \\quad E_n \\propto -\\frac{Z^2}{n^2}' }
        ]
      };
    } else if (studyTier === 4) {
      return {
        title: 'Tier 4: Deadly NTA Traps & -1 Negative Marking Traps',
        subtitle: `Where 90% of students lose +4 marks and gain -1 penalty`,
        eli5: `The deadliest traps aren't hard questions—they are easy questions with subtle trick words: "Which of the following is INCORRECT?", "Except", or changing centimeters to meters in the last line!`,
        keyPoints: [
          `Trap 1: The 'NOT / INCORRECT' Blindspot: Circle the word 'INCORRECT' with your pen so your ADHD brain doesn't pick the first true statement.`,
          `Trap 2: Standard State Units: Pressure in atm vs bar vs Pascal; volume in liters vs cm³.`,
          `Trap 3: Symmetrical Options: Don't rush when two options differ only by a factor of 2 or a negative sign.`
        ],
        visualIdea: `Mental Checklist: Did I read ALL 4 options before bubbling? Never pick Option A without glancing at Option D!`,
        formulas: [
          { name: 'Decay / Kinetic Trap', math: 'N(t) = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{T_{1/2}}} \\neq N_0 e^{+\\lambda t}' }
        ]
      };
    } else {
      return {
        title: 'Tier 5: 720/720 Speed Hacks & Assertion-Reason Mastery',
        subtitle: `Elite tactics for top 100 AIR rank aspirants to complete PCB in 110 minutes`,
        eli5: `Top rankers finish Biology in 35 minutes, Chemistry in 45 minutes, leaving 70+ minutes for Physics numericals and review. Master rapid visual reading and zero-scratchpad mental estimation.`,
        keyPoints: [
          `Speed Hack 1: Scan question stem directly for the quantity to calculate before reading the background story.`,
          `Speed Hack 2: Memorize standard values: \\sqrt{2} \\approx 1.414, \\sqrt{3} \\approx 1.732, 1/\\varepsilon_0 \\approx 1.13 \\times 10^{11}.`,
          `Speed Hack 3: Assertion Reason Golden Method: Read Assertion, add the word "BECAUSE", then read Reason. Does it flow logically?`
        ],
        visualIdea: `Time Budget: Biology 45s/Q, Chemistry 60s/Q, Physics 80s/Q.`,
        formulas: [
          { name: 'Universal Energy Density', math: 'u = \\frac{1}{2}\\varepsilon_0 E^2 + \\frac{B^2}{2\\mu_0}' }
        ]
      };
    }
  }, [studyTier, selectedSubtopic, currentChapter, edition]);

  // Mini Drill for Study Session
  const miniDrill = useMemo(() => {
    return [
      {
        q: `In NEET questions on ${currentChapter.name}, the most common cause of negative marking is:`,
        options: [
          'Misreading "INCORRECT" as "CORRECT" in question stem',
          'Not having a scientific calculator',
          'Exam hall temperature fluctuations',
          'Writing answers in blue ink instead of black'
        ],
        correct: 0,
        explanation: 'According to student mistake telemetry, failing to spot negative qualifiers like "INCORRECT" causes over 40% of avoidable negative marking.'
      },
      {
        q: `When calculating ratios between two states in ${subject.toUpperCase()}, the fastest strategy is:`,
        options: [
          'Calculate full absolute numerical values for both states then divide',
          'Cancel all fundamental constants first and form a proportional scaling equation',
          'Always guess 1:1',
          'Skip the question and return after 2 hours'
        ],
        correct: 1,
        explanation: 'Proportional scaling (e.g. R1/R2 = (r1/r2)^2) eliminates lengthy arithmetic and saves up to 90 seconds per question.'
      }
    ];
  }, [currentChapter, subject]);

  // Calculate Mock Test Score
  const handleFinalizeMockTest = () => {
    let correct = 0;
    let incorrect = 0;

    testQuestions.forEach((q, idx) => {
      const selected = testSelectedAnswers[idx];
      if (selected !== undefined) {
        if (selected === q.correctIndex) {
          correct++;
        } else {
          incorrect++;
          // Log mistake automatically
          saveMistake({
            questionId: q.id,
            question: q,
            selectedOption: selected,
            errorType: 'concept'
          });
          onMistakeLogged();
        }
      }
    });

    const marks = (correct * 4) - (incorrect * 1);
    setTestScore({ total: marks, correct, incorrect });
    setTestCompleted(true);
    handleMarkCompleted('test', marks);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#081a0e] border border-emerald-500/40 text-emerald-400 shadow-inner">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-emerald-100 tracking-wide">
                  NEET UG EXAM ARENA // HIGH-YIELD PCB DRILLS
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-600/40">
                  NTA +4 / -1 STANDARD
                </span>
              </div>
              <p className="text-xs text-emerald-400/70 font-mono">
                5-tier difficulty escalation, NCERT line-by-line traps, timed mock preppers
              </p>
            </div>
          </div>

          {/* DUAL EDITION TOGGLE (Light Learner vs Deep Learner) */}
          <div className="flex items-center p-1 rounded-xl bg-[#030805] border border-emerald-500/30">
            <button
              onClick={() => setEdition('light')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                edition === 'light'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-emerald-400/60 hover:text-emerald-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>LIGHT LEARNER (ELI5)</span>
            </button>
            <button
              onClick={() => setEdition('deep')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                edition === 'deep'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-emerald-400/60 hover:text-emerald-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span>DEEP LEARNER (PYQ TRAPS)</span>
            </button>
          </div>
        </div>

        {/* Subjects (Bio, Phy, Chem) & Class Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'biology', label: '🧬 Biology', color: 'border-emerald-500/40' },
              { id: 'physics', label: '⚡ Physics', color: 'border-cyan-500/40' },
              { id: 'chemistry', label: '🧪 Chemistry', color: 'border-amber-500/40' }
            ].map(s => {
              const isSelected = subject === s.id;
              const prog = getSubjectProgressPercentage('neet', s.id as SubjectType);
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSubject(s.id as SubjectType);
                    setSelectedSubtopic(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-950/40'
                      : 'bg-[#040b06] border-emerald-900/40 text-emerald-400/60 hover:text-emerald-200'
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                    {prog}%
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center p-1 rounded-xl bg-[#030805] border border-emerald-500/20">
            {(['12', '11'] as ClassLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setClassLevel(lvl);
                  setSelectedSubtopic(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                  classLevel === lvl
                    ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-200'
                    : 'text-emerald-400/50 hover:text-emerald-300'
                }`}
              >
                Class {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Modes: Study Session, Skimmer, Mock Test Prepper */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/20">
          <span className="text-[11px] font-mono text-emerald-400/60 uppercase mr-2 tracking-wider">
            [ SELECT OPERATION MODE ]:
          </span>
          {[
            { id: 'study', label: '1. STUDY SESSION (5 Tiers)', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'skim', label: '2. SKIMMER (2-Min Flash)', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'test', label: '3. MOCK TEST PREPPER (+4/-1 Timed)', icon: <Clock className="w-3.5 h-3.5" /> }
          ].map(m => {
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id as NeetMode)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition border ${
                  isSelected
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-950/50'
                    : 'bg-[#040a06] border-emerald-900/40 text-emerald-400/60 hover:text-emerald-200'
                }`}
              >
                <span className={isSelected ? 'text-emerald-400' : 'text-emerald-400/50'}>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Selection & Subtopics Matrix */}
      <div className="p-5 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-wider">
                [ NEET CHAPTER ] ({availableChapters.length} Chapters)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-300">
                  Chapter Progress: {chapterProgress}%
                </span>
                <div className="w-24 h-2 rounded-full bg-[#040905] border border-emerald-500/30 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${chapterProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <select
              value={currentChapter.id}
              onChange={e => {
                setSelectedChapterId(e.target.value);
                setSelectedSubtopic(null);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040905] border border-emerald-500/40 text-xs font-mono text-emerald-100 focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {availableChapters.map(chap => {
                const prog = getChapterProgressPercentage('neet', chap.id);
                return (
                  <option key={chap.id} value={chap.id}>
                    {chap.name} {chap.isHighWeightage ? '★ [High Weightage]' : ''} ({prog}% Completed)
                  </option>
                );
              })}
            </select>
          </div>

          <div className="pt-2 sm:pt-5">
            <button
              onClick={() => setSelectedSubtopic(null)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition border flex items-center justify-center gap-2 ${
                selectedSubtopic === null
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60'
                  : 'bg-[#040905] border-emerald-900/50 text-emerald-400/70 hover:text-emerald-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>STUDY ENTIRE CHAPTER</span>
            </button>
          </div>
        </div>

        {/* Subtopic Pills */}
        <div className="pt-2 border-t border-emerald-500/15">
          <div className="text-[10px] font-mono text-emerald-400/60 uppercase mb-2">
            [ SUBTOPICS BREAKDOWN - CLICK TO DRILL ]:
          </div>
          <div className="flex flex-wrap gap-2">
            {allSubtopics.map((st, idx) => {
              const isSelected = selectedSubtopic === st;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSubtopic(isSelected ? null : st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-sm'
                      : 'bg-[#040805] border-emerald-950/80 text-emerald-400/60 hover:text-emerald-300 hover:border-emerald-800/40'
                  }`}
                >
                  <span className="text-[10px] text-emerald-500/70">{idx + 1}.</span>
                  <span>{st}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Notification Banner */}
      {completionMessage && (
        <div className="p-4 rounded-xl bg-[#06180d] border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{completionMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: STUDY SESSION (5 Tiers & Active Recall Drill)                     */}
      {/* ========================================================================= */}
      {mode === 'study' && (
        <div className="space-y-6">
          {/* 5-Tier Depth Tabs */}
          <div className="p-4 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-emerald-400/70 uppercase tracking-wider">
                [ NEET COGNITIVE DEPTH SELECTOR ]:
              </span>
              <span className="text-[11px] font-mono text-emerald-300">
                Tier {studyTier} of 5 Active
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { tier: 1, label: 'T1: ELI5 Metaphor' },
                { tier: 2, label: 'T2: NCERT Lines' },
                { tier: 3, label: 'T3: PYQ Tricks' },
                { tier: 4, label: 'T4: Deadly Traps' },
                { tier: 5, label: 'T5: 720/720 Hacks' }
              ].map(t => {
                const isActive = studyTier === t.tier;
                return (
                  <button
                    key={t.tier}
                    onClick={() => setStudyTier(t.tier as any)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-bold transition border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60'
                        : 'bg-[#040805] border-emerald-900/30 text-emerald-400/50 hover:text-emerald-300'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Card */}
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  {tierContent.title}
                </span>
                <span className="text-xs font-mono text-emerald-400/60">
                  Target: <strong className="text-emerald-200">{selectedSubtopic || currentChapter.name}</strong>
                </span>
              </div>
              <h2 className="text-sm font-serif font-bold text-emerald-100">
                {tierContent.subtitle}
              </h2>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Core NEET Logic Breakdown ({edition.toUpperCase()} EDITION)</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed font-sans">
                <BionicText text={tierContent.eli5} enabled={bionicEnabled} />
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider font-bold block">
                [ MUST-REMEMBER NEET EXAM PATTERNS ]:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {tierContent.keyPoints.map((pt, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#040905] border border-emerald-900/40 text-xs text-emerald-200/90 space-y-1">
                    <div className="font-mono text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Point #{idx + 1}
                    </div>
                    <p><BionicText text={pt} enabled={bionicEnabled} /></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulas & Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dual Coding Mental Blueprint</span>
                </div>
                <p className="text-xs text-emerald-300/80 font-mono">
                  {tierContent.visualIdea}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>High-Yield Governing Formula</span>
                </div>
                {tierContent.formulas.map((f, idx) => (
                  <div key={idx} className="text-center py-1">
                    <KaTeXRenderer math={f.math} block={true} />
                    <span className="text-[10px] font-mono text-emerald-400/60 block mt-1">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Recall Drill */}
            <div className="p-5 rounded-xl bg-[#040b06] border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  Mini Revision Recall Drill (Active Recall)
                </span>
                {drillSubmitted && (
                  <span className="text-xs font-mono text-emerald-300">
                    Drill Completed!
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {miniDrill.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2 p-3 rounded-lg bg-[#06120a] border border-emerald-900/30">
                    <p className="text-xs font-mono text-emerald-100 font-medium">
                      Q{qIdx + 1}: {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = drillAnswers[qIdx] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnClass = 'bg-[#030704] border-emerald-900/40 text-emerald-300/80 hover:border-emerald-500/40';
                        if (drillSubmitted) {
                          if (isCorrect) btnClass = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold';
                          else if (isSelected && !isCorrect) btnClass = 'bg-rose-950/80 border-rose-500 text-rose-300';
                        } else if (isSelected) {
                          btnClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-100';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={drillSubmitted}
                            onClick={() => setDrillAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-2.5 rounded-lg text-left text-xs font-mono transition border ${btnClass}`}
                          >
                            <span className="mr-1.5 font-bold">[{String.fromCharCode(65 + optIdx)}]</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!drillSubmitted ? (
                <button
                  onClick={() => setDrillSubmitted(true)}
                  disabled={Object.keys(drillAnswers).length < miniDrill.length}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-mono font-bold transition"
                >
                  Submit Mini Drill Answers
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDrillAnswers({});
                    setDrillSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#08150c] border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry Drill
                </button>
              )}
            </div>

            {/* Verified Completion Button strictly at end */}
            <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400/60">
                ⚠️ Progress bar updates ONLY when you click the verified completion button below.
              </div>
              <button
                onClick={() => handleMarkCompleted('study')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-extrabold tracking-wider transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>MARK CHAPTER STUDY SESSION AS COMPLETED</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SKIMMER (2-Minute Rapid Revision)                                 */}
      {/* ========================================================================= */}
      {mode === 'skim' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  2-MINUTE RAPID FORMULA SKIMMER
                </span>
                <h2 className="text-base font-serif font-bold text-emerald-100 mt-1">
                  High-Yield NCERT Tables & Formulas: {currentChapter.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-[#040805] px-3 py-1 rounded-lg border border-emerald-900/50">
                ⚡ 120s Flash Recall
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/30 space-y-3">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  1. High-Frequency Equation & Dimension
                </div>
                <div className="text-center py-2 bg-[#020503] rounded-lg border border-emerald-900/50">
                  <KaTeXRenderer math={tierContent.formulas[0]?.math || '\\lambda = \\frac{h}{p}'} block={true} />
                </div>
                <p className="text-xs text-emerald-300/80 font-sans leading-relaxed">
                  NEET Tip: Dimension of [h] is identical to angular momentum [M L² T⁻¹].
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/30 space-y-3">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                  2. NCERT Critical Exceptions
                </div>
                <ul className="text-xs text-emerald-300/80 space-y-1.5 list-disc pl-4 font-sans">
                  <li>In Mendel's dihybrid test cross, ratio is 1:1:1:1 only if genes are unlinked.</li>
                  <li>Ionization enthalpy of B &lt; Be and O &lt; N due to half-filled and full-filled stability.</li>
                  <li>Displacement current I_d = \varepsilon_0 (d\Phi_E / dt) inside capacitor gap.</li>
                </ul>
              </div>
            </div>

            {/* Skim Completion Button */}
            <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400/60">
                Done skimming? Record your session to update the radar telemetry.
              </div>
              <button
                onClick={() => handleMarkCompleted('skim')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>MARK SKIM AS COMPLETED</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: MOCK TEST PREPPER (+4 / -1 Timed Drill)                           */}
      {/* ========================================================================= */}
      {mode === 'test' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  NEET TIMED MOCK TEST // +4 FOR CORRECT • -1 FOR WRONG
                </span>
                <h2 className="text-base font-serif font-bold text-emerald-100 mt-1">
                  Speed Drill: {currentChapter.name} ({testQuestions.length} Questions)
                </h2>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#030805] border border-emerald-500/30">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-300">
                  {testTimer}s REMAINING
                </span>
              </div>
            </div>

            {/* Questions Sequence */}
            {!testCompleted ? (
              <div className="space-y-6">
                {testQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-700/50">
                        QUESTION #{qIdx + 1} OF {testQuestions.length}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400/60">
                        +4 / -1 MARKING
                      </span>
                    </div>

                    <p className="text-xs font-mono text-emerald-100 font-medium">
                      <BionicText text={q.question} enabled={bionicEnabled} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = testSelectedAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setTestSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-3 rounded-lg text-left text-xs font-mono transition border ${
                              isSelected
                                ? 'bg-emerald-600/30 border-emerald-400 text-emerald-100'
                                : 'bg-[#030604] border-emerald-950/80 text-emerald-300/80 hover:border-emerald-700/50'
                            }`}
                          >
                            <span className="font-bold mr-2 text-emerald-400">[{String.fromCharCode(65 + optIdx)}]</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Finalize Button */}
                <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-emerald-400/60">
                    Incorrect answers are automatically logged in your Mistake Vault with psychological error diagnostics.
                  </div>
                  <button
                    onClick={handleFinalizeMockTest}
                    disabled={Object.keys(testSelectedAnswers).length === 0}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-mono text-xs font-extrabold tracking-wider transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>COMPLETE MOCK TEST & RECORD SCORE</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Score Report */
              <div className="p-6 rounded-xl bg-[#040905] border border-emerald-500/40 text-center space-y-4">
                <Award className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-serif font-bold text-emerald-100">
                  Mock Test Evaluated!
                </h3>
                <div className="flex items-center justify-center gap-6 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#020503] border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-400/70">TOTAL MARKS</div>
                    <div className="text-lg font-bold text-emerald-300">{testScore.total} / {testQuestions.length * 4}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#020503] border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-400/70">CORRECT (+4)</div>
                    <div className="text-lg font-bold text-emerald-400">{testScore.correct}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#020503] border border-rose-500/30">
                    <div className="text-[10px] text-rose-400/70">WRONG (-1)</div>
                    <div className="text-lg font-bold text-rose-400">{testScore.incorrect}</div>
                  </div>
                </div>
                <p className="text-xs font-mono text-emerald-400/80">
                  {testScore.incorrect > 0
                    ? `[VAULT LOGGED]: ${testScore.incorrect} mistake(s) archived in your Mistake Vault for spaced repetition review.`
                    : `Flawless execution! 100% accuracy recorded in the Main Hub.`}
                </p>
                <button
                  onClick={() => {
                    setTestCompleted(false);
                    setTestSelectedAnswers({});
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition"
                >
                  Retake Mock Test
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
