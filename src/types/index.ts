export type SubjectType = 'biology' | 'physics' | 'chemistry';
export type ClassLevel = '11' | '12';

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface Chapter {
  id: string;
  name: string;
  subject: SubjectType;
  classLevel: ClassLevel;
  ncertUnit: string;
  topics: Topic[];
  isHighWeightage?: boolean;
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  chapterId: string;
  topicId: string;
  subject: SubjectType;
  difficulty: DifficultyLevel; // 1: Recall, 2: Application, 3: NEET Standard, 4: Assertion-Reason/Match, 5: Brain-Twister
  type: 'single-choice' | 'assertion-reason' | 'match-column' | 'multi-statement';
  question: string;
  assertion?: string;
  reason?: string;
  matchColA?: string[];
  matchColB?: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
  eli5Explanation: string; // The "Dumb It Down" mode
  ncertPageRef?: string;
  trapWarning?: string; // What confuses students on this question
}

export interface MistakeEntry {
  id: string;
  questionId: string;
  question: Question;
  selectedOption: number;
  errorType: 'concept' | 'trap' | 'calculation' | 'careless';
  notes?: string;
  dateAdded: string;
  reviewCount: number;
  nextReviewDate: string;
}

export interface DerivationStep {
  stepNumber: number;
  instruction: string;
  math: string;
  cbseMarkAllocation?: string;
  proTip?: string;
}

export interface Derivation {
  id: string;
  subject: SubjectType;
  title: string;
  chapter: string;
  marksTypical: number; // 3 or 5
  cbseFrequency: 'Very High' | 'High' | 'Moderate';
  aim: string;
  steps: DerivationStep[];
  eli5Summary: string; // Dumb it down
  finalFormula: string;
}

export interface BoardAnswerTemplate {
  id: string;
  subject: SubjectType;
  chapter: string;
  question: string;
  marks: 1 | 2 | 3 | 5;
  markingSchemePoints: string[];
  modelAnswer: string;
  eli5Explanation: string;
  keyDefinitionsToUnderline: string[];
}

export type LearnerDepth = 1 | 2 | 3 | 4 | 5;

export interface ResearchPaper {
  title: string;
  authors: string;
  year: number;
  arxivId?: string;
  coreContribution: string;
  plainEnglishTakeaway: string;
  url?: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  tier: number;
  description: string;
  connections: string[];
}

export interface ResourceMatrix {
  books: { title: string; author: string; takeaway: string }[];
  wikipedia: { title: string; url: string; snippet: string }[];
  videos: { title: string; platform: string; url: string; desc: string }[];
  relatedTopics: string[];
}

export interface LearnerTopic {
  id: string;
  title: string;
  domain: string;
  tags: string[];
  depthContent: {
    [key in LearnerDepth]: {
      depthLabel: string;
      description: string;
      coreContent: string;
      equations?: string[];
      codeSnippet?: string;
      analogies?: string[];
      researchPapers?: ResearchPaper[];
      rabbitHoleQuestions?: string[];
    };
  };
  conceptGraph: ConceptNode[];
  resourceMatrix?: ResourceMatrix;
}

export interface ChapterSummary {
  chapterId: string;
  chapterName: string;
  subject: SubjectType;
  eli5QuickGrasp: string;
  ncertTraps: string[];
  mustKnowFormulas: { name: string; formula: string; note: string }[];
  mnemonics: { topic: string; trick: string; meaning: string }[];
}

// ================= THE PREPPER SCHEDULE TYPES =================
export interface ScheduledTask {
  id: string;
  dateStr: string; // YYYY-MM-DD
  subject: SubjectType;
  chapterId: string;
  chapterName: string;
  subtopicName?: string;
  targetMode: 'study' | 'skim' | 'test';
  timeEstimateMins: number;
  completed: boolean;
}

export interface PrepperGoal {
  id: string;
  title: string;
  durationDays: number;
  targetExam: 'neet' | 'board' | 'both';
  startDate: string;
  tasks: ScheduledTask[];
}

// ================= HANDWRITTEN ANSWER EVALUATION TYPES =================
export interface AnswerEvaluationCriterion {
  criterion: string;
  marksAwarded: number;
  maxMarks: number;
  feedback: string;
}

export interface AnswerEvaluationResult {
  totalMarksAwarded: number;
  maxPossibleMarks: number;
  percentage: number;
  breakdown: AnswerEvaluationCriterion[];
  overallSummary: string;
  whatYouNailed: string[];
  whereYouLostMarks: string[];
  howToGetFullMarks: string[];
}
