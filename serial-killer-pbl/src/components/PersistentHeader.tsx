import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';
import { VinylEasterEgg } from './VinylEasterEgg';

export type HeroStage = 'rising' | 'docking' | 'docked';

interface PersistentHeaderProps {
  heroStage: HeroStage;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onReplayIntro: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isCrimsonMode?: boolean;
}

export const PersistentHeader: React.FC<PersistentHeaderProps> = ({
  heroStage,
  onNavigate,
  onReplayIntro,
  isMuted,
  onToggleMute,
  isCrimsonMode = false,
}) => {
  const isDocked = heroStage === 'docked';
  const isRising = heroStage === 'rising';

  return (
    <>
      {/* Top Navbar Backdrop (visible once docked) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isDocked
            ? 'h-20 bg-[#052914]/85 backdrop-blur-md border-b border-[#f3efe4]/20 shadow-[0_6px_25px_rgba(0,0,0,0.45)]'
            : 'h-0 bg-transparent border-transparent pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-end gap-3 sm:gap-6">
          {/* Vinyl Disc Easter Egg + Audio Controls once docked */}
          <nav
            className={`flex items-center gap-2 sm:gap-3 transition-all duration-500 ${
              isDocked ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            {/* Music Disc Easter Egg */}
            <VinylEasterEgg />

            {/* Replay Hero Animation button */}
            <button
              onClick={onReplayIntro}
              title="Replay Hero Intro Animation"
              className="p-2 rounded-full text-[#f3efe4]/75 hover:text-[#ff007f] border border-transparent hover:border-[#ff007f]/50 transition-colors hidden sm:flex items-center gap-1 font-mono text-[11px]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute UI Sound FX (Muted by default)' : 'Mute UI Sound FX'}
              className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-mono text-[11px] ${
                !isMuted
                  ? 'border-[#ff007f] text-[#f3efe4] bg-[#ff007f] font-bold shadow-[0_0_15px_rgba(255,0,127,0.5)]'
                  : 'border-[#f3efe4]/30 text-[#f3efe4]/75 hover:text-[#f3efe4] hover:border-[#f3efe4]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isMuted ? 'SFX OFF' : 'SFX ON'}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* The Animated Headline ("How to get away with murder") that rises from bottom and docks top-left */}
      <div
        onClick={() => {
          if (isDocked) {
            soundFX.playHoverTick(600);
            onNavigate('home');
          }
        }}
        style={{
          transition:
            'top 1.1s cubic-bezier(0.22, 1, 0.36, 1), left 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s ease-out',
        }}
        className={`fixed z-50 select-none ${
          isRising
            ? 'top-[78%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-95 pointer-events-none'
            : heroStage === 'docking'
            ? 'top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100 pointer-events-none'
            : 'top-3.5 left-6 translate-x-0 translate-y-0 opacity-100 cursor-pointer group'
        }`}
      >
        {/* Top Tagline before docking */}
        <div
          className={`font-sans font-semibold uppercase tracking-[0.3em] transition-all duration-700 ${
            isDocked
              ? 'text-[9px] mb-0.5 text-[#00ff33] group-hover:text-[#ff007f]'
              : 'text-xs sm:text-sm mb-3 text-center text-[#f3efe4]'
          }`}
        >
          {isDocked ? 'OYINKAN BRAITHWAITE // LAGOS EDITION' : 'OYINKAN BRAITHWAITE — MY SISTER, THE SERIAL KILLER'}
        </div>

        {/* Main Headline */}
        <h1
          className={`font-display uppercase tracking-wider leading-none transition-all duration-1000 ${
            isDocked
              ? 'text-xl sm:text-2xl text-[#f3efe4] group-hover:text-[#00ff33] flex items-center gap-2'
              : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center text-[#f3efe4] neon-text-glow whitespace-nowrap'
          }`}
        >
          <span>How to get away</span>
          <span
            className={`${
              isDocked
                ? isCrimsonMode
                  ? 'text-[#ff007f]'
                  : 'text-[#00ff33]'
                : 'block sm:inline text-[#00ff33] sm:ml-4'
            }`}
          >
            with murder
          </span>
        </h1>

        {/* Subtle underline accent when rising/center */}
        {!isDocked && (
          <div className="mt-6 mx-auto h-1 w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#ff007f] to-transparent" />
        )}
      </div>
    </>
  );
};
