import React, { useState } from 'react';
import { Navbar, ActiveWing } from './components/Navbar';
import { MainHub } from './components/MainHub/MainHub';
import { NeetArena } from './components/NeetArena/NeetArena';
import { BoardLab } from './components/BoardLab/BoardLab';
import { ThePrepper } from './components/ThePrepper/ThePrepper';
import { TheLearner } from './components/TheLearner/TheLearner';
import { FocusTimerModal } from './components/FocusTimerModal';
import { MistakeVaultModal } from './components/MistakeVaultModal';
import { SettingsModal } from './components/SettingsModal';
import { getSettings, saveSettings, getMistakes, UserSettings } from './utils/storage';
import { Sparkles, Brain, Compass, Target, GraduationCap, CalendarCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [activeWing, setActiveWing] = useState<ActiveWing>('hub');
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [mistakeCount, setMistakeCount] = useState<number>(getMistakes().length);

  // Modals
  const [timerOpen, setTimerOpen] = useState(false);
  const [mistakesOpen, setMistakesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    <div className="min-h-screen bg-[#040806] text-emerald-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
        {/* Dynamic Wing View */}
        {activeWing === 'hub' && (
          <MainHub
            onNavigate={(wing) => setActiveWing(wing as ActiveWing)}
            bionicEnabled={settings.bionicReadingEnabled}
          />
        )}

        {activeWing === 'neet' && (
          <NeetArena
            bionicEnabled={settings.bionicReadingEnabled}
            onMistakeLogged={refreshMistakes}
          />
        )}

        {activeWing === 'board' && (
          <BoardLab
            bionicEnabled={settings.bionicReadingEnabled}
            geminiApiKey={settings.geminiApiKey}
          />
        )}

        {activeWing === 'prepper' && (
          <ThePrepper
            bionicEnabled={settings.bionicReadingEnabled}
            onNavigateToWing={(wing) => setActiveWing(wing as ActiveWing)}
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

      {/* Tactical Emerald Footer */}
      <footer className="w-full border-t border-emerald-500/20 bg-[#020503] py-6 text-center text-xs text-emerald-400/60 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-emerald-300 font-serif font-bold">SYNAPSE</span>
            <span>//</span>
            <span>CLASS 12 CBSE & NEET COGNITIVE PLATFORM</span>
          </div>
          <div className="text-[11px] text-emerald-500/50">
            SYSTEM: ONLINE // ENCRYPTED LOCAL TELEMETRY // FIRST-PRINCIPLES COGNITION
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
