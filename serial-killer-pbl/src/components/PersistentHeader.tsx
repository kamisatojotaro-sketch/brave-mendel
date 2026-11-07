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

  const getHeadlinePositionStyle = (): React.CSSProperties => {
    switch (heroStage) {
      case 'rising':
        return {
          top: '106vh',
          left: '50%',
          transform: 'translate(-50%, 0) scale(1.04)',
          opacity: 0,
        };
      case 'docking':
        return {
          top: '44vh',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        };
      case 'docked':
        return {
          top: '12px',
          left: '14px',
          transform: 'translate(0, 0) scale(1)',
          opacity: 1,
        };
    }
  };

  return (
    <>
      {/* Top Persistent Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isDocked
            ? isCrimsonMode
              ? 'bg-[#2a060e]/90 backdrop-blur-xl border-b border-[#c0392b]/35 py-2.5 sm:py-3 shadow-lg'
              : 'bg-[#0a120c]/90 backdrop-blur-xl border-b border-[#f1efe6]/20 py-2.5 sm:py-3 shadow-lg'
            : 'bg-transparent border-transparent py-3 pointer-events-none'
        }`}
      >
        <div className="w-full px-3 sm:px-6 flex items-center justify-end gap-2 sm:gap-3 h-10 sm:h-11">
          {/* Top-Bar Interactive Vinyl Disc Easter Egg & Controls */}
          <div
            className={`flex items-center gap-1.5 sm:gap-3 transition-all duration-700 ${
              isDocked ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            <VinylEasterEgg />

            <button
              onClick={onReplayIntro}
              title="Replay title intro animation"
              aria-label="Replay intro"
              className="p-2 rounded-full border border-[#f1efe6]/25 bg-[#050505]/70 text-[#f1efe6]/80 hover:text-[#00ff00] hover:border-[#00ff00] active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute UI sound FX' : 'Mute UI sound FX'}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              className={`p-2 rounded-full border active:scale-95 transition-all ${
                !isMuted
                  ? 'border-[#00ff00] bg-[#00ff00]/15 text-[#00ff00]'
                  : 'border-[#f1efe6]/25 bg-[#050505]/70 text-[#f1efe6]/75 hover:text-[#c0392b] hover:border-[#c0392b]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Hero Headline: Rises from bottom (~1.5s) -> Docks into Top-Left Corner */}
      <div
        style={getHeadlinePositionStyle()}
        onClick={() => {
          if (isDocked) {
            soundFX.playHoverTick(520);
            onNavigate('home');
          }
        }}
        className={`fixed z-50 transition-all duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none ${
          isDocked
            ? 'cursor-pointer group max-w-[56vw] sm:max-w-none sm:left-6'
            : 'pointer-events-none w-full px-4 text-center'
        }`}
      >
        <div className={`flex items-center gap-2 sm:gap-3 ${isDocked ? '' : 'justify-center'}`}>
          {isDocked && (
            <span
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 rounded-full transition-colors ${
                isCrimsonMode
                  ? 'bg-[#c0392b] shadow-[0_0_10px_#c0392b]'
                  : 'bg-[#00ff00] shadow-[0_0_10px_#00ff00]'
              }`}
            />
          )}
          <h1
            className={`font-display uppercase tracking-wider transition-all duration-[1150ms] ${
              isDocked
                ? 'text-base sm:text-2xl md:text-3xl leading-tight truncate text-[#f1efe6] group-hover:text-[#00ff00]'
                : 'text-[clamp(2rem,7vw,6.2rem)] leading-[0.95] text-[#00ff00] neon-text-glow'
            }`}
          >
            How to get away{' '}
            <span
              className={
                isCrimsonMode
                  ? 'text-[#c0392b]'
                  : isDocked
                  ? 'text-[#00ff00]'
                  : 'text-[#c0392b] magenta-text-shadow'
              }
            >
              with murder
            </span>
          </h1>
        </div>
        {!isDocked && (
          <p className="mt-3 sm:mt-4 font-editorial italic text-base sm:text-2xl text-[#f1efe6] text-center animate-pulse px-2">
            “Bleach masks the smell of blood better than anything else...”
          </p>
        )}
      </div>
    </>
  );
};
