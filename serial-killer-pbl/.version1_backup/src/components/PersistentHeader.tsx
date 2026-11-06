import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';

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
  activePage,
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
            ? 'h-20 bg-[#050505]/85 backdrop-blur-md border-b border-[#00ff00]/25'
            : 'h-0 bg-transparent border-transparent pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-end gap-3 sm:gap-6">
          {/* Quick Nav Pills once docked */}
          <nav
            className={`flex items-center gap-1 sm:gap-2 transition-all duration-500 ${
              isDocked ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            {(
              [
                { id: 'home', label: 'HUB' },
                { id: 'guide', label: '01 // GUIDE' },
                { id: 'characters', label: '02 // CHARACTERS' },
                { id: 'author', label: '03 // AUTHOR' },
              ] as { id: PageId; label: string }[]
            ).map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFX.playHoverTick(680);
                    onNavigate(item.id);
                  }}
                  onMouseEnter={() => soundFX.playHoverTick(480)}
                  className={`px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-all border ${
                    active
                      ? isCrimsonMode
                        ? 'bg-[#c0392b] text-[#f1efe6] border-[#c0392b] crimson-glow font-bold'
                        : 'bg-[#00ff00] text-[#050505] border-[#00ff00] neon-glow font-bold'
                      : 'bg-transparent text-[#f1efe6]/75 border-transparent hover:border-[#00ff00]/50 hover:text-[#00ff00]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="h-4 w-[1px] bg-[#00ff00]/20 mx-1 hidden sm:block" />

            {/* Replay Hero Animation button */}
            <button
              onClick={onReplayIntro}
              title="Replay Hero Intro Animation"
              className="p-2 text-[#f1efe6]/60 hover:text-[#00ff00] border border-transparent hover:border-[#00ff00]/40 transition-colors hidden sm:flex items-center gap-1 font-mono text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute UI Sound FX (Muted by default)' : 'Mute UI Sound FX'}
              className={`p-2 border transition-all flex items-center gap-1.5 font-mono text-[11px] ${
                !isMuted
                  ? 'border-[#00ff00] text-[#00ff00] bg-[#00ff00]/10'
                  : 'border-[#f1efe6]/20 text-[#f1efe6]/50 hover:text-[#f1efe6] hover:border-[#f1efe6]/40'
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
            : 'top-4 left-6 translate-x-0 translate-y-0 opacity-100 cursor-pointer group'
        }`}
      >
        {/* Top Tagline before docking */}
        <div
          className={`font-mono uppercase tracking-[0.35em] text-[#00ff00] transition-all duration-700 ${
            isDocked
              ? 'text-[9px] mb-0.5 opacity-80 group-hover:opacity-100'
              : 'text-xs sm:text-sm mb-3 text-center opacity-90'
          }`}
        >
          {isDocked ? 'OYINKAN BRAITHWAITE // PBL' : 'OYINKAN BRAITHWAITE — MY SISTER, THE SERIAL KILLER'}
        </div>

        {/* Main Headline */}
        <h1
          className={`font-display uppercase tracking-wider leading-none transition-all duration-1000 ${
            isDocked
              ? 'text-xl sm:text-2xl text-[#f1efe6] group-hover:text-[#00ff00] flex items-center gap-2'
              : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center text-[#f1efe6] neon-text-glow whitespace-nowrap'
          }`}
        >
          <span>How to get away</span>
          <span
            className={`${
              isDocked
                ? isCrimsonMode
                  ? 'text-[#c0392b]'
                  : 'text-[#00ff00]'
                : 'block sm:inline text-[#00ff00] sm:ml-4'
            }`}
          >
            with murder
          </span>
        </h1>

        {/* Subtle underline accent when rising/center */}
        {!isDocked && (
          <div className="mt-6 mx-auto h-[2px] w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent shadow-[0_0_20px_#00ff00]" />
        )}
      </div>
    </>
  );
};
