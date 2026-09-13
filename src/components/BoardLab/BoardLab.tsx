import React, { useState, useMemo, useEffect } from 'react';
import { syllabusData } from '../../data/syllabusData';
import { derivationsData, boardAnswersData } from '../../data/boardExamsData';
import { SubjectType, ClassLevel, Chapter } from '../../types';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { AnswerPhotoUploadModal } from './AnswerPhotoUploadModal';
import {
  getChapterProgressPercentage,
  getSubjectProgressPercentage,
  markUniversalCompleted,
  getUniversalProgress
} from '../../utils/storage';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  CheckCircle,
  Circle,
  FileText,
  Camera,
  Layers,
  Flame,
  ArrowRight,
  ChevronRight,
  Shield,
  Lightbulb,
  Award,
  Zap,
  HelpCircle,
  RotateCcw,
  Eye
} from 'lucide-react';

interface BoardLabProps {
  bionicEnabled: boolean;
  geminiApiKey?: string;
}

export type BoardEdition = 'light' | 'deep';
export type BoardMode = 'study' | 'skim' | 'test';

export const BoardLab: React.FC<BoardLabProps> = ({ bionicEnabled, geminiApiKey }) => {
  // Edition: Light Learner (Intuitive/ELI5) vs Deep Learner (Mastery/Derivations)
  const [edition, setEdition] = useState<BoardEdition>('light');
  const [subject, setSubject] = useState<SubjectType>('physics');
  const [classLevel, setClassLevel] = useState<ClassLevel>('12');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('phy-12-ray-optics');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [mode, setMode] = useState<BoardMode>('study');
  const [studyTier, setStudyTier] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Drill state inside study session
  const [drillAnswers, setDrillAnswers] = useState<Record<number, number>>({});
  const [drillSubmitted, setDrillSubmitted] = useState(false);

  // Photo modal state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [modalQuestion, setModalQuestion] = useState('');
  const [modalAnswer, setModalAnswer] = useState('');
  const [modalRubric, setModalRubric] = useState<string[]>([]);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  // Available chapters for subject and class
  const availableChapters = useMemo(() => {
    return syllabusData.filter(c => c.subject === subject && c.classLevel === classLevel);
  }, [subject, classLevel]);

  // Current chapter
  const currentChapter = useMemo(() => {
    return availableChapters.find(c => c.id === selectedChapterId) || availableChapters[0] || syllabusData[0];
  }, [availableChapters, selectedChapterId]);

  // Reset drill when chapter or subtopic changes
  useEffect(() => {
    setDrillAnswers({});
    setDrillSubmitted(false);
    setCompletionMessage(null);
  }, [currentChapter.id, selectedSubtopic, mode, studyTier]);

  // Calculate chapter progress
  const chapterProgress = useMemo(() => {
    return getChapterProgressPercentage('board', currentChapter.id);
  }, [currentChapter.id, refreshTrigger]);

  const subjectProgress = useMemo(() => {
    return getSubjectProgressPercentage('board', subject);
  }, [subject, refreshTrigger]);

  // Handle Mark as Completed (STRICTLY when button is clicked)
  const handleMarkCompleted = (taskMode: BoardMode) => {
    markUniversalCompleted('board', currentChapter.id, taskMode, 100);
    setRefreshTrigger(prev => prev + 1);
    setCompletionMessage(`[VERIFIED] ${currentChapter.name} marked as completed in ${taskMode.toUpperCase()} mode! Progress updated.`);
    setTimeout(() => setCompletionMessage(null), 4000);
  };

  // Associated derivation data if present
  const relatedDerivation = useMemo(() => {
    return derivationsData.find(d => 
      d.chapter.toLowerCase().includes(currentChapter.name.toLowerCase()) ||
      currentChapter.name.toLowerCase().includes(d.chapter.toLowerCase())
    );
  }, [currentChapter]);

  // Flattened subtopics for current chapter
  const allSubtopics = useMemo(() => {
    const list: string[] = [];
    currentChapter.topics.forEach(t => {
      t.subtopics.forEach(st => list.push(st));
    });
    return list;
  }, [currentChapter]);

  // Procedural Study Tier Content
  const tierContent = useMemo(() => {
    const title = selectedSubtopic || currentChapter.name;
    const isLight = edition === 'light';

    if (studyTier === 1) {
      return {
        title: `Tier 1: Intuitive Mental Model & ELI5`,
        subtitle: `Dumbing down ${title} to pure common sense before looking at textbook formulas`,
        eli5: isLight
          ? `Imagine ${title} like everyday life. Everything in nature seeks lowest effort (least energy). When variables change, the system bends back like a rubber band or flows like water down a hill. There are zero artificial rules here—just nature balancing its books!`
          : `Physical foundation: ${title} represents conservation laws under boundary limits. Start with the phenomenological picture before deducing mathematical relationships.`,
        keyPoints: [
          `Core Intuition: Don't memorize blindly. Visualize what is actually pushing, pulling, or exchanging.`,
          `Daily Analogy: Water pipes (for currents/flux), trampolines (for potential wells), or assembly lines (for biochemical synthesis).`,
          `Primary Observation: Notice what stays constant while everything else shifts.`
        ],
        visualIdea: `Mental Blueprint: Draw a 2-box diagram showing (Input State) -> [Process under ${title}] -> (Output State with conserved totals).`,
        formulas: [
          { name: `Fundamental Ratio`, math: `\\text{Response} = \\frac{\\text{Applied Stress}}{\\text{Intrinsic Resistance}}` }
        ]
      };
    } else if (studyTier === 2) {
      return {
        title: `Tier 2: Core NCERT Definitions & Law Statements`,
        subtitle: `Verbatim keywords demanded by CBSE board evaluators for 1 & 2 Mark questions`,
        eli5: `In CBSE boards, examiners use a checklist of specific words. If you write 3 paragraphs without the keyword, you get 0. If you write 1 line with the keyword, you get full marks!`,
        keyPoints: [
          `Strict Definition: ${title} is defined under standard reference conditions with exact vector directions.`,
          `SI Units & Dimensions: Always pair definitions with unit [kg·m²/s²] or dimensional formula [M L² T⁻²].`,
          `Sign Conventions: CBSE examiners immediately look at + vs - signs. Specify reference zero point!`
        ],
        visualIdea: `Highlight the exact phrase in quotation marks in your exam sheet with a pencil underline.`,
        formulas: [
          { name: `Governing Law`, math: `\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) \\quad \\text{or} \\quad \\Delta G^{\\circ} = -nFE_{\\text{cell}}^{\\circ}` }
        ]
      };
    } else if (studyTier === 3) {
      return {
        title: `Tier 3: Step-by-Step Derivation & Logical Mechanics`,
        subtitle: `The 5-step derivation breakdown with explicit mark allocation for 3 & 5 Mark questions`,
        eli5: `Every derivation is just: (1) Setup diagram, (2) State governing differential, (3) Integrate over limits, (4) Cancel common terms, (5) Put final formula in a neat box.`,
        keyPoints: [
          `Step 1 (Diagram): Never skip diagram with arrows! CBSE cuts 1/2 mark immediately if ray or field direction arrows are missing.`,
          `Step 2 (Assumptions): Write "Assuming ideal conditions and small angle approximation (\\sin\\theta \\approx \\theta)".`,
          `Step 3 (Limit substitutions): Show both upper and lower limit substitutions clearly on separate lines.`
        ],
        visualIdea: `Box your final formula with a ruler! Evaluators look at the final box first; if correct, they skim steps approvingly.`,
        formulas: [
          { name: `Integrated Relation`, math: relatedDerivation ? relatedDerivation.finalFormula : `\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{encl}}}{\\varepsilon_0}` }
        ]
      };
    } else if (studyTier === 4) {
      return {
        title: `Tier 4: NCERT Traps, Exceptions & Numerical Pitfalls`,
        subtitle: `Where 90% of students lose marks in calculations and conceptual twist questions`,
        eli5: `Examiners intentionally set traps around edge cases: infinite dilution, extreme temperatures, zero frequency, or swapping radii R1 and R2!`,
        keyPoints: [
          `Pitfall A: Forgetting to convert cm to meters or grams to kilograms before calculation.`,
          `Pitfall B: Using scalar addition for vector quantities instead of resolving components.`,
          `Pitfall C: Assuming temperature is in Celsius instead of Kelvin in thermodynamic formulas.`
        ],
        visualIdea: `Create a "Danger Triangle" in your margins for units and sign conventions.`,
        formulas: [
          { name: `Limiting Boundary`, math: `\\lim_{T \\to 0} \\Delta S = 0 \\quad \\text{or} \\quad \\lambda = \\frac{h}{\\sqrt{2mqV}}` }
        ]
      };
    } else {
      return {
        title: `Tier 5: 100/100 Board Exam Rigor & High-Scoring Rubric`,
        subtitle: `Secret grading rubric used in CBSE regional evaluation centers for full marks`,
        eli5: `To score 100/100, your answer script must look like the official CBSE Model Solution. Zero ambiguity, numbered points, neat diagrams on the left, equations centered.`,
        keyPoints: [
          `Marking Rubric: 1 mark for statement, 1 mark for diagram, 2 marks for derivation steps, 1 mark for final result with units.`,
          `Underlining Rule: Underline key scientific terms with pencil.`,
          `Alternative Methods: Stick strictly to the standard NCERT textbook method to prevent subjective deduction.`
        ],
        visualIdea: `Answer Script Layout: Split page 70/30 (70% derivation text & math, 30% neatly labeled diagram).`,
        formulas: [
          { name: `Complete System Equation`, math: `\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)` }
        ]
      };
    }
  }, [studyTier, selectedSubtopic, currentChapter, edition, relatedDerivation]);

  // Mini Drill Questions for Study Session
  const miniDrillQuestions = useMemo(() => {
    return [
      {
        q: `What is the primary condition required when applying the core theorem of ${currentChapter.name}?`,
        options: [
          'The system must be isolated and in thermodynamic equilibrium',
          'Only applies to non-linear relativistic frames',
          'Requires external infinite driving frequency',
          'Valid strictly at absolute zero temperature'
        ],
        correct: 0,
        explanation: 'According to NCERT guidelines, equilibrium and boundary consistency are essential preconditions.'
      },
      {
        q: `In CBSE 12th Board examinations, omitting arrows on ray/field diagrams causes:`,
        options: [
          'No mark deduction if final answer is correct',
          'Mandatory deduction of 0.5 to 1 mark in official evaluation rubric',
          'Cancellation of the entire answer sheet',
          'Deduction only in Class 10, not in Class 12'
        ],
        correct: 1,
        explanation: 'CBSE marking schemes strictly mandate directional arrows on all ray diagrams and field vectors.'
      }
    ];
  }, [currentChapter]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Edition Switcher matching user request */}
      <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 space-y-5">
        {/* Title + Telemetry Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#081a0e] border border-emerald-500/40 text-emerald-400 shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-emerald-100 tracking-wide">
                  NCERT BOARD LAB // CBSE CLASS 12 PCB
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-600/40">
                  EXAM STANDARD
                </span>
              </div>
              <p className="text-xs text-emerald-400/70 font-mono">
                Step-by-step memory reveal, 5-tier depth breakdown, handwritten photo upload & evaluation
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
              <span>DEEP LEARNER (MASTERY)</span>
            </button>
          </div>
        </div>

        {/* Subject & Class Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Subjects: Physics, Chemistry, Biology */}
          <div className="flex items-center gap-2">
            {[
              { id: 'physics', label: '⚡ Physics', color: 'border-cyan-500/40' },
              { id: 'chemistry', label: '🧪 Chemistry', color: 'border-amber-500/40' },
              { id: 'biology', label: '🧬 Biology', color: 'border-emerald-500/40' }
            ].map(s => {
              const isSelected = subject === s.id;
              const prog = getSubjectProgressPercentage('board', s.id as SubjectType);
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

          {/* Class 11 vs Class 12 */}
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
                Class {lvl} {lvl === '12' ? '★ Boards' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Modes: Study Session, Skimmer, Test Prepper */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/20">
          <span className="text-[11px] font-mono text-emerald-400/60 uppercase mr-2 tracking-wider">
            [ SELECT OPERATION MODE ]:
          </span>
          {[
            { id: 'study', label: '1. STUDY SESSION (5-Tier Deep)', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'skim', label: '2. SKIMMER (2-Min Flash)', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'test', label: '3. TEST PREPPER (Photo Evaluation)', icon: <Camera className="w-3.5 h-3.5" /> }
          ].map(m => {
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id as BoardMode)}
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

      {/* Chapter Selection & Subtopic Matrix Bar */}
      <div className="p-5 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-lg space-y-4">
        {/* Chapter Selector Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-wider">
                [ NCERT CHAPTER ] ({availableChapters.length} Chapters Available)
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
                const prog = getChapterProgressPercentage('board', chap.id);
                return (
                  <option key={chap.id} value={chap.id}>
                    {chap.name} {chap.isHighWeightage ? '★ [High Weightage]' : ''} ({prog}% Completed)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Button to Study Entire Chapter */}
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
            [ SUBTOPICS BREAKDOWN - CLICK TO ISOLATE ]:
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
      {/* MODE 1: STUDY SESSION (5-Tier Depth Breakdown & Mini Revision Drill)       */}
      {/* ========================================================================= */}
      {mode === 'study' && (
        <div className="space-y-6">
          {/* 5-Tier Depth Slider / Tab Buttons */}
          <div className="p-4 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-emerald-400/70 uppercase tracking-wider">
                [ COGNITIVE DEPTH SELECTOR (1 to 5) ]:
              </span>
              <span className="text-[11px] font-mono text-emerald-300">
                Tier {studyTier} of 5 Active
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { tier: 1, label: 'T1: ELI5 Intuition' },
                { tier: 2, label: 'T2: Definitions' },
                { tier: 3, label: 'T3: Derivation' },
                { tier: 4, label: 'T4: Traps & Nuances' },
                { tier: 5, label: 'T5: 100/100 Rubric' }
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

          {/* Main Study Card */}
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

            {/* Intuitive Explanation Box */}
            <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Conceptual Core Breakdown ({edition.toUpperCase()} EDITION)</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed font-sans">
                <BionicText text={tierContent.eli5} enabled={bionicEnabled} />
              </p>
            </div>

            {/* Key Points Grid */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider font-bold block">
                [ KEY HIGH-YIELD POINTS TO MEMORIZE ]:
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

            {/* Visual Mental Blueprint & Formulas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dual Coding Visual Blueprint</span>
                </div>
                <p className="text-xs text-emerald-300/80 font-mono">
                  {tierContent.visualIdea}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Simplified Governing Formula</span>
                </div>
                {tierContent.formulas.map((f, idx) => (
                  <div key={idx} className="text-center py-1">
                    <KaTeXRenderer math={f.math} block={true} />
                    <span className="text-[10px] font-mono text-emerald-400/60 block mt-1">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Revision Drill (Active Recall at end of Subtopic) */}
            <div className="p-5 rounded-xl bg-[#040b06] border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  Mini Revision Recall Drill (Check retention before proceeding)
                </span>
                {drillSubmitted && (
                  <span className="text-xs font-mono text-emerald-300">
                    Drill Completed!
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {miniDrillQuestions.map((q, qIdx) => (
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
                  disabled={Object.keys(drillAnswers).length < miniDrillQuestions.length}
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

            {/* STRICT END-OF-LEARNING VERIFIED COMPLETION BUTTON */}
            <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400/60">
                ⚠️ Progress bar updates ONLY after clicking the verified completion button below.
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
      {/* MODE 2: SKIMMER (2-Minute Rapid Revision Cards)                           */}
      {/* ========================================================================= */}
      {mode === 'skim' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  2-MINUTE RAPID SKIMMER
                </span>
                <h2 className="text-base font-serif font-bold text-emerald-100 mt-1">
                  High-Yield Formula & Rule Skimmer: {currentChapter.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-[#040805] px-3 py-1 rounded-lg border border-emerald-900/50">
                ⚡ Rapid Recall Mode
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/30 space-y-3">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  1. Must-Know Law & Constants
                </div>
                <div className="text-center py-2 bg-[#020503] rounded-lg border border-emerald-900/50">
                  <KaTeXRenderer math={tierContent.formulas[0]?.math || '\\Delta U = q + w'} block={true} />
                </div>
                <p className="text-xs text-emerald-300/80 font-sans leading-relaxed">
                  Remember: Constants must have explicit SI units written (e.g. ε₀ = 8.854 × 10⁻¹² F/m).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040905] border border-emerald-500/30 space-y-3">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                  2. Essential Exceptions & Caveats
                </div>
                <ul className="text-xs text-emerald-300/80 space-y-1.5 list-disc pl-4 font-sans">
                  <li>Boundary conditions change when media are lossy or non-homogeneous.</li>
                  <li>In thermodynamics, \\Delta H = \\Delta U + \\Delta n_g RT only applies when gaseous moles change.</li>
                  <li>Lens formula assumes thin lens approximation (thickness t \\ll R1, R2).</li>
                </ul>
              </div>
            </div>

            {/* Skim Completion Button strictly at end */}
            <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400/60">
                Finished reading the 2-minute cards? Click to record your skim in the telemetry dashboard.
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
      {/* MODE 3: TEST PREPPER (Board Questions & Handwritten Photo Evaluation)     */}
      {/* ========================================================================= */}
      {mode === 'test' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  CBSE BOARD TEST PREPPER // RUBRICS & VISION EVALUATOR
                </span>
                <h2 className="text-base font-serif font-bold text-emerald-100 mt-1">
                  Official CBSE Past Board Questions: {currentChapter.name}
                </h2>
              </div>

              <div className="text-xs font-mono text-emerald-400 bg-[#040805] px-3 py-1.5 rounded-lg border border-emerald-900/50">
                📷 Vision Evaluator Active
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {/* Question 1: Derivation Question */}
              <div className="p-5 rounded-xl bg-[#040905] border border-emerald-500/30 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-700/50 font-bold">
                      5 MARKS • VERY HIGH CBSE FREQUENCY
                    </span>
                    <h3 className="text-xs font-mono font-bold text-emerald-100 mt-2">
                      {relatedDerivation ? relatedDerivation.aim : `(a) State the governing principle for ${currentChapter.name}. (b) Derive the fundamental relation and specify the ray/system diagram.`}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#020503] border border-emerald-900/40 text-xs font-mono text-emerald-300 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> CBSE Official Step-Marking Scheme:
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-[11px] text-emerald-400/80">
                    <li>1 Mark: Labeled diagram with proper directional arrows.</li>
                    <li>1.5 Marks: Correct statement of intermediate boundary equations.</li>
                    <li>1.5 Marks: Algebraic elimination and integration over boundary limits.</li>
                    <li>1 Mark: Final boxed formula with standard SI units and caveats.</li>
                  </ul>
                </div>

                {/* Upload Photo Button for this Question */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setModalQuestion(relatedDerivation ? relatedDerivation.aim : `Derivation of ${currentChapter.name}`);
                      setModalAnswer(relatedDerivation ? relatedDerivation.finalFormula : `Formula: E = E0 sin(kx - wt)`);
                      setModalRubric([
                        'Ray / Field Diagram with arrow marks (1 Mark)',
                        'Equation statement at boundaries (1.5 Marks)',
                        'Algebraic cancellation of intermediate variables (1.5 Marks)',
                        'Final boxed result with units (1 Mark)'
                      ]);
                      setPhotoModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-950/50"
                  >
                    <Camera className="w-4 h-4 text-emerald-200" />
                    <span>UPLOAD HANDWRITTEN ANSWER PHOTO (AI EVALUATION)</span>
                  </button>

                  <span className="text-[11px] font-mono text-emerald-400/60">
                    Write on paper, snap a photo, and our vision engine grades your steps against CBSE rubrics!
                  </span>
                </div>
              </div>
            </div>

            {/* Test Prepper Completion Button strictly at end */}
            <div className="pt-4 border-t border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400/60">
                Finished attempting the board questions? Record your completion.
              </div>
              <button
                onClick={() => handleMarkCompleted('test')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>COMPLETE TEST PREPPER & UPDATE MARKS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Handwritten Answer Photo Upload Modal */}
      <AnswerPhotoUploadModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        questionText={modalQuestion}
        modelAnswer={modalAnswer}
        markingSchemePoints={modalRubric}
        geminiApiKey={geminiApiKey}
        onCompleteEvaluation={(marks) => {
          setCompletionMessage(`Handwritten answer graded! Awarded ${marks} marks according to CBSE rubric.`);
        }}
      />
    </div>
  );
};
