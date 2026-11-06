import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundFX';

interface FloatingNote {
  id: number;
  symbol: string;
  offsetX: number;
  offsetY: number;
  delay: number;
}

export const VinylEasterEgg: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const [showSongPopup, setShowSongPopup] = useState(false);
  const fadeTimerRef = useRef<number | null>(null);
  const clearNotesTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      if (clearNotesTimerRef.current) window.clearTimeout(clearNotesTimerRef.current);
    };
  }, []);

  const handleToggleDisc = () => {
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    if (clearNotesTimerRef.current) window.clearTimeout(clearNotesTimerRef.current);

    const nowPlaying = soundFX.toggleWhitneySong(() => {
      // When the song finishes playing naturally, stop spinning the disc
      setIsPlaying(false);
      setShowSongPopup(false);
      setNotes([]);
    });
    setIsPlaying(nowPlaying);

    if (nowPlaying) {
      // Show Artist & Song name popup and emit music notes, then fade both off after 1 second
      setShowSongPopup(true);
      const burst: FloatingNote[] = [
        { id: Date.now() + 1, symbol: '♪', offsetX: -20, offsetY: -24, delay: 0 },
        { id: Date.now() + 2, symbol: '♫', offsetX: 18, offsetY: -30, delay: 140 },
        { id: Date.now() + 3, symbol: '♬', offsetX: -10, offsetY: -36, delay: 280 },
        { id: Date.now() + 4, symbol: '♪', offsetX: 24, offsetY: -20, delay: 420 },
      ];
      setNotes(burst);

      // Trigger fade-out of the song/artist popup after 2 seconds (2000ms)
      fadeTimerRef.current = window.setTimeout(() => {
        setShowSongPopup(false);
      }, 2000);

      // Clean up the burst notes once their fade animation completes
      clearNotesTimerRef.current = window.setTimeout(() => {
        setNotes([]);
      }, 1800);
    } else {
      setShowSongPopup(false);
      setNotes([]);
    }
  };

  return (
    <div className="relative flex items-center mr-2 sm:mr-4">
      {/* Custom Stylized Vector Vinyl Record Disc Button */}
      <button
        type="button"
        onClick={handleToggleDisc}
        title={
          isPlaying
            ? 'Playing: Whitney Houston — I Wanna Dance With Somebody (Click to stop)'
            : 'Easter Egg: Click to spin vinyl'
        }
        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none group ${
          isPlaying
            ? 'shadow-[0_0_24px_rgba(0,255,0,0.75)] ring-2 ring-[#00ff00]'
            : 'hover:shadow-[0_0_18px_rgba(0,255,0,0.45)] ring-1 ring-[#00ff00]/30 hover:ring-[#00ff00]'
        }`}
      >
        {/* Bespoke High-Contrast SVG Vinyl Disc with Gold/Neon Label & Grooves */}
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full rounded-full select-none pointer-events-none ${
            isPlaying ? 'animate-vinyl-spin' : 'transition-transform duration-500 group-hover:rotate-45'
          }`}
        >
          <defs>
            <radialGradient id="vinylSheen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="65%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#030303" />
            </radialGradient>
            <linearGradient id="goldLabelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f9d976" />
              <stop offset="45%" stopColor="#d49b27" />
              <stop offset="100%" stopColor="#8a5a00" />
            </linearGradient>
            <linearGradient id="vinylHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="46%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="50%" stopColor="rgba(0,255,0,0.22)" />
              <stop offset="54%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Outer Black Vinyl Body */}
          <circle cx="50" cy="50" r="49" fill="url(#vinylSheen)" stroke="#1f1f1f" strokeWidth="1.5" />

          {/* Diagonal Anisotropic Light Sheen */}
          <circle cx="50" cy="50" r="48" fill="url(#vinylHighlight)" />

          {/* Concentric Vinyl Micro-Grooves */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2a2a" strokeWidth="0.7" strokeDasharray="32 8" />
          <circle cx="50" cy="50" r="39" fill="none" stroke="#1e1e1e" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#2c2c2c" strokeWidth="0.6" strokeDasharray="18 6" />

          {/* Inner Metallic Gold Record Label */}
          <circle cx="50" cy="50" r="24" fill="url(#goldLabelGrad)" stroke="#050505" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="19" fill="none" stroke="#050505" strokeWidth="1.2" opacity="0.75" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#fff3c4" strokeWidth="0.6" strokeDasharray="10 5" opacity="0.7" />

          {/* Tiny Label Typography Arc Marker */}
          <path d="M 38 43 A 14 14 0 0 1 62 43" fill="none" stroke="#050505" strokeWidth="1.5" opacity="0.65" />
          <path d="M 40 58 A 14 14 0 0 0 60 58" fill="none" stroke="#050505" strokeWidth="1.2" opacity="0.5" />

          {/* Center Spindle Hole */}
          <circle cx="50" cy="50" r="5.5" fill="#050505" stroke="#00ff00" strokeWidth="0.8" />
        </svg>

        {/* Floating Music Notes coming out of the disc slightly and then fading off */}
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {notes.map((note) => (
            <span
              key={note.id}
              style={
                {
                  '--tx': `${note.offsetX}px`,
                  '--ty': `${note.offsetY}px`,
                  animationDelay: `${note.delay}ms`,
                } as React.CSSProperties
              }
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ff00] font-bold text-sm sm:text-base drop-shadow-[0_0_8px_#00ff00] animate-music-note"
            >
              {note.symbol}
            </span>
          ))}
        </div>
      </button>

      {/* Stylized Now-Playing Toast Popup with Artist & Song Name (Fades off after 1 second) */}
      <div
        className={`absolute top-14 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-50 pointer-events-none transition-all duration-700 ${
          showSongPopup && isPlaying
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95'
        }`}
      >
        <div className="whitespace-nowrap px-4 py-2.5 bg-[#050505]/95 backdrop-blur-xl border border-[#00ff00]/80 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,0,0.35)] flex items-center gap-3">
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-1 bg-[#00ff00] animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
            <span className="w-1 bg-[#00ff00] animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
            <span className="w-1 bg-[#00ff00] animate-[pulse_0.5s_ease-in-out_infinite] h-3" />
          </div>
          <div className="text-left">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00ff00] font-bold">
              KOREDE’S RADIO // NOW SPINNING
            </div>
            <div className="font-editorial text-xs sm:text-sm text-[#f1efe6] font-bold tracking-wide">
              Whitney Houston — <span className="text-[#00ff00] font-mono font-normal">"I Wanna Dance with Somebody"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
