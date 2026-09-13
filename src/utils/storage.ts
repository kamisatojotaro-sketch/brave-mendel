import { MistakeEntry, ScheduledTask, SubjectType } from '../types';
import { syllabusData } from '../data/syllabusData';

const MISTAKE_KEY = 'synapse_mistake_vault_v1';
const SETTINGS_KEY = 'synapse_user_settings_v1';
const PREPPER_KEY = 'synapse_prepper_schedule_v1';
const PROGRESS_KEY = 'synapse_universal_progress_v2';

export interface UserSettings {
  geminiApiKey?: string;
  bionicReadingEnabled: boolean;
  soundVolume: number;
  selectedSound: 'pink' | 'brown' | 'binaural-focus';
}

const defaultSettings: UserSettings = {
  geminiApiKey: '',
  bionicReadingEnabled: false,
  soundVolume: 0.25,
  selectedSound: 'brown'
};

// ================= MISTAKE VAULT =================
export const getMistakes = (): MistakeEntry[] => {
  try {
    const raw = localStorage.getItem(MISTAKE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load mistakes from localStorage', e);
    return [];
  }
};

export const saveMistake = (entry: Omit<MistakeEntry, 'id' | 'dateAdded' | 'reviewCount' | 'nextReviewDate'>): MistakeEntry => {
  const current = getMistakes();
  const existing = current.find(m => m.questionId === entry.questionId);
  if (existing) {
    existing.reviewCount += 1;
    existing.errorType = entry.errorType;
    existing.selectedOption = entry.selectedOption;
    if (entry.notes) existing.notes = entry.notes;
    localStorage.setItem(MISTAKE_KEY, JSON.stringify(current));
    return existing;
  }

  const newEntry: MistakeEntry = {
    ...entry,
    id: 'mistake-' + Date.now(),
    dateAdded: new Date().toISOString(),
    reviewCount: 1,
    nextReviewDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
  };

  current.unshift(newEntry);
  localStorage.setItem(MISTAKE_KEY, JSON.stringify(current));
  return newEntry;
};

export const removeMistake = (id: string): void => {
  const current = getMistakes();
  const updated = current.filter(m => m.id !== id);
  localStorage.setItem(MISTAKE_KEY, JSON.stringify(updated));
};

// ================= SETTINGS =================
export const getSettings = (): UserSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings: Partial<UserSettings>): UserSettings => {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
};

// ================= THE PREPPER SCHEDULE =================
export const getPrepperTasks = (): ScheduledTask[] => {
  try {
    const raw = localStorage.getItem(PREPPER_KEY);
    if (raw) return JSON.parse(raw);
    // If none exists, auto-seed a starter 7-day interleaved plan starting today!
    return generateAutoPlan(7, 'both');
  } catch {
    return [];
  }
};

export const savePrepperTasks = (tasks: ScheduledTask[]): void => {
  localStorage.setItem(PREPPER_KEY, JSON.stringify(tasks));
};

export const togglePrepperTask = (taskId: string): ScheduledTask[] => {
  const tasks = getPrepperTasks();
  const target = tasks.find(t => t.id === taskId);
  if (target) {
    target.completed = !target.completed;
    savePrepperTasks(tasks);
  }
  return tasks;
};

export const addPrepperTask = (task: Omit<ScheduledTask, 'id' | 'completed'>): ScheduledTask => {
  const tasks = getPrepperTasks();
  const newTask: ScheduledTask = {
    ...task,
    id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    completed: false
  };
  tasks.push(newTask);
  savePrepperTasks(tasks);
  return newTask;
};

export const deletePrepperTask = (taskId: string): void => {
  const tasks = getPrepperTasks();
  savePrepperTasks(tasks.filter(t => t.id !== taskId));
};

/**
 * Generate a mathematically interleaved 7-day or 30-day plan covering PCB
 */
export const generateAutoPlan = (
  days: 7 | 30,
  targetExam: 'neet' | 'board' | 'both'
): ScheduledTask[] => {
  const tasks: ScheduledTask[] = [];
  const today = new Date();

  // Pick top high-weightage chapters across Bio, Physics, Chem
  const bioChapters = syllabusData.filter(c => c.subject === 'biology' && c.classLevel === '12');
  const phyChapters = syllabusData.filter(c => c.subject === 'physics' && c.classLevel === '12');
  const chemChapters = syllabusData.filter(c => c.subject === 'chemistry' && c.classLevel === '12');

  const subjectRotation: SubjectType[] = ['biology', 'physics', 'chemistry'];

  for (let dayOffset = 0; dayOffset < days; dayOffset++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayOffset);
    const dateStr = targetDate.toISOString().split('T')[0];

    // 2 tasks per day: Interleaved subjects
    const sub1 = subjectRotation[dayOffset % 3];
    const sub2 = subjectRotation[(dayOffset + 1) % 3];

    const chap1 = sub1 === 'biology' ? bioChapters[dayOffset % bioChapters.length]
      : sub1 === 'physics' ? phyChapters[dayOffset % phyChapters.length]
      : chemChapters[dayOffset % chemChapters.length];

    const chap2 = sub2 === 'biology' ? bioChapters[(dayOffset + 1) % bioChapters.length]
      : sub2 === 'physics' ? phyChapters[(dayOffset + 1) % phyChapters.length]
      : chemChapters[(dayOffset + 1) % chemChapters.length];

    // Task 1: Morning deep study
    tasks.push({
      id: `task-d${dayOffset}-1-${Date.now()}`,
      dateStr,
      subject: sub1,
      chapterId: chap1.id,
      chapterName: chap1.name,
      subtopicName: chap1.topics[0]?.name || 'Core Foundations',
      targetMode: 'study',
      timeEstimateMins: 45,
      completed: false
    });

    // Task 2: Evening active test prep or skim
    tasks.push({
      id: `task-d${dayOffset}-2-${Date.now()}`,
      dateStr,
      subject: sub2,
      chapterId: chap2.id,
      chapterName: chap2.name,
      subtopicName: chap2.topics[0]?.name || 'Formula & Trap Drills',
      targetMode: dayOffset % 2 === 0 ? 'test' : 'skim',
      timeEstimateMins: 30,
      completed: false
    });
  }

  savePrepperTasks(tasks);
  return tasks;
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getTodayTasks = (): ScheduledTask[] => {
  const todayStr = getTodayDateString();
  const all = getPrepperTasks();
  return all.filter(t => t.dateStr === todayStr);
};

// ================= UNIVERSAL PROGRESS TRACKING =================
// Structure: { [exam_wing]: { [chapterId]: { study: boolean, skim: boolean, test: boolean } } }
export interface WingProgressRecord {
  study: boolean;
  skim: boolean;
  test: boolean;
  score?: number;
  lastUpdated: string;
}

export type UniversalProgressMap = Record<string, Record<string, WingProgressRecord>>;

export const getUniversalProgress = (): UniversalProgressMap => {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { neet: {}, board: {} };
  } catch {
    return { neet: {}, board: {} };
  }
};

export const markUniversalCompleted = (
  exam: 'neet' | 'board',
  chapterId: string,
  mode: 'study' | 'skim' | 'test',
  score?: number
): UniversalProgressMap => {
  const current = getUniversalProgress();
  if (!current[exam]) current[exam] = {};
  if (!current[exam][chapterId]) {
    current[exam][chapterId] = {
      study: false,
      skim: false,
      test: false,
      lastUpdated: new Date().toISOString()
    };
  }

  current[exam][chapterId][mode] = true;
  if (score !== undefined) current[exam][chapterId].score = score;
  current[exam][chapterId].lastUpdated = new Date().toISOString();

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  return current;
};

export const getChapterProgressPercentage = (exam: 'neet' | 'board', chapterId: string): number => {
  const progress = getUniversalProgress();
  const chap = progress[exam]?.[chapterId];
  if (!chap) return 0;
  let count = 0;
  if (chap.study) count += 40;
  if (chap.skim) count += 30;
  if (chap.test) count += 30;
  return count;
};

export const getSubjectProgressPercentage = (exam: 'neet' | 'board', subject: SubjectType): number => {
  const chaps = syllabusData.filter(c => c.subject === subject);
  if (chaps.length === 0) return 0;
  const sum = chaps.reduce((acc, c) => acc + getChapterProgressPercentage(exam, c.id), 0);
  return Math.round(sum / chaps.length);
};
