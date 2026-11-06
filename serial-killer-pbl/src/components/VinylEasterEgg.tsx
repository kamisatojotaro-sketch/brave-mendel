import React, { useState, useEffect, useRef } from 'react';

interface FloatingNote {
  id: number;
  symbol: string;
  tx: string;
  ty: string;
  color: string;
}

const NOTE_SYMBOLS = ['♪', '♫', '♬', '♩'];

// Pointed directly to the user's uploaded MP3 in public/assets/i-wanna-dance.mp3
const SONG_AUDIO_SRC = '/assets/i-wanna-dance.mp3';
// Starts playback from the 0:30 mark
const SONG_START_SECONDS = 30;

export const VinylEasterEgg: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSongBadge, setShowSongBadge] = useState(false);
  const [notes, setNotes] = useState<FloatingNote[]>([]);

  const badgeTimeoutRef = useRef<number | null>(null);
  const noteIntervalRef = useRef<number | null>(null);
  const noteIdCounter = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const spawnNote = () => {
    noteIdCounter.current += 1;
    const id = noteIdCounter.current;
    const symbol = NOTE_SYMBOLS[id % NOTE_SYMBOLS.length];
    const angle = (Math.random() * 130 - 65) * (Math.PI / 180);
    const dist = 28 + Math.random() * 20;
    const tx = `${Math.round(Math.sin(angle) * dist)}px`;
    const ty = `${Math.round(-Math.cos(angle) * dist - 10)}px`;
    const color = id % 2 === 0 ? '#00ff33' : '#ff007f';

    setNotes((prev) => [...prev.slice(-6), { id, symbol, tx, ty, color }]);
  };

  useEffect(() => {
    const audio = new Audio(SONG_AUDIO_SRC);
    audio.preload = 'auto';
    audio.volume = 0.85;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggleVinyl = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      setIsPlaying(true);
      setShowSongBadge(true);
      spawnNote();

      if (audio) {
        try {
          audio.currentTime = SONG_START_SECONDS;
          audio.play().catch(() => {});
        } catch {
          // Ignore seek errors before metadata loads
        }
      }

      if (badgeTimeoutRef.current) {
        window.clearTimeout(badgeTimeoutRef.current);
      }
      badgeTimeoutRef.current = window.setTimeout(() => {
        setShowSongBadge(false);
      }, 2000);
    } else {
      setIsPlaying(false);
      setShowSongBadge(false);
      if (audio) {
        audio.pause();
      }
      if (badgeTimeoutRef.current) {
        window.clearTimeout(badgeTimeoutRef.current);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      noteIntervalRef.current = window.setInterval(() => {
        spawnNote();
      }, 480);
    } else {
      if (noteIntervalRef.current) {
        window.clearInterval(noteIntervalRef.current);
      }
    }
    return () => {
      if (noteIntervalRef.current) {
        window.clearInterval(noteIntervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="relative inline-flex items-center">
      {/* Floating Music Notes Container */}
      <div className="pointer-events-none absolute inset-0 overflow-visible z-20">
        {notes.map((n) => (
          <span
            key={n.id}
            style={
              {
                '--tx': n.tx,
                '--ty': n.ty,
                color: n.color,
              } as React.CSSProperties
            }
            className="animate-music-note absolute left-1/2 top-1/2 font-mono text-sm font-bold drop-shadow-[0_0_8px_rgba(0,255,51,0.8)] select-none"
          >
            {n.symbol}
          </span>
        ))}
      </div>

      {/* Interactive Vinyl Disc Button */}
      <button
        onClick={handleToggleVinyl}
        aria-label="Spin vinyl record"
        className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none ${
          isPlaying
            ? 'shadow-[0_0_20px_rgba(255,0,127,0.65)]'
            : 'shadow-[0_4px_14px_rgba(0,0,0,0.85)] hover:shadow-[0_0_16px_rgba(0,255,51,0.45)]'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full rounded-full ${isPlaying ? 'animate-vinyl-spin' : ''}`}
        >
          {/* Outer Dark Vinyl Base */}
          <circle cx="50" cy="50" r="48" fill="#040705" stroke="#f3efe4" strokeOpacity="0.4" strokeWidth="2" />

          {/* Concentric Vinyl Grooves */}
          <circle cx="50" cy="50" r="41" fill="none" stroke="#1d3526" strokeWidth="1" strokeDasharray="18 6" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#258e47" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="12 8" />
          <circle cx="50" cy="50" r="29" fill="none" stroke="#1d3526" strokeWidth="1" strokeDasharray="20 5" />

          {/* Diagonal Specular Vinyl Sheen */}
          <path
            d="M 18 26 A 42 42 0 0 1 36 12 L 50 50 Z"
            fill="rgba(243, 239, 228, 0.09)"
          />
          <path
            d="M 82 74 A 42 42 0 0 1 64 88 L 50 50 Z"
            fill="rgba(243, 239, 228, 0.09)"
          />

          {/* Center Record Label (Hot Pink when spinning, Neon Green when idle) */}
          <circle
            cx="50"
            cy="50"
            r="17"
            fill={isPlaying ? '#ff007f' : '#00ff33'}
            stroke="#040705"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="none"
            stroke="#040705"
            strokeWidth="1"
            strokeDasharray="6 4"
          />

          {/* Center Spindle Hole */}
          <circle cx="50" cy="50" r="4" fill="#040705" stroke="#f3efe4" strokeWidth="1" />
        </svg>
      </button>

      {/* Song Name Popup — Anchored right-0 so it never clips off the screen, fades off after 2 seconds */}
      <div
        className={`pointer-events-none absolute top-13 right-0 mt-2 z-50 whitespace-nowrap rounded-xl border border-[#ff007f]/60 bg-[#041d0e]/95 px-3.5 py-2 backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.85)] transition-all duration-300 ${
          showSongBadge
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
          <span className="text-[#00ff33] font-bold">Whitney Houston</span>
          <span className="text-[#f3efe4]/50">—</span>
          <span className="text-[#f3efe4] italic">I Wanna Dance with Somebody</span>
        </div>
      </div>
    </div>
  );
};
