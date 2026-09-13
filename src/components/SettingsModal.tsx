import React, { useState } from 'react';
import { X, Key, Sliders, Eye, Sparkles, Check } from 'lucide-react';
import { UserSettings, saveSettings } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [bionic, setBionic] = useState(settings.bionicReadingEnabled);
  const [savedMessage, setSavedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveSettings({
      geminiApiKey: apiKey.trim(),
      bionicReadingEnabled: bionic
    });
    onUpdateSettings(updated);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 rounded-2xl bg-[#0c121e] border border-indigo-500/30 shadow-2xl shadow-indigo-950/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Sliders className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">Cognitive & System Settings</h3>
        </div>

        <div className="space-y-5">
          {/* Bionic Reading Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Eye className="w-4 h-4 text-indigo-400" />
                Bionic Reading Mode
              </div>
              <p className="text-xs text-slate-400">
                Bolds the first few letters of words to anchor eye saccades and combat ADHD reading fatigue.
              </p>
            </div>
            <button
              onClick={() => setBionic(!bionic)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                bionic ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  bionic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Optional Gemini API Key */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Key className="w-4 h-4 text-amber-400" />
              Gemini AI API Key <span className="text-[10px] text-slate-500 font-normal font-mono">(Optional)</span>
            </div>
            <p className="text-xs text-slate-400">
              The platform comes pre-loaded with curated NEET questions, NCERT derivations, and deep-dive modules that work 100% offline. Adding your Gemini API key enables on-demand infinite questions and live ArXiv research synthesis!
            </p>
            <div className="relative mt-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#070b13] border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Psychology Note */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
            <div>
              <strong>ADHD Cognitive Tip:</strong> Keep sessions short and intense. If you notice your brain seeking novelty, switch wings (e.g. from NEET physics numericals to The Learner deep dive) rather than forcing unproductive passive staring.
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {savedMessage ? (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Settings saved!
              </span>
            ) : <div />}
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-900/30 transition"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
