import React, { useState, useEffect } from 'react';
import { Target, GraduationCap, Compass, BookOpen, Clock, Eye, Sliders, Sparkles, Volume2, VolumeX, LayoutDashboard, CalendarCheck } from 'lucide-react';
import { playAmbientSound, stopAmbientSound, isAudioPlaying } from '../utils/audio';
import { getSettings } from '../utils/storage';

export type ActiveWing = 'hub' | 'neet' | 'board' | 'prepper' | 'learner';

interface NavbarProps {
  activeWing: ActiveWing;
  onSelectWing: (wing: ActiveWing) => void;
  bionicEnabled: boolean;
  onToggleBionic: () => void;
  onOpenTimer: () => void;
  onOpenMistakes: () => void;
  onOpenSettings: () => void;
  mistakeCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeWing,
  onSelectWing,
  bionicEnabled,
  onToggleBionic,
  onOpenTimer,
  onOpenMistakes,
  onOpenSettings,
  mistakeCount
}) => {
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    setAudioActive(isAudioPlaying());
  }, []);

  const handleToggleAudio = () => {
    if (audioActive) {
      stopAmbientSound();
      setAudioActive(false);
    } else {
      const settings = getSettings();
      playAmbientSound(settings.selectedSound || 'brown', settings.soundVolume || 0.25);
      setAudioActive(true);
    }
  };

  const navItems: { id: ActiveWing; label: string; icon: React.ReactNode; tag: string }[] = [
    { id: 'hub', label: 'MAIN HUB', icon: <LayoutDashboard className="w-3.5 h-3.5" />, tag: 'COMMAND' },
    { id: 'neet', label: 'NEET ARENA', icon: <Target className="w-3.5 h-3.5" />, tag: 'UG DRILL' },
    { id: 'board', label: 'NCERT BOARD LAB', icon: <GraduationCap className="w-3.5 h-3.5" />, tag: 'CBSE 12' },
    { id: 'prepper', label: 'THE PREPPER', icon: <CalendarCheck className="w-3.5 h-3.5" />, tag: 'PLANNER' },
    { id: 'learner', label: 'THE LEARNER', icon: <Compass className="w-3.5 h-3.5" />, tag: 'UNIVERSAL' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-[#040806]/90 backdrop-blur-md">
      {/* Top Telemetry line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Concept */}
        <div 
          onClick={() => onSelectWing('hub')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#08150c] border border-emerald-500/40 shadow-sm shadow-emerald-950/50 group-hover:border-emerald-400 transition">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-widest text-emerald-100 font-bold text-sm">SYNAPSE</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#06180d] border border-emerald-500/30 text-emerald-400 font-bold tracking-wider">
                OPS v2.4
              </span>
            </div>
            <p className="text-[10px] text-emerald-400/60 font-mono tracking-wider hidden sm:block">
              NEET // NCERT // ADHD COGNITIVE ENGINE
            </p>
          </div>
        </div>

        {/* 5 Core Navigation Tabs */}
        <nav className="hidden lg:flex items-center p-1 rounded-xl bg-[#061009] border border-emerald-500/20">
          {navItems.map(item => {
            const isActive = activeWing === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectWing(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wider transition ${
                  isActive
                    ? 'bg-emerald-600/25 border border-emerald-400/60 text-emerald-200 shadow-md shadow-emerald-950/50'
                    : 'text-emerald-400/60 hover:text-emerald-200 hover:bg-[#08150c]'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-emerald-400/50'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Wing Dropdown */}
        <div className="lg:hidden">
          <select
            value={activeWing}
            onChange={(e) => onSelectWing(e.target.value as ActiveWing)}
            className="bg-[#061009] border border-emerald-500/30 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none"
          >
            {navItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cognitive Audio & Tools Bar */}
        <div className="flex items-center gap-2">
          {/* Ambient Noise Quick-Toggle */}
          <button
            onClick={handleToggleAudio}
            title={audioActive ? 'Stop Ambient Focus Audio' : 'Play Brown/Pink Noise for ADHD Focus'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition ${
              audioActive
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-950/40 animate-pulse'
                : 'border-emerald-500/20 bg-[#061009] text-emerald-400/60 hover:text-emerald-200 hover:border-emerald-500/40'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{audioActive ? 'AUDIO ON' : 'AUDIO'}</span>
          </button>

          {/* Bionic Toggle */}
          <button
            onClick={onToggleBionic}
            title="Toggle Bionic Reading Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition ${
              bionicEnabled
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'border-emerald-500/20 bg-[#061009] text-emerald-400/60 hover:text-emerald-200 hover:border-emerald-500/40'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400/70" />
            <span className="hidden md:inline">BIONIC</span>
          </button>

          {/* Flow Sprint Timer */}
          <button
            onClick={onOpenTimer}
            title="ADHD Flow State Timer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-emerald-500/20 bg-[#061009] text-emerald-300/80 hover:text-emerald-100 hover:border-emerald-400/50 transition"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">TIMER</span>
          </button>

          {/* Mistake Vault Button */}
          <button
            onClick={onOpenMistakes}
            title="Open Mistake Vault"
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-emerald-500/20 bg-[#061009] text-emerald-300/80 hover:text-emerald-100 hover:border-emerald-400/50 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">VAULT</span>
            {mistakeCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[9px] font-bold font-mono rounded-full bg-rose-600/90 text-white">
                {mistakeCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Settings"
            className="p-1.5 rounded-lg text-emerald-400/60 hover:text-emerald-200 hover:bg-[#08150c] border border-transparent hover:border-emerald-500/20 transition"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
