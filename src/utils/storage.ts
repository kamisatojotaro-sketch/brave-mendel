import { MistakeEntry } from '../types';

const MISTAKE_KEY = 'synapse_mistake_vault_v1';
const SETTINGS_KEY = 'synapse_user_settings_v1';

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
  // Check if already in vault
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
    nextReviewDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString() // 1 day spaced repetition
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
