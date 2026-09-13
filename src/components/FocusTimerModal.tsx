import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, Zap, X } from 'lucide-react';
import { ambientAudio } from '../utils/audio';

interface FocusTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({ isOpen, onClose }) => {
  const [minutes, setMinutes] = useState(15); // ADHD micro-sprint default
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [soundType, setSoundType] = useState<'brown' | 'pink' | 'binaural-focus'>('brown');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (!isOvertime) {
          if (seconds > 0) {
            setSeconds(s => s - 1);
          } else if (minutes > 0) {
            setMinutes(m => m - 1);
            setSeconds(59);
          } else {
            // Reached zero: Instead of a loud jarring interruption, enter ADHD Flow Mode!
            setIsOvertime(true);
            setSeconds(1);
          }
        } else {
          // In flow state, count UP
          if (seconds === 59) {
            setMinutes(m => m + 1);
            setSeconds(0);
          } else {
            setSeconds(s => s + 1);
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isOvertime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newMins: number = 15) => {
    setIsActive(false);
    setIsOvertime(false);
    setMinutes(newMins);
    setSeconds(0);
  };

  const toggleSound = () => {
    if (isSoundPlaying) {
      ambientAudio.stop();
      setIsSoundPlaying(false);
    } else {
      ambientAudio.play(soundType, volume);
      setIsSoundPlaying(true);
    }
  };

  const handleSoundChange = (type: 'brown' | 'pink' | 'binaural-focus') => {
    setSoundType(type);
    if (isSoundPlaying) {
      ambientAudio.play(type, volume);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    ambientAudio.setVolume(v);
  };

  if (!isOpen) return null;

  const formattedMins = String(minutes).padStart(2, '0');
  const formattedSecs = String(seconds).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0c121e] border border-indigo-500/30 shadow-2xl shadow-indigo-950/60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <Zap className="w-5 h-5 animate-pulse" />
          <h3 className="text-sm font-mono tracking-wider uppercase font-semibold">ADHD Flow Engine</h3>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[10, 15, 25, 45].map(m => (
            <button
              key={m}
              onClick={() => resetTimer(m)}
              className={`py-1.5 text-xs font-mono rounded-lg border transition ${
                minutes === m && !isOvertime
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
              }`}
            >
              {m}m {m === 15 ? '⚡' : ''}
            </button>
          ))}
        </div>

        {/* Big Timer Display */}
        <div className="text-center my-6">
          <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-[#080d17] border border-slate-800/80 shadow-inner w-full">
            <span className={`text-6xl font-mono font-bold tracking-tight ${isOvertime ? 'text-emerald-400 animate-pulse' : 'text-slate-100'}`}>
              {formattedMins}:{formattedSecs}
            </span>
          </div>
          {isOvertime && (
            <div className="flex items-center justify-center gap-1 mt-2 text-xs font-medium text-emerald-400">
              <Flame className="w-3.5 h-3.5" />
              <span>Hyperfocus Mode Active (Counting Flow Time)</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition shadow-lg ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            {isActive ? 'Pause Sprint' : 'Initiate Sprint'}
          </button>
          <button
            onClick={() => resetTimer(15)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Sound Section */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Ambient Focus Audio</span>
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                isSoundPlaying
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isSoundPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              {isSoundPlaying ? 'Playing' : 'Muted'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { id: 'brown', label: 'Brown Noise', desc: 'Heavy Low Rumble' },
              { id: 'pink', label: 'Pink Noise', desc: 'Rainfall Texture' },
              { id: 'binaural-focus', label: '14Hz Beta', desc: 'Binaural Focus' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => handleSoundChange(s.id as any)}
                className={`p-2 rounded-lg text-left border transition ${
                  soundType === s.id
                    ? 'border-indigo-500/70 bg-indigo-950/40 text-indigo-200'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-medium">{s.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{s.desc}</div>
              </button>
            ))}
          </div>

          {isSoundPlaying && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-mono text-slate-500">VOL</span>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
