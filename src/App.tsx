import React, { useState, useEffect } from 'react';
import { Navbar, ActiveWing } from './components/Navbar';
import { NeetArena } from './components/NeetArena/NeetArena';
import { BoardLab } from './components/BoardLab/BoardLab';
import { TheLearner } from './components/TheLearner/TheLearner';
import { FocusTimerModal } from './components/FocusTimerModal';
import { MistakeVaultModal } from './components/MistakeVaultModal';
import { SettingsModal } from './components/SettingsModal';
import { getSettings, saveSettings, getMistakes, UserSettings } from './utils/storage';
import { Sparkles, Brain, Lightbulb, Compass, Target, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [activeWing, setActiveWing] = useState<ActiveWing>('neet');
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [mistakeCount, setMistakeCount] = useState<number>(getMistakes().length);

  // Modals
  const [timerOpen, setTimerOpen] = useState(false);
  const [mistakesOpen, setMistakesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Update mistake count whenever logged
  const refreshMistakes = () => {
    setMistakeCount(getMistakes().length);
  };

  const handleToggleBionic = () => {
    const updated = saveSettings({
      bionicReadingEnabled: !settings.bionicReadingEnabled
    });
    setSettings(updated);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans">
      {/* Sticky Header */}
      <Navbar
        activeWing={activeWing}
        onSelectWing={setActiveWing}
        bionicEnabled={settings.bionicReadingEnabled}
        onToggleBionic={handleToggleBionic}
        onOpenTimer={() => setTimerOpen(true)}
        onOpenMistakes={() => setMistakesOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        mistakeCount={mistakeCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Psychological Wing Indicator Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1424] via-[#10182c] to-[#0c121e] border border-slate-800/80 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              activeWing === 'neet'
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                : activeWing === 'board'
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            }`}>
              {activeWing === 'neet' && <Target className="w-5 h-5" />}
              {activeWing === 'board' && <Brain className="w-5 h-5" />}
              {activeWing === 'learner' && <Compass className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                {activeWing === 'neet' && 'NEET UG Exam Arena • Active Recall & Difficulty Escalation'}
                {activeWing === 'board' && 'NCERT CBSE Board Exam Lab • Derivation Reveals & Marking Rubrics'}
                {activeWing === 'learner' && 'The Learner • Hyperfixation Deep Diver & Research Explorer'}
              </div>
              <p className="text-[11px] text-slate-400">
                {activeWing === 'neet' && 'Class 11 & 12 PCB syllabus with 5-tier difficulty sliders, NCERT line-by-line traps, and instant ELI5 analogies.'}
                {activeWing === 'board' && 'Master CBSE 12th board derivations with step-by-step memory reveal and 1/2/3/5-mark answer templates.'}
                {activeWing === 'learner' && 'From plain-English ELI5 mental models to PyTorch architecture, ArXiv research papers, and continuous Hopfield paradoxes.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Cognitive Mode Active</span>
          </div>
        </div>

        {/* Dynamic Wing View */}
        {activeWing === 'neet' && (
          <NeetArena
            bionicEnabled={settings.bionicReadingEnabled}
            onMistakeLogged={refreshMistakes}
          />
        )}

        {activeWing === 'board' && (
          <BoardLab
            bionicEnabled={settings.bionicReadingEnabled}
          />
        )}

        {activeWing === 'learner' && (
          <TheLearner
            bionicEnabled={settings.bionicReadingEnabled}
            geminiApiKey={settings.geminiApiKey}
          />
        )}
      </main>

      {/* Modals */}
      <FocusTimerModal
        isOpen={timerOpen}
        onClose={() => setTimerOpen(false)}
      />

      <MistakeVaultModal
        isOpen={mistakesOpen}
        onClose={() => setMistakesOpen(false)}
        bionicEnabled={settings.bionicReadingEnabled}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
      />

      {/* Clean Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#070b13] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-mono">
            <span>SYNAPSE Cognitive Platform</span>
            <span>•</span>
            <span className="text-slate-400">Built for Class 12 NEET Aspirants & Hyperfixation Explorers</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Psychological Learning • Active Recall • First-Principles ELI5
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
